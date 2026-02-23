import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DensityProvider } from '../../../utils/density';

import { Spacer } from './Spacer';

const meta: Meta<typeof Spacer> = {
  title: 'Layout/Spacer',
  component: Spacer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible spacing component for creating consistent gaps between elements. Supports fixed sizes from xs to xl and custom dimensions.',
      },
    },
  },
  tags: ['autodocs', 'component:Spacer'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Predefined spacing size',
    },
    direction: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical', 'both'],
      description: 'Direction of spacing',
    },
    flex: {
      control: { type: 'boolean' },
      description: 'Whether the spacer should flex to fill available space',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const DemoBox = ({ children }: { children: React.ReactNode }) => (
  <Paper sx={{ p: 2, bgcolor: 'primary.100', textAlign: 'center' }}>
    <Typography variant="body2">{children}</Typography>
  </Paper>
);

export const Default: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <DemoBox>Element 1</DemoBox>
      <Spacer />
      <DemoBox>Element 2</DemoBox>
    </Box>
  ),
};

export const SizeVariations: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" gutterBottom>
        Spacer Sizes
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <DemoBox>XS</DemoBox>
        <Spacer size="xs" />
        <DemoBox>Extra Small</DemoBox>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <DemoBox>SM</DemoBox>
        <Spacer size="sm" />
        <DemoBox>Small</DemoBox>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <DemoBox>MD</DemoBox>
        <Spacer size="md" />
        <DemoBox>Medium (Default)</DemoBox>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <DemoBox>LG</DemoBox>
        <Spacer size="lg" />
        <DemoBox>Large</DemoBox>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <DemoBox>XL</DemoBox>
        <Spacer size="xl" />
        <DemoBox>Extra Large</DemoBox>
      </Box>
    </Box>
  ),
};

export const DirectionalSpacing: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Horizontal Spacing
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'grey.100', p: 2 }}>
          <DemoBox>Left</DemoBox>
          <Spacer size="lg" direction="horizontal" />
          <DemoBox>Right</DemoBox>
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Vertical Spacing
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'grey.100',
            p: 2,
          }}
        >
          <DemoBox>Top</DemoBox>
          <Spacer size="lg" direction="vertical" />
          <DemoBox>Bottom</DemoBox>
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Both Directions (Default)
        </Typography>
        <Box sx={{ display: 'inline-block', bgcolor: 'grey.100', p: 2 }}>
          <DemoBox>Element</DemoBox>
          <Spacer size="lg" direction="both" />
          <Typography variant="caption">(Creates space in both directions)</Typography>
        </Box>
      </Box>
    </Box>
  ),
};

export const FlexibleSpacer: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Fixed Spacer
        </Typography>
        <Box sx={{ display: 'flex', bgcolor: 'grey.100', p: 2, width: 400 }}>
          <DemoBox>Start</DemoBox>
          <Spacer size="md" />
          <DemoBox>End</DemoBox>
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Flexible Spacer (fills available space)
        </Typography>
        <Box sx={{ display: 'flex', bgcolor: 'grey.100', p: 2, width: 400 }}>
          <DemoBox>Start</DemoBox>
          <Spacer flex />
          <DemoBox>End</DemoBox>
        </Box>
      </Box>
    </Box>
  ),
};

export const CustomDimensions: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Custom Width
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'grey.100', p: 2 }}>
          <DemoBox>Left</DemoBox>
          <Spacer width={100} />
          <DemoBox>100px apart</DemoBox>
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Custom Height
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'grey.100',
            p: 2,
          }}
        >
          <DemoBox>Top</DemoBox>
          <Spacer height={50} />
          <DemoBox>50px apart</DemoBox>
        </Box>
      </Box>
    </Box>
  ),
};

