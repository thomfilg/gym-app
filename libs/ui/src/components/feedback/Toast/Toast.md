# Toast Component

## Overview

The Toast component provides a non-intrusive notification system for displaying temporary messages to users. It supports multiple severity levels, action buttons, promise-based notifications, and glass morphism effects. The component follows a provider-consumer pattern for centralized toast management across the application.

## Features

- **Multiple Variants**: Support for default, success, error, warning, info, and promise-based toasts
- **Auto-dismissal**: Configurable duration with automatic dismissal
- **Manual Control**: Optional close button and persistent mode
- **Action Support**: Add custom action buttons to toasts
- **Promise Notifications**: Track async operations with loading, success, and error states
- **Glass Morphism**: Optional glass effect for modern UI aesthetics
- **Positioning**: Flexible positioning (top-left, top-center, top-right, bottom-left, bottom-center, bottom-right)
- **Stacking**: Smart stacking with configurable maximum toast count
- **Accessibility**: Full keyboard navigation and screen reader support
- **Animations**: Smooth slide-in/out transitions

## Props

### Toast Component Props

| Prop       | Type                                                                    | Default     | Description                              |
| ---------- | ----------------------------------------------------------------------- | ----------- | ---------------------------------------- |
| message    | `string`                                                                | (required)  | The message to display in the toast      |
| variant    | `'default' \| 'success' \| 'error' \| 'warning' \| 'info' \| 'promise'` | `'default'` | The visual style variant of the toast    |
| duration   | `number`                                                                | `5000`      | Auto-dismiss duration in milliseconds    |
| persistent | `boolean`                                                               | `false`     | If true, toast won't auto-dismiss        |
| closable   | `boolean`                                                               | `true`      | If true, shows a close button            |
| glass      | `boolean`                                                               | `false`     | Enables glass morphism effect            |
| action     | `{ label: string; onClick: () => void }`                                | `undefined` | Action button configuration              |
| promise    | `{ loading: string; success: string; error: string }`                   | `undefined` | Messages for promise-based notifications |
| onClose    | `() => void`                                                            | `undefined` | Callback when toast is closed            |
| dataTestId | `string`                                                                | `'toast'`   | Test ID for testing and automation       |

### ToastContainer Props

| Prop       | Type                                                                                              | Default              | Description                         |
| ---------- | ------------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------- |
| position   | `'top-left' \| 'top-center' \| 'top-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right'` | `'bottom-right'`     | Position of the toast container     |
| maxToasts  | `number`                                                                                          | `5`                  | Maximum number of toasts to display |
| gap        | `number`                                                                                          | `12`                 | Gap between toasts in pixels        |
| className  | `string`                                                                                          | `undefined`          | CSS class name for styling          |
| dataTestId | `string`                                                                                          | `'toast-container'`  | Test ID for testing and automation  |

## Usage

### Basic Usage

```tsx
import { ToastProvider, useToast, ToastContainer } from '@procurement/ui';

// Wrap your app with ToastProvider
function App() {
  return (
    <ToastProvider>
      <YourAppContent />
      <ToastContainer position="bottom-right" maxToasts={5} />
    </ToastProvider>
  );
}

// Use toast in any component
function MyComponent() {
  const { addToast } = useToast();

  const handleClick = () => {
    addToast({
      message: 'Operation completed successfully!',
      variant: 'success',
    });
  };

  return <button onClick={handleClick}>Show Toast</button>;
}
```

### Promise-based Notifications

```tsx
const { promise } = useToast();

const handleAsyncOperation = async () => {
  await promise(someAsyncOperation(), {
    loading: 'Processing your request...',
    success: 'Request completed successfully!',
    error: 'Failed to process request',
  });
};
```

### With Action Button

```tsx
const { addToast } = useToast();

const showActionToast = () => {
  addToast({
    message: 'New update available',
    variant: 'info',
    action: {
      label: 'Update Now',
      onClick: () => {
        console.log('Updating...');
      },
    },
    persistent: true,
  });
};
```

### Persistent Toast

```tsx
const { addToast } = useToast();

const showPersistentToast = () => {
  addToast({
    message: 'This toast will not auto-dismiss',
    variant: 'warning',
    persistent: true,
    closable: true,
  });
};
```

### Glass Effect

```tsx
const { addToast } = useToast();

const showGlassToast = () => {
  addToast({
    message: 'Beautiful glass morphism effect',
    variant: 'default',
    glass: true,
  });
};
```

## Context API

The Toast component provides a context API through `useToast` hook:

### Methods

- `addToast(options: ToastOptions): string` - Adds a new toast and returns its ID
- `removeToast(id: string): void` - Removes a specific toast
- `clearAllToasts(): void` - Removes all toasts
- `promise<T>(promise: Promise<T>, messages: PromiseMessages): Promise<T>` - Handles promise-based notifications

## Accessibility

