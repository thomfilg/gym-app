import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DensityProvider } from '../../../utils/density';
import React from 'react';

import { Container } from './Container';

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A responsive container component that constrains content width and provides consistent padding. Built on MUI Container with enhanced variants and responsive behavior.',
      },
    },
  },
  tags: ['autodocs', 'component:Container'],
  argTypes: {
    maxWidth: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', false],
      description: 'Maximum width of the container',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'fluid', 'centered', 'padded'],
      description: 'Container variant for different layouts',
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Padding size for the container',
    },
    responsive: {
      control: 'boolean',
      description: 'Enable responsive padding behavior',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const DemoContent = () => (
  <Paper elevation={1} sx={{ p: 3, bgcolor: 'primary.50' }}>
    <Typography variant="h5" gutterBottom>
      Container Content
    </Typography>
    <Typography variant="body1" paragraph>
      This is a demo content inside the container. The container helps to center content and limit
      its maximum width for better readability on larger screens.
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua.
    </Typography>
  </Paper>
);

export const Default: Story = {
  args: {
    children: <DemoContent />,
  },
};

export const FluidContainer: Story = {
  args: {
    variant: 'fluid',
    children: (
      <Paper sx={{ p: 3, bgcolor: 'info.50' }}>
        <Typography variant="h6">Fluid Container</Typography>
        <Typography>This container expands to fill the full width of its parent.</Typography>
      </Paper>
    ),
  },
};

export const CenteredContainer: Story = {
  args: {
    variant: 'centered',
    children: (
      <Paper sx={{ p: 4, maxWidth: 400 }}>
        <Typography variant="h4" gutterBottom align="center">
          Centered Content
        </Typography>
        <Typography align="center">
          This container centers its content both horizontally and vertically in the viewport.
        </Typography>
      </Paper>
    ),
  },
};

export const PaddedContainer: Story = {
  args: {
    variant: 'padded',
    children: (
      <Box>
        <Typography variant="h4" gutterBottom>
          Padded Container
        </Typography>
        <Typography paragraph>
          This container variant adds extra vertical padding, useful for main content areas.
        </Typography>
        <Paper sx={{ p: 3, mt: 2 }}>
          <Typography>Additional content with standard spacing</Typography>
        </Paper>
      </Box>
    ),
  },
};

// Size Variations
export const ExtraSmallContainer: Story = {
  name: 'Extra Small (xs)',
  args: {
    maxWidth: 'xs',
    children: (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            XS Container
          </Typography>
          <Typography variant="body2">Maximum width: 444px</Typography>
        </CardContent>
      </Card>
    ),
  },
};

export const SmallContainer: Story = {
  name: 'Small (sm)',
  args: {
    maxWidth: 'sm',
    children: (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            SM Container
          </Typography>
          <Typography variant="body2">Maximum width: 600px</Typography>
        </CardContent>
      </Card>
    ),
  },
};

export const MediumContainer: Story = {
  name: 'Medium (md)',
  args: {
    maxWidth: 'md',
    children: (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            MD Container
          </Typography>
          <Typography variant="body2">Maximum width: 900px</Typography>
        </CardContent>
      </Card>
    ),
  },
};

export const LargeContainer: Story = {
  name: 'Large (lg)',
  args: {
    maxWidth: 'lg',
    children: (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            LG Container
          </Typography>
          <Typography variant="body2">Maximum width: 1200px</Typography>
        </CardContent>
      </Card>
    ),
  },
};

export const ExtraLargeContainer: Story = {
  name: 'Extra Large (xl)',
  args: {
    maxWidth: 'xl',
    children: (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            XL Container
          </Typography>
          <Typography variant="body2">Maximum width: 1536px</Typography>
        </CardContent>
      </Card>
    ),
  },
};

// Padding Variations
export const NoPadding: Story = {
  args: {
    padding: 'none',
    children: (
      <Paper
        sx={{ p: 2, bgcolor: 'warning.50', border: '2px dashed', borderColor: 'warning.main' }}
      >
        <Typography>Content with no container padding</Typography>
      </Paper>
    ),
  },
};

export const ExtraSmallPadding: Story = {
  args: {
    padding: 'xs',
    children: (
      <Paper sx={{ p: 2, bgcolor: 'success.50' }}>
        <Typography>Content with XS padding</Typography>
      </Paper>
    ),
  },
};

export const SmallPadding: Story = {
  args: {
    padding: 'sm',
    children: (
      <Paper sx={{ p: 2, bgcolor: 'success.50' }}>
        <Typography>Content with SM padding</Typography>
      </Paper>
    ),
  },
};

export const LargePadding: Story = {
  args: {
    padding: 'lg',
    children: (
      <Paper sx={{ p: 2, bgcolor: 'success.50' }}>
        <Typography>Content with LG padding</Typography>
      </Paper>
    ),
  },
};

export const ExtraLargePadding: Story = {
  args: {
    padding: 'xl',
    children: (
      <Paper sx={{ p: 2, bgcolor: 'success.50' }}>
        <Typography>Content with XL padding</Typography>
      </Paper>
    ),
  },
};

// Content Variations
export const EmptyContainer: Story = {
  args: {
    children: null,
    sx: { minHeight: 200, border: '2px dashed #ccc' },
  },
};

export const MinimalContent: Story = {
  args: {
    children: <Typography>Short text</Typography>,
  },
};

export const RichContent: Story = {
  args: {
    children: (
      <Box>
        <Typography variant="h3" gutterBottom>
          Rich Content Container
        </Typography>
        <Typography variant="subtitle1" paragraph>
          This container demonstrates how it handles various types of rich content including
          multiple paragraphs, buttons, and cards.
        </Typography>

        {[1, 2, 3].map((num) => (
          <Paper key={num} sx={{ p: 3, mb: 2, bgcolor: `primary.${50 + num * 50}` }}>
            <Typography variant="h6" gutterBottom>
              Section {num}
            </Typography>
            <Typography paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris.
            </Typography>
            <Button variant="outlined" size="small">
              Action {num}
            </Button>
          </Paper>
        ))}
      </Box>
    ),
  },
};

// Edge Cases
export const LongTextOverflow: Story = {
  args: {
    children: (
      <Box>
        <Typography variant="h6" gutterBottom>
          Long Text Overflow Test
        </Typography>
        <Typography paragraph sx={{ wordBreak: 'break-all' }}>
          ThisIsAVeryLongWordThatShouldTestHowTheContainerHandlesOverflowingContentAndWordBreaking
        </Typography>
        <Typography paragraph>
          {'Very '.repeat(100)}long repeated text to test how the container handles extremely long
          content that might cause layout issues.
        </Typography>
      </Box>
    ),
  },
};

// Responsive Behavior
export const NonResponsive: Story = {
  args: {
    responsive: false,
    padding: 'lg',
    children: (
      <Paper sx={{ p: 3, bgcolor: 'error.50' }}>
        <Typography variant="h6" gutterBottom>
          Non-Responsive Container
        </Typography>
        <Typography>This container maintains the same padding across all screen sizes.</Typography>
      </Paper>
    ),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// Custom Styling
export const CustomStyling: Story = {
  args: {
    sx: {
      backgroundColor: 'secondary.light',
      borderRadius: 4,
      border: '2px solid',
      borderColor: 'secondary.main',
      '&:hover': {
        backgroundColor: 'secondary.main',
        '& .MuiTypography-root': {
          color: 'secondary.contrastText',
        },
      },
    },
    children: (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h5" gutterBottom>
          Custom Styled Container
        </Typography>
        <Typography>Hover to see the styling change</Typography>
      </Box>
    ),
  },
};

// Required exports for validation
export const AllVariants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Container variant="default">
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Default Variant</Typography>
          <Typography>Standard container with default constraints</Typography>
        </Paper>
      </Container>

      <Container variant="fluid">
        <Paper sx={{ p: 2, bgcolor: 'info.50' }}>
          <Typography variant="h6">Fluid Variant</Typography>
          <Typography>Full width container</Typography>
        </Paper>
      </Container>

      <Container variant="centered">
        <Paper sx={{ p: 2, bgcolor: 'success.50' }}>
          <Typography variant="h6">Centered Variant</Typography>
          <Typography>Centered content in viewport</Typography>
        </Paper>
      </Container>

      <Container variant="padded">
        <Paper sx={{ p: 2, bgcolor: 'warning.50' }}>
          <Typography variant="h6">Padded Variant</Typography>
          <Typography>Extra vertical padding</Typography>
        </Paper>
      </Container>
    </Box>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Container maxWidth="xs">
        <Paper sx={{ p: 2, bgcolor: 'primary.50' }}>
          <Typography variant="subtitle2">XS - Max 444px</Typography>
        </Paper>
      </Container>

      <Container maxWidth="sm">
        <Paper sx={{ p: 2, bgcolor: 'primary.100' }}>
          <Typography variant="subtitle2">SM - Max 600px</Typography>
        </Paper>
      </Container>

      <Container maxWidth="md">
        <Paper sx={{ p: 2, bgcolor: 'primary.200' }}>
          <Typography variant="subtitle2">MD - Max 900px</Typography>
        </Paper>
      </Container>

      <Container maxWidth="lg">
        <Paper sx={{ p: 2, bgcolor: 'primary.300' }}>
          <Typography variant="subtitle2">LG - Max 1200px</Typography>
        </Paper>
      </Container>

      <Container maxWidth="xl">
        <Paper sx={{ p: 2, bgcolor: 'primary.400' }}>
          <Typography variant="subtitle2">XL - Max 1536px</Typography>
        </Paper>
      </Container>
    </Box>
  ),
};

export const AllStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Container>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Default State</Typography>
          <Typography>Normal container state</Typography>
        </Paper>
      </Container>

      <Container sx={{ opacity: 0.5 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Disabled State</Typography>
          <Typography>Container with reduced opacity</Typography>
        </Paper>
      </Container>

      <Container sx={{ border: '2px solid', borderColor: 'primary.main' }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Focused State</Typography>
          <Typography>Container with focus indicator</Typography>
        </Paper>
      </Container>

      <Container sx={{ bgcolor: 'action.hover' }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Hover State</Typography>
          <Typography>Container with hover background</Typography>
        </Paper>
      </Container>
    </Box>
  ),
};

export const InteractiveStates: Story = {
  render: () => {
    const [hovered, setHovered] = React.useState(false);
    const [clicked, setClicked] = React.useState(false);

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Container
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => setClicked(!clicked)}
          sx={{
            transition: 'all 0.3s ease',
            transform: hovered ? 'scale(1.02)' : 'scale(1)',
            boxShadow: clicked ? 4 : 0,
            cursor: 'pointer',
          }}
        >
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Interactive Container</Typography>
            <Typography>
              Hover: {hovered ? 'Yes' : 'No'} | Clicked: {clicked ? 'Yes' : 'No'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Hover to scale, click to toggle shadow
            </Typography>
          </Paper>
        </Container>

        <Container>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained">Action 1</Button>
            <Button variant="outlined">Action 2</Button>
            <Button variant="text">Action 3</Button>
          </Box>
        </Container>
      </Box>
    );
  },
};

export const Responsive: Story = {
  render: () => (
    <Container responsive padding="lg">
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Responsive Container
        </Typography>
        <Typography paragraph>
          This container adjusts its padding based on screen size. Resize your browser to see the
          responsive behavior.
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
            gap: 2,
          }}
        >
          <Paper sx={{ p: 2, bgcolor: 'primary.50' }}>
            <Typography variant="subtitle2">Mobile</Typography>
            <Typography variant="body2">1 column</Typography>
          </Paper>
          <Paper sx={{ p: 2, bgcolor: 'primary.100' }}>
            <Typography variant="subtitle2">Tablet</Typography>
            <Typography variant="body2">2 columns</Typography>
          </Paper>
          <Paper sx={{ p: 2, bgcolor: 'primary.200' }}>
            <Typography variant="subtitle2">Desktop</Typography>
            <Typography variant="body2">3 columns</Typography>
          </Paper>
        </Box>
      </Paper>
    </Container>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
  },
};

export const DensityModes: Story = {
  render: () => {

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <DensityProvider defaultMode="compact">
          <Box>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Compact (0.8x)
            </Typography>
            <Container maxWidth="sm" padding="md">
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Compact Container</Typography>
                <Typography variant="body2">Tighter spacing for dense layouts.</Typography>
              </Paper>
            </Container>
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="normal">
          <Box>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Normal (1.0x)
            </Typography>
            <Container maxWidth="sm" padding="md">
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Normal Container</Typography>
                <Typography variant="body2">Standard spacing for regular use.</Typography>
              </Paper>
            </Container>
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="spacious">
          <Box>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Spacious (1.25x)
            </Typography>
            <Container maxWidth="sm" padding="md">
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Spacious Container</Typography>
                <Typography variant="body2">Extra breathing room for accessibility.</Typography>
              </Paper>
            </Container>
          </Box>
        </DensityProvider>
      </Box>
    );
  },
};
