import type React from 'react';

/**
 * Options for creating a render row function
 */
export interface CreateRenderRowOptions<
  TRow,
  TExtraProps extends Record<string, unknown> = Record<string, unknown>,
> {
  /**
   * The React component to render for each row.
   * Must accept at minimum: { row, index, isSelected }
   */
  RowComponent: React.ComponentType<
  { row: TRow; index: number; isSelected: boolean } & TExtraProps
  >;

  /**
   * Function to extract a unique key from the row data
   */
  getKey: (row: TRow, index: number) => string | number;

  /**
   * Optional extra props to pass to every row component instance
   */
  extraProps?: TExtraProps;
}

/**
 * Creates a renderRow function for use with the Table component.
 *
 * This utility simplifies the common pattern of rendering custom row components
 * by handling the type casting and key extraction automatically.
 *
 * Note: If you create this in render and need stable identity (e.g., for
 * memoization or effect dependencies), wrap the call in `useMemo`.
 *
 * @example
 * ```tsx
 * // Basic usage (creates new function each render)
 * const renderRow = createRenderRow({
 *   RowComponent: ActivityRow,
 *   getKey: (row) => row.id,
 *   extraProps: { onEdit: handleEdit },
 * });
 *
 * // With stable identity
 * const renderRow = useMemo(
 *   () => createRenderRow({ RowComponent: ActivityRow, getKey, extraProps }),
 *   [getKey, extraProps],
 * );
 *
 * <Table data={activities} renderRow={renderRow} />
 * ```
 */
export function createRenderRow<
  TRow,
  TExtraProps extends Record<string, unknown> = Record<string, unknown>,
>(
  options: CreateRenderRowOptions<TRow, TExtraProps>,
): (rowData: unknown, index: number, isSelected: boolean) => React.ReactNode {
  const { RowComponent, getKey, extraProps } = options;
  const mergedExtraProps = (extraProps ?? {}) as TExtraProps;

  return (rowData, index, isSelected) => {
    const row = rowData as TRow;
    const key = getKey(row, index);

    return (
      <RowComponent
        key={key}
        row={row}
        index={index}
        isSelected={isSelected}
        {...mergedExtraProps}
      />
    );
  };
}
