# Drawer Component

A slide-out drawer component that can be positioned from any side of the screen. Built on top of MUI's Drawer with additional variants including glass effect, persistent and temporary modes, with customizable dimensions and backdrop behavior.

## Purpose and Use Cases

The Drawer component is perfect for:

- Navigation menus that slide out from the side
- Contextual panels with additional information or controls
- Modal-like content that needs to overlay the main interface
- Settings panels or configuration screens
- Filter panels in data tables or search interfaces
- Temporary workspace areas that can be shown/hidden

## Props Documentation

### Core Props

| Prop       | Type         | Default | Description                         |
| ---------- | ------------ | ------- | ----------------------------------- |
| `children` | `ReactNode`  | -       | Content to render inside the drawer |
| `open`     | `boolean`    | `false` | Controls drawer visibility          |
| `onClose`  | `() => void` | -       | Callback when drawer should close   |

### Positioning Props

| Prop     | Type                                     | Default  | Description                          |
| -------- | ---------------------------------------- | -------- | ------------------------------------ |
| `anchor` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'left'` | Position where drawer slides from    |
| `width`  | `number \| string`                       | `240`    | Drawer width for left/right anchors  |
| `height` | `number \| string`                       | `300`    | Drawer height for top/bottom anchors |

### Behavior Props

| Prop           | Type                                         | Default       | Description                             |
| -------------- | -------------------------------------------- | ------------- | --------------------------------------- |
| `variant`      | `'temporary' \| 'persistent' \| 'permanent'` | `'temporary'` | Drawer behavior type                    |
| `backdrop`     | `boolean`                                    | `true`        | Show backdrop behind drawer             |
| `hideBackdrop` | `boolean`                                    | `false`       | Hide backdrop (overrides backdrop prop) |
| `keepMounted`  | `boolean`                                    | `false`       | Keep drawer in DOM when closed          |

### Styling Props

| Prop        | Type      | Default | Description                      |
| ----------- | --------- | ------- | -------------------------------- |
| `glass`     | `boolean` | `false` | Enable glass/blur effect styling |
| `className` | `string`  | -       | Additional CSS class names       |

## Sub-components

### DrawerHeader

Header section for the drawer with optional close button.

| Prop              | Type         | Default | Description                |
| ----------------- | ------------ | ------- | -------------------------- |
| `children`        | `ReactNode`  | -       | Header content             |
| `onClose`         | `() => void` | -       | Close button click handler |
| `showCloseButton` | `boolean`    | `true`  | Show/hide close button     |

### DrawerContent

Content area with consistent padding and scrollable behavior.

| Prop       | Type               | Default | Description       |
| ---------- | ------------------ | ------- | ----------------- |
| `children` | `ReactNode`        | -       | Content to render |
| `padding`  | `number \| string` | `16`    | Content padding   |

## Usage Examples

### Basic Navigation Drawer

```tsx
import { Drawer, DrawerHeader, DrawerContent } from '@/components/layout/Drawer';

function NavigationDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onClose={() => setOpen(false)} anchor="left" width={280}>
      <DrawerHeader onClose={() => setOpen(false)}>Navigation</DrawerHeader>
      <DrawerContent>
        <nav>
          <a href="/dashboard">Dashboard</a>
          <a href="/settings">Settings</a>
          <a href="/profile">Profile</a>
        </nav>
      </DrawerContent>
    </Drawer>
  );
}
```

### Glass Effect Filter Panel

```tsx
<Drawer
  open={filtersOpen}
  onClose={() => setFiltersOpen(false)}
  anchor="right"
  glass={true}
  width={320}
>
  <DrawerHeader onClose={() => setFiltersOpen(false)}>Filters</DrawerHeader>
  <DrawerContent>
    <FilterForm onApply={handleApplyFilters} />
  </DrawerContent>
</Drawer>
```

### Persistent Settings Panel

```tsx
<Drawer
  open={settingsOpen}
  onClose={() => setSettingsOpen(false)}
  variant="persistent"
  anchor="right"
  hideBackdrop={true}
  width={400}
