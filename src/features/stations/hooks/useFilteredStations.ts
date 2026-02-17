import { useMemo } from 'react';
import type { Station } from '../types';

export function filterStations(stations: Station[], cityFilter: string): Station[] {
  const trimmed = cityFilter.trim().toLowerCase();

  if (trimmed === '') return stations;

  return stations.filter(
    (station) => station.city.toLowerCase().includes(trimmed),
  );
}

export function useFilteredStations(
  stations: Station[],
  cityFilter: string,
): Station[] {
  return useMemo(
    () => filterStations(stations, cityFilter),
    [stations, cityFilter],
  );
}
