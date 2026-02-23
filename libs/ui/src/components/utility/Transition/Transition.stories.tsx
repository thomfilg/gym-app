import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Transition } from './Transition';
import type { TransitionVariant } from './Transition.types';

const meta: Meta<typeof Transition> = {
  title: 'Utility/Transition',
  component: Transition,
  tags: ['autodocs', 'component:Transition'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Flexible transition wrapper component with multiple animation variants including fade, slide, scale, and collapse.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Transition>;

const DemoCard = ({ title, description }: { title: string; description: string }) => (
  <Card sx={{ width: 300, mb: 2 }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

const FadeComponent = () => {
  const [show, setShow] = useState(true);

  return (
    <Box>
      <Button variant="contained" onClick={() => setShow(!show)} sx={{ mb: 3 }}>
        {show ? 'Hide' : 'Show'} with Fade
      </Button>

      <Transition variant="fade" in={show} timeout={300}>
        <DemoCard
          title="Fade Transition"
          description="This card fades in and out smoothly with opacity changes."
        />
      </Transition>
    </Box>
  );
};

export const Fade: Story = {
  render: () => <FadeComponent />,
};

const SlideComponent = () => {
  const [show, setShow] = useState(true);
  const [direction, setDirection] = useState<'up' | 'down' | 'left' | 'right'>('up');

  const directions = [
    { value: 'up', label: 'Slide Up' },
    { value: 'down', label: 'Slide Down' },
    { value: 'left', label: 'Slide Left' },
    { value: 'right', label: 'Slide Right' },
  ] as const;

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Button variant="contained" onClick={() => setShow(!show)}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </Box>

      <ButtonGroup variant="outlined" sx={{ mb: 3 }}>
        {directions.map(({ value, label }) => (
          <Button
            key={value}
            variant={direction === value ? 'contained' : 'outlined'}
            onClick={() => setDirection(value)}
            size="small"
          >
            {label}
          </Button>
        ))}
      </ButtonGroup>

      <Transition variant="slide" direction={direction} in={show} timeout={400}>
        <DemoCard
          title={`Slide ${direction.charAt(0).toUpperCase() + direction.slice(1)}`}
          description={`This card slides ${direction} with smooth motion.`}
        />
      </Transition>
    </Box>
  );
};

export const Slide: Story = {
  render: () => <SlideComponent />,
};

const ScaleComponent = () => {
  const [show, setShow] = useState(true);

  return (
    <Box>
      <Button variant="contained" onClick={() => setShow(!show)} sx={{ mb: 3 }}>
        {show ? 'Hide' : 'Show'} with Scale
      </Button>

      <Transition variant="scale" in={show} timeout={250}>
        <DemoCard
          title="Scale Transition"
          description="This card scales in and out from the center point with elastic easing."
        />
      </Transition>
    </Box>
  );
};

export const Scale: Story = {
  render: () => <ScaleComponent />,
};

const CollapseComponent = () => {
  const [show, setShow] = useState(true);

  return (
    <Box sx={{ width: 400 }}>
      <Button variant="contained" onClick={() => setShow(!show)} sx={{ mb: 3 }}>
        {show ? 'Collapse' : 'Expand'} Content
      </Button>

      <Paper sx={{ border: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ p: 2, borderBottom: show ? '1px solid' : 'none', borderColor: 'divider' }}>
          <Typography variant="h6">Always Visible Header</Typography>
        </Box>

        <Transition variant="collapse" in={show} timeout={300}>
          <Box sx={{ p: 2 }}>
            <Typography paragraph>
              This content collapses vertically, changing its height from 0 to auto. Perfect for
              expandable sections, FAQs, and accordion-style content.
            </Typography>
            <Typography>
              The collapse transition preserves the width while animating height, making it ideal
              for vertical space management.
            </Typography>
          </Box>
        </Transition>
      </Paper>
    </Box>
  );
};

export const Collapse: Story = {
  render: () => <CollapseComponent />,
};

const CustomTimingComponent = () => {
  const [show, setShow] = useState(true);
  const [duration, setDuration] = useState(500);
  const [delay, setDelay] = useState(0);

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Duration: {duration}ms, Delay: {delay}ms
        </Typography>
        <ButtonGroup size="small" sx={{ mb: 2 }}>
          <Button onClick={() => setDuration(200)}>Fast (200ms)</Button>
          <Button onClick={() => setDuration(500)}>Normal (500ms)</Button>
          <Button onClick={() => setDuration(1000)}>Slow (1000ms)</Button>
        </ButtonGroup>
        <ButtonGroup size="small" sx={{ mb: 2 }}>
          <Button onClick={() => setDelay(0)}>No Delay</Button>
          <Button onClick={() => setDelay(300)}>300ms Delay</Button>
          <Button onClick={() => setDelay(600)}>600ms Delay</Button>
        </ButtonGroup>
      </Box>

      <Button variant="contained" onClick={() => setShow(!show)} sx={{ mb: 3 }}>
        Toggle with Custom Timing
      </Button>

      <Transition variant="fade" in={show} timeout={duration} delay={delay}>
        <DemoCard
          title="Custom Timing"
          description={`Fades with ${duration}ms duration and ${delay}ms delay.`}
        />
      </Transition>
    </Box>
  );
};

export const CustomTiming: Story = {
  render: () => <CustomTimingComponent />,
};

const AllVariantsComponent = () => {
  const [activeVariants, setActiveVariants] = useState<Set<string>>(new Set(['fade']));

  const variants = [
    { name: 'fade', title: 'Fade', description: 'Smooth opacity transition' },
    { name: 'slide', title: 'Slide Up', description: 'Slides from bottom to top' },
    { name: 'scale', title: 'Scale', description: 'Scales from center point' },
    { name: 'grow', title: 'Grow', description: 'Similar to scale with different easing' },
    { name: 'zoom', title: 'Zoom', description: 'Sharp zoom effect' },
    { name: 'collapse', title: 'Collapse', description: 'Height-based transition' },
  ];

  const toggleVariant = (variant: string) => {
    setActiveVariants((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(variant)) {
        newSet.delete(variant);
      } else {
        newSet.add(variant);
      }
      return newSet;
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Toggle Different Transitions
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 4 }}>
        {variants.map(({ name, title }) => (
          <Button
            key={name}
            variant={activeVariants.has(name) ? 'contained' : 'outlined'}
            size="small"
            onClick={() => toggleVariant(name)}
          >
            {title}
          </Button>
        ))}
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 3,
          maxWidth: 1000,
        }}
      >
        {variants.map(({ name, title, description }) => (
          <Transition
            key={name}
            variant={name as TransitionVariant}
            direction={name === 'slide' ? 'up' : undefined}
            in={activeVariants.has(name)}
            timeout={400}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
                <Typography variant="caption" sx={{ mt: 2, display: 'block' }}>
                  Variant: {name}
                </Typography>
              </CardContent>
            </Card>
          </Transition>
        ))}
      </Box>
    </Box>
  );
};

