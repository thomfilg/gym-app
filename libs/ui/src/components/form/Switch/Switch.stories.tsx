import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DensityProvider } from '../../../utils/density';
import { Bell, BellOff,Moon, Sun, Volume2, VolumeX, Wifi, WifiOff } from 'lucide-react';
import { useState } from 'react';

import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Form/Switch',
  component: Switch,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs', 'component:Switch'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'ios', 'android', 'label', 'material'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'neutral'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    labelPosition: {
      control: { type: 'select' },
      options: ['start', 'end', 'top', 'bottom'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
    color: 'primary',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Enable notifications',
    description: 'Receive push notifications for important updates',
    variant: 'default',
  },
};

const VariantsComponent = () => {
  const [states, setStates] = useState({
    default: false,
    ios: false,
    android: false,
    material: false,
    label: false,
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Default
        </Typography>
        <Switch
          variant="default"
          label="Default variant"
          checked={states.default}
          onChange={(e) => setStates((prev) => ({ ...prev, default: e.target.checked }))}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          iOS Style
        </Typography>
        <Switch
          variant="ios"
          label="iOS style switch"
          checked={states.ios}
          onChange={(e) => setStates((prev) => ({ ...prev, ios: e.target.checked }))}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Android Style
        </Typography>
        <Switch
          variant="android"
          label="Android style switch"
          checked={states.android}
          onChange={(e) => setStates((prev) => ({ ...prev, android: e.target.checked }))}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Material Design
        </Typography>
        <Switch
          variant="material"
          label="Material design switch"
          checked={states.material}
          onChange={(e) => setStates((prev) => ({ ...prev, material: e.target.checked }))}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          With Text Labels
        </Typography>
        <Switch
          variant="label"
          label="Toggle with text"
          onText="ON"
          offText="OFF"
          checked={states.label}
          onChange={(e) => setStates((prev) => ({ ...prev, label: e.target.checked }))}
        />
      </Box>
    </Box>
  );
};

export const Variants: Story = {
  render: () => <VariantsComponent />,
};

const ColorsComponent = () => {
  const [states, setStates] = useState({
    primary: true,
    secondary: true,
    success: true,
    warning: true,
    danger: true,
    neutral: true,
  });

  return (
    <Box
      sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 2 }}
    >
      {Object.entries(states).map(([color, checked]) => (
        <Switch
          key={color}
          color={color}
          label={`${color.charAt(0).toUpperCase() + color.slice(1)} color`}
          checked={checked}
          onChange={(e) => setStates((prev) => ({ ...prev, [color]: e.target.checked }))}
        />
      ))}
    </Box>
  );
};

export const Colors: Story = {
  render: () => <ColorsComponent />,
};

