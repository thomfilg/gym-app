# InfiniteScroll Component

A performant infinite scroll component that automatically loads more content as the user scrolls. Uses Intersection Observer API for optimal performance.

## Features

- Automatic content loading on scroll
- Three scroll variants (default, reverse, horizontal)
- Configurable load threshold
- Custom loading indicators
- Error handling with retry
- End message customization
- Custom scrollable containers
- Intersection Observer based (performant)
- Full accessibility support

## Basic Usage

```tsx
import { InfiniteScroll } from '@gym-app/ui';
import { useState } from 'react';

function MyComponent() {
  const [items, setItems] = useState([...]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    setLoading(true);
    const newItems = await fetchMoreItems();
    setItems([...items, ...newItems]);
    setHasMore(newItems.length > 0);
    setLoading(false);
  };

  return (
    <InfiniteScroll
      hasMore={hasMore}
      loading={loading}
      loadMore={loadMore}
    >
      {items.map(item => (
        <div key={item.id}>{item.content}</div>
      ))}
    </InfiniteScroll>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Content to display (required) |
| `variant` | `'default' \| 'reverse' \| 'horizontal'` | `'default'` | Scroll direction variant |
| `hasMore` | `boolean` | - | Whether more items can be loaded (required) |
| `loading` | `boolean` | - | Whether currently loading (required) |
| `threshold` | `number` | `150` | Distance in pixels from edge to trigger load |
| `loadMore` | `() => void \| Promise<void>` | - | Function to load more items (required) |
| `loader` | `ReactNode` | Default spinner | Custom loading indicator |
| `endMessage` | `ReactNode` | Default message | Message when no more items |
| `error` | `Error \| null` | - | Error object if load failed |
| `errorComponent` | `ReactNode` | Default error UI | Custom error component |
| `onError` | `(error: Error) => void` | - | Error callback |
| `className` | `string` | - | CSS class name |
| `style` | `CSSProperties` | - | Inline styles |
| `width` | `number \| string` | - | Width for horizontal variant |
| `scrollableTarget` | `string \| HTMLElement` | - | Custom scroll container |

## Variants

### Default (Vertical)

Standard vertical infinite scroll.

```tsx
<InfiniteScroll
  variant="default"
  hasMore={hasMore}
  loading={loading}
  loadMore={loadMore}
>
  {items.map(item => <ItemCard key={item.id} {...item} />)}
</InfiniteScroll>
```

### Reverse (Chat-like)

Loads content at the top, useful for chat messages.

```tsx
<InfiniteScroll
  variant="reverse"
  hasMore={hasMore}
  loading={loading}
  loadMore={loadMore}
>
  {messages.map(msg => <Message key={msg.id} {...msg} />)}
</InfiniteScroll>
```

### Horizontal

Horizontal scrolling, useful for image galleries.

```tsx
<InfiniteScroll
  variant="horizontal"
  width="100%"
  hasMore={hasMore}
  loading={loading}
  loadMore={loadMore}
>
  {images.map(img => <Image key={img.id} {...img} />)}
</InfiniteScroll>
```

## Examples

### With Custom Loader

```tsx
<InfiniteScroll
  hasMore={hasMore}
  loading={loading}
  loadMore={loadMore}
  loader={
    <Box sx={{ textAlign: 'center', p: 3 }}>
      <CircularProgress size={32} />
      <Typography variant="body2" sx={{ mt: 1 }}>
        Loading more items...
      </Typography>
    </Box>
  }
>
  {items.map(item => <Item key={item.id} {...item} />)}
</InfiniteScroll>
```

### With Custom End Message

```tsx
<InfiniteScroll
  hasMore={hasMore}
  loading={loading}
  loadMore={loadMore}
  endMessage={
    <Box sx={{ textAlign: 'center', p: 3, color: 'text.secondary' }}>
      <Typography variant="body1">
        You've reached the end!
      </Typography>
      <Typography variant="caption">
        No more items to load
      </Typography>
    </Box>
  }
>
  {items.map(item => <Item key={item.id} {...item} />)}
