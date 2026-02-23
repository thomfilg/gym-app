import type React from 'react';

export type GridSizeMode = 'auto' | 'fixed' | 'fill';
export type GridDensity = 'compact' | 'comfortable' | 'spacious';
export type SortDirection = 'asc' | 'desc' | null;
export type GridSelectionMode = 'none' | 'single' | 'multi';
export type PaginationMode = 'client' | 'server';
export type SortMode = 'client' | 'server';
export type FilterMode = 'client' | 'server';
export type EditMode = 'none' | 'cell' | 'row';

export interface GridColumn<T = Record<string, unknown>> {
  /** Unique column id (stable across renders) */
  id: string;
  /** Column header label (string or node) */
  header: React.ReactNode;
  /** Accessor: key or function to derive value from row */
  accessor?: keyof T | ((row: T) => unknown);
  /** Column type influences default formatting and editors */
  type?: 'text' | 'number' | 'date' | 'datetime' | 'boolean' | 'currency' | 'actions';
  /** Width hints (px) and min/max constraints */
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  /** Column is initially hidden */
  hidden?: boolean;
  /** Pin to left/right (sticky) */
  pin?: 'left' | 'right';
  /** Enable/disable sort, filter, resize, reorder, edit per column */
  enableSort?: boolean;
  enableFilter?: boolean;
  enableResize?: boolean;
  enableReorder?: boolean;
  enableEdit?: boolean;
  /** Custom renderers */
  cell?: (ctx: { value: unknown; row: T; rowIndex: number; col: GridColumn<T> }) => React.ReactNode;
  headerCell?: (col: GridColumn<T>) => React.ReactNode;
  /** Cell editor renderer (edit mode) */
  editor?: (ctx: {
    value: unknown;
    row: T;
    onChange: (next: unknown) => void;
    commit: () => void;
    cancel: () => void;
  }) => React.ReactNode;
  /** Column-specific filter UI and predicate (client mode) */
  filterComponent?: (ctx: {
    value: unknown;
    setValue: (next: unknown) => void;
    col: GridColumn<T>;
  }) => React.ReactNode;
  filterPredicate?: (value: unknown, filterValue: unknown, row: T) => boolean;
  /** Accessibility label for header button controls */
  ariaLabel?: string;
}

export interface GridSort {
  id: string; // column id
  dir: SortDirection; // asc | desc | null
}

export interface GridFilter {
  id: string; // column id
  value: unknown; // opaque filter value per column type
}

export interface GridRowExpansion<T = Record<string, unknown>> {
  /** Render expanded content */
  render: (row: T, rowIndex: number) => React.ReactNode;
  /** Controlled expanded row ids */
  expandedRowIds?: Array<string | number>;
  /** Uncontrolled defaults */
  defaultExpandedRowIds?: Array<string | number>;
  /** Row id equality uses `getRowId` */
  onChangeExpanded?: (ids: Array<string | number>) => void;
}

export interface GridSelection {
  mode?: GridSelectionMode; // none | single | multi
  selectedRowIds?: Array<string | number>; // controlled
  defaultSelectedRowIds?: Array<string | number>;
  onChangeSelected?: (ids: Array<string | number>) => void;
}

export interface GridPagination {
  mode?: PaginationMode; // client | server
  pageIndex?: number; // controlled, 0-based
  pageSize?: number; // rows per page
  rowCount?: number; // total rows (server)
  onChangePage?: (nextIndex: number) => void;
  onChangePageSize?: (nextSize: number) => void;
}

export interface GridSorting {
  mode?: SortMode; // client | server
  sortBy?: GridSort[]; // controlled
  defaultSortBy?: GridSort[];
  onChangeSortBy?: (next: GridSort[]) => void;
}

export interface GridFiltering {
  mode?: FilterMode; // client | server
  filters?: GridFilter[]; // controlled
  defaultFilters?: GridFilter[];
  onChangeFilters?: (next: GridFilter[]) => void;
}

export interface GridEditing<T = Record<string, unknown>> {
  mode?: EditMode; // none | cell | row
  /** Called when a cell (or row) attempts to commit a value */
  onEditCommit?: (ctx: {
    rowId: string | number;
    colId: string;
    value: unknown;
    row: T;
  }) => Promise<void> | void;
  /** Validation error message per cell (controlled) */
  getCellError?: (rowId: string | number, colId: string) => string | undefined;
}

export interface DataGridProps<T = Record<string, unknown>> extends React.HTMLAttributes<HTMLElement> {
  /** Dataset (client mode uses this array; server mode renders current page) */
  rows: T[];
  /** Stable row id accessor */
  getRowId?: (row: T, index: number) => string | number;
  /** Column definitions */
  columns: GridColumn<T>[];

  /** Sizing, density, and layout */
  sizeMode?: GridSizeMode; // auto | fixed | fill
  density?: GridDensity; // compact | comfortable | spacious
  rowHeight?: number; // default row height (px)
  headerHeight?: number; // default header height (px)
  footerHeight?: number; // optional

  /** Interaction features */
  selection?: GridSelection;
  pagination?: GridPagination;
  sorting?: GridSorting;
  filtering?: GridFiltering;
  expansion?: GridRowExpansion<T>;
  editing?: GridEditing<T>;

  /** Virtualization toggles */
  virtualizeRows?: boolean; // default: true for large datasets
  virtualizeColumns?: boolean; // optional; default: false

  /** Sticky headers/footers and pinned columns */
  stickyHeader?: boolean;
  stickyFooter?: boolean;

  /** Empty/loading/error states */
  loading?: boolean;
  error?: React.ReactNode; // message or node for error state
  emptyState?: React.ReactNode; // custom empty component

  /** Server-fetch hooks (used by server modes) */
  onRequestData?: (params: {
    pageIndex?: number;
    pageSize?: number;
    sortBy?: GridSort[];
    filters?: GridFilter[];
  }) => void;

  /** Accessibility */
  ariaLabel?: string; // label for entire grid region
  ariaDescription?: string;

  /** Testing id passthrough */
  'data-testid'?: string;
}