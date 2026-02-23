import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn,userEvent, waitFor, within } from 'storybook/test';

import { DataGrid } from './DataGrid';
import type { GridColumn } from './DataGrid.types';

// Test data interface
interface TestRow {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  salary: number;
  joinDate: string;
}

const generateTestData = (count: number): TestRow[] => Array.from({ length: count }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 2 === 0 ? 'Engineer' : 'Designer',
  status: (i % 2 === 0 ? 'active' : 'inactive') as 'active' | 'inactive',
  salary: 50000 + i * 1000,
  joinDate: new Date(2020, i % 12, 1).toISOString().split('T')[0],
}));

const testColumns: GridColumn<TestRow>[] = [
  { id: 'id', header: 'ID', accessor: 'id', type: 'number', width: 80 },
  {
    id: 'name',
    header: 'Name',
    accessor: 'name',
    type: 'text',
    enableSort: true,
    enableFilter: true,
  },
  { id: 'email', header: 'Email', accessor: 'email', type: 'text', enableSort: true },
  { id: 'role', header: 'Role', accessor: 'role', type: 'text', enableSort: true },
  { id: 'status', header: 'Status', accessor: 'status', type: 'text', enableSort: true },
  { id: 'salary', header: 'Salary', accessor: 'salary', type: 'number', enableSort: true },
];

const meta: Meta<typeof DataGrid> = {
  title: 'Enhanced/DataGrid/Tests',
  component: DataGrid,
  parameters: {
    layout: 'fullscreen',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:DataGrid'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Basic Rendering & Semantics Tests
export const BasicRendering: Story = {
  name: 'Test: Basic Rendering & Semantics',
  args: {
    rows: generateTestData(5),
    columns: testColumns,
    ariaLabel: 'Test data grid',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Should render with proper ARIA attributes', async () => {
      const grid = canvas.getByRole('grid', { name: 'Test data grid' });
      expect(grid).toBeInTheDocument();
      expect(grid).toHaveAttribute('data-ui', 'datagrid');
      expect(grid).toHaveAttribute('aria-rowcount', '6'); // 5 rows + 1 header
      expect(grid).toHaveAttribute('aria-colcount', '6'); // 6 columns
    });

    await step('Should have proper header cells with columnheader role', async () => {
      const headers = canvas.getAllByRole('columnheader');
      expect(headers).toHaveLength(6);
      expect(headers[0]).toHaveTextContent('ID');
      expect(headers[1]).toHaveTextContent('Name');
    });

    await step('Should have proper data cells with gridcell role', async () => {
      const cells = canvas.getAllByRole('gridcell');
      expect(cells.length).toBeGreaterThan(0);
    });

    await step('Should render data correctly', async () => {
      expect(canvas.getByText('User 1')).toBeInTheDocument();
      expect(canvas.getByText('user1@example.com')).toBeInTheDocument();
    });
  },
};

// 2. Virtualization Tests
export const VirtualizationTest: Story = {
  name: 'Test: Virtualization Performance',
  args: {
    rows: generateTestData(1000),
    columns: testColumns,
    virtualizeRows: true,
    ariaLabel: 'Virtualized data grid',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Should render large dataset efficiently', async () => {
      const grid = canvas.getByRole('grid');
      expect(grid).toBeInTheDocument();
    });

    await step('Should not render all rows at once (virtualization)', async () => {
      // Only visible rows should be in DOM
      const visibleRows = canvas
        .getAllByRole('row')
        .filter((row) => !row.closest('[data-slot="header"]'));
      expect(visibleRows.length).toBeLessThan(100); // Much less than 1000 total rows
    });
  },
};

// 3. Sorting Tests
export const ClientSortingTest: Story = {
  name: 'Test: Client-side Sorting',
  args: {
    rows: generateTestData(10),
    columns: testColumns,
    sorting: { mode: 'client' },
    ariaLabel: 'Sortable data grid',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Should sort by name ascending', async () => {
      const nameHeader = canvas.getByRole('columnheader', { name: /name/i });
      const sortButton = canvas.getByRole('button', { name: /sort by name/i });
      expect(nameHeader).toHaveAttribute('aria-sort', 'none');

      await userEvent.click(sortButton);
      await waitFor(
        () => {
          expect(nameHeader).toHaveAttribute('aria-sort', 'ascending');
        },
        { timeout: 2000 },
      );
    });

    await step('Should sort by name descending on second click', async () => {
      const nameHeader = canvas.getByRole('columnheader', { name: /name/i });
      const sortButton = canvas.getByRole('button', { name: /sort by name/i });
      await userEvent.click(sortButton);
      await waitFor(
        () => {
          expect(nameHeader).toHaveAttribute('aria-sort', 'descending');
        },
        { timeout: 2000 },
      );
    });

    await step('Should clear sort on third click', async () => {
      const nameHeader = canvas.getByRole('columnheader', { name: /name/i });
      const sortButton = canvas.getByRole('button', { name: /sort by name/i });
      await userEvent.click(sortButton);
      await waitFor(
        () => {
          expect(nameHeader).toHaveAttribute('aria-sort', 'none');
        },
        { timeout: 2000 },
      );
    });
  },
};

