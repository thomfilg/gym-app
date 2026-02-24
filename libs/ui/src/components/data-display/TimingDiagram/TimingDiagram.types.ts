// Types
export interface TimingData {
  dns?: number;
  connect?: number;
  ssl?: number;
  request?: number;
  response?: number;
  total: number;
}

export interface TimingDiagramProps {
  data: TimingData;
  showLabels?: boolean;
  color?: string;
  height?: number;
  animated?: boolean;
  showTooltips?: boolean;
  variant?: 'waterfall' | 'stacked' | 'horizontal';
}
