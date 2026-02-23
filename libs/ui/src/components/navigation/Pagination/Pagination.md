# Pagination Component

A flexible and customizable pagination component for navigating through multiple pages of content.

## Purpose and Use Cases

The Pagination component provides users with an intuitive way to navigate through large datasets split across multiple pages. It supports various visual styles and configurations to match different design requirements.

### Common Use Cases

- Table pagination for large datasets
- Search results pagination
- Product catalog navigation
- Blog post listings
- Gallery or media browsing
- API response pagination

## Features

- **Multiple Variants**: Default, rounded, dots, and minimal styles
- **Size Options**: Small, medium, and large sizes
- **Customizable Icons**: Custom first, last, previous, and next button icons
- **Page Info Display**: Optional page information text
- **Items Per Page**: Optional items per page selector
- **Accessibility**: Full keyboard navigation and screen reader support
- **Responsive**: Works well across different screen sizes
- **Theme Integration**: Supports light/dark themes and custom colors

## Props Documentation

### Core Props

| Prop       | Type                    | Default  | Description                          |
| ---------- | ----------------------- | -------- | ------------------------------------ |
| `page`     | `number`                | Required | Current active page number (1-based) |
| `count`    | `number`                | Required | Total number of pages                |
| `onChange` | `(event, page) => void` | Required | Callback when page changes           |

### Style Props

| Prop      | Type                                            | Default     | Description                |
| --------- | ----------------------------------------------- | ----------- | -------------------------- |
| `variant` | `'default' \| 'rounded' \| 'dots' \| 'minimal'` | `'default'` | Visual style variant       |
| `size`    | `'sm' \| 'md' \| 'lg'`                          | `'md'`      | Size of pagination buttons |
| `color`   | `'primary' \| 'secondary' \| 'standard'`        | `'primary'` | Color theme                |

### Navigation Props

| Prop              | Type      | Default | Description                               |
| ----------------- | --------- | ------- | ----------------------------------------- |
| `boundaryCount`   | `number`  | `1`     | Pages at beginning/end always visible     |
| `siblingCount`    | `number`  | `1`     | Pages before/after current always visible |
| `hideNextButton`  | `boolean` | `false` | Hide next page button                     |
| `hidePrevButton`  | `boolean` | `false` | Hide previous page button                 |
| `showFirstButton` | `boolean` | `false` | Show first page button                    |
| `showLastButton`  | `boolean` | `false` | Show last page button                     |

### Icon Props

| Prop           | Type        | Default              | Description               |
| -------------- | ----------- | -------------------- | ------------------------- |
| `firstIcon`    | `ReactNode` | `<FirstPage />`      | Custom first page icon    |
| `lastIcon`     | `ReactNode` | `<LastPage />`       | Custom last page icon     |
| `previousIcon` | `ReactNode` | `<NavigateBefore />` | Custom previous page icon |
| `nextIcon`     | `ReactNode` | `<NavigateNext />`   | Custom next page icon     |

### Display Props

| Prop                   | Type                      | Default                      | Description                    |
| ---------------------- | ------------------------- | ---------------------------- | ------------------------------ |
| `showPageInfo`         | `boolean`                 | `false`                      | Show page information text     |
| `pageInfoFormat`       | `(page, count) => string` | `'Page ${page} of ${count}'` | Custom page info formatter     |
| `showItemsPerPage`     | `boolean`                 | `false`                      | Show items per page selector   |
| `itemsPerPageOptions`  | `number[]`                | `[10, 25, 50, 100]`          | Items per page options         |
| `itemsPerPage`         | `number`                  | `10`                         | Current items per page         |
| `onItemsPerPageChange` | `(count) => void`         | `undefined`                  | Items per page change callback |

### Other Props

| Prop        | Type      | Default     | Description                     |
| ----------- | --------- | ----------- | ------------------------------- |
| `disabled`  | `boolean` | `false`     | Disable all pagination controls |
| `className` | `string`  | `undefined` | Additional CSS class name       |

## Usage Examples

### Basic Pagination

```tsx
import { Pagination } from '@/components/navigation/Pagination';

function BasicExample() {
  const [page, setPage] = useState(1);
  const totalPages = 10;

  return (
    <Pagination page={page} count={totalPages} onChange={(event, newPage) => setPage(newPage)} />
  );
}
```

### With Page Info and Items Per Page

```tsx
function CompleteExample() {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <Pagination
      page={page}
      count={totalPages}
      onChange={(event, newPage) => setPage(newPage)}
      showPageInfo
      showItemsPerPage
      itemsPerPage={itemsPerPage}
      onItemsPerPageChange={setItemsPerPage}
      itemsPerPageOptions={[10, 25, 50, 100]}
    />
  );
}
```

