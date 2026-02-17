import type { Station, StationRaw } from '../types';

const API_URL =
  'https://gist.githubusercontent.com/neysidev/bbd40032f0f4e167a1e6a8b3e99a490c/raw/train-stations.json';

function isValidStationRaw(item: unknown): item is StationRaw {
  if (typeof item !== 'object' || item === null) return false;

  const record = item as Record<string, unknown>;

  return (
    typeof record.id === 'number' &&
    typeof record.name === 'string' &&
    typeof record.city === 'string' &&
    typeof record.lat === 'number' &&
    typeof record.lng === 'number' &&
    Number.isFinite(record.lat) &&
    Number.isFinite(record.lng)
  );
}

function toStation(raw: StationRaw): Station {
  return {
    id: String(raw.id),
    name: raw.name,
    city: raw.city,
    lat: raw.lat,
    lng: raw.lng,
  };
}

export async function getStations(signal?: AbortSignal): Promise<Station[]> {
  const response = await fetch(API_URL, { signal });

  if (!response.ok) {
    throw new Error(`Failed to fetch stations: ${response.status} ${response.statusText}`);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error('Invalid API response: expected an array of stations');
  }

  return data.filter(isValidStationRaw).map(toStation);
}
