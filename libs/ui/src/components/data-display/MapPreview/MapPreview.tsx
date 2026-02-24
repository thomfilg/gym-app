import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { alpha, styled, useTheme } from '@mui/material/styles';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import LayersIcon from '@mui/icons-material/Layers';
import LocationIcon from '@mui/icons-material/LocationOn';
import CenterIcon from '@mui/icons-material/MyLocation';
import NavigationIcon from '@mui/icons-material/Navigation';
import PlaceIcon from '@mui/icons-material/Place';
import SearchIcon from '@mui/icons-material/Search';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import type { FC} from 'react';
import React, { useCallback,useEffect, useRef, useState } from 'react';

import type { HeatmapPoint,MapPreviewProps } from './MapPreview.types';

// Styled components
const MapContainer = styled(Paper)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
  background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.8)} 100%)`,
  border: `1px solid ${alpha(theme.palette.divider, 0.18)}`,
}));

const MapWrapper = styled(Box)<{ height: string }>(({ height }) => ({
  width: '100%',
  height,
  position: 'relative',
}));

const MapControls = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

const ControlButton = styled(IconButton)(({ theme }) => ({
  background: alpha(theme.palette.background.paper, 0.95),
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
  boxShadow: theme.shadows[2],
  pointerEvents: 'auto',
  '&:hover': {
    background: theme.palette.background.paper,
    transform: 'scale(1.05)',
  },
  '&:disabled': {
    opacity: 0.5,
    pointerEvents: 'auto',
  },
}));

const CoordinatesDisplay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(2),
  left: theme.spacing(2),
  padding: theme.spacing(1, 1.5),
  background: alpha(theme.palette.background.paper, 0.95),
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
  borderRadius: theme.shape.borderRadius,
  zIndex: 1,
}));

// Mock Google Maps Service
class MockGoogleMapsService {
  private static readonly TILE_SIZE = 256;
  private static readonly MAX_ZOOM = 21;

  // Calculate tile coordinates from lat/lng and zoom
  static getTileCoordinates(lat: number, lng: number, zoom: number) {
    const scale = 1 << zoom;
    const worldCoordinate = this.project(lat, lng);
    const pixelCoordinate = {
      x: Math.floor(worldCoordinate.x * scale),
      y: Math.floor(worldCoordinate.y * scale)
    };
    const tileCoordinate = {
      x: Math.floor(pixelCoordinate.x / this.TILE_SIZE),
      y: Math.floor(pixelCoordinate.y / this.TILE_SIZE)
    };
    return tileCoordinate;
  }

  // Mercator projection
  static project(lat: number, lng: number) {
    const siny = Math.sin((lat * Math.PI) / 180);
    const boundedSiny = Math.max(-0.9999, Math.min(0.9999, siny));

    return {
      x: this.TILE_SIZE * (0.5 + lng / 360),
      y: this.TILE_SIZE * (0.5 - Math.log((1 + boundedSiny) / (1 - boundedSiny)) / (4 * Math.PI))
    };
  }

  // Convert pixel coordinates back to lat/lng
  static unproject(x: number, y: number, zoom: number) {
    const scale = 1 << zoom;
    const worldCoordinate = {
      x: x / scale,
      y: y / scale
    };

    const lng = (worldCoordinate.x / this.TILE_SIZE - 0.5) * 360;
    const latRadians = (0.5 - worldCoordinate.y / this.TILE_SIZE) * 2 * Math.PI;
    const lat = (2 * Math.atan(Math.exp(latRadians)) - Math.PI / 2) * 180 / Math.PI;

    return { lat, lng };
  }

  // Calculate distance between two points (Haversine formula)
  static calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  // Get scale bar distance based on zoom level
  static getScaleDistance(zoom: number): string {
    const metersPerPixel = 156543.03392 * Math.cos(0) / Math.pow(2, zoom);
    const scaleWidth = 100; // pixels
    const distance = metersPerPixel * scaleWidth;

    if (distance >= 1000) {
      return `${Math.round(distance / 1000)} km`;
    } else if (distance >= 100) {
      return `${Math.round(distance / 100) * 100} m`;
    } else {
      return `${Math.round(distance)} m`;
    }
  }

  // Simulate geocoding
  static async geocode(address: string): Promise<{ lat: number; lng: number } | null> {
    // Simulate API delay
    await new Promise(resolve => window.setTimeout(resolve, 300));

    // Mock geocoding results
    const mockResults: Record<string, { lat: number; lng: number }> = {
      'san francisco': { lat: 37.7749, lng: -122.4194 },
      'new york': { lat: 40.7128, lng: -74.0060 },
      'london': { lat: 51.5074, lng: -0.1278 },
      'tokyo': { lat: 35.6762, lng: 139.6503 },
      'paris': { lat: 48.8566, lng: 2.3522 },
    };

    const normalizedAddress = address.toLowerCase().trim();
    return mockResults[normalizedAddress] || null;
  }
}

// Static Map Component with realistic map visualization
const StaticMapView: FC<{
  coordinates: { lat: number; lng: number };
  height: string;
  zoom: number;
  mapType: string;
  marker?: boolean;
  markerPosition?: { lat: number; lng: number };
  panOffset?: { x: number; y: number };
}> = ({
  height,
  zoom,
  mapType,
  marker,
  markerPosition,
  panOffset = { x: 0, y: 0 },
}) => {
  const theme = useTheme();
  const mapRef = useRef<HTMLDivElement>(null);


  // Calculate tile information
  const tileInfo = React.useMemo(() => {
    if (!markerPosition) return null;
    return MockGoogleMapsService.getTileCoordinates(
      markerPosition.lat,
      markerPosition.lng,
      zoom
    );
  }, [markerPosition, zoom]);

  // Simulate map tiles with realistic grid
  const MapTiles = () => {
    const tileSize = 256;
    const visibleTiles = Math.ceil(800 / tileSize) + 2; // Extra tiles for panning
    const tileOpacity = theme.palette.mode === 'dark' ? 0.15 : 0.1;

    return (
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(calc(-50% + ${panOffset.x}px), calc(-50% + ${panOffset.y}px))`,
          width: tileSize * visibleTiles,
          height: tileSize * visibleTiles,
          display: 'grid',
          gridTemplateColumns: `repeat(${visibleTiles}, ${tileSize}px)`,
          gridTemplateRows: `repeat(${visibleTiles}, ${tileSize}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {Array.from({ length: visibleTiles * visibleTiles }).map((_, index) => {
          const row = Math.floor(index / visibleTiles);
          const col = index % visibleTiles;
          const tileX = (tileInfo?.x || 0) + col - Math.floor(visibleTiles / 2);
          const tileY = (tileInfo?.y || 0) + row - Math.floor(visibleTiles / 2);

          return (
            <div
              key={`tile-${tileX}-${tileY}`}
              style={{
                width: tileSize,
                height: tileSize,
                border: `1px solid ${alpha(theme.palette.divider, tileOpacity)}`,
                background: mapType === 'satellite'
                  ? `linear-gradient(135deg, ${alpha('#1a1a1a', 0.9)} 0%, ${alpha('#2a2a2a', 0.9)} 100%)`
                  : mapType === 'terrain'
                    ? `linear-gradient(135deg, ${alpha('#7cb342', 0.1)} 0%, ${alpha('#558b2f', 0.1)} 100%)`
                    : `linear-gradient(135deg, ${alpha(theme.palette.grey[100], 0.5)} 0%, ${alpha(theme.palette.grey[200], 0.5)} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                color: alpha(theme.palette.text.secondary, 0.3),
                fontFamily: 'monospace',
                userSelect: 'none',
              }}
            >
              {zoom > 10 && `${tileX},${tileY}`}
            </div>
          );
        })}
      </div>
    );
  };

  // Create a more realistic map visualization
  return (
    <Box
      ref={mapRef}
      data-testid="static-map-view"
      sx={{
        width: '100%',
        height,
        position: 'relative',
        background: mapType === 'satellite'
          ? `linear-gradient(135deg, ${theme.palette.grey[900]} 0%, ${theme.palette.grey[800]} 100%)`
          : mapType === 'terrain'
            ? `linear-gradient(135deg, ${alpha('#8BC34A', 0.2)} 0%, ${alpha('#4CAF50', 0.3)} 100%)`
            : theme.palette.mode === 'dark'
              ? `linear-gradient(135deg, ${theme.palette.grey[900]} 0%, ${theme.palette.grey[800]} 100%)`
              : `linear-gradient(135deg, ${theme.palette.grey[100]} 0%, ${theme.palette.grey[200]} 100%)`,
        overflow: 'hidden',
      }}
    >
      {/* Map tiles */}
      <MapTiles />

      {/* Simulated map features */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '15%',
          width: '70%',
          height: '60%',
          opacity: 0.2,
        }}
      >
        {/* Simulated roads */}
        <svg width="100%" height="100%" style={{ position: 'absolute' }}>
          <path
            d={'M 10,50 Q 30,30 50,50 T 90,50'}
            stroke={theme.palette.text.secondary}
            strokeWidth="2"
            fill="none"
            opacity="0.3"
          />
          <path
            d={'M 50,10 L 50,90'}
            stroke={theme.palette.text.secondary}
            strokeWidth="1.5"
            fill="none"
            opacity="0.3"
          />
          <path
            d={'M 20,30 L 80,70'}
            stroke={theme.palette.text.secondary}
            strokeWidth="1"
            fill="none"
            opacity="0.2"
          />
        </svg>
      </Box>

      {/* Center marker */}
      {marker && (
        <Box
          data-testid="map-marker"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -100%)',
            zIndex: 2,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
          }}
        >
          <LocationIcon
            sx={{
              fontSize: 36,
              color: theme.palette.error.main,
              animation: 'bounce 2s infinite',
              '@keyframes bounce': {
                '0%, 100%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(-10px)' },
              },
            }}
          />
        </Box>
      )}

      {/* Additional map markers for realism */}
      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          left: '25%',
          opacity: 0.6,
        }}
      >
        <PlaceIcon sx={{ fontSize: 20, color: theme.palette.primary.main }} />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '65%',
          left: '70%',
          opacity: 0.6,
        }}
      >
        <PlaceIcon sx={{ fontSize: 20, color: theme.palette.primary.main }} />
      </Box>

      {/* Scale indicator */}
      <Box
        sx={{
          position: 'absolute',
          bottom: theme.spacing(2),
          right: theme.spacing(2),
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          padding: theme.spacing(0.5, 1),
          background: alpha(theme.palette.background.paper, 0.9),
          borderRadius: theme.shape.borderRadius,
          fontSize: '0.75rem',
          color: theme.palette.text.secondary,
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 2,
            background: theme.palette.text.secondary,
            position: 'relative',
            '&::before, &::after': {
              content: '""',
              position: 'absolute',
              width: 2,
              height: 6,
              background: theme.palette.text.secondary,
            },
            '&::before': { left: 0, top: -2 },
            '&::after': { right: 0, top: -2 },
          }}
        />
        <Typography variant="caption">
          {MockGoogleMapsService.getScaleDistance(zoom)}
        </Typography>
      </Box>

      {/* Compass */}
      <Box
        sx={{
          position: 'absolute',
          top: theme.spacing(2),
          left: theme.spacing(2),
          width: 40,
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: alpha(theme.palette.background.paper, 0.9),
          borderRadius: '50%',
          boxShadow: theme.shadows[2],
        }}
      >
        <NavigationIcon
          sx={{
            fontSize: 24,
            color: theme.palette.primary.main,
            transform: 'rotate(-45deg)',
          }}
        />
      </Box>
    </Box>
  );
};

