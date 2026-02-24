# Chart Component

A comprehensive charting component built on Recharts, providing multiple chart types with extensive customization options and visual effects.

## Usage

```tsx
import { Chart } from '@procurement/ui';

// Basic line chart
<Chart
  data={data}
  series={[{ dataKey: 'value', name: 'Sales' }]}
  type="line"
/>

// Bar chart with multiple series
<Chart
  data={data}
  series={[
    { dataKey: 'sales', name: 'Sales', color: '#8884d8' },
    { dataKey: 'revenue', name: 'Revenue', color: '#82ca9d' }
  ]}
  type="bar"
  showLegend
/>

// Pie chart
<Chart
  data={pieData}
  series={[{ dataKey: 'value', name: 'Market Share' }]}
  type="pie"
  showTooltip
/>
```

## Props

### Required Props

- `data` (array): The data array to visualize
- `series` (ChartSeries[]): Configuration for data series

### Chart Configuration

- `type` ('line' | 'bar' | 'area' | 'pie' | 'radar' | 'scatter' | 'composed'): Chart type
- `variant` ('default' | 'glass' | 'gradient' | 'elevated' | 'minimal' | 'neon'): Visual style variant
- `size` ('xs' | 'sm' | 'md' | 'lg' | 'xl'): Predefined size presets
- `color` ('primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'): Color theme
- `height` (number): Custom height in pixels
- `width` (string | number): Chart width (default: '100%')

### Visual Effects

- `glow` (boolean): Enable glow effect
- `pulse` (boolean): Enable pulsing animation
- `glass` (boolean): Enable glass morphism effect
- `gradient` (boolean): Enable gradient backgrounds
- `animate` (boolean): Enable animations (default: true)
- `animationDuration` (number): Animation duration in ms (default: 1500)

### Data Configuration

- `xAxisKey` (string): Key for X-axis data (default: 'name')
- `yAxisLabel` (string): Y-axis label text
- `xAxisLabel` (string): X-axis label text
- `curved` (boolean): Use curved lines for line/area charts (default: true)
- `stacked` (boolean): Stack data series for bar/area charts
- `showValues` (boolean): Display data values on chart

### Display Options

- `title` (string): Chart title
- `subtitle` (string): Chart subtitle
- `showLegend` (boolean): Show chart legend (default: true)
- `showTooltip` (boolean): Show hover tooltips (default: true)
- `showCartesianGrid` (boolean): Show grid lines (default: true)
- `margin` (object): Chart margins configuration
- `colors` (string[]): Custom color palette
- `responsive` (boolean): Enable responsive behavior (default: true)

### States

- `loading` (boolean): Show loading state
- `disabled` (boolean): Disable chart interactions

### Event Handlers

- `onClick` (function): Click event handler
- `onFocus` (function): Focus event handler
- `onBlur` (function): Blur event handler

## Chart Types

### Line Chart
Best for showing trends over time or continuous data.

### Bar Chart
Ideal for comparing discrete categories or showing distributions.

### Area Chart
Similar to line charts but emphasizes volume/magnitude.

### Pie Chart
Perfect for showing parts of a whole or percentages.

### Radar Chart
Useful for multivariate comparisons across multiple axes.

### Scatter Chart
Great for showing correlations between two variables.

### Composed Chart
Combines multiple chart types in a single visualization.

## Accessibility

- Keyboard navigation support
- Screen reader compatible with proper ARIA attributes
- High contrast mode support
- Focus indicators for interactive elements
- Descriptive tooltips and labels

## Best Practices

1. **Choose the Right Chart Type**: Select chart type based on data characteristics and insights needed
2. **Keep It Simple**: Avoid cluttering with too many data series or visual effects
3. **Use Consistent Colors**: Maintain color consistency across related charts
4. **Provide Context**: Always include titles, labels, and legends where appropriate
5. **Responsive Design**: Ensure charts adapt well to different screen sizes
6. **Loading States**: Show loading indicators for async data
7. **Error Handling**: Provide fallback UI for invalid or missing data