### Different Variants

```tsx
// Default variant (flat with hover effects)
<Pagination page={1} count={10} onChange={handleChange} />

// Rounded buttons
<Pagination
  page={1}
  count={10}
  onChange={handleChange}
  variant="rounded"
/>

// Minimal dots (for image galleries)
<Pagination
  page={1}
  count={10}
  onChange={handleChange}
  variant="dots"
/>

// Minimal text-only
<Pagination
  page={1}
  count={10}
  onChange={handleChange}
  variant="minimal"
/>
```

### With Custom Icons

```tsx
import { ArrowBack, ArrowForward } from '@mui/icons-material';

<Pagination
  page={1}
  count={10}
  onChange={handleChange}
  previousIcon={<ArrowBack />}
  nextIcon={<ArrowForward />}
  showFirstButton
  showLastButton
/>;
```

## Accessibility

The Pagination component is fully accessible:

- **Keyboard Navigation**: Full support for Tab, Enter, and arrow keys
- **Screen Reader Support**: Proper ARIA labels and announcements
- **Focus Management**: Clear focus indicators and logical tab order
- **High Contrast**: Works with high contrast themes
- **WCAG Compliance**: Meets WCAG 2.1 AA standards

### Keyboard Shortcuts

- `Tab` / `Shift+Tab`: Navigate between buttons
- `Enter` / `Space`: Activate focused button
- `Home`: Jump to first page (when first button visible)
- `End`: Jump to last page (when last button visible)
- `Arrow Keys`: Navigate between page buttons

## Best Practices

### Design Guidelines

1. **Use appropriate variants**:
   - `default` for data tables
   - `rounded` for modern interfaces
   - `dots` for image carousels/galleries
   - `minimal` for content-heavy layouts

2. **Choose the right size**:
   - `sm` for compact layouts or mobile
   - `md` for standard desktop interfaces
   - `lg` for touch-friendly or accessibility-focused designs

3. **Show relevant information**:
   - Enable `showPageInfo` for data contexts
   - Enable `showItemsPerPage` when users need control
   - Keep boundary/sibling counts reasonable (1-2)

### Performance Tips

1. **Debounce page changes** for API calls
2. **Use React.memo** for parent components
3. **Virtualize large datasets** when possible
4. **Cache page data** to improve navigation speed

### UX Recommendations

1. **Always show current page clearly**
2. **Provide context** with page info when helpful
3. **Use consistent placement** throughout your app
4. **Consider loading states** during page changes
5. **Test with screen readers** and keyboard navigation

## Theme Customization

The component respects your MUI theme configuration:

```tsx
// Custom theme colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#your-color',
    },
  },
});
```

## Common Patterns

### Table Pagination

```tsx
function TablePagination({ data, pageSize = 10 }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(data.length / pageSize);

  const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      <Table data={paginatedData} />
      <Pagination
        page={page}
        count={totalPages}
        onChange={(_, newPage) => setPage(newPage)}
        showPageInfo
      />
    </div>
  );
}
```

### API Pagination

```tsx
function ApiPagination() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { data, totalPages } = useApiData(page);

  const handlePageChange = async (event, newPage) => {
    setLoading(true);
    setPage(newPage);
    // API call will be triggered by useApiData hook
  };

  return (
    <div>
      {loading && <LoadingSpinner />}
      <DataComponent data={data} />
      <Pagination
        page={page}
        count={totalPages}
        onChange={handlePageChange}
        disabled={loading}
        showPageInfo
        showItemsPerPage
        itemsPerPage={pageSize}
        onItemsPerPageChange={setPageSize}
      />
    </div>
  );
}
```

## Testing

The Pagination component includes comprehensive test IDs for automated testing, supporting both unit and end-to-end test scenarios.

### Test IDs

All test IDs follow a consistent pattern and can be customized using the `dataTestId` prop:

| Element | Default Test ID | Custom Test ID Pattern | Description |
|---------|----------------|------------------------|-------------|
| Container | `pagination` | `{dataTestId}` | Main pagination container |
| First button | `pagination-first` | `{dataTestId}-first` | First page button |
| Previous button | `pagination-prev` | `{dataTestId}-prev` | Previous page button |
| Next button | `pagination-next` | `{dataTestId}-next` | Next page button |
| Last button | `pagination-last` | `{dataTestId}-last` | Last page button |
| Page button | `pagination-page-{N}` | `{dataTestId}-page-{N}` | Individual page button (N = page number) |
| Page info | `pagination-info` | `{dataTestId}-info` | Page information text |
| Items per page | `pagination-items-per-page` | `{dataTestId}-items-per-page` | Items per page selector |

### Testing Best Practices

