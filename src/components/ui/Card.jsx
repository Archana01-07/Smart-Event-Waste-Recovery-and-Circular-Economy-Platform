import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

export function Card({ children, className, hover = false, ...props }) {
  const Comp = hover ? motion.div : 'div';
  const motionProps = hover
    ? { whileHover: { y: -4, transition: { duration: 0.2 } } }
    : {};

  return (
    <Comp
      className={cn('glass-card p-5 md:p-6', className)}
      {...motionProps}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function CardHeader({ title, subtitle, action, icon: Icon }) {
  return (
    <div className="mb-4 flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        {Icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-eco-500/15 text-eco-400">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <div>
          <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-0.5 text-sm text-[var(--text-muted)]">{subtitle}</p>
          )}
        </div>
      </div>
      {action}
    </div>
  );
}
