import { useState, useMemo } from 'react';
import { MapPin } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/Badge';
import { formatCurrency, formatWeight } from '@/utils/formatters';
import { motion } from 'framer-motion';
import { useAppData } from '@/context/AppDataContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { WasteDetailModal } from '@/components/shared/WasteDetailModal';

export default function Marketplace() {
  const { listings, reserveListing, getWasteReportByEventName, getVerifiedEventNames } = useAppData();
  const { user } = useAuth();
  const { showToast } = useToast();
  const verifiedEvents = useMemo(() => new Set(getVerifiedEventNames()), [getVerifiedEventNames]);
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('distance');
  const [maxDistance, setMaxDistance] = useState(50);
  const [detailItem, setDetailItem] = useState(null);

  const filtered = useMemo(() => {
    let list = [...listings];
    if (category !== 'all') list = list.filter((l) => l.wasteType.toLowerCase() === category);
    list = list.filter((l) => l.distance <= maxDistance);
    if (sort === 'distance') list.sort((a, b) => a.distance - b.distance);
    if (sort === 'urgency') list.sort((a, b) => (a.urgency === 'critical' ? -1 : 1));
    if (sort === 'value') list.sort((a, b) => b.estimatedValue - a.estimatedValue);
    return list;
  }, [listings, category, sort, maxDistance, verifiedEvents]);

  const handleReserve = (l) => {
    if (l.status !== 'available') return;
    reserveListing(l.id, user?.organization);
    showToast(`Waste reserved for ${l.eventName}. Status: Reserved`);
  };

  const openDetails = (l) => {
    const report = getWasteReportByEventName(l.eventName);
    setDetailItem({
      ...l,
      locality: l.location,
      notes: report?.notes || 'No additional notes provided.',
      food: report?.food,
      plastic: report?.plastic,
      paper: report?.paper,
      flowers: report?.flowers,
      decoration: report?.decoration,
      ewaste: report?.ewaste,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="flex flex-wrap gap-4 items-end">
        <Select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={[
            { value: 'all', label: 'All' },
            { value: 'food', label: 'Food' },
            { value: 'flowers', label: 'Flowers' },
            { value: 'plastic', label: 'Plastic' },
            { value: 'paper', label: 'Paper' },
            { value: 'e-waste', label: 'E-Waste' },
          ]}
        />
        <Select
          label="Sort by"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          options={[
            { value: 'distance', label: 'Distance' },
            { value: 'urgency', label: 'Urgency' },
            { value: 'value', label: 'Value' },
          ]}
        />
        <div>
          <label className="text-sm text-[var(--text-muted)]">Max distance: {maxDistance} km</label>
          <input type="range" min="1" max="50" value={maxDistance} onChange={(e) => setMaxDistance(+e.target.value)} className="mt-1 w-full accent-eco-500" />
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((l, i) => (
          <motion.div key={l.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card hover>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-display font-semibold">{l.eventName}</h3>
                  <p className="text-sm text-eco-400">{l.wasteType} · {formatWeight(l.quantity)}</p>
                </div>
                <StatusBadge status={l.status} />
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <MapPin className="h-3.5 w-3.5" />{l.location} · {l.distance} km
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="font-semibold text-eco-400">{formatCurrency(l.estimatedValue)}</span>
              </div>
              <div className="mt-4 flex gap-2">
                <Button
                  size="sm"
                  className="flex-1"
                  disabled={l.status !== 'available'}
                  onClick={() => handleReserve(l)}
                >
                  {l.status === 'reserved' ? 'Reserved' : 'Reserve'}
                </Button>
                <Button size="sm" variant="ghost" onClick={() => openDetails(l)}>Details</Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <WasteDetailModal open={!!detailItem} onClose={() => setDetailItem(null)} data={detailItem} />
    </div>
  );
}
