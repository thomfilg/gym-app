import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import React, { useCallback, useRef,useState } from 'react';

import type { ResizableProps, ResizeHandle } from './Resizable.types';

export const Resizable: React.FC<ResizableProps> = ({
  children,
  variant = 'both',
  width: initialWidth = 200,
  height: initialHeight = 200,
  minWidth = 50,
  maxWidth = 1000,
  minHeight = 50,
  maxHeight = 1000,
  onResize,
  disabled = false,
  handles,
  className,
  'data-testid': dataTestId,
  ...rest
}) => {
  const theme = useTheme();
  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });
  const startSize = useRef({ width: 0, height: 0 });
  const activeHandle = useRef<ResizeHandle | null>(null);

  const getDefaultHandles = (): ResizeHandle[] => {
    switch (variant) {
      case 'horizontal':
        return ['right'];
      case 'vertical':
        return ['bottom'];
      case 'both':
        return ['right', 'bottom', 'bottomRight'];
      default:
        return ['right', 'bottom', 'bottomRight'];
    }
  };

  const activeHandles = handles || getDefaultHandles();

  React.useEffect(() => {
    setSize({ width: initialWidth, height: initialHeight });
  }, [initialWidth, initialHeight]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, handle: ResizeHandle) => {
      if (disabled) return;

      e.preventDefault();
      e.stopPropagation();

      setIsResizing(true);
      activeHandle.current = handle;
      startPos.current = { x: e.clientX, y: e.clientY };
      startSize.current = { width: size.width, height: size.height };

      const handleMouseMove = (e: globalThis.MouseEvent) => {
        const deltaX = e.clientX - startPos.current.x;
        const deltaY = e.clientY - startPos.current.y;

        let newWidth = startSize.current.width;
        let newHeight = startSize.current.height;

        switch (handle) {
          case 'right':
          case 'topRight':
          case 'bottomRight':
            newWidth = Math.max(minWidth, Math.min(maxWidth, startSize.current.width + deltaX));
            break;
          case 'left':
          case 'topLeft':
          case 'bottomLeft':
            newWidth = Math.max(minWidth, Math.min(maxWidth, startSize.current.width - deltaX));
            break;
        }

        switch (handle) {
          case 'bottom':
          case 'bottomLeft':
          case 'bottomRight':
            newHeight = Math.max(minHeight, Math.min(maxHeight, startSize.current.height + deltaY));
            break;
          case 'top':
          case 'topLeft':
          case 'topRight':
            newHeight = Math.max(minHeight, Math.min(maxHeight, startSize.current.height - deltaY));
            break;
        }

        const newSize = { width: newWidth, height: newHeight };
        setSize(newSize);
        onResize?.(newWidth, newHeight);
      };

      const handleMouseUp = () => {
        setIsResizing(false);
        activeHandle.current = null;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [disabled, size, minWidth, maxWidth, minHeight, maxHeight, onResize],
  );

  const getHandleStyle = (handle: ResizeHandle) => {
    const baseStyle = {
      position: 'absolute' as const,
      backgroundColor: theme.palette.primary.main,
      opacity: 0,
      transition: theme.transitions.create('opacity'),
      '&:hover': {
        opacity: 0.3,
      },
      ...(isResizing && activeHandle.current === handle ? { opacity: 0.5 } : {}),
    };

    switch (handle) {
      case 'right':
        return {
          ...baseStyle,
          top: 0,
          right: -2,
          width: 4,
          height: '100%',
          cursor: 'ew-resize',
        };
      case 'bottom':
        return {
          ...baseStyle,
          bottom: -2,
          left: 0,
          width: '100%',
          height: 4,
          cursor: 'ns-resize',
        };
      case 'bottomRight':
        return {
          ...baseStyle,
          bottom: -2,
          right: -2,
          width: 8,
          height: 8,
          cursor: 'nw-resize',
          borderRadius: '50%',
        };
      default:
        return baseStyle;
    }
  };

  return (
    <Box
      {...rest}
      ref={containerRef}
      className={className}
      data-testid={dataTestId}
      sx={{
        position: 'relative',
        width: size.width,
        height: size.height,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.spacing(0.5),
        overflow: 'hidden',
        userSelect: isResizing ? 'none' : 'auto',
        '&:hover .resize-handle': {
          opacity: 0.3,
        },
      }}
    >
      {children}
      {!disabled &&
        activeHandles.map((handle) => (
          <Box
            key={handle}
            className="resize-handle"
            data-testid={dataTestId ? `${dataTestId}-handle-${handle}` : undefined}
            sx={getHandleStyle(handle)}
            onMouseDown={(e) => handleMouseDown(e, handle)}
          />
        ))}
    </Box>
  );
};
