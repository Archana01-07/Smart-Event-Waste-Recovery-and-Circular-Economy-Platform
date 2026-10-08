import { motion } from 'framer-motion';
import { Sparkles, MapPin, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/utils/formatters';

export function AIRecommendationCard({ rec, index = 0, onReserve, onDetails, isReserved }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card relative overflow-hidden p-5"
    >
      <div className="absolute right-0 top-0 h-24 w-24 bg-gradient-to-bl from-eco-500/20 to-transparent" />
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/30 to-eco-500/30">
            <Sparkles className="h-4 w-4 text-violet-300" />
          </div>
          <div>
            <p className="text-xs font-medium text-violet-400">Match · {rec.matchScore}%</p>
            <h4 className="font-display font-semibold text-[var(--text-primary)]">{rec.eventName}</h4>
          </div>
        </div>
        <Badge variant={rec.urgency === 'critical' ? 'danger' : rec.urgency === 'high' ? 'warning' : 'info'}>
          {rec.urgency}
        </Badge>
      </div>

      <p className="mt-3 text-sm text-eco-400">{rec.wasteAvailable}</p>

      <div className="mt-4 flex flex-wrap gap-4 text-sm text-[var(--text-muted)]">
        <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{rec.distance} km</span>
        <span className="flex items-center gap-1"><IndianRupee className="h-3.5 w-3.5" />{formatCurrency(rec.estimatedValue)}</span>
      </div>

      <div className="mt-4 flex gap-2">
        <Button
          size="sm"
          disabled={isReserved}
          onClick={() => onReserve?.(rec)}
        >
          {isReserved ? 'Reserved' : 'Reserve Pickup'}
        </Button>
        <Button size="sm" variant="ghost" onClick={() => onDetails?.(rec)}>Details</Button>
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-eco-900/50">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${rec.matchScore}%` }}
          transition={{ duration: 1, delay: index * 0.15 }}
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-eco-400"
        />
      </div>
    </motion.div>
  );
}
