import Box from '@mui/material/Box';
import { alpha, keyframes, styled } from '@mui/material/styles';
import type { FC } from 'react';

import type { AnimatedIconProps, AnimationSize,AnimationVariant } from './AnimatedIcon.types';

// Animation keyframes
const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const translateAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const glowPulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor;
  }
  50% {
    box-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor;
  }
  100% {
    box-shadow: 0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor;
  }
`;

// New animation keyframes
const bounceAnimation = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
`;

const shakeAnimation = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-4px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(4px);
  }
`;

const flipAnimation = keyframes`
  0% {
    transform: perspective(400px) rotateY(0);
  }
  100% {
    transform: perspective(400px) rotateY(360deg);
  }
`;

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(1.2);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
`;

const fadeInOutAnimation = keyframes`
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
`;

const heartbeatAnimation = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  5% {
    transform: scale(1.25);
  }
  10% {
    transform: scale(1);
  }
  15% {
    transform: scale(1.25);
  }
  20% {
    transform: scale(1);
  }
`;

const wobbleAnimation = keyframes`
  0%, 100% {
    transform: translateX(0) rotate(0deg);
  }
  15% {
    transform: translateX(-10px) rotate(-5deg);
  }
  30% {
    transform: translateX(8px) rotate(3deg);
  }
  45% {
    transform: translateX(-6px) rotate(-3deg);
  }
  60% {
    transform: translateX(4px) rotate(2deg);
  }
  75% {
    transform: translateX(-2px) rotate(-1deg);
  }
`;

const morphAnimation = keyframes`
  0%, 100% {
    border-radius: 50%;
    transform: scale(1);
  }
  25% {
    border-radius: 30%;
    transform: scale(1.1);
  }
  50% {
    border-radius: 20%;
    transform: scale(0.95);
  }
  75% {
    border-radius: 40%;
    transform: scale(1.05);
  }
`;

const swingAnimation = keyframes`
  20% {
    transform: rotate(15deg);
  }
  40% {
    transform: rotate(-10deg);
  }
  60% {
    transform: rotate(5deg);
  }
  80% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  33% {
    transform: translateY(-10px) translateX(-5px);
  }
  66% {
    transform: translateY(5px) translateX(5px);
  }
`;

const jelloAnimation = keyframes`
  0%, 100% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(0.9, 1.1);
  }
  50% {
    transform: scale(1.1, 0.9);
  }
  75% {
    transform: scale(0.95, 1.05);
  }
`;

const rippleAnimation = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
`;

const neonFlickerAnimation = keyframes`
  0%, 100% {
    opacity: 1;
    filter: brightness(1) drop-shadow(0 0 10px currentColor);
  }
  10% {
    opacity: 0.8;
    filter: brightness(0.8) drop-shadow(0 0 5px currentColor);
  }
  20% {
    opacity: 1;
    filter: brightness(1.2) drop-shadow(0 0 15px currentColor);
  }
  30% {
    opacity: 0.9;
    filter: brightness(0.9) drop-shadow(0 0 8px currentColor);
  }
  40% {
    opacity: 1;
    filter: brightness(1.1) drop-shadow(0 0 12px currentColor);
  }
  50% {
    opacity: 0.95;
    filter: brightness(1) drop-shadow(0 0 10px currentColor);
  }
  60% {
    opacity: 0.85;
    filter: brightness(0.85) drop-shadow(0 0 6px currentColor);
  }
  70% {
    opacity: 1;
    filter: brightness(1.15) drop-shadow(0 0 14px currentColor);
  }
  80% {
    opacity: 0.9;
    filter: brightness(0.95) drop-shadow(0 0 9px currentColor);
  }
  90% {
    opacity: 1;
    filter: brightness(1.05) drop-shadow(0 0 11px currentColor);
  }
`;

const breatheAnimation = keyframes`
  0%, 100% {
    transform: scale(1);
    filter: brightness(1);
  }
  50% {
    transform: scale(1.05);
    filter: brightness(1.2);
  }
`;

// Size configurations
const sizeConfigs: Record<AnimationSize, { size: number; fontSize: number }> = {
  sm: { size: 24, fontSize: 20 },
  md: { size: 32, fontSize: 28 },
  lg: { size: 48, fontSize: 44 },
  xl: { size: 64, fontSize: 60 },
};

