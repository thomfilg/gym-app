import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { alpha, styled, useTheme } from '@mui/material/styles';
import type { FC} from 'react';
import React, { useMemo } from 'react';

import type { TimingData, TimingDiagramProps } from './TimingDiagram.types';

// Color configurations
const phaseColors = {
  dns: '#9C27B0', // Purple
  connect: '#2196F3', // Blue
  ssl: '#00BCD4', // Cyan
  request: '#4CAF50', // Green
  response: '#FF9800', // Orange
};

// Styled components
const DiagramContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.8)} 100%)`,
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(theme.palette.divider, 0.18)}`,
  borderRadius: theme.shape.borderRadius * 2,
}));

const WaterfallContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  marginTop: theme.spacing(2),
}));

const WaterfallBar = styled(Box, {
  shouldForwardProp: (prop) =>
    !['phaseColor', 'offset', 'width', 'animated'].includes(prop as string),
})<{
  phaseColor: string;
  offset: number;
  width: number;
  animated: boolean;
}>(({ theme, phaseColor, offset, width, animated }) => ({
  position: 'absolute',
  height: 32,
  left: `${offset}%`,
  width: `${width}%`,
  background: `linear-gradient(90deg, ${phaseColor} 0%, ${alpha(phaseColor, 0.8)} 100%)`,
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.getContrastText(phaseColor),
  fontSize: '0.75rem',
  fontWeight: 500,
  boxShadow: `0 2px 8px ${alpha(phaseColor, 0.3)}`,
  transition: animated ? 'all 0.5s ease' : 'none',
  animation: animated ? 'slideIn 0.5s ease' : 'none',
  '@keyframes slideIn': {
    from: {
      transform: 'translateX(-20px)',
      opacity: 0,
    },
    to: {
      transform: 'translateX(0)',
      opacity: 1,
    },
  },
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 4px 12px ${alpha(phaseColor, 0.5)}`,
    zIndex: 10,
  },
}));

const StackedBar = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'animated',
})<{ animated: boolean }>(({ theme, animated }) => ({
  display: 'flex',
  width: '100%',
  height: 40,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  boxShadow: theme.shadows[2],
  ...(animated && {
    '& > div': {
      animation: 'expandWidth 0.8s ease',
    },
    '@keyframes expandWidth': {
      from: { width: 0 },
      to: { width: '100%' },
    },
  }),
}));

const StackedSegment = styled(Box, {
  shouldForwardProp: (prop) => !['phaseColor', 'width'].includes(prop as string),
})<{ phaseColor: string; width: number }>(({ phaseColor, width }) => ({
  width: `${width}%`,
  background: `linear-gradient(135deg, ${phaseColor} 0%, ${alpha(phaseColor, 0.85)} 100%)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  fontSize: '0.7rem',
  fontWeight: 600,
  position: 'relative',
  transition: 'all 0.3s ease',
  '&:hover': {
    filter: 'brightness(1.1)',
    zIndex: 1,
  },
}));

const HorizontalBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