export const PracticalExample: Story = {
  render: () => (
    <Paper sx={{ p: 3, maxWidth: 400 }}>
      <Typography variant="h5">Form Layout</Typography>
      <Spacer size="md" />

      <Typography variant="body2" color="text.secondary">
        Name
      </Typography>
      <Box sx={{ border: 1, borderColor: 'grey.300', p: 1, borderRadius: 1 }}>
        <Typography variant="body1">John Doe</Typography>
      </Box>

      <Spacer size="sm" />

      <Typography variant="body2" color="text.secondary">
        Email
      </Typography>
      <Box sx={{ border: 1, borderColor: 'grey.300', p: 1, borderRadius: 1 }}>
        <Typography variant="body1">john@example.com</Typography>
      </Box>

      <Spacer size="lg" />

      <Box sx={{ display: 'flex' }}>
        <Box sx={{ bgcolor: 'grey.300', px: 2, py: 1, borderRadius: 1 }}>
          <Typography>Cancel</Typography>
        </Box>
        <Spacer size="sm" direction="horizontal" />
        <Box sx={{ bgcolor: 'primary.main', color: 'white', px: 2, py: 1, borderRadius: 1 }}>
          <Typography>Save</Typography>
        </Box>
      </Box>
    </Paper>
  ),
};

export const InLayoutComposition: Story = {
  render: () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: 600,
      }}
    >
      <Typography variant="h4">Navigation Bar</Typography>
      <Spacer size="md" />

      <Box
        sx={{
          display: 'flex',
          width: '100%',
          bgcolor: 'primary.main',
          color: 'white',
          p: 2,
          borderRadius: 1,
        }}
      >
        <Typography variant="h6">Logo</Typography>
        <Spacer flex />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Typography>Home</Typography>
          <Typography>About</Typography>
          <Typography>Contact</Typography>
        </Box>
      </Box>

      <Spacer size="xl" />

      <Typography variant="body1" paragraph align="center">
        The Spacer component is essential for creating consistent spacing in layouts. It can be used
        with fixed sizes or flex to fill available space.
      </Typography>
    </Box>
  ),
};

// Required test story exports
export const AllVariants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
      <Typography variant="h6">All Spacer Variants</Typography>

      <Box>
        <Typography variant="subtitle2">Direction: horizontal</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'grey.100', p: 1 }}>
          <DemoBox>Left</DemoBox>
          <Spacer direction="horizontal" size="md" />
          <DemoBox>Right</DemoBox>
        </Box>
      </Box>

      <Box>
        <Typography variant="subtitle2">Direction: vertical</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'grey.100',
            p: 1,
          }}
        >
          <DemoBox>Top</DemoBox>
          <Spacer direction="vertical" size="md" />
          <DemoBox>Bottom</DemoBox>
        </Box>
      </Box>

      <Box>
        <Typography variant="subtitle2">Direction: both</Typography>
        <Box sx={{ display: 'inline-block', bgcolor: 'grey.100', p: 1 }}>
          <DemoBox>Element</DemoBox>
          <Spacer direction="both" size="md" />
          <Typography variant="caption">(Space in both directions)</Typography>
        </Box>
      </Box>

      <Box>
        <Typography variant="subtitle2">Flex spacer</Typography>
        <Box sx={{ display: 'flex', bgcolor: 'grey.100', p: 1, width: 300 }}>
          <DemoBox>Start</DemoBox>
          <Spacer flex />
          <DemoBox>End</DemoBox>
        </Box>
      </Box>
    </Box>
  ),
  parameters: {
    docs: { disable: true },
  },
};

export const AllSizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 2 }}>
      <Typography variant="h6">All Size Variants</Typography>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Box key={size} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="caption" sx={{ width: 30 }}>
            {size}:
          </Typography>
          <DemoBox>A</DemoBox>
          <Spacer size={size} direction="horizontal" />
          <DemoBox>B</DemoBox>
        </Box>
      ))}
    </Box>
  ),
  parameters: {
    docs: { disable: true },
  },
};

