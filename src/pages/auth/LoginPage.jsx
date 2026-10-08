import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { AuthLayout } from '@/layouts/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { validateEmail } from '@/utils/validators';
import { roleDashboardPaths } from '@/routes/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!validateEmail(email)) errs.email = 'Enter a valid email';
    if (!password) errs.password = 'Password is required';
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    try {
      const user = await login(email, password);
      showToast('Signed in successfully.');
      navigate(from || roleDashboardPaths[user.role] || '/');
    } catch (err) {
      setErrors({ form: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="EcoLoop">
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onSubmit={handleSubmit}
        className="glass-card space-y-5 p-6"
      >
        {errors.form && (
          <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">{errors.form}</p>
        )}
        <Input
          label="Email"
          type="email"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          placeholder="organizer@ecoloop"
        />
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] text-[var(--text-muted)] hover:text-eco-400"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-sm text-eco-500 hover:text-eco-400">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" className="w-full" loading={loading}>Sign in</Button>

        <p className="text-center text-sm text-[var(--text-muted)]">
          Don&apos;t have an account?{' '}
          <Link to="/role-select" className="font-medium text-eco-500 hover:text-eco-400">Sign up</Link>
        </p>
        <p className="text-center text-xs text-[var(--text-muted)]/70">
          Demo: organizer@ecoloop / ngo@ecoloop / admin@ecoloop — Demo1234
        </p>
      </motion.form>
    </AuthLayout>
  );
}
