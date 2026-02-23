import Box from '@mui/material/Box';
import React from 'react';

import { EmptyState } from '../EmptyState/EmptyState';
import { ErrorState } from '../ErrorState/ErrorState';
import { LoadingState } from '../LoadingState/LoadingState';

import type { AsyncStateContainerProps } from './AsyncStateContainer.types';

/**
 * AsyncStateContainer - A composition-based wrapper for handling async data states
 *
 * Priority order: loading > error > empty > children
 *
 * @example
 * // With component props (composition pattern)
 * <AsyncStateContainer
 *   isLoading={isLoading}
 *   error={error}
 *   isEmpty={data.length === 0}
 *   loadingComponent={<LoadingState variant="skeleton" />}
 *   errorComponent={<ErrorState message={error} onRetry={refetch} />}
 *   emptyComponent={<EmptyState title="No items" onCreate={handleCreate} />}
 * >
 *   <DataGrid data={data} />
 * </AsyncStateContainer>
 *
 * @example
 * // With render props for more control
 * <AsyncStateContainer
 *   isLoading={isLoading}
 *   error={error}
 *   isEmpty={data.length === 0}
 *   renderLoading={() => <CustomLoader />}
 *   renderError={(error) => <CustomError error={error} />}
 *   renderEmpty={() => <CustomEmpty />}
 * >
 *   <DataGrid data={data} />
 * </AsyncStateContainer>
 */
export const AsyncStateContainer: React.FC<AsyncStateContainerProps> = React.memo(
  ({
    isLoading = false,
    error,
    isEmpty = false,
    children,
    loadingComponent,
    renderLoading,
    errorComponent,
    renderError,
    emptyComponent,
    renderEmpty,
    className,
    dataTestId,
  }) => {
    // Helper to extract error message from various error types
    const getErrorMessage = (): string => {
      if (!error) return '';
      if (typeof error === 'string') return error;
      if (error instanceof Error) return error.message;
      return 'An unexpected error occurred';
    };

    // Priority: loading > error > empty > children
    if (isLoading) {
      return (
        <Box
          className={className}
          data-testid={dataTestId || 'async-state-container'}
          data-state="loading"
        >
          {loadingComponent || renderLoading?.() || <LoadingState />}
        </Box>
      );
    }

    if (error) {
      const errorMessage = getErrorMessage();
      return (
        <Box
          className={className}
          data-testid={dataTestId || 'async-state-container'}
          data-state="error"
        >
          {errorComponent || renderError?.(errorMessage) || <ErrorState message={errorMessage} />}
        </Box>
      );
    }

    if (isEmpty) {
      return (
        <Box
          className={className}
          data-testid={dataTestId || 'async-state-container'}
          data-state="empty"
        >
          {emptyComponent || renderEmpty?.() || <EmptyState title="No data available" />}
        </Box>
      );
    }

    return (
      <Box
        className={className}
        data-testid={dataTestId || 'async-state-container'}
        data-state="success"
      >
        {children}
      </Box>
    );
  },
);

AsyncStateContainer.displayName = 'AsyncStateContainer';

export default AsyncStateContainer;
