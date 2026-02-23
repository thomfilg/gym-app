import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ExpandMore, Help,Info, Security, Settings } from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DensityProvider } from '../../../utils/density';
import { useState } from 'react';

import { Accordion, AccordionActions,AccordionDetails, AccordionSummary } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Layout/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs', 'component:Accordion'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'glass', 'bordered', 'separated'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    defaultExpanded: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    disabled: false,
    defaultExpanded: false,
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h6">Basic Accordion</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          This is the content of the accordion. It can contain any React elements, including text,
          forms, images, or other components.
        </Typography>
      </AccordionDetails>
    </Accordion>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Default Variant
        </Typography>
        <Accordion variant="default">
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Default Accordion</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              The default variant follows Material-UI&apos;s standard accordion styling.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Glass Variant
        </Typography>
        <Accordion variant="glass">
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Glass Accordion</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              The glass variant features a frosted glass effect with backdrop blur and transparency.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Bordered Variant
        </Typography>
        <Accordion variant="bordered">
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Bordered Accordion</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>The bordered variant has clean borders and rounded corners.</Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Separated Variant
        </Typography>
        <Accordion variant="separated">
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Separated Accordion</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              The separated variant has elevated shadows and spacing between items.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Stack>
  ),
};

export const MultipleAccordions: Story = {
  render: () => (
    <Stack spacing={1}>
      <Accordion variant="bordered">
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Settings sx={{ mr: 2 }} />
          <Typography>General Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography gutterBottom>
            Configure general application settings including language, timezone, and theme
            preferences.
          </Typography>
        </AccordionDetails>
        <AccordionActions>
          <Button size="small">Reset</Button>
          <Button size="small" variant="contained">
            Save
          </Button>
        </AccordionActions>
      </Accordion>

      <Accordion variant="bordered">
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Security sx={{ mr: 2 }} />
          <Typography>Security Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography gutterBottom>
            Manage your security preferences including two-factor authentication, password
            requirements, and login alerts.
          </Typography>
        </AccordionDetails>
        <AccordionActions>
          <Button size="small" color="error">
            Disable
          </Button>
          <Button size="small" variant="contained">
            Update
          </Button>
        </AccordionActions>
      </Accordion>

      <Accordion variant="bordered">
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Info sx={{ mr: 2 }} />
          <Typography>Notification Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography gutterBottom>
            Control how and when you receive notifications from the application.
          </Typography>
        </AccordionDetails>
        <AccordionActions>
          <Button size="small">Test</Button>
          <Button size="small" variant="contained">
            Apply
          </Button>
        </AccordionActions>
      </Accordion>
    </Stack>
  ),
};

const ControlledAccordionComponent = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Stack spacing={1}>
      <Accordion
        variant="separated"
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Controlled Panel 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            This accordion is controlled - only one panel can be open at a time.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        variant="separated"
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Controlled Panel 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Opening this panel will close the other one automatically.</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        variant="separated"
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Controlled Panel 3</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            This demonstrates controlled accordion behavior with state management.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};

export const ControlledAccordion: Story = {
  render: () => <ControlledAccordionComponent />,
};

export const ComplexContent: Story = {
  render: () => (
    <Accordion variant="glass" defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h6">Project Dashboard</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={2}>
          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Progress
              </Typography>
              <Box
                sx={{
                  height: 8,
                  backgroundColor: 'grey.200',
                  borderRadius: 1,
                  position: 'relative',
                }}
              >
                <Box
                  sx={{
                    width: '75%',
                    height: '100%',
                    backgroundColor: 'primary.main',
                    borderRadius: 1,
                  }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary" mt={1}>
                75% Complete
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Team Members
              </Typography>
              <Stack direction="row" spacing={1}>
                {['A', 'B', 'C', 'D'].map((letter) => (
                  <Box
                    key={letter}
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      backgroundColor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '0.875rem',
                    }}
                  >
                    {letter}
                  </Box>
                ))}
              </Stack>
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary">
            This accordion contains complex content including progress indicators, team member
            avatars, and structured layouts.
          </Typography>
        </Stack>
      </AccordionDetails>
      <AccordionActions>
        <Button startIcon={<Help />} size="small">
          Help
        </Button>
        <Button variant="contained" size="small">
          View Details
        </Button>
      </AccordionActions>
    </Accordion>
  ),
};

export const DisabledAccordion: Story = {
  render: () => (
    <Stack spacing={2}>
      <Accordion disabled>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Disabled Accordion</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            This content cannot be accessed because the accordion is disabled.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion variant="glass">
        <AccordionSummary expandIcon={<ExpandMore />} disabled>
          <Typography>Disabled Summary Only</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Only the summary is disabled, but if opened programmatically, the content would be
            accessible.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Stack>
  ),
};

export const HoverState: Story = {
  render: () => (
    <Stack spacing={2}>
      <Typography variant="body2" color="text.secondary">
        Hover over the accordions to see the hover effects for each variant
      </Typography>
      <Accordion variant="default">
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Default Hover Effect</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Standard Material-UI hover state</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion variant="glass">
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Glass Hover Effect</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Enhanced glass effect with elevation on hover</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion variant="bordered">
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Bordered Hover Effect</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Border color and shadow transition on hover</Typography>
        </AccordionDetails>
      </Accordion>
    </Stack>
  ),
};

