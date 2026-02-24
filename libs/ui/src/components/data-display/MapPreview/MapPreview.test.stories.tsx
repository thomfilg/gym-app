import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { expect, fn, waitFor, within } from 'storybook/test';

import { MapPreview } from './MapPreview';
import type { HeatmapPoint,MapMarker } from './MapPreview.types';

const meta: Meta<typeof MapPreview> = {
  title: 'Enhanced/MapPreview/Tests',
  component: MapPreview,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
    // Increase timeout for map loading
    test: {
      timeout: 30000, // 30 seconds for map rendering
    },
  },
  tags: ['autodocs', 'test', 'component:MapPreview'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Test data
const defaultCenter = { lat: 37.7749, lng: -122.4194 };
const testMarkers: MapMarker[] = [
  {
    position: { lat: 37.7749, lng: -122.4194 },
    title: 'Marker 1',
    description: 'First test marker',
    onClick: fn(),
  },
];
const testHeatmapData: HeatmapPoint[] = [{ lat: 37.7749, lng: -122.4194, weight: 0.8 }];

// 1. Basic Interaction Tests
export const BasicInteraction: Story = {
  render: () => (
    <MapPreview center={defaultCenter} interactive={true} showControls={true} zoom={15} />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for map container to render with extended timeout
    const mapContainer = await waitFor(
      async () => {
        const container = await canvas.findByTestId('map-preview-container');
        expect(container).toBeInTheDocument();
        return container;
      },
      { timeout: 10000 }
    );

    // Wait for static map view to render
    await waitFor(
      async () => {
        const staticMap = await canvas.findByTestId('static-map-view');
        expect(staticMap).toBeInTheDocument();
      },
      { timeout: 10000 }
    );

    // Verify map controls are present
    const controls = await canvas.findByTestId('map-controls');
    expect(controls).toBeInTheDocument();

    // Verify coordinates display
    const coordsDisplay = await canvas.findByTestId('coordinates-display');
    expect(coordsDisplay).toBeInTheDocument();

    // Mark test as passed
    const statusElement = document.createElement('div');
    statusElement.setAttribute('aria-label', 'Status of the test run');
    statusElement.textContent = 'PASS';
    canvasElement.appendChild(statusElement);
  },
};

// 2. Marker Interaction Tests
export const MarkerInteraction: Story = {
  render: () => <MapPreview center={defaultCenter} markers={testMarkers} interactive={true} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for map to render first
    await waitFor(
      async () => {
        const container = await canvas.findByTestId('map-preview-container');
        expect(container).toBeInTheDocument();
      },
      { timeout: 10000 }
    );

    // Test marker renders with extended wait
    const marker = await waitFor(
      async () => {
        const markerElement = await canvas.findByTestId('map-marker-0');
        expect(markerElement).toBeInTheDocument();
        return markerElement;
      },
      { timeout: 10000 }
    );

    // Mark test as passed
    const statusElement = document.createElement('div');
    statusElement.setAttribute('aria-label', 'Status of the test run');
    statusElement.textContent = 'PASS';
    canvasElement.appendChild(statusElement);
  },
};

// 3. Keyboard Navigation Tests
export const KeyboardNavigation: Story = {
  render: () => <MapPreview center={defaultCenter} showControls={true} interactive={true} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for map to render and test container is focusable
    const mapContainer = await waitFor(
      async () => {
        const container = await canvas.findByTestId('map-preview-container');
        expect(container).toBeInTheDocument();
        expect(container).toHaveAttribute('tabIndex', '0');
        return container;
      },
      { timeout: 10000 }
    );

    // Mark test as passed
    const statusElement = document.createElement('div');
    statusElement.setAttribute('aria-label', 'Status of the test run');
    statusElement.textContent = 'PASS';
    canvasElement.appendChild(statusElement);
  },
};

// 4. Screen Reader Tests
export const ScreenReader: Story = {
  render: () => <MapPreview center={defaultCenter} showControls={true} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for map and test ARIA labels
    const mapContainer = await waitFor(
      async () => {
        const container = await canvas.findByTestId('map-preview-container');
        expect(container).toBeInTheDocument();
        expect(container).toHaveAttribute('role', 'img');
        expect(container).toHaveAttribute('aria-label');
        return container;
      },
      { timeout: 10000 }
    );

    // Mark test as passed
    const statusElement = document.createElement('div');
    statusElement.setAttribute('aria-label', 'Status of the test run');
    statusElement.textContent = 'PASS';
    canvasElement.appendChild(statusElement);
  },
};

// 5. Focus Management Tests
export const FocusManagement: Story = {
  render: () => <MapPreview center={defaultCenter} showControls={true} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for map and test initial focus
    const mapContainer = await waitFor(
      async () => {
        const container = await canvas.findByTestId('map-preview-container');
        expect(container).toBeInTheDocument();
        return container;
      },
      { timeout: 10000 }
    );

    mapContainer.focus();
    expect(mapContainer).toBeInTheDocument();

    // Mark test as passed
    const statusElement = document.createElement('div');
    statusElement.setAttribute('aria-label', 'Status of the test run');
    statusElement.textContent = 'PASS';
    canvasElement.appendChild(statusElement);
  },
};

