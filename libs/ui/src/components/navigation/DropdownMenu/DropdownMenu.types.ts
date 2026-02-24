import type { MenuProps } from '@mui/material/Menu';
import type { ReactNode } from 'react';

export interface DropdownMenuItem {
  /**
   * Unique identifier for the menu item
   */
  id: string;

  /**
   * Label to display for the menu item
   */
  label: string;

  /**
   * Icon to display before the label
   */
  icon?: ReactNode;

  /**
   * Whether the item is disabled
   */
  disabled?: boolean;

  /**
   * Type of menu item
   */
  type?: 'item' | 'divider' | 'header';

  /**
   * Click handler for the menu item
   */
  onClick?: () => void;

  /**
   * Nested items for submenu
   */
  children?: DropdownMenuItem[];

  /**
   * Whether to show a chevron for submenu
   */
  showChevron?: boolean;

  /**
   * Custom component to render
   */
  component?: ReactNode;

  /**
   * Keyboard shortcut to display
   */
  shortcut?: string;

  /**
   * Color variant for the item
   */
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
}

export interface DropdownMenuProps extends Omit<MenuProps, 'open' | 'variant'> {
  /**
   * The variant of the dropdown menu
   */
  variant?: 'default' | 'glass' | 'minimal';

  /**
   * Menu items to display
   */
  items: DropdownMenuItem[];

  /**
   * Trigger element for the dropdown
   */
  trigger?: ReactNode;

  /**
   * Whether the menu is open
   */
  open?: boolean;

  /**
   * Callback when menu opens
   */
  onOpen?: () => void;

  /**
   * Callback when menu closes
   */
  onClose?: () => void;

  /**
   * Size of the menu items
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Maximum height of the menu
   */
  maxHeight?: number | string;

  /**
   * Minimum width of the menu
   */
  minWidth?: number | string;

  /**
   * Whether to close on item click
   */
  closeOnItemClick?: boolean;

  /**
   * Whether to show icons space even when no icons
   */
  showIconSpace?: boolean;
}