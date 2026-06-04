import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card, CardHeader, Select, Button, DataTable, Badge, Toggle } from '../../components/ui';
import LineChart from '../../components/charts/LineChart';
import { ClipboardList, CheckCircle, Calendar, Save, Award } from 'lucide-react';
import { attendanceRecords, attendanceAnalytics } from '../../data/attendance';
import { students } from '../../data/students';
import { useNotification } from '../../contexts/NotificationContext';
import { formatDate } from '../../utils/formatters';

export default function Attendance() {
  const [selectedCourse, setSelectedCourse] = useState('CSC301');
  const [history, setHistory] = useState(attendanceRecords.filter(r => r.courseCode === selectedCourse));
  
  // Attendance taker state
  const classStudents = students.filter(s => s.departmentId === 'DEP-001' && s.level === '300');
  const [attendanceList, setAttendanceList] = useState(
    classStudents.map(s => ({
      studentId: s.id,
      matricNo: s.matricNo,
      name: `${s.firstName} ${s.lastName}`,
      present: true
    }))
  );

  const { success } = useNotification();

  const handleTogglePresent = (id, val) => {
    setAttendanceList(
      attendanceList.map(a => a.studentId === id ? { ...a, present: val } : a)
    );
  };

  const handleSaveAttendance = () => {
    const presentCount = attendanceList.filter(a => a.present).length;
    const newRecord = {
      id: `ATT-${Date.now().toString().slice(-3)}`,
      courseCode: selectedCourse,
      courseTitle: selectedCourse === 'CSC301' ? 'Database Management Systems' : 'Operating Systems',
      date: new Date().toISOString().split('T')[0],
      totalStudents: attendanceList.length,
      present: presentCount,
      absent: attendanceList.length - presentCount,
      records: attendanceList,
    };

    setHistory([newRecord, ...history]);
    success(`Attendance successfully recorded! ${presentCount}/${attendanceList.length} students marked present.`);
  };

  const courseOptions = [
    { label: 'CSC301 - Database Management Systems', value: 'CSC301' },
    { label: 'CSC302 - Operating Systems', value: 'CSC302' },
  ];

  const columns = [
    { key: 'matricNo', label: 'Matric Number', width: '150px' },
    { key: 'name', label: 'Student Name' },
    { key: 'present', label: 'Attendance Status', width: '150px', render: (val, row) => (
      <Toggle checked={val} onChange={(newVal) => handleTogglePresent(row.studentId, newVal)} label={val ? 'Present' : 'Absent'} />
    )},
  ];

  const historyColumns = [
    { key: 'date', label: 'Session Date', render: (val) => formatDate(val) },
    { key: 'totalStudents', label: 'Enrolled Class' },
    { key: 'present', label: 'Present Count', render: (val) => <span className="text-success font-semibold">{val}</span> },
    { key: 'absent', label: 'Absent Count', render: (val) => <span className="text-error font-semibold">{val}</span> },
    { key: 'rate', label: 'Attendance Rate', render: (_, row) => (
      <span className="font-bold">{Math.round((row.present / row.totalStudents) * 100)}%</span>
    )},
  ];

  return (
    <DashboardLayout title="Class Attendance Tracker">
      <div className="flex flex-col gap-6">

        {/* Analytics line trend */}
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)' }}>
          <Card className="col-span-2">
            <span className="text-overline">Attendance Rate Analytics Trend</span>
            <LineChart
              data={attendanceAnalytics}
              dataKey="rate"
              xKey="week"
              color="var(--color-primary)"
              height={140}
              name="Attendance Rate (%)"
            />
          </Card>

          <Card className="flex flex-col justify-center items-center text-center p-6">
            <span className="text-overline">Monthly Average</span>
            <h2 className="heading-1" style={{ fontSize: '3rem', color: 'var(--color-primary)', margin: '8px 0' }}>
              91.4%
            </h2>
            <span className="text-xs text-muted">Across 5 course units</span>
          </Card>
        </div>

        <div className="content-grid">
          {/* Mark Attendance */}
          <div className="col-span-7 flex flex-col gap-6">
            <Card>
              <CardHeader action={
                <Button variant="accent" size="sm" icon={Save} onClick={handleSaveAttendance}>
                  Save Attendance
                </Button>
              }>
                <div className="flex items-center gap-2">
                  <ClipboardList className="text-primary-color" />
                  <h3 className="heading-3">Mark Daily Attendance Sheet</h3>
                </div>
              </CardHeader>

              <div className="mb-4">
                <Select
                  options={courseOptions}
                  value={selectedCourse}
                  onChange={(e) => {
                    setSelectedCourse(e.target.value);
                    setHistory(attendanceRecords.filter(r => r.courseCode === e.target.value));
                  }}
                  className="mb-0"
                  style={{ width: '320px', height: '40px' }}
                />
              </div>

              <DataTable
                columns={columns}
                data={attendanceList}
              />
            </Card>
          </div>

          {/* Attendance logs history */}
          <div className="col-span-5 flex flex-col gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Calendar className="text-primary-color" />
                  <h3 className="heading-3">Attendance History Log</h3>
                </div>
              </CardHeader>

              <DataTable
                columns={historyColumns}
                data={history}
              />
            </Card>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
