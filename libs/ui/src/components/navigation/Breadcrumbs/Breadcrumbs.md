# Breadcrumbs Component

A hierarchical navigation component that displays a user's current location within a website structure and allows easy navigation to parent levels.

## Purpose

The Breadcrumbs component provides clear navigation hierarchy, showing users exactly where they are in the application and allowing them to navigate back to parent levels with a single click. It supports various visual styles, responsive behavior, and comprehensive accessibility features.

## Props

### BreadcrumbsProps

| Prop               | Type                                                              | Default     | Description                                        |
| ------------------ | ----------------------------------------------------------------- | ----------- | -------------------------------------------------- |
| `variant`          | `'default' \| 'glass' \| 'elevated' \| 'outlined'`                | `'default'` | Visual appearance variant                          |
| `separatorType`    | `'default' \| 'slash' \| 'arrow' \| 'chevron' \| 'dot' \| 'pipe'` | `'default'` | Type of separator between items                    |
| `items`            | `BreadcrumbItem[]`                                                | -           | **Required.** Array of breadcrumb items            |
| `separator`        | `ReactNode`                                                       | -           | Custom separator element (overrides separatorType) |
| `maxItems`         | `number`                                                          | `8`         | Maximum items before collapsing                    |
| `mobileMaxItems`   | `number`                                                          | `3`         | Maximum items on mobile devices                    |
| `collapseBehavior` | `'menu' \| 'ellipsis'`                                            | `'menu'`    | How to handle collapsed items                      |
| `showHomeIcon`     | `boolean`                                                         | `true`      | Whether to show home icon for first item           |
| `size`             | `'sm' \| 'md' \| 'lg'`                                            | `'md'`      | Component size                                     |
| `color`            | `'default' \| 'primary' \| 'secondary'`                           | `'default'` | Color scheme                                       |
| `elevation`        | `0 \| 1 \| 2 \| 3 \| 4 \| 5`                                      | `1`         | Elevation for glass/elevated variants              |
| `ariaLabel`        | `string`                                                          | -           | Custom aria-label for navigation                   |
| `dataTestId`       | `string`                                                          | -           | Test ID for automated testing                      |

### BreadcrumbItem

| Prop        | Type              | Default | Description                         |
| ----------- | ----------------- | ------- | ----------------------------------- |
| `label`     | `string`          | -       | **Required.** Display text          |
| `href`      | `string`          | -       | Link URL                            |
| `icon`      | `ReactNode`       | -       | Icon before label                   |
| `active`    | `boolean`         | `false` | Whether this is current/active item |
| `onClick`   | `(event) => void` | -       | Click handler                       |
| `tooltip`   | `string`          | -       | Tooltip text on hover               |
| `ariaLabel` | `string`          | -       | Custom aria-label                   |

## Basic Usage

```tsx
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';

const items = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Electronics', href: '/products/electronics' },
  { label: 'Smartphones', active: true },
];

<Breadcrumbs items={items} />;
```

## Visual Variants

### Default

Standard breadcrumbs with minimal styling.

```tsx
<Breadcrumbs variant="default" items={items} />
```

### Glass Morphism

Modern glass effect with backdrop blur.

```tsx
<Breadcrumbs variant="glass" items={items} />
```

### Elevated

Card-like appearance with shadow.

```tsx
<Breadcrumbs variant="elevated" elevation={2} items={items} />
```

### Outlined

Simple border outline style.

```tsx
<Breadcrumbs variant="outlined" items={items} />
```

## Separator Types

Control the visual separator between breadcrumb items:

```tsx
<Breadcrumbs separatorType="slash" items={items} />
<Breadcrumbs separatorType="arrow" items={items} />
<Breadcrumbs separatorType="chevron" items={items} />
<Breadcrumbs separatorType="dot" items={items} />
<Breadcrumbs separatorType="pipe" items={items} />
```

## Responsive Behavior

Automatically collapses on smaller screens:

```tsx
<Breadcrumbs
  items={items}
  maxItems={8}
  mobileMaxItems={3}
  collapseBehavior="menu" // or "ellipsis"
/>
```

## Accessibility Features

- **ARIA Support**: Proper `role="navigation"` and `aria-label` attributes
- **Keyboard Navigation**: Full keyboard support with Tab and Enter
- **Screen Reader**: Accessible labels and structure
- **Focus Management**: Clear focus indicators and logical tab order

