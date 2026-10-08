import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { ChartWrapper } from './ChartWrapper';

export function BarChartCard({ title, subtitle, icon, data, bars, xKey = 'category', loading, stacked }) {
  const colors = ['#10b981', '#06b6d4', '#8b5cf6', '#f59e0b'];
  return (
    <ChartWrapper title={title} subtitle={subtitle} icon={icon} loading={loading}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(16,185,129,0.1)" />
          <XAxis dataKey={xKey} stroke="var(--text-muted)" fontSize={11} />
          <YAxis stroke="var(--text-muted)" fontSize={12} />
          <Tooltip
            contentStyle={{
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-glass)',
              borderRadius: '12px',
            }}
          />
          <Legend />
          {bars.map((bar, i) => (
            <Bar
              key={bar}
              dataKey={bar}
              fill={colors[i % colors.length]}
              radius={[4, 4, 0, 0]}
              stackId={stacked ? 'a' : undefined}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
