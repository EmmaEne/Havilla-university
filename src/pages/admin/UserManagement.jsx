import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card, CardHeader, SearchBar, Select, DataTable, Button, Badge } from '../../components/ui';
import { useNotification } from '../../contexts/NotificationContext';
import { ShieldCheck, UserCheck, ShieldAlert, Key } from 'lucide-react';
import { students } from '../../data/students';
import { lecturers } from '../../data/lecturers';

export default function UserManagement() {
  const { success } = useNotification();
  const [roleFilter, setRoleFilter] = useState('');
  const [search, setSearch] = useState('');

  // Map users list from students, lecturers, and admin
  const allUsers = [
    { id: 'ADM-001', name: 'Prof. Emeka Adeyemi', email: 'admin@havilla.edu', role: 'admin', status: 'Active' },
    ...lecturers.map(l => ({ id: l.id, name: `${l.firstName} ${l.lastName}`, email: l.email, role: 'lecturer', status: l.status })),
    ...students.map(s => ({ id: s.id, name: `${s.firstName} ${s.lastName}`, email: s.email, role: 'student', status: s.status })),
  ];

  const [users, setUsers] = useState(allUsers);

  const handleToggleStatus = (id) => {
    const updated = users.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === 'Active' ? 'Suspended' : 'Active';
        success(`User status changed to ${nextStatus}.`);
        return { ...u, status: nextStatus };
      }
      return u;
    });
    setUsers(updated);
  };

  const handleResetPassword = (email) => {
    success(`Password reset link sent to ${email}`);
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || 
                          u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === '' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const roleOptions = [
    { label: 'System Administrators', value: 'admin' },
    { label: 'Academic Lecturers', value: 'lecturer' },
    { label: 'Undergraduate Students', value: 'student' },
  ];

  const columns = [
    { key: 'id', label: 'User ID', width: '130px', render: (val) => <span className="font-semibold">{val}</span> },
    { key: 'name', label: 'User Full Name' },
    { key: 'email', label: 'User Email Address' },
    { key: 'role', label: 'Role Designation', width: '120px', render: (val) => (
      <Badge variant={val === 'admin' ? 'error' : val === 'lecturer' ? 'outline' : 'primary'}>{val}</Badge>
    )},
    { key: 'status', label: 'Account Status', width: '120px', render: (val) => (
      <Badge variant={val === 'Active' ? 'success' : 'error'}>{val}</Badge>
    )},
    { key: 'actions', label: '', width: '150px', render: (_, row) => (
      <div className="flex gap-2 justify-end">
        <Button variant="ghost" size="sm" icon={Key} onClick={() => handleResetPassword(row.email)} title="Reset Password" />
        <Button
          variant={row.status === 'Active' ? 'ghost' : 'outline'}
          size="sm"
          icon={row.status === 'Active' ? ShieldAlert : ShieldCheck}
          onClick={() => handleToggleStatus(row.id)}
        >
          {row.status === 'Active' ? 'Suspend' : 'Activate'}
        </Button>
      </div>
    )},
  ];

  return (
    <DashboardLayout title="System Access Control & Roles">
      <div className="flex flex-col gap-6">

        {/* Filters Header */}
        <Card>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search user profiles..."
              className="max-width-none"
              style={{ maxWidth: '400px' }}
            />
            <Select
              placeholder="All system roles"
              options={roleOptions}
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="mb-0"
              style={{ width: '180px', height: '40px' }}
            />
          </div>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <UserCheck className="text-primary-color" />
              <h3 className="heading-3">System Access Directory Ledger ({filteredUsers.length} Users)</h3>
            </div>
          </CardHeader>

          <DataTable
            columns={columns}
            data={filteredUsers}
          />
        </Card>

      </div>
    </DashboardLayout>
  );
}
