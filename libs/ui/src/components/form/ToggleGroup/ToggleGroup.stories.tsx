import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Bookmark,
  Heart,
  Italic,
  List,
  ListOrdered,
  Monitor,
  Moon,
  Pause,
  Play,
  Quote,
  SkipBack,
  SkipForward,
  Star,
  Sun,
  Underline,
} from 'lucide-react';
import { useState } from 'react';

import { DensityProvider } from '../../../utils/density';
import { ToggleGroup } from './ToggleGroup';

const meta: Meta<typeof ToggleGroup> = {
  title: 'Form/ToggleGroup',
  component: ToggleGroup,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs', 'component:ToggleGroup'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['single', 'multiple', 'exclusive'],
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

const formatOptions = [
  { value: 'bold', label: 'Bold', icon: <Bold size={16} /> },
  { value: 'italic', label: 'Italic', icon: <Italic size={16} /> },
  { value: 'underline', label: 'Underline', icon: <Underline size={16} /> },
];

const alignOptions = [
  { value: 'left', label: 'Left', icon: <AlignLeft size={16} /> },
  { value: 'center', label: 'Center', icon: <AlignCenter size={16} /> },
  { value: 'right', label: 'Right', icon: <AlignRight size={16} /> },
];

const listOptions = [
  { value: 'bullet', label: 'Bullets', icon: <List size={16} /> },
  { value: 'numbered', label: 'Numbers', icon: <ListOrdered size={16} /> },
  { value: 'quote', label: 'Quote', icon: <Quote size={16} /> },
];

const themeOptions = [
  { value: 'light', label: 'Light', icon: <Sun size={16} /> },
  { value: 'dark', label: 'Dark', icon: <Moon size={16} /> },
  { value: 'system', label: 'System', icon: <Monitor size={16} /> },
];

const mediaOptions = [
  { value: 'previous', label: '', icon: <SkipBack size={16} /> },
  { value: 'play', label: '', icon: <Play size={16} /> },
  { value: 'pause', label: '', icon: <Pause size={16} /> },
  { value: 'next', label: '', icon: <SkipForward size={16} /> },
];

const actionOptions = [
  { value: 'like', label: 'Like', icon: <Heart size={16} /> },
  { value: 'star', label: 'Star', icon: <Star size={16} /> },
  { value: 'bookmark', label: 'Save', icon: <Bookmark size={16} /> },
];

export const Default: Story = {
  args: {
    variant: 'single',
    color: 'primary',
    size: 'md',
    options: alignOptions,
  },
};

const VariantsComponent = () => {
  const [singleValue, setSingleValue] = useState<string>('');
  const [multipleValue, setMultipleValue] = useState<string[]>([]);
  const [exclusiveValue, setExclusiveValue] = useState<string>('');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Single Selection
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Only one option can be selected at a time
        </Typography>
        <ToggleGroup
          variant="single"
          options={alignOptions}
          value={singleValue}
          onChange={(event, value) => setSingleValue(value || '')}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Multiple Selection
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Multiple options can be selected
        </Typography>
        <ToggleGroup
          variant="multiple"
          color="secondary"
          options={formatOptions}
          value={multipleValue}
          onChange={(event, value) => setMultipleValue(value || [])}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Exclusive Selection
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Exactly one option must be selected
        </Typography>
        <ToggleGroup
          variant="exclusive"
          color="success"
          options={themeOptions}
          value={exclusiveValue}
          onChange={(event, value) => setExclusiveValue(value || themeOptions[0].value)}
        />
      </Box>
    </Box>
  );
};

export const Variants: Story = {
  render: () => <VariantsComponent />,
};

