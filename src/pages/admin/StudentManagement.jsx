import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card, CardHeader, SearchBar, Select, DataTable, Button, Modal, Input } from '../../components/ui';
import { students as initialStudents } from '../../data/students';
import { departments } from '../../data/departments';
import { faculties } from '../../data/faculties';
import { Users, Plus, Edit, Trash, Eye, Save } from 'lucide-react';
import { formatGPA } from '../../utils/formatters';
import { useNotification } from '../../contexts/NotificationContext';
import { validateForm } from '../../utils/validators';

export default function StudentManagement() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Form inputs state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [level, setLevel] = useState('100');
  const [departmentId, setDepartmentId] = useState('DEP-001');
  const [formErrors, setFormErrors] = useState({});

  const { success, warning, error } = useNotification();

  const handleOpenAdd = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setLevel('100');
    setDepartmentId('DEP-001');
    setFormErrors({});
    setIsAddModalOpen(true);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();

    const rules = {
      firstName: [{ required: true, message: 'First name is required' }],
      lastName: [{ required: true, message: 'Last name is required' }],
      email: [{ required: true, message: 'Email is required' }, { email: true, value: email, message: 'Must be a valid email' }],
    };

    const { isValid, errors } = validateForm(rules);
    if (!isValid) {
      setFormErrors(errors);
      return;
    }

    const selectedDept = departments.find(d => d.id === departmentId);
    const selectedFac = faculties.find(f => f.id === selectedDept.facultyId);

    const newStudent = {
      id: `STU-${Date.now().toString().slice(-3)}`,
      matricNo: `STU/2026/${Math.floor(100 + Math.random() * 900)}`,
      firstName,
      lastName,
      email,
      phone,
      level,
      departmentId,
      department: selectedDept.name,
      faculty: selectedFac.name,
      programme: `B.Sc. ${selectedDept.name}`,
      cgpa: 0.00,
      gpa: 0.00,
      totalCredits: 0,
      status: 'Active',
    };

    setStudents([newStudent, ...students]);
    setIsAddModalOpen(false);
    success(`Registered new student ${firstName} ${lastName}!`);
  };

  const handleOpenEdit = (student) => {
    setSelectedStudent(student);
    setFirstName(student.firstName);
    setLastName(student.lastName);
    setEmail(student.email);
    setPhone(student.phone);
    setLevel(student.level);
    setDepartmentId(student.departmentId || 'DEP-001');
    setFormErrors({});
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    
    const selectedDept = departments.find(d => d.id === departmentId);
    const selectedFac = faculties.find(f => f.id === selectedDept.facultyId);

    const updated = students.map(s => {
      if (s.id === selectedStudent.id) {
        return {
          ...s,
          firstName,
          lastName,
          email,
          phone,
          level,
          departmentId,
          department: selectedDept.name,
          faculty: selectedFac.name,
        };
      }
      return s;
    });

    setStudents(updated);
    setIsEditModalOpen(false);
    success('Student record updated successfully.');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student record?')) {
      setStudents(students.filter(s => s.id !== id));
      success('Student record deleted from databases.');
    }
  };

  const filteredStudents = students.filter(stu => {
    const nameMatch = `${stu.firstName} ${stu.lastName}`.toLowerCase().includes(search.toLowerCase()) || 
                      stu.matricNo.toLowerCase().includes(search.toLowerCase());
    const levelMatch = levelFilter === '' || stu.level === levelFilter;
    return nameMatch && levelMatch;
  });

  const levelOptions = [
    { label: '100 Level', value: '100' },
    { label: '200 Level', value: '200' },
    { label: '300 Level', value: '300' },
    { label: '400 Level', value: '400' },
  ];

  const deptOptions = departments.map(d => ({ label: d.name, value: d.id }));

  const columns = [
    { key: 'matricNo', label: 'Matric No', width: '130px', render: (val) => <span className="font-semibold">{val}</span> },
    { key: 'name', label: 'Student Name', render: (_, row) => <span>{row.firstName} {row.lastName}</span> },
    { key: 'level', label: 'Level', width: '80px', render: (val) => <span>{val} L</span> },
    { key: 'department', label: 'Department' },
    { key: 'cgpa', label: 'CGPA', width: '80px', render: (val) => <span className="font-bold">{formatGPA(val)}</span> },
    { key: 'status', label: 'Status', width: '100px', render: (val) => (
      <Badge variant={val === 'Active' ? 'success' : 'warning'}>{val}</Badge>
    )},
    { key: 'actions', label: '', width: '120px', render: (_, row) => (
      <div className="flex gap-1 justify-end">
        <Button variant="ghost" size="sm" icon={Edit} onClick={() => handleOpenEdit(row)} />
        <Button variant="ghost" size="sm" icon={Trash} onClick={() => handleDelete(row.id)} />
      </div>
    )},
  ];

  return (
    <DashboardLayout title="Student Records Management">
      <div className="flex flex-col gap-6">

        {/* Action Header */}
        <Card>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search students..."
              className="max-width-none"
              style={{ maxWidth: '400px' }}
            />
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <Select
                placeholder="All Levels"
                options={levelOptions}
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="mb-0"
                style={{ width: '150px', height: '40px' }}
              />
              <Button variant="primary" size="sm" icon={Plus} onClick={handleOpenAdd}>
                Register Student
              </Button>
            </div>
          </div>
        </Card>

        {/* Students Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="text-primary-color" />
              <h3 className="heading-3">Student Ledger Directory ({filteredStudents.length} Records)</h3>
            </div>
          </CardHeader>

          <DataTable
            columns={columns}
            data={filteredStudents}
          />
        </Card>

        {/* Add Student Modal */}
        <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Register New Student">
          <form onSubmit={handleAddSubmit} className="flex flex-col gap-4">
            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
              <Input
                label="First Name"
                placeholder="Adebayo"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                error={formErrors.firstName}
                required
              />
              <Input
                label="Last Name"
                placeholder="Oluwaseun"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                error={formErrors.lastName}
                required
              />
            </div>

            <Input
              label="Email Address"
              type="email"
              placeholder="student@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={formErrors.email}
              required
            />

            <Input
              label="Phone Number"
              placeholder="+234..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
              <Select
                label="Level"
                options={levelOptions}
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              />
              <Select
                label="Department"
                options={deptOptions}
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <Button type="button" variant="ghost" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Register Student
              </Button>
            </div>
          </form>
        </Modal>

        {/* Edit Student Modal */}
        <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Student Record">
          <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
              <Input
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <Input
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
              <Select
                label="Level"
                options={levelOptions}
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              />
              <Select
                label="Department"
                options={deptOptions}
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <Button type="button" variant="ghost" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save Changes
              </Button>
            </div>
          </form>
        </Modal>

      </div>
    </DashboardLayout>
  );
}
