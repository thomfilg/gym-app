# Transition Component

A flexible and comprehensive transition wrapper component that provides smooth animations for UI elements using Material-UI's transition components.

## Overview

The Transition component wraps content and applies various animation effects when elements enter or leave the DOM. It supports multiple transition variants including fade, slide, scale, collapse, grow, and zoom, with customizable timing, easing, and directional options.

## Features

- **Multiple Transition Variants**: Choose from fade, slide, scale, collapse, grow, or zoom animations
- **Directional Control**: Slide transitions support up, down, left, and right directions
- **Customizable Timing**: Configure duration and delay for precise control
- **Theme Integration**: Automatically uses Material-UI theme values for consistent animations
- **Intelligent Defaults**: Each variant has optimized default timing and easing values
- **Flexible Configuration**: Supports both simple number values and complex enter/exit objects

## Usage

### Basic Usage

```tsx
import { Transition } from '@procurement/ui';

// Simple fade transition
<Transition variant="fade" in={show}>
  <Card>Your content here</Card>
</Transition>;
```

### With Direction (Slide)

```tsx
<Transition variant="slide" direction="up" in={show}>
  <Card>Slides up from bottom</Card>
</Transition>
```

### Custom Timing

```tsx
<Transition
  variant="fade"
  in={show}
  duration={500} // 500ms duration
  delay={200} // 200ms delay before starting
>
  <Card>Custom timing</Card>
</Transition>
```

### Complex Duration/Easing

```tsx
<Transition
  variant="scale"
  in={show}
  duration={{ enter: 300, exit: 200 }}
  easing={{ enter: 'ease-out', exit: 'ease-in' }}
>
  <Card>Different enter/exit timing</Card>
</Transition>
```

## Props

| Prop        | Type                                                             | Default       | Description                        |
| ----------- | ---------------------------------------------------------------- | ------------- | ---------------------------------- |
| `children`  | `ReactNode`                                                      | -             | Content to animate                 |
| `variant`   | `'fade' \| 'slide' \| 'scale' \| 'collapse' \| 'grow' \| 'zoom'` | `'fade'`      | Type of transition animation       |
| `in`        | `boolean`                                                        | -             | Controls whether content is shown  |
| `direction` | `'up' \| 'down' \| 'left' \| 'right'`                            | `'up'`        | Direction for slide transitions    |
| `duration`  | `number \| { enter: number, exit: number }`                      | Theme default | Animation duration in milliseconds |
| `delay`     | `number`                                                         | `0`           | Delay before animation starts      |
| `easing`    | `string \| { enter: string, exit: string }`                      | Theme default | CSS easing function                |

## Transition Variants

### Fade

Smoothly transitions opacity from 0 to 1. Best for subtle entrances and exits.

### Slide

Slides content in from a specified direction. Perfect for panels, drawers, and directional reveals.

### Scale/Grow

Scales content from 0 to full size from the center point. Great for popups and emphasis.

### Collapse

Animates height from 0 to auto. Ideal for expandable sections and accordions.

### Zoom

Sharp zoom effect with scaling transform. Good for dramatic entrances.

## Accessibility

- Respects user's motion preferences via `prefers-reduced-motion`
- Properly manages focus during transitions
- Maintains ARIA attributes on wrapped content
- Supports keyboard navigation through transitioned elements

## Best Practices

1. **Choose Appropriate Variants**: Use fade for subtle changes, slide for directional movement, and scale/zoom for emphasis
2. **Consistent Timing**: Use theme-based durations for consistency across your app
3. **Performance**: Avoid transitioning too many elements simultaneously
4. **Mobile Considerations**: Test transitions on lower-powered devices
5. **Accessibility**: Provide options to disable animations for users who prefer reduced motion

## Examples

### Notification Banner

```tsx
<Transition variant="slide" direction="down" in={showNotification}>
  <Alert severity="info">New message received!</Alert>
</Transition>
```

### Modal Overlay

```tsx
<Transition variant="fade" in={modalOpen} duration={300}>
  <Backdrop />
</Transition>
<Transition variant="scale" in={modalOpen} delay={100}>
  <Modal>Content</Modal>
</Transition>
```

