import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/layout/Logo';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { AuthMotionBackground } from '@/components/auth/AuthMotionBackground';

export function AuthLayout({ children, title = 'EcoLoop' }) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <AuthMotionBackground />
      </div>

      <div className="flex flex-1 flex-col bg-[var(--bg-primary)]">
        <div className="flex items-center justify-between p-4 lg:p-6">
          <div className="lg:hidden"><Logo to="/" /></div>
          <div className="ml-auto flex items-center gap-3">
            <ThemeToggle />
            <Link to="/login" className="text-sm text-[var(--text-muted)] hover:text-eco-400 hidden sm:block">
              Sign in
            </Link>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center px-4 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <div className="mb-8 text-center lg:text-left">
              <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">{title}</h1>
            </div>
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
