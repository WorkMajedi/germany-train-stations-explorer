import { useCallback, useReducer } from 'react';
import { stationsReducer, INITIAL_STATE } from '../features/stations/stationsReducer';
import { useStationsQuery } from '../features/stations/hooks/useStationsQuery';
import { useFilteredStations } from '../features/stations/hooks/useFilteredStations';
import { useDebouncedValue } from '../shared/hooks/useDebouncedValue';
import { StationsMap } from '../features/stations/components/StationsMap';
import { StationsList } from '../features/stations/components/StationsList';
import { CityFilter } from '../features/stations/components/CityFilter';
import { LoadingSpinner } from '../shared/components/LoadingSpinner';
import { ErrorMessage } from '../shared/components/ErrorMessage';
import styles from './App.module.css';

export function App(): React.JSX.Element {
  const [state, dispatch] = useReducer(stationsReducer, INITIAL_STATE);
  const { refetch } = useStationsQuery({ dispatch });

  const { stations, loading, error, selectedStationId, cityFilter } = state;

  const debouncedFilter = useDebouncedValue(cityFilter);
  const filteredStations = useFilteredStations(stations, debouncedFilter);

  const handleSelectStation = useCallback(
    (stationId: string) => {
      dispatch({ type: 'SELECT_STATION', payload: stationId });
    },
    [],
  );

  const handleCityFilterChange = useCallback(
    (value: string) => {
      dispatch({ type: 'SET_CITY_FILTER', payload: value });
    },
    [],
  );

  if (loading) {
    return (
      <div className={styles.fullScreen}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.fullScreen}>
        <ErrorMessage message={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1 className={styles.title}>German Train Stations</h1>
        <p className={styles.subtitle}>
          {filteredStations.length} station{filteredStations.length !== 1 ? 's' : ''} shown
        </p>
      </header>

      <main className={styles.main}>
        <section className={styles.mapSection} aria-label="Station map">
          <StationsMap
            stations={filteredStations}
            selectedStationId={selectedStationId}
            onSelectStation={handleSelectStation}
          />
        </section>

        <aside className={styles.sidebar} aria-label="Station list">
          <CityFilter
            stations={stations}
            value={cityFilter}
            onChange={handleCityFilterChange}
          />
          <div className={styles.listContainer}>
            <StationsList
              stations={filteredStations}
              selectedStationId={selectedStationId}
              onSelectStation={handleSelectStation}
            />
          </div>
        </aside>
      </main>
    </div>
  );
}
