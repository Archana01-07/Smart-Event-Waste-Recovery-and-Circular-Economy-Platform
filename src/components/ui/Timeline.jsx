import { cn } from '@/utils/cn';
import { Check } from 'lucide-react';

export function Timeline({ steps, currentStep = 0 }) {
  return (
    <div className="space-y-0">
      {steps.map((step, i) => {
        const done = i < currentStep;
        const active = i === currentStep;
        return (
          <div key={step.id || i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium transition-all',
                  done && 'border-eco-500 bg-eco-500 text-white',
                  active && 'border-eco-400 bg-eco-500/20 text-eco-400',
                  !done && !active && 'border-[var(--border-glass)] text-[var(--text-muted)]'
                )}
              >
                {done ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    'my-1 w-0.5 flex-1 min-h-[32px]',
                    done ? 'bg-eco-500' : 'bg-[var(--border-glass)]'
                  )}
                />
              )}
            </div>
            <div className="pb-8">
              <p className={cn('font-medium', active || done ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]')}>
                {step.title}
              </p>
              {step.description && (
                <p className="mt-0.5 text-sm text-[var(--text-muted)]">{step.description}</p>
              )}
              {step.time && (
                <p className="mt-1 text-xs text-eco-500/80">{step.time}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
