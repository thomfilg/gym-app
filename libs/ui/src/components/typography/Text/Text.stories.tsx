import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { DensityProvider } from '../../../utils/density';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Typography/Text',
  component: Text,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A versatile text component with multiple variants, sizes, and styling options for consistent typography across your application.',
      },
    },
  },
  tags: ['autodocs', 'component:Text'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['body1', 'body2', 'caption', 'overline', 'subtitle1', 'subtitle2'],
      description: 'Text variant',
    },
    color: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'error',
        'warning',
        'info',
        'success',
        'textPrimary',
        'textSecondary',
        'textDisabled',
      ],
      description: 'Text color',
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right', 'justify'],
      description: 'Text alignment',
    },
    weight: {
      control: { type: 'select' },
      options: ['light', 'regular', 'medium', 'semibold', 'bold'],
      description: 'Font weight',
    },
    transform: {
      control: { type: 'select' },
      options: ['none', 'uppercase', 'lowercase', 'capitalize'],
      description: 'Text transformation',
    },
    truncate: {
      control: 'boolean',
      description: 'Enable text truncation',
    },
    italic: {
      control: 'boolean',
      description: 'Italic text',
    },
    underline: {
      control: 'boolean',
      description: 'Underline text',
    },
    strikethrough: {
      control: 'boolean',
      description: 'Strikethrough text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a default text component with standard styling.',
    variant: 'body1',
  },
};

export const AllVariants: Story = {
  render: () => (
    <Stack spacing={2}>
      <Text variant="body1">Body 1 - Main body text for primary content</Text>
      <Text variant="body2">Body 2 - Secondary body text for supporting content</Text>
      <Text variant="subtitle1">Subtitle 1 - Prominent supporting text</Text>
      <Text variant="subtitle2">Subtitle 2 - Less prominent supporting text</Text>
      <Text variant="caption">Caption - Small descriptive text</Text>
      <Text variant="overline">Overline - Small uppercase text</Text>
    </Stack>
  ),
};

export const ColorVariations: Story = {
  render: () => (
    <Stack spacing={2}>
      <Text color="primary">Primary color text</Text>
      <Text color="secondary">Secondary color text</Text>
      <Text color="error">Error color text</Text>
      <Text color="warning">Warning color text</Text>
      <Text color="info">Info color text</Text>
      <Text color="success">Success color text</Text>
      <Text color="textPrimary">Primary text color</Text>
      <Text color="textSecondary">Secondary text color</Text>
      <Text color="textDisabled">Disabled text color</Text>
    </Stack>
  ),
};

export const FontWeights: Story = {
  render: () => (
    <Stack spacing={2}>
      <Text weight="light">Light weight text (300)</Text>
      <Text weight="regular">Regular weight text (400)</Text>
      <Text weight="medium">Medium weight text (500)</Text>
      <Text weight="semibold">Semibold weight text (600)</Text>
      <Text weight="bold">Bold weight text (700)</Text>
    </Stack>
  ),
};

export const TextAlignment: Story = {
  render: () => (
    <Stack spacing={2}>
      <Paper sx={{ p: 2 }}>
        <Text align="left">Left aligned text content</Text>
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Text align="center">Center aligned text content</Text>
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Text align="right">Right aligned text content</Text>
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Text align="justify">
          Justified text content that spans multiple lines to demonstrate the justify alignment.
          This text will be evenly distributed across the full width of the container, creating
          uniform edges on both the left and right sides.
        </Text>
      </Paper>
    </Stack>
  ),
};

export const TextDecorations: Story = {
  render: () => (
    <Stack spacing={2}>
      <Text italic>Italic text for emphasis</Text>
      <Text underline>Underlined text for links or emphasis</Text>
      <Text strikethrough>Strikethrough text for deleted content</Text>
      <Text italic underline>
        Combined italic and underline
      </Text>
      <Text weight="bold" underline>
        Bold and underlined text
      </Text>
    </Stack>
  ),
};

export const TextTransformations: Story = {
  render: () => (
    <Stack spacing={2}>
      <Text transform="uppercase">This text will be uppercase</Text>
      <Text transform="lowercase">THIS TEXT WILL BE LOWERCASE</Text>
      <Text transform="capitalize">this text will be capitalized</Text>
      <Text transform="none">This Text Will Not Be Transformed</Text>
    </Stack>
  ),
};

export const TruncatedText: Story = {
  render: () => (
    <Stack spacing={2}>
      <Box sx={{ width: 300 }}>
        <Text truncate>
          This is a very long text that will be truncated with an ellipsis when it exceeds the
          container width
        </Text>
      </Box>
      <Box sx={{ width: 300 }}>
        <Text truncate lines={2}>
          This is a multi-line text that will be truncated after two lines. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </Text>
      </Box>
    </Stack>
  ),
};

