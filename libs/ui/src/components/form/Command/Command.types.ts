import type { CSSProperties,ReactNode } from 'react';

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  shortcut?: string;
  disabled?: boolean;
  action?: () => void;
  category?: string;
  keywords?: string[];
}

export interface CommandProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  items?: CommandItem[];
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  onSelect?: (item: CommandItem) => void;
  variant?: 'default' | 'glass' | 'gradient' | 'minimal' | 'elevated';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  glow?: boolean;
  pulse?: boolean;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  maxHeight?: number | string;
  emptyMessage?: string;
  showCategories?: boolean;
  showShortcuts?: boolean;
  showDescriptions?: boolean;
  autoFocus?: boolean;
  closeOnSelect?: boolean;
  searchKeys?: string[];
  customFilter?: (item: CommandItem, search: string) => boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onClick?: () => void;
  children?: ReactNode;
  dataTestId?: string;
}

export interface CommandInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
  style?: CSSProperties;
  dataTestId?: string;
}

export interface CommandListProps {
  items?: CommandItem[];
  value?: string;
  onSelect?: (item: CommandItem) => void;
  emptyMessage?: string;
  showCategories?: boolean;
  showShortcuts?: boolean;
  showDescriptions?: boolean;
  loading?: boolean;
  className?: string;
  style?: CSSProperties;
  dataTestId?: string;
}

export interface CommandGroupProps {
  heading?: string;
  items?: CommandItem[];
  onSelect?: (item: CommandItem) => void;
  showShortcuts?: boolean;
  showDescriptions?: boolean;
  className?: string;
  style?: CSSProperties;
  dataTestId?: string;
}

export interface CommandItemProps extends CommandItem {
  selected?: boolean;
  onSelect?: () => void;
  showShortcut?: boolean;
  showDescription?: boolean;
  className?: string;
  style?: CSSProperties;
  dataTestId?: string;
}

export interface CommandEmptyProps {
  message?: string;
  className?: string;
  style?: CSSProperties;
  dataTestId?: string;
}

export interface CommandLoadingProps {
  message?: string;
  className?: string;
  style?: CSSProperties;
  dataTestId?: string;
}

export interface CommandSeparatorProps {
  className?: string;
  style?: CSSProperties;
}