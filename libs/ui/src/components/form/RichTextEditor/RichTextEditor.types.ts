import type { ReactNode } from 'react';

export interface RichTextEditorProps {
  /** The current value of the rich text editor content */
  value?: string;
  /** Callback when the content changes */
  onChange?: (value: string) => void;
  /** Placeholder text when empty */
  placeholder?: string;
  /** Whether the editor is disabled */
  disabled?: boolean;
  /** Whether the editor is read-only */
  readOnly?: boolean;
  /** Configuration for toolbar buttons and features */
  toolbar?: ToolbarConfig;
  /** Height of the editor */
  height?: number | string;
  /** Maximum number of characters allowed */
  maxLength?: number;
  /** Callback when editor receives focus */
  onFocus?: () => void;
  /** Callback when editor loses focus */
  onBlur?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing purposes */
  'data-testid'?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** ARIA described by for accessibility */
  'aria-describedby'?: string;
}

export interface ToolbarConfig {
  /** Show bold button */
  bold?: boolean;
  /** Show italic button */
  italic?: boolean;
  /** Show underline button */
  underline?: boolean;
  /** Show strikethrough button */
  strikethrough?: boolean;
  /** Show ordered list button */
  orderedList?: boolean;
  /** Show unordered list button */
  unorderedList?: boolean;
  /** Show link button */
  link?: boolean;
  /** Show image button */
  image?: boolean;
  /** Show code block button */
  codeBlock?: boolean;
  /** Show quote button */
  quote?: boolean;
  /** Custom toolbar items */
  customItems?: ToolbarItem[];
}

export interface ToolbarItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Icon to display */
  icon: ReactNode;
  /** Action when clicked */
  action: (editor: HTMLDivElement | null) => void;
  /** Whether item is active */
  isActive?: (editor: HTMLDivElement | null) => boolean;
  /** Whether item is disabled */
  disabled?: boolean;
}