import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import { useTheme } from '@mui/material/styles';
import React, { useCallback,useEffect, useRef, useState } from 'react';

import { useDensitySpacing } from '../../../utils/density';
import type { CollapsibleContentProps,CollapsibleProps, CollapsibleTriggerProps } from './Collapsible.types';

export const Collapsible: React.FC<CollapsibleProps> = ({
  children,
  open,
  variant = 'default',
  duration = 300,
  easing,
  onToggle,
  disabled = false,
  keepMounted = false,
  maxHeight,
  sx,
  className,
  dataTestId,
  ...otherProps
}) => {
  const theme = useTheme();
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | 'auto'>('auto');

  const getTransitionSettings = () => {
    switch (variant) {
      case 'smooth':
        return {
          duration,
          easing: easing || theme.transitions.easing.easeInOut,
        };
      case 'spring':
        return {
          duration: duration * 1.2,
          easing: easing || 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        };
      default:
        return {
          duration,
          easing: easing || theme.transitions.easing.easeInOut,
        };
    }
  };

  const transition = getTransitionSettings();

  const measureHeight = useCallback(() => {
    if (contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight;
      // Cap at maxHeight if provided
      setHeight(maxHeight ? Math.min(scrollHeight, maxHeight) : scrollHeight);
    }
  }, [maxHeight]);

  useEffect(() => {
    if (!open) {
      setHeight(0);
    } else if (contentRef.current) {
      measureHeight();
    }
  }, [open, measureHeight, children]);

  // Trigger onToggle callback when open state changes
  useEffect(() => {
    if (onToggle && !disabled) {
      onToggle(open);
    }
  }, [open, onToggle, disabled]);


  if (variant === 'default') {
    // Use MUI's built-in Collapse for default variant
    return (
      <Collapse
        in={open && !disabled}
        timeout={disabled ? 0 : duration}
        sx={{
          opacity: disabled ? 0.6 : 1,
          pointerEvents: disabled ? 'none' : 'auto',
          ...(maxHeight && { maxHeight, overflow: 'hidden' }),
          ...sx,
        }}
        className={className}
        unmountOnExit={!keepMounted}
        data-disabled={disabled}
        data-testid={dataTestId}
        role="region"
        aria-expanded={open && !disabled}
        aria-hidden={disabled || !open}
        {...otherProps}
      >
        <Box>{children}</Box>
      </Collapse>
    );
  }

  // Custom implementation for smooth and spring variants
  return (
    <Box
      component="div"
      sx={{
        overflow: 'hidden',
        height: open && !disabled ? height : 0,
        transition: disabled ? 'none' : `height ${transition.duration}ms ${transition.easing}`,
        willChange: disabled ? 'auto' : 'height',
        opacity: disabled ? 0.6 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
        ...sx,
      }}
      className={className}
      data-disabled={disabled}
      data-testid={dataTestId}
      role="region"
      aria-expanded={open && !disabled}
      aria-hidden={disabled || !open}
      {...otherProps}
    >
      <Box ref={contentRef}>
        {(keepMounted || (open && !disabled)) && children}
      </Box>
    </Box>
  );
};

export const CollapsibleTrigger: React.FC<CollapsibleTriggerProps> = ({
  children,
  onClick,
  disabled = false,
  expanded = false,
  className,
  dataTestId,
  ...otherProps
}) => {
  const theme = useTheme();
  const { spacingPx } = useDensitySpacing();

  // Base padding: 1 unit vertical (4px), 2 units horizontal (8px) at normal density
  const paddingY = spacingPx(1);
  const paddingX = spacingPx(2);

  return (
    <Box
      component="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={className}
      data-testid={dataTestId}
      aria-expanded={expanded}
      aria-disabled={disabled}
      role="button"
      tabIndex={disabled ? -1 : 0}
      data-state={expanded ? 'open' : 'closed'}
      sx={{
        width: '100%',
        padding: `${paddingY} ${paddingX}`,
        border: 'none',
        backgroundColor: expanded ? theme.palette.action.selected : 'transparent',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: theme.transitions.create(['background-color', 'opacity'], {
          duration: theme.transitions.duration.short,
        }),
        opacity: disabled ? 0.6 : 1,
        '&:hover': {
          backgroundColor: disabled ? 'transparent' :
            expanded ? theme.palette.action.selected : theme.palette.action.hover,
        },
        '&:focus': {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: 2,
        },
        '&:active': {
          backgroundColor: disabled ? 'transparent' : theme.palette.action.focus,
        },
      }}
      {...otherProps}
    >
      {children}
    </Box>
  );
};

export const CollapsibleContent: React.FC<CollapsibleContentProps> = ({
  children,
  className,
  ...otherProps
}) => {
  const { spacingPx } = useDensitySpacing();

  // Base padding: 2 units (8px at normal density)
  const padding = spacingPx(2);

  return (
    <Box
      className={className}
      sx={{
        padding,
      }}
      {...otherProps}
    >
      {children}
    </Box>
  );
};