import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import Logo from '../../components/common/Logo';
import ThemeToggle from '../../components/common/ThemeToggle';
import { Input, Button } from '../../components/ui';
import { User, Lock, Mail, ArrowRight } from 'lucide-react';
import './LoginPage.css';

export default function LoginPage() {
  const [activeRole, setActiveRole] = useState('student');
  const [username, setUsername] = useState('STU/2024/001');
  const [password, setPassword] = useState('student123');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const { login } = useAuth();
  const { success, error } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || `/${activeRole}`;

  const handleRoleChange = (role) => {
    setActiveRole(role);
    if (role === 'student') {
      setUsername('STU/2024/001');
      setPassword('student123');
    } else if (role === 'lecturer') {
      setUsername('LEC/001');
      setPassword('lecturer123');
    } else {
      setUsername('admin@havilla.edu');
      setPassword('admin123');
    }
  };

  const handleDemoClick = (role, user, pass) => {
    setActiveRole(role);
    setUsername(user);
    setPassword(pass);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      error('Please enter both username/ID and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const isSuccess = await login(username, password);
      if (isSuccess) {
        success(`Welcome back to Havilla University!`);
        // Navigate to dashboard
        navigate(`/${activeRole}`, { replace: true });
      } else {
        error('Invalid credentials. Check the demo card for correct details.');
      }
    } catch (err) {
      error('Authentication failed. Please check your network.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="absolute" style={{ top: 20, right: 20 }}>
        <ThemeToggle />
      </div>

      <div className="login-card animate-scale-in">
        <div className="login-logo">
          <Logo size="lg" link={false} />
        </div>

        <div className="login-title-group">
          <h2>Havilla Portal</h2>
          <p>Sign in to your dashboard to continue</p>
        </div>

        <div className="auth-role-tabs">
          <button
            className={`auth-role-tab ${activeRole === 'student' ? 'auth-role-tab-active' : ''}`}
            onClick={() => handleRoleChange('student')}
          >
            Student
          </button>
          <button
            className={`auth-role-tab ${activeRole === 'lecturer' ? 'auth-role-tab-active' : ''}`}
            onClick={() => handleRoleChange('lecturer')}
          >
            Lecturer
          </button>
          <button
            className={`auth-role-tab ${activeRole === 'admin' ? 'auth-role-tab-active' : ''}`}
            onClick={() => handleRoleChange('admin')}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <Input
            label={activeRole === 'admin' ? 'Email Address' : 'ID Number / Code'}
            placeholder={activeRole === 'admin' ? 'admin@havilla.edu' : activeRole === 'lecturer' ? 'LEC/001' : 'STU/2024/001'}
            icon={activeRole === 'admin' ? Mail : User}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={isSubmitting}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isSubmitting}
          />

          <div className="login-actions">
            <label className="login-remember" htmlFor="remember-me">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <a href="#" className="login-forgot-link" onClick={(e) => { e.preventDefault(); success('Password reset email simulated!'); }}>
              Forgot Password?
            </a>
          </div>

          <Button
            type="submit"
            variant={activeRole === 'admin' ? 'primary' : activeRole === 'lecturer' ? 'outline' : 'accent'}
            fullWidth
            loading={isSubmitting}
            icon={ArrowRight}
            iconPosition="right"
          >
            Sign In
          </Button>
        </form>

        <div className="demo-credentials-card">
          <div className="demo-credentials-title">Demo Access Credentials</div>
          <div className="demo-credentials-list">
            <div
              className={`demo-credential-item ${activeRole === 'student' ? 'bg-hover' : ''}`}
              onClick={() => handleDemoClick('student', 'STU/2024/001', 'student123')}
            >
              <span>Student:</span>
              <span>STU/2024/001 / student123</span>
            </div>
            <div
              className={`demo-credential-item ${activeRole === 'lecturer' ? 'bg-hover' : ''}`}
              onClick={() => handleDemoClick('lecturer', 'LEC/001', 'lecturer123')}
            >
              <span>Lecturer:</span>
              <span>LEC/001 / lecturer123</span>
            </div>
            <div
              className={`demo-credential-item ${activeRole === 'admin' ? 'bg-hover' : ''}`}
              onClick={() => handleDemoClick('admin', 'admin@havilla.edu', 'admin123')}
            >
              <span>Admin:</span>
              <span>admin@havilla.edu / admin123</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
