import { useCallback, useEffect, useRef } from 'react';
import type { StationsAction } from '../types';
import { getStations } from '../services/stationsApi';

interface UseStationsQueryOptions {
  readonly dispatch: React.Dispatch<StationsAction>;
}

export function useStationsQuery({ dispatch }: UseStationsQueryOptions): {
  refetch: () => void;
} {
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchStations = useCallback(
    async (signal: AbortSignal) => {
      dispatch({ type: 'FETCH_START' });

      try {
        const stations = await getStations(signal);

        if (!signal.aborted) {
          dispatch({ type: 'FETCH_SUCCESS', payload: stations });
        }
      } catch (error: unknown) {
        if (signal.aborted) return;

        const message =
          error instanceof Error ? error.message : 'An unexpected error occurred';

        dispatch({ type: 'FETCH_ERROR', payload: message });
      }
    },
    [dispatch],
  );

  useEffect(() => {
    const controller = new AbortController();
    abortControllerRef.current = controller;

    void fetchStations(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchStations]);

  const refetch = useCallback(() => {
    abortControllerRef.current?.abort();

    const controller = new AbortController();
    abortControllerRef.current = controller;

    void fetchStations(controller.signal);
  }, [fetchStations]);

  return { refetch };
}
