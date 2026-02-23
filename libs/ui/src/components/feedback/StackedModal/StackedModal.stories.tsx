import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Switch from '@mui/material/Switch';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {
  Add as AddIcon,
  CheckCircle as CheckCircleIcon,
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Edit as EditIcon,
  FilterList as FilterListIcon,
  Info as InfoIcon,
  MoreVert as MoreVertIcon,
  Save as SaveIcon,
  Search as SearchIcon,
  Settings as SettingsIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DensityProvider } from '../../../utils/density';
import React, { useEffect,useState } from 'react';

import {
  StackedModalActions,
  StackedModalContent,
  ModalStackProvider,
  StackedModal,
  useModalStack,
} from './StackedModal';

const meta: Meta<typeof StackedModal> = {
  title: 'Enhanced/StackedModal',
  component: StackedModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A sophisticated nested modal system inspired by Google Tag Manager\'s UI with glass morphism, smart transitions, and responsive design.',
      },
    },
  },
  decorators: [
    (Story) => (
      <ModalStackProvider>
        <Box sx={{ p: 3, minHeight: '100vh', bgcolor: 'grey.50' }}>
          <Story />
        </Box>
      </ModalStackProvider>
    ),
  ],
  tags: ['autodocs', 'component:StackedModal'],
};

export default meta;
type Story = StoryObj<typeof StackedModal>;

// Basic usage story
const DefaultComponent = () => {
  const BasicModal = () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Basic Modal
        </Button>
        <StackedModal
          open={open}
          onClose={() => setOpen(false)}
          navigationTitle="Basic Modal"
          actions={
            <Button variant="contained" size="small">
              Save Changes
            </Button>
          }
        >
          <StackedModalContent>
            <Typography variant="h5" gutterBottom>
              Welcome to StackedModal
            </Typography>
            <Typography paragraph>
              This is a basic implementation of the StackedModal component. It provides a clean and
              modern interface for displaying content.
            </Typography>
            <TextField fullWidth label="Enter your name" variant="outlined" margin="normal" />
          </StackedModalContent>
        </StackedModal>
      </>
    );
  };

  return <BasicModal />;
};

export const Default: Story = {
  render: () => <DefaultComponent />,
};

// Glass morphism effect
const GlassMorphismComponent = () => {
  const GlassModal = () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Box
          sx={{
            p: 4,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" color="white" gutterBottom>
            Beautiful Background
          </Typography>
          <Typography color="white" paragraph>
            This colorful background will be visible through the glass effect
          </Typography>
          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            sx={{ bgcolor: 'white', color: 'primary.main' }}
          >
            Open Glass Modal
          </Button>
        </Box>

        <StackedModal
          open={open}
          onClose={() => setOpen(false)}
          glass={true}
          navigationTitle="Glass Morphism Modal"
        >
          <StackedModalContent>
            <Typography variant="h5" gutterBottom>
              Glass Effect Active
            </Typography>
            <Typography paragraph>
              Notice the beautiful blur effect that reveals the content behind the modal. This
              creates a modern, sophisticated UI that maintains context while focusing attention.
            </Typography>
            <Alert severity="info">
              The glass effect automatically adjusts based on the theme and provides excellent
              readability while maintaining visual appeal.
            </Alert>
          </StackedModalContent>
          <StackedModalActions>
            <Button variant="outlined" size="small" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained" size="small">
              Confirm
            </Button>
          </StackedModalActions>
        </StackedModal>
      </>
    );
  };

  return <GlassModal />;
};

export const GlassMorphism: Story = {
  render: () => <GlassMorphismComponent />,
};