// Styled components
const AnimationContainer = styled(Box)<{
  $size: number;
  $fontSize: number;
  $animationVariant: AnimationVariant;
  $duration: number;
  $delay: number;
  $loop: boolean;
  $glow: boolean;
  $glass: boolean;
  $glowColor?: string;
  $customColor?: string;
  $metallic?: boolean;
  $gradient?: boolean;
  $shadow?: 'soft' | 'hard' | 'elevated' | 'none';
  $ripple?: boolean;
  $neon?: boolean;
  $holographic?: boolean;
}>(({
  theme,
  $size,
  $fontSize,
  $animationVariant,
  $duration,
  $delay,
  $loop,
  $glow,
  $glass,
  $glowColor,
  $customColor,
  $metallic,
  $gradient,
  $shadow,
  $ripple,
  $neon,
  $holographic,
}) => {
  const getAnimation = () => {
    const iterationCount = $loop ? 'infinite' : '1';
    const animationDelay = $delay > 0 ? `${$delay}s` : '0s';

    switch ($animationVariant) {
      case 'rotate':
        return `${rotateAnimation} ${$duration}s linear ${iterationCount} ${animationDelay}`;
      case 'pulse':
        return `${pulseAnimation} ${$duration}s ease-in-out ${iterationCount} ${animationDelay}`;
      case 'translate':
        return `${translateAnimation} ${$duration}s ease-in-out ${iterationCount} ${animationDelay}`;
      case 'bounce':
        return `${bounceAnimation} ${$duration}s ease-in-out ${iterationCount} ${animationDelay}`;
      case 'shake':
        return `${shakeAnimation} ${$duration}s ease-in-out ${iterationCount} ${animationDelay}`;
      case 'flip':
        return `${flipAnimation} ${$duration}s ease-in-out ${iterationCount} ${animationDelay}`;
      case 'spin':
        return `${spinAnimation} ${$duration}s ease-in-out ${iterationCount} ${animationDelay}`;
      case 'fadeInOut':
        return `${fadeInOutAnimation} ${$duration}s ease-in-out ${iterationCount} ${animationDelay}`;
      case 'heartbeat':
        return `${heartbeatAnimation} ${$duration}s ease-in-out ${iterationCount} ${animationDelay}`;
      case 'wobble':
        return `${wobbleAnimation} ${$duration}s ease-in-out ${iterationCount} ${animationDelay}`;
      case 'morph':
        return `${morphAnimation} ${$duration}s ease-in-out ${iterationCount} ${animationDelay}`;
      case 'swing':
        return `${swingAnimation} ${$duration}s ease-in-out ${iterationCount} ${animationDelay}`;
      case 'float':
        return `${floatAnimation} ${$duration * 2}s ease-in-out ${iterationCount} ${animationDelay}`;
      case 'jello':
        return `${jelloAnimation} ${$duration}s ease-in-out ${iterationCount} ${animationDelay}`;
      case 'neonFlicker':
        return `${neonFlickerAnimation} ${$duration * 2}s ease-in-out ${iterationCount} ${animationDelay}`;
      case 'breathe':
        return `${breatheAnimation} ${$duration * 1.5}s ease-in-out ${iterationCount} ${animationDelay}`;
      default:
        return 'none';
    }
  };

  const getColor = () => {
    if ($customColor) return $customColor;
    return theme.palette.primary.main;
  };

  const getGlowColor = () => {
    if ($glowColor) return $glowColor;
    return getColor();
  };

  const getShadow = () => {
    switch ($shadow) {
      case 'soft':
        return `0 4px 20px ${alpha(theme.palette.common.black, 0.15)}`;
      case 'hard':
        return `4px 4px 0px ${alpha(theme.palette.common.black, 0.25)}`;
      case 'elevated':
        return `0 10px 40px ${alpha(theme.palette.common.black, 0.2)}, 0 2px 10px ${alpha(theme.palette.common.black, 0.1)}`;
      default:
        return 'none';
    }
  };

  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: $size,
    height: $size,
    color: getColor(),
    animation: getAnimation(),
    position: 'relative' as const,
    cursor: 'default',
    borderRadius: '50%',
    transition: 'all 0.3s ease',
    boxShadow: getShadow(),
  };

  const glowStyles = $glow
    ? {
      '&::before': {
        content: '""',
        position: 'absolute' as const,
        inset: -8,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${alpha(getGlowColor(), 0.3)} 0%, transparent 70%)`,
        animation: `${glowPulseAnimation} ${$duration * 1.2}s ease-in-out infinite`,
        zIndex: -1,
      },
      filter: `drop-shadow(0 0 8px ${alpha(getGlowColor(), 0.5)})`,
    }
    : {};

  const glassStyles = $glass
    ? {
      background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.2)}, ${alpha(theme.palette.background.paper, 0.1)})`,
      backdropFilter: 'blur(10px)',
      border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
      boxShadow: `inset 0 1px 1px ${alpha(theme.palette.common.white, 0.3)}, 0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
    }
    : {};

  const metallicStyles = $metallic
    ? {
      background: `linear-gradient(145deg, 
      ${theme.palette.grey[300]} 0%, 
      ${theme.palette.grey[500]} 25%, 
      ${theme.palette.grey[400]} 50%, 
      ${theme.palette.grey[600]} 75%, 
      ${theme.palette.grey[400]} 100%)`,
      backgroundSize: '200% 200%',
      animation: `${getAnimation()}, ${breatheAnimation} 4s ease-in-out infinite`,
      boxShadow: `inset 0 2px 4px ${alpha(theme.palette.common.white, 0.5)}, 
                inset 0 -2px 4px ${alpha(theme.palette.common.black, 0.3)},
                0 4px 8px ${alpha(theme.palette.common.black, 0.2)}`,
    }
    : {};

  const gradientStyles = $gradient
    ? {
      background: `linear-gradient(135deg, 
      ${theme.palette.primary.main} 0%, 
      ${theme.palette.secondary.main} 100%)`,
      backgroundSize: '200% 200%',
      animation: `${getAnimation()}, ${breatheAnimation} 3s ease-in-out infinite`,
    }
    : {};

  const rippleStyles = $ripple
    ? {
      '&::after': {
        content: '""',
        position: 'absolute' as const,
        inset: 0,
        borderRadius: '50%',
        border: `2px solid ${getColor()}`,
        animation: `${rippleAnimation} ${$duration * 1.5}s ease-out infinite`,
      },
    }
    : {};

  const neonStyles = $neon
    ? {
      color: getColor(),
      textShadow: `0 0 10px ${getColor()}, 0 0 20px ${getColor()}, 0 0 30px ${getColor()}`,
      filter: 'brightness(1.2) contrast(1.2)',
      animation: `${getAnimation()}, ${neonFlickerAnimation} 3s ease-in-out infinite`,
    }
    : {};

  const holographicStyles = $holographic
    ? {
      background: `linear-gradient(45deg, 
      ${theme.palette.primary.main} 0%, 
      ${theme.palette.secondary.main} 25%, 
      ${theme.palette.error.main} 50%, 
      ${theme.palette.warning.main} 75%, 
      ${theme.palette.primary.main} 100%)`,
      backgroundSize: '400% 400%',
      animation: `${getAnimation()}, ${floatAnimation} 6s ease-in-out infinite`,
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      filter: 'hue-rotate(0deg)',
      '@keyframes hueRotate': {
        '0%': { filter: 'hue-rotate(0deg)' },
        '100%': { filter: 'hue-rotate(360deg)' },
      },
      '&::before': {
        content: '""',
        position: 'absolute' as const,
        inset: -2,
        borderRadius: '50%',
        background: 'inherit',
        filter: 'blur(10px)',
        opacity: 0.5,
        zIndex: -1,
      },
    }
    : {};

  return {
    ...baseStyles,
    ...glowStyles,
    ...glassStyles,
    ...metallicStyles,
    ...gradientStyles,
    ...rippleStyles,
    ...neonStyles,
    ...holographicStyles,
    '& .MuiSvgIcon-root': {
      fontSize: $fontSize,
      width: $fontSize,
      height: $fontSize,
    },
    '& svg': {
      fontSize: $fontSize,
      width: $fontSize,
      height: $fontSize,
    },
    '&:hover': {
      transform: 'scale(1.05)',
      filter: $neon ? 'brightness(1.4) contrast(1.3)' : undefined,
    },
  };
});

// Main component
export const AnimatedIcon: FC<AnimatedIconProps> = ({
  children,
  variant = 'none',
  size = 'md',
  color,
  duration = 2,
  delay = 0,
  loop = true,
  glow = false,
  glass = false,
  glowColor,
  metallic = false,
  gradient = false,
  shadow = 'none',
  ripple = false,
  neon = false,
  holographic = false,
  className,
  style,
  'aria-label': ariaLabel,
  onClick,
  tabIndex,
  onFocus,
  onBlur,
  dataTestId,
}) => {
  const config = sizeConfigs[size];

  return (
    <AnimationContainer
      $size={config.size}
      $fontSize={config.fontSize}
      $animationVariant={variant}
      $duration={duration}
      $delay={delay}
      $loop={loop}
      $glow={glow}
      $glass={glass}
      $glowColor={glowColor}
      $customColor={color}
      $metallic={metallic}
      $gradient={gradient}
      $shadow={shadow}
      $ripple={ripple}
      $neon={neon}
      $holographic={holographic}
      className={className}
      style={style}
      role="img"
      aria-label={ariaLabel || `Animated ${variant} icon`}
      onClick={onClick}
      tabIndex={tabIndex}
      onFocus={onFocus}
      onBlur={onBlur}
      data-testid={dataTestId}
    >
      {children}
    </AnimationContainer>
  );
};

// Export default
export default AnimatedIcon;
