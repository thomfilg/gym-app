import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Close as CloseIcon } from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DensityProvider } from '../../../utils/density';
import { useState } from 'react';

import { Modal, ModalContent } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Feedback/Modal',
  component: Modal,
  tags: ['autodocs', 'component:Modal'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible modal component with beautiful animations and glass morphism effects.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['center', 'top', 'bottom', 'glass'],
      description: 'Position and style variant of the modal',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the modal',
    },
    glass: {
      control: 'boolean',
      description: 'Enable glass morphism effect',
    },
    gradient: {
      control: 'boolean',
      description: 'Enable gradient background',
    },
    glow: {
      control: 'boolean',
      description: 'Enable glow effect',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

interface ModalWrapperProps {
  children: React.ReactNode;
  [key: string]: unknown;
}

const ModalWrapper = ({ children, ...args }: ModalWrapperProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal {...args} open={open} onClose={() => setOpen(false)}>
        {children}
      </Modal>
    </Box>
  );
};

// Default story - minimal props
export const Default: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <ModalContent>
        <Typography variant="h6" gutterBottom>
          Default Modal
        </Typography>
        <Typography paragraph>
          This is a default modal with minimal props.
        </Typography>
        <Button variant="contained">Close</Button>
      </ModalContent>
    </ModalWrapper>
  ),
  args: {
    variant: 'center',
    size: 'md',
  },
};

export const Center: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <ModalContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            Center Modal
          </Typography>
          <IconButton onClick={() => { /** do nothing */}}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography paragraph>
          This modal appears in the center of the screen with a smooth fade animation.
          Perfect for confirmations, forms, or any content that needs focus.
        </Typography>
        <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button>Cancel</Button>
          <Button variant="contained">Confirm</Button>
        </Box>
      </ModalContent>
    </ModalWrapper>
  ),
  args: {
    variant: 'center',
    size: 'md',
  },
};

export const TopSlide: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <ModalContent>
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Typography variant="h6" gutterBottom>
            Top Slide Modal
          </Typography>
          <Typography paragraph>
            This modal slides down from the top, creating an elegant entrance animation.
            Great for notifications or announcements.
          </Typography>
          <Button variant="contained">
            Got it
          </Button>
        </Box>
      </ModalContent>
    </ModalWrapper>
  ),
  args: {
    variant: 'top',
    size: 'sm',
  },
};

export const BottomSlide: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <ModalContent>
        <Box sx={{ py: 2 }}>
          <Typography variant="h6" gutterBottom>
            Bottom Slide Modal
          </Typography>
          <Typography paragraph>
            This modal slides up from the bottom, similar to mobile app sheets.
            Ideal for mobile-first designs and quick actions.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button fullWidth>Cancel</Button>
            <Button variant="contained" fullWidth>Continue</Button>
          </Box>
        </Box>
      </ModalContent>
    </ModalWrapper>
  ),
  args: {
    variant: 'bottom',
    size: 'md',
  },
};

export const GlassEffect: Story = {
  render: (args) => (
    <Box sx={{
      minHeight: '400px',
      background: 'linear-gradient(45deg, #1976d2 30%, #21cbf3 90%)',
      p: 4,
      borderRadius: 2,
    }}>
      <ModalWrapper {...args}>
        <ModalContent padding={4}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            Glass Morphism Modal
          </Typography>
          <Typography paragraph sx={{ opacity: 0.9 }}>
            Experience the beauty of glass morphism with backdrop blur effects
            and translucent surfaces. This creates depth and modern aesthetics.
          </Typography>
          <Box sx={{
            p: 2,
            bgcolor: 'rgba(255,255,255,0.1)',
            borderRadius: 1,
            backdropFilter: 'blur(10px)',
            mb: 3,
          }}>
            <Typography variant="body2">
              Even nested glass elements work perfectly with proper layering.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button sx={{ backdropFilter: 'blur(10px)', bgcolor: 'rgba(255,255,255,0.2)' }}>
              Cancel
            </Button>
            <Button variant="contained">
              Continue
            </Button>
          </Box>
        </ModalContent>
      </ModalWrapper>
    </Box>
  ),
  args: {
    variant: 'glass',
    size: 'lg',
    glow: true,
  },
};

