import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DensityProvider } from '../../../utils/density';
import { Edit3, FileText, MessageCircle, Star } from 'lucide-react';

import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Form/Textarea',
  component: Textarea,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs', 'component:Textarea'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'autosize', 'resizable', 'rich'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'neutral'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['start', 'end'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
    variant: 'default',
    size: 'md',
    color: 'primary',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Your Message',
    placeholder: 'Type your message here...',
    helperText: 'This field is required',
  },
};

export const Variants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Default
        </Typography>
        <Textarea placeholder="Default textarea..." />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Autosize
        </Typography>
        <Textarea
          variant="autosize"
          placeholder="This textarea will grow as you type..."
          minRows={2}
          maxRows={6}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Resizable
        </Typography>
        <Textarea variant="resizable" placeholder="You can manually resize this textarea..." />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Rich Text Editor
        </Typography>
        <Textarea
          variant="rich"
          placeholder="Rich text editor with formatting tools..."
          label="Rich Text Editor"
          helperText="Format your content with bold, italic, lists, and more"
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Rich Text with Glass Effect
        </Typography>
        <Textarea
          variant="rich"
          glass
          placeholder="Rich textarea with glass effect..."
          label="Glass Rich Editor"
        />
      </Box>
    </Box>
  ),
};

export const Colors: Story = {
  render: () => (
    <Box
      sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2 }}
    >
      <Textarea color="primary" placeholder="Primary color" label="Primary" />
      <Textarea color="secondary" placeholder="Secondary color" label="Secondary" />
      <Textarea color="success" placeholder="Success color" label="Success" />
      <Textarea color="warning" placeholder="Warning color" label="Warning" />
      <Textarea color="danger" placeholder="Danger color" label="Danger" />
      <Textarea color="neutral" placeholder="Neutral color" label="Neutral" />
    </Box>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Textarea size="xs" placeholder="Extra small textarea" label="Extra Small (xs)" />
      <Textarea size="sm" placeholder="Small textarea" label="Small (sm)" />
      <Textarea size="md" placeholder="Medium textarea" label="Medium (md)" />
      <Textarea size="lg" placeholder="Large textarea" label="Large (lg)" />
      <Textarea size="xl" placeholder="Extra large textarea" label="Extra Large (xl)" />
    </Box>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Textarea
        icon={<MessageCircle size={20} />}
        placeholder="Message with start icon..."
        label="Start Icon"
      />

      <Textarea
        icon={<Edit3 size={20} />}
        iconPosition="end"
        placeholder="Message with end icon..."
        label="End Icon"
      />

      <Textarea
        icon={<FileText size={20} />}
        glass
        placeholder="Glass effect with icon..."
        label="Glass + Icon"
      />
    </Box>
  ),
};

export const SpecialEffects: Story = {
  render: () => (
    <Box
      sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3 }}
    >
      <Box>
        <Typography variant="h6" gutterBottom>
          Glass Morphism
        </Typography>
        <Textarea glass placeholder="Glass morphism effect..." icon={<Star size={20} />} />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Gradient Border
        </Typography>
        <Textarea gradient placeholder="Gradient border effect..." color="secondary" />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Glow Effect
        </Typography>
        <Textarea glow placeholder="Glowing textarea..." color="success" />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Glass Label
        </Typography>
        <Textarea glassLabel label="Glass Label" placeholder="Textarea with glass label..." />
      </Box>
    </Box>
  ),
};

export const ErrorStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Textarea
        error
        label="Error State"
        placeholder="This field has an error..."
        helperText="This field is required"
      />

      <Textarea
        error
        glass
        label="Glass + Error"
        placeholder="Glass effect with error..."
        helperText="Please fix this error"
        icon={<MessageCircle size={20} />}
      />
    </Box>
  ),
};

export const RichTextShowcase: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Rich Text Editor - Primary
        </Typography>
        <Textarea
          variant="rich"
          color="primary"
          placeholder="Start writing your content..."
          label="Content Editor"
          helperText="Use the toolbar to format your text"
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Rich Text with Character Limit
        </Typography>
        <Textarea
          variant="rich"
          color="secondary"
          placeholder="Limited character content..."
          label="Limited Editor"
          maxLength={500}
          helperText="Maximum 500 characters"
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Glass Rich Editor
        </Typography>
        <Textarea
          variant="rich"
          glass
          glassLabel
          color="success"
          placeholder="Beautiful glass effect editor..."
          label="Premium Editor"
        />
      </Box>
    </Box>
  ),
};

