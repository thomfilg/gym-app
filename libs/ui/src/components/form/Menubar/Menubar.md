# Menubar Component

A comprehensive navigation component that provides horizontal or vertical menu layouts with nested menu support, keyboard shortcuts, and various visual effects. The Menubar component supports app bar functionality, sticky positioning, logo integration, and extensive customization options with full accessibility compliance.

## Purpose and Use Cases

- **Application Navigation**: Primary navigation bar for web applications
- **App Bar**: Header navigation with logo, menu items, and user controls
- **Admin Panels**: Dashboard navigation with nested menu structures
- **Responsive Design**: Adapts from horizontal to vertical layouts on mobile
- **Sticky Navigation**: Fixed positioning for persistent access to navigation

## Props Documentation

### Core Props

| Prop          | Type                                                                                   | Default        | Description                                       |
| ------------- | -------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------- |
| `items`       | `MenubarItem[]`                                                                        | `[]`           | Array of menu items with nested structure support |
| `variant`     | `'default' \| 'glass' \| 'gradient' \| 'elevated' \| 'minimal' \| 'bordered'`          | `'default'`    | Visual style variant                              |
| `size`        | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                                 | `'md'`         | Component size affecting padding and font size    |
| `color`       | `'primary' \| 'secondary' \| 'success' \| 'error' \| 'warning' \| 'info' \| 'default'` | `'default'`    | Theme color for backgrounds and accents           |
| `orientation` | `'horizontal' \| 'vertical'`                                                           | `'horizontal'` | Layout orientation                                |

### Layout Props

| Prop          | Type              | Default     | Description                                        |
| ------------- | ----------------- | ----------- | -------------------------------------------------- |
| `logo`        | `React.ReactNode` | `undefined` | Logo or brand element displayed at the start       |
| `endContent`  | `React.ReactNode` | `undefined` | Content displayed at the end (user controls, etc.) |
| `sticky`      | `boolean`         | `false`     | Enables sticky positioning                         |
| `transparent` | `boolean`         | `false`     | Transparent background                             |
| `fullWidth`   | `boolean`         | `false`     | Takes full width of container                      |

### Visual Effects Props

| Prop        | Type      | Default | Description                            |
| ----------- | --------- | ------- | -------------------------------------- |
| `glow`      | `boolean` | `false` | Enables glow effect around the menubar |
| `pulse`     | `boolean` | `false` | Enables subtle pulse animation         |
| `glass`     | `boolean` | `false` | Enables glass morphism effect          |
| `gradient`  | `boolean` | `false` | Enables gradient background            |
| `ripple`    | `boolean` | `false` | Enables ripple effects on interactions |
| `blur`      | `boolean` | `false` | Enables backdrop blur effect           |
| `elevation` | `number`  | `0`     | Material-UI elevation for shadow depth |

### State Props

| Prop       | Type      | Default | Description                                    |
| ---------- | --------- | ------- | ---------------------------------------------- |
| `loading`  | `boolean` | `false` | Shows loading state with skeleton placeholders |
| `disabled` | `boolean` | `false` | Disables all interactions                      |

### Event Props

| Prop      | Type                                | Description                          |
| --------- | ----------------------------------- | ------------------------------------ |
| `onClick` | `(item: MenubarItem) => void`       | Callback when menu item is clicked   |
| `onFocus` | `(event: React.FocusEvent) => void` | Callback when menubar receives focus |
| `onBlur`  | `(event: React.FocusEvent) => void` | Callback when menubar loses focus    |

### MenubarItem Structure

```typescript
interface MenubarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  divider?: boolean;
  action?: () => void;
  children?: MenubarItem[];
}
```

## Usage Examples

### Basic Menubar

```tsx
import { Menubar } from '@procurement/ui';

const menuItems = [
  {
    id: 'file',
    label: 'File',
    children: [
      { id: 'new', label: 'New', shortcut: '⌘N' },
      { id: 'open', label: 'Open', shortcut: '⌘O' },
    ],
  },
  {
    id: 'edit',
    label: 'Edit',
    children: [
      { id: 'cut', label: 'Cut', shortcut: '⌘X' },
      { id: 'copy', label: 'Copy', shortcut: '⌘C' },
    ],
  },
];

<Menubar items={menuItems} />;
```

### App Bar with Logo and User Controls