## Examples

### Sales Dashboard
```tsx
<Chart
  data={salesData}
  series={[
    { dataKey: 'revenue', name: 'Revenue', color: 'primary' },
    { dataKey: 'profit', name: 'Profit', color: 'success' }
  ]}
  type="composed"
  variant="glass"
  title="Monthly Sales Performance"
  showLegend
  showTooltip
  animate
/>
```

### Market Share Pie
```tsx
<Chart
  data={marketData}
  series={[{ dataKey: 'share', name: 'Market Share' }]}
  type="pie"
  variant="gradient"
  size="lg"
  showTooltip
  colors={['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c']}
/>
```

### Performance Metrics
```tsx
<Chart
  data={performanceData}
  series={[
    { dataKey: 'cpu', name: 'CPU Usage' },
    { dataKey: 'memory', name: 'Memory' },
    { dataKey: 'disk', name: 'Disk I/O' }
  ]}
  type="radar"
  variant="neon"
  glass
  glow
/>
```

## Testing

### Test IDs

The Chart component includes `data-testid` attributes for reliable testing:

| Test ID | Element | Description |
|---------|---------|-------------|
| `chart` or `{dataTestId}` | Main container | Root Paper element wrapping the entire chart |
| `{dataTestId}-loading` | Loading container | Paper element shown during loading state |
| `{dataTestId}-loading-spinner` | Loading spinner | CircularProgress component shown during loading |
| `{dataTestId}-container` | Chart container | ResponsiveContainer or Box wrapping the chart visualization |
| `{dataTestId}-header` | Header section | Box containing title and subtitle (when provided) |
| `{dataTestId}-title` | Chart title | Typography element for chart title |
| `{dataTestId}-subtitle` | Chart subtitle | Typography element for chart subtitle |

### Recharts Internal Elements

Recharts components render their own DOM elements with specific class names. Use these selectors for testing:

| Element | Class Selector | Description |
|---------|---------------|-------------|
| Legend | `.recharts-legend-wrapper` | Chart legend container |
| Tooltip | `.recharts-tooltip-wrapper` | Chart tooltip container (visible on hover) |
| Cartesian Grid | `.recharts-cartesian-grid` | Grid lines (when showCartesianGrid=true) |
| X-Axis | `.recharts-xAxis` | X-axis component |
| Y-Axis | `.recharts-yAxis` | Y-axis component |
| Line | `.recharts-line` | Line chart elements |
| Bar | `.recharts-bar` | Bar chart elements |
| Area | `.recharts-area` | Area chart elements |
| Pie | `.recharts-pie` | Pie chart elements |

### Testing Best Practices

**Wait for Chart to Render:**
```typescript
// Use async queries to wait for elements
const chart = await canvas.findByTestId('chart');
expect(chart).toBeInTheDocument();

// Wait for chart container
await waitFor(async () => {
  const container = await canvas.findByTestId('chart-container');
  expect(container).toBeInTheDocument();
}, { timeout: 3000 });
```

**Test Loading State:**
```typescript
// Verify loading spinner is displayed
const loading = await canvas.findByTestId('chart-loading');
expect(loading).toBeInTheDocument();

const spinner = await canvas.findByTestId('chart-loading-spinner');
expect(spinner).toBeInTheDocument();

// Wait for chart to load
await waitFor(async () => {
  expect(canvas.queryByTestId('chart-loading')).not.toBeInTheDocument();
  const chart = await canvas.findByTestId('chart');
  expect(chart).toBeInTheDocument();
}, { timeout: 5000 });
```

**Test Chart Title and Subtitle:**
```typescript
// Verify header elements
const header = await canvas.findByTestId('chart-header');
expect(header).toBeInTheDocument();

const title = await canvas.findByTestId('chart-title');
expect(title).toHaveTextContent('Expected Title');

const subtitle = await canvas.findByTestId('chart-subtitle');
expect(subtitle).toHaveTextContent('Expected Subtitle');
```

