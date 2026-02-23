# Carousel Component

## Purpose

The Carousel component is a versatile data display component that presents content in a rotating, sequential manner. It supports various visual styles, animations, and interactive features for engaging content presentation.

## Usage

```tsx
import { Carousel } from '@/components/data-display/Carousel';

<Carousel
  items={[
    { id: '1', content: 'Slide 1', image: '/image1.jpg', title: 'First Slide' },
    { id: '2', content: 'Slide 2', image: '/image2.jpg', title: 'Second Slide' },
  ]}
  variant="glass"
  autoPlay={true}
  showIndicators={true}
/>;
```

## Props

### items

- **Type**: `CarouselItem[]`
- **Required**: Yes
- **Description**: Array of carousel items with content, images, titles, and descriptions

### variant

- **Type**: `'default' | 'glass' | 'gradient' | 'elevated' | 'minimal' | 'cards'`
- **Default**: `'default'`
- **Description**: Visual style variant of the carousel

### size

- **Type**: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`
- **Default**: `'md'`
- **Description**: Size of the carousel

### color

- **Type**: `'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'`
- **Default**: `'primary'`
- **Description**: Color theme for controls and visual effects

### autoPlay

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Enable automatic slide progression

### autoPlayInterval

- **Type**: `number`
- **Default**: `3000`
- **Description**: Interval between auto-play slides in milliseconds

### loop

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Enable looping when reaching first/last slide

### showIndicators

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Show dot indicators for navigation

### showArrows

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Show navigation arrows

### showThumbnails

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Show thumbnail navigation

### pauseOnHover

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Pause autoplay when hovering over the carousel

### animation

- **Type**: `'slide' | 'fade' | 'zoom' | 'flip'`
- **Default**: `'slide'`
- **Description**: Slide transition animation type

### height

- **Type**: `number | string`
- **Default**: `400`
- **Description**: Height of the carousel

### width

- **Type**: `number | string`
- **Default**: `'100%'`
- **Description**: Width of the carousel

### indicatorPosition

- **Type**: `'top' | 'bottom' | 'left' | 'right'`
- **Default**: `'bottom'`
- **Description**: Position of the indicator dots

### arrowPosition

- **Type**: `'overlay' | 'outside' | 'inside'`
- **Default**: `'overlay'`
- **Description**: Position of navigation arrows

### glow

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Enable glow effect

### pulse

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Enable pulsing animation

### glass

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Enable glass morphism effect

### gradient

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Enable gradient backgrounds

### loading

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Show loading state

### disabled

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Disable all carousel interactions

### onClick

- **Type**: `(item: CarouselItem, index: number) => void`
- **Description**: Callback when a carousel item is clicked

### onChange

- **Type**: `(index: number) => void`
- **Description**: Callback when the active slide changes

### onFocus

- **Type**: `FocusEventHandler<HTMLDivElement>`
- **Description**: Focus event handler

### onBlur

- **Type**: `FocusEventHandler<HTMLDivElement>`
- **Description**: Blur event handler

## Examples

### Basic Carousel

```tsx
<Carousel
  items={[
    { id: '1', content: 'Slide 1' },
    { id: '2', content: 'Slide 2' },
  ]}
/>
```

### Autoplay with Thumbnails

```tsx
<Carousel
  items={items}
  autoPlay={true}
  autoPlayInterval={5000}
  showThumbnails={true}
  pauseOnHover={true}
