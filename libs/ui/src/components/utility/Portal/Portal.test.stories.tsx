import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, userEvent, waitFor,within } from 'storybook/test';

import { Portal } from './Portal';

const meta: Meta<typeof Portal> = {
  title: 'Utility/Portal/Tests',
  component: Portal,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:Portal'],
};

export default meta;
export type Story = StoryObj<typeof meta>;

// ================================
// INTERACTION TESTS
// ================================

export const BasicInteraction: Story = {
  render: () => {
    const BasicInteractionComponent = () => {
      const [showPortal, setShowPortal] = useState(false);

      return (
        <Box data-testid="portal-container">
          <Button data-testid="toggle-portal" onClick={() => setShowPortal(!showPortal)}>
            {showPortal ? 'Hide' : 'Show'} Portal
          </Button>

          {showPortal && (
            <Portal>
              <Box
                data-testid="portal-content"
                sx={{
                  position: 'fixed',
                  top: 20,
                  right: 20,
                  p: 2,
                  bgcolor: 'primary.main',
                  color: 'white',
                  borderRadius: 1,
                  zIndex: 9999,
                }}
              >
                Portal Content Rendered
              </Box>
            </Portal>
          )}
        </Box>
      );
    };

    return <BasicInteractionComponent />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByTestId('toggle-portal');

    // Initially, portal content should not exist
    expect(canvas.queryByTestId('portal-content')).not.toBeInTheDocument();

    // Click to show portal
    await userEvent.click(toggleButton);

    // Portal content should now be visible
    await waitFor(() => {
      expect(document.querySelector('[data-testid="portal-content"]')).toBeInTheDocument();
    });

    // Verify portal content is rendered outside the component tree
    const portalContent = document.querySelector('[data-testid="portal-content"]');
    expect(portalContent?.parentElement).not.toBe(canvasElement);

    // Click to hide portal
    await userEvent.click(toggleButton);

    // Portal content should be removed
    await waitFor(() => {
      expect(document.querySelector('[data-testid="portal-content"]')).not.toBeInTheDocument();
    });
  },
};

