import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { DensityProvider } from '../../../utils/density';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { Input } from '../Input';
import { Select } from '../Select';
import { Textarea } from '../Textarea';
import { Form, FormField } from './Form';

const meta: Meta<typeof Form> = {
  title: 'Form/Form',
  component: Form,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Form is a flexible container component for building forms with consistent spacing, layout, and validation patterns. Supports multiple layout variants and provides built-in form field components.',
      },
    },
  },
  tags: ['autodocs', 'component:Form'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal', 'inline', 'stepped'],
      description: 'Layout variant for the form',
    },
    maxWidth: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Maximum width constraint for the form',
    },
    spacing: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Spacing between form elements',
    },
    onSubmit: {
      action: 'submitted',
      description: 'Form submission handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'vertical',
    maxWidth: 'md',
    spacing: 'md',
    children: (
      <>
        <FormField name="email" label="Email" required>
          <Input type="email" placeholder="Enter your email" />
        </FormField>
        <FormField name="password" label="Password" required>
          <Input type="password" placeholder="Enter your password" />
        </FormField>
        <FormField name="remember">
          <Checkbox label="Remember me" />
        </FormField>
        <Button variant="solid" type="submit" fullWidth>
          Submit
        </Button>
      </>
    ),
  },
};

export const Vertical: Story = {
  args: {
    variant: 'vertical',
    maxWidth: 'sm',
    spacing: 'lg',
    children: (
      <>
        <FormField name="name" label="Full Name" required>
          <Input placeholder="John Doe" />
        </FormField>
        <FormField name="email" label="Email Address" required>
          <Input type="email" placeholder="john@example.com" />
        </FormField>
        <FormField name="role" label="Role" required>
          <Select
            options={[
              { value: 'admin', label: 'Administrator' },
              { value: 'user', label: 'User' },
              { value: 'guest', label: 'Guest' },
            ]}
            placeholder="Select a role"
          />
        </FormField>
        <FormField name="notifications">
          <Checkbox label="Send me notifications" />
        </FormField>
        <Stack direction="row" spacing={2}>
          <Button variant="outline" fullWidth>
            Cancel
          </Button>
          <Button variant="solid" type="submit" fullWidth>
            Save
          </Button>
        </Stack>
      </>
    ),
  },
};

export const Horizontal: Story = {
  args: {
    variant: 'horizontal',
    maxWidth: 'lg',
    spacing: 'md',
    children: (
      <>
        <FormField name="firstName" label="First Name" required>
          <Input placeholder="Enter first name" />
        </FormField>
        <FormField name="lastName" label="Last Name" required>
          <Input placeholder="Enter last name" />
        </FormField>
        <FormField name="department" label="Department">
          <Select
            options={[
              { value: 'engineering', label: 'Engineering' },
              { value: 'marketing', label: 'Marketing' },
              { value: 'sales', label: 'Sales' },
              { value: 'hr', label: 'Human Resources' },
            ]}
          />
        </FormField>
        <Button variant="gradient" type="submit">
          Submit Form
        </Button>
      </>
    ),
  },
};

export const Inline: Story = {
  args: {
    variant: 'inline',
    children: (
      <>
        <Input placeholder="Search..." style={{ flex: 1 }} />
        <Select
          options={[
            { value: 'all', label: 'All Categories' },
            { value: 'products', label: 'Products' },
            { value: 'services', label: 'Services' },
          ]}
          style={{ minWidth: 150 }}
        />
        <Button variant="solid">Search</Button>
      </>
    ),
  },
};

export const WithValidation: Story = {
  args: {
    variant: 'vertical',
    maxWidth: 'sm',
    spacing: 'md',
    children: (
      <>
        <FormField name="email" label="Email" required error="Please enter a valid email address">
          <Input type="email" error />
        </FormField>
        <FormField
          name="password"
          label="Password"
          required
          helperText="Password must be at least 8 characters"
        >
          <Input type="password" />
        </FormField>
        <FormField name="terms" error="You must accept the terms">
          <Checkbox label="I accept the terms and conditions" error />
        </FormField>
        <Button variant="solid" type="submit" fullWidth>
          Register
        </Button>
      </>
    ),
  },
};

