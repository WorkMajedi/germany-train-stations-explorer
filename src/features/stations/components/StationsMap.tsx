import { useCallback, useMemo } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import type { Station } from '../types';
import { StationMarker } from './StationMarker';
import { MapFlyTo } from './MapFlyTo';
import 'leaflet/dist/leaflet.css';

const GERMANY_CENTER: [number, number] = [51.1657, 10.4515];
const DEFAULT_ZOOM = 6;

interface StationsMapProps {
  readonly stations: Station[];
  readonly selectedStationId: string | null;
  readonly onSelectStation: (stationId: string) => void;
}

export function StationsMap({
  stations,
  selectedStationId,
  onSelectStation,
}: StationsMapProps): React.JSX.Element {
  const handleSelect = useCallback(
    (stationId: string) => {
      onSelectStation(stationId);
    },
    [onSelectStation],
  );

  const selectedStation = useMemo(
    () => stations.find((s) => s.id === selectedStationId),
    [stations, selectedStationId],
  );

  const markers = useMemo(
    () =>
      stations.map((station) => (
        <StationMarker
          key={station.id}
          station={station}
          isSelected={station.id === selectedStationId}
          onSelect={handleSelect}
        />
      )),
    [stations, selectedStationId, handleSelect],
  );

  return (
    <MapContainer
      center={GERMANY_CENTER}
      zoom={DEFAULT_ZOOM}
      className="stations-map"
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers}
      <MapFlyTo station={selectedStation} />
    </MapContainer>
  );
}
