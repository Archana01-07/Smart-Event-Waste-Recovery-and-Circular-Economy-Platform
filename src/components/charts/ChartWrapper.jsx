import { Card, CardHeader } from '@/components/ui/Card';
import { ChartSkeleton } from '@/components/ui/Skeleton';

export function ChartWrapper({ title, subtitle, icon, action, loading, children, className }) {
  if (loading) return <ChartSkeleton className={className} />;
  return (
    <Card className={className}>
      {(title || subtitle) && (
        <CardHeader title={title} subtitle={subtitle} icon={icon} action={action} />
      )}
      <div className="h-64 w-full md:h-72">{children}</div>
    </Card>
  );
}