// Search bar component
const SearchBar = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 2,
  width: '90%',
  maxWidth: 400,
}));

const SearchField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    background: alpha(theme.palette.background.paper, 0.95),
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderRadius: theme.shape.borderRadius * 2,
    '& fieldset': {
      borderColor: alpha(theme.palette.divider, 0.2),
    },
  },
}));

// Heatmap overlay component
const HeatmapOverlay: FC<{ points: HeatmapPoint[]; width: number; height: number }> = ({ points, width, height }) => {
  const theme = useTheme();

  if (!points || points.length === 0) return null;

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
      viewBox={`0 0 ${width} ${height}`}
    >
      {points.map((point, index) => {
        const radius = 30 * point.weight;
        const opacity = 0.3 * point.weight;
        return (
          <circle
            key={index}
            cx={width / 2 + (point.lng * 10)}
            cy={height / 2 - (point.lat * 10)}
            r={radius}
            fill={theme.palette.error.main}
            opacity={opacity}
          />
        );
      })}
    </svg>
  );
};

// Route overlay component
const RouteOverlay: FC<{ color: string }> = ({ color }) => {
  const theme = useTheme();

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
      viewBox="0 0 100 100"
    >
      <path
        d="M 20,20 Q 40,10 50,30 T 80,80"
        stroke={color || theme.palette.primary.main}
        strokeWidth="3"
        fill="none"
        strokeDasharray="5,5"
        opacity="0.8"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="0;10"
          dur="1s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
};

