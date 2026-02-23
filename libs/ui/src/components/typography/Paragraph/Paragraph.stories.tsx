import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { DensityProvider } from '../../../utils/density';
import { Paragraph } from './Paragraph';

const meta: Meta<typeof Paragraph> = {
  title: 'Typography/Paragraph',
  component: Paragraph,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A semantic paragraph component with multiple visual variants for different content contexts. Features lead text styling, muted text, small text, and configurable sizing options.',
      },
    },
  },
  tags: ['autodocs', 'component:Paragraph'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'lead', 'muted', 'small'],
      description: 'Paragraph style variant',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'neutral'],
      description: 'Theme color',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.';

export const Default: Story = {
  args: {
    children: sampleText,
  },
};

export const AllVariants: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Paper sx={{ p: 2 }}>
          <h4>Default Paragraph</h4>
          <Paragraph variant="default">{sampleText}</Paragraph>
        </Paper>
      </Box>

      <Box>
        <Paper sx={{ p: 2 }}>
          <h4>Lead Paragraph</h4>
          <Paragraph variant="lead">{sampleText}</Paragraph>
        </Paper>
      </Box>

      <Box>
        <Paper sx={{ p: 2 }}>
          <h4>Small Paragraph</h4>
          <Paragraph variant="small">{sampleText}</Paragraph>
        </Paper>
      </Box>

      <Box>
        <Paper sx={{ p: 2 }}>
          <h4>Muted Paragraph</h4>
          <Paragraph variant="muted">{sampleText}</Paragraph>
        </Paper>
      </Box>
    </Stack>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Paper sx={{ p: 2 }}>
          <h4>Extra Small (xs)</h4>
          <Paragraph size="xs">{sampleText}</Paragraph>
        </Paper>
      </Box>

      <Box>
        <Paper sx={{ p: 2 }}>
          <h4>Small (sm)</h4>
          <Paragraph size="sm">{sampleText}</Paragraph>
        </Paper>
      </Box>

      <Box>
        <Paper sx={{ p: 2 }}>
          <h4>Medium (md) - Default</h4>
          <Paragraph size="md">{sampleText}</Paragraph>
        </Paper>
      </Box>

      <Box>
        <Paper sx={{ p: 2 }}>
          <h4>Large (lg)</h4>
          <Paragraph size="lg">{sampleText}</Paragraph>
        </Paper>
      </Box>

      <Box>
        <Paper sx={{ p: 2 }}>
          <h4>Extra Large (xl)</h4>
          <Paragraph size="xl">{sampleText}</Paragraph>
        </Paper>
      </Box>
    </Stack>
  ),
};

export const AllStates: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Paper sx={{ p: 2 }}>
          <h4>Neutral (default)</h4>
          <Paragraph color="neutral">{sampleText}</Paragraph>
        </Paper>
      </Box>

      <Box>
        <Paper sx={{ p: 2 }}>
          <h4>Primary Color</h4>
          <Paragraph color="primary">{sampleText}</Paragraph>
        </Paper>
      </Box>

      <Box>
        <Paper sx={{ p: 2 }}>
          <h4>Secondary Color</h4>
          <Paragraph color="secondary">{sampleText}</Paragraph>
        </Paper>
      </Box>

      <Box>
        <Paper sx={{ p: 2 }}>
          <h4>Success Color</h4>
          <Paragraph color="success">{sampleText}</Paragraph>
        </Paper>
      </Box>

      <Box>
        <Paper sx={{ p: 2 }}>
          <h4>Warning Color</h4>
          <Paragraph color="warning">{sampleText}</Paragraph>
        </Paper>
      </Box>

      <Box>
        <Paper sx={{ p: 2 }}>
          <h4>Danger Color</h4>
          <Paragraph color="danger">{sampleText}</Paragraph>
        </Paper>
      </Box>
    </Stack>
  ),
};

export const InteractiveStates: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Paper sx={{ p: 3 }}>
          <h3>Article Example</h3>
          <Paragraph variant="lead" size="lg" color="primary">
            This is a lead paragraph with large size and primary color. It's designed to grab
            attention and introduce the main content.
          </Paragraph>

          <Paragraph>
            This is a regular paragraph that follows the lead paragraph. It uses default styling for
            comfortable reading.
          </Paragraph>

          <Paragraph variant="small" color="secondary">
            This is a small paragraph with secondary color, often used for additional information or
            footnotes.
          </Paragraph>

          <Paragraph variant="muted">
            This is a muted paragraph that provides supplementary information without competing for
            attention.
          </Paragraph>
        </Paper>
      </Box>
    </Stack>
  ),
};

export const Responsive: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Paper sx={{ p: 2 }}>
          <h4>Responsive Behavior</h4>
          <Paragraph
            sx={{
              fontSize: { xs: '14px', sm: '16px', md: '18px' },
              lineHeight: { xs: 1.5, md: 1.7 },
            }}
          >
            This paragraph adjusts its font size and line height based on screen size for optimal
            readability across devices.
          </Paragraph>
        </Paper>
      </Box>
    </Stack>
  ),
};

// Additional helpful stories
export const LongContent: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Paper sx={{ p: 3 }}>
          <h4>Long Content Handling</h4>
          <Paragraph variant="lead">{longText}</Paragraph>

          <Paragraph>{longText}</Paragraph>

          <Paragraph variant="small">{longText}</Paragraph>
        </Paper>
      </Box>
    </Stack>
  ),
};

export const WithCustomStyling: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Paper sx={{ p: 3 }}>
          <h4>Custom Styling Examples</h4>
          <Paragraph
            variant="lead"
            sx={{
              textAlign: 'center',
              background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            This paragraph demonstrates custom styling with gradient text and center alignment.
          </Paragraph>

          <Paragraph
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              p: 2,
              backgroundColor: 'grey.50',
            }}
          >
            This paragraph has a custom border and background, making it stand out from the rest of
            the content.
          </Paragraph>
        </Paper>
      </Box>
    </Stack>
  ),
};

export const DensityModes: Story = {
  render: () => (
    <Stack direction="row" spacing={4} alignItems="flex-start">
      <DensityProvider defaultMode="compact">
        <Box sx={{ width: 250 }}>
          <Typography variant="caption" gutterBottom display="block">
            Compact (0.8x)
          </Typography>
          <Paragraph>
            This is a paragraph with compact density. It has reduced spacing for a denser layout.
          </Paragraph>
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="normal">
        <Box sx={{ width: 250 }}>
          <Typography variant="caption" gutterBottom display="block">
            Normal (1.0x)
          </Typography>
          <Paragraph>
            This is a paragraph with normal density. It has standard spacing for comfortable reading.
          </Paragraph>
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="spacious">
        <Box sx={{ width: 250 }}>
          <Typography variant="caption" gutterBottom display="block">
            Spacious (1.25x)
          </Typography>
          <Paragraph>
            This is a paragraph with spacious density. It has extra spacing for maximum readability.
          </Paragraph>
        </Box>
      </DensityProvider>
    </Stack>
  ),
};
