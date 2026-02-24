import Box from '@mui/material/Box';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Fade from '@mui/material/Fade';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { alpha, useTheme } from '@mui/material/styles';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Home from '@mui/icons-material/Home';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import NavigateNext from '@mui/icons-material/NavigateNext';
import { keyframes,styled } from '@mui/material/styles';
import React from 'react';

import { useDensitySpacing } from '../../../utils/density';
import type { BreadcrumbItem, BreadcrumbsProps } from './Breadcrumbs.types';

// Base padding values in spacing units (4px base)
// These will be scaled by the density multiplier
const basePaddingSizes = {
  sm: { py: 0.75, px: 2 }, // 3px 8px at normal density
  md: { py: 1, px: 2 }, // 4px 8px at normal density
  lg: { py: 1.5, px: 2 }, // 6px 8px at normal density
};

// Base separator margin in spacing units
const separatorMargins = {
  sm: 0.5, // 2px at normal density
  md: 1, // 4px at normal density
  lg: 1.5, // 6px at normal density
};

// Base link padding in spacing units
const linkPaddings = {
  py: 0.5, // 2px at normal density
  px: 0.75, // 3px at normal density
};

// Font sizes remain constant (not affected by density)
const fontSizes = {
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
};

// Animation keyframes
const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(99, 102, 241, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
  }