// Multi-level stacking demonstration
const MultiLevelStackingComponent = () => {
  const StackingDemo = () => {
    const [firstOpen, setFirstOpen] = useState(false);
    const [secondOpen, setSecondOpen] = useState(false);
    const [thirdOpen, setThirdOpen] = useState(false);
    const [fourthOpen, setFourthOpen] = useState(false);

    return (
      <>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Multi-Level Modal Stacking
            </Typography>
            <Typography paragraph color="text.secondary">
              This demonstrates how modals stack and transition smoothly between states. Each modal
              becomes secondary when a new one opens.
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" onClick={() => setFirstOpen(true)} startIcon={<AddIcon />}>
              Start Workflow
            </Button>
          </CardActions>
        </Card>

        {/* Level 1 Modal */}
        <StackedModal
          open={firstOpen}
          onClose={() => setFirstOpen(false)}
          glass={true}
          navigationTitle="Step 1: Choose Project"
          modalId="modal-level-1"
        >
          <StackedModalContent>
            <Typography variant="h5" gutterBottom>
              Select Project Type
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} md={6}>
                <Card
                  sx={{ cursor: 'pointer', '&:hover': { boxShadow: 4 } }}
                  onClick={() => setSecondOpen(true)}
                >
                  <CardContent>
                    <Typography variant="h6">Web Application</Typography>
                    <Typography color="text.secondary">
                      Create a responsive web application
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card
                  sx={{ cursor: 'pointer', '&:hover': { boxShadow: 4 } }}
                  onClick={() => setSecondOpen(true)}
                >
                  <CardContent>
                    <Typography variant="h6">Mobile App</Typography>
                    <Typography color="text.secondary">
                      Build a native mobile application
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </StackedModalContent>
        </StackedModal>

        {/* Level 2 Modal */}
        <StackedModal
          open={secondOpen}
          onClose={() => setSecondOpen(false)}
          navigationTitle="Step 2: Configuration"
          modalId="modal-level-2"
          actions={
            <Button variant="contained" size="small" onClick={() => setThirdOpen(true)}>
              Next Step
            </Button>
          }
        >
          <StackedModalContent>
            <Typography variant="h5" gutterBottom>
              Configure Your Project
            </Typography>
            <Stack spacing={3} sx={{ mt: 3 }}>
              <TextField fullWidth label="Project Name" defaultValue="My Awesome Project" />
              <FormControl fullWidth>
                <InputLabel>Framework</InputLabel>
                <Select label="Framework" defaultValue="react">
                  <MenuItem value="react">React</MenuItem>
                  <MenuItem value="vue">Vue.js</MenuItem>
                  <MenuItem value="angular">Angular</MenuItem>
                </Select>
              </FormControl>
              <FormControlLabel control={<Switch defaultChecked />} label="Enable TypeScript" />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Include Testing Framework"
              />
            </Stack>
          </StackedModalContent>
        </StackedModal>

        {/* Level 3 Modal */}
        <StackedModal
          open={thirdOpen}
          onClose={() => setThirdOpen(false)}
          navigationTitle="Step 3: Features"
          modalId="modal-level-3"
          actions={
            <Button variant="contained" size="small" onClick={() => setFourthOpen(true)}>
              Add Dependencies
            </Button>
          }
        >
          <StackedModalContent>
            <Typography variant="h5" gutterBottom>
              Select Features
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Authentication" secondary="User login and registration" />
                <Switch defaultChecked />
              </ListItem>
              <ListItem>
                <ListItemText primary="Database" secondary="PostgreSQL integration" />
                <Switch defaultChecked />
              </ListItem>
              <ListItem>
                <ListItemText primary="API" secondary="RESTful API endpoints" />
                <Switch />
              </ListItem>
              <ListItem>
                <ListItemText primary="Real-time" secondary="WebSocket support" />
                <Switch />
              </ListItem>
            </List>
          </StackedModalContent>
        </StackedModal>

        {/* Level 4 Modal */}
        <StackedModal
          open={fourthOpen}
          onClose={() => setFourthOpen(false)}
          navigationTitle="Step 4: Review"
          modalId="modal-level-4"
          actions={
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  setFourthOpen(false);
                  setThirdOpen(false);
                  setSecondOpen(false);
                  setFirstOpen(false);
                }}
              >
                Cancel All
              </Button>
              <Button
                variant="contained"
                color="success"
                size="small"
                startIcon={<CheckCircleIcon />}
                onClick={() => {
                  window.alert('Project created successfully!');
                  setFourthOpen(false);
                  setThirdOpen(false);
                  setSecondOpen(false);
                  setFirstOpen(false);
                }}
              >
                Create Project
              </Button>
            </Stack>
          }
        >
          <StackedModalContent>
            <Alert severity="success" sx={{ mb: 3 }}>
              Your project is ready to be created!
            </Alert>
            <Typography variant="h5" gutterBottom>
              Project Summary
            </Typography>
            <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Project Type
                  </Typography>
                  <Typography>Web Application</Typography>
                </Box>
                <Divider />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Framework
                  </Typography>
                  <Typography>React with TypeScript</Typography>
                </Box>
                <Divider />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Features
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    <Chip label="Authentication" size="small" />
                    <Chip label="Database" size="small" />
                    <Chip label="Testing" size="small" />
                  </Stack>
                </Box>
              </Stack>
            </Paper>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
              Note: Only the current and previous modals are rendered for optimal performance.
            </Typography>
          </StackedModalContent>
        </StackedModal>
      </>
    );
  };

  return <StackingDemo />;
};

export const MultiLevelStacking: Story = {
  render: () => <MultiLevelStackingComponent />,
};

// Mobile responsive bottom sheet
export const MobileResponsive: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => {
    const MobileDemo = () => {
      const [open, setOpen] = useState(false);
      const theme = useTheme();
      const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

      return (
        <>
          <Alert severity="info" sx={{ mb: 2 }}>
            {isMobile
              ? 'Mobile view active - Modal will slide from bottom'
              : 'Desktop view - Switch to mobile viewport to see bottom sheet behavior'}
          </Alert>
          <Button
            variant="contained"
            fullWidth={isMobile}
            onClick={() => setOpen(true)}
            startIcon={<AddIcon />}
          >
            Open Mobile Modal
          </Button>

          <StackedModal
            open={open}
            onClose={() => setOpen(false)}
            navigationTitle="Mobile Optimized"
            actions={
              <Button variant="contained" size="small" onClick={() => setOpen(false)}>
                Close
              </Button>
            }
          >
            <StackedModalContent>
              <Typography variant="h5" gutterBottom>
                Mobile-First Design
              </Typography>
              <Typography paragraph>
                On mobile devices, the modal slides up from the bottom like a native mobile sheet.
                On desktop, it fades in with responsive sizing.
              </Typography>
              <Stack spacing={2}>
                <Button variant="outlined" fullWidth startIcon={<CloudUploadIcon />}>
                  Upload File
                </Button>
                <Button variant="outlined" fullWidth startIcon={<DownloadIcon />}>
                  Download Report
                </Button>
                <Button variant="outlined" fullWidth startIcon={<ShareIcon />}>
                  Share Document
                </Button>
              </Stack>
            </StackedModalContent>
          </StackedModal>
        </>
      );
    };

    return <MobileDemo />;
  },
};

