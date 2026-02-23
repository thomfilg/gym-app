# Modal Component

## Overview

The Modal component provides a flexible dialog overlay system for displaying content that requires user attention or interaction. Built on Material-UI's Modal component, it offers multiple positioning variants, size options, visual effects, and comprehensive accessibility features. The Modal is ideal for forms, confirmations, detailed views, or any content that needs to temporarily take focus from the main application.

## Features

- **Multiple Variants**: Center, top, bottom, and glass positioning options
- **Flexible Sizing**: Five size options from extra small to extra large
- **Visual Effects**: Glass morphism, gradient backgrounds, glow effects, and pulse animations
- **Backdrop Control**: Customizable backdrop with blur effects
- **Persistent Mode**: Prevent closing on backdrop click or escape key
- **Smooth Transitions**: Slide and fade animations based on variant
- **Responsive Design**: Adapts to viewport size with max-width constraints
- **Border Radius Control**: Customizable corner rounding from none to extra large
- **Accessibility**: Full ARIA support and keyboard navigation
- **Theme Integration**: Seamlessly integrates with Material-UI theme system

## Props

### Modal Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | (required) | Controls the modal visibility |
| `onClose` | `() => void` | `undefined` | Callback fired when the modal should close |
| `children` | `ReactNode` | (required) | Content to display in the modal |
| `variant` | `'center' \| 'top' \| 'bottom' \| 'glass'` | `'center'` | Positioning and visual style variant |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Modal width (320px to 960px) |
| `backdrop` | `boolean` | `true` | Whether to show the backdrop overlay |
| `persistent` | `boolean` | `false` | If true, modal won't close on backdrop click or escape key |
| `glass` | `boolean` | `false` | Enables glass morphism effect with backdrop blur |
| `gradient` | `boolean` | `false` | Applies gradient background effect |
| `glow` | `boolean` | `false` | Adds glowing shadow effect around modal |
| `pulse` | `boolean` | `false` | Enables pulsing animation effect |
| `borderRadius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'lg'` | Controls corner rounding |
| `dataTestId` | `string` | `undefined` | Custom test ID for testing (auto-generates child IDs) |

### ModalContent Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | (required) | Content to display inside the modal content area |
| `padding` | `number \| string` | `3` | Padding value (theme spacing units) |
| `dataTestId` | `string` | `undefined` | Custom test ID for the content container |

## Usage

### Basic Modal

```tsx
import { Modal, ModalContent } from '@procurement/ui';
import { useState } from 'react';

function BasicModalExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalContent>
          <h2>Modal Title</h2>
          <p>This is the modal content.</p>
        </ModalContent>
      </Modal>
    </>
  );
}
```

### Sized Modals

```tsx
// Extra Small Modal (320px)
<Modal open={open} onClose={handleClose} size="xs">
  <ModalContent>
    <p>Compact modal for quick actions</p>
  </ModalContent>
</Modal>

// Large Modal (800px)
<Modal open={open} onClose={handleClose} size="lg">
  <ModalContent>
    <p>Spacious modal for detailed content</p>
  </ModalContent>
</Modal>

// Extra Large Modal (960px)
<Modal open={open} onClose={handleClose} size="xl">
  <ModalContent>
    <p>Maximum width modal for complex forms or data</p>
  </ModalContent>
</Modal>
```

### Positioned Modals

```tsx
// Top-aligned Modal (slides down)
<Modal open={open} onClose={handleClose} variant="top">
  <ModalContent>
    <p>Notification-style modal at the top</p>
  </ModalContent>
</Modal>

// Bottom-aligned Modal (slides up)
<Modal open={open} onClose={handleClose} variant="bottom">
  <ModalContent>
    <p>Mobile-friendly bottom sheet style</p>
  </ModalContent>
</Modal>
```

### Glass Morphism Effect

```tsx
<Modal open={open} onClose={handleClose} variant="glass">
  <ModalContent>
    <h2>Beautiful Glass Design</h2>
    <p>With frosted glass effect and subtle backdrop blur</p>
  </ModalContent>
</Modal>

// Or with glass prop on any variant
<Modal open={open} onClose={handleClose} glass>
  <ModalContent>
    <p>Glass effect on center modal</p>
  </ModalContent>
</Modal>
```