>
  <DrawerHeader>Settings</DrawerHeader>
  <DrawerContent>
    <SettingsPanel />
  </DrawerContent>
</Drawer>
```

## Accessibility Notes

The Drawer component includes comprehensive accessibility features:

- **ARIA Labels**: Proper `aria-label` attributes for screen readers
- **Focus Management**: Focus is trapped within the drawer when open
- **Keyboard Navigation**: Supports Escape key to close, Tab navigation within
- **Screen Reader Support**: Announces drawer state changes
- **Role Attributes**: Proper `role="dialog"` for modal behavior

### Best Practices

1. **Always provide `onClose`**: Even for persistent drawers, provide a way to close
2. **Use descriptive headers**: Help users understand the drawer's purpose
3. **Manage focus**: Focus the first interactive element when drawer opens
4. **Keyboard shortcuts**: Consider Escape key handling for better UX
5. **Mobile considerations**: Use full-width drawers on small screens

## Theme Integration

The Drawer component integrates with MUI's theme system:

- Respects theme breakpoints for responsive behavior
- Uses theme spacing for consistent padding and margins
- Inherits theme typography for text content
- Supports theme palette colors for backgrounds and borders
- Glass effect uses theme-aware backdrop blur values

## Performance Considerations

- Use `keepMounted={false}` for drawers that are rarely opened
- Consider lazy loading heavy content within drawers
- Glass effect may impact performance on older devices
- Persistent drawers remain in the DOM but can be optimized with content virtualization

## Testing

### Test IDs

The Drawer component provides comprehensive test IDs for reliable testing. All test IDs can be customized via the `dataTestId` prop.

#### Main Component Test IDs

| Element           | Default Test ID   | With Custom dataTestId        | Description                    |
| ----------------- | ----------------- | ----------------------------- | ------------------------------ |
| Drawer container  | `drawer`          | `{dataTestId}`                | Main drawer container          |
| Drawer header     | `drawer-header`   | `{dataTestId}-header`         | Header section                 |
| Drawer title      | `drawer-title`    | `{dataTestId}-title`          | Title/content area in header   |
| Drawer content    | `drawer-content`  | `{dataTestId}-content`        | Main content area              |
| Close button      | `drawer-close`    | `{dataTestId}-close`          | Close button in header         |

### Testing Best Practices

#### 1. Testing Drawer Visibility

```tsx
import { render, screen } from '@testing-library/react';
import { Drawer, DrawerHeader, DrawerContent } from './Drawer';

test('shows drawer when open prop is true', () => {
  render(
    <Drawer open={true} onClose={() => {}}>
      <DrawerHeader>Test Header</DrawerHeader>
      <DrawerContent>Test Content</DrawerContent>
    </Drawer>
  );

  expect(screen.getByTestId('drawer')).toBeInTheDocument();
  expect(screen.getByTestId('drawer-header')).toBeVisible();
  expect(screen.getByTestId('drawer-content')).toBeVisible();
});

test('hides drawer when open prop is false', () => {
  render(
    <Drawer open={false} onClose={() => {}}>
      <DrawerHeader>Test Header</DrawerHeader>
      <DrawerContent>Test Content</DrawerContent>
    </Drawer>
  );

  expect(screen.queryByTestId('drawer-header')).not.toBeInTheDocument();
});
```

#### 2. Testing Close Interactions

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('calls onClose when close button is clicked', async () => {
  const user = userEvent.setup();
  const handleClose = vi.fn();

  render(
    <Drawer open={true} onClose={handleClose}>
      <DrawerHeader onClose={handleClose}>Settings</DrawerHeader>
      <DrawerContent>Content</DrawerContent>
    </Drawer>
  );

  const closeButton = screen.getByTestId('drawer-close');
  await user.click(closeButton);

  expect(handleClose).toHaveBeenCalledTimes(1);
});

test('calls onClose when clicking backdrop', async () => {
  const user = userEvent.setup();
  const handleClose = vi.fn();

  render(
    <Drawer open={true} onClose={handleClose} backdrop={true}>
      <DrawerContent>Content</DrawerContent>
    </Drawer>
  );

  // Click outside the drawer
  const backdrop = screen.getByRole('presentation').firstChild;
  await user.click(backdrop);

  expect(handleClose).toHaveBeenCalled();
});
```