// Async content with loading states
const AsyncContentLoadingComponent = () => {
  const AsyncModal = () => {
    const [open, setOpen] = useState(false);
    const [addUserOpen, setAddUserOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<{
      users: Array<{ id: number; name: string; role: string; status: string }>;
    } | null>(null);

    const loadData = () => {
      setOpen(true);
      setLoading(true);
      setData(null);

      // Simulate API call
      window.window.setTimeout(() => {
        setData({
          users: [
            { id: 1, name: 'John Doe', role: 'Admin', status: 'Active' },
            { id: 2, name: 'Jane Smith', role: 'User', status: 'Active' },
            { id: 3, name: 'Bob Johnson', role: 'User', status: 'Inactive' },
            { id: 4, name: 'Alice Brown', role: 'Moderator', status: 'Active' },
          ],
        });
        setLoading(false);
      }, 2000);
    };

    return (
      <>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Async Data Loading
            </Typography>
            <Typography color="text.secondary">
              Modal with skeleton loading state while fetching data
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" onClick={loadData}>
              Load User Data
            </Button>
          </CardActions>
        </Card>

        <StackedModal
          open={open}
          onClose={() => setOpen(false)}
          navigationTitle="User Management"
          loading={loading}
          loadingText="Fetching user data..."
          actions={
            !loading && (
              <Button
                variant="contained"
                size="small"
                startIcon={<AddIcon />}
                onClick={() => setAddUserOpen(true)}
              >
                Add User
              </Button>
            )
          }
        >
          {!loading && data && (
            <Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar sx={{ width: 32, height: 32 }}>{user.name.charAt(0)}</Avatar>
                            {user.name}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={user.role}
                            size="small"
                            color={user.role === 'Admin' ? 'primary' : 'default'}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={user.status}
                            size="small"
                            color={user.status === 'Active' ? 'success' : 'default'}
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton size="small">
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small">
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </StackedModal>

        {/* Add User Modal */}
        <StackedModal
          open={addUserOpen}
          onClose={() => setAddUserOpen(false)}
          navigationTitle="Add New User"
          modalId="add-user-modal"
        >
          <StackedModalContent>
            <Typography variant="h5" gutterBottom>
              Create New User
            </Typography>
            <Stack spacing={3} sx={{ mt: 3 }}>
              <TextField
                fullWidth
                label="Full Name"
                required
                helperText="Enter the user's full name"
              />
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                required
                helperText="This will be used for login"
              />
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select label="Role" defaultValue="">
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="moderator">Moderator</MenuItem>
                </Select>
              </FormControl>
              <FormControlLabel control={<Switch defaultChecked />} label="Send invitation email" />
              <Alert severity="info">
                The user will receive an email invitation to set their password and complete
                registration.
              </Alert>
            </Stack>
          </StackedModalContent>
          <StackedModalActions>
            <Button variant="outlined" onClick={() => setAddUserOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                window.alert('User added successfully!');
                setAddUserOpen(false);
              }}
            >
              Create User
            </Button>
          </StackedModalActions>
        </StackedModal>
      </>
    );
  };

  return <AsyncModal />;
};

export const AsyncContentLoading: Story = {
  render: () => <AsyncContentLoadingComponent />,
};

// Custom actions and buttons
const CustomActionsComponent = () => {
  const CustomActionsModal = () => {
    const [open, setOpen] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      if (open && progress < 100) {
        const timer = window.window.setTimeout(() => {
          setProgress((prev) => Math.min(prev + 10, 100));
        }, 500);
        return () => window.window.clearTimeout(timer);
      }
    }, [open, progress]);

    return (
      <>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(true);
            setProgress(0);
          }}
          startIcon={<SettingsIcon />}
        >
          Open Settings Modal
        </Button>

        <StackedModal
          open={open}
          onClose={() => setOpen(false)}
          navigationTitle="Advanced Settings"
          actions={
            <Stack direction="row" spacing={1}>
              <IconButton size="small">
                <SearchIcon />
              </IconButton>
              <IconButton size="small">
                <FilterListIcon />
              </IconButton>
              <IconButton size="small">
                <MoreVertIcon />
              </IconButton>
              <Divider orientation="vertical" flexItem />
              <Button variant="outlined" size="small" startIcon={<InfoIcon />}>
                Help
              </Button>
              <Button
                variant="contained"
                size="small"
                color="success"
                startIcon={<SaveIcon />}
                disabled={progress < 100}
              >
                Save
              </Button>
            </Stack>
          }
        >
          <StackedModalContent>
            <Tabs value={0}>
              <Tab label="General" />
              <Tab label="Privacy" />
              <Tab label="Notifications" />
              <Tab label="Advanced" />
            </Tabs>

            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                General Settings
              </Typography>

              <Stack spacing={3}>
                <TextField fullWidth label="Display Name" defaultValue="John Doe" />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  defaultValue="john.doe@example.com"
                />
                <FormControlLabel control={<Switch defaultChecked />} label="Enable dark mode" />
                <FormControlLabel control={<Switch defaultChecked />} label="Show notifications" />

                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Profile completion: {progress}%
                  </Typography>
                  <LinearProgress variant="determinate" value={progress} />
                </Box>
              </Stack>
            </Box>
          </StackedModalContent>
        </StackedModal>
      </>
    );
  };

  return <CustomActionsModal />;
};

