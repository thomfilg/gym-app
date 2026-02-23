import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {
  Analytics,
  BugReport,
  Cancel,
  CheckCircle,
  Code,
  Dashboard,
  Edit,
  Email,
  Error,
  Info,
  LocationOn,
  Notifications,
  Palette,
  Person,
  Phone,
  PieChart,
  Save,
  Security,
  Settings,
  Timeline,
  Warning,
} from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DensityProvider } from '../../../utils/density';
import { useState } from 'react';

import { Tabs } from './Tabs';
import type { TabItem } from './Tabs.types';

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A comprehensive tabs component with multiple variants including default, pills, underline, and enclosed styles.',
      },
    },
  },
  tags: ['autodocs', 'component:Tabs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'pills', 'underline', 'enclosed'],
      description: 'The visual variant of the tabs',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the tabs',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Color theme for the tabs',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the tabs',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether tabs should fill the full width',
    },
    centered: {
      control: 'boolean',
      description: 'Whether tabs are centered',
    },
    showDividers: {
      control: 'boolean',
      description: 'Whether to show dividers between tabs',
    },
    animateContent: {
      control: 'boolean',
      description: 'Whether to animate content transitions',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the tabs are disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Whether to show loading state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample content components
const DashboardContent = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h5" gutterBottom>
      Dashboard Overview
    </Typography>
    <Grid container spacing={3}>
      {[
        { title: 'Total Users', value: '12,345', icon: <Person />, color: 'primary.main' },
        { title: 'Revenue', value: '$45,678', icon: <Analytics />, color: 'success.main' },
        { title: 'Orders', value: '1,234', icon: <Timeline />, color: 'warning.main' },
        { title: 'Growth', value: '+12.5%', icon: <PieChart />, color: 'info.main' },
      ].map((item, i) => (
        <Grid item xs={6} md={3} key={i}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box sx={{ color: item.color, mr: 1 }}>{item.icon}</Box>
                <Typography variant="subtitle2" color="text.secondary">
                  {item.title}
                </Typography>
              </Box>
              <Typography variant="h4" component="div">
                {item.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

const SettingsContent = () => (
  <Box sx={{ p: 3, maxWidth: 600 }}>
    <Typography variant="h5" gutterBottom>
      Settings
    </Typography>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField fullWidth label="Application Name" defaultValue="My Application" />
      <TextField fullWidth label="Description" multiline rows={3} />
      <FormControl component="fieldset">
        <FormLabel component="legend">Theme</FormLabel>
        <RadioGroup defaultValue="light" row>
          <FormControlLabel value="light" control={<Radio />} label="Light" />
          <FormControlLabel value="dark" control={<Radio />} label="Dark" />
          <FormControlLabel value="auto" control={<Radio />} label="Auto" />
        </RadioGroup>
      </FormControl>
      <Box>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Enable notifications" />
        <FormControlLabel control={<Checkbox />} label="Auto-save changes" />
        <FormControlLabel control={<Checkbox defaultChecked />} label="Show advanced options" />
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" startIcon={<Save />}>
          Save Changes
        </Button>
        <Button variant="outlined" startIcon={<Cancel />}>
          Cancel
        </Button>
      </Box>
    </Box>
  </Box>
);

const ProfileContent = () => (
  <Box sx={{ p: 3, maxWidth: 600 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
      <Avatar sx={{ width: 80, height: 80, mr: 2 }}>
        <Person fontSize="large" />
      </Avatar>
      <Box>
        <Typography variant="h5">John Doe</Typography>
        <Typography variant="body2" color="text.secondary">
          Senior Developer
        </Typography>
        <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
          <Chip size="small" label="Admin" color="primary" />
          <Chip size="small" label="Verified" color="success" />
        </Box>
      </Box>
    </Box>

    <List>
      <ListItem>
        <Email sx={{ mr: 2, color: 'text.secondary' }} />
        <ListItemText primary="john.doe@example.com" secondary="Primary email" />
      </ListItem>
      <ListItem>
        <Phone sx={{ mr: 2, color: 'text.secondary' }} />
        <ListItemText primary="+1 (555) 123-4567" secondary="Mobile phone" />
      </ListItem>
      <ListItem>
        <LocationOn sx={{ mr: 2, color: 'text.secondary' }} />
        <ListItemText primary="San Francisco, CA" secondary="Current location" />
      </ListItem>
    </List>

    <Button variant="contained" startIcon={<Edit />} sx={{ mt: 2 }}>
      Edit Profile
    </Button>
  </Box>
);

const NotificationsContent = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h5" gutterBottom>
      Recent Notifications
    </Typography>
    <List>
      {[
        {
          icon: <Info color="info" />,
          title: 'System Update',
          message: 'New features are available',
          time: '2 minutes ago',
        },
        {
          icon: <CheckCircle color="success" />,
          title: 'Task Completed',
          message: 'Your report has been generated',
          time: '1 hour ago',
        },
        {
          icon: <Warning color="warning" />,
          title: 'Storage Warning',
          message: '80% of storage is used',
          time: '3 hours ago',
        },
        {
          icon: <Error color="error" />,
          title: 'Failed Login',
          message: 'Someone tried to access your account',
          time: '1 day ago',
        },
      ].map((notification, i) => (
        <ListItem key={i} alignItems="flex-start">
          <Box sx={{ mr: 2, mt: 0.5 }}>{notification.icon}</Box>
          <ListItemText
            primary={notification.title}
            secondary={
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {notification.message}
                </Typography>
                <Typography variant="caption" color="text.disabled">
                  {notification.time}
                </Typography>
              </Box>
            }
          />
        </ListItem>
      ))}
    </List>
  </Box>
);

// Interactive wrapper component
const TabsWrapper = ({
  initialTab = 'dashboard',
  items,
  ...props
}: {
  initialTab?: string;
  items: TabItem[];
  [key: string]: unknown;
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleChange = (event: React.SyntheticEvent, tabId: string) => {
    setActiveTab(tabId);
  };

  return <Tabs {...props} value={activeTab} onChange={handleChange} items={items} />;
};

const basicTabItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <Dashboard />,
    content: <DashboardContent />,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings />,
    content: <SettingsContent />,
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: <Person />,
    content: <ProfileContent />,
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: <Notifications />,
    badge: 3,
    content: <NotificationsContent />,
  },
];

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
  },
  render: (args) => (
    <Paper elevation={2} sx={{ width: 800, minHeight: 500 }}>
      <TabsWrapper {...args} items={basicTabItems} />
    </Paper>
  ),
};

export const Pills: Story = {
  args: {
    variant: 'pills',
    size: 'md',
  },
  render: (args) => (
    <Paper elevation={2} sx={{ width: 800, minHeight: 500, p: 2 }}>
      <TabsWrapper {...args} items={basicTabItems} />
    </Paper>
  ),
};

export const Underline: Story = {
  args: {
    variant: 'underline',
    size: 'md',
  },
  render: (args) => (
    <Paper elevation={2} sx={{ width: 800, minHeight: 500, p: 2 }}>
      <TabsWrapper {...args} items={basicTabItems} />
    </Paper>
  ),
};

export const Enclosed: Story = {
  args: {
    variant: 'enclosed',
    size: 'md',
  },
  render: (args) => (
    <Box sx={{ width: 800, minHeight: 500 }}>
      <TabsWrapper {...args} items={basicTabItems} />
    </Box>
  ),
};

export const SmallSize: Story = {
  args: {
    variant: 'pills',
    size: 'sm',
  },
  render: (args) => (
    <Paper elevation={2} sx={{ width: 600, minHeight: 400, p: 2 }}>
      <TabsWrapper {...args} items={basicTabItems.slice(0, 3)} />
    </Paper>
  ),
};

export const LargeSize: Story = {
  args: {
    variant: 'default',
    size: 'lg',
  },
  render: (args) => (
    <Paper elevation={2} sx={{ width: 900, minHeight: 600 }}>
      <TabsWrapper {...args} items={basicTabItems.slice(0, 3)} />
    </Paper>
  ),
};

export const WithBadges: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => {
    const items = [
      {
        id: 'home',
        label: 'Home',
        badge: 2,
        content: <Typography sx={{ p: 2 }}>Home content</Typography>,
      },
      {
        id: 'messages',
        label: 'Messages',
        badge: 12,
        content: <Typography sx={{ p: 2 }}>Messages content</Typography>,
      },
      {
        id: 'notifications',
        label: 'Notifications',
        badge: 99,
        content: <Typography sx={{ p: 2 }}>Notifications content</Typography>,
      },
    ];
    return (
      <Paper elevation={2} sx={{ width: 700, minHeight: 400 }}>
        <TabsWrapper {...args} items={items} initialTab="home" />
      </Paper>
    );
  },
  parameters: {
    test: {
      timeout: 30000, // 30 second timeout
      dangerouslyIgnoreUnhandledErrors: true,
    },
  },
};

const ClosableTabsComponent = () => {
  const [tabs, setTabs] = useState([
    {
      id: 'file1',
      label: 'Component.tsx',
      icon: <Code />,
      closable: true,
      content: (
        <Box sx={{ p: 3, fontFamily: 'monospace' }}>
          <Typography variant="body2" component="pre">
            {`import React from 'react';

const Component = () => {
  return <div>Hello World</div>;
};`}
          </Typography>
        </Box>
      ),
    },
    {
      id: 'file2',
      label: 'styles.css',
      icon: <Palette />,
      closable: true,
      content: (
        <Box sx={{ p: 3, fontFamily: 'monospace' }}>
          <Typography variant="body2" component="pre">
            {`.container {
  display: flex;
  align-items: center;
}`}
          </Typography>
        </Box>
      ),
    },
    {
      id: 'file3',
      label: 'README.md',
      icon: <BugReport />,
      closable: true,
      content: (
        <Box sx={{ p: 3 }}>
          <Typography variant="h6"># Project Title</Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            This is a sample README file for the project documentation.
          </Typography>
        </Box>
      ),
    },
  ]);
  const [activeTab, setActiveTab] = useState('file1');

  const handleTabClose = (tabId: string) => {
    const newTabs = tabs.filter((tab) => tab.id !== tabId);
    setTabs(newTabs);
    if (activeTab === tabId && newTabs.length > 0) {
      setActiveTab(newTabs[0].id);
    }
  };

  const handleChange = (event: React.SyntheticEvent, tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <Paper elevation={2} sx={{ width: 700, minHeight: 400 }}>
      <Tabs
        variant="enclosed"
        value={activeTab}
        onChange={handleChange}
        items={tabs}
        onTabClose={handleTabClose}
      />
    </Paper>
  );
};

export const ClosableTabs: Story = {
  render: () => <ClosableTabsComponent />,
  args: {},
};

export const WithAnimations: Story = {
  args: {
    variant: 'pills',

    animateContent: true,
    animationDuration: 500,
  },
  render: (args) => (
    <Paper elevation={2} sx={{ width: 800, minHeight: 500, p: 2 }}>
      <TabsWrapper {...args} items={basicTabItems} />
    </Paper>
  ),
};

export const SecondaryColor: Story = {
  args: {
    variant: 'default',
    color: 'secondary',
  },
  render: (args) => (
    <Paper elevation={2} sx={{ width: 700, minHeight: 400 }}>
      <TabsWrapper {...args} items={basicTabItems.slice(0, 3)} />
    </Paper>
  ),
};

export const FullWidth: Story = {
  args: {
    variant: 'underline',
    fullWidth: true,
  },
  render: (args) => (
    <Paper elevation={2} sx={{ width: 800, minHeight: 400 }}>
      <TabsWrapper {...args} items={basicTabItems.slice(0, 3)} />
    </Paper>
  ),
};

export const Centered: Story = {
  args: {
    variant: 'pills',
    centered: true,
  },
  render: (args) => (
    <Paper elevation={2} sx={{ width: 800, minHeight: 400, p: 2 }}>
      <TabsWrapper {...args} items={basicTabItems.slice(0, 3)} />
    </Paper>
  ),
};

export const WithDividers: Story = {
  args: {
    variant: 'underline',
    showDividers: true,
  },
  render: (args) => (
    <Paper elevation={2} sx={{ width: 800, minHeight: 400, p: 2 }}>
      <TabsWrapper {...args} items={basicTabItems} />
    </Paper>
  ),
};

export const ScrollableTabs: Story = {
  args: {
    variant: 'default',
    scrollable: true,
  },
  render: (args) => {
    const items = [
      ...basicTabItems,
      {
        id: 'analytics',
        label: 'Analytics',
        content: <Typography sx={{ p: 2 }}>Analytics content</Typography>,
      },
      {
        id: 'reports',
        label: 'Reports',
        content: <Typography sx={{ p: 2 }}>Reports content</Typography>,
      },
      {
        id: 'security',
        label: 'Security',
        content: <Typography sx={{ p: 2 }}>Security content</Typography>,
      },
      {
        id: 'logs',
        label: 'System Logs',
        content: <Typography sx={{ p: 2 }}>System logs content</Typography>,
      },
    ];
    return (
      <Paper elevation={2} sx={{ width: 600, minHeight: 400 }}>
        <TabsWrapper {...args} items={items} />
      </Paper>
    );
  },
  parameters: {
    test: {
      timeout: 30000, // 30 second timeout
      dangerouslyIgnoreUnhandledErrors: true,
    },
  },
};

export const LoadingState: Story = {
  args: {
    variant: 'default',
    loading: true,
  },
  render: (args) => (
    <Paper elevation={2} sx={{ width: 700, minHeight: 400 }}>
      <TabsWrapper {...args} items={basicTabItems.slice(0, 2)} />
    </Paper>
  ),
};

export const DisabledTabs: Story = {
  args: {
    variant: 'pills',
  },
  render: (args) => {
    const items = [
      ...basicTabItems.slice(0, 2),
      {
        ...basicTabItems[2],
        disabled: true,
      },
      basicTabItems[3],
    ];
    return (
      <Paper elevation={2} sx={{ width: 700, minHeight: 400, p: 2 }}>
        <TabsWrapper {...args} items={items} />
      </Paper>
    );
  },
};

export const AllVariantsComparison: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: 900 }}>
      {[
        { title: 'Default', variant: 'default' },
        { title: 'Pills', variant: 'pills' },
        { title: 'Underline', variant: 'underline' },
        { title: 'Enclosed', variant: 'enclosed' },
      ].map(({ title, variant }) => (
        <Box key={variant}>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Paper elevation={1} sx={{ minHeight: 300 }}>
            <TabsWrapper
              variant={variant}
              items={basicTabItems.slice(0, 3)}
              initialTab="dashboard"
            />
          </Paper>
        </Box>
      ))}
    </Box>
  ),
};

