import { useState } from 'react';
import { Truck, Clock, Building2 } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/Card';
import { Input, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/Badge';
import { formatDate, formatWeight } from '@/utils/formatters';
import { useAppData } from '@/context/AppDataContext';
import { useToast } from '@/context/ToastContext';

export default function PickupRequests() {
  const { wasteReports, requestPickup } = useAppData();
  const { showToast } = useToast();
  const [selected, setSelected] = useState(wasteReports[0]?.id || '');
  const [pickupDate, setPickupDate] = useState('2026-05-17');
  const report = wasteReports.find((r) => r.id === selected);
  const alreadyRequested = report && ['pickup_requested', 'matched', 'scheduled', 'in_transit', 'completed'].includes(report.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selected || alreadyRequested) return;
    requestPickup(selected, pickupDate);
    showToast('Pickup request sent. Awaiting recycler confirmation.');
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader title="Request Collection" icon={Truck} />
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Select
            label="Waste report"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            options={wasteReports.map((r) => ({ value: r.id, label: r.eventName }))}
          />
          <Input label="Preferred date" type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} />
          <Select
            label="Preferred time slot"
            options={[
              { value: 'morning', label: '6 AM – 10 AM' },
              { value: 'midday', label: '10 AM – 2 PM' },
              { value: 'evening', label: '2 PM – 8 PM' },
            ]}
          />
          <Button type="submit" className="w-full" disabled={!selected || alreadyRequested}>
            {alreadyRequested ? 'Request Submitted' : 'Request Pickup'}
          </Button>
        </form>
      </Card>
      <Card>
        <CardHeader title="Assigned Recycler" icon={Building2} />
        {report ? (
          <div className="space-y-4">
            <div className="rounded-xl bg-eco-500/10 p-4">
              <p className="font-display text-lg font-semibold">
                {report.assignedOrg || (report.status === 'pickup_requested' ? 'Awaiting recycler confirmation' : 'Pending assignment')}
              </p>
              {report.assignedOrg && (
                <p className="text-sm text-[var(--text-muted)]">Officially assigned · Chennai zone</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><p className="text-[var(--text-muted)]">Status</p><StatusBadge status={report.status} /></div>
              <div><p className="text-[var(--text-muted)]">Pickup date</p><p className="flex items-center gap-1"><Clock className="h-3 w-3" />{report.pickupDate ? formatDate(report.pickupDate) : pickupDate ? formatDate(pickupDate) : 'TBD'}</p></div>
              <div><p className="text-[var(--text-muted)]">Total waste</p><p>{formatWeight((report.food || 0) + (report.plastic || 0) + (report.paper || 0))}</p></div>
              <div><p className="text-[var(--text-muted)]">Urgency</p><StatusBadge status={report.urgency} /></div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-[var(--text-muted)]">Select a waste report to view details.</p>
        )}
      </Card>
    </div>
  );
}
