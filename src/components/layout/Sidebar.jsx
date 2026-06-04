import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Logo from '../common/Logo';
import { Avatar } from '../ui';
import {
  LayoutDashboard,
  GraduationCap,
  CreditCard,
  User,
  BookOpen,
  Bell,
  Download,
  Users,
  ClipboardList,
  MessageSquare,
  FileBarChart,
  School,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';
import './layout.css';

// Menu configuration based on user roles
const MENU_ITEMS = {
  student: [
    { label: 'Dashboard', path: '/student', icon: LayoutDashboard },
    { label: 'Results', path: '/student/results', icon: GraduationCap },
    { label: 'Fee Payments', path: '/student/fees', icon: CreditCard },
    { label: 'Profile', path: '/student/profile', icon: User },
    { label: 'Course Registration', path: '/student/courses', icon: BookOpen },
    { label: 'Notifications', path: '/student/notifications', icon: Bell },
    { label: 'Documents & Downloads', path: '/student/documents', icon: Download },
  ],
  lecturer: [
    { label: 'Dashboard', path: '/lecturer', icon: LayoutDashboard },
    { label: 'Student Records', path: '/lecturer/students', icon: Users },
    { label: 'Result Management', path: '/lecturer/results', icon: GraduationCap },
    { label: 'Course Management', path: '/lecturer/courses', icon: BookOpen },
    { label: 'Attendance', path: '/lecturer/attendance', icon: ClipboardList },
    { label: 'Announcements', path: '/lecturer/announcements', icon: MessageSquare },
    { label: 'Reports', path: '/lecturer/reports', icon: FileBarChart },
  ],
  admin: [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Student Management', path: '/admin/students', icon: Users },
    { label: 'Faculty & Department', path: '/admin/faculties', icon: School },
    { label: 'Finance Management', path: '/admin/finance', icon: DollarSign },
    { label: 'Academic Management', path: '/admin/academic', icon: BookOpen },
    { label: 'User Management', path: '/admin/users', icon: User },
    { label: 'Reports & Analytics', path: '/admin/reports', icon: FileBarChart },
  ],
};

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const { user, logout } = useAuth();
  
  if (!user) return null;
  const menuItems = MENU_ITEMS[user.role] || [];

  return (
    <aside className={`sidebar ${isCollapsed ? 'sidebar-collapsed' : ''} no-print`}>
      <div className="sidebar-header">
        {!isCollapsed ? (
          <Logo light size="md" />
        ) : (
          <div className="flex items-center justify-center w-full">
            <img src="/havilla-logo.png" alt="HU" style={{ width: 28, height: 28 }} />
          </div>
        )}
        <button
          className="sidebar-collapse-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === `/${user.role}`}
            className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
            title={isCollapsed ? item.label : undefined}
          >
            <item.icon size={20} />
            {!isCollapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        {isCollapsed ? (
          <button onClick={logout} className="sidebar-link" title="Logout" style={{ padding: '8px 0', justifyContent: 'center', width: '100%' }}>
            <LogOut size={20} className="text-error" />
          </button>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="sidebar-profile">
              <Avatar name={`${user.firstName} ${user.lastName}`} size={40} />
              <div className="sidebar-profile-info">
                <span className="sidebar-profile-name truncate">{user.firstName} {user.lastName}</span>
                <span className="sidebar-profile-role">{user.role}</span>
              </div>
            </div>
            <button
              onClick={logout}
              className="sidebar-link"
              style={{ color: 'var(--color-error-light)', padding: 'var(--space-2) var(--space-3)' }}
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
