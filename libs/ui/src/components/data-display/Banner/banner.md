# Banner Component

**Purpose:** Page-level notification bar for system messages.

```ts
interface BannerProps {
  variant?: 'info' | 'success' | 'warning' | 'critical';
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  actions?: Array<{ label: string; onClick: () => void; variant?: 'primary' | 'secondary' }>;
  sticky?: boolean; // affix to top on scroll
  fullWidth?: boolean; // span container or viewport
  className?: string;
  'data-testid'?: string;
}
```

**Features**

- Strong visual hierarchy by variant; optional sticky behavior.
- Inline actions (primary/secondary) and dismiss control.
- Supports compact and spacious density via CSS modifiers.

**A11y**

- `role="status"` for info/success; `role="alert"` for warning/critical.
- If `dismissible`, the close button has `aria-label="Dismiss"`.
- Do not auto-focus; rely on live regions for screen readers.

**Stories / Tests**

- Variants; With/without actions; Dismissible; Sticky; Responsive.

## Testing

### Test IDs

The Banner component includes `data-testid` attributes for reliable testing:

| Test ID | Element | Description |
|---------|---------|-------------|
| `banner` or `{dataTestId}` | Main container | Root StyledBanner element (default: 'banner') |
| `banner-icon` or `{dataTestId}-icon` | Icon container | Box wrapping the variant icon or custom icon |
| `banner-title` or `{dataTestId}-title` | Title text | Typography element for the banner title |
| `banner-message` or `{dataTestId}-message` | Message text | Typography element for the banner description/message |
| `banner-action` or `{dataTestId}-action` | Action button | Individual action button (same testId for all actions) |
| `banner-close` or `{dataTestId}-close` | Dismiss button | IconButton for dismissing the banner |

### Testing Best Practices

**Wait for Banner to Render:**
```typescript
// Use async queries to wait for the banner
const banner = await canvas.findByTestId('banner');
expect(banner).toBeInTheDocument();

// Check variant styling
expect(banner).toHaveAttribute('role', 'status'); // for info/success
expect(banner).toHaveAttribute('aria-live', 'polite');
```

**Test Variant Rendering:**
```typescript
// Test critical variant
const criticalBanner = await canvas.findByTestId('banner');
expect(criticalBanner).toHaveAttribute('role', 'alert');
expect(criticalBanner).toHaveAttribute('aria-live', 'assertive');

// Verify icon is present
const icon = await canvas.findByTestId('banner-icon');
expect(icon).toBeInTheDocument();
```

**Test Content Display:**
```typescript
// Test title and message
const title = await canvas.findByTestId('banner-title');
expect(title).toHaveTextContent('Important Update');

const message = await canvas.findByTestId('banner-message');
expect(message).toHaveTextContent('System maintenance scheduled');
```

**Test Actions:**
```typescript
// Test action button (Note: all action buttons share the same testId)
const actionButton = await canvas.findByTestId('banner-action');
await userEvent.click(actionButton);
expect(mockOnClick).toHaveBeenCalledTimes(1);

// When multiple actions exist, use getAllByTestId
const actionButtons = await canvas.findAllByTestId('banner-action');
expect(actionButtons).toHaveLength(2);
await userEvent.click(actionButtons[0]); // Click first action
await userEvent.click(actionButtons[1]); // Click second action
```

**Test Dismissible Behavior:**
```typescript
// Test dismiss button
const closeButton = await canvas.findByTestId('banner-close');
expect(closeButton).toBeInTheDocument();
expect(closeButton).toHaveAttribute('aria-label', 'Dismiss banner');

// Click dismiss and verify callback
await userEvent.click(closeButton);
expect(mockOnDismiss).toHaveBeenCalledTimes(1);

// Verify banner is removed from DOM
await waitFor(() => {
  expect(canvas.queryByTestId('banner')).not.toBeInTheDocument();
}, { timeout: 1000 });
```

**Test Custom Test IDs:**
```typescript
// Use custom data-testid
render(<Banner data-testid="custom-banner" title="Test" />);

const customBanner = await canvas.findByTestId('custom-banner');
expect(customBanner).toBeInTheDocument();

const customIcon = await canvas.findByTestId('custom-banner-icon');
expect(customIcon).toBeInTheDocument();
```

### Common Test Scenarios

1. **Variant Rendering** - Test all variants (info, success, warning, critical) with correct colors and icons
2. **Content Display** - Verify title, description, and children render correctly
3. **Actions** - Test primary and secondary action buttons with click handlers
4. **Dismissible** - Test dismiss functionality and onDismiss callback
5. **Sticky Behavior** - Verify sticky positioning and z-index
6. **Full Width** - Test fullWidth prop styling
7. **Custom Icons** - Verify custom icon rendering
8. **Responsive Layout** - Test mobile/tablet viewports and layout changes
9. **Accessibility** - Verify ARIA roles, live regions, and keyboard navigation
10. **Animations** - Check fade-in animation and pulse effects on icon