/>
```

### Glass Effect with Gradient

```tsx
<Carousel items={items} variant="glass" gradient={true} glow={true} animation="fade" />
```

### Cards Layout

```tsx
<Carousel items={items} variant="cards" showArrows={true} arrowPosition="outside" size="lg" />
```

## Accessibility

- **Keyboard Navigation**: Supports arrow keys for navigation (Left/Right arrows)
- **ARIA Attributes**: Includes proper ARIA labels and roles for screen readers
- **Focus Management**: Maintains proper focus states and tab order
- **Screen Reader Support**: Announces slide changes and current position
- **Alt Text**: Supports alt text for images
- **Pause Controls**: Can be paused/resumed with keyboard

## Best Practices

1. **Content Structure**: Ensure carousel items have consistent structure for better user experience
2. **Image Optimization**: Use optimized images to improve performance
3. **Autoplay Consideration**: Consider user preference for motion when using autoplay
4. **Mobile Experience**: Test swipe gestures on touch devices
5. **Fallback Content**: Provide meaningful content when images fail to load
6. **Indicator Clarity**: Ensure indicators are visible against carousel content
7. **Performance**: Limit the number of items for better performance

## Related Components

- `Gallery`: For displaying image collections
- `Slider`: For numeric range selection
- `Tabs`: For switchable content panels
- `Timeline`: For chronological content display

## Testing

### Test IDs

#### Container Elements

##### `carousel-container`
- **Element:** Main Carousel container
- **Location:** Root Box element that wraps the entire carousel
- **Usage:** Query the main container to verify Carousel is rendered
```typescript
const container = await canvas.findByTestId('carousel-container');
expect(container).toBeInTheDocument();
```

##### `carousel-track`
- **Element:** Carousel slides container/track
- **Location:** Inner Box that contains all slides
- **Usage:** Query the track to verify it's rendered and check layout
```typescript
const track = await canvas.findByTestId('carousel-track');
expect(track).toBeInTheDocument();
```

#### Slide Elements

##### `carousel-slide-${index}`
- **Element:** Individual carousel slide
- **Location:** Each slide's container Box (one per carousel item, indexed from 0)
- **Usage:** Query specific slides by index
```typescript
// Get first slide
const firstSlide = await canvas.findByTestId('carousel-slide-0');
expect(firstSlide).toBeInTheDocument();

// Get all slides
const slides = await canvas.findAllByTestId(/carousel-slide-/);
expect(slides).toHaveLength(expectedCount);
```

##### `data-active` attribute
- **Element:** Added to active slide
- **Location:** On the currently visible slide's container
- **Usage:** Query to find which slide is currently active
```typescript
const activeSlide = canvasElement.querySelector('[data-testid^="carousel-slide-"][data-active="true"]');
expect(activeSlide).toHaveAttribute('data-testid', 'carousel-slide-0');
```

#### Navigation Elements

##### `carousel-navigation`
- **Element:** Navigation buttons container
- **Location:** Wrapper Box containing prev/next buttons
- **Usage:** Query navigation container to verify it's rendered
```typescript
const navigation = await canvas.findByTestId('carousel-navigation');
expect(navigation).toBeInTheDocument();
```

##### `carousel-prev-button`
- **Element:** Previous slide button
- **Location:** IconButton for navigating to previous slide
- **Usage:** Click to navigate backwards
```typescript
const prevButton = await canvas.findByTestId('carousel-prev-button');
await userEvent.click(prevButton);
```

##### `carousel-next-button`
- **Element:** Next slide button
- **Location:** IconButton for navigating to next slide
- **Usage:** Click to navigate forwards
```typescript
const nextButton = await canvas.findByTestId('carousel-next-button');
await userEvent.click(nextButton);
```

#### Indicator Elements

##### `carousel-indicators`
- **Element:** Indicators/dots container
- **Location:** Box containing all indicator dots/lines/numbers
- **Usage:** Query indicators container to verify it's rendered
```typescript
const indicators = await canvas.findByTestId('carousel-indicators');
expect(indicators).toBeInTheDocument();
```

##### `carousel-indicator-${index}`
- **Element:** Individual indicator (dot/line/number)
- **Location:** Each indicator element (one per slide, indexed from 0)
- **Usage:** Click to navigate to specific slide
```typescript
// Click third indicator
const thirdIndicator = await canvas.findByTestId('carousel-indicator-2');
await userEvent.click(thirdIndicator);