const SizesComponent = () => {
  const [states, setStates] = useState({
    xs: true,
    sm: true,
    md: true,
    lg: true,
    xl: true,
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {Object.entries(states).map(([size, checked]) => (
        <Switch
          key={size}
          size={size}
          label={`Size: ${size.toUpperCase()}`}
          checked={checked}
          onChange={(e) => setStates((prev) => ({ ...prev, [size]: e.target.checked }))}
        />
      ))}
    </Box>
  );
};

export const Sizes: Story = {
  render: () => <SizesComponent />,
};

const WithIconsComponent = () => {
  const [states, setStates] = useState({
    theme: false,
    sound: true,
    wifi: true,
    notifications: false,
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Switch
        label="Dark Mode"
        description="Toggle between light and dark theme"
        onIcon={<Moon size={12} />}
        offIcon={<Sun size={12} />}
        checked={states.theme}
        onChange={(e) => setStates((prev) => ({ ...prev, theme: e.target.checked }))}
      />

      <Switch
        label="Sound"
        description="Enable or disable system sounds"
        onIcon={<Volume2 size={12} />}
        offIcon={<VolumeX size={12} />}
        color="success"
        checked={states.sound}
        onChange={(e) => setStates((prev) => ({ ...prev, sound: e.target.checked }))}
      />

      <Switch
        label="WiFi"
        description="Connect to wireless networks"
        onIcon={<Wifi size={12} />}
        offIcon={<WifiOff size={12} />}
        color="secondary"
        checked={states.wifi}
        onChange={(e) => setStates((prev) => ({ ...prev, wifi: e.target.checked }))}
      />

      <Switch
        label="Notifications"
        description="Receive push notifications"
        onIcon={<Bell size={12} />}
        offIcon={<BellOff size={12} />}
        color="warning"
        checked={states.notifications}
        onChange={(e) => setStates((prev) => ({ ...prev, notifications: e.target.checked }))}
      />
    </Box>
  );
};

export const WithIcons: Story = {
  render: () => <WithIconsComponent />,
};

const LabelPositionsComponent = () => {
  const [states, setStates] = useState({
    start: true,
    end: true,
    top: true,
    bottom: true,
  });

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 4 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Start Position
        </Typography>
        <Switch
          label="Switch at end"
          description="Label appears before the switch"
          labelPosition="start"
          checked={states.start}
          onChange={(e) => setStates((prev) => ({ ...prev, start: e.target.checked }))}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          End Position
        </Typography>
        <Switch
          label="Switch at start"
          description="Label appears after the switch"
          labelPosition="end"
          checked={states.end}
          onChange={(e) => setStates((prev) => ({ ...prev, end: e.target.checked }))}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Top Position
        </Typography>
        <Switch
          label="Switch below"
          description="Label appears above the switch"
          labelPosition="top"
          checked={states.top}
          onChange={(e) => setStates((prev) => ({ ...prev, top: e.target.checked }))}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Bottom Position
        </Typography>
        <Switch
          label="Switch above"
          description="Label appears below the switch"
          labelPosition="bottom"
          checked={states.bottom}
          onChange={(e) => setStates((prev) => ({ ...prev, bottom: e.target.checked }))}
        />
      </Box>
    </Box>
  );
};

export const LabelPositions: Story = {
  render: () => <LabelPositionsComponent />,
};

const SpecialEffectsComponent = () => {
  const [states, setStates] = useState({
    glass: true,
    gradient: true,
    glow: true,
    combined: true,
  });

  return (
    <Box
      sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3 }}
    >
      <Box>
        <Typography variant="h6" gutterBottom>
          Glass Morphism
        </Typography>
        <Switch
          glass
          label="Glass effect"
          description="Beautiful glass morphism styling"
          checked={states.glass}
          onChange={(e) => setStates((prev) => ({ ...prev, glass: e.target.checked }))}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Gradient
        </Typography>
        <Switch
          gradient
          color="secondary"
          label="Gradient colors"
          description="Smooth gradient transitions"
          checked={states.gradient}
          onChange={(e) => setStates((prev) => ({ ...prev, gradient: e.target.checked }))}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Glow Effect
        </Typography>
        <Switch
          glow
          color="success"
          label="Glowing switch"
          description="Animated glow effect"
          checked={states.glow}
          onChange={(e) => setStates((prev) => ({ ...prev, glow: e.target.checked }))}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Combined Effects
        </Typography>
        <Switch
          glass
          gradient
          glow
          color="warning"
          size="lg"
          label="All effects"
          description="Glass + gradient + glow"
          onIcon={<Sun size={16} />}
          offIcon={<Moon size={16} />}
          checked={states.combined}
          onChange={(e) => setStates((prev) => ({ ...prev, combined: e.target.checked }))}
        />
      </Box>
    </Box>
  );
};

export const SpecialEffects: Story = {
  render: () => <SpecialEffectsComponent />,
};

const ErrorStatesComponent = () => {
  const [state, setState] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Switch
        error
        label="Required Setting"
        description="This setting is required to continue"
        helperText="Please enable this option"
        checked={state}
        onChange={(e) => setState(e.target.checked)}
      />
    </Box>
  );
};

export const ErrorStates: Story = {
  render: () => <ErrorStatesComponent />,
};

