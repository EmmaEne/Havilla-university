import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Logo from '../common/Logo';
import { X, LogOut } from 'lucide-react';
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
  DollarSign
} from 'lucide-react';
import './layout.css';

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

export default function MobileDrawer({ isOpen, onClose }) {
  const { user, logout } = useAuth();

  if (!user) return null;
  const menuItems = MENU_ITEMS[user.role] || [];

  return (
    <>
      {isOpen && <div className="mobile-drawer-overlay no-print" onClick={onClose} />}
      <div className={`mobile-drawer no-print ${isOpen ? 'mobile-drawer-open' : ''}`}>
        <div className="mobile-drawer-header">
          <Logo light size="md" />
          <button
            className="mobile-drawer-close-btn"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="mobile-drawer-nav">
          {menuItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === `/${user.role}`}
              className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
              onClick={onClose}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button
            onClick={() => {
              onClose();
              logout();
            }}
            className="sidebar-link"
            style={{ color: 'var(--color-error-light)', width: '100%' }}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
