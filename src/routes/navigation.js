import {
  LayoutDashboard, Calendar, Trash2, Truck, MapPin,
  Building2, Sparkles, Store, Shield, Map, Route, Leaf,
} from 'lucide-react';

export const organizerNav = [
  { path: '', label: 'Overview', icon: LayoutDashboard },
  { path: '/events', label: 'Events', icon: Calendar },
  { path: '/waste', label: 'Waste Report', icon: Trash2 },
  { path: '/pickup', label: 'Pickup', icon: Truck },
  { path: '/tracking', label: 'Tracking', icon: MapPin },
];

export const ngoNav = [
  { path: '', label: 'Overview', icon: LayoutDashboard },
  { path: '/register', label: 'Organization', icon: Building2 },
  { path: '/recommendations', label: 'Recommendation', icon: Sparkles },
  { path: '/marketplace', label: 'Marketplace', icon: Store },
  { path: '/pickups', label: 'Pickups', icon: Truck },
];

export const adminNav = [
  { path: '', label: 'Overview', icon: LayoutDashboard },
  { path: '/events', label: 'Events', icon: Calendar },
  { path: '/organizations', label: 'Organizations', icon: Shield },
  { path: '/map', label: 'Hotspot Map', icon: Map },
  { path: '/collection', label: 'Collection', icon: Route },
  { path: '/sustainability', label: 'Sustainability', icon: Leaf },
];

export const roleDashboardPaths = {
  organizer: '/organizer',
  ngo: '/ngo',
  admin: '/admin',
};
