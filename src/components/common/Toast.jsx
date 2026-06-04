import { useNotification } from '../../contexts/NotificationContext';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import './toast.css';

const ICON_MAP = {
  success: { icon: CheckCircle, className: 'toast-icon-success' },
  error: { icon: AlertCircle, className: 'toast-icon-error' },
  warning: { icon: AlertTriangle, className: 'toast-icon-warning' },
  info: { icon: Info, className: 'toast-icon-info' },
};

export default function ToastContainer() {
  const { toasts, removeToast } = useNotification();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container no-print">
      {toasts.map(toast => {
        const item = ICON_MAP[toast.type] || ICON_MAP.info;
        const Icon = item.icon;

        return (
          <div key={toast.id} className={`toast toast-${toast.type} animate-slide-in-right`}>
            <Icon size={18} className={`toast-icon ${item.className}`} />
            <div className="toast-message">{toast.message}</div>
            <button
              className="toast-close-btn"
              onClick={() => removeToast(toast.id)}
              aria-label="Dismiss toast"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
