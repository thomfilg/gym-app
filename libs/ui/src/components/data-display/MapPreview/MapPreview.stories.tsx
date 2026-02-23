import { action } from 'storybook/actions';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { MapPreview } from './MapPreview';
import type { HeatmapPoint,MapMarker } from './MapPreview.types';

const meta: Meta<typeof MapPreview> = {
  title: 'Enhanced/MapPreview',
  component: MapPreview,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile map preview component with support for markers, routes, heatmaps, and interactive features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    center: {
      control: 'object',
      description: 'Map center coordinates',
    },
    height: {
      control: 'text',
      description: 'Map container height',
    },
    zoom: {
      control: { type: 'range', min: 1, max: 20, step: 1 },
      description: 'Zoom level (1-20)',
    },
    mapType: {
      control: 'select',
      options: ['roadmap', 'satellite', 'hybrid', 'terrain'],
      description: 'Map display type',
    },
    variant: {
      control: 'select',
      options: ['default', 'glass', 'satellite', 'dark'],
      description: 'Visual style variant',
    },
    interactive: {
      control: 'boolean',
      description: 'Enable user interaction',
    },
    showControls: {
      control: 'boolean',
      description: 'Show map controls',
    },
    showSearch: {
      control: 'boolean',
      description: 'Show search functionality',
    },
    showRoute: {
      control: 'boolean',
      description: 'Display route overlay',
    },
    showHeatmap: {
      control: 'boolean',
      description: 'Display heatmap overlay',
    },
    animated: {
      control: 'boolean',
      description: 'Enable smooth animations',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const sanFrancisco = { lat: 37.7749, lng: -122.4194 };
const sampleMarkers: MapMarker[] = [
  {
    position: { lat: 37.7749, lng: -122.4194 },
    title: 'San Francisco City Hall',
    description: 'Civic Center',
    onClick: action('marker-click-city-hall'),
  },
  {
    position: { lat: 37.7849, lng: -122.4094 },
    title: 'Golden Gate Bridge',
    description: 'Iconic landmark',
    onClick: action('marker-click-bridge'),
  },
  {
    position: { lat: 37.7949, lng: -122.3994 },
    title: 'Fisherman\'s Wharf',
    description: 'Tourist destination',
    onClick: action('marker-click-wharf'),
  },
];

const sampleHeatmapData: HeatmapPoint[] = [
  { lat: 37.7749, lng: -122.4194, weight: 0.9 },
  { lat: 37.7849, lng: -122.4094, weight: 0.7 },
  { lat: 37.7649, lng: -122.4294, weight: 0.8 },
  { lat: 37.7549, lng: -122.4394, weight: 0.6 },
  { lat: 37.7949, lng: -122.3994, weight: 0.5 },
];

// Stories
export const Default: Story = {
  args: {
    center: sanFrancisco,
    height: '400px',
    zoom: 12,
  },
};

export const Interactive: Story = {
  args: {
    center: sanFrancisco,
    height: '400px',
    interactive: true,
    showControls: true,
    onMapClick: action('map-click'),
    onMarkerDrag: action('marker-drag'),
  },
};

export const MultipleMarkers: Story = {
  args: {
    center: sanFrancisco,
    markers: sampleMarkers,
    height: '400px',
    zoom: 11,
    showControls: true,
  },
};

export const WithSearch: Story = {
  args: {
    center: sanFrancisco,
    showSearch: true,
    searchPlaceholder: 'Search San Francisco...',
    height: '400px',
    showControls: true,
  },
};

export const RouteDisplay: Story = {
  args: {
    center: sanFrancisco,
    showRoute: true,
    routeColor: '#4CAF50',
    markers: [
      { position: { lat: 37.7749, lng: -122.4194 }, title: 'Start' },
      { position: { lat: 37.7949, lng: -122.3994 }, title: 'End' },
    ],
    height: '400px',
  },
};

export const HeatmapVisualization: Story = {
  args: {
    center: sanFrancisco,
    showHeatmap: true,
    heatmapData: sampleHeatmapData,
    height: '400px',
    zoom: 11,
  },
};

export const SatelliteView: Story = {
  args: {
    center: sanFrancisco,
    mapType: 'satellite',
    height: '400px',
    showControls: true,
  },
};

export const HybridView: Story = {
  args: {
    center: sanFrancisco,
    mapType: 'hybrid',
    markers: sampleMarkers,
    height: '400px',
    showControls: true,
  },
};

export const TerrainView: Story = {
  args: {
    center: sanFrancisco,
    mapType: 'terrain',
    height: '400px',
    showControls: true,
  },
};

export const GlassEffect: Story = {
  args: {
    center: sanFrancisco,
    variant: 'glass',
    height: '400px',
    showControls: true,
  },
  parameters: {
    backgrounds: { default: 'gradient' },
  },
};

export const DarkMode: Story = {
  args: {
    center: sanFrancisco,
    markers: sampleMarkers,
    height: '400px',
    showControls: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const FullFeatured: Story = {
  args: {
    center: sanFrancisco,
    markers: sampleMarkers,
    showSearch: true,
    showRoute: true,
    showHeatmap: true,
    heatmapData: sampleHeatmapData,
    interactive: true,
    showControls: true,
    height: '500px',
    onMapClick: action('map-click'),
    onMarkerDrag: action('marker-drag'),
  },
};

export const MinimalHeight: Story = {
  args: {
    center: sanFrancisco,
    height: '200px',
    showControls: true,
  },
};

export const MaxHeight: Story = {
  args: {
    center: sanFrancisco,
    height: '600px',
    markers: sampleMarkers,
    showControls: true,
  },
};

export const NoControls: Story = {
  args: {
    center: sanFrancisco,
    showControls: false,
    height: '400px',
  },
};

export const NoMarkers: Story = {
  args: {
    center: sanFrancisco,
    marker: false,
    markers: [],
    height: '400px',
    showControls: true,
  },
};

export const CustomRoute: Story = {
  args: {
    center: sanFrancisco,
    showRoute: true,
    routeColor: '#FF5722',
    height: '400px',
  },
};

export const AnimationsDisabled: Story = {
  args: {
    center: sanFrancisco,
    markers: sampleMarkers,
    animated: false,
    height: '400px',
    showControls: true,
  },
};

export const ExtremeZoom: Story = {
  args: {
    center: sanFrancisco,
    zoom: 20,
    height: '400px',
    showControls: true,
  },
};

export const WorldView: Story = {
  args: {
    center: { lat: 0, lng: 0 },
    zoom: 1,
    height: '400px',
    showControls: true,
  },
};

export const Mobile: Story = {
  args: {
    center: sanFrancisco,
    height: '300px',
    showControls: true,
    markers: sampleMarkers,
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphone6',
    },
  },
};

export const Tablet: Story = {
  args: {
    center: sanFrancisco,
    height: '400px',
    showControls: true,
    markers: sampleMarkers,
    showSearch: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
  },
};

export const LoadingState: Story = {
  args: {
    center: sanFrancisco,
    height: '400px',
  },
  parameters: {
    docs: {
      description: {
        story: 'Map loading state simulation',
      },
    },
  },
};

export const ErrorState: Story = {
  args: {
    center: { lat: 999, lng: 999 }, // Invalid coordinates
    height: '400px',
    showControls: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Map error state with invalid coordinates',
      },
    },
  },
};

export const EmptyState: Story = {
  args: {
    center: sanFrancisco,
    marker: false,
    markers: [],
    showControls: false,
    height: '400px',
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal map without any overlays or controls',
      },
    },
  },
};

// Required stories for validation
export const AllVariants: Story = {
  args: {
    center: sanFrancisco,
    height: '400px',
    showControls: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'All map type variants (roadmap, satellite, hybrid, terrain)',
      },
    },
  },
};

export const AllSizes: Story = {
  args: {
    center: sanFrancisco,
    showControls: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Different map sizes from minimal to full height',
      },
    },
  },
};

export const AllStates: Story = {
  args: {
    center: sanFrancisco,
    interactive: true,
    showControls: true,
    markers: sampleMarkers,
  },
  parameters: {
    docs: {
      description: {
        story: 'All interactive states including hover, focus, and active',
      },
    },
  },
};

export const InteractiveStates: Story = {
  args: {
    center: sanFrancisco,
    interactive: true,
    showControls: true,
    onMapClick: action('map-click'),
    onMarkerDrag: action('marker-drag'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive states with all callbacks',
      },
    },
  },
};

export const Responsive: Story = {
  args: {
    center: sanFrancisco,
    height: '400px',
    showControls: true,
    markers: sampleMarkers,
  },
  parameters: {
    docs: {
      description: {
        story: 'Responsive map that adapts to different screen sizes',
      },
    },
  },
};