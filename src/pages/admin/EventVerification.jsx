import { useState, useMemo } from 'react';
import { Check, X, FileText } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { StatusBadge } from '@/components/ui/Badge';
import { formatDate } from '@/utils/formatters';
import { useAppData } from '@/context/AppDataContext';
import { useToast } from '@/context/ToastContext';

export default function EventVerification() {
  const { events, approveEvent } = useAppData();
  const { showToast } = useToast();
  const [selected, setSelected] = useState(null);

  const pendingEvents = useMemo(
    () => events.filter((e) => e.verificationStatus === 'pending'),
    [events]
  );

  const handleApprove = (approved) => {
    if (!selected?.id) return;
    approveEvent(selected.id, approved);
    showToast(approved ? 'Event approved successfully.' : 'Event rejected.');
    setSelected(null);
  };

  return (
    <div className="space-y-6">
      {pendingEvents.length === 0 ? (
        <p className="text-sm text-[var(--text-muted)]">No events pending verification.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {pendingEvents.map((item) => (
            <Card key={item.id} hover className="cursor-pointer" onClick={() => setSelected(item)}>
              <div className="flex justify-between">
                <div>
                  <h3 className="font-display font-semibold">{item.name}</h3>
                  <p className="text-sm text-[var(--text-muted)]">{item.organizer}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">{item.location}</p>
                </div>
                <StatusBadge status={item.verificationStatus} />
              </div>
              {item.date && <p className="mt-3 text-xs text-eco-500">{formatDate(item.date)}</p>}
            </Card>
          ))}
        </div>
      )}

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Event Verification" size="lg">
        {selected && (
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2 text-sm">
              <div><span className="text-[var(--text-muted)]">Event</span><p className="font-medium">{selected.name}</p></div>
              <div><span className="text-[var(--text-muted)]">Organizer</span><p>{selected.organizer}</p></div>
              <div><span className="text-[var(--text-muted)]">Location</span><p>{selected.location}</p></div>
              <div><span className="text-[var(--text-muted)]">Type</span><p>{selected.type}</p></div>
            </div>
            {selected.documents?.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">Documents</p>
                {selected.documents.map((d) => (
                  <div key={d} className="flex items-center gap-2 text-sm text-eco-400"><FileText className="h-4 w-4" />{d}</div>
                ))}
              </div>
            )}
            <div className="flex gap-3 pt-4">
              <Button icon={Check} onClick={() => handleApprove(true)}>Approve</Button>
              <Button variant="danger" icon={X} onClick={() => handleApprove(false)}>Reject</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
