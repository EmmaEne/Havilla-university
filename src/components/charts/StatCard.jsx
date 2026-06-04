import { Card } from '../ui';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import './charts.css';

export default function StatCard({ title, value, icon: Icon, trend, trendDirection = 'up', description, className = '' }) {
  const isUp = trendDirection === 'up';

  return (
    <Card className={`stat-card ${className}`} hover>
      <div className="stat-card-header">
        <span className="stat-card-title">{title}</span>
        {Icon && (
          <div className="stat-card-icon-wrapper">
            <Icon size={18} />
          </div>
        )}
      </div>

      <div className="stat-card-value">{value}</div>

      {(trend || description) && (
        <div className="stat-card-footer">
          {trend && (
            <span className={`stat-card-trend ${isUp ? 'stat-card-trend-up' : 'stat-card-trend-down'}`}>
              {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {trend}
            </span>
          )}
          {description && <span className="stat-card-description">{description}</span>}
        </div>
      )}
    </Card>
  );
}
