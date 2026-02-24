import MuiAutocomplete, {
  type AutocompleteRenderInputParams,
  type AutocompleteRenderOptionState,
} from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';

import { useDensitySpacing } from '../../../utils/density';
import type { AutocompleteOption, AutocompleteProps, SuggestionItemState } from './Autocomplete.types';
import { useFilterOptions } from './hooks/useFilterOptions';
import { useGhostText } from './hooks/useGhostText';

// Constants for timing and sizing
const GHOST_COMPLETION_RESET_DELAY = 50; // ms - time to reset ghost completion flag
const BLUR_FOCUS_TRANSITION_DELAY = 150; // ms - allows click events to fire before blur
const OPTION_HEIGHT_APPROXIMATE = 48; // px - MUI default list item height

// Memoized style object to avoid recreating on each render
const LIST_ITEM_STYLE: React.CSSProperties = {
  padding: '8px 16px',
  cursor: 'pointer',
};

// Ghost text overlay styled components
const InlineSuggestionDisplay = styled('div')({
  position: 'absolute',
  pointerEvents: 'none',
  top: '50%',
  transform: 'translateY(-50%)',
  fontSize: 'inherit',
  fontFamily: 'inherit',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  zIndex: 1,
});

const UserTextTwin = styled('span')({
  visibility: 'hidden',
});

const GhostText = styled('span')(({ theme }) => ({
  color: theme.palette.text.secondary,
  opacity: 0.6,
}));

// ChipContainer for multiple mode
const ChipContainer = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
});

// Styled mark for highlighting - safer than dangerouslySetInnerHTML
const HighlightMark = styled('mark')(({ theme }) => ({
  backgroundColor: theme.palette.action.selected,
  color: 'inherit',
}));

// Default helper functions
const defaultGetKey = <T, >(item: T): string => {
  if (typeof item === 'string') return item;
  if (typeof item === 'object' && item !== null) {
    const obj = item as Record<string, unknown>;
    return String(obj.id ?? obj.key ?? obj.value ?? obj.label ?? obj);
  }
  return String(item);
};

const defaultGetLabel = <T, >(item: T): string => {
  if (typeof item === 'string') return item;
  if (typeof item === 'object' && item !== null) {
    const obj = item as Record<string, unknown>;
    return String(obj.label ?? obj.name ?? obj.text ?? obj);
  }
  return String(item);
};

/**
 * Safe text highlighting without dangerouslySetInnerHTML (prevents XSS)
 * Returns React elements instead of HTML strings
 */
