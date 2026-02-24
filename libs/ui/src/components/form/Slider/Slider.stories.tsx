import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { DensityProvider } from '../../../utils/density';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Form/Slider',
  component: Slider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs', 'component:Slider'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'range', 'marks', 'gradient'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'neutral'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
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
    min: 0,
    max: 100,
    defaultValue: 30,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Volume',
    showValue: true,
    unit: '%',
    defaultValue: 50,
  },
};

const VariantsComponent = () => {
  const [values, setValues] = useState({
    default: 30,
    range: [20, 70],
    marks: 50,
    gradient: 80,
  });

  const marks = [
    { value: 0, label: '0°C' },
    { value: 20, label: '20°C' },
    { value: 37, label: '37°C' },
    { value: 100, label: '100°C' },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, px: 2 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Default
        </Typography>
        <Slider
          variant="default"
          label="Temperature"
          showValue
          unit="°C"
          value={values.default}
          onChange={(e, newValue) => setValues((prev) => ({ ...prev, default: newValue }))}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Range
        </Typography>
        <Slider
          variant="range"
          label="Price Range"
          showValue
          unit="$"
          value={values.range}
          onChange={(e, newValue) => setValues((prev) => ({ ...prev, range: newValue }))}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          With Marks
        </Typography>
        <Slider
          variant="marks"
          label="Temperature Scale"
          showValue
          customMarks={marks}
          value={values.marks}
          onChange={(e, newValue) => setValues((prev) => ({ ...prev, marks: newValue }))}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Gradient
        </Typography>
        <Slider
          variant="gradient"
          gradient
          label="Intensity"
          showValue
          unit="%"
          color="secondary"
          value={values.gradient}
          onChange={(e, newValue) => setValues((prev) => ({ ...prev, gradient: newValue }))}
        />
      </Box>
    </Box>
  );
};

export const Variants: Story = {
  render: () => <VariantsComponent />,
};

const ColorsComponent = () => {
  const [value, setValue] = useState(50);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, px: 2 }}>
      {['primary', 'secondary', 'success', 'warning', 'danger', 'neutral'].map((color) => (
        <Box key={color}>
          <Slider
            color={color}
            label={`${color.charAt(0).toUpperCase() + color.slice(1)} Slider`}
            showValue
            unit="%"
            value={value}
            onChange={(e, newValue) => setValue(newValue)}
          />
        </Box>
      ))}
    </Box>
  );
};

export const Colors: Story = {
  render: () => <ColorsComponent />,
};

const SizesComponent = () => {
  const [value, setValue] = useState(50);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, px: 2 }}>
      {['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
        <Box key={size}>
          <Slider
            size={size}
            label={`Size: ${size.toUpperCase()}`}
            showValue
            unit="%"
            value={value}
            onChange={(e, newValue) => setValue(newValue)}
          />
        </Box>
      ))}
    </Box>
  );
};

export const Sizes: Story = {
  render: () => <SizesComponent />,
};

const SpecialEffectsComponent = () => {
  const [values, setValues] = useState({
    glass: 60,
    gradient: 75,
    glow: 40,
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, px: 2 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Glass Morphism
        </Typography>
        <Slider
          glass
          label="Glass Effect"
          showValue
          unit="%"
          value={values.glass}
          onChange={(e, newValue) => setValues((prev) => ({ ...prev, glass: newValue }))}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Gradient
        </Typography>
        <Slider
          gradient
          color="secondary"
          label="Gradient Colors"
          showValue
          unit="%"
          value={values.gradient}
          onChange={(e, newValue) => setValues((prev) => ({ ...prev, gradient: newValue }))}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Glow Effect
        </Typography>
        <Slider
          glow
          color="success"
          label="Glowing Slider"
          showValue
          unit="%"
          value={values.glow}
          onChange={(e, newValue) => setValues((prev) => ({ ...prev, glow: newValue }))}
        />
      </Box>
    </Box>
  );
};

export const SpecialEffects: Story = {
  render: () => <SpecialEffectsComponent />,
};

export const Playground: Story = {
  args: {
    label: 'Playground Slider',
    showValue: true,
    unit: '%',
    variant: 'default',
    color: 'primary',
    size: 'md',
    min: 0,
    max: 100,
    defaultValue: 50,
    glass: false,
    gradient: false,
    glow: false,
  },
};

// Required exports for validation
export const AllVariants: Story = {
  render: () => <VariantsComponent />,
};

export const AllSizes: Story = {
  render: () => <SizesComponent />,
};

const AllStatesComponent = () => {
  const [value, setValue] = useState(50);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, px: 2 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Default State
        </Typography>
        <Slider
          label="Normal Slider"
          showValue
          unit="%"
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Disabled State
        </Typography>
        <Slider label="Disabled Slider" showValue unit="%" value={30} disabled />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Focus State
        </Typography>
        <Slider
          label="Focus Slider (click to focus)"
          showValue
          unit="%"
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          autoFocus
        />
      </Box>
    </Box>
  );
};

export const AllStates: Story = {
  render: () => <AllStatesComponent />,
};

const InteractiveStatesComponent = () => {
  const [value, setValue] = useState(50);
  const [hoverValue, setHoverValue] = useState(25);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, px: 2 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Interactive Normal
        </Typography>
        <Slider
          label="Click and drag to interact"
          showValue
          unit="%"
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Hover Effects
        </Typography>
        <Slider
          label="Hover to see effects"
          showValue
          unit="%"
          value={hoverValue}
          onChange={(e, newValue) => setHoverValue(newValue)}
          glow
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Interactive Range
        </Typography>
        <Slider
          variant="range"
          label="Range interaction"
          showValue
          unit="%"
          defaultValue={[20, 80]}
        />
      </Box>
    </Box>
  );
};

export const InteractiveStates: Story = {
  render: () => <InteractiveStatesComponent />,
};

const ResponsiveComponent = () => {
  const [value, setValue] = useState(50);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, px: { xs: 1, sm: 2, md: 3 } }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Mobile Responsive
        </Typography>
        <Slider
          label="Mobile friendly"
          showValue
          unit="%"
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          size="sm"
          sx={{ display: { xs: 'block', md: 'none' } }}
        />
        <Slider
          label="Desktop version"
          showValue
          unit="%"
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          size="lg"
          sx={{ display: { xs: 'none', md: 'block' } }}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Adaptive Sizing
        </Typography>
        <Slider
          label="Responsive size"
          showValue
          unit="%"
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          size="md"
        />
      </Box>
    </Box>
  );
};

export const Responsive: Story = {
  render: () => <ResponsiveComponent />,
};

export const DensityModes: Story = {
  render: () => (
    <Stack direction="row" spacing={4} alignItems="flex-start">
      <DensityProvider defaultMode="compact">
        <Box sx={{ width: 200 }}>
          <Typography variant="caption" gutterBottom display="block">
            Compact (0.8x)
          </Typography>
          <Slider defaultValue={50} label="Volume" />
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="normal">
        <Box sx={{ width: 200 }}>
          <Typography variant="caption" gutterBottom display="block">
            Normal (1.0x)
          </Typography>
          <Slider defaultValue={50} label="Volume" />
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="spacious">
        <Box sx={{ width: 200 }}>
          <Typography variant="caption" gutterBottom display="block">
            Spacious (1.25x)
          </Typography>
          <Slider defaultValue={50} label="Volume" />
        </Box>
      </DensityProvider>
    </Stack>
  ),
};
