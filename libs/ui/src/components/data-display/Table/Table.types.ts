import type { TableProps as MuiTableProps } from '@mui/material/Table';
import type React from 'react';

// Advanced feature types
export type TableDensity = 'compact' | 'normal' | 'comfortable';

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export interface FilterConfig {
  [key: string]: {
    value: unknown;
    operator?: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'gt' | 'lt' | 'gte' | 'lte';
  };
}

export interface ColumnConfig<TRow extends Record<string, unknown> = Record<string, unknown>> {
  key: keyof TRow & string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: number | string;
  minWidth?: number;
  priority?: number;
  align?: 'left' | 'center' | 'right';
  render?: (value: TRow[keyof TRow], rowData: TRow) => React.ReactNode;
  filterType?: 'text' | 'number' | 'select' | 'date' | 'boolean';
  filterOptions?: { label: string; value: unknown }[];
}

export interface VirtualScrollConfig {
  enabled: boolean;
  rowHeight: number;
  overscan?: number;
  estimatedRowHeight?: number;
}

export interface ResponsiveConfig {
  enabled: boolean;
  columnPriorities?: number[];
  breakpoints?: {
    hideColumns?: {
      xs?: number[];
      sm?: number[];
      md?: number[];
    };
  };
}

export interface SelectionConfig<TRow extends Record<string, unknown> = Record<string, unknown>> {
  enabled: boolean;
  selectedRows: (string | number)[];
  onSelectionChange: (selectedRows: (string | number)[]) => void;
  selectAllEnabled?: boolean;
  rowKeyExtractor?: (rowData: TRow, index: number) => string | number;
}

export type TableStripeColor = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'neutral';

export interface TableProps<TRow extends Record<string, unknown> = Record<string, unknown>>
  extends Omit<MuiTableProps, 'variant'> {
  /**
   * The variant of the table
   */
  variant?: 'default' | 'striped' | 'glass' | 'minimal' | 'gradient';

  /**
   * The color for striped rows (only applies when variant is 'striped')
   * @default 'neutral'
   */
  stripeColor?: TableStripeColor;

  /**
   * Whether the table should have a glow effect
   */
  glow?: boolean;

  /**
   * Whether the table should have a pulse animation
   */
  pulse?: boolean;

  /**
   * Whether table rows should be hoverable
   */
  hoverable?: boolean;

  /**
   * Whether the table is in loading state
   */
  loading?: boolean;

  /**
   * Handler for row click
   */
  onRowClick?: (event: React.MouseEvent<HTMLTableRowElement>, rowData: TRow) => void;

  /**
   * Handler for row focus
   */
  onRowFocus?: (event: React.FocusEvent<HTMLTableRowElement>, rowData: TRow) => void;

  /**
   * Handler for row blur
   */
  onRowBlur?: (event: React.FocusEvent<HTMLTableRowElement>, rowData: TRow) => void;

  // Advanced Features

  /**
   * The density of the table rows
   */
  density?: TableDensity;

  /**
   * Whether the table header should be sticky during scroll
   */
  stickyHeader?: boolean;

  /**
   * Offset from top for sticky header (e.g., to account for fixed navigation bars)
   * @default 0
   */
  stickyHeaderOffset?: number | string;

  /**
   * Row selection configuration
   */
  selectable?: boolean;

  /**
   * Array of selected row keys
   */
  selectedRows?: (string | number)[];

  /**
   * Callback when row selection changes
   */
  onSelectionChange?: (selectedRows: (string | number)[]) => void;

  /**
   * Function to extract unique key from row data
   */
  rowKeyExtractor?: (rowData: TRow, index: number) => string | number;

  /**
   * Whether columns are sortable
   */
  sortable?: boolean;

  /**
   * Current sort configuration
   */
  sortConfig?: SortConfig;

  /**
   * Callback when sort changes
   */
  onSortChange?: (key: keyof TRow & string, direction: 'asc' | 'desc') => void;

  /**
   * Whether columns are filterable
   */
  filterable?: boolean;

  /**
   * Current filter configuration
   */
  filterConfig?: FilterConfig;

  /**
   * Callback when filter changes
   */
  onFilterChange?: (filterConfig: FilterConfig) => void;

  /**
   * Column configuration for advanced features
   */
  columns?: ColumnConfig<TRow>[];

  /**
   * Table data for advanced features
   */
  data?: TRow[];

  /**
   * Whether to enable virtual scrolling for large datasets
   */
  virtualScrolling?: boolean;

  /**
   * Height of each row for virtual scrolling (required if virtualScrolling is true)
   */
  rowHeight?: number;

  /**
   * Number of items to render outside visible area for virtual scrolling
   */
  overscan?: number;

  /**
   * Whether to enable responsive design features
   */
  responsive?: boolean;

  /**
   * Priority order for columns in responsive mode (1 = highest priority)
   */
  columnPriorities?: number[];

  /**
   * Custom breakpoints for responsive behavior
   */
  responsiveBreakpoints?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
  };

  /**
   * Whether to show column toggle menu on mobile
   */
  showColumnToggle?: boolean;

  /**
   * Container height for virtual scrolling
   */
  containerHeight?: number | string;

  /**
   * Custom loading component
   */
  loadingComponent?: React.ReactNode;

  /**
   * Custom empty state component
   */
  emptyStateComponent?: React.ReactNode;

  /**
   * Whether to enable keyboard navigation
   */
  keyboardNavigation?: boolean;

  /**
   * Custom row renderer for advanced use cases
   */
  renderRow?: (rowData: TRow, index: number, isSelected: boolean) => React.ReactNode;

  /**
   * Custom cell renderer
   */
  renderCell?: (
    value: TRow[keyof TRow],
    column: ColumnConfig<TRow>,
    rowData: TRow,
    rowIndex: number
  ) => React.ReactNode;

  /**
   * Whether to enable row drag and drop
   */
  draggableRows?: boolean;

  /**
   * Callback when rows are reordered
   */
  onRowsReorder?: (fromIndex: number, toIndex: number) => void;

  /**
   * Fixed columns configuration
   */
  fixedColumns?: {
    left?: number;
    right?: number;
  };

  /**
   * Custom styling for different row states
   */
  rowStyleConfig?: {
    selected?: React.CSSProperties;
    hover?: React.CSSProperties;
    focused?: React.CSSProperties;
  };
}