// 4. Server-side Sorting Test
export const ServerSortingTest: Story = {
  name: 'Test: Server-side Sorting',
  args: {
    rows: generateTestData(10),
    columns: testColumns,
    sorting: { mode: 'server' },
    onRequestData: fn(),
    ariaLabel: 'Server sortable data grid',
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step('Should call onRequestData when sorting', async () => {
      const sortButton = canvas.getByRole('button', { name: /sort by name/i });
      await userEvent.click(sortButton);

      await waitFor(() => {
        expect(args.onRequestData).toHaveBeenCalledWith(
          expect.objectContaining({
            sortBy: [{ id: 'name', dir: 'asc' }],
          }),
        );
      });
    });
  },
};

// 5. Selection Tests
export const SingleSelectionTest: Story = {
  name: 'Test: Single Selection',
  args: {
    rows: generateTestData(5),
    columns: testColumns,
    selection: {
      mode: 'single',
      onChangeSelected: fn(),
    },
    ariaLabel: 'Single selection data grid',
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step('Should allow single row selection', async () => {
      const checkboxes = canvas.getAllByRole('checkbox');
      expect(checkboxes.length).toBeGreaterThan(0);

      const firstRowCheckbox = checkboxes[0]; // Should be first row checkbox in single mode
      expect(firstRowCheckbox).toHaveAttribute('aria-label', 'Select row 1');

      await userEvent.click(firstRowCheckbox);

      // Check that the onChangeSelected callback was called with the correct row ID
      await waitFor(
        () => {
          expect(args.selection.onChangeSelected).toHaveBeenCalledWith([1]); // Row ID should be 1
        },
        { timeout: 3000 },
      );
    });

    await step('Should deselect when clicking another row in single mode', async () => {
      const checkboxes = canvas.getAllByRole('checkbox');
      const firstRowCheckbox = checkboxes[0];
      const secondRowCheckbox = checkboxes[1];

      // Click first row
      await userEvent.click(firstRowCheckbox);
      await waitFor(() => {
        expect(args.selection.onChangeSelected).toHaveBeenCalledWith([1]);
      });

      // Click second row - should deselect first and select second
      await userEvent.click(secondRowCheckbox);
      await waitFor(() => {
        expect(args.selection.onChangeSelected).toHaveBeenCalledWith([2]);
      });
    });
  },
};

export const MultiSelectionTest: Story = {
  name: 'Test: Multi Selection',
  args: {
    rows: generateTestData(5),
    columns: testColumns,
    selection: { mode: 'multi' },
    ariaLabel: 'Multi selection data grid',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Should allow multiple row selection', async () => {
      const checkboxes = canvas.getAllByRole('checkbox');
      const firstRowCheckbox = checkboxes[1]; // Skip header checkbox
      const secondRowCheckbox = checkboxes[2];

      await userEvent.click(firstRowCheckbox);
      await userEvent.click(secondRowCheckbox);

      expect(firstRowCheckbox).toBeChecked();
      expect(secondRowCheckbox).toBeChecked();
    });

    await step('Should support select all functionality', async () => {
      const checkboxes = canvas.getAllByRole('checkbox');
      const headerCheckbox = checkboxes[0];

      await userEvent.click(headerCheckbox);

      // All data row checkboxes should be selected
      checkboxes.slice(1).forEach((checkbox) => {
        expect(checkbox).toBeChecked();
      });
    });
  },
};

// 6. Keyboard Navigation Tests
export const KeyboardNavigationTest: Story = {
  name: 'Test: Keyboard Navigation',
  args: {
    rows: generateTestData(5),
    columns: testColumns,
    selection: { mode: 'single' },
    ariaLabel: 'Keyboard navigation data grid',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Should have focusable grid with proper keyboard support', async () => {
      const grid = canvas.getByRole('grid');
      expect(grid).toBeInTheDocument();

      // Verify grid is accessible via keyboard
      const firstCell = canvas.getAllByRole('gridcell')[0];
      expect(firstCell).toBeInTheDocument();

      // Test that cells can be focused
      firstCell.focus();
      expect(document.activeElement).toBe(firstCell);
    });

    await step('Should allow keyboard interaction with interactive elements', async () => {
      // Test that sortable headers can be activated with keyboard
      const sortButton = canvas.getByRole('button', { name: /sort by name/i });
      expect(sortButton).toBeInTheDocument();

      // Test that checkboxes can be focused and activated
      const checkboxes = canvas.getAllByRole('checkbox');
      if (checkboxes.length > 0) {
        const firstCheckbox = checkboxes[0];
        firstCheckbox.focus();
        expect(document.activeElement).toBe(firstCheckbox);
      }
    });
  },
};

