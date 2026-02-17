import { memo, useMemo } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { Station } from '../types';

interface StationMarkerProps {
  readonly station: Station;
  readonly isSelected: boolean;
  readonly onSelect: (stationId: string) => void;
}

const DEFAULT_ICON = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const SELECTED_ICON = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function StationMarkerComponent({
  station,
  isSelected,
  onSelect,
}: StationMarkerProps): React.JSX.Element {
  const position = useMemo<L.LatLngExpression>(
    () => [station.lat, station.lng],
    [station.lat, station.lng],
  );

  const icon = isSelected ? SELECTED_ICON : DEFAULT_ICON;

  const eventHandlers = useMemo(
    () => ({
      click: () => {
        onSelect(station.id);
      },
    }),
    [onSelect, station.id],
  );

  return (
    <Marker position={position} icon={icon} eventHandlers={eventHandlers}>
      <Popup>
        <strong>{station.name}</strong>
        <br />
        {station.city}
      </Popup>
    </Marker>
  );
}

export const StationMarker = memo(StationMarkerComponent);
