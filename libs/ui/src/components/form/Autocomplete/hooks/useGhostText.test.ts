/**
 * @vitest-environment jsdom
 */
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useGhostText } from './useGhostText';

describe('useGhostText', () => {
  const getLabel = (item: string) => item;

  describe('ghost text computation', () => {
    it('should return empty string when input is empty', () => {
      const { result } = renderHook(() =>
        useGhostText({
          inputValue: '',
          suggestions: ['Apple', 'Banana', 'Cherry'],
          getLabel,
          showGhostText: true,
          isComposing: false,
        }),
      );

      expect(result.current.ghost).toBe('');
    });

    it('should return empty string when not focused', () => {
      const { result } = renderHook(() =>
        useGhostText({
          inputValue: 'App',
          suggestions: ['Apple', 'Banana', 'Cherry'],
          getLabel,
          showGhostText: true,
          isComposing: false,
        }),
      );

      // isInputFocused is false by default
      expect(result.current.ghost).toBe('');
    });

    it('should return ghost text when focused and matching suggestion exists', () => {
      const { result } = renderHook(() =>
        useGhostText({
          inputValue: 'App',
          suggestions: ['Apple', 'Banana', 'Cherry'],
          getLabel,
          showGhostText: true,
          isComposing: false,
        }),
      );

      // Simulate focus
      act(() => {
        result.current.setIsInputFocused(true);
      });

      expect(result.current.ghost).toBe('le');
    });

    it('should match case-insensitively', () => {
      const { result } = renderHook(() =>
        useGhostText({
          inputValue: 'app',
          suggestions: ['Apple', 'Banana', 'Cherry'],
          getLabel,
          showGhostText: true,
          isComposing: false,
        }),
      );

      act(() => {
        result.current.setIsInputFocused(true);
      });

      // Ghost should be the remaining part from the suggestion "Apple"
      expect(result.current.ghost).toBe('le');
    });

    it('should return empty string when no matching suggestion', () => {
      const { result } = renderHook(() =>
        useGhostText({
          inputValue: 'xyz',
          suggestions: ['Apple', 'Banana', 'Cherry'],
          getLabel,
          showGhostText: true,
          isComposing: false,
        }),
      );

      act(() => {
        result.current.setIsInputFocused(true);
      });

      expect(result.current.ghost).toBe('');
    });

    it('should return empty string when input exactly matches suggestion', () => {
      const { result } = renderHook(() =>
        useGhostText({
          inputValue: 'Apple',
          suggestions: ['Apple', 'Banana', 'Cherry'],
          getLabel,
          showGhostText: true,
          isComposing: false,
        }),
      );

      act(() => {
        result.current.setIsInputFocused(true);
      });

      expect(result.current.ghost).toBe('');
    });

    it('should return empty string when showGhostText is false', () => {
      const { result } = renderHook(() =>
        useGhostText({
          inputValue: 'App',
          suggestions: ['Apple', 'Banana', 'Cherry'],
          getLabel,
          showGhostText: false,
          isComposing: false,
        }),
      );

      act(() => {
        result.current.setIsInputFocused(true);
      });

      expect(result.current.ghost).toBe('');
    });

    it('should return empty string when composing (IME input)', () => {
      const { result } = renderHook(() =>
        useGhostText({
          inputValue: 'App',
          suggestions: ['Apple', 'Banana', 'Cherry'],
          getLabel,
          showGhostText: true,
          isComposing: true,
        }),
      );

      act(() => {
        result.current.setIsInputFocused(true);
      });

      expect(result.current.ghost).toBe('');
    });
  });

  describe('handleTabCompletion', () => {
    it('should return null when no ghost text', () => {
      const { result } = renderHook(() =>
        useGhostText({
          inputValue: 'xyz',
          suggestions: ['Apple', 'Banana', 'Cherry'],
          getLabel,
          showGhostText: true,
          isComposing: false,
        }),
      );

      act(() => {
        result.current.setIsInputFocused(true);
      });

      expect(result.current.handleTabCompletion()).toBeNull();
    });

    it('should return original suggestion label (not concatenated input + ghost)', () => {
      const { result } = renderHook(() =>
        useGhostText({
          inputValue: 'APP', // uppercase input
          suggestions: ['Apple', 'Banana', 'Cherry'], // suggestion has different case
          getLabel,
          showGhostText: true,
          isComposing: false,
        }),
      );

      act(() => {
        result.current.setIsInputFocused(true);
      });

      // Should return "Apple" (original case), NOT "APPle" (concatenated)
      expect(result.current.handleTabCompletion()).toBe('Apple');
    });

    it('should preserve original suggestion case for mixed-case input', () => {
      const { result } = renderHook(() =>
        useGhostText({
          inputValue: 'R2',
          suggestions: ['r2 (Reston)', 'r3 (Richmond)', 'r4 (Norfolk)'],
          getLabel,
          showGhostText: true,
          isComposing: false,
        }),
      );

      act(() => {
        result.current.setIsInputFocused(true);
      });

      // Should return "r2 (Reston)" (original), NOT "R2 (Reston)" (mixed case)
      expect(result.current.handleTabCompletion()).toBe('r2 (Reston)');
    });

    it('should return null when not focused', () => {
      const { result } = renderHook(() =>
        useGhostText({
          inputValue: 'App',
          suggestions: ['Apple', 'Banana', 'Cherry'],
          getLabel,
          showGhostText: true,
          isComposing: false,
        }),
      );

      // Not focused
      expect(result.current.handleTabCompletion()).toBeNull();
    });

    it('should return null when suggestions is empty', () => {
      const { result } = renderHook(() =>
        useGhostText({
          inputValue: 'App',
          suggestions: [],
          getLabel,
          showGhostText: true,
          isComposing: false,
        }),
      );

      act(() => {
        result.current.setIsInputFocused(true);
      });

      expect(result.current.handleTabCompletion()).toBeNull();
    });
  });

  describe('handleArrowRightCompletion', () => {
    it('should return original suggestion label', () => {
      const { result } = renderHook(() =>
        useGhostText({
          inputValue: 'APP',
          suggestions: ['Apple', 'Banana', 'Cherry'],
          getLabel,
          showGhostText: true,
          isComposing: false,
        }),
      );

      act(() => {
        result.current.setIsInputFocused(true);
      });

      expect(result.current.handleArrowRightCompletion()).toBe('Apple');
    });

    it('should return null when no matching suggestion', () => {
      const { result } = renderHook(() =>
        useGhostText({
          inputValue: 'xyz',
          suggestions: ['Apple', 'Banana', 'Cherry'],
          getLabel,
          showGhostText: true,
          isComposing: false,
        }),
      );

      act(() => {
        result.current.setIsInputFocused(true);
      });

      expect(result.current.handleArrowRightCompletion()).toBeNull();
    });
  });

  describe('Tab and ArrowRight completion consistency', () => {
    it('should return same value for both Tab and ArrowRight completion', () => {
      const { result } = renderHook(() =>
        useGhostText({
          inputValue: 'Web',
          suggestions: ['Web Services', 'Web Order Entry (WOE)', 'Workflow'],
          getLabel,
          showGhostText: true,
          isComposing: false,
        }),
      );

      act(() => {
        result.current.setIsInputFocused(true);
      });

      const tabResult = result.current.handleTabCompletion();
      const arrowRightResult = result.current.handleArrowRightCompletion();

      // Both should return the exact same original suggestion
      expect(tabResult).toBe(arrowRightResult);
      expect(tabResult).toBe('Web Services');
    });
  });

  describe('complex getLabel scenarios', () => {
    interface AppData {
      name: string;
      id: string;
    }

    const complexGetLabel = (item: AppData) => item.name;

    it('should work with object suggestions and custom getLabel', () => {
      const suggestions: AppData[] = [
        { name: 'Apple App', id: '1' },
        { name: 'Banana App', id: '2' },
        { name: 'Cherry App', id: '3' },
      ];

      const { result } = renderHook(() =>
        useGhostText({
          inputValue: 'app',
          suggestions,
          getLabel: complexGetLabel,
          showGhostText: true,
          isComposing: false,
        }),
      );

      act(() => {
        result.current.setIsInputFocused(true);
      });

      // Should match "Apple App" and return ghost "le App"
      expect(result.current.ghost).toBe('le App');
      expect(result.current.handleTabCompletion()).toBe('Apple App');
    });
  });
});