The Toast component is fully accessible:

- **ARIA Roles**: Uses `role="alert"` for screen reader announcements
- **ARIA Labels**: Proper labeling for close buttons and actions
- **Keyboard Navigation**:
  - `Escape` - Closes the focused toast
  - `Tab` - Navigates between interactive elements
- **Focus Management**: Proper focus handling for action buttons
- **Screen Reader Support**: Announces new toasts automatically

## Styling

The Toast component uses Material-UI theming and supports:

- Theme-aware colors for different variants
- Responsive design that adapts to viewport size
- Glass morphism effect with backdrop blur
- Smooth animations for enter/exit transitions
- Custom positioning and stacking

## Best Practices

1. **Use appropriate variants**: Choose the variant that matches the message type (success, error, warning, info)
2. **Keep messages concise**: Toast messages should be brief and actionable
3. **Avoid overlapping actions**: Don't show too many toasts at once (use `maxToasts` prop)
4. **Use persistent mode sparingly**: Only for critical messages that require user attention
5. **Provide actions when needed**: Add action buttons for toasts that require user response
6. **Handle promises properly**: Use the promise method for async operations to provide loading feedback

## Examples

### Error Handling

```tsx
try {
  await saveData();
  addToast({
    message: 'Data saved successfully',
    variant: 'success',
  });
} catch (error) {
  addToast({
    message: 'Failed to save data. Please try again.',
    variant: 'error',
    action: {
      label: 'Retry',
      onClick: () => saveData(),
    },
  });
}
```

### Form Submission

```tsx
const handleSubmit = async (formData) => {
  await promise(submitForm(formData), {
    loading: 'Submitting form...',
    success: 'Form submitted successfully!',
    error: 'Failed to submit form. Please check your inputs.',
  });
};
```

## Testing

The Toast component includes comprehensive testIds for automated testing. All testIds can be customized via the `dataTestId` prop.

### TestIds Structure

#### ToastContainer TestIds

| Element | Default TestId | Description |
| ------- | -------------- | ----------- |
| Container | `toast-container` | Main container wrapping all toasts |
| Toast Item Wrapper | `toast-container-item-{index}` | Individual toast wrapper with index |

#### Toast TestIds

| Element | Default TestId | Description |
| ------- | -------------- | ----------- |
| Toast Alert | `toast` | Main toast alert container |
| Message | `toast-message` | Toast message typography |
| Action Button | `toast-action` | Action button (when action prop is provided) |
| Close Button | `toast-close` | Close button (when closable is true) |

### Custom TestIds

You can provide custom testIds to both the ToastContainer and individual toasts:

```tsx
// Container with custom testId
<ToastContainer dataTestId="custom-toast-container" />

// Individual toast with custom testId
addToast({
  message: 'Custom toast',
  dataTestId: 'custom-toast',
});
```

When using custom testIds, the child elements follow the pattern:
- Message: `{dataTestId}-message`
- Action: `{dataTestId}-action`
- Close: `{dataTestId}-close`

### Testing Examples

#### Unit Testing with React Testing Library

```tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToastProvider, useToast, ToastContainer } from './Toast';

describe('Toast Component', () => {
  const TestComponent = () => {
    const { addToast } = useToast();

    return (
      <div>
        <button onClick={() => addToast({ message: 'Test message' })}>
          Show Toast
        </button>
        <ToastContainer />
      </div>
    );
  };

  it('displays toast with correct message', async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const button = screen.getByText('Show Toast');
    await userEvent.click(button);

    expect(screen.getByTestId('toast')).toBeInTheDocument();
    expect(screen.getByTestId('toast-message')).toHaveTextContent('Test message');
  });

  it('closes toast when close button is clicked', async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const button = screen.getByText('Show Toast');
    await userEvent.click(button);

    const closeButton = screen.getByTestId('toast-close');
    await userEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByTestId('toast')).not.toBeInTheDocument();
    });
  });

  it('calls action callback when action button is clicked', async () => {
    const actionCallback = vi.fn();

    const TestComponentWithAction = () => {
      const { addToast } = useToast();

      return (
        <div>
          <button
            onClick={() =>
              addToast({
                message: 'Action toast',
                action: { label: 'Undo', onClick: actionCallback },
              })
            }
          >
            Show Toast
          </button>
          <ToastContainer />
        </div>
      );
    };

    render(
      <ToastProvider>
        <TestComponentWithAction />
      </ToastProvider>
    );

    await userEvent.click(screen.getByText('Show Toast'));
    await userEvent.click(screen.getByTestId('toast-action'));

    expect(actionCallback).toHaveBeenCalledTimes(1);
  });

  it('auto-dismisses after specified duration', async () => {
    const TestComponentWithDuration = () => {
      const { addToast } = useToast();

      return (
        <div>
          <button onClick={() => addToast({ message: 'Quick toast', duration: 1000 })}>
            Show Toast
          </button>
          <ToastContainer />
        </div>
      );
    };

    render(
      <ToastProvider>
        <TestComponentWithDuration />
      </ToastProvider>
    );

    await userEvent.click(screen.getByText('Show Toast'));
    expect(screen.getByTestId('toast')).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.queryByTestId('toast')).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it('displays multiple toasts with correct indices', async () => {
    const TestMultipleToasts = () => {
      const { addToast } = useToast();

      return (
        <div>
          <button
            onClick={() => {
              addToast({ message: 'First toast' });
              addToast({ message: 'Second toast' });
            }}
          >
            Show Toasts
          </button>
          <ToastContainer />
        </div>
      );
    };

    render(
      <ToastProvider>
        <TestMultipleToasts />
      </ToastProvider>
    );

    await userEvent.click(screen.getByText('Show Toasts'));

    expect(screen.getByTestId('toast-container-item-0')).toBeInTheDocument();
    expect(screen.getByTestId('toast-container-item-1')).toBeInTheDocument();
  });
});
```

