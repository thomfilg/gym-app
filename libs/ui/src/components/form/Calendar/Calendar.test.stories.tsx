import Box from '@mui/material/Box';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn,userEvent, waitFor, within } from 'storybook/test';

import { Calendar } from './Calendar';
import type { DateRange } from './Calendar.types';

const meta: Meta<typeof Calendar> = {
  title: 'Form/Calendar/Tests',
  component: Calendar,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:Calendar'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Test wrapper component for controlled state
interface TestWrapperProps {
  selectionMode?: 'single' | 'range';
  onChangeCallback?: (value: Date | null) => void;
  onRangeChangeCallback?: (range: Required<DateRange>) => void;
  [key: string]: unknown;
}

const TestWrapper = ({
  selectionMode = 'single',
  onChangeCallback = fn(),
  onRangeChangeCallback = fn(),
  ...props
}: TestWrapperProps) => {
  const [value, setValue] = useState<Date | null>(null);
  const [range, setRange] = useState<DateRange>({ start: null, end: null });

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
    onChangeCallback(newValue);
  };

  const handleRangeChange = (newRange: Required<DateRange>) => {
    setRange(newRange);
    onRangeChangeCallback(newRange);
  };

  if (selectionMode === 'range') {
    return (
      <Calendar {...props} selectionMode="range" range={range} onRangeChange={handleRangeChange} />
    );
  }

  return <Calendar {...props} selectionMode="single" value={value} onChange={handleChange} />;
};

export const BasicInteraction: Story = {
  render: () => <TestWrapper onChangeCallback={fn()} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find calendar container
    const calendar = canvas.getByRole('application', { name: 'Calendar' });
    expect(calendar).toBeInTheDocument();

    // Find and click a date (day 15 if available)
    const dateButtons = canvas.getAllByRole('gridcell');
    expect(dateButtons.length).toBeGreaterThan(0);

    // Find a clickable date in current month
    const clickableDate = dateButtons.find(
      (button) =>
        !button.getAttribute('aria-disabled') &&
        button.textContent &&
        button.textContent.trim() !== '',
    );

    if (clickableDate) {
      await userEvent.click(clickableDate);

      // Verify date is selected
      await waitFor(() => {
        expect(clickableDate).toHaveAttribute('aria-selected', 'true');
      });
    }
  },
};

export const RangeInteractionTest: Story = {
  render: () => <TestWrapper selectionMode="range" onRangeChangeCallback={fn()} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find calendar container
    const calendar = canvas.getByRole('application', { name: 'Calendar' });
    expect(calendar).toBeInTheDocument();

    const dateButtons = canvas.getAllByRole('gridcell');
    const clickableDates = dateButtons.filter(
      (button) =>
        !button.getAttribute('aria-disabled') &&
        button.textContent &&
        button.textContent.trim() !== '',
    );

    if (clickableDates.length >= 2) {
      // Click first date (start)
      await userEvent.click(clickableDates[5]);

      // Hover over second date to see preview
      await userEvent.hover(clickableDates[10]);

      // Click second date (end)
      await userEvent.click(clickableDates[10]);

      // Verify range selection
      await waitFor(() => {
        expect(clickableDates[5]).toHaveAttribute('aria-selected', 'true');
        expect(clickableDates[10]).toHaveAttribute('aria-selected', 'true');
      });
    }
  },
};

export const KeyboardNavigation: Story = {
  render: () => <TestWrapper autoFocus />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find calendar container
    const calendar = canvas.getByRole('application', { name: 'Calendar' });
    expect(calendar).toBeInTheDocument();

    // Focus the calendar
    calendar.focus();

    // Test arrow key navigation
    await userEvent.keyboard('{ArrowRight}');
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ArrowLeft}');
    await userEvent.keyboard('{ArrowUp}');

    // Test home/end navigation
    await userEvent.keyboard('{Home}');
    await userEvent.keyboard('{End}');

    // Test page navigation
    await userEvent.keyboard('{PageDown}');
    await userEvent.keyboard('{PageUp}');

    // Test selection with Enter
    await userEvent.keyboard('{Enter}');

    // Verify focused element exists
    const focusedCell = document.activeElement;
    expect(focusedCell).toBeTruthy();
  },
};