// Export utility types
export type TableSortDirection = 'asc' | 'desc';
export type TableVariant = 'default' | 'striped' | 'glass' | 'minimal' | 'gradient';

// Component prop interfaces for internal use
export interface TableHeaderProps<TRow extends Record<string, unknown> = Record<string, unknown>> {
  columns: ColumnConfig<TRow>[];
  data: TRow[];
  sortable?: boolean;
  sortConfig?: SortConfig;
  onSortChange?: (key: keyof TRow & string, direction: 'asc' | 'desc') => void;
  selectable?: boolean;
  selectedRows?: (string | number)[];
  onSelectAll?: (selected: boolean) => void;
  density?: TableDensity;
  stickyHeader?: boolean;
}

export interface TableBodyProps<TRow extends Record<string, unknown> = Record<string, unknown>> {
  data: TRow[];
  columns: ColumnConfig<TRow>[];
  selectedRows?: (string | number)[];
  onRowClick?: (event: React.MouseEvent<HTMLTableRowElement>, rowData: TRow) => void;
  onRowFocus?: (event: React.FocusEvent<HTMLTableRowElement>, rowData: TRow) => void;
  onRowBlur?: (event: React.FocusEvent<HTMLTableRowElement>, rowData: TRow) => void;
  onSelectionChange?: (rowKey: string | number, selected: boolean) => void;
  rowKeyExtractor?: (rowData: TRow, index: number) => string | number;
  density?: TableDensity;
  selectable?: boolean;
  hoverable?: boolean;
  renderRow?: (rowData: TRow, index: number, isSelected: boolean) => React.ReactNode;
  renderCell?: (
    value: TRow[keyof TRow],
    column: ColumnConfig<TRow>,
    rowData: TRow,
    rowIndex: number
  ) => React.ReactNode;
  virtualScrolling?: boolean;
  containerHeight?: number;
  rowHeight?: number;
  overscan?: number;
}

export interface VirtualTableBodyProps<TRow extends Record<string, unknown> = Record<string, unknown>>
  extends TableBodyProps<TRow> {
  virtualScrolling: true;
  containerHeight: number;
  rowHeight: number;
}

export interface ResponsiveTableProps<TRow extends Record<string, unknown> = Record<string, unknown>> {
  responsive: boolean;
  columnPriorities?: number[];
  responsiveBreakpoints?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
  showColumnToggle?: boolean;
  columns: ColumnConfig<TRow>[];
  onColumnVisibilityChange?: (columnIndex: number, visible: boolean) => void;
}