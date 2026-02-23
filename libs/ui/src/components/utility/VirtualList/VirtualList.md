# VirtualList Component

High-performance virtual scrolling components for rendering large datasets with fixed and variable height support. Only renders visible items for optimal performance with thousands of items.

## Features

- Fixed and variable height item support
- Grid layout variant
- Handles 100,000+ items efficiently
- Configurable overscan for smoother scrolling
- Scroll event callbacks
- Responsive design
- Full accessibility support
- TypeScript support

## Basic Usage

```tsx
import { VirtualList } from '@gym-app/ui';

function MyComponent() {
  const items = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    data: { name: `Item ${i + 1}` }
  }));

  return (
    <VirtualList
      items={items}
      variant="fixed"
      height={400}
      itemHeight={60}
      renderItem={({ item, style }) => (
        <div style={style}>
          {item.data.name}
        </div>
      )}
    />
  );
}
```

## Props

### VirtualList Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `VirtualListItem[]` | - | Array of items to render |
| `variant` | `'fixed' \| 'variable'` | `'fixed'` | Height variant for items |
| `height` | `number` | - | Container height in pixels (required) |
| `width` | `number \| string` | `'100%'` | Container width |
| `itemHeight` | `number` | `40` | Height for fixed variant items |
| `estimatedItemHeight` | `number` | `40` | Estimated height for variable variant |
| `overscan` | `number` | `5` | Number of items to render outside visible area |
| `renderItem` | `function` | - | Function to render each item (required) |
| `onScroll` | `(scrollTop: number) => void` | - | Scroll event callback |
| `className` | `string` | - | CSS class name |
| `style` | `CSSProperties` | - | Inline styles |
| `data-testid` | `string` | - | Test ID for testing |
| `aria-label` | `string` | - | Accessibility label |

### VirtualGrid Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `VirtualListItem[]` | - | Array of items to render |
| `height` | `number` | - | Container height in pixels (required) |
| `width` | `number \| string` | `'100%'` | Container width |
| `columnCount` | `number` | - | Number of columns (required) |
| `rowHeight` | `number` | - | Height of each row (required) |
| `columnWidth` | `number` | - | Width of each column (auto-calculated if not provided) |
| `gap` | `number` | `0` | Gap between items in pixels |
| `overscan` | `number` | `5` | Number of rows to render outside visible area |
| `renderItem` | `function` | - | Function to render each item (required) |
| `onScroll` | `(scrollTop: number, scrollLeft: number) => void` | - | Scroll event callback |
| `className` | `string` | - | CSS class name |
| `style` | `CSSProperties` | - | Inline styles |
| `data-testid` | `string` | - | Test ID for testing |
| `aria-label` | `string` | - | Accessibility label |

### VirtualListItem Type

```tsx
interface VirtualListItem {
  id: string | number;
  height?: number; // For variable height items
  data?: unknown; // Your custom data
}
```

## Variants

### Fixed Height List

Best for lists where all items have the same height. Provides the best performance.

```tsx
<VirtualList
  items={items}
  variant="fixed"
  height={400}
  itemHeight={80}
  renderItem={({ item, style }) => (
    <div style={style}>
      <h3>{item.data.name}</h3>
      <p>{item.data.description}</p>
    </div>
  )}
/>
```

### Variable Height List

For lists where items have different heights. Slightly slower than fixed but still performant.

```tsx
const items = [
  { id: 1, height: 60, data: { name: 'Short item' } },
  { id: 2, height: 120, data: { name: 'Tall item' } },
  { id: 3, height: 80, data: { name: 'Medium item' } },
];

<VirtualList
  items={items}
  variant="variable"
  height={400}
  estimatedItemHeight={80}
  renderItem={({ item, style }) => (
    <div style={style}>
      {item.data.name}
    </div>
  )}
/>
```

### Grid Layout

For displaying items in a multi-column grid layout.

