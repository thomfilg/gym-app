import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CloudUploadOutlined, PhotoCameraOutlined } from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { DensityProvider } from '../../../utils/density';
import { UploadButton } from './UploadButton';

const meta: Meta<typeof UploadButton> = {
  title: 'Form/UploadButton',
  component: UploadButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Single-file upload component with variants for plain button, outlined, ghost, and dropzone interface. Supports drag-and-drop, built-in async upload with progress tracking, file validation, and comprehensive accessibility features.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'ghost', 'dropzone'],
      description: 'Button variant style'
    },
    label: {
      control: 'text',
      description: 'Button text label'
    },
    accept: {
      control: 'text',
      description: 'File type restrictions (e.g., "image/*,.pdf")'
    },
    capture: {
      control: 'select',
      options: ['user', 'environment'],
      description: 'Mobile camera capture hint'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable file selection'
    },
    uploading: {
      control: 'boolean',
      description: 'External upload state control'
    },
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Upload progress (0-100)'
    },
    maxSizeMB: {
      control: 'number',
      description: 'Maximum file size in MB'
    },
    helperText: {
      control: 'text',
      description: 'Helper text'
    },
    errorText: {
      control: 'text',
      description: 'Error message'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    },
    onSelect: {
      action: 'file-selected',
      description: 'File selection callback (required)'
    },
    onUpload: {
      action: 'file-uploaded',
      description: 'Optional built-in upload handler with progress'
    },
    validate: {
      description: 'Custom file validation function'
    },
    icon: {
      description: 'Custom icon'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic stories
export const Default: Story = {
  args: {
    onSelect: action('file-selected')
  }
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    onSelect: action('file-selected')
  }
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    onSelect: action('file-selected')
  }
};

export const Dropzone: Story = {
  args: {
    variant: 'dropzone',
    onSelect: action('file-selected')
  }
};

// File type restrictions
export const ImageOnly: Story = {
  args: {
    accept: 'image/*',
    label: 'Upload Image',
    icon: <PhotoCameraOutlined />,
    helperText: 'Only image files are allowed',
    onSelect: action('image-selected')
  }
};

export const PDFOnly: Story = {
  args: {
    accept: '.pdf',
    label: 'Upload PDF',
    helperText: 'Only PDF files are allowed',
    onSelect: action('pdf-selected')
  }
};

// States
export const Disabled: Story = {
  args: {
    disabled: true,
    onSelect: action('file-selected')
  }
};

export const WithHelperText: Story = {
  args: {
    helperText: 'Select a file to upload (max 5MB)',
    onSelect: action('file-selected')
  }
};

export const WithError: Story = {
  args: {
    errorText: 'File size exceeds 5MB limit',
    onSelect: action('file-selected')
  }
};

// Upload states
export const Uploading: Story = {
  args: {
    uploading: true,
    progress: 45,
    onSelect: action('file-selected')
  }
};

export const UploadComplete: Story = {
  args: {
    uploading: false,
    progress: 100,
    onSelect: action('file-selected')
  }
};

// Size validation
export const WithSizeLimit: Story = {
  args: {
    maxSizeMB: 5,
    helperText: 'Maximum file size: 5MB',
    onSelect: action('file-selected')
  }
};

// Custom validation
export const WithCustomValidation: Story = {
  args: {
    validate: (file: globalThis.File) => {
      if (!file.name.includes('document')) {
        return 'File name must contain "document"';
      }
      return null;
    },
    helperText: 'File name must contain "document"',
    onSelect: action('file-selected')
  }
};

// Built-in upload
export const WithBuiltInUpload: Story = {
  args: {
    onSelect: action('file-selected'),
    onUpload: async (file: globalThis.File) => {
      action('upload-started')(file);
      // Simulate upload delay
      await new Promise(resolve => globalThis.setTimeout(resolve, 2000));
      action('upload-completed')(file);
    }
  }
};

// Custom icons
export const WithCustomIcon: Story = {
  args: {
    icon: <CloudUploadOutlined />,
    onSelect: action('file-selected')
  }
};

// Dropzone variants
export const DropzoneDisabled: Story = {
  args: {
    variant: 'dropzone',
    disabled: true,
    onSelect: action('file-selected')
  }
};