</InfiniteScroll>
```

### With Error Handling

```tsx
function InfiniteList() {
  const [error, setError] = useState<Error | null>(null);
  const [items, setItems] = useState([]);

  const loadMore = async () => {
    try {
      const newItems = await fetchItems();
      setItems([...items, ...newItems]);
      setError(null);
    } catch (err) {
      setError(err as Error);
    }
  };

  return (
    <InfiniteScroll
      hasMore={hasMore}
      loading={loading}
      loadMore={loadMore}
      error={error}
      onError={(err) => console.error('Load failed:', err)}
      errorComponent={
        <Box sx={{ textAlign: 'center', p: 3 }}>
          <Alert severity="error">
            Failed to load items
          </Alert>
          <Button onClick={() => loadMore()} sx={{ mt: 2 }}>
            Try Again
          </Button>
        </Box>
      }
    >
      {items.map(item => <Item key={item.id} {...item} />)}
    </InfiniteScroll>
  );
}
```

### With Custom Threshold

```tsx
<InfiniteScroll
  hasMore={hasMore}
  loading={loading}
  loadMore={loadMore}
  threshold={300} // Load when 300px from bottom
>
  {items.map(item => <Item key={item.id} {...item} />)}
</InfiniteScroll>
```

### In Custom Scroll Container

```tsx
<Box id="scroll-container" sx={{ height: 400, overflow: 'auto' }}>
  <InfiniteScroll
    hasMore={hasMore}
    loading={loading}
    loadMore={loadMore}
    scrollableTarget="scroll-container"
  >
    {items.map(item => <Item key={item.id} {...item} />)}
  </InfiniteScroll>
</Box>
```

### Chat Messages (Reverse)

```tsx
function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const loadOlderMessages = async () => {
    const older = await fetchOlderMessages(messages[0]?.id);
    setMessages([...older, ...messages]);
    setHasMore(older.length > 0);
  };

  return (
    <Box sx={{ height: 500, overflow: 'auto', display: 'flex', flexDirection: 'column-reverse' }}>
      <InfiniteScroll
        variant="reverse"
        hasMore={hasMore}
        loading={loading}
        loadMore={loadOlderMessages}
      >
        {messages.map(msg => (
          <Message key={msg.id} {...msg} />
        ))}
      </InfiniteScroll>
    </Box>
  );
}
```

### Image Gallery (Horizontal)

```tsx
<Box sx={{ width: '100%', overflowX: 'auto' }}>
  <InfiniteScroll
    variant="horizontal"
    width="auto"
    hasMore={hasMore}
    loading={loading}
    loadMore={loadMore}
  >
    <Box sx={{ display: 'flex', gap: 2 }}>
      {images.map(img => (
        <Box key={img.id} sx={{ minWidth: 200, height: 300 }}>
          <img src={img.url} alt={img.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Box>
      ))}
    </Box>
  </InfiniteScroll>
</Box>
```

### Social Media Feed

```tsx
function SocialFeed() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    setLoading(true);
    const newPosts = await fetchPosts(page);
    setPosts([...posts, ...newPosts]);
    setHasMore(newPosts.length === 20); // Assuming 20 per page
    setPage(page + 1);
    setLoading(false);
  };

  return (
    <InfiniteScroll
      hasMore={hasMore}
      loading={loading}
      loadMore={loadMore}
      threshold={200}
    >
      {posts.map(post => (
        <PostCard key={post.id} {...post} />
      ))}
    </InfiniteScroll>
  );
}
```

## Testing

The InfiniteScroll component can be tested using intersection observer mocking.

### Testing Example

```tsx
import { render, screen, waitFor } from '@testing-library/react';
import { InfiniteScroll } from './InfiniteScroll';