#### E2E Testing with Playwright

```typescript
import { test, expect } from '@playwright/test';

test.describe('Toast Component', () => {
  test('should display and dismiss toast', async ({ page }) => {
    await page.goto('/toast-demo');

    // Trigger toast
    await page.click('button:has-text("Show Toast")');

    // Verify toast appears
    const toast = page.getByTestId('toast');
    await expect(toast).toBeVisible();

    // Verify message
    const message = page.getByTestId('toast-message');
    await expect(message).toHaveText('Operation successful');

    // Click close button
    await page.getByTestId('toast-close').click();

    // Verify toast is dismissed
    await expect(toast).not.toBeVisible();
  });

  test('should handle action button click', async ({ page }) => {
    await page.goto('/toast-demo');

    await page.click('button:has-text("Show Action Toast")');

    // Click action button
    const actionButton = page.getByTestId('toast-action');
    await expect(actionButton).toBeVisible();
    await actionButton.click();

    // Verify action was performed (depends on implementation)
    await expect(page.getByText('Action performed')).toBeVisible();
  });

  test('should display multiple toasts', async ({ page }) => {
    await page.goto('/toast-demo');

    // Trigger multiple toasts
    await page.click('button:has-text("Show Multiple")');

    // Verify container and items
    const container = page.getByTestId('toast-container');
    await expect(container).toBeVisible();

    await expect(page.getByTestId('toast-container-item-0')).toBeVisible();
    await expect(page.getByTestId('toast-container-item-1')).toBeVisible();
  });

  test('should respect maxToasts limit', async ({ page }) => {
    await page.goto('/toast-demo');

    // Trigger more toasts than maxToasts
    await page.click('button:has-text("Show Many Toasts")');

    // Verify only maxToasts (5) are visible
    const items = page.getByTestId(/toast-container-item-/);
    await expect(items).toHaveCount(5);
  });
});
```

#### Integration Testing with Custom TestIds

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToastProvider, useToast, ToastContainer } from './Toast';

describe('Toast with Custom TestIds', () => {
  it('uses custom testIds correctly', async () => {
    const TestComponent = () => {
      const { addToast } = useToast();

      return (
        <div>
          <button
            onClick={() =>
              addToast({
                message: 'Custom toast',
                dataTestId: 'notification-toast',
                action: { label: 'Retry', onClick: vi.fn() },
              })
            }
          >
            Show Toast
          </button>
          <ToastContainer dataTestId="notification-container" />
        </div>
      );
    };

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    await userEvent.click(screen.getByText('Show Toast'));

    expect(screen.getByTestId('notification-container')).toBeInTheDocument();
    expect(screen.getByTestId('notification-toast')).toBeInTheDocument();
    expect(screen.getByTestId('notification-toast-message')).toBeInTheDocument();
    expect(screen.getByTestId('notification-toast-action')).toBeInTheDocument();
    expect(screen.getByTestId('notification-toast-close')).toBeInTheDocument();
  });
});
```

### Testing Best Practices

1. **Always wrap with ToastProvider**: Tests must include the ToastProvider wrapper
2. **Use waitFor for async operations**: Toast dismissal and animations require waitFor
3. **Test auto-dismiss behavior**: Verify toasts disappear after specified duration
4. **Test user interactions**: Click events on close and action buttons
5. **Test multiple toasts**: Verify stacking and maxToasts behavior
6. **Test variant styling**: Ensure correct icons and colors for each variant
7. **Test accessibility**: Verify ARIA attributes and keyboard navigation
8. **Test promise notifications**: Verify loading, success, and error states
9. **Custom testIds**: Use custom testIds for domain-specific testing scenarios

## Related Components

- Alert - For inline notifications
- Snackbar - Alternative notification component
- Modal - For more prominent notifications
- Banner - For persistent page-level notifications
