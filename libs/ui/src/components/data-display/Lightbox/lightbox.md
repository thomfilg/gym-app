Got it — I’ll merge those **advanced features** directly into the master description so your AI has a single, complete spec for building the `Lightbox` component.

---

# Lightbox Component – AI Implementation Description (Extended)

## Purpose

A **Lightbox** is a modal overlay to showcase media (images, videos, or custom content) in a distraction-free way. It emphasizes the active item, dims the background, and provides intuitive navigation and controls.

---

## Core Features

1. **Overlay & Focus**
   - Semi-transparent backdrop covering viewport.
   - Content centered with scroll lock while active.

2. **Media Support**
   - Images, videos, and arbitrary children.
   - Mixed galleries (image + video).

3. **Navigation**
   - Previous/Next controls.
   - Keyboard (`←`, `→`, `Esc`) and swipe support.
   - Optional loop at edges.

4. **Controls**
   - Always-visible close button.
   - Optional captions, share, and download.
   - Configurable via props.

5. **Accessibility**
   - Focus trap, `aria-modal="true"`, `role="dialog"`.
   - Screen reader announcement of current item (“Image 2 of 5”).
   - Escape closes by default.

---

## Advanced Features

- **Thumbnails / Filmstrip**: optional preview strip for quick navigation.
- **Zoom & Pan**: pinch/scroll zoom, drag pan, double-tap reset.
- **Slideshow / Autoplay**: auto-advance with start/stop.
- **Lazy Load & Preload**: load current, preload prev/next.
- **Multi-Item Layout**: switch between single and grid view.
- **Gestures**: swipe left/right to change, swipe down to close (mobile).
- **Share & Download**: Web Share API, link copy, download with watermark support.
- **Animations**: morph from thumbnail to fullscreen, crossfade or slide transitions.
- **Multiple Instances**: independent galleries on one page.
- **Programmatic API**: expose `open(index)`, `close()`, `next()`, `prev()`.

---

## Props

- `isOpen: boolean` – controls visibility.
- `onClose: () => void` – close handler.
- `items?: Array<{ src: string; alt?: string; caption?: string; type?: "image" | "video" }>` – gallery items.
- `startIndex?: number` – initial item index.
- `showControls?: boolean` – toggle controls.
- `showCaptions?: boolean` – toggle captions.
- `loop?: boolean` – loop gallery navigation.
- `autoplay?: boolean` – enable auto slideshow.
- `thumbnails?: boolean` – show filmstrip navigation.
- `zoomable?: boolean` – enable zoom/pan.
- `className?: string` – extend styling.

---

## Visual & Motion Guidelines

- **Backdrop:** 60–80% black opacity.
- **Animation:** fade backdrop, scale/slide media (200–300ms).
- **Transitions:** configurable easing/duration.

---

## Variants

- **Default:** Image viewer with captions.
- **Minimal:** Only close button.
- **Media-Rich:** Mixed gallery.
- **Fullscreen:** 100% viewport expansion.
- **Filmstrip Mode:** with thumbnails.

---

## Testing

### Test IDs

The Lightbox component provides comprehensive test IDs for automated testing. All test IDs can be customized via the `dataTestId` prop.

| Element | Default Test ID | Custom Test ID Pattern |
|---------|----------------|----------------------|
| Overlay/Dialog | `lightbox` | `{dataTestId}` |
| Close Button | `lightbox-close` | `{dataTestId}-close` |
| Previous Button | `lightbox-prev` | `{dataTestId}-prev` |
| Next Button | `lightbox-next` | `{dataTestId}-next` |
| Zoom Controls Container | `lightbox-zoom-controls` | `{dataTestId}-zoom-controls` |
| Zoom In Button | `lightbox-zoom-in` | `{dataTestId}-zoom-in` |
| Zoom Out Button | `lightbox-zoom-out` | `{dataTestId}-zoom-out` |
| Zoom Reset Button | `lightbox-zoom-reset` | `{dataTestId}-zoom-reset` |
| Autoplay Button | `lightbox-autoplay` | `{dataTestId}-autoplay` |
| Content Container | `lightbox-content` | `{dataTestId}-content` |
| Image Container | `lightbox-image-container` | `{dataTestId}-image-container` |
| Image Element | `lightbox-image` | `{dataTestId}-image` |
| Video Element | `lightbox-video` | `{dataTestId}-video` |
| Loading Indicator | `lightbox-loading` | `{dataTestId}-loading` |
| Caption | `lightbox-caption` | `{dataTestId}-caption` |
| Item Counter | `lightbox-counter` | `{dataTestId}-counter` |
| Thumbnails Container | `lightbox-thumbnails` | `{dataTestId}-thumbnails` |
| Individual Thumbnail | `lightbox-thumbnail-{index}` | `{dataTestId}-thumbnail-{index}` |

### Testing Best Practices

1. **Custom Test IDs**: Always provide a `dataTestId` prop when testing multiple lightbox instances on the same page.

```tsx
<Lightbox dataTestId="product-gallery" isOpen={isOpen} onClose={handleClose} items={items} />
```

2. **Wait for Visibility**: Use proper waiting strategies for the overlay to appear/disappear.

```tsx
await waitFor(() => {
  expect(screen.getByTestId('lightbox')).toBeInTheDocument();
});
```