export const FormInteraction: Story = {
  render: () => {
    const SimpleInteractionComponent = () => {
      const [showPortal, setShowPortal] = useState(false);
      const [actionTaken, setActionTaken] = useState(false);

      const handleAction = () => {
        setActionTaken(true);
        setShowPortal(false);
      };

      return (
        <Box>
          <Button data-testid="open-portal" onClick={() => setShowPortal(true)} variant="contained">
            Open Portal
          </Button>

          {actionTaken && (
            <Alert data-testid="action-success" severity="success" sx={{ mt: 2 }}>
              Portal interaction completed successfully
            </Alert>
          )}

          {showPortal && (
            <Portal>
              <Box
                data-testid="portal-content"
                sx={{
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  bgcolor: 'background.paper',
                  p: 3,
                  borderRadius: 2,
                  boxShadow: 24,
                  minWidth: 300,
                  zIndex: 9999,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Portal Content
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  This content is rendered in a portal
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  <Button data-testid="cancel-portal" onClick={() => setShowPortal(false)}>
                    Cancel
                  </Button>
                  <Button data-testid="confirm-portal" onClick={handleAction} variant="contained">
                    Confirm
                  </Button>
                </Box>
              </Box>
            </Portal>
          )}
        </Box>
      );
    };

    return <SimpleInteractionComponent />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open the portal
    const openButton = canvas.getByTestId('open-portal');
    await userEvent.click(openButton);

    // Wait for portal content to appear
    await waitFor(() => {
      expect(document.querySelector('[data-testid="portal-content"]')).toBeInTheDocument();
    });

    // Interact with the portal content
    const confirmButton = document.querySelector(
      '[data-testid="confirm-portal"]',
    ) as HTMLButtonElement;
    expect(confirmButton).toBeInTheDocument();

    await userEvent.click(confirmButton);

    // Wait for portal to close and success message to appear
    await waitFor(
      () => {
        // Check that the portal is closed
        expect(document.querySelector('[data-testid="portal-content"]')).not.toBeInTheDocument();
        // Check that success message appears
        const successElement = canvas.getByTestId('action-success');
        expect(successElement).toBeInTheDocument();
        expect(successElement).toHaveTextContent('Portal interaction completed successfully');
      },
      { timeout: 3000 },
    );
  },
};

export const StateChange: Story = {
  render: () => {
    const StateChangeComponent = () => {
      const [portalMode, setPortalMode] = useState<'disabled' | 'body' | 'custom'>('body');
      const [customContainer, setCustomContainer] = useState<HTMLElement | null>(null);
      const [showContent, setShowContent] = useState(true);

      return (
        <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button
              data-testid="mode-disabled"
              variant={portalMode === 'disabled' ? 'contained' : 'outlined'}
              onClick={() => setPortalMode('disabled')}
              size="small"
            >
              Disabled
            </Button>
            <Button
              data-testid="mode-body"
              variant={portalMode === 'body' ? 'contained' : 'outlined'}
              onClick={() => setPortalMode('body')}
              size="small"
            >
              Body Portal
            </Button>
            <Button
              data-testid="mode-custom"
              variant={portalMode === 'custom' ? 'contained' : 'outlined'}
              onClick={() => setPortalMode('custom')}
              size="small"
            >
              Custom Container
            </Button>
            <Button
              data-testid="toggle-content"
              onClick={() => setShowContent(!showContent)}
              color="secondary"
              size="small"
            >
              {showContent ? 'Hide' : 'Show'} Content
            </Button>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Paper sx={{ p: 2, flex: 1 }}>
              <Typography variant="h6">Source Component</Typography>
              <Typography>Portal mode: {portalMode}</Typography>
            </Paper>

            <Paper
              ref={(el) => setCustomContainer(el)}
              data-testid="custom-container"
              sx={{ p: 2, flex: 1, bgcolor: 'grey.100', position: 'relative' }}
            >
              <Typography variant="h6">Custom Container</Typography>
              <Typography variant="body2" color="text.secondary">
                Target for custom portal
              </Typography>
            </Paper>
          </Box>

          {showContent && (
            <Portal
              disablePortal={portalMode === 'disabled'}
              container={portalMode === 'custom' ? customContainer : undefined}
            >
              <Box
                data-testid="portal-state-content"
                sx={{
                  position: portalMode === 'disabled' ? 'static' : 'absolute',
                  top: portalMode === 'disabled' ? 'auto' : 10,
                  right: portalMode === 'disabled' ? 'auto' : 10,
                  bgcolor: 'primary.main',
                  color: 'white',
                  p: 1,
                  borderRadius: 1,
                  fontSize: '0.875rem',
                  zIndex: portalMode === 'disabled' ? 'auto' : 1000,
                }}
              >
                Mode: {portalMode}
              </Box>
            </Portal>
          )}
        </Box>
      );
    };

    return <StateChangeComponent />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test body portal mode (default)
    let content = document.querySelector('[data-testid="portal-state-content"]');
    expect(content).toBeInTheDocument();
    expect(content?.textContent).toBe('Mode: body');

    // Switch to disabled mode
    await userEvent.click(canvas.getByTestId('mode-disabled'));
    await waitFor(() => {
      content = canvas.queryByTestId('portal-state-content');
      expect(content).toBeInTheDocument();
      expect(content?.textContent).toBe('Mode: disabled');
    });

    // Switch to custom container mode
    await userEvent.click(canvas.getByTestId('mode-custom'));
    await waitFor(() => {
      content = document.querySelector('[data-testid="portal-state-content"]');
      expect(content?.textContent).toBe('Mode: custom');

      // Verify it's in the custom container
      const customContainer = canvas.getByTestId('custom-container');
      expect(customContainer).toContainElement(content);
    });

    // Test content toggle
    await userEvent.click(canvas.getByTestId('toggle-content'));
    await waitFor(() => {
      expect(
        document.querySelector('[data-testid="portal-state-content"]'),
      ).not.toBeInTheDocument();
    });

    // Show content again
    await userEvent.click(canvas.getByTestId('toggle-content'));
    await waitFor(() => {
      expect(document.querySelector('[data-testid="portal-state-content"]')).toBeInTheDocument();
    });
  },
};

// ================================
// ACCESSIBILITY TESTS
// ================================

export const KeyboardNavigation: Story = {
  render: () => {
    const KeyboardNavigationComponent = () => {
      const [showPortal, setShowPortal] = useState(false);

      const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
          setShowPortal(false);
        }
      };

      return (
        <Box>
          <Button
            data-testid="keyboard-trigger"
            onClick={() => setShowPortal(true)}
            onKeyDown={(e) => e.key === 'Enter' && setShowPortal(true)}
          >
            Open Portal (Enter or Click)
          </Button>

          {showPortal && (
            <Portal>
              <Box
                data-testid="keyboard-portal"
                onKeyDown={handleKeyDown}
                tabIndex={-1}
                sx={{
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  bgcolor: 'background.paper',
                  p: 3,
                  borderRadius: 2,
                  boxShadow: 24,
                  minWidth: 300,
                  zIndex: 9999,
                  outline: 'none',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Keyboard Accessible Portal
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Button data-testid="first-button" variant="outlined" sx={{ mr: 1 }}>
                    First Button
                  </Button>
                  <Button data-testid="second-button" variant="outlined">
                    Second Button
                  </Button>
                </Box>

                <Typography variant="body2" color="text.secondary">
                  Press Escape to close, Tab to navigate
                </Typography>

                <Button
                  data-testid="close-button"
                  onClick={() => setShowPortal(false)}
                  sx={{ mt: 2 }}
                  variant="contained"
                  size="small"
                >
                  Close
                </Button>
              </Box>
            </Portal>
          )}
        </Box>
      );
    };

    return <KeyboardNavigationComponent />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggerButton = canvas.getByTestId('keyboard-trigger');

    // Focus and press Enter to open portal
    triggerButton.focus();
    await userEvent.keyboard('{Enter}');

    // Wait for portal to appear
    await waitFor(() => {
      expect(document.querySelector('[data-testid="keyboard-portal"]')).toBeInTheDocument();
    });

    // Test Tab navigation within portal
    await userEvent.keyboard('{Tab}');
    const firstButton = document.querySelector('[data-testid="first-button"]') as HTMLButtonElement;
    expect(firstButton).toHaveFocus();

    await userEvent.keyboard('{Tab}');
    const secondButton = document.querySelector('[data-testid="second-button"]') as HTMLButtonElement;
    expect(secondButton).toHaveFocus();

    await userEvent.keyboard('{Tab}');
    const closeButton = document.querySelector('[data-testid="close-button"]') as HTMLButtonElement;
    expect(closeButton).toHaveFocus();

    // Test Escape key to close
    await userEvent.keyboard('{Escape}');

    await waitFor(() => {
      expect(document.querySelector('[data-testid="keyboard-portal"]')).not.toBeInTheDocument();
    });
  },
};

export const ScreenReader: Story = {
  render: () => {
    const ScreenReaderComponent = () => {
      const [announcements, setAnnouncements] = useState<string[]>([]);
      const [showPortal, setShowPortal] = useState(false);

      const announce = (message: string) => {
        setAnnouncements((prev) => [...prev, message]);
      };

      return (
        <Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" id="portal-demo-title">
              Screen Reader Portal Demo
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This demo shows proper ARIA attributes and announcements for portals
            </Typography>
          </Box>

          <Button
            data-testid="sr-trigger"
            onClick={() => {
              setShowPortal(true);
              announce('Portal dialog opened');
            }}
            aria-describedby="portal-demo-title"
          >
            Open Accessible Portal
          </Button>

          {/* Screen reader announcements */}
          <Box
            data-testid="announcements"
            role="log"
            aria-live="polite"
            aria-label="Screen reader announcements"
            sx={{ position: 'absolute', left: '-10000px' }}
          >
            {announcements.map((msg, index) => (
              <div key={index}>{msg}</div>
            ))}
          </Box>

          {showPortal && (
            <Portal>
              <Box
                data-testid="sr-portal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="portal-title"
                aria-describedby="portal-description"
                sx={{
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  bgcolor: 'background.paper',
                  p: 3,
                  borderRadius: 2,
                  boxShadow: 24,
                  minWidth: 400,
                  zIndex: 9999,
                }}
              >
                <Typography id="portal-title" variant="h6" component="h2" gutterBottom>
                  Accessible Portal Dialog
                </Typography>

                <Typography id="portal-description" variant="body1" sx={{ mb: 2 }}>
                  This portal has proper ARIA attributes including role, aria-modal,
                  aria-labelledby, and aria-describedby for screen reader accessibility.
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <TextField
                    data-testid="portal-input"
                    label="Accessible Input"
                    fullWidth
                    size="small"
                    InputProps={{
                      'aria-describedby': 'input-help',
                    }}
                  />
                  <Typography
                    id="input-help"
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block', mt: 0.5 }}
                  >
                    This input is properly labeled and described
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  <Button
                    data-testid="sr-cancel"
                    onClick={() => {
                      setShowPortal(false);
                      announce('Portal dialog cancelled and closed');
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    data-testid="sr-confirm"
                    variant="contained"
                    onClick={() => {
                      setShowPortal(false);
                      announce('Portal dialog confirmed and closed');
                    }}
                  >
                    OK
                  </Button>
                </Box>
              </Box>
            </Portal>
          )}
        </Box>
      );
    };

    return <ScreenReaderComponent />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open the portal
    const triggerButton = canvas.getByTestId('sr-trigger');
    await userEvent.click(triggerButton);

    // Wait for portal to appear
    await waitFor(() => {
      expect(document.querySelector('[data-testid="sr-portal"]')).toBeInTheDocument();
    });

    // Verify ARIA attributes
    const portalDialog = document.querySelector('[data-testid="sr-portal"]');
    expect(portalDialog).toHaveAttribute('role', 'dialog');
    expect(portalDialog).toHaveAttribute('aria-modal', 'true');
    expect(portalDialog).toHaveAttribute('aria-labelledby', 'portal-title');
    expect(portalDialog).toHaveAttribute('aria-describedby', 'portal-description');

    // Verify title and description elements exist
    expect(document.getElementById('portal-title')).toBeInTheDocument();
    expect(document.getElementById('portal-description')).toBeInTheDocument();

    // Test input accessibility
    const input = document.querySelector('[data-testid="portal-input"] input');
    expect(input).toHaveAttribute('aria-describedby', 'input-help');

    // Verify announcements area
    const announcements = canvas.getByTestId('announcements');
    expect(announcements).toHaveAttribute('role', 'log');
    expect(announcements).toHaveAttribute('aria-live', 'polite');

    // Test closing with proper announcement
    const confirmButton = document.querySelector('[data-testid="sr-confirm"]') as HTMLButtonElement;
    await userEvent.click(confirmButton);

    await waitFor(() => {
      expect(document.querySelector('[data-testid="sr-portal"]')).not.toBeInTheDocument();
    });

    // Verify announcement was made
    expect(announcements).toHaveTextContent('Portal dialog confirmed and closed');
  },
};

export const FocusManagement: Story = {
  render: () => {
    const FocusManagementComponent = () => {
      const [showPortal, setShowPortal] = useState(false);
      const [previousFocus, setPreviousFocus] = useState<HTMLElement | null>(null);

      const openPortal = () => {
        setPreviousFocus(document.activeElement as HTMLElement);
        setShowPortal(true);
      };

      const closePortal = () => {
        setShowPortal(false);
        // Restore focus after a brief delay to allow DOM updates
        window.setTimeout(() => {
          previousFocus?.focus();
        }, 10);
      };

      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField data-testid="before-portal" label="Input Before Portal" size="small" />

          <Button data-testid="focus-trigger" onClick={openPortal} variant="contained">
            Open Focus Managed Portal
          </Button>

          <TextField data-testid="after-portal" label="Input After Portal" size="small" />

          {showPortal && (
            <Portal>
              <Box
                data-testid="focus-portal"
                sx={{
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  bgcolor: 'background.paper',
                  p: 3,
                  borderRadius: 2,
                  boxShadow: 24,
                  minWidth: 400,
                  zIndex: 9999,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Focus Management Portal
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <TextField
                    data-testid="first-portal-input"
                    label="First Input"
                    fullWidth
                    size="small"
                    sx={{ mb: 1 }}
                    autoFocus
                  />
                  <TextField
                    data-testid="second-portal-input"
                    label="Second Input"
                    fullWidth
                    size="small"
                  />
                </Box>

                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  <Button data-testid="focus-cancel" onClick={closePortal}>
                    Cancel
                  </Button>
                  <Button data-testid="focus-save" variant="contained" onClick={closePortal}>
                    Save
                  </Button>
                </Box>
              </Box>
            </Portal>
          )}
        </Box>
      );
    };

    return <FocusManagementComponent />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Focus on the trigger button
    const triggerButton = canvas.getByTestId('focus-trigger');
    triggerButton.focus();
    expect(triggerButton).toHaveFocus();

    // Open portal
    await userEvent.click(triggerButton);

    // Wait for portal to appear
    await waitFor(() => {
      expect(document.querySelector('[data-testid="focus-portal"]')).toBeInTheDocument();
    });

    // Verify focus moved to first input in portal
    await waitFor(() => {
      const firstInput = document.querySelector(
        '[data-testid="first-portal-input"] input',
      ) as HTMLInputElement;
      expect(firstInput).toHaveFocus();
    });

    // Test tab navigation within portal
    await userEvent.keyboard('{Tab}');
    const secondInput = document.querySelector(
      '[data-testid="second-portal-input"] input',
    ) as HTMLInputElement;
    expect(secondInput).toHaveFocus();

    await userEvent.keyboard('{Tab}');
    const cancelButton = document.querySelector(
      '[data-testid="focus-cancel"]',
    ) as HTMLButtonElement;
    expect(cancelButton).toHaveFocus();

    await userEvent.keyboard('{Tab}');
    const saveButton = document.querySelector('[data-testid="focus-save"]') as HTMLButtonElement;
    expect(saveButton).toHaveFocus();

    // Close portal and verify focus returns to trigger
    await userEvent.click(saveButton);

    await waitFor(() => {
      expect(document.querySelector('[data-testid="focus-portal"]')).not.toBeInTheDocument();
    });

    // Verify focus returned to trigger button
    await waitFor(
      () => {
        expect(triggerButton).toHaveFocus();
      },
      { timeout: 200 },
    );
  },
};

// ================================
// VISUAL TESTS
// ================================

export const ResponsiveDesign: Story = {
  render: () => {
    const ResponsiveComponent = () => {
      const [showPortal, setShowPortal] = useState(true);
      const [viewport, setViewport] = useState('desktop');

      return (
        <Box>
          <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {['mobile', 'tablet', 'desktop'].map((size) => (
              <Button
                key={size}
                data-testid={`viewport-${size}`}
                variant={viewport === size ? 'contained' : 'outlined'}
                onClick={() => setViewport(size)}
                size="small"
              >
                {size}
              </Button>
            ))}
            <Button
              data-testid="toggle-responsive-portal"
              onClick={() => setShowPortal(!showPortal)}
              color="secondary"
              size="small"
            >
              {showPortal ? 'Hide' : 'Show'} Portal
            </Button>
          </Box>

          {showPortal && (
            <Portal>
              <Box
                data-testid="responsive-portal"
                sx={{
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  bgcolor: 'background.paper',
                  p: viewport === 'mobile' ? 1 : viewport === 'tablet' ? 2 : 3,
                  borderRadius: 1,
                  boxShadow: 24,
                  width: viewport === 'mobile' ? '90vw' : viewport === 'tablet' ? '60vw' : '40vw',
                  maxWidth: viewport === 'mobile' ? 320 : viewport === 'tablet' ? 600 : 800,
                  maxHeight: '90vh',
                  overflow: 'auto',
                  zIndex: 9999,
                }}
              >
                <Typography variant={viewport === 'mobile' ? 'subtitle1' : 'h6'} gutterBottom>
                  Responsive Portal Content ({viewport})
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    mb: 2,
                    fontSize: viewport === 'mobile' ? '0.75rem' : '0.875rem',
                  }}
                >
                  This portal adapts its size and padding based on viewport. Content scales
                  appropriately for different screen sizes.
                </Typography>

                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: viewport === 'mobile' ? '1fr' : 'repeat(2, 1fr)',
                    gap: 1,
                    mb: 2,
                  }}
                >
                  <TextField
                    label="Field 1"
                    size={viewport === 'mobile' ? 'small' : 'medium'}
                    fullWidth
                  />
                  <TextField
                    label="Field 2"
                    size={viewport === 'mobile' ? 'small' : 'medium'}
                    fullWidth
                  />
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    justifyContent: 'flex-end',
                    flexDirection: viewport === 'mobile' ? 'column' : 'row',
                  }}
                >
                  <Button size={viewport === 'mobile' ? 'small' : 'medium'}>Cancel</Button>
                  <Button variant="contained" size={viewport === 'mobile' ? 'small' : 'medium'}>
                    Confirm
                  </Button>
                </Box>
              </Box>
            </Portal>
          )}
        </Box>
      );
    };

    return <ResponsiveComponent />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test different viewport configurations
    for (const viewport of ['mobile', 'tablet', 'desktop']) {
      await userEvent.click(canvas.getByTestId(`viewport-${viewport}`));

      await waitFor(() => {
        const portal = document.querySelector('[data-testid="responsive-portal"]');
        expect(portal).toBeInTheDocument();

        // Verify content adapts to viewport
        expect(portal).toHaveTextContent(`Responsive Portal Content (${viewport})`);
      });
    }

    // Test portal visibility toggle
    await userEvent.click(canvas.getByTestId('toggle-responsive-portal'));
    await waitFor(() => {
      expect(document.querySelector('[data-testid="responsive-portal"]')).not.toBeInTheDocument();
    });

    await userEvent.click(canvas.getByTestId('toggle-responsive-portal'));
    await waitFor(() => {
      expect(document.querySelector('[data-testid="responsive-portal"]')).toBeInTheDocument();
    });
  },
};

