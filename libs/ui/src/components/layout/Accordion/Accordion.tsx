import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionActions from '@mui/material/AccordionActions';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { alpha, useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';

import { useDensitySpacing } from '../../../utils/density';
import type {
  AccordionActionsProps,
  AccordionDetailsProps,
  AccordionProps,
  AccordionSummaryProps} from './Accordion.types';

export const Accordion: React.FC<AccordionProps> = ({
  children,
  variant = 'default',
  disabled = false,
  defaultExpanded = false,
  expanded,
  onChange,
  sx,
  'data-testid': testId = 'accordion',
  ...props
}) => {
  const theme = useTheme();

  const getVariantStyles = () => {
    const baseTransition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

    switch (variant) {
      case 'glass':
        return {
          backgroundColor: alpha(theme.palette.background.paper, 0.08),
          backdropFilter: 'blur(24px) saturate(180%)',
          border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
          borderRadius: theme.spacing(1.5),
          transition: baseTransition,
          '&:before': {
            display: 'none',
          },
          '&:hover': {
            backgroundColor: alpha(theme.palette.background.paper, 0.12),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
            transform: 'translateY(-1px)',
            boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.12)}`,
          },
          '&.Mui-expanded': {
            backgroundColor: alpha(theme.palette.background.paper, 0.15),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
          },
        };
      case 'bordered':
        return {
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: theme.spacing(1),
          transition: baseTransition,
          '&:before': {
            display: 'none',
          },
          '&:not(:last-child)': {
            marginBottom: theme.spacing(1),
          },
          '&:hover': {
            borderColor: theme.palette.primary.main,
            boxShadow: `0 0 0 1px ${alpha(theme.palette.primary.main, 0.1)}`,
          },
          '&.Mui-expanded': {
            borderColor: theme.palette.primary.main,
          },
        };
      case 'separated':
        return {
          boxShadow: theme.shadows[2],
          borderRadius: theme.spacing(1.5),
          transition: baseTransition,
          '&:before': {
            display: 'none',
          },
          '&:not(:last-child)': {
            marginBottom: theme.spacing(2),
          },
          '&:hover': {
            boxShadow: theme.shadows[4],
            transform: 'translateY(-2px)',
          },
          '&.Mui-expanded': {
            boxShadow: theme.shadows[6],
            transform: 'translateY(-1px)',
          },
        };
      default:
        return {
          transition: baseTransition,
          '&:hover': {
            backgroundColor: alpha(theme.palette.action.hover, 0.04),
          },
        };
    }
  };

  return (
    <MuiAccordion
      disabled={disabled}
      defaultExpanded={defaultExpanded}
      expanded={expanded}
      onChange={onChange}
      data-testid={testId}
      sx={{
        ...getVariantStyles(),
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiAccordion>
  );
};

export const AccordionSummary: React.FC<AccordionSummaryProps> = ({
  children,
  expandIcon = <ExpandMoreIcon />,
  disabled = false,
  'data-testid': testId = 'accordion-summary',
  ...props
}) => {
  const theme = useTheme();
  const { spacing } = useDensitySpacing();

  // Base min-height is 14 units (56px at normal density)
  const minHeight = spacing(14);

  // Clone expandIcon to add data-testid if it's a valid React element
  const iconWithTestId = React.isValidElement(expandIcon)
    ? React.cloneElement(expandIcon as React.ReactElement<{ 'data-testid'?: string }>, {
      'data-testid': 'accordion-icon',
    })
    : expandIcon;

  return (
    <MuiAccordionSummary
      expandIcon={iconWithTestId}
      disabled={disabled}
      data-testid={testId}
      sx={{
        minHeight,
        '& .MuiAccordionSummary-expandIconWrapper': {
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          color: theme.palette.text.secondary,
        },
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
          transform: 'rotate(180deg)',
          color: theme.palette.primary.main,
        },
        '&:hover': {
          backgroundColor: alpha(theme.palette.action.hover, 0.04),
          '& .MuiAccordionSummary-expandIconWrapper': {
            color: theme.palette.primary.main,
          },
        },
        '&.Mui-focusVisible': {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: 2,
        },
        // Enhanced keyboard navigation styles
        '&:focus-visible': {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: -2,
        },
      }}
      {...props}
    >
      {children}
    </MuiAccordionSummary>
  );
};

export const AccordionDetails: React.FC<AccordionDetailsProps> = ({
  children,
  'data-testid': testId = 'accordion-details',
  ...props
}) => {
  const theme = useTheme();
  const { spacingPx } = useDensitySpacing();

  // Base padding: top = 1 unit (4px), bottom = 2 units (8px) at normal density
  const paddingTop = spacingPx(1);
  const paddingBottom = spacingPx(2);

  return (
    <MuiAccordionDetails
      data-testid={testId}
      sx={{
        paddingTop,
        paddingBottom,
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
        // Smooth content reveal animation
        '& > *': {
          animation: 'fadeInUp 0.4s ease-out',
        },
        '@keyframes fadeInUp': {
          '0%': {
            opacity: 0,
            transform: 'translateY(8px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      }}
      {...props}
    >
      {children}
    </MuiAccordionDetails>
  );
};

export const AccordionActions: React.FC<AccordionActionsProps> = ({
  children,
  disableSpacing = false,
  'data-testid': testId = 'accordion-actions',
  ...props
}) => {
  const theme = useTheme();
  const { spacingPx } = useDensitySpacing();

  // Base padding: 1 unit vertical (4px), 2 units horizontal (8px) at normal density
  const paddingY = spacingPx(1);
  const paddingX = spacingPx(2);

  return (
    <MuiAccordionActions
      disableSpacing={disableSpacing}
      data-testid={testId}
      sx={{
        padding: `${paddingY} ${paddingX}`,
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
        backgroundColor: alpha(theme.palette.background.paper, 0.5),
        backdropFilter: 'blur(8px)',
        // Animate button entries
        '& > *': {
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
      }}
      {...props}
    >
      {children}
    </MuiAccordionActions>
  );
};