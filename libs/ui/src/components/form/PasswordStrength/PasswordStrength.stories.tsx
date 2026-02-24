import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { DensityProvider } from '../../../utils/density';
import { PasswordStrength } from './PasswordStrength';

const meta: Meta<typeof PasswordStrength> = {
  title: 'Form/PasswordStrength',
  component: PasswordStrength,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A password strength indicator component with real-time feedback, requirements checking, and beautiful visual indicators.',
      },
    },
  },
  tags: ['autodocs', 'component:PasswordStrength'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['linear', 'circular', 'steps'],
      description: 'Visual style of the strength indicator',
    },
    showRequirements: {
      control: 'boolean',
      description: 'Show password requirements checklist',
    },
    showStrengthLabel: {
      control: 'boolean',
      description: 'Show strength level text',
    },
    showSuggestions: {
      control: 'boolean',
      description: 'Show password improvement suggestions',
    },
    animated: {
      control: 'boolean',
      description: 'Enable smooth animations',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultComponent = () => {
  const [password, setPassword] = React.useState('');

  return (
    <Stack spacing={3} sx={{ maxWidth: 400 }}>
      <TextField
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        placeholder="Enter your password"
      />
      <PasswordStrength
        value={password}
        variant="linear"
        showRequirements={true}
        showStrengthLabel={true}
      />
    </Stack>
  );
};

export const Default: Story = {
  render: () => <DefaultComponent />,
};

const AllVariantsComponent = () => {
  const [password, setPassword] = React.useState('MyP@ssw0rd123!');

  return (
    <Stack spacing={4}>
      <TextField
        type="password"
        label="Test Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        helperText="Try different passwords to see the indicators change"
      />

      <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Linear Progress
          </Typography>
          <PasswordStrength value={password} variant="linear" showStrengthLabel={true} />
        </Paper>

        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Circular Progress
          </Typography>
          <PasswordStrength value={password} variant="circular" showStrengthLabel={true} />
        </Paper>

        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Steps Indicator
          </Typography>
          <PasswordStrength value={password} variant="steps" showStrengthLabel={true} />
        </Paper>

        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Detailed View
          </Typography>
          <PasswordStrength value={password} variant="detailed" showStrengthLabel={true} />
        </Paper>
      </Box>
    </Stack>
  );
};

export const AllVariants: Story = {
  render: () => <AllVariantsComponent />,
};

const WithRequirementsComponent = () => {
  const [password, setPassword] = React.useState('');

  return (
    <Stack spacing={3} sx={{ maxWidth: 500 }}>
      <Typography variant="h6">Create a Strong Password</Typography>

      <TextField
        type="password"
        label="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        placeholder="Enter a strong password"
      />

      <PasswordStrength
        value={password}
        variant="linear"
        showRequirements={true}
        showStrengthLabel={true}
        showSuggestions={true}
        requirements={{
          minLength: 8,
          uppercase: true,
          lowercase: true,
          numbers: true,
          special: true,
        }}
      />
    </Stack>
  );
};

export const WithRequirements: Story = {
  render: () => <WithRequirementsComponent />,
};

export const PasswordComparison: Story = {
  render: () => {
    const passwords = {
      weak: 'password',
      fair: 'Password1',
      good: 'MyPassword123',
      strong: 'MyP@ssw0rd!',
      veryStrong: 'MyS3cur3P@ssw0rd!2024',
    };

    return (
      <Stack spacing={3}>
        <Typography variant="h6">Password Strength Examples</Typography>

        {Object.entries(passwords).map(([level, pwd]) => (
          <Paper key={level} sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom sx={{ textTransform: 'capitalize' }}>
              {level}: "{pwd}"
            </Typography>
            <PasswordStrength value={pwd} variant="linear" showStrengthLabel={true} />
          </Paper>
        ))}
      </Stack>
    );
  },
};

const RegistrationFormComponent = () => {
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [showSuccess, setShowSuccess] = React.useState(false);

  const passwordsMatch = password === confirmPassword && password !== '';
  const isStrong = password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);

  const handleSubmit = () => {
    if (passwordsMatch && isStrong) {
      setShowSuccess(true);
      window.setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <Stack spacing={3} sx={{ maxWidth: 400 }}>
      <Typography variant="h6">Create Your Account</Typography>

      <TextField label="Email" type="email" fullWidth defaultValue="user@example.com" />

      <TextField
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />

      <PasswordStrength
        value={password}
        variant="linear"
        showRequirements={true}
        showStrengthLabel={true}
      />

      <TextField
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
        error={confirmPassword !== '' && !passwordsMatch}
        helperText={confirmPassword !== '' && !passwordsMatch ? 'Passwords do not match' : ''}
      />

      {showSuccess && <Alert severity="success">Account created successfully!</Alert>}

      <button onClick={handleSubmit} disabled={!passwordsMatch || !isStrong}>
        Create Account
      </button>
    </Stack>
  );
};

export const RegistrationForm: Story = {
  render: () => <RegistrationFormComponent />,
};

const WithCustomRequirementsComponent = () => {
  const [password, setPassword] = React.useState('');

  return (
    <Stack spacing={3} sx={{ maxWidth: 500 }}>
      <Typography variant="h6">Enterprise Password Policy</Typography>

      <Alert severity="info">Your organization requires strong passwords for security</Alert>

      <TextField
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />

      <PasswordStrength
        value={password}
        variant="linear"
        showRequirements={true}
        showStrengthLabel={true}
        showSuggestions={true}
        requirements={{
          minLength: 12,
          uppercase: true,
          lowercase: true,
          numbers: true,
          special: true,
        }}
      />
    </Stack>
  );
};

export const WithCustomRequirements: Story = {
  render: () => <WithCustomRequirementsComponent />,
};

const RealTimeValidationComponent = () => {
  const [password, setPassword] = React.useState('');
  const [focused, setFocused] = React.useState(false);

  return (
    <Stack spacing={3} sx={{ maxWidth: 400 }}>
      <Typography variant="h6">Real-time Password Validation</Typography>

      <TextField
        type="password"
        label="Create Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        fullWidth
        placeholder="Start typing..."
      />

      {(focused || password) && (
        <PasswordStrength
          value={password}
          variant="linear"
          showRequirements={true}
          showStrengthLabel={true}
          showSuggestions={focused}
          animated={true}
        />
      )}

      {password.length > 0 && (
        <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
          <Typography variant="caption">
            Password entropy: {(password.length * 4.3).toFixed(0)} bits
          </Typography>
        </Paper>
      )}
    </Stack>
  );
};

export const RealTimeValidation: Story = {
  render: () => <RealTimeValidationComponent />,
};

const MinimalIndicatorComponent = () => {
  const [password, setPassword] = React.useState('');

  return (
    <Stack spacing={2} sx={{ maxWidth: 300 }}>
      <TextField
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        size="small"
      />
      <PasswordStrength
        value={password}
        variant="linear"
        showRequirements={false}
        showStrengthLabel={false}
        showSuggestions={false}
      />
    </Stack>
  );
};

export const MinimalIndicator: Story = {
  render: () => <MinimalIndicatorComponent />,
};

// Required story exports for validation
export const AllSizes: Story = {
  render: () => (
    <Stack spacing={4}>
      <Typography variant="h6">Different Sizes</Typography>

      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Small Indicator
        </Typography>
        <Box sx={{ transform: 'scale(0.8)', transformOrigin: 'left center' }}>
          <PasswordStrength
            value="MyP@ssw0rd123!"
            variant="linear"
            showRequirements={false}
            showStrengthLabel={true}
          />
        </Box>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Medium Indicator (Default)
        </Typography>
        <PasswordStrength
          value="MyP@ssw0rd123!"
          variant="linear"
          showRequirements={false}
          showStrengthLabel={true}
        />
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Large Indicator
        </Typography>
        <Box sx={{ transform: 'scale(1.2)', transformOrigin: 'left center' }}>
          <PasswordStrength
            value="MyP@ssw0rd123!"
            variant="linear"
            showRequirements={false}
            showStrengthLabel={true}
          />
        </Box>
      </Paper>
    </Stack>
  ),
};

export const AllStates: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="h6">All Strength States</Typography>

      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle2" color="error.main">
          Very Weak
        </Typography>
        <PasswordStrength value="123" variant="linear" showStrengthLabel={true} />
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle2" color="warning.main">
          Weak
        </Typography>
        <PasswordStrength value="password" variant="linear" showStrengthLabel={true} />
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle2" color="info.main">
          Fair
        </Typography>
        <PasswordStrength value="Password123" variant="linear" showStrengthLabel={true} />
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle2" color="success.main">
          Good
        </Typography>
        <PasswordStrength value="MyPassword123!" variant="linear" showStrengthLabel={true} />
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle2" color="success.dark">
          Very Strong
        </Typography>
        <PasswordStrength value="MyS3cur3P@ssw0rd!2024" variant="linear" showStrengthLabel={true} />
      </Paper>
    </Stack>
  ),
};

