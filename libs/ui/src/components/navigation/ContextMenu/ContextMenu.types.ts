import type { MenuProps } from '@mui/material/Menu';
import type { ReactNode } from 'react';

export interface ContextMenuItem {
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
   * Keyboard shortcut to display
   */
  shortcut?: string;

  /**
   * Color variant for the item
   */
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

  /**
   * Whether the item is dangerous/destructive
   */
  dangerous?: boolean;
}

export interface ContextMenuProps extends Omit<MenuProps, 'open' | 'anchorEl' | 'variant'> {
  /**
   * The variant of the context menu
   */
  variant?: 'default' | 'glass' | 'dark';

  /**
   * Menu items to display
   */
  items: ContextMenuItem[];

  /**
   * Target element to attach context menu to
   */
  children: ReactNode;

  /**
   * Whether the context menu is disabled
   */
  disabled?: boolean;

  /**
   * Callback when menu opens
   */
  onOpen?: (event: React.MouseEvent) => void;

  /**
   * Callback when menu closes
   */
  onClose?: () => void;

  /**
   * Size of the menu items
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Custom className for the trigger element
   */
  triggerClassName?: string;

  /**
   * Custom styles for the trigger element
   */
  triggerStyle?: React.CSSProperties;
}