import type { ReactNode } from 'react';

export interface PortalProps {
  children: ReactNode;
  container?: HTMLElement | null;
  disablePortal?: boolean;
}