// Mock IntersectionObserver
beforeEach(() => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

test('renders children correctly', () => {
  const loadMore = jest.fn();

  render(
    <InfiniteScroll hasMore={true} loading={false} loadMore={loadMore}>
      <div data-testid="item-1">Item 1</div>
      <div data-testid="item-2">Item 2</div>
    </InfiniteScroll>
  );

  expect(screen.getByTestId('item-1')).toBeInTheDocument();
  expect(screen.getByTestId('item-2')).toBeInTheDocument();
});

test('shows loading indicator when loading', () => {
  const loadMore = jest.fn();

  render(
    <InfiniteScroll hasMore={true} loading={true} loadMore={loadMore}>
      <div>Content</div>
    </InfiniteScroll>
  );

  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('shows end message when no more items', () => {
  const loadMore = jest.fn();

  render(
    <InfiniteScroll hasMore={false} loading={false} loadMore={loadMore}>
      <div>Content</div>
    </InfiniteScroll>
  );

  expect(screen.getByText('No more items to load')).toBeInTheDocument();
});

test('shows error message when error occurs', () => {
  const loadMore = jest.fn();
  const error = new Error('Failed to load');

  render(
    <InfiniteScroll hasMore={true} loading={false} loadMore={loadMore} error={error}>
      <div>Content</div>
    </InfiniteScroll>
  );

  expect(screen.getByText(/Failed to load/)).toBeInTheDocument();
});
```

### Testing Best Practices

1. **Mock IntersectionObserver**: Required for testing
2. **Test Loading States**: Verify loading indicator shows
3. **Test End State**: Check end message displays
4. **Test Error Handling**: Verify error UI shows
5. **Test loadMore Calls**: Ensure function is called correctly

## Accessibility

The InfiniteScroll component includes accessibility considerations:

```tsx
<InfiniteScroll
  hasMore={hasMore}
  loading={loading}
  loadMore={loadMore}
  loader={
    <Box role="status" aria-live="polite" aria-label="Loading more items">
      <CircularProgress />
    </Box>
  }
>
  <Box role="feed" aria-busy={loading}>
    {items.map(item => (
      <article key={item.id} aria-labelledby={`item-${item.id}`}>
        {item.content}
      </article>
    ))}
  </Box>
</InfiniteScroll>
```

### Accessibility Features

- Loading state announced to screen readers
- Proper ARIA attributes for feed content
- Keyboard scrolling support
- Focus management on new content

## Performance Considerations

### Optimization Tips

1. **Use Intersection Observer**: Built-in, very performant
2. **Debounce loadMore**: Prevent multiple simultaneous loads
3. **Virtualization**: For very large lists, combine with VirtualList
4. **Lazy Loading**: Load images lazily as they appear
5. **Pagination**: Use reasonable page sizes (20-50 items)

### Performance Metrics

- **Intersection Observer**: Native browser API, very efficient
- **Memory**: Only active listeners maintained
- **CPU**: Minimal overhead, no scroll event listeners
- **Network**: Only loads when needed

### Example: Optimized Component

```tsx
function OptimizedList() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Debounce loadMore to prevent multiple calls
  const loadMore = useMemo(
    () =>
      debounce(async () => {
        if (loading) return;

        setLoading(true);
        try {
          const newItems = await fetchItems(page);
          setItems(prev => [...prev, ...newItems]);
          setHasMore(newItems.length === PAGE_SIZE);
          setPage(prev => prev + 1);
        } finally {
          setLoading(false);
        }
      }, 300),
    [page, loading]
  );

  return (
    <InfiniteScroll
      hasMore={hasMore}
      loading={loading}
      loadMore={loadMore}
      threshold={250}
    >
      {items.map(item => (
        <MemoizedItem key={item.id} {...item} />
      ))}
    </InfiniteScroll>
  );
}
```

## Common Use Cases

1. **Social Media Feeds**: Twitter/Facebook style infinite feeds
2. **Product Listings**: E-commerce product grids
3. **Search Results**: Infinite scroll search results
4. **News Feeds**: Article and blog post feeds
5. **Image Galleries**: Infinite image galleries
6. **Chat History**: Load older messages on scroll
7. **Notifications**: Infinite notification lists
8. **Activity Logs**: System activity or audit logs

## Browser Compatibility

Works with all modern browsers supporting:
- Intersection Observer API
- Modern JavaScript (async/await)
- Flexbox
- Modern DOM APIs

Tested and supported:
- Chrome 58+
- Firefox 55+
- Safari 12.1+
- Edge 79+

## Intersection Observer Polyfill

For older browsers, include a polyfill:

```bash
npm install intersection-observer
```

```tsx
import 'intersection-observer';
```

## Related Components

- **VirtualList**: For rendering large lists efficiently
- **ScrollArea**: Custom scrollable containers
- **Pagination**: Alternative to infinite scroll
- **LazyLoad**: Lazy loading images
