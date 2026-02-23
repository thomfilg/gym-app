import Box from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import MuiCardActions from '@mui/material/CardActions';
import MuiCardContent from '@mui/material/CardContent';
import MuiCardHeader from '@mui/material/CardHeader';
import MuiCardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress';
import { alpha, keyframes, useTheme } from '@mui/material/styles';
import React from 'react';

import { createDensityConfig, type DensityMode } from '../../../utils/density/types';
import { useDensity } from '../../../utils/density/useDensity';
import type {
  CardActionsProps,
  CardContentProps,
  CardHeaderProps,
  CardMediaProps,
  CardProps,
} from './Card.types';

// Density-based style configurations for Card
interface CardDensityConfig {
  contentPadding: number;
  headerPadding: number;
  actionsPadding: string;
}

const CARD_DENSITY_CONFIG = createDensityConfig<CardDensityConfig>({
  compact: {
    contentPadding: 1,
    headerPadding: 1,
    actionsPadding: '4px 8px',
  },
  normal: {
    contentPadding: 2,
    headerPadding: 2,
    actionsPadding: '8px 16px',
  },
  spacious: {
    contentPadding: 3,
    headerPadding: 3,
    actionsPadding: '12px 24px',
  },
});

// Helper to get density from prop or context
const useCardDensity = (densityProp?: DensityMode): DensityMode => {
  const { mode: contextDensity } = useDensity();
  return densityProp ?? contextDensity;
};

// Define pulse animation
const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 currentColor;
    opacity: 1;
  }
  70% {
    box-shadow: 0 0 0 15px currentColor;
    opacity: 0;
  }
  100% {
    box-shadow: 0 0 0 0 currentColor;
    opacity: 0;
  }
