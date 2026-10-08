import { Trash2, Activity, Truck } from 'lucide-react';
import { KpiCard } from '@/components/ui/KpiCard';
import { AreaChartCard } from '@/components/charts/AreaChartCard';
import { BarChartCard } from '@/components/charts/BarChartCard';
import { PieChartCard } from '@/components/charts/PieChartCard';
import { ngoKpis, wasteTrend, recoveryByCategory, pickupTrends, wasteDistribution } from '@/data/analytics';

export default function NgoAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard title="Waste Recovered" value={ngoKpis.wasteAcquired} format="weight" icon={Trash2} trend="+18%" />
        <KpiCard title="Recycling Efficiency" value={ngoKpis.recoveryEfficiency} format="percent" icon={Activity} trend="+3%" />
        <KpiCard title="Active Pickups" value={ngoKpis.activePickups} icon={Truck} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <AreaChartCard title="Waste Recovery Trends" data={wasteTrend} dataKeys={['food', 'plastic', 'paper']} />
        <PieChartCard title="Recovery Categories" data={wasteDistribution} />
      </div>
      <BarChartCard title="Recovery by Category" data={recoveryByCategory} bars={['recovered', 'donated']} stacked />
      <BarChartCard title="Pickup Trends" data={pickupTrends} bars={['completed', 'delayed', 'cancelled']} xKey="week" />
    </div>
  );
}
