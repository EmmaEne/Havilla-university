import { ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, Tooltip } from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';
import './charts.css';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const entry = payload[0];
    return (
      <div className="custom-chart-tooltip">
        <p className="custom-chart-tooltip-label" style={{ color: entry.payload.color || entry.color }}>
          {entry.name}
        </p>
        <div className="custom-chart-tooltip-items">
          <div className="custom-chart-tooltip-item">
            <span>Value:</span>
            <span className="custom-chart-tooltip-val">{entry.value}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function PieChart({ data, nameKey = 'name', valueKey = 'value', height = 300 }) {
  const { isDark } = useTheme();

  // default colors if not provided on the items
  const DEFAULT_COLORS = [
    'var(--color-primary)',
    'var(--color-accent)',
    'var(--color-success)',
    'var(--color-info)',
    'var(--color-warning)',
    'var(--color-error)'
  ];

  return (
    <div className="chart-container" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Tooltip content={<CustomTooltip />} />
          <Pie
            data={data}
            dataKey={valueKey}
            nameKey={nameKey}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
          >
            {data.map((entry, index) => {
              const baseColor = entry.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length];
              const resolvedColor = baseColor.startsWith('var') ? 
                (isDark && baseColor === 'var(--color-primary)' ? 'var(--color-accent)' : baseColor) : baseColor;
              return (
                <Cell key={`cell-${index}`} fill={resolvedColor} />
              );
            })}
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}
