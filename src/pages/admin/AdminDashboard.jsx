import { useAuth } from '../../contexts/AuthContext';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card, CardHeader, Button, Badge } from '../../components/ui';
import StatCard from '../../components/charts/StatCard';
import AreaChart from '../../components/charts/AreaChart';
import {
  Users,
  School,
  DollarSign,
  TrendingUp,
  Activity,
  UserPlus,
  BookOpen,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { revenueData, revenueSummary } from '../../data/fees';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock activity logs
  const activityLogs = [
    { id: 1, action: 'User suspension lifted', user: 'STU/2022/045', time: '10 mins ago', type: 'security' },
    { id: 2, action: 'Exam results published', user: 'Dr. Nkechi Okonkwo (CSC301)', time: '1 hour ago', type: 'academic' },
    { id: 3, action: 'Bursary payment confirmed', user: '₦480,000 reference HVL-2342', time: '2 hours ago', type: 'finance' },
    { id: 4, action: 'Lecturer record added', user: 'Dr. Kemi Adewale', time: 'Yesterday', type: 'system' },
  ];

  return (
    <DashboardLayout title="System Administration Dashboard">
      <div className="flex flex-col gap-6">

        {/* Welcome Section */}
        <div className="welcome-banner glass flex justify-between items-center p-6 rounded-lg" style={{ background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)', color: 'white' }}>
          <div>
            <span className="text-overline" style={{ color: 'var(--color-accent)' }}>Executive Admin Console</span>
            <h2 className="heading-2" style={{ margin: '4px 0 8px 0' }}>Prof. {user.lastName}</h2>
            <p className="text-sm" style={{ opacity: 0.85 }}>Designation: {user.title} | Access: Superuser System Administrator</p>
          </div>
          <div className="flex flex-col items-end text-right" style={{ borderLeft: '1px solid rgba(255,255,255,0.15)', paddingLeft: '24px' }}>
            <span className="text-xs" style={{ opacity: 0.7 }}>SYSTEM STATUS</span>
            <Badge variant="success" size="sm" dot>Active Online</Badge>
          </div>
        </div>

        {/* University statistics cards */}
        <div className="stats-grid">
          <StatCard
            title="Total Students Registered"
            value="1,420"
            icon={Users}
            trend="4.2%"
            trendDirection="up"
            description="this academic session"
          />
          <StatCard
            title="Active Academic Staff"
            value="186"
            icon={Users}
            description="Lecturers & Professors"
          />
          <StatCard
            title="Faculties & Departments"
            value="5 / 18"
            icon={School}
            description="Academic divisions"
          />
          <StatCard
            title="Total Session Collections"
            value={formatCurrency(revenueSummary.totalCollected)}
            icon={DollarSign}
            trend="12.5%"
            trendDirection="up"
            description="bursary revenue ledger"
          />
        </div>

        <div className="content-grid">
          {/* Revenue Chart */}
          <div className="col-span-8 flex flex-col gap-4">
            <Card>
              <CardHeader action={
                <Button variant="ghost" size="sm" onClick={() => navigate('/admin/finance')}>
                  Bursary Ledger
                </Button>
              }>
                <div className="flex items-center gap-2">
                  <TrendingUp className="text-primary-color" />
                  <h3 className="heading-3">Bursary Monthly Collection Trends</h3>
                </div>
              </CardHeader>
              <AreaChart
                data={revenueData}
                dataKey="revenue"
                xKey="month"
                color="var(--color-primary)"
                height={260}
                name="Revenue (₦)"
              />
            </Card>
          </div>

          {/* Activity Logs & Quick Links */}
          <div className="col-span-4 flex flex-col gap-6">
            
            {/* Quick Administrator Links */}
            <Card>
              <CardHeader>
                <h3 className="heading-3">Management Shortcuts</h3>
              </CardHeader>
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm" fullWidth icon={UserPlus} onClick={() => navigate('/admin/students')}>
                  Register New Student
                </Button>
                <Button variant="outline" size="sm" fullWidth icon={School} onClick={() => navigate('/admin/faculties')}>
                  Manage Faculties & Staff
                </Button>
                <Button variant="outline" size="sm" fullWidth icon={BookOpen} onClick={() => navigate('/admin/academic')}>
                  Session Term Setup
                </Button>
              </div>
            </Card>

            {/* System activity logs */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Activity className="text-primary-color" />
                  <h3 className="heading-3">System Auditor Log</h3>
                </div>
              </CardHeader>
              <div className="flex flex-col gap-3">
                {activityLogs.map(log => (
                  <div key={log.id} className="flex justify-between items-center pb-2 text-xs" style={{ borderBottom: '1px solid var(--divider)' }}>
                    <div className="flex flex-col">
                      <span className="font-semibold text-primary-color" style={{ color: 'var(--text-primary)' }}>{log.action}</span>
                      <span className="text-muted" style={{ fontSize: '10px' }}>Subject: {log.user}</span>
                    </div>
                    <span className="text-muted" style={{ fontSize: '9px' }}>{log.time}</span>
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
