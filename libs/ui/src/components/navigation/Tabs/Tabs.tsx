import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';
import MuiTab from '@mui/material/Tab';
import MuiTabs from '@mui/material/Tabs';
import { alpha } from '@mui/material/styles';
import Close from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import React from 'react';

import { useDensitySpacing } from '../../../utils/density';
import type { TabItem, TabPanelProps, TabsProps } from './Tabs.types';

// Base padding values in spacing units (4px base)
// These will be scaled by the density multiplier
const basePaddingSizes = {
  sm: { py: 0.5, px: 1.5 }, // 2px 6px at normal density
  md: { py: 1, px: 2 }, // 4px 8px at normal density
  lg: { py: 1.5, px: 3 }, // 6px 12px at normal density
};

// Min heights remain constant (not affected by density)
const minHeights = {
  sm: 32,
  md: 48, // MUI default
  lg: 56,
};

// Font sizes remain constant (not affected by density)
const fontSizes = {
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
};

const StyledTabs = styled(MuiTabs, {
  shouldForwardProp: (prop) => !['customVariant', 'size', 'showDividers'].includes(prop as string),
})<{ customVariant?: string; size?: string; showDividers?: boolean }>(
  ({ theme, customVariant, size, showDividers }) => ({
    position: 'relative',

    // Size variants
    ...(size === 'sm' && {
      minHeight: 32,
      '& .MuiTab-root': {
        fontSize: '0.875rem',
        minHeight: 32,
        padding: theme.spacing(0.5, 1.5),
      },
    }),

    ...(size === 'lg' && {
      minHeight: 56,
      '& .MuiTab-root': {
        fontSize: '1.125rem',
        minHeight: 56,
        padding: theme.spacing(1.5, 3),
      },
    }),

    // Default variant (standard Material-UI style)
    ...(customVariant === 'default' && {
      '& .MuiTabs-indicator': {
        height: 3,
        borderRadius: '3px 3px 0 0',
        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
      },
    }),

    // Pills variant (rounded tabs)
    ...(customVariant === 'pills' && {
      '& .MuiTabs-indicator': {
        display: 'none',
      },
      '& .MuiTab-root': {
        borderRadius: theme.spacing(3),
        margin: theme.spacing(0, 0.5),
        minWidth: 'auto',
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
          transform: 'translateY(-1px)',
        },
        '&.Mui-selected': {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
        },
      },
    }),

    // Underline variant (minimal underline indicator)
    ...(customVariant === 'underline' && {
      '& .MuiTabs-flexContainer': {
        gap: theme.spacing(2),
      },
      '& .MuiTabs-indicator': {
        height: 2,
        backgroundColor: theme.palette.primary.main,
        borderRadius: 1,
      },
      '& .MuiTab-root': {
        textTransform: 'none',
        fontWeight: 500,
        padding: theme.spacing(1, 0),
        minWidth: 'auto',
        '&:hover': {
          color: theme.palette.primary.main,
        },
        '&.Mui-selected': {
          color: theme.palette.primary.main,
          fontWeight: 600,
        },
      },
    }),

    // Enclosed variant (bordered tabs)
    ...(customVariant === 'enclosed' && {
      '& .MuiTabs-indicator': {
        display: 'none',
      },
      '& .MuiTabs-flexContainer': {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
      '& .MuiTab-root': {
        border: `1px solid ${theme.palette.divider}`,
        borderBottom: 'none',
        borderRadius: `${theme.spacing(1)} ${theme.spacing(1)} 0 0`,
        margin: theme.spacing(0, 0.5),
        marginBottom: -1,
        backgroundColor: alpha(theme.palette.action.hover, 0.5),
        '&:hover': {
          backgroundColor: alpha(theme.palette.action.hover, 0.8),
        },
        '&.Mui-selected': {
          backgroundColor: theme.palette.background.paper,
          borderColor: theme.palette.divider,
          borderBottomColor: theme.palette.background.paper,
          zIndex: 1,
        },
      },
    }),

    // Show dividers
    ...(showDividers &&
      customVariant !== 'enclosed' &&
      customVariant !== 'pills' && {
      '& .MuiTab-root:not(:last-child)': {
        borderRight: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
      },
    }),
  }),
);

const TabPanel = styled(Box, {
  shouldForwardProp: (prop) => !['animate', 'persist'].includes(prop as string),
})<{ animate?: boolean; persist?: boolean }>(({ animate, persist }) => ({
  width: '100%',

  ...(animate && {
    transition: 'all 0.3s ease-in-out',
  }),

  ...(persist && {
    '&[hidden]': {
      display: 'none !important',
    },
  }),
}));

const CloseButton = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(0.5),
  padding: theme.spacing(0.25),
  width: 20,
  height: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  borderRadius: '50%',
  color: theme.palette.action.active,
  '&:hover': {
    backgroundColor: alpha(theme.palette.error.main, 0.1),
    color: theme.palette.error.main,
  },
}));

const BadgeWrapper = styled(Badge)(() => ({
  '& .MuiBadge-badge': {
    right: -6,
    top: 4,
    fontSize: '0.75rem',
    minWidth: 16,
    height: 16,
    padding: 0,
  },
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 200,
  color: theme.palette.text.secondary,
}));

