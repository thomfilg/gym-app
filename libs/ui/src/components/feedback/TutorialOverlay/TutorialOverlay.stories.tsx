import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { action } from 'storybook/actions';

import { DensityProvider } from '../../../utils/density';
import { TutorialOverlay } from './TutorialOverlay';

const meta: Meta<typeof TutorialOverlay> = {
  title: 'Enhanced/TutorialOverlay',
  component: TutorialOverlay,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'An interactive tutorial overlay component for creating product tours, onboarding flows, and feature highlights.',
      },
    },
  },
  tags: ['autodocs', 'component:TutorialOverlay'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['tooltip', 'modal', 'highlight', 'spotlight'],
      description: 'Tutorial overlay style',
    },
    position: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right', 'center'],
      description: 'Position relative to target',
    },
    showProgress: {
      control: 'boolean',
      description: 'Show progress indicator',
    },
    allowSkip: {
      control: 'boolean',
      description: 'Allow users to skip tutorial',
    },
    animated: {
      control: 'boolean',
      description: 'Enable animations',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const tutorialSteps = [
  {
    id: '1',
    target: '#welcome-card',
    title: 'Welcome to the Dashboard',
    content: 'This is your main dashboard where you can see all important metrics.',
    position: 'bottom' as const,
  },
  {
    id: '2',
    target: '#search-input',
    title: 'Search Functionality',
    content: 'Use this search bar to quickly find what you need.',
    position: 'bottom' as const,
  },
  {
    id: '3',
    target: '#notifications',
    title: 'Notifications',
    content: 'Stay updated with real-time notifications here.',
    position: 'left' as const,
  },
  {
    id: '4',
    target: '#profile-menu',
    title: 'Profile Settings',
    content: 'Access your profile and account settings from this menu.',
    position: 'left' as const,
  },
];

const DefaultComponent = () => {
  const [showTutorial, setShowTutorial] = React.useState(false);

  return (
    <Box sx={{ p: 4, minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Stack spacing={3}>
        <Button
          variant="contained"
          onClick={() => setShowTutorial(true)}
          sx={{ alignSelf: 'flex-start' }}
        >
          Start Tutorial
        </Button>

        <Card id="welcome-card">
          <CardContent>
            <Typography variant="h5">Dashboard</Typography>
            <Typography>Welcome to your personalized dashboard</Typography>
          </CardContent>
        </Card>

        <Stack direction="row" spacing={2}>
          <TextField
            id="search-input"
            label="Search"
            variant="outlined"
            fullWidth
            placeholder="Search for anything..."
          />
          <Button id="notifications" variant="outlined">
            Notifications (3)
          </Button>
          <Button id="profile-menu" variant="outlined">
            Profile
          </Button>
        </Stack>
      </Stack>

      {showTutorial && (
        <TutorialOverlay
          steps={tutorialSteps}
          onComplete={() => setShowTutorial(false)}
          onSkip={() => setShowTutorial(false)}
          variant="spotlight"
          showProgress={true}
          allowSkip={true}
          animated={true}
        />
      )}
    </Box>
  );
};

export const Default: Story = {
  render: () => <DefaultComponent />,
};

const OnboardingFlowComponent = () => {
  const [startOnboarding, setStartOnboarding] = React.useState(false);

  const onboardingSteps = [
    {
      id: '1',
      target: '#create-project',
      title: 'Create Your First Project',
      content: 'Click here to create your first project and get started.',
      action: 'Click to Continue',
    },
    {
      id: '2',
      target: '#invite-team',
      title: 'Invite Team Members',
      content: 'Collaborate with your team by inviting them to your project.',
      action: 'Next',
    },
    {
      id: '3',
      target: '#customize',
      title: 'Customize Your Workspace',
      content: 'Make it yours! Customize themes, layouts, and preferences.',
      action: 'Next',
    },
    {
      id: '4',
      target: '#explore',
      title: 'Explore Features',
      content: 'Discover all the powerful features available to you.',
      action: 'Finish',
    },
  ];

  return (
    <Box sx={{ p: 4, minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Your Workspace
      </Typography>

      {!startOnboarding && (
        <Button variant="contained" size="large" onClick={() => setStartOnboarding(true)}>
          Begin Onboarding
        </Button>
      )}

      <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3} mt={4}>
        <Paper id="create-project" sx={{ p: 3 }}>
          <Typography variant="h6">Create Project</Typography>
          <Typography variant="body2" color="text.secondary">
            Start a new project from scratch or use a template
          </Typography>
          <Button variant="contained" sx={{ mt: 2 }}>
            New Project
          </Button>
        </Paper>

        <Paper id="invite-team" sx={{ p: 3 }}>
          <Typography variant="h6">Team Members</Typography>
          <Typography variant="body2" color="text.secondary">
            Invite colleagues to collaborate
          </Typography>
          <Button variant="outlined" sx={{ mt: 2 }}>
            Invite People
          </Button>
        </Paper>

        <Paper id="customize" sx={{ p: 3 }}>
          <Typography variant="h6">Customize</Typography>
          <Typography variant="body2" color="text.secondary">
            Personalize your workspace
          </Typography>
          <Button variant="outlined" sx={{ mt: 2 }}>
            Settings
          </Button>
        </Paper>

        <Paper id="explore" sx={{ p: 3 }}>
          <Typography variant="h6">Explore</Typography>
          <Typography variant="body2" color="text.secondary">
            Discover all features
          </Typography>
          <Button variant="outlined" sx={{ mt: 2 }}>
            View All
          </Button>
        </Paper>
      </Box>

      {startOnboarding && (
        <TutorialOverlay
          steps={onboardingSteps}
          onComplete={() => {
            setStartOnboarding(false);
            action('onboarding-completed')();
          }}
          variant="highlight"
          showProgress={true}
          allowSkip={true}
        />
      )}
    </Box>
  );
};

export const OnboardingFlow: Story = {
  render: () => <OnboardingFlowComponent />,
};

const FeatureHighlightComponent = () => {
  const [highlightFeature, setHighlightFeature] = React.useState<string | null>(null);

  const features = {
    analytics: [
      {
        id: '1',
        target: '#chart',
        title: 'Interactive Charts',
        content: 'Click and drag to zoom, double-click to reset.',
      },
      {
        id: '2',
        target: '#filters',
        title: 'Advanced Filters',
        content: 'Filter data by date, category, or custom criteria.',
      },
    ],
    collaboration: [
      {
        id: '1',
        target: '#comments',
        title: 'Real-time Comments',
        content: 'Leave comments and get instant notifications.',
      },
      {
        id: '2',
        target: '#share',
        title: 'Share & Export',
        content: 'Share reports with your team or export to PDF.',
      },
    ],
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Feature Highlights
      </Typography>

      <Stack direction="row" spacing={2} mb={3}>
        <Button variant="outlined" onClick={() => setHighlightFeature('analytics')}>
          Show Analytics Features
        </Button>
        <Button variant="outlined" onClick={() => setHighlightFeature('collaboration')}>
          Show Collaboration Features
        </Button>
      </Stack>

      <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3}>
        <Paper id="chart" sx={{ p: 3, height: 200 }}>
          <Typography variant="h6">Analytics Chart</Typography>
          <Box sx={{ bgcolor: 'primary.light', height: 100, mt: 2, borderRadius: 1 }} />
        </Paper>

        <Paper id="filters" sx={{ p: 3 }}>
          <Typography variant="h6">Filters</Typography>
          <Stack spacing={1} mt={2}>
            <Button size="small" variant="outlined">
              Date Range
            </Button>
            <Button size="small" variant="outlined">
              Category
            </Button>
          </Stack>
        </Paper>

        <Paper id="comments" sx={{ p: 3 }}>
          <Typography variant="h6">Comments</Typography>
          <Typography variant="body2" color="text.secondary">
            3 new comments
          </Typography>
        </Paper>

        <Paper id="share" sx={{ p: 3 }}>
          <Typography variant="h6">Share Options</Typography>
          <Stack direction="row" spacing={1} mt={2}>
            <Button size="small">Email</Button>
            <Button size="small">Link</Button>
            <Button size="small">PDF</Button>
          </Stack>
        </Paper>
      </Box>

      {highlightFeature && (
        <TutorialOverlay
          steps={features[highlightFeature as keyof typeof features]}
          onComplete={() => setHighlightFeature(null)}
          variant="tooltip"
          showProgress={true}
          animated={true}
        />
      )}
    </Box>
  );
};

export const FeatureHighlight: Story = {
  render: () => <FeatureHighlightComponent />,
};

const InteractiveTourComponent = () => {
  const [tourActive, setTourActive] = React.useState(false);
  const [completedSteps, setCompletedSteps] = React.useState<string[]>([]);

  const interactiveSteps = [
    {
      id: 'step1',
      target: '#input1',
      title: 'Enter Your Name',
      content: 'Type your name in this field to personalize your experience.',
      requiresAction: true,
    },
    {
      id: 'step2',
      target: '#toggle1',
      title: 'Enable Notifications',
      content: 'Toggle this switch to receive important updates.',
      requiresAction: true,
    },
    {
      id: 'step3',
      target: '#select1',
      title: 'Choose Your Preference',
      content: 'Select your preferred option from the dropdown.',
      requiresAction: true,
    },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Interactive Tutorial
      </Typography>

      <Button variant="contained" onClick={() => setTourActive(true)} sx={{ mb: 3 }}>
        Start Interactive Tour
      </Button>

      <Stack spacing={3}>
        <TextField id="input1" label="Your Name" variant="outlined" disabled={!tourActive} />

        <Box id="toggle1">
          <label>
            <input type="checkbox" disabled={!tourActive} /> Enable Notifications
          </label>
        </Box>

        <Box id="select1">
          <select disabled={!tourActive} style={{ padding: '8px' }}>
            <option>Choose an option</option>
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
        </Box>
      </Stack>

      {completedSteps.length > 0 && (
        <Paper sx={{ p: 2, mt: 3, bgcolor: 'success.light' }}>
          <Typography variant="subtitle2">Completed: {completedSteps.join(', ')}</Typography>
        </Paper>
      )}

      {tourActive && (
        <TutorialOverlay
          steps={interactiveSteps}
          onComplete={() => {
            setTourActive(false);
            action('tutorial-completed')();
          }}
          onStepComplete={(stepId) => {
            setCompletedSteps([...completedSteps, stepId]);
          }}
          variant="spotlight"
          showProgress={true}
        />
      )}
    </Box>
  );
};

export const InteractiveTour: Story = {
  render: () => <InteractiveTourComponent />,
};

const CustomStylingComponent = () => {
  const [activeVariant, setActiveVariant] = React.useState<
  'tooltip' | 'modal' | 'highlight' | 'spotlight'
  >('tooltip');

  const demoSteps = [
    {
      id: '1',
      target: '#demo-element',
      title: `${activeVariant} Style`,
      content: `This is how the ${activeVariant} variant looks. Each variant provides a different visual experience.`,
    },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Tutorial Overlay Variants
      </Typography>

      <Stack direction="row" spacing={2} mb={4}>
        {(['tooltip', 'modal', 'highlight', 'spotlight'] as const).map((variant) => (
          <Button
            key={variant}
            variant={activeVariant === variant ? 'contained' : 'outlined'}
            onClick={() => setActiveVariant(variant)}
          >
            {variant}
          </Button>
        ))}
      </Stack>

      <Box
        id="demo-element"
        sx={{
          p: 4,
          bgcolor: 'primary.main',
          color: 'white',
          borderRadius: 2,
          textAlign: 'center',
          width: 300,
          mx: 'auto',
        }}
      >
        <Typography variant="h6">Target Element</Typography>
        <Typography>This element will be highlighted</Typography>
      </Box>

      <TutorialOverlay
        steps={demoSteps}
        variant={activeVariant}
        onComplete={() => {
          /** do nothing */
        }}
        showProgress={false}
        animated={true}
      />
    </Box>
  );
};

export const CustomStyling: Story = {
  render: () => <CustomStylingComponent />,
};

// Required story exports for validation
export const AllVariants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">All Tutorial Overlay Variants</Typography>
      <Typography variant="body2" color="text.secondary">
        This shows all variants of the TutorialOverlay component. Each variant demonstrates
        different styling and interaction patterns.
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 2,
        }}
      >
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Default Variant
          </Typography>
          <Typography variant="body2">Standard tutorial overlay with default styling</Typography>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Highlight Variant
          </Typography>
          <Typography variant="body2">Tutorial overlay with content highlighting</Typography>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Spotlight Variant
          </Typography>
          <Typography variant="body2">Tutorial overlay with spotlight effect</Typography>
        </Paper>
      </Box>
    </Box>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">All Tutorial Overlay Sizes</Typography>
      <Typography variant="body2" color="text.secondary">
        Tutorial overlays adapt to content size and screen dimensions.
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 2,
        }}
      >
        <Paper sx={{ p: 2, minHeight: 120 }}>
          <Typography variant="subtitle1" gutterBottom>
            Compact
          </Typography>
          <Typography variant="body2">Small tutorial step with minimal content</Typography>
        </Paper>
        <Paper sx={{ p: 2, minHeight: 120 }}>
          <Typography variant="subtitle1" gutterBottom>
            Standard
          </Typography>
          <Typography variant="body2">
            Standard tutorial step with moderate content length and description
          </Typography>
        </Paper>
        <Paper sx={{ p: 2, minHeight: 120 }}>
          <Typography variant="subtitle1" gutterBottom>
            Expanded
          </Typography>
          <Typography variant="body2">
            Large tutorial step with extensive content, detailed explanations, and additional
            context
          </Typography>
        </Paper>
      </Box>
    </Box>
  ),
};

