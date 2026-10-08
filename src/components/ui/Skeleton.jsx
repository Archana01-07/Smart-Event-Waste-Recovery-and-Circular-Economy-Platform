import { cn } from '@/utils/cn';

export function Skeleton({ className }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-xl bg-eco-500/10',
        className
      )}
    />
  );
}

export function KpiSkeleton() {
  return (
    <div className="glass-card space-y-3 p-5">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-3 w-16" />
    </div>
  );
}

export function ChartSkeleton({ className }) {
  return (
    <div className={cn('glass-card p-6', className)}>
      <Skeleton className="mb-4 h-5 w-40" />
      <Skeleton className="h-48 w-full" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  );
}
