import { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import BottomNav from './BottomNav';
import MobileDrawer from './MobileDrawer';
import './layout.css';

export default function DashboardLayout({ children, title = 'Havilla University' }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      {/* Sidebar for Desktop */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      {/* Slide-out Drawer for Mobile */}
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
      />

      {/* Main Content Area */}
      <div className={`dashboard-main ${isSidebarCollapsed ? 'dashboard-main-with-sidebar-collapsed' : 'dashboard-main-with-sidebar'}`}>
        <TopBar
          title={title}
          onOpenDrawer={() => setIsMobileDrawerOpen(true)}
        />
        
        <main className="dashboard-content animate-fade-in">
          {children}
        </main>
      </div>

      {/* Sticky Bottom Tab Bar for Mobile */}
      <BottomNav />
    </div>
  );
}