// Main component
export const MapPreview: FC<MapPreviewProps> = ({
  center,
  coordinates: legacyCoordinates,
  markers = [],
  marker = true,
  height = '400px',
  interactive = false,
  zoom: initialZoom = 15,
  mapType = 'roadmap',
  variant = 'default',
  showControls = true,
  showSearch = false,
  searchPlaceholder = 'Search location...',
  showRoute = false,
  routeColor,
  heatmapData = [],
  showHeatmap = false,
  animated = true,
  onMarkerDrag,
  onMapClick,
}) => {
  // Use center prop if provided, otherwise fall back to coordinates
  const coordinates = React.useMemo(() => center || legacyCoordinates || { lat: 0, lng: 0 }, [center, legacyCoordinates]);
  const originalCoordinates = React.useRef(coordinates);

  const [currentZoom, setCurrentZoom] = useState(initialZoom);
  const [currentMapType, setCurrentMapType] = useState<
  'roadmap' | 'satellite' | 'hybrid' | 'terrain'
  >(mapType);
  const [markerPosition, setMarkerPosition] = useState(coordinates);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [, setSearchResults] = useState<{ lat: number; lng: number } | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; y: number; lat: number; lng: number } | null>(null);
  const panStartRef = useRef<{ x: number; y: number; offsetX: number; offsetY: number } | null>(null);

  // Update marker position when coordinates change
  useEffect(() => {
    setMarkerPosition(coordinates);
  }, [coordinates]);

  const handleZoomIn = () => {
    const newZoom = Math.min(currentZoom + 1, 20);
    setCurrentZoom(newZoom);
    // Reset pan offset when zooming
    setPanOffset({ x: 0, y: 0 });
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(currentZoom - 1, 1);
    setCurrentZoom(newZoom);
    // Reset pan offset when zooming
    setPanOffset({ x: 0, y: 0 });
  };

  const handleCenter = () => {
    originalCoordinates.current = coordinates; // Update ref with current coordinates
    setMarkerPosition({ ...coordinates }); // Reset to current coordinates
    setPanOffset({ x: 0, y: 0 });
  };

  const handleToggleMapType = () => {
    const types: Array<'roadmap' | 'satellite' | 'hybrid' | 'terrain'> = [
      'roadmap',
      'satellite',
      'hybrid',
      'terrain',
    ];
    const currentIndex = types.indexOf(currentMapType);
    const nextIndex = (currentIndex + 1) % types.length;
    const nextType = types[nextIndex] as 'roadmap' | 'satellite' | 'hybrid' | 'terrain';
    setCurrentMapType(nextType);
  };

  const handleFullscreen = () => {
    if (!isFullscreen && mapContainerRef.current) {
      mapContainerRef.current.requestFullscreen?.();
    } else if (document.fullscreenElement) {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  // Handle map click for marker placement
  const handleMapClick = useCallback(() => {
    // Don't place marker if we're panning
    if (isPanning) return;

    // Simple coordinate offset calculation for testing
    const centerLat = coordinates.lat; // Use original coordinates as reference
    const centerLng = coordinates.lng;

    // Small random offset to simulate coordinate change
    const newCoords = {
      lat: centerLat + (Math.random() - 0.5) * 0.001,
      lng: centerLng + (Math.random() - 0.5) * 0.001
    };

    if (onMapClick) {
      onMapClick(newCoords.lat, newCoords.lng);
    }

    if (interactive && onMarkerDrag) {
      setMarkerPosition(newCoords);
      onMarkerDrag(newCoords);
    }
  }, [coordinates.lat, coordinates.lng, interactive, onMarkerDrag, onMapClick, isPanning]);

  // Handle pan/drag start
  const handleMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (interactive) {
      // Check if we're clicking on empty map area (for panning)
      const target = event.target as HTMLElement;
      const isMapBackground = target.dataset.testid === 'static-map-view' ||
                              target.closest('[data-testid="static-map-view"]');

      if (isMapBackground && event.shiftKey) {
        // Shift+drag for panning
        setIsPanning(true);
        panStartRef.current = {
          x: event.clientX,
          y: event.clientY,
          offsetX: panOffset.x,
          offsetY: panOffset.y,
        };
      } else {
        // Regular drag for marker movement
        setIsDragging(true);
        dragStartRef.current = {
          x: event.clientX,
          y: event.clientY,
          lat: markerPosition.lat,
          lng: markerPosition.lng,
        };
      }
    }
  }, [interactive, markerPosition, panOffset]);

  // Handle pan/drag movement
  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (isPanning && panStartRef.current) {
      // Handle map panning
      const deltaX = event.clientX - panStartRef.current.x;
      const deltaY = event.clientY - panStartRef.current.y;

      setPanOffset({
        x: panStartRef.current.offsetX + deltaX,
        y: panStartRef.current.offsetY + deltaY,
      });
    } else if (isDragging && dragStartRef.current) {
      // Handle marker dragging
      const deltaX = event.clientX - dragStartRef.current.x;
      const deltaY = event.clientY - dragStartRef.current.y;

      // Simple drag simulation for testing
      const newPosition = {
        lat: dragStartRef.current.lat + deltaY * 0.0001,
        lng: dragStartRef.current.lng + deltaX * 0.0001
      };

      setMarkerPosition(newPosition);
      if (onMarkerDrag) {
        onMarkerDrag(newPosition);
      }
    }
  }, [isDragging, isPanning, onMarkerDrag]);

  // Handle pan/drag end
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsPanning(false);
    dragStartRef.current = null;
    panStartRef.current = null;
  }, []);

  // Handle search
  const handleSearch = useCallback(async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searchValue) {
      setIsSearching(true);
      try {
        const result = await MockGoogleMapsService.geocode(searchValue);
        if (result) {
          setSearchResults(result);
          setMarkerPosition({ ...result }); // Create new object to ensure update
          setPanOffset({ x: 0, y: 0 });
          // Zoom to appropriate level for city view
          setCurrentZoom(12);
        } else {
          // No results found - could show an error message in production
          // In production, this would trigger an error toast or notification
        }
      } finally {
        setIsSearching(false);
      }
    }
  }, [searchValue]);

  // Get glass effect styles
  const getGlassStyles = () => {
    if (variant === 'glass') {
      return {
        background: alpha(theme.palette.background.paper, 0.7),
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      };
    }
    return {};
  };

  const theme = useTheme();

  return (
    <MapContainer
      ref={mapContainerRef}
      elevation={variant === 'glass' ? 0 : 2}
      data-testid="map-preview-container"
      role="img"
      aria-label={`Map preview centered at ${markerPosition.lat.toFixed(4)}, ${markerPosition.lng.toFixed(4)} with zoom level ${currentZoom}`}
      tabIndex={0}
      aria-live="polite"
      aria-atomic="true"
      sx={getGlassStyles()}
    >
      <MapWrapper
        height={isFullscreen ? '100vh' : height}
        onClick={handleMapClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          cursor: isDragging || isPanning ? 'grabbing' : interactive ? 'grab' : 'default',
          transition: animated ? 'all 0.3s ease' : 'none',
        }}
      >
        {/* Use our realistic static map visualization */}
        <StaticMapView
          coordinates={coordinates}
          height={isFullscreen ? '100vh' : height}
          zoom={currentZoom}
          mapType={currentMapType}
          marker={marker && markers.length === 0}
          markerPosition={markerPosition}
          panOffset={panOffset}
        />

        {/* Render multiple markers */}
        {markers.map((markerItem, index) => (
          <Box
            key={index}
            data-testid={`map-marker-${index}`}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(
                ${(markerItem.position.lng - markerPosition.lng) * 100}px,
                ${-(markerItem.position.lat - markerPosition.lat) * 100}px
              )`,
              zIndex: 3,
              cursor: markerItem.onClick ? 'pointer' : 'default',
            }}
            onClick={markerItem.onClick}
            title={markerItem.title}
          >
            <Tooltip title={markerItem.description || markerItem.title || ''}>
              <LocationIcon
                sx={{
                  fontSize: 32,
                  color: theme.palette.error.main,
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                  animation: animated ? 'bounce 2s infinite' : 'none',
                  '@keyframes bounce': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                  },
                }}
              />
            </Tooltip>
          </Box>
        ))}

        {/* Heatmap overlay */}
        {showHeatmap && heatmapData.length > 0 && (
          <HeatmapOverlay
            points={heatmapData}
            width={800}
            height={400}
          />
        )}

        {/* Route overlay */}
        {showRoute && (
          <RouteOverlay color={routeColor || theme.palette.primary.main} />
        )}

        {/* Search bar */}
        {showSearch && (
          <SearchBar>
            <SearchField
              fullWidth
              size="small"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" sx={{ opacity: isSearching ? 0.5 : 1 }} />
                  </InputAdornment>
                ),
              }}
              disabled={isSearching}
              aria-label="Search location"
            />
          </SearchBar>
        )}

        {showControls && (
          <MapControls data-testid="map-controls">
            <Tooltip title="Zoom in" placement="left">
              <ControlButton
                size="small"
                onClick={handleZoomIn}
                aria-label="Zoom in"
                data-testid="zoom-in-button"
                disabled={currentZoom >= 20}
              >
                <ZoomInIcon fontSize="small" />
              </ControlButton>
            </Tooltip>
            <Tooltip title="Zoom out" placement="left">
              <ControlButton
                size="small"
                onClick={handleZoomOut}
                aria-label="Zoom out"
                data-testid="zoom-out-button"
                disabled={currentZoom <= 1}
              >
                <ZoomOutIcon fontSize="small" />
              </ControlButton>
            </Tooltip>
            <Tooltip title="Center map" placement="left">
              <ControlButton
                size="small"
                onClick={handleCenter}
                aria-label="Center map"
                data-testid="center-button"
              >
                <CenterIcon fontSize="small" />
              </ControlButton>
            </Tooltip>
            <Tooltip title={`Map type: ${currentMapType}`} placement="left">
              <ControlButton
                size="small"
                onClick={handleToggleMapType}
                aria-label="Change map type"
                data-testid="map-type-button"
              >
                <LayersIcon fontSize="small" />
              </ControlButton>
            </Tooltip>
            <Tooltip title="Toggle fullscreen" placement="left">
              <ControlButton
                size="small"
                onClick={handleFullscreen}
                aria-label="Toggle fullscreen"
                data-testid="fullscreen-button"
              >
                <FullscreenIcon fontSize="small" />
              </ControlButton>
            </Tooltip>
          </MapControls>
        )}

        <CoordinatesDisplay data-testid="coordinates-display">
          <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
            Lat: {markerPosition.lat.toFixed(6)}, Lng: {markerPosition.lng.toFixed(6)}
          </Typography>
          {currentZoom && (
            <Typography variant="caption" sx={{ fontFamily: 'monospace', display: 'block' }}>
              Zoom: {currentZoom}
            </Typography>
          )}
        </CoordinatesDisplay>
      </MapWrapper>
    </MapContainer>
  );
};

// Export default
export default MapPreview;
