export interface MapMarker {
  position: { lat: number; lng: number };
  title?: string;
  description?: string;
  icon?: string;
  onClick?: () => void;
}

export interface HeatmapPoint {
  lat: number;
  lng: number;
  weight: number;
}

export interface MapPreviewProps {
  /** Map center coordinates */
  center?: { lat: number; lng: number };
  /** Legacy coordinates prop (use center instead) */
  coordinates?: { lat: number; lng: number };
  /** Array of markers to display */
  markers?: MapMarker[];
  /** Single marker (use markers array instead) */
  marker?: boolean;
  /** Map height */
  height?: string;
  /** Enable user interaction */
  interactive?: boolean;
  /** Initial zoom level */
  zoom?: number;
  /** Google Maps API key */
  googleMapsApiKey?: string;
  /** Map display type */
  mapType?: 'roadmap' | 'satellite' | 'hybrid' | 'terrain';
  /** Map style variant */
  variant?: 'default' | 'glass' | 'satellite' | 'dark';
  /** Show map controls */
  showControls?: boolean;
  /** Show search functionality */
  showSearch?: boolean;
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Enable route display */
  showRoute?: boolean;
  /** Route line color */
  routeColor?: string;
  /** Heatmap data points */
  heatmapData?: HeatmapPoint[];
  /** Show heatmap overlay */
  showHeatmap?: boolean;
  /** Enable smooth animations */
  animated?: boolean;
  /** Callback when marker is dragged */
  onMarkerDrag?: (coords: { lat: number; lng: number }) => void;
  /** Callback when map is clicked */
  onMapClick?: (lat: number, lng: number) => void;
}
