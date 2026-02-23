import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import React from 'react';

import { useDensitySpacing } from '../../../utils/density';
import type { EmptyStateColor, EmptyStateProps } from './EmptyState.types';

export const EmptyState: React.FC<EmptyStateProps> = React.memo(({
  variant = 'default',
  color = 'default',
  title,
  description,
  illustration,
  primaryAction,
  secondaryAction,
  helpLink,
  onRefresh,
  refreshLabel = 'Refresh',
  onCreate,
  createLabel = 'Create New',
  className,
  dataTestId,
}) => {
  const theme = useTheme();
  const titleId = React.useId();
  const { spacingPx } = useDensitySpacing();

  // Get semantic color palette based on color prop
  const getColorPalette = (colorProp: EmptyStateColor) => {
    switch (colorProp) {
      case 'info':
        return theme.palette.info;
      case 'success':
        return theme.palette.success;
      case 'warning':
        return theme.palette.warning;
      default:
        return null; // default uses text colors
    }
  };

  const colorPalette = getColorPalette(color);

  // Derive colors from palette
  const titleColor = colorPalette?.dark ?? theme.palette.text.primary;
  const descriptionColor = colorPalette?.dark ?? theme.palette.text.secondary;
  const illustrationBgColor = colorPalette?.light ?? 'transparent';
  const illustrationColor = colorPalette?.main ?? theme.palette.text.secondary;
  const buttonColor = color === 'default' ? 'primary' : color;

  // Density-aware spacing values (base values documented in comments)
  // Base padding: 6 units (24px at normal density)
  const containerPadding = spacingPx(6);
  // Base gap: 3 units (12px at normal density)
  const containerGap = spacingPx(3);
  // Base actions margin top: 2 units (8px at normal density)
  const actionsMarginTop = spacingPx(2);
  // Base help link margin top: 1 unit (4px at normal density)
  const helpLinkMarginTop = spacingPx(1);

  return (
    <Box
      role="region"
      aria-labelledby={titleId}
      className={className}
      data-testid={dataTestId || 'empty-state'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: containerPadding,
        minHeight: 200,
        gap: containerGap,
      }}
    >
      {/* Illustration */}
      {illustration && (
        <Box
          data-testid={dataTestId ? `${dataTestId}-icon` : 'empty-state-icon'}
          sx={{
            display: variant === 'minimal' ? 'none' : 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: variant === 'illustrated' ? 240 : 120,
            width: variant === 'illustrated' ? '100%' : 80,
            height: variant === 'illustrated' ? 'auto' : 80,
            borderRadius: variant === 'illustrated' ? 0 : '50%',
            backgroundColor: illustrationBgColor,
            color: illustrationColor,
            opacity: variant === 'minimal' ? 0.6 : 0.9,
          }}
        >
          {illustration}
        </Box>
      )}

      {/* Content */}
      <Stack spacing={2} alignItems="center">
        <Typography
          id={titleId}
          variant="h6"
          component="h3"
          data-testid={dataTestId ? `${dataTestId}-title` : 'empty-state-title'}
          sx={{
            fontWeight: theme.typography.fontWeightMedium,
            color: titleColor,
            maxWidth: 400,
          }}
        >
          {title}
        </Typography>

        {description && (
          <Typography
            variant="body2"
            data-testid={dataTestId ? `${dataTestId}-description` : 'empty-state-description'}
            sx={{
              color: descriptionColor,
              maxWidth: 480,
              lineHeight: 1.6,
            }}
          >
            {description}
          </Typography>
        )}

        {/* Actions */}
        {(variant === 'action' || primaryAction || secondaryAction || onCreate || onRefresh) && (
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems="center"
            sx={{ mt: actionsMarginTop }}
          >
            {primaryAction && (
              <Button
                variant="contained"
                color={buttonColor}
                onClick={primaryAction.onClick}
                data-testid={dataTestId ? `${dataTestId}-primary-action` : 'empty-state-primary-action'}
                sx={{ minWidth: 120 }}
              >
                {primaryAction.label}
              </Button>
            )}

            {onCreate && (
              <Button
                variant="contained"
                color={buttonColor}
                onClick={onCreate}
                startIcon={<AddIcon />}
                data-testid={dataTestId ? `${dataTestId}-create-button` : 'empty-state-create-button'}
                sx={{ minWidth: 120 }}
              >
                {createLabel}
              </Button>
            )}

            {secondaryAction && (
              <Button
                variant="outlined"
                color={buttonColor}
                onClick={secondaryAction.onClick}
                data-testid={dataTestId ? `${dataTestId}-secondary-action` : 'empty-state-secondary-action'}
                sx={{ minWidth: 120 }}
              >
                {secondaryAction.label}
              </Button>
            )}

            {onRefresh && (
              <Button
                variant="outlined"
                color={buttonColor}
                onClick={onRefresh}
                startIcon={<RefreshIcon />}
                data-testid={dataTestId ? `${dataTestId}-refresh-button` : 'empty-state-refresh-button'}
                sx={{ minWidth: 120 }}
              >
                {refreshLabel}
              </Button>
            )}

          </Stack>
        )}

        {/* Help Link */}
        {helpLink && (
          <Link
            href={helpLink.href}
            target={helpLink.external ? '_blank' : undefined}
            rel={helpLink.external ? 'noopener noreferrer' : undefined}
            data-testid={dataTestId ? `${dataTestId}-help-link` : 'empty-state-help-link'}
            sx={{
              mt: helpLinkMarginTop,
              color: colorPalette?.main ?? theme.palette.primary.main,
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {helpLink.label}
            {helpLink.external && ' ↗'}
          </Link>
        )}
      </Stack>
    </Box>
  );
});

EmptyState.displayName = 'EmptyState';

export default EmptyState;
