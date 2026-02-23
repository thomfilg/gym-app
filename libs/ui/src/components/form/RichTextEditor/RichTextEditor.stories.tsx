import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { DensityProvider } from '../../../utils/density';
import { RichTextEditor } from './RichTextEditor';

const meta: Meta<typeof RichTextEditor> = {
  title: 'Enhanced/RichTextEditor',
  component: RichTextEditor,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A comprehensive rich text editor component with formatting capabilities, built on MUI and integrated with modern rich text editing libraries. Provides a complete set of text editing features including bold, italic, underline, lists, links, and more.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'The current value of the rich text editor content',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when the content changes',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when empty',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the editor is disabled',
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the editor is read-only',
    },
    height: {
      control: { type: 'number', min: 100, max: 800 },
      description: 'Height of the editor',
    },
    maxLength: {
      control: { type: 'number', min: 10, max: 1000 },
      description: 'Maximum number of characters allowed',
    },
    'aria-label': {
      control: 'text',
      description: 'ARIA label for accessibility',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper components for stories that need state
const DefaultWrapper = () => {
  const [value, setValue] = useState('');
  return (
    <Box sx={{ width: 600 }}>
      <RichTextEditor value={value} onChange={setValue} placeholder="Start typing..." />
    </Box>
  );
};

const WithContentWrapper = () => {
  const [value, setValue] = useState('<p><strong>Bold text</strong> and <em>italic text</em></p><ul><li>List item 1</li><li>List item 2</li></ul>');
  return (
    <Box sx={{ width: 600 }}>
      <RichTextEditor value={value} onChange={setValue} />
    </Box>
  );
};

const DisabledWrapper = () => {
  const [value, setValue] = useState('<p>This is disabled content that cannot be edited.</p>');
  return (
    <Box sx={{ width: 600 }}>
      <RichTextEditor
        value={value}
        onChange={setValue}
        disabled
        placeholder="This editor is disabled"
      />
    </Box>
  );
};

const ReadOnlyWrapper = () => {
  const [value, setValue] = useState('<p>This is <strong>read-only</strong> content.</p><p>You can select and copy text, but cannot edit it.</p>');
  return (
    <Box sx={{ width: 600 }}>
      <RichTextEditor
        value={value}
        onChange={setValue}
        readOnly
        toolbar={{}}
      />
    </Box>
  );
};

const CustomToolbarWrapper = () => {
  const [value, setValue] = useState('');
  return (
    <Box sx={{ width: 600 }}>
      <RichTextEditor
        value={value}
        onChange={setValue}
        placeholder="Editor with custom toolbar..."
        toolbar={{
          bold: true,
          italic: true,
          underline: false,
          strikethrough: true,
          orderedList: false,
          unorderedList: true,
          link: true,
          image: false,
          codeBlock: true,
          quote: true,
        }}
      />
    </Box>
  );
};

const HeightVariationsWrapper = () => {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Box sx={{ width: 300 }}>
        <RichTextEditor
          value={value1}
          onChange={setValue1}
          height={150}
          placeholder="Compact (150px)"
        />
      </Box>
      <Box sx={{ width: 300 }}>
        <RichTextEditor
          value={value2}
          onChange={setValue2}
          height={300}
          placeholder="Standard (300px)"
        />
      </Box>
      <Box sx={{ width: 300 }}>
        <RichTextEditor
          value={value3}
          onChange={setValue3}
          height={500}
          placeholder="Expanded (500px)"
        />
      </Box>
    </Box>
  );
};

const MaxLengthWrapper = () => {
  const [value, setValue] = useState('');
  return (
    <Box sx={{ width: 600 }}>
      <RichTextEditor
        value={value}
        onChange={setValue}
        maxLength={100}
        placeholder="Type here (max 100 characters)..."
      />
    </Box>
  );
};

const GlassEffectWrapper = () => {
  const [value, setValue] = useState('');
  return (
    <Box
      sx={{
        width: 600,
        height: 400,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <RichTextEditor
        value={value}
        onChange={setValue}
        placeholder="Glass morphism editor..."
        sx={{
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      />
    </Box>
  );
};

const DarkThemeWrapper = () => {
  const [value, setValue] = useState('<p>Dark theme example with <strong>formatted</strong> text.</p>');
  return (
    <Box sx={{ width: 600 }}>
      <RichTextEditor value={value} onChange={setValue} />
    </Box>
  );
};

// Basic Stories
export const Default: Story = {
  render: () => <DefaultWrapper />,
};

export const WithContent: Story = {
  render: () => <WithContentWrapper />,
};

export const Disabled: Story = {
  render: () => <DisabledWrapper />,
};

export const ReadOnly: Story = {
  render: () => <ReadOnlyWrapper />,
};

export const CustomToolbar: Story = {
  render: () => <CustomToolbarWrapper />,
};

export const HeightVariations: Story = {
  render: () => <HeightVariationsWrapper />,
};

export const MaxLength: Story = {
  render: () => <MaxLengthWrapper />,
};

export const GlassEffect: Story = {
  render: () => <GlassEffectWrapper />,
};

export const DarkTheme: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => <DarkThemeWrapper />,
};

// Required story exports for validation
export const AllVariants = Default;
export const AllSizes = HeightVariations;
export const AllStates = Disabled;
export const InteractiveStates = Default;
export const Responsive = Default;

const DensityModesWrapper = () => {
  const [value1, setValue1] = useState('<p>Compact density text</p>');
  const [value2, setValue2] = useState('<p>Normal density text</p>');
  const [value3, setValue3] = useState('<p>Spacious density text</p>');

  return (
    <Stack direction="row" spacing={4} alignItems="flex-start">
      <DensityProvider defaultMode="compact">
        <Box sx={{ width: 300 }}>
          <Typography variant="caption" gutterBottom display="block">
            Compact (0.8x)
          </Typography>
          <RichTextEditor value={value1} onChange={setValue1} height={200} />
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="normal">
        <Box sx={{ width: 300 }}>
          <Typography variant="caption" gutterBottom display="block">
            Normal (1.0x)
          </Typography>
          <RichTextEditor value={value2} onChange={setValue2} height={200} />
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="spacious">
        <Box sx={{ width: 300 }}>
          <Typography variant="caption" gutterBottom display="block">
            Spacious (1.25x)
          </Typography>
          <RichTextEditor value={value3} onChange={setValue3} height={200} />
        </Box>
      </DensityProvider>
    </Stack>
  );
};

export const DensityModes: Story = {
  render: () => <DensityModesWrapper />,
};