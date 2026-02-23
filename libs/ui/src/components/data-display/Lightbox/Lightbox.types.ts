import type { CSSProperties } from 'react';

export interface LightboxItem {
  src: string;
  alt?: string;
  caption?: string;
  type?: 'image' | 'video';
}

export interface AutoplayConfig {
  interval?: number;
}

export interface LightboxProps {
  /** Controls visibility; must lock body scroll when true */
  isOpen: boolean;
  /** Fired on close button, backdrop click, Esc, and swipe-down (mobile) */
  onClose: () => void;
  /** Gallery items; mixed media supported */
  items?: LightboxItem[];
  /** Initial active item index (clamped to bounds) */
  startIndex?: number;
  /** Toggles Next/Prev controls and keyboard arrows */
  showControls?: boolean;
  /** Renders caption below media if present */
  showCaptions?: boolean;
  /** Wrap navigation at edges */
  loop?: boolean;
  /** Auto-advance; default interval 4000ms when true. Pauses on hover/focus */
  autoplay?: boolean | AutoplayConfig;
  /** Shows filmstrip for quick navigation */
  thumbnails?: boolean;
  /** Enable pinch/scroll zoom, drag pan, double-tap reset */
  zoomable?: boolean;
  /** Style extension hook for container */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
  /** Optional test ID for automated testing */
  dataTestId?: string;
}

export interface LightboxRef {
  open: (index?: number) => void;
  close: () => void;
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
}
