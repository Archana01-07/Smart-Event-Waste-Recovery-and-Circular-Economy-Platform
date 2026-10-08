export function eventsToMarkers(events) {
  return events
    .filter((e) => e.lat != null && e.lng != null)
    .map((e) => ({
      id: e.id,
      name: e.name,
      lat: e.lat,
      lng: e.lng,
      location: e.location,
      waste: e.crowdSize ? Math.round(e.crowdSize * 0.3) : undefined,
      type: 'event',
    }));
}

export function wasteReportsToMarkers(reports) {
  return reports
    .filter((r) => r.lat != null && r.lng != null)
    .map((r) => ({
      id: r.id,
      name: r.eventName,
      lat: r.lat,
      lng: r.lng,
      location: r.location,
      waste:
        (r.food || 0) + (r.plastic || 0) + (r.paper || 0) + (r.flowers || 0) + (r.decoration || 0) + (r.ewaste || 0),
      type: 'waste',
    }));
}
