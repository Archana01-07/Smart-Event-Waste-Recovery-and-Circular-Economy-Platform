import { Card, CardHeader } from '@/components/ui/Card';
import { EcoMap } from '@/components/maps/EcoMap';
import { Badge } from '@/components/ui/Badge';
import { eventMarkers, ngoMarkers, wasteHotspots, pickupRoute, truckPosition, organizerMarkers } from '@/data/maps';
import { Map, AlertTriangle } from 'lucide-react';
import { useAppData } from '@/context/AppDataContext';
import { eventsToMarkers, wasteReportsToMarkers } from '@/utils/mapMarkers';

export default function HotspotMap() {
  const { events, wasteReports } = useAppData();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <Badge variant="success" dot>Event locations</Badge>
        <Badge variant="info">NGO / Recyclers</Badge>
        <Badge variant="purple">Organizers</Badge>
        <Badge variant="danger" dot>High waste zones</Badge>
        <Badge variant="warning">Live truck</Badge>
      </div>
      <Card className="p-0 overflow-hidden">
        <CardHeader title="Waste Hotspot GIS Map" subtitle="Chennai, Tamil Nadu" icon={Map} className="px-6 pt-6" />
        <EcoMap
          height="500px"
          events={[...eventsToMarkers(events), ...wasteReportsToMarkers(wasteReports)]}
          ngos={ngoMarkers}
          organizers={organizerMarkers}
          hotspots={wasteHotspots}
          route={pickupRoute}
          truck={truckPosition}
        />
      </Card>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { zone: 'Adyar, Chennai', level: 'Critical', events: 3 },
          { zone: 'Marina Beach Road', level: 'High', events: 2 },
          { zone: 'Velachery, Chennai', level: 'Medium', events: 1 },
        ].map((z) => (
          <Card key={z.zone}>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
              <div>
                <p className="font-medium">{z.zone}</p>
                <p className="text-sm text-[var(--text-muted)]">{z.events} active events · {z.level}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