export const AllVariants: Story = {
  render: () => <AllVariantsComponent />,
};

// Default story (basic)
export const Default: Story = {
  args: {
    children: (
      <DemoCard
        title="Default Transition"
        description="Basic fade transition with default settings."
      />
    ),
    in: true,
  },
};

// AllSizes story - different scale sizes
const AllSizesComponent = () => {
  const [show, setShow] = useState(true);
  const sizes = ['small', 'medium', 'large'];

  return (
    <Box>
      <Button variant="contained" onClick={() => setShow(!show)} sx={{ mb: 3 }}>
        Toggle All Sizes
      </Button>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {sizes.map((size, index) => (
          <Transition key={size} variant="scale" in={show} timeout={300 + index * 100}>
            <Card sx={{ width: size === 'small' ? 200 : size === 'medium' ? 300 : 400 }}>
              <CardContent>
                <Typography variant="h6">
                  {size.charAt(0).toUpperCase() + size.slice(1)} Size
                </Typography>
                <Typography variant="body2">Transition with {size} content sizing.</Typography>
              </CardContent>
            </Card>
          </Transition>
        ))}
      </Box>
    </Box>
  );
};

export const AllSizes: Story = {
  render: () => <AllSizesComponent />,
};

// AllStates story - different transition states
const AllStatesComponent = () => {
  const [states, setStates] = useState({
    entering: true,
    entered: true,
    exiting: false,
    exited: false,
  });

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Transition States
        </Typography>
        {Object.entries(states).map(([state, active]) => (
          <Button
            key={state}
            variant={active ? 'contained' : 'outlined'}
            size="small"
            onClick={() => setStates((prev) => ({ ...prev, [state]: !prev[state] }))}
            sx={{ mr: 1, mb: 1 }}
          >
            {state}
          </Button>
        ))}
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 2,
        }}
      >
        {Object.entries(states).map(([state, isActive]) => (
          <Transition key={state} variant="fade" in={isActive} timeout={400}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  {state.charAt(0).toUpperCase() + state.slice(1)}
                </Typography>
                <Typography variant="body2" color={isActive ? 'success.main' : 'text.secondary'}>
                  State: {isActive ? 'Active' : 'Inactive'}
                </Typography>
              </CardContent>
            </Card>
          </Transition>
        ))}
      </Box>
    </Box>
  );
};

