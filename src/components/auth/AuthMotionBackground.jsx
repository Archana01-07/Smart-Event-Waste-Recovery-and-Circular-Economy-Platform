import { motion } from 'framer-motion';

export function AuthMotionBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-eco-950 via-eco-900 to-emerald-950">
      <div className="absolute inset-0 eco-grid-bg opacity-25" />
      <motion.div
        className="absolute -left-1/4 top-1/4 h-[420px] w-[420px] rounded-full bg-eco-500/20 blur-3xl"
        animate={{ x: [0, 80, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-0 bottom-0 h-[360px] w-[360px] rounded-full bg-cyan-500/15 blur-3xl"
        animate={{ x: [0, -60, 0], y: [0, 50, 0], scale: [1.1, 1, 1.1] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-eco-400/80"
        animate={{ scale: [1, 2.5, 1], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      {[...Array(6)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-emerald-300/60"
          style={{ left: `${15 + i * 14}%`, top: `${20 + (i % 3) * 25}%` }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
      <svg className="absolute inset-0 h-full w-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <motion.circle
          cx="50%"
          cy="50%"
          r="120"
          fill="none"
          stroke="rgb(16,185,129)"
          strokeWidth="1"
          strokeDasharray="8 12"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: 'center' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <motion.h2
          className="font-display text-4xl font-bold text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          EcoLoop
        </motion.h2>
      </div>
    </div>
  );
}
