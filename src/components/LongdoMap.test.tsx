import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { LongdoMap } from '../LongdoMap';

// Mock the global longdo object before each test
beforeEach(() => {
  // Clear all previous mock calls
  jest.clearAllMocks();
});

describe('LongdoMap', () => {
  it('should render the map container', () => {
    render(<LongdoMap apiKey="test-key" />);
    const mapElement = screen.getByTestId('longdo-map');
    expect(mapElement).toBeInTheDocument();
  });

  it('should initialize the map with given props', async () => {
    const mockSetMap = jest.fn();
    render(
      <LongdoMap
        apiKey="test-key"
        location={{ lon: 100, lat: 13 }}
        zoom={12}
        mapObj={mockSetMap}
      />
    );

    await waitFor(() => {
      // Check if the longdo.Map constructor was called
      expect(window.longdo.Map).toHaveBeenCalledTimes(1);
      // Check if the map object was passed to the callback
      expect(mockSetMap).toHaveBeenCalledTimes(1);
    });
  });
});
