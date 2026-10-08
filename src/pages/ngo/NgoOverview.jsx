import { Card, CardHeader } from '@/components/ui/Card';
import { EcoMap } from '@/components/maps/EcoMap';
import { ngoKpis } from '@/data/analytics';
import { eventMarkers, ngoMarkers } from '@/data/maps';
import { StatusBadge } from '@/components/ui/Badge';
import { formatWeight } from '@/utils/formatters';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { useAppData } from '@/context/AppDataContext';
import { KpiCard } from '@/components/ui/KpiCard';

export default function NgoOverview() {
  const { listings, getVerifiedEventNames } = useAppData();
  const verified = new Set(getVerifiedEventNames());
  const visibleListings = listings.filter(
    (l) => l.status !== 'pending_event' && verified.has(l.eventName)
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="Waste Acquired" value={ngoKpis.wasteAcquired} format="weight" />
        <KpiCard title="Recovery Efficiency" value={ngoKpis.recoveryEfficiency} format="percent" />
        <KpiCard title="Active Pickups" value={listings.filter((l) => ['pickup_requested', 'reserved', 'confirmed'].includes(l.status)).length} />
        <KpiCard title="Nearby Events" value={ngoKpis.nearbyEvents} />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Recommendation"
            action={<Link to="/ngo/recommendations"><Button size="sm" variant="ghost">View all</Button></Link>}
          />
          <div className="space-y-2">
            {visibleListings.filter((l) => l.status === 'available').slice(0, 3).map((l) => (
              <div key={l.id} className="flex justify-between rounded-lg border border-[var(--border-glass)] p-3 text-sm">
                <div><p className="font-medium">{l.eventName}</p><p className="text-[var(--text-muted)]">{l.wasteType} · {formatWeight(l.quantity)} · {l.location}</p></div>
                <StatusBadge status={l.urgency} />
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader title="Chennai Map" />
          <EcoMap height="280px" events={eventMarkers} ngos={ngoMarkers} />
        </Card>
      </div>
      <Card>
        <CardHeader title="Recent Listings" action={<Link to="/ngo/marketplace"><Button size="sm" variant="ghost">Marketplace</Button></Link>} />
        <div className="grid gap-2 sm:grid-cols-2">
          {visibleListings.slice(0, 4).map((l) => (
            <div key={l.id} className="flex justify-between rounded-lg border border-[var(--border-glass)] p-3 text-sm">
              <div><p className="font-medium">{l.eventName}</p><p className="text-[var(--text-muted)]">{l.wasteType} · {formatWeight(l.quantity)}</p></div>
              <StatusBadge status={l.status} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