```tsx
import { Menubar } from '@procurement/ui';
import { Avatar, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Logo = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    <img src="/logo.svg" alt="App" width={32} height={32} />
    <Typography variant="h6">MyApp</Typography>
  </Box>
);

const UserControls = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    <IconButton color="inherit">
      <NotificationsIcon />
    </IconButton>
    <Avatar>U</Avatar>
  </Box>
);

<Menubar
  items={menuItems}
  variant="elevated"
  logo={<Logo />}
  endContent={<UserControls />}
  sticky
/>;
```

### Glass Effect Menubar

```tsx
<Menubar
  items={menuItems}
  variant="glass"
  glass
  blur
  glow
  transparent
  sticky
  logo={<Logo />}
  endContent={<UserControls />}
/>
```

### Vertical Sidebar Navigation

```tsx
<Menubar items={menuItems} orientation="vertical" variant="minimal" logo={<Logo />} fullWidth />
```

## Accessibility Notes

- **Keyboard Navigation**: Full keyboard support with Tab, Enter, Escape, and Arrow keys
- **Screen Reader Support**: Comprehensive ARIA labels and roles
- **Focus Management**: Proper focus indication and management
- **High Contrast**: Compatible with high contrast themes
- **Reduced Motion**: Respects user's motion preferences

### ARIA Attributes

- `role="menubar"` on the main container
- `role="menu"` on dropdown menus
- `role="menuitem"` on individual menu items
- `aria-haspopup` for items with children
- `aria-expanded` for dropdown state
- `aria-label` for accessibility labels

### Keyboard Shortcuts

- **Tab/Shift+Tab**: Navigate between menu items
- **Enter/Space**: Activate menu item or open dropdown
- **Escape**: Close open dropdown or exit menu
- **Arrow Keys**: Navigate within dropdowns
- **Home/End**: Jump to first/last menu item

## Best Practices

### Design Guidelines

1. **Use appropriate variants**: Choose variants that match your app's design system
2. **Consistent sizing**: Use consistent sizes across similar navigation elements
3. **Logo placement**: Place logo at the start for better brand recognition
4. **User controls**: Group user-related controls at the end
5. **Visual hierarchy**: Use different variants to establish navigation hierarchy

### Performance Considerations

1. **Lazy loading**: Consider lazy loading for deeply nested menu structures
2. **Memoization**: Wrap menu items in useMemo for large datasets
3. **Virtualization**: For extremely large menu lists, consider virtualization
4. **Effect usage**: Use visual effects sparingly to maintain performance

### Accessibility Best Practices

1. **Meaningful labels**: Ensure all menu items have descriptive labels
2. **Keyboard support**: Test all functionality with keyboard only
3. **Screen reader testing**: Test with actual screen readers
4. **Color contrast**: Ensure sufficient contrast for all text
5. **Focus indicators**: Maintain clear focus indicators

### Common Patterns

#### Admin Dashboard

```tsx
<Menubar
  variant="elevated"
  logo={<AdminLogo />}
  endContent={<UserProfile />}
  items={adminMenuItems}
  sticky
/>
```

#### Marketing Website

```tsx
<Menubar
  variant="glass"
  transparent
  glass
  blur
  items={marketingMenuItems}
  endContent={<CTAButton />}
/>
```

#### Mobile Responsive

```tsx
// Horizontal on desktop, vertical drawer on mobile
<Menubar
  variant="minimal"
  orientation={isMobile ? 'vertical' : 'horizontal'}
  fullWidth={isMobile}
  items={menuItems}
/>
```

## Integration with Design Systems

The Menubar component integrates seamlessly with Material-UI's theming system and supports:

- **Custom color palettes**: Uses theme colors for consistent branding
- **Typography scales**: Adapts to theme typography settings
- **Spacing system**: Uses theme spacing for consistent layouts
- **Dark mode**: Automatic dark mode support through theme
- **Custom breakpoints**: Respects theme breakpoint configuration

## Troubleshooting

### Common Issues

1. **Menu items not clickable**: Ensure `action` callbacks are provided or `onClick` handler is set
2. **Dropdowns not opening**: Check that `children` array is properly structured
3. **Styling conflicts**: Verify theme integration and CSS specificity
4. **Mobile responsiveness**: Test orientation changes and viewport sizes
5. **Performance issues**: Monitor re-renders with large menu structures

### Debug Tips

- Use browser dev tools to inspect ARIA attributes
- Test keyboard navigation in different browsers
- Verify focus management with Tab navigation
- Check color contrast with accessibility tools
- Test with actual screen readers for comprehensive accessibility verification
