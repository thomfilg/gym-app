import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Skeleton from '@mui/material/Skeleton';
import Switch from '@mui/material/Switch';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import useMediaQuery from '@mui/material/useMediaQuery';
import { alpha, keyframes, useTheme } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import React, { useCallback,useEffect, useMemo, useState } from 'react';

import { useDensitySpacing } from '../../../utils/density';
import type {
  ColumnConfig,
  TableBodyProps,
  TableDensity,
  TableHeaderProps,
  TableProps,
  TableStripeColor} from './Table.types';

// Define pulse animation
const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 currentColor;
    opacity: 1;
  }
  70% {
    box-shadow: 0 0 0 10px currentColor;
    opacity: 0;
  }
  100% {
    box-shadow: 0 0 0 0 currentColor;
    opacity: 0;
  }
`;

// Density configurations
// These are base values in spacing units that will be scaled by the global density multiplier
// The Table's own density prop (compact/normal/comfortable) controls the relative spacing,
// while the global density system scales all values uniformly
const getDensityConfigUnits = (density: TableDensity = 'normal') => {
  const configs = {
    compact: {
      rowHeight: 36, // px - kept as is for consistent row heights
      cellPaddingV: 1.5, // units (6px at normal)
      cellPaddingH: 3,   // units (12px at normal)
      fontSize: '0.8125rem',
      headerPaddingV: 2, // units (8px at normal)
      headerPaddingH: 3, // units (12px at normal)
    },
    normal: {
      rowHeight: 52, // px
      cellPaddingV: 3,   // units (12px at normal)
      cellPaddingH: 4,   // units (16px at normal)
      fontSize: '0.875rem',
      headerPaddingV: 4, // units (16px at normal)
      headerPaddingH: 4, // units (16px at normal)
    },
    comfortable: {
      rowHeight: 68, // px
      cellPaddingV: 4.5, // units (18px at normal)
      cellPaddingH: 6,   // units (24px at normal)
      fontSize: '0.875rem',
      headerPaddingV: 5, // units (20px at normal)
      headerPaddingH: 6, // units (24px at normal)
    },
  };
  return configs[density];
};

// Convert units to pixel strings using density-aware spacing
const getDensityConfig = (
  density: TableDensity = 'normal',
  spacingPx?: (units: number) => string
) => {
  const units = getDensityConfigUnits(density);
  // If spacingPx function is provided, use it for density-aware sizing
  // Otherwise fall back to default 4px per unit
  const toPixels = spacingPx || ((u: number) => `${u * 4}px`);

  return {
    rowHeight: units.rowHeight,
    cellPadding: `${toPixels(units.cellPaddingV)} ${toPixels(units.cellPaddingH)}`,
    fontSize: units.fontSize,
    headerPadding: `${toPixels(units.headerPaddingV)} ${toPixels(units.headerPaddingH)}`,
  };
};

const StyledTableContainer = styled(TableContainer, {
  shouldForwardProp: (prop) => !['virtualScrolling', 'containerHeight', 'stickyHeader'].includes(prop as string),
})<{
  virtualScrolling?: boolean;
  containerHeight?: number | string;
  stickyHeader?: boolean;
}>(({ virtualScrolling, containerHeight, stickyHeader }) => ({
  // For page-level sticky headers, override MUI's default overflow: auto
  // This allows the header to stick to the viewport instead of a scrolling container
  ...(!virtualScrolling && stickyHeader && {
    overflow: 'visible',
  }),
  // Only apply container height for virtual scrolling mode
  ...(virtualScrolling && {
    height: containerHeight || 400,
    overflow: 'auto',
  }),
}));

// Helper function to get stripe color from theme
const getStripeColorFromTheme = (theme: { palette: { primary: { main: string }; secondary: { main: string }; info: { main: string }; success: { main: string }; warning: { main: string }; error: { main: string }; action: { hover: string } } }, stripeColor: TableStripeColor = 'neutral') => {
  const colorMap: Record<TableStripeColor, string> = {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    info: theme.palette.info.main,
    success: theme.palette.success.main,
    warning: theme.palette.warning.main,
    error: theme.palette.error.main,
    neutral: theme.palette.action.hover,
  };
  return colorMap[stripeColor];
};

const StyledTable = styled(MuiTable, {
  shouldForwardProp: (prop) =>
    !['customVariant', 'glow', 'pulse', 'hoverable', 'densityConfig', 'stickyHeader', 'stickyHeaderOffset', 'stripeColor'].includes(prop as string),
})<{
  customVariant?: string;
  glow?: boolean;
  pulse?: boolean;
  hoverable?: boolean;
  densityConfig?: { rowHeight: number; cellPadding: string; fontSize: string; headerPadding: string };
  stickyHeader?: boolean;
  stickyHeaderOffset?: number | string;
  stripeColor?: TableStripeColor;
}>(({ theme, customVariant, glow, pulse, hoverable, densityConfig = getDensityConfig('normal'), stickyHeader, stickyHeaderOffset = 0, stripeColor = 'neutral' }) => {

  return {
    borderRadius: theme.spacing(1),
    // overflow: hidden breaks position: sticky, so disable it when stickyHeader is enabled
    overflow: stickyHeader ? 'visible' : 'hidden',
    transition: 'all 0.3s ease',
    position: 'relative',

    // Density styles
    '& .MuiTableCell-root': {
      padding: densityConfig.cellPadding,
      fontSize: densityConfig.fontSize,
      height: densityConfig.rowHeight,
    },

    // Sticky header - position: sticky must be on <th> cells, not <thead>
    // See: https://css-tricks.com/position-sticky-and-table-headers/
    ...(stickyHeader && {
      '& .MuiTableHead-root .MuiTableCell-root': {
        position: 'sticky',
        top: typeof stickyHeaderOffset === 'number' ? stickyHeaderOffset : stickyHeaderOffset,
        zIndex: 100,
        backgroundColor: theme.palette.background.paper,
        borderBottom: `2px solid ${theme.palette.divider}`,
        fontWeight: 600,
        padding: densityConfig.headerPadding,
      },
    }),

    // Variant styles
    ...(customVariant === 'default' && {
      backgroundColor: theme.palette.background.paper,
      '& .MuiTableHead-root': {
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
      },
    }),

    ...(customVariant === 'striped' && {
      backgroundColor: theme.palette.background.paper,
      '& .MuiTableBody-root .MuiTableRow-root:nth-of-type(even)': {
        backgroundColor: alpha(getStripeColorFromTheme(theme, stripeColor), stripeColor === 'neutral' ? 0.5 : 0.15),
      },
    }),

    ...(customVariant === 'glass' && {
      backgroundColor: alpha(theme.palette.background.paper, 0.1),
      backdropFilter: 'blur(20px)',
      border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
    }),

    ...(customVariant === 'minimal' && {
      backgroundColor: 'transparent',
      '& .MuiTableCell-root': {
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      },
    }),

    ...(customVariant === 'gradient' && {
      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.secondary.main, 0.05)})`,
      border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
      '& .MuiTableHead-root': {
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)}, ${alpha(theme.palette.secondary.main, 0.15)})`,
      },
      '& .MuiTableCell-root': {
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
      },
    }),

    // Hoverable rows
    ...(hoverable && {
      '& .MuiTableBody-root .MuiTableRow-root:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
        cursor: 'pointer',
        transition: 'background-color 0.15s ease-in-out',
      },
    }),

    // Selection styles
    '& .MuiTableRow-root.selected': {
      backgroundColor: alpha(theme.palette.primary.main, 0.12),
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.16),
      },
    },

    // Glow effect
    ...(glow && !pulse && {
      boxShadow: `0 0 20px 5px ${alpha(theme.palette.primary.main, 0.3)} !important`,
      filter: 'brightness(1.05)',
    }),

    // Pulse animation
    ...(pulse && !glow && {
      position: 'relative',
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 'inherit',
        backgroundColor: theme.palette.primary.main,
        opacity: 0.1,
        animation: `${pulseAnimation} 2s infinite`,
        pointerEvents: 'none',
        zIndex: -1,
      },
    }),

    // Both glow and pulse
    ...(glow && pulse && {
      position: 'relative',
      boxShadow: `0 0 20px 5px ${alpha(theme.palette.primary.main, 0.3)} !important`,
      filter: 'brightness(1.05)',
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 'inherit',
        backgroundColor: theme.palette.primary.main,
        opacity: 0.1,
        animation: `${pulseAnimation} 2s infinite`,
        pointerEvents: 'none',
        zIndex: -1,
      },
    }),
  };
});

// Virtual Scrolling Hook
const useVirtualScrolling = (
  data: Record<string, unknown>[],
  rowHeight: number,
  containerHeight: number,
  overscan: number = 5
) => {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleItems = useMemo(() => {
    const visibleHeight = containerHeight;
    const startIndex = Math.floor(scrollTop / rowHeight);
    const endIndex = Math.min(
      data.length,
      Math.ceil((scrollTop + visibleHeight) / rowHeight)
    );

    const start = Math.max(0, startIndex - overscan);
    const end = Math.min(data.length, endIndex + overscan);

    return {
      startIndex: start,
      endIndex: end,
      items: data.slice(start, end),
      totalHeight: data.length * rowHeight,
      offsetY: start * rowHeight,
    };
  }, [data, rowHeight, containerHeight, scrollTop, overscan]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return { visibleItems, handleScroll };
};

// Responsive Hook
const useResponsive = (
  columns: ColumnConfig[],
  columnPriorities?: number[]
) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const [hiddenColumns, setHiddenColumns] = useState<number[]>([]);
  const [columnMenuAnchor, setColumnMenuAnchor] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (!columnPriorities) return;

    let columnsToHide: number[] = [];

    if (isMobile) {
      // Hide lowest priority columns on mobile
      columnsToHide = columnPriorities
        .map((priority, index) => ({ priority, index }))
        .sort((a, b) => b.priority - a.priority)
        .slice(0, Math.floor(columns.length / 2))
        .map(item => item.index);
    } else if (isTablet) {
      // Hide some columns on tablet
      columnsToHide = columnPriorities
        .map((priority, index) => ({ priority, index }))
        .sort((a, b) => b.priority - a.priority)
        .slice(0, Math.floor(columns.length / 3))
        .map(item => item.index);
    }

    setHiddenColumns(columnsToHide);
  }, [isMobile, isTablet, columnPriorities, columns.length]);

  const visibleColumns = columns.filter((_, index) => !hiddenColumns.includes(index));

  return {
    visibleColumns,
    hiddenColumns,
    isMobile,
    columnMenuAnchor,
    setColumnMenuAnchor,
    setHiddenColumns,
  };
};

// Enhanced Table Header Component
const EnhancedTableHeader: React.FC<TableHeaderProps> = React.memo(({
  columns,
  data,
  sortable,
  sortConfig,
  onSortChange,
  selectable,
  selectedRows = [],
  onSelectAll,
}) => {
  const handleSort = useCallback(
    (columnKey: string) => {
      if (!sortable || !onSortChange) return;

      const direction =
        sortConfig?.key === columnKey && sortConfig.direction === 'asc' ? 'desc' : 'asc';
      onSortChange(columnKey, direction);
    },
    [sortable, onSortChange, sortConfig]
  );

  const handleSelectAll = useCallback(
    (event: React.ChangeEvent<globalThis.HTMLInputElement>) => {
      if (!onSelectAll) return;
      onSelectAll(event.target.checked);
    },
    [onSelectAll]
  );

  return (
    <TableHead>
      <TableRow>
        {selectable && (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={selectedRows.length > 0 && selectedRows.length < data.length}
              checked={selectedRows.length === data.length && data.length > 0}
              onChange={handleSelectAll}
              inputProps={{ 'aria-label': 'select all' }}
            />
          </TableCell>
        )}
        {columns.map((column) => (
          <TableCell
            key={column.key}
            align={column.align || 'left'}
            style={{
              minWidth: column.minWidth,
              width: column.width,
            }}
            aria-sort={
              sortable && column.sortable !== false && sortConfig?.key === column.key
                ? sortConfig.direction === 'asc' ? 'ascending' : 'descending'
                : undefined
            }
          >
            {sortable && column.sortable !== false ? (
              <TableSortLabel
                active={sortConfig?.key === column.key}
                direction={sortConfig?.key === column.key ? sortConfig.direction : 'asc'}
                onClick={() => handleSort(column.key)}
                data-testid="sort-indicator"
                aria-label={`Sort by ${column.label}`}
              >
                {column.label}
              </TableSortLabel>
            ) : (
              column.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
});

EnhancedTableHeader.displayName = 'EnhancedTableHeader';

// Enhanced Table Body Component
const EnhancedTableBody: React.FC<TableBodyProps> = React.memo(({
  data,
  columns,
  selectedRows = [],
  onRowClick,
  onRowFocus,
  onRowBlur,
  onSelectionChange,
  rowKeyExtractor,
  selectable,
  renderRow,
  renderCell,
  virtualScrolling,
  containerHeight,
  rowHeight,
  overscan = 5,
}) => {
  const getRowKey = useCallback(
    (rowData: Record<string, unknown>, index: number): string | number => rowKeyExtractor ? rowKeyExtractor(rowData, index) : (rowData.id as string | number) || index,
    [rowKeyExtractor]
  );

  const isRowSelected = useCallback(
    (rowKey: string | number) => selectedRows.includes(rowKey),
    [selectedRows]
  );

  const handleRowSelection = useCallback(
    (event: React.MouseEvent | React.ChangeEvent, rowKey: string | number) => {
      // Stop propagation to prevent row click conflict
      event.stopPropagation();
      if (!onSelectionChange) return;
      const isSelected = selectedRows.includes(rowKey);
      onSelectionChange(rowKey, !isSelected);
    },
    [onSelectionChange, selectedRows]
  );

  const renderTableRow = useCallback((rowData: Record<string, unknown>, index: number, offsetY: number = 0) => {
    const rowKey = getRowKey(rowData, index);
    const selected = isRowSelected(rowKey);

    if (renderRow) {
      return renderRow(rowData, index, selected);
    }

    return (
      <TableRow
        key={String(rowKey)}
        selected={selected}
        className={selected ? 'selected' : ''}
        onClick={(event: React.MouseEvent<globalThis.HTMLTableRowElement>) => onRowClick?.(event, rowData)}
        onFocus={(event: React.FocusEvent<globalThis.HTMLTableRowElement>) => onRowFocus?.(event, rowData)}
        onBlur={(event: React.FocusEvent<globalThis.HTMLTableRowElement>) => onRowBlur?.(event, rowData)}
        style={virtualScrolling ? {
          transform: `translateY(${offsetY}px)`,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: rowHeight,
        } : undefined}
      >
        {selectable && (
          <TableCell padding="checkbox">
            <Checkbox
              checked={selected}
              onChange={(event) => handleRowSelection(event, rowKey)}
              onClick={(event) => event.stopPropagation()}
              inputProps={{ 'aria-label': `select row ${index + 1}` }}
            />
          </TableCell>
        )}
        {columns.map((column) => {
          const value = rowData[column.key];
          return (
            <TableCell key={column.key} align={column.align || 'left'}>
              {renderCell
                ? renderCell(value, column, rowData, index)
                : column.render
                  ? column.render(value, rowData)
                  : (value as React.ReactNode)
              }
            </TableCell>
          );
        })}
      </TableRow>
    );
  }, [getRowKey, isRowSelected, renderRow, renderCell, columns, selectable, handleRowSelection, onRowClick, onRowFocus, onRowBlur, virtualScrolling, rowHeight]);

  const { visibleItems, handleScroll } = useVirtualScrolling(
    data,
    rowHeight || 40,
    typeof containerHeight === 'number' ? containerHeight : 400,
    overscan
  );

  if (virtualScrolling && containerHeight && rowHeight) {

    return (
      <Box
        onScroll={handleScroll}
        style={{
          height: containerHeight,
          overflow: 'auto',
          position: 'relative',
        }}
      >
        <TableBody
          style={{
            height: visibleItems.totalHeight,
            position: 'relative',
          }}
        >
          {visibleItems.items.map((rowData, index) =>
            renderTableRow(rowData, visibleItems.startIndex + index, visibleItems.offsetY + index * rowHeight)
          )}
        </TableBody>
      </Box>
    );
  }

  return (
    <TableBody>
      {data.map((rowData, index) => renderTableRow(rowData, index))}
    </TableBody>
  );
});

EnhancedTableBody.displayName = 'EnhancedTableBody';

// Main Table Component
export const Table = React.forwardRef<globalThis.HTMLTableElement, TableProps>(
  ({
    // Basic props
    variant = 'default',
    stripeColor = 'neutral',
    glow = false,
    pulse = false,
    hoverable = false,
    loading = false,
    children,

    // Advanced feature props
    density = 'normal',
    stickyHeader = false,
    stickyHeaderOffset = 0,
    selectable = false,
    selectedRows = [],
    onSelectionChange,
    rowKeyExtractor,
    sortable = false,
    sortConfig,
    onSortChange,
    columns,
    data,
    virtualScrolling = false,
    rowHeight = 52,
    overscan = 5,
    responsive = false,
    columnPriorities,
    showColumnToggle = true,
    containerHeight,
    loadingComponent,
    emptyStateComponent,
    renderRow,
    renderCell,
    onRowClick,
    onRowFocus,
    onRowBlur,

    ...props
  }, ref) => {
    useTheme(); // Required for responsive behavior
    const { spacingPx } = useDensitySpacing();

    // Get density-aware configuration
    // The Table's density prop controls relative sizing (compact/normal/comfortable)
    // while the global density system scales all values uniformly
    const densityConfig = getDensityConfig(density, spacingPx);

    // Use responsive hook if responsive mode is enabled
    const {
      visibleColumns,
      hiddenColumns,
      isMobile,
      columnMenuAnchor,
      setColumnMenuAnchor,
      setHiddenColumns,
    } = useResponsive(
      columns || [],
      responsive ? columnPriorities : undefined
    );

    // Handle selection changes
    const handleSelectionChange = useCallback((rowKey: string | number, selected: boolean) => {
      if (!onSelectionChange) return;

      let newSelection: (string | number)[];
      if (selected) {
        newSelection = [...selectedRows, rowKey];
      } else {
        newSelection = selectedRows.filter(key => key !== rowKey);
      }
      onSelectionChange(newSelection);
    }, [selectedRows, onSelectionChange]);

    const handleSelectAll = useCallback((selected: boolean) => {
      if (!onSelectionChange || !data) return;

      if (selected) {
        const allKeys = data.map((rowData, index) =>
          rowKeyExtractor ? rowKeyExtractor(rowData, index) : (rowData.id as string | number) || index
        );
        onSelectionChange(allKeys);
      } else {
        onSelectionChange([]);
      }
    }, [data, onSelectionChange, rowKeyExtractor]);

    // Loading state
    if (loading) {
      const loadingRows = Array.from({ length: 5 }, (_, index) => (
        <TableRow key={index}>
          {columns?.map((column) => (
            <TableCell key={column.key}>
              <Skeleton height={20} />
            </TableCell>
          ))}
        </TableRow>
      ));

      return (
        <StyledTableContainer stickyHeader={stickyHeader}>
          <StyledTable
            ref={ref}
            customVariant={variant}
            stripeColor={stripeColor}
            glow={glow}
            pulse={pulse}
            hoverable={hoverable}
            densityConfig={densityConfig}
            stickyHeader={stickyHeader}
            stickyHeaderOffset={stickyHeaderOffset}
            {...props}
          >
            {columns && (
              <EnhancedTableHeader
                columns={responsive ? visibleColumns : columns}
                data={[]}
                sortable={sortable}
                sortConfig={sortConfig}
                onSortChange={onSortChange}
                selectable={selectable}
                selectedRows={selectedRows}
                onSelectAll={handleSelectAll}
                density={density}
                stickyHeader={stickyHeader}
              />
            )}
            <TableBody data-testid="table-loading">
              {loadingComponent || loadingRows}
            </TableBody>
          </StyledTable>
        </StyledTableContainer>
      );
    }

    // Empty state
    if (data && data.length === 0) {
      return (
        <StyledTableContainer stickyHeader={stickyHeader}>
          <StyledTable
            ref={ref}
            customVariant={variant}
            stripeColor={stripeColor}
            glow={glow}
            pulse={pulse}
            hoverable={hoverable}
            densityConfig={densityConfig}
            stickyHeader={stickyHeader}
            stickyHeaderOffset={stickyHeaderOffset}
            {...props}
          >
            {columns && (
              <EnhancedTableHeader
                columns={responsive ? visibleColumns : columns}
                data={[]}
                sortable={sortable}
                sortConfig={sortConfig}
                onSortChange={onSortChange}
                selectable={selectable}
                selectedRows={selectedRows}
                onSelectAll={handleSelectAll}
                density={density}
                stickyHeader={stickyHeader}
              />
            )}
            <TableBody>
              <TableRow>
                <TableCell colSpan={(responsive ? visibleColumns : columns)?.length || 1} align="center">
                  {emptyStateComponent || (
                    <Box py={4} color="text.secondary">
                      No data available
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </StyledTable>
        </StyledTableContainer>
      );
    }

    // Advanced table with columns and data
    if (columns && data) {
      const finalColumns = responsive ? visibleColumns : columns;

      return (
        <Box position="relative">
          <StyledTableContainer
            stickyHeader={stickyHeader}
            virtualScrolling={virtualScrolling}
            containerHeight={containerHeight}
          >
            <StyledTable
              ref={ref}
              customVariant={variant}
              stripeColor={stripeColor}
              glow={glow}
              pulse={pulse}
              hoverable={hoverable}
              densityConfig={densityConfig}
              stickyHeader={stickyHeader}
              stickyHeaderOffset={stickyHeaderOffset}
              {...props}
            >
              <EnhancedTableHeader
                columns={finalColumns}
                data={data}
                sortable={sortable}
                sortConfig={sortConfig}
                onSortChange={onSortChange}
                selectable={selectable}
                selectedRows={selectedRows}
                onSelectAll={handleSelectAll}
                density={density}
                stickyHeader={stickyHeader}
              />
              <EnhancedTableBody
                data={data}
                columns={finalColumns}
                selectedRows={selectedRows}
                onRowClick={onRowClick}
                onRowFocus={onRowFocus}
                onRowBlur={onRowBlur}
                onSelectionChange={handleSelectionChange}
                rowKeyExtractor={rowKeyExtractor}
                density={density}
                selectable={selectable}
                hoverable={hoverable}
                renderRow={renderRow}
                renderCell={renderCell}
                virtualScrolling={virtualScrolling}
                containerHeight={typeof containerHeight === 'number' ? containerHeight : undefined}
                rowHeight={rowHeight}
                overscan={overscan}
              />
            </StyledTable>
          </StyledTableContainer>

          {/* Column Toggle Menu for Responsive */}
          {responsive && isMobile && showColumnToggle && hiddenColumns.length > 0 && (
            <Box position="absolute" top={8} right={8}>
              <IconButton
                onClick={(event) => setColumnMenuAnchor(event.currentTarget)}
                size="small"
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={columnMenuAnchor}
                open={Boolean(columnMenuAnchor)}
                onClose={() => setColumnMenuAnchor(null)}
              >
                {columns.map((column, index) => (
                  <MenuItem key={column.key}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={!hiddenColumns.includes(index)}
                          onChange={(e) => {
                            const newHidden = e.target.checked
                              ? hiddenColumns.filter(i => i !== index)
                              : [...hiddenColumns, index];
                            setHiddenColumns(newHidden);
                          }}
                          size="small"
                        />
                      }
                      label={column.label}
                    />
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Box>
      );
    }

    // Basic table (backward compatibility)
    return (
      <StyledTable
        ref={ref}
        customVariant={variant}
        stripeColor={stripeColor}
        glow={glow}
        pulse={pulse}
        hoverable={hoverable}
        densityConfig={densityConfig}
        stickyHeader={stickyHeader}
        stickyHeaderOffset={stickyHeaderOffset}
        {...props}
      >
        {children}
      </StyledTable>
    );
  }
);

Table.displayName = 'Table';