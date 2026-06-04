import { useAuth } from '../../contexts/AuthContext';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card, CardHeader, Button, Badge } from '../../components/ui';
import StatCard from '../../components/charts/StatCard';
import {
  BookOpen,
  Users,
  Award,
  ClipboardList,
  Clock,
  MessageSquare,
  TrendingUp,
  FileBarChart,
  Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LecturerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock assigned courses
  const assignedCourses = [
    { code: 'CSC301', title: 'Database Management Systems', students: 52, level: '300', nextLecture: 'Monday 09:00 AM' },
    { code: 'CSC101', title: 'Introduction to Computer Science', students: 85, level: '100', nextLecture: 'Wednesday 11:00 AM' },
    { code: 'CSC201', title: 'Data Structures & Algorithms', students: 68, level: '200', nextLecture: 'Thursday 09:00 AM' },
    { code: 'CSC401', title: 'Computer Architecture', students: 40, level: '400', nextLecture: 'Friday 02:00 PM' },
  ];

  // Mock calendar upcoming items
  const calendarItems = [
    { title: 'Upload CSC201 Midsemester CA', due: 'Tomorrow, 04:00 PM', status: 'pending' },
    { title: 'FCIT Faculty Board Meeting', due: 'Friday, 10:00 AM', status: 'scheduled' },
    { title: 'Submit Exam Questions Draft', due: 'June 10, 2026', status: 'upcoming' },
  ];

  return (
    <DashboardLayout title="Lecturer Dashboard">
      <div className="flex flex-col gap-6">
        
        {/* Welcome Section */}
        <div className="welcome-banner glass flex justify-between items-center p-6 rounded-lg" style={{ background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)', color: 'white' }}>
          <div>
            <span className="text-overline" style={{ color: 'var(--color-accent)' }}>Academic Portal</span>
            <h2 className="heading-2" style={{ margin: '4px 0 8px 0' }}>{user.title} {user.lastName}</h2>
            <p className="text-sm" style={{ opacity: 0.85 }}>Staff ID: {user.staffId} | Department: {user.department}</p>
          </div>
          <div className="flex flex-col items-end text-right" style={{ borderLeft: '1px solid rgba(255,255,255,0.15)', paddingLeft: '24px' }}>
            <span className="text-xs" style={{ opacity: 0.7 }}>FACULTY BOARD MEMBER</span>
            <span className="font-bold text-md">{user.faculty}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <StatCard
            title="Assigned Courses"
            value={user.coursesCount}
            icon={BookOpen}
            description="Active course modules"
          />
          <StatCard
            title="Total Students"
            value={user.studentsCount}
            icon={Users}
            description="Across all classes"
          />
          <StatCard
            title="Pending Grade Sheets"
            value="1 Class"
            icon={Award}
            description="CSC302 needs exam scores"
            className="border-warning"
          />
          <StatCard
            title="Average Attendance"
            value="91.4%"
            icon={ClipboardList}
            trend="1.8%"
            trendDirection="up"
            description="cumulative class rate"
          />
        </div>

        {/* Contents */}
        <div className="content-grid">
          
          {/* Main Left column */}
          <div className="col-span-8 flex flex-col gap-6">
            
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <h3 className="heading-3">Quick Actions</h3>
              </CardHeader>
              <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-4)' }}>
                <Button variant="outline" fullWidth icon={ClipboardList} onClick={() => navigate('/lecturer/attendance')}>
                  Take Attendance
                </Button>
                <Button variant="outline" fullWidth icon={Award} onClick={() => navigate('/lecturer/results')}>
                  Upload Exam Marks
                </Button>
                <Button variant="outline" fullWidth icon={MessageSquare} onClick={() => navigate('/lecturer/announcements')}>
                  Post Announcement
                </Button>
                <Button variant="outline" fullWidth icon={FileBarChart} onClick={() => navigate('/lecturer/reports')}>
                  Performance Reports
                </Button>
              </div>
            </Card>

            {/* Courses Overview */}
            <Card>
              <CardHeader>
                <h3 className="heading-3">Assigned Classes & Modules</h3>
              </CardHeader>
              <div className="flex flex-col gap-3">
                {assignedCourses.map((c, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 rounded" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-primary-color">{c.code} — {c.title}</span>
                        <Badge variant="primary" size="xs">L{c.level}</Badge>
                      </div>
                      <span className="text-xs text-muted">Enrollment: {c.students} Students</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-secondary font-medium block">Next Schedule</span>
                      <span className="text-xs text-muted flex items-center gap-1"><Clock size={12} /> {c.nextLecture}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

          </div>

          {/* Right column */}
          <div className="col-span-4 flex flex-col gap-6">
            <Card>
              <CardHeader>
                <h3 className="heading-3">Academic Calendar Deadlines</h3>
              </CardHeader>
              <div className="flex flex-col gap-4">
                {calendarItems.map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1 pb-3" style={{ borderBottom: idx !== calendarItems.length - 1 ? '1px solid var(--divider)' : 'none' }}>
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-semibold text-xs text-primary-color" style={{ color: 'var(--text-primary)' }}>{item.title}</span>
                      <Badge variant={item.status === 'pending' ? 'warning' : 'default'} size="xs">
                        {item.status}
                      </Badge>
                    </div>
                    <span className="text-muted" style={{ fontSize: '10px' }}><Calendar size={10} style={{ display: 'inline', marginRight: '4px' }} />Due: {item.due}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