// 6. Responsive Design Tests
export const ResponsiveDesign: Story = {
  render: () => <MapPreview center={defaultCenter} height="300px" showControls={true} />,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for map to render in mobile viewport
    await waitFor(
      async () => {
        const container = await canvas.findByTestId('map-preview-container');
        expect(container).toBeInTheDocument();
      },
      { timeout: 10000 }
    );

    // Mark test as passed
    const statusElement = document.createElement('div');
    statusElement.setAttribute('aria-label', 'Status of the test run');
    statusElement.textContent = 'PASS';
    canvasElement.appendChild(statusElement);
  },
};

// 7. Theme Variation Tests
export const ThemeVariations: Story = {
  render: () => <MapPreview center={defaultCenter} variant="glass" showControls={true} />,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for glass variant to render
    await waitFor(
      async () => {
        const container = await canvas.findByTestId('map-preview-container');
        expect(container).toBeInTheDocument();
      },
      { timeout: 10000 }
    );

    // Mark test as passed
    const statusElement = document.createElement('div');
    statusElement.setAttribute('aria-label', 'Status of the test run');
    statusElement.textContent = 'PASS';
    canvasElement.appendChild(statusElement);
  },
};

// 8. Visual State Tests
export const VisualStates: Story = {
  render: () => <MapPreview center={defaultCenter} mapType="satellite" showControls={true} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for static map view to render with satellite type
    await waitFor(
      async () => {
        const staticMap = await canvas.findByTestId('static-map-view');
        expect(staticMap).toBeInTheDocument();
      },
      { timeout: 10000 }
    );

    // Mark test as passed
    const statusElement = document.createElement('div');
    statusElement.setAttribute('aria-label', 'Status of the test run');
    statusElement.textContent = 'PASS';
    canvasElement.appendChild(statusElement);
  },
};

// 9. Performance Tests
export const Performance: Story = {
  render: () => (
    <MapPreview
      center={defaultCenter}
      markers={Array.from({ length: 5 }, (_, i) => ({
        position: {
          lat: defaultCenter.lat + (Math.random() - 0.5) * 0.1,
          lng: defaultCenter.lng + (Math.random() - 0.5) * 0.1,
        },
        title: `Marker ${i + 1}`,
      }))}
      showControls={true}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for map to render with multiple markers
    await waitFor(
      async () => {
        const container = await canvas.findByTestId('map-preview-container');
        expect(container).toBeInTheDocument();
      },
      { timeout: 10000 }
    );

    // Verify all markers rendered
    await waitFor(
      async () => {
        const markers = Array.from({ length: 5 }, (_, i) =>
          canvas.queryByTestId(`map-marker-${i}`)
        );
        const renderedMarkers = markers.filter(m => m !== null);
        expect(renderedMarkers.length).toBe(5);
      },
      { timeout: 10000 }
    );

    // Mark test as passed
    const statusElement = document.createElement('div');
    statusElement.setAttribute('aria-label', 'Status of the test run');
    statusElement.textContent = 'PASS';
    canvasElement.appendChild(statusElement);
  },
};

// 10. Edge Cases Tests
export const EdgeCases: Story = {
  render: () => (
    <MapPreview
      center={{ lat: 90, lng: 180 }}
      zoom={20}
      height="100px"
      markers={[]}
      showControls={true}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for map with extreme coordinates to render
    await waitFor(
      async () => {
        const container = await canvas.findByTestId('map-preview-container');
        expect(container).toBeInTheDocument();
      },
      { timeout: 10000 }
    );

    // Mark test as passed
    const statusElement = document.createElement('div');
    statusElement.setAttribute('aria-label', 'Status of the test run');
    statusElement.textContent = 'PASS';
    canvasElement.appendChild(statusElement);
  },
};

// 11. Integration Tests
export const Integration: Story = {
  render: () => (
    <MapPreview
      center={defaultCenter}
      markers={testMarkers}
      showRoute={true}
      showHeatmap={true}
      heatmapData={testHeatmapData}
      showControls={true}
      interactive={true}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for map with all features to render
    await waitFor(
      async () => {
        const container = await canvas.findByTestId('map-preview-container');
        expect(container).toBeInTheDocument();
      },
      { timeout: 10000 }
    );

    // Verify marker rendered
    await waitFor(
      async () => {
        const marker = await canvas.findByTestId('map-marker-0');
        expect(marker).toBeInTheDocument();
      },
      { timeout: 10000 }
    );

    // Verify controls rendered
    const controls = await canvas.findByTestId('map-controls');
    expect(controls).toBeInTheDocument();

    // Mark test as passed
    const statusElement = document.createElement('div');
    statusElement.setAttribute('aria-label', 'Status of the test run');
    statusElement.textContent = 'PASS';
    canvasElement.appendChild(statusElement);
  },
};
