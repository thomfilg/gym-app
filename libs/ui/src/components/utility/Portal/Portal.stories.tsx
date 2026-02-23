import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Portal } from './Portal';

const meta: Meta<typeof Portal> = {
  title: 'Utility/Portal',
  component: Portal,
  tags: ['autodocs', 'component:Portal'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Portal component for rendering content outside the normal DOM hierarchy, useful for modals, tooltips, and overlays.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Portal>;

const BasicComponent = () => {
  const [showPortal, setShowPortal] = useState(false);

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Component Container
        </Typography>
        <Typography paragraph>This content is in the normal DOM hierarchy.</Typography>
        <Button variant="contained" onClick={() => setShowPortal(!showPortal)}>
          {showPortal ? 'Hide' : 'Show'} Portal Content
        </Button>
      </Paper>

      {showPortal && (
        <Portal>
          <Box
            sx={{
              position: 'fixed',
              top: 16,
              right: 16,
              zIndex: 9999,
              maxWidth: 300,
            }}
          >
            <Alert severity="info" onClose={() => setShowPortal(false)}>
              <Typography variant="subtitle2">Portal Content</Typography>
              This content is rendered outside the normal DOM hierarchy using a Portal. It&apos;s
              positioned fixed at the top-right corner.
            </Alert>
          </Box>
        </Portal>
      )}
    </Box>
  );
};

export const Basic: Story = {
  render: () => <BasicComponent />,
};

const CustomContainerComponent = () => {
  const [customContainer, setCustomContainer] = useState<HTMLElement | null>(null);
  const [showPortal, setShowPortal] = useState(false);

  return (
    <Box sx={{ display: 'flex', gap: 3 }}>
      <Paper sx={{ p: 3, flex: 1 }}>
        <Typography variant="h6" gutterBottom>
          Source Container
        </Typography>
        <Typography paragraph>This is where the Portal component is defined.</Typography>
        <Button
          variant="contained"
          onClick={() => setShowPortal(!showPortal)}
          disabled={!customContainer}
        >
          {showPortal ? 'Hide' : 'Show'} Portal
        </Button>
      </Paper>

      <Paper
        sx={{ p: 3, flex: 1, bgcolor: 'primary.light', position: 'relative' }}
        ref={(el) => setCustomContainer(el)}
      >
        <Typography variant="h6" gutterBottom color="primary.contrastText">
          Target Container
        </Typography>
        <Typography paragraph color="primary.contrastText">
          Portal content will appear here even though it&apos;s defined elsewhere.
        </Typography>

        {showPortal && customContainer && (
          <Portal container={customContainer}>
            <Box
              sx={{
                position: 'absolute',
                bottom: 16,
                right: 16,
                maxWidth: 200,
              }}
            >
              <Alert severity="success">
                <Typography variant="body2">Portaled into custom container!</Typography>
              </Alert>
            </Box>
          </Portal>
        )}
      </Paper>
    </Box>
  );
};

export const CustomContainer: Story = {
  render: () => <CustomContainerComponent />,
};

const DisabledPortalComponent = () => {
  const [disablePortal, setDisablePortal] = useState(false);

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 2, position: 'relative' }}>
        <Typography variant="h6" gutterBottom>
          Portal Behavior Test
        </Typography>
        <Typography paragraph>Toggle between portal and normal rendering.</Typography>

        <Box sx={{ mb: 2 }}>
          <Button
            variant={disablePortal ? 'contained' : 'outlined'}
            onClick={() => setDisablePortal(!disablePortal)}
          >
            {disablePortal ? 'Enable' : 'Disable'} Portal
          </Button>
        </Box>

        <Portal disablePortal={disablePortal}>
          <Box
            sx={{
              position: disablePortal ? 'static' : 'fixed',
              top: disablePortal ? 'auto' : 100,
              left: disablePortal ? 'auto' : '50%',
              transform: disablePortal ? 'none' : 'translateX(-50%)',
              zIndex: disablePortal ? 'auto' : 9999,
              maxWidth: 300,
            }}
          >
            <Alert severity={disablePortal ? 'warning' : 'info'}>
              <Typography variant="subtitle2">
                {disablePortal ? 'Normal Rendering' : 'Portal Rendering'}
              </Typography>
              {disablePortal
                ? 'This content is rendered in the normal DOM hierarchy.'
                : 'This content is portaled to document.body.'}
            </Alert>
          </Box>
        </Portal>
      </Paper>
    </Box>
  );
};