export const CustomActions: Story = {
  render: () => <CustomActionsComponent />,
};

// Complex workflow example (multi-step form)
const ComplexWorkflowComponent = () => {
  const WorkflowModal = () => {
    const [open, setOpen] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [nestedOpen, setNestedOpen] = useState(false);

    const steps = ['Basic Info', 'Address', 'Payment', 'Review'];

    const handleNext = () => {
      setActiveStep((prev) => prev + 1);
    };

    const handleBack = () => {
      setActiveStep((prev) => prev - 1);
    };

    const handleReset = () => {
      setActiveStep(0);
    };

    return (
      <>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Multi-Step Registration
            </Typography>
            <Typography color="text.secondary" paragraph>
              Complex workflow with nested modals and step-by-step process
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              size="large"
              onClick={() => setOpen(true)}
              startIcon={<AddIcon />}
            >
              Start Registration
            </Button>
          </CardActions>
        </Card>

        <StackedModal
          open={open}
          onClose={() => {
            setOpen(false);
            handleReset();
          }}
          navigationTitle="User Registration"
          modalId="workflow-main"
          actions={
            activeStep === steps.length ? (
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  setOpen(false);
                  handleReset();
                }}
              >
                Complete
              </Button>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Step {activeStep + 1} of {steps.length}
              </Typography>
            )
          }
        >
          <StackedModalContent>
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {activeStep === steps.length ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <CheckCircleIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Registration Complete!
                </Typography>
                <Typography color="text.secondary">
                  Your account has been successfully created.
                </Typography>
              </Box>
            ) : (
              <>
                <Box sx={{ mb: 4 }}>
                  {activeStep === 0 && (
                    <Stack spacing={2}>
                      <Typography variant="h6">Basic Information</Typography>
                      <TextField fullWidth label="First Name" />
                      <TextField fullWidth label="Last Name" />
                      <TextField fullWidth label="Email" type="email" />
                      <TextField fullWidth label="Phone" />
                      <Button variant="outlined" onClick={() => setNestedOpen(true)}>
                        Add Additional Contact
                      </Button>
                    </Stack>
                  )}

                  {activeStep === 1 && (
                    <Stack spacing={2}>
                      <Typography variant="h6">Address Information</Typography>
                      <TextField fullWidth label="Street Address" />
                      <TextField fullWidth label="City" />
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <TextField fullWidth label="State" />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField fullWidth label="ZIP Code" />
                        </Grid>
                      </Grid>
                      <TextField fullWidth label="Country" />
                    </Stack>
                  )}

                  {activeStep === 2 && (
                    <Stack spacing={2}>
                      <Typography variant="h6">Payment Information</Typography>
                      <TextField fullWidth label="Card Number" />
                      <TextField fullWidth label="Cardholder Name" />
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <TextField fullWidth label="Expiry Date" placeholder="MM/YY" />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField fullWidth label="CVV" />
                        </Grid>
                      </Grid>
                      <FormControlLabel
                        control={<Switch />}
                        label="Save payment method for future use"
                      />
                    </Stack>
                  )}

                  {activeStep === 3 && (
                    <Stack spacing={2}>
                      <Typography variant="h6">Review Your Information</Typography>
                      <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Personal Details
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          John Doe - john.doe@example.com
                        </Typography>
                      </Paper>
                      <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Address
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          123 Main St, New York, NY 10001
                        </Typography>
                      </Paper>
                      <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Payment Method
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Card ending in 1234
                        </Typography>
                      </Paper>
                      <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="I agree to the terms and conditions"
                      />
                    </Stack>
                  )}
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button disabled={activeStep === 0} onClick={handleBack}>
                    Back
                  </Button>
                  <Button variant="contained" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                </Box>
              </>
            )}

            {/* Nested Modal for Additional Contact */}
            <StackedModal
              open={nestedOpen}
              onClose={() => setNestedOpen(false)}
              navigationTitle="Additional Contact"
              modalId="workflow-nested"
              actions={
                <Button variant="contained" size="small" onClick={() => setNestedOpen(false)}>
                  Add Contact
                </Button>
              }
            >
              <StackedModalContent>
                <Typography variant="h6" gutterBottom>
                  Emergency Contact Information
                </Typography>
                <Stack spacing={2}>
                  <TextField fullWidth label="Contact Name" />
                  <TextField fullWidth label="Relationship" />
                  <TextField fullWidth label="Phone Number" />
                  <TextField fullWidth label="Email" type="email" />
                </Stack>
              </StackedModalContent>
            </StackedModal>
          </StackedModalContent>
        </StackedModal>
      </>
    );
  };

  return <WorkflowModal />;
};

