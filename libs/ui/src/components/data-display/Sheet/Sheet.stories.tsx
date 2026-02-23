import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import PauseIcon from '@mui/icons-material/Pause';
import PersonIcon from '@mui/icons-material/Person';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SettingsIcon from '@mui/icons-material/Settings';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';

import { DensityProvider } from '../../../utils/density';
import { Sheet } from './Sheet';
import type { SheetProps } from './Sheet.types';

const meta: Meta<typeof Sheet> = {
  title: 'DataDisplay/Sheet',
  component: Sheet,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'component:Sheet'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    variant: {
      control: 'select',
      options: ['default', 'glass', 'gradient', 'elevated', 'minimal', 'draggable'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'full'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sheet>;

const SheetWrapper: React.FC<SheetProps & { buttonText?: string }> = ({
  buttonText = 'Open Sheet',
  ...props
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        {buttonText}
      </Button>
      <Sheet {...props} open={open} onOpenChange={setOpen} />
    </>
  );
};

export const Default: Story = {
  render: (args) => (
    <SheetWrapper {...args}>
      <Typography variant="h6" gutterBottom>
        Default Sheet Content
      </Typography>
      <Typography variant="body2" color="text.secondary">
        This is a basic sheet component that slides in from the bottom.
      </Typography>
    </SheetWrapper>
  ),
  args: {
    title: 'Sheet Title',
    description: 'This is a sheet description',
    position: 'bottom',
  },
};

export const Positions: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      {(['top', 'bottom', 'left', 'right'] as const).map((position) => (
        <SheetWrapper
          key={position}
          position={position}
          title={`${position} Sheet`}
          buttonText={`Open ${position}`}
        >
          <Typography>This sheet slides in from the {position}</Typography>
        </SheetWrapper>
      ))}
    </Box>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl', 'full'] as const).map((size) => (
        <SheetWrapper
          key={size}
          size={size}
          title={`Size: ${size.toUpperCase()}`}
          buttonText={`Size ${size}`}
        >
          <Typography>This is a {size} sized sheet</Typography>
        </SheetWrapper>
      ))}
    </Box>
  ),
};

export const Variants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      {(['default', 'glass', 'gradient', 'elevated', 'minimal'] as const).map((variant) => (
        <SheetWrapper
          key={variant}
          variant={variant}
          title={`${variant} Variant`}
          buttonText={variant}
          glow={variant === 'glass'}
          glass={variant === 'glass'}
          gradient={variant === 'gradient'}
        >
          <Typography>This is a {variant} variant sheet</Typography>
        </SheetWrapper>
      ))}
    </Box>
  ),
};

const DraggableBottomSheetComponent = () => {
  const [open, setOpen] = useState(false);
  const [currentSnapPoint, setCurrentSnapPoint] = useState(0.5);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Draggable Bottom Sheet
      </Button>
      <Sheet
        open={open}
        onOpenChange={setOpen}
        variant="draggable"
        position="bottom"
        title="Draggable Sheet"
        description={`Current height: ${Math.round(currentSnapPoint * 100)}%`}
        snapPoints={[0.25, 0.5, 0.75, 1]}
        defaultSnapPoint={0.5}
        onSnapPointChange={setCurrentSnapPoint}
        showHandle
      >
        <Stack spacing={2}>
          <Typography variant="body1">
            Drag the handle to resize this sheet. It will snap to 25%, 50%, 75%, or 100% height.
          </Typography>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Features:
            </Typography>
            <List dense>
              <ListItem>• Smooth spring animations</ListItem>
              <ListItem>• Velocity-based snapping</ListItem>
              <ListItem>• Boundary resistance</ListItem>
              <ListItem>• Touch and mouse support</ListItem>
            </List>
          </Paper>
          <Box sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Try dragging quickly to trigger velocity-based snapping!
            </Typography>
          </Box>
        </Stack>
      </Sheet>
    </>
  );
};

export const DraggableBottomSheet: Story = {
  render: () => <DraggableBottomSheetComponent />,
};