export const AllStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
      <Typography variant="h6">All States</Typography>

      <Box>
        <Typography variant="subtitle2">Default state</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <DemoBox>Normal</DemoBox>
          <Spacer size="md" />
          <DemoBox>Spacing</DemoBox>
        </Box>
      </Box>

      <Box>
        <Typography variant="subtitle2">With custom width</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <DemoBox>Custom</DemoBox>
          <Spacer width={80} />
          <DemoBox>Width</DemoBox>
        </Box>
      </Box>

      <Box>
        <Typography variant="subtitle2">With custom height</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <DemoBox>Custom</DemoBox>
          <Spacer height={60} />
          <DemoBox>Height</DemoBox>
        </Box>
      </Box>

      <Box>
        <Typography variant="subtitle2">Flexible spacer</Typography>
        <Box sx={{ display: 'flex', width: 300, bgcolor: 'grey.100', p: 1 }}>
          <DemoBox>Flex</DemoBox>
          <Spacer flex />
          <DemoBox>Space</DemoBox>
        </Box>
      </Box>
    </Box>
  ),
  parameters: {
    docs: { disable: true },
  },
};

export const InteractiveStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
      <Typography variant="h6">Interactive States</Typography>
      <Typography variant="body2" color="text.secondary">
        Note: Spacer is a non-interactive component with pointer-events: none
      </Typography>

      <Box>
        <Typography variant="subtitle2">Non-interactive (default)</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'grey.100', p: 1 }}>
          <DemoBox>Cannot</DemoBox>
          <Spacer size="lg" />
          <DemoBox>Interact</DemoBox>
        </Box>
      </Box>

      <Box>
        <Typography variant="subtitle2">Hidden from screen readers</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <DemoBox>Accessible</DemoBox>
          <Spacer size="md" />
          <DemoBox>Layout</DemoBox>
        </Box>
        <Typography variant="caption" color="text.secondary">
          (Spacer has aria-hidden="true")
        </Typography>
      </Box>
    </Box>
  ),
  parameters: {
    docs: { disable: true },
  },
};

export const Responsive: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
      <Typography variant="h6">Responsive Behavior</Typography>

      <Box>
        <Typography variant="subtitle2">Responsive layout with flexible spacer</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            bgcolor: 'grey.100',
            p: 2,
            gap: { xs: 1, sm: 0 },
          }}
        >
          <DemoBox>Responsive</DemoBox>
          <Spacer flex />
          <DemoBox>Layout</DemoBox>
        </Box>
      </Box>

      <Box>
        <Typography variant="subtitle2">Different sizes on different screens</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <DemoBox>Mobile/Desktop</DemoBox>
          <Spacer size="sm" />
          <DemoBox>Spacing</DemoBox>
        </Box>
        <Typography variant="caption" color="text.secondary">
          (Use responsive props or CSS for different screen sizes)
        </Typography>
      </Box>

      <Box>
        <Typography variant="subtitle2">Custom responsive dimensions</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <DemoBox>Top</DemoBox>
          <Spacer height={{ xs: 20, sm: 40, md: 60 }} />
          <DemoBox>Bottom</DemoBox>
        </Box>
      </Box>
    </Box>
  ),
  parameters: {
    docs: { disable: true },
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1024px', height: '768px' } },
      },
      defaultViewport: 'desktop',
    },
  },
};

export const DensityModes: Story = {
  render: () => {

    return (
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'flex-start' }}>
        <DensityProvider defaultMode="compact">
          <Box>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Compact (0.8x)
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: 'grey.100', p: 1 }}>
              <DemoBox>Top</DemoBox>
              <Spacer size="md" />
              <DemoBox>Bottom</DemoBox>
            </Box>
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="normal">
          <Box>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Normal (1.0x)
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: 'grey.100', p: 1 }}>
              <DemoBox>Top</DemoBox>
              <Spacer size="md" />
              <DemoBox>Bottom</DemoBox>
            </Box>
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="spacious">
          <Box>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Spacious (1.25x)
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: 'grey.100', p: 1 }}>
              <DemoBox>Top</DemoBox>
              <Spacer size="md" />
              <DemoBox>Bottom</DemoBox>
            </Box>
          </Box>
        </DensityProvider>
      </Box>
    );
  },
};
