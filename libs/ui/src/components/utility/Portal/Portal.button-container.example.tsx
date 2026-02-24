import React, { useRef, useState } from 'react';

import { Portal } from './Portal';

/**
 * Example demonstrating that HTMLButtonElement can be used as a Portal container
 */
export const PortalWithButtonContainer = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [showPortal, setShowPortal] = useState(false);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setShowPortal(!showPortal)}
        style={{ position: 'relative' }}
      >
        Toggle Portal (Container)
      </button>

      {showPortal && (
        <Portal container={buttonRef.current}>
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              background: 'white',
              border: '1px solid #ccc',
              padding: '10px',
              marginTop: '5px',
              borderRadius: '4px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            This portal is rendered inside the button element!
          </div>
        </Portal>
      )}
    </>
  );
};

/**
 * Example with other HTMLElement types
 */
export const PortalWithVariousContainers = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const [activeContainer, setActiveContainer] = useState<'div' | 'button' | 'span' | null>(null);

  return (
    <>
      <div ref={divRef} style={{ padding: '20px', background: '#f0f0f0', marginBottom: '10px' }}>
        <button onClick={() => setActiveContainer('div')}>Use DIV as container</button>
      </div>

      <button
        ref={buttonRef}
        onClick={() => setActiveContainer('button')}
        style={{ marginBottom: '10px', display: 'block' }}
      >
        Use BUTTON as container
      </button>

      <span
        ref={spanRef}
        style={{ display: 'inline-block', padding: '10px', background: '#e0e0e0' }}
      >
        <button onClick={() => setActiveContainer('span')}>Use SPAN as container</button>
      </span>

      {activeContainer && (
        <Portal
          container={
            activeContainer === 'div'
              ? divRef.current
              : activeContainer === 'button'
                ? buttonRef.current
                : spanRef.current
          }
        >
          <div
            style={{
              background: 'yellow',
              padding: '5px',
              border: '2px solid red',
              fontWeight: 'bold',
            }}
          >
            Portal content in {activeContainer.toUpperCase()}!
          </div>
        </Portal>
      )}
    </>
  );
};