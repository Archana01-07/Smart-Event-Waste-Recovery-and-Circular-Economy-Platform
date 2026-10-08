import axios from 'axios';
import { mockEvents } from '@/data/events';
import { marketplaceListings, mockWasteReports, aiRecommendations } from '@/data/waste';
import { mockOrganizations, pendingVerifications } from '@/data/organizations';
import { mockNotifications } from '@/data/notifications';
import {
  organizerKpis, ngoKpis, adminKpis, co2Trend, wasteTrend,
  wasteDistribution, revenueAnalytics, recoveryByCategory,
} from '@/data/analytics';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export const eventService = {
  getAll: async () => { await delay(); return { data: mockEvents }; },
  getById: async (id) => { await delay(); return { data: mockEvents.find((e) => e.id === id) }; },
  create: async (event) => { await delay(600); return { data: { ...event, id: `evt-${Date.now()}`, status: 'pending' } }; },
};

export const wasteService = {
  getReports: async () => { await delay(); return { data: mockWasteReports }; },
  getMarketplace: async () => { await delay(); return { data: marketplaceListings }; },
  getRecommendations: async () => { await delay(); return { data: aiRecommendations }; },
  createReport: async (report) => { await delay(800); return { data: { ...report, id: `wr-${Date.now()}` } }; },
};

export const orgService = {
  getAll: async () => { await delay(); return { data: mockOrganizations }; },
  getPendingVerifications: async () => { await delay(); return { data: pendingVerifications }; },
};

export const notificationService = {
  getAll: async (role) => {
    await delay();
    return { data: mockNotifications.filter((n) => !role || n.role === role) };
  },
};

export const analyticsService = {
  getOrganizerKpis: async () => { await delay(); return { data: organizerKpis }; },
  getNgoKpis: async () => { await delay(); return { data: ngoKpis }; },
  getAdminKpis: async () => { await delay(); return { data: adminKpis }; },
  getCo2Trend: async () => { await delay(); return { data: co2Trend }; },
  getWasteTrend: async () => { await delay(); return { data: wasteTrend }; },
  getWasteDistribution: async () => { await delay(); return { data: wasteDistribution }; },
  getRevenueAnalytics: async () => { await delay(); return { data: revenueAnalytics }; },
  getRecoveryByCategory: async () => { await delay(); return { data: recoveryByCategory }; },
};

export default api;
