# DropdownMenu Component

A click-triggered dropdown menu component with multiple variants, nested items support, and extensive customization options.

## Features

- Click-triggered menu (vs right-click ContextMenu)
- Three visual variants (default, glass, minimal)
- Multiple size options (sm, md, lg)
- Nested submenu support
- Support for icons, shortcuts, and dividers
- Menu headers for grouping
- Colored menu items
- Custom components as menu items
- Controlled and uncontrolled modes
- Full accessibility support

## Basic Usage

```tsx
import { DropdownMenu } from '@gym-app/ui';
import { Edit, Delete, Share } from '@mui/icons-material';
import { Button } from '@mui/material';

function MyComponent() {
  const menuItems = [
    {
      id: 'edit',
      label: 'Edit',
      icon: <Edit />,
      onClick: () => console.log('Edit clicked'),
    },
    {
      id: 'share',
      label: 'Share',
      icon: <Share />,
      onClick: () => console.log('Share clicked'),
    },
    {
      id: 'divider',
      type: 'divider',
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: <Delete />,
      color: 'error',
      onClick: () => console.log('Delete clicked'),
    },
  ];

  return (
    <DropdownMenu
      items={menuItems}
      trigger={<Button>Actions</Button>}
    />
  );
}
```

## Props

### DropdownMenuProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'glass' \| 'minimal'` | `'default'` | Visual variant of the menu |
| `items` | `DropdownMenuItem[]` | - | Menu items to display (required) |
| `trigger` | `ReactNode` | `<MoreVert />` | Trigger element for the menu |
| `open` | `boolean` | - | Controlled open state |
| `onOpen` | `() => void` | - | Callback when menu opens |
| `onClose` | `() => void` | - | Callback when menu closes |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of menu items |
| `maxHeight` | `number \| string` | `400` | Maximum height of menu |
| `minWidth` | `number \| string` | `180` | Minimum width of menu |
| `closeOnItemClick` | `boolean` | `true` | Close menu when item is clicked |
| `showIconSpace` | `boolean` | `false` | Reserve space for icons even if not present |
| `anchorEl` | `HTMLElement \| null` | - | Custom anchor element |

### DropdownMenuItem

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `id` | `string` | - | Unique identifier (required) |
| `label` | `string` | - | Display text (required) |
| `icon` | `ReactNode` | - | Icon to display before label |
| `type` | `'item' \| 'divider' \| 'header'` | `'item'` | Type of menu item |
| `onClick` | `() => void` | - | Click handler |
| `disabled` | `boolean` | `false` | Whether item is disabled |
| `children` | `DropdownMenuItem[]` | - | Nested submenu items |
| `showChevron` | `boolean` | `true` | Show chevron for submenus |
| `component` | `ReactNode` | - | Custom component to render |
| `shortcut` | `string` | - | Keyboard shortcut text |
| `color` | `'default' \| 'primary' \| 'secondary' \| 'error' \| 'warning' \| 'info' \| 'success'` | `'default'` | Color variant |

## Variants

### Default

Standard dropdown menu with Material-UI styling.

```tsx
<DropdownMenu
  variant="default"
  items={menuItems}
  trigger={<Button>Menu</Button>}
/>
```

### Glass

Glassmorphism style with backdrop blur.

```tsx
<DropdownMenu
  variant="glass"
  items={menuItems}
  trigger={<Button>Glass Menu</Button>}
/>
```

### Minimal

Minimal style with subtle shadow and border.

```tsx
<DropdownMenu
  variant="minimal"
  items={menuItems}
  trigger={<Button>Minimal Menu</Button>}
/>
```

## Examples

### With Custom Trigger

```tsx
<DropdownMenu
  items={menuItems}
  trigger={
    <IconButton>
      <MoreVert />
    </IconButton>
  }
/>
```

### With Nested Submenus

```tsx
const menuItems = [
  {
    id: 'file',
    label: 'File',
    children: [
      {
        id: 'new',
        label: 'New',
        icon: <Add />,
      },
      {
        id: 'open',
        label: 'Open',
        icon: <Folder />,
      },
    ],
  },
  {
    id: 'edit',
    label: 'Edit',
    children: [
      {
        id: 'cut',
        label: 'Cut',
        shortcut: 'Ctrl+X',
      },
      {
        id: 'copy',
        label: 'Copy',
        shortcut: 'Ctrl+C',
      },
    ],
  },
];

<DropdownMenu items={menuItems} />
```

### With Headers and Sections

```tsx
const menuItems = [
  {
    id: 'header1',
    type: 'header',
    label: 'Quick Actions',
  },
  {
    id: 'action1',
    label: 'Action 1',
  },
  {
    id: 'action2',
    label: 'Action 2',
  },
  {
    id: 'divider',
    type: 'divider',
  },
  {
    id: 'header2',
    type: 'header',
    label: 'Settings',
  },
  {
    id: 'preferences',
    label: 'Preferences',
  },
];
```

### With Custom Component

```tsx
const menuItems = [
  {
    id: 'search',
    component: (
      <TextField
        size="small"
        placeholder="Search..."
        fullWidth
      />
    ),
  },
  {
    id: 'divider',
    type: 'divider',
  },
  {
    id: 'option1',
    label: 'Option 1',
  },
];
```

### Controlled Mode

