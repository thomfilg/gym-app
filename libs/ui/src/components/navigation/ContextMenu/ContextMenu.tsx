import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import React, { cloneElement, isValidElement,useState } from 'react';

import { useDensitySpacing } from '../../../utils/density';
import type { ContextMenuItem, ContextMenuProps } from './ContextMenu.types';

// Base padding values in spacing units (4px base)
// These will be scaled by the density multiplier
const basePaddingSizes = {
  sm: { py: 0.5, px: 1.5 }, // 2px 6px at normal density
  md: { py: 0.75, px: 2 }, // 3px 8px at normal density
  lg: { py: 1.5, px: 2 }, // 6px 8px at normal density
};

// Min heights remain constant (not affected by density)
const minHeights = {
  sm: 32,
  md: 40,
  lg: 48,
};

// Font sizes remain constant (not affected by density)
const fontSizes = {
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
};

const StyledMenu = styled(Menu, {
  shouldForwardProp: (prop) => prop !== 'customVariant' && prop !== 'size',
})<{ customVariant?: string; size?: string }>(({ theme, customVariant, size }) => ({
  '& .MuiPaper-root': {
    minWidth: 160,
    borderRadius: theme.spacing(1),

    ...(customVariant === 'glass' && {
      backgroundColor: alpha(theme.palette.background.paper, 0.85),
      backdropFilter: 'blur(20px)',
      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.12)}`,
    }),

    ...(customVariant === 'dark' && {
      backgroundColor: alpha(theme.palette.grey[900], 0.95),
      color: theme.palette.common.white,
      '& .MuiMenuItem-root': {
        color: theme.palette.common.white,
      },
      '& .MuiListItemIcon-root': {
        color: theme.palette.common.white,
      },
      '& .MuiDivider-root': {
        borderColor: alpha(theme.palette.common.white, 0.12),
      },
    }),

    ...(size === 'sm' && {
      '& .MuiMenuItem-root': {
        fontSize: '0.875rem',
        minHeight: 32,
        padding: theme.spacing(0.5, 1.5),
      },
    }),

    ...(size === 'lg' && {
      '& .MuiMenuItem-root': {
        fontSize: '1.125rem',
        minHeight: 48,
        padding: theme.spacing(1.5, 2),
      },
    }),
  },
}));

const StyledMenuItem = styled(MenuItem, {
  shouldForwardProp: (prop) => !['color', 'dangerous'].includes(prop as string),
})<{ color?: string; dangerous?: boolean }>(({ theme, color, dangerous }) => ({
  borderRadius: theme.spacing(0.5),
  margin: theme.spacing(0.25, 0.5),
  transition: 'all 0.2s ease',

  '&:hover': {
    backgroundColor: alpha(dangerous ? theme.palette.error.main : theme.palette.primary.main, 0.08),
  },

  ...(dangerous && {
    color: theme.palette.error.main,
    '& .MuiListItemIcon-root': {
      color: theme.palette.error.main,
    },
  }),

  ...(color &&
    color !== 'default' &&
    !dangerous && {
    color:
        (theme.palette as unknown as Record<string, { main?: string }>)[color]?.main ||
        theme.palette.primary.main,
    '& .MuiListItemIcon-root': {
      color:
          (theme.palette as unknown as Record<string, { main?: string }>)[color]?.main ||
          theme.palette.primary.main,
    },
    '&:hover': {
      backgroundColor: alpha(
        (theme.palette as unknown as Record<string, { main?: string }>)[color]?.main ||
            theme.palette.primary.main,
        0.08,
      ),
    },
  }),
}));

const MenuHeader = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  fontSize: '0.75rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  color: theme.palette.text.secondary,
  letterSpacing: 0.5,
}));

const ShortcutText = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  marginLeft: 'auto',
  paddingLeft: theme.spacing(2),
}));

const renderMenuItem = (
  item: ContextMenuItem,
  handleItemClick: (item: ContextMenuItem) => void,
  size: 'sm' | 'md' | 'lg' = 'md',
  spacingPx?: (units: number) => string,
) => {
  if (item.type === 'divider') {
    return <Divider key={item.id} sx={{ my: 0.5 }} />;
  }

  if (item.type === 'header') {
    return <MenuHeader key={item.id}>{item.label}</MenuHeader>;
  }

  const hasIcon = !!item.icon;

  // Calculate density-aware padding for menu item size
  const sizeConfig = basePaddingSizes[size];
  const densityStyles = spacingPx
    ? {
      minHeight: minHeights[size],
      fontSize: fontSizes[size],
      padding: `${spacingPx(sizeConfig.py)} ${spacingPx(sizeConfig.px)}`,
    }
    : {};

  return (
    <StyledMenuItem
      key={item.id}
      disabled={item.disabled}
      onClick={() => handleItemClick(item)}
      color={item.color}
      dangerous={item.dangerous}
      sx={densityStyles}
    >
      {hasIcon && (
        <ListItemIcon sx={{ minWidth: size === 'sm' ? 32 : 40 }}>{item.icon}</ListItemIcon>
      )}
      <ListItemText primary={item.label} />
      {item.shortcut && <ShortcutText variant="caption">{item.shortcut}</ShortcutText>}
    </StyledMenuItem>
  );
};

export const ContextMenu = React.forwardRef<HTMLDivElement, ContextMenuProps>(
  (
    {
      variant = 'default',
      items,
      children,
      disabled = false,
      onOpen,
      onClose,
      size = 'md',
      triggerClassName,
      triggerStyle,
      ...menuProps
    },
    ref,
  ) => {
    const { spacingPx } = useDensitySpacing();
    const [contextMenu, setContextMenu] = useState<{
      mouseX: number;
      mouseY: number;
    } | null>(null);

    const handleContextMenu = (event: React.MouseEvent) => {
      if (disabled) return;

      event.preventDefault();
      setContextMenu(
        contextMenu === null
          ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
          : null,
      );
      onOpen?.(event);
    };

    const handleClose = () => {
      setContextMenu(null);
      onClose?.();
    };

    const handleItemClick = (item: ContextMenuItem) => {
      if (item.onClick) {
        item.onClick();
      }
      handleClose();
    };

    const triggerElement = isValidElement(children) ? (
      cloneElement(
        children as React.ReactElement<{
          onContextMenu?: (event: React.MouseEvent) => void;
          className?: string;
          style?: React.CSSProperties;
        }>,
        {
          onContextMenu: handleContextMenu,
          className: [
            (children as React.ReactElement<{ className?: string }>).props.className,
            triggerClassName,
            !disabled ? 'context-menu-trigger' : '',
          ]
            .filter(Boolean)
            .join(' '),
          style: {
            ...(children as React.ReactElement<{ style?: React.CSSProperties }>).props.style,
            ...triggerStyle,
            cursor: disabled ? 'default' : 'context-menu',
          },
        }
      )
    ) : (
      <div
        onContextMenu={handleContextMenu}
        className={triggerClassName}
        style={{
          ...triggerStyle,
          cursor: disabled ? 'default' : 'context-menu',
        }}
      >
        {children}
      </div>
    );

    return (
      <>
        {triggerElement}
        <StyledMenu
          ref={ref}
          open={contextMenu !== null}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={
            contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined
          }
          customVariant={variant}
          size={size}
          {...menuProps}
        >
          {items.map((item) =>
            renderMenuItem(item, handleItemClick, size as 'sm' | 'md' | 'lg', spacingPx),
          )}
        </StyledMenu>
      </>
    );
  },
);

ContextMenu.displayName = 'ContextMenu';
