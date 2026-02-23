import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import Close from '@mui/icons-material/Close';
import React from 'react';

import { useDensitySpacing } from '../../../utils/density';
import type { DrawerContentProps,DrawerHeaderProps, DrawerProps } from './Drawer.types';

export const Drawer: React.FC<DrawerProps> = ({
  children,
  open,
  onClose,
  variant = 'left',
  anchor,
  width = 280,
  height = '100%',
  persistent = false,
  backdrop = true,
  hideBackdrop = false,
  keepMounted = false,
  className,
  dataTestId,
  ...rest
}) => {
  const theme = useTheme();

  const getAnchor = (): 'left' | 'right' | 'top' | 'bottom' => {
    if (anchor) return anchor;

    // Map variant to anchor position
    switch (variant) {
      case 'right':
        return 'right';
      case 'top':
        return 'top';
      case 'bottom':
        return 'bottom';
      case 'glass':
        return 'right';
      case 'left':
      default:
        return 'left';
    }
  };

  const getDrawerStyles = () => {
    const baseStyles = {
      width: ['left', 'right'].includes(getAnchor()) ? width : '100%',
      height: ['top', 'bottom'].includes(getAnchor()) ? height : '100%',
      flexShrink: 0,
    };

    if (variant === 'glass') {
      return {
        ...baseStyles,
        '& .MuiDrawer-paper': {
          width,
          height: '100%',
          backgroundColor: alpha(theme.palette.background.paper, 0.1),
          backdropFilter: 'blur(20px)',
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
        },
      };
    }

    return {
      ...baseStyles,
      '& .MuiDrawer-paper': {
        width: ['left', 'right'].includes(getAnchor()) ? width : '100%',
        height: ['top', 'bottom'].includes(getAnchor()) ? height : '100%',
        boxSizing: 'border-box',
      },
    };
  };

  return (
    <MuiDrawer
      anchor={getAnchor()}
      open={open}
      onClose={onClose}
      variant={persistent ? 'persistent' : 'temporary'}
      ModalProps={{
        keepMounted,
        hideBackdrop,
        BackdropProps: {
          invisible: !backdrop,
        },
      }}
      sx={getDrawerStyles()}
      className={className}
      data-testid={dataTestId || 'drawer'}
      {...rest}
    >
      {children}
    </MuiDrawer>
  );
};

export const DrawerHeader: React.FC<DrawerHeaderProps> = ({
  children,
  onClose,
  showCloseButton = true,
  dataTestId,
}) => {
  const theme = useTheme();
  const { spacing, spacingPx } = useDensitySpacing();

  // Base padding: 2 units (8px at normal density)
  const padding = spacingPx(2);
  // Base min-height: 16 units (64px at normal density)
  const minHeight = spacing(16);

  return (
    <Box
      data-testid={dataTestId || 'drawer-header'}
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding,
        borderBottom: `1px solid ${theme.palette.divider}`,
        minHeight,
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ flex: 1 }} data-testid={dataTestId ? `${dataTestId}-title` : 'drawer-title'}>
        {typeof children === 'string' ? <Typography variant="h6">{children}</Typography> : children}
      </Box>
      {showCloseButton && onClose && (
        <IconButton
          onClick={onClose}
          edge="end"
          aria-label="Close drawer"
          data-testid={dataTestId ? `${dataTestId}-close` : 'drawer-close'}
        >
          <Close />
        </IconButton>
      )}
    </Box>
  );
};

export const DrawerContent: React.FC<DrawerContentProps> = ({ children, padding: hasPadding = true, dataTestId }) => {
  const { spacingPx } = useDensitySpacing();

  // Base padding: 2 units (8px at normal density)
  const padding = hasPadding ? spacingPx(2) : 0;

  return (
    <Box
      data-testid={dataTestId || 'drawer-content'}
      sx={{
        flex: 1,
        overflow: 'auto',
        padding,
      }}
    >
      {children}
    </Box>
  );
};