export const DisabledPortal: Story = {
  render: () => <DisabledPortalComponent />,
};

const MultiplePortalsComponent = () => {
  const [activePortals, setActivePortals] = useState<Set<number>>(new Set());

  const togglePortal = (id: number) => {
    setActivePortals((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const portalConfigs = [
    { id: 1, position: { top: 20, left: 20 }, color: 'error' },
    { id: 2, position: { top: 20, right: 20 }, color: 'warning' },
    { id: 3, position: { bottom: 20, left: 20 }, color: 'success' },
    { id: 4, position: { bottom: 20, right: 20 }, color: 'info' },
  ];

  return (
    <Box>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Multiple Portal Demo
        </Typography>
        <Typography paragraph>Create multiple portals in different screen positions.</Typography>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {portalConfigs.map(({ id, color }) => (
            <Button
              key={id}
              variant={activePortals.has(id) ? 'contained' : 'outlined'}
              color={color as 'error' | 'warning' | 'success' | 'info'}
              size="small"
              onClick={() => togglePortal(id)}
            >
              Portal {id}
            </Button>
          ))}
        </Box>
      </Paper>

      {portalConfigs.map(
        ({ id, position, color }) =>
          activePortals.has(id) && (
            <Portal key={id}>
              <Box
                sx={{
                  position: 'fixed',
                  ...position,
                  zIndex: 9999,
                  maxWidth: 250,
                }}
              >
                <Alert
                  severity={color as 'error' | 'warning' | 'success' | 'info'}
                  onClose={() => togglePortal(id)}
                >
                  <Typography variant="subtitle2">Portal {id}</Typography>
                  This is portal content positioned at{' '}
                  {Object.entries(position)
                    .map(([key, value]) => `${key}: ${value}px`)
                    .join(', ')}
                </Alert>
              </Box>
            </Portal>
          ),
      )}
    </Box>
  );
};

export const MultiplePortals: Story = {
  render: () => <MultiplePortalsComponent />,
};

// Required story exports for validation
export const Default: Story = {
  render: () => <BasicComponent />,
};

export const AllVariants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <BasicComponent />
      <CustomContainerComponent />
      <DisabledPortalComponent />
    </Box>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Portal Size Variations
      </Typography>
      <Typography paragraph>
        Portal component doesn't have inherent sizes - it renders children as-is. Size is determined
        by the children content.
      </Typography>
      <BasicComponent />
    </Box>
  ),
};

export const AllStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <DisabledPortalComponent />
      <BasicComponent />
    </Box>
  ),
};

export const InteractiveStates: Story = {
  render: () => <MultiplePortalsComponent />,
};

const ResponsivePortalComponent = () => {
  const [showPortal, setShowPortal] = useState(false);

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Responsive Portal Demo
        </Typography>
        <Typography paragraph>Portal content adapts to different screen sizes.</Typography>
        <Button variant="contained" onClick={() => setShowPortal(!showPortal)}>
          {showPortal ? 'Hide' : 'Show'} Responsive Portal
        </Button>
      </Paper>

      {showPortal && (
        <Portal>
          <Box
            sx={{
              position: 'fixed',
              top: { xs: 16, sm: 32, md: 48 },
              right: { xs: 16, sm: 32, md: 48 },
              left: { xs: 16, sm: 'auto' },
              zIndex: 9999,
              maxWidth: { xs: 'calc(100% - 32px)', sm: 400, md: 500 },
            }}
          >
            <Alert severity="info" onClose={() => setShowPortal(false)}>
              <Typography variant="subtitle2">Responsive Portal</Typography>
              <Typography variant="body2">This portal adapts to different screen sizes:</Typography>
              <Typography variant="caption" component="ul" sx={{ mt: 1, pl: 2 }}>
                <li>Mobile: Full width with 16px margins</li>
                <li>Tablet: 400px max width, 32px positioning</li>
                <li>Desktop: 500px max width, 48px positioning</li>
              </Typography>
            </Alert>
          </Box>
        </Portal>
      )}
    </Box>
  );
};

export const Responsive: Story = {
  render: () => <ResponsivePortalComponent />,
};
