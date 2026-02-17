import { describe, it, expect } from 'vitest';
import { filterStations } from '../features/stations/hooks/useFilteredStations';
import type { Station } from '../features/stations/types';

const MOCK_STATIONS: Station[] = [
  { id: '1', name: 'Berlin Hbf', city: 'Berlin', lat: 52.5251, lng: 13.3694 },
  { id: '2', name: 'Berlin Ostbahnhof', city: 'Berlin', lat: 52.5108, lng: 13.4348 },
  { id: '3', name: 'Hamburg Hbf', city: 'Hamburg', lat: 53.553, lng: 10.0067 },
  { id: '4', name: 'Munich Hbf', city: 'Munich', lat: 48.1402, lng: 11.5586 },
  { id: '5', name: 'Frankfurt Hbf', city: 'Frankfurt', lat: 50.1072, lng: 8.6638 },
];

describe('filterStations', () => {
  it('returns all stations when filter is empty', () => {
    const result = filterStations(MOCK_STATIONS, '');
    expect(result).toHaveLength(5);
    expect(result).toBe(MOCK_STATIONS);
  });

  it('returns all stations when filter is only whitespace', () => {
    const result = filterStations(MOCK_STATIONS, '   ');
    expect(result).toBe(MOCK_STATIONS);
  });

  it('filters stations by city name (case-insensitive)', () => {
    const result = filterStations(MOCK_STATIONS, 'berlin');
    expect(result).toHaveLength(2);
    expect(result.every((s) => s.city === 'Berlin')).toBe(true);
  });

  it('filters with uppercase input', () => {
    const result = filterStations(MOCK_STATIONS, 'HAMBURG');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Hamburg Hbf');
  });

  it('filters with mixed case input', () => {
    const result = filterStations(MOCK_STATIONS, 'MuNiCh');
    expect(result).toHaveLength(1);
    expect(result[0].city).toBe('Munich');
  });

  it('supports partial matching', () => {
    const result = filterStations(MOCK_STATIONS, 'ber');
    expect(result).toHaveLength(2);
  });

  it('returns empty array when no cities match', () => {
    const result = filterStations(MOCK_STATIONS, 'Nonexistent');
    expect(result).toHaveLength(0);
  });

  it('trims whitespace before filtering', () => {
    const result = filterStations(MOCK_STATIONS, '  Hamburg  ');
    expect(result).toHaveLength(1);
    expect(result[0].city).toBe('Hamburg');
  });

  it('handles empty station list', () => {
    const result = filterStations([], 'Berlin');
    expect(result).toHaveLength(0);
  });
});
