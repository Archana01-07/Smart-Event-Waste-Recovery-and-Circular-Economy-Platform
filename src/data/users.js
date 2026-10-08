export const mockUsers = [
  {
    id: 'org-1',
    name: 'Organizer',
    email: 'organizer@ecoloop',
    password: 'Demo1234',
    role: 'organizer',
    organization: 'GreenFest Events',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=organizer',
    verified: true,
  },
  {
    id: 'ngo-1',
    name: 'Recycler',
    email: 'ngo@ecoloop',
    password: 'Demo1234',
    role: 'ngo',
    organization: 'EcoRecycle Foundation',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=recycler',
    verified: true,
  },
  {
    id: 'admin-1',
    name: 'Admin',
    email: 'admin@ecoloop',
    password: 'Demo1234',
    role: 'admin',
    organization: 'EcoLoop City Ops',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    verified: true,
  },
];

export const roleOptions = [
  {
    id: 'organizer',
    title: 'Event Organizer',
    description: 'Report event waste and schedule smart pickups',
    icon: 'Calendar',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'ngo',
    title: 'NGO / Industry / Recycler',
    description: 'Acquire waste and optimize recovery operations',
    icon: 'Factory',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'admin',
    title: 'Platform Admin',
    description: 'Verify participants and monitor city-wide analytics',
    icon: 'Shield',
    color: 'from-violet-500 to-purple-600',
  },
];
