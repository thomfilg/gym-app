import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Home as HomeIcon,
  LocalShipping as LocalShippingIcon,
  LocationOn as LocationOnIcon,
  Payment as PaymentIcon,
  Person as PersonIcon,
  ShoppingCart as ShoppingCartIcon
} from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { WorkflowStep } from './WorkflowStep';
import type { WorkflowStepItem } from './WorkflowStep.types';

const meta: Meta<typeof WorkflowStep> = {
  title: 'Enhanced/WorkflowStep',
  component: WorkflowStep,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An advanced workflow visualization component that displays multi-step processes with clear visual progression indicators. Supports multiple orientations, interactive navigation, and comprehensive accessibility features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    steps: {
      description: 'Array of step objects with title, description, status, and optional icons',
      control: 'object',
    },
    currentStep: {
      description: 'Index of the currently active step (0-based)',
      control: { type: 'number', min: 0 },
    },
    variant: {
      description: 'Visual style variant',
      control: { type: 'select' },
      options: ['default', 'minimal', 'outlined', 'filled'],
    },
    orientation: {
      description: 'Layout orientation',
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    color: {
      description: 'Theme color',
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'neutral'],
    },
    size: {
      description: 'Size of step indicators',
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    showProgress: {
      description: 'Whether to show progress bar between steps',
      control: 'boolean',
    },
    animated: {
      description: 'Enable transition animations',
      control: 'boolean',
    },
    interactive: {
      description: 'Allow clicking on steps to navigate',
      control: 'boolean',
    },
    showNumbers: {
      description: 'Show step numbers in indicators',
      control: 'boolean',
    },
    showIcons: {
      description: 'Show custom icons for each step',
      control: 'boolean',
    },
    disabled: {
      description: 'Disable all interactions',
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample step data
const basicSteps: WorkflowStepItem[] = [
  { title: 'Personal Information', description: 'Enter your basic details', status: 'completed' },
  { title: 'Address Details', description: 'Provide delivery address', status: 'current' },
  { title: 'Payment Method', description: 'Choose payment option', status: 'pending' },
  { title: 'Confirmation', description: 'Review and confirm order', status: 'pending' },
];

const iconSteps: WorkflowStepItem[] = [
  {
    title: 'Profile Setup',
    description: 'Complete your profile',
    status: 'completed',
    icon: <PersonIcon />
  },
  {
    title: 'Location',
    description: 'Set delivery address',
    status: 'current',
    icon: <LocationOnIcon />
  },
  {
    title: 'Payment',
    description: 'Add payment method',
    status: 'pending',
    icon: <PaymentIcon />
  },
  {
    title: 'Complete',
    description: 'Finish setup',
    status: 'pending',
    icon: <CheckCircleIcon />
  },
];

const orderTrackingSteps: WorkflowStepItem[] = [
  {
    title: 'Order Placed',
    description: 'Your order has been received',
    status: 'completed',
    icon: <ShoppingCartIcon />
  },
  {
    title: 'Processing',
    description: 'Order is being prepared',
    status: 'completed',
    icon: <PersonIcon />
  },
  {
    title: 'Shipped',
    description: 'Package is on its way',
    status: 'current',
    icon: <LocalShippingIcon />
  },
  {
    title: 'Delivered',
    description: 'Package has arrived',
    status: 'pending',
    icon: <HomeIcon />
  },
];

const errorSteps: WorkflowStepItem[] = [
  { title: 'Validation', description: 'Validate input data', status: 'completed' },
  { title: 'Processing', description: 'Process the request', status: 'error' },
  { title: 'Completion', description: 'Finalize the process', status: 'pending' },
];

export const Default: Story = {
  args: {
    steps: basicSteps,
    currentStep: 1,
  },
};

export const AllVariants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 800 }}>
      <Paper elevation={1} sx={{ p: 3 }}>
        <h3>Default Variant</h3>
        <WorkflowStep steps={basicSteps} currentStep={1} variant="default" />
      </Paper>

      <Paper elevation={1} sx={{ p: 3 }}>
        <h3>Minimal Variant</h3>
        <WorkflowStep steps={basicSteps} currentStep={1} variant="minimal" />
      </Paper>

      <Paper elevation={1} sx={{ p: 3 }}>
        <h3>Outlined Variant</h3>
        <WorkflowStep steps={basicSteps} currentStep={1} variant="outlined" />
      </Paper>

      <Paper elevation={1} sx={{ p: 3 }}>
        <h3>Filled Variant</h3>
        <WorkflowStep steps={basicSteps} currentStep={1} variant="filled" />
      </Paper>
    </Box>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 800 }}>
      <Paper elevation={1} sx={{ p: 3 }}>
        <h3>Extra Small (xs)</h3>
        <WorkflowStep steps={basicSteps} currentStep={1} size="xs" />
      </Paper>

      <Paper elevation={1} sx={{ p: 3 }}>
        <h3>Small (sm)</h3>
        <WorkflowStep steps={basicSteps} currentStep={1} size="sm" />
      </Paper>

      <Paper elevation={1} sx={{ p: 3 }}>
        <h3>Medium (md) - Default</h3>
        <WorkflowStep steps={basicSteps} currentStep={1} size="md" />
      </Paper>

      <Paper elevation={1} sx={{ p: 3 }}>
        <h3>Large (lg)</h3>
        <WorkflowStep steps={basicSteps} currentStep={1} size="lg" />
      </Paper>

      <Paper elevation={1} sx={{ p: 3 }}>
        <h3>Extra Large (xl)</h3>
        <WorkflowStep steps={basicSteps} currentStep={1} size="xl" />
      </Paper>
    </Box>
  ),
};

