import { useAuth } from '../../contexts/AuthContext';
import ThemeToggle from '../common/ThemeToggle';
import { Menu, Bell } from 'lucide-react';
import { Avatar } from '../ui';
import './layout.css';

export default function TopBar({ title, onOpenDrawer }) {
  const { user } = useAuth();

  return (
    <header className="topbar no-print">
      <div className="topbar-left">
        <button
          className="topbar-mobile-toggle"
          onClick={onOpenDrawer}
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>
        <h1 className="topbar-title">{title}</h1>
      </div>

      <div className="topbar-right">
        <ThemeToggle />

        <button
          className="notification-bell-btn"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="notification-badge" />
        </button>

        {user && (
          <div className="topbar-user-section">
            <div className="topbar-user-info">
              <span className="topbar-user-name">
                {user.firstName} {user.lastName[0]}.
              </span>
              <span className="topbar-user-id">
                {user.matricNo || user.staffId}
              </span>
            </div>
            <Avatar name={`${user.firstName} ${user.lastName}`} size={34} />
          </div>
        )}
      </div>
    </header>
  );
}