export const ComplexWorkflow: Story = {
  render: () => <ComplexWorkflowComponent />,
};

// Performance demo with many modals
const PerformanceDemoComponent = () => {
  const PerformanceTest = () => {
    const [modals, setModals] = useState<boolean[]>(Array(10).fill(false));
    const { stack } = useModalStack();

    const openModal = (index: number) => {
      setModals((prev) => {
        const newModals = [...prev];
        newModals[index] = true;
        return newModals;
      });
    };

    const closeModal = (index: number) => {
      setModals((prev) => {
        const newModals = [...prev];
        newModals[index] = false;
        return newModals;
      });
    };

    return (
      <>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Performance Test
            </Typography>
            <Typography color="text.secondary" paragraph>
              Test the modal system with multiple nested modals. Only 2 modals are rendered at once
              for optimal performance.
            </Typography>
            <Alert severity="info" sx={{ mt: 2 }}>
              Current stack depth: {stack.length} modal(s)
            </Alert>
          </CardContent>
          <CardActions>
            <Button variant="contained" onClick={() => openModal(0)} startIcon={<AddIcon />}>
              Open First Modal
            </Button>
          </CardActions>
        </Card>

        {modals.map((isOpen, index) => (
          <StackedModal
            key={index}
            open={isOpen}
            onClose={() => closeModal(index)}
            navigationTitle={`Modal Level ${index + 1}`}
            modalId={`perf-modal-${index}`}
            glass={index === 0}
            actions={
              index === modals.length - 1 ? (
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => {
                    setModals(Array(10).fill(false));
                  }}
                >
                  Close All
                </Button>
              ) : (
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => openModal(index + 1)}
                  disabled={index >= 9}
                >
                  Open Next
                </Button>
              )
            }
          >
            <StackedModalContent>
              <Typography variant="h5" gutterBottom>
                Level {index + 1} Content
              </Typography>
              <Typography paragraph>
                This is modal number {index + 1} in the stack.
                {index > 1 && ' Only this modal and its parent are rendered.'}
              </Typography>

              <Grid container spacing={2}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <Grid item xs={12} md={6} key={i}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">Card {i + 1}</Typography>
                        <Typography color="text.secondary">
                          Sample content to test rendering performance
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {index < 9 && (
                <Box sx={{ mt: 3 }}>
                  <Button variant="outlined" fullWidth onClick={() => openModal(index + 1)}>
                    Open Modal {index + 2}
                  </Button>
                </Box>
              )}
            </StackedModalContent>
          </StackedModal>
        ))}
      </>
    );
  };

  return <PerformanceTest />;
};

export const PerformanceDemo: Story = {
  render: () => <PerformanceDemoComponent />,
};

// RTL Support
const RTLSupportComponent = () => {
  const RTLModal = () => {
    const [open, setOpen] = useState(false);
    const [rtl, setRtl] = useState(false);

    return (
      <>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              RTL Language Support
            </Typography>
            <Typography color="text.secondary" paragraph>
              Toggle RTL mode to see how the modal adapts to right-to-left languages
            </Typography>
            <FormControlLabel
              control={<Switch checked={rtl} onChange={(e) => setRtl(e.target.checked)} />}
              label="Enable RTL Mode"
            />
          </CardContent>
          <CardActions>
            <Button variant="contained" onClick={() => setOpen(true)}>
              {rtl ? 'فتح مشروط' : 'Open Modal'}
            </Button>
          </CardActions>
        </Card>

        <StackedModal
          open={open}
          onClose={() => setOpen(false)}
          navigationTitle={rtl ? 'نموذج مع دعم RTL' : 'Modal with RTL Support'}
          rtl={rtl}
          glass={true}
          actions={
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" size="small" onClick={() => setOpen(false)}>
                {rtl ? 'إلغاء' : 'Cancel'}
              </Button>
              <Button variant="contained" size="small">
                {rtl ? 'حفظ' : 'Save'}
              </Button>
            </Stack>
          }
        >
          <StackedModalContent>
            <Typography variant="h5" gutterBottom>
              {rtl ? 'مرحبا بالعالم' : 'Hello World'}
            </Typography>
            <Typography paragraph>
              {rtl
                ? 'هذا مثال على النص العربي في واجهة المستخدم. يتكيف التخطيط تلقائيًا مع اتجاه RTL.'
                : 'This is an example of English text in the UI. The layout automatically adapts to LTR direction.'}
            </Typography>
            <Stack spacing={2}>
              <TextField fullWidth label={rtl ? 'الاسم' : 'Name'} dir={rtl ? 'rtl' : 'ltr'} />
              <TextField
                fullWidth
                label={rtl ? 'البريد الإلكتروني' : 'Email'}
                dir={rtl ? 'rtl' : 'ltr'}
              />
            </Stack>
          </StackedModalContent>
        </StackedModal>
      </>
    );
  };

  return <RTLModal />;
};