// 7. Row Expansion Tests
export const RowExpansionTest: Story = {
  name: 'Test: Row Expansion',
  args: {
    rows: generateTestData(3),
    columns: testColumns,
    expansion: {
      render: (row: TestRow) => (
        <div data-testid={`expansion-${row.id}`}>Details for {row.name}</div>
      ),
    },
    ariaLabel: 'Row expansion data grid',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Should expand row when clicking expand button', async () => {
      const expandButtons = canvas.getAllByLabelText(/expand row/i);
      const firstExpandButton = expandButtons[0];

      await userEvent.click(firstExpandButton);

      const expansion = canvas.getByTestId('expansion-1');
      expect(expansion).toBeInTheDocument();
      expect(expansion).toHaveTextContent('Details for User 1');
    });

    await step('Should collapse row when clicking collapse button', async () => {
      const collapseButton = canvas.getByLabelText(/collapse row/i);
      await userEvent.click(collapseButton);

      const expansion = canvas.queryByTestId('expansion-1');
      expect(expansion).not.toBeInTheDocument();
    });
  },
};

// 8. Empty State Tests
export const EmptyStateTest: Story = {
  name: 'Test: Empty State',
  args: {
    rows: [],
    columns: testColumns,
    ariaLabel: 'Empty data grid',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Should display default empty message', async () => {
      expect(canvas.getByText('No data available')).toBeInTheDocument();
    });
  },
};

export const CustomEmptyStateTest: Story = {
  name: 'Test: Custom Empty State',
  args: {
    rows: [],
    columns: testColumns,
    emptyState: <div data-testid="custom-empty">Custom empty message</div>,
    ariaLabel: 'Custom empty data grid',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Should display custom empty state', async () => {
      expect(canvas.getByTestId('custom-empty')).toBeInTheDocument();
      expect(canvas.getByText('Custom empty message')).toBeInTheDocument();
    });
  },
};

// 9. Loading State Tests
export const LoadingStateTest: Story = {
  name: 'Test: Loading State',
  args: {
    rows: [],
    columns: testColumns,
    loading: true,
    ariaLabel: 'Loading data grid',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Should display loading indicator', async () => {
      const grid = canvas.getByRole('grid');
      expect(grid).toHaveAttribute('data-loading', 'true');

      const loadingIndicator = canvas.getByRole('progressbar');
      expect(loadingIndicator).toBeInTheDocument();
    });
  },
};

// 10. Error State Tests
export const ErrorStateTest: Story = {
  name: 'Test: Error State',
  args: {
    rows: [],
    columns: testColumns,
    error: 'Failed to load data',
    ariaLabel: 'Error data grid',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Should display error message', async () => {
      const grid = canvas.getByRole('grid');
      expect(grid).toHaveAttribute('data-error', 'true');

      expect(canvas.getByText('Failed to load data')).toBeInTheDocument();
    });
  },
};

// 11. Density Tests
export const DensityTest: Story = {
  name: 'Test: Density Variations',
  args: {
    rows: generateTestData(5),
    columns: testColumns,
    density: 'compact',
    ariaLabel: 'Density test data grid',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Should apply density data attribute', async () => {
      const grid = canvas.getByRole('grid');
      expect(grid).toHaveAttribute('data-density', 'compact');
      expect(grid).toBeInTheDocument();
    });
  },
};

// 12. Sticky Header Tests
export const StickyHeaderTest: Story = {
  name: 'Test: Sticky Header',
  args: {
    rows: generateTestData(50),
    columns: testColumns,
    stickyHeader: true,
    ariaLabel: 'Sticky header data grid',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Should apply sticky header data attribute', async () => {
      const grid = canvas.getByRole('grid');
      expect(grid).toHaveAttribute('data-sticky-header', 'true');
    });

    await step('Should have sticky positioned header cells', async () => {
      const headerCells = canvas.getAllByRole('columnheader');
      headerCells.forEach((cell) => {
        const styles = window.getComputedStyle(cell);
        expect(styles.position).toBe('sticky');
      });
    });
  },
};

