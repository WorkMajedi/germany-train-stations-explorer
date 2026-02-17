import { useCallback, useMemo } from 'react';
import type { Station } from '../types';
import styles from './CityFilter.module.css';

interface CityFilterProps {
  readonly stations: Station[];
  readonly value: string;
  readonly onChange: (value: string) => void;
}

export function CityFilter({
  stations,
  value,
  onChange,
}: CityFilterProps): React.JSX.Element {
  const uniqueCities = useMemo(() => {
    const citySet = new Set(stations.map((s) => s.city));
    return Array.from(citySet).sort();
  }, [stations]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    [onChange],
  );

  const handleClear = useCallback(() => {
    onChange('');
  }, [onChange]);

  return (
    <div className={styles.container}>
      <label htmlFor="city-filter" className={styles.label}>
        Filter by city
      </label>
      <div className={styles.inputWrapper}>
        <input
          id="city-filter"
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Type to filter by city..."
          className={styles.input}
          list="city-suggestions"
          autoComplete="off"
          aria-label="Filter stations by city name"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className={styles.clearButton}
            aria-label="Clear city filter"
          >
            &times;
          </button>
        )}
      </div>
      <datalist id="city-suggestions">
        {uniqueCities.map((city) => (
          <option key={city} value={city} />
        ))}
      </datalist>
    </div>
  );
}
