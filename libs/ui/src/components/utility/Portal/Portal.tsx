import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import type { PortalProps } from './Portal.types';

export const Portal: React.FC<PortalProps> = ({
  children,
  container,
  disablePortal = false,
}) => {
  const defaultContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!container && !disablePortal) {
      // Create a default container if none is provided
      if (!defaultContainer.current) {
        defaultContainer.current = document.createElement('div');
        defaultContainer.current.setAttribute('data-portal-container', 'true');
        document.body.appendChild(defaultContainer.current);
      }
    }

    return () => {
      // Cleanup: remove the default container when component unmounts
      if (defaultContainer.current && document.body.contains(defaultContainer.current)) {
        document.body.removeChild(defaultContainer.current);
        defaultContainer.current = null;
      }
    };
  }, [container, disablePortal]);

  if (disablePortal) {
    return <>{children}</>;
  }

  const targetContainer = container || defaultContainer.current || document.body;

  return createPortal(children, targetContainer);
};