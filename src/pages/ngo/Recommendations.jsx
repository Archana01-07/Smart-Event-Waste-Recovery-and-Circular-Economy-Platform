import { useState } from 'react';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';
import { useAppData } from '@/context/AppDataContext';
import { AIRecommendationCard } from '@/components/ai/AIRecommendationCard';
import { WasteDetailModal } from '@/components/shared/WasteDetailModal';

export default function Recommendations() {
  const { showToast } = useToast();
  const { user } = useAuth();
  const { listings, reserveListing, getRecommendations } = useAppData();
  const recommendations = getRecommendations();
  const [reservedRecs, setReservedRecs] = useState(new Set());
  const [detailRec, setDetailRec] = useState(null);

  const handleReserve = (rec) => {
    if (reservedRecs.has(rec.id)) return;
    const listing = listings.find((l) => l.id === rec.listingId || l.eventName === rec.eventName);
    if (listing && listing.status === 'available') {
      reserveListing(listing.id, user?.organization);
    }
    setReservedRecs((prev) => new Set([...prev, rec.id]));
    showToast(`Pickup reserved for ${rec.eventName}. Confirm in Pickups to assign officially.`);
  };

  const detailData = detailRec
    ? {
        ...detailRec,
        wasteType: detailRec.wasteAvailable,
        location: detailRec.location,
        locality: detailRec.location,
        reason: detailRec.reason,
      }
    : null;

  if (recommendations.length === 0) {
    return (
      <p className="text-sm text-[var(--text-muted)]">
        No recommendations yet. New waste reports from verified events will appear here.
      </p>
    );
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {recommendations.map((rec, i) => (
          <AIRecommendationCard
            key={rec.id}
            rec={rec}
            index={i}
            isReserved={
              reservedRecs.has(rec.id) ||
              ['reserved', 'confirmed', 'collected'].includes(
                listings.find((l) => l.eventName === rec.eventName)?.status
              )
            }
            onReserve={handleReserve}
            onDetails={setDetailRec}
          />
        ))}
      </div>
      <WasteDetailModal open={!!detailRec} onClose={() => setDetailRec(null)} title="Recommendation Details" data={detailData} />
    </>
  );
}
