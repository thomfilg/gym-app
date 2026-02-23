# Portal Component

A React Portal wrapper component that renders children into a DOM node outside the parent component's hierarchy. Useful for modals, tooltips, and overlays.

## Features

- Renders content outside parent DOM hierarchy
- Custom container support
- Automatic container creation and cleanup
- Disable portal mode for testing
- TypeScript support
- Minimal API surface
- Framework agnostic

## Basic Usage

```tsx
import { Portal } from '@gym-app/ui';

function MyComponent() {
  return (
    <div>
      <p>This is in the normal flow</p>
      <Portal>
        <div>This renders at document.body</div>
      </Portal>
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Content to render in portal (required) |
| `container` | `HTMLElement \| null` | `document.body` | Target DOM node for portal |
| `disablePortal` | `boolean` | `false` | Disable portal, render in place |

## Examples

### Default Portal (to document.body)

```tsx
<Portal>
  <Modal>
    <h2>Modal Title</h2>
    <p>Modal content rendered at document.body</p>
  </Modal>
</Portal>
```

### Custom Container

```tsx
function App() {
  const portalContainer = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div ref={portalContainer} id="portal-root" />

      <Portal container={portalContainer.current}>
        <Tooltip>This renders in #portal-root</Tooltip>
      </Portal>
    </div>
  );
}
```

### Disabled Portal (for Testing)

```tsx
<Portal disablePortal={true}>
  <div>This renders in normal DOM hierarchy</div>
</Portal>
```

### Modal with Portal

```tsx
function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <Portal>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
        }}
        onClick={onClose}
      >
        <div
          style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '8px',
            maxWidth: '500px',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
}
```

### Tooltip with Portal

```tsx
function Tooltip({ children, content }) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
    setVisible(true);
  };

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setVisible(false)}
      >
        {children}
      </div>

      {visible && (
        <Portal>
          <div
            style={{
              position: 'fixed',
              left: position.x,
              top: position.y,
              transform: 'translate(-50%, -100%)',
              backgroundColor: '#333',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '4px',
              fontSize: '14px',
              zIndex: 10000,
            }}
          >
            {content}
          </div>
        </Portal>
      )}
    </>
  );
}
```

### Popover with Portal

```tsx
function Popover({ trigger, children }) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const getPosition = () => {
    if (!anchorEl) return { top: 0, left: 0 };

    const rect = anchorEl.getBoundingClientRect();
    return {
      top: rect.bottom + 8,
      left: rect.left,
    };
  };

  const position = getPosition();

  return (
    <>
      <div onClick={handleClick}>{trigger}</div>

      {open && (
        <Portal>
          <div
            style={{
              position: 'fixed',
              top: position.top,
              left: position.left,
              zIndex: 1300,
            }}
          >
            {children}
          </div>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1200,
            }}
            onClick={handleClose}
          />
        </Portal>
      )}
    </>
  );
}
```

### Drawer with Portal

```tsx
function Drawer({ open, onClose, children, position = 'right' }) {
  if (!open) return null;

  const positions = {
    left: { left: 0, top: 0, bottom: 0 },
    right: { right: 0, top: 0, bottom: 0 },
    top: { top: 0, left: 0, right: 0 },
    bottom: { bottom: 0, left: 0, right: 0 },
  };

  return (
    <Portal>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1200,
        }}
        onClick={onClose}
      />
      <div
        style={{
          position: 'fixed',
          ...positions[position],
          width: position === 'left' || position === 'right' ? '300px' : 'auto',
          height: position === 'top' || position === 'bottom' ? '200px' : 'auto',
          backgroundColor: 'white',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          zIndex: 1300,
          overflowY: 'auto',
        }}
      >
        {children}
      </div>
    </Portal>
  );
}
```

### Notification System with Portal

```tsx
function NotificationContainer() {
  const [notifications, setNotifications] = useState([]);

  return (
    <Portal>
      <div
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {notifications.map(notification => (
          <div
            key={notification.id}
            style={{
              backgroundColor: 'white',
              padding: '16px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              minWidth: '300px',
            }}
          >
            {notification.message}
          </div>
        ))}
      </div>
    </Portal>
  );
}
```

### Multiple Portal Containers

```tsx
function App() {
  return (
    <div>
      <div id="modal-root" />
      <div id="tooltip-root" />
      <div id="notification-root" />

      <Portal container={document.getElementById('modal-root')}>
        <Modal>Modal content</Modal>
      </Portal>

      <Portal container={document.getElementById('tooltip-root')}>
        <Tooltip>Tooltip content</Tooltip>
      </Portal>

      <Portal container={document.getElementById('notification-root')}>
        <Notification>Notification</Notification>
      </Portal>
    </div>
  );
}
```

## Testing

The Portal component can be tested by disabling portal mode.

### Testing Example

```tsx
import { render, screen } from '@testing-library/react';
import { Portal } from './Portal';

