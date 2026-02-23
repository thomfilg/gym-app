# Avatar Component

## Overview

The Avatar component displays user profile pictures, initials, or icons in a visually appealing format. It provides comprehensive fallback mechanisms when images fail to load and supports various sizes, variants, and visual effects.

## Features

- **Image Support**: Display user profile pictures with automatic loading states
- **Fallback Handling**: Graceful degradation to initials or icons when images fail
- **Multiple Variants**: Circle, square, rounded, and status indicator variants
- **Size Options**: Six predefined sizes from xs to xxl
- **Visual Effects**: Glow, pulse, and bordered styles
- **Status Indicators**: Online, offline, away, and busy status badges
- **Theme Integration**: Full MUI theme color support
- **Accessibility**: WCAG 2.1 AA compliant with proper ARIA attributes
- **Interactive States**: Hover, focus, and click interactions
- **Group Support**: AvatarGroup for displaying multiple avatars with overflow handling
- **Loading States**: Shimmer animation during image loading
- **Error Handling**: Automatic fallback display on image load errors

## Usage

### Basic Usage

```tsx
import { Avatar } from '@procurement/ui';

// With image
<Avatar
  src="/path/to/image.jpg"
  alt="User Name"
/>

// With fallback text
<Avatar fallback="JD" />

// With icon
<Avatar icon={<PersonIcon />} />
```

### Size Variations

```tsx
<Avatar fallback="XS" size="xs" />  // 24x24px
<Avatar fallback="SM" size="sm" />  // 32x32px
<Avatar fallback="MD" size="md" />  // 40x40px (default)
<Avatar fallback="LG" size="lg" />  // 48x48px
<Avatar fallback="XL" size="xl" />  // 64x64px
<Avatar fallback="XXL" size="xxl" /> // 80x80px
```

### Variants

```tsx
// Circle (default)
<Avatar variant="circle" fallback="CI" />

// Square
<Avatar variant="square" fallback="SQ" />

// Rounded
<Avatar variant="rounded" fallback="RN" />

// With status indicator
<Avatar variant="status" status="online" fallback="ON" />
```

### Visual Effects

```tsx
// Glow effect
<Avatar glow fallback="GL" />

// Pulse animation
<Avatar pulse fallback="PL" />

// Bordered
<Avatar bordered fallback="BD" />

// Combined effects
<Avatar glow pulse bordered fallback="CB" />
```

### Status Indicators

```tsx
<Avatar variant="status" status="online" fallback="ON" />
<Avatar variant="status" status="offline" fallback="OF" />
<Avatar variant="status" status="away" fallback="AW" />
<Avatar variant="status" status="busy" fallback="BS" />
```

### Interactive Avatars

```tsx
// Clickable avatar
<Avatar
  interactive
  onClick={handleClick}
  fallback="CL"
/>

// With custom interaction handler
<Avatar
  onClick={(e) => console.log('Avatar clicked')}
  fallback="IN"
/>
```

### Avatar Groups

```tsx
import { AvatarGroup } from '@procurement/ui';

<AvatarGroup max={3} overlap={8}>
  <Avatar fallback="A1" />
  <Avatar fallback="A2" />
  <Avatar fallback="A3" />
  <Avatar fallback="A4" />
  <Avatar fallback="A5" />
</AvatarGroup>;
// Displays first 3 avatars plus "+2" overflow indicator
```

### Loading States

```tsx
// Manual loading state
<Avatar loading fallback="LD" />

// Automatic loading during image fetch
<Avatar src="/slow-loading-image.jpg" fallback="SL" />
```

### Error Handling

```tsx
<Avatar
  src="/invalid-image.jpg"
  fallback="ER"
  onError={(e) => console.log('Image failed to load')}
  showFallbackOnError={true}
/>
```

### Theme Integration

```tsx
// Using theme colors
<Avatar color="primary" fallback="PR" />
<Avatar color="secondary" fallback="SC" />
<Avatar color="error" fallback="ER" />
<Avatar color="warning" fallback="WN" />
<Avatar color="success" fallback="SU" />
<Avatar color="neutral" fallback="NT" />
```

## Props

