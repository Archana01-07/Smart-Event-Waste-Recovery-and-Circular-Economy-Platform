import { ThemeToggle } from './ThemeToggle';

export function DashboardNavbar({ title, subtitle }) {
  return (
    <header className="sticky top-0 z-30 glass border-b border-[var(--border-glass)] px-4 py-4 md:px-6 lg:pl-6">
      <div className="flex items-center justify-between gap-4 pl-12 lg:pl-0">
        <div>
          <h1 className="font-display text-xl font-bold text-[var(--text-primary)] md:text-2xl">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-[var(--text-muted)]">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
