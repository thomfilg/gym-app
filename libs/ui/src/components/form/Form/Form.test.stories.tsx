import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, waitFor,within } from 'storybook/test';

import { Form, FormField } from './Form';

const meta: Meta<typeof Form> = {
  title: 'Form/Form/Tests',
  component: Form,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
    docs: {
      description: {
        component:
          'Comprehensive test stories for Form component covering interaction, accessibility, visual, performance, and edge case testing.',
      },
    },
  },
  tags: ['autodocs', 'test', 'component:Form'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Test 1: Basic Interaction Test
export const BasicInteraction: Story = {
  args: {
    variant: 'vertical',
    maxWidth: 'sm',
    spacing: 'md',
    onSubmit: fn(),
    dataTestId: 'login-form',
    children: (
      <>
        <FormField name="email" label="Email" required dataTestId="email-field">
          <TextField
            type="email"
            placeholder="Enter your email"
            fullWidth
            defaultValue=""
            inputProps={{ 'data-testid': 'email-input' }}
          />
        </FormField>
        <FormField name="password" label="Password" required dataTestId="password-field">
          <TextField
            type="password"
            placeholder="Enter your password"
            fullWidth
            defaultValue=""
            inputProps={{ 'data-testid': 'password-input' }}
          />
        </FormField>
        <Button variant="contained" type="submit" fullWidth data-testid="submit-button">
          Submit
        </Button>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify form testId
    const form = canvas.getByTestId('login-form');
    expect(form).toBeInTheDocument();
    expect(form).toHaveAttribute('role', 'form');

    // Verify FormField testIds
    const emailField = canvas.getByTestId('email-field');
    const passwordField = canvas.getByTestId('password-field');
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();

    // Verify nested testIds (label, control)
    const emailLabel = canvas.getByTestId('email-field-label');
    const emailControl = canvas.getByTestId('email-field-control');
    const passwordLabel = canvas.getByTestId('password-field-label');
    const passwordControl = canvas.getByTestId('password-field-control');

    expect(emailLabel).toBeInTheDocument();
    expect(emailControl).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
    expect(passwordControl).toBeInTheDocument();

    // Find form elements - use the input elements directly
    const emailInput = canvas.getByTestId('email-input') as HTMLInputElement;
    const passwordInput = canvas.getByTestId('password-input') as HTMLInputElement;
    const submitButton = canvas.getByTestId('submit-button');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    // Clear inputs first
    await userEvent.clear(emailInput);
    await userEvent.clear(passwordInput);

    // Test basic interactions
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    // Wait for the values to be updated
    await waitFor(() => {
      expect(emailInput).toHaveValue('test@example.com');
      expect(passwordInput).toHaveValue('password123');
    });
  },
};

// Test 2: Keyboard Navigation Test
export const KeyboardNavigation: Story = {
  args: {
    variant: 'vertical',
    maxWidth: 'sm',
    spacing: 'md',
    children: (
      <>
        <FormField name="field1" label="First Field" required>
          <TextField
            placeholder="First field"
            fullWidth
            inputProps={{ 'data-testid': 'first-field' }}
          />
        </FormField>
        <FormField name="field2" label="Second Field" required>
          <TextField
            placeholder="Second field"
            fullWidth
            inputProps={{ 'data-testid': 'second-field' }}
          />
        </FormField>
        <Button variant="contained" type="submit" data-testid="submit-btn" fullWidth>
          Submit
        </Button>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const firstField = canvas.getByTestId('first-field');
    const secondField = canvas.getByTestId('second-field');
    const submitButton = canvas.getByTestId('submit-btn');

    // Focus first field
    await userEvent.click(firstField);
    await waitFor(() => {
      expect(firstField).toHaveFocus();
    });

    // Tab to second field
    await userEvent.tab();
    await waitFor(() => {
      expect(secondField).toHaveFocus();
    });

    // Tab to submit button
    await userEvent.tab();
    await waitFor(() => {
      expect(submitButton).toHaveFocus();
    });
  },
};

// Test 3: Responsive Design Test
export const ResponsiveDesign: Story = {
  args: {
    variant: 'vertical',
    maxWidth: 'full',
    spacing: 'md',
    children: (
      <>
        <Typography variant="h6" mb={2}>
          Responsive Form Layout
        </Typography>
        <div data-testid="responsive-container">
          <FormField name="firstName" label="First Name" required>
            <TextField
              placeholder="First name"
              fullWidth
              inputProps={{ 'data-testid': 'first-name' }}
            />
          </FormField>
          <FormField name="lastName" label="Last Name" required>
            <TextField
              placeholder="Last name"
              fullWidth
              inputProps={{ 'data-testid': 'last-name' }}
            />
          </FormField>
        </div>
      </>
    ),
  },
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '667px' },
          type: 'mobile',
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
          type: 'tablet',
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1920px', height: '1080px' },
          type: 'desktop',
        },
      },
      defaultViewport: 'mobile',
    },
    chromatic: {
      viewports: [375, 768, 1920],
      delay: 300,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const container = canvas.getByTestId('responsive-container');
    expect(container).toBeInTheDocument();

    const firstName = canvas.getByTestId('first-name');
    const lastName = canvas.getByTestId('last-name');

    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
  },
};

