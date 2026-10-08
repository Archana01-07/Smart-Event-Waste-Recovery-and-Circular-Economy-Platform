import { useState } from 'react';
import { Check, X, FileText } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { StatusBadge } from '@/components/ui/Badge';
import { mockOrganizations } from '@/data/organizations';
import { Table } from '@/components/ui/Table';
import { useAppData } from '@/context/AppDataContext';
import { useToast } from '@/context/ToastContext';

export default function OrgVerification() {
  const { pendingVerifications, approveVerification } = useAppData();
  const { showToast } = useToast();
  const [selected, setSelected] = useState(null);
  const orgPending = pendingVerifications.filter((v) => v.type === 'organization');

  const columns = [
    { key: 'name', label: 'Organization' },
    { key: 'type', label: 'Type', render: () => 'NGO/Recycler' },
    { key: 'submittedBy', label: 'Contact' },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'actions', label: '', render: (r) => <Button size="sm" variant="ghost" onClick={() => setSelected(r)}>Review</Button> },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <h3 className="font-display font-semibold mb-4">Verified Organizations</h3>
        <div className="grid gap-3 md:grid-cols-3">
          {mockOrganizations.map((o) => (
            <div key={o.id} className="rounded-xl border border-[var(--border-glass)] p-4">
              <div className="flex justify-between"><p className="font-medium">{o.name}</p><StatusBadge status={o.verified ? 'verified' : 'pending'} /></div>
              <p className="text-sm text-[var(--text-muted)]">{o.type} · {o.location}</p>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <h3 className="font-display font-semibold mb-4">Pending Verification</h3>
        <Table columns={columns} data={orgPending} onRowClick={setSelected} />
      </Card>
      <Modal open={!!selected} onClose={() => setSelected(null)} title="Organization Verification">
        {selected && (
          <div className="space-y-4">
            <p><strong>{selected.name}</strong> — {selected.submittedBy}</p>
            {selected.documents?.map((d) => (
              <div key={d} className="flex gap-2 text-sm text-eco-400"><FileText className="h-4 w-4" />{d}</div>
            ))}
            <div className="flex gap-3">
              <Button icon={Check} onClick={() => { approveVerification(selected.id, true); showToast('Organization approved successfully.'); setSelected(null); }}>Approve</Button>
              <Button variant="danger" icon={X} onClick={() => { approveVerification(selected.id, false); showToast('Organization verification rejected.'); setSelected(null); }}>Reject</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