**Test Chart Interactions:**
```typescript
// Click on chart
const chart = await canvas.findByTestId('chart');
await userEvent.click(chart);
expect(onClick).toHaveBeenCalled();

// Focus and blur events
await userEvent.tab(); // Focus on chart
expect(onFocus).toHaveBeenCalled();

await userEvent.tab(); // Focus away
expect(onBlur).toHaveBeenCalled();
```

**Test Chart Variants:**
```typescript
// Test different variants
const chart = await canvas.findByTestId('chart');
const style = window.getComputedStyle(chart);

// Glass variant
expect(style.backdropFilter).toBe('blur(20px)');

// Neon variant
expect(style.backgroundColor).toBe('rgb(0, 0, 0)');

// Gradient variant
expect(style.background).toContain('linear-gradient');
```

**Test Custom Test IDs:**
```typescript
// Using custom data-testid
<Chart data={data} series={series} data-testid="sales-chart" />

const salesChart = await canvas.findByTestId('sales-chart');
const container = await canvas.findByTestId('sales-chart-container');
const title = await canvas.findByTestId('sales-chart-title');
```

**Test Recharts Internal Elements:**
```typescript
// Test legend rendering
const chart = await canvas.findByTestId('chart');
const legend = chart.querySelector('.recharts-legend-wrapper');
expect(legend).toBeInTheDocument();

// Test tooltip on hover (requires user interaction)
const chartContainer = await canvas.findByTestId('chart-container');
await userEvent.hover(chartContainer);

await waitFor(() => {
  const tooltip = chart.querySelector('.recharts-tooltip-wrapper');
  expect(tooltip).toBeInTheDocument();
});

// Test grid lines
const grid = chart.querySelector('.recharts-cartesian-grid');
expect(grid).toBeInTheDocument();

// Test axes
const xAxis = chart.querySelector('.recharts-xAxis');
const yAxis = chart.querySelector('.recharts-yAxis');
expect(xAxis).toBeInTheDocument();
expect(yAxis).toBeInTheDocument();

// Test specific chart type elements
const lines = chart.querySelectorAll('.recharts-line');
expect(lines).toHaveLength(expectedSeriesCount);
```

### Common Test Scenarios

1. **Basic Rendering** - Verify chart and container render correctly
2. **Loading State** - Test loading spinner and transition to loaded state
3. **Chart Types** - Test different chart types (line, bar, area, pie, radar, scatter, composed)
4. **Variants** - Test visual variants (default, glass, gradient, elevated, minimal, neon)
5. **Responsive Behavior** - Test responsive vs fixed-width charts
6. **Interactions** - Test click, focus, and blur handlers
7. **Visual Effects** - Test glow, pulse, glass, and gradient effects
8. **Data Visualization** - Verify correct rendering of series, legends, tooltips, and grids
9. **Disabled State** - Test disabled chart interactions
10. **Title/Subtitle** - Test header elements display correctly
11. **Accessibility** - Verify focus states and keyboard navigation
12. **Legend Display** - Verify legend renders with showLegend prop using `.recharts-legend-wrapper`
13. **Tooltip Display** - Test tooltip appears on hover using `.recharts-tooltip-wrapper`
14. **Grid Lines** - Verify cartesian grid renders with showCartesianGrid prop
15. **Axes Rendering** - Test X and Y axes render with correct labels
16. **Multiple Series** - Test multiple data series render correctly
17. **Custom Colors** - Verify custom color palette is applied to chart elements
18. **Animation** - Test animation behavior with animate and animationDuration props
19. **Stacked Charts** - Verify stacked bar/area charts with stacked prop
20. **Curved vs Linear** - Test curved vs linear line rendering with curved prop