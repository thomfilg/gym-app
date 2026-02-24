import type { ReactNode } from 'react';

export interface Step {
  id: string;
  label: string;
  description?: string;
  optional?: boolean;
  disabled?: boolean;
}

export interface ConnectorState {
  completed: boolean;
  active: boolean;
}

export interface StepperProps {
  /**
   * Array of step configurations defining the stepper flow
   */
  steps: Step[];

  /**
   * ID of the currently active step
   */
  activeId: string;

  /**
   * Set of step IDs that have been completed
   */
  completed?: Set<string>;

  /**
   * Display orientation of the stepper
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * Navigation variant controlling step access
   * - 'linear': Users can only progress to next step after completing current
   * - 'non-linear': Users can jump to any enabled step
   * @default 'linear'
   */
  variant?: 'linear' | 'non-linear';

  /**
   * Callback fired when a step is clicked or navigated to
   */
  onStepChange?: (id: string) => void;

  /**
   * Whether steps are clickable for navigation
   * @default false for linear, true for non-linear
   */
  clickable?: boolean;

  /**
   * Custom connector renderer between steps
   */
  renderConnector?: (
    from: Step,
    to: Step,
    state: ConnectorState,
  ) => ReactNode;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Test identifier
   */
  'data-testid'?: string;
}

export interface StepItemProps {
  step: Step;
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  isLast: boolean;
  orientation: 'horizontal' | 'vertical';
  variant: 'linear' | 'non-linear';
  clickable: boolean;
  onStepClick?: (id: string) => void;
  renderConnector?: StepperProps['renderConnector'];
  nextStep?: Step;
}