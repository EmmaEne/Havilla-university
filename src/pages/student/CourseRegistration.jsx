import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card, CardHeader, Badge, Button, DataTable } from '../../components/ui';
import { BookOpen, Calendar, CheckCircle2, ShieldAlert, Plus, Trash2, Save } from 'lucide-react';
import { courses } from '../../data/courses';
import { useNotification } from '../../contexts/NotificationContext';
import { useAuth } from '../../contexts/AuthContext';

export default function CourseRegistration() {
  const { user } = useAuth();
  const { success, error, warning } = useNotification();
  
  // Registration list state
  const availableCourses = courses.filter(c => c.level === user.level && c.semester === 'First');
  
  const [registered, setRegistered] = useState([
    courses.find(c => c.code === 'CSC301'),
    courses.find(c => c.code === 'CSC302'),
    courses.find(c => c.code === 'CSC303'),
  ]);

  const [isSubmitted, setIsSubmitted] = useState(true);

  // Filter out already registered from available options
  const unRegisteredOptions = availableCourses.filter(
    avail => !registered.some(reg => reg.code === avail.code)
  );

  const totalCredits = registered.reduce((acc, curr) => acc + curr.creditUnits, 0);
  const MAX_CREDITS = 24;

  const handleRegisterCourse = (course) => {
    if (totalCredits + course.creditUnits > MAX_CREDITS) {
      warning(`Cannot exceed maximum semester limit of ${MAX_CREDITS} credit units!`);
      return;
    }
    setRegistered([...registered, course]);
    setIsSubmitted(false);
    success(`Added ${course.code} to temporary registration list.`);
  };

  const handleDeRegisterCourse = (courseCode) => {
    setRegistered(registered.filter(c => c.code !== courseCode));
    setIsSubmitted(false);
    success(`Removed ${courseCode} from registration list.`);
  };

  const handleSaveRegistration = () => {
    if (registered.length === 0) {
      error('Please select at least one course to register!');
      return;
    }
    setIsSubmitted(true);
    success('Course registration saved and HOD approval requested!');
  };

  const regColumns = [
    { key: 'code', label: 'Course Code', width: '120px', render: (val) => <span className="font-semibold">{val}</span> },
    { key: 'title', label: 'Course Title' },
    { key: 'creditUnits', label: 'Credits', width: '80px', render: (val) => <span className="font-bold">{val} Units</span> },
    { key: 'type', label: 'Type', width: '100px', render: (val) => (
      <Badge variant={val === 'Core' ? 'primary' : 'default'}>{val}</Badge>
    )},
    { key: 'actions', label: '', width: '80px', render: (_, row) => !isSubmitted && (
      <Button variant="ghost" size="sm" onClick={() => handleDeRegisterCourse(row.code)}>
        <Trash2 size={16} className="text-error" />
      </Button>
    )},
  ];

  const availColumns = [
    { key: 'code', label: 'Course Code', width: '120px', render: (val) => <span className="font-semibold">{val}</span> },
    { key: 'title', label: 'Course Title' },
    { key: 'creditUnits', label: 'Credits', width: '80px', render: (val) => <span className="font-bold">{val} Units</span> },
    { key: 'type', label: 'Type', width: '100px', render: (val) => (
      <Badge variant={val === 'Core' ? 'primary' : 'default'}>{val}</Badge>
    )},
    { key: 'actions', label: '', width: '80px', render: (_, row) => (
      <Button variant="outline" size="sm" icon={Plus} onClick={() => handleRegisterCourse(row)}>
        Add
      </Button>
    )},
  ];

  return (
    <DashboardLayout title="Course Registration">
      <div className="flex flex-col gap-6">

        {/* Level and Credits Status */}
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)' }}>
          <Card className="flex flex-col gap-2">
            <span className="text-overline">Registration Status</span>
            <div className="flex items-center gap-2">
              <h2 className="heading-2">First Semester 2024/2025</h2>
            </div>
            <div className="mt-2">
              {isSubmitted ? (
                <Badge variant="success" size="md" dot>Registration Submitted (HOD Approved)</Badge>
              ) : (
                <Badge variant="warning" size="md" dot>Pending Submission (Draft State)</Badge>
              )}
            </div>
          </Card>

          <Card className="flex flex-col gap-2">
            <span className="text-overline">Total Course Load</span>
            <div className="flex justify-between items-end">
              <h2 className="heading-2">{totalCredits} / {MAX_CREDITS} Units</h2>
              <span className="text-xs text-muted">Max Limit: 24 Units</span>
            </div>
            <div className="mt-2" style={{
              width: '100%', height: '8px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '99px', overflow: 'hidden'
            }}>
              <div style={{
                width: `${(totalCredits / MAX_CREDITS) * 100}%`, height: '100%',
                backgroundColor: totalCredits > 20 ? 'var(--color-warning)' : 'var(--color-primary)',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </Card>
        </div>

        <div className="content-grid">
          {/* Currently Selected/Registered List */}
          <div className="col-span-7 flex flex-col gap-6">
            <Card>
              <CardHeader action={
                !isSubmitted && (
                  <Button variant="accent" size="sm" icon={Save} onClick={handleSaveRegistration}>
                    Submit Form
                  </Button>
                )
              }>
                <div className="flex items-center gap-2">
                  <BookOpen className="text-primary-color" />
                  <h3 className="heading-3">My Registered Courses</h3>
                </div>
              </CardHeader>

              <DataTable
                columns={regColumns}
                data={registered}
                emptyMessage="No courses registered in this session yet."
              />

              {isSubmitted && (
                <div className="p-4 rounded border flex items-start gap-3 mt-4" style={{ borderColor: 'var(--color-success-light)', backgroundColor: 'var(--bg-tertiary)' }}>
                  <CheckCircle2 size={20} className="text-success flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm">Official Record Confirmed</span>
                    <span className="text-xs text-secondary">These courses represent your approved academic curriculum. To modify, contact HOD Computer Science.</span>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Available for Registration (Catalog options) */}
          <div className="col-span-5 flex flex-col gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Calendar className="text-primary-color" />
                  <h3 className="heading-3">Available Catalog Courses</h3>
                </div>
              </CardHeader>
              
              {isSubmitted ? (
                <div className="p-4 text-center">
                  <ShieldAlert size={36} className="text-muted mx-auto mb-2" />
                  <p className="text-sm font-semibold text-secondary">Registration Window Closed</p>
                  <p className="text-xs text-muted mt-1">To add/remove courses, submit a late registration add/drop form to the Registry Office.</p>
                </div>
              ) : (
                <DataTable
                  columns={availColumns}
                  data={unRegisteredOptions}
                  emptyMessage="All level courses registered."
                />
              )}
            </Card>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
