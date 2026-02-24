import type React from 'react';

export type AnimationVariant =
  | 'none'
  | 'rotate'
  | 'pulse'
  | 'translate'
  | 'bounce'
  | 'shake'
  | 'flip'
  | 'spin'
  | 'fadeInOut'
  | 'heartbeat'
  | 'wobble'
  | 'morph'
  | 'swing'
  | 'float'
  | 'jello'
  | 'neonFlicker'
  | 'breathe';

export type AnimationSize = 'sm' | 'md' | 'lg' | 'xl';

export type ShadowStyle = 'soft' | 'hard' | 'elevated' | 'none';

export interface AnimatedIconProps {
  /** Icon element to animate - can be any React node (MUI icon, SVG, etc.) */
  children: React.ReactNode;

  /** Animation variant to apply */
  variant?: AnimationVariant;

  /** Size of the animated icon container */
  size?: AnimationSize;

  /** Custom color override for the icon */
  color?: string;

  /** Animation duration in seconds */
  duration?: number;

  /** Animation delay in seconds */
  delay?: number;

  /** Whether the animation should loop infinitely */
  loop?: boolean;

  /** Enable glow effect around the icon */
  glow?: boolean;

  /** Enable glass morphism effect */
  glass?: boolean;

  /** Glow color (only used when glow is true) */
  glowColor?: string;

  /** Enable metallic appearance with gradient and highlights */
  metallic?: boolean;

  /** Enable gradient background effect */
  gradient?: boolean;

  /** Shadow style for the icon container */
  shadow?: ShadowStyle;

  /** Enable ripple effect overlay */
  ripple?: boolean;

  /** Enable neon glow effect with text shadows */
  neon?: boolean;

  /** Enable animated holographic rainbow effect */
  holographic?: boolean;

  /** Additional CSS class name */
  className?: string;

  /** Inline styles */
  style?: React.CSSProperties;

  /** Accessibility label */
  'aria-label'?: string;

  /** Click handler */
  onClick?: (event: React.MouseEvent) => void;

  /** Tab index for keyboard navigation */
  tabIndex?: number;

  /** Focus event handler */
  onFocus?: (event: React.FocusEvent) => void;

  /** Blur event handler */
  onBlur?: (event: React.FocusEvent) => void;

  /** Test ID for the animated icon container */
  dataTestId?: string;
}