export const RTLSupport: Story = {
  render: () => <RTLSupportComponent />,
};

// Accessibility Features
const AccessibilityShowcaseComponent = () => {
  const AccessibleModal = () => {
    const [open, setOpen] = useState(false);
    const [announcement, setAnnouncement] = useState('');

    return (
      <>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Accessibility Features
            </Typography>
            <Typography color="text.secondary" paragraph>
              Full ARIA support, keyboard navigation, and focus management
            </Typography>
            <Alert severity="success" sx={{ mt: 2 }}>
              <Typography variant="body2">
                • Press ESC to close modal
                <br />
                • Use Tab/Shift+Tab to navigate
                <br />
                • Focus is trapped within modal
                <br />• Screen reader announcements
              </Typography>
            </Alert>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              onClick={() => {
                setOpen(true);
                setAnnouncement('Modal opened. Use Tab to navigate.');
              }}
            >
              Open Accessible Modal
            </Button>
          </CardActions>
        </Card>

        {announcement && (
          <Alert severity="info" onClose={() => setAnnouncement('')} sx={{ mt: 2 }}>
            {announcement}
          </Alert>
        )}

        <StackedModal
          open={open}
          onClose={() => {
            setOpen(false);
            setAnnouncement('Modal closed.');
          }}
          navigationTitle="Accessible Form"
          closeOnEsc={true}
          closeOnClickOutside={true}
          aria-labelledby="accessible-modal-title"
          aria-describedby="accessible-modal-description"
          actions={
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  setOpen(false);
                  setAnnouncement('Modal closed without saving.');
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  setOpen(false);
                  setAnnouncement('Form submitted successfully.');
                }}
              >
                Submit
              </Button>
            </Stack>
          }
        >
          <StackedModalContent>
            <Typography id="accessible-modal-title" variant="h5" gutterBottom>
              Fully Accessible Modal
            </Typography>
            <Typography id="accessible-modal-description" paragraph>
              This modal demonstrates all accessibility features including proper ARIA labels,
              keyboard navigation, and focus management.
            </Typography>

            <Stack spacing={3}>
              <TextField
                fullWidth
                label="First Name"
                helperText="Press Tab to move to next field"
                inputProps={{
                  'aria-label': 'First name input field',
                  'aria-required': 'true',
                }}
              />
              <TextField
                fullWidth
                label="Last Name"
                helperText="Press Shift+Tab to move to previous field"
                inputProps={{
                  'aria-label': 'Last name input field',
                  'aria-required': 'true',
                }}
              />
              <FormControlLabel
                control={
                  <Switch
                    inputProps={{
                      'aria-label': 'Subscribe to newsletter',
                    }}
                  />
                }
                label="Subscribe to newsletter"
              />
            </Stack>
          </StackedModalContent>
        </StackedModal>
      </>
    );
  };

  return <AccessibleModal />;
};

export const AccessibilityShowcase: Story = {
  render: () => <AccessibilityShowcaseComponent />,
};

// Required story exports for validation
const AllVariantsComponent = () => {
  const [basicOpen, setBasicOpen] = useState(false);
  const [glassOpen, setGlassOpen] = useState(false);
  const [loadingOpen, setLoadingOpen] = useState(false);

  return (
    <>
      <Stack spacing={2}>
        <Button variant="contained" onClick={() => setBasicOpen(true)}>
          Basic Modal
        </Button>
        <Button variant="contained" onClick={() => setGlassOpen(true)}>
          Glass Modal
        </Button>
        <Button variant="contained" onClick={() => setLoadingOpen(true)}>
          Loading Modal
        </Button>
      </Stack>

      <StackedModal
        open={basicOpen}
        onClose={() => setBasicOpen(false)}
        navigationTitle="Basic Variant"
      >
        <StackedModalContent>
          <Typography>Basic modal variant without special effects</Typography>
        </StackedModalContent>
      </StackedModal>

      <StackedModal
        open={glassOpen}
        onClose={() => setGlassOpen(false)}
        glass
        navigationTitle="Glass Variant"
      >
        <StackedModalContent>
          <Typography>Glass morphism modal variant</Typography>
        </StackedModalContent>
      </StackedModal>

      <StackedModal
        open={loadingOpen}
        onClose={() => setLoadingOpen(false)}
        loading
        loadingText="Loading data..."
        navigationTitle="Loading Variant"
      >
        <StackedModalContent>
          <Typography>This content won't show during loading</Typography>
        </StackedModalContent>
      </StackedModal>
    </>
  );
};

export const AllVariants: Story = {
  render: () => <AllVariantsComponent />,
};

