import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { mockEvents as initialEvents } from '@/data/events';
import { mockWasteReports as initialWasteReports, marketplaceListings as initialListings } from '@/data/waste';
import { pendingVerifications as initialPending } from '@/data/organizations';
import { DEFAULT_RECYCLER_ORG, resolveRecyclerOrg } from '@/data/recyclers';

const STORAGE_KEY = 'ecoloop-app-data-v2';

const defaultContributions = {
  organizers: [
    { id: 'oc-1', name: 'Organizer', events: 3, wasteReported: 4280, reports: 2 },
    { id: 'oc-2', name: 'Bloom Events', events: 1, wasteReported: 320, reports: 0 },
  ],
  recyclers: [
    { id: 'rc-1', name: 'EcoRecycle Foundation', pickups: 12, wasteRecovered: 5200 },
    { id: 'rc-2', name: 'GreenCycle Industries', pickups: 8, wasteRecovered: 4100 },
    { id: 'rc-3', name: 'Green Earth Recycling', pickups: 5, wasteRecovered: 2800 },
  ],
};

function loadStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return null;
}

function saveStored(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function isEventVerified(events, eventName) {
  const evt = events.find((e) => e.name === eventName);
  return evt?.verificationStatus === 'approved' || evt?.status === 'verified';
}

function bumpRecyclerContribution(prev, orgName, { pickupsDelta = 0, wasteDelta = 0 }) {
  const name = resolveRecyclerOrg(orgName);
  const exists = prev.recyclers.some((r) => r.name === name);
  const recyclers = exists
    ? prev.recyclers.map((r) =>
        r.name === name
          ? {
              ...r,
              pickups: r.pickups + pickupsDelta,
              wasteRecovered: r.wasteRecovered + wasteDelta,
            }
          : r
      )
    : [
        ...prev.recyclers,
        {
          id: `rc-${Date.now()}`,
          name,
          pickups: pickupsDelta,
          wasteRecovered: wasteDelta,
        },
      ];
  return { ...prev, recyclers };
}

const AppDataContext = createContext(null);

export function AppDataProvider({ children }) {
  const stored = loadStored();
  const [events, setEvents] = useState(stored?.events ?? initialEvents);
  const [wasteReports, setWasteReports] = useState(stored?.wasteReports ?? initialWasteReports);
  const [listings, setListings] = useState(stored?.listings ?? initialListings);
  const [pendingVerifications, setPendingVerifications] = useState(
    stored?.pendingVerifications ?? initialPending.filter((v) => v.type !== 'event')
  );
  const [uploads, setUploads] = useState(stored?.uploads ?? []);
  const [contributions, setContributions] = useState(stored?.contributions ?? defaultContributions);

  useEffect(() => {
    saveStored({ events, wasteReports, listings, pendingVerifications, uploads, contributions });
  }, [events, wasteReports, listings, pendingVerifications, uploads, contributions]);

  const syncWasteByEventName = useCallback((eventName, patch) => {
    setWasteReports((prev) =>
      prev.map((r) => (r.eventName === eventName ? { ...r, ...patch } : r))
    );
  }, []);

  const addEvent = useCallback((event) => {
    const newEvent = {
      ...event,
      id: `evt-${Date.now()}`,
      status: 'pending',
      verificationStatus: 'pending',
      organizer: event.organizer || 'Organizer',
      lat: event.lat ?? 13.0827,
      lng: event.lng ?? 80.2707,
    };
    setEvents((prev) => [newEvent, ...prev]);
    setContributions((prev) => ({
      ...prev,
      organizers: prev.organizers.map((o) =>
        o.name === 'Organizer' || o.name === newEvent.organizer
          ? { ...o, events: o.events + 1 }
          : o
      ),
    }));
    return newEvent;
  }, []);

  const addWasteReport = useCallback((report) => {
    const event = events.find((e) => e.id === report.eventId);
    const total =
      Number(report.food || 0) +
      Number(report.plastic || 0) +
      Number(report.flowers || 0) +
      Number(report.paper || 0) +
      Number(report.decoration || 0) +
      Number(report.ewaste || 0);
    const eventName = event?.name || report.eventName || 'Event';
    const verified = isEventVerified(events, eventName);
    const newReport = {
      id: `wr-${Date.now()}`,
      eventId: report.eventId,
      eventName,
      food: Number(report.food || 0),
      plastic: Number(report.plastic || 0),
      flowers: Number(report.flowers || 0),
      paper: Number(report.paper || 0),
      decoration: Number(report.decoration || 0),
      ewaste: Number(report.ewaste || 0),
      urgency: report.urgency || 'medium',
      status: 'requested',
      pickupDate: report.pickupDate || '',
      assignedOrg: null,
      recoveryPercent: 0,
      location: event?.location || 'Chennai, Tamil Nadu',
      lat: event?.lat ?? 13.0827,
      lng: event?.lng ?? 80.2707,
      createdAt: new Date().toISOString(),
      notes: report.notes || '',
    };
    setWasteReports((prev) => [newReport, ...prev]);
    const primaryType = report.plastic ? 'Plastic' : report.food ? 'Food' : report.flowers ? 'Flowers' : 'Mixed';
    const qty = total || 100;
    setListings((prev) => [
      {
        id: `ml-${Date.now()}`,
        eventName,
        wasteType: primaryType,
        quantity: qty,
        unit: 'kg',
        location: newReport.location,
        locality: newReport.location,
        distance: 2 + Math.random() * 8,
        urgency: newReport.urgency,
        status: verified ? 'available' : 'pending_event',
        estimatedValue: Math.round(qty * 40),
        lat: newReport.lat,
        lng: newReport.lng,
        postedAt: new Date().toISOString().split('T')[0],
        notes: newReport.notes,
        assignedOrg: null,
      },
      ...prev,
    ]);
    setContributions((prev) => ({
      ...prev,
      organizers: prev.organizers.map((o) =>
        o.name === 'Organizer' ? { ...o, wasteReported: o.wasteReported + total, reports: o.reports + 1 } : o
      ),
    }));
    return newReport;
  }, [events]);

  const addUpload = useCallback((upload) => {
    const item = { id: `up-${Date.now()}`, ...upload, uploadedAt: new Date().toISOString() };
    setUploads((prev) => [item, ...prev]);
    return item;
  }, []);

  const approveEvent = useCallback((eventId, approved) => {
    setEvents((prev) => {
      const evt = prev.find((e) => e.id === eventId);
      if (evt) {
        setPendingVerifications((pv) => pv.filter((v) => v.name !== evt.name));
        if (approved) {
          setListings((list) =>
            list.map((l) =>
              l.eventName === evt.name && l.status === 'pending_event'
                ? { ...l, status: 'available' }
                : l
            )
          );
        }
      }
      return prev.map((e) =>
        e.id === eventId
          ? {
              ...e,
              verificationStatus: approved ? 'approved' : 'rejected',
              status: approved ? 'verified' : 'rejected',
            }
          : e
      );
    });
  }, []);

  const approveVerification = useCallback((id) => {
    setPendingVerifications((prev) => prev.filter((v) => v.id !== id));
  }, []);

  /** Organizer requests pickup — recycler NOT assigned yet */
  const requestPickup = useCallback((reportId, pickupDate) => {
    setWasteReports((prev) => {
      const report = prev.find((r) => r.id === reportId);
      if (!report) return prev;
      setListings((list) =>
        list.map((l) =>
          l.eventName === report.eventName && !['collected', 'confirmed'].includes(l.status)
            ? { ...l, status: 'pickup_requested', assignedOrg: null }
            : l
        )
      );
      return prev.map((r) =>
        r.id === reportId
          ? {
              ...r,
              status: 'pickup_requested',
              pickupDate: pickupDate || r.pickupDate,
              assignedOrg: null,
            }
          : r
      );
    });
  }, []);

  const updateWasteStatus = useCallback((id, status, options = {}) => {
    const { pickupDate } = options;
    setWasteReports((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status,
              pickupDate: pickupDate ?? r.pickupDate,
              recoveryPercent: status === 'completed' ? 100 : r.recoveryPercent,
            }
          : r
      )
    );
  }, []);

  /** Recycler reserves — interest only, no official assignment */
  const reserveListing = useCallback((listingId, reservedByOrg) => {
    const org = resolveRecyclerOrg(reservedByOrg);
    setListings((prev) => {
      const listing = prev.find((l) => l.id === listingId);
      if (listing) {
        syncWasteByEventName(listing.eventName, {
          status: 'matched',
          assignedOrg: null,
        });
      }
      return prev.map((l) =>
        l.id === listingId
          ? { ...l, status: 'reserved', reservedBy: org, assignedOrg: null }
          : l
      );
    });
  }, [syncWasteByEventName]);

  /** Recycler confirms acceptance — official assignment */
  const confirmListing = useCallback((listingId, orgName) => {
    const assigned = resolveRecyclerOrg(orgName);
    const confirmedAt = new Date().toISOString();
    setListings((prev) => {
      const listing = prev.find((l) => l.id === listingId);
      if (!listing) return prev;
      setWasteReports((wr) =>
        wr.map((r) =>
          r.eventName === listing.eventName
            ? { ...r, status: 'in_transit', assignedOrg: assigned, confirmedAt }
            : r
        )
      );
      setContributions((c) => bumpRecyclerContribution(c, assigned, { pickupsDelta: 1 }));
      return prev.map((l) =>
        l.id === listingId
          ? { ...l, status: 'confirmed', assignedOrg: assigned, confirmedAt }
          : l
      );
    });
  }, []);

  const markCollectionComplete = useCallback((listingId, orgName) => {
    const assigned = resolveRecyclerOrg(orgName);
    const completedAt = new Date().toISOString();
    setListings((prev) => {
      const listing = prev.find((l) => l.id === listingId);
      if (!listing) return prev;
      setWasteReports((wr) =>
        wr.map((r) =>
          r.eventName === listing.eventName
            ? {
                ...r,
                status: 'completed',
                assignedOrg: assigned,
                recoveryPercent: 100,
                completedAt,
              }
            : r
        )
      );
      setContributions((c) =>
        bumpRecyclerContribution(c, assigned, { wasteDelta: listing.quantity || 0 })
      );
      return prev.map((l) =>
        l.id === listingId
          ? { ...l, status: 'collected', assignedOrg: assigned, collectedAt: completedAt }
          : l
      );
    });
  }, []);

  const getWasteReportByEventName = useCallback(
    (eventName) => wasteReports.find((r) => r.eventName === eventName),
    [wasteReports]
  );

  const getVerifiedEventNames = useCallback(
    () =>
      events
        .filter((e) => e.verificationStatus === 'approved' || e.status === 'verified')
        .map((e) => e.name),
    [events]
  );

  const getRecommendations = useCallback(() => {
    const verified = new Set(getVerifiedEventNames());
    return listings
      .filter((l) => ['available', 'pickup_requested'].includes(l.status) && verified.has(l.eventName))
      .map((l) => {
        const report = wasteReports.find((r) => r.eventName === l.eventName);
        const matchScore = Math.min(98, 75 + Math.round((l.quantity || 0) / 50));
        return {
          id: `rec-${l.id}`,
          listingId: l.id,
          eventName: l.eventName,
          wasteAvailable: `${l.wasteType} · ${l.quantity} kg`,
          distance: l.distance,
          urgency: l.urgency,
          estimatedValue: l.estimatedValue,
          matchScore,
          reason: report?.notes
            ? report.notes.slice(0, 60)
            : `High ${l.wasteType.toLowerCase()} recovery fit for your zone`,
          wasteTypes: [l.wasteType?.toLowerCase()],
          location: l.location,
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [listings, wasteReports, getVerifiedEventNames]);

  return (
    <AppDataContext.Provider
      value={{
        events,
        wasteReports,
        listings,
        pendingVerifications,
        uploads,
        contributions,
        addEvent,
        addWasteReport,
        addUpload,
        approveEvent,
        approveVerification,
        requestPickup,
        updateWasteStatus,
        reserveListing,
        confirmListing,
        markCollectionComplete,
        getWasteReportByEventName,
        getVerifiedEventNames,
        getRecommendations,
        setEvents,
        setWasteReports,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error('useAppData must be used within AppDataProvider');
  return ctx;
}