export const GradientGlow: Story = {
  render: (args) => (
    <Box sx={{ bgcolor: 'grey.900', p: 4, borderRadius: 2 }}>
      <ModalWrapper {...args}>
        <ModalContent padding={4}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            Premium Feature
          </Typography>
          <Typography paragraph>
            This modal showcases gradient backgrounds with glow effects,
            perfect for premium features, upgrades, or special announcements.
          </Typography>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            p: 2,
            bgcolor: 'rgba(255,255,255,0.05)',
            borderRadius: 1,
            mb: 3,
          }}>
            <Typography variant="h6">✨</Typography>
            <Typography>
              Unlock advanced features with Pro
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button>Maybe Later</Button>
            <Button variant="contained" sx={{
              background: 'linear-gradient(45deg, #ff6b6b, #ffd93d)',
              '&:hover': {
                background: 'linear-gradient(45deg, #ff5252, #ffcc02)',
              }
            }}>
              Upgrade Now
            </Button>
          </Box>
        </ModalContent>
      </ModalWrapper>
    </Box>
  ),
  args: {
    variant: 'center',
    gradient: true,
    glow: true,
    size: 'md',
  },
};

const ResponsiveSizesComponent = () => {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      {sizes.map(size => (
        <Box key={size}>
          <Button
            variant="outlined"
            onClick={() => setOpenStates(prev => ({ ...prev, [size]: true }))}
          >
            {size.toUpperCase()}
          </Button>
          <Modal
            open={openStates[size] || false}
            onClose={() => setOpenStates(prev => ({ ...prev, [size]: false }))}
            variant="center"
            size={size}
            glass={true}
          >
            <ModalContent>
              <Typography variant="h6" gutterBottom>
                  Size: {size.toUpperCase()}
              </Typography>
              <Typography>
                  This demonstrates the {size} size modal with responsive behavior
                  and glass morphism effects.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button
                  onClick={() => setOpenStates(prev => ({ ...prev, [size]: false }))}
                  fullWidth
                  variant="contained"
                >
                    Close
                </Button>
              </Box>
            </ModalContent>
          </Modal>
        </Box>
      ))}
    </Box>
  );
};

export const ResponsiveSizes: Story = {
  render: () => <ResponsiveSizesComponent />,
};

// AllSizes story - showing all size variations
const AllSizesComponent = () => {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      {sizes.map(size => (
        <Box key={size}>
          <Button
            variant="outlined"
            onClick={() => setOpenStates(prev => ({ ...prev, [size]: true }))}
          >
            Size: {size.toUpperCase()}
          </Button>
          <Modal
            open={openStates[size] || false}
            onClose={() => setOpenStates(prev => ({ ...prev, [size]: false }))}
            variant="center"
            size={size}
          >
            <ModalContent>
              <Typography variant="h6" gutterBottom>
                Size: {size.toUpperCase()}
              </Typography>
              <Typography>
                This modal demonstrates the {size} size.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button
                  onClick={() => setOpenStates(prev => ({ ...prev, [size]: false }))}
                  fullWidth
                  variant="contained"
                >
                  Close
                </Button>
              </Box>
            </ModalContent>
          </Modal>
        </Box>
      ))}
    </Box>
  );
};

export const AllSizes: Story = {
  render: () => <AllSizesComponent />,
};

// AllStates story - showing all modal states
const AllStatesComponent = () => {
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});
  const states = [
    { name: 'normal', props: {} },
    { name: 'glass', props: { glass: true } },
    { name: 'gradient', props: { gradient: true } },
    { name: 'glow', props: { glow: true } },
    { name: 'persistent', props: { persistent: true } },
  ];

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      {states.map(state => (
        <Box key={state.name}>
          <Button
            variant="contained"
            onClick={() => setOpenStates(prev => ({ ...prev, [state.name]: true }))}
          >
            {state.name.charAt(0).toUpperCase() + state.name.slice(1)} State
          </Button>
          <Modal
            open={openStates[state.name] || false}
            onClose={() => setOpenStates(prev => ({ ...prev, [state.name]: false }))}
            variant="center"
            size="md"
            {...state.props}
          >
            <ModalContent>
              <Typography variant="h6" gutterBottom>
                {state.name.charAt(0).toUpperCase() + state.name.slice(1)} State
              </Typography>
              <Typography>
                This demonstrates the {state.name} state of the modal.
              </Typography>
              <Button
                onClick={() => setOpenStates(prev => ({ ...prev, [state.name]: false }))}
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
              >
                Close
              </Button>
            </ModalContent>
          </Modal>
        </Box>
      ))}
    </Box>
  );
};

export const AllStates: Story = {
  render: () => <AllStatesComponent />,
};

