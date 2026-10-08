import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { AuthLayout } from '@/layouts/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { validateEmail } from '@/utils/validators';
import { useToast } from '@/context/ToastContext';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) { setError('Enter a valid email'); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSent(true);
    showToast('Password reset link sent to your email.');
    setLoading(false);
  };

  return (
    <AuthLayout title="EcoLoop">
      {sent ? (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card p-8 text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-eco-400" />
          <h3 className="mt-4 font-display text-lg font-semibold">Check your inbox</h3>
          <p className="mt-2 text-sm text-[var(--text-muted)]">Reset link sent to {email}</p>
          <Link to="/login" className="mt-6 inline-flex items-center gap-2 text-sm text-eco-500">
            <ArrowLeft className="h-4 w-4" /> Back to login
          </Link>
        </motion.div>
      ) : (
        <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit} className="glass-card space-y-5 p-6">
          <Input label="Email" type="email" icon={Mail} value={email} onChange={(e) => setEmail(e.target.value)} error={error} />
          <Button type="submit" className="w-full" loading={loading}>Send reset link</Button>
          <Link to="/login" className="flex items-center justify-center gap-2 text-sm text-[var(--text-muted)] hover:text-eco-400">
            <ArrowLeft className="h-4 w-4" /> Back to login
          </Link>
        </motion.form>
      )}
    </AuthLayout>
  );
}