### Collapsible FAQ

```tsx
<Transition variant="collapse" in={expanded}>
  <Box>
    <Typography>Answer content that expands/collapses</Typography>
  </Box>
</Transition>
```

## Related Components

- [Portal](../Portal) - For rendering content outside the DOM hierarchy
- [Modal](../../feedback/Modal) - Uses transitions for overlay effects
- [Drawer](../../layout/Drawer) - Implements slide transitions
- [Accordion](../../layout/Accordion) - Uses collapse transitions

## Testing

This section describes all `data-testid` attributes available in the Transition component for testing purposes. The Transition component wraps Material-UI transition components (Fade, Slide, Grow, Collapse, Zoom) with consistent test IDs.

### Test IDs

#### Container Elements

##### `transition-wrapper`
- **Element:** MUI Transition component wrapper (Fade, Slide, Grow, Collapse, or Zoom)
- **Location:** Root transition component that handles animation
- **Usage:** Query the main transition wrapper to verify component is rendered and check transition state
```typescript
const wrapper = await canvas.findByTestId('transition-wrapper');
expect(wrapper).toBeInTheDocument();

// Check if transition is active (in prop)
const style = window.getComputedStyle(wrapper);
expect(style.visibility).toBe('visible'); // When in=true
```

##### `transition-element`
- **Element:** Inner div that receives the transition effects
- **Location:** Direct child of the transition wrapper, contains the content
- **Usage:** Query the element being transitioned to check animation properties
```typescript
const element = await canvas.findByTestId('transition-element');
expect(element).toBeInTheDocument();

// Check opacity during fade transition
const style = window.getComputedStyle(element);
expect(parseFloat(style.opacity)).toBeGreaterThan(0);
```

##### `transition-content`
- **Element:** Content container div
- **Location:** Innermost div that wraps the actual children content
- **Usage:** Query the content container to access child elements
```typescript
const content = await canvas.findByTestId('transition-content');
const childText = within(content).getByText('Expected content');
expect(childText).toBeInTheDocument();
```

### Test Patterns

#### Wait for Transition to Complete

##### Fade Transition
```typescript
import { waitFor, within } from 'storybook/test';

// Wait for element to fade in
const element = await canvas.findByTestId('transition-element');

await waitFor(() => {
  const style = window.getComputedStyle(element);
  expect(parseFloat(style.opacity)).toBe(1);
}, { timeout: 3000 });
```

##### Slide Transition
```typescript
// Wait for slide transition to complete
const element = await canvas.findByTestId('transition-element');

await waitFor(() => {
  const style = window.getComputedStyle(element);
  const transform = style.transform;
  // Check that transform is identity matrix (no translation)
  expect(transform).toBe('none') || expect(transform).toContain('matrix(1, 0, 0, 1, 0, 0)');
}, { timeout: 3000 });
```

##### Grow/Scale Transition
```typescript
// Wait for scale transition to complete
const element = await canvas.findByTestId('transition-element');

await waitFor(() => {
  const style = window.getComputedStyle(element);
  const transform = style.transform;
  // Check that scale is 1 (fully grown)
  expect(transform).toContain('scale(1)') || expect(transform).toBe('none');
}, { timeout: 3000 });
```

##### Collapse Transition
```typescript
// Wait for collapse/expand transition to complete
const element = await canvas.findByTestId('transition-element');

await waitFor(() => {
  const style = window.getComputedStyle(element);
  // When expanded, height should be auto or specific value
  expect(parseInt(style.height)).toBeGreaterThan(0);
}, { timeout: 3000 });
```

##### Zoom Transition
```typescript
// Wait for zoom transition to complete
const element = await canvas.findByTestId('transition-element');

await waitFor(() => {
  const style = window.getComputedStyle(element);
  expect(parseFloat(style.opacity)).toBe(1);
  const transform = style.transform;
  expect(transform).toBe('none') || expect(transform).toContain('scale(1)');
}, { timeout: 3000 });
```