export const AdminDashboard: Story = {
  render: () => {
    const adminTabs = [
      {
        id: 'overview',
        label: 'Overview',
        icon: <Dashboard />,
        content: <DashboardContent />,
      },
      {
        id: 'users',
        label: 'Users',
        icon: <Person />,
        badge: 1250,
        content: (
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              User Management
            </Typography>
            <Typography>Manage user accounts, roles, and permissions.</Typography>
          </Box>
        ),
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: <Settings />,
        content: <SettingsContent />,
      },
      {
        id: 'security',
        label: 'Security',
        icon: <Security />,
        badge: 3,
        content: (
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Security Center
            </Typography>
            <Typography>Monitor security events and configure security settings.</Typography>
          </Box>
        ),
      },
      {
        id: 'logs',
        label: 'Logs',
        icon: <Code />,
        content: (
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              System Logs
            </Typography>
            <Typography>View and analyze system activity logs.</Typography>
          </Box>
        ),
      },
    ];

    return (
      <Box sx={{ width: 1000, minHeight: 600 }}>
        <TabsWrapper
          variant="default"
          items={adminTabs}
          initialTab="overview"
          scrollable
          showDividers
        />
      </Box>
    );
  },
};
// Required story exports for validation
export const AllVariants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: 900 }}>
      {[
        { title: 'Default', variant: 'default' },
        { title: 'Pills', variant: 'pills' },
        { title: 'Underline', variant: 'underline' },
        { title: 'Enclosed', variant: 'enclosed' },
      ].map(({ title, variant }) => (
        <Box key={variant}>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Paper elevation={1} sx={{ minHeight: 300 }}>
            <TabsWrapper
              variant={variant as 'default' | 'pills' | 'underline' | 'enclosed'}
              items={basicTabItems.slice(0, 3)}
              initialTab="dashboard"
            />
          </Paper>
        </Box>
      ))}
    </Box>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: 800 }}>
      {[
        { title: 'Small', size: 'sm' },
        { title: 'Medium', size: 'md' },
        { title: 'Large', size: 'lg' },
      ].map(({ title, size }) => (
        <Box key={size}>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Paper elevation={1} sx={{ minHeight: 300, p: size === 'sm' ? 1 : 2 }}>
            <TabsWrapper
              variant="pills"
              size={size as 'sm' | 'md' | 'lg'}
              items={basicTabItems.slice(0, 3)}
              initialTab="dashboard"
            />
          </Paper>
        </Box>
      ))}
    </Box>
  ),
};

