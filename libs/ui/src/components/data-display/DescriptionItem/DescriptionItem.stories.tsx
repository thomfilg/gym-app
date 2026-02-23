import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ContentCopy as ContentCopyIcon } from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { DensityProvider } from '../../../utils/density';
import { Button } from '../../form/Button/Button';
import { Chip } from '../Chip/Chip';
import { DescriptionItem } from './DescriptionItem';

const meta: Meta<typeof DescriptionItem> = {
  title: 'DataDisplay/DescriptionItem',
  component: DescriptionItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'component:DescriptionItem'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The label text to display',
    },
    value: {
      control: 'text',
      description: 'The value to display - can be text, number, or any React node',
    },
    orientation: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
      description: 'Layout orientation',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Incident ID',
    value: 'INC-12345',
  },
};

export const WithNumber: Story = {
  args: {
    label: 'Services Affected',
    value: 42,
  },
};

export const WithLongText: Story = {
  args: {
    label: 'Description',
    value: 'This is a longer description that demonstrates how the component handles multiple lines of text content.',
  },
};

export const WithCustomContent: Story = {
  render: () => (
    <DescriptionItem
      label="Status"
      value={<Chip label="Active" color="success" size="small" />}
    />
  ),
};

export const HorizontalOrientation: Story = {
  render: () => (
    <Stack spacing={2} sx={{ width: 400 }}>
      <DescriptionItem label="Name" value="John Doe" orientation="horizontal" />
      <DescriptionItem label="Email" value="john.doe@example.com" orientation="horizontal" />
      <DescriptionItem label="Status" value={<Chip label="Active" color="success" size="small" />} orientation="horizontal" />
      <DescriptionItem label="Role" value="Administrator" orientation="horizontal" />
    </Stack>
  ),
};

export const VerticalOrientation: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 300 }}>
      <DescriptionItem label="Name" value="John Doe" orientation="vertical" />
      <DescriptionItem label="Email" value="john.doe@example.com" orientation="vertical" />
      <DescriptionItem label="Status" value={<Chip label="Active" color="success" size="small" />} orientation="vertical" />
      <DescriptionItem label="Role" value="Administrator" orientation="vertical" />
    </Stack>
  ),
};

export const WithCopyableValue: Story = {
  render: () => (
    <DescriptionItem
      label="Incident ID"
      value={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>INC-12345</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigator.clipboard.writeText('INC-12345')}
            sx={{ minWidth: 'auto', padding: 0.25 }}
            aria-label="Copy incident ID"
          >
            <ContentCopyIcon sx={{ fontSize: 16 }} />
          </Button>
        </Box>
      }
    />
  ),
};

export const GridLayout: Story = {
  render: () => (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 3,
        width: 800,
      }}
    >
      <DescriptionItem label="Incident ID" value="INC-12345" />
      <DescriptionItem label="Started" value="2 hours ago" />
      <DescriptionItem label="Duration" value="Ongoing" />
      <DescriptionItem label="Services Affected" value={5} />
    </Box>
  ),
};

export const VerticalStack: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 300 }}>
      <DescriptionItem label="Name" value="John Doe" />
      <DescriptionItem label="Email" value="john.doe@example.com" />
      <DescriptionItem label="Department" value="Engineering" />
      <DescriptionItem
        label="Role"
        value={<Chip label="Admin" color="primary" size="small" />}
      />
    </Stack>
  ),
};

export const ResponsiveGrid: Story = {
  render: () => (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
        gap: 3,
        maxWidth: 900,
      }}
    >
      <DescriptionItem label="Order ID" value="ORD-2024-001" />
      <DescriptionItem label="Customer" value="Acme Corp" />
      <DescriptionItem label="Total Amount" value="$1,234.56" />
      <DescriptionItem label="Status" value={<Chip label="Completed" color="success" size="small" />} />
      <DescriptionItem label="Order Date" value="Jan 15, 2024" />
      <DescriptionItem label="Shipping Method" value="Express" />
      <DescriptionItem label="Items" value={3} />
      <DescriptionItem label="Payment Method" value="Credit Card" />
    </Box>
  ),
};

