# ContextMenu Component

A right-click context menu component with multiple visual variants and customization options. Provides native-like context menu experience with Material-UI styling.

## Features

- Right-click trigger activation
- Three visual variants (default, glass, dark)
- Multiple size options (sm, md, lg)
- Support for icons, shortcuts, and dividers
- Menu headers for grouping
- Colored and dangerous items
- Disabled state support
- Custom trigger elements
- Full accessibility support

## Basic Usage

```tsx
import { ContextMenu } from '@gym-app/ui';
import { ContentCopy, Edit, Delete } from '@mui/icons-material';

function MyComponent() {
  const menuItems = [
    {
      id: 'copy',
      label: 'Copy',
      icon: <ContentCopy />,
      shortcut: 'Ctrl+C',
      onClick: () => console.log('Copy clicked'),
    },
    {
      id: 'edit',
      label: 'Edit',
      icon: <Edit />,
      shortcut: 'F2',
      onClick: () => console.log('Edit clicked'),
    },
    {
      id: 'divider',
      type: 'divider',
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: <Delete />,
      dangerous: true,
      onClick: () => console.log('Delete clicked'),
    },
  ];

  return (
    <ContextMenu items={menuItems}>
      <div>Right-click me!</div>
    </ContextMenu>
  );
}
```

## Props

### ContextMenuProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'glass' \| 'dark'` | `'default'` | Visual variant of the menu |
| `items` | `ContextMenuItem[]` | - | Menu items to display (required) |
| `children` | `ReactNode` | - | Target element for context menu (required) |
| `disabled` | `boolean` | `false` | Whether the context menu is disabled |
| `onOpen` | `(event: React.MouseEvent) => void` | - | Callback when menu opens |
| `onClose` | `() => void` | - | Callback when menu closes |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of menu items |
| `triggerClassName` | `string` | - | Custom className for trigger element |
| `triggerStyle` | `CSSProperties` | - | Custom styles for trigger element |

### ContextMenuItem

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `id` | `string` | - | Unique identifier (required) |
| `label` | `string` | - | Display text (required) |
| `icon` | `ReactNode` | - | Icon to display before label |
| `type` | `'item' \| 'divider' \| 'header'` | `'item'` | Type of menu item |
| `onClick` | `() => void` | - | Click handler |
| `shortcut` | `string` | - | Keyboard shortcut to display |
| `color` | `'default' \| 'primary' \| 'secondary' \| 'error' \| 'warning' \| 'info' \| 'success'` | `'default'` | Color variant |
| `dangerous` | `boolean` | `false` | Whether item is destructive |
| `disabled` | `boolean` | `false` | Whether item is disabled |

## Variants

### Default

Standard context menu with default Material-UI styling.

```tsx
<ContextMenu variant="default" items={menuItems}>
  <Box>Right-click for menu</Box>
</ContextMenu>
```

### Glass

Glassmorphism style with backdrop blur effect. Ideal for modern, translucent UIs.

```tsx
<ContextMenu variant="glass" items={menuItems}>
  <Box sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
    Right-click for glass menu
  </Box>
</ContextMenu>
```

### Dark

Dark theme variant with high contrast.

```tsx
<ContextMenu variant="dark" items={menuItems}>
  <Box>Right-click for dark menu</Box>
</ContextMenu>
```

## Sizes

### Small (sm)

Compact menu for tight spaces.

```tsx
<ContextMenu size="sm" items={menuItems}>
  <Typography variant="caption">Small menu</Typography>
</ContextMenu>
```

### Medium (md)

Default size, balanced for most use cases.

```tsx
<ContextMenu size="md" items={menuItems}>
  <Typography variant="body2">Medium menu</Typography>
</ContextMenu>
```

### Large (lg)

Larger menu items for better touch targets.

```tsx
<ContextMenu size="lg" items={menuItems}>
  <Typography variant="h6">Large menu</Typography>
</ContextMenu>
```

## Examples

### Menu with Headers and Sections

