import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React, { useRef,useState } from 'react';

import { useDensitySpacing } from '../../../utils/density';
import type {
  MenubarGroupProps,
  MenubarItem,
  MenubarProps,
  MenubarSeparatorProps,
} from './Menubar.types';

export const Menubar: React.FC<MenubarProps> = ({
  items,
  variant = 'default',
  size = 'md',
  color = 'default',
  orientation = 'horizontal',
  glow = false,
  pulse = false,
  glass = false,
  gradient = false,
  loading = false,
  disabled = false,
  className,
  style,
  logo,
  endContent,
  sticky = false,
  transparent = false,
  blur = false,
  elevation = 4,
  fullWidth = true,
  onClick,
  onFocus,
  onBlur,
  'data-testid': dataTestId,
}) => {
  const theme = useTheme();
  const { spacing, spacingPx } = useDensitySpacing();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const handleMenuOpen = (itemId: string, anchorEl: HTMLElement) => {
    setActiveMenu(itemId);
    menuRefs.current[itemId] = anchorEl;
  };

  const handleMenuClose = () => {
    const previousMenu = activeMenu;
    setActiveMenu(null);
    // Return focus to the button that opened the menu
    if (previousMenu && menuRefs.current[previousMenu]) {
      menuRefs.current[previousMenu].focus();
    }
  };

  const handleItemClick = (item: MenubarItem) => {
    if (item.action) {
      item.action();
    }
    onClick?.(item);
    handleMenuClose();
  };

  const getSizeStyles = () => {
    // Base padding values scale with density
    switch (size) {
      case 'xs':
        return {
          minHeight: 40,
          fontSize: '0.75rem',
          // Base: 2px 4px padding, scales with density
          padding: `${spacingPx(0.5)} ${spacingPx(1)}`,
        };
      case 'sm':
        return {
          minHeight: 48,
          fontSize: '0.875rem',
          // Base: 3px 6px padding, scales with density
          padding: `${spacingPx(0.75)} ${spacingPx(1.5)}`,
        };
      case 'md':
        return {
          minHeight: 56,
          fontSize: '1rem',
          // Base: 4px 8px padding, scales with density
          padding: `${spacingPx(1)} ${spacingPx(2)}`,
        };
      case 'lg':
        return {
          minHeight: 64,
          fontSize: '1.125rem',
          // Base: 5px 10px padding, scales with density
          padding: `${spacingPx(1.25)} ${spacingPx(2.5)}`,
        };
      case 'xl':
        return {
          minHeight: 72,
          fontSize: '1.25rem',
          // Base: 6px 12px padding, scales with density
          padding: `${spacingPx(1.5)} ${spacingPx(3)}`,
        };
      default:
        return {
          minHeight: 56,
          fontSize: '1rem',
          // Base: 4px 8px padding, scales with density
          padding: `${spacingPx(1)} ${spacingPx(2)}`,
        };
    }
  };

  const getColorStyles = () => {
    if (color === 'default') {
      return {
        backgroundColor: transparent ? 'transparent' : theme.palette.background.paper,
        color: theme.palette.text.primary,
      };
    }
    return {
      backgroundColor: transparent ? 'transparent' : theme.palette[color].main,
      color: theme.palette[color].contrastText,
    };
  };

  const getVariantStyles = () => {
    const baseStyles = {
      transition: theme.transitions.create(['all'], {
        duration: theme.transitions.duration.standard,
      }),
      ...getSizeStyles(),
      ...getColorStyles(),
    };

    const glowStyles = glow
      ? {
        boxShadow: `0 0 20px ${alpha(
          color === 'default' ? theme.palette.primary.main : theme.palette[color].main,
          0.4,
        )}`,
      }
      : {};

    const pulseStyles = pulse
      ? {
        animation: 'pulse 2s infinite',
        '@keyframes pulse': {
          '0%': { opacity: 1 },
          '50%': { opacity: 0.8 },
          '100%': { opacity: 1 },
        },
      }
      : {};

    const blurStyles = blur
      ? {
        backdropFilter: 'blur(10px)',
      }
      : {};

    switch (variant) {
      case 'glass':
        return {
          ...baseStyles,
          ...glowStyles,
          ...pulseStyles,
          backgroundColor: alpha(theme.palette.background.paper, glass ? 0.1 : 0.8),
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        };

      case 'gradient': {
        const gradientColor = color === 'default' ? 'primary' : color;
        return {
          ...baseStyles,
          ...glowStyles,
          ...pulseStyles,
          background: gradient
            ? `linear-gradient(135deg, ${theme.palette[gradientColor].light}, ${theme.palette[gradientColor].dark})`
            : theme.palette[gradientColor].main,
          color: theme.palette[gradientColor].contrastText,
        };
      }

      case 'elevated':
        return {
          ...baseStyles,
          ...glowStyles,
          ...pulseStyles,
          ...blurStyles,
          boxShadow: theme.shadows[elevation],
        };

      case 'minimal':
        return {
          ...baseStyles,
          ...glowStyles,
          ...pulseStyles,
          ...blurStyles,
          boxShadow: 'none',
          borderBottom: 'none',
        };

      case 'bordered':
        return {
          ...baseStyles,
          ...glowStyles,
          ...pulseStyles,
          ...blurStyles,
          borderBottom: `2px solid ${
            color === 'default' ? theme.palette.divider : theme.palette[color].main
          }`,
        };

      default:
        return {
          ...baseStyles,
          ...glowStyles,
          ...pulseStyles,
          ...blurStyles,
        };
    }
  };

  const renderMenubarItem = (item: MenubarItem) => {
    if (item.divider) {
      return <MenubarSeparator key={item.id} orientation={orientation} />;
    }

    const hasChildren = item.children && item.children.length > 0;

    return (
      <Box key={item.id}>
        <Button
          data-testid={`menubar-button-${item.id}`}
          onClick={(e) => {
            if (hasChildren) {
              handleMenuOpen(item.id, e.currentTarget);
            } else {
              handleItemClick(item);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              if (hasChildren) {
                handleMenuOpen(item.id, e.currentTarget);
              } else {
                handleItemClick(item);
              }
            }
          }}
          onMouseDown={(e) => {
            // Prevent default to maintain focus
            e.preventDefault();
          }}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={item.disabled || disabled}
          startIcon={item.icon}
          endIcon={hasChildren ? <KeyboardArrowDownIcon /> : null}
          aria-haspopup={hasChildren ? 'menu' : undefined}
          aria-expanded={hasChildren ? activeMenu === item.id : undefined}
          sx={{
            color: 'inherit',
            textTransform: 'none',
            ...getSizeStyles(),
          }}
        >
          {item.label}
        </Button>

        {hasChildren && (
          <Menu
            anchorEl={menuRefs.current[item.id]}
            open={activeMenu === item.id}
            onClose={handleMenuClose}
            autoFocus
            PaperProps={{
              sx: {
                minWidth: 200,
                mt: 1,
              },
            }}
          >
            {item.children?.map((child) =>
              child.divider ? (
                <Divider key={child.id} />
              ) : (
                <MenuItem
                  key={child.id}
                  onClick={() => handleItemClick(child)}
                  disabled={child.disabled}
                >
                  {child.icon && <ListItemIcon>{child.icon}</ListItemIcon>}
                  <ListItemText>{child.label}</ListItemText>
                  {child.shortcut && (
                    <Chip
                      label={child.shortcut}
                      size="small"
                      variant="outlined"
                      sx={{ ml: 2, height: 20, fontSize: '0.7rem' }}
                    />
                  )}
                </MenuItem>
              ),
            )}
          </Menu>
        )}
      </Box>
    );
  };

  const content = (
    <Toolbar
      role="toolbar"
      aria-label="Main navigation"
      sx={{
        ...getVariantStyles(),
        width: fullWidth ? '100%' : 'auto',
        flexDirection: orientation === 'vertical' ? 'column' : 'row',
        alignItems: orientation === 'vertical' ? 'flex-start' : 'center',
        // Base: 4px gap, scales with density
        gap: spacing(1),
      }}
    >
      {/* Base: 8px margin-right, scales with density */}
      {logo && <Box sx={{ mr: spacing(2), display: 'flex', alignItems: 'center' }}>{logo}</Box>}

      {loading ? (
        <CircularProgress size={20} color="inherit" />
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: orientation === 'vertical' ? 'column' : 'row',
            // Base: 2px/4px gap, scales with density
            gap: orientation === 'vertical' ? spacing(0.5) : spacing(1),
            flex: 1,
          }}
        >
          {items.map(renderMenubarItem)}
        </Box>
      )}

      {endContent && <Box sx={{ ml: 'auto' }}>{endContent}</Box>}
    </Toolbar>
  );

  if (orientation === 'vertical') {
    return (
      <Box
        className={className}
        sx={{
          ...style,
          position: sticky ? 'sticky' : 'relative',
          top: sticky ? 0 : 'auto',
          zIndex: theme.zIndex.appBar,
        }}
      >
        {content}
      </Box>
    );
  }

  return (
    <AppBar
      position={sticky ? 'sticky' : 'static'}
      className={className}
      data-testid={dataTestId}
      sx={{
        ...getVariantStyles(),
        ...style,
      }}
      elevation={0}
      component="header"
    >
      {content}
    </AppBar>
  );
};

