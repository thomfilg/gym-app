# Progress Component

## Overview

The Progress component provides a versatile way to display the progress of tasks and operations to users. It supports multiple visual variants including linear, circular, segmented, and gradient styles with customizable animations and effects.

## Features

- **Multiple Variants**: Linear, circular, segmented, and gradient progress indicators
- **Visual Effects**: Glow and pulse animations for enhanced feedback
- **Accessibility**: Full ARIA support with proper role and value attributes
- **Customization**: Size, color, and label options
- **Real-time Updates**: Supports dynamic value changes and indeterminate states

## Usage

### Basic Usage

```tsx
import { Progress } from '@procurement/ui';

// Basic linear progress
<Progress value={75} />

// With label
<Progress value={60} showLabel />

// Circular progress
<Progress variant="circular" value={80} showLabel />
```

### Variants

#### Linear Progress

The default linear progress bar for typical loading scenarios:

```tsx
<Progress variant="linear" value={65} showLabel />
```

#### Circular Progress

Circular progress indicator for compact spaces:

```tsx
<Progress variant="circular" value={75} size="lg" showLabel />
```

#### Segmented Progress

Segmented progress for step-based processes:

```tsx
<Progress variant="segmented" value={60} segments={5} showLabel />
```

#### Gradient Progress

Enhanced progress with gradient fill:

```tsx
<Progress variant="gradient" value={80} glow showLabel />
```

### Effects and Animations

#### Glow Effect

Adds a subtle glow around the progress indicator:

```tsx
<Progress value={70} glow />
```

#### Pulse Animation

Creates a pulsing animation for active progress:

```tsx
<Progress value={45} pulse />
```

#### Combined Effects

Both effects can be used together:

```tsx
<Progress variant="circular" value={90} glow pulse showLabel />
```

### Indeterminate State

Show loading without specific progress value:

```tsx
<Progress variant="linear" />
<Progress variant="circular" />
```

## Props

| Prop           | Type                                                                         | Default     | Description                            |
| -------------- | ---------------------------------------------------------------------------- | ----------- | -------------------------------------- |
| `value`        | `number`                                                                     | -           | Progress value (0-100)                 |
| `variant`      | `'linear' \| 'circular' \| 'segmented' \| 'gradient' \| 'glass'`             | `'linear'`  | Visual style variant                   |
| `size`         | `'sm' \| 'md' \| 'lg'`                                                       | `'md'`      | Component size                         |
| `color`        | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'neutral'` | `'primary'` | Progress color theme                   |
| `glow`         | `boolean`                                                                    | `false`     | Enable glow effect                     |
| `pulse`        | `boolean`                                                                    | `false`     | Enable pulse animation                 |
| `showLabel`    | `boolean`                                                                    | `false`     | Display progress percentage            |
| `label`        | `string`                                                                     | -           | Custom label text                      |
| `segments`     | `number`                                                                     | `8`         | Number of segments (segmented variant) |
| `thickness`    | `number`                                                                     | -           | Circle thickness (circular variant)    |
| `circularSize` | `number`                                                                     | -           | Circle size (circular variant)         |

## Accessibility

The Progress component includes comprehensive accessibility support:

- **ARIA Role**: Uses `progressbar` role for screen readers
- **ARIA Values**: Provides `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` attributes
- **ARIA Label**: Supports `aria-label` for custom descriptions
- **Screen Reader**: Announces progress changes and completion states
- **Keyboard**: No keyboard interaction required for progress indicators

### Screen Reader Support

```tsx
<Progress value={75} showLabel aria-label="File upload progress: 75% complete" />
```

## Examples

### File Upload Progress

```tsx
const [progress, setProgress] = useState(0);

return (
  <Progress variant="gradient" value={progress} showLabel glow aria-label="File upload progress" />
);
```

### Skill Level Indicator

```tsx
<Progress variant="segmented" segments={5} value={80} color="success" label="Advanced" />
```

### System Dashboard

```tsx
<Progress
  variant="circular"
  value={72}
  showLabel
  color="warning"
  size="lg"
  glow
  aria-label="CPU usage at 72%"
