import { createFilterOptions } from '@mui/material/Autocomplete';
import type { FilterOptionsState } from '@mui/material/useAutocomplete';
import { useMemo } from 'react';

export type MatchMode = 'startsWith' | 'contains' | 'fuzzy';

// Limit results to prevent rendering too many items (performance)
const MAX_FILTER_RESULTS = 100;

interface UseFilterOptionsParams<T> {
  matchMode: MatchMode;
  getLabel: (item: T) => string;
  async?: boolean;
}

/**
 * Hook to create filter options function for MUI Autocomplete
 * Supports startsWith, contains, and fuzzy matching modes
 * Returns identity function when async=true (skip local filtering)
 *
 * Performance: Limits results to 100 items to prevent rendering lag
 */
export function useFilterOptions<T>({
  matchMode,
  getLabel,
  async = false,
}: UseFilterOptionsParams<T>): (options: T[], state: FilterOptionsState<T>) => T[] {
  return useMemo(() => {
    // In async mode, skip local filtering - let the server handle it
    // Still limit results for rendering performance
    if (async) {
      return (options: T[]) => options.slice(0, MAX_FILTER_RESULTS);
    }

    // For startsWith, use MUI's createFilterOptions with result limit
    if (matchMode === 'startsWith') {
      const muiFilter = createFilterOptions<T>({
        matchFrom: 'start',
        stringify: getLabel,
        limit: MAX_FILTER_RESULTS,
      });
      return muiFilter;
    }

    // For contains, use MUI's createFilterOptions with result limit
    if (matchMode === 'contains') {
      const muiFilter = createFilterOptions<T>({
        matchFrom: 'any',
        stringify: getLabel,
        limit: MAX_FILTER_RESULTS,
      });
      return muiFilter;
    }

    // Fuzzy matching - custom implementation with early exit
    // All characters from query must be present in order in the label
    return (options: T[], state: FilterOptionsState<T>): T[] => {
      const query = state.inputValue.toLowerCase();

      if (!query) {
        return options.slice(0, MAX_FILTER_RESULTS);
      }

      const results: T[] = [];

      // Use for loop with early exit when we have enough results
      for (let i = 0; i < options.length && results.length < MAX_FILTER_RESULTS; i++) {
        const item = options[i];
        if (item) {
          const label = getLabel(item).toLowerCase();
          let labelIndex = 0;
          let matches = true;

          for (let queryIndex = 0; queryIndex < query.length; queryIndex++) {
            const char = query[queryIndex];
            if (char !== undefined) {
              labelIndex = label.indexOf(char, labelIndex);
              if (labelIndex === -1) {
                matches = false;
                break;
              }
              labelIndex++;
            }
          }

          if (matches) {
            results.push(item);
          }
        }
      }

      return results;
    };
  }, [matchMode, getLabel, async]);
}
