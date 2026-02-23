# HoverCard Component

## Purpose

The HoverCard component displays additional information in a card-style popup when hovering over a trigger element. It's commonly used for showing contextual information, user details, preview content, or tooltips with rich content without cluttering the main interface.

## Props

### Core Props

- `variant?: 'default' | 'glass' | 'detailed' | 'minimal'` - The visual style of the hover card
- `title?: string` - The title displayed in the hover card
- `description?: string` - The description text displayed below the title
- `children?: React.ReactNode` - Custom content to render inside the hover card
- `trigger?: React.ReactElement` - Custom trigger element that activates the hover card

### Visual Props

- `glow?: boolean` - Adds a glow effect to the card
- `pulse?: boolean` - Adds a pulse animation to the card
- `showArrow?: boolean` - Shows an arrow pointing to the trigger element
- `animation?: 'fade' | 'scale' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right'` - The animation type for entrance/exit
- `avatar?: string | React.ReactElement` - Avatar/image to display (for detailed variant)

### Positioning Props

- `placement?: HoverCardPlacement` - Position relative to trigger ('top', 'bottom', 'left', 'right' and their variants)
- `offset?: number` - Distance from trigger element in pixels (default: 8)
- `maxWidth?: number` - Maximum width of the card (default: 400)

### Interaction Props

- `enterDelay?: number` - Delay before showing the card in milliseconds (default: 700)
- `exitDelay?: number` - Delay before hiding the card in milliseconds (default: 0)
- `touchEnabled?: boolean` - Enable touch/click interaction on mobile devices (default: true)
- `disabled?: boolean` - Disable the hover card

### Loading State Props

- `loading?: boolean` - Show loading state
- `loadingComponent?: React.ReactNode` - Custom loading component

### Event Props

- `onOpen?: () => void` - Callback when the hover card opens
- `onClose?: () => void` - Callback when the hover card closes

## Usage Examples

### Basic Usage

```tsx
<HoverCard title="User Information" description="View detailed user profile">
  <Button>Hover me</Button>
</HoverCard>
```

### With Custom Trigger

```tsx
<HoverCard
  title="Product Details"
  description="Premium features included"
  trigger={
    <IconButton>
      <InfoIcon />
    </IconButton>
  }
/>
```

### Detailed Variant with Avatar

```tsx
<HoverCard
  variant="detailed"
  avatar="/user-avatar.jpg"
  title="John Doe"
  description="Senior Developer"
>
  <Typography>Additional content here</Typography>
</HoverCard>
```

### Glass Effect with Animation

```tsx
<HoverCard
  variant="glass"
  glow
  animation="scale"
  title="Modern UI"
  description="Beautiful glass morphism effect"
>
  <Chip label="Premium" />
</HoverCard>
```

### With Loading State

```tsx
<HoverCard loading={isLoading} loadingComponent={<CustomLoader />} title="Dynamic Content">
  <Link>Hover for details</Link>
</HoverCard>
```

## Accessibility Notes

- The component supports keyboard navigation (Escape key to close)
- Proper ARIA attributes are applied to the popover
- Focus management is handled automatically
- Touch support for mobile devices can be enabled/disabled
- Screen reader friendly with proper labeling

## Best Practices

1. **Content**: Keep hover card content concise and relevant
2. **Delays**: Use appropriate enter/exit delays for better UX
3. **Placement**: Choose placement that doesn't obscure important content
4. **Mobile**: Consider touch interaction for mobile users
5. **Loading**: Provide loading states for dynamic content
6. **Performance**: Avoid heavy content in hover cards
7. **Accessibility**: Ensure content is accessible via keyboard navigation

## Variants Guide

- **default**: Standard card with shadow and border
- **glass**: Glass morphism effect with blur backdrop
- **detailed**: Rich layout with avatar support
- **minimal**: Compact design with minimal styling

## Animation Types

- **fade**: Simple fade in/out
- **scale**: Scale from center point
- **slide-up**: Slide from bottom
- **slide-down**: Slide from top
- **slide-left**: Slide from right
- **slide-right**: Slide from left

## Testing

The HoverCard component provides comprehensive test IDs to facilitate testing and automation.

### Test IDs

| Element | Test ID Pattern | Default Test ID | Description |
|---------|----------------|-----------------|-------------|
| Trigger | `{dataTestId}-trigger` | `hover-card-trigger` | The element that activates the hover card |
| Content | `{dataTestId}` | `hover-card-content` | The hover card content container |
| Title | `{dataTestId}-title` | `hover-card-title` | The title text element |
| Description | `{dataTestId}-description` | `hover-card-description` | The description text element |

### Testing Best Practices

1. **Use Custom Test IDs**: Provide a unique `dataTestId` prop for each HoverCard instance in your application
2. **Test Hover Interactions**: Verify hover card appears and disappears with proper delays
3. **Test Accessibility**: Ensure keyboard navigation works (Escape key closes the card)
4. **Test Touch Support**: Verify touch interaction works on mobile devices
5. **Test Loading States**: Validate loading component appears when `loading` is true
6. **Test Variants**: Verify each variant renders correctly with appropriate styling
7. **Test Placement**: Ensure hover card positions correctly relative to trigger
8. **Test Disabled State**: Verify hover card doesn't appear when `disabled` is true

### Common Test Scenarios

#### Testing Basic Hover Interaction

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HoverCard } from '@components/data-display/HoverCard';

