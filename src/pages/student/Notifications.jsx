import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card, CardHeader, Badge, Button, SearchBar, Tabs } from '../../components/ui';
import { Bell, Mail, Eye, Calendar, Sparkles, Filter, ShieldAlert } from 'lucide-react';
import { announcements } from '../../data/announcements';
import { formatDateTime } from '../../utils/formatters';
import { useNotification } from '../../contexts/NotificationContext';

export default function Notifications() {
  const { success } = useNotification();
  const [list, setList] = useState(announcements.filter(a => a.targetRole === 'student' || a.targetRole === 'all'));
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const handleMarkAsRead = (id) => {
    setList(list.map(item => item.id === id ? { ...item, read: true } : item));
    success('Notification marked as read.');
  };

  const handleMarkAllRead = () => {
    setList(list.map(item => ({ ...item, read: true })));
    success('All notifications marked as read.');
  };

  // Filter items
  const filtered = list.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          item.body.toLowerCase().includes(search.toLowerCase());
    
    if (activeTab === 'unread') return matchesSearch && !item.read;
    if (activeTab === 'academic') return matchesSearch && item.category === 'academic';
    if (activeTab === 'fee') return matchesSearch && item.category === 'fee';
    return matchesSearch;
  });

  const tabOptions = [
    { id: 'all', label: 'All Alerts', count: list.length },
    { id: 'unread', label: 'Unread Only', count: list.filter(a => !a.read).length },
    { id: 'academic', label: 'Academic Alerts', count: list.filter(a => a.category === 'academic').length },
    { id: 'fee', label: 'Finance & Fees', count: list.filter(a => a.category === 'fee').length },
  ];

  return (
    <DashboardLayout title="Announcement & Notifications">
      <div className="flex flex-col gap-6">

        {/* Filters Header card */}
        <Card>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search announcements..."
              className="max-width-none"
              style={{ maxWidth: '400px' }}
            />
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleMarkAllRead}>
                Mark all as read
              </Button>
            </div>
          </div>
        </Card>

        {/* Notification Tabs & Contents */}
        <div className="content-grid">
          <div className="col-span-12 flex flex-col gap-4">
            <Tabs
              tabs={tabOptions}
              activeTab={activeTab}
              onChange={setActiveTab}
            />

            <div className="flex flex-col gap-3">
              {filtered.length === 0 ? (
                <div className="text-center p-12 border rounded bg-card" style={{ borderColor: 'var(--border-color)' }}>
                  <Bell size={48} className="text-muted mx-auto mb-2" />
                  <p className="font-semibold text-secondary">No notifications found</p>
                  <p className="text-xs text-muted mt-1">Check back later for university updates.</p>
                </div>
              ) : (
                filtered.map(item => (
                  <Card
                    key={item.id}
                    className={`border-left-accent ${!item.read ? 'border-primary' : ''}`}
                    style={{
                      borderLeft: item.priority === 'high' ? '4px solid var(--color-error)' : 
                                  item.priority === 'medium' ? '4px solid var(--color-accent)' : 
                                  '4px solid var(--border-color)',
                      backgroundColor: !item.read ? 'var(--bg-glass)' : 'var(--bg-card)',
                      padding: 'var(--space-4)'
                    }}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-sm text-primary-color" style={{ color: 'var(--text-primary)' }}>
                            {item.title}
                          </span>
                          {!item.read && <Badge variant="primary" size="xs">New</Badge>}
                          {item.priority === 'high' && <Badge variant="error" size="xs">Urgent</Badge>}
                        </div>
                        <p className="text-xs text-secondary mt-1">{item.body}</p>
                        <div className="flex items-center gap-4 text-muted text-overline mt-2" style={{ fontSize: '9px' }}>
                          <span>Sender: {item.author}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Calendar size={10} /> {formatDateTime(item.date)}</span>
                        </div>
                      </div>
                      
                      {!item.read && (
                        <Button variant="ghost" size="sm" icon={Eye} onClick={() => handleMarkAsRead(item.id)}>
                          Read
                        </Button>
                      )}
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