#### Testing Animation States

##### Check if Transition is Entering
```typescript
// Immediately after triggering in=true
const wrapper = await canvas.findByTestId('transition-wrapper');

// Element should be visible but possibly not fully transitioned
expect(wrapper).toBeVisible();

// Check intermediate state (opacity between 0 and 1 for fade)
const element = await canvas.findByTestId('transition-element');
const style = window.getComputedStyle(element);
const opacity = parseFloat(style.opacity);
expect(opacity).toBeGreaterThanOrEqual(0);
expect(opacity).toBeLessThanOrEqual(1);
```

##### Check if Transition is Exiting
```typescript
// After setting in=false
const element = await canvas.findByTestId('transition-element');

// For fade: opacity should be decreasing
await waitFor(() => {
  const style = window.getComputedStyle(element);
  expect(parseFloat(style.opacity)).toBeLessThan(1);
}, { timeout: 1000 });
```

##### Check if Transition is Fully Entered
```typescript
// Wait for transition to complete
const element = await canvas.findByTestId('transition-element');

await waitFor(() => {
  const style = window.getComputedStyle(element);
  // For fade: opacity should be 1
  expect(parseFloat(style.opacity)).toBe(1);
  // Element should be fully visible
  expect(element).toBeVisible();
}, { timeout: 3000 });
```

#### Testing CSS Properties During Transitions

##### Opacity (Fade/Zoom)
```typescript
const element = await canvas.findByTestId('transition-element');
const style = window.getComputedStyle(element);
const opacity = parseFloat(style.opacity);

// During enter: 0 -> 1
expect(opacity).toBeGreaterThanOrEqual(0);
expect(opacity).toBeLessThanOrEqual(1);

// After enter complete
await waitFor(() => {
  const currentStyle = window.getComputedStyle(element);
  expect(parseFloat(currentStyle.opacity)).toBe(1);
}, { timeout: 3000 });
```

##### Transform (Slide/Grow/Zoom)
```typescript
const element = await canvas.findByTestId('transition-element');
const style = window.getComputedStyle(element);
const transform = style.transform;

// Check transform property exists during transition
expect(transform).not.toBe('none');

// Wait for transform to complete (identity matrix)
await waitFor(() => {
  const currentStyle = window.getComputedStyle(element);
  const currentTransform = currentStyle.transform;
  expect(currentTransform === 'none' ||
         currentTransform.includes('matrix(1, 0, 0, 1, 0, 0)')).toBe(true);
}, { timeout: 3000 });
```

##### Height (Collapse)
```typescript
const element = await canvas.findByTestId('transition-element');

// When collapsed
let style = window.getComputedStyle(element);
expect(parseInt(style.height)).toBe(0);

// Wait for expansion
await waitFor(() => {
  const currentStyle = window.getComputedStyle(element);
  expect(parseInt(currentStyle.height)).toBeGreaterThan(0);
}, { timeout: 3000 });
```

##### Visibility
```typescript
const wrapper = await canvas.findByTestId('transition-wrapper');
const style = window.getComputedStyle(wrapper);

// When in=true
expect(style.visibility).toBe('visible');

// When in=false (after exit complete)
expect(style.visibility).toBe('hidden');
```

##### Transition Duration
```typescript
const element = await canvas.findByTestId('transition-element');
const style = window.getComputedStyle(element);

// Check transition duration is set
const transitionDuration = style.transitionDuration;
expect(transitionDuration).not.toBe('0s');

// Check transition delay (if delay prop is set)
const transitionDelay = style.transitionDelay;
if (delay > 0) {
  expect(transitionDelay).toBe(`${delay}ms`);
}
```

### Props That Affect Test Behavior

#### `variant`
- **Values:** `'fade' | 'slide' | 'scale' | 'grow' | 'zoom' | 'collapse'`
- **Impact:** Determines which MUI transition component is used
  - `fade`: Opacity transition
  - `slide`: Translate/position transition
  - `scale`/`grow`: Transform scale transition
  - `zoom`: Combined opacity and scale
  - `collapse`: Height transition
