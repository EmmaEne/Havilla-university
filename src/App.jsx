import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import ToastContainer from './components/common/Toast';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import ForgotPassword from './pages/auth/ForgotPassword';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import Results from './pages/student/Results';
import FeePayment from './pages/student/FeePayment';
import Profile from './pages/student/Profile';
import CourseRegistration from './pages/student/CourseRegistration';
import Notifications from './pages/student/Notifications';
import Documents from './pages/student/Documents';

// Lecturer Pages
import LecturerDashboard from './pages/lecturer/LecturerDashboard';
import StudentRecords from './pages/lecturer/StudentRecords';
import ResultManagement from './pages/lecturer/ResultManagement';
import CourseManagement from './pages/lecturer/CourseManagement';
import Attendance from './pages/lecturer/Attendance';
import Announcements from './pages/lecturer/Announcements';
import Reports from './pages/lecturer/Reports';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentManagement from './pages/admin/StudentManagement';
import FacultyDepartment from './pages/admin/FacultyDepartment';
import FinanceManagement from './pages/admin/FinanceManagement';
import AcademicManagement from './pages/admin/AcademicManagement';
import UserManagement from './pages/admin/UserManagement';
import ReportsAnalytics from './pages/admin/ReportsAnalytics';

export default function App() {
  return (
    <Router>
      <NotificationProvider>
        <AuthProvider>
          <ThemeProvider>
            <Routes>
              {/* Default redirects */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Student Portal (Protected) */}
              <Route path="/student" element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentDashboard />
                </ProtectedRoute>
              } />
              <Route path="/student/results" element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Results />
                </ProtectedRoute>
              } />
              <Route path="/student/fees" element={
                <ProtectedRoute allowedRoles={['student']}>
                  <FeePayment />
                </ProtectedRoute>
              } />
              <Route path="/student/profile" element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/student/courses" element={
                <ProtectedRoute allowedRoles={['student']}>
                  <CourseRegistration />
                </ProtectedRoute>
              } />
              <Route path="/student/notifications" element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Notifications />
                </ProtectedRoute>
              } />
              <Route path="/student/documents" element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Documents />
                </ProtectedRoute>
              } />

              {/* Lecturer Portal (Protected) */}
              <Route path="/lecturer" element={
                <ProtectedRoute allowedRoles={['lecturer']}>
                  <LecturerDashboard />
                </ProtectedRoute>
              } />
              <Route path="/lecturer/students" element={
                <ProtectedRoute allowedRoles={['lecturer']}>
                  <StudentRecords />
                </ProtectedRoute>
              } />
              <Route path="/lecturer/results" element={
                <ProtectedRoute allowedRoles={['lecturer']}>
                  <ResultManagement />
                </ProtectedRoute>
              } />
              <Route path="/lecturer/courses" element={
                <ProtectedRoute allowedRoles={['lecturer']}>
                  <CourseManagement />
                </ProtectedRoute>
              } />
              <Route path="/lecturer/attendance" element={
                <ProtectedRoute allowedRoles={['lecturer']}>
                  <Attendance />
                </ProtectedRoute>
              } />
              <Route path="/lecturer/announcements" element={
                <ProtectedRoute allowedRoles={['lecturer']}>
                  <Announcements />
                </ProtectedRoute>
              } />
              <Route path="/lecturer/reports" element={
                <ProtectedRoute allowedRoles={['lecturer']}>
                  <Reports />
                </ProtectedRoute>
              } />

              {/* Admin Portal (Protected) */}
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/students" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <StudentManagement />
                </ProtectedRoute>
              } />
              <Route path="/admin/faculties" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <FacultyDepartment />
                </ProtectedRoute>
              } />
              <Route path="/admin/finance" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <FinanceManagement />
                </ProtectedRoute>
              } />
              <Route path="/admin/academic" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AcademicManagement />
                </ProtectedRoute>
              } />
              <Route path="/admin/users" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <UserManagement />
                </ProtectedRoute>
              } />
              <Route path="/admin/reports" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ReportsAnalytics />
                </ProtectedRoute>
              } />

              {/* Catch all redirect to login */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>

            {/* Notification container */}
            <ToastContainer />
          </ThemeProvider>
        </AuthProvider>
      </NotificationProvider>
    </Router>
  );
}
