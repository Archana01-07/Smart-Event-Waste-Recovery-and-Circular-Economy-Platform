import { useState } from 'react';
import { Card, CardHeader } from '@/components/ui/Card';
import { EcoMap } from '@/components/maps/EcoMap';
import { organizerKpis } from '@/data/analytics';
import { ngoMarkers } from '@/data/maps';
import { StatusBadge } from '@/components/ui/Badge';
import { formatWeight } from '@/utils/formatters';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { useAppData } from '@/context/AppDataContext';
import { eventsToMarkers } from '@/utils/mapMarkers';
import { KpiCard } from '@/components/ui/KpiCard';
import { WasteDetailModal } from '@/components/shared/WasteDetailModal';

export default function OrganizerOverview() {
  const { wasteReports, events } = useAppData();
  const [detailReport, setDetailReport] = useState(null);
  const totalWaste = wasteReports.reduce(
    (sum, r) => sum + (r.food || 0) + (r.plastic || 0) + (r.paper || 0) + (r.flowers || 0) + (r.decoration || 0) + (r.ewaste || 0),
    0
  );

  const primaryWasteType = (r) => {
    const types = [
      { k: 'food', l: 'Food' },
      { k: 'plastic', l: 'Plastic' },
      { k: 'paper', l: 'Paper' },
      { k: 'flowers', l: 'Flowers' },
    ];
    const top = types.sort((a, b) => (r[b.k] || 0) - (r[a.k] || 0))[0];
    return top?.l || 'Mixed';
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="Waste Reported" value={totalWaste || organizerKpis.totalWasteReported} format="weight" />
        <KpiCard title="Sustainability Score" value={organizerKpis.sustainabilityScore} format="percent" />
        <KpiCard title="CO₂ Reduced" value={organizerKpis.co2Reduction} suffix=" t" format="raw" />
        <KpiCard title="Recovery Rate" value={organizerKpis.recoveryRate} format="percent" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Waste Reports" action={<Link to="/organizer/tracking"><Button size="sm" variant="ghost">View tracking</Button></Link>} />
          <div className="space-y-3">
            {wasteReports.length === 0 ? (
              <p className="text-sm text-[var(--text-muted)]">No waste reports yet. Submit one from Waste Report.</p>
            ) : (
              wasteReports.map((r) => (
                <div key={r.id} className="flex items-center justify-between rounded-xl border border-[var(--border-glass)] p-4 hover:bg-eco-500/5 gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{r.eventName}</p>
                    <p className="text-sm text-[var(--text-muted)]">
                      {r.assignedOrg || (r.status === 'pickup_requested' ? 'Awaiting recycler confirmation' : 'Awaiting match')} · {formatWeight((r.food || 0) + (r.plastic || 0) + (r.paper || 0))}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <StatusBadge status={r.status} />
                    <Button size="sm" variant="ghost" onClick={() => setDetailReport(r)}>Details</Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
        <Card>
          <CardHeader title="Chennai Events Map" />
          <EcoMap height="220px" events={eventsToMarkers(events)} ngos={ngoMarkers} />
        </Card>
      </div>

      <WasteDetailModal
        open={!!detailReport}
        onClose={() => setDetailReport(null)}
        title="Waste Report Details"
        data={
          detailReport
            ? {
                ...detailReport,
                wasteType: primaryWasteType(detailReport),
                quantity:
                  (detailReport.food || 0) +
                  (detailReport.plastic || 0) +
                  (detailReport.paper || 0) +
                  (detailReport.flowers || 0) +
                  (detailReport.decoration || 0) +
                  (detailReport.ewaste || 0),
              }
            : null
        }
      />
    </div>
  );
}
