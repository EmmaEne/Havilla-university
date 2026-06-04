import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card, CardHeader, Select, Button, DataTable } from '../../components/ui';
import BarChart from '../../components/charts/BarChart';
import PieChart from '../../components/charts/PieChart';
import { FileBarChart, Download, Sparkles, TrendingUp } from 'lucide-react';
import { exportToCSV } from '../../utils/exportUtils';
import { useNotification } from '../../contexts/NotificationContext';

export default function Reports() {
  const [selectedCourse, setSelectedCourse] = useState('CSC301');
  const { success } = useNotification();

  // Mock course performance stats
  const performanceSummary = {
    averageScore: 78.4,
    passRate: 94.2,
    highestScore: 92,
    lowestScore: 42,
  };

  const gradeDistribution = [
    { name: 'Grade A', value: 12, color: 'var(--color-success)' },
    { name: 'Grade B', value: 18, color: 'var(--color-info)' },
    { name: 'Grade C', value: 15, color: 'var(--color-accent)' },
    { name: 'Grade D', value: 4, color: 'var(--color-warning)' },
    { name: 'Grade F', value: 3, color: 'var(--color-error)' },
  ];

  const historicalPerformance = [
    { session: '2020/2021', average: 72 },
    { session: '2021/2022', average: 75 },
    { session: '2022/2023', average: 71 },
    { session: '2023/2024', average: 79 },
    { session: '2024/2025', average: 78.4 },
  ];

  const handleExportCSV = () => {
    const csvData = [
      { Metric: 'Average Score', Value: performanceSummary.averageScore },
      { Metric: 'Pass Rate (%)', Value: performanceSummary.passRate },
      { Metric: 'Highest Score', Value: performanceSummary.highestScore },
      { Metric: 'Lowest Score', Value: performanceSummary.lowestScore },
    ];
    exportToCSV(csvData, `${selectedCourse}_performance_report`);
    success(`Exported analytical report for ${selectedCourse}`);
  };

  const courseOptions = [
    { label: 'CSC301 - Database Management Systems', value: 'CSC301' },
    { label: 'CSC302 - Operating Systems', value: 'CSC302' },
  ];

  return (
    <DashboardLayout title="Academic Performance Analytics Reports">
      <div className="flex flex-col gap-6">

        {/* Filters Header */}
        <Card>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <span className="text-sm font-semibold text-muted">REPORT SUBJECT:</span>
              <Select
                options={courseOptions}
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="mb-0"
                style={{ width: '320px', height: '40px' }}
              />
            </div>
            <Button variant="outline" size="sm" icon={Download} onClick={handleExportCSV}>
              Export Analytics report
            </Button>
          </div>
        </Card>

        {/* Stats card indicators */}
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-6)' }}>
          <Card className="flex flex-col items-center justify-center p-4 text-center">
            <span className="text-overline">Class Mean Score</span>
            <h2 className="heading-2" style={{ color: 'var(--color-primary)' }}>{performanceSummary.averageScore}%</h2>
          </Card>
          <Card className="flex flex-col items-center justify-center p-4 text-center">
            <span className="text-overline">Standard Pass Rate</span>
            <h2 className="heading-2" style={{ color: 'var(--color-success)' }}>{performanceSummary.passRate}%</h2>
          </Card>
          <Card className="flex flex-col items-center justify-center p-4 text-center">
            <span className="text-overline">Highest Grade Recorded</span>
            <h2 className="heading-2" style={{ color: 'var(--color-primary)' }}>{performanceSummary.highestScore}</h2>
          </Card>
          <Card className="flex flex-col items-center justify-center p-4 text-center">
            <span className="text-overline">Lowest Grade Recorded</span>
            <h2 className="heading-2" style={{ color: 'var(--color-error)' }}>{performanceSummary.lowestScore}</h2>
          </Card>
        </div>

        {/* Charts and distributions */}
        <div className="content-grid">
          {/* Grade Distribution Pie Chart */}
          <div className="col-span-5 flex flex-col gap-4">
            <Card>
              <CardHeader>
                <h3 className="heading-3">Class Grades Allocation Spread</h3>
              </CardHeader>
              <PieChart data={gradeDistribution} />
              
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {gradeDistribution.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1 text-xs">
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color }} />
                    <span className="font-semibold">{item.name}:</span>
                    <span className="text-muted">{item.value} Students</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Historical Trends Bar Chart */}
          <div className="col-span-7 flex flex-col gap-4">
            <Card>
              <CardHeader>
                <h3 className="heading-3">Session Class Mean Progression Trend</h3>
              </CardHeader>
              <BarChart
                data={historicalPerformance}
                dataKey="average"
                xKey="session"
                color="var(--color-primary)"
                height={260}
                name="Average Mark (%)"
              />
            </Card>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
