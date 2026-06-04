import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/common/Logo';
import ThemeToggle from '../../components/common/ThemeToggle';
import { Input, Button } from '../../components/ui';
import { Mail, ArrowLeft } from 'lucide-react';
import { useNotification } from '../../contexts/NotificationContext';
import './LoginPage.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { success, error } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      error('Please enter your email address.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      success('If your account exists, a password reset link has been sent.');
      setIsSubmitting(false);
      navigate('/login');
    }, 1500);
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
          <h2>Reset Password</h2>
          <p>Enter your email to receive recovery instructions</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <Input
            label="Recovery Email Address"
            placeholder="name@havilla.edu"
            icon={Mail}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={isSubmitting}
          >
            Send Recovery Email
          </Button>

          <Button
            type="button"
            variant="ghost"
            fullWidth
            icon={ArrowLeft}
            onClick={() => navigate('/login')}
          >
            Back to Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