```tsx
<VirtualGrid
  items={items}
  height={400}
  width={600}
  columnCount={3}
  rowHeight={150}
  gap={8}
  renderItem={({ item, style }) => (
    <div style={style}>
      <img src={item.data.image} alt={item.data.name} />
      <p>{item.data.name}</p>
    </div>
  )}
/>
```

## Examples

### With Material-UI Components

```tsx
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { VirtualList } from '@gym-app/ui';

<VirtualList
  items={items}
  variant="fixed"
  height={400}
  itemHeight={80}
  renderItem={({ item, style }) => (
    <Box key={item.id} style={style}>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={item.data.avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={item.data.name}
          secondary={item.data.description}
        />
      </ListItem>
    </Box>
  )}
/>
```

### With Scroll Callback

```tsx
const [scrollPosition, setScrollPosition] = useState(0);

<VirtualList
  items={items}
  variant="fixed"
  height={400}
  itemHeight={60}
  onScroll={(scrollTop) => {
    setScrollPosition(scrollTop);
    console.log('Scrolled to:', scrollTop);
  }}
  renderItem={({ item, style }) => (
    <div style={style}>{item.data.name}</div>
  )}
/>
```

### Large Dataset (100,000 items)

```tsx
const items = Array.from({ length: 100000 }, (_, i) => ({
  id: i,
  data: { name: `Item ${i + 1}` }
}));

<VirtualList
  items={items}
  variant="fixed"
  height={500}
  itemHeight={60}
  overscan={10}
  renderItem={({ item, style }) => (
    <div style={style}>
      {item.data.name}
    </div>
  )}
/>
```

### Responsive Grid

```tsx
<VirtualGrid
  items={items}
  height={400}
  width="100%"
  columnCount={4}
  rowHeight={120}
  gap={4}
  renderItem={({ item, style, columnIndex, rowIndex }) => (
    <Box
      key={item.id}
      style={style}
      sx={{
        p: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
      }}
    >
      <Typography>Row {rowIndex}, Col {columnIndex}</Typography>
      <Typography variant="body2">{item.data.name}</Typography>
    </Box>
  )}
/>
```

### Custom Styling with Hover Effects

```tsx
<VirtualList
  items={items}
  variant="fixed"
  height={400}
  itemHeight={70}
  renderItem={({ item, style }) => (
    <Box
      key={item.id}
      style={style}
      sx={{
        p: 2,
        cursor: 'pointer',
        transition: 'all 0.2s',
        '&:hover': {
          bgcolor: 'primary.light',
          transform: 'translateX(8px)',
        },
      }}
    >
      {item.data.name}
    </Box>
  )}
/>
```

## Testing

The VirtualList component includes the `data-testid` prop for testing purposes.

### Test ID Structure

```tsx
<VirtualList
  data-testid="user-list"
  items={items}
  variant="fixed"
  height={400}
  itemHeight={60}
  renderItem={({ item, style }) => (
    <div style={style} data-testid={`user-item-${item.id}`}>
      {item.data.name}
    </div>
  )}
/>
```

### Testing Example

```tsx
import { render, screen } from '@testing-library/react';
import { VirtualList } from './VirtualList';

test('renders virtual list with items', () => {
  const items = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    data: { name: `Item ${i}` }
  }));

  render(
    <VirtualList
      data-testid="test-list"
      items={items}
      variant="fixed"
      height={400}
      itemHeight={60}
      renderItem={({ item, style }) => (
        <div style={style} data-testid={`item-${item.id}`}>
          {item.data.name}
        </div>
      )}
    />
  );

  const list = screen.getByTestId('test-list');
  expect(list).toBeInTheDocument();
  expect(list).toHaveAttribute('role', 'list');
});

test('only renders visible items', () => {
  const items = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    data: { name: `Item ${i}` }
  }));

  render(
    <VirtualList
      items={items}
      variant="fixed"
      height={300}
      itemHeight={50}
      renderItem={({ item, style }) => (
        <div style={style} data-testid={`item-${item.id}`}>
          {item.data.name}
        </div>
      )}
    />
  );

  // Only visible items should be rendered
  // With height=300 and itemHeight=50, approximately 6-16 items visible (with overscan)
  const renderedItems = screen.queryAllByTestId(/^item-/);
  expect(renderedItems.length).toBeLessThan(30);
  expect(renderedItems.length).toBeGreaterThan(0);
});
```

