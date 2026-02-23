import type { PaginationProps as MuiPaginationProps } from '@mui/material/Pagination';
import type { ReactNode } from 'react';

export interface PaginationProps extends Omit<MuiPaginationProps, 'variant' | 'size'> {
  /**
   * The variant of the pagination
   */
  variant?: 'default' | 'rounded' | 'dots' | 'minimal';

  /**
   * Size of the pagination buttons
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Current page number
   */
  page: number;

  /**
   * Total number of pages
   */
  count: number;

  /**
   * Callback when page changes
   */
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;

  /**
   * Number of always visible pages at the beginning and end
   */
  boundaryCount?: number;

  /**
   * Number of always visible pages before and after the current page
   */
  siblingCount?: number;

  /**
   * Whether to hide the next-page button
   */
  hideNextButton?: boolean;

  /**
   * Whether to hide the previous-page button
   */
  hidePrevButton?: boolean;

  /**
   * Whether to show first and last page buttons
   */
  showFirstButton?: boolean;

  /**
   * Whether to show last page button
   */
  showLastButton?: boolean;

  /**
   * Custom first button icon
   */
  firstIcon?: ReactNode;

  /**
   * Custom last button icon
   */
  lastIcon?: ReactNode;

  /**
   * Custom previous button icon
   */
  previousIcon?: ReactNode;

  /**
   * Custom next button icon
   */
  nextIcon?: ReactNode;

  /**
   * Whether the pagination is disabled
   */
  disabled?: boolean;

  /**
   * Custom color for the active page
   */
  color?: 'primary' | 'secondary' | 'standard';

  /**
   * Whether to show page info text
   */
  showPageInfo?: boolean;

  /**
   * Custom page info format function
   */
  pageInfoFormat?: (page: number, count: number) => string;

  /**
   * Whether to show items per page selector (for dots variant)
   */
  showItemsPerPage?: boolean;

  /**
   * Items per page options (for dots variant)
   */
  itemsPerPageOptions?: number[];

  /**
   * Current items per page (for dots variant)
   */
  itemsPerPage?: number;

  /**
   * Callback when items per page changes (for dots variant)
   */
  onItemsPerPageChange?: (itemsPerPage: number) => void;

  /**
   * Custom class name
   */
  className?: string;

  /**
   * Test ID for component testing
   */
  dataTestId?: string;
}