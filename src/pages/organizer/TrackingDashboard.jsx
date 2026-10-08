import { useEffect, useMemo, useState } from 'react';
import { Card, CardHeader } from '@/components/ui/Card';
import { Timeline } from '@/components/ui/Timeline';
import { KpiCard } from '@/components/ui/KpiCard';
import { Select } from '@/components/ui/Input';
import { StatusBadge } from '@/components/ui/Badge';
import { EcoMap } from '@/components/maps/EcoMap';
import { pickupRoute, truckPosition } from '@/data/maps';
import { useAppData } from '@/context/AppDataContext';
import { wasteReportsToMarkers } from '@/utils/mapMarkers';
import { formatDate } from '@/utils/formatters';

const trackingSteps = [
  { title: 'Waste reported', description: 'Report submitted' },
  { title: 'Pickup requested', description: 'Awaiting recycler response' },
  { title: 'Recycler matched', description: 'Interest registered, pending confirmation' },
  { title: 'Pickup confirmed', description: 'Recycler officially assigned' },
  { title: 'In transit', description: 'Collection en route' },
  { title: 'Collection complete', description: 'Waste recovered' },
];

const statusStep = {
  requested: 0,
  pickup_requested: 1,
  matched: 2,
  reserved: 2,
  scheduled: 3,
  confirmed: 3,
  in_transit: 4,
  collected: 5,
  completed: 6,
};

const statusLabels = {
  requested: 'Reported',
  pickup_requested: 'Pickup Requested',
  matched: 'Matched (Pending Confirm)',
  reserved: 'Reserved',
  scheduled: 'Scheduled',
  confirmed: 'Confirmed',
  in_transit: 'In Transit',
  collected: 'Collected',
  completed: 'Completed',
};

function reportSortKey(r) {
  return new Date(r.completedAt || r.confirmedAt || r.createdAt || 0).getTime();
}

export default function TrackingDashboard() {
  const { wasteReports } = useAppData();
  const [selectedId, setSelectedId] = useState('');

  const sortedReports = useMemo(
    () => [...wasteReports].sort((a, b) => reportSortKey(b) - reportSortKey(a)),
    [wasteReports]
  );

  useEffect(() => {
    if (!sortedReports.length) return;
    const stillExists = sortedReports.some((r) => r.id === selectedId);
    if (!selectedId || !stillExists) {
      setSelectedId(sortedReports[0].id);
    }
  }, [sortedReports, selectedId]);

  const report = sortedReports.find((r) => r.id === selectedId) ?? sortedReports[0];

  if (!report) {
    return <p className="text-[var(--text-muted)]">No active pickups to track. Submit a waste report first.</p>;
  }

  const isComplete = report.status === 'completed';
  const step = isComplete ? trackingSteps.length : (statusStep[report.status] ?? 0);
  const statusLabel = statusLabels[report.status] || report.status;
  const assignedLabel =
    report.assignedOrg ||
    (report.status === 'pickup_requested' ? 'Awaiting confirmation' : 'Not yet assigned');

  const stepsWithTimes = trackingSteps.map((s, i) => {
    if (!isComplete && i > step) return s;
    let time;
    if (i === 0 && report.createdAt) time = formatDate(report.createdAt);
    if (i === 1 && report.status !== 'requested' && report.pickupDate) time = formatDate(report.pickupDate);
    if (i === 3 && report.confirmedAt) time = formatDate(report.confirmedAt);
    if (i === 5 && report.completedAt) time = formatDate(report.completedAt);
    return time ? { ...s, time } : s;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader title="Track Pickup" subtitle="Select a waste report to view live status" />
        <Select
          label="Waste report"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          options={sortedReports.map((r) => ({
            value: r.id,
            label: `${r.eventName} — ${statusLabels[r.status] || r.status}`,
          }))}
        />
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard title="Pickup Status" value={statusLabel} format="raw" />
        <KpiCard title="Assigned Recycler" value={assignedLabel} format="raw" />
        <KpiCard title="Recovery %" value={isComplete ? 100 : report.recoveryPercent || 0} format="percent" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader
            title={`Tracking: ${report.eventName}`}
            action={<StatusBadge status={report.status} />}
          />
          <Timeline steps={stepsWithTimes} currentStep={step} />
          {isComplete && (
            <p className="mt-2 text-sm text-eco-400">
              Collection completed
              {report.completedAt ? ` on ${formatDate(report.completedAt)}` : ''}
              {report.assignedOrg ? ` by ${report.assignedOrg}` : ''}.
            </p>
          )}
        </Card>
        <Card className="p-0 overflow-hidden">
          <CardHeader title="Live Route — Chennai" className="px-6 pt-6" />
          <EcoMap
            height="320px"
            events={wasteReportsToMarkers(wasteReports.filter((r) => r.id === report.id))}
            route={isComplete ? undefined : pickupRoute}
            truck={isComplete ? undefined : truckPosition}
          />
        </Card>
      </div>

    </div>
  );
}