#### Unit Testing with React Testing Library

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('should render with default test IDs', () => {
    render(
      <Pagination
        page={1}
        count={5}
        onChange={jest.fn()}
      />
    );

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-page-1')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-prev')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-next')).toBeInTheDocument();
  });

  it('should use custom test IDs when provided', () => {
    render(
      <Pagination
        page={2}
        count={5}
        onChange={jest.fn()}
        dataTestId="custom-pagination"
      />
    );

    expect(screen.getByTestId('custom-pagination')).toBeInTheDocument();
    expect(screen.getByTestId('custom-pagination-page-2')).toBeInTheDocument();
    expect(screen.getByTestId('custom-pagination-prev')).toBeInTheDocument();
    expect(screen.getByTestId('custom-pagination-next')).toBeInTheDocument();
  });

  it('should call onChange when page button is clicked', () => {
    const handleChange = jest.fn();
    render(
      <Pagination
        page={1}
        count={5}
        onChange={handleChange}
      />
    );

    fireEvent.click(screen.getByTestId('pagination-page-3'));
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object), 3);
  });

  it('should show first and last buttons when enabled', () => {
    render(
      <Pagination
        page={3}
        count={10}
        onChange={jest.fn()}
        showFirstButton
        showLastButton
      />
    );

    expect(screen.getByTestId('pagination-first')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-last')).toBeInTheDocument();
  });

  it('should show page info when enabled', () => {
    render(
      <Pagination
        page={2}
        count={10}
        onChange={jest.fn()}
        showPageInfo
      />
    );

    const pageInfo = screen.getByTestId('pagination-info');
    expect(pageInfo).toHaveTextContent('Page 2 of 10');
  });

  it('should show items per page selector when enabled', () => {
    const handleItemsChange = jest.fn();
    render(
      <Pagination
        page={1}
        count={10}
        onChange={jest.fn()}
        showItemsPerPage
        itemsPerPage={25}
        onItemsPerPageChange={handleItemsChange}
      />
    );

    const selector = screen.getByTestId('pagination-items-per-page');
    expect(selector).toBeInTheDocument();
  });
});
```

#### Navigation Testing

```tsx
describe('Pagination Navigation', () => {
  it('should navigate to next page', () => {
    const handleChange = jest.fn();
    render(
      <Pagination
        page={1}
        count={5}
        onChange={handleChange}
      />
    );

    fireEvent.click(screen.getByTestId('pagination-next'));
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object), 2);
  });

  it('should navigate to previous page', () => {
    const handleChange = jest.fn();
    render(
      <Pagination
        page={3}
        count={5}
        onChange={handleChange}
      />
    );

    fireEvent.click(screen.getByTestId('pagination-prev'));
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object), 2);
  });

  it('should jump to first page', () => {
    const handleChange = jest.fn();
    render(
      <Pagination
        page={5}
        count={10}
        onChange={handleChange}
        showFirstButton
      />
    );

    fireEvent.click(screen.getByTestId('pagination-first'));
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object), 1);
  });

  it('should jump to last page', () => {
    const handleChange = jest.fn();
    render(
      <Pagination
        page={1}
        count={10}
        onChange={handleChange}
        showLastButton
      />
    );

    fireEvent.click(screen.getByTestId('pagination-last'));
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object), 10);
  });

  it('should disable navigation when disabled prop is true', () => {
    render(
      <Pagination
        page={2}
        count={5}
        onChange={jest.fn()}
        disabled
      />
    );

    expect(screen.getByTestId('pagination-prev')).toBeDisabled();
    expect(screen.getByTestId('pagination-next')).toBeDisabled();
  });
});
```

#### E2E Testing with Playwright

```typescript
import { test, expect } from '@playwright/test';

