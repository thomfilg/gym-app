import type { ReactNode } from 'react';

export interface UploadButtonProps {
  /** Button variant style */
  variant?: 'default' | 'outline' | 'ghost' | 'dropzone';

  /** Button text label */
  label?: string;

  /** File type restrictions (e.g., "image/*,.pdf") */
  accept?: string;

  /** Mobile camera capture hint */
  capture?: 'user' | 'environment';

  /** Disable file selection */
  disabled?: boolean;

  /** File selection callback (required) */
  onSelect: (file: globalThis.File) => void;

  /** Optional built-in upload handler with progress */
  onUpload?: (file: globalThis.File) => Promise<void>;

  /** External upload state control */
  uploading?: boolean;

  /** Upload progress (0-100) */
  progress?: number;

  /** Maximum file size in MB */
  maxSizeMB?: number;

  /** Custom file validation function */
  validate?: (file: globalThis.File) => string | null;

  /** Helper text */
  helperText?: string;

  /** Error message */
  errorText?: string;

  /** Custom icon */
  icon?: ReactNode;

  /** Additional CSS classes */
  className?: string;

  /** Test identifier */
  'data-testid'?: string;
}

export interface UploadButtonState {
  isDragOver: boolean;
  isUploading: boolean;
  uploadProgress: number;
  error: string | null;
}
