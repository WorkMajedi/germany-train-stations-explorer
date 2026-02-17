import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StationsList } from '../features/stations/components/StationsList';
import type { Station } from '../features/stations/types';

const MOCK_STATIONS: Station[] = [
  { id: '1', name: 'Berlin Hbf', city: 'Berlin', lat: 52.5251, lng: 13.3694 },
  { id: '2', name: 'Hamburg Hbf', city: 'Hamburg', lat: 53.553, lng: 10.0067 },
  { id: '3', name: 'Munich Hbf', city: 'Munich', lat: 48.1402, lng: 11.5586 },
];

describe('StationsList', () => {
  it('renders all stations in the list', () => {
    render(
      <StationsList
        stations={MOCK_STATIONS}
        selectedStationId={null}
        onSelectStation={vi.fn()}
      />,
    );

    expect(screen.getByText('Berlin Hbf')).toBeInTheDocument();
    expect(screen.getByText('Hamburg Hbf')).toBeInTheDocument();
    expect(screen.getByText('Munich Hbf')).toBeInTheDocument();
  });

  it('displays city names', () => {
    render(
      <StationsList
        stations={MOCK_STATIONS}
        selectedStationId={null}
        onSelectStation={vi.fn()}
      />,
    );

    expect(screen.getByText('Berlin')).toBeInTheDocument();
    expect(screen.getByText('Hamburg')).toBeInTheDocument();
    expect(screen.getByText('Munich')).toBeInTheDocument();
  });

  it('shows empty state when no stations provided', () => {
    render(
      <StationsList
        stations={[]}
        selectedStationId={null}
        onSelectStation={vi.fn()}
      />,
    );

    expect(screen.getByText('No stations found.')).toBeInTheDocument();
  });

  it('calls onSelectStation when a station is clicked', async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();

    render(
      <StationsList
        stations={MOCK_STATIONS}
        selectedStationId={null}
        onSelectStation={handleSelect}
      />,
    );

    await user.click(screen.getByText('Hamburg Hbf'));
    expect(handleSelect).toHaveBeenCalledOnce();
    expect(handleSelect).toHaveBeenCalledWith('2');
  });

  it('marks the selected station with aria-selected', () => {
    render(
      <StationsList
        stations={MOCK_STATIONS}
        selectedStationId="2"
        onSelectStation={vi.fn()}
      />,
    );

    const selectedOption = screen.getByRole('option', { selected: true });
    expect(selectedOption).toHaveTextContent('Hamburg Hbf');
  });

  it('triggers selection on Enter key press', async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();

    render(
      <StationsList
        stations={MOCK_STATIONS}
        selectedStationId={null}
        onSelectStation={handleSelect}
      />,
    );

    const firstItem = screen.getByText('Berlin Hbf').closest('[role="option"]') as HTMLElement;
    firstItem.focus();
    await user.keyboard('{Enter}');

    expect(handleSelect).toHaveBeenCalledWith('1');
  });
});