test.describe('Pagination Component', () => {
  test('should navigate through pages', async ({ page }) => {
    await page.goto('/pagination-demo');

    // Click on page 3
    await page.getByTestId('pagination-page-3').click();
    await expect(page.locator('[data-testid="pagination-page-3"]')).toHaveClass(/Mui-selected/);

    // Navigate to next page
    await page.getByTestId('pagination-next').click();
    await expect(page.locator('[data-testid="pagination-page-4"]')).toHaveClass(/Mui-selected/);

    // Navigate to previous page
    await page.getByTestId('pagination-prev').click();
    await expect(page.locator('[data-testid="pagination-page-3"]')).toHaveClass(/Mui-selected/);
  });

  test('should change items per page', async ({ page }) => {
    await page.goto('/pagination-demo');

    // Open items per page dropdown
    await page.getByTestId('pagination-items-per-page').click();

    // Select 50 items per page
    await page.getByRole('option', { name: '50' }).click();

    // Verify selection
    await expect(page.getByTestId('pagination-items-per-page')).toContainText('50');
  });

  test('should display correct page info', async ({ page }) => {
    await page.goto('/pagination-demo');

    const pageInfo = page.getByTestId('pagination-info');
    await expect(pageInfo).toHaveText('Page 1 of 10');

    // Navigate to page 5
    await page.getByTestId('pagination-page-5').click();
    await expect(pageInfo).toHaveText('Page 5 of 10');
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/pagination-demo');

    // Focus on page 2 button
    await page.getByTestId('pagination-page-2').focus();

    // Press Enter to navigate
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-testid="pagination-page-2"]')).toHaveClass(/Mui-selected/);

    // Use arrow keys to navigate
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-testid="pagination-page-3"]')).toHaveClass(/Mui-selected/);
  });
});
```

### Common Test Scenarios

#### Testing with Multiple Pagination Instances

```tsx
describe('Multiple Pagination Instances', () => {
  it('should support multiple instances with unique test IDs', () => {
    render(
      <>
        <Pagination
          dataTestId="users-pagination"
          page={1}
          count={5}
          onChange={jest.fn()}
        />
        <Pagination
          dataTestId="products-pagination"
          page={2}
          count={10}
          onChange={jest.fn()}
        />
      </>
    );

    expect(screen.getByTestId('users-pagination')).toBeInTheDocument();
    expect(screen.getByTestId('products-pagination')).toBeInTheDocument();
    expect(screen.getByTestId('users-pagination-page-1')).toBeInTheDocument();
    expect(screen.getByTestId('products-pagination-page-2')).toBeInTheDocument();
  });
});
```

#### Testing Different Variants

```tsx
describe('Pagination Variants', () => {
  it('should render dots variant correctly', () => {
    render(
      <Pagination
        page={3}
        count={10}
        onChange={jest.fn()}
        variant="dots"
      />
    );

    // Dots variant hides navigation buttons
    expect(screen.queryByTestId('pagination-prev')).not.toBeInTheDocument();
    expect(screen.queryByTestId('pagination-next')).not.toBeInTheDocument();

    // Page dots should still be present
    expect(screen.getByTestId('pagination-page-3')).toBeInTheDocument();
  });

  it('should render minimal variant correctly', () => {
    render(
      <Pagination
        page={2}
        count={5}
        onChange={jest.fn()}
        variant="minimal"
      />
    );

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-page-2')).toBeInTheDocument();
  });
});
```

#### Testing Accessibility

```tsx
describe('Pagination Accessibility', () => {
  it('should have proper ARIA labels', () => {
    render(
      <Pagination
        page={2}
        count={5}
        onChange={jest.fn()}
        showFirstButton
        showLastButton
      />
    );

    expect(screen.getByTestId('pagination-first')).toHaveAttribute('aria-label', 'Go to first page');
    expect(screen.getByTestId('pagination-last')).toHaveAttribute('aria-label', 'Go to last page');
    expect(screen.getByTestId('pagination-prev')).toHaveAttribute('aria-label', 'Go to previous page');
    expect(screen.getByTestId('pagination-next')).toHaveAttribute('aria-label', 'Go to next page');
  });

  it('should indicate current page', () => {
    render(
      <Pagination
        page={3}
        count={10}
        onChange={jest.fn()}
      />
    );

    const currentPage = screen.getByTestId('pagination-page-3');
    expect(currentPage).toHaveClass('Mui-selected');
    expect(currentPage).toHaveAttribute('aria-current', 'page');
  });
});
```

### Integration Testing Tips

1. **Test with realistic data**: Use actual page counts and data volumes
2. **Test edge cases**: First page, last page, single page scenarios
3. **Test state management**: Verify page state updates correctly
4. **Test async operations**: Mock API calls and test loading states
5. **Test responsiveness**: Verify behavior across different viewport sizes
6. **Test accessibility**: Use axe-core or similar tools for a11y testing

### Visual Regression Testing

```typescript
import { test } from '@playwright/test';

test.describe('Pagination Visual Tests', () => {
  test('should match snapshot - default variant', async ({ page }) => {
    await page.goto('/pagination-demo');
    await expect(page.getByTestId('pagination')).toHaveScreenshot('pagination-default.png');
  });

  test('should match snapshot - rounded variant', async ({ page }) => {
    await page.goto('/pagination-demo?variant=rounded');
    await expect(page.getByTestId('pagination')).toHaveScreenshot('pagination-rounded.png');
  });

  test('should match snapshot - hover state', async ({ page }) => {
    await page.goto('/pagination-demo');
    await page.getByTestId('pagination-page-3').hover();
    await expect(page.getByTestId('pagination')).toHaveScreenshot('pagination-hover.png');
  });
});
```
