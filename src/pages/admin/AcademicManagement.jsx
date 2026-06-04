import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card, CardHeader, Badge, Button, DataTable } from '../../components/ui';
import { BookOpen, Calendar, Settings, Plus, Star } from 'lucide-react';
import { courses } from '../../data/courses';
import { GRADE_SCALE } from '../../utils/grading';
import { useNotification } from '../../contexts/NotificationContext';

export default function AcademicManagement() {
  const [activeSession, setActiveSession] = useState('2024/2025');
  const { success } = useNotification();

  const sessions = [
    { name: '2024/2025 Academic Session', status: 'Active Current' },
    { name: '2023/2024 Academic Session', status: 'Archived Term' },
    { name: '2022/2023 Academic Session', status: 'Archived Term' },
  ];

  const courseColumns = [
    { key: 'code', label: 'Code', width: '100px', render: (val) => <span className="font-semibold">{val}</span> },
    { key: 'title', label: 'Course Title' },
    { key: 'creditUnits', label: 'Credits', width: '80px', render: (val) => <span className="font-bold">{val} Units</span> },
    { key: 'level', label: 'Level', width: '80px' },
    { key: 'type', label: 'Classification', width: '120px', render: (val) => (
      <Badge variant={val === 'Core' ? 'primary' : 'default'}>{val}</Badge>
    )},
  ];

  const gradeColumns = [
    { key: 'grade', label: 'Grade Symbol', width: '120px', render: (val) => <span className="font-extrabold text-primary-color">{val}</span> },
    { key: 'minScore', label: 'Min Score (%)', render: (_, row) => <span>{row.minScore}%</span> },
    { key: 'maxScore', label: 'Max Score (%)', render: (_, row) => <span>{row.maxScore}%</span> },
    { key: 'point', label: 'Grade Points', width: '120px', render: (val) => <span className="font-bold">{val.toFixed(2)}</span> },
    { key: 'remark', label: 'Dean Remark', width: '150px' },
  ];

  return (
    <DashboardLayout title="Academic Session & Curriculum Setup">
      <div className="flex flex-col gap-6">

        <div className="content-grid">
          {/* Active Sessions Lists */}
          <div className="col-span-4 flex flex-col gap-6">
            <Card>
              <CardHeader action={
                <Button variant="outline" size="sm" icon={Plus} onClick={() => success('New academic term session created!')}>
                  New Session
                </Button>
              }>
                <div className="flex items-center gap-2">
                  <Calendar className="text-primary-color" />
                  <h3 className="heading-3">Academic Session Registry</h3>
                </div>
              </CardHeader>
              <div className="flex flex-col gap-3">
                {sessions.map((sess, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-3 rounded cursor-pointer"
                    style={{
                      backgroundColor: 'var(--bg-tertiary)',
                      borderLeft: sess.status.includes('Active') ? '3px solid var(--color-success)' : '3px solid transparent'
                    }}
                    onClick={() => success(`Selected academic view: ${sess.name}`)}
                  >
                    <span className="font-bold text-xs">{sess.name}</span>
                    <Badge variant={sess.status.includes('Active') ? 'success' : 'default'} size="xs">
                      {sess.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Grading Scale Settings */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Settings className="text-primary-color" />
                  <h3 className="heading-3">Official GPA Grading Scale</h3>
                </div>
              </CardHeader>
              <DataTable
                columns={gradeColumns}
                data={GRADE_SCALE}
              />
            </Card>
          </div>

          {/* Curriculum Catalog */}
          <div className="col-span-8 flex flex-col gap-6">
            <Card>
              <CardHeader action={
                <Button variant="primary" size="sm" icon={Plus} onClick={() => success('Curriculum course addition simulated!')}>
                  Add Course Unit
                </Button>
              }>
                <div className="flex items-center gap-2">
                  <BookOpen className="text-primary-color" />
                  <h3 className="heading-3">University Curriculum Catalog ({courses.length} Courses)</h3>
                </div>
              </CardHeader>

              <DataTable
                columns={courseColumns}
                data={courses}
              />
            </Card>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