```tsx
const menuItems = [
  {
    id: 'header1',
    type: 'header',
    label: 'Edit Actions',
  },
  {
    id: 'copy',
    label: 'Copy',
    icon: <ContentCopy />,
    shortcut: 'Ctrl+C',
  },
  {
    id: 'paste',
    label: 'Paste',
    icon: <ContentPaste />,
    shortcut: 'Ctrl+V',
  },
  {
    id: 'divider1',
    type: 'divider',
  },
  {
    id: 'header2',
    type: 'header',
    label: 'File Actions',
  },
  {
    id: 'delete',
    label: 'Delete',
    icon: <Delete />,
    dangerous: true,
  },
];

<ContextMenu items={menuItems}>
  <Box>Right-click me</Box>
</ContextMenu>
```

### Colored Menu Items

```tsx
const menuItems = [
  {
    id: 'primary',
    label: 'Primary Action',
    icon: <Star />,
    color: 'primary',
  },
  {
    id: 'warning',
    label: 'Warning Action',
    icon: <Warning />,
    color: 'warning',
  },
  {
    id: 'success',
    label: 'Success Action',
    icon: <CheckCircle />,
    color: 'success',
  },
];
```

### Dangerous/Destructive Actions

```tsx
const menuItems = [
  {
    id: 'delete',
    label: 'Delete File',
    icon: <Delete />,
    dangerous: true,
    onClick: () => {
      if (confirm('Are you sure?')) {
        // Delete logic
      }
    },
  },
  {
    id: 'clear',
    label: 'Clear All Data',
    icon: <ClearAll />,
    dangerous: true,
  },
];
```

### File Context Menu

```tsx
function FileCard({ file }) {
  const menuItems = [
    {
      id: 'open',
      label: 'Open',
      icon: <FolderOpen />,
      shortcut: 'Enter',
      onClick: () => openFile(file),
    },
    {
      id: 'rename',
      label: 'Rename',
      icon: <Edit />,
      shortcut: 'F2',
      onClick: () => renameFile(file),
    },
    {
      id: 'divider',
      type: 'divider',
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: <Delete />,
      dangerous: true,
      onClick: () => deleteFile(file),
    },
  ];

  return (
    <ContextMenu items={menuItems}>
      <Card>
        <CardContent>
          <Folder />
          <Typography>{file.name}</Typography>
        </CardContent>
      </Card>
    </ContextMenu>
  );
}
```

### With Open/Close Callbacks

```tsx
const [menuOpen, setMenuOpen] = useState(false);

<ContextMenu
  items={menuItems}
  onOpen={(event) => {
    console.log('Menu opened at', event.clientX, event.clientY);
    setMenuOpen(true);
  }}
  onClose={() => {
    console.log('Menu closed');
    setMenuOpen(false);
  }}
>
  <Box>Right-click me ({menuOpen ? 'Open' : 'Closed'})</Box>
</ContextMenu>
```

### Disabled Menu

```tsx
<ContextMenu items={menuItems} disabled={true}>
  <Box sx={{ opacity: 0.6, cursor: 'not-allowed' }}>
    Context menu disabled
  </Box>
</ContextMenu>
```

### Custom Trigger Styling

```tsx
<ContextMenu
  items={menuItems}
  triggerClassName="custom-trigger"
  triggerStyle={{
    padding: '16px',
    border: '2px dashed gray',
    borderRadius: '8px',
  }}
>
  <Typography>Styled trigger</Typography>
</ContextMenu>
```

### Multiple Context Menus

```tsx
function Dashboard() {
  const widgetMenu = [
    { id: 'edit', label: 'Edit Widget', icon: <Edit /> },
    { id: 'delete', label: 'Delete Widget', icon: <Delete />, dangerous: true },
  ];

  const chartMenu = [
    { id: 'export', label: 'Export Data', icon: <Save /> },
    { id: 'fullscreen', label: 'Fullscreen', icon: <Fullscreen /> },
  ];

  return (
    <Box sx={{ display: 'grid', gap: 2 }}>
      <ContextMenu items={widgetMenu}>
        <Card>
          <CardContent>Widget 1</CardContent>
        </Card>
      </ContextMenu>

      <ContextMenu items={chartMenu}>
        <Card>
          <CardContent>Chart 1</CardContent>
        </Card>
      </ContextMenu>
    </Box>
  );
}
```

