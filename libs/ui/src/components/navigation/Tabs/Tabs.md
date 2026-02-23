# Tabs Component

A highly customizable tabs component for organizing content into separate views accessible through tab navigation.

## Purpose and Use Cases

The Tabs component provides an intuitive way to organize related content into separate panels, allowing users to switch between different views without leaving the current page context. It supports multiple visual styles, orientations, and advanced features like closable tabs, badges, and loading states.

### Common Use Cases

- Settings panels with different configuration sections
- Dashboard views with multiple data perspectives
- Product information organized by categories (Overview, Specs, Reviews)
- Documentation with different sections
- Form wizards with multiple steps
- Profile pages with different content areas (Posts, About, Photos)
- Admin panels with multiple management sections

## Features

- **Multiple Variants**: Default, pills, underline, and enclosed styles
- **Size Options**: Small, medium, and large sizes
- **Closable Tabs**: Optional close buttons for dynamic tabs
- **Badge Support**: Display notification counts or status indicators
- **Icon Support**: Add icons to tab labels
- **Loading States**: Built-in loading indicators for async content
- **Content Animation**: Smooth transitions between tab panels
- **Vertical/Horizontal**: Support for both orientations
- **Scrollable Tabs**: Automatic scrolling for many tabs
- **Accessibility**: Full ARIA support and keyboard navigation
- **Content Persistence**: Option to keep inactive panels in DOM
- **Theme Integration**: Supports light/dark themes and custom colors

## Props Documentation

### Core Props

| Prop       | Type                                   | Default    | Description                         |
| ---------- | -------------------------------------- | ---------- | ----------------------------------- |
| `items`    | `TabItem[]`                            | Required   | Array of tab configuration objects  |
| `value`    | `string`                               | Required   | Currently active tab ID             |
| `onChange` | `(event, tabId: string) => void`       | Required   | Callback when active tab changes    |

### TabItem Interface

| Property   | Type        | Required | Description                         |
| ---------- | ----------- | -------- | ----------------------------------- |
| `id`       | `string`    | Yes      | Unique identifier for the tab       |
| `label`    | `string`    | Yes      | Tab label text                      |
| `content`  | `ReactNode` | Yes      | Content to display in panel         |
| `icon`     | `ReactNode` | No       | Icon to display before label        |
| `badge`    | `string \| number` | No | Badge content (notification count)  |
| `disabled` | `boolean`   | No       | Whether tab is disabled             |
| `closable` | `boolean`   | No       | Whether tab can be closed           |
| `className`| `string`    | No       | Custom CSS class for the tab        |

### Style Props

| Prop       | Type                                              | Default     | Description                |
| ---------- | ------------------------------------------------- | ----------- | -------------------------- |
| `variant`  | `'default' \| 'pills' \| 'underline' \| 'enclosed'` | `'default'` | Visual style variant       |
| `size`     | `'sm' \| 'md' \| 'lg'`                            | `'md'`      | Size of tabs               |
| `color`    | `'primary' \| 'secondary'`                        | `'primary'` | Color theme                |
| `indicatorColor` | `string`                                    | `undefined` | Custom indicator color     |

### Layout Props

| Prop          | Type                          | Default        | Description                      |
| ------------- | ----------------------------- | -------------- | -------------------------------- |
| `orientation` | `'horizontal' \| 'vertical'`  | `'horizontal'` | Tab bar orientation              |
| `fullWidth`   | `boolean`                     | `false`        | Tabs fill full container width   |
| `centered`    | `boolean`                     | `false`        | Center tabs horizontally         |
| `showDividers`| `boolean`                     | `false`        | Show dividers between tabs       |

### Scrolling Props

| Prop             | Type                                    | Default  | Description                    |
| ---------------- | --------------------------------------- | -------- | ------------------------------ |
| `scrollable`     | `boolean`                               | `false`  | Enable scrolling for many tabs |
| `scrollButtons`  | `'auto' \| 'desktop' \| 'on' \| 'off'`  | `'auto'` | Scroll button behavior         |

### Content Props