- **Test Tip:** Different variants require different CSS property checks

#### `in`
- **Values:** `boolean`
- **Impact:** Controls transition state (entering vs exiting)
- **Test Tip:** Toggle this prop to test enter/exit transitions

#### `direction`
- **Values:** `'up' | 'down' | 'left' | 'right'`
- **Impact:** Direction of slide transition
- **Test Tip:** Only affects `slide` variant

#### `duration`
- **Values:** `number | { enter: number, exit: number }`
- **Impact:** Transition duration in milliseconds
- **Test Tip:** Adjust `waitFor` timeout based on duration

#### `delay`
- **Values:** `number` (milliseconds)
- **Impact:** Adds `transitionDelay` style
- **Test Tip:** Account for delay when testing transition start

#### `easing`
- **Values:** `string | { enter: string, exit: string }`
- **Impact:** CSS easing function for transition
- **Test Tip:** Check `transitionTimingFunction` style property

### Common Test Scenarios

#### 1. Basic Rendering Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Wait for transition wrapper
  const wrapper = await canvas.findByTestId('transition-wrapper');
  expect(wrapper).toBeInTheDocument();

  // Verify nested structure
  const element = await canvas.findByTestId('transition-element');
  expect(element).toBeInTheDocument();

  const content = await canvas.findByTestId('transition-content');
  expect(content).toBeInTheDocument();
}
```

#### 2. Enter Transition Test
```typescript
play: async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);

  // Initial state (in=false)
  const wrapper = await canvas.findByTestId('transition-wrapper');

  // Trigger transition (in=true)
  args.in = true;

  // Wait for transition to complete
  const element = await canvas.findByTestId('transition-element');
  await waitFor(() => {
    const style = window.getComputedStyle(element);
    expect(parseFloat(style.opacity)).toBe(1);
  }, { timeout: 3000 });
}
```

#### 3. Exit Transition Test
```typescript
play: async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);

  // Start with in=true
  expect(args.in).toBe(true);

  const element = await canvas.findByTestId('transition-element');

  // Verify element is visible
  await waitFor(() => {
    expect(element).toBeVisible();
  }, { timeout: 2000 });

  // Trigger exit (in=false)
  args.in = false;

  // Wait for exit transition
  await waitFor(() => {
    const style = window.getComputedStyle(element);
    expect(parseFloat(style.opacity)).toBeLessThan(1);
  }, { timeout: 3000 });
}
```

#### 4. Content Access Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Access content through transition layers
  const content = await canvas.findByTestId('transition-content');

  // Query child elements
  const childElement = within(content).getByText('Expected Text');
  expect(childElement).toBeInTheDocument();
}
```

#### 5. Variant-Specific Test (Slide)
```typescript
play: async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);

  expect(args.variant).toBe('slide');
  expect(args.direction).toBe('up');

  const element = await canvas.findByTestId('transition-element');

  // Wait for slide to complete
  await waitFor(() => {
    const style = window.getComputedStyle(element);
    const transform = style.transform;
    // No vertical translation (translateY = 0)
    expect(transform === 'none' || !transform.includes('translateY')).toBe(true);
  }, { timeout: 3000 });
}
```

#### 6. Duration and Delay Test
```typescript
play: async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);

  const duration = 500;
  const delay = 200;

  expect(args.duration).toBe(duration);
  expect(args.delay).toBe(delay);

  const element = await canvas.findByTestId('transition-element');
  const style = window.getComputedStyle(element);

  // Verify delay is applied
  expect(style.transitionDelay).toBe(`${delay}ms`);

  // Total time = duration + delay
  await waitFor(() => {
    const currentStyle = window.getComputedStyle(element);
    expect(parseFloat(currentStyle.opacity)).toBe(1);
  }, { timeout: duration + delay + 500 }); // Add buffer
}
```