### Accessibility Example

```tsx
<Breadcrumbs items={items} ariaLabel="Page navigation breadcrumb" />
```

## Interactive Features

### With Icons

```tsx
const itemsWithIcons = [
  { label: 'Home', href: '/', icon: <HomeIcon /> },
  { label: 'Products', href: '/products', icon: <ShoppingIcon /> },
  { label: 'Current Page', active: true },
];

<Breadcrumbs items={itemsWithIcons} />;
```

### With Click Handlers

```tsx
const handleBreadcrumbClick = (event, href) => {
  event.preventDefault();
  // Custom navigation logic
  router.push(href);
};

const clickableItems = [
  { label: 'Home', href: '/', onClick: handleBreadcrumbClick },
  { label: 'Products', href: '/products', onClick: handleBreadcrumbClick },
  { label: 'Current', active: true },
];
```

### With Tooltips

```tsx
const itemsWithTooltips = [
  { label: 'Home', href: '/', tooltip: 'Go to homepage' },
  { label: 'Products', href: '/products', tooltip: 'Browse all products' },
  { label: 'Current', active: true, tooltip: 'Current page' },
];
```

## Sizing

```tsx
<Breadcrumbs size="sm" items={items} />
<Breadcrumbs size="md" items={items} />
<Breadcrumbs size="lg" items={items} />
```

## Color Schemes

```tsx
<Breadcrumbs color="default" items={items} />
<Breadcrumbs color="primary" items={items} />
<Breadcrumbs color="secondary" items={items} />
```

## Best Practices

### Navigation Structure

- Always include a "Home" or root level item
- Ensure breadcrumbs reflect the actual site hierarchy
- Keep labels concise but descriptive
- Use the `active` prop for the current page

### Responsive Design

- Set appropriate `mobileMaxItems` for mobile experience
- Consider using `collapseBehavior="ellipsis"` for simpler mobile layouts
- Test on various screen sizes

### Accessibility

- Provide meaningful `ariaLabel` attributes
- Use semantic HTML structure
- Ensure adequate color contrast
- Test with screen readers

### Performance

- Avoid excessive nesting levels (keep under 8 items)
- Use `maxItems` prop to prevent overcrowding
- Consider lazy loading for dynamic breadcrumb data

## Common Patterns

### E-commerce Navigation

```tsx
const ecommerceItems = [
  { label: 'Home', href: '/', icon: <HomeIcon /> },
  { label: 'Electronics', href: '/electronics' },
  { label: 'Smartphones', href: '/electronics/smartphones' },
  { label: 'iPhone', active: true },
];

<Breadcrumbs variant="outlined" items={ecommerceItems} showHomeIcon={true} maxItems={6} />;
```

### Admin Dashboard

```tsx
const adminItems = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Users', href: '/admin/users' },
  { label: 'Edit User', active: true },
];

<Breadcrumbs variant="glass" color="primary" items={adminItems} separatorType="chevron" />;
```

### Documentation Site

```tsx
const docsItems = [
  { label: 'Docs', href: '/docs' },
  { label: 'Components', href: '/docs/components' },
  { label: 'Navigation', href: '/docs/components/navigation' },
  { label: 'Breadcrumbs', active: true },
];

<Breadcrumbs variant="elevated" items={docsItems} separatorType="arrow" size="sm" />;
```

## Testing

The Breadcrumbs component includes comprehensive test IDs for automated testing.

### Test IDs

All test IDs follow a consistent pattern and can be customized using the `dataTestId` prop.

| Element                    | Default Test ID                       | With Custom `dataTestId="nav"`       | Description                          |
| -------------------------- | ------------------------------------- | ------------------------------------ | ------------------------------------ |
| Container                  | `breadcrumbs`                         | `nav`                                | Main breadcrumbs container           |
| Breadcrumb item (active)   | `breadcrumbs-item-{index}`            | `nav-item-{index}`                   | Active/current breadcrumb item       |
| Breadcrumb link            | `breadcrumbs-link-{index}`            | `nav-link-{index}`                   | Clickable breadcrumb link            |
| Collapsed menu button      | `breadcrumbs-collapsed-menu`          | `nav-collapsed-menu`                 | Menu button for collapsed items      |
| Collapsed menu container   | `breadcrumbs-collapsed-menu-items`    | `nav-collapsed-menu-items`           | Container for collapsed items        |
| Collapsed menu item        | `breadcrumbs-collapsed-item-{index}`  | `nav-collapsed-item-{index}`         | Individual collapsed breadcrumb item |
| Ellipsis indicator         | `breadcrumbs-ellipsis`                | `nav-ellipsis`                       | Ellipsis "..." indicator             |

