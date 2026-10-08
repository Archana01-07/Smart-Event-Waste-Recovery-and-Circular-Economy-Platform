import { cn } from '@/utils/cn';

export function Table({ columns, data, onRowClick, className }) {
  return (
    <div className={cn('overflow-x-auto rounded-xl', className)}>
      <table className="w-full min-w-[600px] text-left text-sm">
        <thead>
          <tr className="border-b border-[var(--border-glass)]">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 font-medium text-[var(--text-muted)]"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={row.id || i}
              onClick={() => onRowClick?.(row)}
              className={cn(
                'border-b border-[var(--border-glass)]/50 transition-colors',
                onRowClick && 'cursor-pointer hover:bg-eco-500/5'
              )}
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-[var(--text-primary)]">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