### Testing Best Practices

1. **Visibility Testing**: Verify only visible items are rendered
2. **Scroll Testing**: Test scroll events and position updates
3. **Performance Testing**: Verify no lag with large datasets
4. **Accessibility Testing**: Check ARIA attributes and keyboard navigation
5. **Edge Cases**: Test empty lists, single items, and extreme scrolling

## Accessibility

The component includes built-in accessibility features:

```tsx
<VirtualList
  items={items}
  variant="fixed"
  height={400}
  itemHeight={60}
  aria-label="User list"
  renderItem={({ item, style, index }) => (
    <div
      style={style}
      role="listitem"
      aria-posinset={index + 1}
      aria-setsize={items.length}
    >
      {item.data.name}
    </div>
  )}
/>
```

### Accessibility Features

- Container has `role="list"` (VirtualList) or `role="grid"` (VirtualGrid)
- Supports `aria-label` for screen readers
- Items should include `role="listitem"` or `role="gridcell"`
- Keyboard navigation works with native scroll

## Performance Considerations

### Optimization Tips

1. **Use Fixed Height When Possible**: Fixed height variant is faster
2. **Optimize Render Function**: Keep `renderItem` function simple and memoized
3. **Adjust Overscan**: Higher overscan = smoother scroll but more items rendered
4. **Memoize Items**: Use `useMemo` for item array if it changes frequently
5. **Avoid Inline Styles**: Define styles outside render function when possible

### Performance Metrics

- **10,000 items**: Renders ~60fps with smooth scrolling
- **100,000 items**: Handles efficiently with fixed height variant
- **Memory**: Only visible items + overscan kept in DOM
- **Initial Render**: < 100ms for first paint

### Example: Optimized Component

```tsx
const MemoizedItem = memo(({ item, style }) => (
  <Box style={style}>
    <Typography>{item.data.name}</Typography>
  </Box>
));

function OptimizedList() {
  const items = useMemo(
    () => Array.from({ length: 50000 }, (_, i) => ({
      id: i,
      data: { name: `Item ${i}` }
    })),
    []
  );

  const renderItem = useCallback(
    ({ item, style }) => <MemoizedItem item={item} style={style} />,
    []
  );

  return (
    <VirtualList
      items={items}
      variant="fixed"
      height={500}
      itemHeight={60}
      renderItem={renderItem}
    />
  );
}
```

## Common Use Cases

1. **User Lists**: Display thousands of users with avatars and details
2. **Chat Messages**: Infinite scroll chat with variable message heights
3. **Product Catalogs**: Grid layout for e-commerce product listings
4. **Log Viewers**: Display large log files efficiently
5. **Data Tables**: Alternative to traditional tables for large datasets
6. **File Explorers**: Virtual file/folder tree views
7. **Feed/Timeline**: Social media style feeds with many posts
8. **Search Results**: Display large search result sets

## Browser Compatibility

Works with all modern browsers supporting:
- CSS Flexbox
- CSS Position: absolute
- JavaScript scrolling events
- Modern DOM APIs

Tested and supported:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Migration from react-window

If migrating from `react-window`, here's a comparison:

```tsx
// react-window
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={400}
  itemCount={1000}
  itemSize={60}
  width={300}
>
  {({ index, style }) => (
    <div style={style}>Item {index}</div>
  )}
</FixedSizeList>

// VirtualList
import { VirtualList } from '@gym-app/ui';

<VirtualList
  items={items} // Array of items
  height={400}
  itemHeight={60}
  width={300}
  variant="fixed"
  renderItem={({ item, index, style }) => (
    <div style={style}>Item {index}</div>
  )}
/>
```

## Related Components

- **InfiniteScroll**: For loading more items on scroll
- **Table**: For structured data tables
- **DataGrid**: For advanced data grid features