export const EmptyState: Story = {
  render: () => (
    <Stack spacing={2}>
      <Accordion variant="bordered">
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Empty Content Accordion</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* Intentionally empty to test empty state handling */}
        </AccordionDetails>
      </Accordion>

      <Accordion variant="glass">
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Minimal Content</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{ minHeight: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Typography variant="caption" color="text.secondary">
              No data available
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Stack>
  ),
};

export const LoadingState: Story = {
  render: () => {
    const LoadingComponent = () => {
      const [loading, setLoading] = useState(true);

      return (
        <Stack spacing={2}>
          <Button onClick={() => setLoading(!loading)} variant="outlined" size="small">
            Toggle Loading State
          </Button>

          <Accordion variant="separated" defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>Dynamic Content Accordion</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {loading ? (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Loading content...
                  </Typography>
                </Box>
              ) : (
                <Typography>Content has been loaded successfully!</Typography>
              )}
            </AccordionDetails>
          </Accordion>
        </Stack>
      );
    };

    return <LoadingComponent />;
  },
};

// Required story exports for validation
export const AllSizes: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Small Size
        </Typography>
        <Accordion sx={{ '& .MuiAccordionSummary-root': { minHeight: 40 } }}>
          <AccordionSummary expandIcon={<ExpandMore sx={{ fontSize: '1rem' }} />}>
            <Typography variant="body2">Small Accordion</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">Compact content for small size accordion.</Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Medium Size (Default)
        </Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Medium Accordion</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Standard content for medium size accordion.</Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Large Size
        </Typography>
        <Accordion sx={{ '& .MuiAccordionSummary-root': { minHeight: 64 } }}>
          <AccordionSummary expandIcon={<ExpandMore sx={{ fontSize: '1.5rem' }} />}>
            <Typography variant="h6">Large Accordion</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              Extended content area for large size accordion with more space.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Stack>
  ),
};

export const AllStates: Story = {
  render: () => (
    <Stack spacing={2}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Default State</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Normal accordion in default state.</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Expanded State</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>This accordion is expanded by default.</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion disabled>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Disabled State</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>This accordion is disabled.</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ '&:hover': { backgroundColor: 'action.hover' } }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Hover State (hover to see)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Hover over the summary to see the hover effect.</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ '&:focus-within': { outline: '2px solid', outlineColor: 'primary.main' } }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Focus State (tab to focus)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Tab navigation will show focus outline.</Typography>
        </AccordionDetails>
      </Accordion>
    </Stack>
  ),
};

export const InteractiveStates: Story = {
  render: () => {
    const InteractiveComponent = () => {
      const [expanded, setExpanded] = useState<string | false>('panel1');
      const [clickCount, setClickCount] = useState(0);

      const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
          setExpanded(isExpanded ? panel : false);
          setClickCount(clickCount + 1);
        };

      return (
        <Stack spacing={2}>
          <Typography variant="body2" color="text.secondary">
            Click count: {clickCount} | Currently expanded: {expanded || 'none'}
          </Typography>

          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>Interactive Panel 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Click to toggle expansion state.</Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>Interactive Panel 2</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Only one panel can be expanded at a time.</Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>Interactive Panel 3</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>State is tracked and displayed above.</Typography>
            </AccordionDetails>
          </Accordion>
        </Stack>
      );
    };

    return <InteractiveComponent />;
  },
};

export const Responsive: Story = {
  render: () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Responsive Accordion (resize window to test)
      </Typography>
      <Stack spacing={2}>
        <Accordion
          sx={{
            width: '100%',
            maxWidth: { xs: '100%', sm: 600, md: 800 },
            mx: 'auto',
          }}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography sx={{ fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' } }}>
              Responsive Typography
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' } }}>
              This accordion adapts to different screen sizes. On mobile it uses smaller text, on
              tablet medium text, and on desktop larger text.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          sx={{
            display: { xs: 'block', md: 'flex' },
            flexDirection: { md: 'column' },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            sx={{
              flexDirection: { xs: 'row', md: 'row-reverse' },
              '& .MuiAccordionSummary-expandIconWrapper': {
                transform: { xs: 'none', md: 'rotate(90deg)' },
              },
            }}
          >
            <Typography>Layout Changes</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
                gap: 2,
              }}
            >
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant="caption">Item 1</Typography>
              </Box>
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant="caption">Item 2</Typography>
              </Box>
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant="caption">Item 3</Typography>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion
          variant="glass"
          sx={{
            backdropFilter: { xs: 'blur(8px)', md: 'blur(12px)' },
            backgroundColor: { xs: 'rgba(255,255,255,0.7)', md: 'rgba(255,255,255,0.9)' },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Responsive Styling</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Glass effect intensity changes based on screen size for optimal performance.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Box>
  ),
};

export const DensityModes: Story = {
  render: () => {

    return (
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'flex-start' }}>
        <DensityProvider defaultMode="compact">
          <Box sx={{ width: 280 }}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Compact (0.8x)
            </Typography>
            <Accordion variant="bordered" defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="body2">Compact Accordion</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">Tighter spacing for dense layouts.</Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="normal">
          <Box sx={{ width: 280 }}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Normal (1.0x)
            </Typography>
            <Accordion variant="bordered" defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="body2">Normal Accordion</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">Standard spacing for regular use.</Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="spacious">
          <Box sx={{ width: 280 }}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Spacious (1.25x)
            </Typography>
            <Accordion variant="bordered" defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="body2">Spacious Accordion</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">Extra breathing room for accessibility.</Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </DensityProvider>
      </Box>
    );
  },
};