## Testing

The ContextMenu component can be tested using the trigger element and menu items.

### Testing Example

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ContextMenu } from './ContextMenu';

test('opens context menu on right-click', () => {
  const items = [
    { id: 'copy', label: 'Copy', onClick: jest.fn() },
    { id: 'paste', label: 'Paste', onClick: jest.fn() },
  ];

  render(
    <ContextMenu items={items}>
      <div data-testid="trigger">Right-click me</div>
    </ContextMenu>
  );

  const trigger = screen.getByTestId('trigger');
  fireEvent.contextMenu(trigger);

  expect(screen.getByText('Copy')).toBeInTheDocument();
  expect(screen.getByText('Paste')).toBeInTheDocument();
});

test('calls onClick when menu item is clicked', () => {
  const handleClick = jest.fn();
  const items = [
    { id: 'action', label: 'Action', onClick: handleClick },
  ];

  render(
    <ContextMenu items={items}>
      <div data-testid="trigger">Right-click me</div>
    </ContextMenu>
  );

  fireEvent.contextMenu(screen.getByTestId('trigger'));
  fireEvent.click(screen.getByText('Action'));

  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('does not open when disabled', () => {
  const items = [
    { id: 'action', label: 'Action' },
  ];

  render(
    <ContextMenu items={items} disabled={true}>
      <div data-testid="trigger">Right-click me</div>
    </ContextMenu>
  );

  fireEvent.contextMenu(screen.getByTestId('trigger'));
  expect(screen.queryByText('Action')).not.toBeInTheDocument();
});
```

### Testing Best Practices

1. **Right-click Testing**: Use `fireEvent.contextMenu()` to trigger
2. **Item Click Testing**: Verify onClick handlers are called
3. **Disabled State**: Test that menu doesn't open when disabled
4. **Menu Items**: Verify all items render correctly
5. **Dangerous Items**: Test that dangerous items are styled differently

## Accessibility

The ContextMenu component includes accessibility features:

```tsx
<ContextMenu
  items={menuItems}
  aria-label="File actions menu"
>
  <Box role="button" tabIndex={0}>
    Right-click or press context menu key
  </Box>
</ContextMenu>
```

### Accessibility Features

- Menu follows MUI Menu accessibility patterns
- Keyboard navigation with arrow keys
- Enter/Space to select items
- Escape to close menu
- Context menu key support
- Screen reader announcements for menu state

### Keyboard Shortcuts

- **Right-click / Context Menu Key**: Open menu
- **Arrow Up/Down**: Navigate items
- **Enter / Space**: Select item
- **Escape**: Close menu
- **Tab**: Close menu and move focus

## Performance Considerations

### Optimization Tips

1. **Memoize Menu Items**: Use `useMemo` for static menu arrays
2. **Lazy Icons**: Only import icons you use
3. **Avoid Inline Functions**: Define onClick handlers outside render
4. **Conditional Menus**: Only render when needed

### Example: Optimized Component

```tsx
const menuItems = useMemo(() => [
  {
    id: 'copy',
    label: 'Copy',
    icon: <ContentCopy />,
    onClick: handleCopy, // Defined outside
  },
], [handleCopy]);

const handleCopy = useCallback(() => {
  // Copy logic
}, [dependencies]);

<ContextMenu items={menuItems}>
  <Box>Optimized trigger</Box>
</ContextMenu>
```

## Common Use Cases

1. **File Managers**: Right-click actions for files and folders
2. **Data Tables**: Row context menus for actions
3. **Canvas/Drawing Apps**: Right-click tools and options
4. **Text Editors**: Right-click text formatting options
5. **Image Galleries**: Image actions (download, share, delete)
6. **Code Editors**: Right-click code refactoring options
7. **Calendar Apps**: Event context menus
8. **Task Lists**: Task action menus

## Browser Compatibility

Works with all modern browsers supporting:
- Context menu events
- Material-UI Menu component
- CSS transforms and transitions
- Modern DOM APIs

Tested and supported:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Related Components

- **DropdownMenu**: Click-triggered dropdown menu
- **Menu**: Base Material-UI menu component
- **Popover**: General-purpose popover component
