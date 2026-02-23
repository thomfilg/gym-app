import type { BreadcrumbsProps as MuiBreadcrumbsProps } from '@mui/material/Breadcrumbs';
import type { ReactNode } from 'react';

export interface BreadcrumbItem {
  /**
   * The label to display for the breadcrumb
   */
  label: string;

  /**
   * The href for the breadcrumb link
   */
  href?: string;

  /**
   * Icon to display before the label
   */
  icon?: ReactNode;

  /**
   * Whether this is the current/active breadcrumb
   */
  active?: boolean;

  /**
   * Click handler for the breadcrumb
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement | HTMLSpanElement>) => void;

  /**
   * Tooltip text to display on hover
   */
  tooltip?: string;

  /**
   * Custom aria-label for accessibility
   */
  ariaLabel?: string;

  /**
   * Internal flag for ellipsis items (used in collapsed behavior)
   * @internal
   */
  isEllipsis?: boolean;
}

export interface BreadcrumbsProps extends Omit<MuiBreadcrumbsProps, 'separator'> {
  /**
   * The visual variant of the breadcrumbs container
   * - default: No special styling
   * - glass: Glass morphism effect with backdrop blur
   * - elevated: Card-like appearance with shadow
   * - outlined: Simple border outline
   */
  variant?: 'default' | 'glass' | 'elevated' | 'outlined';

  /**
   * The type of separator between breadcrumb items
   * - default: Small arrow icon
   * - slash: Forward slash character
   * - arrow: NavigateNext icon
   * - chevron: ChevronRight icon
   * - dot: Bullet point
   * - pipe: Vertical bar
   */
  separatorType?: 'default' | 'slash' | 'arrow' | 'chevron' | 'dot' | 'pipe';

  /**
   * Array of breadcrumb items
   */
  items: BreadcrumbItem[];

  /**
   * Custom separator element (overrides separatorType)
   */
  separator?: ReactNode;

  /**
   * Maximum number of items to display before collapsing
   * @default 8
   */
  maxItems?: number;

  /**
   * Maximum number of items to display on mobile devices
   * @default 3
   */
  mobileMaxItems?: number;

  /**
   * How to handle collapsed items
   * - menu: Show collapsed items in a dropdown menu
   * - ellipsis: Replace middle items with "..."
   * @default 'menu'
   */
  collapseBehavior?: 'menu' | 'ellipsis';

  /**
   * Whether to show home icon for first item
   * @default true
   */
  showHomeIcon?: boolean;

  /**
   * Size of the breadcrumbs
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Color scheme for separators and accents
   * @default 'default'
   */
  color?: 'default' | 'primary' | 'secondary';

  /**
   * Elevation level for glass and elevated variants (0-5)
   * @default 1
   */
  elevation?: 0 | 1 | 2 | 3 | 4 | 5;

  /**
   * Custom aria-label for the breadcrumb navigation
   */
  ariaLabel?: string;

  /**
   * Test ID for the breadcrumbs container and elements
   * @default 'breadcrumbs'
   */
  dataTestId?: string;
}