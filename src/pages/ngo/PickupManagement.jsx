import { useState, useMemo } from 'react';
import { Truck, Calendar, CheckCircle } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Timeline } from '@/components/ui/Timeline';
import { Table } from '@/components/ui/Table';
import { StatusBadge } from '@/components/ui/Badge';
import { formatDate, formatWeight } from '@/utils/formatters';
import { useAppData } from '@/context/AppDataContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { DEFAULT_RECYCLER_ORG } from '@/data/recyclers';

const pickupSteps = [
  { title: 'Reserved', description: 'Waste listing reserved' },
  { title: 'Confirmed', description: 'Order confirmed with organizer' },
  { title: 'Scheduled', description: 'Pickup time agreed' },
  { title: 'Collected', description: 'Waste collected on site' },
];

export default function PickupManagement() {
  const { listings, confirmListing, markCollectionComplete } = useAppData();
  const { user } = useAuth();
  const { showToast } = useToast();
  const recyclerOrg = user?.organization || DEFAULT_RECYCLER_ORG;
  const [activeTab, setActiveTab] = useState('active');
  const activeListings = useMemo(
    () => listings.filter((l) => ['pickup_requested', 'reserved', 'confirmed'].includes(l.status)),
    [listings]
  );

  const completedListings = useMemo(
    () => listings.filter((l) => l.status === 'collected'),
    [listings]
  );

  const scheduleListings = useMemo(
    () => listings.filter((l) => l.status === 'confirmed'),
    [listings]
  );

  const columns = [
    { key: 'eventName', label: 'Event' },
    { key: 'wasteType', label: 'Type' },
    { key: 'quantity', label: 'Qty', render: (r) => formatWeight(r.quantity) },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    {
      key: 'actions',
      label: 'Actions',
      render: (r) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            disabled={r.status === 'confirmed' || r.status === 'collected'}
            onClick={() => {
              confirmListing(r.id, recyclerOrg);
              showToast(`Pickup confirmed for ${r.eventName}. ${recyclerOrg} is now assigned.`);
            }}
          >
            {r.status === 'confirmed' ? 'Confirmed' : 'Confirm'}
          </Button>
        </div>
      ),
    },
  ];

  const handleMarkCollected = (listingId) => {
    const listing = listings.find((l) => l.id === listingId);
    if (!listing || listing.status === 'collected') return;
    markCollectionComplete(listingId, recyclerOrg);
    setActiveTab('completed');
    showToast('Collection marked complete. Organizer tracking updated.');
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {['active', 'schedule', 'completed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-xl px-4 py-2 text-sm font-medium capitalize transition-colors ${
              activeTab === tab ? 'bg-eco-500/20 text-eco-400' : 'text-[var(--text-muted)] hover:bg-eco-500/10'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'active' && (
        <Card>
          <CardHeader title="Active Pickups" icon={Truck} />
          <Table columns={columns} data={activeListings} />
        </Card>
      )}

      {activeTab === 'schedule' && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader title="Schedule Pickup" icon={Calendar} />
            <Timeline steps={pickupSteps} currentStep={2} />
          </Card>
          <Card>
            <CardHeader title="Confirm Collection" icon={CheckCircle} />
            <p className="text-sm text-[var(--text-muted)] mb-4">Mark pickup as complete after on-site collection.</p>
            <div className="space-y-3">
              {scheduleListings.length === 0 ? (
                <p className="text-sm text-[var(--text-muted)]">No confirmed pickups ready for collection.</p>
              ) : (
                scheduleListings.map((l) => (
                  <div key={l.id} className="flex items-center justify-between rounded-lg border border-[var(--border-glass)] p-3">
                    <div>
                      <p className="font-medium text-sm">{l.eventName}</p>
                      <p className="text-xs text-[var(--text-muted)]">{l.wasteType} · {l.location}</p>
                    </div>
                    <Button
                      size="sm"
                      disabled={l.status === 'collected'}
                      onClick={() => handleMarkCollected(l.id)}
                    >
                      {l.status === 'collected' ? 'Marked' : 'Mark Collected'}
                    </Button>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'completed' && (
        <Card>
          <CardHeader title="Completed Pickups" />
          {completedListings.length === 0 ? (
            <p className="text-sm text-[var(--text-muted)]">No completed pickups yet.</p>
          ) : (
            <div className="space-y-3">
              {completedListings.map((l) => (
                <div key={l.id} className="flex justify-between rounded-lg border border-[var(--border-glass)] p-3 text-sm">
                  <div>
                    <p className="font-medium">{l.eventName}</p>
                    <p className="text-[var(--text-muted)]">{l.wasteType} · {l.location}</p>
                  </div>
                  <div className="text-right">
                    <StatusBadge status="collected" />
                    <p className="mt-1 text-xs text-[var(--text-muted)]">
                      {l.collectedAt ? formatDate(l.collectedAt) : formatDate('2026-05-11')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
