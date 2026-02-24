import { ErrorState } from '../../data-display/ErrorState';
import type { ComponentType, ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';

/**
 * Props for error boundary fallback components
 */
export interface ErrorBoundaryFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

/**
 * Default error fallback component
 */
function DefaultErrorFallback({ error, resetErrorBoundary }: ErrorBoundaryFallbackProps) {
  return (
    <ErrorState
      title="Something went wrong"
      message={error.message || 'An unexpected error occurred'}
      onRetry={resetErrorBoundary}
    />
  );
}

/**
 * Props for the ErrorBoundary component
 */
interface ErrorBoundaryProps {
  children: ReactNode;
  FallbackComponent?: ComponentType<ErrorBoundaryFallbackProps>;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Generic ErrorBoundary component
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.props.onError?.(error, errorInfo);
  }

  resetErrorBoundary = (): void => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.FallbackComponent || DefaultErrorFallback;
      return (
        <FallbackComponent
          error={this.state.error}
          resetErrorBoundary={this.resetErrorBoundary}
        />
      );
    }
    return this.props.children;
  }
}

/**
 * Options for the withErrorBoundary HOC
 */
export interface WithErrorBoundaryOptions {
  /** Custom fallback component to render when an error occurs */
  FallbackComponent?: ComponentType<ErrorBoundaryFallbackProps>;
  /** Callback when an error is caught */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  /** Callback when the error boundary is reset */
  onReset?: () => void;
}

/**
 * Higher-Order Component that wraps a component with an error boundary
 *
 * @example
 * // With default error fallback
 * const SafeComponent = withErrorBoundary(MyComponent);
 *
 * @example
 * // With custom fallback component
 * const SafeComponent = withErrorBoundary(MyComponent, {
 *   FallbackComponent: CustomErrorFallback
 * });
 *
 * @example
 * // With error callback
 * const SafeComponent = withErrorBoundary(MyComponent, {
 *   onError: (error, info) => logErrorToService(error, info)
 * });
 */
export function withErrorBoundary<P extends object>(
  WrappedComponent: ComponentType<P>,
  options: WithErrorBoundaryOptions = {},
): ComponentType<P> {
  const { FallbackComponent, onError, onReset } = options;

  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  function ComponentWithErrorBoundary(props: P) {
    return (
      <ErrorBoundary FallbackComponent={FallbackComponent} onError={onError} onReset={onReset}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  }

  ComponentWithErrorBoundary.displayName = `withErrorBoundary(${displayName})`;

  return ComponentWithErrorBoundary;
}

// Export the ErrorBoundary class for direct use if needed
export { ErrorBoundary };
