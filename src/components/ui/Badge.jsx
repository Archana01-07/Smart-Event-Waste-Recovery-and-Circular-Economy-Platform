import { cn } from '@/utils/cn';

export function Badge({ children, variant = 'default', className, dot }) {
  const variants = {
    default: 'bg-eco-500/15 text-eco-400',
    success: 'bg-emerald-500/15 text-emerald-400',
    warning: 'bg-amber-500/15 text-amber-400',
    danger: 'bg-red-500/15 text-red-400',
    info: 'bg-blue-500/15 text-blue-400',
    purple: 'bg-violet-500/15 text-violet-400',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />}
      {children}
    </span>
  );
}

export function StatusBadge({ status }) {
  const map = {
    available: { label: 'Available', variant: 'success' },
    reserved: { label: 'Reserved', variant: 'warning' },
    confirmed: { label: 'Confirmed', variant: 'success' },
    collected: { label: 'Collected', variant: 'info' },
    pending: { label: 'Pending', variant: 'warning' },
    approved: { label: 'Approved', variant: 'success' },
    rejected: { label: 'Rejected', variant: 'danger' },
    verified: { label: 'Verified', variant: 'success' },
    matched: { label: 'Matched', variant: 'info' },
    pickup_requested: { label: 'Pickup Requested', variant: 'warning' },
    requested: { label: 'Requested', variant: 'default' },
    pending_event: { label: 'Pending Event', variant: 'warning' },
    scheduled: { label: 'Scheduled', variant: 'purple' },
    confirmed: { label: 'Confirmed', variant: 'success' },
    in_transit: { label: 'In Transit', variant: 'purple' },
    completed: { label: 'Completed', variant: 'success' },
    critical: { label: 'Critical', variant: 'danger' },
    high: { label: 'High', variant: 'warning' },
    medium: { label: 'Medium', variant: 'info' },
    low: { label: 'Low', variant: 'default' },
  };
  const cfg = map[status] || { label: status, variant: 'default' };
  return <Badge variant={cfg.variant}>{cfg.label}</Badge>;
}