### Gradient Background

```tsx
<Modal open={open} onClose={handleClose} gradient>
  <ModalContent>
    <h2>Gradient Modal</h2>
    <p>Eye-catching gradient background from primary to secondary colors</p>
  </ModalContent>
</Modal>
```

### Visual Effects

```tsx
// Glowing Modal
<Modal open={open} onClose={handleClose} glow>
  <ModalContent>
    <p>Modal with a subtle glow effect</p>
  </ModalContent>
</Modal>

// Pulsing Modal (for attention)
<Modal open={open} onClose={handleClose} pulse>
  <ModalContent>
    <p>Pulsing animation for important messages</p>
  </ModalContent>
</Modal>

// Combined Effects
<Modal open={open} onClose={handleClose} glass glow pulse>
  <ModalContent>
    <p>Maximum visual impact with all effects</p>
  </ModalContent>
</Modal>
```

### Persistent Modal

```tsx
// Modal that can only be closed via explicit action
<Modal open={open} onClose={handleClose} persistent>
  <ModalContent>
    <h2>Important Action Required</h2>
    <p>You must confirm or cancel to proceed.</p>
    <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
      <Button onClick={handleConfirm}>Confirm</Button>
      <Button onClick={() => setOpen(false)}>Cancel</Button>
    </Box>
  </ModalContent>
</Modal>
```

### No Backdrop

```tsx
// Modal without backdrop overlay
<Modal open={open} onClose={handleClose} backdrop={false}>
  <ModalContent>
    <p>Modal without darkened background</p>
  </ModalContent>
</Modal>
```

### Custom Border Radius

```tsx
// Sharp corners
<Modal open={open} onClose={handleClose} borderRadius="none">
  <ModalContent>
    <p>No rounded corners</p>
  </ModalContent>
</Modal>

// Extra rounded
<Modal open={open} onClose={handleClose} borderRadius="xl">
  <ModalContent>
    <p>Very rounded corners for a softer look</p>
  </ModalContent>
</Modal>
```

### Complex Modal with Custom Content

```tsx
import { Box, Typography, Button, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

function ComplexModalExample() {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      size="lg"
      dataTestId="user-profile-modal"
    >
      <ModalContent dataTestId="user-profile-content">
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5">User Profile</Typography>
          <IconButton onClick={() => setOpen(false)} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Body */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" paragraph>
            Edit your profile information below.
          </Typography>
          {/* Form fields would go here */}
        </Box>

        {/* Footer */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button variant="outlined" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save Changes
          </Button>
        </Box>
      </ModalContent>
    </Modal>
  );
}
```

## Variants

### Center Modal (Default)
- Positions modal at the center of the viewport
- Fade transition animation
- Maximum height of 90vh with vertical scroll
- Best for general-purpose dialogs and forms

### Top Modal
- Positions modal 10% from the top
- Slide down transition animation
- Maximum height of 80vh with vertical scroll
- Ideal for notifications and alerts

### Bottom Modal
- Positions modal 10% from the bottom
- Slide up transition animation
- Maximum height of 80vh with vertical scroll
- Perfect for mobile-style bottom sheets and action panels

### Glass Modal
- Center positioned with glass morphism design
- Frosted glass effect with backdrop blur
- Semi-transparent background
- Subtle border and shadow
- Modern, elegant appearance

## Size Options

| Size | Width | Use Case |
|------|-------|----------|
| `xs` | 320px | Confirmations, simple alerts |
| `sm` | 480px | Short forms, quick actions |
| `md` | 640px | Standard dialogs, medium forms |
| `lg` | 800px | Detailed forms, content viewers |
| `xl` | 960px | Complex forms, data tables, rich content |

All sizes include `maxWidth: '90vw'` to ensure responsiveness on smaller screens.

## Accessibility

The Modal component implements comprehensive accessibility features:

### ARIA Support
- Modal container uses appropriate ARIA roles
- Focus is trapped within the modal when open
- Focus returns to trigger element on close
- Screen readers announce modal opening/closing