// Test 4: Visual States Test
export const VisualStates: Story = {
  args: {
    variant: 'vertical',
    maxWidth: 'sm',
    spacing: 'md',
    children: (
      <>
        <Typography variant="h6" mb={2} data-testid="form-title">
          Visual States Demo
        </Typography>

        <FormField name="normal" label="Normal State">
          <TextField
            placeholder="Normal input"
            fullWidth
            inputProps={{ 'data-testid': 'normal-input' }}
          />
        </FormField>

        <FormField name="required" label="Required Field" required>
          <TextField
            placeholder="Required input"
            fullWidth
            inputProps={{ 'data-testid': 'required-input' }}
          />
        </FormField>

        <Button variant="contained" data-testid="submit-button" fullWidth>
          Submit
        </Button>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const title = canvas.getByTestId('form-title');
    expect(title).toBeInTheDocument();
    expect(title).toBeVisible();

    const normalInput = canvas.getByTestId('normal-input');
    expect(normalInput).toBeInTheDocument();

    const submitButton = canvas.getByTestId('submit-button');
    expect(submitButton).toBeInTheDocument();
  },
};

// Test 5: Edge Cases Test
export const EdgeCases: Story = {
  args: {
    variant: 'vertical',
    maxWidth: 'sm',
    spacing: 'md',
    children: (
      <>
        <Typography variant="h6" mb={2}>
          Edge Cases Testing
        </Typography>

        <FormField name="empty" label="Empty Field">
          <div
            data-testid="empty-field"
            style={{ minHeight: '40px', border: '1px dashed #ccc', padding: '8px' }}
          >
            Empty field placeholder
          </div>
        </FormField>

        <FormField name="longText" label="Very Long Label That Should Handle Overflow Gracefully">
          <TextField
            placeholder="Long text input"
            fullWidth
            inputProps={{ 'data-testid': 'long-text-input' }}
          />
        </FormField>

        <Button variant="contained" type="submit" fullWidth data-testid="edge-submit">
          Submit Edge Cases
        </Button>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const emptyField = canvas.getByTestId('empty-field');
    expect(emptyField).toBeInTheDocument();
    expect(emptyField).toHaveTextContent('Empty field placeholder');

    const longTextInput = canvas.getByTestId('long-text-input');
    expect(longTextInput).toBeInTheDocument();

    const submitButton = canvas.getByTestId('edge-submit');
    expect(submitButton).toBeInTheDocument();
  },
};

// Test 6: Screen Reader Test
export const ScreenReader: Story = {
  args: {
    variant: 'vertical',
    maxWidth: 'sm',
    spacing: 'md',
    children: (
      <>
        <FormField name="accessible" label="Accessible Field" required>
          <TextField
            placeholder="Accessible input"
            fullWidth
            inputProps={{
              'data-testid': 'accessible-input',
              'aria-label': 'Accessible Field',
              'aria-required': 'true',
            }}
          />
        </FormField>
        <Button variant="contained" type="submit" fullWidth aria-label="Submit form">
          Submit
        </Button>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const accessibleInput = canvas.getByTestId('accessible-input');
    expect(accessibleInput).toHaveAttribute('aria-label', 'Accessible Field');
    expect(accessibleInput).toHaveAttribute('aria-required', 'true');

    const submitButton = canvas.getByRole('button', { name: 'Submit form' });
    expect(submitButton).toBeInTheDocument();
  },
};

// Test 7: Focus Management Test
export const FocusManagement: Story = {
  args: {
    variant: 'vertical',
    maxWidth: 'sm',
    spacing: 'md',
    onFocus: fn(),
    onBlur: fn(),
    children: (
      <>
        <FormField name="focusTest" label="Focus Test Field">
          <TextField
            placeholder="Focus test"
            fullWidth
            inputProps={{ 'data-testid': 'focus-input' }}
            onFocus={fn()}
            onBlur={fn()}
          />
        </FormField>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const focusInput = canvas.getByTestId('focus-input');

    // Test focus
    await userEvent.click(focusInput);
    await waitFor(() => {
      expect(focusInput).toHaveFocus();
    });

    // Test blur
    await userEvent.tab();
    await waitFor(() => {
      expect(focusInput).not.toHaveFocus();
    });
  },
};

// Test 8: Theme Variations Test
export const ThemeVariations: Story = {
  args: {
    variant: 'vertical',
    maxWidth: 'sm',
    spacing: 'md',
    children: (
      <>
        <Typography variant="h6" mb={2}>
          Theme Variations
        </Typography>
        <FormField name="themed" label="Themed Field">
          <TextField
            placeholder="Themed input"
            fullWidth
            inputProps={{ 'data-testid': 'themed-input' }}
          />
        </FormField>
      </>
    ),
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const themedInput = canvas.getByTestId('themed-input');
    expect(themedInput).toBeInTheDocument();
  },
};

// Test 9: Performance Test
export const Performance: Story = {
  args: {
    variant: 'vertical',
    maxWidth: 'lg',
    spacing: 'sm',
    children: (
      <>
        <Typography variant="h6" mb={2}>
          Performance Test - Many Fields
        </Typography>
        {Array.from({ length: 10 }, (_, i) => (
          <FormField key={i} name={`field${i}`} label={`Field ${i + 1}`}>
            <TextField
              placeholder={`Field ${i + 1}`}
              fullWidth
              inputProps={{ 'data-testid': `field-${i}` }}
            />
          </FormField>
        ))}
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that all fields are rendered
    for (let i = 0; i < 10; i++) {
      const field = canvas.getByTestId(`field-${i}`);
      expect(field).toBeInTheDocument();
    }
  },
};

// Test 10: TestId Verification for Error Messages
export const ErrorMessageTestIds: Story = {
  args: {
    variant: 'vertical',
    maxWidth: 'sm',
    spacing: 'md',
    dataTestId: 'error-form',
    children: (
      <>
        <Typography variant="h6" mb={2}>
          Error Message TestIds
        </Typography>
        <FormField name="email" label="Email" required error="Invalid email address" dataTestId="email-field-with-error">
          <TextField
            type="email"
            placeholder="Enter email"
            fullWidth
            error
            inputProps={{ 'data-testid': 'email-input-error' }}
          />
        </FormField>
        <FormField name="username" label="Username" helperText="Choose a unique username" dataTestId="username-field-with-helper">
          <TextField
            placeholder="Enter username"
            fullWidth
            inputProps={{ 'data-testid': 'username-input-helper' }}
          />
        </FormField>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify form testId
    const form = canvas.getByTestId('error-form');
    expect(form).toBeInTheDocument();

    // Verify error message testId
    const errorField = canvas.getByTestId('email-field-with-error');
    expect(errorField).toBeInTheDocument();

    const errorMessage = canvas.getByTestId('email-field-with-error-message');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent('Invalid email address');

    // Verify helper text testId
    const helperField = canvas.getByTestId('username-field-with-helper');
    expect(helperField).toBeInTheDocument();

    const helperMessage = canvas.getByTestId('username-field-with-helper-message');
    expect(helperMessage).toBeInTheDocument();
    expect(helperMessage).toHaveTextContent('Choose a unique username');
  },
};

// Test 11: Integration Test
export const Integration: Story = {
  args: {
    variant: 'vertical',
    maxWidth: 'md',
    spacing: 'md',
    onSubmit: fn(),
    children: (
      <>
        <Typography variant="h6" mb={2}>
          Complete Form Integration
        </Typography>
        <FormField name="username" label="Username" required>
          <TextField
            placeholder="Enter username"
            fullWidth
            inputProps={{ 'data-testid': 'username' }}
          />
        </FormField>
        <FormField name="email" label="Email" required>
          <TextField
            type="email"
            placeholder="Enter email"
            fullWidth
            inputProps={{ 'data-testid': 'email' }}
          />
        </FormField>
        <FormField name="bio" label="Bio">
          <TextField
            multiline
            rows={4}
            placeholder="Tell us about yourself"
            fullWidth
            inputProps={{ 'data-testid': 'bio' }}
          />
        </FormField>
        <Button variant="contained" type="submit" fullWidth data-testid="submit">
          Submit Form
        </Button>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Fill out the form
    const username = canvas.getByTestId('username');
    const email = canvas.getByTestId('email');
    const bio = canvas.getByTestId('bio');
    const submit = canvas.getByTestId('submit');

    await userEvent.type(username, 'testuser');
    await userEvent.type(email, 'test@example.com');
    await userEvent.type(bio, 'This is my bio');

    // Verify values
    await waitFor(() => {
      expect(username).toHaveValue('testuser');
      expect(email).toHaveValue('test@example.com');
      expect(bio).toHaveValue('This is my bio');
    });

    // Submit button should be enabled
    expect(submit).toBeEnabled();
  },
};
