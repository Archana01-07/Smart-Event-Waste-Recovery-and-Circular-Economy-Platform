import { motion } from 'framer-motion';
import { Inbox } from 'lucide-react';
import { Button } from './Button';

export function EmptyState({ title, description, actionLabel, onAction, icon: Icon = Inbox }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-eco-500/10 text-eco-400">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-[var(--text-muted)]">{description}</p>
      {actionLabel && onAction && (
        <Button className="mt-6" onClick={onAction}>{actionLabel}</Button>
      )}
    </motion.div>
  );
}
