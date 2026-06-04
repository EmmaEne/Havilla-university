import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card, CardHeader, Select, Button } from '../../components/ui';
import BarChart from '../../components/charts/BarChart';
import PieChart from '../../components/charts/PieChart';
import AreaChart from '../../components/charts/AreaChart';
import { FileBarChart, Download, Sparkles } from 'lucide-react';
import { exportToCSV } from '../../utils/exportUtils';
import { useNotification } from '../../contexts/NotificationContext';
import { revenueData } from '../../data/fees';

export default function ReportsAnalytics() {
  const [selectedReport, setSelectedReport] = useState('student');
  const { success } = useNotification();

  // Mock enrollment trends
  const enrollmentTrends = [
    { year: '2021', students: 850 },
    { year: '2022', students: 1020 },
    { year: '2023', students: 1180 },
    { year: '2024', students: 1350 },
    { year: '2025', students: 1420 },
  ];

  // Faculty student distribution
  const facultyDistribution = [
    { name: 'FCIT Computing', value: 420, color: 'var(--color-primary)' },
    { name: 'FET Engineering', value: 380, color: 'var(--color-accent)' },
    { name: 'FOS Sciences', value: 350, color: 'var(--color-success)' },
    { name: 'FASS Arts & Social', value: 310, color: 'var(--color-info)' },
    { name: 'FMS Management', value: 290, color: 'var(--color-warning)' },
  ];

  const handleExportCSV = () => {
    if (selectedReport === 'student') {
      const data = enrollmentTrends.map(item => ({ AcademicYear: item.year, Enrollment: item.students }));
      exportToCSV(data, 'student_enrollment_analytics');
    } else if (selectedReport === 'revenue') {
      const data = revenueData.map(item => ({ Month: item.month, RevenueCollected: item.revenue }));
      exportToCSV(data, 'revenue_collection_analytics');
    } else {
      const data = facultyDistribution.map(item => ({ Faculty: item.name, StudentsCount: item.value }));
      exportToCSV(data, 'faculty_student_allocation_analytics');
    }
    success(`Successfully exported ${selectedReport} analytics dataset.`);
  };

  const reportOptions = [
    { label: 'Student Enrollment Trends', value: 'student' },
    { label: 'Bursary Revenue Analytics', value: 'revenue' },
    { label: 'Faculty Enrollment Allocations', value: 'faculty' },
  ];

  return (
    <DashboardLayout title="System Reports & University Analytics">
      <div className="flex flex-col gap-6">

        {/* Filters Header */}
        <Card>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <span className="text-sm font-semibold text-muted">ANALYTICS TOPIC:</span>
              <Select
                options={reportOptions}
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
                className="mb-0"
                style={{ width: '320px', height: '40px' }}
              />
            </div>
            <Button variant="outline" size="sm" icon={Download} onClick={handleExportCSV}>
              Export Analytics Dataset
            </Button>
          </div>
        </Card>

        {/* Charts & Plots based on selection */}
        {selectedReport === 'student' && (
          <div className="content-grid">
            <div className="col-span-8 flex flex-col gap-4">
              <Card>
                <CardHeader>
                  <h3 className="heading-3">Historical Undergraduate Registration Trends</h3>
                </CardHeader>
                <BarChart
                  data={enrollmentTrends}
                  dataKey="students"
                  xKey="year"
                  color="var(--color-primary)"
                  height={300}
                  name="Enrolled Undergraduates"
                />
              </Card>
            </div>
            <div className="col-span-4 flex flex-col gap-4">
              <Card className="flex flex-col justify-center items-center text-center p-6" style={{ height: '100%' }}>
                <FileBarChart size={48} className="text-primary-color mb-4" />
                <h4 className="font-bold text-md text-primary-color mb-2">Registration Trends</h4>
                <p className="text-xs text-muted mb-4">Undergraduate enrollment continues to experience steady upward trajectory, growing by 5% year over year.</p>
                <Badge variant="success" size="md">Stable Growth</Badge>
              </Card>
            </div>
          </div>
        )}

        {selectedReport === 'revenue' && (
          <div className="content-grid">
            <div className="col-span-8 flex flex-col gap-4">
              <Card>
                <CardHeader>
                  <h3 className="heading-3">Bursary Fee Collection Performance Trends</h3>
                </CardHeader>
                <AreaChart
                  data={revenueData}
                  dataKey="revenue"
                  xKey="month"
                  color="var(--color-primary)"
                  height={300}
                  name="Monthly Payments (₦)"
                />
              </Card>
            </div>
            <div className="col-span-4 flex flex-col gap-4">
              <Card className="flex flex-col justify-center items-center text-center p-6" style={{ height: '100%' }}>
                <FileBarChart size={48} className="text-primary-color mb-4" />
                <h4 className="font-bold text-md text-primary-color mb-2">Bursary Collections</h4>
                <p className="text-xs text-muted mb-4">Highest revenue spikes are observed in September and January coinciding with semester registration cycles.</p>
                <Badge variant="success" size="md">High Collection Rate</Badge>
              </Card>
            </div>
          </div>
        )}

        {selectedReport === 'faculty' && (
          <div className="content-grid">
            <div className="col-span-5 flex flex-col gap-4">
              <Card>
                <CardHeader>
                  <h3 className="heading-3">Faculty Enrollment Ratios</h3>
                </CardHeader>
                <PieChart data={facultyDistribution} />
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  {facultyDistribution.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1 text-xs">
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color }} />
                      <span className="font-semibold">{item.name}:</span>
                      <span className="text-muted">{item.value} Students</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
            <div className="col-span-7 flex flex-col gap-4">
              <Card>
                <CardHeader>
                  <h3 className="heading-3 font-semibold">Faculty Enrollment Allocation Ledger</h3>
                </CardHeader>
                <div className="flex flex-col gap-3">
                  {facultyDistribution.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 rounded" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                      <span className="font-semibold text-xs">{item.name}</span>
                      <span className="font-bold text-sm text-primary-color">{item.value} Students</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