export const AllSpacingVariations: Story = {
  args: {
    variant: 'vertical',
    maxWidth: 'md',
    spacing: 'xs',
    children: (
      <>
        <Typography variant="h6" mb={1}>
          Extra Small Spacing (xs)
        </Typography>
        <FormField name="field1" label="Field 1">
          <Input placeholder="Content" />
        </FormField>
        <FormField name="field2" label="Field 2">
          <Input placeholder="Content" />
        </FormField>
      </>
    ),
  },
};

export const LargeSpacing: Story = {
  args: {
    variant: 'vertical',
    maxWidth: 'md',
    spacing: 'xl',
    children: (
      <>
        <Typography variant="h6" mb={1}>
          Extra Large Spacing (xl)
        </Typography>
        <FormField name="field1" label="Field 1">
          <Input placeholder="Content" />
        </FormField>
        <FormField name="field2" label="Field 2">
          <Input placeholder="Content" />
        </FormField>
      </>
    ),
  },
};

export const MaxWidthVariations: Story = {
  args: {
    variant: 'vertical',
    maxWidth: 'sm',
    spacing: 'md',
    children: (
      <>
        <Typography variant="h6" mb={1}>
          Small Max Width
        </Typography>
        <FormField name="field1" label="Field 1">
          <Input placeholder="This form has small max width" />
        </FormField>
        <FormField name="field2" label="Field 2">
          <Input placeholder="Content" />
        </FormField>
      </>
    ),
  },
};

export const ComplexForm: Story = {
  args: {
    variant: 'vertical',
    maxWidth: 'lg',
    spacing: 'md',
    children: (
      <>
        <Typography variant="h5" mb={2}>
          User Profile Form
        </Typography>

        <Stack direction="row" spacing={2}>
          <FormField name="firstName" label="First Name" required>
            <Input placeholder="John" />
          </FormField>
          <FormField name="lastName" label="Last Name" required>
            <Input placeholder="Doe" />
          </FormField>
        </Stack>

        <FormField name="email" label="Email Address" required>
          <Input type="email" placeholder="john.doe@example.com" />
        </FormField>

        <FormField name="bio" label="Biography" helperText="Tell us about yourself">
          <Textarea
            placeholder="I am a software developer with 5 years of experience..."
            rows={4}
          />
        </FormField>

        <FormField name="role" label="Role" required>
          <Select
            options={[
              { value: 'developer', label: 'Developer' },
              { value: 'designer', label: 'Designer' },
              { value: 'manager', label: 'Manager' },
              { value: 'analyst', label: 'Analyst' },
            ]}
            placeholder="Select your role"
          />
        </FormField>

        <FormField name="preferences">
          <Stack spacing={1}>
            <Checkbox label="Send me product updates" />
            <Checkbox label="Send me marketing emails" />
            <Checkbox label="Send me security alerts" />
          </Stack>
        </FormField>

        <Stack direction="row" spacing={2} mt={2}>
          <Button variant="outline" fullWidth>
            Cancel
          </Button>
          <Button variant="solid" type="submit" fullWidth>
            Save Profile
          </Button>
        </Stack>
      </>
    ),
  },
};

export const DisabledForm: Story = {
  args: {
    variant: 'vertical',
    maxWidth: 'sm',
    spacing: 'md',
    children: (
      <>
        <Typography variant="h6" mb={2}>
          Disabled Form State
        </Typography>
        <FormField name="email" label="Email" required>
          <Input type="email" placeholder="Enter your email" disabled />
        </FormField>
        <FormField name="password" label="Password" required>
          <Input type="password" placeholder="Enter your password" disabled />
        </FormField>
        <FormField name="remember">
          <Checkbox label="Remember me" disabled />
        </FormField>
        <Button variant="solid" type="submit" fullWidth disabled>
          Submit
        </Button>
      </>
    ),
  },
};

export const EmptyForm: Story = {
  args: {
    variant: 'vertical',
    maxWidth: 'sm',
    spacing: 'md',
    children: (
      <>
        <Typography variant="h6" mb={2}>
          Empty Form
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center" py={4}>
          No form fields to display
        </Typography>
      </>
    ),
  },
};

export const ResponsiveForm: Story = {
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1200px', height: '800px' } },
      },
    },
  },
  args: {
    variant: 'vertical',
    maxWidth: 'full',
    spacing: 'md',
    children: (
      <>
        <Typography variant="h6" mb={2}>
          Responsive Form Layout
        </Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <FormField name="firstName" label="First Name" required>
            <Input placeholder="First name" />
          </FormField>
          <FormField name="lastName" label="Last Name" required>
            <Input placeholder="Last name" />
          </FormField>
        </Stack>
        <FormField name="email" label="Email Address" required>
          <Input type="email" placeholder="your.email@example.com" />
        </FormField>
        <Button variant="solid" type="submit" fullWidth>
          Submit
        </Button>
      </>
    ),
  },
};