// Get all indicators
const indicators = await canvas.findAllByTestId(/carousel-indicator-/);
expect(indicators).toHaveLength(expectedCount);
```

##### `data-active` attribute on indicators
- **Element:** Added to active indicator
- **Location:** On the indicator for the currently visible slide
- **Usage:** Query to find which indicator is active
```typescript
const activeIndicator = canvasElement.querySelector('[data-testid^="carousel-indicator-"][data-active="true"]');
expect(activeIndicator).toHaveAttribute('data-testid', 'carousel-indicator-0');
```

#### Thumbnail Elements

##### `carousel-thumbnails`
- **Element:** Thumbnails container
- **Location:** Box containing all thumbnail images
- **Usage:** Query thumbnails container to verify it's rendered (only visible when `showThumbnails=true`)
```typescript
const thumbnails = await canvas.findByTestId('carousel-thumbnails');
expect(thumbnails).toBeInTheDocument();
```

##### `carousel-thumbnail-${index}`
- **Element:** Individual thumbnail
- **Location:** Each thumbnail Box (one per slide, indexed from 0)
- **Usage:** Click to navigate to specific slide
```typescript
// Click second thumbnail
const secondThumbnail = await canvas.findByTestId('carousel-thumbnail-1');
await userEvent.click(secondThumbnail);

// Get all thumbnails
const thumbnails = await canvas.findAllByTestId(/carousel-thumbnail-/);
expect(thumbnails).toHaveLength(expectedCount);
```

##### `data-active` attribute on thumbnails
- **Element:** Added to active thumbnail
- **Location:** On the thumbnail for the currently visible slide
- **Usage:** Query to find which thumbnail is active
```typescript
const activeThumbnail = canvasElement.querySelector('[data-testid^="carousel-thumbnail-"][data-active="true"]');
expect(activeThumbnail).toHaveAttribute('data-testid', 'carousel-thumbnail-0');
```

### Test Patterns

#### Wait for Carousel to Render
```typescript
import { waitFor, within } from 'storybook/test';

// Wait for container
const container = await canvas.findByTestId('carousel-container');

// Wait for track to render
await waitFor(async () => {
  const track = await canvas.findByTestId('carousel-track');
  expect(track).toBeInTheDocument();
}, { timeout: 3000 });
```

#### Verify Slide Navigation
```typescript
// Get initial active slide
const firstSlide = await canvas.findByTestId('carousel-slide-0');
expect(firstSlide).toHaveAttribute('data-active', 'true');

// Click next button
const nextButton = await canvas.findByTestId('carousel-next-button');
await userEvent.click(nextButton);

// Wait for slide transition
await waitFor(() => {
  const secondSlide = canvas.getByTestId('carousel-slide-1');
  expect(secondSlide).toHaveAttribute('data-active', 'true');
}, { timeout: 1000 });
```

#### Verify Indicator Navigation
```typescript
// Get all indicators
const indicators = await canvas.findAllByTestId(/carousel-indicator-/);
expect(indicators).toHaveLength(items.length);

// Click third indicator
await userEvent.click(indicators[2]);

// Verify third slide is active
await waitFor(() => {
  const thirdSlide = canvas.getByTestId('carousel-slide-2');
  expect(thirdSlide).toHaveAttribute('data-active', 'true');
}, { timeout: 1000 });
```

#### Test Autoplay Functionality
```typescript
// Wait for initial render
const container = await canvas.findByTestId('carousel-container');

// First slide should be active
let activeSlide = canvasElement.querySelector('[data-active="true"]');
expect(activeSlide).toHaveAttribute('data-testid', 'carousel-slide-0');

// Wait for autoplay to advance
await waitFor(() => {
  activeSlide = canvasElement.querySelector('[data-testid^="carousel-slide-"][data-active="true"]');
  expect(activeSlide).toHaveAttribute('data-testid', 'carousel-slide-1');
}, { timeout: 5000 });

// Test pause on hover
await userEvent.hover(container);

// Wait to ensure it doesn't advance
await new Promise((resolve) => setTimeout(resolve, 2000));

