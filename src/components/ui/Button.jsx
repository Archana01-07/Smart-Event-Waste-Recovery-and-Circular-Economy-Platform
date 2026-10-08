import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

const variants = {
  primary: 'bg-gradient-to-r from-eco-600 to-eco-500 text-white hover:from-eco-500 hover:to-eco-400 shadow-lg shadow-eco-600/25',
  secondary: 'glass text-[var(--text-primary)] hover:bg-eco-500/10 border border-[var(--border-glass)]',
  ghost: 'text-[var(--text-secondary)] hover:bg-eco-500/10',
  danger: 'bg-red-600/90 text-white hover:bg-red-500',
  outline: 'border-2 border-eco-500/50 text-eco-500 hover:bg-eco-500/10',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-7 py-3.5 text-base rounded-xl',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  loading,
  disabled,
  icon: Icon,
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      ) : Icon ? (
        <Icon className="h-4 w-4" />
      ) : null}
      {children}
    </motion.button>
  );
}
