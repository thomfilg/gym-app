# Command Component

A powerful command palette component with keyboard navigation, search, and filtering capabilities. Perfect for creating spotlight-like command interfaces.

## Features

- Keyboard navigation with arrow keys and Enter
- Search and filter items with custom filtering
- Category grouping
- Multiple visual variants (default, glass, gradient, elevated, minimal)
- Loading and empty states
- Keyboard shortcuts display
- Responsive design
- Full TypeScript support
- Comprehensive test IDs for automation

## Basic Usage

```tsx
import { Command } from '@gym-app/ui';

const items = [
  { id: '1', label: 'Home', action: () => navigate('/home') },
  { id: '2', label: 'Settings', action: () => navigate('/settings') },
  { id: '3', label: 'Profile', action: () => navigate('/profile') },
];

function MyApp() {
  const [open, setOpen] = useState(false);

  return (
    <Command
      open={open}
      onOpenChange={setOpen}
      items={items}
      placeholder="Type a command..."
    />
  );
}
```

## With Categories

```tsx
const items = [
  {
    id: '1',
    label: 'Home',
    category: 'Navigation',
    icon: <HomeIcon />,
    shortcut: 'Ctrl+H'
  },
  {
    id: '2',
    label: 'Settings',
    category: 'Navigation',
    icon: <SettingsIcon />,
    shortcut: 'Ctrl+,'
  },
  {
    id: '3',
    label: 'New File',
    category: 'Actions',
    icon: <AddIcon />,
    shortcut: 'Ctrl+N'
  },
];

<Command
  open={open}
  onOpenChange={setOpen}
  items={items}
  showCategories={true}
  showShortcuts={true}
  showDescriptions={true}
/>
```

## Visual Variants

```tsx
// Glass morphism effect
<Command variant="glass" glow={true} />

// Gradient background
<Command variant="gradient" color="primary" />

// Elevated with shadow
<Command variant="elevated" />

// Minimal design
<Command variant="minimal" />
```

## With Descriptions and Keywords

```tsx
const items = [
  {
    id: '1',
    label: 'Open Settings',
    description: 'Configure application preferences',
    keywords: ['config', 'preferences', 'options'],
    action: () => openSettings(),
  },
  {
    id: '2',
    label: 'Create New Project',
    description: 'Start a new project from template',
    keywords: ['new', 'start', 'init'],
    action: () => createProject(),
  },
];
```

## Custom Filtering

```tsx
const customFilter = (item: CommandItem, search: string) => {
  const searchLower = search.toLowerCase();
  return (
    item.label.toLowerCase().includes(searchLower) ||
    item.description?.toLowerCase().includes(searchLower) ||
    item.keywords?.some(k => k.toLowerCase().startsWith(searchLower))
  );
};

<Command
  items={items}
  customFilter={customFilter}
/>
```

## Loading State

```tsx
<Command
  open={true}
  loading={true}
  items={items}
/>
```

## Empty State

```tsx
<Command
  open={true}
  items={[]}
  emptyMessage="No commands found. Try a different search."
/>
```

## Sizes

```tsx
<Command size="xs" /> // 400px width
<Command size="sm" /> // 450px width
<Command size="md" /> // 500px width (default)
<Command size="lg" /> // 550px width
<Command size="xl" /> // 600px width
```

## Props

### CommandProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| open | boolean | false | Controls dialog visibility |
| onOpenChange | (open: boolean) => void | - | Callback when open state changes |
| items | CommandItem[] | [] | Array of command items |
| placeholder | string | 'Type a command or search...' | Input placeholder text |
| value | string | '' | Controlled search value |
| onValueChange | (value: string) => void | - | Callback when search value changes |
| onSelect | (item: CommandItem) => void | - | Callback when item is selected |
| variant | 'default' \| 'glass' \| 'gradient' \| 'minimal' \| 'elevated' | 'default' | Visual variant |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | Dialog size |
| color | 'primary' \| 'secondary' \| 'success' \| 'error' \| 'warning' \| 'info' | 'primary' | Theme color |
| glow | boolean | false | Enable glow effect |
| pulse | boolean | false | Enable pulse animation |
| loading | boolean | false | Show loading state |
| disabled | boolean | false | Disable input |
| maxHeight | number \| string | 400 | Maximum height for content |
| emptyMessage | string | 'No results found' | Message when no items match |
| showCategories | boolean | true | Group items by category |
| showShortcuts | boolean | true | Display keyboard shortcuts |
| showDescriptions | boolean | true | Display item descriptions |
| autoFocus | boolean | true | Auto-focus input on open |
| closeOnSelect | boolean | true | Close dialog after selection |
| customFilter | (item: CommandItem, search: string) => boolean | - | Custom filter function |
| dataTestId | string | - | Test ID for the component |
| className | string | - | Additional CSS class |
| style | CSSProperties | - | Additional inline styles |

### CommandItem

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| id | string | Yes | Unique identifier |
| label | string | Yes | Display label |
| description | string | No | Secondary description text |
| icon | ReactNode | No | Icon component |
| shortcut | string | No | Keyboard shortcut text |
| disabled | boolean | No | Disable item selection |
| action | () => void | No | Action to execute on select |
| category | string | No | Category for grouping |
| keywords | string[] | No | Additional search keywords |