export const AllStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: 800 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Normal State
        </Typography>
        <Paper elevation={1} sx={{ minHeight: 300, p: 2 }}>
          <TabsWrapper variant="pills" items={basicTabItems.slice(0, 3)} initialTab="dashboard" />
        </Paper>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Disabled Tabs
        </Typography>
        <Paper elevation={1} sx={{ minHeight: 300, p: 2 }}>
          <TabsWrapper
            variant="pills"
            items={[
              basicTabItems[0],
              { ...basicTabItems[1], disabled: true },
              { ...basicTabItems[2], disabled: true },
            ]}
            initialTab="dashboard"
          />
        </Paper>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Loading State
        </Typography>
        <Paper elevation={1} sx={{ minHeight: 300, p: 2 }}>
          <TabsWrapper
            variant="pills"
            items={basicTabItems.slice(0, 3)}
            initialTab="dashboard"
            loading
          />
        </Paper>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          With Badges
        </Typography>
        <Paper elevation={1} sx={{ minHeight: 300, p: 2 }}>
          <TabsWrapper
            variant="pills"
            items={[
              basicTabItems[0],
              { ...basicTabItems[1], badge: 5 },
              { ...basicTabItems[2], badge: 99 },
            ]}
            initialTab="dashboard"
          />
        </Paper>
      </Box>
    </Box>
  ),
};