export const AllStates: Story = {
  render: () => <AllStatesComponent />,
};

// InteractiveStates story - hover, focus, active states
const InteractiveStatesComponent = () => {
  const [show, setShow] = useState(true);

  return (
    <Box>
      <Button variant="contained" onClick={() => setShow(!show)} sx={{ mb: 3 }}>
        Toggle Interactive Content
      </Button>

      <Transition variant="slide" direction="up" in={show} timeout={400}>
        <Paper sx={{ p: 2, maxWidth: 400 }}>
          <Typography variant="h6" gutterBottom>
            Interactive States Demo
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              variant="outlined"
              sx={{
                '&:hover': { bgcolor: 'primary.light', color: 'white' },
                '&:focus': { outline: '2px solid', outlineColor: 'primary.main' },
                '&:active': { transform: 'scale(0.98)' },
              }}
            >
              Hover/Focus/Active Button
            </Button>

            <Button variant="contained" disabled>
              Disabled State
            </Button>

            <Button
              variant="text"
              sx={{
                '&:hover': {
                  bgcolor: 'action.hover',
                  transform: 'translateX(4px)',
                  transition: 'all 0.2s',
                },
              }}
            >
              Hover Transform
            </Button>
          </Box>
        </Paper>
      </Transition>
    </Box>
  );
};

export const InteractiveStates: Story = {
  render: () => <InteractiveStatesComponent />,
};

// Responsive story - different breakpoints
const ResponsiveComponent = () => {
  const [show, setShow] = useState(true);

  return (
    <Box>
      <Button variant="contained" onClick={() => setShow(!show)} sx={{ mb: 3 }}>
        Toggle Responsive Layout
      </Button>

      <Transition variant="grow" in={show} timeout={500}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr', // Mobile: single column
              sm: '1fr 1fr', // Tablet: two columns
              md: '1fr 1fr 1fr', // Desktop: three columns
            },
            gap: 2,
            maxWidth: '100%',
          }}
        >
          {['Mobile First', 'Tablet View', 'Desktop Layout'].map((title, index) => (
            <Card key={title}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {title}
                </Typography>
                <Typography variant="body2">
                  Content that adapts to different screen sizes using CSS Grid. Item {index + 1} of
                  responsive layout.
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Transition>
    </Box>
  );
};

export const Responsive: Story = {
  render: () => <ResponsiveComponent />,
};
