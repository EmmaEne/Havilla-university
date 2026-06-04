import './ui-components.css';

export function Button({ children, variant = 'primary', size = 'md', fullWidth = false, loading = false, disabled = false, icon: Icon, iconPosition = 'left', className = '', ...props }) {
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''} ${loading ? 'btn-loading' : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="btn-spinner" />}
      {Icon && iconPosition === 'left' && !loading && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
      {children && <span>{children}</span>}
      {Icon && iconPosition === 'right' && !loading && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
    </button>
  );
}

export function Card({ children, className = '', padding = true, hover = false, onClick, ...props }) {
  return (
    <div
      className={`card ${padding ? 'card-padded' : ''} ${hover ? 'card-hover' : ''} ${onClick ? 'card-clickable' : ''} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', action }) {
  return (
    <div className={`card-header ${className}`}>
      <div className="card-header-content">{children}</div>
      {action && <div className="card-header-action">{action}</div>}
    </div>
  );
}

export function Input({ label, error, icon: Icon, className = '', id, ...props }) {
  const inputId = id || `input-${label?.replace(/\s/g, '-').toLowerCase()}`;
  return (
    <div className={`form-group ${error ? 'form-error' : ''} ${className}`}>
      {label && <label htmlFor={inputId} className="form-label">{label}</label>}
      <div className="input-wrapper">
        {Icon && <Icon className="input-icon" size={18} />}
        <input id={inputId} className={`form-input ${Icon ? 'input-with-icon' : ''}`} {...props} />
      </div>
      {error && <span className="form-error-text">{error}</span>}
    </div>
  );
}

export function Select({ label, error, options = [], className = '', id, placeholder, ...props }) {
  const selectId = id || `select-${label?.replace(/\s/g, '-').toLowerCase()}`;
  return (
    <div className={`form-group ${error ? 'form-error' : ''} ${className}`}>
      {label && <label htmlFor={selectId} className="form-label">{label}</label>}
      <select id={selectId} className="form-select" {...props}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <span className="form-error-text">{error}</span>}
    </div>
  );
}

export function Badge({ children, variant = 'default', size = 'sm', dot = false, className = '' }) {
  return (
    <span className={`badge badge-${variant} badge-${size} ${className}`}>
      {dot && <span className="badge-dot" />}
      {children}
    </span>
  );
}

export function Avatar({ src, name = '', size = 40, className = '' }) {
  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  return (
    <div className={`avatar ${className}`} style={{ width: size, height: size, fontSize: size * 0.38 }}>
      {src ? <img src={src} alt={name} /> : <span>{initials}</span>}
    </div>
  );
}

export function Skeleton({ width, height = 20, variant = 'text', className = '' }) {
  return (
    <div
      className={`skeleton skeleton-${variant} ${className}`}
      style={{ width: width || '100%', height: variant === 'circle' ? width : height }}
    />
  );
}

export function EmptyState({ icon: Icon, title, description, action, className = '' }) {
  return (
    <div className={`empty-state ${className}`}>
      {Icon && <div className="empty-state-icon"><Icon size={48} /></div>}
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {action && <div className="empty-state-action">{action}</div>}
    </div>
  );
}

export function Modal({ isOpen, onClose, title, children, size = 'md', footer }) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal modal-${size} animate-scale-in`} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">&times;</button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

export function Tabs({ tabs, activeTab, onChange, className = '' }) {
  return (
    <div className={`tabs ${className}`}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab ${activeTab === tab.id ? 'tab-active' : ''}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.icon && <tab.icon size={16} />}
          <span>{tab.label}</span>
          {tab.count !== undefined && <span className="tab-count">{tab.count}</span>}
        </button>
      ))}
    </div>
  );
}

export function ProgressBar({ value, max = 100, label, showValue = true, variant = 'primary', size = 'md' }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={`progress-container progress-${size}`}>
      {(label || showValue) && (
        <div className="progress-header">
          {label && <span className="progress-label">{label}</span>}
          {showValue && <span className="progress-value">{Math.round(pct)}%</span>}
        </div>
      )}
      <div className="progress-track">
        <div className={`progress-fill progress-${variant}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function Toggle({ checked, onChange, label, id }) {
  const toggleId = id || `toggle-${label?.replace(/\s/g, '-').toLowerCase()}`;
  return (
    <label className="toggle-wrapper" htmlFor={toggleId}>
      <div className={`toggle ${checked ? 'toggle-active' : ''}`} onClick={() => onChange(!checked)}>
        <div className="toggle-knob" />
      </div>
      {label && <span className="toggle-label">{label}</span>}
      <input type="checkbox" id={toggleId} checked={checked} onChange={e => onChange(e.target.checked)} className="sr-only" />
    </label>
  );
}

export function SearchBar({ value, onChange, placeholder = 'Search...', className = '' }) {
  return (
    <div className={`search-bar ${className}`}>
      <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      {value && (
        <button className="search-clear" onClick={() => onChange('')} aria-label="Clear">&times;</button>
      )}
    </div>
  );
}

export function DataTable({ columns, data, onRowClick, emptyMessage = 'No data found', loading = false, className = '' }) {
  if (loading) {
    return (
      <div className={`data-table-wrapper ${className}`}>
        <table className="data-table">
          <thead>
            <tr>{columns.map(col => <th key={col.key}>{col.label}</th>)}</tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>
                {columns.map(col => (
                  <td key={col.key}><Skeleton height={16} /></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="data-table-empty">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`data-table-wrapper ${className}`}>
      <table className="data-table">
        <thead>
          <tr>{columns.map(col => <th key={col.key} style={col.width ? { width: col.width } : {}}>{col.label}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={row.id || i} className={onRowClick ? 'row-clickable' : ''} onClick={() => onRowClick?.(row)}>
              {columns.map(col => (
                <td key={col.key}>{col.render ? col.render(row[col.key], row) : row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Tooltip({ children, text }) {
  return (
    <div className="tooltip-wrapper">
      {children}
      <div className="tooltip-text">{text}</div>
    </div>
  );
}
