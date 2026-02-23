import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DensityProvider } from '../../../utils/density';
import { useState } from 'react';

import { Dialog, DialogActions,DialogContent, DialogHeader } from './Dialog';

const meta: Meta<typeof Dialog> = {
  title: 'Feedback/Dialog',
  component: Dialog,
  tags: ['autodocs', 'component:Dialog'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile dialog component with glass morphism, gradient, and multiple variant support.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'glass', 'fullscreen', 'drawer'],
      description: 'Visual style variant of the dialog',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the dialog',
    },
    borderRadius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Border radius of the dialog',
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
type Story = StoryObj<typeof Dialog>;

const DialogWrapper = ({ children, ...args }: { children: React.ReactNode; [key: string]: unknown }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Dialog
      </Button>
      <Dialog {...args} open={open} onClose={() => setOpen(false)}>
        {children}
      </Dialog>
    </Box>
  );
};

export const Default: Story = {
  render: (args) => (
    <DialogWrapper {...args}>
      <DialogHeader
        title="Default Dialog"
        subtitle="A clean, minimal dialog design"
      />
      <DialogContent>
        <Typography>
          This is a default dialog with standard Material-UI styling.
          Perfect for most use cases requiring user interaction.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button>Cancel</Button>
        <Button variant="contained">Confirm</Button>
      </DialogActions>
    </DialogWrapper>
  ),
  args: {
    variant: 'default',
    size: 'md',
  },
};

export const GlassMorphism: Story = {
  render: (args) => (
    <DialogWrapper {...args}>
      <DialogHeader
        title="Glass Dialog"
        subtitle="Beautiful glass morphism effect"
      />
      <DialogContent>
        <Typography>
          Experience the modern glass morphism design with blur effects
          and translucent backgrounds. Perfect for contemporary interfaces.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button>Cancel</Button>
        <Button variant="contained">Accept</Button>
      </DialogActions>
    </DialogWrapper>
  ),
  args: {
    variant: 'glass',
    size: 'md',
    glow: true,
  },
};

export const GradientGlow: Story = {
  render: (args) => (
    <DialogWrapper {...args}>
      <DialogHeader
        title="Gradient Glow Dialog"
        subtitle="Stunning gradient with glow effects"
      />
      <DialogContent>
        <Typography>
          A premium dialog with gradient backgrounds and glow effects.
          Ideal for highlighting important actions or premium features.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button>Skip</Button>
        <Button variant="contained">Upgrade Now</Button>
      </DialogActions>
    </DialogWrapper>
  ),
  args: {
    variant: 'default',
    gradient: true,
    glow: true,
    size: 'lg',
    borderRadius: 'xl',
  },
};

export const Fullscreen: Story = {
  render: (args) => (
    <DialogWrapper {...args}>
      <DialogHeader
        title="Fullscreen Dialog"
        subtitle="Immersive fullscreen experience"
      />
      <DialogContent>
        <Box sx={{ py: 4 }}>
          <Typography variant="h4" gutterBottom>
            Fullscreen Content
          </Typography>
          <Typography paragraph>
            This fullscreen dialog provides an immersive experience perfect for
            complex forms, detailed views, or step-by-step processes.
          </Typography>
          <Typography paragraph>
            The fullscreen variant automatically adapts to mobile devices and
            provides optimal space utilization.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button>Cancel</Button>
        <Button variant="contained">Save</Button>
      </DialogActions>
    </DialogWrapper>
  ),
  args: {
    variant: 'fullscreen',
  },
};

export const DrawerStyle: Story = {
  render: (args) => (
    <DialogWrapper {...args}>
      <DialogHeader
        title="Drawer Dialog"
        subtitle="Slide-in panel design"
      />
      <DialogContent>
        <Typography paragraph>
          The drawer variant slides in from the right, perfect for forms,
          settings panels, or detailed information views.
        </Typography>
        <Typography paragraph>
          This design pattern is especially popular in modern web applications
          for secondary content and actions.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button>Close</Button>
        <Button variant="contained">Apply</Button>
      </DialogActions>
    </DialogWrapper>
  ),
  args: {
    variant: 'drawer',
    size: 'sm',
  },
};