const MusicPlayerComponent = () => {
  const [open, setOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const [progress, setProgress] = useState(45);

  return (
    <>
      <Button variant="contained" startIcon={<PlayArrowIcon />} onClick={() => setOpen(true)}>
        Open Music Player
      </Button>
      <Sheet
        open={open}
        onOpenChange={setOpen}
        variant="draggable"
        position="bottom"
        snapPoints={[0.15, 0.5, 0.95]}
        defaultSnapPoint={0.15}
        showHandle
        color="secondary"
        glow
      >
        <Box sx={{ p: 2 }}>
          {/* Mini Player View */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ width: 60, height: 60, mr: 2 }} src="https://via.placeholder.com/60" />
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Song Title
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Artist Name
              </Typography>
            </Box>
            <IconButton onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
          </Box>

          {/* Expanded Controls */}
          <Stack spacing={2}>
            <Slider
              value={progress}
              onChange={(e, v) => setProgress(v as number)}
              aria-label="Progress"
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">1:45</Typography>
              <Typography variant="caption">3:20</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
              <IconButton>
                <SkipPreviousIcon />
              </IconButton>
              <IconButton
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'primary.dark' },
                }}
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <IconButton>
                <SkipNextIcon />
              </IconButton>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <VolumeUpIcon />
              <Slider
                value={volume}
                onChange={(e, v) => setVolume(v as number)}
                aria-label="Volume"
              />
            </Box>
          </Stack>
        </Box>
      </Sheet>
    </>
  );
};

export const MusicPlayer: Story = {
  render: () => <MusicPlayerComponent />,
};

const CustomSnapPointsComponent = () => {
  const [open, setOpen] = useState(false);
  const [snapPoint, setSnapPoint] = useState(0.3);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Custom Snap Points
      </Button>
      <Sheet
        open={open}
        onOpenChange={setOpen}
        variant="draggable"
        position="bottom"
        title="Custom Snap Points"
        snapPoints={[0.1, 0.3, 0.6, 0.9]}
        defaultSnapPoint={0.3}
        onSnapPointChange={setSnapPoint}
        showHandle
        minSnapPoint={0.1}
        maxSnapPoint={0.9}
      >
        <Stack spacing={2}>
          <Paper sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="h6">Current: {Math.round(snapPoint * 100)}%</Typography>
          </Paper>
          <Typography>This sheet has custom snap points at:</Typography>
          <Grid container spacing={1}>
            {[10, 30, 60, 90].map((percent) => (
              <Grid item xs={3} key={percent}>
                <Card>
                  <CardContent>
                    <Typography align="center" fontWeight="bold">
                      {percent}%
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Typography variant="body2" color="text.secondary">
            The sheet is constrained between 10% and 90% height.
          </Typography>
        </Stack>
      </Sheet>
    </>
  );
};

export const CustomSnapPoints: Story = {
  render: () => <CustomSnapPointsComponent />,
};

const WithResistanceComponent = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Sheet with High Resistance
      </Button>
      <Sheet
        open={open}
        onOpenChange={setOpen}
        variant="draggable"
        position="bottom"
        title="High Drag Resistance"
        description="Feel the resistance at boundaries"
        snapPoints={[0.3, 0.7]}
        defaultSnapPoint={0.3}
        dragResistance={0.1}
        showHandle
      >
        <Typography variant="body1" paragraph>
          This sheet has high drag resistance (0.1) at the boundaries.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Try dragging beyond the snap points to feel the rubber-band effect.
        </Typography>
      </Sheet>
    </>
  );
};

export const WithResistance: Story = {
  render: () => <WithResistanceComponent />,
};

