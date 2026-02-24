import type { CSSProperties, ReactNode, RefObject } from 'react';

export type VirtualListVariant = 'fixed' | 'variable' | 'grid';

export interface VirtualListItem {
  id: string | number;
  height?: number; // For variable height items
  data?: unknown;
}

export interface VirtualListProps {
  items: VirtualListItem[];
  variant?: VirtualListVariant;
  height: number;
  width?: number | string;
  itemHeight?: number; // For fixed height items
  estimatedItemHeight?: number; // For variable height items
  overscan?: number; // Number of items to render outside visible area
  renderItem: (params: { item: VirtualListItem; index: number; style: CSSProperties }) => ReactNode;
  onScroll?: (scrollTop: number) => void;
  className?: string;
  style?: CSSProperties;
  'data-testid'?: string;
  'aria-label'?: string;
  /** External scroll container ref - when provided, uses this element for scroll events */
  scrollContainerRef?: RefObject<HTMLElement | null>;
  /** Disable internal scroll container - use when composing with external ScrollArea */
  disableInternalScroll?: boolean;
}

export interface VirtualGridProps {
  items: VirtualListItem[];
  height: number;
  width?: number | string;
  columnCount: number;
  rowHeight: number;
  columnWidth?: number;
  gap?: number;
  overscan?: number;
  renderItem: (params: {
    item: VirtualListItem;
    index: number;
    columnIndex: number;
    rowIndex: number;
    style: CSSProperties;
  }) => ReactNode;
  onScroll?: (scrollTop: number, scrollLeft: number) => void;
  className?: string;
  style?: CSSProperties;
  'data-testid'?: string;
  'aria-label'?: string;
  /** External scroll container ref - when provided, uses this element for scroll events */
  scrollContainerRef?: RefObject<HTMLElement | null>;
  /** Disable internal scroll container - use when composing with external ScrollArea */
  disableInternalScroll?: boolean;
}
