import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Email, Lock, Search, Visibility, VisibilityOff } from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { DensityProvider } from '../../../utils/density';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Form/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'component:Input'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'glass', 'underline', 'gradient'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'John Doe',
  },
};

// Required story export: AllVariants
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input variant="outlined" label="Outlined" placeholder="Outlined input" />
      <Input variant="filled" label="Filled" placeholder="Filled input" />
      <Input variant="glass" label="Glass" placeholder="Glass morphism input" />
      <Input variant="underline" label="Underline" placeholder="Underline input" />
      <Input variant="gradient" label="Gradient" placeholder="Gradient border input" />
    </div>
  ),
};

// Backward compatibility alias
export const Variants = AllVariants;

// Required story export: AllSizes
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input size="sm" label="Small" placeholder="Small input" />
      <Input size="md" label="Medium" placeholder="Medium input" />
      <Input size="lg" label="Large" placeholder="Large input" />
    </div>
  ),
};

// Backward compatibility alias
export const Sizes = AllSizes;

export const WithAdornments: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input label="Search" placeholder="Search..." startAdornment={<Search />} />
      <Input label="Email" type="email" placeholder="john@example.com" startAdornment={<Email />} />
      <PasswordInput />
    </div>
  ),
};

// Password input with visibility toggle
function PasswordInput() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      label="Password"
      type={showPassword ? 'text' : 'password'}
      placeholder="Enter password"
      startAdornment={<Lock />}
      endAdornment={
        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      }
    />
  );
}

export const FloatingLabels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input floating label="Floating Label" placeholder="Type here..." />
      <Input floating variant="glass" label="Glass with Float" />
      <Input floating variant="filled" label="Filled with Float" />
    </div>
  ),
};

export const ErrorStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input
        label="Email"
        error
        helperText="Please enter a valid email address"
        defaultValue="invalid-email"
      />
      <Input variant="glass" label="Required Field" error helperText="This field is required" />
    </div>
  ),
};

// Enhanced Visual Effects Stories
export const VisualEffects: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '300px',
        backgroundColor: '#f5f5f5',
        padding: '24px',
        borderRadius: '8px',
      }}
    >
      <Input variant="glass" label="Glow Effect" placeholder="Focus me!" glow />
      <Input variant="outlined" label="Pulse Animation" placeholder="Watch me pulse" pulse />
      <Input variant="gradient" label="Loading State" placeholder="Processing..." loading />
      <Input variant="glass" label="Combined Effects" placeholder="Glow + Float" glow floating />
    </div>
  ),
};

// Required story export: AllStates
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input label="Default State" placeholder="Type here..." />
      <Input label="Focused State" placeholder="Focus me" autoFocus />
      <Input label="Hover State" placeholder="Hover over me" />
      <Input label="Disabled State" placeholder="Cannot type" disabled />
      <Input label="Readonly State" placeholder="Read only" value="Cannot change this" readOnly />
      <Input
        label="Error State"
        placeholder="Has error"
        error
        helperText="This field has an error"
      />
      <Input label="Required Field" placeholder="This is required" required />
      <Input label="Loading State" placeholder="Loading..." loading />
    </div>
  ),
};

// Backward compatibility alias
export const InteractiveStates = AllStates;

// Different Input Types
export const InputTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input type="text" label="Text Input" placeholder="Enter text" />
      <Input type="email" label="Email Input" placeholder="email@example.com" />
      <Input type="password" label="Password Input" placeholder="Enter password" />
      <Input type="number" label="Number Input" placeholder="123" />
      <Input type="tel" label="Phone Input" placeholder="+1 (555) 123-4567" />
      <Input type="url" label="URL Input" placeholder="https://example.com" />
    </div>
  ),
};

// Edge Cases
export const EdgeCases: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input
        label="Long Text Overflow"
        defaultValue="This is a very long text that should show how the input handles overflow and long content gracefully"
      />
      <Input label="Empty with Floating" floating placeholder="Floating label behavior" />
      <Input label="No Full Width" fullWidth={false} placeholder="Not full width" />
      <Input
        variant="glass"
        label="Glass + All Props"
        placeholder="Kitchen sink example"
        glow
        pulse
        floating
        helperText="This has all visual effects enabled"
      />
    </div>
  ),
};

// Required story export: Responsive
export const Responsive: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '16px',
      }}
    >
      <Input variant="outlined" label="Responsive 1" placeholder="Resize window" />
      <Input variant="glass" label="Responsive 2" placeholder="Watch layout" />
      <Input variant="gradient" label="Responsive 3" placeholder="Adapt to screen" />
    </div>
  ),
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1200px', height: '800px' } },
      },
    },
  },
};

// Backward compatibility alias
export const ResponsiveDemo = Responsive;

export const DensityModes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'flex-start' }}>
      <DensityProvider defaultMode="compact">
        <Box sx={{ width: 250 }}>
          <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
            Compact (0.8x)
          </Typography>
          <Input variant="outlined" label="Compact Input" placeholder="Tighter spacing..." />
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="normal">
        <Box sx={{ width: 250 }}>
          <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
            Normal (1.0x)
          </Typography>
          <Input variant="outlined" label="Normal Input" placeholder="Standard spacing..." />
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="spacious">
        <Box sx={{ width: 250 }}>
          <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
            Spacious (1.25x)
          </Typography>
          <Input variant="outlined" label="Spacious Input" placeholder="Extra breathing room..." />
        </Box>
      </DensityProvider>
    </Box>
  ),
};

export const Playground: Story = {
  args: {
    variant: 'outlined',
    size: 'md',
    label: 'Playground Input',
    placeholder: 'Type something...',
    fullWidth: true,
    floating: false,
    glow: false,
    pulse: false,
    loading: false,
    error: false,
    helperText: 'This is helper text',
  },
};
