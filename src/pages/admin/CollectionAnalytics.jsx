import { useMemo } from 'react';
import { Route, Fuel, Clock, Truck } from 'lucide-react';
import { KpiCard } from '@/components/ui/KpiCard';
import { BarChartCard } from '@/components/charts/BarChartCard';
import { EcoMap } from '@/components/maps/EcoMap';
import { Card, CardHeader } from '@/components/ui/Card';
import { collectionAnalytics, routeEfficiencyData } from '@/data/analytics';
import { pickupRoute, truckPosition, eventMarkers } from '@/data/maps';
import { useAppData } from '@/context/AppDataContext';

export default function CollectionAnalytics() {
  const { wasteReports } = useAppData();

  const trackingAlerts = useMemo(() => {
    const alerts = [];
    wasteReports.forEach((r) => {
      if (r.status === 'pickup_requested') {
        alerts.push(`${r.eventName} — Awaiting recycler confirmation`);
      } else if (r.status === 'matched') {
        alerts.push(`${r.eventName} — Reserved, pending official confirm`);
      } else if (r.status === 'scheduled' && r.assignedOrg) {
        alerts.push(`${r.eventName} — Assigned to ${r.assignedOrg}`);
      }
    });
    return alerts.length ? alerts : ['No active collection delays'];
  }, [wasteReports]);
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Route Efficiency" value={collectionAnalytics.routeEfficiency} format="percent" icon={Route} />
        <KpiCard
          title="Pending Pickups"
          value={wasteReports.filter((r) => ['pickup_requested', 'matched'].includes(r.status)).length}
          icon={Clock}
        />
        <KpiCard title="Fuel Usage" value={collectionAnalytics.fuelUsage} suffix=" L" format="raw" icon={Fuel} />
        <KpiCard title="Trucks Active" value={collectionAnalytics.trucksActive} icon={Truck} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <BarChartCard title="Route Efficiency by Route" data={routeEfficiencyData} bars={['efficiency']} xKey="route" />
        <Card className="p-0 overflow-hidden">
          <CardHeader title="Live Truck Movement" className="px-6 pt-6" />
          <EcoMap height="280px" events={eventMarkers.slice(0, 2)} route={pickupRoute} truck={truckPosition} />
        </Card>
      </div>
      <Card>
        <CardHeader title="Pickup Tracking" />
        <div className="space-y-2">
          {trackingAlerts.map((a) => (
            <div key={a} className="rounded-lg bg-amber-500/10 border border-amber-500/20 px-4 py-3 text-sm text-amber-300">{a}</div>
          ))}
        </div>
      </Card>
    </div>
  );
}