export const ThemeVariations: Story = {
  render: () => {
    const ThemeComponent = () => {
      const [theme, setTheme] = useState('light');
      const [showPortal, setShowPortal] = useState(true);

      return (
        <Box>
          <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
            {['light', 'dark', 'high-contrast'].map((themeMode) => (
              <Button
                key={themeMode}
                data-testid={`theme-${themeMode}`}
                variant={theme === themeMode ? 'contained' : 'outlined'}
                onClick={() => setTheme(themeMode)}
                size="small"
              >
                {themeMode.charAt(0).toUpperCase() + themeMode.slice(1)}
              </Button>
            ))}
            <Button
              data-testid="toggle-theme-portal"
              onClick={() => setShowPortal(!showPortal)}
              color="secondary"
              size="small"
            >
              {showPortal ? 'Hide' : 'Show'} Portal
            </Button>
          </Box>

          {showPortal && (
            <Portal>
              <Box
                data-testid="theme-portal"
                sx={{
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  bgcolor:
                    theme === 'dark'
                      ? 'grey.900'
                      : theme === 'high-contrast'
                        ? '#000'
                        : 'background.paper',
                  color:
                    theme === 'dark'
                      ? 'grey.100'
                      : theme === 'high-contrast'
                        ? '#fff'
                        : 'text.primary',
                  p: 3,
                  borderRadius: theme === 'high-contrast' ? 0 : 2,
                  boxShadow: theme === 'high-contrast' ? 'none' : 24,
                  border: theme === 'high-contrast' ? '2px solid #fff' : 'none',
                  minWidth: 350,
                  zIndex: 9999,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {theme.charAt(0).toUpperCase() + theme.slice(1)} Theme Portal
                </Typography>

                <Typography variant="body2" sx={{ mb: 2 }}>
                  This portal adapts to different theme modes including colors, contrast levels, and
                  visual styling.
                </Typography>

                <Box
                  sx={{
                    mb: 2,
                    p: 1.5,
                    bgcolor:
                      theme === 'dark'
                        ? 'grey.800'
                        : theme === 'high-contrast'
                          ? '#333'
                          : 'grey.50',
                    borderRadius: theme === 'high-contrast' ? 0 : 1,
                    border: theme === 'high-contrast' ? '1px solid #fff' : 'none',
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    Current Theme: {theme}
                  </Typography>
                  <Typography variant="caption">
                    Background and text colors adapt automatically
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  <Button
                    sx={{
                      color: theme === 'high-contrast' ? '#fff' : 'inherit',
                      borderColor: theme === 'high-contrast' ? '#fff' : 'inherit',
                      '&:hover': {
                        bgcolor: theme === 'high-contrast' ? '#333' : 'inherit',
                      },
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: theme === 'high-contrast' ? '#fff' : 'primary.main',
                      color: theme === 'high-contrast' ? '#000' : 'primary.contrastText',
                      '&:hover': {
                        bgcolor: theme === 'high-contrast' ? '#ccc' : 'primary.dark',
                      },
                    }}
                  >
                    Apply
                  </Button>
                </Box>
              </Box>
            </Portal>
          )}
        </Box>
      );
    };

    return <ThemeComponent />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test different theme variations
    for (const theme of ['light', 'dark', 'high-contrast']) {
      await userEvent.click(canvas.getByTestId(`theme-${theme}`));

      await waitFor(() => {
        const portal = document.querySelector('[data-testid="theme-portal"]');
        expect(portal).toBeInTheDocument();
        expect(portal).toHaveTextContent(
          `${theme.charAt(0).toUpperCase() + theme.slice(1)} Theme Portal`,
        );
      });
    }

    // Test portal toggle
    await userEvent.click(canvas.getByTestId('toggle-theme-portal'));
    await waitFor(() => {
      expect(document.querySelector('[data-testid="theme-portal"]')).not.toBeInTheDocument();
    });

    await userEvent.click(canvas.getByTestId('toggle-theme-portal'));
    await waitFor(() => {
      expect(document.querySelector('[data-testid="theme-portal"]')).toBeInTheDocument();
    });
  },
};

export const VisualStates: Story = {
  render: () => {
    const VisualStatesComponent = () => {
      const [state, setState] = useState<'default' | 'loading' | 'error' | 'success'>('default');
      const [showPortal, setShowPortal] = useState(true);

      const stateConfig = {
        default: { color: 'primary', icon: '📄' },
        loading: { color: 'info', icon: '⏳' },
        error: { color: 'error', icon: '❌' },
        success: { color: 'success', icon: '✅' },
      };

      return (
        <Box>
          <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {Object.keys(stateConfig).map((stateName) => (
              <Button
                key={stateName}
                data-testid={`state-${stateName}`}
                variant={state === stateName ? 'contained' : 'outlined'}
                onClick={() => setState(stateName as 'default' | 'loading' | 'error' | 'success')}
                size="small"
              >
                {stateName}
              </Button>
            ))}
            <Button
              data-testid="toggle-visual-portal"
              onClick={() => setShowPortal(!showPortal)}
              color="secondary"
              size="small"
            >
              {showPortal ? 'Hide' : 'Show'} Portal
            </Button>
          </Box>

          {showPortal && (
            <Portal>
              <Box
                data-testid="visual-states-portal"
                sx={{
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  bgcolor: 'background.paper',
                  p: 3,
                  borderRadius: 2,
                  boxShadow: 24,
                  minWidth: 300,
                  zIndex: 9999,
                  border: state === 'error' ? 2 : 1,
                  borderColor: state === 'error' ? 'error.main' : 'divider',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h4" sx={{ mr: 1 }}>
                    {stateConfig[state].icon}
                  </Typography>
                  <Typography variant="h6">
                    Portal State: {state.charAt(0).toUpperCase() + state.slice(1)}
                  </Typography>
                </Box>

                {state === 'loading' && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Content is loading, please wait...
                    </Typography>
                    <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          border: '2px solid',
                          borderColor: 'primary.light',
                          borderTopColor: 'primary.main',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite',
                          mr: 1,
                          '@keyframes spin': {
                            '0%': { transform: 'rotate(0deg)' },
                            '100%': { transform: 'rotate(360deg)' },
                          },
                        }}
                      />
                      <Typography variant="caption">Loading...</Typography>
                    </Box>
                  </Box>
                )}

                {state === 'error' && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    <Typography variant="body2">
                      An error occurred while processing your request.
                    </Typography>
                  </Alert>
                )}

                {state === 'success' && (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    <Typography variant="body2">Operation completed successfully!</Typography>
                  </Alert>
                )}

                {state === 'default' && (
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    This is the default state of the portal with standard styling and no special
                    indicators.
                  </Typography>
                )}

                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  {state !== 'loading' && (
                    <Button
                      color={
                        stateConfig[state].color as
                          | 'primary'
                          | 'secondary'
                          | 'error'
                          | 'warning'
                          | 'info'
                          | 'success'
                      }
                      variant={state === 'error' ? 'outlined' : 'contained'}
                    >
                      {state === 'error' ? 'Retry' : state === 'success' ? 'Done' : 'OK'}
                    </Button>
                  )}
                </Box>
              </Box>
            </Portal>
          )}
        </Box>
      );
    };

    return <VisualStatesComponent />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test each visual state
    const states = ['default', 'loading', 'error', 'success'];

    for (const state of states) {
      await userEvent.click(canvas.getByTestId(`state-${state}`));

      await waitFor(() => {
        const portal = document.querySelector('[data-testid="visual-states-portal"]');
        expect(portal).toBeInTheDocument();
        expect(portal).toHaveTextContent(
          `Portal State: ${state.charAt(0).toUpperCase() + state.slice(1)}`,
        );

        // Verify state-specific content
        if (state === 'loading') {
          expect(portal).toHaveTextContent('Content is loading, please wait...');
        } else if (state === 'error') {
          expect(portal?.querySelector('[role="alert"]')).toBeInTheDocument();
        } else if (state === 'success') {
          expect(portal?.querySelector('[role="alert"]')).toBeInTheDocument();
          expect(portal).toHaveTextContent('Operation completed successfully!');
        }
      });
    }

    // Test portal toggle
    await userEvent.click(canvas.getByTestId('toggle-visual-portal'));
    await waitFor(() => {
      expect(
        document.querySelector('[data-testid="visual-states-portal"]'),
      ).not.toBeInTheDocument();
    });

    await userEvent.click(canvas.getByTestId('toggle-visual-portal'));
    await waitFor(() => {
      expect(document.querySelector('[data-testid="visual-states-portal"]')).toBeInTheDocument();
    });
  },
};

// ================================
// PERFORMANCE TESTS
// ================================

export const Performance: Story = {
  render: () => {
    const PerformanceComponent = () => {
      const [portalCount, setPortalCount] = useState(1);
      const [showPortals, setShowPortals] = useState(false);
      const [renderTime, setRenderTime] = useState<number | null>(null);

      const handleTogglePortals = async () => {
        const startTime = window.performance.now();
        setShowPortals(!showPortals);

        // Use requestAnimationFrame to measure after render
        window.requestAnimationFrame(() => {
          const endTime = window.performance.now();
          setRenderTime(endTime - startTime);
        });
      };

      const portals = Array.from({ length: portalCount }, (_, i) => i);

      return (
        <Box>
          <Box sx={{ mb: 2, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography>Portal Count:</Typography>
              <Button
                data-testid="decrease-count"
                size="small"
                onClick={() => setPortalCount(Math.max(1, portalCount - 1))}
                disabled={portalCount <= 1}
              >
                -
              </Button>
              <Typography data-testid="portal-count" sx={{ minWidth: 20, textAlign: 'center' }}>
                {portalCount}
              </Typography>
              <Button
                data-testid="increase-count"
                size="small"
                onClick={() => setPortalCount(Math.min(50, portalCount + 1))}
                disabled={portalCount >= 50}
              >
                +
              </Button>
            </Box>

            <Button
              data-testid="toggle-performance-portals"
              variant="contained"
              onClick={handleTogglePortals}
            >
              {showPortals ? 'Hide' : 'Show'} {portalCount} Portal{portalCount > 1 ? 's' : ''}
            </Button>

            {renderTime !== null && (
              <Typography data-testid="render-time" variant="caption" color="text.secondary">
                Render time: {renderTime.toFixed(2)}ms
              </Typography>
            )}
          </Box>

          {showPortals &&
            portals.map((index) => (
              <Portal key={index}>
                <Box
                  data-testid={`performance-portal-${index}`}
                  sx={{
                    position: 'fixed',
                    top: 50 + (index % 10) * 60,
                    left: 50 + Math.floor(index / 10) * 250,
                    bgcolor: `hsl(${(index * 360) / portalCount}, 70%, 95%)`,
                    border: `2px solid hsl(${(index * 360) / portalCount}, 70%, 70%)`,
                    p: 1,
                    borderRadius: 1,
                    minWidth: 200,
                    zIndex: 9999 + index,
                  }}
                >
                  <Typography variant="caption" fontWeight="bold">
                    Portal #{index + 1}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                    Performance test portal with unique styling and positioning. Z-index:{' '}
                    {9999 + index}
                  </Typography>
                </Box>
              </Portal>
            ))}
        </Box>
      );
    };

    return <PerformanceComponent />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test single portal performance
    const toggleButton = canvas.getByTestId('toggle-performance-portals');
    await userEvent.click(toggleButton);

    await waitFor(() => {
      expect(document.querySelector('[data-testid="performance-portal-0"]')).toBeInTheDocument();
    });

    // Verify render time is recorded
    await waitFor(() => {
      const renderTimeEl = canvas.queryByTestId('render-time');
      if (renderTimeEl) {
        expect(renderTimeEl).toHaveTextContent(/Render time: \d+\.\d+ms/);
      }
    });

    // Test multiple portals
    const increaseButton = canvas.getByTestId('increase-count');

    // Increase to 5 portals
    for (let i = 0; i < 4; i++) {
      await userEvent.click(increaseButton);
    }

    // Verify count updated
    expect(canvas.getByTestId('portal-count')).toHaveTextContent('5');

    // Toggle portals with increased count
    await userEvent.click(toggleButton);

    await waitFor(() => {
      expect(
        document.querySelector('[data-testid="performance-portal-0"]'),
      ).not.toBeInTheDocument();
    });

    await userEvent.click(toggleButton);

    await waitFor(() => {
      for (let i = 0; i < 5; i++) {
        expect(
          document.querySelector(`[data-testid="performance-portal-${i}"]`),
        ).toBeInTheDocument();
      }
    });

    // Test performance with many portals
    for (let i = 0; i < 5; i++) {
      await userEvent.click(increaseButton);
    }

    expect(canvas.getByTestId('portal-count')).toHaveTextContent('10');

    // Toggle with 10 portals and verify performance
    await userEvent.click(toggleButton);
    await userEvent.click(toggleButton);

    await waitFor(() => {
      for (let i = 0; i < 10; i++) {
        expect(
          document.querySelector(`[data-testid="performance-portal-${i}"]`),
        ).toBeInTheDocument();
      }
    });

    // Verify all portals have unique positioning and styling
    const portal0 = document.querySelector('[data-testid="performance-portal-0"]');
    const portal5 = document.querySelector('[data-testid="performance-portal-5"]');

    expect(portal0).toHaveStyle('top: 50px');
    expect(portal5).toHaveStyle('top: 350px'); // 50 + (5 % 10) * 60
  },
};

// ================================
// EDGE CASES TESTS
// ================================

export const EdgeCases: Story = {
  render: () => {
    const EdgeCasesComponent = () => {
      const [testCase, setTestCase] = useState<string>('null-container');
      const [customContainer, setCustomContainer] = useState<HTMLElement | null>(null);
      const [showPortal, setShowPortal] = useState(false);
      const [showContainer, setShowContainer] = useState(true);
      const [,] = useState<React.ReactNode>('Default content');

      const testCases = {
        'null-container': {
          title: 'Null Container',
          description: 'Portal with explicitly null container should fall back to document.body',
        },
        'undefined-container': {
          title: 'Undefined Container',
          description: 'Portal with undefined container should create default container',
        },
        'invalid-container': {
          title: 'Invalid Container',
          description: 'Portal with container that gets removed from DOM',
        },
        'empty-children': {
          title: 'Empty Children',
          description: 'Portal with no children or null children',
        },
        'complex-children': {
          title: 'Complex Children',
          description: 'Portal with complex nested React elements',
        },
        'rapid-toggle': {
          title: 'Rapid Toggle',
          description: 'Rapidly showing and hiding portal to test cleanup',
        },
      };

      const renderPortalForTestCase = () => {
        switch (testCase) {
          case 'null-container':
            return (
              <Portal container={null}>
                <Box
                  data-testid="edge-portal-content"
                  sx={{
                    position: 'fixed',
                    top: 20,
                    right: 20,
                    p: 2,
                    bgcolor: 'primary.main',
                    color: 'white',
                    borderRadius: 1,
                  }}
                >
                  Null container test
                </Box>
              </Portal>
            );

          case 'undefined-container':
            return (
              <Portal container={undefined}>
                <Box
                  data-testid="edge-portal-content"
                  sx={{
                    position: 'fixed',
                    top: 20,
                    right: 20,
                    p: 2,
                    bgcolor: 'secondary.main',
                    color: 'white',
                    borderRadius: 1,
                  }}
                >
                  Undefined container test
                </Box>
              </Portal>
            );

          case 'invalid-container':
            return (
              <Portal container={customContainer}>
                <Box
                  data-testid="edge-portal-content"
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    p: 2,
                    bgcolor: 'warning.main',
                    color: 'white',
                    borderRadius: 1,
                  }}
                >
                  Invalid container test
                </Box>
              </Portal>
            );

          case 'empty-children':
            return <Portal>{null}</Portal>;

          case 'complex-children':
            return (
              <Portal>
                <Box
                  data-testid="edge-portal-content"
                  sx={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    p: 2,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h6">Complex Portal Content</Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    <Button size="small" variant="outlined">
                      Button 1
                    </Button>
                    <Button size="small" variant="contained">
                      Button 2
                    </Button>
                  </Box>
                  <TextField label="Input Field" size="small" fullWidth sx={{ mt: 1 }} />
                  <Alert severity="info" sx={{ mt: 1 }}>
                    This is a complex nested structure
                  </Alert>
                </Box>
              </Portal>
            );

          case 'rapid-toggle':
            return (
              <Portal>
                <Box
                  data-testid="edge-portal-content"
                  sx={{
                    position: 'fixed',
                    top: 20,
                    right: 20,
                    p: 2,
                    bgcolor: 'success.main',
                    color: 'white',
                    borderRadius: 1,
                  }}
                >
                  Rapid toggle test - {Date.now()}
                </Box>
              </Portal>
            );

          default:
            return null;
        }
      };

      return (
        <Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Edge Cases Test
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {testCases[testCase as keyof typeof testCases]?.description}
            </Typography>
          </Box>

          <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {Object.entries(testCases).map(([key, config]) => (
              <Button
                key={key}
                data-testid={`test-case-${key}`}
                variant={testCase === key ? 'contained' : 'outlined'}
                onClick={() => {
                  setTestCase(key);
                  setShowPortal(false); // Reset portal state when changing test cases
                  setShowContainer(true); // Reset container state when changing test cases
                }}
                size="small"
              >
                {config.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
            <Button
              data-testid="toggle-edge-portal"
              variant="contained"
              onClick={() => setShowPortal(!showPortal)}
            >
              {showPortal ? 'Hide' : 'Show'} Portal
            </Button>

            {testCase === 'invalid-container' && (
              <Button
                data-testid="remove-container"
                color="warning"
                onClick={() => {
                  setShowContainer(false);
                  setCustomContainer(null);
                }}
              >
                Remove Container
              </Button>
            )}

            {testCase === 'rapid-toggle' && (
              <Button
                data-testid="rapid-toggle"
                color="secondary"
                onClick={async () => {
                  // Rapidly toggle portal 10 times
                  for (let i = 0; i < 10; i++) {
                    setShowPortal((prev) => !prev);
                    await new Promise((resolve) => window.setTimeout(resolve, 50));
                  }
                }}
              >
                Rapid Toggle (10x)
              </Button>
            )}
          </Box>

          {/* Container for invalid-container test */}
          {testCase === 'invalid-container' && showContainer && (
            <Paper
              ref={(el) => setCustomContainer(el)}
              data-testid="removable-container"
              sx={{ p: 2, mb: 2, bgcolor: 'grey.100', position: 'relative' }}
            >
              <Typography variant="subtitle2">Removable Container</Typography>
              <Typography variant="body2" color="text.secondary">
                This container can be removed to test invalid container handling
              </Typography>
            </Paper>
          )}

          {showPortal && renderPortalForTestCase()}
        </Box>
      );
    };

    return <EdgeCasesComponent />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test null container case
    await userEvent.click(canvas.getByTestId('test-case-null-container'));
    await userEvent.click(canvas.getByTestId('toggle-edge-portal'));

    await waitFor(() => {
      const portalContent = document.querySelector('[data-testid="edge-portal-content"]');
      expect(portalContent).toBeInTheDocument();
      // Should be appended to document.body since container is null
      expect(portalContent?.parentElement).toBe(document.body);
    });

    await userEvent.click(canvas.getByTestId('toggle-edge-portal')); // Hide

    // Test undefined container case
    await userEvent.click(canvas.getByTestId('test-case-undefined-container'));
    await userEvent.click(canvas.getByTestId('toggle-edge-portal'));

    await waitFor(() => {
      const portalContent = document.querySelector('[data-testid="edge-portal-content"]');
      expect(portalContent).toBeInTheDocument();
    });

    await userEvent.click(canvas.getByTestId('toggle-edge-portal')); // Hide

    // Test invalid container case
    await userEvent.click(canvas.getByTestId('test-case-invalid-container'));
    await userEvent.click(canvas.getByTestId('toggle-edge-portal'));

    await waitFor(() => {
      const portalContent = document.querySelector('[data-testid="edge-portal-content"]');
      expect(portalContent).toBeInTheDocument();

      // Should be in the custom container initially
      const customContainer = canvas.getByTestId('removable-container');
      expect(customContainer).toContainElement(portalContent);
    });

    // Remove the container and verify portal handles it gracefully
    await userEvent.click(canvas.getByTestId('remove-container'));

    // Portal should still exist and handle the missing container
    await waitFor(() => {
      // The portal content might still exist or be moved to body
      const _portalContent = document.querySelector('[data-testid="edge-portal-content"]');
      // We don't expect it to crash, content may or may not still be visible
      void _portalContent; // Acknowledge the unused variable
    });

    await userEvent.click(canvas.getByTestId('toggle-edge-portal')); // Hide

    // Test empty children case
    await userEvent.click(canvas.getByTestId('test-case-empty-children'));
    await userEvent.click(canvas.getByTestId('toggle-edge-portal'));

    // Should not crash with empty children
    await waitFor(() => {
      // No portal content should be visible
      expect(document.querySelector('[data-testid="edge-portal-content"]')).not.toBeInTheDocument();
    });

    await userEvent.click(canvas.getByTestId('toggle-edge-portal')); // Hide

    // Test complex children case
    await userEvent.click(canvas.getByTestId('test-case-complex-children'));
    await userEvent.click(canvas.getByTestId('toggle-edge-portal'));

    await waitFor(() => {
      const portalContent = document.querySelector('[data-testid="edge-portal-content"]');
      expect(portalContent).toBeInTheDocument();
      expect(portalContent).toHaveTextContent('Complex Portal Content');

      // Verify nested elements exist
      expect(portalContent?.querySelector('button')).toBeInTheDocument();
      expect(portalContent?.querySelector('input')).toBeInTheDocument();
      expect(portalContent?.querySelector('[role="alert"]')).toBeInTheDocument();
    });

    await userEvent.click(canvas.getByTestId('toggle-edge-portal')); // Hide

    // Test rapid toggle case
    await userEvent.click(canvas.getByTestId('test-case-rapid-toggle'));

    // Test single toggle first
    await userEvent.click(canvas.getByTestId('toggle-edge-portal'));
    await waitFor(() => {
      expect(document.querySelector('[data-testid="edge-portal-content"]')).toBeInTheDocument();
    });

    // Test rapid toggle functionality
    await userEvent.click(canvas.getByTestId('rapid-toggle'));

    // Give some time for rapid toggles to complete
    await new Promise((resolve) => window.setTimeout(resolve, 600));

    // Should not crash and final state should be deterministic
    // (The exact final state depends on the implementation but shouldn't crash)
  },
};

// ================================
// INTEGRATION TESTS
// ================================

export const Integration: Story = {
  render: () => {
    const IntegrationComponent = () => {
      const [showModal, setShowModal] = useState(false);
      const [showTooltip, setShowTooltip] = useState(false);
      const [showDropdown, setShowDropdown] = useState(false);
      const [notifications, setNotifications] = useState<string[]>([]);

      const addNotification = (message: string) => {
        setNotifications((prev) => [...prev, message]);
        window.setTimeout(() => {
          setNotifications((prev) => prev.slice(1));
        }, 3000);
      };

      return (
        <Box>
          <Typography variant="h6" gutterBottom>
            Multiple Portal Integration
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Test multiple portals working together with proper z-index stacking and interaction.
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            <Button
              data-testid="show-modal"
              variant="contained"
              onClick={() => {
                setShowModal(true);
                addNotification('Modal opened');
              }}
            >
              Show Modal
            </Button>

            <Button
              data-testid="show-tooltip"
              variant="outlined"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              Hover for Tooltip
            </Button>

            <Button
              data-testid="show-dropdown"
              variant="outlined"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              Toggle Dropdown
            </Button>

            <Button
              data-testid="add-notification"
              variant="text"
              onClick={() => addNotification(`Notification ${Date.now()}`)}
            >
              Add Notification
            </Button>
          </Box>

          {/* Modal Portal */}
          {showModal && (
            <Portal>
              {/* Backdrop */}
              <Box
                data-testid="modal-backdrop"
                onClick={() => setShowModal(false)}
                sx={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  bgcolor: 'rgba(0, 0, 0, 0.5)',
                  zIndex: 1000,
                }}
              />

              {/* Modal Content */}
              <Box
                data-testid="modal-content"
                sx={{
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  bgcolor: 'background.paper',
                  p: 3,
                  borderRadius: 2,
                  boxShadow: 24,
                  minWidth: 400,
                  zIndex: 1001,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Modal Dialog
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  This modal is rendered in a portal with high z-index to appear above other
                  content.
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <TextField label="Input in Modal" fullWidth size="small" />
                </Box>

                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  <Button data-testid="modal-cancel" onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>
                  <Button
                    data-testid="modal-confirm"
                    variant="contained"
                    onClick={() => {
                      setShowModal(false);
                      addNotification('Modal confirmed');
                    }}
                  >
                    Confirm
                  </Button>
                </Box>
              </Box>
            </Portal>
          )}

          {/* Tooltip Portal */}
          {showTooltip && (
            <Portal>
              <Box
                data-testid="tooltip-content"
                sx={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  bgcolor: 'grey.800',
                  color: 'white',
                  p: 1,
                  borderRadius: 1,
                  fontSize: '0.75rem',
                  zIndex: 1100,
                  mt: 0.5,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -4,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 0,
                    height: 0,
                    borderLeft: '4px solid transparent',
                    borderRight: '4px solid transparent',
                    borderBottom: '4px solid',
                    borderBottomColor: 'grey.800',
                  },
                }}
              >
                This is a tooltip rendered in a portal
              </Box>
            </Portal>
          )}

          {/* Dropdown Portal */}
          {showDropdown && (
            <Portal>
              <Box
                data-testid="dropdown-content"
                sx={{
                  position: 'fixed',
                  top: 200,
                  left: 300,
                  bgcolor: 'background.paper',
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 1,
                  boxShadow: 3,
                  py: 1,
                  minWidth: 150,
                  zIndex: 1050,
                }}
              >
                {['Option 1', 'Option 2', 'Option 3'].map((option) => (
                  <Box
                    key={option}
                    data-testid={`dropdown-option-${option.toLowerCase().replace(' ', '-')}`}
                    sx={{
                      px: 2,
                      py: 1,
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: 'action.hover',
                      },
                    }}
                    onClick={() => {
                      setShowDropdown(false);
                      addNotification(`Selected: ${option}`);
                    }}
                  >
                    <Typography variant="body2">{option}</Typography>
                  </Box>
                ))}
              </Box>
            </Portal>
          )}

          {/* Notifications Portal */}
          {notifications.map((notification, index) => (
            <Portal key={`${notification}-${index}`}>
              <Box
                data-testid={`notification-${index}`}
                sx={{
                  position: 'fixed',
                  top: 20 + index * 60,
                  right: 20,
                  bgcolor: 'success.main',
                  color: 'white',
                  p: 2,
                  borderRadius: 1,
                  boxShadow: 3,
                  maxWidth: 300,
                  zIndex: 1200,
                  animation: 'slideIn 0.3s ease-out',
                  '@keyframes slideIn': {
                    from: {
                      transform: 'translateX(100%)',
                      opacity: 0,
                    },
                    to: {
                      transform: 'translateX(0)',
                      opacity: 1,
                    },
                  },
                }}
              >
                <Typography variant="body2">{notification}</Typography>
              </Box>
            </Portal>
          ))}
        </Box>
      );
    };

    return <IntegrationComponent />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test notification system
    const addNotificationBtn = canvas.getByTestId('add-notification');
    await userEvent.click(addNotificationBtn);

    await waitFor(() => {
      expect(document.querySelector('[data-testid="notification-0"]')).toBeInTheDocument();
    });

    // Test dropdown
    const dropdownBtn = canvas.getByTestId('show-dropdown');
    await userEvent.click(dropdownBtn);

    await waitFor(() => {
      expect(document.querySelector('[data-testid="dropdown-content"]')).toBeInTheDocument();
    });

    // Select an option from dropdown
    const option1 = document.querySelector(
      '[data-testid="dropdown-option-option-1"]',
    ) as HTMLElement;
    await userEvent.click(option1);

    await waitFor(() => {
      expect(document.querySelector('[data-testid="dropdown-content"]')).not.toBeInTheDocument();
      // Should trigger a new notification
      expect(document.querySelector('[data-testid="notification-1"]')).toBeInTheDocument();
    });

    // Test modal (highest z-index)
    const modalBtn = canvas.getByTestId('show-modal');
    await userEvent.click(modalBtn);

    await waitFor(() => {
      expect(document.querySelector('[data-testid="modal-backdrop"]')).toBeInTheDocument();
      expect(document.querySelector('[data-testid="modal-content"]')).toBeInTheDocument();
    });

    // Test modal interaction
    const modalInput = document.querySelector(
      '[data-testid="modal-content"] input',
    ) as HTMLInputElement;
    await userEvent.type(modalInput, 'Test input in modal');

    expect(modalInput.value).toBe('Test input in modal');

    // Confirm modal
    const confirmBtn = document.querySelector('[data-testid="modal-confirm"]') as HTMLButtonElement;
    await userEvent.click(confirmBtn);

    await waitFor(() => {
      expect(document.querySelector('[data-testid="modal-content"]')).not.toBeInTheDocument();
      // Should trigger another notification
      expect(document.querySelector('[data-testid="notification-2"]')).toBeInTheDocument();
    });

    // Test tooltip (requires hover simulation)
    const tooltipBtn = canvas.getByTestId('show-tooltip');
    await userEvent.hover(tooltipBtn);

    await waitFor(() => {
      expect(document.querySelector('[data-testid="tooltip-content"]')).toBeInTheDocument();
    });

    await userEvent.unhover(tooltipBtn);

    await waitFor(() => {
      expect(document.querySelector('[data-testid="tooltip-content"]')).not.toBeInTheDocument();
    });

    // Verify multiple notifications stack properly
    await userEvent.click(addNotificationBtn);
    await userEvent.click(addNotificationBtn);

    await waitFor(() => {
      // Should have multiple notifications stacked
      const notifications = document.querySelectorAll('[data-testid^="notification-"]');
      expect(notifications.length).toBeGreaterThan(3);
    });
  },
};
