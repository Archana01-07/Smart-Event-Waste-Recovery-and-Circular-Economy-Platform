import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/Card';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { wasteCategories, urgencyLevels } from '@/data/waste';
import { useAppData } from '@/context/AppDataContext';
import { useToast } from '@/context/ToastContext';

export default function WasteReporting() {
  const { events, addWasteReport } = useAppData();
  const { showToast } = useToast();
  const [form, setForm] = useState({
    event: '', food: '', plastic: '', flowers: '', paper: '', decoration: '', ewaste: '',
    urgency: 'medium', notes: '',
  });
  const [loading, setLoading] = useState(false);
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.event) {
      showToast('Please select an event.');
      return;
    }
    setLoading(true);
    addWasteReport({ eventId: form.event, ...form });
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    showToast('Waste report submitted successfully.');
    setForm({ event: '', food: '', plastic: '', flowers: '', paper: '', decoration: '', ewaste: '', urgency: 'medium', notes: '' });
  };

  return (
    <Card>
      <CardHeader title="Waste Reporting" subtitle="Log post-event waste streams" icon={Trash2} />
      <form onSubmit={handleSubmit} className="space-y-6">
        <Select
          label="Select event"
          value={form.event}
          onChange={(e) => update('event', e.target.value)}
          options={[
            { value: '', label: 'Choose event...' },
            ...events.map((e) => ({ value: e.id, label: e.name })),
          ]}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {wasteCategories.map((cat) => (
            <Input
              key={cat.id}
              label={`${cat.label} (kg)`}
              type="number"
              min="0"
              value={form[cat.id] || ''}
              onChange={(e) => update(cat.id, e.target.value)}
            />
          ))}
        </div>
        <Select
          label="Pickup urgency"
          value={form.urgency}
          onChange={(e) => update('urgency', e.target.value)}
          options={urgencyLevels.map((u) => ({ value: u.id, label: u.label }))}
        />
        <Textarea label="Notes" value={form.notes} onChange={(e) => update('notes', e.target.value)} placeholder="Special handling instructions..." />
        <Button type="submit" loading={loading} icon={Trash2}>Submit Waste Report</Button>
      </form>
    </Card>
  );
}