const ColorsComponent = () => {
  const [values, setValues] = useState({
    primary: '',
    secondary: '',
    success: '',
    warning: '',
    danger: '',
    neutral: '',
  });

  const colors = ['primary', 'secondary', 'success', 'warning', 'danger', 'neutral'];

  return (
    <Box
      sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 3 }}
    >
      {colors.map((color) => (
        <Box key={color}>
          <Typography variant="h6" gutterBottom sx={{ textTransform: 'capitalize' }}>
            {color}
          </Typography>
          <ToggleGroup
            color={color}
            options={alignOptions}
            value={values[color]}
            onChange={(event, value) => setValues((prev) => ({ ...prev, [color]: value || '' }))}
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
  const [values, setValues] = useState({
    xs: '',
    sm: '',
    md: '',
    lg: '',
    xl: '',
  });

  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {sizes.map((size) => (
        <Box key={size}>
          <Typography variant="h6" gutterBottom>
            Size: {size.toUpperCase()}
          </Typography>
          <ToggleGroup
            size={size}
            options={formatOptions}
            value={values[size]}
            onChange={(event, value) => setValues((prev) => ({ ...prev, [size]: value || '' }))}
          />
        </Box>
      ))}
    </Box>
  );
};

export const Sizes: Story = {
  render: () => <SizesComponent />,
};

const IconOnlyComponent = () => {
  const [mediaValue, setMediaValue] = useState('');

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Media Controls
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Icon-only toggle group for media controls
      </Typography>
      <ToggleGroup
        options={mediaOptions}
        value={mediaValue}
        onChange={(event, value) => setMediaValue(value || '')}
        color="secondary"
        size="lg"
      />
    </Box>
  );
};

export const IconOnly: Story = {
  render: () => <IconOnlyComponent />,
};

const WithLabelsComponent = () => {
  const [listValue, setListValue] = useState('');

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        List Formatting
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Toggle group with icons and labels
      </Typography>
      <ToggleGroup
        options={listOptions}
        value={listValue}
        onChange={(event, value) => setListValue(value || '')}
        color="warning"
        size="md"
      />
    </Box>
  );
};

export const WithLabels: Story = {
  render: () => <WithLabelsComponent />,
};

const SpecialEffectsComponent = () => {
  const [values, setValues] = useState({
    glass: '',
    gradient: '',
    combined: '',
  });

  return (
    <Box
      sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3 }}
    >
      <Box>
        <Typography variant="h6" gutterBottom>
          Glass Morphism
        </Typography>
        <ToggleGroup
          glass
          options={themeOptions}
          value={values.glass}
          onChange={(event, value) => setValues((prev) => ({ ...prev, glass: value || '' }))}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Gradient
        </Typography>
        <ToggleGroup
          gradient
          color="secondary"
          options={alignOptions}
          value={values.gradient}
          onChange={(event, value) => setValues((prev) => ({ ...prev, gradient: value || '' }))}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Combined Effects
        </Typography>
        <ToggleGroup
          glass
          gradient
          glow
          color="success"
          size="lg"
          options={actionOptions}
          value={values.combined}
          onChange={(event, value) => setValues((prev) => ({ ...prev, combined: value || '' }))}
        />
      </Box>
    </Box>
  );
};

export const SpecialEffects: Story = {
  render: () => <SpecialEffectsComponent />,
};

const MultipleSelectionComponent = () => {
  const [formatValue, setFormatValue] = useState(['bold']);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Text Formatting
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Multiple formatting options can be active simultaneously
      </Typography>
      <ToggleGroup
        variant="multiple"
        options={formatOptions}
        value={formatValue}
        onChange={(event, value) => setFormatValue(value || [])}
        color="primary"
        size="md"
      />

      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Selected: {formatValue.join(', ') || 'None'}
        </Typography>
      </Box>
    </Box>
  );
};

export const MultipleSelection: Story = {
  render: () => <MultipleSelectionComponent />,
};

const WithDisabledOptionsComponent = () => {
  const [value, setValue] = useState('');

  const optionsWithDisabled = [
    { value: 'option1', label: 'Available', icon: <Star size={16} /> },
    { value: 'option2', label: 'Disabled', icon: <Heart size={16} />, disabled: true },
    { value: 'option3', label: 'Available', icon: <Bookmark size={16} /> },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        With Disabled Options
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Some options can be disabled
      </Typography>
      <ToggleGroup
        options={optionsWithDisabled}
        value={value}
        onChange={(event, value) => setValue(value || '')}
        color="danger"
      />
    </Box>
  );
};

export const WithDisabledOptions: Story = {
  render: () => <WithDisabledOptionsComponent />,
};

export const Playground: Story = {
  args: {
    variant: 'single',
    color: 'primary',
    size: 'md',
    options: formatOptions,
    glass: false,
    gradient: false,
    glow: false,
  },
};

// Required story exports for validation
export const AllVariants: Story = {
  render: () => <VariantsComponent />,
};

export const AllSizes: Story = {
  render: () => <SizesComponent />,
};

