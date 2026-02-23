import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { DensityProvider } from '../../../utils/density';
import type { Step } from '.';
import { Stepper } from '.';

const meta: Meta<typeof Stepper> = {
  title: 'DataDisplay/Stepper',
  component: Stepper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Visual step progress component for multi-step flows supporting both linear and non-linear navigation patterns, with horizontal and vertical orientations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    steps: {
      control: 'object',
      description: 'Array of step configurations',
    },
    activeId: {
      control: 'text',
      description: 'ID of the currently active step',
    },
    completed: {
      control: 'object',
      description: 'Set of completed step IDs',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Display orientation',
    },
    variant: {
      control: 'select',
      options: ['linear', 'non-linear'],
      description: 'Navigation behavior',
    },
    clickable: {
      control: 'boolean',
      description: 'Enable step clicking',
    },
    onStepChange: {
      action: 'stepChanged',
      description: 'Step change callback',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSteps: Step[] = [
  { id: 'step1', label: 'Personal Information', description: 'Enter your basic details' },
  { id: 'step2', label: 'Address', description: 'Provide your address information' },
  { id: 'step3', label: 'Payment', description: 'Choose payment method' },
  { id: 'step4', label: 'Review', description: 'Review and confirm your order' },
];

export const Default: Story = {
  args: {
    steps: defaultSteps,
    activeId: 'step2',
    completed: new Set(['step1']),
  },
};

export const Horizontal: Story = {
  args: {
    steps: defaultSteps,
    activeId: 'step2',
    completed: new Set(['step1']),
    orientation: 'horizontal',
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 600 }}>
        <Story />
      </Box>
    ),
  ],
};

export const Vertical: Story = {
  args: {
    steps: defaultSteps,
    activeId: 'step2',
    completed: new Set(['step1']),
    orientation: 'vertical',
  },
  decorators: [
    (Story) => (
      <Box sx={{ height: 400 }}>
        <Story />
      </Box>
    ),
  ],
};

export const Linear: Story = {
  args: {
    steps: defaultSteps,
    activeId: 'step2',
    completed: new Set(['step1']),
    variant: 'linear',
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 600 }}>
        <Story />
      </Box>
    ),
  ],
};

export const NonLinear: Story = {
  args: {
    steps: defaultSteps,
    activeId: 'step2',
    completed: new Set(['step1']),
    variant: 'non-linear',
    clickable: true,
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 600 }}>
        <Story />
      </Box>
    ),
  ],
};

export const WithOptional: Story = {
  args: {
    steps: [
      { id: 'step1', label: 'Required Step', description: 'This step is required' },
      { id: 'step2', label: 'Optional Step', description: 'This step is optional', optional: true },
      { id: 'step3', label: 'Another Required', description: 'This step is required' },
    ],
    activeId: 'step2',
    completed: new Set(['step1']),
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 500 }}>
        <Story />
      </Box>
    ),
  ],
};

export const WithDisabled: Story = {
  args: {
    steps: [
      { id: 'step1', label: 'Available Step', description: 'You can access this' },
      { id: 'step2', label: 'Disabled Step', description: 'This step is disabled', disabled: true },
      { id: 'step3', label: 'Future Step', description: 'Complete previous steps first' },
    ],
    activeId: 'step1',
    completed: new Set(),
    variant: 'non-linear',
    clickable: true,
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 500 }}>
        <Story />
      </Box>
    ),
  ],
};

export const Completed: Story = {
  args: {
    steps: defaultSteps,
    activeId: 'step4',
    completed: new Set(['step1', 'step2', 'step3']),
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 600 }}>
        <Story />
      </Box>
    ),
  ],
};

export const CustomConnectors: Story = {
  args: {
    steps: defaultSteps,
    activeId: 'step3',
    completed: new Set(['step1', 'step2']),
    renderConnector: (from, to, state) => (
      <Box
        sx={{
          width: 100,
          height: 4,
          mx: 1,
          background: `linear-gradient(90deg, ${
            state.completed ? '#1976d2' : '#e0e0e0'
          } 0%, ${state.active ? '#1976d2' : '#e0e0e0'} 100%)`,
          borderRadius: 2,
        }}
      />
    ),
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 600 }}>
        <Story />
      </Box>
    ),
  ],
};

export const LongLabels: Story = {
  args: {
    steps: [
      {
        id: 'step1',
        label: 'Personal Information and Contact Details',
        description:
          'Enter your complete personal information including name, email, phone number and other contact details',
      },
      {
        id: 'step2',
        label: 'Billing and Shipping Address Information',
        description:
          'Provide detailed billing address and shipping address information for accurate delivery',
      },
      {
        id: 'step3',
        label: 'Payment Method Selection and Verification',
        description: 'Choose your preferred payment method and complete verification process',
      },
    ],
    activeId: 'step2',
    completed: new Set(['step1']),
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 700 }}>
        <Story />
      </Box>
    ),
  ],
};

export const MobileResponsive: Story = {
  args: {
    steps: defaultSteps,
    activeId: 'step2',
    completed: new Set(['step1']),
    orientation: 'vertical',
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 320, height: 400 }}>
        <Story />
      </Box>
    ),
  ],
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};

