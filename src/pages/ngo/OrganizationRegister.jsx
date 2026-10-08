import { Building2 } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/Card';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { industryTypes } from '@/data/organizations';
import { wasteCategories } from '@/data/waste';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export default function OrganizationRegister() {
  const { user } = useAuth();
  const { showToast } = useToast();

  return (
    <Card>
      <CardHeader title="Organization Profile" subtitle="Update your recovery capabilities" icon={Building2} />
      <form
        className="grid gap-4 sm:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          showToast('Organization profile saved successfully.');
        }}
      >
        <Input label="Organization name" defaultValue={user?.organization || ''} className="sm:col-span-2" />
        <Select label="Industry type" options={industryTypes.map((t) => ({ value: t, label: t }))} defaultValue="NGO" />
        <Input label="Pickup capacity (kg/day)" type="number" defaultValue="5000" />
        <Input label="Location" className="sm:col-span-2" defaultValue="Anna Nagar, Chennai" />
        <Input label="Contact phone" defaultValue="+91 98765 43210" />
        <Input label="Contact email" type="email" defaultValue={user?.email} />
        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-[var(--text-secondary)]">Required waste types</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {wasteCategories.map((c) => (
              <label key={c.id} className="flex items-center gap-2 rounded-lg border border-[var(--border-glass)] px-3 py-2 text-sm cursor-pointer hover:bg-eco-500/10">
                <input type="checkbox" defaultChecked={['food', 'plastic', 'paper'].includes(c.id)} className="accent-eco-500" />
                {c.label}
              </label>
            ))}
          </div>
        </div>
        <Textarea label="Additional notes" className="sm:col-span-2" placeholder="Certifications, special equipment..." />
        <Button type="submit" className="sm:col-span-2">Save Profile</Button>
      </form>
    </Card>
  );
}
