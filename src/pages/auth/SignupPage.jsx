import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Building2, Eye, EyeOff } from 'lucide-react';
import { AuthLayout } from '@/layouts/AuthLayout';
import { Input, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { validateEmail, validatePassword } from '@/utils/validators';
import { roleDashboardPaths } from '@/routes/navigation';

export default function SignupPage() {
  const [searchParams] = useSearchParams();
  const defaultRole = searchParams.get('role') || 'organizer';
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirm: '', role: defaultRole, organization: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!validateEmail(form.email)) errs.email = 'Valid email required';
    const pwErrs = validatePassword(form.password);
    if (pwErrs.length) errs.password = pwErrs.join(', ');
    if (form.password !== form.confirm) errs.confirm = 'Passwords do not match';
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    try {
      const roleNames = { organizer: 'Organizer', ngo: 'Recycler', admin: 'Admin' };
      const payload = { ...form, name: roleNames[form.role] || form.name };
      const user = await signup(payload);
      showToast('Account created successfully.');
      navigate(roleDashboardPaths[user.role]);
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
        className="glass-card space-y-4 p-6"
      >
        {errors.form && <p className="text-sm text-red-400">{errors.form}</p>}
        <Input label="Full name" icon={User} value={form.name} onChange={(e) => update('name', e.target.value)} error={errors.name} />
        <Input label="Email" type="email" icon={Mail} value={form.email} onChange={(e) => update('email', e.target.value)} error={errors.email} />
        <Select
          label="Role"
          value={form.role}
          onChange={(e) => update('role', e.target.value)}
          options={[
            { value: 'organizer', label: 'Event Organizer' },
            { value: 'ngo', label: 'NGO / Industry / Recycler' },
            { value: 'admin', label: 'Admin' },
          ]}
        />
        {(form.role === 'ngo' || form.role === 'organizer') && (
          <Input label="Organization" icon={Building2} value={form.organization} onChange={(e) => update('organization', e.target.value)} />
        )}
        <div className="relative">
          <Input label="Password" type={showPassword ? 'text' : 'password'} icon={Lock} value={form.password} onChange={(e) => update('password', e.target.value)} error={errors.password} />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[38px] text-[var(--text-muted)]">
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <Input label="Confirm password" type="password" icon={Lock} value={form.confirm} onChange={(e) => update('confirm', e.target.value)} error={errors.confirm} />
        <Button type="submit" className="w-full" loading={loading}>Create account</Button>
        <p className="text-center text-sm text-[var(--text-muted)]">
          Already have an account? <Link to="/login" className="text-eco-500">Sign in</Link>
        </p>
      </motion.form>
    </AuthLayout>
  );
}
