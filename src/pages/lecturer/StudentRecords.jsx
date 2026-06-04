import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card, CardHeader, SearchBar, Select, DataTable, Button, Modal, Badge } from '../../components/ui';
import { students } from '../../data/students';
import { courses } from '../../data/courses';
import { Users, Eye, Mail, Phone, Award } from 'lucide-react';
import { formatGPA } from '../../utils/formatters';

export default function StudentRecords() {
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Filter students
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

  const handleOpenDetail = (student) => {
    setSelectedStudent(student);
    setIsDetailModalOpen(true);
  };

  const columns = [
    { key: 'matricNo', label: 'Matric No', width: '150px', render: (val) => <span className="font-semibold">{val}</span> },
    { key: 'name', label: 'Name', render: (_, row) => <span>{row.firstName} {row.lastName}</span> },
    { key: 'level', label: 'Level', width: '100px', render: (val) => <span>{val} L</span> },
    { key: 'department', label: 'Department' },
    { key: 'cgpa', label: 'CGPA', width: '100px', render: (val) => <span className="font-bold">{formatGPA(val)}</span> },
    { key: 'status', label: 'Status', width: '120px', render: (val) => (
      <Badge variant={val === 'Active' ? 'success' : 'warning'}>{val}</Badge>
    )},
    { key: 'actions', label: '', width: '80px', render: (_, row) => (
      <Button variant="ghost" size="sm" icon={Eye} onClick={() => handleOpenDetail(row)}>
        View
      </Button>
    )},
  ];

  return (
    <DashboardLayout title="Student Academic Records">
      <div className="flex flex-col gap-6">

        {/* Filters Header */}
        <Card>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search by name or matric number..."
              className="max-width-none"
              style={{ maxWidth: '400px' }}
            />
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Select
                placeholder="All Levels"
                options={levelOptions}
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="mb-0"
                style={{ width: '160px', height: '40px' }}
              />
            </div>
          </div>
        </Card>

        {/* Students Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="text-primary-color" />
              <h3 className="heading-3">Enrolled Student Registry ({filteredStudents.length})</h3>
            </div>
          </CardHeader>

          <DataTable
            columns={columns}
            data={filteredStudents}
            emptyMessage="No students found matching filters."
          />
        </Card>

        {/* Student Detail Modal */}
        <Modal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          title="Student Dossier Details"
        >
          {selectedStudent && (
            <div className="flex flex-col gap-6">
              {/* Header profile */}
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-full bg-tertiary flex-shrink-0" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--color-primary)' }}>
                  <Users size={32} />
                </div>
                <div>
                  <h3 className="heading-3">{selectedStudent.firstName} {selectedStudent.lastName}</h3>
                  <p className="text-xs text-muted">{selectedStudent.matricNo} | Level {selectedStudent.level} | {selectedStudent.programme}</p>
                </div>
              </div>

              {/* Bio details */}
              <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', fontSize: '0.8125rem' }}>
                <div style={{ borderRight: '1px solid var(--divider)', paddingRight: '16px' }}>
                  <h4 className="font-bold text-xs text-primary-color mb-3">Academic Summary</h4>
                  <div className="flex flex-col gap-2">
                    <div>
                      <span className="text-muted block">Faculty</span>
                      <span className="font-semibold">{selectedStudent.faculty}</span>
                    </div>
                    <div>
                      <span className="text-muted block">Department</span>
                      <span className="font-semibold">{selectedStudent.department}</span>
                    </div>
                    <div>
                      <span className="text-muted block">CGPA / GPA</span>
                      <span className="font-bold" style={{ color: 'var(--color-success-dark)' }}>{formatGPA(selectedStudent.cgpa)} / {formatGPA(selectedStudent.gpa)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-xs text-primary-color mb-3">Contact Particulars</h4>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-muted" />
                      <span>{selectedStudent.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-muted" />
                      <span>{selectedStudent.phone}</span>
                    </div>
                    <div>
                      <span className="text-muted block">Address</span>
                      <span className="font-semibold text-xs">{selectedStudent.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 mt-4" style={{ borderTop: '1px solid var(--divider)', paddingTop: '16px' }}>
                <Button variant="outline" size="sm" icon={Mail} onClick={() => window.open(`mailto:${selectedStudent.email}`)}>
                  Email Student
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setIsDetailModalOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </Modal>

      </div>
    </DashboardLayout>
  );
}
