# Card Component

## Overview

The Card component provides a flexible, customizable container for organizing content with consistent styling, padding, and visual hierarchy. It supports multiple visual variants, interactive states, loading states, and comprehensive accessibility features.

## Features

- **Multiple Variants**: elevated, outlined, glass, gradient, neumorphic
- **Interactive States**: hover effects, click handling, focus management
- **Visual Effects**: glow effects, pulse animations, border radius options
- **Loading States**: integrated loading indicator with overlay
- **Responsive Design**: adapts to different screen sizes
- **Accessibility**: full ARIA support and keyboard navigation
- **Sub-components**: CardHeader, CardContent, CardActions, CardMedia

## Usage

### Basic Card

```tsx
import { Card, CardContent } from '@/components/layout/Card';

<Card variant="elevated">
  <CardContent>Basic card content</CardContent>
</Card>;
```

### Interactive Card

```tsx
<Card variant="outlined" interactive onClick={() => console.log('Card clicked')}>
  <CardContent>Click me!</CardContent>
</Card>
```

### Glass Effect Card

```tsx
<Card variant="glass" glow>
  <CardContent>Modern glass effect</CardContent>
</Card>
```

### Complete Card with All Components

```tsx
<Card variant="elevated" interactive>
  <CardMedia image="/path/to/image.jpg" title="Card image" height={200} />
  <CardHeader
    title="Card Title"
    subtitle="Card subtitle"
    avatar={<Avatar>A</Avatar>}
    action={
      <IconButton>
        <MoreVert />
      </IconButton>
    }
  />
  <CardContent>Card content goes here</CardContent>
  <CardActions alignment="right">
    <Button>Cancel</Button>
    <Button variant="contained">Save</Button>
  </CardActions>
</Card>
```

## Props

### Card Props

| Prop         | Type                                                              | Default    | Description                                       |
| ------------ | ----------------------------------------------------------------- | ---------- | ------------------------------------------------- |
| children     | ReactNode                                                         | -          | Content to display within the card                |
| variant      | 'elevated' \| 'outlined' \| 'glass' \| 'gradient' \| 'neumorphic' | 'elevated' | Visual style variant                              |
| interactive  | boolean                                                           | false      | Enables hover/focus states for clickable cards    |
| glow         | boolean                                                           | false      | Adds glow effect around the card                  |
| pulse        | boolean                                                           | false      | Adds pulsing animation effect                     |
| borderRadius | 'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'                  | 'md'       | Border radius size                                |
| loading      | boolean                                                           | false      | Shows loading indicator and disables interactions |
| onClick      | MouseEventHandler                                                 | -          | Click event handler                               |
| onFocus      | FocusEventHandler                                                 | -          | Focus event handler                               |
| onBlur       | FocusEventHandler                                                 | -          | Blur event handler                                |
| dataTestId   | string                                                            | -          | Custom test ID for testing purposes               |

### CardHeader Props

| Prop       | Type      | Default | Description                                   |
| ---------- | --------- | ------- | --------------------------------------------- |
| title      | ReactNode | -       | Primary header text                           |
| subtitle   | ReactNode | -       | Secondary header text                         |
| action     | ReactNode | -       | Action element (usually buttons/icons)        |
| avatar     | ReactNode | -       | Avatar element                                |
| children   | ReactNode | -       | Custom header content (overrides other props) |
| dataTestId | string    | -       | Custom test ID for testing purposes           |

### CardContent Props

| Prop       | Type      | Default | Description                        |
| ---------- | --------- | ------- | ---------------------------------- |
| children   | ReactNode | -       | Content to display                 |
| dense      | boolean   | false   | Reduces padding for compact layout |
| dataTestId | string    | -       | Custom test ID for testing purposes|

### CardActions Props

| Prop           | Type                                             | Default | Description                             |
| -------------- | ------------------------------------------------ | ------- | --------------------------------------- |
| children       | ReactNode                                        | -       | Action buttons/elements                 |
| disableSpacing | boolean                                          | false   | Removes default spacing between actions |
| alignment      | 'left' \| 'center' \| 'right' \| 'space-between' | 'left'  | Alignment of action buttons             |
| dataTestId     | string                                           | -       | Custom test ID for testing purposes     |

### CardMedia Props

| Prop       | Type             | Default | Description                     |
| ---------- | ---------------- | ------- | ------------------------------- |
| component  | ElementType      | 'div'   | Component to render as          |
| image      | string           | -       | Image URL                       |
| title      | string           | -       | Image alt text                  |
| height     | number \| string | 200     | Media height                    |
| children   | ReactNode        | -       | Custom media content            |
| dataTestId | string           | -       | Custom test ID for testing purposes |

## Variants

### Elevated

Default Material Design elevated card with shadow.

### Outlined

Card with border instead of shadow, minimal appearance.

### Glass

Modern glassmorphism effect with backdrop blur.

### Gradient

Card with gradient background and contrast text.

### Neumorphic

Soft UI design with inset/outset shadow effects.

## Accessibility

- Proper ARIA attributes for interactive cards
- Keyboard navigation support (Tab, Enter, Space)
- Focus management with visible focus indicators
- Screen reader compatibility
- Loading state announcements

