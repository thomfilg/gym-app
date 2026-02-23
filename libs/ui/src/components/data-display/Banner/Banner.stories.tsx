import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Cookie, Payment,Security, Star, Update } from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DensityProvider } from '../../../utils/density';
import React from 'react';
import { fn } from 'storybook/test';

import { Banner } from './Banner';

const meta: Meta<typeof Banner> = {
  title: 'DataDisplay/Banner',
  component: Banner,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A page-level notification bar for system messages. Supports multiple variants, inline actions, dismissible functionality, and can be made sticky to affix to the top on scroll.',
      },
    },
  },
  tags: ['autodocs', 'component:Banner'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'critical'],
      description: 'Message severity type',
      table: {
        defaultValue: { summary: 'info' },
        type: { summary: 'string' },
      },
    },
    title: {
      control: { type: 'text' },
      description: 'Main message title text',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      control: { type: 'text' },
      description: 'Additional description text',
      table: {
        type: { summary: 'string' },
      },
    },
    dismissible: {
      control: { type: 'boolean' },
      description: 'Whether banner can be dismissed',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    sticky: {
      control: { type: 'boolean' },
      description: 'Affix banner to top on scroll',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Span container or full viewport width',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    title: 'System Notice',
    description: 'This is a default banner message.',
  },
  parameters: {
    layout: 'padded',
  },
};

export const InfoVariant: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    description: 'This is an informational banner with useful details.',
  },
  parameters: {
    layout: 'padded',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success!',
    description: 'Your action was completed successfully.',
  },
  parameters: {
    layout: 'padded',
  },
};

export const WarningVariant: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    description: 'Please review your settings before continuing.',
  },
  parameters: {
    layout: 'padded',
  },
};

export const Critical: Story = {
  args: {
    variant: 'critical',
    title: 'Critical Error',
    description: 'An error occurred that requires immediate attention.',
  },
  parameters: {
    layout: 'padded',
  },
};

// With custom icon
export const WithCustomIcon: Story = {
  args: {
    variant: 'info',
    icon: <Star />,
    title: 'Pro Tip',
    description: 'You can customize the banner icon to match your content.',
  },
  parameters: {
    layout: 'padded',
  },
};

// Dismissible banner
export const Dismissible: Story = {
  args: {
    variant: 'info',
    title: 'Notification',
    description: 'This banner can be closed by clicking the X button.',
    dismissible: true,
  },
  parameters: {
    layout: 'padded',
  },
};

// With actions
export const WithActions: Story = {
  args: {
    variant: 'info',
    title: 'System Update Available',
    description: 'A new version is available. Update now to get the latest features.',
    actions: [
      { label: 'Update Now', onClick: fn(), variant: 'primary' },
      { label: 'Remind Later', onClick: fn(), variant: 'secondary' },
    ],
    dismissible: true,
  },
  parameters: {
    layout: 'padded',
  },
};

// With multiple actions
export const MultipleActions: Story = {
  args: {
    variant: 'warning',
    title: 'Security Alert',
    description: 'Unusual activity detected on your account.',
    actions: [
      { label: 'Review Activity', onClick: fn(), variant: 'primary' },
      { label: 'Change Password', onClick: fn(), variant: 'secondary' },
      { label: 'Contact Support', onClick: fn(), variant: 'secondary' },
    ],
    dismissible: true,
  },
  parameters: {
    layout: 'padded',
  },
};