const AllSizesComponent = () => {
  const [smallOpen, setSmallOpen] = useState(false);
  const [mediumOpen, setMediumOpen] = useState(false);
  const [largeOpen, setLargeOpen] = useState(false);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  return (
    <>
      <Stack spacing={2}>
        <Button variant="contained" onClick={() => setSmallOpen(true)}>
          Small Modal
        </Button>
        <Button variant="contained" onClick={() => setMediumOpen(true)}>
          Medium Modal
        </Button>
        <Button variant="contained" onClick={() => setLargeOpen(true)}>
          Large Modal
        </Button>
        <Button variant="contained" onClick={() => setFullscreenOpen(true)}>
          Fullscreen Modal
        </Button>
      </Stack>

      <StackedModal
        open={smallOpen}
        onClose={() => setSmallOpen(false)}
        navigationTitle="Small Size"
        maxWidth="sm"
      >
        <StackedModalContent>
          <Typography>Small modal content (max-width: sm)</Typography>
        </StackedModalContent>
      </StackedModal>

      <StackedModal
        open={mediumOpen}
        onClose={() => setMediumOpen(false)}
        navigationTitle="Medium Size"
        maxWidth="md"
      >
        <StackedModalContent>
          <Typography>Medium modal content (max-width: md)</Typography>
        </StackedModalContent>
      </StackedModal>

      <StackedModal
        open={largeOpen}
        onClose={() => setLargeOpen(false)}
        navigationTitle="Large Size"
        maxWidth="lg"
      >
        <StackedModalContent>
          <Typography>Large modal content (max-width: lg)</Typography>
        </StackedModalContent>
      </StackedModal>

      <StackedModal
        open={fullscreenOpen}
        onClose={() => setFullscreenOpen(false)}
        navigationTitle="Fullscreen"
        fullScreen
      >
        <StackedModalContent>
          <Typography>Fullscreen modal content</Typography>
        </StackedModalContent>
      </StackedModal>
    </>
  );
};

export const AllSizes: Story = {
  render: () => <AllSizesComponent />,
};

const AllStatesComponent = () => {
  const [normalOpen, setNormalOpen] = useState(false);
  const [loadingOpen, setLoadingOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [disabledActionsOpen, setDisabledActionsOpen] = useState(false);

  return (
    <>
      <Stack spacing={2}>
        <Button variant="contained" onClick={() => setNormalOpen(true)}>
          Normal State
        </Button>
        <Button variant="contained" onClick={() => setLoadingOpen(true)}>
          Loading State
        </Button>
        <Button variant="contained" onClick={() => setErrorOpen(true)}>
          Error State
        </Button>
        <Button variant="contained" onClick={() => setDisabledActionsOpen(true)}>
          Disabled Actions
        </Button>
      </Stack>

      <StackedModal
        open={normalOpen}
        onClose={() => setNormalOpen(false)}
        navigationTitle="Normal State"
      >
        <StackedModalContent>
          <Typography>Normal modal state with default styling</Typography>
        </StackedModalContent>
      </StackedModal>

      <StackedModal
        open={loadingOpen}
        onClose={() => setLoadingOpen(false)}
        loading
        loadingText="Processing..."
        navigationTitle="Loading State"
      >
        <StackedModalContent>
          <Typography>Content hidden during loading</Typography>
        </StackedModalContent>
      </StackedModal>

      <StackedModal
        open={errorOpen}
        onClose={() => setErrorOpen(false)}
        navigationTitle="Error State"
      >
        <StackedModalContent>
          <Alert severity="error" sx={{ mb: 2 }}>
            An error occurred while processing your request
          </Alert>
          <Typography>Modal with error state displayed</Typography>
        </StackedModalContent>
      </StackedModal>

      <StackedModal
        open={disabledActionsOpen}
        onClose={() => setDisabledActionsOpen(false)}
        navigationTitle="Disabled Actions"
        actions={
          <Button variant="contained" size="small" disabled>
            Disabled Action
          </Button>
        }
      >
        <StackedModalContent>
          <Typography>Modal with disabled action buttons</Typography>
        </StackedModalContent>
      </StackedModal>
    </>
  );
};

export const AllStates: Story = {
  render: () => <AllStatesComponent />,
};

const InteractiveStatesComponent = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setFormOpen(false);
      setConfirmOpen(true);
    }, 2000);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setFormOpen(true)}>
        Interactive Form Modal
      </Button>

      <StackedModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        navigationTitle="Interactive Form"
        loading={submitting}
        loadingText="Submitting form..."
        actions={
          !submitting && (
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" size="small" onClick={() => setFormOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={handleSubmit}
                disabled={!formData.name || !formData.email}
              >
                Submit
              </Button>
            </Stack>
          )
        }
      >
        <StackedModalContent>
          <Typography variant="h6" gutterBottom>
            Interactive Form
          </Typography>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              helperText={!formData.name ? 'Name is required' : ''}
              error={!formData.name}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              helperText={!formData.email ? 'Email is required' : ''}
              error={!formData.email}
            />
          </Stack>
        </StackedModalContent>
      </StackedModal>

      <StackedModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        navigationTitle="Success"
        actions={
          <Button variant="contained" size="small" onClick={() => setConfirmOpen(false)}>
            Close
          </Button>
        }
      >
        <StackedModalContent>
          <Alert severity="success">Form submitted successfully!</Alert>
          <Typography sx={{ mt: 2 }}>Thank you for your submission, {formData.name}.</Typography>
        </StackedModalContent>
      </StackedModal>
    </>
  );
};

