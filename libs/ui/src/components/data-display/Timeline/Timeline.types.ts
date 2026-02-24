import type React from 'react';

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  icon?: React.ReactNode;
  color?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  expanded?: boolean;
  metadata?: Record<string, string>;
}

export interface TimelineProps {
  items: TimelineItem[];
  variant?: 'default' | 'compact' | 'detailed';
  orientation?: 'vertical' | 'horizontal';
  showConnector?: boolean;
  animated?: boolean;
  alternating?: boolean;
  onItemClick?: (item: TimelineItem) => void;
}