```tsx
function ControlledMenu() {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <DropdownMenu
      items={menuItems}
      open={open}
      anchorEl={anchorEl}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      trigger={
        <Button onClick={(e) => {
          setAnchorEl(e.currentTarget);
          setOpen(true);
        }}>
          Open Menu
        </Button>
      }
    />
  );
}
```

### With Shortcuts

```tsx
const menuItems = [
  {
    id: 'save',
    label: 'Save',
    icon: <Save />,
    shortcut: 'Ctrl+S',
  },
  {
    id: 'saveAs',
    label: 'Save As...',
    icon: <SaveAs />,
    shortcut: 'Ctrl+Shift+S',
  },
];
```

### Colored Items

```tsx
const menuItems = [
  {
    id: 'approve',
    label: 'Approve',
    icon: <Check />,
    color: 'success',
  },
  {
    id: 'warn',
    label: 'Warning',
    icon: <Warning />,
    color: 'warning',
  },
  {
    id: 'delete',
    label: 'Delete',
    icon: <Delete />,
    color: 'error',
  },
];
```

### Don't Close on Item Click

```tsx
<DropdownMenu
  items={menuItems}
  closeOnItemClick={false}
  trigger={<Button>Keep Open</Button>}
/>
```

### With Icon Space

```tsx
<DropdownMenu
  items={menuItems}
  showIconSpace={true}
  trigger={<Button>Aligned</Button>}
/>
```

## Testing

The DropdownMenu component can be tested using trigger and menu items.

### Testing Example

```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DropdownMenu } from './DropdownMenu';

test('opens menu when trigger is clicked', async () => {
  const items = [
    { id: 'option1', label: 'Option 1' },
    { id: 'option2', label: 'Option 2' },
  ];

  render(
    <DropdownMenu
      items={items}
      trigger={<button>Open Menu</button>}
    />
  );

  const trigger = screen.getByText('Open Menu');
  fireEvent.click(trigger);

  await waitFor(() => {
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });
});

test('calls onClick when menu item is clicked', async () => {
  const handleClick = jest.fn();
  const items = [
    { id: 'action', label: 'Action', onClick: handleClick },
  ];

  render(
    <DropdownMenu
      items={items}
      trigger={<button>Menu</button>}
    />
  );

  fireEvent.click(screen.getByText('Menu'));

  await waitFor(() => {
    fireEvent.click(screen.getByText('Action'));
  });

  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('does not close when closeOnItemClick is false', async () => {
  const items = [
    { id: 'action', label: 'Action' },
  ];

  render(
    <DropdownMenu
      items={items}
      closeOnItemClick={false}
      trigger={<button>Menu</button>}
    />
  );

  fireEvent.click(screen.getByText('Menu'));

  await waitFor(() => {
    fireEvent.click(screen.getByText('Action'));
  });

  expect(screen.getByText('Action')).toBeInTheDocument();
});
```

### Testing Best Practices

1. **Trigger Testing**: Test menu opens on trigger click
2. **Item Click Testing**: Verify onClick handlers are called
3. **Close Behavior**: Test menu closes correctly
4. **Nested Menus**: Test submenu interactions
5. **Disabled Items**: Verify disabled items don't trigger onClick

## Accessibility

The DropdownMenu component includes accessibility features:

```tsx
<DropdownMenu
  items={menuItems}
  trigger={
    <Button aria-label="Actions menu">
      Actions
    </Button>
  }
/>
```

### Accessibility Features

- Menu follows MUI Menu accessibility patterns
- Keyboard navigation with arrow keys
- Enter/Space to select items
- Escape to close menu
- Tab to close menu and move focus
- Screen reader announcements

### Keyboard Shortcuts

- **Click / Enter / Space**: Open menu
- **Arrow Up/Down**: Navigate items
- **Arrow Right**: Open submenu
- **Arrow Left**: Close submenu
- **Enter / Space**: Select item
- **Escape**: Close menu
- **Tab**: Close menu and move focus

## Performance Considerations

### Optimization Tips

1. **Memoize Menu Items**: Use `useMemo` for menu arrays
2. **Avoid Inline Functions**: Define handlers outside render
3. **Lazy Icons**: Import only needed icons
4. **Controlled Mode**: Use sparingly, adds complexity

### Example: Optimized Component

```tsx
const menuItems = useMemo(() => [
  {
    id: 'save',
    label: 'Save',
    icon: <Save />,
    onClick: handleSave,
  },
], [handleSave]);

const handleSave = useCallback(() => {
  // Save logic
}, [dependencies]);
```

## Common Use Cases

1. **Action Menus**: Primary/secondary actions for items
2. **Table Row Actions**: Actions for data table rows
3. **Card Menus**: Actions for card components
4. **Navigation**: Nested navigation menus
5. **Settings**: App settings and preferences
6. **User Menus**: Profile, account, logout options
7. **Toolbars**: Dropdown tool options
8. **Filter Menus**: Filtering and sorting options

## Browser Compatibility

Works with all modern browsers supporting:
- Click events
- Material-UI Menu component
- CSS transforms and transitions
- Modern DOM APIs

Tested and supported:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Related Components

- **ContextMenu**: Right-click triggered menu
- **Menu**: Base Material-UI menu
- **Popover**: General-purpose popover
- **Select**: Form select dropdown
