import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import React, { forwardRef, useCallback, useMemo } from 'react';

import type {
  StepConnectorProps,
  StepContentProps,
  StepIndicatorProps,
  WorkflowStepItem,
  WorkflowStepProps,
} from './WorkflowStep.types';

// Styled Components
const StepContainer = styled(Box, {
  shouldForwardProp: (prop) => !['orientation', 'variant'].includes(prop as string),
})<{
  orientation: WorkflowStepProps['orientation'];
  variant: WorkflowStepProps['variant'];
}>(({ theme, orientation, variant }) => ({
  display: 'flex',
  flexDirection: orientation === 'vertical' ? 'column' : 'row',
  alignItems: orientation === 'vertical' ? 'flex-start' : 'center',
  gap: orientation === 'vertical' ? theme.spacing(2) : theme.spacing(1),
  width: '100%',
  position: 'relative',

  // Variant-specific styles
  ...(variant === 'minimal' && {
    gap: orientation === 'vertical' ? theme.spacing(1) : theme.spacing(0.5),
  }),
}));

const StepItem = styled(Box, {
  shouldForwardProp: (prop) => !['orientation', 'isLast'].includes(prop as string),
})<{
  orientation: WorkflowStepProps['orientation'];
  isLast: boolean;
}>(({ orientation, isLast }) => ({
  display: 'flex',
  flexDirection: orientation === 'vertical' ? 'column' : 'row',
  alignItems: orientation === 'vertical' ? 'flex-start' : 'center',
  flex: orientation === 'horizontal' && !isLast ? 1 : 'none',
  position: 'relative',
  minWidth: 0, // Allow content to shrink
}));

const StepIndicator = styled(Box, {
  shouldForwardProp: (prop) => !['size', 'variant', 'color', 'isActive', 'isCompleted', 'isError', 'interactive', 'disabled'].includes(prop as string),
})<{
  size: WorkflowStepProps['size'];
  variant: WorkflowStepProps['variant'];
  color: WorkflowStepProps['color'];
  isActive: boolean;
  isCompleted: boolean;
  isError: boolean;
  interactive: boolean;
  animated: boolean;
  disabled: boolean;
}>(({ theme, size, variant, color, isActive, isCompleted, isError, interactive, animated, disabled }) => {
  const sizeMap = {
    xs: 20,
    sm: 24,
    md: 32,
    lg: 40,
    xl: 48,
  };

  const indicatorSize = sizeMap[size || 'md'];
  const colorKey = color || 'primary';
  const colorValue = colorKey === 'neutral'
    ? { main: theme.palette.grey[600], contrastText: theme.palette.getContrastText(theme.palette.grey[600]) }
    : theme.palette[colorKey as 'primary' | 'secondary' | 'success' | 'warning' | 'error'];

  let backgroundColor = theme.palette.grey[300];
  let borderColor = theme.palette.grey[300];
  let textColor = theme.palette.text.secondary;

  if (isError) {
    backgroundColor = theme.palette.error.main;
    borderColor = theme.palette.error.main;
    textColor = theme.palette.error.contrastText;
  } else if (isCompleted) {
    backgroundColor = colorValue.main;
    borderColor = colorValue.main;
    textColor = colorValue.contrastText;
  } else if (isActive) {
    backgroundColor = variant === 'filled' ? colorValue.main : theme.palette.background.paper;
    borderColor = colorValue.main;
    textColor = variant === 'filled' ? colorValue.contrastText : colorValue.main;
  }

  return {
    width: indicatorSize,
    height: indicatorSize,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: theme.typography.caption.fontSize,
    fontWeight: theme.typography.fontWeightMedium,
    cursor: interactive && !disabled ? 'pointer' : 'default',
    transition: animated ? theme.transitions.create(['background-color', 'border-color', 'transform'], {
      duration: theme.transitions.duration.short,
    }) : 'none',
    flexShrink: 0,

    // Variant-specific styles
    ...(variant === 'outlined' && {
      border: `2px solid ${borderColor}`,
      backgroundColor: theme.palette.background.paper,
    }),
    ...(variant === 'filled' && {
      backgroundColor,
      color: textColor,
    }),
    ...(variant === 'minimal' && {
      backgroundColor,
      color: textColor,
      border: 'none',
    }),
    ...(variant === 'default' && {
      backgroundColor,
      color: textColor,
      border: `1px solid ${borderColor}`,
    }),

    // Interactive states
    ...(interactive && !disabled && {
      '&:hover': {
        transform: 'scale(1.1)',
        boxShadow: theme.shadows[2],
      },
      '&:focus-visible': {
        outline: `2px solid ${colorValue.main}`,
        outlineOffset: '2px',
      },
    }),

    // Disabled state
    ...(disabled && {
      opacity: 0.5,
      cursor: 'not-allowed',
    }),
  };
});