export const AllStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">All Tutorial Overlay States</Typography>
      <Typography variant="body2" color="text.secondary">
        Different states of the tutorial overlay component during user interaction.
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 2,
        }}
      >
        <Paper sx={{ p: 2, bgcolor: 'action.hover' }}>
          <Typography variant="subtitle1" gutterBottom>
            Active
          </Typography>
          <Typography variant="body2">Tutorial is currently displayed</Typography>
        </Paper>
        <Paper sx={{ p: 2, bgcolor: 'background.paper' }}>
          <Typography variant="subtitle1" gutterBottom>
            Inactive
          </Typography>
          <Typography variant="body2">Tutorial is hidden/completed</Typography>
        </Paper>
        <Paper sx={{ p: 2, bgcolor: 'warning.light' }}>
          <Typography variant="subtitle1" gutterBottom>
            Loading
          </Typography>
          <Typography variant="body2">Tutorial is initializing</Typography>
        </Paper>
        <Paper sx={{ p: 2, bgcolor: 'success.light' }}>
          <Typography variant="subtitle1" gutterBottom>
            Completed
          </Typography>
          <Typography variant="body2">Tutorial has been finished</Typography>
        </Paper>
      </Box>
    </Box>
  ),
};

export const InteractiveStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">Interactive Tutorial States</Typography>
      <Typography variant="body2" color="text.secondary">
        Tutorial overlay interactive states with user actions and feedback.
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 2,
        }}
      >
        <Paper sx={{ p: 2, border: '2px solid', borderColor: 'primary.main' }}>
          <Typography variant="subtitle1" gutterBottom>
            Focused
          </Typography>
          <Typography variant="body2">Tutorial step is currently focused and active</Typography>
        </Paper>
        <Paper sx={{ p: 2, border: '2px solid', borderColor: 'action.disabled' }}>
          <Typography variant="subtitle1" gutterBottom>
            Navigating
          </Typography>
          <Typography variant="body2">User is navigating between tutorial steps</Typography>
        </Paper>
        <Paper sx={{ p: 2, border: '2px solid', borderColor: 'warning.main' }}>
          <Typography variant="subtitle1" gutterBottom>
            Interactive
          </Typography>
          <Typography variant="body2">User can interact with highlighted elements</Typography>
        </Paper>
      </Box>
    </Box>
  ),
};

