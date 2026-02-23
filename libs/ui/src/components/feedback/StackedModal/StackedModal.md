# StackedModal Component

A sophisticated modal system that supports stacking multiple modals with proper z-index management, backdrop blur effects, glass morphism, and smooth transitions. The component is inspired by Google Tag Manager's UI and features intelligent performance optimization by only rendering the current and parent modals.

## Features

- **Modal Stacking**: Support for multiple nested modals with proper z-index management
- **Glass Morphism**: Beautiful blur effects with customizable backdrop styles
- **Performance Optimized**: Only renders current and parent modal for optimal performance
- **Responsive Design**: Adapts to mobile, tablet, and desktop viewports
- **Accessibility**: Full ARIA support, keyboard navigation, and focus management
- **RTL Support**: Built-in support for right-to-left languages
- **Loading States**: Skeleton loading overlays for async content
- **Customizable Actions**: Flexible header/footer action buttons

## Usage

### Basic Usage

```tsx
import { StackedModal, ModalStackProvider } from '@procurement/ui';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <ModalStackProvider>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <StackedModal
        open={open}
        onClose={() => setOpen(false)}
        navigationTitle="My Modal"
      >
        <ModalContent>
          <Typography>Modal content here</Typography>
        </ModalContent>
      </StackedModal>
    </ModalStackProvider>
  );
}
```

### With Glass Morphism

```tsx
<StackedModal
  open={open}
  onClose={() => setOpen(false)}
  glass={true}
  navigationTitle="Glass Modal"
>
  <ModalContent>
    <Typography>Beautiful glass effect</Typography>
  </ModalContent>
</StackedModal>
```

### Nested Modals

```tsx
function NestedModals() {
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);

  return (
    <>
      <StackedModal
        open={firstOpen}
        onClose={() => setFirstOpen(false)}
        navigationTitle="First Modal"
        modalId="modal-1"
      >
        <ModalContent>
          <Button onClick={() => setSecondOpen(true)}>
            Open Nested Modal
          </Button>
        </ModalContent>
      </StackedModal>

      <StackedModal
        open={secondOpen}
        onClose={() => setSecondOpen(false)}
        navigationTitle="Second Modal"
        modalId="modal-2"
      >
        <ModalContent>
          <Typography>Nested modal content</Typography>
        </ModalContent>
      </StackedModal>
    </>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Controls modal visibility |
| `onClose` | `() => void` | - | Callback when modal is closed |
| `navigationTitle` | `string` | - | Title displayed in modal header |
| `children` | `ReactNode` | - | Modal content |
| `glass` | `boolean` | `false` | Enable glass morphism effect |
| `actions` | `ReactNode` | - | Custom action buttons for header/footer |
| `modalId` | `string` | - | Unique identifier for modal in stack |
| `closeOnClickOutside` | `boolean` | `true` | Allow closing by clicking backdrop |
| `closeOnEsc` | `boolean` | `true` | Allow closing with escape key |
| `loading` | `boolean` | `false` | Show loading skeleton overlay |
| `loadingText` | `string` | `'Loading...'` | Text shown during loading state |
| `fullScreen` | `boolean` | `false` | Full screen mode |
| `maxWidth` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| false` | `'md'` | Maximum modal width |
| `disableBackdrop` | `boolean` | `false` | Hide backdrop |
| `disableFocusTrap` | `boolean` | `false` | Disable focus trapping |
| `keepMounted` | `boolean` | `false` | Keep modal mounted when closed |
| `aria-labelledby` | `string` | - | ARIA label reference |
| `aria-describedby` | `string` | - | ARIA description reference |
| `rtl` | `boolean` | `false` | Right-to-left language support |

## Context API

The component provides a context API for managing the modal stack:

```tsx
const { stack, push, pop, clear } = useModalStack();
```

- `stack`: Current modal stack array
- `push(modalId)`: Add modal to stack
- `pop()`: Remove top modal from stack
- `clear()`: Clear entire stack

## Accessibility

- Full keyboard navigation support (Tab, Shift+Tab, Escape)
- Focus trapped within active modal
- Proper ARIA attributes for screen readers
- Semantic HTML structure
- Accessible loading states

## Testing