// Sticky banner
export const Sticky: Story = {
  render: () => (
    <Box>
      <Banner
        variant="warning"
        title="Important Notice"
        description="This banner will stick to the top when you scroll."
        sticky
        dismissible
      />
      <Container sx={{ mt: 2, minHeight: '200vh', py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Scroll Down to See Sticky Behavior
        </Typography>
        <Typography variant="body1" paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Typography>
        <Typography variant="body1" paragraph>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum.
        </Typography>
        <Typography variant="body1" paragraph>
          Continue scrolling to see the sticky banner remain at the top of the viewport.
        </Typography>
        {Array.from({ length: 20 }, (_, i) => (
          <Typography key={i} variant="body1" paragraph>
            Paragraph {i + 1}: More content to demonstrate scrolling behavior. The banner should
            remain visible and accessible at all times.
          </Typography>
        ))}
      </Container>
    </Box>
  ),
};

// Full width banner
export const FullWidth: Story = {
  args: {
    variant: 'info',
    title: 'Site-wide Announcement',
    description: 'This banner spans the full viewport width.',
    fullWidth: true,
    dismissible: true,
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <Stack spacing={2} sx={{ p: 2 }}>
      <Banner
        variant="info"
        title="Information"
        description="Informational message for users"
        dismissible
      />
      <Banner
        variant="success"
        title="Success"
        description="Operation completed successfully"
        dismissible
      />
      <Banner
        variant="warning"
        title="Warning"
        description="Please review before proceeding"
        dismissible
      />
      <Banner
        variant="critical"
        title="Critical Error"
        description="Immediate action required"
        dismissible
      />
    </Stack>
  ),
};

// Different content variations
export const ContentVariations: Story = {
  render: () => (
    <Stack spacing={2} sx={{ p: 2 }}>
      <Banner variant="info" title="Title Only Banner" />
      <Banner variant="success" description="Description only, no title provided" />
      <Banner variant="warning" title="With Custom Content">
        <Typography variant="body2" sx={{ mt: 1 }}>
          Custom content can be added as children to provide more flexibility in layout and styling.
        </Typography>
      </Banner>
      <Banner variant="info" title="Empty Content Test" description="" />
    </Stack>
  ),
};

// Real-world examples
const RealWorldExamplesComponent = () => {
  const [showCookie, setShowCookie] = React.useState(true);
  const [showMaintenance, setShowMaintenance] = React.useState(true);
  const [showPromo, setShowPromo] = React.useState(true);

  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      {showCookie && (
        <Banner
          variant="info"
          icon={<Cookie />}
          title="Cookie Notice"
          description="We use cookies to enhance your experience and provide personalized content."
          actions={[
            { label: 'Accept All', onClick: () => setShowCookie(false), variant: 'primary' },
            { label: 'Manage Preferences', onClick: fn(), variant: 'secondary' },
          ]}
          dismissible
          onDismiss={() => setShowCookie(false)}
        />
      )}

      {showMaintenance && (
        <Banner
          variant="warning"
          icon={<Update />}
          title="Scheduled Maintenance"
          description="System maintenance is scheduled for tonight from 2:00 AM to 4:00 AM EST."
          actions={[{ label: 'Learn More', onClick: fn(), variant: 'primary' }]}
          dismissible
          onDismiss={() => setShowMaintenance(false)}
        />
      )}

      {showPromo && (
        <Banner
          variant="success"
          icon={<Payment />}
          title="Special Offer!"
          description="Upgrade to Premium and save 50% for the first three months."
          actions={[
            { label: 'Upgrade Now', onClick: fn(), variant: 'primary' },
            { label: 'View Details', onClick: fn(), variant: 'secondary' },
          ]}
          dismissible
          onDismiss={() => setShowPromo(false)}
        />
      )}

      <Banner
        variant="critical"
        icon={<Security />}
        title="Security Alert"
        description="Please verify your identity to continue using the application."
        actions={[{ label: 'Verify Now', onClick: fn(), variant: 'primary' }]}
      />
    </Stack>
  );
};

export const RealWorldExamples: Story = {
  render: RealWorldExamplesComponent,
};

// Long content handling
export const LongContent: Story = {
  args: {
    variant: 'info',
    title: 'Terms of Service Update - Important Changes to Review',
    description:
      'We have updated our terms of service to better protect your privacy and improve our services. These changes include enhanced data protection measures, clearer explanations of how we use your information, new rights regarding your personal data, improved security protocols, and updated billing procedures. Please review the updated terms carefully as they affect your use of our services and may impact your account settings.',
    actions: [
      { label: 'Review Terms', onClick: fn(), variant: 'primary' },
      { label: 'Accept Changes', onClick: fn(), variant: 'secondary' },
    ],
    dismissible: true,
  },
  parameters: {
    layout: 'padded',
  },
};

// Accessibility showcase
export const AccessibilityFocus: Story = {
  render: () => (
    <Stack spacing={2} sx={{ p: 2 }}>
      <Typography variant="body2" gutterBottom>
        These banners are fully accessible with proper ARIA attributes and keyboard navigation
      </Typography>
      <Banner
        variant="info"
        title="Accessible Info Banner"
        description="This banner uses role='status' and aria-live='polite' for screen readers"
        dismissible
        actions={[{ label: 'Action Button', onClick: fn(), variant: 'primary' }]}
      />
      <Banner
        variant="critical"
        title="Urgent Critical Banner"
        description="This critical banner uses role='alert' and aria-live='assertive' for immediate announcement"
        dismissible
        actions={[{ label: 'Fix Issue', onClick: fn(), variant: 'primary' }]}
      />
    </Stack>
  ),
};

// Performance with multiple banners
export const MultipleBanners: Story = {
  render: () => (
    <Stack spacing={1} sx={{ p: 2 }}>
      {Array.from({ length: 8 }, (_, i) => (
        <Banner
          key={i}
          variant={(['info', 'success', 'warning', 'critical'] as const)[i % 4]}
          title={`Banner ${i + 1}`}
          description={`This is banner number ${i + 1} demonstrating performance with multiple instances`}
          dismissible={i % 2 === 0}
          actions={
            i % 3 === 0 ? [{ label: 'Action', onClick: fn(), variant: 'primary' }] : undefined
          }
        />
      ))}
    </Stack>
  ),
};

// Required story exports for validation
export const AllSizes: Story = {
  render: () => (
    <Stack spacing={2} sx={{ p: 2 }}>
      <Banner variant="info" title="Standard Banner" description="Standard size banner message" />
      <Banner
        variant="success"
        title="Success Banner"
        description="Standard size success message"
      />
      <Banner
        variant="warning"
        title="Warning Banner"
        description="Standard size warning message"
      />
    </Stack>
  ),
};

export const AllStates: Story = {
  render: () => (
    <Stack spacing={2} sx={{ p: 2 }}>
      <Banner variant="info" title="Info State" description="Information banner state" />
      <Banner variant="success" title="Success State" description="Success banner state" />
      <Banner variant="warning" title="Warning State" description="Warning banner state" />
      <Banner variant="critical" title="Critical State" description="Critical error banner state" />
    </Stack>
  ),
};

export const InteractiveStates: Story = {
  render: () => (
    <Stack spacing={2} sx={{ p: 2 }}>
      <Banner variant="info" title="Standard Banner" description="Non-interactive banner" />
      <Banner
        variant="success"
        title="Dismissible Banner"
        description="Click the X to close"
        dismissible
      />
      <Banner
        variant="warning"
        title="With Actions"
        description="Banner with action buttons"
        actions={[
          { label: 'Primary', onClick: fn(), variant: 'primary' },
          { label: 'Secondary', onClick: fn(), variant: 'secondary' },
        ]}
      />
      <Banner
        variant="critical"
        title="Full Interactive"
        description="Dismissible with actions"
        dismissible
        actions={[{ label: 'Fix Now', onClick: fn(), variant: 'primary' }]}
      />
    </Stack>
  ),
};

export const Responsive: Story = {
  render: () => (
    <Box>
      <Stack spacing={2} sx={{ p: 2 }}>
        <Banner
          variant="info"
          title="Responsive Banner"
          description="This banner adapts to different screen sizes and container widths"
          dismissible
          actions={[
            { label: 'Action One', onClick: fn(), variant: 'primary' },
            { label: 'Action Two', onClick: fn(), variant: 'secondary' },
          ]}
        />
        <Box sx={{ maxWidth: 600 }}>
          <Banner
            variant="success"
            title="Medium Container"
            description="Banner in a medium-width container"
            dismissible
            actions={[{ label: 'Action', onClick: fn(), variant: 'primary' }]}
          />
        </Box>
        <Box sx={{ maxWidth: 400 }}>
          <Banner
            variant="warning"
            title="Narrow Container"
            description="Banner in a narrow container adapts layout for mobile"
            dismissible
          />
        </Box>
        <Box sx={{ maxWidth: 300 }}>
          <Banner
            variant="critical"
            title="Very Narrow"
            description="Actions stack on mobile"
            actions={[
              { label: 'Fix', onClick: fn(), variant: 'primary' },
              { label: 'Later', onClick: fn(), variant: 'secondary' },
            ]}
            dismissible
          />
        </Box>
      </Stack>
    </Box>
  ),
};

export const DensityModes: Story = {
  render: () => {

    return (
      <Stack direction="row" spacing={4} alignItems="flex-start" sx={{ p: 2 }}>
        <DensityProvider defaultMode="compact">
          <Box sx={{ width: 300 }}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Compact (0.8x)
            </Typography>
            <Banner variant="info" title="Compact Banner" description="Tighter spacing" />
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="normal">
          <Box sx={{ width: 300 }}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Normal (1.0x)
            </Typography>
            <Banner variant="success" title="Normal Banner" description="Standard spacing" />
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="spacious">
          <Box sx={{ width: 300 }}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Spacious (1.25x)
            </Typography>
            <Banner variant="warning" title="Spacious Banner" description="Extra breathing room" />
          </Box>
        </DensityProvider>
      </Stack>
    );
  },
};