export const Playground: Story = {
  args: {
    placeholder: 'Playground textarea...',
    label: 'Playground',
    helperText: 'Try different combinations',
    variant: 'default',
    size: 'md',
    color: 'primary',
    glass: false,
    gradient: false,
    glow: false,
    glassLabel: false,
    error: false,
    iconPosition: 'start',
  },
};

// Required story exports for validation
export const AllVariants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Default
        </Typography>
        <Textarea placeholder="Default textarea..." />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Autosize
        </Typography>
        <Textarea
          variant="autosize"
          placeholder="This textarea will grow as you type..."
          minRows={2}
          maxRows={6}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Resizable
        </Typography>
        <Textarea variant="resizable" placeholder="You can manually resize this textarea..." />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Rich Text Editor
        </Typography>
        <Textarea
          variant="rich"
          placeholder="Rich text editor with formatting tools..."
          label="Rich Text Editor"
          helperText="Format your content with bold, italic, lists, and more"
        />
      </Box>
    </Box>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Textarea size="xs" placeholder="Extra small textarea" label="Extra Small (xs)" />
      <Textarea size="sm" placeholder="Small textarea" label="Small (sm)" />
      <Textarea size="md" placeholder="Medium textarea" label="Medium (md)" />
      <Textarea size="lg" placeholder="Large textarea" label="Large (lg)" />
      <Textarea size="xl" placeholder="Extra large textarea" label="Extra Large (xl)" />
    </Box>
  ),
};

export const AllStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Textarea
        label="Normal State"
        placeholder="Normal state textarea..."
        helperText="Normal helper text"
      />

      <Textarea
        disabled
        label="Disabled State"
        placeholder="Disabled textarea..."
        helperText="This field is disabled"
      />

      <Textarea
        readOnly
        label="Read Only State"
        value="This content is read-only"
        helperText="Read-only field"
      />

      <Textarea
        error
        label="Error State"
        placeholder="This field has an error..."
        helperText="This field is required"
      />

      <Textarea
        required
        label="Required State"
        placeholder="This field is required..."
        helperText="Please fill this field"
      />
    </Box>
  ),
};

export const InteractiveStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Textarea
        label="Hover State"
        placeholder="Hover over this textarea..."
        helperText="Hover effect active"
      />

      <Textarea
        autoFocus
        label="Focus State"
        placeholder="This textarea is focused..."
        helperText="Focus effect active"
      />

      <Textarea
        label="Active State"
        placeholder="Type in this textarea..."
        helperText="Interactive state demonstration"
      />

      <Textarea
        glass
        label="Glass Interactive"
        placeholder="Glass effect with interactions..."
        helperText="Glass morphism with hover effects"
      />
    </Box>
  ),
};

export const Responsive: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Mobile (xs)
        </Typography>
        <Box sx={{ maxWidth: 320 }}>
          <Textarea
            size="sm"
            placeholder="Mobile optimized textarea..."
            label="Mobile Size"
            helperText="Optimized for mobile devices"
          />
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Tablet (md)
        </Typography>
        <Box sx={{ maxWidth: 768 }}>
          <Textarea
            size="md"
            placeholder="Tablet optimized textarea..."
            label="Tablet Size"
            helperText="Optimized for tablet devices"
          />
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Desktop (lg)
        </Typography>
        <Box sx={{ maxWidth: 1024 }}>
          <Textarea
            size="lg"
            placeholder="Desktop optimized textarea..."
            label="Desktop Size"
            helperText="Optimized for desktop devices"
          />
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Full Width Responsive
        </Typography>
        <Textarea
          variant="autosize"
          placeholder="This textarea adapts to container width..."
          label="Responsive Textarea"
          helperText="Adapts to container width and content height"
          sx={{ width: '100%' }}
        />
      </Box>
    </Box>
  ),
};

export const DensityModes: Story = {
  render: () => {

    return (
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'flex-start' }}>
        <DensityProvider defaultMode="compact">
          <Box sx={{ width: 280 }}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Compact (0.8x)
            </Typography>
            <Textarea label="Compact Textarea" placeholder="Tighter spacing..." size="md" />
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="normal">
          <Box sx={{ width: 280 }}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Normal (1.0x)
            </Typography>
            <Textarea label="Normal Textarea" placeholder="Standard spacing..." size="md" />
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="spacious">
          <Box sx={{ width: 280 }}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
              Spacious (1.25x)
            </Typography>
            <Textarea label="Spacious Textarea" placeholder="Extra breathing room..." size="md" />
          </Box>
        </DensityProvider>
      </Box>
    );
  },
};