test('shows hover card on mouse enter', async () => {
  const user = userEvent.setup();
  render(
    <HoverCard dataTestId="user-info" title="User Details" description="View profile">
      <button>Hover me</button>
    </HoverCard>
  );

  const trigger = screen.getByTestId('user-info-trigger');

  // Hover over trigger
  await user.hover(trigger);

  // Wait for enter delay
  await waitFor(() => {
    expect(screen.getByTestId('user-info')).toBeInTheDocument();
  });

  // Verify content
  expect(screen.getByTestId('user-info-title')).toHaveTextContent('User Details');
  expect(screen.getByTestId('user-info-description')).toHaveTextContent('View profile');
});
```

#### Testing with Custom Trigger

```tsx
test('works with custom trigger element', async () => {
  const user = userEvent.setup();
  render(
    <HoverCard
      dataTestId="custom-hover"
      title="Help Text"
      trigger={<button>Info</button>}
    />
  );

  const trigger = screen.getByTestId('custom-hover-trigger');
  expect(trigger).toHaveTextContent('Info');

  await user.hover(trigger);

  await waitFor(() => {
    expect(screen.getByTestId('custom-hover')).toBeInTheDocument();
  });
});
```

#### Testing Loading State

```tsx
test('displays loading state correctly', () => {
  render(
    <HoverCard dataTestId="loading-card" loading title="Content">
      <button>Hover</button>
    </HoverCard>
  );

  const trigger = screen.getByTestId('loading-card-trigger');
  await user.hover(trigger);

  await waitFor(() => {
    const content = screen.getByTestId('loading-card');
    expect(within(content).getByRole('progressbar')).toBeInTheDocument();
  });
});
```

#### Testing Disabled State

```tsx
test('does not show hover card when disabled', async () => {
  const user = userEvent.setup();
  render(
    <HoverCard dataTestId="disabled-card" disabled title="Content">
      <button>Hover me</button>
    </HoverCard>
  );

  const trigger = screen.getByTestId('disabled-card-trigger');
  await user.hover(trigger);

  // Wait longer than enter delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  expect(screen.queryByTestId('disabled-card')).not.toBeInTheDocument();
});
```

#### Testing Keyboard Interaction

```tsx
test('closes on Escape key press', async () => {
  const user = userEvent.setup();
  const onClose = jest.fn();

  render(
    <HoverCard dataTestId="keyboard-card" title="Content" onClose={onClose}>
      <button>Hover me</button>
    </HoverCard>
  );

  const trigger = screen.getByTestId('keyboard-card-trigger');
  await user.hover(trigger);

  await waitFor(() => {
    expect(screen.getByTestId('keyboard-card')).toBeInTheDocument();
  });

  // Press Escape key
  await user.keyboard('{Escape}');

  await waitFor(() => {
    expect(screen.queryByTestId('keyboard-card')).not.toBeInTheDocument();
  });
  expect(onClose).toHaveBeenCalled();
});
```

#### Testing with Different Variants

```tsx
test.each([
  ['default', 'Default variant'],
  ['glass', 'Glass variant'],
  ['detailed', 'Detailed variant'],
  ['minimal', 'Minimal variant'],
])('renders %s variant correctly', async (variant, title) => {
  const user = userEvent.setup();
  render(
    <HoverCard
      dataTestId={`${variant}-card`}
      variant={variant}
      title={title}
    >
      <button>Hover</button>
    </HoverCard>
  );

  const trigger = screen.getByTestId(`${variant}-card-trigger`);
  await user.hover(trigger);

  await waitFor(() => {
    const content = screen.getByTestId(`${variant}-card`);
    expect(content).toBeInTheDocument();
    expect(screen.getByTestId(`${variant}-card-title`)).toHaveTextContent(title);
  });
});
```

#### Testing Callbacks

```tsx
test('calls onOpen and onClose callbacks', async () => {
  const user = userEvent.setup();
  const onOpen = jest.fn();
  const onClose = jest.fn();

  render(
    <HoverCard
      dataTestId="callback-card"
      title="Content"
      onOpen={onOpen}
      onClose={onClose}
      enterDelay={100}
      exitDelay={100}
    >
      <button>Hover me</button>
    </HoverCard>
  );

  const trigger = screen.getByTestId('callback-card-trigger');

  // Hover to open
  await user.hover(trigger);
  await waitFor(() => expect(onOpen).toHaveBeenCalledTimes(1));

  // Unhover to close
  await user.unhover(trigger);
  await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
});
```

### Playwright E2E Testing

```typescript
import { test, expect } from '@playwright/test';

test('hover card shows on hover', async ({ page }) => {
  await page.goto('/hover-card-demo');

  // Hover over trigger
  await page.getByTestId('user-info-trigger').hover();

  // Wait for hover card to appear
  await expect(page.getByTestId('user-info')).toBeVisible();

  // Verify content
  await expect(page.getByTestId('user-info-title')).toHaveText('User Details');
  await expect(page.getByTestId('user-info-description')).toHaveText('View profile');

  // Move mouse away
  await page.mouse.move(0, 0);

  // Verify hover card disappears
  await expect(page.getByTestId('user-info')).not.toBeVisible();
});
```

### Integration with Testing Tools

The HoverCard component's test IDs are compatible with:
- **React Testing Library**: Use `getByTestId`, `findByTestId`, `queryByTestId`
- **Playwright**: Use `page.getByTestId()`
- **Cypress**: Use `cy.get('[data-testid="..."]')`
- **Jest**: Standard DOM queries with test ID selectors
