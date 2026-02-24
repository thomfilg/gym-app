import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Portal from '@mui/material/Portal';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, keyframes, styled } from '@mui/material/styles';
import CompleteIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import PrevIcon from '@mui/icons-material/NavigateBefore';
import NextIcon from '@mui/icons-material/NavigateNext';
import RestartIcon from '@mui/icons-material/Refresh';
import type { FC} from 'react';
import React, { useCallback,useEffect, useRef, useState } from 'react';

import { useDensitySpacing } from '../../../utils/density';
import type { TutorialOverlayProps } from './TutorialOverlay.types';

// Animation keyframes
const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(255, 255, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
`;

const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

// Styled components
const Overlay = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'allowClickThrough',
})<{ allowClickThrough?: boolean }>(({ theme, allowClickThrough }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: theme.zIndex.modal + 100,
  pointerEvents: allowClickThrough ? 'none' : 'auto',
  transition: 'opacity 0.3s ease',
}));

const Backdrop = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: alpha('#000', 0.7),
  backdropFilter: 'blur(2px)',
}));

const Spotlight = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'bounds' && prop !== 'padding',
})<{ bounds: globalThis.DOMRect; padding: number }>(({ bounds, padding }) => ({
  position: 'absolute',
  top: bounds.top - padding,
  left: bounds.left - padding,
  width: bounds.width + padding * 2,
  height: bounds.height + padding * 2,
  borderRadius: 8,
  border: '2px solid rgba(255, 255, 255, 0.5)',
  animation: `${pulseAnimation} 2s infinite`,
  pointerEvents: 'none',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: -2,
    borderRadius: 8,
    background: 'transparent',
    boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.7)',
  },
}));

const TooltipContainer = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'placement',
})<{ placement: string }>(({ theme, placement }) => ({
  position: 'absolute',
  maxWidth: 360,
  // Padding will be set dynamically via sx prop based on density
  background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.98)} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: `1px solid ${alpha(theme.palette.divider, 0.18)}`,
  boxShadow: theme.shadows[12],
  animation: `${floatAnimation} 3s ease-in-out infinite`,
  pointerEvents: 'auto',
  zIndex: theme.zIndex.modal + 101,
  '&::before': {
    content: '""',
    position: 'absolute',
    width: 12,
    height: 12,
    background: 'inherit',
    transform: 'rotate(45deg)',
    border: 'inherit',
    ...(placement === 'top' && {
      bottom: -7,
      left: '50%',
      marginLeft: -6,
      borderTop: 'none',
      borderLeft: 'none',
    }),
    ...(placement === 'bottom' && {
      top: -7,
      left: '50%',
      marginLeft: -6,
      borderBottom: 'none',
      borderRight: 'none',
    }),
    ...(placement === 'left' && {
      right: -7,
      top: '50%',
      marginTop: -6,
      borderLeft: 'none',
      borderBottom: 'none',
    }),
    ...(placement === 'right' && {
      left: -7,
      top: '50%',
      marginTop: -6,
      borderRight: 'none',
      borderTop: 'none',
    }),
  },
}));

const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  height: 4,
  zIndex: theme.zIndex.modal + 102,
  '& .MuiLinearProgress-bar': {
    background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
  },
}));

const StepIndicator = styled(Box)(() => ({
  display: 'flex',
  // Gap, marginTop, marginBottom will be set dynamically via sx prop based on density
}));

const StepDot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'completed',
})<{ active?: boolean; completed?: boolean }>(({ theme, active, completed }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  background: completed
    ? theme.palette.success.main
    : active
      ? theme.palette.primary.main
      : alpha(theme.palette.text.primary, 0.3),
  transition: 'all 0.3s ease',
  ...(active && {
    transform: 'scale(1.5)',
  }),
}));

// Helper function to get element bounds
const getElementBounds = (selector: string): globalThis.DOMRect | null => {
  const element = document.querySelector(selector);
  if (!element) return null;
  return element.getBoundingClientRect();
};

// Helper function to calculate tooltip position
const calculateTooltipPosition = (
  targetBounds: globalThis.DOMRect,
  tooltipBounds: globalThis.DOMRect,
  placement: string,
  padding = 16,
) => {
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  let position = { top: 0, left: 0 };
  let finalPlacement = placement;

  if (placement === 'auto') {
    // Determine best placement based on available space
    const spaces = {
      top: targetBounds.top,
      bottom: viewport.height - targetBounds.bottom,
      left: targetBounds.left,
      right: viewport.width - targetBounds.right,
    };
    finalPlacement = Object.entries(spaces).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
  }

  switch (finalPlacement) {
    case 'top':
      position = {
        top: targetBounds.top - tooltipBounds.height - padding,
        left: targetBounds.left + targetBounds.width / 2 - tooltipBounds.width / 2,
      };
      break;
    case 'bottom':
      position = {
        top: targetBounds.bottom + padding,
        left: targetBounds.left + targetBounds.width / 2 - tooltipBounds.width / 2,
      };
      break;
    case 'left':
      position = {
        top: targetBounds.top + targetBounds.height / 2 - tooltipBounds.height / 2,
        left: targetBounds.left - tooltipBounds.width - padding,
      };
      break;
    case 'right':
      position = {
        top: targetBounds.top + targetBounds.height / 2 - tooltipBounds.height / 2,
        left: targetBounds.right + padding,
      };
      break;
  }

  // Ensure tooltip stays within viewport
  position.top = Math.max(
    padding,
    Math.min(position.top, viewport.height - tooltipBounds.height - padding),
  );
  position.left = Math.max(
    padding,
    Math.min(position.left, viewport.width - tooltipBounds.width - padding),
  );

  return { position, placement: finalPlacement };
};

// Main component
export const TutorialOverlay: FC<TutorialOverlayProps> = ({
  steps,
  onComplete,
  onSkip,
  onStepComplete,
  initialStep = 0,
  active = true,
  showProgress = true,
  allowKeyboardNavigation = true,
  allowClickThrough = false,
  variant = 'tooltip',
  allowSkip = false,
  animated = true,
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [targetBounds, setTargetBounds] = useState<globalThis.DOMRect | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [actualPlacement, setActualPlacement] = useState<string>('bottom');
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const { spacing } = useDensitySpacing();

  // Density-aware spacing values
  // Base tooltip padding: 3 spacing units (12px at normal density)
  const tooltipPadding = spacing(3);
  // Base step indicator gap: 1 spacing unit (4px at normal density)
  const stepIndicatorGap = spacing(1);
  // Base step indicator margins: 2 spacing units (8px at normal density)
  const stepIndicatorMargin = spacing(2);

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;
  const isModal = variant === 'modal';
  const isSpotlight = variant === 'spotlight' || variant === 'highlight';
  const isLastStep = currentStep === steps.length - 1;
  const requiresActionBeforeNext = currentStepData?.requiresAction && !isLastStep;

  // Update target bounds when step changes
  useEffect(() => {
    if (!active || !currentStepData) return;

    const updateBounds = () => {
      const bounds = getElementBounds(currentStepData.target);
      if (bounds) {
        setTargetBounds(bounds);
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Initial update
    updateBounds();

    // Update on resize/scroll
    const handleUpdate = () => updateBounds();
    window.addEventListener('resize', handleUpdate);
    window.addEventListener('scroll', handleUpdate, true);

    return () => {
      window.removeEventListener('resize', handleUpdate);
      window.removeEventListener('scroll', handleUpdate, true);
    };
  }, [currentStep, currentStepData, active]);

  // Calculate tooltip position
  useEffect(() => {
    if (!targetBounds || !tooltipRef.current || !isVisible || !currentStepData) return;

    const tooltipBounds = tooltipRef.current.getBoundingClientRect();
    const { position, placement } = calculateTooltipPosition(
      targetBounds,
      tooltipBounds,
      currentStepData.position || 'auto',
    );
    setTooltipPosition(position);
    setActualPlacement(placement);
  }, [targetBounds, currentStepData, isVisible]);

  // Handler functions
  const handleNext = useCallback(() => {
    const currentStepId = steps[currentStep]?.id;
    if (currentStepId && onStepComplete) {
      onStepComplete(currentStepId);
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentStep, steps, onComplete, onStepComplete]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const handleSkip = useCallback(() => {
    if (onSkip) {
      onSkip();
    }
  }, [onSkip]);

  const handleRestart = useCallback(() => {
    setCurrentStep(0);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!allowKeyboardNavigation || !active) return;

    const handleKeyPress = (e: globalThis.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          handlePrev();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case 'Escape':
          handleSkip();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [active, allowKeyboardNavigation, handleNext, handlePrev, handleSkip]);

  if (!active || !currentStepData) return null;

  // Handle empty steps array
  if (steps.length === 0) return null;

  return (
    <Portal>
      <Overlay allowClickThrough={allowClickThrough} data-testid="tutorial-overlay">
        {showProgress && <ProgressBar variant="determinate" value={progress} />}

        {(isModal || isSpotlight) && <Backdrop />}

        {targetBounds && isVisible && isSpotlight && (
          <Spotlight
            bounds={targetBounds}
            padding={currentStepData.spotlightPadding || 8}
            data-testid="tutorial-highlight"
          />
        )}

        <Fade in={isVisible} timeout={300}>
          <TooltipContainer
            ref={tooltipRef}
            placement={actualPlacement}
            elevation={12}
            style={{
              top: tooltipPosition.top,
              left: tooltipPosition.left,
              animation: animated ? undefined : 'none',
            }}
            sx={{ padding: `${tooltipPadding}px` }}
            role="dialog"
            aria-labelledby={`tutorial-title-${currentStep}`}
            aria-describedby={`tutorial-content-${currentStep}`}
            data-testid={`tutorial-step-${currentStep}`}
          >
            <Stack spacing={2}>
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
              >
                <Typography
                  id={`tutorial-title-${currentStep}`}
                  variant="h6"
                  fontWeight="bold"
                  sx={{ flex: 1 }}
                  data-testid="tutorial-step-title"
                >
                  {currentStepData.title}
                </Typography>
                {allowSkip && (
                  <IconButton
                    size="small"
                    onClick={handleSkip}
                    sx={{ ml: 1, mt: -1, mr: -1 }}
                    data-testid="tutorial-close-button"
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>

              <Typography
                id={`tutorial-content-${currentStep}`}
                variant="body2"
                color="text.secondary"
                data-testid="tutorial-step-content"
              >
                {currentStepData.content}
              </Typography>

              {showProgress && (
                <Typography variant="caption" color="text.secondary" align="center">
                  {currentStep + 1} of {steps.length}
                </Typography>
              )}

              {currentStepData.action && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={currentStepData.action.onClick}
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                  }}
                >
                  {currentStepData.action.label}
                </Button>
              )}

              <StepIndicator sx={{ gap: `${stepIndicatorGap}px`, mt: `${stepIndicatorMargin}px`, mb: `${stepIndicatorMargin}px` }} data-testid="tutorial-step-indicators">
                {steps.map((_, index) => (
                  <StepDot
                    key={index}
                    active={index === currentStep}
                    completed={index < currentStep}
                    data-testid={`tutorial-indicator-${index}`}
                  />
                ))}
              </StepIndicator>

              <Stack
                direction="row"
                spacing={1}
                justifyContent="space-between"
                data-testid="tutorial-navigation"
              >
                <Stack direction="row" spacing={1}>
                  {allowSkip && (
                    <Button size="small" onClick={handleSkip} variant="text">
                      Skip
                    </Button>
                  )}
                  {steps.length > 1 && (
                    <IconButton
                      size="small"
                      onClick={handleRestart}
                      disabled={currentStep === 0}
                      title="Restart"
                    >
                      <RestartIcon fontSize="small" />
                    </IconButton>
                  )}
                </Stack>

                <Stack direction="row" spacing={1}>
                  {steps.length > 1 && currentStep > 0 && (
                    <Button
                      size="small"
                      startIcon={<PrevIcon />}
                      onClick={handlePrev}
                      disabled={currentStep === 0}
                      data-testid="tutorial-prev-button"
                    >
                      Previous
                    </Button>
                  )}

                  {!isLastStep ? (
                    <Button
                      variant="contained"
                      size="small"
                      endIcon={<NextIcon />}
                      onClick={handleNext}
                      disabled={requiresActionBeforeNext}
                      title={requiresActionBeforeNext ? 'Complete the required action first' : ''}
                      data-testid="tutorial-next-button"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      size="small"
                      endIcon={<CompleteIcon />}
                      onClick={handleNext}
                      sx={{
                        background: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
                      }}
                      data-testid="tutorial-finish-button"
                    >
                      {steps.length === 1 ? 'Complete' : 'Finish'}
                    </Button>
                  )}
                </Stack>
              </Stack>
            </Stack>
          </TooltipContainer>
        </Fade>
      </Overlay>
    </Portal>
  );
};

// Export default
export default TutorialOverlay;
