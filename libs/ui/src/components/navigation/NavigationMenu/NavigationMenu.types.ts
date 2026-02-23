import type { ReactNode } from 'react';

export interface NavigationMenuItem {
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
   * URL to navigate to
   */
  href?: string;

  /**
   * Whether the item is currently active/selected
   */
  active?: boolean;

  /**
   * Whether the item is disabled
   */
  disabled?: boolean;

  /**
   * Click handler for the menu item
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;

  /**
   * Badge/notification count
   */
  badge?: number | string;

  /**
   * Nested items for submenu
   */
  children?: NavigationMenuItem[];

  /**
   * Description text for the item
   */
  description?: string;

  /**
   * Whether to show a chevron for submenu
   */
  showChevron?: boolean;

  /**
   * Target for the link
   */
  target?: '_blank' | '_self' | '_parent' | '_top';
}

export interface NavigationMenuProps {
  /**
   * The variant of the navigation menu
   */
  variant?: 'horizontal' | 'vertical' | 'mega';

  /**
   * Menu items to display
   */
  items: NavigationMenuItem[];

  /**
   * Color scheme of the menu
   */
  color?: 'default' | 'primary' | 'secondary';

  /**
   * Size of the menu items
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Minimal style with no borders, shadows, or container backgrounds
   */
  minimal?: boolean;

  /**
   * Whether the menu is collapsible (vertical only)
   */
  collapsible?: boolean;

  /**
   * Whether the menu is currently collapsed
   */
  collapsed?: boolean;

  /**
   * Callback when collapse state changes
   */
  onCollapseChange?: (collapsed: boolean) => void;

  /**
   * Custom logo/brand element
   */
  logo?: ReactNode;

  /**
   * Additional content to render at the end
   */
  endContent?: ReactNode;

  /**
   * Maximum width for mega menu
   */
  maxWidth?: number | string;

  /**
   * Whether to show dividers between sections
   */
  showDividers?: boolean;

  /**
   * Custom className
   */
  className?: string;

  /**
   * Custom styles
   */
  style?: React.CSSProperties;
}