const AllSizesComponent = () => {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});

  const handleOpen = (size: string) => {
    setOpenStates(prev => ({ ...prev, [size]: true }));
  };

  const handleClose = (size: string) => {
    setOpenStates(prev => ({ ...prev, [size]: false }));
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      {sizes.map(size => (
        <Box key={size}>
          <Button
            variant="outlined"
            onClick={() => handleOpen(size)}
            size="small"
          >
            {size.toUpperCase()}
          </Button>
          <Dialog
            open={openStates[size] || false}
            onClose={() => handleClose(size)}
            size={size}
            variant="glass"
          >
            <DialogHeader title={`${size.toUpperCase()} Dialog`} />
            <DialogContent>
              <Typography>
                  This is a {size} sized dialog demonstrating responsive sizing.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleClose(size)}>Close</Button>
            </DialogActions>
          </Dialog>
        </Box>
      ))}
    </Box>
  );
};

export const AllSizes: Story = {
  render: () => <AllSizesComponent />,
};

// Additional comprehensive stories
export const WithCustomActions: Story = {
  render: (args) => (
    <DialogWrapper {...args}>
      <DialogHeader
        title="Custom Actions Dialog"
        subtitle="Dialog with custom action alignment and spacing"
      />
      <DialogContent>
        <Typography paragraph>
          This dialog demonstrates custom action alignment and spacing options.
          You can align actions to left, center, right, or space-between.
        </Typography>
      </DialogContent>
      <DialogActions alignment="space-between" spacing={2}>
        <Button variant="outlined" color="error">Delete</Button>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button>Cancel</Button>
          <Button variant="contained">Save Changes</Button>
        </Box>
      </DialogActions>
    </DialogWrapper>
  ),
  args: {
    variant: 'default',
    size: 'md',
    borderRadius: 'lg',
  },
};

export const WithDividers: Story = {
  render: (args) => (
    <DialogWrapper {...args}>
      <DialogHeader
        title="Dialog with Dividers"
        subtitle="Content sections with visual separators"
      />
      <DialogContent dividers>
        <Typography paragraph>
          This content section has dividers above and below to create clear
          visual separation from the header and actions.
        </Typography>
        <Typography paragraph>
          This is useful for dialogs with a lot of content or when you need
          to clearly separate different sections of the dialog.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button>Cancel</Button>
        <Button variant="contained">Continue</Button>
      </DialogActions>
    </DialogWrapper>
  ),
  args: {
    variant: 'default',
    size: 'lg',
  },
};

export const DenseContent: Story = {
  render: (args) => (
    <DialogWrapper {...args}>
      <DialogHeader
        title="Dense Content Dialog"
        subtitle="Compact spacing for information-heavy dialogs"
      />
      <DialogContent dense dividers>
        <Typography variant="body2" paragraph>
          Dense content reduces padding to fit more information in a smaller space.
          This is useful for data tables, forms, or content-heavy dialogs.
        </Typography>
        <Typography variant="body2" paragraph>
          The dense prop reduces internal padding while maintaining readability.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button size="small">Cancel</Button>
        <Button variant="contained" size="small">OK</Button>
      </DialogActions>
    </DialogWrapper>
  ),
  args: {
    variant: 'default',
    size: 'sm',
  },
};

export const NoCloseButton: Story = {
  render: (args) => (
    <DialogWrapper {...args}>
      <DialogHeader
        title="Persistent Dialog"
        subtitle="No close button - must use action buttons"
        showCloseButton={false}
      />
      <DialogContent>
        <Typography>
          This dialog has no close button and is persistent, meaning it cannot
          be closed by clicking the backdrop or pressing Escape.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button color="error">Cancel</Button>
        <Button variant="contained">Confirm</Button>
      </DialogActions>
    </DialogWrapper>
  ),
  args: {
    variant: 'default',
    size: 'md',
    persistent: true,
  },
};

export const PulseEffect: Story = {
  render: (args) => (
    <DialogWrapper {...args}>
      <DialogHeader
        title="Pulse Effect Dialog"
        subtitle="Attention-grabbing pulse animation"
      />
      <DialogContent>
        <Typography>
          This dialog has a pulse effect to draw attention. The pulse animation
          creates a subtle highlighting effect around the dialog.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button>Dismiss</Button>
        <Button variant="contained">Take Action</Button>
      </DialogActions>
    </DialogWrapper>
  ),
  args: {
    variant: 'default',
    size: 'md',
    pulse: true,
    glow: true,
  },
};

