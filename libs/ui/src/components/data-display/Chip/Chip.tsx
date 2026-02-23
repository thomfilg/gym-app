import Avatar from '@mui/material/Avatar';
import MuiChip from '@mui/material/Chip';
import CancelIcon from '@mui/icons-material/Cancel';
import type { KeyboardEvent, ReactElement } from 'react';
import React, { forwardRef } from 'react';

import { createDensityConfig } from '../../../utils/density/types';
import { useDensity } from '../../../utils/density/useDensity';
import type { ChipProps, ChipSize } from './Chip.types';

// Density-based style configurations for Chip
interface ChipDensityConfig {
  heightXs: string;
  heightSm: string;
  heightMd: string;
  heightLg: string;
  fontSizeXs: string;
  fontSizeSm: string;
  fontSizeMd: string;
  fontSizeLg: string;
  paddingXs: string;
  paddingSm: string;
  paddingMd: string;
  paddingLg: string;
}

const CHIP_DENSITY_CONFIG = createDensityConfig<ChipDensityConfig>({
  compact: {
    heightXs: '16px',
    heightSm: '22px',
    heightMd: '26px',
    heightLg: '32px',
    fontSizeXs: '0.5625rem',
    fontSizeSm: '0.6875rem',
    fontSizeMd: '0.75rem',
    fontSizeLg: '0.875rem',
    paddingXs: '0 4px',
    paddingSm: '0 6px',
    paddingMd: '0 8px',
    paddingLg: '0 10px',
  },
  normal: {
    heightXs: '18px',
    heightSm: '24px',
    heightMd: '32px',
    heightLg: '36px',
    fontSizeXs: '0.625rem',
    fontSizeSm: '0.75rem',
    fontSizeMd: '0.8125rem',
    fontSizeLg: '0.9375rem',
    paddingXs: '0 6px',
    paddingSm: '0 8px',
    paddingMd: '0 12px',
    paddingLg: '0 14px',
  },
  spacious: {
    heightXs: '20px',
    heightSm: '28px',
    heightMd: '36px',
    heightLg: '42px',
    fontSizeXs: '0.6875rem',
    fontSizeSm: '0.8125rem',
    fontSizeMd: '0.875rem',
    fontSizeLg: '1rem',
    paddingXs: '0 8px',
    paddingSm: '0 10px',
    paddingMd: '0 14px',
    paddingLg: '0 18px',
  },
});

// Helper to get density-based style for a given size
const getDensityStyle = (
  config: ChipDensityConfig,
  size: ChipSize,
) => {
  // Normalize size to standard terminology
  const normalizedSize = size === 'small' ? 'sm' : size === 'medium' ? 'md' : size;

  const sizeMap = {
    xs: { height: config.heightXs, fontSize: config.fontSizeXs, padding: config.paddingXs },
    sm: { height: config.heightSm, fontSize: config.fontSizeSm, padding: config.paddingSm },
    md: { height: config.heightMd, fontSize: config.fontSizeMd, padding: config.paddingMd },
    lg: { height: config.heightLg, fontSize: config.fontSizeLg, padding: config.paddingLg },
  };

  return sizeMap[normalizedSize as 'xs' | 'sm' | 'md' | 'lg'] || sizeMap.md;
};

export const Chip = forwardRef<HTMLDivElement, ChipProps>(({
  label,
  variant = 'filled',
  size = 'md',
  color = 'primary',
  avatarSrc,
  avatar,
  icon,
  selected,
  selectable,
  deletable,
  disabled,
  onClick,
  onDelete,
  className,
  dataTestId,
  density: densityProp,
  ...props
}, ref) => {
  // Use context density by default, allow prop override
  const { mode: contextDensity } = useDensity();
  const density = densityProp ?? contextDensity;
  const densityConfig = CHIP_DENSITY_CONFIG[density];
  const handleKeyDown = (event: KeyboardEvent) => {
    if (disabled) return;

    // Handle delete/backspace keys for deletion
    if ((event.key === 'Delete' || event.key === 'Backspace') && deletable && onDelete) {
      event.preventDefault();
      onDelete();
      return;
    }

    // Handle enter/space for selection
    if ((event.key === 'Enter' || event.key === ' ') && (onClick || selectable)) {
      event.preventDefault();
      onClick?.();
    }
  };

  const getAvatarComponent = (): ReactElement | undefined => {
    if (avatar && React.isValidElement(avatar)) {
      return avatar;
    }
    if (avatarSrc) {
      return <Avatar src={avatarSrc} sx={{ width: 24, height: 24 }} />;
    }
    return undefined;
  };

  // Determine the role based on context
  const role = selectable ? 'option' : (onClick ? 'button' : undefined);

  // Determine if clickable
  const clickable = !disabled && (!!onClick || selectable);

  // Enhance icon with test ID if present
  const enhancedIcon = icon && React.isValidElement(icon)
    ? React.cloneElement(icon as ReactElement, {
      'data-testid': dataTestId ? `${dataTestId}-icon` : 'chip-icon',
    } as Record<string, unknown>)
    : undefined;

  // Wrap label with test ID
  const enhancedLabel = (
    <span data-testid={dataTestId ? `${dataTestId}-label` : 'chip-label'}>
      {label}
    </span>
  );

  // Custom delete icon with test ID
  const enhancedDeleteIcon = deletable ? (
    <CancelIcon data-testid={dataTestId ? `${dataTestId}-delete` : 'chip-delete'} />
  ) : undefined;

  // Normalize size to standard terminology (sm = small, md = medium for backwards compatibility)
  const normalizedSize = size === 'small' ? 'sm' : size === 'medium' ? 'md' : size;
  // MUI only supports 'small' | 'medium', so map our sizes to MUI sizes
  const muiSize = normalizedSize === 'xs' || normalizedSize === 'sm' ? 'small' : 'medium';

  // Get density-aware styles for the current size
  const densityStyle = getDensityStyle(densityConfig, size);

  return (
    <MuiChip
      ref={ref}
      label={enhancedLabel}
      variant={variant}
      size={muiSize}
      color={color as 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default' | undefined}
      avatar={getAvatarComponent()}
      icon={enhancedIcon}
      onDelete={deletable ? onDelete : undefined}
      deleteIcon={enhancedDeleteIcon}
      disabled={disabled}
      clickable={clickable}
      onClick={clickable ? onClick : undefined}
      onKeyDown={handleKeyDown}
      className={className}
      role={role}
      aria-selected={selectable ? selected : undefined}
      data-testid={dataTestId || 'chip'}
      sx={{
        // Apply density-based sizing for all sizes
        height: densityStyle.height,
        fontSize: densityStyle.fontSize,
        fontWeight: normalizedSize === 'xs' ? 500 : undefined,
        '& .MuiChip-label': {
          padding: densityStyle.padding,
        },
        // Enhanced styling for outlined variant
        ...(variant === 'outlined' && {
          borderWidth: '1px',
          borderStyle: 'solid',
          backgroundColor: 'transparent',
        }),
        ...(selected && {
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.16)'
              : 'rgba(0, 0, 0, 0.08)',
        }),
        '&:hover': {
          ...(clickable && !disabled && {
            transform: 'translateY(-1px)',
            boxShadow: (theme) =>
              theme.palette.mode === 'dark'
                ? '0 4px 12px rgba(0, 0, 0, 0.3)'
                : '0 4px 12px rgba(0, 0, 0, 0.15)',
          }),
        },
        '&:active': {
          ...(clickable && !disabled && {
            transform: 'translateY(0px)',
          }),
        },
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      {...props}
    />
  );
});

Chip.displayName = 'Chip';