import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Logo } from '@/components/layout/Logo';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const workflow = [
  { step: 1, title: 'Event', desc: 'Organizer registers event' },
  { step: 2, title: 'Report', desc: 'Waste quantities logged' },
  { step: 3, title: 'Match', desc: 'Best recycler matched' },
  { step: 4, title: 'Recover', desc: 'Optimized pickup & reuse' },
];

const features = [
  { title: 'Smart Matching', desc: 'Partner recommendations for waste recovery' },
  { title: 'Route Optimization', desc: 'Efficient pickup routing across Chennai' },
  { title: 'Sustainability Analytics', desc: 'Track waste recovery and environmental impact' },
  { title: 'Circular Marketplace', desc: 'Connect waste supply with recycler demand' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <nav className="fixed top-0 z-50 w-full glass border-b border-[var(--border-glass)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <Logo to="/" />
          <div className="hidden items-center gap-8 md:flex">
            <a href="#workflow" className="text-sm text-[var(--text-muted)] hover:text-eco-400 transition-colors">Workflow</a>
            <a href="#features" className="text-sm text-[var(--text-muted)] hover:text-eco-400 transition-colors">Features</a>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link to="/login" className="hidden text-sm text-[var(--text-muted)] hover:text-eco-400 sm:block">Sign in</Link>
          </div>
        </div>
      </nav>

      {/* Hero — EcoLoop title + buttons only */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="absolute inset-0 eco-grid-bg opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-5xl font-bold text-[var(--text-primary)] md:text-7xl">
              EcoLoop
            </h1>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/login"><Button size="lg" variant="secondary">View Demo</Button></Link>
              <Link to="/role-select"><Button size="lg" icon={ArrowRight}>Get Started</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How EcoLoop Works */}
      <section id="workflow" className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="font-display text-3xl font-bold text-center md:text-4xl">How EcoLoop Works</h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-[var(--text-muted)]">Event → Waste → Match → Recovery</p>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {workflow.map((w, i) => (
              <motion.div key={w.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                <Card className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-eco-500 to-eco-700 font-display text-lg font-bold text-white">{w.step}</div>
                  <h3 className="mt-4 font-display font-semibold">{w.title}</h3>
                  <p className="mt-2 text-sm text-[var(--text-muted)]">{w.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section id="features" className="py-20 bg-eco-950/5 dark:bg-eco-950/30">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="font-display text-3xl font-bold text-center">Platform Features</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card hover>
                  <h3 className="font-display font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm text-[var(--text-muted)]">{f.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--border-glass)] py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <Logo to="/" />
          <p className="text-sm text-[var(--text-muted)]">© 2026 EcoLoop</p>
          <div className="flex gap-6 text-sm text-[var(--text-muted)]">
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
