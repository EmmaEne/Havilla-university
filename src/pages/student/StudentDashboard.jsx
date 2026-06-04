import { useAuth } from '../../contexts/AuthContext';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card, CardHeader, Badge, Button } from '../../components/ui';
import StatCard from '../../components/charts/StatCard';
import {
  Award,
  BookOpen,
  Calendar,
  CreditCard,
  FileText,
  Clock,
  ArrowRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { formatCurrency, formatGPA } from '../../utils/formatters';
import { useNavigate } from 'react-router-dom';

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock outstanding classes for the week
  const upcomingClasses = [
    { id: 1, course: 'CSC301', title: 'Database Management Systems', time: '09:00 AM - 11:00 AM', day: 'Monday', venue: 'FCIT Lab 2', lecturer: 'Dr. Nkechi Okonkwo' },
    { id: 2, course: 'CSC303', title: 'Software Engineering', time: '11:00 AM - 01:00 PM', day: 'Tuesday', venue: 'Lecture Theatre B', lecturer: 'Dr. Fatima Abdullahi' },
    { id: 3, course: 'CSC307', title: 'Human Computer Interaction', time: '02:00 PM - 04:00 PM', day: 'Thursday', venue: 'FCIT Hall A', lecturer: 'Dr. Emeka Nnaji' },
  ];

  // Mock recent activities
  const recentActivities = [
    { id: 1, type: 'academic', title: 'Course registration approved', time: '2 days ago', desc: 'First semester courses registration has been approved by the HOD.' },
    { id: 2, type: 'payment', title: 'Fee payment receipt generated', time: '1 week ago', desc: 'Payment of ₦480,000 for 2024/2025 academic session has been confirmed.' },
    { id: 3, type: 'result', title: 'CSC202 results released', time: '2 weeks ago', desc: 'Grade A uploaded for Object-Oriented Programming (3 Units).' },
  ];

  return (
    <DashboardLayout title="Student Dashboard">
      <div className="flex flex-col gap-6">
        {/* Welcome Section */}
        <div className="welcome-banner glass flex justify-between items-center p-6 rounded-lg" style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)', color: 'white' }}>
          <div>
            <span className="text-overline" style={{ color: 'var(--color-accent)' }}>Welcome Back</span>
            <h2 className="heading-2" style={{ margin: '4px 0 8px 0' }}>{user.firstName} {user.lastName}</h2>
            <p className="text-sm" style={{ opacity: 0.85 }}>Matric No: {user.matricNo} | Programme: {user.programme} | Level: {user.level}</p>
          </div>
          <div className="flex flex-col items-end text-right" style={{ borderLeft: '1px solid rgba(255,255,255,0.15)', paddingLeft: '24px' }}>
            <span className="text-xs" style={{ opacity: 0.7 }}>CURRENT SEMESTER</span>
            <span className="font-bold text-md">{user.semester}</span>
            <span className="text-xs" style={{ opacity: 0.7 }}>SESSION: {user.session}</span>
          </div>
        </div>

        {/* Stat Cards Grid */}
        <div className="stats-grid">
          <StatCard
            title="Cumulative GPA (CGPA)"
            value={formatGPA(user.cgpa)}
            icon={TrendingUp}
            trend="0.15"
            trendDirection="up"
            description="from last semester"
          />
          <StatCard
            title="Current GPA"
            value={formatGPA(user.gpa)}
            icon={Award}
            description="current academic semester"
          />
          <StatCard
            title="Registered Credits"
            value={`${user.totalCredits} Units`}
            icon={BookOpen}
            description="total earned credits"
          />
          <StatCard
            title="Financial Balance"
            value={formatCurrency(0)}
            icon={CreditCard}
            description="no outstanding payments"
            className="border-success"
          />
        </div>

        {/* Content Section */}
        <div className="content-grid">
          {/* Main Left Columns */}
          <div className="col-span-8 flex flex-col gap-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <h3 className="heading-3">Quick Actions</h3>
              </CardHeader>
              <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-4)' }}>
                <Button
                  variant="outline"
                  fullWidth
                  icon={BookOpen}
                  onClick={() => navigate('/student/courses')}
                >
                  Register Courses
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  icon={Award}
                  onClick={() => navigate('/student/results')}
                >
                  Check Semester Results
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  icon={CreditCard}
                  onClick={() => navigate('/student/fees')}
                >
                  Pay Outstanding Fees
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  icon={FileText}
                  onClick={() => navigate('/student/documents')}
                >
                  Download Receipts
                </Button>
              </div>
            </Card>

            {/* Upcoming Classes */}
            <Card>
              <CardHeader action={<Button variant="ghost" size="sm" onClick={() => navigate('/student/courses')}>My Course Schedule</Button>}>
                <h3 className="heading-3">Upcoming Lectures</h3>
              </CardHeader>
              <div className="flex flex-col gap-3">
                {upcomingClasses.map(c => (
                  <div key={c.id} className="flex justify-between items-center p-3 rounded-md" style={{ backgroundColor: 'var(--bg-tertiary)', borderLeft: '3px solid var(--color-accent)' }}>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-primary-color">{c.course} — {c.title}</span>
                      <span className="text-xs text-muted">{c.lecturer} | {c.venue}</span>
                    </div>
                    <div className="flex items-center gap-2 text-right">
                      <Clock size={14} className="text-muted" />
                      <span className="text-xs font-semibold text-muted">{c.day}, {c.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar Right Column */}
          <div className="col-span-4 flex flex-col gap-6">
            {/* Notifications Alert / Summary */}
            <Card className="border-accent" style={{ borderLeft: '4px solid var(--color-accent)' }}>
              <div className="flex gap-3">
                <AlertCircle className="text-accent-color flex-shrink-0" size={20} />
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-sm">Upcoming Exams Notice</span>
                  <span className="text-xs text-secondary">The First Semester examinations will begin on January 20, 2025. Verify your registered courses are correct before then.</span>
                  <Button variant="ghost" size="sm" onClick={() => navigate('/student/notifications')} className="self-start gap-1" style={{ paddingLeft: 0, marginTop: 'var(--space-2)' }}>
                    Open Notifications <ArrowRight size={14} />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <h3 className="heading-3">Recent Activity</h3>
              </CardHeader>
              <div className="flex flex-col gap-4">
                {recentActivities.map(act => (
                  <div key={act.id} className="flex flex-col gap-1" style={{ borderBottom: '1px solid var(--divider)', paddingBottom: 'var(--space-3)' }}>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-sm">{act.title}</span>
                      <span className="text-xs text-muted">{act.time}</span>
                    </div>
                    <p className="text-xs text-secondary">{act.desc}</p>
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