const DraggableWithContentComponent = () => {
  const [open, setOpen] = useState(false);
  const items = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    description: `Description for item ${i + 1}`,
  }));

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Draggable List
      </Button>
      <Sheet
        open={open}
        onOpenChange={setOpen}
        variant="draggable"
        position="bottom"
        title="Scrollable Content"
        description="Drag to resize, scroll to navigate"
        snapPoints={[0.25, 0.5, 0.75, 1]}
        defaultSnapPoint={0.5}
        showHandle
        footer={
          <Button variant="contained" fullWidth>
            Load More Items
          </Button>
        }
      >
        <List>
          {items.map((item) => (
            <ListItem key={item.id} divider>
              <ListItemText primary={item.title} secondary={item.description} />
            </ListItem>
          ))}
        </List>
      </Sheet>
    </>
  );
};

export const DraggableWithContent: Story = {
  render: () => <DraggableWithContentComponent />,
};

export const WithForm: Story = {
  render: (args) => (
    <SheetWrapper
      {...args}
      title="User Settings"
      description="Update your profile information"
      footer={
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button variant="outlined">Cancel</Button>
          <Button variant="contained" color="primary">
            Save Changes
          </Button>
        </Box>
      }
    >
      <Stack spacing={3}>
        <TextField label="Full Name" fullWidth defaultValue="John Doe" />
        <TextField label="Email" type="email" fullWidth defaultValue="john.doe@example.com" />
        <TextField
          label="Bio"
          multiline
          rows={4}
          fullWidth
          placeholder="Tell us about yourself..."
        />
        <FormControlLabel control={<Switch defaultChecked />} label="Email notifications" />
        <FormControlLabel control={<Switch />} label="Make profile public" />
      </Stack>
    </SheetWrapper>
  ),
  args: {
    position: 'right',
    size: 'md',
  },
};

export const WithList: Story = {
  render: (args) => {
    const items = [
      { id: 1, name: 'John Doe', role: 'Admin', status: 'active' },
      { id: 2, name: 'Jane Smith', role: 'User', status: 'active' },
      { id: 3, name: 'Bob Johnson', role: 'Moderator', status: 'inactive' },
      { id: 4, name: 'Alice Brown', role: 'User', status: 'active' },
    ];

    return (
      <SheetWrapper {...args} title="Team Members" description="Manage your team">
        <List>
          {items.map((item) => (
            <ListItem key={item.id}>
              <Avatar sx={{ mr: 2 }}>
                <PersonIcon />
              </Avatar>
              <ListItemText primary={item.name} secondary={item.role} />
              <Chip
                label={item.status}
                color={item.status === 'active' ? 'success' : 'default'}
                size="small"
              />
            </ListItem>
          ))}
        </List>
      </SheetWrapper>
    );
  },
  args: {
    position: 'left',
    size: 'sm',
  },
};

export const Glass: Story = {
  render: (args) => (
    <SheetWrapper
      {...args}
      variant="glass"
      glass
      glow
      title="Glass Effect"
      description="Beautiful glassmorphism design"
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Modern Glass Design
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          This sheet features a glass morphism effect with backdrop blur and transparency.
        </Typography>
        <Button variant="contained" fullWidth>
          Action Button
        </Button>
      </Box>
    </SheetWrapper>
  ),
};

export const Gradient: Story = {
  render: (args) => (
    <SheetWrapper {...args} variant="gradient" gradient color="primary" title="Gradient Background">
      <Typography variant="h6" gutterBottom>
        Beautiful Gradient
      </Typography>
      <Typography variant="body2" color="text.secondary">
        This sheet has a subtle gradient background effect.
      </Typography>
    </SheetWrapper>
  ),
};

export const WithEffects: Story = {
  render: (args) => (
    <SheetWrapper
      {...args}
      variant="glass"
      glow
      pulse
      glass
      title="Enhanced Effects"
      description="Multiple visual effects combined"
    >
      <Typography>This sheet combines glow and pulse effects with glass morphism.</Typography>
    </SheetWrapper>
  ),
};

export const Swipeable: Story = {
  render: (args) => (
    <SheetWrapper
      {...args}
      swipeable
      title="Swipeable Sheet"
      description="Swipe down to close"
      buttonText="Open Swipeable"
    >
      <Typography variant="body1" paragraph>
        This sheet can be swiped to close on mobile devices.
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Try swiping down from the handle to dismiss.
      </Typography>
    </SheetWrapper>
  ),
  args: {
    position: 'bottom',
    showHandle: true,
  },
};