const StepContent = styled(Box, {
  shouldForwardProp: (prop) => !['orientation', 'interactive', 'disabled'].includes(prop as string),
})<{
  orientation: WorkflowStepProps['orientation'];
  interactive: boolean;
  disabled: boolean;
}>(({ theme, orientation, interactive, disabled }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: orientation === 'vertical' ? 'flex-start' : 'center',
  textAlign: orientation === 'vertical' ? 'left' : 'center',
  marginTop: orientation === 'vertical' ? theme.spacing(1) : theme.spacing(0.5),
  marginLeft: orientation === 'horizontal' ? theme.spacing(1) : 0,
  cursor: interactive && !disabled ? 'pointer' : 'default',
  minWidth: 0,
  flex: 1,

  '& .step-title': {
    fontSize: theme.typography.body2.fontSize,
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(0.5),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '100%',
  },

  '& .step-description': {
    fontSize: theme.typography.caption.fontSize,
    color: theme.palette.text.secondary,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '100%',
  },

  ...(disabled && {
    opacity: 0.5,
  }),
}));

const StepConnector = styled(Box, {
  shouldForwardProp: (prop) => !['orientation', 'isCompleted', 'color', 'variant'].includes(prop as string),
})<{
  orientation: WorkflowStepProps['orientation'];
  isCompleted: boolean;
  color: WorkflowStepProps['color'];
  variant: WorkflowStepProps['variant'];
}>(({ theme, orientation, isCompleted, color, variant }) => {
  const colorKey = color || 'primary';
  const colorValue = colorKey === 'neutral'
    ? { main: theme.palette.grey[600] }
    : theme.palette[colorKey as 'primary' | 'secondary' | 'success' | 'warning' | 'error'];
  const connectorColor = isCompleted ? colorValue.main : theme.palette.grey[300];

  return {
    flex: 1,
    position: 'relative',

    ...(orientation === 'horizontal' && {
      height: '2px',
      backgroundColor: connectorColor,
      margin: `0 ${theme.spacing(1)}`,
      minWidth: theme.spacing(2),
    }),

    ...(orientation === 'vertical' && {
      width: '2px',
      backgroundColor: connectorColor,
      minHeight: theme.spacing(3),
      marginLeft: theme.spacing(2),
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      top: '100%',
    }),

    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.short,
    }),

    ...(variant === 'minimal' && {
      opacity: 0.6,
    }),
  };
});

/**
 * Individual step indicator component
 */
const StepIndicatorComponent = forwardRef<HTMLDivElement, StepIndicatorProps>(({
  step,
  index,
  isActive,
  isCompleted,
  isError,
  variant,
  color,
  size,
  showNumbers,
  showIcons,
  completedIcon,
  errorIcon,
  interactive,
  animated,
  disabled,
  onClick,
  'data-testid': dataTestId,
}, ref) => {
  const handleClick = useCallback(() => {
    if (interactive && !disabled && onClick) {
      onClick(index, step);
    }
  }, [interactive, disabled, onClick, index, step]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (interactive && !disabled && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      if (onClick) {
        onClick(index, step);
      }
    }
  }, [interactive, disabled, onClick, index, step]);

  const renderIndicatorContent = () => {
    if (isError && errorIcon) {
      return errorIcon;
    }
    if (isCompleted && completedIcon) {
      return completedIcon;
    }
    if (showIcons && step.icon) {
      return step.icon;
    }
    if (showNumbers) {
      return index + 1;
    }
    return null;
  };

  return (
    <StepIndicator
      ref={ref}
      size={size}
      variant={variant}
      color={color}
      isActive={isActive}
      isCompleted={isCompleted}
      isError={isError}
      interactive={interactive}
      animated={animated}
      disabled={Boolean(disabled || step.disabled)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive && !disabled && !step.disabled ? 0 : -1}
      aria-label={`Step ${index + 1}: ${step.title}`}
      aria-current={isActive ? 'step' : undefined}
      data-testid={dataTestId}
    >
      {renderIndicatorContent()}
    </StepIndicator>
  );
});

StepIndicatorComponent.displayName = 'StepIndicator';

/**
 * Step connector component
 */