// InteractiveStates story - showing interactive behaviors
const InteractiveStatesComponent = () => {
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});
  const interactions = [
    { name: 'hover-effects', label: 'Hover Effects', props: { glow: true } },
    { name: 'click-outside', label: 'Click Outside to Close', props: {} },
    { name: 'escape-key', label: 'Escape Key to Close', props: {} },
    { name: 'persistent-no-close', label: 'Persistent (No Close)', props: { persistent: true } },
  ];

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      {interactions.map(interaction => (
        <Box key={interaction.name}>
          <Button
            variant="outlined"
            onClick={() => setOpenStates(prev => ({ ...prev, [interaction.name]: true }))}
          >
            {interaction.label}
          </Button>
          <Modal
            open={openStates[interaction.name] || false}
            onClose={() => setOpenStates(prev => ({ ...prev, [interaction.name]: false }))}
            variant="center"
            size="md"
            {...interaction.props}
          >
            <ModalContent>
              <Typography variant="h6" gutterBottom>
                {interaction.label}
              </Typography>
              <Typography>
                Test the {interaction.label.toLowerCase()} behavior of this modal.
              </Typography>
              <Button
                onClick={() => setOpenStates(prev => ({ ...prev, [interaction.name]: false }))}
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
              >
                Close Modal
              </Button>
            </ModalContent>
          </Modal>
        </Box>
      ))}
    </Box>
  );
};

export const InteractiveStates: Story = {
  render: () => <InteractiveStatesComponent />,
};

// Responsive story - showing responsive behavior
const ResponsiveComponent = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 2 }}>
        This modal adapts to different screen sizes. Try resizing your browser window.
      </Typography>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Responsive Modal
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        variant="center"
        size="lg"
      >
        <ModalContent>
          <Typography variant="h5" gutterBottom>
            Responsive Modal
          </Typography>
          <Typography paragraph>
            This modal is responsive and adapts to different screen sizes.
            On mobile devices, it takes most of the screen width.
            On tablets and desktops, it maintains a comfortable reading width.
          </Typography>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
            gap: 2,
            mb: 3
          }}>
            <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
              <Typography variant="body2">Mobile</Typography>
            </Box>
            <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
              <Typography variant="body2">Tablet</Typography>
            </Box>
            <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
              <Typography variant="body2">Desktop</Typography>
            </Box>
          </Box>
          <Button
            onClick={() => setOpen(false)}
            variant="contained"
            fullWidth
          >
            Close
          </Button>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export const Responsive: Story = {
  render: () => <ResponsiveComponent />,
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '360px', height: '640px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1920px', height: '1080px' } },
      },
    },
  },
};

// Enhanced story for all variants
const AllVariantsComponent = () => {
  const variants = ['center', 'top', 'bottom', 'glass'] as const;
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      {variants.map(variant => (
        <Box key={variant}>
          <Button
            variant="contained"
            color={variant === 'glass' ? 'secondary' : 'primary'}
            onClick={() => setOpenStates(prev => ({ ...prev, [variant]: true }))}
          >
            {variant.charAt(0).toUpperCase() + variant.slice(1)} Modal
          </Button>
          <Modal
            open={openStates[variant] || false}
            onClose={() => setOpenStates(prev => ({ ...prev, [variant]: false }))}
            variant={variant}
            size="md"
            glass={variant === 'glass'}
            glow={variant === 'glass'}
          >
            <ModalContent>
              <Typography variant="h6" gutterBottom>
                {variant.charAt(0).toUpperCase() + variant.slice(1)} Variant
              </Typography>
              <Typography paragraph>
                This demonstrates the {variant} variant with appropriate animations and styling.
              </Typography>
              <Button
                onClick={() => setOpenStates(prev => ({ ...prev, [variant]: false }))}
                variant="contained"
                fullWidth
              >
                Close
              </Button>
            </ModalContent>
          </Modal>
        </Box>
      ))}
    </Box>
  );
};

export const AllVariants: Story = {
  render: () => <AllVariantsComponent />,

};

// Story for testing all border radius options
const BorderRadiusVariationsComponent = () => {
  const borderRadii = ['none', 'sm', 'md', 'lg', 'xl'] as const;
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      {borderRadii.map(radius => (
        <Box key={radius}>
          <Button
            variant="outlined"
            onClick={() => setOpenStates(prev => ({ ...prev, [radius]: true }))}
          >
            {radius.toUpperCase()} Radius
          </Button>
          <Modal
            open={openStates[radius] || false}
            onClose={() => setOpenStates(prev => ({ ...prev, [radius]: false }))}
            variant="center"
            size="sm"
            borderRadius={radius}
            glass={true}
          >
            <ModalContent>
              <Typography variant="h6" gutterBottom>
                Border Radius: {radius.toUpperCase()}
              </Typography>
              <Typography paragraph>
                This modal demonstrates the {radius} border radius setting.
              </Typography>
              <Button
                onClick={() => setOpenStates(prev => ({ ...prev, [radius]: false }))}
                variant="contained"
                fullWidth
              >
                Close
              </Button>
            </ModalContent>
          </Modal>
        </Box>
      ))}
    </Box>
  );
};

