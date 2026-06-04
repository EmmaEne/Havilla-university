import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card, CardHeader, Badge, Button, DataTable } from '../../components/ui';
import { BookOpen, Users, GraduationCap, Calendar, Download } from 'lucide-react';
import { courses } from '../../data/courses';
import { students } from '../../data/students';
import { exportToCSV } from '../../utils/exportUtils';
import { useNotification } from '../../contexts/NotificationContext';

export default function CourseManagement() {
  const [activeCourse, setActiveCourse] = useState('CSC301');
  const { success } = useNotification();

  // Find students registered in this activeCourse
  // In our mock data, let's grab students where department matches Computer Science (since all assigned courses are CS modules)
  const enrolledStudents = students.filter(
    stu => stu.departmentId === 'DEP-001' && stu.level === courses.find(c => c.code === activeCourse)?.level
  );

  const handleExportRoster = () => {
    const csvData = enrolledStudents.map(stu => ({
      MatricNo: stu.matricNo,
      FirstName: stu.firstName,
      LastName: stu.lastName,
      Email: stu.email,
      Level: stu.level,
      Status: stu.status,
    }));
    exportToCSV(csvData, `${activeCourse}_student_roster`);
    success(`Exported class roster for ${activeCourse}`);
  };

  const columns = [
    { key: 'matricNo', label: 'Matric Number', width: '150px', render: (val) => <span className="font-semibold">{val}</span> },
    { key: 'name', label: 'Student Name', render: (_, row) => <span>{row.firstName} {row.lastName}</span> },
    { key: 'email', label: 'University Email' },
    { key: 'status', label: 'Academic Status', width: '120px', render: (val) => (
      <Badge variant={val === 'Active' ? 'success' : 'warning'}>{val}</Badge>
    )},
  ];

  const assignedLectures = courses.filter(c => c.lecturerId === 'LEC-001');

  return (
    <DashboardLayout title="My Assigned Courses">
      <div className="flex flex-col gap-6">

        {/* Assigned Modules Grid */}
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)' }}>
          {assignedLectures.map(c => {
            const isActive = c.code === activeCourse;
            return (
              <Card
                key={c.id}
                onClick={() => setActiveCourse(c.code)}
                className={`cursor-pointer transition-all ${isActive ? 'border-primary' : ''}`}
                style={{
                  borderLeft: isActive ? '4px solid var(--color-primary)' : '1px solid var(--border-color)',
                  backgroundColor: isActive ? 'var(--bg-glass)' : 'var(--bg-card)'
                }}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="font-bold text-sm text-primary-color" style={{ color: isActive ? 'var(--color-primary)' : 'var(--text-primary)' }}>
                    {c.code}
                  </span>
                  <Badge variant="primary" size="xs">{c.type}</Badge>
                </div>
                <h4 className="font-bold text-md text-primary-color mb-4" style={{ color: 'var(--text-primary)' }}>{c.title}</h4>
                <div className="flex justify-between text-xs text-muted">
                  <span className="flex items-center gap-1"><GraduationCap size={14} /> {c.creditUnits} Credit Units</span>
                  <span className="flex items-center gap-1"><Users size={14} /> {c.enrolledCount} Registered</span>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Active Class Student Roster list */}
        <Card>
          <CardHeader action={
            <Button variant="outline" size="sm" icon={Download} onClick={handleExportRoster}>
              Export Class Roster
            </Button>
          }>
            <div className="flex items-center gap-2">
              <BookOpen className="text-primary-color" />
              <h3 className="heading-3">Student Enrolled Class List — {activeCourse} ({enrolledStudents.length} Students)</h3>
            </div>
          </CardHeader>

          <DataTable
            columns={columns}
            data={enrolledStudents}
            emptyMessage="No students registered for this course module."
          />
        </Card>

      </div>
    </DashboardLayout>
  );
}
