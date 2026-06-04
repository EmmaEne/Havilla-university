import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card, CardHeader, Input, Select, Button, Badge } from '../../components/ui';
import { MessageSquare, Calendar, Send, ShieldAlert, Sparkles } from 'lucide-react';
import { announcements } from '../../data/announcements';
import { useNotification } from '../../contexts/NotificationContext';
import { formatDate } from '../../utils/formatters';

export default function Announcements() {
  const [list, setList] = useState(announcements.filter(a => a.author.includes('Computer Science') || a.author === 'Office of the Registrar'));
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('academic');
  const [priority, setPriority] = useState('medium');
  const [body, setBody] = useState('');

  const { success, error } = useNotification();

  const handlePost = (e) => {
    e.preventDefault();
    if (!title || !body) {
      error('Please provide a title and announcement message details.');
      return;
    }

    const newAnn = {
      id: `ANN-${Date.now().toString().slice(-3)}`,
      title,
      body,
      category,
      priority,
      author: 'Dr. Nkechi Okonkwo (HOD CSC)',
      targetRole: 'student',
      date: new Date().toISOString(),
      read: false,
    };

    setList([newAnn, ...list]);
    
    // Clear inputs
    setTitle('');
    setBody('');

    success('Class announcement published to the Student Portal notifications feed!');
  };

  const categoryOptions = [
    { label: 'Academic Announcements', value: 'academic' },
    { label: 'Department Announcements', value: 'department' },
    { label: 'General Updates', value: 'general' },
  ];

  const priorityOptions = [
    { label: 'High Priority', value: 'high' },
    { label: 'Medium Priority', value: 'medium' },
    { label: 'Low Priority', value: 'low' },
  ];

  return (
    <DashboardLayout title="Course Announcements">
      <div className="flex flex-col gap-6">

        <div className="content-grid">
          {/* Create Announcement */}
          <div className="col-span-5 flex flex-col gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MessageSquare className="text-primary-color" />
                  <h3 className="heading-3">Publish New Announcement</h3>
                </div>
              </CardHeader>

              <form onSubmit={handlePost} className="flex flex-col gap-4">
                <Input
                  label="Announcement Title"
                  placeholder="e.g. Mid-semester Quiz dates rescheduled"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />

                <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                  <Select
                    label="Notice Category"
                    options={categoryOptions}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <Select
                    label="Urgency Priority"
                    options={priorityOptions}
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Notice Message Details</label>
                  <textarea
                    rows={4}
                    className="form-input"
                    style={{ height: 'auto', padding: '12px' }}
                    placeholder="Enter the announcement instructions..."
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" variant="accent" icon={Send}>
                  Publish Announcement
                </Button>
              </form>
            </Card>
          </div>

          {/* Past Announcements */}
          <div className="col-span-7 flex flex-col gap-4">
            <h3 className="heading-3 flex items-center gap-2">
              <Calendar size={18} className="text-primary-color" /> Published Notice Board History
            </h3>

            {list.map(item => (
              <Card
                key={item.id}
                className="stagger-1"
                style={{
                  borderLeft: item.priority === 'high' ? '4px solid var(--color-error)' : 
                              item.priority === 'medium' ? '4px solid var(--color-accent)' : 
                              '4px solid var(--border-color)',
                  padding: 'var(--space-4)'
                }}
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-bold text-sm text-primary-color">{item.title}</span>
                      <Badge variant={item.category === 'academic' ? 'primary' : 'default'} size="xs">{item.category}</Badge>
                    </div>
                    <p className="text-xs text-secondary mb-3">{item.body}</p>
                    <div className="flex gap-4 text-muted text-overline" style={{ fontSize: '9px' }}>
                      <span>Author: {item.author}</span>
                      <span>•</span>
                      <span>Published: {formatDate(item.date)}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