export const BorderRadiusVariations: Story = {
  render: () => <BorderRadiusVariationsComponent />,

};

// Story for testing special effects
const SpecialEffectsComponent = () => {
  const effects = [
    { name: 'Pulse', props: { pulse: true } },
    { name: 'Glow', props: { glow: true } },
    { name: 'Gradient', props: { gradient: true } },
    { name: 'Combined', props: { pulse: true, glow: true, gradient: true } },
  ];
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});

  return (
    <Box sx={{
      bgcolor: 'grey.900',
      p: 4,
      borderRadius: 2,
      display: 'flex',
      gap: 2,
      flexWrap: 'wrap'
    }}>
      {effects.map(effect => (
        <Box key={effect.name}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenStates(prev => ({ ...prev, [effect.name]: true }))}
          >
            {effect.name} Effect
          </Button>
          <Modal
            open={openStates[effect.name] || false}
            onClose={() => setOpenStates(prev => ({ ...prev, [effect.name]: false }))}
            variant="center"
            size="md"
            {...effect.props}
          >
            <ModalContent>
              <Typography variant="h6" gutterBottom>
                {effect.name} Effect Modal
              </Typography>
              <Typography paragraph>
                This modal showcases the {effect.name.toLowerCase()} effect.
              </Typography>
              <Button
                onClick={() => setOpenStates(prev => ({ ...prev, [effect.name]: false }))}
                variant="contained"
                fullWidth
              >
                Close
              </Button>
            </ModalContent>
          </Modal>
        </Box>
      ))}
    </Box>
  );
};

export const SpecialEffects: Story = {
  render: () => <SpecialEffectsComponent />,

};

// Story for testing persistent modals
const PersistentModalComponent = () => {
  const [open, setOpen] = useState(false);
  const [forceClose, setForceClose] = useState(false);

  return (
    <Box>
      <Button
        variant="contained"
        color="warning"
        onClick={() => {
          setOpen(true);
          setForceClose(false);
        }}
      >
        Open Persistent Modal
      </Button>
      <Modal
        open={open && !forceClose}
        onClose={() => {
          // This will be ignored due to persistent=true
          // eslint-disable-next-line no-console
          console.log('Close attempted but modal is persistent');
        }}
        variant="center"
        size="sm"
        persistent={true}
        glass={true}
      >
        <ModalContent>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom color="warning.main">
              ⚠️ Persistent Modal
            </Typography>
            <Typography paragraph>
              This modal cannot be closed by clicking the backdrop or pressing Escape.
              You must use the close button.
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Try clicking outside or pressing Escape - it won&apos;t work!
            </Typography>
            <Button
              variant="contained"
              color="error"
              onClick={() => setForceClose(true)}
              fullWidth
            >
              Force Close
            </Button>
          </Box>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export const PersistentModal: Story = {
  render: () => <PersistentModalComponent />,
};

export const DensityModes: Story = {
  render: () => {

    const DensityModalDemo = ({ mode, label }: { mode: string; label: string }) => {
      const [open, setOpen] = useState(false);

      return (
        <DensityProvider defaultMode={mode}>
          <Box sx={{ width: 200 }}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              {label}
            </Typography>
            <Button variant="outlined" size="small" onClick={() => setOpen(true)}>
              Open {mode} Modal
            </Button>
            <Modal open={open} onClose={() => setOpen(false)} size="sm">
              <ModalContent>
                <Typography variant="h6" gutterBottom>
                  {label} Modal
                </Typography>
                <Typography>
                  This modal demonstrates {mode} density spacing.
                </Typography>
                <Button onClick={() => setOpen(false)} variant="contained" sx={{ mt: 2 }}>
                  Close
                </Button>
              </ModalContent>
            </Modal>
          </Box>
        </DensityProvider>
      );
    };

    return (
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'flex-start' }}>
        <DensityModalDemo mode="compact" label="Compact (0.8x)" />
        <DensityModalDemo mode="normal" label="Normal (1.0x)" />
        <DensityModalDemo mode="spacious" label="Spacious (1.25x)" />
      </Box>
    );
  },
};