#### 7. Multiple Transitions Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Test multiple transition instances
  const wrappers = await canvas.findAllByTestId('transition-wrapper');
  expect(wrappers.length).toBeGreaterThan(1);

  // Each should have complete structure
  for (const wrapper of wrappers) {
    const element = within(wrapper).getByTestId('transition-element');
    const content = within(element).getByTestId('transition-content');

    expect(element).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  }
}
```

### Troubleshooting

#### Issue: "Unable to find element with testId transition-wrapper"

**Solution:** Always use `await` with `findByTestId` and ensure `in` prop is true:
```typescript
// ❌ Wrong - synchronous query
const wrapper = canvas.getByTestId('transition-wrapper');

// ✅ Correct - asynchronous query
const wrapper = await canvas.findByTestId('transition-wrapper');
```

#### Issue: Test fails intermittently during transitions

**Solution:** Use `waitFor` with appropriate timeout based on duration + delay:
```typescript
const duration = args.duration || 300;
const delay = args.delay || 0;
const totalTime = duration + delay;

await waitFor(async () => {
  const element = await canvas.findByTestId('transition-element');
  const style = window.getComputedStyle(element);
  expect(parseFloat(style.opacity)).toBe(1);
}, { timeout: totalTime + 1000 }); // Add 1s buffer
```

#### Issue: CSS properties show unexpected values

**Solution:** Remember that MUI transitions apply styles to different elements:
```typescript
// ❌ Wrong - checking wrapper for opacity
const wrapper = await canvas.findByTestId('transition-wrapper');
const style = window.getComputedStyle(wrapper);
expect(style.opacity).toBe('1'); // May not work

// ✅ Correct - check transition-element for most properties
const element = await canvas.findByTestId('transition-element');
const style = window.getComputedStyle(element);
expect(parseFloat(style.opacity)).toBe(1);
```

#### Issue: Transform matrix is hard to interpret

**Solution:** Use helper functions or check for 'none':
```typescript
const element = await canvas.findByTestId('transition-element');
const style = window.getComputedStyle(element);
const transform = style.transform;

// Simple check: either 'none' or identity matrix
const isComplete = transform === 'none' ||
                   transform.includes('matrix(1, 0, 0, 1, 0, 0)');
expect(isComplete).toBe(true);
```

#### Issue: Collapse height is 'auto' instead of pixel value

**Solution:** Check for non-zero height instead of specific value:
```typescript
const element = await canvas.findByTestId('transition-element');
const style = window.getComputedStyle(element);
const height = style.height;

// Accept 'auto' or any positive pixel value
expect(height === 'auto' || parseInt(height) > 0).toBe(true);
```

#### Issue: Content not accessible through testId

**Solution:** Use `within` to scope queries:
```typescript
// ❌ Wrong - direct query may fail if multiple transitions exist
const content = await canvas.findByTestId('transition-content');

// ✅ Correct - scope to specific wrapper
const wrapper = await canvas.findByTestId('transition-wrapper');
const content = await within(wrapper).findByTestId('transition-content');
```

### Best Practices

1. **Always use async/await** with testId queries in Storybook tests
2. **Use `waitFor`** when testing transitions - they take time to complete
3. **Account for duration + delay** in timeout values
4. **Scope queries with `within()`** when testing multiple transition instances
5. **Check computed styles** for transition properties (opacity, transform, etc.)
6. **Parse numeric values** from CSS strings: `parseFloat(style.opacity)`
7. **Test both enter and exit** transitions for complete coverage
8. **Use variant-specific assertions** for different transition types
9. **Add buffer time** to timeouts (e.g., duration + 500ms)
10. **Test visibility states** to ensure proper show/hide behavior

### Variant-Specific CSS Properties

#### Fade
- **Primary:** `opacity` (0 → 1)
- **Check:** `parseFloat(style.opacity) === 1`

#### Slide
- **Primary:** `transform: translateX/Y`
- **Check:** `transform === 'none'` or identity matrix

#### Grow/Scale
- **Primary:** `transform: scale`
- **Check:** `transform.includes('scale(1)')`

#### Zoom
- **Primary:** `opacity` + `transform: scale`
- **Check:** Both opacity and scale

#### Collapse
- **Primary:** `height` (0 → auto/pixels)
- **Check:** `parseInt(style.height) > 0`
