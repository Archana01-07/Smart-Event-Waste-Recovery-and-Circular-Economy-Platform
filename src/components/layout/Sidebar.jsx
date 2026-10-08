import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, ChevronLeft, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Logo } from './Logo';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/utils/cn';

export function Sidebar({ navItems, basePath }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarContent = (
    <>
      <div className="flex items-center justify-between border-b border-[var(--border-glass)] p-4">
        <Logo to={basePath} size="sm" showText={!collapsed} />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex h-8 w-8 items-center justify-center rounded-lg hover:bg-eco-500/10 text-[var(--text-muted)]"
        >
          <ChevronLeft className={cn('h-4 w-4 transition-transform', collapsed && 'rotate-180')} />
        </button>
        <button onClick={() => setMobileOpen(false)} className="lg:hidden">
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={`${basePath}${item.path}`}
            end={item.path === ''}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                isActive
                  ? 'bg-gradient-to-r from-eco-600/30 to-eco-500/10 text-eco-300 border border-eco-500/20'
                  : 'text-[var(--text-muted)] hover:bg-eco-500/10 hover:text-[var(--text-primary)]'
              )
            }
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {(!collapsed || mobileOpen) && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-[var(--border-glass)] p-4">
        <div className={cn('flex items-center gap-3', collapsed && 'justify-center')}>
          <img src={user?.avatar} alt="" className="h-9 w-9 rounded-full bg-eco-500/20" />
          {(!collapsed || mobileOpen) && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{user?.name}</p>
              <p className="truncate text-xs text-[var(--text-muted)] capitalize">{user?.role}</p>
            </div>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="mt-3 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          {(!collapsed || mobileOpen) && 'Sign out'}
        </button>
      </div>
    </>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-xl glass lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <aside
        className={cn(
          'hidden lg:flex flex-col glass border-r border-[var(--border-glass)] h-screen sticky top-0 transition-all duration-300',
          collapsed ? 'w-[72px]' : 'w-64'
        )}
      >
        {sidebarContent}
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="fixed left-0 top-0 z-50 flex h-full w-64 flex-col glass lg:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