| Prop                | Type        | Default | Description                              |
| ------------------- | ----------- | ------- | ---------------------------------------- |
| `animateContent`    | `boolean`   | `false` | Animate transitions between panels       |
| `animationDuration` | `number`    | `300`   | Animation duration in milliseconds       |
| `persistContent`    | `boolean`   | `false` | Keep inactive panels in DOM              |
| `loading`           | `boolean`   | `false` | Show loading state in panels             |
| `loadingComponent`  | `ReactNode` | `undefined` | Custom loading component             |

### Interaction Props

| Prop        | Type                    | Default     | Description                        |
| ----------- | ----------------------- | ----------- | ---------------------------------- |
| `onTabClose`| `(tabId: string) => void` | `undefined` | Callback when closable tab closed |
| `disabled`  | `boolean`               | `false`     | Disable all tab interactions       |

### Other Props

| Prop           | Type                      | Default     | Description                     |
| -------------- | ------------------------- | ----------- | ------------------------------- |
| `className`    | `string`                  | `undefined` | Additional CSS class name       |
| `dataTestId`   | `string`                  | `undefined` | Test ID for testing purposes    |
| `tabPanelProps`| `{ className?: string }`  | `undefined` | Props for tab panel container   |

## Usage Examples

### Basic Tabs

```tsx
import { Tabs } from '@/components/navigation/Tabs';
import { useState } from 'react';

function BasicExample() {
  const [activeTab, setActiveTab] = useState('tab1');

  const items = [
    {
      id: 'tab1',
      label: 'Overview',
      content: <div>Overview content goes here</div>,
    },
    {
      id: 'tab2',
      label: 'Details',
      content: <div>Details content goes here</div>,
    },
    {
      id: 'tab3',
      label: 'Settings',
      content: <div>Settings content goes here</div>,
    },
  ];

  return (
    <Tabs
      items={items}
      value={activeTab}
      onChange={(event, newValue) => setActiveTab(newValue)}
    />
  );
}
```

### Tabs with Icons and Badges

```tsx
import { Home, Settings, Notifications } from '@mui/icons-material';

function TabsWithIconsAndBadges() {
  const [activeTab, setActiveTab] = useState('home');

  const items = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home />,
      content: <div>Home content</div>,
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <Notifications />,
      badge: 5,
      content: <div>Notifications content</div>,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings />,
      content: <div>Settings content</div>,
    },
  ];

  return (
    <Tabs
      items={items}
      value={activeTab}
      onChange={(event, newValue) => setActiveTab(newValue)}
    />
  );
}
```

### Different Variants

```tsx
// Default variant (Material-UI style with indicator)
<Tabs items={items} value={activeTab} onChange={handleChange} variant="default" />

// Pills variant (rounded tabs with filled background)
<Tabs items={items} value={activeTab} onChange={handleChange} variant="pills" />

// Underline variant (minimal with bottom border)
<Tabs items={items} value={activeTab} onChange={handleChange} variant="underline" />

// Enclosed variant (bordered tabs like browser tabs)
<Tabs items={items} value={activeTab} onChange={handleChange} variant="enclosed" />
```

### Closable Tabs

```tsx
function ClosableTabsExample() {
  const [tabs, setTabs] = useState([
    { id: '1', label: 'Tab 1', content: <div>Content 1</div>, closable: true },
    { id: '2', label: 'Tab 2', content: <div>Content 2</div>, closable: true },
    { id: '3', label: 'Tab 3', content: <div>Content 3</div>, closable: true },
  ]);
  const [activeTab, setActiveTab] = useState('1');

  const handleTabClose = (tabId: string) => {
    const newTabs = tabs.filter((tab) => tab.id !== tabId);
    setTabs(newTabs);

    // Switch to first tab if closing active tab
    if (tabId === activeTab && newTabs.length > 0) {
      setActiveTab(newTabs[0].id);
    }
  };

  return (
    <Tabs
      items={tabs}
      value={activeTab}
      onChange={(event, newValue) => setActiveTab(newValue)}
      onTabClose={handleTabClose}
    />
  );
}
```