const StepConnectorComponent = forwardRef<HTMLDivElement, StepConnectorProps>(({
  isCompleted,
  orientation,
  variant,
  color,
  'data-testid': dataTestId,
}, ref) => (
  <StepConnector
    ref={ref}
    orientation={orientation}
    isCompleted={isCompleted}
    color={color}
    variant={variant}
    data-testid={dataTestId}
  />
));

StepConnectorComponent.displayName = 'StepConnector';

/**
 * Step content component
 */
const StepContentComponent = forwardRef<HTMLDivElement, StepContentProps>(({
  step,
  index,
  orientation,
  interactive,
  disabled,
  onClick,
  'data-testid': dataTestId,
}, ref) => {
  const handleClick = useCallback(() => {
    if (interactive && !disabled && onClick) {
      onClick(index, step);
    }
  }, [interactive, disabled, onClick, index, step]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (interactive && !disabled && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      if (onClick) {
        onClick(index, step);
      }
    }
  }, [interactive, disabled, onClick, index, step]);

  return (
    <StepContent
      ref={ref}
      orientation={orientation}
      interactive={interactive}
      disabled={Boolean(disabled || step.disabled)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive && !disabled && !step.disabled ? 0 : -1}
      data-testid={dataTestId}
    >
      <div className="step-title">{step.title}</div>
      {step.description && (
        <div className="step-description">{step.description}</div>
      )}
    </StepContent>
  );
});

StepContentComponent.displayName = 'StepContent';

/**
 * WorkflowStep component for displaying multi-step workflows with visual progression
 */
export const WorkflowStep = forwardRef<HTMLDivElement, WorkflowStepProps>(({
  steps,
  currentStep = 0,
  variant = 'default',
  orientation = 'horizontal',
  color = 'primary',
  size = 'md',
  showProgress = true,
  animated = true,
  interactive = false,
  showNumbers = true,
  showIcons = false,
  completedIcon,
  errorIcon,
  onStepClick,
  disabled = false,
  className,
  style,
  'data-testid': dataTestId,
  ...other
}, ref) => {
  const handleStepClick = useCallback((stepIndex: number, step: WorkflowStepItem) => {
    if (onStepClick && !disabled && !step.disabled) {
      onStepClick(stepIndex, step);
    }
  }, [onStepClick, disabled]);

  const stepsWithStatus = useMemo(() => steps.map((step, index) => {
    let status = step.status;

    // Auto-calculate status based on currentStep if not explicitly set
    if (status === 'pending' || status === 'current' || status === 'completed') {
      if (index < currentStep) {
        status = 'completed';
      } else if (index === currentStep) {
        status = 'current';
      } else {
        status = 'pending';
      }
    }

    return { ...step, status };
  }), [steps, currentStep]);

  return (
    <StepContainer
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      orientation={orientation}
      variant={variant}
      className={className}
      style={style}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={steps.length - 1}
      aria-valuenow={currentStep}
      aria-valuetext={`Step ${currentStep + 1} of ${steps.length}: ${steps[currentStep]?.title}`}
      data-testid={dataTestId}
      {...other}
    >
      {stepsWithStatus.map((step, index) => {
        const isActive = step.status === 'current';
        const isCompleted = step.status === 'completed';
        const isError = step.status === 'error';
        const isLast = index === steps.length - 1;

        return (
          <React.Fragment key={index}>
            <StepItem orientation={orientation} isLast={isLast}>
              <StepIndicatorComponent
                step={step}
                index={index}
                isActive={isActive}
                isCompleted={isCompleted}
                isError={isError}
                variant={variant}
                color={color}
                size={size}
                showNumbers={showNumbers}
                showIcons={showIcons}
                completedIcon={completedIcon}
                errorIcon={errorIcon}
                interactive={interactive}
                animated={animated}
                disabled={disabled}
                onClick={handleStepClick}
                data-testid={`${dataTestId}-indicator-${index}`}
              />

              <StepContentComponent
                step={step}
                index={index}
                orientation={orientation}
                interactive={interactive}
                disabled={disabled}
                onClick={handleStepClick}
                data-testid={`${dataTestId}-content-${index}`}
              />

              {showProgress && !isLast && (
                <StepConnectorComponent
                  isCompleted={isCompleted}
                  orientation={orientation}
                  variant={variant}
                  color={color}
                  data-testid={`${dataTestId}-connector-${index}`}
                />
              )}
            </StepItem>
          </React.Fragment>
        );
      })}
    </StepContainer>
  );
});

WorkflowStep.displayName = 'WorkflowStep';

export default WorkflowStep;