### Keyboard Navigation
- **Escape Key**: Closes the modal (unless `persistent` is true)
- **Tab Key**: Cycles through focusable elements within modal
- **Shift + Tab**: Reverse tab navigation
- First focusable element receives focus on open

### Focus Management
- Auto-focuses first interactive element
- Prevents focus from leaving modal
- Restores focus on close
- Handles nested focusable elements

### Screen Reader Support
- Proper role attributes for modal and backdrop
- Live regions for dynamic content updates
- Descriptive labels for interactive elements
- Content hierarchy with semantic HTML

## Styling

The Modal component leverages Material-UI theming:

### Theme Integration
- Respects theme palette for colors
- Uses theme spacing units for sizing
- Applies theme transitions for animations
- Follows theme shadows and elevations

### Responsive Design
- Max width constraints prevent overflow
- Vertical scrolling for tall content
- Adapts to small viewports
- Touch-friendly on mobile devices

### Visual Effects
- Backdrop blur for glass effects
- CSS animations for pulse effect
- Box shadows for glow and depth
- Gradient overlays when enabled

## Best Practices

1. **Use Appropriate Sizes**: Choose size based on content complexity
   - xs/sm for simple confirmations
   - md for standard forms
   - lg/xl for complex data or multi-step flows

2. **Consider Mobile Experience**: Test modals on smaller screens
   - Bottom variant works well on mobile
   - Ensure touch targets are large enough
   - Avoid excessive nested scrolling

3. **Manage Focus**:
   - Always provide a way to close the modal
   - Place primary action at logical focus point
   - Don't trap users without clear exit

4. **Use Persistent Sparingly**: Only for critical actions
   - Avoid overusing persistent modals
   - Always provide explicit close actions
   - Use for destructive or important confirmations

5. **Optimize Content**:
   - Keep content concise and scannable
   - Use clear headings and sections
   - Avoid excessive scrolling
   - Consider breaking complex flows into steps

6. **Effects and Styling**:
   - Don't combine too many effects (glass + glow + pulse)
   - Use glow/pulse for important messages only
   - Ensure sufficient contrast for readability
   - Test glass effects on various backgrounds

7. **Accessibility First**:
   - Always provide close button with aria-label
   - Use semantic HTML structure
   - Test with keyboard navigation
   - Verify screen reader announcements

## Testing

### Test IDs

The Modal component provides automatic test ID generation for easy testing:

| Test ID | Element | Description |
|---------|---------|-------------|
| `modal` | Modal container | Main modal content wrapper |
| `modal-backdrop` | Backdrop overlay | Semi-transparent overlay behind modal |
| `modal-content` | ModalContent | Content container with padding |

Custom test IDs can be provided via the `dataTestId` prop:

```typescript
<Modal dataTestId="custom-modal" />
// Results in: custom-modal, custom-modal-backdrop

<ModalContent dataTestId="custom-content" />
// Results in: custom-content
```

### Testing Best Practices

**Wait for Modal to Open:**
```typescript
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('modal opens when triggered', async () => {
  render(<MyComponent />);

  const openButton = screen.getByRole('button', { name: /open modal/i });
  await userEvent.click(openButton);

  const modal = await screen.findByTestId('modal');
  expect(modal).toBeInTheDocument();
  expect(modal).toBeVisible();
});
```

**Test Backdrop Click Behavior:**
```typescript
test('modal closes on backdrop click', async () => {
  const onClose = jest.fn();
  render(<Modal open={true} onClose={onClose}><div>Content</div></Modal>);

  const backdrop = screen.getByTestId('modal-backdrop');
  await userEvent.click(backdrop);

  expect(onClose).toHaveBeenCalledTimes(1);
});

test('persistent modal does not close on backdrop click', async () => {
  const onClose = jest.fn();
  render(
    <Modal open={true} onClose={onClose} persistent>
      <div>Content</div>
    </Modal>
  );

  const backdrop = screen.getByTestId('modal-backdrop');
  await userEvent.click(backdrop);

  expect(onClose).not.toHaveBeenCalled();
});
```

