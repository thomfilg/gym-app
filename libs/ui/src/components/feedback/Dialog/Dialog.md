# Dialog Component

## Overview

The Dialog component provides a powerful, flexible modal dialog system with multiple variants, advanced styling options, and comprehensive accessibility features. It includes support for glass morphism effects, fullscreen and drawer modes, and comes with composable sub-components for header, content, and actions.

## Features

- **Multiple Variants**: Default, glass, fullscreen, and drawer modes
- **Flexible Sizing**: Five size options (xs, sm, md, lg, xl)
- **Composable Architecture**: Separate DialogHeader, DialogContent, and DialogActions components
- **Advanced Styling**: Glass morphism, gradient backgrounds, glow, and pulse effects
- **Persistent Mode**: Prevent dismissal via backdrop click or escape key
- **Customizable Border Radius**: Five border radius options (none, sm, md, lg, xl)
- **Optional Backdrop**: Can be disabled for custom overlay behavior
- **Close Button**: Optional close button in header
- **Full Accessibility**: ARIA attributes, keyboard navigation, and focus management
- **Theme Integration**: Material-UI theming with custom color support

## Props

### Dialog Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | (required) | Controls dialog visibility |
| `onClose` | `() => void` | `undefined` | Callback when dialog is closed |
| `variant` | `'default' \| 'glass' \| 'fullscreen' \| 'drawer'` | `'default'` | Visual style variant of the dialog |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Dialog size (xs: 400px, sm: 600px, md: 800px, lg: 1000px, xl: 1200px) |
| `title` | `ReactNode` | `undefined` | Dialog title content |
| `description` | `string` | `undefined` | Dialog subtitle/description text |
| `showCloseButton` | `boolean` | `true` | Whether to show close button in header |
| `backdrop` | `boolean` | `true` | Whether to show backdrop overlay |
| `persistent` | `boolean` | `false` | If true, prevents dismissal via backdrop or escape key |
| `glass` | `boolean` | `false` | Enables glass morphism effect with backdrop blur |
| `gradient` | `boolean` | `false` | Enables gradient background |
| `glow` | `boolean` | `false` | Adds glowing shadow effect |
| `pulse` | `boolean` | `false` | Adds pulsing animation effect |
| `borderRadius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'lg'` | Border radius size |
| `children` | `ReactNode` | (required) | Dialog content |
| `dataTestId` | `string` | `undefined` | Custom test ID for testing |

### DialogHeader Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `ReactNode` | `undefined` | Header title content |
| `subtitle` | `ReactNode` | `undefined` | Header subtitle content |
| `showCloseButton` | `boolean` | `true` | Whether to show close button |
| `onClose` | `() => void` | `undefined` | Callback when close button is clicked |
| `children` | `ReactNode` | `undefined` | Custom header content (overrides title/subtitle) |
| `dataTestId` | `string` | `undefined` | Custom test ID for testing |

### DialogContent Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | (required) | Content to display in dialog body |
| `dividers` | `boolean` | `false` | Whether to show top and bottom dividers |
| `dense` | `boolean` | `false` | Use reduced padding for compact layouts |
| `dataTestId` | `string` | `undefined` | Custom test ID for testing |

### DialogActions Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | (required) | Action buttons or elements |
| `alignment` | `'left' \| 'center' \| 'right' \| 'space-between'` | `'right'` | Alignment of action buttons |
| `spacing` | `number` | `1` | Gap spacing between buttons |
| `dataTestId` | `string` | `undefined` | Custom test ID for testing |

## Usage

### Basic Dialog

```tsx
import { Dialog, DialogContent, DialogActions, Button } from '@procurement/ui';

function BasicDialog() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Basic Dialog"
        description="This is a simple dialog example"
      >
        <DialogContent>
          <p>Dialog content goes here.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpen(false)}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
```

### Glass Morphism Effect

```tsx
<Dialog
  open={open}
  onClose={() => setOpen(false)}
  variant="glass"
  title="Glass Effect Dialog"
  glass
>
  <DialogContent>
    <p>Beautiful glass morphism with backdrop blur.</p>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpen(false)}>Close</Button>
  </DialogActions>
</Dialog>
```

### Fullscreen Dialog

```tsx
<Dialog
  open={open}
  onClose={() => setOpen(false)}
  variant="fullscreen"
  title="Fullscreen Mode"
  description="Dialog takes up entire viewport"
>
  <DialogContent>
    <p>Fullscreen dialog content with lots of space.</p>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpen(false)}>Close</Button>
  </DialogActions>
</Dialog>
```

### Drawer Dialog

```tsx
<Dialog
  open={open}
  onClose={() => setOpen(false)}
  variant="drawer"
  title="Drawer Panel"
  size="md"
>
  <DialogContent>
    <p>Slides in from the right side.</p>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpen(false)}>Close</Button>
  </DialogActions>
</Dialog>
```

### Persistent Dialog