const BorderRadiusVariationsComponent = () => {
  const radiusOptions = ['none', 'sm', 'md', 'lg', 'xl'] as const;
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});

  const handleOpen = (radius: string) => {
    setOpenStates(prev => ({ ...prev, [radius]: true }));
  };

  const handleClose = (radius: string) => {
    setOpenStates(prev => ({ ...prev, [radius]: false }));
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      {radiusOptions.map(radius => (
        <Box key={radius}>
          <Button
            variant="outlined"
            onClick={() => handleOpen(radius)}
            size="small"
          >
            {radius.toUpperCase()}
          </Button>
          <Dialog
            open={openStates[radius] || false}
            onClose={() => handleClose(radius)}
            borderRadius={radius}
            variant="glass"
          >
            <DialogHeader title={`${radius.toUpperCase()} Border Radius`} />
            <DialogContent>
              <Typography>
                  This dialog demonstrates the {radius} border radius option.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleClose(radius)}>Close</Button>
            </DialogActions>
          </Dialog>
        </Box>
      ))}
    </Box>
  );
};

export const BorderRadiusVariations: Story = {
  render: () => <BorderRadiusVariationsComponent />,
};

// Required story exports for validation
export const AllVariants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Typography variant="h6">Dialog Variants Showcase</Typography>

      {/* Default Variant */}
      <Box>
        <Typography variant="subtitle1" gutterBottom>Default Variant</Typography>
        <DialogWrapper variant="default" size="md">
          <DialogHeader title="Default Dialog" subtitle="Standard Material-UI styling" />
          <DialogContent>
            <Typography>Default variant with clean, minimal design.</Typography>
          </DialogContent>
          <DialogActions>
            <Button>Cancel</Button>
            <Button variant="contained">Confirm</Button>
          </DialogActions>
        </DialogWrapper>
      </Box>

      {/* Glass Variant */}
      <Box>
        <Typography variant="subtitle1" gutterBottom>Glass Variant</Typography>
        <DialogWrapper variant="glass" size="md" glow>
          <DialogHeader title="Glass Dialog" subtitle="Glass morphism effect" />
          <DialogContent>
            <Typography>Glass variant with blur and translucent background.</Typography>
          </DialogContent>
          <DialogActions>
            <Button>Cancel</Button>
            <Button variant="contained">Confirm</Button>
          </DialogActions>
        </DialogWrapper>
      </Box>

      {/* Fullscreen Variant */}
      <Box>
        <Typography variant="subtitle1" gutterBottom>Fullscreen Variant</Typography>
        <DialogWrapper variant="fullscreen">
          <DialogHeader title="Fullscreen Dialog" subtitle="Immersive experience" />
          <DialogContent>
            <Typography>Fullscreen variant for complex content.</Typography>
          </DialogContent>
          <DialogActions>
            <Button>Cancel</Button>
            <Button variant="contained">Save</Button>
          </DialogActions>
        </DialogWrapper>
      </Box>

      {/* Drawer Variant */}
      <Box>
        <Typography variant="subtitle1" gutterBottom>Drawer Variant</Typography>
        <DialogWrapper variant="drawer" size="sm">
          <DialogHeader title="Drawer Dialog" subtitle="Slide-in panel" />
          <DialogContent>
            <Typography>Drawer variant that slides in from the side.</Typography>
          </DialogContent>
          <DialogActions>
            <Button>Close</Button>
            <Button variant="contained">Apply</Button>
          </DialogActions>
        </DialogWrapper>
      </Box>
    </Box>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const AllStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Typography variant="h6">Dialog States</Typography>

      {/* Normal State */}
      <Box>
        <Typography variant="subtitle1" gutterBottom>Normal State</Typography>
        <DialogWrapper variant="default" size="md">
          <DialogHeader title="Normal Dialog" subtitle="Standard state" />
          <DialogContent>
            <Typography>Normal dialog with standard interaction.</Typography>
          </DialogContent>
          <DialogActions>
            <Button>Cancel</Button>
            <Button variant="contained">OK</Button>
          </DialogActions>
        </DialogWrapper>
      </Box>

      {/* With Glow Effect */}
      <Box>
        <Typography variant="subtitle1" gutterBottom>With Glow Effect</Typography>
        <DialogWrapper variant="glass" size="md" glow>
          <DialogHeader title="Glowing Dialog" subtitle="Enhanced visibility" />
          <DialogContent>
            <Typography>Dialog with glow effect for emphasis.</Typography>
          </DialogContent>
          <DialogActions>
            <Button>Cancel</Button>
            <Button variant="contained">Confirm</Button>
          </DialogActions>
        </DialogWrapper>
      </Box>

      {/* With Gradient */}
      <Box>
        <Typography variant="subtitle1" gutterBottom>With Gradient</Typography>
        <DialogWrapper variant="default" gradient glow size="lg">
          <DialogHeader title="Gradient Dialog" subtitle="Premium appearance" />
          <DialogContent>
            <Typography>Dialog with gradient background.</Typography>
          </DialogContent>
          <DialogActions>
            <Button>Skip</Button>
            <Button variant="contained">Upgrade</Button>
          </DialogActions>
        </DialogWrapper>
      </Box>

      {/* Persistent State */}
      <Box>
        <Typography variant="subtitle1" gutterBottom>Persistent State (No backdrop close)</Typography>
        <DialogWrapper variant="default" size="md" persistent>
          <DialogHeader title="Persistent Dialog" subtitle="Must use action buttons" showCloseButton={false} />
          <DialogContent>
            <Typography>This dialog cannot be closed by clicking outside or pressing Escape.</Typography>
          </DialogContent>
          <DialogActions>
            <Button color="error">Cancel</Button>
            <Button variant="contained">Confirm</Button>
          </DialogActions>
        </DialogWrapper>
      </Box>

      {/* With Pulse Effect */}
      <Box>
        <Typography variant="subtitle1" gutterBottom>With Pulse Effect</Typography>
        <DialogWrapper variant="default" size="md" pulse glow>
          <DialogHeader title="Pulsing Dialog" subtitle="Attention-grabbing animation" />
          <DialogContent>
            <Typography>Dialog with pulse animation to draw attention.</Typography>
          </DialogContent>
          <DialogActions>
            <Button>Dismiss</Button>
            <Button variant="contained">Take Action</Button>
          </DialogActions>
        </DialogWrapper>
      </Box>
    </Box>
  ),
  parameters: {
    layout: 'padded',
  },
};

