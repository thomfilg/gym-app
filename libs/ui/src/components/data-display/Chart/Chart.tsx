import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import { alpha, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import type { ChartDataPoint, ChartProps, ChartSeries } from './Chart.types';

export const Chart: React.FC<ChartProps> = ({
  data,
  series,
  type = 'line',
  variant = 'default',
  size = 'md',
  color = 'primary',
  height,
  width = '100%',
  glow = false,
  pulse = false,
  glass = false,
  gradient = false,
  loading = false,
  disabled = false,
  className,
  style,
  title,
  subtitle,
  xAxisKey = 'name',
  yAxisLabel,
  xAxisLabel,
  showLegend = true,
  showTooltip = true,
  showCartesianGrid = true,
  animate = true,
  animationDuration = 1500,
  onClick,
  onFocus,
  onBlur,
  margin = { top: 20, right: 30, left: 20, bottom: 20 },
  colors,
  curved = true,
  stacked = false,
  showValues = false,
  responsive = true,
  innerRadius = 0,
  centerLabel,
  pieStroke,
  pieStrokeWidth,
  legendSeparator = false,
  yAxisDomain,
  'data-testid': dataTestId = 'chart',
}) => {
  const theme = useTheme();

  const getSizeStyles = () => {
    switch (size) {
      case 'xs':
        return { height: height || 200, fontSize: '0.75rem' };
      case 'sm':
        return { height: height || 300, fontSize: '0.875rem' };
      case 'md':
        return { height: height || 400, fontSize: '1rem' };
      case 'lg':
        return { height: height || 500, fontSize: '1.125rem' };
      case 'xl':
        return { height: height || 600, fontSize: '1.25rem' };
      default:
        return { height: height || 400, fontSize: '1rem' };
    }
  };

  const getDefaultColors = () => {
    if (colors) return colors;

    const defaultPalette = [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
      theme.palette.error.main,
      theme.palette.info.main,
    ];

    if (variant === 'neon') {
      return ['#00ffff', '#ff00ff', '#ffff00', '#00ff00', '#ff0080', '#8000ff'];
    }

    return defaultPalette;
  };

  const getVariantStyles = () => {
    const baseStyles = {
      borderRadius: theme.spacing(1),
      transition: theme.transitions.create(['all'], {
        duration: theme.transitions.duration.standard,
      }),
      opacity: disabled ? 0.5 : 1,
      pointerEvents: disabled ? ('none' as const) : ('auto' as const),
    };

    const glowStyles = glow
      ? {
        boxShadow: `0 0 30px ${alpha(theme.palette[color].main, 0.4)}`,
      }
      : {};

    const pulseStyles = pulse
      ? {
        animation: 'pulse 2s infinite',
        '@keyframes pulse': {
          '0%': { boxShadow: `0 0 0 0 ${alpha(theme.palette[color].main, 0.4)}` },
          '70%': { boxShadow: `0 0 0 20px ${alpha(theme.palette[color].main, 0)}` },
          '100%': { boxShadow: `0 0 0 0 ${alpha(theme.palette[color].main, 0)}` },
        },
      }
      : {};

    switch (variant) {
      case 'glass':
        return {
          ...baseStyles,
          ...glowStyles,
          ...pulseStyles,
          backgroundColor: alpha(theme.palette.background.paper, glass ? 0.1 : 0.9),
          backdropFilter: 'blur(20px)',
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        };

      case 'gradient':
        return {
          ...baseStyles,
          ...glowStyles,
          ...pulseStyles,
          background: gradient
            ? `linear-gradient(135deg, ${alpha(theme.palette[color].light, 0.05)}, ${alpha(theme.palette[color].dark, 0.05)})`
            : theme.palette.background.paper,
        };

      case 'elevated':
        return {
          ...baseStyles,
          ...glowStyles,
          ...pulseStyles,
          boxShadow: theme.shadows[4],
        };

      case 'minimal':
        return {
          ...baseStyles,
          ...glowStyles,
          ...pulseStyles,
          border: 'none',
          backgroundColor: 'transparent',
        };

      case 'neon':
        return {
          ...baseStyles,
          ...glowStyles,
          ...pulseStyles,
          backgroundColor: '#000',
          border: `1px solid ${alpha('#00ffff', 0.3)}`,
          '& .recharts-cartesian-grid-horizontal line, & .recharts-cartesian-grid-vertical line': {
            stroke: alpha('#00ffff', 0.1),
          },
        };

      default:
        return {
          ...baseStyles,
          ...glowStyles,
          ...pulseStyles,
          backgroundColor: theme.palette.background.paper,
        };
    }
  };

  const getDefaultSeries = (): ChartSeries[] => {
    if (series) return series;

    // Auto-detect series from data
    if (data.length === 0) return [];

    const keys = Object.keys(data[0] || {}).filter((key) => key !== xAxisKey);
    return keys.map((key, index) => ({
      dataKey: key,
      name: key,
      color: getDefaultColors()[index % getDefaultColors().length],
    }));
  };

  const renderChart = () => {
    const chartColors = getDefaultColors();
    const chartSeries = getDefaultSeries();
    const strokeType = curved ? 'monotone' : 'linear';

    const handleChartClick = (data: unknown) => {
      const chartData = data as { activePayload?: Array<{ payload: ChartDataPoint }> };
      if (onClick && chartData && chartData.activePayload && chartData.activePayload[0]) {
        onClick(chartData.activePayload[0].payload);
      }
    };

    const commonProps = {
      data,
      margin: { top: 20, right: 30, left: 20, bottom: 20, ...margin },
      onClick: handleChartClick,
    };

    const axisStyle = {
      fontSize: getSizeStyles().fontSize,
      fill: variant === 'neon' ? '#00ffff' : theme.palette.text.secondary,
    };

    const gridStyle = {
      stroke: variant === 'neon' ? alpha('#00ffff', 0.1) : theme.palette.divider,
      strokeDasharray: '3 3',
    };

    const legendWrapperStyle = legendSeparator
      ? {
        borderTop: `1px solid ${theme.palette.divider}`,
        paddingTop: 12,
        marginTop: 8,
      }
      : undefined;

    switch (type) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            {showCartesianGrid && <CartesianGrid strokeDasharray="3 3" stroke={gridStyle.stroke} />}
            <XAxis dataKey={xAxisKey} style={axisStyle} label={xAxisLabel} />
            <YAxis style={axisStyle} label={yAxisLabel} domain={yAxisDomain} />
            {showTooltip && <Tooltip />}
            {showLegend && <Legend wrapperStyle={legendWrapperStyle} />}
            {chartSeries.map((s, index) => (
              <Line
                key={s.dataKey}
                type={strokeType}
                dataKey={s.dataKey}
                name={s.name}
                stroke={s.color || chartColors[index % chartColors.length]}
                strokeWidth={s.strokeWidth || 2}
                dot={s.dot !== false}
                activeDot={s.activeDot !== false ? { r: 8 } : false}
                animationDuration={animate ? animationDuration : 0}
              />
            ))}
          </LineChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            {showCartesianGrid && <CartesianGrid strokeDasharray="3 3" stroke={gridStyle.stroke} />}
            <XAxis dataKey={xAxisKey} style={axisStyle} label={xAxisLabel} />
            <YAxis style={axisStyle} label={yAxisLabel} domain={yAxisDomain} />
            {showTooltip && <Tooltip />}
            {showLegend && <Legend wrapperStyle={legendWrapperStyle} />}
            {chartSeries.map((s, index) => (
              <Bar
                key={s.dataKey}
                dataKey={s.dataKey}
                name={s.name}
                fill={s.fill || s.color || chartColors[index % chartColors.length]}
                stackId={stacked ? 'stack' : undefined}
                animationDuration={animate ? animationDuration : 0}
              />
            ))}
          </BarChart>
        );

      case 'area':
        return (
          <AreaChart {...commonProps}>
            {showCartesianGrid && <CartesianGrid strokeDasharray="3 3" stroke={gridStyle.stroke} />}
            <XAxis dataKey={xAxisKey} style={axisStyle} label={xAxisLabel} />
            <YAxis style={axisStyle} label={yAxisLabel} domain={yAxisDomain} />
            {showTooltip && <Tooltip />}
            {showLegend && <Legend wrapperStyle={legendWrapperStyle} />}
            {chartSeries.map((s, index) => (
              <Area
                key={s.dataKey}
                type={strokeType}
                dataKey={s.dataKey}
                name={s.name}
                stroke={s.color || chartColors[index % chartColors.length]}
                fill={s.fill || s.color || chartColors[index % chartColors.length]}
                fillOpacity={s.fillOpacity || 0.6}
                stackId={stacked ? 'stack' : undefined}
                animationDuration={animate ? animationDuration : 0}
              />
            ))}
          </AreaChart>
        );

      case 'pie':
        return (
          <PieChart>
            {showTooltip && <Tooltip />}
            {showLegend && <Legend wrapperStyle={legendWrapperStyle} />}
            <Pie
              data={data}
              dataKey={chartSeries[0]?.dataKey || 'value'}
              nameKey={xAxisKey}
              cx="50%"
              cy="50%"
              outerRadius={getSizeStyles().height / 3}
              innerRadius={innerRadius}
              fill={chartColors[0]}
              label={showValues}
              animationDuration={animate ? animationDuration : 0}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={chartColors[index % chartColors.length]}
                  stroke={pieStroke}
                  strokeWidth={pieStrokeWidth}
                />
              ))}
            </Pie>
            {centerLabel && innerRadius > 0 && (
              <text
                x="50%"
                y="46%"
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                  fontSize: getSizeStyles().fontSize,
                  fill: variant === 'neon' ? '#00ffff' : theme.palette.text.primary,
                  fontWeight: 600,
                }}
              >
                {typeof centerLabel === 'string' ? (
                  centerLabel
                ) : (
                  <>
                    <tspan x="50%" dy="-0.6em" style={{ fontSize: '0.875em', fontWeight: 500, fill: theme.palette.text.secondary }}>
                      {centerLabel.label}
                    </tspan>
                    <tspan x="50%" dy="1.4em" style={{ fontSize: '1.5em', fontWeight: 700 }}>
                      {centerLabel.value}
                    </tspan>
                  </>
                )}
              </text>
            )}
          </PieChart>
        );

      case 'radar':
        return (
          <RadarChart {...commonProps}>
            <PolarGrid stroke={gridStyle.stroke} />
            <PolarAngleAxis dataKey={xAxisKey} style={axisStyle} />
            <PolarRadiusAxis style={axisStyle} />
            {showTooltip && <Tooltip />}
            {showLegend && <Legend wrapperStyle={legendWrapperStyle} />}
            {chartSeries.map((s, index) => (
              <Radar
                key={s.dataKey}
                dataKey={s.dataKey}
                name={s.name}
                stroke={s.color || chartColors[index % chartColors.length]}
                fill={s.fill || s.color || chartColors[index % chartColors.length]}
                fillOpacity={s.fillOpacity || 0.6}
                animationDuration={animate ? animationDuration : 0}
              />
            ))}
          </RadarChart>
        );

      case 'scatter':
        return (
          <ScatterChart {...commonProps}>
            {showCartesianGrid && <CartesianGrid strokeDasharray="3 3" stroke={gridStyle.stroke} />}
            <XAxis dataKey={xAxisKey} style={axisStyle} label={xAxisLabel} />
            <YAxis dataKey={chartSeries[0]?.dataKey} style={axisStyle} label={yAxisLabel} domain={yAxisDomain} />
            {showTooltip && <Tooltip />}
            {showLegend && <Legend wrapperStyle={legendWrapperStyle} />}
            <Scatter
              name={chartSeries[0]?.name || 'Data'}
              data={data}
              fill={chartColors[0]}
              animationDuration={animate ? animationDuration : 0}
            />
          </ScatterChart>
        );

      case 'composed':
        return (
          <ComposedChart {...commonProps}>
            {showCartesianGrid && <CartesianGrid strokeDasharray="3 3" stroke={gridStyle.stroke} />}
            <XAxis dataKey={xAxisKey} style={axisStyle} label={xAxisLabel} />
            <YAxis style={axisStyle} label={yAxisLabel} domain={yAxisDomain} />
            {showTooltip && <Tooltip />}
            {showLegend && <Legend wrapperStyle={legendWrapperStyle} />}
            {chartSeries.map((s, index) => {
              const chartColor = s.color || chartColors[index % chartColors.length];

              if (s.type === 'bar') {
                return (
                  <Bar
                    key={s.dataKey}
                    dataKey={s.dataKey}
                    name={s.name}
                    fill={chartColor}
                    animationDuration={animate ? animationDuration : 0}
                  />
                );
              } else if (s.type === 'area') {
                return (
                  <Area
                    key={s.dataKey}
                    type={strokeType}
                    dataKey={s.dataKey}
                    name={s.name}
                    stroke={chartColor}
                    fill={chartColor}
                    fillOpacity={0.6}
                    animationDuration={animate ? animationDuration : 0}
                  />
                );
              } else {
                return (
                  <Line
                    key={s.dataKey}
                    type={strokeType}
                    dataKey={s.dataKey}
                    name={s.name}
                    stroke={chartColor}
                    animationDuration={animate ? animationDuration : 0}
                  />
                );
              }
            })}
          </ComposedChart>
        );

      default:
        return <Box />;
    }
  };

  if (loading) {
    return (
      <Paper
        data-testid={`${dataTestId}-loading`}
        sx={{
          ...getVariantStyles(),
          ...getSizeStyles(),
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress color={color} data-testid={`${dataTestId}-loading-spinner`} />
      </Paper>
    );
  }

  const chartContent = responsive ? (
    <ResponsiveContainer width="100%" height={getSizeStyles().height} data-testid={`${dataTestId}-container`}>
      {renderChart() as React.ReactElement}
    </ResponsiveContainer>
  ) : (
    <Box sx={{ width, height: getSizeStyles().height }} data-testid={`${dataTestId}-container`}>{renderChart()}</Box>
  );

  return (
    <Paper
      data-testid={dataTestId}
      className={className}
      sx={{
        p: 2,
        ...getVariantStyles(),
        ...style,
      }}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {(title || subtitle) && (
        <Box sx={{ mb: 2 }} data-testid={`${dataTestId}-header`}>
          {title && (
            <Typography
              variant="h6"
              data-testid={`${dataTestId}-title`}
              sx={{
                color: variant === 'neon' ? '#00ffff' : 'text.primary',
                fontWeight: 600,
              }}
            >
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography
              variant="body2"
              data-testid={`${dataTestId}-subtitle`}
              sx={{
                color: variant === 'neon' ? alpha('#00ffff', 0.7) : 'text.secondary',
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      )}

      {chartContent}
    </Paper>
  );
};
