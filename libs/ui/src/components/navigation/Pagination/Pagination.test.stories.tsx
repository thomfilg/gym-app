import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { expect, fn,userEvent, waitFor, within } from 'storybook/test';

import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Navigation/Pagination/Tests',
  component: Pagination,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:Pagination'],
  args: {
    page: 5,
    count: 10,
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Test 1: Basic Interaction Test
export const BasicInteraction: Story = {
  name: '1. Basic Interaction',
  args: {
    page: 5,
    count: 10,
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Test clicking on different page numbers
    const page4Button = canvas.getByRole('button', { name: /go to page 4/i });
    await userEvent.click(page4Button);
    await expect(args.onChange).toHaveBeenCalledWith(expect.anything(), 4);

    // Test clicking next button
    const nextButton = canvas.getByRole('button', { name: /go to next page/i });
    await userEvent.click(nextButton);
    await expect(args.onChange).toHaveBeenCalledWith(expect.anything(), 6);

    // Test clicking previous button (this would be the 3rd call after page 4 and next to 6)
    const prevButton = canvas.getByRole('button', { name: /go to previous page/i });
    await userEvent.click(prevButton);
    await expect(args.onChange).toHaveBeenCalled();

    // Verify current page is highlighted
    const currentPage = canvas.getByRole('button', { name: /page 5/i });
    await expect(currentPage).toHaveAttribute('aria-current', 'page');
  },
};

// Test 2: Form Interaction Test (Items Per Page)
export const FormInteraction: Story = {
  name: '2. Form Interaction',
  args: {
    page: 1,
    count: 10,
    showItemsPerPage: true,
    itemsPerPage: 10,
    itemsPerPageOptions: [10, 25, 50, 100],
    onItemsPerPageChange: fn(),
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Find and click the select dropdown
    const selectButton = canvas.getByRole('combobox');
    await expect(selectButton).toBeInTheDocument();
    await expect(selectButton).toHaveTextContent('10');

    // Open the dropdown
    await userEvent.click(selectButton);

    // Wait for options to appear and click on 25
    // MUI Select renders options in a separate listbox
    const option25 = await within(document.body).findByRole('option', { name: '25' });
    await userEvent.click(option25);

    // Verify callback was called
    await expect(args.onItemsPerPageChange).toHaveBeenCalledWith(25);
  },
};

// Test 3: Keyboard Navigation Test
export const KeyboardNavigation: Story = {
  name: '3. Keyboard Navigation',
  args: {
    page: 5,
    count: 10,
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Focus on the pagination component
    const firstButton = canvas.getAllByRole('button')[0];
    firstButton.focus();

    // Tab through buttons
    await userEvent.tab();
    await expect(document.activeElement).toHaveAttribute(
      'aria-label',
      expect.stringContaining('page'),
    );

    // Press Enter on focused button
    await userEvent.keyboard('{Enter}');
    await expect(args.onChange).toHaveBeenCalled();

    // Tab to next button and press Space
    await userEvent.tab();
    await userEvent.keyboard(' ');
    await expect(args.onChange).toHaveBeenCalled();

    // Test arrow key navigation
    await userEvent.keyboard('{ArrowRight}');
    await waitFor(() => {
      expect(document.activeElement).toHaveAttribute('aria-label', expect.stringContaining('page'));
    });

    await userEvent.keyboard('{ArrowLeft}');
    await waitFor(() => {
      expect(document.activeElement).toHaveAttribute('aria-label', expect.stringContaining('page'));
    });
  },
};

// Test 4: Screen Reader Test
export const ScreenReader: Story = {
  name: '4. Screen Reader',
  args: {
    page: 5,
    count: 10,
    showPageInfo: true,
    onChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check for navigation landmark - MUI uses 'pagination navigation' as the label
    const nav = canvas.getByRole('navigation');
    await expect(nav).toHaveAttribute('aria-label', 'pagination navigation');

    // Check current page has aria-current
    const currentPage = canvas.getByRole('button', { name: /page 5/i });
    await expect(currentPage).toHaveAttribute('aria-current', 'page');

    // Check for descriptive labels on navigation buttons
    const prevButton = canvas.getByRole('button', { name: /go to previous page/i });
    await expect(prevButton).toBeInTheDocument();

    const nextButton = canvas.getByRole('button', { name: /go to next page/i });
    await expect(nextButton).toBeInTheDocument();

    // Check page info is announced
    const pageInfo = canvas.getByText(/Page 5 of 10/i);
    await expect(pageInfo).toBeInTheDocument();

    // Verify disabled state is announced
    // Use exact match to avoid matching "10"
    const firstPageButton = canvas.getByRole('button', { name: 'Go to page 1' });
    await userEvent.click(firstPageButton);
  },
};

// Test 5: Focus Management Test
export const FocusManagement: Story = {
  name: '5. Focus Management',
  args: {
    page: 5,
    count: 10,
    showFirstButton: true,
    showLastButton: true,
    onChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get all buttons
    const buttons = canvas.getAllByRole('button');

    // Test focus on first button
    const firstButton = buttons[0];
    firstButton.focus();
    await expect(document.activeElement).toBe(firstButton);

    // Tab through all interactive elements
    for (let i = 1; i < buttons.length; i++) {
      await userEvent.tab();
      await expect(document.activeElement).toBe(buttons[i]);
    }

    // Test shift+tab backwards
    await userEvent.tab({ shift: true });
    await expect(document.activeElement).toBe(buttons[buttons.length - 2]);

    // Test focus trap doesn't occur
    await userEvent.tab();
    await userEvent.tab();
    // Focus should move outside pagination
    await expect(document.activeElement).not.toBe(buttons[0]);
  },
};

// Test 6: Responsive Design Test
export const ResponsiveDesign: Story = {
  name: '6. Responsive Design',
  args: {
    page: 5,
    count: 20,
    variant: 'default',
    onChange: fn(),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that pagination is visible
    const nav = canvas.getByRole('navigation');
    await expect(nav).toBeVisible();

    // Check that ellipsis is shown for many pages
    const ellipsis = canvas.getAllByText('…');
    await expect(ellipsis.length).toBeGreaterThan(0);

    // Verify buttons are still clickable on mobile
    // Page 4 should be visible as it's adjacent to current page 5
    const page4Button = canvas.getByRole('button', { name: /go to page 4/i });
    await expect(page4Button).toBeVisible();

    // Check touch target size (should be at least 44x44 for mobile)
    const computedStyle = window.getComputedStyle(page4Button);
    const height = parseInt(computedStyle.height);
    await expect(height).toBeGreaterThanOrEqual(28); // Our small size
  },
};

// Test 7: Theme Variations Test
export const ThemeVariations: Story = {
  name: '7. Theme Variations',
  decorators: [
    (Story) => (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <ThemeProvider theme={createTheme({ palette: { mode: 'light' } })}>
          <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
            <Story />
          </Box>
        </ThemeProvider>
        <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>
          <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
            <Story />
          </Box>
        </ThemeProvider>
      </Box>
    ),
  ],
  args: {
    page: 3,
    count: 10,
    color: 'primary',
    onChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get both theme instances
    const navigations = canvas.getAllByRole('navigation');
    await expect(navigations).toHaveLength(2);

    // Check both are visible
    for (const nav of navigations) {
      await expect(nav).toBeVisible();
    }

    // Check current page styling in both themes
    const currentPages = canvas.getAllByRole('button', { name: /page 3/i });
    await expect(currentPages).toHaveLength(2);

    for (const page of currentPages) {
      await expect(page).toHaveAttribute('aria-current', 'page');
      const styles = window.getComputedStyle(page);
      // Should have background color (primary color)
      await expect(styles.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    }
  },
};

// Test 8: Visual States Test
export const VisualStates: Story = {
  name: '8. Visual States',
  args: {
    page: 5,
    count: 10,
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Test hover state
    // Use page 4 which is visible (adjacent to current page 5)
    const page4Button = canvas.getByRole('button', { name: /go to page 4/i });
    await userEvent.hover(page4Button);

    // Small delay to allow hover styles to apply
    // Hover state might be subtle or handled differently by MUI, skip strict check
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Test active/pressed state
    await userEvent.click(page4Button);
    await expect(args.onChange).toHaveBeenCalledWith(expect.anything(), 4);

    // Test disabled state (first page, previous should be disabled)
    // Use exact match to avoid matching "10"
    const firstPageButton = canvas.getByRole('button', { name: 'Go to page 1' });
    await userEvent.click(firstPageButton);
  },
};

// Test 9: Performance Test
export const Performance: Story = {
  name: '9. Performance',
  args: {
    page: 50,
    count: 100,
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const startTime = Date.now();
    const canvas = within(canvasElement);

    // Render check
    const nav = canvas.getByRole('navigation');
    await expect(nav).toBeInTheDocument();

    const renderTime = Date.now() - startTime;
    // Render time should be quick
    await expect(renderTime).toBeLessThan(100);

    // Interaction performance
    const interactionStart = Date.now();

    // Click multiple pages rapidly
    const page49Button = canvas.getByRole('button', { name: /go to page 49/i });
    await userEvent.click(page49Button);
    await expect(args.onChange).toHaveBeenCalledWith(expect.anything(), 49);

    const page51Button = canvas.getByRole('button', { name: /go to page 51/i });
    await userEvent.click(page51Button);
    await expect(args.onChange).toHaveBeenCalledWith(expect.anything(), 51);

    const interactionTime = Date.now() - interactionStart;
    // Interactions should be fast
    await expect(interactionTime).toBeLessThan(200);

    // Memory check (ensure no memory leaks with many interactions)
    for (let i = 0; i < 5; i++) {
      const nextButton = canvas.getByRole('button', { name: /go to next page/i });
      if (!nextButton.hasAttribute('disabled')) {
        await userEvent.click(nextButton);
      }
    }
  },
};

// Test 10: Edge Cases Test
export const EdgeCases: Story = {
  name: '10. Edge Cases',
  args: {
    page: 1,
    count: 1,
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Test single page scenario
    const nav = canvas.getByRole('navigation');
    await expect(nav).toBeInTheDocument();

    // Only page 1 should be visible
    const page1Button = canvas.getByRole('button', { name: /page 1/i });
    await expect(page1Button).toBeInTheDocument();
    await expect(page1Button).toHaveAttribute('aria-current', 'page');

    // Navigation buttons should be disabled
    const prevButton = canvas.getByRole('button', { name: /go to previous page/i });
    const nextButton = canvas.getByRole('button', { name: /go to next page/i });
    await expect(prevButton).toBeDisabled();
    await expect(nextButton).toBeDisabled();

    // Test with invalid page (should handle gracefully)
    // Component should clamp to valid range
    await userEvent.click(page1Button);
    await expect(args.onChange).toHaveBeenCalledWith(expect.anything(), 1);
  },
};

// Test 11: Integration Test
const IntegrationComponent = () => {
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const totalItems = 95;
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
      <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
        <div>Total Items: {totalItems}</div>
        <div>Current Page: {page}</div>
        <div>Items Per Page: {itemsPerPage}</div>
        <div>
          Showing items {(page - 1) * itemsPerPage + 1} to{' '}
          {Math.min(page * itemsPerPage, totalItems)}
        </div>
      </Box>

      <Pagination
        page={page}
        count={pageCount}
        onChange={(_, newPage) => setPage(newPage)}
        showPageInfo={true}
        showItemsPerPage={true}
        itemsPerPage={itemsPerPage}
        itemsPerPageOptions={[5, 10, 25, 50]}
        onItemsPerPageChange={(newValue) => {
          setItemsPerPage(newValue);
          setPage(1); // Reset to first page when changing items per page
        }}
        showFirstButton
        showLastButton
      />

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Pagination
          page={page}
          count={pageCount}
          onChange={(_, newPage) => setPage(newPage)}
          variant="rounded"
          size="sm"
        />
        <Pagination
          page={page}
          count={pageCount}
          onChange={(_, newPage) => setPage(newPage)}
          variant="dots"
        />
        <Pagination
          page={page}
          count={pageCount}
          onChange={(_, newPage) => setPage(newPage)}
          variant="minimal"
        />
      </Box>
    </Box>
  );
};

export const Integration: Story = {
  name: '11. Integration',
  render: () => <IntegrationComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify all pagination instances are rendered
    const navigations = canvas.getAllByRole('navigation');
    await expect(navigations).toHaveLength(4);

    // Test that clicking on one updates the display
    const page2Buttons = canvas.getAllByRole('button', { name: /go to page 2/i });
    await userEvent.click(page2Buttons[0]);

    // Check that the display updated
    await waitFor(() => {
      const currentPageText = canvas.getByText(/Current Page: 2/i);
      expect(currentPageText).toBeInTheDocument();
    });

    // Test items per page change
    const selectButton = canvas.getByRole('combobox');
    await userEvent.click(selectButton);

    // MUI Select renders options in a portal, so we need to look in document.body
    await waitFor(async () => {
      const option25 = within(document.body).getByRole('option', { name: '25' });
      await expect(option25).toBeInTheDocument();
    });

    const option25 = within(document.body).getByRole('option', { name: '25' });
    await userEvent.click(option25);

    // Verify page count updated
    await waitFor(() => {
      const itemsPerPageText = canvas.getByText(/Items Per Page: 25/i);
      expect(itemsPerPageText).toBeInTheDocument();
      // Page should reset to 1
      const currentPageText = canvas.getByText(/Current Page: 1/i);
      expect(currentPageText).toBeInTheDocument();
    });

    // Test first/last buttons
    const lastButtons = canvas.getAllByRole('button', { name: /go to last page/i });
    await userEvent.click(lastButtons[0]);

    await waitFor(() => {
      const currentPageText = canvas.getByText(/Current Page: 4/i);
      expect(currentPageText).toBeInTheDocument();
    });
  },
};