```tsx
<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Confirm Action"
  persistent
>
  <DialogContent>
    <p>This dialog cannot be dismissed by clicking the backdrop or pressing escape.</p>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="contained" color="error" onClick={handleDelete}>
      Delete
    </Button>
  </DialogActions>
</Dialog>
```

### With Glow and Pulse Effects

```tsx
<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Attention Required"
  glow
  pulse
  variant="default"
>
  <DialogContent>
    <p>Important message with visual effects.</p>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpen(false)}>Acknowledge</Button>
  </DialogActions>
</Dialog>
```

### Custom Header

```tsx
<Dialog open={open} onClose={() => setOpen(false)}>
  <DialogHeader>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Avatar>JD</Avatar>
      <Box>
        <Typography variant="h6">Custom Header</Typography>
        <Typography variant="caption">With custom layout</Typography>
      </Box>
    </Box>
  </DialogHeader>
  <DialogContent>
    <p>Dialog with custom header content.</p>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpen(false)}>Close</Button>
  </DialogActions>
</Dialog>
```

### Different Sizes

```tsx
// Extra Small
<Dialog open={open} onClose={handleClose} title="XS Dialog" size="xs">
  <DialogContent>Compact dialog (400px)</DialogContent>
</Dialog>

// Small
<Dialog open={open} onClose={handleClose} title="SM Dialog" size="sm">
  <DialogContent>Small dialog (600px)</DialogContent>
</Dialog>

// Medium (default)
<Dialog open={open} onClose={handleClose} title="MD Dialog" size="md">
  <DialogContent>Medium dialog (800px)</DialogContent>
</Dialog>

// Large
<Dialog open={open} onClose={handleClose} title="LG Dialog" size="lg">
  <DialogContent>Large dialog (1000px)</DialogContent>
</Dialog>

// Extra Large
<Dialog open={open} onClose={handleClose} title="XL Dialog" size="xl">
  <DialogContent>Extra large dialog (1200px)</DialogContent>
</Dialog>
```

### Form Dialog

```tsx
function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({ name: '', email: '' });

  const handleSubmit = () => {
    console.log('Submitting:', formData);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      title="User Information"
      description="Please fill in your details"
    >
      <DialogContent dividers>
        <TextField
          label="Name"
          fullWidth
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          fullWidth
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </DialogContent>
      <DialogActions alignment="space-between">
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
```

## Variants

### Default
Standard dialog with Material-UI paper background and elevation.

### Glass
Glass morphism effect with backdrop blur, semi-transparent background, and subtle border.

### Fullscreen
Full viewport dialog that takes up the entire screen, useful for complex forms or detailed views.

### Drawer
Slides in from the right side of the screen, similar to a side panel or drawer.

## Accessibility

The Dialog component implements comprehensive accessibility features:

- **ARIA Roles**: Uses `role="dialog"` with proper ARIA attributes
- **ARIA Labels**: Proper labeling for title (`aria-labelledby`) and description (`aria-describedby`)
- **Focus Management**:
  - Focus is trapped within dialog when open
  - Focus returns to trigger element when closed
  - First focusable element receives focus on open
- **Keyboard Navigation**:
  - `Escape` - Closes dialog (unless persistent mode is enabled)
  - `Tab` - Navigates between focusable elements
  - `Shift + Tab` - Reverse navigation
- **Screen Reader Support**: Announces dialog opening and closing
- **Backdrop Click**: Can be disabled via `persistent` prop for better UX

## Styling

The Dialog component uses Material-UI theming and supports:

- Theme-aware colors and backgrounds
- Responsive design that adapts to viewport size
- Custom border radius configurations
- Glass morphism with backdrop blur
- Gradient backgrounds
- Glow effects using box-shadow
- Pulse animations with keyframes
- Smooth transitions for all interactive states

## Best Practices

1. **Use appropriate variants**: Choose variant based on context (default for most cases, fullscreen for complex content, drawer for side panels)
2. **Keep titles concise**: Dialog titles should be clear and brief
3. **Use persistent mode sparingly**: Only for critical actions that require user confirmation
4. **Provide clear actions**: Always include clear primary and secondary actions
5. **Consider mobile**: Test dialog responsiveness on mobile devices
6. **Avoid nesting dialogs**: Don't open dialogs from within dialogs
7. **Focus management**: Ensure proper focus handling for keyboard users
8. **Loading states**: Show loading indicators for async operations in dialogs

## Testing

### Test IDs

| Test ID | Element | Description |
|---------|---------|-------------|
| `dialog` | Dialog container | Main dialog wrapper (Paper or Drawer component) |
| `dialog-title` | Dialog title | Header title section |
| `dialog-content` | Dialog content | Dialog body content area |
| `dialog-actions` | Dialog actions | Footer actions container |
| `dialog-close` | Close button | Close button in header (when showCloseButton is true) |