const CustomSizesComponent = () => {
  const [states, setStates] = useState({
    custom1: true,
    custom2: true,
    custom3: true,
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Custom Width & Height
        </Typography>
        <Switch
          label="Wide switch"
          trackWidth={80}
          trackHeight={30}
          checked={states.custom1}
          onChange={(e) => setStates((prev) => ({ ...prev, custom1: e.target.checked }))}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Tall Switch
        </Typography>
        <Switch
          label="Tall switch"
          trackWidth={60}
          trackHeight={40}
          checked={states.custom2}
          onChange={(e) => setStates((prev) => ({ ...prev, custom2: e.target.checked }))}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Mini Switch
        </Typography>
        <Switch
          label="Mini switch"
          trackWidth={30}
          trackHeight={16}
          checked={states.custom3}
          onChange={(e) => setStates((prev) => ({ ...prev, custom3: e.target.checked }))}
        />
      </Box>
    </Box>
  );
};

export const CustomSizes: Story = {
  render: () => <CustomSizesComponent />,
};

const AdvancedFeaturesComponent = () => {
  const [states, setStates] = useState({
    loading: true,
    ripple: false,
    pulse: true,
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Loading State
        </Typography>
        <Switch
          loading
          label="Processing..."
          description="Switch is in loading state"
          color="primary"
          checked={states.loading}
          onChange={(e) => setStates((prev) => ({ ...prev, loading: e.target.checked }))}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Ripple Effect
        </Typography>
        <Switch
          ripple
          label="Ripple on hover"
          description="Hover over the switch to see ripple effect"
          color="secondary"
          checked={states.ripple}
          onChange={(e) => setStates((prev) => ({ ...prev, ripple: e.target.checked }))}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Pulse Animation
        </Typography>
        <Switch
          pulse
          label="Pulsing switch"
          description="Continuous pulse animation"
          color="success"
          checked={states.pulse}
          onChange={(e) => setStates((prev) => ({ ...prev, pulse: e.target.checked }))}
        />
      </Box>
    </Box>
  );
};

export const AdvancedFeatures: Story = {
  render: () => <AdvancedFeaturesComponent />,
};

export const Playground: Story = {
  args: {
    label: 'Toggle Setting',
    description: 'Enable or disable this feature',
    variant: 'default',
    color: 'primary',
    size: 'md',
    labelPosition: 'end',
    glass: false,
    gradient: false,
    glow: false,
    error: false,
    helperText: '',
    onText: '',
    offText: '',
    loading: false,
    ripple: false,
    pulse: false,
  },
};

// Required story exports for validation
export const AllVariants: Story = {
  render: () => <VariantsComponent />,
};

export const AllSizes: Story = {
  render: () => <SizesComponent />,
};

const AllStatesComponent = () => {
  const [states, setStates] = useState({
    normal: true,
    disabled: false,
    error: false,
    loading: true,
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Switch
        label="Normal State"
        checked={states.normal}
        onChange={(e) => setStates((prev) => ({ ...prev, normal: e.target.checked }))}
      />
      <Switch
        label="Disabled State"
        disabled
        checked={states.disabled}
        onChange={(e) => setStates((prev) => ({ ...prev, disabled: e.target.checked }))}
      />
      <Switch
        label="Error State"
        error
        helperText="This is an error"
        checked={states.error}
        onChange={(e) => setStates((prev) => ({ ...prev, error: e.target.checked }))}
      />
      <Switch
        label="Loading State"
        loading
        checked={states.loading}
        onChange={(e) => setStates((prev) => ({ ...prev, loading: e.target.checked }))}
      />
    </Box>
  );
};

export const AllStates: Story = {
  render: () => <AllStatesComponent />,
};

const InteractiveStatesComponent = () => {
  const [states, setStates] = useState({
    hover: true,
    focus: false,
    active: true,
    disabled: false,
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Switch
        label="Hover Effects (ripple enabled)"
        ripple
        checked={states.hover}
        onChange={(e) => setStates((prev) => ({ ...prev, hover: e.target.checked }))}
      />
      <Switch
        label="Focus State (try tabbing)"
        checked={states.focus}
        onChange={(e) => setStates((prev) => ({ ...prev, focus: e.target.checked }))}
      />
      <Switch
        label="Active State (glow enabled)"
        glow
        checked={states.active}
        onChange={(e) => setStates((prev) => ({ ...prev, active: e.target.checked }))}
      />
      <Switch
        label="Disabled State"
        disabled
        checked={states.disabled}
        onChange={(e) => setStates((prev) => ({ ...prev, disabled: e.target.checked }))}
      />
    </Box>
  );
};

export const InteractiveStates: Story = {
  render: () => <InteractiveStatesComponent />,
};

const ResponsiveComponent = () => {
  const [states, setStates] = useState({
    mobile: true,
    tablet: false,
    desktop: true,
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Mobile Size (xs)
        </Typography>
        <Switch
          size="xs"
          label="Mobile Switch"
          description="Optimized for mobile devices"
          checked={states.mobile}
          onChange={(e) => setStates((prev) => ({ ...prev, mobile: e.target.checked }))}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Tablet Size (md)
        </Typography>
        <Switch
          size="md"
          label="Tablet Switch"
          description="Optimized for tablet devices"
          checked={states.tablet}
          onChange={(e) => setStates((prev) => ({ ...prev, tablet: e.target.checked }))}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Desktop Size (lg)
        </Typography>
        <Switch
          size="lg"
          label="Desktop Switch"
          description="Optimized for desktop devices"
          checked={states.desktop}
          onChange={(e) => setStates((prev) => ({ ...prev, desktop: e.target.checked }))}
        />
      </Box>
    </Box>
  );
};

export const Responsive: Story = {
  render: () => <ResponsiveComponent />,
};

export const DensityModes: Story = {
  render: () => {

    return (
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'flex-start' }}>
        <DensityProvider defaultMode="compact">
          <Box sx={{ width: 200 }}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Compact (0.8x)
            </Typography>
            <Switch label="Compact Switch" description="Tighter spacing" />
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="normal">
          <Box sx={{ width: 200 }}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Normal (1.0x)
            </Typography>
            <Switch label="Normal Switch" description="Standard spacing" />
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="spacious">
          <Box sx={{ width: 200 }}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Spacious (1.25x)
            </Typography>
            <Switch label="Spacious Switch" description="Extra breathing room" />
          </Box>
        </DensityProvider>
      </Box>
    );
  },
};
