import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="flex h-9 w-9 items-center justify-center rounded-xl glass text-[var(--text-muted)] hover:text-eco-400 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </motion.button>
  );
}