export const Persistent: Story = {
  render: (args) => (
    <SheetWrapper
      {...args}
      persistent
      closeOnOverlayClick={false}
      closeOnEscape={false}
      showCloseButton={false}
      title="Persistent Sheet"
      description="Cannot be closed by user"
      footer={
        <Button variant="contained" color="error" fullWidth>
          Force Close (Only way to close)
        </Button>
      }
    >
      <Typography variant="body1" paragraph>
        This sheet is persistent and cannot be closed by:
      </Typography>
      <List>
        <ListItem>• Clicking the overlay</ListItem>
        <ListItem>• Pressing Escape key</ListItem>
        <ListItem>• Close button (hidden)</ListItem>
      </List>
    </SheetWrapper>
  ),
};

export const Loading: Story = {
  render: (args) => (
    <SheetWrapper {...args} loading title="Loading Content" description="Please wait..." />
  ),
};

export const NoOverlay: Story = {
  render: (args) => (
    <SheetWrapper
      {...args}
      showOverlay={false}
      title="No Overlay"
      description="Sheet without backdrop overlay"
    >
      <Typography>This sheet appears without a backdrop overlay.</Typography>
    </SheetWrapper>
  ),
};

export const CustomHeader: Story = {
  render: (args) => (
    <SheetWrapper
      {...args}
      header={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
          <Avatar>
            <PersonIcon />
          </Avatar>
          <Box>
            <Typography variant="h6">John Doe</Typography>
            <Typography variant="caption" color="text.secondary">
              john.doe@example.com
            </Typography>
          </Box>
        </Box>
      }
    >
      <Typography>Sheet with custom header content</Typography>
    </SheetWrapper>
  ),
};

export const FullHeight: Story = {
  render: (args) => (
    <SheetWrapper {...args} fullHeight title="Full Height Sheet" position="right" size="md">
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" gutterBottom>
          Full Height Content
        </Typography>
        <Box sx={{ flex: 1, bgcolor: 'grey.100', p: 2, borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary">
            This content area expands to fill the full height
          </Typography>
        </Box>
      </Box>
    </SheetWrapper>
  ),
};

const SettingsComponent = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <>
      <Button variant="contained" startIcon={<SettingsIcon />} onClick={() => setOpen(true)}>
        Open Settings
      </Button>
      <Sheet
        open={open}
        onOpenChange={setOpen}
        title="Application Settings"
        position="right"
        size="md"
        variant="elevated"
        footer={
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" onClick={() => setOpen(false)} fullWidth>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={() => setOpen(false)} fullWidth>
              Save
            </Button>
          </Box>
        }
      >
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Appearance
            </Typography>
            <FormControlLabel
              control={
                <Switch checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />
              }
              label="Dark Mode"
            />
          </Box>

          <Divider />

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Notifications
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                />
              }
              label="Enable Notifications"
            />
          </Box>

          <Divider />

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Data & Storage
            </Typography>
            <FormControlLabel
              control={
                <Switch checked={autoSave} onChange={(e) => setAutoSave(e.target.checked)} />
              }
              label="Auto-save"
            />
          </Box>
        </Stack>
      </Sheet>
    </>
  );
};

export const Settings: Story = {
  render: () => <SettingsComponent />,
};

// Required story exports for validation
export const AllVariants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      {(['default', 'glass', 'gradient', 'elevated', 'minimal', 'draggable'] as const).map(
        (variant) => (
          <SheetWrapper
            key={variant}
            variant={variant}
            title={`${variant} Variant`}
            buttonText={variant}
            glow={variant === 'glass'}
            glass={variant === 'glass'}
            gradient={variant === 'gradient'}
          >
            <Typography>This is a {variant} variant sheet</Typography>
          </SheetWrapper>
        ),
      )}
    </Box>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl', 'full'] as const).map((size) => (
        <SheetWrapper
          key={size}
          size={size}
          title={`Size: ${size.toUpperCase()}`}
          buttonText={`Size ${size}`}
        >
          <Typography>This is a {size} sized sheet</Typography>
        </SheetWrapper>
      ))}
    </Box>
  ),
};