// Interactive example
export const Interactive = () => {
  const [activeId, setActiveId] = useState('step1');
  const [completed, setCompleted] = useState(new Set<string>());

  const handleStepChange = (stepId: string) => {
    setActiveId(stepId);

    // Auto-complete previous steps in linear mode
    const currentIndex = defaultSteps.findIndex((step) => step.id === stepId);
    const newCompleted = new Set(completed);

    for (let i = 0; i < currentIndex; i++) {
      newCompleted.add(defaultSteps[i].id);
    }

    setCompleted(newCompleted);
  };

  return (
    <Box sx={{ width: 600, p: 3 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Interactive Stepper
        </Typography>
        <Stepper
          steps={defaultSteps}
          activeId={activeId}
          completed={completed}
          variant="non-linear"
          clickable
          onStepChange={handleStepChange}
        />
      </Paper>

      <Box>
        <Typography variant="body2" gutterBottom>
          Current Step: <Chip label={activeId} size="small" />
        </Typography>
        <Typography variant="body2">
          Completed: {Array.from(completed).join(', ') || 'None'}
        </Typography>
      </Box>
    </Box>
  );
};

// Required story exports for validation
export const AllVariants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, p: 2 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Horizontal Linear
        </Typography>
        <Box sx={{ width: 600 }}>
          <Stepper
            steps={defaultSteps}
            activeId="step2"
            completed={new Set(['step1'])}
            orientation="horizontal"
            variant="linear"
          />
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Horizontal Non-Linear
        </Typography>
        <Box sx={{ width: 600 }}>
          <Stepper
            steps={defaultSteps}
            activeId="step2"
            completed={new Set(['step1'])}
            orientation="horizontal"
            variant="non-linear"
            clickable
          />
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Vertical Linear
        </Typography>
        <Box sx={{ height: 300 }}>
          <Stepper
            steps={defaultSteps}
            activeId="step2"
            completed={new Set(['step1'])}
            orientation="vertical"
            variant="linear"
          />
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Vertical Non-Linear
        </Typography>
        <Box sx={{ height: 300 }}>
          <Stepper
            steps={defaultSteps}
            activeId="step2"
            completed={new Set(['step1'])}
            orientation="vertical"
            variant="non-linear"
            clickable
          />
        </Box>
      </Box>
    </Box>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, p: 2 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Compact (3 steps)
        </Typography>
        <Box sx={{ width: 400 }}>
          <Stepper
            steps={defaultSteps.slice(0, 3)}
            activeId="step2"
            completed={new Set(['step1'])}
          />
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Standard (4 steps)
        </Typography>
        <Box sx={{ width: 600 }}>
          <Stepper steps={defaultSteps} activeId="step2" completed={new Set(['step1'])} />
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Extended (6 steps)
        </Typography>
        <Box sx={{ width: 800 }}>
          <Stepper
            steps={[
              ...defaultSteps,
              { id: 'step5', label: 'Confirmation', description: 'Confirm your order' },
              { id: 'step6', label: 'Complete', description: 'Order completed' },
            ]}
            activeId="step3"
            completed={new Set(['step1', 'step2'])}
          />
        </Box>
      </Box>
    </Box>
  ),
};

export const AllStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, p: 2 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          All Step States
        </Typography>
        <Box sx={{ width: 700 }}>
          <Stepper
            steps={[
              { id: 'completed', label: 'Completed Step', description: 'This step is done' },
              { id: 'active', label: 'Active Step', description: 'Currently on this step' },
              {
                id: 'optional',
                label: 'Optional Step',
                description: 'This is optional',
                optional: true,
              },
              {
                id: 'disabled',
                label: 'Disabled Step',
                description: 'Cannot access this',
                disabled: true,
              },
              { id: 'pending', label: 'Pending Step', description: 'Not yet accessible' },
            ]}
            activeId="active"
            completed={new Set(['completed'])}
            variant="non-linear"
            clickable
          />
        </Box>
      </Box>
    </Box>
  ),
};

const InteractiveStatesComponent = () => {
  const [activeId, setActiveId] = useState('step2');
  const [completed] = useState(new Set(['step1']));

  return (
    <Box sx={{ width: 600, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Interactive States Demo
      </Typography>
      <Stepper
        steps={defaultSteps}
        activeId={activeId}
        completed={completed}
        variant="non-linear"
        clickable
        onStepChange={setActiveId}
      />
      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
        {defaultSteps.map((step) => (
          <Chip
            key={step.id}
            label={step.label}
            variant={activeId === step.id ? 'filled' : 'outlined'}
            color={completed.has(step.id) ? 'success' : 'default'}
            onClick={() => setActiveId(step.id)}
            size="small"
          />
        ))}
      </Box>
    </Box>
  );
};

export const InteractiveStates: Story = {
  render: () => <InteractiveStatesComponent />,
};

export const Responsive: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, p: 2 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Desktop (Horizontal)
        </Typography>
        <Box sx={{ width: '100%', minWidth: 600 }}>
          <Stepper
            steps={defaultSteps}
            activeId="step2"
            completed={new Set(['step1'])}
            orientation="horizontal"
          />
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Mobile (Vertical)
        </Typography>
        <Box sx={{ width: 320, height: 400 }}>
          <Stepper
            steps={defaultSteps}
            activeId="step2"
            completed={new Set(['step1'])}
            orientation="vertical"
          />
        </Box>
      </Box>
    </Box>
  ),
};

export const DensityModes: Story = {
  render: () => (
    <Stack direction="row" spacing={4} alignItems="flex-start">
      <DensityProvider defaultMode="compact">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Compact (0.8x)
          </Typography>
          <Stepper
            steps={defaultSteps.slice(0, 3)}
            activeId="step2"
            completed={new Set(['step1'])}
            orientation="vertical"
          />
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="normal">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Normal (1.0x)
          </Typography>
          <Stepper
            steps={defaultSteps.slice(0, 3)}
            activeId="step2"
            completed={new Set(['step1'])}
            orientation="vertical"
          />
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="spacious">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Spacious (1.25x)
          </Typography>
          <Stepper
            steps={defaultSteps.slice(0, 3)}
            activeId="step2"
            completed={new Set(['step1'])}
            orientation="vertical"
          />
        </Box>
      </DensityProvider>
    </Stack>
  ),
};