| Prop                  | Type                                                                         | Default     | Description                                            |
| --------------------- | ---------------------------------------------------------------------------- | ----------- | ------------------------------------------------------ |
| `variant`             | `'circle' \| 'square' \| 'rounded' \| 'status'`                              | `'circle'`  | Shape variant of the avatar                            |
| `size`                | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'xxl'`                              | `'md'`      | Size of the avatar                                     |
| `src`                 | `string`                                                                     | -           | Image URL for the avatar                               |
| `alt`                 | `string`                                                                     | -           | Alternative text for the image                         |
| `fallback`            | `string \| ReactNode`                                                        | -           | Content to display when image is not available         |
| `icon`                | `ReactNode`                                                                  | -           | Icon to display instead of image or text               |
| `glow`                | `boolean`                                                                    | `false`     | Apply glow effect to the avatar                        |
| `pulse`               | `boolean`                                                                    | `false`     | Apply pulse animation to the avatar                    |
| `bordered`            | `boolean`                                                                    | `false`     | Add border to the avatar                               |
| `status`              | `'online' \| 'offline' \| 'away' \| 'busy'`                                  | -           | Status indicator (requires variant="status")           |
| `color`               | `'primary' \| 'secondary' \| 'error' \| 'warning' \| 'success' \| 'neutral'` | `'primary'` | Theme color for the avatar background                  |
| `loading`             | `boolean`                                                                    | `false`     | Show loading state with shimmer effect                 |
| `interactive`         | `boolean`                                                                    | `false`     | Enable interactive hover/focus states                  |
| `onClick`             | `(event: MouseEvent) => void`                                                | -           | Click handler (automatically makes avatar interactive) |
| `onError`             | `(event: SyntheticEvent) => void`                                            | -           | Error handler for image load failures                  |
| `showFallbackOnError` | `boolean`                                                                    | `true`      | Show fallback content when image fails to load         |
| `animationDelay`      | `number`                                                                     | `0`         | Delay before fade-in animation (ms)                    |
| `className`           | `string`                                                                     | -           | Additional CSS classes                                 |
| `children`            | `ReactNode`                                                                  | -           | Custom content for the avatar                          |
| `dataTestId`          | `string`                                                                     | -           | Test ID for automated testing                          |

## AvatarGroup Props

| Prop         | Type        | Default | Description                          |
| ------------ | ----------- | ------- | ------------------------------------ |
| `max`        | `number`    | `4`     | Maximum number of avatars to display |
| `overlap`    | `number`    | `8`     | Pixel overlap between avatars        |
| `className`  | `string`    | -       | Additional CSS classes               |
| `children`   | `ReactNode` | -       | Avatar components to group           |
| `dataTestId` | `string`    | -       | Test ID for automated testing        |

## Accessibility

The Avatar component is fully accessible with:

- **ARIA Labels**: Proper aria-label attributes for screen readers
- **Alt Text**: Support for alt text on images
- **Keyboard Navigation**: Full keyboard support for interactive avatars
- **Focus Management**: Clear focus indicators with proper outline
- **Role Attributes**: Correct role="button" for interactive avatars
- **Status Announcements**: Screen reader friendly status indicators
- **Color Contrast**: WCAG 2.1 AA compliant color combinations

### Best Practices

1. Always provide `alt` text for image avatars
2. Use descriptive `aria-label` for icon-only avatars
3. Include status descriptions for screen readers when using status indicators
4. Ensure sufficient color contrast between avatar background and text
5. Use semantic HTML and proper ARIA attributes

## Examples

### User Profile Card

```tsx
<Card>
  <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
    <Avatar src="/user-profile.jpg" alt="John Doe" size="lg" bordered />
    <Box>
      <Typography variant="h6">John Doe</Typography>
      <Typography variant="body2" color="text.secondary">
        Senior Developer
      </Typography>
    </Box>
  </CardContent>
</Card>
```

### Team Members List

```tsx
<AvatarGroup max={5}>
  {teamMembers.map((member) => (
    <Avatar key={member.id} src={member.avatar} alt={member.name} fallback={member.initials} />
  ))}
</AvatarGroup>
```

### Status Indicator in Chat

```tsx
<ListItem>
  <ListItemAvatar>
    <Avatar variant="status" status={user.status} src={user.avatar} fallback={user.initials} />
  </ListItemAvatar>
  <ListItemText primary={user.name} secondary={user.lastMessage} />