**Test Escape Key Behavior:**
```typescript
test('modal closes on escape key', async () => {
  const onClose = jest.fn();
  render(<Modal open={true} onClose={onClose}><div>Content</div></Modal>);

  await userEvent.keyboard('{Escape}');

  expect(onClose).toHaveBeenCalledTimes(1);
});

test('persistent modal does not close on escape key', async () => {
  const onClose = jest.fn();
  render(
    <Modal open={true} onClose={onClose} persistent>
      <div>Content</div>
    </Modal>
  );

  await userEvent.keyboard('{Escape}');

  expect(onClose).not.toHaveBeenCalled();
});
```

**Test Modal Content:**
```typescript
test('renders modal content correctly', async () => {
  render(
    <Modal open={true}>
      <ModalContent dataTestId="test-content">
        <h2>Modal Title</h2>
        <p>Modal description</p>
      </ModalContent>
    </Modal>
  );

  const content = await screen.findByTestId('test-content');
  expect(content).toHaveTextContent('Modal Title');
  expect(content).toHaveTextContent('Modal description');
});
```

**Test Visual Variants:**
```typescript
test('applies glass effect styles', async () => {
  render(
    <Modal open={true} variant="glass" dataTestId="glass-modal">
      <div>Content</div>
    </Modal>
  );

  const modal = await screen.findByTestId('glass-modal');
  const styles = window.getComputedStyle(modal);

  expect(styles.backdropFilter).toContain('blur');
});

test('applies gradient background', async () => {
  render(
    <Modal open={true} gradient dataTestId="gradient-modal">
      <div>Content</div>
    </Modal>
  );

  const modal = await screen.findByTestId('gradient-modal');
  const styles = window.getComputedStyle(modal);

  expect(styles.background).toContain('linear-gradient');
});
```

**Test Sizing:**
```typescript
test.each([
  ['xs', 320],
  ['sm', 480],
  ['md', 640],
  ['lg', 800],
  ['xl', 960],
])('applies correct width for size %s', async (size, width) => {
  render(
    <Modal open={true} size={size as any} dataTestId={`modal-${size}`}>
      <div>Content</div>
    </Modal>
  );

  const modal = await screen.findByTestId(`modal-${size}`);
  const styles = window.getComputedStyle(modal);

  expect(styles.width).toBe(`${width}px`);
});
```

### Common Test Scenarios

1. **Modal Opening/Closing**
   - Verify modal opens when triggered
   - Verify modal closes on close action
   - Test open/close state transitions

2. **Backdrop Interaction**
   - Test backdrop click closes modal
   - Test persistent mode prevents backdrop close
   - Verify backdrop visibility

3. **Keyboard Navigation**
   - Test escape key closes modal
   - Test tab navigation within modal
   - Test focus trap behavior

4. **Content Rendering**
   - Verify children render correctly
   - Test ModalContent component
   - Check content overflow and scrolling

5. **Variants and Sizes**
   - Test all variant positions
   - Verify size dimensions
   - Check responsive behavior

6. **Visual Effects**
   - Test glass effect application
   - Verify gradient backgrounds
   - Check glow and pulse animations

7. **Accessibility**
   - Test focus management
   - Verify ARIA attributes
   - Check screen reader compatibility

### Storybook Testing

The Modal component includes comprehensive Storybook stories for visual testing:

```typescript
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export const InteractiveModal = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and click open button
    const openButton = canvas.getByRole('button', { name: /open modal/i });
    await userEvent.click(openButton);

    // Verify modal appears
    const modal = await canvas.findByTestId('modal');
    expect(modal).toBeInTheDocument();

    // Find and click close button
    const closeButton = canvas.getByRole('button', { name: /close/i });
    await userEvent.click(closeButton);

    // Verify modal closes
    await waitFor(() => {
      expect(canvas.queryByTestId('modal')).not.toBeInTheDocument();
    });
  },
};
```

## Related Components

- **Dialog** - Pre-structured modal with header, content, and actions
- **Drawer** - Side-sliding panel for navigation or supplementary content
- **Alert** - Inline notifications without overlay
- **Toast** - Non-intrusive temporary notifications
- **Popover** - Lightweight overlay for contextual information
