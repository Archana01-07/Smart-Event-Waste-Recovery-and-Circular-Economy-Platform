import { cn } from '@/utils/cn';

export function Input({ label, error, icon: Icon, className, containerClassName, ...props }) {
  return (
    <div className={cn('space-y-1.5', containerClassName)}>
      {label && (
        <label className="block text-sm font-medium text-[var(--text-secondary)]">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
        )}
        <input
          className={cn(
            'w-full rounded-xl border border-[var(--border-glass)] bg-[var(--bg-glass)]',
            'px-4 py-2.5 text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/60',
            'outline-none transition-all focus:border-eco-500/50 focus:ring-2 focus:ring-eco-500/20',
            Icon && 'pl-10',
            error && 'border-red-500/50 focus:ring-red-500/20',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function Textarea({ label, error, className, ...props }) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-[var(--text-secondary)]">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          'w-full rounded-xl border border-[var(--border-glass)] bg-[var(--bg-glass)]',
          'px-4 py-2.5 text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/60',
          'outline-none transition-all focus:border-eco-500/50 focus:ring-2 focus:ring-eco-500/20 min-h-[100px] resize-y',
          error && 'border-red-500/50',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function Select({ label, error, options = [], className, ...props }) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-[var(--text-secondary)]">
          {label}
        </label>
      )}
      <select
        className={cn(
          'w-full rounded-xl border border-[var(--border-glass)] bg-[var(--bg-glass)]',
          'px-4 py-2.5 text-[var(--text-primary)] outline-none',
          'focus:border-eco-500/50 focus:ring-2 focus:ring-eco-500/20',
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value ?? opt} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
