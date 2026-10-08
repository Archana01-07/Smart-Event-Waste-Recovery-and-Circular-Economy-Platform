import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';
import { DashboardNavbar } from '@/components/layout/DashboardNavbar';

const pageTitles = {
  organizer: {
    '': { title: 'Dashboard', subtitle: 'Overview of your sustainability impact' },
    '/events': { title: 'Event Registration', subtitle: 'Register and manage your events' },
    '/waste': { title: 'Waste Reporting', subtitle: 'Report post-event waste streams' },
    '/pickup': { title: 'Pickup Requests', subtitle: 'Schedule and manage collections' },
    '/tracking': { title: 'Tracking', subtitle: 'Monitor pickup progress in real-time' },
  },
  ngo: {
    '': { title: 'Dashboard', subtitle: 'Recovery operations overview' },
    '/register': { title: 'Organization Profile', subtitle: 'Manage your organization details' },
    '/recommendations': { title: 'Recommendation', subtitle: '' },
    '/marketplace': { title: 'Waste Marketplace', subtitle: 'Browse available waste listings' },
    '/pickups': { title: 'Pickup Management', subtitle: 'Schedule and track collections' },
  },
  admin: {
    '': { title: 'Overview', subtitle: 'City-wide waste management and analytics' },
    '/events': { title: 'Event Verification', subtitle: 'Review and approve events' },
    '/organizations': { title: 'Organization Verification', subtitle: 'Verify NGOs and recyclers' },
    '/map': { title: 'Waste Hotspot Map', subtitle: 'GIS visualization — Chennai, Tamil Nadu' },
    '/collection': { title: 'Collection Analytics', subtitle: 'Fleet and route performance' },
    '/sustainability': { title: 'Sustainability Metrics', subtitle: 'Environmental impact dashboard' },
  },
};

export function DashboardLayout({ navItems, basePath, role }) {
  const location = useLocation();
  const subPath = location.pathname.replace(basePath, '') || '';
  const meta = pageTitles[role]?.[subPath] || { title: 'Dashboard', subtitle: '' };

  return (
    <div className="flex min-h-screen bg-[var(--bg-primary)]">
      <Sidebar navItems={navItems} basePath={basePath} />
      <div className="flex flex-1 flex-col min-w-0">
        <DashboardNavbar title={meta.title} subtitle={meta.subtitle} />
        <main className="flex-1 p-4 md:p-6 eco-grid-bg">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