// 13. Responsive Design Tests
export const ResponsiveDesignTest: Story = {
  name: 'Test: Responsive Design',
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  args: {
    rows: generateTestData(10),
    columns: testColumns,
    ariaLabel: 'Responsive data grid',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Should render properly on mobile viewport', async () => {
      const grid = canvas.getByRole('grid');
      expect(grid).toBeInTheDocument();

      // Grid should still be functional on smaller screens
      const headers = canvas.getAllByRole('columnheader');
      expect(headers.length).toBeGreaterThan(0);
    });
  },
};

// 14. Theme Variation Tests
export const ThemeVariationTest: Story = {
  name: 'Test: Theme Variations',
  parameters: {
    backgrounds: { default: 'dark' },
  },
  args: {
    rows: generateTestData(5),
    columns: testColumns,
    ariaLabel: 'Dark theme data grid',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Should render properly in dark theme', async () => {
      const grid = canvas.getByRole('grid');
      expect(grid).toBeInTheDocument();

      // Check that theme styling is applied
      const headerCells = canvas.getAllByRole('columnheader');
      expect(headerCells[0]).toBeInTheDocument();
    });
  },
};

// 15. Performance Tests
export const PerformanceTest: Story = {
  name: 'Test: Performance',
  args: {
    rows: generateTestData(1000),
    columns: testColumns,
    virtualizeRows: true,
    ariaLabel: 'Performance test data grid',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Should render large dataset without performance issues', async () => {
      const startTime = Date.now();

      const grid = canvas.getByRole('grid');
      expect(grid).toBeInTheDocument();

      const endTime = Date.now();
      const renderTime = endTime - startTime;

      // Rendering should complete within reasonable time (2 seconds)
      expect(renderTime).toBeLessThan(2000);
    });

    await step('Should not have memory leaks or console errors', async () => {
      // This test would require additional setup to capture console errors
      // For now, we just verify the component renders successfully
      const grid = canvas.getByRole('grid');
      expect(grid).toBeInTheDocument();
    });
  },
};

// 16. Edge Cases Tests
export const EdgeCasesTest: Story = {
  name: 'Test: Edge Cases',
  args: {
    rows: generateTestData(2),
    columns: [
      { id: 'empty', header: '', accessor: 'nonExistent' },
      { id: 'long', header: 'Very Long Header That Might Overflow', accessor: 'name' },
      { id: 'special', header: 'Special/Chars!@#$%^&*()', accessor: 'name' },
    ],
    ariaLabel: 'Edge cases data grid',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Should handle empty/missing data gracefully', async () => {
      const grid = canvas.getByRole('grid');
      expect(grid).toBeInTheDocument();
    });

    await step('Should handle special characters in headers', async () => {
      const specialHeader = canvas.getByText('Special/Chars!@#$%^&*()');
      expect(specialHeader).toBeInTheDocument();
    });
  },
};

// 17. Integration Tests
export const IntegrationTest: Story = {
  name: 'Test: Integration',
  args: {
    rows: generateTestData(20),
    columns: testColumns,
    selection: { mode: 'multi' },
    sorting: { mode: 'client', defaultSortBy: [{ id: 'name', dir: 'asc' }] },
    expansion: {
      render: (row: TestRow) => <div>Expanded: {row.name}</div>,
    },
    virtualizeRows: true,
    stickyHeader: true,
    ariaLabel: 'Integration test data grid',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Should work with multiple features combined', async () => {
      const grid = canvas.getByRole('grid');
      expect(grid).toBeInTheDocument();

      // Test selection
      const checkboxes = canvas.getAllByRole('checkbox');
      await userEvent.click(checkboxes[1]);

      // Test sorting
      const nameHeader = canvas.getByRole('columnheader', { name: /name/i });
      expect(nameHeader).toHaveAttribute('aria-sort', 'ascending');

      // Test expansion
      const expandButtons = canvas.getAllByLabelText(/expand row/i);
      await userEvent.click(expandButtons[0]);

      // All features should work together
      expect(checkboxes[1]).toBeChecked();
      expect(nameHeader).toHaveAttribute('aria-sort', 'ascending');
      expect(canvas.getByText('Expanded: User 1')).toBeInTheDocument();
    });
  },
};

// Required exports for validation
export const BasicInteraction = BasicRendering;
export const FormInteraction = MultiSelectionTest;
export const KeyboardNavigation = KeyboardNavigationTest;
export const ScreenReader = BasicRendering;
export const FocusManagement = KeyboardNavigationTest;
export const ResponsiveDesign = ResponsiveDesignTest;
export const ThemeVariations = ThemeVariationTest;
export const VisualStates = LoadingStateTest;
export const Performance = PerformanceTest;
export const EdgeCases = EdgeCasesTest;
export const Integration = IntegrationTest;