const HorizontalSegment = styled(Box, {
  shouldForwardProp: (prop) => !['phaseColor', 'width', 'animated'].includes(prop as string),
})<{
  phaseColor: string;
  width: number;
  animated: boolean;
}>(({ theme, phaseColor, animated }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  '& .label': {
    minWidth: 80,
    fontSize: '0.85rem',
    fontWeight: 500,
    color: theme.palette.text.secondary,
  },
  '& .bar': {
    flex: 1,
    height: 24,
    borderRadius: theme.shape.borderRadius,
    background: `linear-gradient(90deg, ${phaseColor} 0%, ${alpha(phaseColor, 0.7)} 100%)`,
    position: 'relative',
    overflow: 'hidden',
    boxShadow: `0 2px 6px ${alpha(phaseColor, 0.25)}`,
    ...(animated && {
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(90deg, transparent 0%, ${alpha('#fff', 0.3)} 50%, transparent 100%)`,
        animation: 'shimmer 2s infinite',
      },
      '@keyframes shimmer': {
        from: { transform: 'translateX(-100%)' },
        to: { transform: 'translateX(100%)' },
      },
    }),
  },
  '& .value': {
    minWidth: 60,
    textAlign: 'right',
    fontSize: '0.85rem',
    fontWeight: 600,
    color: phaseColor,
  },
}));

const TimelineAxis = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: theme.spacing(1),
  paddingTop: theme.spacing(1),
  borderTop: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
}));

const TimeLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.7rem',
  color: theme.palette.text.secondary,
  fontWeight: 500,
}));

const Legend = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
  paddingTop: theme.spacing(2),
  borderTop: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
}));

const LegendItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  '& .color': {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  '& .label': {
    fontSize: '0.8rem',
    color: theme.palette.text.secondary,
  },
}));

// Helper functions
const calculatePercentages = (data: TimingData): Record<string, number> => {
  const total = data.total || 1;
  return {
    dns: ((data.dns || 0) / total) * 100,
    connect: ((data.connect || 0) / total) * 100,
    ssl: ((data.ssl || 0) / total) * 100,
    request: ((data.request || 0) / total) * 100,
    response: ((data.response || 0) / total) * 100,
  };
};

const formatTime = (ms: number): string => {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
};

// Main component
export const TimingDiagram: FC<TimingDiagramProps> = ({
  data,
  showLabels = true,
  height = 40,
  animated = true,
  showTooltips = true,
  variant = 'waterfall',
}) => {
  const theme = useTheme();
  const percentages = useMemo(() => calculatePercentages(data), [data]);

  const phases = [
    { key: 'dns', label: 'DNS Lookup', value: data.dns },
    { key: 'connect', label: 'Connection', value: data.connect },
    { key: 'ssl', label: 'SSL/TLS', value: data.ssl },
    { key: 'request', label: 'Request', value: data.request },
    { key: 'response', label: 'Response', value: data.response },
  ].filter((phase) => phase.value !== undefined && phase.value > 0);

  const renderWaterfall = () => {
    let offset = 0;
    return (
      <WaterfallContainer style={{ height: height + 40 }} data-variant="waterfall">
        {phases.map((phase, index) => {
          const width = percentages[phase.key as keyof typeof percentages] ?? 0;
          const currentOffset = offset;
          offset += width;

          const bar = (
            <WaterfallBar
              key={phase.key}
              data-testid={`timing-segment-${phase.key}`}
              phaseColor={phaseColors[phase.key as keyof typeof phaseColors]}
              offset={currentOffset}
              width={width}
              animated={animated}
              data-animated={animated.toString()}
              style={{
                top: index * 8,
                width: `${width}%`,
                left: `${currentOffset}%`,
              }}
            >
              {showLabels && width > 10 && (
                <span data-testid="timing-label">{formatTime(phase.value!)}</span>
              )}
            </WaterfallBar>
          );

          return showTooltips ? (
            <Tooltip
              key={phase.key}
              title={`${phase.label}: ${formatTime(phase.value!)}`}
              placement="top"
              role="tooltip"
              aria-describedby={`tooltip-${phase.key}`}
            >
              {bar}
            </Tooltip>
          ) : (
            bar
          );
        })}
        <TimelineAxis style={{ marginTop: height }}>
          <TimeLabel>0ms</TimeLabel>
          <TimeLabel>{formatTime(data.total / 2)}</TimeLabel>
          <TimeLabel>{formatTime(data.total)}</TimeLabel>
        </TimelineAxis>
      </WaterfallContainer>
    );
  };

  const renderStacked = () => (
    <Box data-variant="stacked">
      <StackedBar animated={animated} data-animated={animated.toString()}>
        {phases.map((phase) => {
          const width = percentages[phase.key as keyof typeof percentages] ?? 0;
          const segment = (
            <StackedSegment
              key={phase.key}
              data-testid={`timing-segment-${phase.key}`}
              phaseColor={phaseColors[phase.key as keyof typeof phaseColors]}
              width={width}
              style={{ width: `${width}%` }}
            >
              {showLabels && (percentages[phase.key as keyof typeof percentages] ?? 0) > 10 && (
                <span data-testid="timing-label">{formatTime(phase.value!)}</span>
              )}
            </StackedSegment>
          );

          return showTooltips ? (
            <Tooltip
              key={phase.key}
              title={`${phase.label}: ${formatTime(phase.value!)}`}
              placement="top"
              role="tooltip"
              aria-describedby={`tooltip-${phase.key}`}
            >
              {segment}
            </Tooltip>
          ) : (
            segment
          );
        })}
      </StackedBar>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
        <Typography variant="caption" color="text.secondary">
          0ms
        </Typography>
        <Typography variant="caption" color="text.secondary" fontWeight="bold">
          Total: {formatTime(data.total)}
        </Typography>
      </Box>
    </Box>
  );

  const renderHorizontal = () => (
    <HorizontalBar data-variant="horizontal">
      {phases.map((phase) => (
        <HorizontalSegment
          key={phase.key}
          data-testid={`timing-segment-${phase.key}`}
          phaseColor={phaseColors[phase.key as keyof typeof phaseColors]}
          width={percentages[phase.key as keyof typeof percentages] ?? 0}
          animated={animated}
          data-animated={animated.toString()}
        >
          <Typography className="label">{phase.label}</Typography>
          <Box
            className="bar"
            style={{ width: `${percentages[phase.key as keyof typeof percentages]}%` }}
          />
          <Typography className="value" data-testid="timing-label">
            {formatTime(phase.value!)}
          </Typography>
        </HorizontalSegment>
      ))}
      <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${alpha(theme.palette.divider, 0.2)}` }}>
        <Typography variant="body2" fontWeight="bold" color="primary">
          Total Time: {formatTime(data.total)}
        </Typography>
      </Box>
    </HorizontalBar>
  );

  return (
    <DiagramContainer elevation={2} role="region" aria-label="Timing diagram" tabIndex={0}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Request Timing
      </Typography>

      {variant === 'waterfall' && renderWaterfall()}
      {variant === 'stacked' && renderStacked()}
      {variant === 'horizontal' && renderHorizontal()}

      {showLabels && (
        <Legend>
          {phases.map((phase) => (
            <LegendItem key={phase.key}>
              <Box
                className="color"
                sx={{ backgroundColor: phaseColors[phase.key as keyof typeof phaseColors] }}
              />
              <Typography className="label">{phase.label}</Typography>
            </LegendItem>
          ))}
        </Legend>
      )}
    </DiagramContainer>
  );
};

// Export default
export default TimingDiagram;
