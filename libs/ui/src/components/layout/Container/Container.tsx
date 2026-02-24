import MuiContainer from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import React from 'react';

import { useDensitySpacing } from '../../../utils/density';
import type { ContainerProps } from './Container.types';

export const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 'lg',
  variant = 'default',
  padding = 'md',
  responsive = true,
  dataTestId,
  sx,
  ...props
}) => {
  const theme = useTheme();
  const { spacingPx } = useDensitySpacing();

  // Padding map with density-aware spacing
  // Base units: none=0, xs=1 (4px), sm=2 (8px), md=3 (12px), lg=4 (16px), xl=6 (24px) at normal density
  const getPadding = () => {
    const paddingUnits: Record<string, number> = {
      none: 0,
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4,
      xl: 6,
    };
    const units = paddingUnits[padding] ?? 3;
    return units === 0 ? 0 : spacingPx(units);
  };

  // Responsive padding: 2 units (8px at normal density)
  const responsivePadding = spacingPx(2);

  // Padded variant: 8 units (32px at normal density) for vertical padding
  const paddedVertical = spacingPx(8);

  const getMaxWidth = (): 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false => {
    if (variant === 'fluid') return false;
    if (variant === 'centered') return 'md';
    if (typeof maxWidth === 'string' && ['xs', 'sm', 'md', 'lg', 'xl'].includes(maxWidth)) {
      return maxWidth as 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    }
    if (maxWidth === false) return false;
    return 'lg'; // default fallback
  };

  const containerStyles: SxProps<Theme> = {
    ...(variant === 'centered' && {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
    }),
    ...(variant === 'padded' && {
      paddingTop: paddedVertical,
      paddingBottom: paddedVertical,
    }),
    padding: getPadding(),
    ...(responsive && {
      [theme.breakpoints.down('sm')]: {
        padding: responsivePadding,
      },
    }),
    ...(sx || {}),
  };

  return (
    <MuiContainer
      maxWidth={getMaxWidth()}
      sx={containerStyles}
      data-testid={dataTestId || 'container'}
      {...props}
    >
      {children}
    </MuiContainer>
  );
};
