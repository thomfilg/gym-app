import type React from 'react';

export type LazyImageObjectFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
export type LazyImageLoadingState = 'skeleton' | 'spinner' | 'placeholder' | 'none';

export interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * Image source URL
   */
  src: string;

  /**
   * Alternative text for the image (required for accessibility)
   */
  alt: string;

  /**
   * Width of the image (number in pixels or CSS string)
   */
  width?: number | string;

  /**
   * Height of the image (number in pixels or CSS string)
   */
  height?: number | string;

  /**
   * Placeholder image URL to show while loading
   */
  placeholder?: string;

  /**
   * Fallback image URL or component to show on error
   */
  fallback?: string | React.ReactNode;

  /**
   * Loading state type
   * - 'skeleton': Shows a skeleton loader
   * - 'spinner': Shows a loading spinner
   * - 'placeholder': Shows placeholder image
   * - 'none': No loading indicator
   * @default 'skeleton'
   */
  loadingState?: LazyImageLoadingState;

  /**
   * Whether to show a loading spinner overlay
   * @deprecated Use loadingState="spinner" instead
   */
  showSpinner?: boolean;

  /**
   * Object fit CSS property
   * @default 'cover'
   */
  objectFit?: LazyImageObjectFit;

  /**
   * Object position CSS property
   * @default 'center'
   */
  objectPosition?: string;

  /**
   * Border radius (number in pixels or CSS string)
   */
  borderRadius?: number | string;

  /**
   * Whether to enable lazy loading
   * @default true
   */
  lazy?: boolean;

  /**
   * Intersection Observer margin for lazy loading
   * @default '100px'
   */
  rootMargin?: string;

  /**
   * Intersection Observer threshold
   * @default 0
   */
  threshold?: number | number[];

  /**
   * Whether to enable fade-in animation on load
   * @default true
   */
  fadeIn?: boolean;

  /**
   * Duration of fade-in animation in milliseconds
   * @default 300
   */
  fadeInDuration?: number;

  /**
   * Callback when image loads successfully
   */
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;

  /**
   * Callback when image fails to load
   */
  onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;

  /**
   * Callback when image starts loading (becomes visible)
   */
  onLoadStart?: () => void;

  /**
   * Whether to retry loading on error
   * @default false
   */
  retryOnError?: boolean;

  /**
   * Number of retry attempts
   * @default 3
   */
  maxRetries?: number;

  /**
   * Delay between retry attempts in milliseconds
   * @default 1000
   */
  retryDelay?: number;

  /**
   * Whether to decode the image asynchronously
   * @default true
   */
  decoding?: 'async' | 'sync' | 'auto';

  /**
   * Loading priority hint
   * @default 'auto'
   */
  loading?: 'eager' | 'lazy';

  /**
   * Fetch priority for resource loading
   */
  fetchPriority?: 'high' | 'low' | 'auto';

  /**
   * Custom skeleton props (when loadingState is 'skeleton')
   */
  skeletonProps?: {
    animation?: 'pulse' | 'wave' | false;
    variant?: 'rectangular' | 'circular';
    intensity?: 'low' | 'medium' | 'high';
  };

  /**
   * Custom spinner props (when loadingState is 'spinner')
   */
  spinnerProps?: {
    size?: number | string;
    color?: string;
    thickness?: number;
  };

  /**
   * Additional CSS styles
   */
  sx?: React.CSSProperties;

  /**
   * CSS class name
   */
  className?: string;

  /**
   * Test ID for automated testing
   */
  'data-testid'?: string;

  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;

  /**
   * ARIA described by for accessibility
   */
  'aria-describedby'?: string;

  /**
   * Role attribute for accessibility
   */
  role?: string;
}

export interface LazyImageState {
  isLoading: boolean;
  hasError: boolean;
  isVisible: boolean;
  retryCount: number;
  currentSrc: string | null;
}