export const WithEmptyValue: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 300 }}>
      <DescriptionItem label="Optional Field" value="N/A" />
      <DescriptionItem label="No Value" value="-" />
      <DescriptionItem label="Empty" value="" />
    </Stack>
  ),
};

export const MixedOrientations: Story = {
  render: () => (
    <Box sx={{ width: 600 }}>
      <Stack spacing={3}>
        <Box>
          <h3>Vertical Layout (Default)</h3>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3, mt: 2 }}>
            <DescriptionItem label="Name" value="John Doe" />
            <DescriptionItem label="Age" value={32} />
            <DescriptionItem label="City" value="San Francisco" />
          </Box>
        </Box>

        <Box>
          <h3>Horizontal Layout</h3>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <DescriptionItem label="Name" value="John Doe" orientation="horizontal" />
            <DescriptionItem label="Age" value={32} orientation="horizontal" />
            <DescriptionItem label="City" value="San Francisco" orientation="horizontal" />
          </Stack>
        </Box>
      </Stack>
    </Box>
  ),
};

export const AllVariations: Story = {
  render: () => (
    <Stack spacing={4} sx={{ width: 800 }}>
      <Box>
        <h3>Text Values (Vertical)</h3>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3, mt: 2 }}>
          <DescriptionItem label="Short Text" value="Value" />
          <DescriptionItem label="Medium Text" value="This is a medium length value" />
          <DescriptionItem label="Long Text" value="This is a much longer text value that will wrap to multiple lines" />
        </Box>
      </Box>

      <Box>
        <h3>Text Values (Horizontal)</h3>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <DescriptionItem label="Short Text" value="Value" orientation="horizontal" />
          <DescriptionItem label="Medium Text" value="This is a medium length value" orientation="horizontal" />
          <DescriptionItem label="Long Text" value="This is a much longer text value that will wrap to multiple lines" orientation="horizontal" />
        </Stack>
      </Box>

      <Box>
        <h3>Number Values</h3>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3, mt: 2 }}>
          <DescriptionItem label="Integer" value={42} />
          <DescriptionItem label="Decimal" value={3.14159} />
          <DescriptionItem label="Large Number" value={1234567890} />
        </Box>
      </Box>

      <Box>
        <h3>Custom Components</h3>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3, mt: 2 }}>
          <DescriptionItem
            label="With Chip"
            value={<Chip label="Active" color="success" size="small" />}
          />
          <DescriptionItem
            label="With Button"
            value={<Button size="xs" variant="outline">Action</Button>}
          />
          <DescriptionItem
            label="Multiple Elements"
            value={
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <Chip label="Tag 1" size="small" />
                <Chip label="Tag 2" size="small" />
              </Box>
            }
          />
        </Box>
      </Box>
    </Stack>
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
          <Stack spacing={2}>
            <DescriptionItem label="Incident ID" value="INC-12345" />
            <DescriptionItem label="Status" value={<Chip label="Active" color="success" size="small" />} />
            <DescriptionItem label="Duration" value="2 hours" />
          </Stack>
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="normal">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Normal (1.0x)
          </Typography>
          <Stack spacing={2}>
            <DescriptionItem label="Incident ID" value="INC-12345" />
            <DescriptionItem label="Status" value={<Chip label="Active" color="success" size="small" />} />
            <DescriptionItem label="Duration" value="2 hours" />
          </Stack>
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="spacious">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Spacious (1.25x)
          </Typography>
          <Stack spacing={2}>
            <DescriptionItem label="Incident ID" value="INC-12345" />
            <DescriptionItem label="Status" value={<Chip label="Active" color="success" size="small" />} />
            <DescriptionItem label="Duration" value="2 hours" />
          </Stack>
        </Box>
      </DensityProvider>
    </Stack>
  ),
};