// Required story exports for validation
export const AllVariants: Story = {
  args: {
    variant: 'vertical',
    maxWidth: 'xl',
    spacing: 'md',
    children: (
      <Stack spacing={4}>
        <div>
          <Typography variant="h6" mb={2}>
            Vertical Layout
          </Typography>
          <Form variant="vertical" maxWidth="md" spacing="md">
            <FormField name="field1" label="Field 1">
              <Input placeholder="Vertical layout" />
            </FormField>
            <FormField name="field2" label="Field 2">
              <Input placeholder="Vertical layout" />
            </FormField>
          </Form>
        </div>

        <div>
          <Typography variant="h6" mb={2}>
            Horizontal Layout
          </Typography>
          <Form variant="horizontal" maxWidth="lg" spacing="md">
            <FormField name="field1" label="Field 1">
              <Input placeholder="Horizontal layout" />
            </FormField>
            <FormField name="field2" label="Field 2">
              <Input placeholder="Horizontal layout" />
            </FormField>
          </Form>
        </div>

        <div>
          <Typography variant="h6" mb={2}>
            Inline Layout
          </Typography>
          <Form variant="inline" spacing="md">
            <Input placeholder="Inline layout" />
            <Button variant="solid">Submit</Button>
          </Form>
        </div>
      </Stack>
    ),
  },
};

export const AllSizes: Story = {
  args: {
    variant: 'vertical',
    spacing: 'md',
    children: (
      <Stack spacing={4}>
        <div>
          <Typography variant="h6" mb={2}>
            Small Max Width
          </Typography>
          <Form variant="vertical" maxWidth="sm" spacing="md">
            <FormField name="field" label="Small Width">
              <Input placeholder="Small max width form" />
            </FormField>
          </Form>
        </div>

        <div>
          <Typography variant="h6" mb={2}>
            Medium Max Width
          </Typography>
          <Form variant="vertical" maxWidth="md" spacing="md">
            <FormField name="field" label="Medium Width">
              <Input placeholder="Medium max width form" />
            </FormField>
          </Form>
        </div>

        <div>
          <Typography variant="h6" mb={2}>
            Large Max Width
          </Typography>
          <Form variant="vertical" maxWidth="lg" spacing="md">
            <FormField name="field" label="Large Width">
              <Input placeholder="Large max width form" />
            </FormField>
          </Form>
        </div>

        <div>
          <Typography variant="h6" mb={2}>
            Extra Large Max Width
          </Typography>
          <Form variant="vertical" maxWidth="xl" spacing="md">
            <FormField name="field" label="Extra Large Width">
              <Input placeholder="Extra large max width form" />
            </FormField>
          </Form>
        </div>

        <div>
          <Typography variant="h6" mb={2}>
            Full Width
          </Typography>
          <Form variant="vertical" maxWidth="full" spacing="md">
            <FormField name="field" label="Full Width">
              <Input placeholder="Full width form" />
            </FormField>
          </Form>
        </div>
      </Stack>
    ),
  },
};

export const AllStates: Story = {
  args: {
    variant: 'vertical',
    maxWidth: 'md',
    spacing: 'md',
    children: (
      <Stack spacing={4}>
        <div>
          <Typography variant="h6" mb={2}>
            Default State
          </Typography>
          <Form variant="vertical" maxWidth="sm" spacing="md">
            <FormField name="default" label="Default Field">
              <Input placeholder="Default state" />
            </FormField>
            <Button variant="solid" type="submit">
              Submit
            </Button>
          </Form>
        </div>

        <div>
          <Typography variant="h6" mb={2}>
            With Validation Errors
          </Typography>
          <Form variant="vertical" maxWidth="sm" spacing="md">
            <FormField name="error" label="Error Field" required error="This field is required">
              <Input placeholder="Error state" error />
            </FormField>
            <Button variant="solid" type="submit">
              Submit
            </Button>
          </Form>
        </div>

        <div>
          <Typography variant="h6" mb={2}>
            Disabled State
          </Typography>
          <Form variant="vertical" maxWidth="sm" spacing="md">
            <FormField name="disabled" label="Disabled Field">
              <Input placeholder="Disabled state" disabled />
            </FormField>
            <Button variant="solid" type="submit" disabled>
              Submit
            </Button>
          </Form>
        </div>

        <div>
          <Typography variant="h6" mb={2}>
            With Helper Text
          </Typography>
          <Form variant="vertical" maxWidth="sm" spacing="md">
            <FormField name="helper" label="Field with Helper" helperText="This is helper text">
              <Input placeholder="With helper text" />
            </FormField>
            <Button variant="solid" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </Stack>
    ),
  },
};