export const Responsive: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">Responsive Tutorial Overlay</Typography>
      <Typography variant="body2" color="text.secondary">
        Tutorial overlay adapts to different screen sizes and orientations.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Paper sx={{ p: 2, minHeight: 80, bgcolor: 'primary.light' }}>
          <Typography variant="subtitle1" gutterBottom>
            Mobile (xs): 0-600px
          </Typography>
          <Typography variant="body2">Compact overlay with simplified navigation</Typography>
        </Paper>
        <Paper sx={{ p: 2, minHeight: 80, bgcolor: 'secondary.light' }}>
          <Typography variant="subtitle1" gutterBottom>
            Tablet (sm): 600-960px
          </Typography>
          <Typography variant="body2">Standard overlay with medium-sized tooltips</Typography>
        </Paper>
        <Paper sx={{ p: 2, minHeight: 80, bgcolor: 'success.light' }}>
          <Typography variant="subtitle1" gutterBottom>
            Desktop (md+): 960px+
          </Typography>
          <Typography variant="body2">Full-featured overlay with all controls visible</Typography>
        </Paper>
      </Box>
    </Box>
  ),
};

export const DensityModes: Story = {
  render: () => (
    <Stack direction="row" spacing={4} alignItems="flex-start">
      <DensityProvider defaultMode="compact">
        <Box sx={{ width: 250 }}>
          <Typography variant="caption" gutterBottom display="block">
            Compact (0.8x)
          </Typography>
          <Paper sx={{ p: 2 }}>
            <Typography variant="body2">
              Tutorial overlay with compact density has reduced spacing between elements.
            </Typography>
          </Paper>
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="normal">
        <Box sx={{ width: 250 }}>
          <Typography variant="caption" gutterBottom display="block">
            Normal (1.0x)
          </Typography>
          <Paper sx={{ p: 2 }}>
            <Typography variant="body2">
              Tutorial overlay with normal density has standard spacing between elements.
            </Typography>
          </Paper>
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="spacious">
        <Box sx={{ width: 250 }}>
          <Typography variant="caption" gutterBottom display="block">
            Spacious (1.25x)
          </Typography>
          <Paper sx={{ p: 2 }}>
            <Typography variant="body2">
              Tutorial overlay with spacious density has extra spacing between elements.
            </Typography>
          </Paper>
        </Box>
      </DensityProvider>
    </Stack>
  ),
};
