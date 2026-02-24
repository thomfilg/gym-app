import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { DensityProvider } from '../../../utils/density';
import { Calendar } from './Calendar';
import type { DateRange } from './Calendar.types';

const meta: Meta<typeof Calendar> = {
  title: 'Form/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A reusable calendar component that supports single date selection and date range selection with Airbnb-style hover preview, dual-month layout, and full keyboard/accessibility support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    selectionMode: {
      control: { type: 'select' },
      options: ['single', 'range'],
      description: 'Calendar selection mode',
    },
    numberOfMonths: {
      control: { type: 'number', min: 1, max: 3 },
      description: 'Number of months to display',
    },
    firstDayOfWeek: {
      control: { type: 'select' },
      options: [0, 1, 2, 3, 4, 5, 6],
      description: 'First day of week (0=Sunday, 1=Monday, etc.)',
    },
    locale: {
      control: { type: 'text' },
      description: 'Locale for date formatting',
    },
    showOutsideDays: {
      control: { type: 'boolean' },
      description: 'Show days from previous/next month',
    },
    showWeekNumbers: {
      control: { type: 'boolean' },
      description: 'Show week numbers',
    },
    allowSameDayRange: {
      control: { type: 'boolean' },
      description: 'Allow same day as start and end of range',
    },
    autoFocus: {
      control: { type: 'boolean' },
      description: 'Auto focus the calendar on mount',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectionMode: 'single',
  },
};

const SingleDateControlledComponent = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
      <Typography variant="h6">
        Selected: {selectedDate ? selectedDate.toLocaleDateString() : 'None'}
      </Typography>
      <Calendar
        selectionMode="single"
        value={selectedDate}
        onChange={setSelectedDate}
      />
      <Button onClick={() => setSelectedDate(null)} variant="outlined">
        Clear
      </Button>
    </Box>
  );
};

export const SingleDateControlled: Story = {
  render: () => <SingleDateControlledComponent />,
};

const RangeSelectionComponent = () => {
  const [selectedRange, setSelectedRange] = useState<DateRange>({ start: null, end: null });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
      <Typography variant="h6">
        Range: {selectedRange.start ? selectedRange.start.toLocaleDateString() : 'None'} - {selectedRange.end ? selectedRange.end.toLocaleDateString() : 'None'}
      </Typography>
      <Calendar
        selectionMode="range"
        range={selectedRange}
        onRangeChange={(range) => setSelectedRange(range)}
        onIntermediateRangeChange={(partial) => void partial}
      />
      <Button onClick={() => setSelectedRange({ start: null, end: null })} variant="outlined">
        Clear
      </Button>
    </Box>
  );
};

export const RangeSelection: Story = {
  render: () => <RangeSelectionComponent />,
};

export const DualMonth: Story = {
  args: {
    selectionMode: 'range',
    numberOfMonths: 2,
  },
};

export const WithDisabledDates: Story = {
  args: {
    selectionMode: 'single',
    minDate: new Date(),
    maxDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    isDateDisabled: (date: Date) => date.getDay() === 0 || date.getDay() === 6, // Disable weekends
  },
};

export const RangeWithConstraints: Story = {
  args: {
    selectionMode: 'range',
    minRangeLength: 3,
    maxRangeLength: 14,
    allowSameDayRange: false,
  },
};

export const MondayFirstDay: Story = {
  args: {
    selectionMode: 'single',
    firstDayOfWeek: 1,
  },
};

export const LocaleGerman: Story = {
  args: {
    selectionMode: 'single',
    locale: 'de-DE',
    firstDayOfWeek: 1,
  },
};

export const WithoutOutsideDays: Story = {
  args: {
    selectionMode: 'single',
    showOutsideDays: false,
  },
};

export const KeyboardOnly: Story = {
  args: {
    selectionMode: 'single',
    autoFocus: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Use arrow keys to navigate, Enter/Space to select, Page Up/Down to change months.',
      },
    },
  },
};