export const RealWorldExamples: Story = {
  render: () => (
    <Stack spacing={4}>
      <Paper sx={{ p: 3 }}>
        <Text variant="overline" color="primary" transform="uppercase">
          New Feature
        </Text>
        <Text variant="subtitle1" weight="bold" gutterBottom>
          Introducing Advanced Analytics
        </Text>
        <Text variant="body2" color="textSecondary">
          Get deeper insights into your data with our new analytics dashboard. Track metrics,
          visualize trends, and make data-driven decisions.
        </Text>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Text variant="caption" color="textSecondary">
          Posted 2 hours ago
        </Text>
        <Text variant="body1" gutterBottom>
          Our team has been working hard to bring you the best experience possible.
        </Text>
        <Text variant="caption" italic color="textSecondary">
          By John Doe, Product Manager
        </Text>
      </Paper>

      <Paper sx={{ p: 3, bgcolor: 'error.light' }}>
        <Text variant="subtitle2" color="error" weight="bold">
          ⚠️ Important Notice
        </Text>
        <Text variant="body2">System maintenance scheduled for tonight at 10 PM EST.</Text>
      </Paper>
    </Stack>
  ),
};

export const ResponsiveText: Story = {
  render: () => (
    <Stack spacing={2}>
      <Text
        sx={{
          fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem', lg: '1.25rem' },
          fontWeight: { xs: 400, md: 500 },
        }}
      >
        This text adapts its size based on screen breakpoints
      </Text>
      <Text
        sx={{
          display: { xs: 'none', sm: 'block' },
        }}
      >
        This text is hidden on mobile devices
      </Text>
      <Text
        sx={{
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        This text is centered on mobile, left-aligned on desktop
      </Text>
    </Stack>
  ),
};

// Required exports for validation
export const AllSizes: Story = {
  render: () => (
    <Stack spacing={2}>
      <Text sx={{ fontSize: '0.75rem' }}>Extra Small (12px)</Text>
      <Text sx={{ fontSize: '0.875rem' }}>Small (14px)</Text>
      <Text sx={{ fontSize: '1rem' }}>Medium (16px)</Text>
      <Text sx={{ fontSize: '1.125rem' }}>Large (18px)</Text>
      <Text sx={{ fontSize: '1.25rem' }}>Extra Large (20px)</Text>
      <Text sx={{ fontSize: '1.5rem' }}>XXL (24px)</Text>
    </Stack>
  ),
};

export const AllStates: Story = {
  render: () => (
    <Stack spacing={2}>
      <Text>Default state</Text>
      <Text color="primary">Primary state</Text>
      <Text color="secondary">Secondary state</Text>
      <Text color="error">Error state</Text>
      <Text color="warning">Warning state</Text>
      <Text color="success">Success state</Text>
      <Text color="textDisabled">Disabled state</Text>
      <Text italic>Italic state</Text>
      <Text underline>Underline state</Text>
      <Text strikethrough>Strikethrough state</Text>
    </Stack>
  ),
};

export const InteractiveStates: Story = {
  render: () => (
    <Stack spacing={2}>
      <Text
        sx={{
          cursor: 'pointer',
          '&:hover': { color: 'primary.main' },
          '&:focus': { outline: '2px solid', outlineColor: 'primary.main' },
        }}
        tabIndex={0}
      >
        Hoverable and focusable text
      </Text>
      <Text
        sx={{
          cursor: 'pointer',
          transition: 'all 0.2s',
          '&:hover': { transform: 'scale(1.05)', color: 'secondary.main' },
        }}
      >
        Text with hover effects
      </Text>
      <Text
        sx={{
          cursor: 'pointer',
          '&:active': { color: 'success.main' },
        }}
      >
        Text with active state
      </Text>
    </Stack>
  ),
};

export const Responsive: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  render: () => (
    <Stack spacing={2}>
      <Text
        sx={{
          fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
          fontWeight: { xs: 400, md: 500 },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        Responsive text sizing and alignment
      </Text>
      <Text
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        Mobile-only text
      </Text>
      <Text
        sx={{
          display: { xs: 'none', md: 'block' },
        }}
      >
        Desktop-only text
      </Text>
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
          <Text variant="body" size="md">
            This is compact density text with reduced spacing.
          </Text>
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="normal">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Normal (1.0x)
          </Typography>
          <Text variant="body" size="md">
            This is normal density text with standard spacing.
          </Text>
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="spacious">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Spacious (1.25x)
          </Typography>
          <Text variant="body" size="md">
            This is spacious density text with extra spacing.
          </Text>
        </Box>
      </DensityProvider>
    </Stack>
  ),
};