/>
```

## Best Practices

1. **Use appropriate variants**: Linear for general progress, circular for compact spaces, segmented for step-based processes
2. **Include labels**: Always use `showLabel` or custom `label` for clarity
3. **Choose meaningful colors**: Use semantic colors (success for completion, warning for high usage, error for problems)
4. **Provide ARIA labels**: Include descriptive `aria-label` attributes for screen readers
5. **Consider effects**: Use glow and pulse effects sparingly for critical progress indicators
6. **Update regularly**: For real-time progress, update values frequently enough to appear smooth
7. **Handle completion**: Provide clear visual or textual feedback when progress reaches 100%

## Testing

The Progress component includes comprehensive test IDs for automated testing:

### Test IDs

The component uses a hierarchical test ID structure:

| Element | Test ID | Description |
| --- | --- | --- |
| Container | `{dataTestId}` | Main progress container (default: `progress`) |
| Linear Progress | `{dataTestId}-linear` | Linear progress bar element |
| Circular Progress | `{dataTestId}-circular` | Circular progress indicator |
| Segments Container | `{dataTestId}-segments-container` | Container for segmented progress |
| Individual Segment | `{dataTestId}-segment-{index}` | Each segment in segmented variant (0-indexed) |
| Label | `{dataTestId}-label` | Progress label/percentage text |

### Testing Examples

#### Unit Testing with Testing Library

```tsx
import { render, screen } from '@testing-library/react';
import { Progress } from '@procurement/ui';

describe('Progress Component', () => {
  it('should render linear progress with correct value', () => {
    render(<Progress value={75} dataTestId="upload-progress" />);

    const progress = screen.getByTestId('upload-progress');
    const linearBar = screen.getByTestId('upload-progress-linear');

    expect(progress).toBeInTheDocument();
    expect(linearBar).toHaveAttribute('aria-valuenow', '75');
  });

  it('should display label when showLabel is true', () => {
    render(<Progress value={60} showLabel dataTestId="file-progress" />);

    const label = screen.getByTestId('file-progress-label');
    expect(label).toHaveTextContent('60%');
  });

  it('should render custom label text', () => {
    render(<Progress value={80} showLabel label="Almost done" dataTestId="custom-progress" />);

    const label = screen.getByTestId('custom-progress-label');
    expect(label).toHaveTextContent('Almost done');
  });

  it('should render circular variant', () => {
    render(<Progress variant="circular" value={90} dataTestId="circular-progress" />);

    const circular = screen.getByTestId('circular-progress-circular');
    expect(circular).toBeInTheDocument();
  });

  it('should render segmented variant with correct number of segments', () => {
    render(<Progress variant="segmented" value={50} segments={5} dataTestId="step-progress" />);

    const container = screen.getByTestId('step-progress-segments-container');
    const segments = [
      screen.getByTestId('step-progress-segment-0'),
      screen.getByTestId('step-progress-segment-1'),
      screen.getByTestId('step-progress-segment-2'),
      screen.getByTestId('step-progress-segment-3'),
      screen.getByTestId('step-progress-segment-4'),
    ];

    expect(container).toBeInTheDocument();
    expect(segments).toHaveLength(5);
  });

  it('should render indeterminate progress when value is not provided', () => {
    render(<Progress dataTestId="loading-progress" />);

    const linear = screen.getByTestId('loading-progress-linear');
    expect(linear).not.toHaveAttribute('aria-valuenow');
  });

  it('should apply correct color', () => {
    render(<Progress value={85} color="success" dataTestId="success-progress" />);

    const progress = screen.getByTestId('success-progress');
    expect(progress).toBeInTheDocument();
  });
});
```

#### E2E Testing with Playwright

```typescript
import { test, expect } from '@playwright/test';

test.describe('Progress Component', () => {
  test('should display progress and update value', async ({ page }) => {
    await page.goto('/progress-demo');

    const progress = page.getByTestId('upload-progress');
    await expect(progress).toBeVisible();

    const label = page.getByTestId('upload-progress-label');
    await expect(label).toHaveText('0%');

    // Simulate progress update
    await page.click('[data-testid="start-upload"]');

    // Wait for progress to update
    await expect(label).toHaveText('100%', { timeout: 5000 });
  });

  test('should render segmented progress with filled segments', async ({ page }) => {
    await page.goto('/segmented-progress');

    const segment0 = page.getByTestId('step-progress-segment-0');
    const segment4 = page.getByTestId('step-progress-segment-4');

    await expect(segment0).toBeVisible();
    await expect(segment4).toBeVisible();
  });

  test('should have correct ARIA attributes', async ({ page }) => {
    await page.goto('/progress-demo');

    const progress = page.getByTestId('file-progress-linear');

    await expect(progress).toHaveAttribute('role', 'progressbar');
    await expect(progress).toHaveAttribute('aria-valuemin', '0');
    await expect(progress).toHaveAttribute('aria-valuemax', '100');
    await expect(progress).toHaveAttribute('aria-valuenow', '75');
  });

  test('should display glow and pulse effects', async ({ page }) => {
    await page.goto('/progress-effects');

    const progress = page.getByTestId('effect-progress-linear');

    // Check for glow effect (via computed styles)
    const boxShadow = await progress.evaluate((el) => {
      return window.getComputedStyle(el.querySelector('.MuiLinearProgress-bar')).boxShadow;
    });

    expect(boxShadow).not.toBe('none');
  });
});
```

#### Integration Testing

```tsx
import { render, screen, waitFor } from '@testing-library/react';
import { Progress } from '@procurement/ui';

