# Container Component

A responsive container component that constrains content width and provides consistent padding. Built on MUI Container with enhanced variants and responsive behavior.

## Purpose

The Container component is used to center content horizontally and limit its maximum width for better readability on larger screens. It provides flexible layout constraints and responsive behavior for content organization.

## Props

### Required Props

- `children` (ReactNode): Content to render inside the container

### Optional Props

- `maxWidth` ('xs' | 'sm' | 'md' | 'lg' | 'xl' | false | string): Maximum width constraint (default: 'lg')
- `variant` ('default' | 'fluid' | 'centered' | 'padded'): Container style variant (default: 'default')
- `padding` ('none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'): Padding size (default: 'md')
- `responsive` (boolean): Enable responsive padding behavior (default: true)
- Standard MUI Container props are also supported

## Usage Examples

### Basic Container

```tsx
import { Container } from '@procurement/ui';

<Container>
  <p>Your content goes here</p>
</Container>;
```

### Fluid Container

```tsx
<Container variant="fluid">
  <p>This container expands to full width</p>
</Container>
```

### Centered Container

```tsx
<Container variant="centered">
  <p>This content is centered in the viewport</p>
</Container>
```

### Container with Custom Padding

```tsx
<Container padding="xl">
  <p>Container with extra large padding</p>
</Container>
```

### Non-responsive Container

```tsx
<Container responsive={false}>
  <p>This container maintains fixed padding across all screen sizes</p>
</Container>
```

## Variants

### default

Standard container with responsive width constraints and default padding.

### fluid

Expands to fill the full width of its parent container.

### centered

Centers its content both horizontally and vertically in the viewport.

### padded

Adds extra vertical padding, useful for main content areas.

## Size Options

- **xs**: Maximum width 444px
- **sm**: Maximum width 600px
- **md**: Maximum width 900px
- **lg**: Maximum width 1200px
- **xl**: Maximum width 1536px
- **false**: No maximum width constraint

## Padding Options

- **none**: No padding
- **xs**: 8px padding
- **sm**: 16px padding
- **md**: 24px padding (default)
- **lg**: 32px padding
- **xl**: 48px padding

## Accessibility

- The component maintains semantic HTML structure
- Supports all standard ARIA attributes through MUI Container
- Responsive design ensures content remains accessible on all device sizes
- Focus management is handled by child components

## Best Practices

- Use `maxWidth="md"` for optimal reading experience with text content
- Enable `responsive` prop for mobile-friendly layouts
- Use `variant="padded"` for main page sections that need extra spacing
- Combine with other layout components (Grid, Stack) for complex layouts
- Avoid nesting containers unless specifically needed for design purposes

## Design Tokens

The component uses MUI theme tokens for:

- Spacing (for padding values)
- Breakpoints (for responsive behavior)
- Maximum width constraints (following MUI's breakpoint system)

## Testing

### Test IDs

The Container component provides the following test identifiers:

| Element | Test ID | Description |
|---------|---------|-------------|
| Container element | `container` | Main container element (default) |
| Custom container | `{dataTestId}` | Custom test ID when provided via `dataTestId` prop |

### Testing Best Practices

#### Selecting Elements

```tsx
import { render, screen } from '@testing-library/react';
import { Container } from './Container';

// Default test ID
render(
  <Container>
    <p>Content</p>
  </Container>
);
const container = screen.getByTestId('container');

// Custom test ID
render(
  <Container dataTestId="custom-container">
    <p>Content</p>
  </Container>
);
const customContainer = screen.getByTestId('custom-container');
```

#### Testing Container Variants

```tsx
it('should render default variant container', () => {
  render(
    <Container dataTestId="default-container">
      <p>Default content</p>
    </Container>
  );

  const container = screen.getByTestId('default-container');
  expect(container).toBeInTheDocument();
  expect(container).toHaveTextContent('Default content');
});

it('should render fluid variant container', () => {
  render(
    <Container variant="fluid" dataTestId="fluid-container">
      <p>Fluid content</p>
    </Container>
  );

  const container = screen.getByTestId('fluid-container');
  expect(container).toBeInTheDocument();
});

it('should render centered variant container', () => {
  render(
    <Container variant="centered" dataTestId="centered-container">
      <p>Centered content</p>
    </Container>
  );

  const container = screen.getByTestId('centered-container');
  expect(container).toBeInTheDocument();
});
```

#### Testing Container Props

```tsx
it('should apply custom maxWidth', () => {
  render(
    <Container maxWidth="sm" dataTestId="small-container">
      <p>Small container</p>
    </Container>
  );

  const container = screen.getByTestId('small-container');
  expect(container).toBeInTheDocument();
});

it('should apply custom padding', () => {
  render(
    <Container padding="xl" dataTestId="padded-container">
      <p>Extra large padding</p>
    </Container>
  );

  const container = screen.getByTestId('padded-container');
  expect(container).toBeInTheDocument();
});

it('should disable responsive behavior', () => {
  render(
    <Container responsive={false} dataTestId="non-responsive-container">
      <p>Non-responsive content</p>
    </Container>
  );

  const container = screen.getByTestId('non-responsive-container');
  expect(container).toBeInTheDocument();
});
```

#### Testing Content Rendering

```tsx
it('should render children correctly', () => {
  render(
    <Container dataTestId="content-container">
      <h1>Title</h1>
      <p>Paragraph</p>
    </Container>
  );

  const container = screen.getByTestId('content-container');
  expect(container).toContainHTML('<h1>Title</h1>');
  expect(container).toContainHTML('<p>Paragraph</p>');
});
```

### Common Test Scenarios

#### Layout and Spacing Tests

```tsx
describe('Container Layout', () => {
  it('should constrain content to specified width', () => {
    render(
      <Container maxWidth="md" dataTestId="constrained-container">
        <div>Content</div>
      </Container>
    );

    const container = screen.getByTestId('constrained-container');
    expect(container).toBeInTheDocument();
  });

  it('should apply padding variants correctly', () => {
    const paddings = ['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const;

    paddings.forEach(padding => {
      const { container } = render(
        <Container padding={padding} dataTestId={`container-${padding}`}>
          <p>Test</p>
        </Container>
      );

      const element = screen.getByTestId(`container-${padding}`);
      expect(element).toBeInTheDocument();

      container.unmount();
    });
  });
});
```

#### Variant Tests

```tsx
describe('Container Variants', () => {
  it('should render all variants correctly', () => {
    const variants = ['default', 'fluid', 'centered', 'padded'] as const;

    variants.forEach(variant => {
      const { container } = render(
        <Container variant={variant} dataTestId={`container-${variant}`}>
          <p>Test</p>
        </Container>
      );

      const element = screen.getByTestId(`container-${variant}`);
      expect(element).toBeInTheDocument();

      container.unmount();
    });
  });
});
```

#### Accessibility Tests

```tsx
describe('Container Accessibility', () => {
  it('should maintain semantic structure', () => {
    const { container } = render(
      <Container dataTestId="semantic-container">
        <h1>Heading</h1>
        <p>Content</p>
      </Container>
    );

    expect(container).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('should pass through ARIA attributes', () => {
    render(
      <Container
        dataTestId="aria-container"
        aria-label="Main content container"
      >
        <p>Content</p>
      </Container>
    );

    const element = screen.getByTestId('aria-container');
    expect(element).toHaveAttribute('aria-label', 'Main content container');
  });
});
```

#### Integration Tests

```tsx
describe('Container Integration', () => {
  it('should work with nested components', () => {
    render(
      <Container dataTestId="parent-container">
        <div data-testid="child-element">
          <p>Nested content</p>
        </div>
      </Container>
    );

    const container = screen.getByTestId('parent-container');
    const child = screen.getByTestId('child-element');

    expect(container).toContainElement(child);
  });

  it('should work with multiple containers', () => {
    render(
      <>
        <Container dataTestId="container-1">
          <p>First</p>
        </Container>
        <Container dataTestId="container-2">
          <p>Second</p>
        </Container>
      </>
    );

    expect(screen.getByTestId('container-1')).toBeInTheDocument();
    expect(screen.getByTestId('container-2')).toBeInTheDocument();
  });
});
```

### Playwright Visual Testing

```typescript
import { test, expect } from '@playwright/test';

test.describe('Container Visual Tests', () => {
  test('default container renders correctly', async ({ page }) => {
    await page.goto('/container-demo');

    const container = page.getByTestId('container');
    await expect(container).toBeVisible();

    // Visual regression test
    await expect(container).toHaveScreenshot('container-default.png');
  });

  test('fluid variant expands to full width', async ({ page }) => {
    await page.goto('/container-demo?variant=fluid');

    const container = page.getByTestId('fluid-container');
    await expect(container).toBeVisible();

    const boundingBox = await container.boundingBox();
    const viewportSize = page.viewportSize();

    // Verify container width approaches viewport width
    expect(boundingBox?.width).toBeGreaterThan((viewportSize?.width || 0) * 0.9);
  });

  test('centered variant centers content vertically', async ({ page }) => {
    await page.goto('/container-demo?variant=centered');

    const container = page.getByTestId('centered-container');
    await expect(container).toBeVisible();

    await expect(container).toHaveScreenshot('container-centered.png');
  });
});
```
