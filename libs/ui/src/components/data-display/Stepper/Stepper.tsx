import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import CheckCircle from '@mui/icons-material/CheckCircle';
import React from 'react';

import { useDensitySpacing } from '../../../utils/density';

import type { StepItemProps,StepperProps } from './Stepper.types';

const StepperRoot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'orientation',
})<{ orientation: 'horizontal' | 'vertical'; component?: React.ElementType }>(({ orientation }) => ({
  display: 'flex',
  flexDirection: orientation === 'horizontal' ? 'row' : 'column',
  // Use flex-start to align all step circles at the same vertical position
  alignItems: 'flex-start',
}));

const StepItem = styled(Box, {
  shouldForwardProp: (prop) => !['orientation', 'isLast'].includes(prop as string),
})<{ orientation: 'horizontal' | 'vertical'; isLast: boolean }>(({ orientation, isLast }) => ({
  display: 'flex',
  // For horizontal: row layout so connector appears beside step content
  // For vertical: column layout so connector appears below step content
  flexDirection: orientation === 'horizontal' ? 'row' : 'column',
  // For horizontal: flex-start to keep circles aligned at top
  // For vertical: center to align connector with centered circle
  alignItems: orientation === 'horizontal' ? 'flex-start' : 'center',
  flex: orientation === 'horizontal' && !isLast ? 1 : 'none',
  position: 'relative',
  // For vertical: ensure consistent width for proper centering
  ...(orientation === 'vertical' && {
    width: '100%',
  }),
}));

const StepButton = styled(Button, {
  shouldForwardProp: (prop) => !['isActive', 'isCompleted', 'clickable'].includes(prop as string),
})<{ isActive: boolean; isCompleted: boolean; clickable: boolean }>(
  ({ theme, isActive, isCompleted, clickable }) => ({
    minWidth: 48,
    height: 48,
    borderRadius: '50%',
    padding: 0,
    backgroundColor: isCompleted
      ? theme.palette.primary.main
      : isActive
        ? theme.palette.primary.main
        : theme.palette.grey[300],
    color: isCompleted || isActive ? theme.palette.primary.contrastText : theme.palette.text.primary,
    cursor: clickable ? 'pointer' : 'default',
    pointerEvents: clickable ? 'auto' : 'none',
    transition: theme.transitions.create(['background-color', 'transform'], {
      duration: theme.transitions.duration.short,
    }),
    '&:hover': clickable
      ? {
        backgroundColor: isCompleted
          ? theme.palette.primary.dark
          : isActive
            ? theme.palette.primary.dark
            : theme.palette.grey[400],
        transform: 'scale(1.05)',
      }
      : {},
    '&:disabled': {
      backgroundColor: theme.palette.grey[300],
      color: theme.palette.text.disabled,
    },
  }),
);

const StepConnector = styled(Box, {
  shouldForwardProp: (prop) => !['orientation', 'isCompleted', 'densitySpacing'].includes(prop as string),
})<{ orientation: 'horizontal' | 'vertical'; isCompleted: boolean; densitySpacing?: number }>(
  ({ theme, orientation, isCompleted, densitySpacing = 8 }) => ({
    backgroundColor: isCompleted ? theme.palette.primary.main : theme.palette.grey[300],
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.short,
    }),
    ...(orientation === 'horizontal'
      ? {
        flex: 1,
        height: 2,
        marginTop: 23, // Center with 48px step button (48/2 - 1)
        marginLeft: densitySpacing, // Base: 8px, scales with density
        marginRight: densitySpacing, // Base: 8px, scales with density
        minWidth: 24,
      }
      : {
        width: 2,
        height: 32,
        marginTop: densitySpacing, // Base: 8px, scales with density
        marginBottom: densitySpacing, // Base: 8px, scales with density
        // Use margin auto to center horizontally
        marginLeft: 'auto',
        marginRight: 'auto',
      }),
  }),
);

const StepLabel = styled(Box, {
  shouldForwardProp: (prop) => !['orientation', 'densityMargin'].includes(prop as string),
})<{ orientation: 'horizontal' | 'vertical'; densityMargin?: number }>(({ orientation, densityMargin = 8 }) => ({
  textAlign: 'center',
  marginTop: orientation === 'horizontal' ? densityMargin : 0, // Base: 8px, scales with density
}));