## Best Practices

1. **Content Organization**: Use CardHeader for titles, CardContent for main content, and CardActions for buttons
2. **Interactive Feedback**: Enable `interactive` prop for clickable cards to provide visual feedback
3. **Loading States**: Use the `loading` prop to prevent interactions during async operations
4. **Accessibility**: Always provide meaningful titles and alt text for media
5. **Performance**: Use appropriate variants - glass effects may impact performance on older devices
6. **Responsive Design**: Test cards across different screen sizes, especially with media content

## Examples

### Product Card

```tsx
<Card variant="elevated" interactive>
  <CardMedia image="/product.jpg" title="Product" height={240} />
  <CardContent>
    <Typography variant="h6">Product Name</Typography>
    <Typography color="text.secondary">$99.99</Typography>
  </CardContent>
  <CardActions>
    <Button size="small">Add to Cart</Button>
    <Button size="small">Learn More</Button>
  </CardActions>
</Card>
```

### Profile Card

```tsx
<Card variant="glass" glow>
  <CardHeader
    avatar={<Avatar src="/avatar.jpg" />}
    title="John Doe"
    subtitle="Software Engineer"
    action={
      <IconButton>
        <Settings />
      </IconButton>
    }
  />
  <CardContent>
    <Typography>Full-stack developer with 5 years of experience in React and Node.js.</Typography>
  </CardContent>
</Card>
```

## Testing

### Test IDs

The Card component and its sub-components provide data-testid attributes for reliable testing.

| Element       | Default Test ID     | With Custom dataTestId        | Description                      |
| ------------- | ------------------- | ----------------------------- | -------------------------------- |
| Card          | `card`              | `{dataTestId}`                | Main card container              |
| CardHeader    | `card-header`       | `{dataTestId}-header`         | Card header section              |
| Card Title    | `card-title`        | `{dataTestId}-title`          | Title text in header             |
| Card Subtitle | `card-subtitle`     | `{dataTestId}-subtitle`       | Subtitle text in header          |
| CardContent   | `card-content`      | `{dataTestId}-content`        | Card content section             |
| CardActions   | `card-actions`      | `{dataTestId}-actions`        | Card actions section             |
| CardMedia     | `card-media`        | `{dataTestId}-media`          | Card media section               |

### Usage Example

```tsx
<Card dataTestId="product-card" variant="elevated" interactive>
  <CardMedia
    dataTestId="product-card-media"
    image="/product.jpg"
    title="Product"
    height={240}
  />
  <CardHeader
    dataTestId="product-card-header"
    title="Product Name"
    subtitle="Product Category"
  />
  <CardContent dataTestId="product-card-content">
    <Typography>Product description</Typography>
  </CardContent>
  <CardActions dataTestId="product-card-actions">
    <Button>Add to Cart</Button>
  </CardActions>
</Card>
```

### Testing Best Practices

#### Basic Component Testing

```tsx
import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardContent, CardActions } from './Card';

test('renders card with all sub-components', () => {
  render(
    <Card dataTestId="test-card">
      <CardHeader
        dataTestId="test-card-header"
        title="Test Title"
        subtitle="Test Subtitle"
      />
      <CardContent dataTestId="test-card-content">
        Test content
      </CardContent>
      <CardActions dataTestId="test-card-actions">
        <button>Action</button>
      </CardActions>
    </Card>
  );

  expect(screen.getByTestId('test-card')).toBeInTheDocument();
  expect(screen.getByTestId('test-card-header')).toBeInTheDocument();
  expect(screen.getByTestId('test-card-title')).toHaveTextContent('Test Title');
  expect(screen.getByTestId('test-card-subtitle')).toHaveTextContent('Test Subtitle');
  expect(screen.getByTestId('test-card-content')).toHaveTextContent('Test content');
  expect(screen.getByTestId('test-card-actions')).toBeInTheDocument();
});
```

#### Testing Interactive Cards

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card, CardContent } from './Card';

