import type { AccordionProps as MuiAccordionProps } from '@mui/material/Accordion';
import type { ReactNode } from 'react';

export type AccordionVariant = 'default' | 'glass' | 'bordered' | 'separated';

export interface AccordionProps extends Omit<MuiAccordionProps, 'variant'> {
  children: React.ReactElement | React.ReactElement[];
  variant?: AccordionVariant;
  disabled?: boolean;
  defaultExpanded?: boolean;
  expanded?: boolean;
  onChange?: (event: React.SyntheticEvent, expanded: boolean) => void;
  'data-testid'?: string;
}

export interface AccordionSummaryProps {
  children: ReactNode;
  expandIcon?: ReactNode;
  disabled?: boolean;
  'data-testid'?: string;
}

export interface AccordionDetailsProps {
  children: ReactNode;
  'data-testid'?: string;
}

export interface AccordionActionsProps {
  children: ReactNode;
  disableSpacing?: boolean;
  'data-testid'?: string;
}