import Box from '@mui/material/Box';
import React from 'react';

import type { AspectRatioProps } from './AspectRatio.types';

export const AspectRatio: React.FC<AspectRatioProps> = ({
  children,
  variant = '16:9',
  ratio,
  maxWidth,
  maxHeight,
  dataTestId,
  sx,
  ...props
}) => {
  const getAspectRatio = () => {
    if (variant === 'custom' && ratio) {
      return ratio;
    }

    switch (variant) {
      case '16:9':
        return 16 / 9;
      case '4:3':
        return 4 / 3;
      case '1:1':
        return 1;
      case '3:2':
        return 3 / 2;
      case '21:9':
        return 21 / 9;
      default:
        return 16 / 9;
    }
  };

  const aspectRatio = getAspectRatio();

  return (
    <Box
      data-testid={dataTestId}
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth,
        maxHeight,
        ...sx,
      }}
      {...props}
    >
      <Box
        sx={{
          width: '100%',
          paddingTop: `${(1 / aspectRatio) * 100}%`,
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