// Should still be on second slide
activeSlide = canvasElement.querySelector('[data-active="true"]');
expect(activeSlide).toHaveAttribute('data-testid', 'carousel-slide-1');
```

#### Verify Thumbnails
```typescript
// Check if thumbnails are visible
const thumbnailsContainer = await canvas.findByTestId('carousel-thumbnails');
expect(thumbnailsContainer).toBeInTheDocument();

// Get all thumbnails
const thumbnails = await canvas.findAllByTestId(/carousel-thumbnail-/);
expect(thumbnails).toHaveLength(items.length);

// Click fourth thumbnail
await userEvent.click(thumbnails[3]);

// Verify fourth slide is active
await waitFor(() => {
  const fourthSlide = canvas.getByTestId('carousel-slide-3');
  expect(fourthSlide).toHaveAttribute('data-active', 'true');
}, { timeout: 1000 });
```

#### Check Navigation Button States
```typescript
// When loop=false and at first slide, prev should be disabled
const prevButton = await canvas.findByTestId('carousel-prev-button');
expect(prevButton).toBeDisabled();

// Navigate to last slide
const indicators = await canvas.findAllByTestId(/carousel-indicator-/);
await userEvent.click(indicators[indicators.length - 1]);

await waitFor(() => {
  const lastSlide = canvas.getByTestId(`carousel-slide-${items.length - 1}`);
  expect(lastSlide).toHaveAttribute('data-active', 'true');
});

// Next button should be disabled at last slide
const nextButton = await canvas.findByTestId('carousel-next-button');
expect(nextButton).toBeDisabled();
```

#### Test Multiple Navigation Methods
```typescript
// Navigate using next button
const nextButton = await canvas.findByTestId('carousel-next-button');
await userEvent.click(nextButton);

await waitFor(() => {
  expect(canvas.getByTestId('carousel-slide-1')).toHaveAttribute('data-active', 'true');
});

// Navigate using indicator
const thirdIndicator = await canvas.findByTestId('carousel-indicator-2');
await userEvent.click(thirdIndicator);

await waitFor(() => {
  expect(canvas.getByTestId('carousel-slide-2')).toHaveAttribute('data-active', 'true');
});

// Navigate using thumbnail
const firstThumbnail = await canvas.findByTestId('carousel-thumbnail-0');
await userEvent.click(firstThumbnail);

await waitFor(() => {
  expect(canvas.getByTestId('carousel-slide-0')).toHaveAttribute('data-active', 'true');
});
```

### Props That Affect Test Behavior

#### `variant`
- **Values:** `'default' | 'glass' | 'gradient' | 'elevated' | 'minimal' | 'cards'`
- **Impact:** Changes visual styling but not testId structure
- **Test Tip:** Use same testIds regardless of variant

#### `showArrows`
- **Values:** `boolean` (default: `true`)
- **Impact:** When `false`, navigation buttons are not rendered
- **Test Tip:** Use `queryByTestId` to check for absence

#### `showIndicators`
- **Values:** `boolean` (default: `true`)
- **Impact:** When `false`, indicators are not rendered
- **Test Tip:** Use `queryByTestId` to check for absence

#### `showThumbnails`
- **Values:** `boolean` (default: `false`)
- **Impact:** When `true`, thumbnails container is rendered
- **Test Tip:** Thumbnails only visible when explicitly enabled

#### `autoPlay`
- **Values:** `boolean` (default: `false`)
- **Impact:** Automatically advances slides at `autoPlayInterval`
- **Test Tip:** Use `waitFor` with appropriate timeout

#### `autoPlayInterval`
- **Values:** `number` (milliseconds, default: `3000`)
- **Impact:** Time between automatic slide transitions
- **Test Tip:** Adjust `waitFor` timeout based on interval

#### `pauseOnHover`
- **Values:** `boolean` (default: `true`)
- **Impact:** Pauses autoplay when hovering over carousel
- **Test Tip:** Test with `userEvent.hover()` and `userEvent.unhover()`

#### `loop`
- **Values:** `boolean` (default: `true`)
- **Impact:**
  - When `false`: Navigation buttons disabled at boundaries
  - When `true`: Carousel loops from last to first slide
- **Test Tip:** Test button disabled states at first/last slides

#### `animation`
- **Values:** `'slide' | 'fade' | 'zoom' | 'flip'` (default: `'slide'`)
- **Impact:** Changes transition animation
- **Test Tip:** Use `waitFor` to account for animation duration

#### `disabled`
- **Values:** `boolean` (default: `false`)
- **Impact:** Disables all navigation when `true`
- **Test Tip:** Verify all buttons are disabled

#### `loading`
- **Values:** `boolean` (default: `false`)
- **Impact:** Shows CircularProgress instead of slides
- **Test Tip:** Carousel content not rendered when loading

### Common Test Scenarios

#### 1. Basic Rendering Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Wait for carousel to render
  const container = await canvas.findByTestId('carousel-container');
  expect(container).toBeInTheDocument();

  // Verify track is rendered
  const track = await canvas.findByTestId('carousel-track');
  expect(track).toBeInTheDocument();

  // Verify correct number of slides
  const slides = await canvas.findAllByTestId(/carousel-slide-/);
  expect(slides).toHaveLength(expectedCount);
}
```

