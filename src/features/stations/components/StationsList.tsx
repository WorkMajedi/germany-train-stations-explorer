import { useCallback } from 'react';
import type { Station } from '../types';
import styles from './StationsList.module.css';

interface StationsListProps {
  readonly stations: Station[];
  readonly selectedStationId: string | null;
  readonly onSelectStation: (stationId: string) => void;
}

export function StationsList({
  stations,
  selectedStationId,
  onSelectStation,
}: StationsListProps): React.JSX.Element {
  if (stations.length === 0) {
    return (
      <div className={styles.emptyState} role="status">
        <p>No stations found.</p>
      </div>
    );
  }

  return (
    <ul className={styles.list} role="listbox" aria-label="Train stations">
      {stations.map((station) => (
        <StationListItem
          key={station.id}
          station={station}
          isSelected={station.id === selectedStationId}
          onSelect={onSelectStation}
        />
      ))}
    </ul>
  );
}

interface StationListItemProps {
  readonly station: Station;
  readonly isSelected: boolean;
  readonly onSelect: (stationId: string) => void;
}

function StationListItem({
  station,
  isSelected,
  onSelect,
}: StationListItemProps): React.JSX.Element {
  const handleClick = useCallback(() => {
    onSelect(station.id);
  }, [onSelect, station.id]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onSelect(station.id);
      }
    },
    [onSelect, station.id],
  );

  return (
    <li
      className={`${styles.item} ${isSelected ? styles.selected : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="option"
      aria-selected={isSelected}
      tabIndex={0}
    >
      <span className={styles.name}>{station.name}</span>
      <span className={styles.city}>{station.city}</span>
    </li>
  );
}
