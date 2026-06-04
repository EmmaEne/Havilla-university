import { ResponsiveContainer, AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';
import './charts.css';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-chart-tooltip">
        <p className="custom-chart-tooltip-label">{label}</p>
        <div className="custom-chart-tooltip-items">
          {payload.map((entry, index) => (
            <div key={index} className="custom-chart-tooltip-item">
              <span style={{ color: entry.stroke, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: entry.stroke }} />
                {entry.name}:
              </span>
              <span className="custom-chart-tooltip-val">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function AreaChart({ data, dataKey, xKey, color = 'var(--color-primary)', height = 300, name = 'Value' }) {
  const { isDark } = useTheme();
  
  const resolvedColor = color.startsWith('var') ? 
    (isDark && color === 'var(--color-primary)' ? 'var(--color-accent)' : color) : color;

  return (
    <div className="chart-container" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={resolvedColor} stopOpacity={0.4}/>
              <stop offset="95%" stopColor={resolvedColor} stopOpacity={0.0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#253347' : '#E2E8F0'} vertical={false} />
          <XAxis
            dataKey={xKey}
            stroke={isDark ? '#8B98A8' : '#64748B'}
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke={isDark ? '#8B98A8' : '#64748B'}
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey={dataKey}
            name={name}
            stroke={resolvedColor}
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorArea)"
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}
