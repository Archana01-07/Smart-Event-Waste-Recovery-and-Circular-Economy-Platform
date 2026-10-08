import { Leaf, Recycle, Utensils, Cloud } from 'lucide-react';
import { KpiCard } from '@/components/ui/KpiCard';
import { PieChartCard } from '@/components/charts/PieChartCard';
import { BarChartCard } from '@/components/charts/BarChartCard';
import { LineChartCard } from '@/components/charts/LineChartCard';
import { adminKpis, sustainabilityMetrics, wasteDistribution, recoveryByCategory, co2Trend } from '@/data/analytics';
import { Card } from '@/components/ui/Card';
import { formatNumber } from '@/utils/formatters';

export default function SustainabilityMetrics() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Landfill Reduction" value={adminKpis.landfillReduction} format="percent" icon={Leaf} trend="+5%" />
        <KpiCard title="Food Donated" value={adminKpis.foodDonated} format="weight" icon={Utensils} trend="+12%" />
        <KpiCard title="Recycling Efficiency" value={91} format="percent" icon={Recycle} trend="+3%" />
        <KpiCard title="Carbon Reduction" value={adminKpis.co2Saved} suffix=" tCO₂" format="raw" icon={Cloud} trend="+18%" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <LineChartCard title="Carbon Reduction Over Time" data={co2Trend} lines={['saved', 'target']} />
        <PieChartCard title="Waste Category Breakdown" data={wasteDistribution} />
      </div>
      <BarChartCard title="Recycling Efficiency by Category" data={recoveryByCategory} bars={['recovered']} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {sustainabilityMetrics.map((m) => (
          <Card key={m.label} className="text-center">
            <p className="text-3xl font-display font-bold text-eco-400">
              {m.unit === '%' ? `${m.value}%` : formatNumber(m.value)}
            </p>
            <p className="text-sm text-[var(--text-muted)]">{m.label}</p>
            <p className="text-xs text-emerald-400 mt-1">{m.trend}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
