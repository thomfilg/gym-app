import Box from '@mui/material/Box';
import { alpha, useTheme } from '@mui/material/styles';
import React from 'react';

import { useDensitySpacing } from '../../../utils/density';
import type {
  SidebarContentProps,
  SidebarFooterProps,
  SidebarHeaderProps,
  SidebarProps,
} from './Sidebar.types';

export const Sidebar: React.FC<SidebarProps> = ({
  children,
  variant = 'fixed',
  open = true,
  onToggle: _onToggle,
  width = 280,
  collapsedWidth = 64,
  position = 'left',
  className,
  dataTestId = 'sidebar',
  ...rest
}) => {
  // Prevent unused variable warning for onToggle
  void _onToggle;
  const theme = useTheme();

  const isCollapsed = variant === 'collapsible' && !open;
  const currentWidth = isCollapsed ? collapsedWidth : width;

  const getVariantStyles = () => {
    switch (variant) {
      case 'floating':
        return {
          position: 'fixed' as const,
          top: theme.spacing(2),
          bottom: theme.spacing(2),
          [position]: theme.spacing(2),
          borderRadius: theme.spacing(2),
          boxShadow: theme.shadows[8],
          zIndex: theme.zIndex.drawer,
        };
      case 'glass':
        return {
          backgroundColor: alpha(theme.palette.background.paper, 0.1),
          backdropFilter: 'blur(20px)',
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
        };
      case 'collapsible':
        return {
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        };
      default:
        return {
          backgroundColor: theme.palette.background.paper,
          borderRight: `1px solid ${theme.palette.divider}`,
        };
    }
  };

  return (
    <Box
      className={className}
      data-testid={dataTestId}
      {...rest}
      sx={{
        width: currentWidth,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        ...getVariantStyles(),
      }}
    >
      {children}
    </Box>
  );
};

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ children, dataTestId = 'sidebar-header', ...rest }) => {
  const theme = useTheme();
  const { spacingPx } = useDensitySpacing();

  // Base padding: 2 units (8px at normal density)
  const padding = spacingPx(2);

  return (
    <Box
      data-testid={dataTestId}
      {...rest}
      sx={{
        padding,
        borderBottom: `1px solid ${theme.palette.divider}`,
        flexShrink: 0,
        overflow: 'hidden',
      }}
    >
      {children}
    </Box>
  );
};

export const SidebarContent: React.FC<SidebarContentProps> = ({ children, dataTestId = 'sidebar-content', ...rest }) => (
  <Box
    data-testid={dataTestId}
    {...rest}
    sx={{
      flex: 1,
      overflow: 'auto',
    }}
  >
    {children}
  </Box>
);

export const SidebarFooter: React.FC<SidebarFooterProps> = ({ children, dataTestId = 'sidebar-footer', ...rest }) => {
  const theme = useTheme();
  const { spacingPx } = useDensitySpacing();

  // Base padding: 2 units (8px at normal density)
  const padding = spacingPx(2);

  return (
    <Box
      data-testid={dataTestId}
      {...rest}
      sx={{
        padding,
        borderTop: `1px solid ${theme.palette.divider}`,
        flexShrink: 0,
      }}
    >
      {children}
    </Box>
  );
};