### Vertical Tabs

```tsx
<Tabs
  items={items}
  value={activeTab}
  onChange={handleChange}
  orientation="vertical"
  sx={{ display: 'flex', height: 400 }}
/>
```

### Scrollable Tabs

```tsx
function ScrollableTabsExample() {
  const items = Array.from({ length: 20 }, (_, i) => ({
    id: `tab-${i}`,
    label: `Tab ${i + 1}`,
    content: <div>Content for tab {i + 1}</div>,
  }));

  return (
    <Tabs
      items={items}
      value={activeTab}
      onChange={handleChange}
      scrollable
      scrollButtons="auto"
    />
  );
}
```

### With Loading States

```tsx
function LoadingTabsExample() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('tab1');

  const handleChange = async (event, newValue) => {
    setLoading(true);
    setActiveTab(newValue);

    // Simulate async content loading
    await fetchTabContent(newValue);
    setLoading(false);
  };

  return (
    <Tabs
      items={items}
      value={activeTab}
      onChange={handleChange}
      loading={loading}
      animateContent
    />
  );
}
```

### With Custom Content Animation

```tsx
<Tabs
  items={items}
  value={activeTab}
  onChange={handleChange}
  animateContent
  animationDuration={500}
  persistContent={false}
/>
```

### Different Sizes

```tsx
// Small size (compact layouts)
<Tabs items={items} value={activeTab} onChange={handleChange} size="sm" />

// Medium size (default)
<Tabs items={items} value={activeTab} onChange={handleChange} size="md" />

// Large size (touch-friendly)
<Tabs items={items} value={activeTab} onChange={handleChange} size="lg" />
```

## Accessibility

The Tabs component is fully accessible with comprehensive ARIA support:

- **Keyboard Navigation**: Full support for Tab, arrow keys, Home, and End
- **ARIA Attributes**: Proper `role`, `aria-controls`, `aria-labelledby`, `aria-selected`
- **Screen Reader Support**: Clear announcements for tab changes
- **Focus Management**: Logical focus order and visible focus indicators
- **Disabled States**: Proper `aria-disabled` attributes
- **WCAG Compliance**: Meets WCAG 2.1 AA standards

### Keyboard Shortcuts

- `Tab`: Move focus to next focusable element
- `Shift+Tab`: Move focus to previous focusable element
- `Arrow Left/Up`: Navigate to previous tab (when focused on tab)
- `Arrow Right/Down`: Navigate to next tab (when focused on tab)
- `Home`: Navigate to first tab (when focused on tab)
- `End`: Navigate to last tab (when focused on tab)
- `Enter/Space`: Activate focused tab
- `Escape`: Close focused closable tab (when close button focused)

## Testing

### Test IDs

The component provides comprehensive test IDs for automated testing:

| Element      | Default Test ID          | With Custom dataTestId      | Description                    |
| ------------ | ------------------------ | --------------------------- | ------------------------------ |
| Container    | `tabs`                   | `{dataTestId}`              | Main tabs container            |
| Tab List     | `tabs-list`              | `{dataTestId}-list`         | Tabs navigation bar            |
| Individual Tab | `tabs-tab-{index}`     | `{dataTestId}-tab-{index}`  | Each tab button (0-indexed)    |
| Tab Panel    | `tabs-panel-{index}`     | `{dataTestId}-panel-{index}`| Each tab panel (0-indexed)     |

### Testing Best Practices

1. **Use stable test IDs**: Always provide a custom `dataTestId` for tabs used in critical flows
2. **Test tab switching**: Verify content changes when clicking tabs
3. **Test keyboard navigation**: Ensure arrow key navigation works
4. **Test disabled states**: Verify disabled tabs cannot be activated
5. **Test closable tabs**: Verify close functionality and state updates
6. **Test loading states**: Verify loading indicators appear correctly
7. **Test accessibility**: Use axe-core or similar tools to verify ARIA attributes

### Common Test Scenarios

