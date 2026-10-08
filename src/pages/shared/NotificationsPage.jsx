import { motion } from 'framer-motion';
import { Bell, Truck, Shield, Store, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { mockNotifications } from '@/data/notifications';
import { cn } from '@/utils/cn';

const typeIcons = { pickup: Truck, verification: Shield, marketplace: Store, alert: AlertTriangle, system: Shield, analytics: Bell };

export default function NotificationsPage({ role }) {
  const notifications = mockNotifications.filter((n) => n.role === role);

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      {notifications.map((n, i) => {
        const Icon = typeIcons[n.type] || Bell;
        return (
          <motion.div key={n.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className={cn('flex gap-4', !n.read && 'border-eco-500/20')}>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-eco-500/15 text-eco-400">
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium">{n.title}</h3>
                  {!n.read && <Badge variant="success" dot>New</Badge>}
                </div>
                <p className="mt-1 text-sm text-[var(--text-muted)]">{n.message}</p>
                <p className="mt-2 text-xs text-eco-500/70">{n.time}</p>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