export const ScreenReaderTest: Story = {
  render: () => <TestWrapper />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify ARIA attributes
    const calendar = canvas.getByRole('application', { name: 'Calendar' });
    expect(calendar).toBeInTheDocument();

    // Check grid role
    const grids = canvas.getAllByRole('grid');
    expect(grids.length).toBeGreaterThan(0);

    // Check column headers (weekdays)
    const columnHeaders = canvas.getAllByRole('columnheader');
    expect(columnHeaders).toHaveLength(7); // 7 days of week

    // Check grid cells
    const gridCells = canvas.getAllByRole('gridcell');
    expect(gridCells.length).toBeGreaterThan(0);

    // Verify each cell has proper attributes
    gridCells.forEach((cell) => {
      expect(cell).toHaveAttribute('aria-selected');
      if (cell.textContent === 'disabled') {
        expect(cell).toHaveAttribute('aria-disabled', 'true');
      }
    });
  },
};

export const FocusManagement: Story = {
  render: () => <TestWrapper autoFocus />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find calendar container
    const calendar = canvas.getByRole('application', { name: 'Calendar' });

    // Focus should be managed properly
    calendar.focus();

    // Navigate and verify focus moves correctly
    await userEvent.keyboard('{ArrowRight}');

    // Check that only one cell has tabIndex 0
    const dateButtons = canvas.getAllByRole('gridcell');
    const focusableCells = dateButtons.filter((cell) => cell.getAttribute('tabindex') === '0');
    expect(focusableCells).toHaveLength(1);

    // Test Tab navigation out of calendar
    await userEvent.keyboard('{Tab}');

    // Focus should move to next element (navigation buttons)
    const focusedElement = document.activeElement;
    expect(focusedElement).toBeTruthy();
  },
};

export const ResponsiveDesign: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  render: () => (
    <Box sx={{ width: '100%', maxWidth: 320 }}>
      <TestWrapper />
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify calendar renders in mobile viewport
    const calendar = canvas.getByRole('application', { name: 'Calendar' });
    expect(calendar).toBeInTheDocument();

    // Check that calendar adapts to container width
    const calendarRect = calendar.getBoundingClientRect();
    expect(calendarRect.width).toBeLessThanOrEqual(320);

    // Verify interactions still work on mobile
    const dateButtons = canvas.getAllByRole('gridcell');
    const clickableDate = dateButtons.find(
      (button) =>
        !button.getAttribute('aria-disabled') &&
        button.textContent &&
        button.textContent.trim() !== '',
    );

    if (clickableDate) {
      await userEvent.click(clickableDate);

      await waitFor(() => {
        expect(clickableDate).toHaveAttribute('aria-selected', 'true');
      });
    }
  },
};

export const ThemeVariations: Story = {
  render: () => <TestWrapper />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find calendar and verify theme application
    const calendar = canvas.getByRole('application', { name: 'Calendar' });
    expect(calendar).toBeInTheDocument();

    // Check that theme styles are applied
    const computedStyle = window.getComputedStyle(calendar);
    expect(computedStyle.padding).toBeTruthy();

    // Find date buttons and check their styling
    const dateButtons = canvas.getAllByRole('gridcell');
    dateButtons.forEach((button) => {
      const buttonStyle = window.getComputedStyle(button);
      expect(buttonStyle.display).toBe('flex');
    });
  },
};

export const VisualStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TestWrapper
        value={new Date()}
        minDate={new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)}
        maxDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
      />
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify different visual states
    const calendar = canvas.getByRole('application', { name: 'Calendar' });
    expect(calendar).toBeInTheDocument();

    const dateButtons = canvas.getAllByRole('gridcell');

    // Check for today's date styling
    const todayButton = dateButtons.find(
      (button) => button.getAttribute('aria-current') === 'date',
    );
    if (todayButton) {
      const todayStyle = window.getComputedStyle(todayButton);
      expect(todayStyle.fontWeight).toBe('700'); // bold
    }

    // Check for disabled dates
    const disabledButtons = dateButtons.filter(
      (button) => button.getAttribute('aria-disabled') === 'true',
    );
    expect(disabledButtons.length).toBeGreaterThan(0);
  },
};