export const DropzoneUploading: Story = {
  args: {
    variant: 'dropzone',
    uploading: true,
    progress: 65,
    onSelect: action('file-selected')
  }
};

export const DropzoneWithError: Story = {
  args: {
    variant: 'dropzone',
    errorText: 'Upload failed. Please try again.',
    onSelect: action('file-selected')
  }
};

// Mobile camera capture
export const CameraCapture: Story = {
  args: {
    accept: 'image/*',
    capture: 'environment',
    label: 'Take Photo',
    icon: <PhotoCameraOutlined />,
    helperText: 'Use camera to take a photo',
    onSelect: action('photo-captured')
  }
};

export const FrontCamera: Story = {
  args: {
    accept: 'image/*',
    capture: 'user',
    label: 'Take Selfie',
    icon: <PhotoCameraOutlined />,
    helperText: 'Use front camera for selfie',
    onSelect: action('selfie-captured')
  }
};

// Layout variations
export const AllVariants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%', maxWidth: 800 }}>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <UploadButton onSelect={action('default-selected')} />
        <UploadButton variant="outline" onSelect={action('outline-selected')} />
        <UploadButton variant="ghost" onSelect={action('ghost-selected')} />
      </Box>
      <Box sx={{ width: '100%', maxWidth: 400 }}>
        <UploadButton
          variant="dropzone"
          onSelect={action('dropzone-selected')}
        />
      </Box>
    </Box>
  )
};

export const AllSizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start' }}>
      <UploadButton
        label="Small"
        onSelect={action('small-selected')}
        sx={{ fontSize: '0.75rem', padding: '4px 8px' }}
      />
      <UploadButton
        label="Medium"
        onSelect={action('medium-selected')}
      />
      <UploadButton
        label="Large"
        onSelect={action('large-selected')}
        sx={{ fontSize: '1.125rem', padding: '12px 24px' }}
      />
    </Box>
  )
};

export const AllStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start' }}>
      <UploadButton label="Default" onSelect={action('default-selected')} />
      <UploadButton label="Disabled" disabled onSelect={action('disabled-selected')} />
      <UploadButton label="Uploading" uploading progress={50} onSelect={action('uploading-selected')} />
      <UploadButton label="With Error" errorText="Upload failed" onSelect={action('error-selected')} />
      <UploadButton label="With Helper" helperText="Select a file to upload" onSelect={action('helper-selected')} />
    </Box>
  )
};

export const InteractiveStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start' }}>
      <UploadButton
        label="Hover Me"
        onSelect={action('hover-selected')}
        sx={{
          '&:hover': {
            transform: 'translateY(-2px)',
            transition: 'transform 0.2s'
          }
        }}
      />
      <UploadButton
        label="Focus Me"
        onSelect={action('focus-selected')}
        sx={{
          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: 'primary.main',
            outlineOffset: 2
          }
        }}
      />
    </Box>
  )
};

export const Responsive: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, width: '100%' }}>
      <Box sx={{ flex: 1 }}>
        <UploadButton
          label="Mobile First"
          onSelect={action('mobile-selected')}
          sx={{ width: '100%' }}
        />
      </Box>
      <Box sx={{ flex: 1 }}>
        <UploadButton
          variant="dropzone"
          label="Desktop Dropzone"
          onSelect={action('desktop-selected')}
        />
      </Box>
    </Box>
  )
};

export const DensityModes: Story = {
  render: () => (
    <Stack direction="row" spacing={4} alignItems="flex-start">
      <DensityProvider defaultMode="compact">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Compact (0.8x)
          </Typography>
          <UploadButton
            variant="outlined"
            label="Upload File"
            onSelect={action('compact-selected')}
          />
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="normal">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Normal (1.0x)
          </Typography>
          <UploadButton
            variant="outlined"
            label="Upload File"
            onSelect={action('normal-selected')}
          />
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="spacious">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Spacious (1.25x)
          </Typography>
          <UploadButton
            variant="outlined"
            label="Upload File"
            onSelect={action('spacious-selected')}
          />
        </Box>
      </DensityProvider>
    </Stack>
  ),
};