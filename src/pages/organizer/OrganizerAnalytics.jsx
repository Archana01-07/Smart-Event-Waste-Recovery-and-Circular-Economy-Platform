import { Cloud, Trash2, Leaf, IndianRupee } from 'lucide-react';
import { KpiCard } from '@/components/ui/KpiCard';
import { LineChartCard } from '@/components/charts/LineChartCard';
import { AreaChartCard } from '@/components/charts/AreaChartCard';
import { BarChartCard } from '@/components/charts/BarChartCard';
import { PieChartCard } from '@/components/charts/PieChartCard';
import { co2Trend, wasteTrend, revenueAnalytics, wasteDistribution, environmentalImpact } from '@/data/analytics';
import { Card } from '@/components/ui/Card';
import { formatNumber } from '@/utils/formatters';

export default function OrganizerAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {environmentalImpact.map((m, i) => (
          <KpiCard key={m.metric} title={m.metric} value={m.value} suffix={` ${m.unit}`} format="raw" delay={i * 0.05} />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <LineChartCard title="CO₂ Saved" icon={Cloud} data={co2Trend} lines={['saved', 'target']} />
        <PieChartCard title="Waste Distribution" icon={Trash2} data={wasteDistribution} />
      </div>
      <AreaChartCard title="Waste Trends" icon={Leaf} data={wasteTrend} dataKeys={['food', 'plastic', 'paper', 'eWaste']} />
      <BarChartCard title="Revenue Analytics" icon={IndianRupee} data={revenueAnalytics} bars={['revenue', 'cost']} xKey="month" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {environmentalImpact.map((m) => (
          <Card key={m.metric} className="text-center">
            <p className="text-2xl font-display font-bold text-eco-400">{formatNumber(m.value)}{m.unit}</p>
            <p className="text-sm text-[var(--text-muted)]">{m.metric}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