const InteractiveStatesComponent = () => {
  const [dialogStates, setDialogStates] = useState({
    hover: false,
    focus: false,
    active: false,
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Typography variant="h6">Interactive Dialog States</Typography>

      {/* Interactive Demo */}
      <Box>
        <Typography variant="subtitle1" gutterBottom>Interactive Elements Demo</Typography>
        <DialogWrapper variant="glass" size="md" glow>
          <DialogHeader
            title="Interactive Dialog"
            subtitle="Test hover, focus, and active states"
          />
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography>
                  Interact with the elements below to see state changes:
              </Typography>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  onMouseEnter={() => setDialogStates(prev => ({ ...prev, hover: true }))}
                  onMouseLeave={() => setDialogStates(prev => ({ ...prev, hover: false }))}
                  onFocus={() => setDialogStates(prev => ({ ...prev, focus: true }))}
                  onBlur={() => setDialogStates(prev => ({ ...prev, focus: false }))}
                  onMouseDown={() => setDialogStates(prev => ({ ...prev, active: true }))}
                  onMouseUp={() => setDialogStates(prev => ({ ...prev, active: false }))}
                >
                    Interactive Button
                </Button>
              </Box>

              <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                <Typography variant="body2">
                    States:
                  {dialogStates.hover && ' [Hovering]'}
                  {dialogStates.focus && ' [Focused]'}
                  {dialogStates.active && ' [Active]'}
                  {!dialogStates.hover && !dialogStates.focus && !dialogStates.active && ' [Idle]'}
                </Typography>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button>Cancel</Button>
            <Button variant="contained">Apply</Button>
          </DialogActions>
        </DialogWrapper>
      </Box>

      {/* Form Interaction */}
      <Box>
        <Typography variant="subtitle1" gutterBottom>Form Interaction</Typography>
        <DialogWrapper variant="default" size="md">
          <DialogHeader title="Form Dialog" subtitle="Interactive form elements" />
          <DialogContent>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <input
                type="text"
                placeholder="Enter text..."
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <textarea
                placeholder="Enter description..."
                rows={3}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <input type="checkbox" id="agree" />
                <label htmlFor="agree">I agree to the terms</label>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button>Cancel</Button>
            <Button variant="contained">Submit</Button>
          </DialogActions>
        </DialogWrapper>
      </Box>

      {/* Keyboard Navigation Demo */}
      <Box>
        <Typography variant="subtitle1" gutterBottom>Keyboard Navigation</Typography>
        <DialogWrapper variant="glass" size="sm">
          <DialogHeader title="Keyboard Navigation" subtitle="Press Tab to navigate" />
          <DialogContent>
            <Typography variant="body2" gutterBottom>
                Use Tab/Shift+Tab to navigate between elements. Press Escape to close.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <Button size="small">First</Button>
              <Button size="small">Second</Button>
              <Button size="small">Third</Button>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button>Cancel</Button>
            <Button variant="contained">Done</Button>
          </DialogActions>
        </DialogWrapper>
      </Box>
    </Box>
  );
};

export const InteractiveStates: Story = {
  render: () => <InteractiveStatesComponent />,
  parameters: {
    layout: 'padded',
  },
};

export const Responsive: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Typography variant="h6">Responsive Dialog Behavior</Typography>

      {/* Mobile View */}
      <Box>
        <Typography variant="subtitle1" gutterBottom>Mobile View (Fullscreen on small screens)</Typography>
        <Box sx={{ maxWidth: '375px', border: '1px solid #ccc', borderRadius: 1, p: 2 }}>
          <DialogWrapper variant="default" size="md">
            <DialogHeader title="Mobile Dialog" subtitle="Adapts to screen size" />
            <DialogContent>
              <Typography variant="body2">
                On mobile devices, dialogs automatically adapt to provide the best user experience.
                This might include fullscreen display or adjusted padding.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button size="small">Cancel</Button>
              <Button variant="contained" size="small">OK</Button>
            </DialogActions>
          </DialogWrapper>
        </Box>
      </Box>

      {/* Tablet View */}
      <Box>
        <Typography variant="subtitle1" gutterBottom>Tablet View</Typography>
        <Box sx={{ maxWidth: '768px', border: '1px solid #ccc', borderRadius: 1, p: 2 }}>
          <DialogWrapper variant="glass" size="lg">
            <DialogHeader title="Tablet Dialog" subtitle="Optimized for medium screens" />
            <DialogContent>
              <Typography>
                Tablet view provides balanced spacing and sizing, making good use of available screen space
                while maintaining readability and touch-friendly interactions.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button>Cancel</Button>
              <Button variant="contained">Continue</Button>
            </DialogActions>
          </DialogWrapper>
        </Box>
      </Box>

      {/* Desktop View */}
      <Box>
        <Typography variant="subtitle1" gutterBottom>Desktop View</Typography>
        <DialogWrapper variant="default" size="xl">
          <DialogHeader title="Desktop Dialog" subtitle="Full-featured desktop experience" />
          <DialogContent>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Typography>
                Desktop view can utilize more complex layouts with multiple columns,
                larger content areas, and more sophisticated interactions.
              </Typography>
              <Typography>
                This provides the richest experience with all features available
                and optimal use of screen real estate.
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button>Cancel</Button>
            <Button>Save Draft</Button>
            <Button variant="contained">Publish</Button>
          </DialogActions>
        </DialogWrapper>
      </Box>

      {/* Responsive Size Grid */}
      <Box>
        <Typography variant="subtitle1" gutterBottom>Responsive Size Grid</Typography>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 2
        }}>
          {['xs', 'sm', 'md', 'lg', 'xl'].map(size => (
            <Box key={size} sx={{ border: '1px solid #ccc', borderRadius: 1, p: 2 }}>
              <Typography variant="body2" gutterBottom>{size.toUpperCase()} Size</Typography>
              <DialogWrapper variant="glass" size={size as 'xs' | 'sm' | 'md' | 'lg' | 'xl'}>
                <DialogHeader title={`${size.toUpperCase()} Dialog`} />
                <DialogContent>
                  <Typography variant="body2">
                    Responsive {size} size
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button size="small">Close</Button>
                </DialogActions>
              </DialogWrapper>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  ),
  parameters: {
    layout: 'padded',
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1920px', height: '1080px' } },
      },
    },
  },
};

export const DensityModes: Story = {
  render: () => {

    const DensityDialogDemo = ({ mode, label }: { mode: string; label: string }) => {
      const [open, setOpen] = useState(false);

      return (
        <DensityProvider defaultMode={mode}>
          <Box sx={{ width: 180 }}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              {label}
            </Typography>
            <Button variant="outlined" size="small" onClick={() => setOpen(true)}>
              Open {mode} Dialog
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)} size="sm">
              <DialogHeader title={`${label} Dialog`} subtitle="Density demonstration" />
              <DialogContent>
                <Typography>
                  This dialog demonstrates {mode} density spacing.
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button variant="contained" onClick={() => setOpen(false)}>OK</Button>
              </DialogActions>
            </Dialog>
          </Box>
        </DensityProvider>
      );
    };

    return (
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'flex-start' }}>
        <DensityDialogDemo mode="compact" label="Compact (0.8x)" />
        <DensityDialogDemo mode="normal" label="Normal (1.0x)" />
        <DensityDialogDemo mode="spacious" label="Spacious (1.25x)" />
      </Box>
    );
  },
  parameters: {
    layout: 'padded',
  },
};