#### 3. Testing Custom Test IDs

```tsx
test('uses custom dataTestId for all elements', () => {
  render(
    <Drawer open={true} onClose={() => {}} dataTestId="settings-drawer">
      <DrawerHeader dataTestId="settings-drawer-header" onClose={() => {}}>
        Settings
      </DrawerHeader>
      <DrawerContent dataTestId="settings-drawer-content">
        Content
      </DrawerContent>
    </Drawer>
  );

  expect(screen.getByTestId('settings-drawer')).toBeInTheDocument();
  expect(screen.getByTestId('settings-drawer-header')).toBeInTheDocument();
  expect(screen.getByTestId('settings-drawer-header-title')).toBeInTheDocument();
  expect(screen.getByTestId('settings-drawer-header-close')).toBeInTheDocument();
  expect(screen.getByTestId('settings-drawer-content')).toBeInTheDocument();
});
```

#### 4. Testing Different Variants

```tsx
test('renders with left anchor', () => {
  render(
    <Drawer open={true} onClose={() => {}} anchor="left">
      <DrawerContent>Content</DrawerContent>
    </Drawer>
  );

  const drawer = screen.getByTestId('drawer');
  expect(drawer).toHaveClass('MuiDrawer-anchorLeft');
});

test('renders with glass variant styling', () => {
  render(
    <Drawer open={true} onClose={() => {}} variant="glass">
      <DrawerContent>Content</DrawerContent>
    </Drawer>
  );

  const drawer = screen.getByTestId('drawer');
  expect(drawer).toBeInTheDocument();
  // Test for glass effect styles if needed
});

test('renders persistent variant', () => {
  render(
    <Drawer open={true} onClose={() => {}} persistent={true}>
      <DrawerContent>Content</DrawerContent>
    </Drawer>
  );

  const drawer = screen.getByTestId('drawer');
  expect(drawer).toHaveClass('MuiDrawer-variantPersistent');
});
```

#### 5. Testing Content and Accessibility

```tsx
test('renders header content correctly', () => {
  render(
    <Drawer open={true} onClose={() => {}}>
      <DrawerHeader>Navigation Menu</DrawerHeader>
      <DrawerContent>Menu Items</DrawerContent>
    </Drawer>
  );

  expect(screen.getByText('Navigation Menu')).toBeInTheDocument();
  expect(screen.getByText('Menu Items')).toBeInTheDocument();
});

test('maintains accessibility attributes', () => {
  render(
    <Drawer open={true} onClose={() => {}}>
      <DrawerHeader onClose={() => {}}>Settings</DrawerHeader>
      <DrawerContent>Content</DrawerContent>
    </Drawer>
  );

  const closeButton = screen.getByTestId('drawer-close');
  expect(closeButton).toHaveAttribute('aria-label', 'Close drawer');
});
```

#### 6. Testing with Playwright

```tsx
import { test, expect } from '@playwright/test';

test('drawer opens and closes correctly', async ({ page }) => {
  await page.goto('/drawer-demo');

  // Open drawer
  await page.click('[data-testid="open-drawer-button"]');
  await expect(page.locator('[data-testid="drawer"]')).toBeVisible();
  await expect(page.locator('[data-testid="drawer-header"]')).toBeVisible();

  // Close drawer
  await page.click('[data-testid="drawer-close"]');
  await expect(page.locator('[data-testid="drawer"]')).not.toBeVisible();
});

test('drawer closes on escape key', async ({ page }) => {
  await page.goto('/drawer-demo');

  await page.click('[data-testid="open-drawer-button"]');
  await expect(page.locator('[data-testid="drawer"]')).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(page.locator('[data-testid="drawer"]')).not.toBeVisible();
});

test('drawer respects backdrop clicks', async ({ page }) => {
  await page.goto('/drawer-demo');

  await page.click('[data-testid="open-drawer-button"]');
  await expect(page.locator('[data-testid="drawer"]')).toBeVisible();

  // Click backdrop
  await page.locator('.MuiBackdrop-root').click({ position: { x: 10, y: 10 } });
  await expect(page.locator('[data-testid="drawer"]')).not.toBeVisible();
});
```

