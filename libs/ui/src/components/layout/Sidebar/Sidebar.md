# Sidebar

A flexible navigation sidebar component that supports multiple variants and provides a structured layout for header, content, and footer sections.

## Features

- **Multiple Variants**: Fixed, collapsible, floating, and glass morphism styles
- **Flexible Positioning**: Support for left or right positioning
- **Responsive Behavior**: Collapsible variant with smooth transitions
- **Composable Structure**: Header, content, and footer sections
- **Theme Integration**: Full Material-UI theme support with design tokens

## Basic Usage

```tsx
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter } from '@procurement/ui';

function App() {
  return (
    <Sidebar variant="fixed">
      <SidebarHeader>
        <Typography variant="h6">My App</Typography>
      </SidebarHeader>

      <SidebarContent>
        <List>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </List>
      </SidebarContent>

      <SidebarFooter>
        <Typography variant="caption">Footer content</Typography>
      </SidebarFooter>
    </Sidebar>
  );
}
```

## Variants

### Fixed Sidebar

Default variant with a solid background and border.

```tsx
<Sidebar variant="fixed">{/* content */}</Sidebar>
```

### Collapsible Sidebar

Supports expand/collapse functionality with smooth transitions.

```tsx
const [open, setOpen] = useState(true);

<Sidebar
  variant="collapsible"
  open={open}
  onToggle={() => setOpen(!open)}
  width={280}
  collapsedWidth={64}
>
  {/* content */}
</Sidebar>;
```

### Floating Sidebar

Positioned as a floating overlay with shadow and rounded corners.

```tsx
<Sidebar variant="floating">{/* content */}</Sidebar>
```

### Glass Morphism

Translucent effect with backdrop blur for modern interfaces.

```tsx
<Sidebar variant="glass">{/* content */}</Sidebar>
```

## Props

### Sidebar Props

| Prop             | Type                                                | Default     | Description                                 |
| ---------------- | --------------------------------------------------- | ----------- | ------------------------------------------- |
| `children`       | `ReactNode`                                         | -           | Content to render inside the sidebar        |
| `variant`        | `'fixed' \| 'collapsible' \| 'floating' \| 'glass'` | `'fixed'`   | Visual style variant                        |
| `open`           | `boolean`                                           | `true`      | Controls visibility for collapsible variant |
| `onToggle`       | `() => void`                                        | -           | Callback when sidebar toggle state changes  |
| `width`          | `number`                                            | `280`       | Sidebar width in pixels when expanded       |
| `collapsedWidth` | `number`                                            | `64`        | Sidebar width in pixels when collapsed      |
| `position`       | `'left' \| 'right'`                                 | `'left'`    | Sidebar positioning                         |
| `className`      | `string`                                            | -           | Additional CSS class name                   |
| `dataTestId`     | `string`                                            | `'sidebar'` | Test identifier for testing purposes        |

### Composition Components

All composition components (`SidebarHeader`, `SidebarContent`, `SidebarFooter`) accept:

| Prop         | Type        | Default            | Description                          |
| ------------ | ----------- | ------------------ | ------------------------------------ |
| `children`   | `ReactNode` | -                  | Content to render                    |
| `dataTestId` | `string`    | Component-specific | Test identifier for testing purposes |

**Default `dataTestId` values:**

- `SidebarHeader`: `'sidebar-header'`
- `SidebarContent`: `'sidebar-content'`
- `SidebarFooter`: `'sidebar-footer'`

## Advanced Examples

### Responsive Navigation

```tsx
function ResponsiveNavigation() {
  const [open, setOpen] = useState(window.innerWidth >= 768);

  return (
    <Sidebar
      variant={window.innerWidth >= 768 ? 'fixed' : 'floating'}
      open={open}
      onToggle={() => setOpen(!open)}
    >
      <SidebarHeader>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Navigation</Typography>
          <IconButton onClick={() => setOpen(!open)}>
            <MenuIcon />
          </IconButton>
        </Box>
      </SidebarHeader>

      <SidebarContent>
        <NavigationList />
      </SidebarContent>
    </Sidebar>
  );
}
```

### Right-Positioned Sidebar

```tsx
<Sidebar variant="fixed" position="right">
  <SidebarHeader>
    <Typography variant="h6">Settings Panel</Typography>
  </SidebarHeader>

  <SidebarContent>
    <SettingsForm />
  </SidebarContent>
</Sidebar>
```

## Styling

The component uses Material-UI's theming system and supports custom styling:

```tsx
<Sidebar
  variant="fixed"
  sx={{
    '& .MuiBox-root': {
      backgroundColor: 'primary.light',
    },
  }}
>
  {/* content */}
</Sidebar>
```

## Accessibility

- Proper semantic structure with landmark roles
- Keyboard navigation support
- Focus management for interactive elements
- Screen reader compatible
- Follows WCAG 2.1 AA guidelines

## Testing

The Sidebar component provides comprehensive test identifiers for automated testing.

### Test IDs

Each component in the Sidebar composition has a default `dataTestId` that can be customized:

```tsx
<Sidebar dataTestId="custom-sidebar">
  <SidebarHeader dataTestId="custom-header">
    <Typography variant="h6">Header</Typography>
  </SidebarHeader>

  <SidebarContent dataTestId="custom-content">
    <List>
      <ListItem button data-testid="nav-home">
        <ListItemText primary="Home" />
      </ListItem>
    </List>
  </SidebarContent>

  <SidebarFooter dataTestId="custom-footer">
    <Typography variant="caption">Footer</Typography>
  </SidebarFooter>
</Sidebar>
```

### Default Test IDs

- **Sidebar**: `'sidebar'`
- **SidebarHeader**: `'sidebar-header'`
- **SidebarContent**: `'sidebar-content'`
- **SidebarFooter**: `'sidebar-footer'`

### Testing Examples

#### Testing Sidebar Rendering

```tsx
import { render, screen } from '@testing-library/react';
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter } from '@procurement/ui';

test('renders sidebar with all sections', () => {
  render(
    <Sidebar>
      <SidebarHeader>Header</SidebarHeader>
      <SidebarContent>Content</SidebarContent>
      <SidebarFooter>Footer</SidebarFooter>
    </Sidebar>,
  );

  expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  expect(screen.getByTestId('sidebar-header')).toBeInTheDocument();
  expect(screen.getByTestId('sidebar-content')).toBeInTheDocument();
  expect(screen.getByTestId('sidebar-footer')).toBeInTheDocument();
});
```

#### Testing Collapsible Behavior

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('sidebar collapses and expands correctly', async () => {
  const { rerender } = render(
    <Sidebar variant="collapsible" open={true} width={280} collapsedWidth={64}>
      <SidebarHeader>Header</SidebarHeader>
      <SidebarContent>Content</SidebarContent>
    </Sidebar>,
  );

  const sidebar = screen.getByTestId('sidebar');
  expect(sidebar).toHaveStyle({ width: '280px' });

  // Simulate collapse
  rerender(
    <Sidebar variant="collapsible" open={false} width={280} collapsedWidth={64}>
      <SidebarHeader>Header</SidebarHeader>
      <SidebarContent>Content</SidebarContent>
    </Sidebar>,
  );

  expect(sidebar).toHaveStyle({ width: '64px' });
});
```

#### Testing Navigation Items

```tsx
test('navigation items are clickable', async () => {
  const handleClick = jest.fn();

  render(
    <Sidebar>
      <SidebarContent>
        <List>
          <ListItem button onClick={handleClick} data-testid="nav-home">
            <ListItemText primary="Home" />
          </ListItem>
        </List>
      </SidebarContent>
    </Sidebar>,
  );

  const homeItem = screen.getByTestId('nav-home');
  await userEvent.click(homeItem);

  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

#### Testing Accessibility

```tsx
test('sidebar has proper accessibility structure', () => {
  render(
    <Sidebar role="navigation" aria-label="Main navigation">
      <SidebarHeader>
        <Typography variant="h6">Navigation</Typography>
      </SidebarHeader>
      <SidebarContent>
        <nav role="navigation" aria-label="Primary navigation">
          <List role="menu">
            <ListItem button role="menuitem" aria-label="Navigate to Home">
              <ListItemText primary="Home" />
            </ListItem>
          </List>
        </nav>
      </SidebarContent>
    </Sidebar>,
  );

  const sidebar = screen.getByTestId('sidebar');
  expect(sidebar).toHaveAttribute('role', 'navigation');
  expect(sidebar).toHaveAttribute('aria-label', 'Main navigation');
});
```

### Playwright E2E Testing

```typescript
import { test, expect } from '@playwright/test';

test('sidebar navigation works correctly', async ({ page }) => {
  await page.goto('/app');

  // Test sidebar is visible
  const sidebar = page.getByTestId('sidebar');
  await expect(sidebar).toBeVisible();

  // Test navigation
  const homeLink = page.getByTestId('nav-home');
  await homeLink.click();
  await expect(page).toHaveURL(/.*\/home/);

  // Test sidebar header
  const header = page.getByTestId('sidebar-header');
  await expect(header).toBeVisible();
  await expect(header).toContainText('Navigation');
});
```

## Best Practices

1. **Use appropriate variant**: Choose the variant that best fits your layout needs
2. **Responsive design**: Consider mobile experience with floating variant
3. **Content structure**: Use the composition components for consistent spacing
4. **Keyboard support**: Ensure all interactive elements are keyboard accessible
5. **Performance**: Use React.memo for complex sidebar content to prevent unnecessary re-renders
6. **Custom test IDs**: Override default test IDs when multiple sidebars exist on the same page
7. **Consistent testing**: Add test IDs to navigation items for comprehensive E2E testing

## Related Components

- [Navigation Menu](/docs/navigation-navigationmenu--docs) - For dropdown navigation
- [Drawer](/docs/layout-drawer--docs) - For overlay navigation panels
- [Container](/docs/layout-container--docs) - For main content layout