`;

export const Card: React.FC<CardProps> = (props) => {
  const {
    children,
    variant = 'elevated',
    interactive = false,
    glow = false,
    pulse = false,
    borderRadius = 'md',
    loading = false,
    onClick,
    onFocus,
    onBlur,
    sx,
    dataTestId,
    density: densityProp,
    // These props are reserved for future implementation but need to be extracted
    // to prevent them from being passed to the underlying MuiCard
    expandable,
    expanded,
    onExpandToggle,
    entranceAnimation,
    animationDelay,
    skeleton,
    hoverScale,
    ...restProps
  } = props;

  // Void unused props to satisfy linter
  void expandable;
  void expanded;
  void onExpandToggle;
  void entranceAnimation;
  void animationDelay;
  void skeleton;
  void hoverScale;

  const theme = useTheme();
  const density = useCardDensity(densityProp);
  void density; // Density used by child components via context

  const getBorderRadius = () => {
    switch (borderRadius) {
      case 'none':
        return 0;
      case 'sm':
        return theme.spacing(0.5);
      case 'md':
        return theme.spacing(1);
      case 'lg':
        return theme.spacing(2);
      case 'xl':
        return theme.spacing(3);
      case 'full':
        return '50%';
      default:
        return theme.spacing(1);
    }
  };

  const getVariantStyles = () => {
    const baseStyles = {
      borderRadius: getBorderRadius(),
      transition: theme.transitions.create(
        ['box-shadow', 'transform', 'border-color', 'background-color'],
        {
          duration: theme.transitions.duration.standard,
        },
      ),
    };

    const interactiveStyles = interactive
      ? {
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-2px)',
        },
        '&:active': {
          transform: 'translateY(0)',
        },
      }
      : {};

    const glowStyles = glow
      ? {
        boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.3)}`,
        '&:hover': {
          boxShadow: `0 0 30px ${alpha(theme.palette.primary.main, 0.4)}`,
        },
      }
      : {};

    const pulseStyles = pulse
      ? {
        position: 'relative',
        overflow: 'visible',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          borderRadius: 'inherit',
          backgroundColor: theme.palette.primary.main,
          opacity: 0.3,
          animation: `${pulseAnimation} 2s infinite`,
          pointerEvents: 'none',
          zIndex: -1,
        },
      }
      : {};

    switch (variant) {
      case 'elevated':
        return {
          ...baseStyles,
          ...interactiveStyles,
          ...glowStyles,
          ...pulseStyles,
          elevation: 4,
          '&:hover': {
            ...interactiveStyles['&:hover'],
            ...glowStyles['&:hover'],
            elevation: interactive ? 8 : 4,
          },
        };

      case 'outlined':
        return {
          ...baseStyles,
          ...interactiveStyles,
          ...glowStyles,
          ...pulseStyles,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: 'none',
          '&:hover': {
            ...interactiveStyles['&:hover'],
            ...glowStyles['&:hover'],
            borderColor: interactive ? theme.palette.primary.main : theme.palette.divider,
          },
        };

      case 'glass':
        return {
          ...baseStyles,
          ...interactiveStyles,
          ...glowStyles,
          ...pulseStyles,
          backgroundColor: alpha(theme.palette.background.paper, 0.1),
          backdropFilter: 'blur(20px)',
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
          '&:hover': {
            ...interactiveStyles['&:hover'],
            ...glowStyles['&:hover'],
            backgroundColor: interactive
              ? alpha(theme.palette.background.paper, 0.15)
              : alpha(theme.palette.background.paper, 0.1),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
          },
        };

      case 'gradient':
        return {
          ...baseStyles,
          ...interactiveStyles,
          ...glowStyles,
          ...pulseStyles,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          color: theme.palette.primary.contrastText,
          boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
          '&:hover': {
            ...interactiveStyles['&:hover'],
            ...glowStyles['&:hover'],
            background: interactive
              ? `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`
              : `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          },
        };

      case 'neumorphic': {
        const neumorphicBg =
          theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[100];

        return {
          ...baseStyles,
          ...interactiveStyles,
          ...pulseStyles,
          backgroundColor: neumorphicBg,
          boxShadow:
            theme.palette.mode === 'dark'
              ? `8px 8px 16px ${alpha(theme.palette.common.black, 0.3)}, -8px -8px 16px ${alpha(theme.palette.common.white, 0.1)}`
              : `8px 8px 16px ${alpha(theme.palette.grey[400], 0.2)}, -8px -8px 16px ${alpha(theme.palette.common.white, 0.8)}`,
          border: 'none',
          '&:hover': {
            ...interactiveStyles['&:hover'],
            ...glowStyles['&:hover'],
            boxShadow: interactive
              ? theme.palette.mode === 'dark'
                ? `12px 12px 24px ${alpha(theme.palette.common.black, 0.3)}, -12px -12px 24px ${alpha(theme.palette.common.white, 0.1)}`
                : `12px 12px 24px ${alpha(theme.palette.grey[400], 0.3)}, -12px -12px 24px ${alpha(theme.palette.common.white, 0.9)}`
              : theme.palette.mode === 'dark'
                ? `8px 8px 16px ${alpha(theme.palette.common.black, 0.3)}, -8px -8px 16px ${alpha(theme.palette.common.white, 0.1)}`
                : `8px 8px 16px ${alpha(theme.palette.grey[400], 0.2)}, -8px -8px 16px ${alpha(theme.palette.common.white, 0.8)}`,
          },
        };
      }

      case 'section':
        return {
          ...baseStyles,
          ...interactiveStyles,
          ...glowStyles,
          ...pulseStyles,
          backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.02)',
          border: 'none',
          boxShadow: 'none',
          '&:hover': {
            ...interactiveStyles['&:hover'],
            ...glowStyles['&:hover'],
            backgroundColor: interactive
              ? theme.palette.mode === 'dark'
                ? 'rgba(0, 0, 0, 0.25)'
                : 'rgba(0, 0, 0, 0.04)'
              : theme.palette.mode === 'dark'
                ? 'rgba(0, 0, 0, 0.2)'
                : 'rgba(0, 0, 0, 0.02)',
          },
        };

      default:
        return baseStyles;
    }
  };

  return (
    <MuiCard
      data-testid={dataTestId || 'card'}
      onClick={!loading ? onClick : undefined}
      onFocus={!loading ? onFocus : undefined}
      onBlur={!loading ? onBlur : undefined}
      sx={{
        ...getVariantStyles(),
        position: 'relative',
        opacity: loading ? 0.6 : 1,
        pointerEvents: loading ? 'none' : 'auto',
        ...sx,
      }}
      {...restProps}
    >
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {children}
    </MuiCard>
  );
};

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  action,
  avatar,
  children,
  dataTestId,
  density: densityProp,
  ...props
}) => {
  const density = useCardDensity(densityProp);
  const densityConfig = CARD_DENSITY_CONFIG[density];

  if (children) {
    return (
      <Box
        sx={{ p: densityConfig.headerPadding }}
        data-testid={dataTestId || 'card-header'}
      >
        {children}
      </Box>
    );
  }

  return (
    <MuiCardHeader
      data-testid={dataTestId || 'card-header'}
      avatar={avatar}
      action={action}
      title={title}
      subheader={subtitle}
      titleTypographyProps={{
        'data-testid': dataTestId ? `${dataTestId}-title` : 'card-title',
      } as any}
      subheaderTypographyProps={{
        'data-testid': dataTestId ? `${dataTestId}-subtitle` : 'card-subtitle',
      } as any}
      sx={{
        padding: densityConfig.headerPadding,
      }}
      {...props}
    />
  );
};

export const CardContent: React.FC<CardContentProps> = ({
  children,
  dense = false,
  dataTestId,
  density: densityProp,
  ...props
}) => {
  const density = useCardDensity(densityProp);
  const densityConfig = CARD_DENSITY_CONFIG[density];

  // Support backwards compatibility: if dense is explicitly true, use compact padding
  const padding = dense ? 1 : densityConfig.contentPadding;

  return (
    <MuiCardContent
      data-testid={dataTestId || 'card-content'}
      sx={{
        padding,
        '&:last-child': {
          paddingBottom: padding,
        },
      }}
      {...props}
    >
      {children}
    </MuiCardContent>
  );
};

export const CardActions: React.FC<CardActionsProps> = ({
  children,
  disableSpacing = false,
  alignment = 'left',
  dataTestId,
  density: densityProp,
  ...props
}) => {
  const density = useCardDensity(densityProp);
  const densityConfig = CARD_DENSITY_CONFIG[density];

  const getJustifyContent = () => {
    switch (alignment) {
      case 'center':
        return 'center';
      case 'right':
        return 'flex-end';
      case 'space-between':
        return 'space-between';
      default:
        return 'flex-start';
    }
  };

  return (
    <MuiCardActions
      data-testid={dataTestId || 'card-actions'}
      disableSpacing={disableSpacing}
      sx={{
        justifyContent: getJustifyContent(),
        padding: densityConfig.actionsPadding,
      }}
      {...props}
    >
      {children}
    </MuiCardActions>
  );
};

export const CardMedia: React.FC<CardMediaProps> = ({
  component = 'div',
  image,
  title,
  height = 200,
  children,
  dataTestId,
  ...props
}) => (
  <MuiCardMedia
    data-testid={dataTestId || 'card-media'}
    component={component}
    height={height}
    image={image}
    title={title}
    {...props}
  >
    {children}
  </MuiCardMedia>
);