export const MenubarGroup: React.FC<MenubarGroupProps> = ({
  label,
  items,
  icon,
  disabled,
  open,
  onOpenChange,
  onClick,
  className,
  style,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = open !== undefined ? open : Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    onOpenChange?.(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    onOpenChange?.(false);
  };

  const handleItemClick = (item: MenubarItem) => {
    if (item.action) {
      item.action();
    }
    onClick?.(item);
    handleClose();
  };

  return (
    <>
      <Button
        onClick={handleClick}
        disabled={disabled}
        startIcon={icon}
        endIcon={<KeyboardArrowDownIcon />}
        className={className}
        sx={style}
      >
        {label}
      </Button>
      <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose}>
        {items.map((item) =>
          item.divider ? (
            <Divider key={item.id} />
          ) : (
            <MenuItem key={item.id} onClick={() => handleItemClick(item)} disabled={item.disabled}>
              {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
              <ListItemText>{item.label}</ListItemText>
              {item.shortcut && (
                <Typography variant="caption" sx={{ ml: 2 }}>
                  {item.shortcut}
                </Typography>
              )}
            </MenuItem>
          ),
        )}
      </Menu>
    </>
  );
};

export const MenubarSeparator: React.FC<MenubarSeparatorProps> = ({
  orientation = 'horizontal',
  className,
  style,
}) => (
  <Divider
    orientation={orientation === 'horizontal' ? 'vertical' : 'horizontal'}
    flexItem
    className={className}
    sx={{
      mx: orientation === 'horizontal' ? 1 : 0,
      my: orientation === 'vertical' ? 1 : 0,
      ...style,
    }}
  />
);