const StepperItem: React.FC<StepItemProps & { densitySpacing?: number }> = ({
  step,
  index,
  isActive,
  isCompleted,
  isLast,
  orientation,
  variant,
  clickable,
  onStepClick,
  renderConnector,
  nextStep,
  densitySpacing = 8,
}) => {
  const isClickable = clickable && !step.disabled && (variant === 'non-linear' || !isActive);

  const handleStepClick = () => {
    if (isClickable && onStepClick) {
      onStepClick(step.id);
    }
  };

  return (
    <StepItem
      orientation={orientation}
      isLast={isLast}
      role="listitem"
      data-testid={`stepper-step-${index}`}
      className={`${isActive ? 'stepper-step-active' : ''} ${isCompleted ? 'stepper-step-completed' : ''} ${step.optional ? 'stepper-step-optional' : ''}`}
    >
      {/* Step content: button and label stacked vertically for horizontal, or in row for vertical */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        data-testid={`stepper-step-content-${index}`}
        sx={orientation === 'horizontal' ? {
          minWidth: 80,
          maxWidth: 150,
          flex: '0 1 auto',
        } : { flexShrink: 0 }}
      >
        <StepButton
          isActive={isActive}
          isCompleted={isCompleted}
          clickable={isClickable}
          onClick={handleStepClick}
          disabled={step.disabled}
          aria-current={isActive ? 'step' : undefined}
          aria-label={`Step ${index + 1}: ${step.label}${step.optional ? ' (optional)' : ''}${
            isCompleted ? ' (completed)' : isActive ? ' (current)' : ''
          }`}
          data-testid={`stepper-step-icon-${index}`}
        >
          {isCompleted ? (
            <CheckCircle />
          ) : (
            <Typography variant="body2" fontWeight="bold">
              {index + 1}
            </Typography>
          )}
        </StepButton>

        <StepLabel orientation={orientation} densityMargin={densitySpacing} data-testid={`stepper-step-label-${index}`}>
          <Typography
            variant="body2"
            fontWeight={isActive ? 'bold' : 'normal'}
            color={isActive ? 'primary' : 'textPrimary'}
          >
            {step.label}
            {step.optional && (
              <Typography
                component="span"
                variant="caption"
                color="textSecondary"
                sx={{ ml: 1 }}
              >
                (optional)
              </Typography>
            )}
          </Typography>
          {step.description && (
            <Typography
              variant="caption"
              color="textSecondary"
              display="block"
            >
              {step.description}
            </Typography>
          )}
        </StepLabel>
      </Box>

      {/* Connector: appears beside step content for horizontal layout */}
      {!isLast && (
        <>
          {renderConnector && nextStep ? (
            renderConnector(step, nextStep, { completed: isCompleted, active: isActive })
          ) : (
            <StepConnector orientation={orientation} isCompleted={isCompleted} densitySpacing={densitySpacing} data-testid={`stepper-connector-${index}`} />
          )}
        </>
      )}
    </StepItem>
  );
};

export const Stepper: React.FC<StepperProps> = ({
  steps,
  activeId,
  completed = new Set(),
  orientation = 'horizontal',
  variant = 'linear',
  onStepChange,
  clickable,
  renderConnector,
  className,
  'data-testid': dataTestId,
}) => {
  const { spacing } = useDensitySpacing();
  // Determine clickable behavior
  const isClickable = clickable ?? variant === 'non-linear';

  return (
    <StepperRoot
      component="ol"
      orientation={orientation}
      className={className}
      data-testid={dataTestId || 'stepper-container'}
      sx={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
      }}
    >
      {steps.map((step, index) => {
        const isActive = step.id === activeId;
        const isCompleted = completed.has(step.id);
        const isLast = index === steps.length - 1;
        const nextStep = !isLast ? steps[index + 1] : undefined;

        return (
          <StepperItem
            key={step.id}
            step={step}
            index={index}
            isActive={isActive}
            isCompleted={isCompleted}
            isLast={isLast}
            orientation={orientation}
            variant={variant}
            clickable={isClickable}
            onStepClick={onStepChange}
            renderConnector={renderConnector}
            nextStep={nextStep}
            densitySpacing={spacing(2)} // Base: 8px, scales with density
          />
        );
      })}
    </StepperRoot>
  );
};