Custom test IDs can be provided via the `dataTestId` prop:
```typescript
<Dialog dataTestId="custom-dialog" />
// Results in: custom-dialog, custom-dialog-title, custom-dialog-content, custom-dialog-actions, custom-dialog-close
```

The `dataTestId` prop can also be passed to individual sub-components:
```typescript
<DialogHeader dataTestId="header" />
<DialogContent dataTestId="content" />
<DialogActions dataTestId="actions" />
```

### Testing Best Practices

**Wait for Dialog to Open:**
```typescript
const dialog = await canvas.findByTestId('dialog');
expect(dialog).toBeInTheDocument();
```

**Test Close Interaction:**
```typescript
const closeButton = await canvas.findByTestId('dialog-close');
await userEvent.click(closeButton);
expect(onClose).toHaveBeenCalled();
```

**Test Actions:**
```typescript
const actions = await canvas.findByTestId('dialog-actions');
const confirmButton = within(actions).getByRole('button', { name: /confirm/i });
await userEvent.click(confirmButton);
expect(handleConfirm).toHaveBeenCalled();
```

**Test Backdrop Click:**
```typescript
// For non-persistent dialogs
const backdrop = document.querySelector('.MuiBackdrop-root');
await userEvent.click(backdrop);
expect(onClose).toHaveBeenCalled();

// For persistent dialogs
await userEvent.click(backdrop);
expect(onClose).not.toHaveBeenCalled();
```

**Test Keyboard Navigation:**
```typescript
await userEvent.keyboard('{Escape}');
expect(onClose).toHaveBeenCalled();

await userEvent.keyboard('{Tab}');
expect(document.activeElement).toBe(firstFocusableElement);
```

**Test Focus Management:**
```typescript
const dialog = await canvas.findByTestId('dialog');
const firstButton = within(dialog).getAllByRole('button')[0];
expect(document.activeElement).toBe(firstButton);
```

### Common Test Scenarios

1. **Dialog Opens and Closes** - Verify open prop controls visibility
2. **Close Button Functionality** - Test close button triggers onClose callback
3. **Backdrop Dismiss** - Test clicking backdrop closes dialog (when not persistent)
4. **Persistent Mode** - Verify persistent dialog cannot be dismissed via backdrop/escape
5. **Keyboard Navigation** - Test escape key closes dialog
6. **Focus Trap** - Verify focus stays within dialog when open
7. **Multiple Variants** - Test all variants render correctly (default, glass, fullscreen, drawer)
8. **Size Variations** - Test all size options
9. **Custom Actions** - Verify action buttons work correctly
10. **Form Submission** - Test form dialogs handle submit/cancel properly
11. **Accessibility** - Verify ARIA attributes are present and correct
12. **Visual Effects** - Test glow and pulse effects render without errors

### Example Test

```typescript
import { render, screen, within, userEvent } from '@testing-library/react';
import { Dialog, DialogContent, DialogActions } from './Dialog';

describe('Dialog Component', () => {
  it('should open and close dialog', async () => {
    const onClose = vi.fn();
    const { rerender } = render(
      <Dialog open={false} onClose={onClose} title="Test Dialog">
        <DialogContent>Content</DialogContent>
      </Dialog>
    );

    expect(screen.queryByTestId('dialog')).not.toBeInTheDocument();

    rerender(
      <Dialog open={true} onClose={onClose} title="Test Dialog">
        <DialogContent>Content</DialogContent>
      </Dialog>
    );

    const dialog = await screen.findByTestId('dialog');
    expect(dialog).toBeInTheDocument();
    expect(screen.getByTestId('dialog-title')).toHaveTextContent('Test Dialog');
  });

  it('should call onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    render(
      <Dialog open={true} onClose={onClose} title="Test Dialog">
        <DialogContent>Content</DialogContent>
      </Dialog>
    );

    const closeButton = await screen.findByTestId('dialog-close');
    await userEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should not close persistent dialog on backdrop click', async () => {
    const onClose = vi.fn();
    render(
      <Dialog open={true} onClose={onClose} title="Test Dialog" persistent>
        <DialogContent>Content</DialogContent>
      </Dialog>
    );

    const backdrop = document.querySelector('.MuiBackdrop-root');
    await userEvent.click(backdrop);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('should render custom actions', async () => {
    const handleConfirm = vi.fn();
    render(
      <Dialog open={true} title="Confirm Action">
        <DialogContent>Are you sure?</DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    );

    const actions = await screen.findByTestId('dialog-actions');
    const confirmButton = within(actions).getByRole('button', { name: /confirm/i });
    await userEvent.click(confirmButton);
    expect(handleConfirm).toHaveBeenCalled();
  });
});
```

## Related Components

- **AlertDialog** - Simplified dialog for alerts and confirmations
- **Drawer** - Side panel component (used internally for drawer variant)
- **Modal** - Lower-level modal component
- **Popover** - Lightweight overlay for contextual content
- **Sheet** - Bottom sheet component for mobile-first experiences
