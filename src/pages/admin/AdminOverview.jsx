import { useMemo } from 'react';
import { Card, CardHeader } from '@/components/ui/Card';
import { PieChartCard } from '@/components/charts/PieChartCard';
import { BarChartCard } from '@/components/charts/BarChartCard';
import { EcoMap } from '@/components/maps/EcoMap';
import { wasteDistribution } from '@/data/analytics';
import { ngoMarkers, wasteHotspots, organizerMarkers } from '@/data/maps';
import { StatusBadge } from '@/components/ui/Badge';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { useAppData } from '@/context/AppDataContext';
import { eventsToMarkers, wasteReportsToMarkers } from '@/utils/mapMarkers';
import { formatDate, formatWeight } from '@/utils/formatters';
import { KpiCard } from '@/components/ui/KpiCard';

export default function AdminOverview() {
  const { events, wasteReports, contributions, pendingVerifications } = useAppData();

  const organizerChartData = useMemo(
    () =>
      contributions.organizers.map((o) => ({
        name: o.name,
        events: o.events,
        reports: o.reports,
        waste: Math.round(o.wasteReported / 100),
      })),
    [contributions.organizers]
  );

  const recyclerChartData = useMemo(
    () =>
      contributions.recyclers.map((r) => ({
        name: r.name,
        pickups: r.pickups,
        recovered: Math.round(r.wasteRecovered / 100),
      })),
    [contributions.recyclers]
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <KpiCard title="Total Events" value={events.length} />
        <KpiCard title="Verified Orgs" value={contributions.recyclers.length} />
        <KpiCard title="Waste Reports" value={wasteReports.length} format="raw" />
        <KpiCard title="CO₂ Saved" value={2840} suffix=" t" format="raw" />
        <KpiCard title="Active Pickups" value={wasteReports.filter((r) => !['completed'].includes(r.status)).length} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <PieChartCard title="Waste Distribution" data={wasteDistribution} />
        <Card>
          <CardHeader title="Pending Verifications" action={<Link to="/admin/events"><Button size="sm" variant="ghost">Review</Button></Link>} />
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {pendingVerifications.length === 0 && events.filter((e) => e.verificationStatus === 'pending').length === 0 ? (
              <p className="text-sm text-[var(--text-muted)]">No pending verifications</p>
            ) : (
              <>
                {events
                  .filter((e) => e.verificationStatus === 'pending')
                  .map((e) => (
                    <div key={`evt-${e.id}`} className="rounded-lg border border-[var(--border-glass)] p-3 text-sm">
                      <p className="font-medium">{e.name}</p>
                      <p className="text-[var(--text-muted)]">event · {e.organizer}</p>
                      <StatusBadge status={e.verificationStatus} />
                    </div>
                  ))}
                {pendingVerifications
                  .filter((v) => v.type !== 'event')
                  .map((v) => (
                    <div key={v.id} className="rounded-lg border border-[var(--border-glass)] p-3 text-sm">
                      <p className="font-medium">{v.name}</p>
                      <p className="text-[var(--text-muted)]">{v.type} · {v.submittedBy}</p>
                      <StatusBadge status={v.status} />
                    </div>
                  ))}
              </>
            )}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <BarChartCard
          title="Organizer Contributions"
          data={organizerChartData}
          bars={['events', 'reports', 'waste']}
          xKey="name"
        />
        <BarChartCard
          title="Recycler / NGO Contributions"
          data={recyclerChartData}
          bars={['pickups', 'recovered']}
          xKey="name"
        />
      </div>

      <Card>
        <CardHeader title="Registered Events" subtitle="Synced from organizer dashboard" />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--border-glass)] text-[var(--text-muted)]">
                <th className="px-3 py-2">Event</th>
                <th className="px-3 py-2">Location</th>
                <th className="px-3 py-2">Organizer</th>
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e.id} className="border-b border-[var(--border-glass)]/50">
                  <td className="px-3 py-2 font-medium">{e.name}</td>
                  <td className="px-3 py-2">{e.location}</td>
                  <td className="px-3 py-2">{e.organizer}</td>
                  <td className="px-3 py-2">{formatDate(e.date)}</td>
                  <td className="px-3 py-2"><StatusBadge status={e.verificationStatus || e.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <CardHeader title="Waste Reports" subtitle="Synced from organizer dashboard" />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--border-glass)] text-[var(--text-muted)]">
                <th className="px-3 py-2">Event</th>
                <th className="px-3 py-2">Location</th>
                <th className="px-3 py-2">Total waste</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {wasteReports.map((r) => (
                <tr key={r.id} className="border-b border-[var(--border-glass)]/50">
                  <td className="px-3 py-2 font-medium">{r.eventName}</td>
                  <td className="px-3 py-2">{r.location}</td>
                  <td className="px-3 py-2">
                    {formatWeight((r.food || 0) + (r.plastic || 0) + (r.paper || 0) + (r.flowers || 0) + (r.decoration || 0) + (r.ewaste || 0))}
                  </td>
                  <td className="px-3 py-2"><StatusBadge status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-0 overflow-hidden">
        <CardHeader title="Chennai Overview Map" subtitle="Events, waste reports, recyclers, organizers" className="px-6 pt-6" />
        <EcoMap
          height="350px"
          events={[...eventsToMarkers(events), ...wasteReportsToMarkers(wasteReports)]}
          ngos={ngoMarkers}
          organizers={organizerMarkers}
          hotspots={wasteHotspots}
        />
      </Card>
    </div>
  );
}