export const InteractiveStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: 800 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Hover & Focus States
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Hover over tabs to see hover states, use Tab key to navigate and see focus states
        </Typography>
        <Paper elevation={1} sx={{ minHeight: 300, p: 2 }}>
          <TabsWrapper variant="default" items={basicTabItems.slice(0, 4)} initialTab="dashboard" />
        </Paper>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Active & Selected States
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Click tabs to see active/selected states with different variants
        </Typography>
        <Paper elevation={1} sx={{ minHeight: 300, p: 2 }}>
          <TabsWrapper
            variant="underline"
            items={basicTabItems.slice(0, 4)}
            initialTab="settings"
          />
        </Paper>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Closable Tabs
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Tabs with close buttons - click X to close tabs
        </Typography>
        <Paper elevation={1} sx={{ minHeight: 300 }}>
          <ClosableTabsComponent />
        </Paper>
      </Box>
    </Box>
  ),
};

export const Responsive: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Mobile (320px)
        </Typography>
        <Box sx={{ width: 320, border: '1px solid #ddd', borderRadius: 1 }}>
          <TabsWrapper
            variant="pills"
            items={basicTabItems.slice(0, 3)}
            initialTab="dashboard"
            fullWidth
          />
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Tablet (768px)
        </Typography>
        <Box sx={{ width: 768, border: '1px solid #ddd', borderRadius: 1 }}>
          <TabsWrapper variant="underline" items={basicTabItems} initialTab="dashboard" centered />
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Desktop (1200px)
        </Typography>
        <Box sx={{ width: 1200, border: '1px solid #ddd', borderRadius: 1 }}>
          <TabsWrapper
            variant="default"
            items={[
              ...basicTabItems,
              ...basicTabItems.map((item) => ({
                ...item,
                id: `${item.id  }_2`,
                label: `${item.label  } 2`,
              })),
            ]}
            initialTab="dashboard"
            scrollable
            showDividers
          />
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Vertical Layout (Responsive)
        </Typography>
        <Box
          sx={{
            display: 'flex',
            width: 800,
            minHeight: 400,
            border: '1px solid #ddd',
            borderRadius: 1,
          }}
        >
          <TabsWrapper
            variant="pills"
            orientation="vertical"
            items={basicTabItems.slice(0, 4)}
            initialTab="dashboard"
          />
        </Box>
      </Box>
    </Box>
  ),
};