const StatesComponent = () => {
  const [normalValue, setNormalValue] = useState('center');
  const [disabledValue, setDisabledValue] = useState('');
  const [glasValue, setGlasValue] = useState('');
  const [gradientValue, setGradientValue] = useState('left');

  const disabledOptions = alignOptions.map((opt) => ({ ...opt, disabled: true }));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Normal State
        </Typography>
        <ToggleGroup
          options={alignOptions}
          value={normalValue}
          onChange={(event, value) => setNormalValue(value || '')}
          color="primary"
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Disabled State
        </Typography>
        <ToggleGroup
          options={disabledOptions}
          value={disabledValue}
          onChange={(event, value) => setDisabledValue(value || '')}
          color="secondary"
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Glass Effect State
        </Typography>
        <ToggleGroup
          glass
          options={themeOptions}
          value={glasValue}
          onChange={(event, value) => setGlasValue(value || '')}
          color="success"
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Gradient State
        </Typography>
        <ToggleGroup
          gradient
          options={alignOptions}
          value={gradientValue}
          onChange={(event, value) => setGradientValue(value || '')}
          color="warning"
        />
      </Box>
    </Box>
  );
};

export const AllStates: Story = {
  render: () => <StatesComponent />,
};

const InteractiveComponent = () => {
  const [hoverValue, setHoverValue] = useState('');
  const [focusValue, setFocusValue] = useState('left');
  const [activeValue, setActiveValue] = useState(['bold', 'italic']);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Hover & Focus States
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Hover over options to see hover effects
        </Typography>
        <ToggleGroup
          options={alignOptions}
          value={hoverValue}
          onChange={(event, value) => setHoverValue(value || '')}
          color="primary"
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Pre-selected (Active)
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Some options are pre-selected
        </Typography>
        <ToggleGroup
          variant="single"
          options={alignOptions}
          value={focusValue}
          onChange={(event, value) => setFocusValue(value || '')}
          color="secondary"
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Multiple Active States
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Multiple options can be active simultaneously
        </Typography>
        <ToggleGroup
          variant="multiple"
          options={formatOptions}
          value={activeValue}
          onChange={(event, value) => setActiveValue(value || [])}
          color="success"
        />
      </Box>
    </Box>
  );
};

export const InteractiveStates: Story = {
  render: () => <InteractiveComponent />,
};

const ResponsiveComponent = () => {
  const [mobileValue, setMobileValue] = useState('');
  const [tabletValue, setTabletValue] = useState(['bold']);
  const [desktopValue, setDesktopValue] = useState('center');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Mobile Layout (Small)
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Compact size with touch-friendly targets
        </Typography>
        <ToggleGroup
          size="sm"
          options={mediaOptions}
          value={mobileValue}
          onChange={(event, value) => setMobileValue(value || '')}
          color="primary"
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Tablet Layout (Medium)
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Medium size with balanced spacing
        </Typography>
        <ToggleGroup
          variant="multiple"
          size="md"
          options={formatOptions}
          value={tabletValue}
          onChange={(event, value) => setTabletValue(value || [])}
          color="secondary"
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Desktop Layout (Large)
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Large size with comfortable spacing for mouse interaction
        </Typography>
        <ToggleGroup
          size="lg"
          options={alignOptions}
          value={desktopValue}
          onChange={(event, value) => setDesktopValue(value || '')}
          color="success"
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
    const items = [
      { value: 'left', icon: <AlignLeft size={16} /> },
      { value: 'center', icon: <AlignCenter size={16} /> },
      { value: 'right', icon: <AlignRight size={16} /> },
    ];

    return (
      <Stack direction="row" spacing={4} alignItems="flex-start">
        <DensityProvider defaultMode="compact">
          <Box>
            <Typography variant="caption" gutterBottom display="block">
              Compact (0.8x)
            </Typography>
            <ToggleGroup items={items} defaultValue="center" type="single" />
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="normal">
          <Box>
            <Typography variant="caption" gutterBottom display="block">
              Normal (1.0x)
            </Typography>
            <ToggleGroup items={items} defaultValue="center" type="single" />
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="spacious">
          <Box>
            <Typography variant="caption" gutterBottom display="block">
              Spacious (1.25x)
            </Typography>
            <ToggleGroup items={items} defaultValue="center" type="single" />
          </Box>
        </DensityProvider>
      </Stack>
    );
  },
};