export const InteractiveStates: Story = {
  args: {
    variant: 'vertical',
    maxWidth: 'md',
    spacing: 'md',
    children: (
      <>
        <Typography variant="h6" mb={2}>
          Interactive Form Elements
        </Typography>
        <FormField name="text" label="Text Input" required>
          <Input placeholder="Type here..." />
        </FormField>

        <FormField name="select" label="Select Field" required>
          <Select
            options={[
              { value: 'option1', label: 'Option 1' },
              { value: 'option2', label: 'Option 2' },
              { value: 'option3', label: 'Option 3' },
            ]}
            placeholder="Select an option"
          />
        </FormField>

        <FormField name="textarea" label="Text Area">
          <Textarea placeholder="Enter long text..." rows={3} />
        </FormField>

        <FormField name="checkbox">
          <Stack spacing={1}>
            <Checkbox label="Option A" />
            <Checkbox label="Option B" />
            <Checkbox label="Option C" />
          </Stack>
        </FormField>

        <Stack direction="row" spacing={2} mt={2}>
          <Button variant="outline" fullWidth>
            Reset
          </Button>
          <Button variant="solid" type="submit" fullWidth>
            Submit
          </Button>
        </Stack>
      </>
    ),
  },
};

export const Responsive: Story = {
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1440px', height: '900px' } },
      },
      defaultViewport: 'desktop',
    },
  },
  args: {
    variant: 'vertical',
    maxWidth: 'full',
    spacing: 'md',
    children: (
      <>
        <Typography variant="h5" mb={3}>
          Responsive Form
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={2} mb={2}>
          <FormField name="firstName" label="First Name" required>
            <Input placeholder="First name" />
          </FormField>
          <FormField name="lastName" label="Last Name" required>
            <Input placeholder="Last name" />
          </FormField>
        </Stack>

        <FormField name="email" label="Email" required>
          <Input type="email" placeholder="email@example.com" />
        </FormField>

        <FormField name="phone" label="Phone">
          <Input type="tel" placeholder="+1 (555) 000-0000" />
        </FormField>

        <FormField name="address" label="Address">
          <Textarea placeholder="Enter your address..." rows={2} />
        </FormField>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={3}>
          <Button variant="outline" fullWidth>
            Cancel
          </Button>
          <Button variant="solid" type="submit" fullWidth>
            Save
          </Button>
        </Stack>
      </>
    ),
  },
};

export const DensityModes: Story = {
  render: () => (
    <Stack direction="row" spacing={4} alignItems="flex-start">
      <DensityProvider defaultMode="compact">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Compact (0.8x)
          </Typography>
          <Form variant="vertical" maxWidth="sm" spacing="md">
            <FormField name="email" label="Email" required>
              <Input type="email" placeholder="Enter email" />
            </FormField>
            <FormField name="password" label="Password" required>
              <Input type="password" placeholder="Enter password" />
            </FormField>
            <Button variant="solid" type="submit" fullWidth>
              Submit
            </Button>
          </Form>
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="normal">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Normal (1.0x)
          </Typography>
          <Form variant="vertical" maxWidth="sm" spacing="md">
            <FormField name="email" label="Email" required>
              <Input type="email" placeholder="Enter email" />
            </FormField>
            <FormField name="password" label="Password" required>
              <Input type="password" placeholder="Enter password" />
            </FormField>
            <Button variant="solid" type="submit" fullWidth>
              Submit
            </Button>
          </Form>
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="spacious">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Spacious (1.25x)
          </Typography>
          <Form variant="vertical" maxWidth="sm" spacing="md">
            <FormField name="email" label="Email" required>
              <Input type="email" placeholder="Enter email" />
            </FormField>
            <FormField name="password" label="Password" required>
              <Input type="password" placeholder="Enter password" />
            </FormField>
            <Button variant="solid" type="submit" fullWidth>
              Submit
            </Button>
          </Form>
        </Box>
      </DensityProvider>
    </Stack>
  ),
};