#### Testing Tab Selection

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('switches tabs on click', async () => {
  const handleChange = jest.fn();

  render(
    <Tabs
      items={items}
      value="tab1"
      onChange={handleChange}
      dataTestId="product-tabs"
    />
  );

  const secondTab = screen.getByTestId('product-tabs-tab-1');
  await userEvent.click(secondTab);

  expect(handleChange).toHaveBeenCalledWith(expect.anything(), 'tab2');
});
```

#### Testing Tab Panel Content

```tsx
test('displays correct content for active tab', () => {
  const items = [
    { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
    { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
  ];

  render(
    <Tabs
      items={items}
      value="tab1"
      onChange={jest.fn()}
      dataTestId="content-tabs"
    />
  );

  const firstPanel = screen.getByTestId('content-tabs-panel-0');
  expect(firstPanel).toHaveTextContent('Content 1');
  expect(firstPanel).toBeVisible();

  const secondPanel = screen.getByTestId('content-tabs-panel-1');
  expect(secondPanel).not.toBeVisible();
});
```

#### Testing Closable Tabs

```tsx
test('closes tab when close button clicked', async () => {
  const handleClose = jest.fn();

  const items = [
    { id: 'tab1', label: 'Tab 1', content: <div>Content</div>, closable: true },
  ];

  render(
    <Tabs
      items={items}
      value="tab1"
      onChange={jest.fn()}
      onTabClose={handleClose}
      dataTestId="closable-tabs"
    />
  );

  const closeButton = screen.getByLabelText('Close tab');
  await userEvent.click(closeButton);

  expect(handleClose).toHaveBeenCalledWith('tab1');
});
```

#### Testing Keyboard Navigation

```tsx
test('navigates tabs with arrow keys', async () => {
  const handleChange = jest.fn();

  render(
    <Tabs
      items={items}
      value="tab1"
      onChange={handleChange}
      dataTestId="nav-tabs"
    />
  );

  const firstTab = screen.getByTestId('nav-tabs-tab-0');
  firstTab.focus();

  await userEvent.keyboard('{ArrowRight}');

  // Should focus second tab
  const secondTab = screen.getByTestId('nav-tabs-tab-1');
  expect(secondTab).toHaveFocus();
});
```

#### Testing Loading States

```tsx
test('shows loading indicator when loading', () => {
  render(
    <Tabs
      items={items}
      value="tab1"
      onChange={jest.fn()}
      loading={true}
      dataTestId="loading-tabs"
    />
  );

  const panel = screen.getByTestId('loading-tabs-panel-0');
  expect(panel).toContainElement(screen.getByRole('progressbar'));
});
```

#### Testing Accessibility

```tsx
test('has proper ARIA attributes', () => {
  render(
    <Tabs
      items={items}
      value="tab1"
      onChange={jest.fn()}
      dataTestId="aria-tabs"
    />
  );

  const firstTab = screen.getByTestId('aria-tabs-tab-0');
  expect(firstTab).toHaveAttribute('role', 'tab');
  expect(firstTab).toHaveAttribute('aria-selected', 'true');
  expect(firstTab).toHaveAttribute('aria-controls');

  const firstPanel = screen.getByTestId('aria-tabs-panel-0');
  expect(firstPanel).toHaveAttribute('role', 'tabpanel');
  expect(firstPanel).toHaveAttribute('aria-labelledby');
});
```

## Best Practices

### Design Guidelines

1. **Choose appropriate variants**:
   - `default` for standard interfaces
   - `pills` for modern, rounded aesthetics
   - `underline` for minimal, text-focused designs
   - `enclosed` for browser-like tab interfaces

2. **Limit number of tabs**:
   - Ideal: 3-7 tabs for easy scanning
   - Use scrollable tabs for more than 7
   - Consider alternative navigation for 10+ tabs

3. **Use clear, concise labels**:
   - Keep labels short (1-2 words)
   - Use consistent capitalization
   - Add icons for visual recognition

4. **Provide visual feedback**:
   - Use badges for notifications
   - Show loading states for async content
   - Maintain clear active tab indicators

### Performance Tips

1. **Use `persistContent={false}`** (default) to unmount inactive panels
2. **Lazy load tab content** that requires heavy computation
3. **Use `React.memo`** for complex tab panel content
4. **Debounce async operations** triggered by tab changes
5. **Avoid re-creating items array** on every render

### UX Recommendations

1. **Persist tab selection** in URL or state for deep linking
2. **Show progress indicators** for loading content
3. **Disable tabs** that require prerequisites
4. **Provide context** with icons and badges
5. **Test keyboard navigation** thoroughly
6. **Maintain consistent tab order** throughout the session
7. **Use animations sparingly** to avoid motion sickness

### Code Organization

```tsx
// Good: Define items outside component or memoize
const TAB_ITEMS = [
  { id: 'tab1', label: 'Overview', content: <Overview /> },
  { id: 'tab2', label: 'Details', content: <Details /> },
];

// Or use useMemo for dynamic items
const items = useMemo(() => [
  { id: 'tab1', label: 'Overview', content: <Overview data={data} /> },
], [data]);
```

## Theme Customization

The component respects your MUI theme configuration:

```tsx
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  components: {
    MuiTabs: {
      styleOverrides: {
        root: {
          // Custom styles for tabs
        },
      },
    },
  },
});
```

## Common Patterns

### Settings Tabs

```tsx
function SettingsTabs() {
  const [activeTab, setActiveTab] = useState('general');

  const items = [
    {
      id: 'general',
      label: 'General',
      icon: <Settings />,
      content: <GeneralSettings />,
    },
    {
      id: 'security',
      label: 'Security',
      icon: <Security />,
      content: <SecuritySettings />,
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <Notifications />,
      badge: hasUnreadNotifications ? '!' : undefined,
      content: <NotificationSettings />,
    },
  ];

  return (
    <Tabs
      items={items}
      value={activeTab}
      onChange={(_, newValue) => setActiveTab(newValue)}
      variant="pills"
      fullWidth
    />
  );
}
```

### Dynamic Tabs with URL Sync

```tsx
import { useSearchParams } from 'react-router-dom';

