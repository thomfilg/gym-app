import type { ComponentProps } from 'react';

/**
 * Status of an individual workflow step
 */
export type WorkflowStepStatus = 'pending' | 'current' | 'completed' | 'error';

/**
 * Visual variant of the workflow step component
 */
export type WorkflowStepVariant = 'default' | 'minimal' | 'outlined' | 'filled';

/**
 * Layout orientation of the workflow steps
 */
export type WorkflowStepOrientation = 'horizontal' | 'vertical';

/**
 * Color theme for the workflow step component
 */
export type WorkflowStepColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';

/**
 * Size variant for step indicators
 */
export type WorkflowStepSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Individual step item configuration
 */
export interface WorkflowStepItem {
  /** The title of the step */
  title: string;
  /** Optional description text for the step */
  description?: string;
  /** Current status of the step */
  status: WorkflowStepStatus;
  /** Optional custom icon for the step */
  icon?: React.ReactNode;
  /** Whether this step is disabled */
  disabled?: boolean;
  /** Optional data attribute for testing */
  'data-testid'?: string;
}

/**
 * Props for the WorkflowStep component
 */
export interface WorkflowStepProps extends Omit<ComponentProps<'div'>, 'onError'> {
  /** Array of step objects defining the workflow */
  steps: WorkflowStepItem[];
  /** Index of the currently active step (0-based) */
  currentStep?: number;
  /** Visual style variant */
  variant?: WorkflowStepVariant;
  /** Layout orientation */
  orientation?: WorkflowStepOrientation;
  /** Theme color */
  color?: WorkflowStepColor;
  /** Size of step indicators */
  size?: WorkflowStepSize;
  /** Whether to show progress bar between steps */
  showProgress?: boolean;
  /** Enable transition animations */
  animated?: boolean;
  /** Allow clicking on steps to navigate */
  interactive?: boolean;
  /** Show step numbers in indicators */
  showNumbers?: boolean;
  /** Show custom icons for each step */
  showIcons?: boolean;
  /** Custom icon for completed steps (overrides step-specific icons) */
  completedIcon?: React.ReactNode;
  /** Custom icon for error steps (overrides step-specific icons) */
  errorIcon?: React.ReactNode;
  /** Callback when a step is clicked (only called if interactive=true) */
  onStepClick?: (stepIndex: number, step: WorkflowStepItem) => void;
  /** Disable all interactions */
  disabled?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Data attribute for testing */
  'data-testid'?: string;
}

/**
 * Props for individual step indicator
 */
export interface StepIndicatorProps {
  step: WorkflowStepItem;
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  isError: boolean;
  variant: WorkflowStepVariant;
  color: WorkflowStepColor;
  size: WorkflowStepSize;
  showNumbers: boolean;
  showIcons: boolean;
  completedIcon?: React.ReactNode;
  errorIcon?: React.ReactNode;
  interactive: boolean;
  animated: boolean;
  disabled: boolean;
  onClick?: (index: number, step: WorkflowStepItem) => void;
  'data-testid'?: string;
}

/**
 * Props for step connector/progress line
 */
export interface StepConnectorProps {
  isCompleted: boolean;
  orientation: WorkflowStepOrientation;
  variant: WorkflowStepVariant;
  color: WorkflowStepColor;
  'data-testid'?: string;
}

/**
 * Props for step content (title and description)
 */
export interface StepContentProps {
  step: WorkflowStepItem;
  index: number;
  orientation: WorkflowStepOrientation;
  interactive: boolean;
  disabled: boolean;
  onClick?: (index: number, step: WorkflowStepItem) => void;
  'data-testid'?: string;
}