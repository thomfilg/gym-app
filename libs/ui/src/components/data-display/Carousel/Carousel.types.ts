import type { CSSProperties,ReactNode } from 'react';

export interface CarouselItem {
  id: string;
  content: ReactNode;
  title?: string;
  description?: string;
  image?: string;
  alt?: string;
}

export interface CarouselProps {
  items: CarouselItem[];
  variant?: 'default' | 'glass' | 'gradient' | 'elevated' | 'minimal' | 'cards';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  autoPlay?: boolean;
  autoPlayInterval?: number;
  loop?: boolean;
  showIndicators?: boolean;
  showArrows?: boolean;
  showThumbnails?: boolean;
  fade?: boolean;
  glow?: boolean;
  pulse?: boolean;
  glass?: boolean;
  gradient?: boolean;
  ripple?: boolean;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  height?: number | string;
  width?: number | string;
  spacing?: number;
  slidesPerView?: number;
  centerMode?: boolean;
  pauseOnHover?: boolean;
  onClick?: (item: CarouselItem, index: number) => void;
  onChange?: (index: number) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  indicatorPosition?: 'top' | 'bottom' | 'left' | 'right';
  arrowPosition?: 'inside' | 'outside' | 'overlay';
  animation?: 'slide' | 'fade' | 'zoom' | 'flip';
}

export interface CarouselIndicatorsProps {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  position?: 'top' | 'bottom' | 'left' | 'right';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  variant?: 'dots' | 'lines' | 'numbers';
  className?: string;
  style?: CSSProperties;
}

export interface CarouselArrowsProps {
  onPrev: () => void;
  onNext: () => void;
  position?: 'inside' | 'outside' | 'overlay';
  disabled?: boolean;
  disablePrev?: boolean;
  disableNext?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  style?: CSSProperties;
}

export interface CarouselThumbnailsProps {
  items: CarouselItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  style?: CSSProperties;
}