function DynamicTabs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  const handleChange = (event, newValue) => {
    setSearchParams({ tab: newValue });
  };

  return (
    <Tabs
      items={items}
      value={activeTab}
      onChange={handleChange}
    />
  );
}
```

### Tabs with Lazy Loading

```tsx
function LazyLoadedTabs() {
  const [activeTab, setActiveTab] = useState('tab1');
  const [loadedTabs, setLoadedTabs] = useState(new Set(['tab1']));

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
    setLoadedTabs((prev) => new Set([...prev, newValue]));
  };

  const items = [
    {
      id: 'tab1',
      label: 'Tab 1',
      content: <Content1 />,
    },
    {
      id: 'tab2',
      label: 'Tab 2',
      content: loadedTabs.has('tab2') ? <Content2 /> : <LoadingSpinner />,
    },
    {
      id: 'tab3',
      label: 'Tab 3',
      content: loadedTabs.has('tab3') ? <Content3 /> : <LoadingSpinner />,
    },
  ];

  return (
    <Tabs
      items={items}
      value={activeTab}
      onChange={handleChange}
      animateContent
    />
  );
}
```

## Troubleshooting

### Tab content not updating

Ensure you're using controlled state properly:

```tsx
// Bad: Not updating state
<Tabs items={items} value={activeTab} onChange={() => {}} />

// Good: Properly updating state
<Tabs items={items} value={activeTab} onChange={(e, v) => setActiveTab(v)} />
```

### Tabs overflowing container

Enable scrollable mode:

```tsx
<Tabs items={items} value={activeTab} onChange={handleChange} scrollable />
```

### Performance issues with many tabs

Use `persistContent={false}` and lazy load content:

```tsx
<Tabs
  items={items}
  value={activeTab}
  onChange={handleChange}
  persistContent={false}
/>
```

### Close button not working

Provide `onTabClose` callback:

```tsx
<Tabs
  items={items}
  value={activeTab}
  onChange={handleChange}
  onTabClose={(tabId) => handleRemoveTab(tabId)}
/>
```
