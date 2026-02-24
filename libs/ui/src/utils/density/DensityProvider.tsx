import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { DensityContext, type DensityContextValue } from './DensityContext';
import { scaleSpacing } from './spacing';
import {
  DEFAULT_DENSITY_MODE,
  DENSITY_MULTIPLIERS,
  DENSITY_STORAGE_KEY,
  isDensityMode,
  type DensityMode,
} from './types';

/**
 * Props for the DensityProvider component
 */
export interface DensityProviderProps {
  /** Child components that will have access to density context */
  children: ReactNode;
  /** Default density mode (defaults to 'normal') */
  defaultMode?: DensityMode;
  /** Whether to persist density preference to localStorage (defaults to false) */
  persist?: boolean;
  /** Controlled density mode - when provided, component becomes controlled */
  mode?: DensityMode;
  /** Callback when density mode changes (for controlled usage) */
  onModeChange?: (mode: DensityMode) => void;
  /** Enable CSS transitions for density changes (defaults to false) */
  enableTransitions?: boolean;
  /** Transition duration in milliseconds (defaults to 200) */
  transitionDuration?: number;
  /** Dispatch CustomEvent on density changes for non-React integrations (defaults to false) */
  dispatchEvents?: boolean;
}

/**
 * Custom event name for density changes
 */
export const DENSITY_CHANGE_EVENT = 'densitychange';

/**
 * Event detail interface for density change events
 */
export interface DensityChangeEventDetail {
  mode: DensityMode;
  multiplier: number;
}

/**
 * Check if we're in a browser environment
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

/**
 * Safely read from localStorage
 */
function getStoredMode(): DensityMode | null {
  if (!isBrowser()) {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(DENSITY_STORAGE_KEY);
    if (isDensityMode(stored)) {
      return stored;
    }
  } catch {
    // localStorage might be blocked or unavailable
  }
  return null;
}

/**
 * Safely write to localStorage
 */
function setStoredMode(mode: DensityMode): void {
  if (!isBrowser()) {
    return;
  }

  try {
    window.localStorage.setItem(DENSITY_STORAGE_KEY, mode);
  } catch {
    // localStorage might be blocked or unavailable
  }
}

/**
 * DensityProvider - Provider component for managing UI density state
 *
 * Wraps child components with density context, providing access to
 * density mode and spacing utilities throughout the component tree.
 *
 * Supports both controlled and uncontrolled usage patterns.
 *
 * @example
 * ```tsx
 * // Uncontrolled with persistence
 * <DensityProvider defaultMode="compact" persist>
 *   <App />
 * </DensityProvider>
 *
 * // Controlled usage
 * function App() {
 *   const [density, setDensity] = useState<DensityMode>('normal');
 *   return (
 *     <DensityProvider mode={density} onModeChange={setDensity}>
 *       <Content />
 *     </DensityProvider>
 *   );
 * }
 * ```
 */
export function DensityProvider({
  children,
  defaultMode = DEFAULT_DENSITY_MODE,
  persist = false,
  mode: controlledMode,
  onModeChange,
  enableTransitions = false,
  transitionDuration: transitionDurationProp = 200,
  dispatchEvents = false,
}: DensityProviderProps) {
  // Calculate effective transition duration
  const transitionDuration = enableTransitions ? transitionDurationProp : 0;
  // Determine if component is controlled
  const isControlled = controlledMode !== undefined;

  // Initialize internal state for uncontrolled mode
  const [internalMode, setInternalMode] = useState<DensityMode>(() => {
    // If controlled, use controlled value
    if (isControlled) {
      return controlledMode;
    }

    // For SSR, start with defaultMode
    // We'll sync from localStorage in useEffect
    return defaultMode;
  });

  // Sync from localStorage on mount (client-side only) for uncontrolled mode
  useEffect(() => {
    if (isControlled || !persist) {
      return;
    }

    const storedMode = getStoredMode();
    if (storedMode) {
      setInternalMode(storedMode);
    }
  }, [isControlled, persist]);

  // Get the actual mode (controlled or internal)
  const mode = isControlled ? controlledMode : internalMode;
  const multiplier = DENSITY_MULTIPLIERS[mode];

  // Dispatch custom event when density changes (for non-React integrations)
  useEffect(() => {
    if (!dispatchEvents || !isBrowser()) {
      return;
    }

    const event = new CustomEvent<DensityChangeEventDetail>(DENSITY_CHANGE_EVENT, {
      detail: { mode, multiplier },
    });
    window.dispatchEvent(event);
  }, [mode, multiplier, dispatchEvents]);

  // Handle mode changes
  const setMode = useCallback(
    (newMode: DensityMode) => {
      if (isControlled) {
        // For controlled mode, just call the callback
        onModeChange?.(newMode);
      } else {
        // For uncontrolled mode, update internal state
        setInternalMode(newMode);

        // Persist to localStorage if enabled
        if (persist) {
          setStoredMode(newMode);
        }
      }
    },
    [isControlled, onModeChange, persist]
  );

  // Create spacing function that uses current multiplier
  const getSpacing = useCallback(
    (baseValue: number): number => {
      return scaleSpacing(baseValue, multiplier);
    },
    [multiplier]
  );

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo<DensityContextValue>(
    () => ({
      mode,
      multiplier,
      setMode,
      getSpacing,
      transitionDuration,
    }),
    [mode, multiplier, setMode, getSpacing, transitionDuration]
  );

  return (
    <DensityContext.Provider value={contextValue}>
      {children}
    </DensityContext.Provider>
  );
}
