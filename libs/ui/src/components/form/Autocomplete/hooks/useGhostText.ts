import { useCallback, useMemo, useState } from 'react';

// Limit ghost text search to prevent performance issues with large datasets
const GHOST_TEXT_SEARCH_LIMIT = 100;

interface UseGhostTextParams<T> {
  inputValue: string;
  suggestions: T[];
  getLabel: (item: T) => string;
  showGhostText: boolean;
  isComposing: boolean;
}

interface UseGhostTextReturn {
  ghost: string;
  isInputFocused: boolean;
  setIsInputFocused: (focused: boolean) => void;
  handleTabCompletion: () => string | null;
  handleArrowRightCompletion: () => string | null;
}

/**
 * Hook to manage ghost text (inline completion preview) for autocomplete
 * Computes ghost text from first matching suggestion and handles completion
 *
 * Performance: Only searches first 100 suggestions to avoid lag with large datasets
 */
export function useGhostText<T>({
  inputValue,
  suggestions,
  getLabel,
  showGhostText,
  isComposing,
}: UseGhostTextParams<T>): UseGhostTextReturn {
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Memoize the search subset to avoid recreating on every render
  const searchableSuggestions = useMemo(
    () => suggestions.slice(0, GHOST_TEXT_SEARCH_LIMIT),
    [suggestions],
  );

  // Compute ghost text from first matching suggestion
  // Only searches when there's actual input to improve performance
  const ghost = useMemo(() => {
    // Early return for performance - don't search if conditions not met
    if (!inputValue || !isInputFocused || isComposing || !showGhostText) {
      return '';
    }

    const inputLower = inputValue.toLowerCase();

    // Use for loop instead of find() for early exit optimization
    for (let i = 0; i < searchableSuggestions.length; i++) {
      const suggestion = searchableSuggestions[i];
      if (suggestion) {
        const label = getLabel(suggestion);
        const labelLower = label.toLowerCase();
        if (labelLower.startsWith(inputLower) && labelLower !== inputLower) {
          return label.slice(inputValue.length);
        }
      }
    }

    return '';
  }, [inputValue, searchableSuggestions, getLabel, isInputFocused, isComposing, showGhostText]);

  // Tab completion: use original suggestion case to ensure exact match
  const handleTabCompletion = useCallback((): string | null => {
    if (!ghost || !isInputFocused || suggestions.length === 0) {
      return null;
    }

    // Find the matching suggestion and return its original label
    const inputLower = inputValue.toLowerCase();
    for (let i = 0; i < searchableSuggestions.length; i++) {
      const suggestion = searchableSuggestions[i];
      if (suggestion) {
        const label = getLabel(suggestion);
        const labelLower = label.toLowerCase();
        if (labelLower.startsWith(inputLower) && labelLower !== inputLower) {
          return label;
        }
      }
    }

    return null;
  }, [ghost, isInputFocused, suggestions.length, inputValue, searchableSuggestions, getLabel]);

  // ArrowRight completion: use original suggestion case
  const handleArrowRightCompletion = useCallback((): string | null => {
    if (!ghost || !isInputFocused || suggestions.length === 0) {
      return null;
    }

    const inputLower = inputValue.toLowerCase();

    // Use for loop for early exit
    for (let i = 0; i < searchableSuggestions.length; i++) {
      const suggestion = searchableSuggestions[i];
      if (suggestion) {
        const label = getLabel(suggestion);
        const labelLower = label.toLowerCase();
        if (labelLower.startsWith(inputLower) && labelLower !== inputLower) {
          return label;
        }
      }
    }

    return null;
  }, [ghost, isInputFocused, suggestions.length, searchableSuggestions, inputValue, getLabel]);

  return {
    ghost,
    isInputFocused,
    setIsInputFocused,
    handleTabCompletion,
    handleArrowRightCompletion,
  };
}
