/** Recycler / NGO organization names used across dashboards */
export const recyclerOrganizations = [
  'EcoRecycle Foundation',
  'GreenCycle Industries',
  'Green Earth Recycling',
  'Chennai Food Recovery NGO',
  'Eco Plastic Recyclers',
  'Bloom Compost Co.',
];

export const DEFAULT_RECYCLER_ORG = 'EcoRecycle Foundation';

export function resolveRecyclerOrg(orgName) {
  if (orgName && orgName !== 'Recycler' && orgName !== 'NGO') return orgName;
  return DEFAULT_RECYCLER_ORG;
}
