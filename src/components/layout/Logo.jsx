import { Link } from 'react-router-dom';
import { Recycle } from 'lucide-react';

export function Logo({ to = '/', size = 'md', showText = true }) {
  const sizes = { sm: 'h-7 w-7', md: 'h-9 w-9', lg: 'h-11 w-11' };
  const textSizes = { sm: 'text-lg', md: 'text-xl', lg: 'text-2xl' };

  const content = (
    <div className="flex items-center gap-2.5">
      <div className={`flex ${sizes[size]} items-center justify-center rounded-xl bg-gradient-to-br from-eco-500 to-eco-700 shadow-lg shadow-eco-600/30`}>
        <Recycle className="h-1/2 w-1/2 text-white" />
      </div>
      {showText && (
        <span className={`font-display font-bold ${textSizes[size]} text-[var(--text-primary)]`}>
          EcoLoop
        </span>
      )}
    </div>
  );

  if (to) return <Link to={to} className="inline-flex">{content}</Link>;
  return content;
}