#### 2. Navigation Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Wait for render
  await canvas.findByTestId('carousel-container');

  // Test next button
  const nextButton = await canvas.findByTestId('carousel-next-button');
  await userEvent.click(nextButton);

  await waitFor(() => {
    const secondSlide = canvas.getByTestId('carousel-slide-1');
    expect(secondSlide).toHaveAttribute('data-active', 'true');
  }, { timeout: 1000 });

  // Test previous button
  const prevButton = await canvas.findByTestId('carousel-prev-button');
  await userEvent.click(prevButton);

  await waitFor(() => {
    const firstSlide = canvas.getByTestId('carousel-slide-0');
    expect(firstSlide).toHaveAttribute('data-active', 'true');
  }, { timeout: 1000 });
}
```

#### 3. Indicator Navigation Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await canvas.findByTestId('carousel-container');

  // Get all indicators
  const indicators = await canvas.findAllByTestId(/carousel-indicator-/);
  expect(indicators).toHaveLength(expectedCount);

  // Click third indicator
  await userEvent.click(indicators[2]);

  // Verify third slide is active
  await waitFor(() => {
    const thirdSlide = canvas.getByTestId('carousel-slide-2');
    expect(thirdSlide).toHaveAttribute('data-active', 'true');
  }, { timeout: 1000 });

  // Verify third indicator is active
  expect(indicators[2]).toHaveAttribute('data-active', 'true');
}
```

#### 4. Thumbnail Navigation Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await canvas.findByTestId('carousel-container');

  // Verify thumbnails are rendered
  const thumbnailsContainer = await canvas.findByTestId('carousel-thumbnails');
  expect(thumbnailsContainer).toBeInTheDocument();

  // Get all thumbnails
  const thumbnails = await canvas.findAllByTestId(/carousel-thumbnail-/);
  expect(thumbnails).toHaveLength(expectedCount);

  // Click second thumbnail
  await userEvent.click(thumbnails[1]);

  // Verify second slide is active
  await waitFor(() => {
    const secondSlide = canvas.getByTestId('carousel-slide-1');
    expect(secondSlide).toHaveAttribute('data-active', 'true');
  }, { timeout: 1000 });
}
```

#### 5. Autoplay Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const container = await canvas.findByTestId('carousel-container');

  // First slide should be active
  expect(canvas.getByTestId('carousel-slide-0')).toHaveAttribute('data-active', 'true');

  // Wait for autoplay to advance (assuming 2000ms interval)
  await waitFor(() => {
    expect(canvas.getByTestId('carousel-slide-1')).toHaveAttribute('data-active', 'true');
  }, { timeout: 3000 });

  // Test pause on hover
  await userEvent.hover(container);

  // Wait to ensure it doesn't advance
  await new Promise((resolve) => setTimeout(resolve, 2500));

  // Should still be on second slide
  expect(canvas.getByTestId('carousel-slide-1')).toHaveAttribute('data-active', 'true');
}
```