### Testing Best Practices

#### Basic Component Rendering

```tsx
import { render, screen } from '@testing-library/react';
import { Breadcrumbs } from './Breadcrumbs';

test('renders breadcrumbs with all items', () => {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Current Page', active: true },
  ];

  render(<Breadcrumbs items={items} />);

  // Verify container exists
  expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();

  // Verify links are rendered
  expect(screen.getByTestId('breadcrumbs-link-0')).toHaveTextContent('Home');
  expect(screen.getByTestId('breadcrumbs-link-1')).toHaveTextContent('Products');

  // Verify active item
  expect(screen.getByTestId('breadcrumbs-item-2')).toHaveTextContent('Current Page');
});
```

#### Testing with Custom Test ID

```tsx
test('uses custom dataTestId', () => {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'About', active: true },
  ];

  render(<Breadcrumbs items={items} dataTestId="custom-nav" />);

  expect(screen.getByTestId('custom-nav')).toBeInTheDocument();
  expect(screen.getByTestId('custom-nav-link-0')).toBeInTheDocument();
  expect(screen.getByTestId('custom-nav-item-1')).toBeInTheDocument();
});
```

#### Testing Navigation

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('navigates when breadcrumb is clicked', async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn((e) => e.preventDefault());

  const items = [
    { label: 'Home', href: '/', onClick: handleClick },
    { label: 'Current', active: true },
  ];

  render(<Breadcrumbs items={items} />);

  const homeLink = screen.getByTestId('breadcrumbs-link-0');
  await user.click(homeLink);

  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

#### Testing Collapsed Behavior

```tsx
test('shows collapsed menu when items exceed maxItems', async () => {
  const user = userEvent.setup();
  const items = Array.from({ length: 10 }, (_, i) => ({
    label: `Item ${i}`,
    href: `/item-${i}`,
  }));

  render(<Breadcrumbs items={items} maxItems={4} collapseBehavior="menu" />);

  // Verify collapsed menu button exists
  const collapsedMenu = screen.getByTestId('breadcrumbs-collapsed-menu');
  expect(collapsedMenu).toBeInTheDocument();

  // Click to expand
  await user.click(collapsedMenu);

  // Verify collapsed items container appears
  const collapsedItems = screen.getByTestId('breadcrumbs-collapsed-menu-items');
  expect(collapsedItems).toBeInTheDocument();
});
```

#### Testing Ellipsis Behavior

```tsx
test('shows ellipsis when collapseBehavior is ellipsis', () => {
  const items = Array.from({ length: 10 }, (_, i) => ({
    label: `Item ${i}`,
    href: `/item-${i}`,
  }));

  render(<Breadcrumbs items={items} maxItems={5} collapseBehavior="ellipsis" />);

  expect(screen.getByTestId('breadcrumbs-ellipsis')).toBeInTheDocument();
  expect(screen.getByTestId('breadcrumbs-ellipsis')).toHaveTextContent('...');
});
```

#### Testing Accessibility

```tsx
test('has proper ARIA attributes', () => {
  const items = [
    { label: 'Home', href: '/', ariaLabel: 'Go to homepage' },
    { label: 'Current', active: true },
  ];

  render(<Breadcrumbs items={items} ariaLabel="Site navigation" />);

  const nav = screen.getByTestId('breadcrumbs');
  expect(nav).toHaveAttribute('role', 'navigation');
  expect(nav).toHaveAttribute('aria-label', 'Site navigation');

  const activeItem = screen.getByTestId('breadcrumbs-item-1');
  expect(activeItem).toHaveAttribute('aria-current', 'page');
});
```

### Common Test Scenarios

#### Scenario 1: Testing Visual Variants

```tsx
test('renders with glass variant', () => {
  const items = [{ label: 'Home', href: '/' }];

  render(<Breadcrumbs items={items} variant="glass" dataTestId="glass-nav" />);

  const container = screen.getByTestId('glass-nav');
  expect(container).toBeInTheDocument();
});
```

#### Scenario 2: Testing Mobile Responsive Behavior

```tsx
import { render, screen } from '@testing-library/react';
import { useMediaQuery } from '@mui/material';

// Mock useMediaQuery for mobile
vi.mock('@mui/material', () => ({
  ...vi.importActual('@mui/material'),
  useMediaQuery: vi.fn(),
}));

test('collapses items on mobile', () => {
  (useMediaQuery as vi.Mock).mockReturnValue(true); // Simulate mobile

  const items = Array.from({ length: 6 }, (_, i) => ({
    label: `Item ${i}`,
    href: `/item-${i}`,
  }));

  render(<Breadcrumbs items={items} mobileMaxItems={3} />);

  // On mobile, should show collapsed menu
  expect(screen.getByTestId('breadcrumbs-collapsed-menu')).toBeInTheDocument();
});
```

#### Scenario 3: Testing with Icons

```tsx
import { Home, Settings } from '@mui/icons-material';

test('renders breadcrumbs with custom icons', () => {
  const items = [
    { label: 'Home', href: '/', icon: <Home data-testid="home-icon" /> },
    { label: 'Settings', href: '/settings', icon: <Settings data-testid="settings-icon" /> },
  ];

  render(<Breadcrumbs items={items} showHomeIcon={false} />);

  expect(screen.getByTestId('home-icon')).toBeInTheDocument();
  expect(screen.getByTestId('settings-icon')).toBeInTheDocument();
});
```

#### Scenario 4: Testing Keyboard Navigation

```tsx
test('supports keyboard navigation', async () => {
  const user = userEvent.setup();

  const items = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', active: true },
  ];

  render(<Breadcrumbs items={items} />);

  const firstLink = screen.getByTestId('breadcrumbs-link-0');

  // Tab to first link
  await user.tab();
  expect(firstLink).toHaveFocus();

  // Press Enter
  const handleClick = vi.fn((e) => e.preventDefault());
  firstLink.onclick = handleClick;
  await user.keyboard('{Enter}');

  expect(handleClick).toHaveBeenCalled();
});
```

### Integration with Testing Frameworks

#### Vitest Example

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Breadcrumbs } from './Breadcrumbs';