The StackedModal component provides comprehensive test IDs for all interactive elements through the `dataTestId` prop. When provided, it generates consistent test IDs for all child elements.

### Available Test IDs

When you provide `dataTestId="my-modal"`, the following test IDs are automatically generated:

| Element | Test ID | Description |
|---------|---------|-------------|
| Modal Container | `my-modal` | The root dialog element |
| Header | `my-modal-header` | The modal header container |
| Title | `my-modal-title` | The navigation title text |
| Close Button | `my-modal-close-button` | The close button (when no modals stacked) |
| Back Button | `my-modal-back-button` | The back button (when modals are stacked) |
| Header Actions | `my-modal-header-actions` | Container for header actions (desktop) |
| Content | `my-modal-content` | The main content area |
| Footer | `my-modal-footer` | The footer actions container (mobile) |
| Loading Overlay | `my-modal-loading-overlay` | The loading state overlay |
| Loading Spinner | `my-modal-loading-spinner` | The circular progress indicator |
| Loading Text | `my-modal-loading-text` | The loading message text |

### Testing Example

```tsx
import { render, screen } from '@testing-library/react';
import { StackedModal, ModalStackProvider } from '@procurement/ui';

test('renders modal with test IDs', () => {
  render(
    <ModalStackProvider>
      <StackedModal
        open={true}
        onClose={jest.fn()}
        navigationTitle="Test Modal"
        dataTestId="test-modal"
      >
        <ModalContent>Content here</ModalContent>
      </StackedModal>
    </ModalStackProvider>
  );

  // Access elements by test ID
  expect(screen.getByTestId('test-modal')).toBeInTheDocument();
  expect(screen.getByTestId('test-modal-header')).toBeInTheDocument();
  expect(screen.getByTestId('test-modal-title')).toHaveTextContent('Test Modal');
  expect(screen.getByTestId('test-modal-close-button')).toBeInTheDocument();
  expect(screen.getByTestId('test-modal-content')).toBeInTheDocument();
});
```

### Testing Loading State

```tsx
test('renders loading state with test IDs', () => {
  render(
    <ModalStackProvider>
      <StackedModal
        open={true}
        onClose={jest.fn()}
        loading={true}
        loadingText="Loading data..."
        dataTestId="loading-modal"
      >
        <ModalContent>Content</ModalContent>
      </StackedModal>
    </ModalStackProvider>
  );

  expect(screen.getByTestId('loading-modal-loading-overlay')).toBeInTheDocument();
  expect(screen.getByTestId('loading-modal-loading-spinner')).toBeInTheDocument();
  expect(screen.getByTestId('loading-modal-loading-text')).toHaveTextContent('Loading data...');
});
```

### Testing Stacked Modals

```tsx
test('renders back button in stacked modal', async () => {
  const { rerender } = render(
    <ModalStackProvider>
      <StackedModal
        open={true}
        onClose={jest.fn()}
        modalId="first"
        dataTestId="first-modal"
      >
        <ModalContent>First Modal</ModalContent>
      </StackedModal>
    </ModalStackProvider>
  );

  // Open second modal
  rerender(
    <ModalStackProvider>
      <StackedModal
        open={true}
        onClose={jest.fn()}
        modalId="first"
        dataTestId="first-modal"
      >
        <ModalContent>First Modal</ModalContent>
      </StackedModal>
      <StackedModal
        open={true}
        onClose={jest.fn()}
        modalId="second"
        dataTestId="second-modal"
      >
        <ModalContent>Second Modal</ModalContent>
      </StackedModal>
    </ModalStackProvider>
  );

  // Second modal should have back button
  expect(screen.getByTestId('second-modal-back-button')).toBeInTheDocument();
});
```

## Best Practices

1. **Always wrap with ModalStackProvider**: The provider manages the modal stack state
2. **Use unique modalId for nested modals**: Helps with stack management
3. **Provide navigationTitle**: Improves accessibility and user experience
4. **Use loading states for async content**: Better UX during data fetching
5. **Consider mobile experience**: Modal adapts but test on actual devices
6. **Provide dataTestId for testing**: Makes automated testing easier and more reliable

## Performance Considerations

- Only current and parent modals are rendered in DOM
- Lazy rendering of modal content when opened
- Optimized animation transitions
- Minimal re-renders through proper React patterns