export const InteractiveStates: Story = {
  render: () => <InteractiveStatesComponent />,
};

const ResponsiveComponent = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tabletOpen, setTabletOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const getDeviceInfo = () => {
    if (isMobile) return 'Mobile (< 600px)';
    if (isTablet) return 'Tablet (600px - 960px)';
    return 'Desktop (> 960px)';
  };

  return (
    <>
      <Alert severity="info" sx={{ mb: 2 }}>
        Current viewport: {getDeviceInfo()}
      </Alert>

      <Stack spacing={2}>
        <Button variant="contained" onClick={() => setMobileOpen(true)}>
          Mobile Optimized Modal
        </Button>
        <Button variant="contained" onClick={() => setTabletOpen(true)}>
          Tablet Optimized Modal
        </Button>
        <Button variant="contained" onClick={() => setDesktopOpen(true)}>
          Desktop Modal
        </Button>
      </Stack>

      <StackedModal
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navigationTitle="Mobile Modal"
        maxWidth={isMobile ? false : 'sm'}
      >
        <StackedModalContent>
          <Typography variant="h6" gutterBottom>
            Mobile-Optimized Content
          </Typography>
          <Typography paragraph>
            This modal adapts to mobile screens with bottom sheet behavior and touch-friendly
            interactions.
          </Typography>
          <Stack spacing={2}>
            <Button variant="outlined" fullWidth>
              Mobile Action 1
            </Button>
            <Button variant="outlined" fullWidth>
              Mobile Action 2
            </Button>
          </Stack>
        </StackedModalContent>
      </StackedModal>

      <StackedModal
        open={tabletOpen}
        onClose={() => setTabletOpen(false)}
        navigationTitle="Tablet Modal"
        maxWidth="md"
      >
        <StackedModalContent>
          <Typography variant="h5" gutterBottom>
            Tablet-Optimized Layout
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Left Panel</Typography>
                <Typography>Content optimized for tablet screens</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Right Panel</Typography>
                <Typography>Multi-column layout on tablets</Typography>
              </Paper>
            </Grid>
          </Grid>
        </StackedModalContent>
      </StackedModal>

      <StackedModal
        open={desktopOpen}
        onClose={() => setDesktopOpen(false)}
        navigationTitle="Desktop Modal"
        maxWidth="lg"
      >
        <StackedModalContent>
          <Typography variant="h4" gutterBottom>
            Desktop-Optimized Experience
          </Typography>
          <Typography paragraph>
            Large modal with extensive content suitable for desktop viewing.
          </Typography>
          <Grid container spacing={3}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Feature {i + 1}</Typography>
                    <Typography color="text.secondary">
                      Desktop users can see more content at once
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </StackedModalContent>
      </StackedModal>
    </>
  );
};

export const Responsive: Story = {
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1440px', height: '900px' } },
      },
      defaultViewport: 'mobile',
    },
  },
  render: () => <ResponsiveComponent />,
};

const DensityModesComponent = () => {
  const [compactOpen, setCompactOpen] = useState(false);
  const [normalOpen, setNormalOpen] = useState(false);
  const [spaciousOpen, setSpaciousOpen] = useState(false);

  return (
    <Stack direction="row" spacing={4} alignItems="flex-start">
      <DensityProvider defaultMode="compact">
        <Box>
          <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
            Compact (0.8x)
          </Typography>
          <Button variant="outlined" size="small" onClick={() => setCompactOpen(true)}>
            Open Compact
          </Button>
          <StackedModal
            open={compactOpen}
            onClose={() => setCompactOpen(false)}
            navigationTitle="Compact Modal"
          >
            <StackedModalContent>
              <Typography>Compact density modal with tighter spacing</Typography>
            </StackedModalContent>
          </StackedModal>
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="normal">
        <Box>
          <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
            Normal (1.0x)
          </Typography>
          <Button variant="outlined" onClick={() => setNormalOpen(true)}>
            Open Normal
          </Button>
          <StackedModal
            open={normalOpen}
            onClose={() => setNormalOpen(false)}
            navigationTitle="Normal Modal"
          >
            <StackedModalContent>
              <Typography>Normal density modal with standard spacing</Typography>
            </StackedModalContent>
          </StackedModal>
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="spacious">
        <Box>
          <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
            Spacious (1.25x)
          </Typography>
          <Button variant="outlined" size="large" onClick={() => setSpaciousOpen(true)}>
            Open Spacious
          </Button>
          <StackedModal
            open={spaciousOpen}
            onClose={() => setSpaciousOpen(false)}
            navigationTitle="Spacious Modal"
          >
            <StackedModalContent>
              <Typography>Spacious density modal with extra breathing room</Typography>
            </StackedModalContent>
          </StackedModal>
        </Box>
      </DensityProvider>
    </Stack>
  );
};

export const DensityModes: Story = {
  render: () => <DensityModesComponent />,
};