`;

const StyledBreadcrumbs = styled(MuiBreadcrumbs, {
  shouldForwardProp: (prop) =>
    prop !== 'size' && prop !== 'color' && prop !== 'visualStyle' && prop !== 'elevation',
})<{ size?: string; color?: string; visualStyle?: string; elevation?: number }>(
  ({ theme, size, color, visualStyle, elevation = 0 }) => ({
    padding: theme.spacing(size === 'sm' ? 0.75 : size === 'lg' ? 1.5 : 1, 2),
    borderRadius: theme.spacing(visualStyle === 'glass' ? 2 : 1),
    animation: `${slideIn} 0.3s ease-out`,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',

    // Glass morphism effect
    ...(visualStyle === 'glass' && {
      background:
        theme.palette.mode === 'dark' ? 'rgba(17, 24, 39, 0.7)' : 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: `1px solid ${
        theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
      }`,
      boxShadow:
        theme.palette.mode === 'dark'
          ? `0 ${elevation * 4}px ${elevation * 8}px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)`
          : `0 ${elevation * 4}px ${elevation * 8}px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)`,
    }),

    // Elevated variant
    ...(visualStyle === 'elevated' && {
      background: theme.palette.background.paper,
      boxShadow: theme.shadows[elevation] || theme.shadows[1],
      borderRadius: theme.spacing(1.5),
    }),

    // Outlined variant
    ...(visualStyle === 'outlined' && {
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.spacing(1),
    }),

    '& .MuiBreadcrumbs-ol': {
      alignItems: 'center',
      flexWrap: 'nowrap',
      [theme.breakpoints.down('sm')]: {
        flexWrap: 'wrap',
        gap: theme.spacing(0.5),
      },
    },

    '& .MuiBreadcrumbs-separator': {
      marginLeft: theme.spacing(size === 'sm' ? 0.5 : size === 'lg' ? 1.5 : 1),
      marginRight: theme.spacing(size === 'sm' ? 0.5 : size === 'lg' ? 1.5 : 1),
      opacity: 0.6,
      transition: 'all 0.2s ease',
      ...(color === 'primary' && {
        color: theme.palette.primary.main,
      }),
      ...(color === 'secondary' && {
        color: theme.palette.secondary.main,
      }),
    },

    '&:hover': {
      ...(visualStyle === 'glass' && {
        background:
          theme.palette.mode === 'dark' ? 'rgba(17, 24, 39, 0.85)' : 'rgba(255, 255, 255, 0.85)',
        boxShadow:
          theme.palette.mode === 'dark'
            ? `0 ${elevation * 6}px ${elevation * 12}px rgba(0, 0, 0, 0.4)`
            : `0 ${elevation * 6}px ${elevation * 12}px rgba(0, 0, 0, 0.12)`,
      }),
    },
  }),
);

const BreadcrumbLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'size' && prop !== 'active' && prop !== 'visualStyle',
})<{ size?: string; active?: boolean; visualStyle?: string }>(
  ({ theme, size, active, visualStyle }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
    textDecoration: 'none',
    fontSize: size === 'sm' ? '0.875rem' : size === 'lg' ? '1.125rem' : '1rem',
    fontWeight: active ? 600 : 400,
    color: active ? theme.palette.text.primary : theme.palette.text.secondary,
    padding: theme.spacing(0.5, 0.75),
    borderRadius: theme.spacing(0.75),
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

    // Add subtle background for glass variant
    ...(visualStyle === 'glass' &&
      !active && {
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
        opacity: 0,
        transition: 'opacity 0.3s ease',
        borderRadius: 'inherit',
      },
    }),

    '&:hover, &[data-hover="true"]': {
      color: theme.palette.primary.main,
      backgroundColor: alpha(theme.palette.primary.main, visualStyle === 'glass' ? 0.1 : 0.08),
      transform: 'translateY(-1px)',

      '&::before': {
        opacity: 1,
      },

      '& .breadcrumb-icon': {
        transform: 'scale(1.1)',
      },
    },

    '&:active': {
      transform: 'translateY(0)',
      backgroundColor: alpha(theme.palette.primary.main, 0.12),
    },

    '&:focus-visible': {
      outline: `2px solid ${theme.palette.primary.main}`,
      outlineOffset: 2,
      backgroundColor: alpha(theme.palette.primary.main, 0.04),
    },

    ...(active && {
      pointerEvents: 'none',
      cursor: 'default',
      color: theme.palette.primary.main,
      fontWeight: 600,

      ...(visualStyle === 'glass' && {
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
        animation: `${pulse} 2s infinite`,
      }),
    }),

    '& .breadcrumb-icon': {
      transition: 'transform 0.2s ease',
    },

    // Mobile responsiveness
    [theme.breakpoints.down('sm')]: {
      fontSize: size === 'lg' ? '1rem' : size === 'sm' ? '0.75rem' : '0.875rem',
      padding: theme.spacing(0.375, 0.5),
    },
  }),
);

const BreadcrumbText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'size' && prop !== 'visualStyle',
})<{ size?: string; visualStyle?: string }>(({ theme, size, visualStyle }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  fontSize: size === 'sm' ? '0.875rem' : size === 'lg' ? '1.125rem' : '1rem',
  fontWeight: 600,
  color: theme.palette.primary.main,
  padding: theme.spacing(0.5, 0.75),
  borderRadius: theme.spacing(0.75),
  position: 'relative',

  ...(visualStyle === 'glass' && {
    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
    backdropFilter: 'blur(4px)',
    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  }),

  '& .breadcrumb-icon': {
    color: theme.palette.primary.main,
  },

  // Mobile responsiveness
  [theme.breakpoints.down('sm')]: {
    fontSize: size === 'lg' ? '1rem' : size === 'sm' ? '0.75rem' : '0.875rem',
    padding: theme.spacing(0.375, 0.5),
  },
}));

// Animated separator wrapper
const AnimatedSeparator = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  opacity: 0.6,
  transition: 'all 0.2s ease',

  '&:hover': {
    opacity: 1,
    transform: 'scale(1.1)',
  },
}));

const getSeparator = (separatorType: string) => {
  const separatorContent = (() => {
    switch (separatorType) {
      case 'slash':
        return '/';
      case 'arrow':
        return <NavigateNext fontSize="small" />;
      case 'chevron':
        return <ChevronRight fontSize="small" />;
      case 'dot':
        return '•';
      case 'pipe':
        return '|';
      default:
        return <ArrowForwardIos sx={{ fontSize: 12 }} />;
    }
  })();

  return <AnimatedSeparator>{separatorContent}</AnimatedSeparator>;
};

const sizeIconMap = {
  sm: 'small' as const,
  md: 'small' as const,
  lg: 'medium' as const,
};

// Mobile collapsed menu component
const CollapsedMenu = ({
  items,
  size,
  visualStyle,
  dataTestId,
}: {
  items: BreadcrumbItem[];
  size: string;
  visualStyle?: string;
  dataTestId?: string;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Show more" arrow>
        <BreadcrumbLink
          onClick={handleClick}
          size={size}
          visualStyle={visualStyle}
          sx={{ cursor: 'pointer' }}
          data-testid={dataTestId ? `${dataTestId}-collapsed-menu` : 'breadcrumbs-collapsed-menu'}
        >
          <MoreHoriz className="breadcrumb-icon" />
        </BreadcrumbLink>
      </Tooltip>
      <Box
        sx={{
          position: 'absolute',
          top: '100%',
          left: 0,
          mt: 1,
          display: open ? 'block' : 'none',
          zIndex: 1000,
        }}
        data-testid={dataTestId ? `${dataTestId}-collapsed-menu-items` : 'breadcrumbs-collapsed-menu-items'}
      >
        <Fade in={open}>
          <Box
            sx={{
              background: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(17, 24, 39, 0.95)'
                  : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: 1,
              boxShadow: 3,
              p: 1,
              minWidth: 150,
            }}
          >
            {items.map((item, index) => (
              <Box
                key={index}
                component="a"
                href={item.href || '#'}
                onClick={(e) => {
                  handleClose();
                  item.onClick?.(e);
                }}
                sx={{
                  display: 'block',
                  px: 2,
                  py: 1,
                  color: 'text.secondary',
                  textDecoration: 'none',
                  borderRadius: 0.5,
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                    color: 'primary.main',
                  },
                }}
                data-testid={dataTestId ? `${dataTestId}-collapsed-item-${index}` : `breadcrumbs-collapsed-item-${index}`}
              >
                {item.label}
              </Box>
            ))}
          </Box>
        </Fade>
      </Box>
    </>
  );
};

export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  (
    {
      variant = 'default',
      separatorType = 'default',
      items,
      separator,
      maxItems = 8,
      showHomeIcon = true,
      size = 'md',
      color = 'default',
      elevation = 1,
      collapseBehavior = 'menu',
      mobileMaxItems = 3,
      ariaLabel,
      dataTestId,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme();
    const { spacingPx } = useDensitySpacing();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const finalSeparator = separator || getSeparator(separatorType);
    const iconSize = sizeIconMap[size];

    // Handle mobile collapsing
    const effectiveMaxItems = isMobile ? mobileMaxItems : maxItems;
    const shouldCollapse = items.length > effectiveMaxItems;

    let displayItems: (BreadcrumbItem & { isEllipsis?: boolean })[] = items;
    let collapsedItems: typeof items = [];

    if (shouldCollapse && collapseBehavior === 'menu') {
      const firstItem = items[0];
      const lastItems = items.slice(-(effectiveMaxItems - 2));
      collapsedItems = items.slice(1, -(effectiveMaxItems - 2));
      displayItems = firstItem ? [firstItem, ...lastItems] : lastItems;
    } else if (shouldCollapse && collapseBehavior === 'ellipsis') {
      displayItems = [
        ...items.slice(0, Math.floor(effectiveMaxItems / 2)),
        { label: '...', href: '#', isEllipsis: true },
        ...items.slice(-Math.floor(effectiveMaxItems / 2)),
      ];
    }

    // Calculate density-aware padding for breadcrumbs container
    const sizeConfig = basePaddingSizes[size];
    const separatorMargin = separatorMargins[size];
    const densityContainerStyles = {
      padding: `${spacingPx(sizeConfig.py)} ${spacingPx(sizeConfig.px)}`,
      '& .MuiBreadcrumbs-separator': {
        marginLeft: spacingPx(separatorMargin),
        marginRight: spacingPx(separatorMargin),
      },
    };

    // Density-aware link padding
    const densityLinkStyles = {
      padding: `${spacingPx(linkPaddings.py)} ${spacingPx(linkPaddings.px)}`,
      fontSize: fontSizes[size],
    };

    return (
      <StyledBreadcrumbs
        ref={ref}
        separator={finalSeparator}
        maxItems={shouldCollapse ? undefined : effectiveMaxItems}
        size={size}
        color={color}
        visualStyle={variant}
        elevation={elevation}
        aria-label={ariaLabel || 'breadcrumb navigation'}
        role="navigation"
        data-testid={dataTestId || 'breadcrumbs'}
        sx={densityContainerStyles}
        {...props}
      >
        {displayItems.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === displayItems.length - 1;
          const isActive = item.active || (isLast && !item.isEllipsis);
          const isEllipsis = item.isEllipsis;

          // Handle collapsed menu after first item
          if (index === 1 && collapsedItems.length > 0 && collapseBehavior === 'menu') {
            return (
              <React.Fragment key="collapsed">
                <CollapsedMenu items={collapsedItems} size={size} visualStyle={variant} dataTestId={dataTestId} />
                {finalSeparator}
              </React.Fragment>
            );
          }

          // Handle ellipsis
          if (isEllipsis) {
            return (
              <Tooltip key={index} title="More items" arrow>
                <Box
                  sx={{
                    px: 1,
                    color: 'text.disabled',
                    cursor: 'default',
                    userSelect: 'none',
                  }}
                  data-testid={dataTestId ? `${dataTestId}-ellipsis` : 'breadcrumbs-ellipsis'}
                >
                  {item.label}
                </Box>
              </Tooltip>
            );
          }

          const icon =
            isFirst && showHomeIcon && !item.icon ? (
              <Home className="breadcrumb-icon" fontSize={iconSize} />
            ) : item.icon ? (
              <Box
                component="span"
                className="breadcrumb-icon"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                {item.icon}
              </Box>
            ) : null;

          // Render active/last item
          if (isActive) {
            return (
              <BreadcrumbText
                key={index}
                size={size}
                visualStyle={variant}
                aria-current="page"
                data-testid={dataTestId ? `${dataTestId}-item-${index}` : `breadcrumbs-item-${index}`}
                sx={densityLinkStyles}
              >
                {icon}
                <span>{item.label}</span>
              </BreadcrumbText>
            );
          }

          // Render clickable breadcrumb
          return (
            <Tooltip
              key={index}
              title={item.tooltip || item.label}
              arrow
              disableHoverListener={!item.tooltip}
            >
              <BreadcrumbLink
                href={item.href || '#'}
                onClick={item.onClick}
                size={size}
                visualStyle={variant}
                active={isActive}
                underline="none"
                aria-label={item.ariaLabel || item.label}
                data-testid={dataTestId ? `${dataTestId}-link-${index}` : `breadcrumbs-link-${index}`}
                sx={densityLinkStyles}
              >
                {icon}
                <span>{item.label}</span>
              </BreadcrumbLink>
            </Tooltip>
          );
        })}
      </StyledBreadcrumbs>
    );
  },
);

Breadcrumbs.displayName = 'Breadcrumbs';