test('renders children in portal', () => {
  render(
    <Portal>
      <div data-testid="portal-content">Portal Content</div>
    </Portal>
  );

  expect(screen.getByTestId('portal-content')).toBeInTheDocument();
});

test('renders children in custom container', () => {
  const container = document.createElement('div');
  container.id = 'custom-portal';
  document.body.appendChild(container);

  render(
    <Portal container={container}>
      <div data-testid="custom-content">Custom Container</div>
    </Portal>
  );

  expect(screen.getByTestId('custom-content')).toBeInTheDocument();
  expect(container.contains(screen.getByTestId('custom-content'))).toBe(true);
});

test('renders children in place when disablePortal is true', () => {
  const { container } = render(
    <div data-testid="parent">
      <Portal disablePortal={true}>
        <div data-testid="child">Child Content</div>
      </Portal>
    </div>
  );

  const parent = screen.getByTestId('parent');
  const child = screen.getByTestId('child');

  expect(parent.contains(child)).toBe(true);
});
```

### Testing Best Practices

1. **Use disablePortal**: For unit tests, disable portal mode
2. **Test Container**: Verify content renders in correct container
3. **Cleanup**: Ensure portal containers are cleaned up
4. **Snapshots**: Test DOM structure with portals
5. **Integration**: Test full component with portals

### Example Test Setup

```tsx
// test-utils.tsx
export function renderWithPortal(ui: React.ReactElement) {
  const portalRoot = document.createElement('div');
  portalRoot.id = 'portal-root';
  document.body.appendChild(portalRoot);

  const result = render(ui);

  return {
    ...result,
    portalRoot,
  };
}

// Usage
test('modal renders in portal', () => {
  const { portalRoot } = renderWithPortal(
    <Modal open={true}>
      <div data-testid="modal-content">Modal</div>
    </Modal>
  );

  const modalContent = screen.getByTestId('modal-content');
  expect(portalRoot.contains(modalContent)).toBe(true);
});
```

## Accessibility

When using Portal, consider accessibility implications:

```tsx
<Portal>
  <div
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
  >
    <h2 id="modal-title">Modal Title</h2>
    <p id="modal-description">Modal description</p>
  </div>
</Portal>
```

### Accessibility Considerations

1. **Focus Management**: Trap focus in portal content
2. **ARIA Attributes**: Add proper role and aria attributes
3. **Keyboard Navigation**: Handle Escape key, tab trapping
4. **Screen Readers**: Announce portal content properly
5. **Focus Return**: Return focus when portal closes

### Example: Accessible Modal

```tsx
function AccessibleModal({ open, onClose, title, children }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      modalRef.current?.focus();
    } else {
      previousFocusRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <Portal>
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1300,
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '8px',
            maxWidth: '600px',
          }}
        >
          <h2 id="modal-title">{title}</h2>
          {children}
        </div>
      </div>
    </Portal>
  );
}
```

## Performance Considerations

### Optimization Tips

1. **Minimize Portals**: Use only when necessary
2. **Lazy Mount**: Only render portal when needed
3. **Cleanup**: Ensure proper cleanup of portal containers
4. **Event Delegation**: Be aware of event bubbling outside portal
5. **CSS Containment**: Use CSS containment for portal content

### Performance Notes

- Portal rendering is fast (React's built-in createPortal)
- No additional re-renders caused by portal
- Event bubbling works through portal boundary
- Portal cleanup is automatic when component unmounts

## Common Use Cases

1. **Modals**: Full-screen or centered modals
2. **Tooltips**: Positioned tooltips that escape overflow
3. **Dropdowns**: Dropdowns that escape parent containers
4. **Notifications**: Toast/snackbar notifications
5. **Popovers**: Context menus and popovers
6. **Drawers**: Side drawers and panels
7. **Overlays**: Loading overlays and backdrops
8. **Context Menus**: Right-click context menus

## Browser Compatibility

Works with all modern browsers supporting:
- React 16.8+ (Hooks)
- React's createPortal API
- Modern DOM APIs

Tested and supported:
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## Why Use Portal?

### Problems Portal Solves

1. **Z-index Issues**: Escape parent stacking contexts
2. **Overflow Hidden**: Render outside overflow:hidden containers
3. **Position Context**: Break out of position:relative parents
4. **Event Bubbling**: Maintain React event bubbling across DOM
5. **Styling Isolation**: Prevent parent styles from affecting children

### When to Use Portal

- ✅ Modals and dialogs
- ✅ Tooltips and popovers
- ✅ Notifications
- ✅ Dropdown menus
- ✅ Context menus
- ❌ Regular content (use normal rendering)
- ❌ Server-side rendering (portals are client-only)

## Related Components

- **Modal**: Material-UI Modal (uses Portal internally)
- **Popover**: Material-UI Popover (uses Portal internally)
- **Dialog**: Material-UI Dialog (uses Portal internally)
- **Drawer**: Material-UI Drawer (uses Portal internally)
