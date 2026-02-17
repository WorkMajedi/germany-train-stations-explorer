# German Train Stations Map

A production-ready React application that displays German train stations on an interactive Leaflet map with synchronized list view and city filtering.

## Tech Stack

- **React 19** with functional components and hooks
- **TypeScript** (strict mode, no `any`)
- **Vite** for build tooling
- **react-leaflet** for map visualization
- **CSS Modules** for scoped styling
- **Vitest** + **React Testing Library** for tests

## Architecture

Feature-based modular structure with clear separation of concerns:

```
src/
  app/              # Root component and layout
  features/
    stations/
      components/   # StationsMap, StationMarker, StationsList, CityFilter
      hooks/        # useStationsQuery, useFilteredStations
      services/     # API layer (stationsApi)
      types.ts      # TypeScript interfaces
      stationsReducer.ts  # State management
  shared/
    components/     # LoadingSpinner, ErrorMessage
    hooks/          # useDebouncedValue
  tests/            # Test files
```

### Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| `useReducer` for state | Predictable state transitions without external dependencies |
| Filtering as derived state | No duplicated storage; memoized via `useMemo` |
| Debounced filter input | Prevents unnecessary re-renders on rapid typing |
| `React.memo` on markers | Avoids re-rendering all markers on state changes |
| Separate `MapFlyTo` component | Uses `useMap` hook cleanly without imperative DOM access |
| AbortController in fetch | Prevents race conditions and cleanup on unmount |
| Defensive API validation | Runtime type checking on external data |

### State Flow

```
User Interaction -> dispatch(action) -> stationsReducer -> new state
                                                            |
                              filteredStations (memoized derived state)
                                                            |
                                    Map + List (synchronized rendering)
```

### Trade-offs

- **No external state library**: `useReducer` is sufficient for this scope; adding Zustand/Redux would be over-engineering
- **No marker clustering**: Kept simple with 30 stations; easy to add with `react-leaflet-cluster` if dataset grows
- **CSS Modules over Tailwind**: Keeps the project dependency-light and styles co-located with components
- **Debounce via custom hook**: Avoids `lodash` dependency for a single utility

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Deployment

This project is configured for deployment to **Vercel** or **Netlify**.

### Vercel

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repository in the Vercel dashboard. The build command is `npm run build` and the output directory is `dist`.

### Netlify

Set build command to `npm run build` and publish directory to `dist`.

## API

Data is fetched from a [GitHub Gist](https://gist.github.com/neysidev/bbd40032f0f4e167a1e6a8b3e99a490c) containing 30 German train stations with coordinates.

## License

MIT
