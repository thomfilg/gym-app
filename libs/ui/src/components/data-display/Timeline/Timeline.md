# Timeline Component

A flexible and animated timeline component for displaying chronological events and milestones.

## Features

- **Multiple Variants**: Default, compact, and detailed display modes
- **Orientation Support**: Vertical and horizontal timeline layouts
- **Interactive Elements**: Expandable items with metadata and actions
- **Animation Support**: Slide-in animations and pulsing indicators
- **Customizable**: Custom icons, colors, and styling options
- **Responsive**: Adapts to different screen sizes
- **Accessible**: Full keyboard navigation and screen reader support

## Usage

```tsx
import { Timeline } from '@/components/enhanced/Timeline';

const items = [
  {
    id: '1',
    title: 'Project Started',
    description: 'Initial project setup and planning phase',
    timestamp: '2 hours ago',
    icon: <StartIcon />,
    color: '#4CAF50',
    metadata: { status: 'completed', duration: '1 week' },
    action: { label: 'View Details', onClick: () => {} },
  },
  {
    id: '2',
    title: 'Development Phase',
    description: 'Core functionality implementation',
    timestamp: '1 hour ago',
    color: '#2196F3',
  },
];

<Timeline
  items={items}
  variant="default"
  orientation="vertical"
  animated={true}
  showConnector={true}
  onItemClick={(item) => console.log(item)}
/>;
```

## Props

### TimelineProps

| Prop          | Type                                   | Default      | Description                              |
| ------------- | -------------------------------------- | ------------ | ---------------------------------------- |
| items         | `TimelineItem[]`                       | -            | Array of timeline items to display       |
| variant       | `'default' \| 'compact' \| 'detailed'` | `'default'`  | Display variant                          |
| orientation   | `'vertical' \| 'horizontal'`           | `'vertical'` | Timeline orientation                     |
| showConnector | `boolean`                              | `true`       | Show connecting lines between items      |
| animated      | `boolean`                              | `true`       | Enable slide-in animations               |
| alternating   | `boolean`                              | `false`      | Alternate item positions (vertical only) |
| onItemClick   | `(item: TimelineItem) => void`         | -            | Callback when item is clicked            |

### TimelineItem

| Prop        | Type                                   | Required | Description                       |
| ----------- | -------------------------------------- | -------- | --------------------------------- |
| id          | `string`                               | ✓        | Unique identifier for the item    |
| title       | `string`                               | ✓        | Main title text                   |
| description | `string`                               | -        | Detailed description              |
| timestamp   | `string`                               | ✓        | Time/date display text            |
| icon        | `React.ReactNode`                      | -        | Custom icon component             |
| color       | `string`                               | -        | Custom color for the timeline dot |
| action      | `{label: string, onClick: () => void}` | -        | Action button configuration       |
| expanded    | `boolean`                              | -        | Initial expanded state            |
| metadata    | `Record<string, string>`               | -        | Key-value metadata pairs          |

## Variants

### Default

Standard timeline with expandable items and full feature set.

### Compact

Minimal design with condensed spacing and always-visible descriptions.

### Detailed

Expanded view with all details visible by default.

## Accessibility

- Full keyboard navigation support
- Screen reader compatible with proper ARIA attributes
- Focus management for interactive elements
- Semantic HTML structure

## Examples

### Basic Timeline

```tsx
<Timeline items={basicItems} />
```

### Horizontal Timeline

```tsx
<Timeline items={items} orientation="horizontal" variant="compact" />
```

### Alternating Timeline

```tsx
<Timeline items={items} alternating={true} animated={true} />
```

## Testing

### Test IDs

The Timeline component includes `data-testid` attributes for reliable testing:

| Test ID | Element | Description |
|---------|---------|-------------|
| `timeline-container` | Main container | Root Box element wrapping all timeline items |
| `timeline-item-container` | Item wrapper | Container for each timeline item (one per item) |
| `timeline-dot` | Timeline dot | Circular dot/icon container for each item |
| `item-icon` | Custom icon | Box wrapper around custom icon (when provided) |
| `item-icon-default` | Default icon | Default Circle icon (when no custom icon) |
| `timeline-connector` | Connector line | Line connecting dots between items |
| `timeline-card` | Content card | Card containing item title, description, metadata |
| `timeline-timestamp` | Timestamp | Timestamp display element |

### Testing Best Practices

**Wait for Timeline to Render:**
```typescript
// Use async queries to wait for elements
const container = await canvas.findByTestId('timeline-container');
expect(container).toBeInTheDocument();

// Wait for all items
await waitFor(async () => {
  const items = await canvas.findAllByTestId('timeline-item-container');
  expect(items).toHaveLength(expectedCount);
}, { timeout: 3000 });
```

**Test Icon Rendering:**
```typescript
const dots = await canvas.findAllByTestId('timeline-dot');

for (const dot of dots) {
  // Check for either custom or default icon
  const icon = await within(dot).findByTestId(/item-icon/);
  expect(icon).toBeInTheDocument();
}
```

**Test Interactions:**
```typescript
// Click timeline card
const cards = await canvas.findAllByRole('article');
await userEvent.click(cards[0]);
expect(onItemClick).toHaveBeenCalledWith(expectedItem);

// Expand/collapse items
const expandButtons = canvasElement.querySelectorAll('button');
const expandBtn = Array.from(expandButtons).find(
  btn => btn.querySelector('svg[data-testid="ExpandMoreIcon"]')
);
await userEvent.click(expandBtn);

await waitFor(() => {
  const description = canvas.getByText(expectedDescription);
  expect(description).toBeVisible();
}, { timeout: 3000 });
```

**Test Animations:**
```typescript
// When animated=true, items have slide-in animation
const items = await canvas.findAllByTestId('timeline-item-container');
for (const item of items) {
  const style = window.getComputedStyle(item);
  expect(style.animation).not.toBe('none');
}
```

### Common Test Scenarios

1. **Basic Rendering** - Verify container and all items render
2. **Icon Display** - Check custom icons vs default icons
3. **Orientation** - Test vertical vs horizontal layouts
4. **Variants** - Test default, compact, and detailed variants
5. **Interactions** - Test click handlers and expand/collapse
6. **Animations** - Verify animations when enabled
7. **Responsive** - Test mobile/tablet viewports
8. **Accessibility** - Verify ARIA attributes and keyboard navigation
