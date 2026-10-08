import { Modal } from '@/components/ui/Modal';
import { StatusBadge } from '@/components/ui/Badge';
import { formatWeight } from '@/utils/formatters';

export function WasteDetailModal({ open, onClose, title = 'Waste Details', data }) {
  if (!data) return null;

  const quantity = data.quantity ?? (
    (data.food || 0) + (data.plastic || 0) + (data.paper || 0) +
    (data.flowers || 0) + (data.decoration || 0) + (data.ewaste || 0)
  );

  return (
    <Modal open={open} onClose={onClose} title={title} size="md">
      <div className="space-y-4 text-sm">
        <Row label="Event name" value={data.eventName} />
        <Row label="Waste type" value={data.wasteType || data.wasteAvailable || '—'} />
        <Row label="Quantity" value={formatWeight(quantity)} />
        <Row label="Location" value={data.location || data.locality || '—'} />
        <Row label="Pickup urgency" value={data.urgency ? <StatusBadge status={data.urgency} /> : '—'} />
        {data.distance != null && <Row label="Distance" value={`${data.distance} km`} />}
        {data.matchScore != null && <Row label="Recycler suitability" value={`${data.matchScore}% match — ${data.reason || 'Compatible with your capacity'}`} />}
        {data.notes && <Row label="Notes" value={data.notes} />}
        {data.status && <Row label="Status" value={<StatusBadge status={data.status} />} />}
      </div>
    </Modal>
  );
}

function Row({ label, value }) {
  return (
    <div>
      <p className="text-[var(--text-muted)]">{label}</p>
      <div className="mt-0.5 font-medium text-[var(--text-primary)]">{value}</div>
    </div>
  );
}