const getHighlightedText = (text: string, highlight: string): React.ReactNode => {
  if (!highlight) return text;

  const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escapedHighlight})`, 'gi'));

  return parts.map((part, index) =>
    part.toLowerCase() === highlight.toLowerCase() ? (
      <HighlightMark key={index}>{part}</HighlightMark>
    ) : (
      part
    ),
  );
};

export const Autocomplete = <T = AutocompleteOption>({
  value,
  onChange,
  suggestions = [],
  getKey = defaultGetKey,
  getLabel = defaultGetLabel,
  getDescription,
  renderSuggestion,
  onSelect,
  allowFreeText = true,
  multiple = false,
  selectedItems = [],
  onSelectedItemsChange,
  renderChipsOutside = false,
  async = false,
  isLoading = false,
  debounceMs = 150,
  minChars = 0,
  showGhostText = true,
  matchMode = 'contains',
  id: customId,
  inputAriaLabel,
  placeholder = 'Type to search...',
  autoFocus = false,
  disabled = false,
  label,
  error = false,
  helperText,
  required = false,
  className,
  inputClassName,
  listClassName,
  itemClassName,
  activeItemClassName,
  chipClassName,
  portal = false,
  maxVisibleItems = 10,
  popperZIndex,
}: AutocompleteProps<T>) => {
  const { spacingPx } = useDensitySpacing();
  const componentId = useId();
  const id = customId || componentId;

  // Density-aware spacing values
  const chipContainerGap = spacingPx(0.5);
  const chipContainerMargin = spacingPx(1);
  const inlineSuggestionLeft = spacingPx(3.5);

  // State
  const [inputValue, setInputValue] = useState(value);
  const [open, setOpen] = useState(false);
  const [composition, setComposition] = useState(false);
  const [justCompletedGhost, setJustCompletedGhost] = useState(false);
  const [userClosedDropdown, setUserClosedDropdown] = useState(false);

  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const blurTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Custom hooks
  const filterOptions = useFilterOptions<T>({
    matchMode,
    getLabel,
    async,
  });

  const {
    ghost,
    isInputFocused,
    setIsInputFocused,
    handleTabCompletion,
    handleArrowRightCompletion,
  } = useGhostText<T>({
    inputValue,
    suggestions,
    getLabel,
    showGhostText,
    isComposing: composition,
  });

  // Debounced onChange with minChars enforcement
  const debouncedOnChange = useCallback(
    (val: string) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        if (val.length === 0 || val.length >= minChars) {
          onChange(val);
        }
      }, debounceMs);
    },
    [onChange, debounceMs, minChars],
  );

  // Sync value prop with input value
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Reset ghost completion flag after a short delay
  useEffect(() => {
    if (justCompletedGhost) {
      const timer = setTimeout(() => {
        setJustCompletedGhost(false);
      }, GHOST_COMPLETION_RESET_DELAY);
      return () => clearTimeout(timer);
    }
  }, [justCompletedGhost]);

  // Clean up timeouts on unmount
  useEffect(
    () => () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
      }
    },
    [],
  );

  // Handle input change
  const handleInputChange = useCallback(
    (_event: React.SyntheticEvent, newInputValue: string, reason: string) => {
      if (reason === 'input') {
        setInputValue(newInputValue);
        debouncedOnChange(newInputValue);
        setUserClosedDropdown(false);
      } else if (reason === 'clear') {
        setInputValue('');
        debouncedOnChange('');
      }
    },
    [debouncedOnChange],
  );

  // Handle value change (selection)
  // Note: When freeSolo is enabled, MUI Autocomplete can pass string values
  // that may be either free text OR actual suggestion values (when T is string)
  const handleChange = useCallback(
    (_event: React.SyntheticEvent, newValue: string | T | (string | T)[] | null) => {
      if (multiple) {
        // Multi-select mode
        // When T is string, we cannot distinguish between "free text" and "suggestion"
        // by type alone. We need to check if the value exists in suggestions or was previously selected.
        const rawItems = (newValue as (string | T)[]) ?? [];

        // Filter items to keep valid values:
        // - When allowFreeText is true, keep all string values (free text entries)
        // - Items that exist in current suggestions
        // - Items that were previously selected (already in selectedItems)
        // - Non-string items (T objects)
        const items = rawItems.filter((item): item is T => {
          if (typeof item === 'string') {
            // When allowFreeText is true, keep all string values (free text entries)
            if (allowFreeText) return true;
            // When allowFreeText is false, only keep if in suggestions or was previously selected
            const inSuggestions = suggestions.some((suggestion) => getKey(suggestion) === item);
            const wasSelected = selectedItems.some((selected) => getKey(selected) === item);
            return inSuggestions || wasSelected;
          }
          // Non-string items are T objects
          return true;
        });

        onSelectedItemsChange?.(items);
        setInputValue('');
        debouncedOnChange('');
        setUserClosedDropdown(false);
        // Call onSelect for the last added item
        if (items.length > selectedItems.length) {
          const lastItem = items[items.length - 1];
          if (lastItem) onSelect?.(lastItem);
        }
      } else {
        // Single select mode - handle both string and T values
        if (typeof newValue === 'string') {
          // Free text committed (Enter pressed) - show as chip
          if (newValue.trim()) {
            setInputValue('');
            debouncedOnChange('');
            onSelectedItemsChange?.([newValue as unknown as T]);
            onSelect?.(newValue as unknown as T);
          }
        } else {
          const item = newValue as T | null;
          if (item) {
            // Clear input and show chip instead
            setInputValue('');
            debouncedOnChange('');
            onSelectedItemsChange?.([item]);
            onSelect?.(item);
          }
        }
      }
    },
    [multiple, selectedItems, onSelectedItemsChange, debouncedOnChange, onSelect, suggestions, getKey, allowFreeText],
  );

  // Custom keyboard handler for ghost text completion
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (composition) return;

      switch (event.key) {
        case 'Tab': {
          const completedValue = handleTabCompletion();
          if (completedValue && ghost) {
            event.preventDefault();
            setJustCompletedGhost(true);
            setInputValue(completedValue);
            debouncedOnChange(completedValue);
            setOpen(false);
          }
          break;
        }

        case 'ArrowRight': {
          const completedValue = handleArrowRightCompletion();
          if (completedValue && ghost) {
            event.preventDefault();
            setJustCompletedGhost(true);
            setInputValue(completedValue);
            debouncedOnChange(completedValue);
            setOpen(false);
          }
          break;
        }

        case 'Escape': {
          if (open) {
            setOpen(false);
            setUserClosedDropdown(true);
          }
          break;
        }
      }
    },
    [composition, handleTabCompletion, handleArrowRightCompletion, ghost, debouncedOnChange, open],
  );

  // Handle open state
  const handleOpen = useCallback(() => {
    // Check both explicit disabled and auto-disabled (single-select with selection)
    const autoDisabled = !multiple && selectedItems.length > 0;
    if (!disabled && !autoDisabled && !userClosedDropdown) {
      setOpen(true);
    }
  }, [disabled, multiple, selectedItems.length, userClosedDropdown]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  // Handle focus/blur with proper cleanup
  const handleFocus = useCallback(() => {
    // Clear any pending blur timeout
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = undefined;
    }
    setIsInputFocused(true);
    setUserClosedDropdown(false);
  }, [setIsInputFocused]);

  const handleBlur = useCallback(() => {
    // Clear any existing blur timeout
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
    }
    blurTimeoutRef.current = setTimeout(() => {
      setIsInputFocused(false);
    }, BLUR_FOCUS_TRANSITION_DELAY);
  }, [setIsInputFocused]);

  // Remove selected item (chip)
  const removeSelectedItem = useCallback(
    (item: T) => {
      const newItems = selectedItems.filter((selected) => getKey(selected) !== getKey(item));
      onSelectedItemsChange?.(newItems);
      inputRef.current?.focus();
    },
    [selectedItems, getKey, onSelectedItemsChange],
  );

  // Memoize renderOption to avoid recreation on every render (performance)
  const renderOption = useCallback(
    (
      props: React.HTMLAttributes<HTMLLIElement> & { key: string },
      option: T,
      state: AutocompleteRenderOptionState,
    ) => {
      const { key, ...otherProps } = props;
      const suggestionState: SuggestionItemState = {
        active: state.selected,
        query: state.inputValue,
      };

      // Preserve MUI's className (includes Mui-focused for keyboard navigation)
      const baseClassName = otherProps.className || '';
      const customClassName = `${baseClassName} ${itemClassName || ''} ${state.selected ? activeItemClassName || '' : ''}`.trim();

      if (renderSuggestion) {
        return (
          <li
            key={key}
            {...otherProps}
            style={{ ...LIST_ITEM_STYLE, ...otherProps.style }}
            className={customClassName}
          >
            {renderSuggestion(option, suggestionState)}
          </li>
        );
      }

      // Default rendering with safe highlight (no XSS vulnerability)
      const labelText = getLabel(option);
      const description = getDescription?.(option);

      // Use safe React-based highlighting instead of dangerouslySetInnerHTML
      const highlightedLabel =
        state.inputValue && matchMode !== 'fuzzy'
          ? getHighlightedText(labelText, state.inputValue)
          : labelText;

      return (
        <li
          key={key}
          {...otherProps}
          style={{ ...LIST_ITEM_STYLE, ...otherProps.style }}
          className={customClassName}
        >
          <ListItemText primary={highlightedLabel} secondary={description} />
        </li>
      );
    },
    [renderSuggestion, getLabel, getDescription, matchMode, itemClassName, activeItemClassName],
  );

  // Render input with ghost text overlay and inline chips
  const renderInput = useCallback(
    (params: AutocompleteRenderInputParams) => {
      // Show chips inside the field unless renderChipsOutside is true
      const showInlineChips = !renderChipsOutside && selectedItems.length > 0;

      return (
        <Box sx={{ position: 'relative' }}>
          {/* Ghost text overlay */}
          {ghost && showGhostText && isInputFocused && (
            <InlineSuggestionDisplay style={{ left: inlineSuggestionLeft }}>
              <UserTextTwin>{inputValue}</UserTextTwin>
              <GhostText>{ghost}</GhostText>
            </InlineSuggestionDisplay>
          )}

          <TextField
            {...params}
            inputRef={inputRef}
            placeholder={placeholder}
            error={error}
            className={inputClassName}
            autoFocus={autoFocus}
            onCompositionStart={() => setComposition(true)}
            onCompositionEnd={() => setComposition(false)}
            slotProps={{
              input: {
                ...params.InputProps,
                startAdornment: showInlineChips ? (
                  <Box sx={{ display: 'flex', gap: 0.5, mr: 0.5 }}>
                    {selectedItems.map((item, index) => (
                      <Chip
                        key={`${getKey(item)}-${index}`}
                        label={getLabel(item)}
                        onDelete={() => removeSelectedItem(item)}
                        size="small"
                        className={chipClassName}
                        data-testid={`selected-chip-${index}`}
                      />
                    ))}
                  </Box>
                ) : params.InputProps.startAdornment,
                endAdornment: (
                  <>
                    {isLoading ? <CircularProgress size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              },
              htmlInput: {
                ...params.inputProps,
                'aria-label': inputAriaLabel,
              },
            }}
          />
        </Box>
      );
    },
    [
      renderChipsOutside,
      selectedItems,
      getKey,
      getLabel,
      removeSelectedItem,
      chipClassName,
      ghost,
      showGhostText,
      isInputFocused,
      inlineSuggestionLeft,
      inputValue,
      placeholder,
      error,
      inputClassName,
      autoFocus,
      isLoading,
      inputAriaLabel,
    ],
  );

  // Calculate max height based on maxVisibleItems
  const listboxMaxHeight = useMemo(
    () => maxVisibleItems * OPTION_HEIGHT_APPROXIMATE,
    [maxVisibleItems],
  );

  // Auto-disable in single-select mode when something is already selected
  const isDisabled = disabled || (!multiple && selectedItems.length > 0);

  // Memoize no options message
  const noOptionsMessage = useMemo(() => {
    if (isLoading) {
      return (
        <Box display="flex" alignItems="center" gap={1} p={1}>
          <CircularProgress size={16} />
          <Typography variant="body2" color="text.secondary">
            Loading...
          </Typography>
        </Box>
      );
    }
    return (
      <Typography variant="body2" color="text.secondary" sx={{ p: 1 }}>
        No results found
      </Typography>
    );
  }, [isLoading]);

  return (
    <FormControl
      fullWidth
      error={error}
      disabled={isDisabled}
      required={required}
      className={className}
      data-testid="autocomplete-container"
    >
      {/* Label */}
      {label && (
        <InputLabel
          shrink
          htmlFor={id}
          sx={{
            position: 'relative',
            transform: 'none',
            mb: 0.5,
            fontSize: '0.875rem',
            fontWeight: 500,
            color: error ? 'error.main' : 'text.primary',
          }}
        >
          {label}
          {required && <span style={{ color: 'inherit', marginLeft: 2 }}>*</span>}
        </InputLabel>
      )}

      {/* Selected items (chips) - shown above input when renderChipsOutside is true */}
      {renderChipsOutside && selectedItems.length > 0 && (
        <ChipContainer
          data-testid="selected-items-container"
          sx={{ gap: chipContainerGap, marginBottom: chipContainerMargin }}
        >
          {selectedItems.map((item, index) => (
            <Chip
              key={`${getKey(item)}-${index}`}
              label={getLabel(item)}
              onDelete={() => removeSelectedItem(item)}
              size="small"
              className={chipClassName}
              data-testid={`selected-chip-${index}`}
            />
          ))}
        </ChipContainer>
      )}

      {/* MUI Autocomplete */}
      <MuiAutocomplete
        id={id}
        options={suggestions}
        value={multiple ? selectedItems : null}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={isDisabled}
        freeSolo={allowFreeText}
        multiple={multiple}
        loading={isLoading}
        filterOptions={filterOptions}
        getOptionLabel={(option: string | T) => typeof option === 'string' ? option : getLabel(option)}
        isOptionEqualToValue={(option: T, val: T) => getKey(option) === getKey(val)}
        renderInput={renderInput}
        renderOption={renderOption}
        noOptionsText={noOptionsMessage}
        disablePortal={!portal}
        clearOnBlur={false}
        clearOnEscape={false}
        autoHighlight
        openOnFocus={false}
        // Hide the built-in tags for multiple mode (we render chips above)
        renderTags={() => null}
        ListboxProps={{
          className: listClassName,
          style: { maxHeight: listboxMaxHeight },
        }}
        componentsProps={{
          paper: {
            // @ts-expect-error TS2322: data-testid is valid HTML but not in MUI PaperProps
            'data-testid': 'suggestions-dropdown',
          },
          popper: {
            placement: 'bottom-start',
            ...(popperZIndex !== undefined && { style: { zIndex: popperZIndex } }),
          },
        }}
      />

      {/* Helper text */}
      {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </FormControl>
  );
};

Autocomplete.displayName = 'Autocomplete';

export default Autocomplete;
