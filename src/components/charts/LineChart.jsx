import { ResponsiveContainer, LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
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

export default function LineChart({ data, dataKey, xKey, color = 'var(--color-primary)', height = 300, name = 'Value' }) {
  const { isDark } = useTheme();
  
  const resolvedColor = color.startsWith('var') ? 
    (isDark && color === 'var(--color-primary)' ? 'var(--color-accent)' : color) : color;

  return (
    <div className="chart-container" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
          <Line
            type="monotone"
            dataKey={dataKey}
            name={name}
            stroke={resolvedColor}
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