export const CustomDayRenderer: Story = {
  args: {
    selectionMode: 'single',
    renderDay: ({ date, selected, today, disabled, inCurrentMonth }) => (
      <Box
        sx={{
          width: 40,
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          backgroundColor: selected ? 'error.main' : today ? 'warning.main' : 'transparent',
          color: selected || today ? 'white' : disabled ? 'text.disabled' : 'text.primary',
          opacity: inCurrentMonth ? 1 : 0.3,
          fontWeight: today ? 'bold' : 'normal',
          cursor: disabled ? 'not-allowed' : 'pointer',
          border: today ? '2px solid' : 'none',
          borderColor: today ? 'warning.dark' : 'transparent',
        }}
      >
        {date.getDate()}
      </Box>
    ),
  },
};

const WithFooterComponent = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <Calendar
      selectionMode="single"
      value={selectedDate}
      onChange={setSelectedDate}
      renderFooter={
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
          <Button onClick={() => setSelectedDate(null)} variant="outlined" size="small">
            Clear
          </Button>
          <Button onClick={() => setSelectedDate(new Date())} variant="contained" size="small">
            Today
          </Button>
        </Box>
      }
    />
  );
};

export const WithFooter: Story = {
  render: () => <WithFooterComponent />,
};

export const CustomHeader: Story = {
  args: {
    selectionMode: 'single',
    renderHeader: ({ month, year }) => (
      <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
        🗓️ {new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      </Typography>
    ),
  },
};

export const FixedRange: Story = {
  args: {
    selectionMode: 'range',
    fixedRange: true,
    minRangeLength: 7,
  },
  parameters: {
    docs: {
      description: {
        story: 'Fixed range mode - selecting start date automatically calculates end date based on minRangeLength.',
      },
    },
  },
};

export const TripleMonth: Story = {
  args: {
    selectionMode: 'range',
    numberOfMonths: 3,
  },
};

// Required story exports for validation
export const AllVariants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Typography variant="h6">Single Date Selection</Typography>
      <Calendar selectionMode="single" />

      <Typography variant="h6">Range Selection</Typography>
      <Calendar selectionMode="range" />

      <Typography variant="h6">Dual Month</Typography>
      <Calendar selectionMode="range" numberOfMonths={2} />
    </Box>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Typography variant="h6">Single Month</Typography>
      <Calendar numberOfMonths={1} />

      <Typography variant="h6">Dual Month</Typography>
      <Calendar numberOfMonths={2} />

      <Typography variant="h6">Triple Month</Typography>
      <Calendar numberOfMonths={3} />
    </Box>
  ),
};

export const AllStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Typography variant="h6">Default State</Typography>
      <Calendar />

      <Typography variant="h6">With Disabled Dates</Typography>
      <Calendar
        minDate={new Date()}
        isDateDisabled={(date) => date.getDay() === 0}
      />

      <Typography variant="h6">Without Outside Days</Typography>
      <Calendar showOutsideDays={false} />
    </Box>
  ),
};

const InteractiveStatesComponent = () => {
  const [singleValue, setSingleValue] = useState<Date | null>(null);
  const [rangeValue, setRangeValue] = useState<DateRange>({ start: null, end: null });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Typography variant="h6">Interactive Single Selection</Typography>
      <Calendar
        selectionMode="single"
        value={singleValue}
        onChange={setSingleValue}
        autoFocus
      />

      <Typography variant="h6">Interactive Range Selection</Typography>
      <Calendar
        selectionMode="range"
        range={rangeValue}
        onRangeChange={setRangeValue}
      />
    </Box>
  );
};

export const InteractiveStates: Story = {
  render: () => <InteractiveStatesComponent />,
};

export const Responsive: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  render: () => (
    <Box sx={{ width: '100%', maxWidth: 400 }}>
      <Calendar selectionMode="single" />
    </Box>
  ),
};

export const DensityModes: Story = {
  render: () => (
    <Stack direction="row" spacing={4} alignItems="flex-start">
      <DensityProvider defaultMode="compact">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Compact (0.8x)
          </Typography>
          <Calendar selectionMode="single" />
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="normal">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Normal (1.0x)
          </Typography>
          <Calendar selectionMode="single" />
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="spacious">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Spacious (1.25x)
          </Typography>
          <Calendar selectionMode="single" />
        </Box>
      </DensityProvider>
    </Stack>
  ),
};