import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { mapCenter, mapZoom, MAP_TILES } from '@/data/maps';
import { Sun, Moon } from 'lucide-react';

const eventIcon = new L.DivIcon({
  className: 'custom-marker',
  html: `<div style="background:#10b981;width:28px;height:28px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center;font-size:14px">📍</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

const ngoIcon = new L.DivIcon({
  className: 'custom-marker',
  html: `<div style="background:#06b6d4;width:28px;height:28px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center;font-size:14px">♻️</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

const organizerIcon = new L.DivIcon({
  className: 'custom-marker',
  html: `<div style="background:#8b5cf6;width:28px;height:28px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center;font-size:14px">👤</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

const truckIcon = new L.DivIcon({
  className: 'custom-marker',
  html: `<div style="background:#f59e0b;width:32px;height:32px;border-radius:8px;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center;font-size:16px">🚛</div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

function MapController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, zoom || mapZoom);
  }, [center, zoom, map]);
  return null;
}

function TileLayerSwitch({ mapTheme }) {
  const map = useMap();
  useEffect(() => {
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) map.removeLayer(layer);
    });
    L.tileLayer(MAP_TILES[mapTheme], {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
    }).addTo(map);
  }, [mapTheme, map]);
  return null;
}

export function EcoMap({
  height = '400px',
  events = [],
  ngos = [],
  organizers = [],
  hotspots = [],
  route = null,
  truck = null,
  center = mapCenter,
  zoom = mapZoom,
  className = '',
  showThemeToggle = true,
  defaultMapTheme = 'dark',
}) {
  const [mapTheme, setMapTheme] = useState(defaultMapTheme);

  return (
    <div className={`relative ${className}`} style={{ height, minHeight: height }}>
      {showThemeToggle && (
        <div className="absolute right-3 top-3 z-[1000] flex rounded-lg glass overflow-hidden">
          <button
            type="button"
            onClick={() => setMapTheme('light')}
            className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium transition-colors ${
              mapTheme === 'light' ? 'bg-eco-500/20 text-eco-400' : 'text-[var(--text-muted)] hover:bg-eco-500/10'
            }`}
          >
            <Sun className="h-3.5 w-3.5" /> Light
          </button>
          <button
            type="button"
            onClick={() => setMapTheme('dark')}
            className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium transition-colors ${
              mapTheme === 'dark' ? 'bg-eco-500/20 text-eco-400' : 'text-[var(--text-muted)] hover:bg-eco-500/10'
            }`}
          >
            <Moon className="h-3.5 w-3.5" /> Dark
          </button>
        </div>
      )}
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%', borderRadius: '1rem' }}
        scrollWheelZoom
      >
        <TileLayerSwitch mapTheme={mapTheme} />
        <MapController center={center} zoom={zoom} />

        {hotspots.map((h, i) => (
          <CircleMarker
            key={`hs-${i}`}
            center={[h.lat, h.lng]}
            radius={20 + h.intensity * 30}
            pathOptions={{
              color: '#ef4444',
              fillColor: '#ef4444',
              fillOpacity: 0.15 + h.intensity * 0.2,
              weight: 1,
            }}
          />
        ))}

        {events.map((e) => (
          <Marker key={e.id} position={[e.lat, e.lng]} icon={eventIcon}>
            <Popup>
              <strong>{e.name}</strong>
              {e.location && <><br />{e.location}</>}
              {e.waste != null && <><br />Waste: {e.waste} kg</>}
            </Popup>
          </Marker>
        ))}

        {organizers.map((o) => (
          <Marker key={o.id} position={[o.lat, o.lng]} icon={organizerIcon}>
            <Popup>
              <strong>{o.name}</strong>
              {o.location && <><br />{o.location}</>}
            </Popup>
          </Marker>
        ))}

        {ngos.map((n) => (
          <Marker key={n.id} position={[n.lat, n.lng]} icon={ngoIcon}>
            <Popup>
              <strong>{n.name}</strong>
              {n.location && <><br />{n.location}</>}
            </Popup>
          </Marker>
        ))}

        {route && (
          <Polyline
            positions={route}
            pathOptions={{ color: '#10b981', weight: 4, dashArray: '8 8' }}
          />
        )}

        {truck && (
          <Marker position={[truck.lat, truck.lng]} icon={truckIcon}>
            <Popup>Live truck tracking — Chennai</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