</ListItem>
```

## Performance Considerations

- Images are lazy-loaded with loading states
- Animations use CSS transforms for better performance
- Shimmer effects use CSS animations instead of JavaScript
- Component uses React.memo for optimization when appropriate
- Proper image sizing prevents layout shifts

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support with touch interactions

## Testing

The Avatar component includes comprehensive test IDs for automated testing. Use the `dataTestId` prop to enable test identification.

### Test ID Structure

When `dataTestId` is provided, the following test IDs are automatically generated:

| Element              | Test ID Pattern              | Description                                      |
| -------------------- | ---------------------------- | ------------------------------------------------ |
| Main Avatar          | `{dataTestId}`               | The main avatar container element                |
| Image Content        | `{dataTestId}-children`      | When custom children are rendered                |
| Fallback Content     | `{dataTestId}-fallback`      | When fallback text/initials are displayed        |
| Icon Content         | `{dataTestId}-icon`          | When an icon is displayed                        |
| Default Content      | `{dataTestId}-default`       | When default Person icon is displayed            |
| Loading Overlay      | `{dataTestId}-loading`       | Loading state overlay with spinner               |
| Status Badge         | `{dataTestId}-badge`         | Status indicator badge (variant="status")        |
| AvatarGroup          | `{dataTestId}`               | The AvatarGroup container                        |
| Overflow Avatar      | `{dataTestId}-overflow`      | The "+N" overflow counter avatar in AvatarGroup  |

### Testing Examples

#### Basic Avatar Tests

```tsx
import { render, screen } from '@testing-library/react';
import { Avatar } from '@procurement/ui';

describe('Avatar', () => {
  it('should render with image', () => {
    render(<Avatar src="/user.jpg" alt="John Doe" dataTestId="user-avatar" />);
    const avatar = screen.getByTestId('user-avatar');
    expect(avatar).toBeInTheDocument();
  });

  it('should display fallback text', () => {
    render(<Avatar fallback="JD" dataTestId="user-avatar" />);
    const fallback = screen.getByTestId('user-avatar-fallback');
    expect(fallback).toHaveTextContent('JD');
  });

  it('should show loading state', () => {
    render(<Avatar loading dataTestId="user-avatar" />);
    const loadingOverlay = screen.getByTestId('user-avatar-loading');
    expect(loadingOverlay).toBeInTheDocument();
  });

  it('should display icon', () => {
    render(<Avatar icon={<PersonIcon />} dataTestId="user-avatar" />);
    const iconContent = screen.getByTestId('user-avatar-icon');
    expect(iconContent).toBeInTheDocument();
  });
});
```

#### Status Badge Tests

```tsx
it('should render status badge', () => {
  render(
    <Avatar
      variant="status"
      status="online"
      fallback="JD"
      dataTestId="status-avatar"
    />
  );
  const badge = screen.getByTestId('status-avatar-badge');
  expect(badge).toBeInTheDocument();
});

it('should not render badge without status variant', () => {
  render(<Avatar fallback="JD" dataTestId="regular-avatar" />);
  const badge = screen.queryByTestId('regular-avatar-badge');
  expect(badge).not.toBeInTheDocument();
});
```

#### Interactive Avatar Tests

```tsx
import { render, screen, fireEvent } from '@testing-library/react';

it('should handle click events', () => {
  const handleClick = vi.fn();
  render(
    <Avatar
      interactive
      onClick={handleClick}
      fallback="CL"
      dataTestId="clickable-avatar"
    />
  );

  const avatar = screen.getByTestId('clickable-avatar');
  fireEvent.click(avatar);
  expect(handleClick).toHaveBeenCalledTimes(1);
});

it('should be keyboard accessible', () => {
  render(<Avatar interactive fallback="KB" dataTestId="keyboard-avatar" />);
  const avatar = screen.getByTestId('keyboard-avatar');

  expect(avatar).toHaveAttribute('tabIndex', '0');
  expect(avatar).toHaveAttribute('role', 'button');
});
```

#### Image Error Handling Tests

```tsx
it('should display fallback on image error', async () => {
  render(
    <Avatar
      src="/broken-image.jpg"
      fallback="ER"
      dataTestId="error-avatar"
      showFallbackOnError
    />
  );

  const avatar = screen.getByTestId('error-avatar');
  const img = avatar.querySelector('img');

  // Trigger image error
  fireEvent.error(img!);

  // Fallback should be displayed
  const fallback = await screen.findByTestId('error-avatar-fallback');
  expect(fallback).toHaveTextContent('ER');
});
```

#### AvatarGroup Tests

```tsx
it('should render avatar group with overflow', () => {
  render(
    <AvatarGroup max={3} dataTestId="team-avatars">
      <Avatar fallback="A1" />
      <Avatar fallback="A2" />
      <Avatar fallback="A3" />
      <Avatar fallback="A4" />
      <Avatar fallback="A5" />
    </AvatarGroup>
  );

  const group = screen.getByTestId('team-avatars');
  expect(group).toBeInTheDocument();

  const overflow = screen.getByTestId('team-avatars-overflow');
  expect(overflow).toHaveTextContent('+2');
});

