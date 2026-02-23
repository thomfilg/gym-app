# EmptyState Component

**Purpose:** Friendly placeholder for "no data / no results / error" with illustration and actions.

```ts
interface EmptyStateProps {
  variant?: 'default' | 'illustrated' | 'minimal' | 'action';
  title: string;
  description?: string;
  illustration?: React.ReactNode; // SVG/Lottie/etc
  primaryAction?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
  helpLink?: { label: string; href: string; external?: boolean };
  className?: string;
  dataTestId?: string;
}
```

**Features**

- Clear title + optional description and help link.
- Optional illustration area sized responsively.
- Action variant surfaces primary/secondary CTAs.

**A11y**

- Wrap in `role="region"` with `aria-labelledby` to the title id.
- Provide `alt` text for non-decorative illustrations.

**Stories / Tests**

- No Results; No Permissions; Network Error; With Actions; Illustrated vs Minimal.

## Testing

### Test IDs

All test IDs follow a hierarchical pattern. If `dataTestId` prop is provided, it becomes the prefix for all child test IDs. Otherwise, default IDs are used.

| Element | Default Test ID | With Custom dataTestId |
|---------|----------------|----------------------|
| Container | `empty-state` | `{dataTestId}` |
| Icon/Illustration | `empty-state-icon` | `{dataTestId}-icon` |
| Title | `empty-state-title` | `{dataTestId}-title` |
| Description | `empty-state-description` | `{dataTestId}-description` |
| Primary Action Button | `empty-state-primary-action` | `{dataTestId}-primary-action` |
| Secondary Action Button | `empty-state-secondary-action` | `{dataTestId}-secondary-action` |
| Help Link | `empty-state-help-link` | `{dataTestId}-help-link` |

### Testing Best Practices

#### 1. **Structural Testing**
```typescript
// Verify component renders with required elements
const container = screen.getByTestId('empty-state');
expect(container).toBeInTheDocument();

const title = screen.getByTestId('empty-state-title');
expect(title).toHaveTextContent('No Results Found');
```

#### 2. **Conditional Rendering**
```typescript
// Test with description
const description = screen.queryByTestId('empty-state-description');
expect(description).toBeInTheDocument();

// Test without description
const noDescription = screen.queryByTestId('empty-state-description');
expect(noDescription).not.toBeInTheDocument();
```

#### 3. **Action Button Testing**
```typescript
const primaryButton = screen.getByTestId('empty-state-primary-action');
await userEvent.click(primaryButton);
expect(mockOnClick).toHaveBeenCalledTimes(1);
```

#### 4. **Custom Test IDs**
```typescript
// Use custom dataTestId for multiple instances
<EmptyState
  dataTestId="search-empty"
  title="No Results"
/>

const searchEmpty = screen.getByTestId('search-empty');
const searchTitle = screen.getByTestId('search-empty-title');
```

### Common Test Scenarios

#### Scenario 1: No Results State
```typescript
it('should display no results state with illustration', () => {
  render(
    <EmptyState
      variant="illustrated"
      title="No Results Found"
      description="Try adjusting your search criteria"
      illustration={<SearchIcon />}
      dataTestId="no-results"
    />
  );

  expect(screen.getByTestId('no-results-title')).toHaveTextContent('No Results Found');
  expect(screen.getByTestId('no-results-description')).toHaveTextContent('Try adjusting your search criteria');
  expect(screen.getByTestId('no-results-icon')).toBeInTheDocument();
});
```

#### Scenario 2: Error State with Action
```typescript
it('should display error state with retry action', async () => {
  const handleRetry = vi.fn();

  render(
    <EmptyState
      title="Something went wrong"
      description="We couldn't load your data"
      primaryAction={{ label: 'Retry', onClick: handleRetry }}
      dataTestId="error-state"
    />
  );

  const retryButton = screen.getByTestId('error-state-primary-action');
  expect(retryButton).toHaveTextContent('Retry');

  await userEvent.click(retryButton);
  expect(handleRetry).toHaveBeenCalledTimes(1);
});
```

#### Scenario 3: Permission Denied with Help Link
```typescript
it('should display permission denied with help link', () => {
  render(
    <EmptyState
      title="Access Denied"
      description="You don't have permission to view this content"
      helpLink={{
        label: 'Request Access',
        href: '/request-access',
        external: false
      }}
      dataTestId="access-denied"
    />
  );

  const helpLink = screen.getByTestId('access-denied-help-link');
  expect(helpLink).toHaveAttribute('href', '/request-access');
  expect(helpLink).not.toHaveAttribute('target', '_blank');
});
```

#### Scenario 4: Empty State with Multiple Actions
```typescript
it('should display both primary and secondary actions', async () => {
  const handleCreate = vi.fn();
  const handleImport = vi.fn();

  render(
    <EmptyState
      variant="action"
      title="No Items Yet"
      description="Get started by creating or importing items"
      primaryAction={{ label: 'Create New', onClick: handleCreate }}
      secondaryAction={{ label: 'Import', onClick: handleImport }}
      dataTestId="no-items"
    />
  );

  const createButton = screen.getByTestId('no-items-primary-action');
  const importButton = screen.getByTestId('no-items-secondary-action');

  await userEvent.click(createButton);
  expect(handleCreate).toHaveBeenCalledTimes(1);

  await userEvent.click(importButton);
  expect(handleImport).toHaveBeenCalledTimes(1);
});
```

#### Scenario 5: External Help Link
```typescript
it('should open external help link in new tab', () => {
  render(
    <EmptyState
      title="Need Help?"
      helpLink={{
        label: 'View Documentation',
        href: 'https://docs.example.com',
        external: true
      }}
      dataTestId="help-state"
    />
  );

  const link = screen.getByTestId('help-state-help-link');
  expect(link).toHaveAttribute('href', 'https://docs.example.com');
  expect(link).toHaveAttribute('target', '_blank');
  expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  expect(link).toHaveTextContent('View Documentation ↗');
});
```

#### Scenario 6: Minimal Variant (No Icon)
```typescript
it('should not display icon in minimal variant', () => {
  render(
    <EmptyState
      variant="minimal"
      title="Nothing Here"
      illustration={<Icon />}
      dataTestId="minimal-state"
    />
  );

  const icon = screen.queryByTestId('minimal-state-icon');
  expect(icon).toHaveStyle({ display: 'none' });
});
```

### Accessibility Testing

#### 1. **Semantic Structure**
```typescript
it('should have proper ARIA attributes', () => {
  render(<EmptyState title="No Data" dataTestId="a11y-test" />);

  const container = screen.getByTestId('a11y-test');
  expect(container).toHaveAttribute('role', 'region');
  expect(container).toHaveAttribute('aria-labelledby');
});
```

#### 2. **Keyboard Navigation**
```typescript
it('should support keyboard navigation for actions', async () => {
  const handleAction = vi.fn();

  render(
    <EmptyState
      title="Empty"
      primaryAction={{ label: 'Action', onClick: handleAction }}
      dataTestId="keyboard-test"
    />
  );

  const button = screen.getByTestId('keyboard-test-primary-action');
  button.focus();

  await userEvent.keyboard('{Enter}');
  expect(handleAction).toHaveBeenCalledTimes(1);
});
```

### Integration Testing Tips

1. **Multiple Instances**: Use unique `dataTestId` props when rendering multiple EmptyState components
2. **Conditional Rendering**: Always use `queryByTestId` for elements that may not be present
3. **User Interactions**: Use `@testing-library/user-event` for realistic user interactions
4. **Async Actions**: Properly await user events and action callbacks
5. **Snapshot Testing**: Consider snapshots for different variants to catch unintended visual changes
