import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card, CardHeader, Select, Button, DataTable, Badge, Modal, Input } from '../../components/ui';
import { Award, Edit3, Save, CheckCircle2, ChevronRight, FileUp, AlertTriangle } from 'lucide-react';
import { courseResults } from '../../data/results';
import { scoreToGrade } from '../../utils/grading';
import { useNotification } from '../../contexts/NotificationContext';

export default function ResultManagement() {
  const [selectedCourse, setSelectedCourse] = useState('CSC301');
  const [gradesData, setGradesData] = useState(courseResults[selectedCourse]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  // Grade Input Form states
  const [ca1, setCa1] = useState(0);
  const [ca2, setCa2] = useState(0);
  const [exam, setExam] = useState(0);

  const { success, warning, error } = useNotification();

  const handleCourseChange = (courseCode) => {
    setSelectedCourse(courseCode);
    setGradesData(courseResults[courseCode]);
  };

  const handleOpenEdit = (student) => {
    setSelectedStudent(student);
    setCa1(student.ca1);
    setCa2(student.ca2);
    setExam(student.exam);
    setIsEditModalOpen(true);
  };

  const handleSaveGrades = (e) => {
    e.preventDefault();
    if (ca1 < 0 || ca1 > 20 || ca2 < 0 || ca2 > 10 || exam < 0 || exam > 70) {
      warning('Grades exceed standard bounds! (CA1: 20 max, CA2: 10 max, Exam: 70 max)');
      return;
    }

    const updatedResults = gradesData.results.map(r => {
      if (r.studentId === selectedStudent.studentId) {
        return {
          ...r,
          ca1: Number(ca1),
          ca2: Number(ca2),
          exam: Number(exam),
          total: Number(ca1) + Number(ca2) + Number(exam),
        };
      }
      return r;
    });

    setGradesData({
      ...gradesData,
      results: updatedResults,
    });

    // Update global dataset simulation
    courseResults[selectedCourse].results = updatedResults;

    setIsEditModalOpen(false);
    success(`Updated grades for ${selectedStudent.studentName}`);
  };

  const handlePublishResults = () => {
    setGradesData({
      ...gradesData,
      status: 'Published',
    });
    courseResults[selectedCourse].status = 'Published';
    success(`Academic results sheet for ${selectedCourse} has been officially published!`);
  };

  const courseOptions = [
    { label: 'CSC301 - Database Management Systems', value: 'CSC301' },
    { label: 'CSC302 - Operating Systems', value: 'CSC302' },
  ];

  const columns = [
    { key: 'matricNo', label: 'Matric Number', width: '150px', render: (val) => <span className="font-semibold">{val}</span> },
    { key: 'studentName', label: 'Student Name' },
    { key: 'ca1', label: 'CA 1 (20)', width: '80px' },
    { key: 'ca2', label: 'CA 2 (10)', width: '80px' },
    { key: 'exam', label: 'Exam (70)', width: '80px' },
    { key: 'total', label: 'Total (100)', width: '90px', render: (val) => <span className="font-bold">{val}</span> },
    { key: 'grade', label: 'Grade', width: '80px', render: (_, row) => {
      const gradeObj = scoreToGrade(row.total);
      return (
        <span className="font-extrabold" style={{
          color: gradeObj.grade === 'A' ? 'var(--color-success)' :
                 gradeObj.grade === 'B' ? 'var(--color-info)' :
                 gradeObj.grade === 'F' ? 'var(--color-error)' : 'var(--text-primary)'
        }}>{gradeObj.grade}</span>
      );
    }},
    { key: 'actions', label: '', width: '80px', render: (_, row) => gradesData.status !== 'Published' && (
      <Button variant="ghost" size="sm" icon={Edit3} onClick={() => handleOpenEdit(row)}>
        Edit
      </Button>
    )},
  ];

  return (
    <DashboardLayout title="Result & Grade Management">
      <div className="flex flex-col gap-6">

        {/* Header options controls */}
        <Card>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <span className="text-sm font-semibold text-muted">ACTIVE CLASS:</span>
              <Select
                options={courseOptions}
                value={selectedCourse}
                onChange={(e) => handleCourseChange(e.target.value)}
                className="mb-0"
                style={{ width: '320px', height: '40px' }}
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              {gradesData.status !== 'Published' ? (
                <>
                  <Button variant="ghost" size="sm" icon={FileUp} onClick={() => success('CSV marksheet template uploaded!')}>
                    Bulk Upload CSV
                  </Button>
                  <Button variant="accent" size="sm" icon={Save} onClick={handlePublishResults}>
                    Publish Grades Sheet
                  </Button>
                </>
              ) : (
                <Badge variant="success" size="md" dot>Grade Sheet Locked & Published</Badge>
              )}
            </div>
          </div>
        </Card>

        {/* Student Marks Ledger */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-2">
                <Award className="text-primary-color" />
                <h3 className="heading-3">Student Grades Sheets ({gradesData.results.length} Enrolled)</h3>
              </div>
              <Badge variant={gradesData.status === 'Published' ? 'success' : 'warning'}>
                {gradesData.status}
              </Badge>
            </div>
          </CardHeader>

          <DataTable
            columns={columns}
            data={gradesData.results}
          />
        </Card>

        {/* Single Grade Edit Modal */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Update Course Marks"
        >
          {selectedStudent && (
            <form onSubmit={handleSaveGrades} className="flex flex-col gap-4">
              <div className="p-3 rounded mb-2" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                <span className="text-xs text-muted block">Student</span>
                <span className="font-bold text-sm text-primary-color">{selectedStudent.studentName} ({selectedStudent.matricNo})</span>
              </div>

              <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-3)' }}>
                <Input
                  label="CA 1 (Max 20)"
                  type="number"
                  min="0"
                  max="20"
                  value={ca1}
                  onChange={(e) => setCa1(e.target.value)}
                  required
                />
                <Input
                  label="CA 2 (Max 10)"
                  type="number"
                  min="0"
                  max="10"
                  value={ca2}
                  onChange={(e) => setCa2(e.target.value)}
                  required
                />
                <Input
                  label="Exam (Max 70)"
                  type="number"
                  min="0"
                  max="70"
                  value={exam}
                  onChange={(e) => setExam(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-between items-center p-3 rounded" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                <span className="text-xs font-semibold">Projected Total Score:</span>
                <span className="font-extrabold text-md" style={{ color: 'var(--color-primary)' }}>
                  {Number(ca1) + Number(ca2) + Number(exam)} / 100
                </span>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <Button type="button" variant="ghost" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Save Grades
                </Button>
              </div>
            </form>
          )}
        </Modal>

      </div>
    </DashboardLayout>
  );
}
