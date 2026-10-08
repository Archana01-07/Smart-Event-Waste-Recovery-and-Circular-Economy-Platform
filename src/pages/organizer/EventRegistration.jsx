import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, CheckCircle } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/Card';
import { Input, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { eventTypes } from '@/data/events';
import { StatusBadge } from '@/components/ui/Badge';
import { formatDate } from '@/utils/formatters';
import { useAppData } from '@/context/AppDataContext';
import { useToast } from '@/context/ToastContext';

const chennaiLocalities = {
  'T Nagar, Chennai': { lat: 13.0418, lng: 80.2341 },
  'Velachery, Chennai': { lat: 12.9815, lng: 80.2180 },
  'Anna Nagar, Chennai': { lat: 13.0878, lng: 80.2085 },
  'Adyar, Chennai': { lat: 13.0067, lng: 80.2572 },
  'Tambaram, Chennai': { lat: 12.9249, lng: 80.1000 },
  'Guindy, Chennai': { lat: 13.0060, lng: 80.2209 },
  'Kodambakkam, Chennai': { lat: 13.0512, lng: 80.2242 },
  'Porur, Chennai': { lat: 13.0358, lng: 80.1562 },
  'OMR, Chennai': { lat: 12.9815, lng: 80.2180 },
  'Mylapore, Chennai': { lat: 13.0339, lng: 80.2694 },
  'Nungambakkam, Chennai': { lat: 13.0569, lng: 80.2426 },
  'Marina Beach Road, Chennai': { lat: 13.0500, lng: 80.2824 },
};

export default function EventRegistration() {
  const { events, addEvent } = useAppData();
  const { showToast } = useToast();
  const [form, setForm] = useState({
    name: '', type: eventTypes[0], location: 'T Nagar, Chennai', date: '', time: '', crowdSize: '', duration: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const coords = chennaiLocalities[form.location] || { lat: 13.0827, lng: 80.2707 };
    addEvent({
      ...form,
      crowdSize: Number(form.crowdSize),
      duration: Number(form.duration),
      organizer: 'Organizer',
      lat: coords.lat,
      lng: coords.lng,
    });
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setSubmitted(true);
    showToast('Event created successfully and sent for admin verification.');
  };

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <Card className="lg:col-span-3">
        <CardHeader title="Register New Event" subtitle="Submit for admin verification" icon={Calendar} />
        {submitted ? (
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="py-12 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-eco-400" />
            <p className="mt-4 font-display font-semibold">Event submitted!</p>
            <p className="text-sm text-[var(--text-muted)]">Pending admin verification</p>
            <Button className="mt-6" onClick={() => { setSubmitted(false); setForm({ name: '', type: eventTypes[0], location: 'T Nagar, Chennai', date: '', time: '', crowdSize: '', duration: '' }); }}>Register another</Button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
            <Input label="Event name" className="sm:col-span-2" value={form.name} onChange={(e) => update('name', e.target.value)} required />
            <Select label="Event type" value={form.type} onChange={(e) => update('type', e.target.value)} options={eventTypes.map((t) => ({ value: t, label: t }))} />
            <Select
              label="Location (Chennai)"
              value={form.location}
              onChange={(e) => update('location', e.target.value)}
              options={Object.keys(chennaiLocalities).map((l) => ({ value: l, label: l }))}
            />
            <Input label="Date" type="date" value={form.date} onChange={(e) => update('date', e.target.value)} required />
            <Input label="Time" type="time" icon={Clock} value={form.time} onChange={(e) => update('time', e.target.value)} />
            <Input label="Crowd size" type="number" icon={Users} value={form.crowdSize} onChange={(e) => update('crowdSize', e.target.value)} required />
            <Input label="Duration (hours)" type="number" value={form.duration} onChange={(e) => update('duration', e.target.value)} />
            <div className="sm:col-span-2"><Button type="submit" loading={loading}>Submit Event</Button></div>
          </form>
        )}
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader title="Your Events" />
        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {events.map((e) => (
            <div key={e.id} className="rounded-xl border border-[var(--border-glass)] p-4">
              <div className="flex justify-between"><p className="font-medium">{e.name}</p><StatusBadge status={e.verificationStatus} /></div>
              <p className="mt-1 text-xs text-[var(--text-muted)]">{e.type} · {formatDate(e.date)}</p>
              <p className="text-xs text-[var(--text-muted)]">{e.location}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