3. **Test User Interactions**: Verify all interactive elements respond correctly.

```tsx
const closeButton = screen.getByTestId('lightbox-close');
await userEvent.click(closeButton);
expect(onCloseMock).toHaveBeenCalled();
```

4. **Test Keyboard Navigation**: Ensure keyboard controls work as expected.

```tsx
await userEvent.keyboard('{Escape}');
expect(onCloseMock).toHaveBeenCalled();

await userEvent.keyboard('{ArrowRight}');
// Verify next image is displayed
```

5. **Accessibility Testing**: Validate ARIA attributes and focus management.

```tsx
const dialog = screen.getByRole('dialog');
expect(dialog).toHaveAttribute('aria-modal', 'true');
expect(dialog).toHaveAttribute('aria-labelledby', 'lightbox-title');
```

### Common Test Scenarios

#### 1. Opening and Closing
- Click close button
- Click backdrop (if enabled)
- Press Escape key
- Swipe down on mobile

#### 2. Navigation
- Click previous/next buttons
- Use keyboard arrows (←, →)
- Swipe left/right on mobile
- Click thumbnails to navigate
- Verify disabled state at boundaries (when loop is off)

#### 3. Loop Behavior
- Test navigation wraps at edges when `loop={true}`
- Test navigation stops at edges when `loop={false}`

#### 4. Zoom and Pan
- Mouse wheel zoom
- Double-click to zoom in
- Double-click to zoom out (when zoomed)
- Drag to pan when zoomed
- Zoom controls (+, -, reset)
- Verify zoom only works on images, not videos

#### 5. Autoplay
- Start/stop slideshow
- Verify auto-advance timing
- Pause on hover/focus (if implemented)
- Spacebar toggle (if enabled)

#### 6. Media Loading
- Loading indicator appears for slow images
- Loading indicator disappears when image loads
- Video controls are visible
- Mixed image/video galleries work correctly

#### 7. Captions
- Caption displays when `showCaptions={true}`
- Caption is hidden when `showCaptions={false}`
- Caption content matches item caption

#### 8. Thumbnails
- Thumbnail strip appears when `thumbnails={true}`
- Current thumbnail is highlighted
- Clicking thumbnail navigates to that item
- Video thumbnails show play icon

#### 9. Accessibility
- Focus trap keeps focus within lightbox
- Screen reader announces current item ("Image 2 of 5")
- All interactive elements have aria-labels
- Dialog has proper ARIA roles and attributes

#### 10. Responsiveness
- Test at viewport widths: 320px, 768px, 1200px, 3200px
- Touch gestures work on mobile devices
- Controls are properly positioned at all sizes

### Example Test Suite

```tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Lightbox } from './Lightbox';

describe('Lightbox', () => {
  const mockItems = [
    { src: '/image1.jpg', alt: 'Image 1', caption: 'First image' },
    { src: '/image2.jpg', alt: 'Image 2', caption: 'Second image' },
    { src: '/video1.mp4', alt: 'Video 1', type: 'video' as const },
  ];

  it('should open and display the lightbox', async () => {
    const onClose = vi.fn();
    render(<Lightbox isOpen={true} onClose={onClose} items={mockItems} />);

    await waitFor(() => {
      expect(screen.getByTestId('lightbox')).toBeInTheDocument();
    });

    expect(screen.getByTestId('lightbox-image')).toHaveAttribute('src', '/image1.jpg');
  });

  it('should navigate to next item', async () => {
    const onClose = vi.fn();
    render(<Lightbox isOpen={true} onClose={onClose} items={mockItems} showControls={true} />);

    const nextButton = screen.getByTestId('lightbox-next');
    await userEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByTestId('lightbox-image')).toHaveAttribute('src', '/image2.jpg');
    });
  });

  it('should close on Escape key', async () => {
    const onClose = vi.fn();
    render(<Lightbox isOpen={true} onClose={onClose} items={mockItems} />);

    await userEvent.keyboard('{Escape}');

    expect(onClose).toHaveBeenCalled();
  });

  it('should display thumbnails when enabled', async () => {
    const onClose = vi.fn();
    render(<Lightbox isOpen={true} onClose={onClose} items={mockItems} thumbnails={true} />);

    await waitFor(() => {
      expect(screen.getByTestId('lightbox-thumbnails')).toBeInTheDocument();
    });

    expect(screen.getByTestId('lightbox-thumbnail-0')).toBeInTheDocument();
    expect(screen.getByTestId('lightbox-thumbnail-1')).toBeInTheDocument();
  });

  it('should zoom in and out', async () => {
    const onClose = vi.fn();
    render(<Lightbox isOpen={true} onClose={onClose} items={mockItems} zoomable={true} />);

    const zoomInButton = screen.getByTestId('lightbox-zoom-in');
    const zoomOutButton = screen.getByTestId('lightbox-zoom-out');

    await userEvent.click(zoomInButton);
    // Verify zoom level increased

    await userEvent.click(zoomOutButton);
    // Verify zoom level decreased
  });
});
```

### Storybook Tests

- **Visual regression**: Overlay appearance, transitions, zoom states
- **Interaction**: Navigation buttons, keyboard controls, autoplay, gestures
- **Accessibility**: Roles, ARIA attributes, focus management, announcements
- **Responsive**: Layout at various viewport sizes
