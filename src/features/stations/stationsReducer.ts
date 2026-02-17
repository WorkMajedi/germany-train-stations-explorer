import type { StationsState, StationsAction } from './types';

export const INITIAL_STATE: StationsState = {
  stations: [],
  loading: false,
  error: null,
  selectedStationId: null,
  cityFilter: '',
};

export function stationsReducer(
  state: StationsState,
  action: StationsAction,
): StationsState {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };

    case 'FETCH_SUCCESS':
      return { ...state, loading: false, stations: action.payload, error: null };

    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };

    case 'SELECT_STATION':
      return { ...state, selectedStationId: action.payload };

    case 'SET_CITY_FILTER':
      return { ...state, cityFilter: action.payload, selectedStationId: null };

    default:
      return state;
  }
}
