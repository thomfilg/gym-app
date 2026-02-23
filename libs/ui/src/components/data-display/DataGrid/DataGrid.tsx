import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import UnfoldMore from '@mui/icons-material/UnfoldMore';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useDensitySpacing } from '../../../utils/density';

import type {
  DataGridProps,
  GridColumn,
  GridFilter,
  GridSort,
  SortDirection,
} from './DataGrid.types';

const DEFAULT_ROW_HEIGHT = 52;
const DEFAULT_HEADER_HEIGHT = 56;
const DEFAULT_PAGE_SIZE = 50;
const OVERSCAN_COUNT = 20; // Items to render before/after visible area for smooth scrolling
const VIRTUALIZATION_THRESHOLD = 100; // Enable virtualization for datasets larger than this

export const DataGrid = <T extends Record<string, unknown> = Record<string, unknown>>({
  rows,
  columns,
  getRowId = (row: T, index: number) => (row as { id?: string | number }).id ?? index,
  sizeMode = 'auto',
  density = 'comfortable',
  rowHeight = DEFAULT_ROW_HEIGHT,
  headerHeight = DEFAULT_HEADER_HEIGHT,
  // footerHeight = 0, // TODO: Use for sticky footer implementation
  selection = { mode: 'none' },
  pagination,
  sorting = { mode: 'client' },
  filtering = { mode: 'client' },
  expansion,
  editing = { mode: 'none' },
  virtualizeRows = true,
  virtualizeColumns = false,
  stickyHeader = true,
  // stickyFooter = false, // TODO: Implement sticky footer
  loading = false,
  error,
  emptyState,
  onRequestData,
  ariaLabel = 'Data grid',
  ariaDescription,
  'data-testid': dataTestId,
  className,
  style,
  ...htmlProps
}: DataGridProps<T>) => {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(400);
  const { spacingPx } = useDensitySpacing();

  // Internal state for uncontrolled scenarios
  const [internalSortBy, setInternalSortBy] = useState<GridSort[]>(
    sorting.defaultSortBy || []
  );
  const [internalFilters] = useState<GridFilter[]>(
    filtering.defaultFilters || []
  );
  const [internalSelectedRowIds, setInternalSelectedRowIds] = useState<Array<string | number>>(
    selection.defaultSelectedRowIds || []
  );
  const [internalExpandedRowIds, setInternalExpandedRowIds] = useState<Array<string | number>>(
    expansion?.defaultExpandedRowIds || []
  );
  const [internalPageIndex] = useState(0);
  const [editingCell, setEditingCell] = useState<{ rowId: string | number; colId: string } | null>(null);

  // Use controlled values if provided, otherwise use internal state
  const currentSortBy = sorting.sortBy || internalSortBy;
  const currentFilters = filtering.filters || internalFilters;
  const currentSelectedRowIds = selection.selectedRowIds || internalSelectedRowIds;
  const currentExpandedRowIds = expansion?.expandedRowIds || internalExpandedRowIds;
  const currentPageIndex = pagination?.pageIndex ?? internalPageIndex;
  const currentPageSize = pagination?.pageSize ?? DEFAULT_PAGE_SIZE;

  // Calculate row height based on density
  const actualRowHeight = useMemo(() => {
    const baseHeight = rowHeight;
    switch (density) {
      case 'compact':
        return Math.max(baseHeight * 0.8, 32);
      case 'spacious':
        return baseHeight * 1.2;
      default:
        return baseHeight;
    }
  }, [rowHeight, density]);

  // Pre-compute column map for O(1) lookups instead of O(n) find() calls
  const columnMap = useMemo(() => {
    const map = new Map<string, GridColumn<T>>();
    for (const col of columns) {
      map.set(col.id, col);
    }
    return map;
  }, [columns]);

  // Memoize visible columns to avoid filtering on every row render
  const visibleColumns = useMemo(() => columns.filter(col => !col.hidden), [columns]);

  // Process rows: filter, sort, paginate
  const processedRows = useMemo(() => {
    // Only copy array if we actually need to modify it
    const needsFiltering = filtering.mode === 'client' && currentFilters.length > 0;
    const needsSorting = sorting.mode === 'client' && currentSortBy.length > 0;
    const needsPagination = pagination?.mode === 'client' && !virtualizeRows;

    // If no processing needed, return original array
    if (!needsFiltering && !needsSorting && !needsPagination) {
      return rows;
    }

    let result = rows;

    // Client-side filtering
    if (needsFiltering) {
      result = result.filter((row) => currentFilters.every((filter) => {
        const column = columnMap.get(filter.id); // O(1) lookup instead of O(n)
        if (!column || !filter.value) return true;

        const value = column.accessor
          ? typeof column.accessor === 'function'
            ? column.accessor(row)
            : row[column.accessor]
          : row[column.id];

        if (column.filterPredicate) {
          return column.filterPredicate(value, filter.value, row);
        }

        // Default filtering logic based on column type
        const filterValue = String(filter.value).toLowerCase();
        const cellValue = String(value || '').toLowerCase();
        return cellValue.includes(filterValue);
      }));
    }

    // Client-side sorting - only copy array if we actually need to sort
    if (needsSorting) {
      // Create a copy only for sorting
      result = [...result];
      result.sort((a, b) => {
        for (const sort of currentSortBy) {
          const column = columnMap.get(sort.id); // O(1) lookup instead of O(n)
          if (!column || !sort.dir) continue;

          const aValue = column.accessor
            ? typeof column.accessor === 'function'
              ? column.accessor(a)
              : a[column.accessor]
            : a[column.id];
          const bValue = column.accessor
            ? typeof column.accessor === 'function'
              ? column.accessor(b)
              : b[column.accessor]
            : b[column.id];

          let comparison = 0;

          // Handle null/undefined values
          if (aValue == null && bValue == null) comparison = 0;
          else if (aValue == null) comparison = -1;
          else if (bValue == null) comparison = 1;
          else {
            // Convert to strings for comparison if not numbers
            const aStr = typeof aValue === 'number' ? aValue : String(aValue);
            const bStr = typeof bValue === 'number' ? bValue : String(bValue);

            if (aStr < bStr) comparison = -1;
            else if (aStr > bStr) comparison = 1;
          }

          if (comparison !== 0) {
            return sort.dir === 'desc' ? -comparison : comparison;
          }
        }
        return 0;
      });
    }

    // Client-side pagination ONLY if virtualization is disabled
    // When virtualization is enabled, it handles slicing
    if (needsPagination) {
      const startIndex = currentPageIndex * currentPageSize;
      result = result.slice(startIndex, startIndex + currentPageSize);
    }

    return result;
  }, [rows, columnMap, currentFilters, currentSortBy, currentPageIndex, currentPageSize, filtering.mode, sorting.mode, pagination?.mode, virtualizeRows]);

  // Handle container resize for virtualization
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const height = containerRef.current.clientHeight;
        setContainerHeight(height);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle sort
  const handleSort = useCallback((columnId: string) => {
    const currentSort = currentSortBy.find(s => s.id === columnId);
    let newDirection: SortDirection = 'asc';

    if (currentSort) {
      if (currentSort.dir === 'asc') newDirection = 'desc';
      else if (currentSort.dir === 'desc') newDirection = null;
    }

    const newSortBy = newDirection
      ? [{ id: columnId, dir: newDirection }]
      : currentSortBy.filter(s => s.id !== columnId);

    if (sorting.mode === 'server' && onRequestData) {
      onRequestData({
        pageIndex: currentPageIndex,
        pageSize: currentPageSize,
        sortBy: newSortBy,
        filters: currentFilters,
      });
    } else {
      if (sorting.onChangeSortBy) {
        sorting.onChangeSortBy(newSortBy);
      } else {
        setInternalSortBy(newSortBy);
      }
    }
  }, [currentSortBy, currentPageIndex, currentPageSize, currentFilters, sorting, onRequestData]);

  // Handle selection
  const handleRowSelection = useCallback((rowId: string | number, isSelected: boolean) => {
    let newSelectedIds: Array<string | number>;

    if (selection.mode === 'single') {
      newSelectedIds = isSelected ? [rowId] : [];
    } else if (selection.mode === 'multi') {
      newSelectedIds = isSelected
        ? [...currentSelectedRowIds, rowId]
        : currentSelectedRowIds.filter(id => id !== rowId);
    } else {
      return;
    }

    if (selection.onChangeSelected) {
      selection.onChangeSelected(newSelectedIds);
    } else {
      setInternalSelectedRowIds(newSelectedIds);
    }
  }, [selection, currentSelectedRowIds]);

  // Convert selection and expansion to Sets for O(1) lookups
  const selectedRowIdsSet = useMemo(() => new Set(currentSelectedRowIds), [currentSelectedRowIds]);
  const expandedRowIdsSet = useMemo(() => new Set(currentExpandedRowIds), [currentExpandedRowIds]);

  // Handle expansion
  const handleRowExpansion = useCallback((rowId: string | number) => {
    if (!expansion) return;

    const isExpanded = expandedRowIdsSet.has(rowId);
    const newExpandedIds = isExpanded
      ? currentExpandedRowIds.filter(id => id !== rowId)
      : [...currentExpandedRowIds, rowId];

    if (expansion.onChangeExpanded) {
      expansion.onChangeExpanded(newExpandedIds);
    } else {
      setInternalExpandedRowIds(newExpandedIds);
    }
  }, [expansion, currentExpandedRowIds, expandedRowIdsSet]);

  // Simple virtualization for large datasets with optimized range calculation
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 50 });
  const scrollRafRef = useRef<number | null>(null);

  // Reset visible range when processedRows changes size significantly
  useEffect(() => {
    if (processedRows.length < visibleRange.end) {
      setVisibleRange({
        start: 0,
        end: Math.min(50, processedRows.length)
      });
    }
  }, [processedRows.length, visibleRange.end]);

  const visibleRows = useMemo(() => {
    if (!virtualizeRows || processedRows.length <= VIRTUALIZATION_THRESHOLD) {
      return processedRows;
    }
    return processedRows.slice(visibleRange.start, visibleRange.end);
  }, [processedRows, virtualizeRows, visibleRange]);

  // Handle scroll for virtualization with requestAnimationFrame throttling
  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    if (!virtualizeRows || processedRows.length <= VIRTUALIZATION_THRESHOLD) return;

    // Cancel any pending animation frame
    if (scrollRafRef.current !== null) {
      window.cancelAnimationFrame(scrollRafRef.current);
    }

    // Schedule the scroll update for the next frame
    scrollRafRef.current = window.requestAnimationFrame(() => {
      const { scrollTop, clientHeight } = event.currentTarget;
      const itemHeight = actualRowHeight;
      const start = Math.floor(scrollTop / itemHeight);
      const visibleCount = Math.ceil(clientHeight / itemHeight);

      // Symmetric overscan buffers for smooth scrolling
      const startWithBuffer = Math.max(0, start - OVERSCAN_COUNT);
      const endWithBuffer = Math.min(start + visibleCount + OVERSCAN_COUNT, processedRows.length);

      // Only update if the change is significant (>5 items difference) to reduce state updates
      const startDiff = Math.abs(startWithBuffer - visibleRange.start);
      const endDiff = Math.abs(endWithBuffer - visibleRange.end);

      if (startDiff > 5 || endDiff > 5) {
        setVisibleRange({ start: startWithBuffer, end: endWithBuffer });
      }

      scrollRafRef.current = null;
    });
  }, [virtualizeRows, processedRows.length, actualRowHeight, visibleRange.start, visibleRange.end]);

  // Cleanup scroll RAF on unmount
  useEffect(() => {
    return () => {
      if (scrollRafRef.current !== null) {
        window.cancelAnimationFrame(scrollRafRef.current);
      }
    };
  }, []);

  // Render sort icon
  const renderSortIcon = (columnId: string) => {
    const sort = currentSortBy.find(s => s.id === columnId);
    if (!sort || !sort.dir) {
      return <UnfoldMore fontSize="small" sx={{ opacity: 0.5 }} />;
    }
    return sort.dir === 'asc'
      ? <ArrowUpward fontSize="small" />
      : <ArrowDownward fontSize="small" />;
  };

  // Render header cell
  const renderHeaderCell = (column: GridColumn<T>) => {
    const canSort = column.enableSort !== false && (sorting.mode === 'client' || sorting.mode === 'server');
    const sort = currentSortBy.find(s => s.id === column.id);

    const headerContent = column.headerCell ? column.headerCell(column) : column.header;

    return (
      <TableCell
        key={column.id}
        data-slot="header-cell"
        data-sort={sort?.dir || 'none'}
        sx={{
          position: stickyHeader ? 'sticky' : 'static',
          top: 0,
          zIndex: 1,
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.divider}`,
          height: headerHeight,
          minWidth: column.minWidth,
          maxWidth: column.maxWidth,
          width: column.width,
          padding: spacingPx(2), // Base: 8px, scales with density
        }}
        role="columnheader"
        aria-sort={
          !sort || !sort.dir ? 'none' :
            sort.dir === 'asc' ? 'ascending' : 'descending'
        }
      >
        {canSort ? (
          <Button
            onClick={() => handleSort(column.id)}
            sx={{
              justifyContent: 'flex-start',
              textTransform: 'none',
              fontWeight: 500,
              color: 'inherit',
              p: 0,
              minWidth: 0,
              '&:hover': {
                backgroundColor: 'transparent',
                opacity: 0.8,
              },
            }}
            endIcon={renderSortIcon(column.id)}
            aria-label={column.ariaLabel || `Sort by ${column.header}`}
          >
            {headerContent}
          </Button>
        ) : (
          <Typography variant="subtitle2" fontWeight={500}>
            {headerContent}
          </Typography>
        )}
      </TableCell>
    );
  };

  // Render data cell
  const renderDataCell = (row: T, rowIndex: number, column: GridColumn<T>) => {
    const rowId = getRowId(row, rowIndex);
    const value = column.accessor
      ? typeof column.accessor === 'function'
        ? column.accessor(row)
        : row[column.accessor]
      : row[column.id];

    const isEditing = editingCell?.rowId === rowId && editingCell?.colId === column.id;
    const cellContent = column.cell
      ? column.cell({ value, row, rowIndex, col: column })
      : String(value || '');

    return (
      <TableCell
        key={column.id}
        data-slot="cell"
        data-col-id={column.id}
        data-editing={isEditing}
        sx={{
          minWidth: column.minWidth,
          maxWidth: column.maxWidth,
          width: column.width,
          height: actualRowHeight,
          padding: spacingPx(2), // Base: 8px, scales with density
        }}
        role="gridcell"
        tabIndex={-1}
      >
        {isEditing && column.editor ? (
          column.editor({
            value,
            row,
            onChange: () => {
              // Handle cell value change
            },
            commit: () => {
              if (editing.onEditCommit) {
                editing.onEditCommit({
                  rowId,
                  colId: column.id,
                  value,
                  row,
                });
              }
              setEditingCell(null);
            },
            cancel: () => {
              setEditingCell(null);
            },
          })
        ) : (
          cellContent
        )}
      </TableCell>
    );
  };

  // Render row
  const renderRow = (row: T, index: number) => {
    if (!row) return null;

    const rowId = getRowId(row, index);
    // Use Set for O(1) lookup instead of Array.includes O(n)
    const isSelected = selectedRowIdsSet.has(rowId);
    const isExpanded = expandedRowIdsSet.has(rowId);

    return (
      <React.Fragment key={rowId}>
        <TableRow
          data-slot="row"
          data-selected={isSelected}
          data-expanded={isExpanded}
          sx={{
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
            ...(isSelected && {
              backgroundColor: theme.palette.action.selected,
            }),
            height: actualRowHeight,
          }}
          role="row"
          aria-selected={isSelected}
        >
          {selection.mode !== 'none' && (
            <TableCell padding="checkbox">
              <Checkbox
                checked={isSelected}
                onChange={(e) => handleRowSelection(rowId, e.target.checked)}
                inputProps={{
                  'aria-label': `Select row ${index + 1}`,
                }}
              />
            </TableCell>
          )}

          {expansion && (
            <TableCell padding="checkbox">
              <IconButton
                size="small"
                onClick={() => handleRowExpansion(rowId)}
                aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
              >
                {isExpanded ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </TableCell>
          )}

          {visibleColumns.map((column) =>
            renderDataCell(row, index, column)
          )}
        </TableRow>

        {expansion && isExpanded && (
          <TableRow>
            <TableCell colSpan={columns.length + (selection.mode !== 'none' ? 1 : 0) + (expansion ? 1 : 0)}>
              {expansion.render(row, index)}
            </TableCell>
          </TableRow>
        )}
      </React.Fragment>
    );
  };

  // Loading state
  if (loading) {
    return (
      <Box
        data-ui="datagrid"
        data-loading="true"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 200,
        }}
        aria-label={ariaLabel}
        role="grid"
        {...htmlProps}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box
        data-ui="datagrid"
        data-error="true"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 200,
          flexDirection: 'column',
          gap: 2,
        }}
        aria-label={ariaLabel}
        role="grid"
        {...htmlProps}
      >
        <Typography color="error" variant="body1">
          {error}
        </Typography>
      </Box>
    );
  }

  // Empty state
  if (processedRows.length === 0 && !loading) {
    return (
      <Box
        data-ui="datagrid"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 200,
        }}
        aria-label={ariaLabel}
        role="grid"
        {...htmlProps}
      >
        {emptyState || (
          <Typography variant="body1" color="text.secondary">
            No data available
          </Typography>
        )}
      </Box>
    );
  }

  // visibleColumns is already memoized above
  const totalColumns = visibleColumns.length +
    (selection.mode !== 'none' ? 1 : 0) +
    (expansion ? 1 : 0);

  return (
    <Paper
      ref={containerRef}
      data-ui="datagrid"
      data-density={density}
      data-size-mode={sizeMode}
      data-virtual-rows={virtualizeRows}
      data-virtual-cols={virtualizeColumns}
      data-sticky-header={stickyHeader}
      className={className}
      style={style}
      role="grid"
      aria-label={ariaLabel}
      aria-description={ariaDescription}
      aria-rowcount={processedRows.length + 1} // +1 for header
      aria-colcount={totalColumns}
      data-testid={dataTestId}
      sx={{
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
      {...htmlProps}
    >
      <TableContainer
        sx={{
          flex: 1,
          overflow: 'auto',
          position: 'relative',
        }}
        onScroll={handleScroll}
      >
        <Table stickyHeader={stickyHeader}>
          <TableHead data-slot="header">
            <TableRow data-slot="header-row" role="row">
              {selection.mode !== 'none' && (
                <TableCell padding="checkbox" sx={{ position: stickyHeader ? 'sticky' : 'static', top: 0, zIndex: 1, backgroundColor: theme.palette.background.paper }}>
                  {selection.mode === 'multi' && (
                    <Checkbox
                      indeterminate={currentSelectedRowIds.length > 0 && currentSelectedRowIds.length < processedRows.length}
                      checked={processedRows.length > 0 && currentSelectedRowIds.length === processedRows.length}
                      onChange={(e) => {
                        const allRowIds = processedRows.map((row, index) => getRowId(row, index));
                        const newSelected = e.target.checked ? allRowIds : [];
                        if (selection.onChangeSelected) {
                          selection.onChangeSelected(newSelected);
                        } else {
                          setInternalSelectedRowIds(newSelected);
                        }
                      }}
                      inputProps={{
                        'aria-label': 'Select all rows',
                      }}
                    />
                  )}
                </TableCell>
              )}

              {expansion && (
                <TableCell
                  padding="checkbox"
                  sx={{
                    position: stickyHeader ? 'sticky' : 'static',
                    top: 0,
                    zIndex: 1,
                    backgroundColor: theme.palette.background.paper,
                  }}
                />
              )}

              {visibleColumns.map(renderHeaderCell)}
            </TableRow>
          </TableHead>

          <TableBody data-slot="body">
            {/* Top spacer for virtualization to maintain scroll position */}
            {virtualizeRows && visibleRange.start > 0 && processedRows.length > VIRTUALIZATION_THRESHOLD && (
              <TableRow>
                <TableCell
                  colSpan={totalColumns}
                  sx={{
                    height: visibleRange.start * actualRowHeight,
                    border: 'none',
                    p: 0
                  }}
                />
              </TableRow>
            )}

            {visibleRows.map((row, index) =>
              renderRow(row, virtualizeRows && processedRows.length > VIRTUALIZATION_THRESHOLD ? visibleRange.start + index : index)
            )}

            {/* Bottom spacer for virtualization */}
            {virtualizeRows && processedRows.length > visibleRange.end && processedRows.length > VIRTUALIZATION_THRESHOLD && (
              <TableRow>
                <TableCell
                  colSpan={totalColumns}
                  sx={{
                    height: (processedRows.length - visibleRange.end) * actualRowHeight,
                    border: 'none',
                    p: 0
                  }}
                />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

DataGrid.displayName = 'DataGrid';