test('calls onClick when interactive card is clicked', async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn();

  render(
    <Card dataTestId="interactive-card" interactive onClick={handleClick}>
      <CardContent>Click me</CardContent>
    </Card>
  );

  const card = screen.getByTestId('interactive-card');
  await user.click(card);

  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

#### Testing Loading State

```tsx
import { render, screen } from '@testing-library/react';
import { Card, CardContent } from './Card';

test('shows loading indicator and disables interactions', () => {
  const handleClick = vi.fn();

  render(
    <Card dataTestId="loading-card" loading onClick={handleClick}>
      <CardContent>Content</CardContent>
    </Card>
  );

  const card = screen.getByTestId('loading-card');

  // Loading indicator should be visible
  expect(screen.getByRole('progressbar')).toBeInTheDocument();

  // Card should have reduced opacity
  expect(card).toHaveStyle({ opacity: 0.6 });

  // Click should not trigger handler
  card.click();
  expect(handleClick).not.toHaveBeenCalled();
});
```

#### Testing Different Variants

```tsx
import { render, screen } from '@testing-library/react';
import { Card, CardContent } from './Card';

test.each([
  ['elevated'],
  ['outlined'],
  ['glass'],
  ['gradient'],
  ['neumorphic'],
])('renders %s variant correctly', (variant) => {
  render(
    <Card dataTestId={`card-${variant}`} variant={variant as any}>
      <CardContent>Content</CardContent>
    </Card>
  );

  expect(screen.getByTestId(`card-${variant}`)).toBeInTheDocument();
});
```

#### Testing CardMedia

```tsx
import { render, screen } from '@testing-library/react';
import { Card, CardMedia } from './Card';

test('renders card media with image', () => {
  render(
    <Card>
      <CardMedia
        dataTestId="card-image"
        image="/test-image.jpg"
        title="Test Image"
        height={300}
      />
    </Card>
  );

  const media = screen.getByTestId('card-image');
  expect(media).toBeInTheDocument();
  expect(media).toHaveAttribute('title', 'Test Image');
});
```

### Common Test Scenarios

#### Scenario 1: Product Card with Actions

```tsx
test('product card displays all information and handles actions', async () => {
  const user = userEvent.setup();
  const handleAddToCart = vi.fn();
  const handleViewDetails = vi.fn();

  render(
    <Card dataTestId="product-card" variant="elevated">
      <CardMedia
        dataTestId="product-card-media"
        image="/product.jpg"
        title="Product"
        height={240}
      />
      <CardHeader
        dataTestId="product-card-header"
        title="Laptop"
        subtitle="Electronics"
      />
      <CardContent dataTestId="product-card-content">
        <Typography>High-performance laptop</Typography>
        <Typography>$999.99</Typography>
      </CardContent>
      <CardActions dataTestId="product-card-actions">
        <Button onClick={handleAddToCart}>Add to Cart</Button>
        <Button onClick={handleViewDetails}>View Details</Button>
      </CardActions>
    </Card>
  );

  expect(screen.getByTestId('product-card')).toBeInTheDocument();
  expect(screen.getByTestId('product-card-title')).toHaveTextContent('Laptop');
  expect(screen.getByTestId('product-card-subtitle')).toHaveTextContent('Electronics');
  expect(screen.getByTestId('product-card-content')).toHaveTextContent('$999.99');

  await user.click(screen.getByText('Add to Cart'));
  expect(handleAddToCart).toHaveBeenCalled();

  await user.click(screen.getByText('View Details'));
  expect(handleViewDetails).toHaveBeenCalled();
});
```

#### Scenario 2: Profile Card with Custom Header

```tsx
test('profile card with custom header content', () => {
  render(
    <Card dataTestId="profile-card" variant="glass">
      <CardHeader dataTestId="profile-card-header">
        <Box>
          <Avatar src="/avatar.jpg" />
          <Typography variant="h6">John Doe</Typography>
          <Typography variant="body2">Software Engineer</Typography>
        </Box>
      </CardHeader>
      <CardContent dataTestId="profile-card-content">
        <Typography>Bio information...</Typography>
      </CardContent>
    </Card>
  );

  expect(screen.getByTestId('profile-card')).toBeInTheDocument();
  expect(screen.getByTestId('profile-card-header')).toBeInTheDocument();
  expect(screen.getByText('John Doe')).toBeInTheDocument();
});
```

#### Scenario 3: Conditional Rendering Based on Loading

```tsx
test('switches between loading and loaded states', () => {
  const { rerender } = render(
    <Card dataTestId="async-card" loading>
      <CardContent dataTestId="async-card-content">
        Data content
      </CardContent>
    </Card>
  );

  // Loading state
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  expect(screen.getByTestId('async-card')).toHaveStyle({ opacity: 0.6 });

  // Loaded state
  rerender(
    <Card dataTestId="async-card" loading={false}>
      <CardContent dataTestId="async-card-content">
        Data content
      </CardContent>
    </Card>
  );

  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  expect(screen.getByTestId('async-card')).toHaveStyle({ opacity: 1 });
});
```

#### Scenario 4: Accessibility Testing

```tsx
test('card is accessible with keyboard navigation', async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn();
  const handleFocus = vi.fn();
  const handleBlur = vi.fn();

  render(
    <Card
      dataTestId="accessible-card"
      interactive
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={0}
    >
      <CardContent>Accessible content</CardContent>
    </Card>
  );

  const card = screen.getByTestId('accessible-card');

  // Tab to focus
  await user.tab();
  expect(handleFocus).toHaveBeenCalled();

  // Enter to click
  await user.keyboard('{Enter}');
  expect(handleClick).toHaveBeenCalled();

  // Tab away to blur
  await user.tab();
  expect(handleBlur).toHaveBeenCalled();
});
```

### Visual Regression Testing

For components with visual effects (glow, pulse, different variants), consider using visual regression testing:

```tsx
import { render } from '@testing-library/react';
import { Card, CardContent } from './Card';

test('matches snapshot for glass variant with glow', () => {
  const { container } = render(
    <Card dataTestId="glass-card" variant="glass" glow pulse>
      <CardContent>Visual effects card</CardContent>
    </Card>
  );

  expect(container.firstChild).toMatchSnapshot();
});
```