export const InteractiveStates: Story = {
  render: () => {
    const InteractiveComponent = () => {
      const [password, setPassword] = React.useState('');
      const [showRequirements, setShowRequirements] = React.useState(true);
      const [variant, setVariant] = React.useState<'linear' | 'circular' | 'steps'>('linear');

      return (
        <Stack spacing={3} sx={{ maxWidth: 500 }}>
          <Typography variant="h6">Interactive Controls</Typography>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <button onClick={() => setShowRequirements(!showRequirements)}>
              {showRequirements ? 'Hide' : 'Show'} Requirements
            </button>
            <button
              onClick={() =>
                setVariant(
                  variant === 'linear' ? 'circular' : variant === 'circular' ? 'steps' : 'linear',
                )
              }
            >
              Variant: {variant}
            </button>
            <button onClick={() => setPassword('')}>Clear</button>
          </Box>

          <TextField
            type="password"
            label="Test Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type to see real-time updates"
            fullWidth
          />

          <PasswordStrength
            value={password}
            variant={variant}
            showRequirements={showRequirements}
            showStrengthLabel={true}
          />
        </Stack>
      );
    };

    return <InteractiveComponent />;
  },
};

export const Responsive: Story = {
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1024px', height: '768px' } },
      },
      defaultViewport: 'mobile',
    },
  },
  render: () => (
    <Stack spacing={4}>
      <Typography variant="h6">Responsive Behavior</Typography>

      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Mobile View (Stacked)
          </Typography>
          <Box sx={{ maxWidth: 300 }}>
            <PasswordStrength
              value="MyPassword123!"
              variant="linear"
              showRequirements={true}
              showStrengthLabel={true}
            />
          </Box>
        </Paper>

        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Desktop View (Full Width)
          </Typography>
          <PasswordStrength
            value="MyPassword123!"
            variant="linear"
            showRequirements={true}
            showStrengthLabel={true}
          />
        </Paper>
      </Box>

      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Compact Mobile
        </Typography>
        <Box sx={{ maxWidth: 250 }}>
          <PasswordStrength
            value="MyPassword123!"
            variant="steps"
            showRequirements={false}
            showStrengthLabel={true}
          />
        </Box>
      </Paper>
    </Stack>
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
          <PasswordStrength
            value="TestPass123!"
            showRequirements
            showStrengthLabel
          />
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="normal">
        <Box sx={{ width: 250 }}>
          <Typography variant="caption" gutterBottom display="block">
            Normal (1.0x)
          </Typography>
          <PasswordStrength
            value="TestPass123!"
            showRequirements
            showStrengthLabel
          />
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="spacious">
        <Box sx={{ width: 250 }}>
          <Typography variant="caption" gutterBottom display="block">
            Spacious (1.25x)
          </Typography>
          <PasswordStrength
            value="TestPass123!"
            showRequirements
            showStrengthLabel
          />
        </Box>
      </DensityProvider>
    </Stack>
  ),
};