export const AllStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <SheetWrapper title="Loading State" buttonText="Loading" loading />
      <SheetWrapper title="Disabled State" buttonText="Disabled" disabled>
        <Typography>Disabled content</Typography>
      </SheetWrapper>
      <SheetWrapper
        title="Persistent State"
        buttonText="Persistent"
        persistent
        closeOnOverlayClick={false}
        closeOnEscape={false}
      >
        <Typography>Persistent sheet - cannot be easily closed</Typography>
      </SheetWrapper>
      <SheetWrapper title="No Overlay State" buttonText="No Overlay" showOverlay={false}>
        <Typography>Sheet without backdrop</Typography>
      </SheetWrapper>
    </Box>
  ),
};

export const InteractiveStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <SheetWrapper
        title="Swipeable Sheet"
        buttonText="Swipeable"
        swipeable
        showHandle
        position="bottom"
      >
        <Typography>Swipe down to close (mobile)</Typography>
      </SheetWrapper>
      <SheetWrapper
        variant="draggable"
        title="Draggable Sheet"
        buttonText="Draggable"
        position="bottom"
        snapPoints={[0.25, 0.5, 0.75]}
        defaultSnapPoint={0.5}
        showHandle
      >
        <Typography>Drag to resize</Typography>
      </SheetWrapper>
      <SheetWrapper title="With Effects" buttonText="Glow & Glass" variant="glass" glow glass pulse>
        <Typography>Interactive visual effects</Typography>
      </SheetWrapper>
    </Box>
  ),
};

export const Responsive: Story = {
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1440px', height: '900px' } },
      },
    },
    chromatic: {
      viewports: [375, 768, 1440],
    },
  },
  render: () => (
    <Box>
      <Typography variant="body2" sx={{ mb: 2 }}>
        This sheet adapts to different screen sizes
      </Typography>
      <SheetWrapper
        title="Responsive Sheet"
        description="Adapts to viewport size"
        buttonText="Open Responsive Sheet"
        position="bottom"
        size="md"
      >
        <Stack spacing={2}>
          <Typography variant="h6">Responsive Content</Typography>
          <Typography variant="body2">
            This sheet adjusts its behavior and appearance based on the viewport size.
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
              gap: 2,
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Paper key={i} sx={{ p: 2 }}>
                <Typography>Item {i}</Typography>
              </Paper>
            ))}
          </Box>
        </Stack>
      </SheetWrapper>
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
          <SheetWrapper buttonText="Open Compact Sheet" title="Compact Density" side="right">
            <Stack spacing={2} sx={{ p: 2 }}>
              <Typography variant="body2">This sheet uses compact density.</Typography>
              <Typography variant="body2">Notice the reduced spacing.</Typography>
            </Stack>
          </SheetWrapper>
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="normal">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Normal (1.0x)
          </Typography>
          <SheetWrapper buttonText="Open Normal Sheet" title="Normal Density" side="right">
            <Stack spacing={2} sx={{ p: 2 }}>
              <Typography variant="body2">This sheet uses normal density.</Typography>
              <Typography variant="body2">Standard spacing applied.</Typography>
            </Stack>
          </SheetWrapper>
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="spacious">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Spacious (1.25x)
          </Typography>
          <SheetWrapper buttonText="Open Spacious Sheet" title="Spacious Density" side="right">
            <Stack spacing={2} sx={{ p: 2 }}>
              <Typography variant="body2">This sheet uses spacious density.</Typography>
              <Typography variant="body2">Extra spacing for readability.</Typography>
            </Stack>
          </SheetWrapper>
        </Box>
      </DensityProvider>
    </Stack>
  ),
};
