import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, Truck, Shield, Store, AlertTriangle } from 'lucide-react';
import { mockNotifications } from '@/data/notifications';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/utils/cn';

const typeIcons = {
  pickup: Truck,
  verification: Shield,
  marketplace: Store,
  alert: AlertTriangle,
  system: Shield,
  analytics: Check,
};

export function NotificationCenter() {
  const { role } = useAuth();
  const [open, setOpen] = useState(false);
  const notifications = mockNotifications.filter((n) => n.role === role);
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative flex h-9 w-9 items-center justify-center rounded-xl glass hover:text-eco-400 transition-colors"
      >
        <Bell className="h-4 w-4" />
        {unread > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-eco-500 text-[10px] font-bold text-white">
            {unread}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 top-12 z-50 w-80 glass-card overflow-hidden"
            >
              <div className="border-b border-[var(--border-glass)] px-4 py-3">
                <h3 className="font-display font-semibold">Notifications</h3>
                <p className="text-xs text-[var(--text-muted)]">{unread} unread</p>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((n) => {
                  const Icon = typeIcons[n.type] || Bell;
                  return (
                    <div
                      key={n.id}
                      className={cn(
                        'flex gap-3 border-b border-[var(--border-glass)]/50 px-4 py-3 transition-colors hover:bg-eco-500/5',
                        !n.read && 'bg-eco-500/5'
                      )}
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-eco-500/15 text-eco-400">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{n.title}</p>
                        <p className="text-xs text-[var(--text-muted)] line-clamp-2">{n.message}</p>
                        <p className="mt-1 text-[10px] text-eco-500/70">{n.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
