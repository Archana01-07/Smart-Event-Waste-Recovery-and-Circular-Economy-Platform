import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { formatNumber, formatCurrency, formatPercent, formatWeight } from '@/utils/formatters';

export function KpiCard({
  title,
  value,
  trend,
  format = 'number',
  suffix,
  delay = 0,
  className,
}) {
  const formatted = () => {
    if (format === 'currency') return formatCurrency(value);
    if (format === 'percent') return formatPercent(value);
    if (format === 'weight') return formatWeight(value);
    if (format === 'raw') return value;
    return formatNumber(value) + (suffix || '');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={cn('glass-card p-5', className)}
    >
      <p className="text-sm text-[var(--text-muted)]">{title}</p>
      <p className="mt-1 font-display text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
        {formatted()}
      </p>
      {trend && (
        <p className="mt-2 text-xs font-medium text-emerald-400">{trend}</p>
      )}
    </motion.div>
  );
}
