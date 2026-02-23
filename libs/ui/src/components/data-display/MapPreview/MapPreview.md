# MapPreview Component

A versatile and interactive map preview component that provides a visual representation of geographic locations with support for markers, routes, heatmaps, and various display modes.

## Purpose

The MapPreview component is designed to display geographic data in an intuitive and interactive way. It supports static map displays, interactive features, multiple markers, search functionality, route visualization, and heatmap overlays. Perfect for location-based applications, delivery tracking, store locators, and geographic data visualization.

## Props

### Core Props

- **center** (`{ lat: number; lng: number }`): Map center coordinates
- **coordinates** (`{ lat: number; lng: number }`): Legacy coordinates prop (use center instead)
- **height** (`string`): Map container height (default: '400px')
- **zoom** (`number`): Initial zoom level 1-20 (default: 15)
- **googleMapsApiKey** (`string`): Optional Google Maps API key for enhanced features

### Display Props

- **mapType** (`'roadmap' | 'satellite' | 'hybrid' | 'terrain'`): Map display type (default: 'roadmap')
- **variant** (`'default' | 'glass' | 'satellite' | 'dark'`): Visual style variant (default: 'default')
- **animated** (`boolean`): Enable smooth animations (default: true)
- **showControls** (`boolean`): Show zoom and map type controls (default: true)

### Marker Props

- **marker** (`boolean`): Show single marker at center (default: true)
- **markers** (`MapMarker[]`): Array of markers with custom positions and properties
  - `position`: Marker coordinates
  - `title`: Marker tooltip title
  - `description`: Extended description
  - `icon`: Custom marker icon
  - `onClick`: Click handler

### Interactive Props

- **interactive** (`boolean`): Enable user interaction (default: false)
- **onMarkerDrag** (`(coords: { lat: number; lng: number }) => void`): Marker drag callback
- **onMapClick** (`(lat: number, lng: number) => void`): Map click callback

### Search Props

- **showSearch** (`boolean`): Display search bar (default: false)
- **searchPlaceholder** (`string`): Search input placeholder text

### Visualization Props

- **showRoute** (`boolean`): Display route overlay (default: false)
- **routeColor** (`string`): Custom route line color
- **showHeatmap** (`boolean`): Display heatmap overlay (default: false)
- **heatmapData** (`HeatmapPoint[]`): Heatmap data points with weight values

## Usage Examples

### Basic Map Preview
```tsx
<MapPreview
  center={{ lat: 37.7749, lng: -122.4194 }}
  height="400px"
  zoom={12}
/>
```

### Interactive Map with Multiple Markers
```tsx
<MapPreview
  center={{ lat: 37.7749, lng: -122.4194 }}
  interactive
  markers={[
    {
      position: { lat: 37.7749, lng: -122.4194 },
      title: "San Francisco",
      description: "City by the Bay",
      onClick: () => console.log("SF clicked")
    },
    {
      position: { lat: 37.7849, lng: -122.4094 },
      title: "Golden Gate Bridge",
      description: "Iconic landmark"
    }
  ]}
  onMapClick={(lat, lng) => console.log(`Clicked: ${lat}, ${lng}`)}
/>
```

### Map with Search and Route
```tsx
<MapPreview
  center={{ lat: 37.7749, lng: -122.4194 }}
  showSearch
  searchPlaceholder="Find a location..."
  showRoute
  routeColor="#4CAF50"
  mapType="hybrid"
/>
```

### Heatmap Visualization
```tsx
<MapPreview
  center={{ lat: 37.7749, lng: -122.4194 }}
  showHeatmap
  heatmapData={[
    { lat: 37.7749, lng: -122.4194, weight: 0.8 },
    { lat: 37.7849, lng: -122.4094, weight: 0.6 },
    { lat: 37.7649, lng: -122.4294, weight: 0.9 }
  ]}
  variant="dark"
/>
```

### Glass Effect with Fullscreen
```tsx
<MapPreview
  center={{ lat: 37.7749, lng: -122.4194 }}
  variant="glass"
  showControls
  height="500px"
/>
```

## Accessibility

- **ARIA Labels**: Comprehensive labeling for screen readers
- **Keyboard Navigation**: Full keyboard support for controls
- **Focus Management**: Proper focus handling for interactive elements
- **Live Regions**: Dynamic updates announced to assistive technologies
- **Tooltips**: Informative tooltips on all controls
- **High Contrast**: Supports high contrast modes

## Best Practices

1. **Performance**: Use appropriate zoom levels and limit markers for better performance
2. **Mobile**: Ensure adequate height on mobile devices
3. **API Keys**: Secure API keys properly in production
4. **Fallbacks**: Provide fallback content when maps cannot load
5. **Loading States**: Show loading indicators for async data
6. **Error Handling**: Handle geolocation errors gracefully

## Theme Integration

The component fully integrates with MUI theme:
- Uses theme colors for map overlays
- Responds to light/dark mode changes
- Applies theme spacing and borders
- Supports custom theme extensions

## Browser Compatibility

- Modern browsers with ES6 support
- Requires CSS backdrop-filter for glass effects
- Graceful degradation for older browsers
- Touch support for mobile devices