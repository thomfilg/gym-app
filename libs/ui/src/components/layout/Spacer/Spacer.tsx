import Box from '@mui/material/Box';
import React from 'react';

import { useDensitySpacing } from '../../../utils/density';
import type { SpacerProps } from './Spacer.types';

export const Spacer: React.FC<SpacerProps> = ({
  size = 'md',
  direction = 'both',
  width,
  height,
  flex = false,
  className,
  'data-testid': dataTestId,
}) => {
  const { spacingPx } = useDensitySpacing();

  // Spacing map with density-aware values
  // Base units: xs=0.5 (2px), sm=1 (4px), md=2 (8px), lg=3 (12px), xl=4 (16px) at normal density
  const getSpacing = () => {
    const spacingUnits: Record<string, number> = {
      xs: 0.5,
      sm: 1,
      md: 2,
      lg: 3,
      xl: 4,
    };
    const units = spacingUnits[size] ?? 2;
    return spacingPx(units);
  };

  const getDimensions = () => {
    const spacing = getSpacing();

    let finalWidth = width;
    let finalHeight = height;

    if (direction === 'horizontal' || direction === 'both') {
      finalWidth = width ?? spacing;
    }

    if (direction === 'vertical' || direction === 'both') {
      finalHeight = height ?? spacing;
    }

    return { width: finalWidth, height: finalHeight };
  };

  const dimensions = getDimensions();

  return (
    <Box
      className={className}
      data-testid={dataTestId}
      sx={{
        width: dimensions.width,
        height: dimensions.height,
        flex: flex ? 1 : undefined,
        flexShrink: 0,
        pointerEvents: 'none',
        userSelect: 'none',
      }}
      aria-hidden="true"
    />
  );
};
