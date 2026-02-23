import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import MuiPagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import FirstPage from '@mui/icons-material/FirstPage';
import LastPage from '@mui/icons-material/LastPage';
import NavigateBefore from '@mui/icons-material/NavigateBefore';
import NavigateNext from '@mui/icons-material/NavigateNext';
import type { PaginationRenderItemParams } from '@mui/material/Pagination';
import { styled } from '@mui/material/styles';
import React from 'react';

import { useDensitySpacing } from '../../../utils/density';
import type { PaginationProps } from './Pagination.types';

// Base padding values in spacing units (4px base)
// These will be scaled by the density multiplier
const basePaddingSizes = {
  sm: { py: 0.25, px: 0.5 }, // 1px 2px at normal density
  md: { py: 0.5, px: 1 }, // 2px 4px at normal density
  lg: { py: 1, px: 1.5 }, // 4px 6px at normal density
};

// Base container padding values in spacing units (4px base)
const containerPaddingSizes = {
  pageInfo: { ml: 2 }, // 8px at normal density
  itemsPerPage: { mr: 2 }, // 8px at normal density
  containerGap: 1, // 4px at normal density
};

// Min widths/heights remain constant (not affected by density)
const minSizes = {
  sm: { minWidth: 28, height: 28 },
  md: { minWidth: 36, height: 36 },
  lg: { minWidth: 44, height: 44 },
};

// Font sizes remain constant (not affected by density)
const fontSizes = {
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
};

const StyledPagination = styled(MuiPagination, {
  shouldForwardProp: (prop) => !['customVariant', 'customSize'].includes(prop as string),
})<{ customVariant?: string; customSize?: string }>(({ theme, customVariant, customSize }) => ({
  '& .MuiPagination-ul': {
    gap: customVariant === 'minimal' ? theme.spacing(0.5) : theme.spacing(1),
  },

  '& .MuiPaginationItem-root': {
    transition: 'all 0.2s ease',
    fontWeight: 500,

    ...(customSize === 'sm' && {
      fontSize: '0.875rem',
      minWidth: 28,
      height: 28,
      padding: theme.spacing(0.25, 0.5),
    }),

    ...(customSize === 'lg' && {
      fontSize: '1.125rem',
      minWidth: 44,
      height: 44,
      padding: theme.spacing(1, 1.5),
    }),

    // Default variant (flat design)
    ...(customVariant === 'default' && {
      borderRadius: theme.spacing(1),
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
        transform: 'translateY(-1px)',
        boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.15)}`,
      },
      '&.Mui-selected': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
          transform: 'translateY(-2px)',
        },
      },
    }),

    // Rounded variant
    ...(customVariant === 'rounded' && {
      borderRadius: '50%',
      minWidth: customSize === 'sm' ? 28 : customSize === 'lg' ? 44 : 36,
      width: customSize === 'sm' ? 28 : customSize === 'lg' ? 44 : 36,
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
        transform: 'scale(1.1)',
        boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.2)}`,
      },
      '&.Mui-selected': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        transform: 'scale(1.05)',
        boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
          transform: 'scale(1.15)',
        },
      },
    }),

    // Dots variant (minimal circular dots)
    ...(customVariant === 'dots' && {
      borderRadius: '50%',
      minWidth: customSize === 'sm' ? 8 : customSize === 'lg' ? 12 : 10,
      width: customSize === 'sm' ? 8 : customSize === 'lg' ? 12 : 10,
      height: customSize === 'sm' ? 8 : customSize === 'lg' ? 12 : 10,
      fontSize: 0,
      backgroundColor: alpha(theme.palette.text.secondary, 0.3),
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.5),
        transform: 'scale(1.3)',
      },
      '&.Mui-selected': {
        backgroundColor: theme.palette.primary.main,
        transform: 'scale(1.2)',
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
          transform: 'scale(1.4)',
        },
      },
      '&.MuiPaginationItem-previousNext, &.MuiPaginationItem-firstLast': {
        display: 'none',
      },
    }),

    // Minimal variant (text-only)
    ...(customVariant === 'minimal' && {
      borderRadius: theme.spacing(0.5),
      backgroundColor: 'transparent',
      color: theme.palette.text.secondary,
      padding: theme.spacing(0.5, 1),
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.04),
        color: theme.palette.primary.main,
      },
      '&.Mui-selected': {
        backgroundColor: 'transparent',
        color: theme.palette.primary.main,
        fontWeight: 600,
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: 2,
          backgroundColor: theme.palette.primary.main,
          borderRadius: 1,
        },
      },
    }),
  },

  // Hide ellipsis for dots variant
  ...(customVariant === 'dots' && {
    '& .MuiPaginationItem-ellipsis': {
      display: 'none',
    },
  }),
}));

const PageInfoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginLeft: theme.spacing(2),
}));

const ItemsPerPageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginRight: theme.spacing(2),
}));

const PaginationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
}));

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (
    {
      variant = 'default',
      size = 'md',
      page,
      count,
      onChange,
      boundaryCount = 1,
      siblingCount = 1,
      hideNextButton = false,
      hidePrevButton = false,
      showFirstButton = false,
      showLastButton = false,
      firstIcon = <FirstPage />,
      lastIcon = <LastPage />,
      previousIcon = <NavigateBefore />,
      nextIcon = <NavigateNext />,
      disabled = false,
      color = 'primary',
      showPageInfo = false,
      pageInfoFormat = (page, count) => `Page ${page} of ${count}`,
      showItemsPerPage = false,
      itemsPerPageOptions = [10, 25, 50, 100],
      itemsPerPage = 10,
      onItemsPerPageChange,
      className,
      dataTestId,
      ...props
    },
    ref,
  ) => {
    const { spacingPx } = useDensitySpacing();

    // For dots variant, we show fewer pages
    const adjustedBoundaryCount = variant === 'dots' ? 0 : boundaryCount;
    const adjustedSiblingCount = variant === 'dots' ? 0 : siblingCount;

    const renderItem = (item: PaginationRenderItemParams) => {
      // Determine test ID based on item type
      let itemTestId: string | undefined;
      if (dataTestId) {
        switch (item.type) {
          case 'first':
            itemTestId = `${dataTestId}-first`;
            break;
          case 'last':
            itemTestId = `${dataTestId}-last`;
            break;
          case 'previous':
            itemTestId = `${dataTestId}-prev`;
            break;
          case 'next':
            itemTestId = `${dataTestId}-next`;
            break;
          case 'page':
            itemTestId = `${dataTestId}-page-${item.page}`;
            break;
        }
      } else {
        switch (item.type) {
          case 'first':
            itemTestId = 'pagination-first';
            break;
          case 'last':
            itemTestId = 'pagination-last';
            break;
          case 'previous':
            itemTestId = 'pagination-prev';
            break;
          case 'next':
            itemTestId = 'pagination-next';
            break;
          case 'page':
            itemTestId = `pagination-page-${item.page}`;
            break;
        }
      }

      // Calculate density-aware padding for pagination item size
      const sizeConfig = basePaddingSizes[size];
      const sizeStyles = minSizes[size];
      const densityStyles = {
        ...sizeStyles,
        fontSize: fontSizes[size],
        padding: `${spacingPx(sizeConfig.py)} ${spacingPx(sizeConfig.px)}`,
      };

      // Custom rendering for different variants
      if (variant === 'dots') {
        if (item.type === 'page') {
          return (
            <PaginationItem
              {...item}
              data-testid={itemTestId}
              sx={{
                ...densityStyles,
                '&.MuiPaginationItem-page': {
                  fontSize: 0,
                  overflow: 'hidden',
                  textIndent: '-9999px',
                },
              }}
            />
          );
        }
        return null; // Hide navigation buttons for dots
      }

      // Map custom icons to components
      const iconMap: Record<string, React.ReactElement> = {
        first: firstIcon as React.ReactElement,
        last: lastIcon as React.ReactElement,
        previous: previousIcon as React.ReactElement,
        next: nextIcon as React.ReactElement,
      };

      return (
        <PaginationItem
          {...item}
          data-testid={itemTestId}
          sx={densityStyles}
          components={{
            first: () => iconMap.first || <FirstPage />,
            last: () => iconMap.last || <LastPage />,
            previous: () => iconMap.previous || <NavigateBefore />,
            next: () => iconMap.next || <NavigateNext />,
          }}
        />
      );
    };

    // Density-aware container spacing
    const pageInfoStyles = {
      marginLeft: spacingPx(containerPaddingSizes.pageInfo.ml),
    };
    const itemsPerPageStyles = {
      marginRight: spacingPx(containerPaddingSizes.itemsPerPage.mr),
    };
    const containerGapStyles = {
      gap: spacingPx(containerPaddingSizes.containerGap),
    };

    return (
      <PaginationContainer
        className={className}
        data-testid={dataTestId || 'pagination'}
        sx={containerGapStyles}
      >
        {showItemsPerPage && onItemsPerPageChange && (
          <ItemsPerPageContainer sx={itemsPerPageStyles}>
            <Typography variant="body2" color="text.secondary">
              Show:
            </Typography>
            <FormControl size="small" sx={{ minWidth: 80 }}>
              <Select
                value={itemsPerPage}
                onChange={(e) => onItemsPerPageChange(e.target.value as number)}
                disabled={disabled}
                data-testid={dataTestId ? `${dataTestId}-items-per-page` : 'pagination-items-per-page'}
                sx={{
                  '& .MuiSelect-select': {
                    fontSize: size === 'sm' ? '0.875rem' : size === 'lg' ? '1.125rem' : '1rem',
                    py: size === 'sm' ? 0.5 : size === 'lg' ? 1.5 : 1,
                  },
                }}
              >
                {itemsPerPageOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </ItemsPerPageContainer>
        )}

        <StyledPagination
          ref={ref}
          page={page}
          count={count}
          onChange={onChange}
          customVariant={variant}
          customSize={size}
          variant="outlined"
          size={size === 'sm' ? 'small' : size === 'lg' ? 'large' : 'medium'}
          boundaryCount={adjustedBoundaryCount}
          siblingCount={adjustedSiblingCount}
          hideNextButton={hideNextButton || variant === 'dots'}
          hidePrevButton={hidePrevButton || variant === 'dots'}
          showFirstButton={showFirstButton && variant !== 'dots'}
          showLastButton={showLastButton && variant !== 'dots'}
          disabled={disabled}
          color={color}
          renderItem={renderItem}
          {...props}
        />

        {showPageInfo && (
          <PageInfoContainer sx={pageInfoStyles}>
            <Typography
              variant="body2"
              color="text.secondary"
              fontSize={size === 'sm' ? '0.75rem' : size === 'lg' ? '1rem' : '0.875rem'}
              data-testid={dataTestId ? `${dataTestId}-info` : 'pagination-info'}
            >
              {pageInfoFormat(page, count)}
            </Typography>
          </PageInfoContainer>
        )}
      </PaginationContainer>
    );
  },
);

Pagination.displayName = 'Pagination';
