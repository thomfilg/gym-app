import type { TabsProps as MuiTabsProps } from '@mui/material/Tabs';
import type { ReactNode } from 'react';

export interface TabItem {
  /**
   * Unique identifier for the tab
   */
  id: string;

  /**
   * Tab label
   */
  label: string;

  /**
   * Tab content
   */
  content: ReactNode;

  /**
   * Icon to display in the tab
   */
  icon?: ReactNode;

  /**
   * Whether the tab is disabled
   */
  disabled?: boolean;

  /**
   * Badge content to show on the tab
   */
  badge?: string | number;

  /**
   * Custom className for the tab
   */
  className?: string;

  /**
   * Whether the tab is closable
   */
  closable?: boolean;

  /**
   * Callback when tab is closed
   */
  onClose?: () => void;
}

export interface TabsProps extends Omit<MuiTabsProps, 'variant' | 'children' | 'indicatorColor' | 'scrollButtons'> {
  /**
   * The visual variant of the tabs
   */
  variant?: 'default' | 'pills' | 'underline' | 'enclosed';

  /**
   * Size of the tabs
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Array of tab items
   */
  items: TabItem[];

  /**
   * Currently active tab ID
   */
  value: string;

  /**
   * Callback when tab changes
   */
  onChange: (event: React.SyntheticEvent, tabId: string) => void;

  /**
   * Color theme for the tabs
   */
  color?: 'primary' | 'secondary';

  /**
   * Whether tabs should fill the full width
   */
  fullWidth?: boolean;

  /**
   * Position of the tabs
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * Whether to show dividers between tabs
   */
  showDividers?: boolean;

  /**
   * Whether tabs are centered
   */
  centered?: boolean;

  /**
   * Whether to allow scrolling tabs
   */
  scrollable?: boolean;

  /**
   * Scroll button behavior
   */
  scrollButtons?: 'auto' | 'desktop' | 'on' | 'off';

  /**
   * Whether to show content animations
   */
  animateContent?: boolean;

  /**
   * Animation duration for content transitions
   */
  animationDuration?: number;

  /**
   * Whether to persist inactive tab content (keep in DOM)
   */
  persistContent?: boolean;

  /**
   * Callback when a tab is closed (for closable tabs)
   */
  onTabClose?: (tabId: string) => void;

  /**
   * Custom class name
   */
  className?: string;

  /**
   * Whether the tabs are disabled
   */
  disabled?: boolean;

  /**
   * Custom tab indicator color
   */
  indicatorColor?: string;

  /**
   * Custom tab panel styling
   */
  tabPanelProps?: {
    className?: string;
    style?: React.CSSProperties;
  };

  /**
   * Whether to show loading state for tab content
   */
  loading?: boolean;

  /**
   * Custom loading component
   */
  loadingComponent?: ReactNode;

  /**
   * Focus handler for tabs
   */
  onFocus?: React.FocusEventHandler<HTMLDivElement>;

  /**
   * Blur handler for tabs
   */
  onBlur?: React.FocusEventHandler<HTMLDivElement>;

  /**
   * Optional test ID for testing purposes
   */
  dataTestId?: string;
}

export interface TabPanelProps {
  /**
   * Content to display
   */
  children?: ReactNode;

  /**
   * Tab ID
   */
  id: string;

  /**
   * Current active tab ID
   */
  value: string;

  /**
   * Whether to animate content transitions
   */
  animate?: boolean;

  /**
   * Animation duration
   */
  animationDuration?: number;

  /**
   * Whether to persist content when inactive
   */
  persist?: boolean;

  /**
   * Loading state
   */
  loading?: boolean;

  /**
   * Custom loading component
   */
  loadingComponent?: ReactNode;

  /**
   * Custom class name
   */
  className?: string;
}