describe('Progress Integration', () => {
  it('should update progress value dynamically', async () => {
    const { rerender } = render(
      <Progress value={0} showLabel dataTestId="dynamic-progress" />
    );

    let label = screen.getByTestId('dynamic-progress-label');
    expect(label).toHaveTextContent('0%');

    // Simulate progress updates
    for (let i = 25; i <= 100; i += 25) {
      rerender(<Progress value={i} showLabel dataTestId="dynamic-progress" />);

      await waitFor(() => {
        label = screen.getByTestId('dynamic-progress-label');
        expect(label).toHaveTextContent(`${i}%`);
      });
    }
  });

  it('should switch between variants', () => {
    const { rerender } = render(
      <Progress variant="linear" value={50} dataTestId="variant-progress" />
    );

    expect(screen.getByTestId('variant-progress-linear')).toBeInTheDocument();

    rerender(<Progress variant="circular" value={50} dataTestId="variant-progress" />);

    expect(screen.getByTestId('variant-progress-circular')).toBeInTheDocument();
    expect(screen.queryByTestId('variant-progress-linear')).not.toBeInTheDocument();
  });

  it('should handle segmented progress filled state', () => {
    const segments = 10;
    const value = 55; // Should fill ~5.5 segments

    render(
      <Progress
        variant="segmented"
        segments={segments}
        value={value}
        dataTestId="segment-test"
      />
    );

    const container = screen.getByTestId('segment-test-segments-container');
    expect(container.children).toHaveLength(segments);

    // Verify individual segments are rendered
    for (let i = 0; i < segments; i++) {
      const segment = screen.getByTestId(`segment-test-segment-${i}`);
      expect(segment).toBeInTheDocument();
    }
  });
});
```

### Accessibility Testing

```tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Progress } from '@procurement/ui';

expect.extend(toHaveNoViolations);

describe('Progress Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <Progress
        value={75}
        showLabel
        aria-label="File upload progress"
        dataTestId="accessible-progress"
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should provide proper ARIA attributes for screen readers', () => {
    render(
      <Progress
        value={60}
        showLabel
        aria-label="Download progress: 60%"
        dataTestId="aria-progress"
      />
    );

    const progress = screen.getByTestId('aria-progress-linear');

    expect(progress).toHaveAttribute('role', 'progressbar');
    expect(progress).toHaveAttribute('aria-valuenow', '60');
    expect(progress).toHaveAttribute('aria-valuemin', '0');
    expect(progress).toHaveAttribute('aria-valuemax', '100');
    expect(progress).toHaveAttribute('aria-label', 'Download progress: 60%');
  });
});
```

### Best Practices for Testing

1. **Use descriptive test IDs**: Always provide a meaningful `dataTestId` prop for better test readability
2. **Test all variants**: Ensure tests cover linear, circular, segmented, gradient, and glass variants
3. **Verify ARIA attributes**: Check that accessibility attributes are correctly applied
4. **Test dynamic updates**: Validate that progress updates correctly when value changes
5. **Test label rendering**: Verify both default percentage labels and custom labels
6. **Test edge cases**: Include tests for 0%, 100%, and indeterminate states
7. **Verify visual effects**: Test that glow and pulse effects are applied when enabled
8. **Test segment calculations**: For segmented variant, verify correct number of filled segments

## Theme Integration

The Progress component integrates with the MUI theme system and supports:

- Custom color palettes
- Consistent spacing and sizing
- Dark/light theme variants
- Responsive design tokens
- Glass morphism effects (when using glass variant)
