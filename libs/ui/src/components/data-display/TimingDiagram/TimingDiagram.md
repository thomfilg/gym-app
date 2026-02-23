# TimingDiagram Component

## Overview

The TimingDiagram component is a sophisticated network timing visualization tool that displays HTTP request phases and performance metrics. It provides three different layout variants (waterfall, stacked, horizontal) to visualize DNS lookup, connection establishment, SSL/TLS negotiation, request sending, and response receiving phases.

## Purpose and Use Cases

- **Performance Monitoring**: Visualize network request timing breakdowns to identify bottlenecks
- **API Analytics**: Display detailed timing information for API calls
- **Network Debugging**: Understand where delays occur in the request/response cycle
- **Performance Comparison**: Compare timing data across different requests or endpoints
- **User Experience Analysis**: Show loading time breakdowns for critical resources

## Props

| Prop           | Type                                       | Default       | Description                                                                                        |
| -------------- | ------------------------------------------ | ------------- | -------------------------------------------------------------------------------------------------- |
| `data`         | `TimingData`                               | Required      | Object containing timing measurements for each phase (dns, connect, ssl, request, response, total) |
| `variant`      | `'waterfall' \| 'stacked' \| 'horizontal'` | `'waterfall'` | Display layout variant                                                                             |
| `showLabels`   | `boolean`                                  | `true`        | Show timing labels on segments                                                                     |
| `showTooltips` | `boolean`                                  | `true`        | Enable hover tooltips with detailed timing information                                             |
| `animated`     | `boolean`                                  | `true`        | Enable smooth animations for segment rendering                                                     |
| `height`       | `number`                                   | `40`          | Diagram height in pixels (for waterfall and stacked variants)                                      |

## TimingData Interface

```typescript
interface TimingData {
  dns?: number; // DNS lookup time in milliseconds
  connect?: number; // Connection establishment time
  ssl?: number; // SSL/TLS negotiation time
  request?: number; // Request sending time
  response?: number; // Response receiving time
  total: number; // Total request time
}
```

## Usage Examples

### Basic Usage

```tsx
import { TimingDiagram } from '@procurement/ui';

const timingData = {
  dns: 45,
  connect: 120,
  ssl: 180,
  request: 25,
  response: 380,
  total: 750,
};

<TimingDiagram data={timingData} />;
```

### Different Variants

```tsx
// Waterfall layout - shows phases cascading
<TimingDiagram
  data={timingData}
  variant="waterfall"
/>

// Stacked layout - shows phases in a single bar
<TimingDiagram
  data={timingData}
  variant="stacked"
/>

// Horizontal layout - shows phases as separate rows
<TimingDiagram
  data={timingData}
  variant="horizontal"
/>
```

### Minimal Data

```tsx
// Component handles missing phases gracefully
const minimalData = {
  request: 50,
  response: 150,
  total: 200,
};

<TimingDiagram data={minimalData} />;
```

### Performance Comparison

```tsx
const requests = [
  { name: 'API A', data: fastData },
  { name: 'API B', data: normalData },
  { name: 'API C', data: slowData },
];

{
  requests.map((req) => (
    <div key={req.name}>
      <h3>{req.name}</h3>
      <TimingDiagram data={req.data} variant="stacked" />
    </div>
  ));
}
```

## Accessibility

- **ARIA Labels**: Component includes proper `role="region"` and `aria-label` attributes
- **Tooltips**: All timing segments have accessible tooltips with `role="tooltip"`
- **Color Contrast**: Phase colors are chosen for optimal contrast and readability
- **Keyboard Navigation**: Tooltips are keyboard accessible
- **Screen Reader Support**: All timing values are announced properly

## Best Practices

1. **Choose the Right Variant**:
   - Use `waterfall` for detailed phase visualization
   - Use `stacked` for compact space-efficient display
   - Use `horizontal` for comparing multiple metrics side-by-side

2. **Data Completeness**:
   - Provide as many timing phases as available for comprehensive visualization
   - The component gracefully handles missing phases

3. **Performance Considerations**:
   - Enable animations for better user experience
   - Disable animations when displaying many diagrams simultaneously

4. **Responsive Design**:
   - The component adapts to container width
   - Consider using smaller heights on mobile devices

5. **Tooltips and Labels**:
   - Keep tooltips enabled for detailed information
   - Disable labels for very small diagrams to avoid clutter

## Visual Design

- **Glass Morphism**: Subtle glass effect with backdrop blur
- **Gradient Fills**: Each phase has a gradient for visual depth
- **Smooth Animations**: Segments animate in sequence when rendered
- **Color Coding**: Consistent colors across all variants:
  - Purple: DNS lookup
  - Blue: Connection
  - Cyan: SSL/TLS
  - Green: Request
  - Orange: Response

## Theme Integration

The component integrates with MUI theme system:

- Respects theme colors for text and backgrounds
- Adapts to light/dark mode automatically
- Uses theme spacing and typography scales
- Follows theme border radius conventions
