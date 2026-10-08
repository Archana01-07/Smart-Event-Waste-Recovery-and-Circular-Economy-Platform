import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { organizerNav, ngoNav, adminNav } from './navigation';
import { useAuth } from '@/context/AuthContext';

import LandingPage from '@/pages/landing/LandingPage';
import LoginPage from '@/pages/auth/LoginPage';
import SignupPage from '@/pages/auth/SignupPage';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';
import RoleSelectPage from '@/pages/auth/RoleSelectPage';

import OrganizerOverview from '@/pages/organizer/OrganizerOverview';
import EventRegistration from '@/pages/organizer/EventRegistration';
import WasteReporting from '@/pages/organizer/WasteReporting';
import PickupRequests from '@/pages/organizer/PickupRequests';
import TrackingDashboard from '@/pages/organizer/TrackingDashboard';

import NgoOverview from '@/pages/ngo/NgoOverview';
import OrganizationRegister from '@/pages/ngo/OrganizationRegister';
import Recommendations from '@/pages/ngo/Recommendations';
import Marketplace from '@/pages/ngo/Marketplace';
import PickupManagement from '@/pages/ngo/PickupManagement';

import AdminOverview from '@/pages/admin/AdminOverview';
import EventVerification from '@/pages/admin/EventVerification';
import OrgVerification from '@/pages/admin/OrgVerification';
import HotspotMap from '@/pages/admin/HotspotMap';
import CollectionAnalytics from '@/pages/admin/CollectionAnalytics';
import SustainabilityMetrics from '@/pages/admin/SustainabilityMetrics';

function RoleRedirect() {
  const { role, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  const paths = { organizer: '/organizer', ngo: '/ngo', admin: '/admin' };
  return <Navigate to={paths[role] || '/'} />;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/role-select" element={<RoleSelectPage />} />
      <Route path="/dashboard" element={<RoleRedirect />} />

      <Route
        path="/organizer"
        element={
          <ProtectedRoute allowedRoles={['organizer']}>
            <DashboardLayout navItems={organizerNav} basePath="/organizer" role="organizer" />
          </ProtectedRoute>
        }
      >
        <Route index element={<OrganizerOverview />} />
        <Route path="events" element={<EventRegistration />} />
        <Route path="waste" element={<WasteReporting />} />
        <Route path="pickup" element={<PickupRequests />} />
        <Route path="tracking" element={<TrackingDashboard />} />
        <Route path="analytics" element={<Navigate to="/organizer" replace />} />
        <Route path="notifications" element={<Navigate to="/organizer" replace />} />
      </Route>

      <Route
        path="/ngo"
        element={
          <ProtectedRoute allowedRoles={['ngo']}>
            <DashboardLayout navItems={ngoNav} basePath="/ngo" role="ngo" />
          </ProtectedRoute>
        }
      >
        <Route index element={<NgoOverview />} />
        <Route path="register" element={<OrganizationRegister />} />
        <Route path="recommendations" element={<Recommendations />} />
        <Route path="marketplace" element={<Marketplace />} />
        <Route path="pickups" element={<PickupManagement />} />
        <Route path="analytics" element={<Navigate to="/ngo" replace />} />
        <Route path="notifications" element={<Navigate to="/ngo" replace />} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DashboardLayout navItems={adminNav} basePath="/admin" role="admin" />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminOverview />} />
        <Route path="events" element={<EventVerification />} />
        <Route path="organizations" element={<OrgVerification />} />
        <Route path="analytics" element={<Navigate to="/admin" replace />} />
        <Route path="map" element={<HotspotMap />} />
        <Route path="collection" element={<CollectionAnalytics />} />
        <Route path="sustainability" element={<SustainabilityMetrics />} />
        <Route path="notifications" element={<Navigate to="/admin" replace />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
