// Chennai, Tamil Nadu coordinates
export const mapCenter = [13.0827, 80.2707];
export const mapZoom = 12;

export const MAP_TILES = {
  dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  light: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
};

export const eventMarkers = [
  { id: 'evt-1', name: 'Green Tech Summit', lat: 13.0569, lng: 80.2426, waste: 850, type: 'event', location: 'Nungambakkam, Chennai' },
  { id: 'evt-2', name: 'Eco Wedding Expo', lat: 13.0339, lng: 80.2694, waste: 320, type: 'event', location: 'Mylapore, Chennai' },
  { id: 'evt-3', name: 'City Marathon', lat: 13.0067, lng: 80.2572, waste: 1485, type: 'event', location: 'Adyar, Chennai' },
  { id: 'evt-4', name: 'Fashion Week', lat: 13.0418, lng: 80.2341, waste: 410, type: 'event', location: 'T Nagar, Chennai' },
];

export const ngoMarkers = [
  { id: 'ngo-1', name: 'Recycler', lat: 13.0878, lng: 80.2085, type: 'ngo', location: 'Anna Nagar, Chennai' },
  { id: 'ngo-2', name: 'NGO', lat: 13.0060, lng: 80.2209, type: 'ngo', location: 'Guindy, Chennai' },
  { id: 'ngo-3', name: 'Recycler Hub', lat: 12.9815, lng: 80.2180, type: 'ngo', location: 'Velachery, Chennai' },
];

export const organizerMarkers = [
  { id: 'org-loc-1', name: 'Organizer', lat: 13.0827, lng: 80.2707, type: 'organizer', location: 'Kodambakkam, Chennai' },
];

export const wasteHotspots = [
  { lat: 13.0569, lng: 80.2426, intensity: 0.9 },
  { lat: 13.0339, lng: 80.2694, intensity: 0.7 },
  { lat: 13.0067, lng: 80.2572, intensity: 1.0 },
  { lat: 13.0418, lng: 80.2341, intensity: 0.5 },
  { lat: 12.9815, lng: 80.2180, intensity: 0.6 },
  { lat: 12.9249, lng: 80.1000, intensity: 0.4 },
  { lat: 13.0358, lng: 80.1562, intensity: 0.5 },
];

export const pickupRoute = [
  [13.0878, 80.2085],
  [13.0067, 80.2572],
  [13.0569, 80.2426],
  [13.0339, 80.2694],
  [13.0878, 80.2085],
];

export const truckPosition = { lat: 13.034, lng: 80.252, heading: 45 };
