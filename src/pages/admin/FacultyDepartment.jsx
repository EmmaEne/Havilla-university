import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card, CardHeader, Badge, Button, DataTable } from '../../components/ui';
import { School, Users, GraduationCap, Calendar, Plus } from 'lucide-react';
import { faculties } from '../../data/faculties';
import { departments } from '../../data/departments';
import { useNotification } from '../../contexts/NotificationContext';

export default function FacultyDepartment() {
  const [activeFaculty, setActiveFaculty] = useState('FAC-001');
  const { success } = useNotification();

  // Find departments inside activeFaculty
  const facultyDepts = departments.filter(d => d.facultyId === activeFaculty);

  const deptColumns = [
    { key: 'code', label: 'Dept Code', width: '120px', render: (val) => <span className="font-semibold">{val}</span> },
    { key: 'name', label: 'Department Name' },
    { key: 'hod', label: 'Head of Dept (HOD)', render: (val) => <span className="font-medium text-primary-color" style={{ color: 'var(--text-primary)' }}>{val}</span> },
    { key: 'studentsCount', label: 'Enrolled Students', width: '150px' },
    { key: 'staffCount', label: 'Academic Staff', width: '120px' },
  ];

  return (
    <DashboardLayout title="Faculty & Department Management">
      <div className="flex flex-col gap-6">

        {/* Faculties Grid */}
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)' }}>
          {faculties.map(f => {
            const isActive = f.id === activeFaculty;
            return (
              <Card
                key={f.id}
                onClick={() => setActiveFaculty(f.id)}
                className={`cursor-pointer transition-all ${isActive ? 'border-primary' : ''}`}
                style={{
                  borderLeft: isActive ? '4px solid var(--color-primary)' : '1px solid var(--border-color)',
                  backgroundColor: isActive ? 'var(--bg-glass)' : 'var(--bg-card)'
                }}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="font-bold text-sm text-primary-color" style={{ color: isActive ? 'var(--color-primary)' : 'var(--text-primary)' }}>
                    {f.code}
                  </span>
                  <Badge variant="primary" size="xs">Faculty</Badge>
                </div>
                <h4 className="font-bold text-md text-primary-color mb-1" style={{ color: 'var(--text-primary)' }}>{f.name}</h4>
                <p className="text-xs text-muted mb-4">Dean: {f.dean}</p>
                <div className="flex justify-between text-xs text-secondary font-medium">
                  <span className="flex items-center gap-1"><Users size={14} /> {f.studentsCount} Students</span>
                  <span className="flex items-center gap-1"><GraduationCap size={14} /> {f.staffCount} Staff</span>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Departments Table */}
        <Card>
          <CardHeader action={
            <Button variant="outline" size="sm" icon={Plus} onClick={() => success('New Department composition simulated!')}>
              Create Department
            </Button>
          }>
            <div className="flex items-center gap-2">
              <School className="text-primary-color" />
              <h3 className="heading-3">Departments inside {faculties.find(f => f.id === activeFaculty)?.name}</h3>
            </div>
          </CardHeader>

          <DataTable
            columns={deptColumns}
            data={facultyDepts}
          />
        </Card>

      </div>
    </DashboardLayout>
  );
}