const CustomTabPanel: React.FC<TabPanelProps & { dataTestId?: string; index: number }> = ({
  children,
  id,
  value,
  animate = false,
  animationDuration = 300,
  persist = false,
  loading = false,
  loadingComponent,
  className,
  dataTestId,
  index,
  ...props
}) => {
  const isActive = value === id;
  const shouldRender = isActive || persist;

  if (!shouldRender) {
    return null;
  }

  const content = loading
    ? loadingComponent || (
      <LoadingContainer>
        <CircularProgress size={32} />
      </LoadingContainer>
    )
    : children;

  const testId = dataTestId ? `${dataTestId}-panel-${index}` : `tabs-panel-${index}`;

  if (animate) {
    return (
      <Fade in={isActive} timeout={animationDuration}>
        <TabPanel
          role="tabpanel"
          hidden={!isActive}
          id={`tabpanel-${id}`}
          aria-labelledby={`tab-${id}`}
          animate={animate}
          persist={persist}
          className={className}
          data-testid={testId}
          {...props}
        >
          {content}
        </TabPanel>
      </Fade>
    );
  }

  return (
    <TabPanel
      role="tabpanel"
      hidden={!isActive}
      id={`tabpanel-${id}`}
      aria-labelledby={`tab-${id}`}
      animate={animate}
      persist={persist}
      className={className}
      data-testid={testId}
      {...props}
    >
      {content}
    </TabPanel>
  );
};

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      variant = 'default',
      size = 'md',
      items,
      value,
      onChange,
      color = 'primary',
      fullWidth = false,
      orientation = 'horizontal',
      showDividers = false,
      centered = false,
      scrollable = false,
      scrollButtons = 'auto',
      animateContent = false,
      animationDuration = 300,
      persistContent = false,
      onTabClose,
      className,
      disabled = false,
      indicatorColor,
      tabPanelProps,
      loading = false,
      loadingComponent,
      dataTestId,
      ...props
    },
    ref,
  ) => {
    const { spacingPx } = useDensitySpacing();

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      if (!disabled) {
        onChange(event, newValue);
      }
    };

    const handleTabClose = (event: React.MouseEvent | React.KeyboardEvent, tabId: string) => {
      event.stopPropagation();
      onTabClose?.(tabId);
    };

    const renderTabContent = (item: TabItem) => {
      const tabContent = (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {item.icon}
          <span>{item.label}</span>
          {item.closable && (
            <CloseButton
              onClick={(e) => handleTabClose(e, item.id)}
              role="button"
              tabIndex={0}
              aria-label="Close tab"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleTabClose(e, item.id);
                }
              }}
            >
              <Close fontSize="inherit" />
            </CloseButton>
          )}
        </Box>
      );

      if (item.badge !== undefined) {
        return (
          <BadgeWrapper badgeContent={item.badge} color="error">
            {tabContent}
          </BadgeWrapper>
        );
      }

      return tabContent;
    };

    return (
      <Box className={className} ref={ref} data-testid={dataTestId || 'tabs'}>
        <StyledTabs
          {...props}
          value={value}
          onChange={handleChange}
          customVariant={variant}
          size={size}
          showDividers={showDividers}
          orientation={orientation}
          centered={centered}
          data-testid={dataTestId ? `${dataTestId}-list` : 'tabs-list'}
          scrollButtons={
            scrollable
              ? scrollButtons === 'on' || scrollButtons === 'off' || scrollButtons === 'desktop'
                ? 'auto'
                : scrollButtons
              : false
          }
          allowScrollButtonsMobile={scrollable}
          textColor={color}
          indicatorColor={color}
          sx={{
            ...(fullWidth && { width: '100%' }),
            ...(indicatorColor && {
              '& .MuiTabs-indicator': {
                backgroundColor: indicatorColor,
              },
            }),
            ...(disabled && {
              opacity: 0.6,
              pointerEvents: 'none',
            }),
          }}
        >
          {items.map((item, index) => {
            // Calculate density-aware padding for tab size
            const sizeConfig = basePaddingSizes[size];
            const densityStyles = {
              minHeight: minHeights[size],
              fontSize: fontSizes[size],
              padding: `${spacingPx(sizeConfig.py)} ${spacingPx(sizeConfig.px)}`,
            };
            return (
              <MuiTab
                key={item.id}
                value={item.id}
                label={renderTabContent(item)}
                disabled={item.disabled || disabled}
                className={item.className}
                id={`tab-${item.id}`}
                aria-controls={`tabpanel-${item.id}`}
                aria-disabled={item.disabled || disabled}
                data-testid={dataTestId ? `${dataTestId}-tab-${index}` : `tabs-tab-${index}`}
                sx={densityStyles}
              />
            );
          })}
        </StyledTabs>

        {showDividers && variant !== 'enclosed' && <Divider />}

        <Box sx={{ mt: variant === 'enclosed' ? 0 : 2 }}>
          {items.map((item, index) => (
            <CustomTabPanel
              key={item.id}
              id={item.id}
              value={value}
              animate={animateContent}
              animationDuration={animationDuration}
              persist={persistContent}
              loading={loading}
              loadingComponent={loadingComponent}
              className={tabPanelProps?.className}
              dataTestId={dataTestId}
              index={index}
            >
              {item.content}
            </CustomTabPanel>
          ))}
        </Box>
      </Box>
    );
  },
);

Tabs.displayName = 'Tabs';
