export interface StationRaw {
  readonly id: number;
  readonly name: string;
  readonly city: string;
  readonly lat: number;
  readonly lng: number;
}

export interface Station {
  readonly id: string;
  readonly name: string;
  readonly city: string;
  readonly lat: number;
  readonly lng: number;
}

export interface StationsState {
  readonly stations: Station[];
  readonly loading: boolean;
  readonly error: string | null;
  readonly selectedStationId: string | null;
  readonly cityFilter: string;
}

export type StationsAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Station[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'SELECT_STATION'; payload: string | null }
  | { type: 'SET_CITY_FILTER'; payload: string };