### Common Test Scenarios

#### Navigation Drawer Test

```tsx
test('navigation drawer contains all menu items', () => {
  render(
    <Drawer open={true} onClose={() => {}} dataTestId="nav-drawer">
      <DrawerHeader dataTestId="nav-drawer-header">Navigation</DrawerHeader>
      <DrawerContent dataTestId="nav-drawer-content">
        <nav>
          <a href="/dashboard">Dashboard</a>
          <a href="/settings">Settings</a>
          <a href="/profile">Profile</a>
        </nav>
      </DrawerContent>
    </Drawer>
  );

  const content = screen.getByTestId('nav-drawer-content');
  expect(within(content).getByText('Dashboard')).toBeInTheDocument();
  expect(within(content).getByText('Settings')).toBeInTheDocument();
  expect(within(content).getByText('Profile')).toBeInTheDocument();
});
```

#### Filter Panel Test

```tsx
test('filter drawer applies filters correctly', async () => {
  const user = userEvent.setup();
  const handleApplyFilters = vi.fn();

  render(
    <Drawer open={true} onClose={() => {}} dataTestId="filter-drawer">
      <DrawerHeader dataTestId="filter-drawer-header">Filters</DrawerHeader>
      <DrawerContent dataTestId="filter-drawer-content">
        <form onSubmit={handleApplyFilters}>
          <input type="text" placeholder="Search" />
          <button type="submit">Apply Filters</button>
        </form>
      </DrawerContent>
    </Drawer>
  );

  const input = screen.getByPlaceholderText('Search');
  await user.type(input, 'test query');

  const submitButton = screen.getByText('Apply Filters');
  await user.click(submitButton);

  expect(handleApplyFilters).toHaveBeenCalled();
});
```

#### Settings Panel Test

```tsx
test('settings drawer persists state', () => {
  const { rerender } = render(
    <Drawer open={true} onClose={() => {}} persistent={true} dataTestId="settings-drawer">
      <DrawerHeader dataTestId="settings-drawer-header">Settings</DrawerHeader>
      <DrawerContent dataTestId="settings-drawer-content">
        Settings Content
      </DrawerContent>
    </Drawer>
  );

  expect(screen.getByTestId('settings-drawer')).toBeInTheDocument();

  // Rerender with open=false, but persistent drawer stays in DOM
  rerender(
    <Drawer open={false} onClose={() => {}} persistent={true} dataTestId="settings-drawer">
      <DrawerHeader dataTestId="settings-drawer-header">Settings</DrawerHeader>
      <DrawerContent dataTestId="settings-drawer-content">
        Settings Content
      </DrawerContent>
    </Drawer>
  );

  // Still in DOM due to persistent variant
  expect(screen.getByTestId('settings-drawer')).toBeInTheDocument();
});
```

### Integration Testing Tips

1. **Test drawer state management** - Ensure drawer open/close state is properly managed
2. **Test focus management** - Verify focus is trapped within drawer when open
3. **Test keyboard interactions** - Ensure Escape key closes the drawer
4. **Test responsive behavior** - Test drawer on different screen sizes
5. **Test with animations** - Use appropriate waiting strategies for transitions
6. **Test accessibility** - Verify ARIA attributes and screen reader support
7. **Test backdrop behavior** - Ensure backdrop clicks work as expected
8. **Test persistent mode** - Verify drawer stays in DOM when using persistent variant
