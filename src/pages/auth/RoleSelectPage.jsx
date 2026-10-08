import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { AuthLayout } from '@/layouts/AuthLayout';
import { Button } from '@/components/ui/Button';
import { roleOptions } from '@/data/users';
import { cn } from '@/utils/cn';

export default function RoleSelectPage() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  return (
    <AuthLayout title="EcoLoop">
      <div className="space-y-4">
        {roleOptions.map((role, i) => {
          const Icon = Icons[role.icon] || Icons.User;
          return (
            <motion.button
              key={role.id}
              type="button"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelected(role.id)}
              className={cn(
                'w-full glass-card p-5 text-left transition-all',
                selected === role.id && 'ring-2 ring-eco-500 border-eco-500/30'
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white', role.color)}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display font-semibold">{role.title}</h3>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">{role.description}</p>
                </div>
              </div>
            </motion.button>
          );
        })}
        <Button
          className="w-full"
          disabled={!selected}
          onClick={() => navigate(`/signup?role=${selected}`)}
        >
          Continue to signup
        </Button>
      </div>
    </AuthLayout>
  );
}
