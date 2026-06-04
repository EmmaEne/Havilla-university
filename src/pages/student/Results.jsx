import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card, CardHeader, Select, Button, DataTable } from '../../components/ui';
import AreaChart from '../../components/charts/AreaChart';
import { Printer, Download, GraduationCap } from 'lucide-react';
import { studentResults } from '../../data/results';
import { formatGPA } from '../../utils/formatters';
import { printElement } from '../../utils/exportUtils';
import { getGPAColor, getClassification } from '../../utils/grading';
import { useAuth } from '../../contexts/AuthContext';

export default function Results() {
  const { user } = useAuth();
  const [selectedSemester, setSelectedSemester] = useState('First Semester - 300');

  // Map results list for selector
  const semesterOptions = studentResults.map(sem => ({
    label: `${sem.semester} (Level ${sem.level})`,
    value: `${sem.semester} - ${sem.level}`,
  }));

  const activeSemesterData = studentResults.find(
    sem => `${sem.semester} - ${sem.level}` === selectedSemester
  ) || studentResults[studentResults.length - 1];

  // GPAs for the chart
  const gpaProgress = studentResults.map(sem => ({
    semester: `${sem.level}L ${sem.semester.split(' ')[0]}`,
    gpa: sem.gpa,
  }));

  const resultColumns = [
    { key: 'courseCode', label: 'Course Code', width: '120px' },
    { key: 'courseTitle', label: 'Course Title' },
    { key: 'creditUnits', label: 'Credits', width: '80px', render: (val) => <span className="font-semibold">{val}</span> },
    { key: 'score', label: 'Score', width: '80px', render: (val) => <span className="font-semibold">{val}</span> },
    { key: 'grade', label: 'Grade', width: '80px', render: (val) => (
      <span className="font-bold" style={{
        color: val === 'A' ? 'var(--color-success)' :
               val === 'B' ? 'var(--color-info)' :
               val === 'C' ? 'var(--color-accent)' :
               val === 'F' ? 'var(--color-error)' : 'var(--text-primary)'
      }}>{val}</span>
    )},
    { key: 'gradePoint', label: 'GP', width: '80px' },
  ];

  const handlePrint = () => {
    printElement('printable-result-slip', `Result Slip — ${activeSemesterData.semester} (${activeSemesterData.session})`);
  };

  const classification = getClassification(user.cgpa);

  return (
    <DashboardLayout title="Academic Results">
      <div className="flex flex-col gap-6">
        
        {/* GPA Summary Board */}
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-6)' }}>
          <Card className="flex flex-col items-center justify-center p-6 text-center">
            <span className="text-overline">CUMULATIVE GPA (CGPA)</span>
            <h2 className="heading-1" style={{ fontSize: '3rem', margin: '8px 0', color: classification.color }}>
              {formatGPA(user.cgpa)}
            </h2>
            <span className="font-bold text-sm badge badge-primary">{classification.label}</span>
          </Card>

          <Card className="flex flex-col items-center justify-center p-6 text-center">
            <span className="text-overline">TOTAL CREDITS EARNED</span>
            <h2 className="heading-1" style={{ fontSize: '3rem', margin: '8px 0', color: 'var(--color-primary)' }}>
              {user.totalCredits}
            </h2>
            <span className="text-xs text-muted">Across 5 Completed Semesters</span>
          </Card>

          <Card className="p-6 col-span-2">
            <span className="text-overline">GPA Progression Trend</span>
            <AreaChart
              data={gpaProgress}
              dataKey="gpa"
              xKey="semester"
              color="var(--color-primary)"
              height={140}
              name="GPA"
            />
          </Card>
        </div>

        {/* Selected Semester Results */}
        <Card>
          <CardHeader action={
            <div className="flex items-center gap-3">
              <Select
                options={semesterOptions}
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="mb-0"
                style={{ width: '220px', height: '36px' }}
              />
              <Button variant="outline" size="sm" icon={Printer} onClick={handlePrint}>
                Print Slip
              </Button>
            </div>
          }>
            <div className="flex items-center gap-2">
              <GraduationCap className="text-primary-color" />
              <h3 className="heading-3">Semester Result Slip</h3>
            </div>
          </CardHeader>

          {/* Printable Result Slip Wrapper */}
          <div id="printable-result-slip">
            <div className="flex justify-between items-center mb-6 p-4 rounded" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
              <div>
                <h4 className="font-bold text-md text-primary-color">Havilla University, Nde-Ikom</h4>
                <p className="text-xs text-muted">Student Result Slip Statement of Grades</p>
                <p className="text-xs font-semibold mt-1">Name: {user.firstName} {user.lastName} ({user.matricNo})</p>
                <p className="text-xs text-muted">Department: {user.department}</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-muted block">SESSION & SEMESTER</span>
                <span className="font-bold text-sm block">{activeSemesterData.session}</span>
                <span className="text-xs font-medium text-primary-color">{activeSemesterData.semester} (Level {activeSemesterData.level})</span>
              </div>
            </div>

            <DataTable
              columns={resultColumns}
              data={activeSemesterData.results}
            />

            <div className="flex justify-between items-center mt-6 p-4 border" style={{ borderColor: 'var(--border-color)', borderRadius: 'var(--radius-md)' }}>
              <div className="flex gap-6">
                <div>
                  <span className="text-xs text-muted block">SEMESTER CREDITS</span>
                  <span className="font-bold text-md">{activeSemesterData.totalCredits}</span>
                </div>
                <div>
                  <span className="text-xs text-muted block">CREDITS EARNED</span>
                  <span className="font-bold text-md text-success">{activeSemesterData.totalCreditEarned}</span>
                </div>
              </div>
              <div className="flex gap-6 items-center">
                <div>
                  <span className="text-xs text-muted block text-right">SEMESTER GPA</span>
                  <span className="font-bold text-lg block text-right" style={{ color: getGPAColor(activeSemesterData.gpa) }}>
                    {formatGPA(activeSemesterData.gpa)}
                  </span>
                </div>
                <div style={{ borderLeft: '1px solid var(--divider)', paddingLeft: '24px' }}>
                  <span className="text-xs text-muted block">STATUS</span>
                  <span className="badge badge-success font-bold">{activeSemesterData.remark}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
