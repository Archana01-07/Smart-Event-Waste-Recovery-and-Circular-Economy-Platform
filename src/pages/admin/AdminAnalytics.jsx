import { BarChart3 } from 'lucide-react';
import { AreaChartCard } from '@/components/charts/AreaChartCard';
import { BarChartCard } from '@/components/charts/BarChartCard';
import { PieChartCard } from '@/components/charts/PieChartCard';
import { LineChartCard } from '@/components/charts/LineChartCard';
import { wasteTrend, wasteDistribution, recoveryByCategory, co2Trend, pickupTrends } from '@/data/analytics';

export default function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <PieChartCard title="Waste Distribution" icon={BarChart3} data={wasteDistribution} />
        <LineChartCard title="Event Waste Trends" data={co2Trend} lines={['saved', 'target']} />
      </div>
      <AreaChartCard title="Monthly Waste by Category" data={wasteTrend} dataKeys={['food', 'plastic', 'paper', 'eWaste']} />
      <div className="grid gap-6 lg:grid-cols-2">
        <BarChartCard title="Recovery Statistics" data={recoveryByCategory} bars={['recovered', 'donated']} stacked />
        <BarChartCard title="Pickup Performance" data={pickupTrends} bars={['completed', 'delayed']} xKey="week" />
      </div>
    </div>
  );
}