describe('Breadcrumbs', () => {
  it('renders all breadcrumb items correctly', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics', active: true },
    ];

    render(<Breadcrumbs items={items} dataTestId="test-breadcrumbs" />);

    expect(screen.getByTestId('test-breadcrumbs')).toBeInTheDocument();
    expect(screen.getByTestId('test-breadcrumbs-link-0')).toBeInTheDocument();
    expect(screen.getByTestId('test-breadcrumbs-link-1')).toBeInTheDocument();
    expect(screen.getByTestId('test-breadcrumbs-item-2')).toBeInTheDocument();
  });
});
```

#### Playwright E2E Example

```typescript
import { test, expect } from '@playwright/test';

test('breadcrumbs navigation works correctly', async ({ page }) => {
  await page.goto('/products/electronics/smartphones');

  // Verify breadcrumbs are visible
  await expect(page.getByTestId('breadcrumbs')).toBeVisible();

  // Click on "Products" breadcrumb
  await page.getByTestId('breadcrumbs-link-1').click();

  // Verify navigation occurred
  await expect(page).toHaveURL('/products');
});
```

### Testing Tips

1. **Use custom dataTestId**: For complex pages with multiple breadcrumb components, use unique `dataTestId` values to distinguish between them.

2. **Test dynamic items**: Ensure your tests cover scenarios where breadcrumb items change based on route or state.

3. **Verify accessibility**: Always test ARIA attributes and keyboard navigation to ensure the component is accessible.

4. **Test edge cases**: Include tests for empty items, single item, maximum items, and collapsed behavior.

5. **Mock responsive behavior**: When testing mobile-specific features, mock `useMediaQuery` to simulate different screen sizes.

6. **Test interactions**: Verify that click handlers, tooltips, and navigation work as expected.

## Migration Notes

When migrating from other breadcrumb implementations:

- Convert separator props to `separatorType` enum values
- Restructure data to use `BreadcrumbItem[]` format
- Update accessibility attributes to use new prop names
- Test responsive behavior with new collapse options
- Add `dataTestId` prop to existing test suites for better test reliability