## Keyboard Navigation

- Arrow Down: Move to next item
- Arrow Up: Move to previous item
- Enter: Select current item
- Escape: Close command palette
- Type: Filter items by search

## Testing

The Command component provides comprehensive test IDs for automated testing:

### Test ID Structure

When you provide a `dataTestId` prop, the component generates consistent test IDs for all sub-elements:

```tsx
<Command dataTestId="my-command" />
```

This generates:
- Container: `[data-testid="my-command"]`
- Input: `[data-testid="my-command-input"]`
- List: `[data-testid="my-command-list"]`
- Items: `[data-testid="command-item-{item.id}"]`
- Groups: `[data-testid="command-group-{category}"]`
- Empty State: `[data-testid="my-command-empty"]`
- Loading State: `[data-testid="my-command-loading"]`

### Testing Example

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('should filter items by search', async () => {
  const items = [
    { id: '1', label: 'Home' },
    { id: '2', label: 'Settings' },
  ];

  render(
    <Command
      open={true}
      items={items}
      dataTestId="command-palette"
    />
  );

  // Find input
  const input = screen.getByTestId('command-palette-input');

  // Type search query
  await userEvent.type(input, 'home');

  // Verify filtered results
  expect(screen.getByTestId('command-item-1')).toBeInTheDocument();
  expect(screen.queryByTestId('command-item-2')).not.toBeInTheDocument();
});

test('should select item on click', async () => {
  const onSelect = jest.fn();
  const items = [{ id: 'home', label: 'Home' }];

  render(
    <Command
      open={true}
      items={items}
      onSelect={onSelect}
      dataTestId="command"
    />
  );

  // Click item
  const item = screen.getByTestId('command-item-home');
  await userEvent.click(item);

  expect(onSelect).toHaveBeenCalled();
});

test('should display empty state', () => {
  render(
    <Command
      open={true}
      items={[]}
      dataTestId="empty-command"
      emptyMessage="No results"
    />
  );

  const emptyState = screen.getByTestId('empty-command-empty');
  expect(emptyState).toHaveTextContent('No results');
});

test('should display loading state', () => {
  render(
    <Command
      open={true}
      loading={true}
      dataTestId="loading-command"
    />
  );

  const loadingState = screen.getByTestId('loading-command-loading');
  expect(loadingState).toBeInTheDocument();
});

test('should group items by category', () => {
  const items = [
    { id: '1', label: 'Home', category: 'Navigation' },
    { id: '2', label: 'New File', category: 'Actions' },
  ];

  render(
    <Command
      open={true}
      items={items}
      showCategories={true}
      dataTestId="categorized"
    />
  );

  expect(screen.getByTestId('command-group-Navigation')).toBeInTheDocument();
  expect(screen.getByTestId('command-group-Actions')).toBeInTheDocument();
});
```

### Playwright Testing

```typescript
import { test, expect } from '@playwright/test';

test('command palette interaction', async ({ page }) => {
  await page.goto('/your-page');

  // Open command palette
  await page.keyboard.press('Control+K');

  // Verify it's open
  await expect(page.getByTestId('command-palette')).toBeVisible();

  // Type search
  await page.getByTestId('command-palette-input').fill('home');

  // Verify filtered items
  await expect(page.getByTestId('command-item-home')).toBeVisible();

  // Select item
  await page.getByTestId('command-item-home').click();

  // Verify it closed
  await expect(page.getByTestId('command-palette')).not.toBeVisible();
});
```

## Accessibility

- Full keyboard navigation support
- ARIA labels and roles
- Focus management
- Screen reader compatible
- High contrast mode support

## Best Practices

1. **Keyboard Shortcuts**: Display them for better UX
2. **Categories**: Group related commands for easier discovery
3. **Keywords**: Add search keywords for better findability
4. **Icons**: Use consistent icons for visual recognition
5. **Descriptions**: Provide helpful descriptions for clarity
6. **Loading States**: Show loading when fetching items
7. **Empty States**: Provide helpful messages when no results
8. **Test IDs**: Always provide `dataTestId` for testability

## Performance

- Memoized filtering for large item lists
- Optimized re-renders with useCallback
- Lazy rendering of list items
- Virtualization for 1000+ items (consider adding)

## Common Patterns

### Global Command Palette

```tsx
function App() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(prev => !prev);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <Command
      open={open}
      onOpenChange={setOpen}
      items={globalCommands}
    />
  );
}
```

### Dynamic Items

```tsx
function SearchCommand() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query) {
      setItems([]);
      return;
    }

    setLoading(true);
    const results = await api.search(query);
    setItems(results);
    setLoading(false);
  };

  return (
    <Command
      onValueChange={handleSearch}
      loading={loading}
      items={items}
    />
  );
}
```

## Troubleshooting

### Command palette not showing
- Ensure `open` prop is `true`
- Check z-index conflicts with other components

### Items not filtering
- Verify `onValueChange` is connected
- Check `customFilter` function logic

### Keyboard shortcuts not working
- Ensure global keyboard listener is set up
- Check for event.preventDefault() calls

## Related Components

- Dialog
- TextField
- List
- ListItem
