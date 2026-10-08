export const organizerKpis = {
  totalWasteReported: 4280,
  revenueEarned: 186400,
  sustainabilityScore: 87,
  co2Reduction: 12.4,
  activePickups: 5,
  recoveryRate: 78,
};

export const ngoKpis = {
  wasteAcquired: 12450,
  recoveryEfficiency: 92,
  activePickups: 8,
  nearbyEvents: 14,
  revenue: 542000,
  matchScore: 94,
};

export const adminKpis = {
  totalEvents: 342,
  verifiedOrganizations: 128,
  wasteRecovered: 89400,
  co2Saved: 2840,
  activePickups: 47,
  revenue: 4200000,
  landfillReduction: 34,
  foodDonated: 12800,
};

export const co2Trend = [
  { month: 'Jan', saved: 1.2, target: 1.5 },
  { month: 'Feb', saved: 1.8, target: 1.5 },
  { month: 'Mar', saved: 2.1, target: 2.0 },
  { month: 'Apr', saved: 2.4, target: 2.0 },
  { month: 'May', saved: 3.1, target: 2.5 },
  { month: 'Jun', saved: 3.8, target: 2.5 },
  { month: 'Jul', saved: 4.2, target: 3.0 },
  { month: 'Aug', saved: 5.1, target: 3.0 },
  { month: 'Sep', saved: 5.8, target: 3.5 },
  { month: 'Oct', saved: 6.4, target: 3.5 },
  { month: 'Nov', saved: 7.2, target: 4.0 },
  { month: 'Dec', saved: 8.1, target: 4.0 },
];

export const wasteTrend = [
  { month: 'Jan', food: 420, plastic: 280, paper: 190, eWaste: 45 },
  { month: 'Feb', food: 510, plastic: 320, paper: 210, eWaste: 52 },
  { month: 'Mar', food: 480, plastic: 350, paper: 240, eWaste: 48 },
  { month: 'Apr', food: 620, plastic: 390, paper: 260, eWaste: 61 },
  { month: 'May', food: 710, plastic: 420, paper: 280, eWaste: 70 },
  { month: 'Jun', food: 680, plastic: 450, paper: 300, eWaste: 75 },
];

export const wasteDistribution = [
  { name: 'Food', value: 35, color: '#10b981' },
  { name: 'Plastic', value: 28, color: '#06b6d4' },
  { name: 'Paper', value: 18, color: '#8b5cf6' },
  { name: 'Flowers', value: 8, color: '#f472b6' },
  { name: 'Decoration', value: 6, color: '#f59e0b' },
  { name: 'E-Waste', value: 5, color: '#6366f1' },
];

export const revenueAnalytics = [
  { month: 'Jan', revenue: 12000, cost: 4000 },
  { month: 'Feb', revenue: 15000, cost: 4500 },
  { month: 'Mar', revenue: 18000, cost: 5000 },
  { month: 'Apr', revenue: 22000, cost: 5500 },
  { month: 'May', revenue: 28000, cost: 6000 },
  { month: 'Jun', revenue: 32000, cost: 6500 },
];

export const recoveryByCategory = [
  { category: 'Food', recovered: 92, donated: 78 },
  { category: 'Plastic', recovered: 88, donated: 0 },
  { category: 'Paper', recovered: 95, donated: 0 },
  { category: 'Flowers', recovered: 72, donated: 45 },
  { category: 'E-Waste', recovered: 98, donated: 0 },
];

export const pickupTrends = [
  { week: 'W1', completed: 12, delayed: 2, cancelled: 1 },
  { week: 'W2', completed: 15, delayed: 1, cancelled: 0 },
  { week: 'W3', completed: 18, delayed: 3, cancelled: 1 },
  { week: 'W4', completed: 22, delayed: 2, cancelled: 0 },
];

export const environmentalImpact = [
  { metric: 'Trees Saved', value: 1240, unit: 'eq.' },
  { metric: 'Water Saved', value: 84000, unit: 'L' },
  { metric: 'Energy Saved', value: 4200, unit: 'kWh' },
  { metric: 'Landfill Avoided', value: 34, unit: '%' },
];

export const sustainabilityMetrics = [
  { label: 'Landfill Reduction', value: 34, trend: '+5%' },
  { label: 'Food Donated', value: 12800, trend: '+12%', unit: 'kg' },
  { label: 'Recycling Efficiency', value: 91, trend: '+3%', unit: '%' },
  { label: 'Carbon Reduction', value: 2840, trend: '+18%', unit: 'tCO₂' },
];

export const collectionAnalytics = {
  routeEfficiency: 87,
  delayedPickups: 6,
  fuelUsage: 1240,
  avgDelay: 18,
  trucksActive: 12,
};

export const routeEfficiencyData = [
  { route: 'R1', efficiency: 92, distance: 24 },
  { route: 'R2', efficiency: 85, distance: 31 },
  { route: 'R3', efficiency: 78, distance: 42 },
  { route: 'R4', efficiency: 94, distance: 18 },
  { route: 'R5', efficiency: 88, distance: 28 },
];
