import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { ChartWrapper } from './ChartWrapper';

export function LineChartCard({ title, subtitle, icon, data, lines, loading }) {
  const colors = ['#10b981', '#06b6d4', '#f59e0b'];
  return (
    <ChartWrapper title={title} subtitle={subtitle} icon={icon} loading={loading}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(16,185,129,0.1)" />
          <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} />
          <YAxis stroke="var(--text-muted)" fontSize={12} />
          <Tooltip
            contentStyle={{
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-glass)',
              borderRadius: '12px',
            }}
          />
          <Legend />
          {lines.map((line, i) => (
            <Line
              key={line}
              type="monotone"
              dataKey={line}
              stroke={colors[i % colors.length]}
              strokeWidth={2}
              dot={{ fill: colors[i % colors.length], r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