#### 6. Accessibility Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await canvas.findByTestId('carousel-container');

  // Check navigation buttons have labels
  const prevButton = await canvas.findByTestId('carousel-prev-button');
  expect(prevButton).toHaveAttribute('aria-label', 'Previous slide');

  const nextButton = await canvas.findByTestId('carousel-next-button');
  expect(nextButton).toHaveAttribute('aria-label', 'Next slide');

  // Check indicators have labels
  const firstIndicator = await canvas.findByTestId('carousel-indicator-0');
  expect(firstIndicator).toHaveAttribute('aria-label', 'Go to slide 1');
}
```

### Troubleshooting

#### Issue: "Unable to find element with testId X"

**Solution:** Always use `await` with `findByTestId`:
```typescript
// Wrong - synchronous
const element = canvas.getByTestId('carousel-container');

// Correct - asynchronous
const element = await canvas.findByTestId('carousel-container');
```

#### Issue: Test fails intermittently with slide transitions

**Solution:** Use `waitFor` with proper timeout for animations:
```typescript
await waitFor(() => {
  const slide = canvas.getByTestId('carousel-slide-1');
  expect(slide).toHaveAttribute('data-active', 'true');
}, { timeout: 1000 }); // Adjust based on transition duration
```

#### Issue: Can't find active slide

**Solution:** Use `data-active` attribute or query by visibility:
```typescript
// Option 1: Query by data-active attribute
const activeSlide = canvasElement.querySelector('[data-testid^="carousel-slide-"][data-active="true"]');

// Option 2: Check all slides and find the active one
const slides = await canvas.findAllByTestId(/carousel-slide-/);
const activeSlide = slides.find(slide => slide.getAttribute('data-active') === 'true');
```

#### Issue: Navigation buttons not found

**Solution:** Check if `showArrows` prop is true. Use `queryByTestId` to check for absence:
```typescript
// When showArrows=false
const nextButton = canvas.queryByTestId('carousel-next-button');
expect(nextButton).not.toBeInTheDocument();
```

#### Issue: Indicators not rendering

**Solution:** Check if `showIndicators` prop is true:
```typescript
// When showIndicators=true
const indicators = await canvas.findByTestId('carousel-indicators');
expect(indicators).toBeInTheDocument();

// When showIndicators=false
const indicators = canvas.queryByTestId('carousel-indicators');
expect(indicators).not.toBeInTheDocument();
```

#### Issue: Autoplay doesn't advance

**Solution:** Check `autoPlay` prop and `pauseOnHover` behavior:
```typescript
// Ensure not hovering if pauseOnHover=true
const container = await canvas.findByTestId('carousel-container');
await userEvent.unhover(container);

// Wait with appropriate timeout based on autoPlayInterval
await waitFor(() => {
  expect(canvas.getByTestId('carousel-slide-1')).toHaveAttribute('data-active', 'true');
}, { timeout: autoPlayInterval + 1000 });
```

### Best Practices

1. **Always use async/await** with testId queries in Storybook tests
2. **Use `waitFor`** when testing components with animations or transitions
3. **Scope queries** with `within()` when looking inside specific containers
4. **Use regex patterns** for dynamic testIds: `/carousel-slide-/`, `/carousel-indicator-/`
5. **Add timeouts** for animated transitions: `{ timeout: 1000 }`
6. **Check `data-active` attribute** to verify active state instead of relying on CSS
7. **Use `queryByTestId`** when checking for elements that may not exist
8. **Test all navigation methods** (arrows, indicators, thumbnails) independently
9. **Account for autoplay intervals** in timeout values
10. **Unhover elements** before testing autoplay to avoid pause-on-hover