export const AllStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 800 }}>
      <Paper elevation={1} sx={{ p: 3 }}>
        <h3>Normal Progress</h3>
        <WorkflowStep steps={basicSteps} currentStep={1} />
      </Paper>

      <Paper elevation={1} sx={{ p: 3 }}>
        <h3>With Error State</h3>
        <WorkflowStep steps={errorSteps} currentStep={1} />
      </Paper>

      <Paper elevation={1} sx={{ p: 3 }}>
        <h3>All Completed</h3>
        <WorkflowStep
          steps={basicSteps.map(step => ({ ...step, status: 'completed' as const }))}
          currentStep={3}
        />
      </Paper>

      <Paper elevation={1} sx={{ p: 3 }}>
        <h3>Disabled State</h3>
        <WorkflowStep steps={basicSteps} currentStep={1} disabled />
      </Paper>
    </Box>
  ),
};

export const InteractiveStates: Story = {
  args: {
    steps: basicSteps,
    currentStep: 1,
    interactive: true,
    onStepClick: (stepIndex, step) => {
      // eslint-disable-next-line no-console
      console.log(`Clicked step ${stepIndex}:`, step.title);
    },
  },
};

export const WithIcons: Story = {
  args: {
    steps: iconSteps,
    currentStep: 1,
    showIcons: true,
    variant: 'filled',
  },
};

export const OrderTracking: Story = {
  args: {
    steps: orderTrackingSteps,
    currentStep: 2,
    showIcons: true,
    variant: 'outlined',
    color: 'success',
  },
};

export const VerticalOrientation: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 4, minHeight: 400 }}>
      <Paper elevation={1} sx={{ p: 3, flex: 1 }}>
        <h3>Vertical Default</h3>
        <WorkflowStep
          steps={iconSteps}
          currentStep={1}
          orientation="vertical"
          showIcons
        />
      </Paper>

      <Paper elevation={1} sx={{ p: 3, flex: 1 }}>
        <h3>Vertical Minimal</h3>
        <WorkflowStep
          steps={basicSteps}
          currentStep={1}
          orientation="vertical"
          variant="minimal"
        />
      </Paper>
    </Box>
  ),
};

export const ColorVariations: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 800 }}>
      {(['primary', 'secondary', 'success', 'warning', 'error'] as const).map((color) => (
        <Paper key={color} elevation={1} sx={{ p: 3 }}>
          <h3>{color.charAt(0).toUpperCase() + color.slice(1)} Color</h3>
          <WorkflowStep
            steps={basicSteps}
            currentStep={1}
            color={color}
            variant="filled"
          />
        </Paper>
      ))}
    </Box>
  ),
};

export const CustomIcons: Story = {
  args: {
    steps: iconSteps,
    currentStep: 1,
    showIcons: true,
    completedIcon: <CheckCircleIcon />,
    errorIcon: <ErrorIcon />,
    variant: 'outlined',
  },
};

export const WithoutProgress: Story = {
  args: {
    steps: basicSteps,
    currentStep: 1,
    showProgress: false,
    variant: 'minimal',
  },
};

export const WithoutNumbers: Story = {
  args: {
    steps: iconSteps,
    currentStep: 1,
    showNumbers: false,
    showIcons: true,
    variant: 'filled',
  },
};

export const LongContent: Story = {
  args: {
    steps: [
      {
        title: 'Very Long Step Title That Might Overflow',
        description: 'This is a very long description that demonstrates how the component handles text overflow and wrapping in different scenarios',
        status: 'completed' as const
      },
      {
        title: 'Another Long Title',
        description: 'More descriptive text that is quite lengthy',
        status: 'current' as const
      },
      {
        title: 'Final Step',
        description: 'Short desc',
        status: 'pending' as const
      },
    ],
    currentStep: 1,
  },
};

export const Responsive: Story = {
  render: () => (
    <Box>
      <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
        <h3>Desktop View (Horizontal)</h3>
        <Box sx={{ minWidth: 600 }}>
          <WorkflowStep steps={basicSteps} currentStep={1} />
        </Box>
      </Paper>

      <Paper elevation={1} sx={{ p: 3 }}>
        <h3>Mobile View (Vertical)</h3>
        <Box sx={{ maxWidth: 300 }}>
          <WorkflowStep
            steps={basicSteps}
            currentStep={1}
            orientation="vertical"
            size="sm"
          />
        </Box>
      </Paper>
    </Box>
  ),
};

export const GlassEffect: Story = {
  render: () => (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        p: 4,
        minHeight: 300,
        borderRadius: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: 2,
        }}
      >
        <h3 style={{ color: 'white', marginTop: 0 }}>Glass Morphism Effect</h3>
        <WorkflowStep
          steps={iconSteps}
          currentStep={1}
          showIcons
          variant="filled"
          color="secondary"
        />
      </Paper>
    </Box>
  ),
};