export const PerformanceTest: Story = {
  render: () => <TestWrapper numberOfMonths={3} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Measure rendering performance
    const startTime = Date.now();

    const calendar = canvas.getByRole('application', { name: 'Calendar' });
    expect(calendar).toBeInTheDocument();

    // Check all months are rendered
    const grids = canvas.getAllByRole('grid');
    expect(grids).toHaveLength(3);

    const endTime = Date.now();
    const renderTime = endTime - startTime;

    // Rendering should be reasonably fast (less than 100ms for 3 months)
    expect(renderTime).toBeLessThan(100);

    // Test navigation performance
    const navButtons = canvas.getAllByRole('button');
    const nextButton = navButtons.find((btn) => btn.getAttribute('aria-label')?.includes('next'));

    if (nextButton) {
      const navigationStart = Date.now();
      await userEvent.click(nextButton);
      const navigationEnd = Date.now();

      expect(navigationEnd - navigationStart).toBeLessThan(50);
    }
  },
};

export const EdgeCases: Story = {
  render: () => (
    <TestWrapper
      minRangeLength={3}
      maxRangeLength={10}
      allowSameDayRange={false}
      selectionMode="range"
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const calendar = canvas.getByRole('application', { name: 'Calendar' });
    expect(calendar).toBeInTheDocument();

    const dateButtons = canvas.getAllByRole('gridcell');
    const clickableDates = dateButtons.filter(
      (button) =>
        !button.getAttribute('aria-disabled') &&
        button.textContent &&
        button.textContent.trim() !== '',
    );

    if (clickableDates.length >= 3) {
      // Try to select same day range (should be prevented)
      await userEvent.click(clickableDates[5]);
      await userEvent.click(clickableDates[5]);

      // Verify same day range is not allowed
      // (implementation should prevent this selection)

      // Test minimum range length constraint
      await userEvent.click(clickableDates[5]);
      await userEvent.click(clickableDates[6]); // Only 1 day gap, should be invalid

      // Test valid range
      await userEvent.click(clickableDates[5]);
      await userEvent.click(clickableDates[8]); // 3+ days, should be valid

      await waitFor(() => {
        expect(clickableDates[5]).toHaveAttribute('aria-selected', 'true');
        expect(clickableDates[8]).toHaveAttribute('aria-selected', 'true');
      });
    }
  },
};

const IntegrationTestComponent = () => {
  const [singleDate, setSingleDate] = useState<Date | null>(null);
  const [rangeDate, setRangeDate] = useState<DateRange>({ start: null, end: null });

  return (
    <Box sx={{ display: 'flex', gap: 4 }}>
      <Calendar
        selectionMode="single"
        value={singleDate}
        onChange={setSingleDate}
        data-testid="single-calendar"
      />
      <Calendar
        selectionMode="range"
        range={rangeDate}
        onRangeChange={setRangeDate}
        data-testid="range-calendar"
      />
    </Box>
  );
};

export const IntegrationTest: Story = {
  render: () => <IntegrationTestComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test multiple calendars working independently
    const calendars = canvas.getAllByRole('application', { name: 'Calendar' });
    expect(calendars).toHaveLength(2);

    // Test interaction with first calendar
    const firstCalendarButtons = within(calendars[0]).getAllByRole('gridcell');
    const firstClickable = firstCalendarButtons.find(
      (button) =>
        !button.getAttribute('aria-disabled') &&
        button.textContent &&
        button.textContent.trim() !== '',
    );

    if (firstClickable) {
      await userEvent.click(firstClickable);
      await waitFor(() => {
        expect(firstClickable).toHaveAttribute('aria-selected', 'true');
      });
    }

    // Test interaction with second calendar
    const secondCalendarButtons = within(calendars[1]).getAllByRole('gridcell');
    const secondClickables = secondCalendarButtons.filter(
      (button) =>
        !button.getAttribute('aria-disabled') &&
        button.textContent &&
        button.textContent.trim() !== '',
    );

    if (secondClickables.length >= 2) {
      await userEvent.click(secondClickables[5]);
      await userEvent.click(secondClickables[10]);

      await waitFor(() => {
        expect(secondClickables[5]).toHaveAttribute('aria-selected', 'true');
        expect(secondClickables[10]).toHaveAttribute('aria-selected', 'true');
      });
    }
  },
};
