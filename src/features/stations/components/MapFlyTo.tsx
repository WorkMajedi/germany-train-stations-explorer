import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import type { Station } from '../types';

const SELECTED_ZOOM = 13;

interface MapFlyToProps {
  readonly station: Station | undefined;
}

export function MapFlyTo({ station }: MapFlyToProps): null {
  const map = useMap();
  const prevStationIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!station) {
      prevStationIdRef.current = null;
      return;
    }

    if (station.id === prevStationIdRef.current) return;

    prevStationIdRef.current = station.id;
    map.flyTo([station.lat, station.lng], SELECTED_ZOOM, {
      duration: 1.2,
    });
  }, [station, map]);

  return null;
}
