import { useTheme } from '../../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { Button } from '../ui';

export default function ThemeToggle({ size = 'md', className = '' }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size={size === 'sm' ? 'sm' : 'md'}
      onClick={toggleTheme}
      className={`theme-toggle ${className}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? (
        <Moon size={18} className="text-primary-color" />
      ) : (
        <Sun size={18} className="text-accent-color" />
      )}
    </Button>
  );
}