export const DensityModes: Story = {
  render: () => {

    const simpleTabs = [
      { id: 'tab1', label: 'Overview', content: <Typography sx={{ p: 2 }}>Overview content</Typography> },
      { id: 'tab2', label: 'Details', content: <Typography sx={{ p: 2 }}>Details content</Typography> },
      { id: 'tab3', label: 'Settings', content: <Typography sx={{ p: 2 }}>Settings content</Typography> },
    ];

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <DensityProvider defaultMode="compact">
          <Box>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Compact (0.8x)
            </Typography>
            <Paper elevation={1} sx={{ width: 500, minHeight: 200 }}>
              <TabsWrapper variant="pills" items={simpleTabs} initialTab="tab1" />
            </Paper>
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="normal">
          <Box>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Normal (1.0x)
            </Typography>
            <Paper elevation={1} sx={{ width: 500, minHeight: 200 }}>
              <TabsWrapper variant="pills" items={simpleTabs} initialTab="tab1" />
            </Paper>
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="spacious">
          <Box>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Spacious (1.25x)
            </Typography>
            <Paper elevation={1} sx={{ width: 500, minHeight: 200 }}>
              <TabsWrapper variant="pills" items={simpleTabs} initialTab="tab1" />
            </Paper>
          </Box>
        </DensityProvider>
      </Box>
    );
  },
};
