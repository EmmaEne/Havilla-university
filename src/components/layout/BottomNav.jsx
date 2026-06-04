import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  GraduationCap,
  CreditCard,
  User,
  BookOpen,
  ClipboardList,
  Users,
  DollarSign
} from 'lucide-react';
import './layout.css';

// Key bottom nav items (max 5 for mobile friendliness)
const BOTTOM_NAV_ITEMS = {
  student: [
    { label: 'Home', path: '/student', icon: LayoutDashboard },
    { label: 'Results', path: '/student/results', icon: GraduationCap },
    { label: 'Pay Fees', path: '/student/fees', icon: CreditCard },
    { label: 'Courses', path: '/student/courses', icon: BookOpen },
    { label: 'Profile', path: '/student/profile', icon: User },
  ],
  lecturer: [
    { label: 'Home', path: '/lecturer', icon: LayoutDashboard },
    { label: 'Students', path: '/lecturer/students', icon: Users },
    { label: 'Results', path: '/lecturer/results', icon: GraduationCap },
    { label: 'Attendance', path: '/lecturer/attendance', icon: ClipboardList },
    { label: 'Courses', path: '/lecturer/courses', icon: BookOpen },
  ],
  admin: [
    { label: 'Home', path: '/admin', icon: LayoutDashboard },
    { label: 'Students', path: '/admin/students', icon: Users },
    { label: 'Finance', path: '/admin/finance', icon: DollarSign },
    { label: 'Academics', path: '/admin/academic', icon: BookOpen },
    { label: 'Users', path: '/admin/users', icon: User },
  ],
};

export default function BottomNav() {
  const { user } = useAuth();

  if (!user) return null;
  const navItems = BOTTOM_NAV_ITEMS[user.role] || [];

  return (
    <nav className="bottom-nav no-print">
      {navItems.map(item => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === `/${user.role}`}
          className={({ isActive }) => `bottom-nav-item ${isActive ? 'bottom-nav-item-active' : ''}`}
        >
          <item.icon size={22} />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