it('should not render overflow when under max', () => {
  render(
    <AvatarGroup max={5} dataTestId="small-team">
      <Avatar fallback="A1" />
      <Avatar fallback="A2" />
    </AvatarGroup>
  );

  const overflow = screen.queryByTestId('small-team-overflow');
  expect(overflow).not.toBeInTheDocument();
});
```

#### Size and Variant Tests

```tsx
it('should render different sizes', () => {
  const { rerender } = render(<Avatar size="xs" fallback="XS" dataTestId="sized-avatar" />);
  let avatar = screen.getByTestId('sized-avatar');
  expect(avatar).toHaveStyle({ width: '24px', height: '24px' });

  rerender(<Avatar size="xl" fallback="XL" dataTestId="sized-avatar" />);
  avatar = screen.getByTestId('sized-avatar');
  expect(avatar).toHaveStyle({ width: '64px', height: '64px' });
});

it('should apply variant styles', () => {
  const { rerender } = render(
    <Avatar variant="circle" fallback="CI" dataTestId="variant-avatar" />
  );
  let avatar = screen.getByTestId('variant-avatar');
  expect(avatar).toHaveStyle({ borderRadius: '50%' });

  rerender(<Avatar variant="square" fallback="SQ" dataTestId="variant-avatar" />);
  avatar = screen.getByTestId('variant-avatar');
  expect(avatar).toHaveStyle({ borderRadius: '0' });
});
```

#### Accessibility Tests

```tsx
it('should have proper ARIA attributes', () => {
  render(
    <Avatar
      src="/user.jpg"
      alt="John Doe"
      dataTestId="accessible-avatar"
    />
  );

  const avatar = screen.getByTestId('accessible-avatar');
  expect(avatar).toHaveAttribute('aria-label', 'John Doe');
});

it('should use custom aria-label', () => {
  render(
    <Avatar
      fallback="JD"
      aria-label="User Profile Picture"
      dataTestId="custom-aria-avatar"
    />
  );

  const avatar = screen.getByTestId('custom-aria-avatar');
  expect(avatar).toHaveAttribute('aria-label', 'User Profile Picture');
});
```

#### Visual Effects Tests

```tsx
it('should apply glow effect', () => {
  render(<Avatar glow fallback="GL" dataTestId="glow-avatar" />);
  const avatar = screen.getByTestId('glow-avatar');
  expect(avatar).toHaveStyle({ boxShadow: expect.stringContaining('0 0 20px') });
});

it('should apply pulse animation', () => {
  render(<Avatar pulse fallback="PL" dataTestId="pulse-avatar" />);
  const avatar = screen.getByTestId('pulse-avatar');
  const styles = window.getComputedStyle(avatar);
  expect(styles.position).toBe('relative');
});

it('should apply bordered style', () => {
  render(<Avatar bordered fallback="BD" dataTestId="bordered-avatar" />);
  const avatar = screen.getByTestId('bordered-avatar');
  expect(avatar).toHaveStyle({ border: expect.stringContaining('2px solid') });
});
```

### Testing Best Practices

1. **Always provide dataTestId**: Include `dataTestId` for all avatars in your application
2. **Test content types**: Verify correct content rendering (image, fallback, icon)
3. **Test loading states**: Ensure loading indicators appear and disappear correctly
4. **Test error scenarios**: Verify fallback behavior when images fail to load
5. **Test interactions**: Validate click handlers and keyboard navigation
6. **Test accessibility**: Ensure ARIA attributes and screen reader support
7. **Test visual effects**: Verify glow, pulse, and other visual enhancements
8. **Test groups**: Validate AvatarGroup overflow counting and layout

### Integration Testing

For E2E testing with Playwright:

```typescript
import { test, expect } from '@playwright/test';

test('avatar displays user profile', async ({ page }) => {
  await page.goto('/profile');

  const avatar = page.getByTestId('user-avatar');
  await expect(avatar).toBeVisible();

  // Check if image loaded
  const img = avatar.locator('img');
  await expect(img).toHaveAttribute('src', /user-profile/);
});

test('avatar group shows overflow count', async ({ page }) => {
  await page.goto('/team');

  const avatarGroup = page.getByTestId('team-avatars');
  await expect(avatarGroup).toBeVisible();

  const overflow = page.getByTestId('team-avatars-overflow');
  await expect(overflow).toContainText('+');
});

test('interactive avatar responds to clicks', async ({ page }) => {
  await page.goto('/profile');

  const avatar = page.getByTestId('clickable-avatar');
  await avatar.click();

  // Verify navigation or modal opened
  await expect(page).toHaveURL(/profile-details/);
});
```

## Related Components

- [Badge](../Badge/Badge.md) - For notification indicators
- [Chip](../Chip/Chip.md) - For compact user representations
- [Skeleton](../../layout/Skeleton/Skeleton.md) - For loading placeholders
