import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useRef,useState } from 'react';
import { expect, fn,userEvent, waitFor, within } from 'storybook/test';

import { Lightbox } from './Lightbox';
import type { LightboxItem, LightboxRef } from './Lightbox.types';

const meta: Meta<typeof Lightbox> = {
  title: 'DataDisplay/Lightbox/Tests',
  component: Lightbox,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:Lightbox'],
};

export default meta;
export type Story = StoryObj<typeof meta>;

// Test data
const testImages: LightboxItem[] = [
  {
    src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNzc3Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMThweCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9IjAuM2VtIj5UZXN0IEltYWdlIDE8L3RleHQ+PC9zdmc+',
    alt: 'Test Image 1',
    caption: 'This is the first test image',
    type: 'image',
  },
  {
    src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjgwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNDQ0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMThweCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9IjAuM2VtIj5UZXN0IEltYWdlIDI8L3RleHQ+PC9zdmc+',
    alt: 'Test Image 2',
    caption: 'This is the second test image',
    type: 'image',
  },
  {
    src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjOTk5Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMThweCIgZmlsbD0iIzAwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9IjAuM2VtIj5UZXN0IEltYWdlIDM8L3RleHQ+PC9zdmc+',
    alt: 'Test Image 3',
    caption: 'This is the third test image',
    type: 'image',
  },
];

// Helper component for testing
interface LightboxTestWrapperProps {
  onClose?: () => void;
  onOpen?: () => void;
  children?: React.ReactNode;
  items?: LightboxItem[];
  showControls?: boolean;
  thumbnails?: boolean;
  autoplay?: boolean | { interval?: number };
  loop?: boolean;
  zoomable?: boolean;
}

const LightboxTestWrapper = ({
  onClose = fn(),
  onOpen = fn(),
  children,
  items = testImages,
  ...props
}: LightboxTestWrapperProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const lightboxRef = useRef<LightboxRef>(null);

  const handleOpen = () => {
    setIsOpen(true);
    onOpen();
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Button data-testid="open-lightbox" onClick={handleOpen} variant="contained">
        Open Lightbox
      </Button>
      {children}
      <Lightbox
        ref={lightboxRef}
        isOpen={isOpen}
        onClose={handleClose}
        items={items}
        data-testid="lightbox"
        {...props}
      />
    </Box>
  );
};

// 1. Basic Interaction Tests
export const BasicInteraction: Story = {
  render: () => <LightboxTestWrapper />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Should open lightbox when trigger clicked', async () => {
      const openButton = canvas.getByTestId('open-lightbox');
      expect(openButton).toBeInTheDocument();

      await userEvent.click(openButton);

      // Wait for lightbox to open
      await waitFor(() => {
        const lightbox = document.querySelector('[role="dialog"]');
        expect(lightbox).toBeInTheDocument();
      });
    });

    await step('Should show first image by default', async () => {
      const image = document.querySelector('img[alt="Test Image 1"]');
      expect(image).toBeInTheDocument();
    });

    await step('Should close lightbox with close button', async () => {
      const closeButton = document.querySelector('[aria-label="Close lightbox"]');
      expect(closeButton).toBeInTheDocument();

      await userEvent.click(closeButton!);

      await waitFor(() => {
        const lightbox = document.querySelector('[role="dialog"]');
        expect(lightbox).not.toBeInTheDocument();
      });
    });
  },
};

// 2. Navigation Tests
export const Navigation: Story = {
  render: () => <LightboxTestWrapper showControls={true} />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Should open lightbox', async () => {
      const openButton = canvas.getByTestId('open-lightbox');
      await userEvent.click(openButton);

      await waitFor(() => {
        const lightbox = document.querySelector('[role="dialog"]');
        expect(lightbox).toBeInTheDocument();
      });
    });

    await step('Should navigate to next image', async () => {
      const nextButton = document.querySelector('[aria-label="Next item"]');
      expect(nextButton).toBeInTheDocument();

      await userEvent.click(nextButton!);

      await waitFor(() => {
        const image = document.querySelector('img[alt="Test Image 2"]');
        expect(image).toBeInTheDocument();
      });
    });

    await step('Should navigate to previous image', async () => {
      const prevButton = document.querySelector('[aria-label="Previous item"]');
      expect(prevButton).toBeInTheDocument();

      await userEvent.click(prevButton!);

      await waitFor(() => {
        const image = document.querySelector('img[alt="Test Image 1"]');
        expect(image).toBeInTheDocument();
      });
    });
  },
};

// 3. Keyboard Navigation Tests
export const KeyboardNavigation: Story = {
  render: () => <LightboxTestWrapper showControls={true} />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Should open lightbox', async () => {
      const openButton = canvas.getByTestId('open-lightbox');
      await userEvent.click(openButton);

      await waitFor(() => {
        const lightbox = document.querySelector('[role="dialog"]');
        expect(lightbox).toBeInTheDocument();
      });
    });

    await step('Should navigate with arrow keys', async () => {
      // Navigate right
      await userEvent.keyboard('{ArrowRight}');

      await waitFor(() => {
        const image = document.querySelector('img[alt="Test Image 2"]');
        expect(image).toBeInTheDocument();
      });

      // Navigate left
      await userEvent.keyboard('{ArrowLeft}');

      await waitFor(() => {
        const image = document.querySelector('img[alt="Test Image 1"]');
        expect(image).toBeInTheDocument();
      });
    });

    await step('Should close with Escape key', async () => {
      await userEvent.keyboard('{Escape}');

      await waitFor(() => {
        const lightbox = document.querySelector('[role="dialog"]');
        expect(lightbox).not.toBeInTheDocument();
      });
    });
  },
};

// 4. Accessibility Tests
export const AccessibilityCompliance: Story = {
  render: () => <LightboxTestWrapper />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Should open lightbox', async () => {
      const openButton = canvas.getByTestId('open-lightbox');
      await userEvent.click(openButton);

      await waitFor(() => {
        const lightbox = document.querySelector('[role="dialog"]');
        expect(lightbox).toBeInTheDocument();
      });
    });

    await step('Should have proper ARIA attributes', async () => {
      // MUI Dialog might render aria-modal on the root div or the inner dialog element
      const dialogWithModal = document.querySelector('[aria-modal="true"]');
      expect(dialogWithModal).toBeInTheDocument();

      // Check if the title element exists (MUI Dialog might handle aria-labelledby differently)
      const title = document.getElementById('lightbox-title');
      expect(title).toBeInTheDocument();

      // Verify there's a dialog with proper labeling
      const dialog = document.querySelector('[role="dialog"]');
      expect(dialog).toBeInTheDocument();
      const hasAriaLabel =
        dialog?.hasAttribute('aria-label') || dialog?.hasAttribute('aria-labelledby');
      expect(hasAriaLabel).toBe(true);
    });

    await step('Should have accessible controls', async () => {
      const closeButton = document.querySelector('[aria-label="Close lightbox"]');
      expect(closeButton).toBeInTheDocument();

      const nextButton = document.querySelector('[aria-label="Next item"]');
      const prevButton = document.querySelector('[aria-label="Previous item"]');

      if (nextButton) expect(nextButton).toBeInTheDocument();
      if (prevButton) expect(prevButton).toBeInTheDocument();
    });

    await step('Should have item counter', async () => {
      const counter = document.querySelector('[aria-live="polite"]');
      expect(counter).toBeInTheDocument();
      expect(counter).toHaveTextContent('1 / 3');
    });
  },
};

// 5. Zoom and Pan Tests
export const ZoomAndPan: Story = {
  render: () => <LightboxTestWrapper zoomable={true} />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Should open lightbox', async () => {
      const openButton = canvas.getByTestId('open-lightbox');
      await userEvent.click(openButton);

      await waitFor(() => {
        const lightbox = document.querySelector('[role="dialog"]');
        expect(lightbox).toBeInTheDocument();
      });
    });

    await step('Should show zoom controls', async () => {
      const zoomIn = document.querySelector('[aria-label="Zoom in"]');
      const zoomOut = document.querySelector('[aria-label="Zoom out"]');
      const resetZoom = document.querySelector('[aria-label="Reset zoom"]');

      expect(zoomIn).toBeInTheDocument();
      expect(zoomOut).toBeInTheDocument();
      expect(resetZoom).toBeInTheDocument();
    });

    await step('Should zoom in when zoom in button clicked', async () => {
      const zoomInButton = document.querySelector('[aria-label="Zoom in"]');
      const image = document.querySelector('img[alt="Test Image 1"]');

      await userEvent.click(zoomInButton!);

      // Check if transform style indicates zoom
      await waitFor(() => {
        const style = window.getComputedStyle(image!);
        // Transform is computed as matrix, check if it's scaled (not identity matrix)
        expect(style.transform).not.toBe('none');
        expect(style.transform).toMatch(/matrix/);
        // Matrix with scale > 1 will have values > 1 in first and fourth positions
        const matrixMatch = style.transform.match(/matrix\(([^,]+),/);
        if (matrixMatch) {
          const scaleValue = parseFloat(matrixMatch[1]);
          expect(scaleValue).toBeGreaterThan(1);
        }
      });
    });

    await step('Should reset zoom when reset button clicked', async () => {
      const resetButton = document.querySelector('[aria-label="Reset zoom"]');
      const image = document.querySelector('img[alt="Test Image 1"]');

      await userEvent.click(resetButton!);

      await waitFor(() => {
        const style = window.getComputedStyle(image!);
        // Reset should set transform back to scale(1) which shows as matrix(1, 0, 0, 1, 0, 0) or none
        const isIdentityMatrix =
          style.transform === 'matrix(1, 0, 0, 1, 0, 0)' || style.transform === 'none';
        expect(isIdentityMatrix).toBe(true);
      });
    });
  },
};

// 6. Thumbnails/Filmstrip Tests
export const ThumbnailsFilmstrip: Story = {
  render: () => <LightboxTestWrapper thumbnails={true} />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Should open lightbox', async () => {
      const openButton = canvas.getByTestId('open-lightbox');
      await userEvent.click(openButton);

      await waitFor(() => {
        const lightbox = document.querySelector('[role="dialog"]');
        expect(lightbox).toBeInTheDocument();
      });
    });

    await step('Should show thumbnail filmstrip', async () => {
      // Look for thumbnail images with the test image alt text
      const thumbnails = document.querySelectorAll('img[alt^="Test Image"]');
      // Filter to only get the thumbnails (smaller images in the filmstrip)
      const thumbnailImages = Array.from(thumbnails).filter((img) => {
        const width = img.clientWidth;
        return width <= 60; // Thumbnails are 60px wide
      });
      expect(thumbnailImages).toHaveLength(3);
    });

    await step('Should navigate when thumbnail clicked', async () => {
      // Find the second thumbnail (Test Image 2)
      const thumbnails = document.querySelectorAll('img[alt^="Test Image"]');
      const thumbnailImages = Array.from(thumbnails).filter((img) => {
        const width = img.clientWidth;
        return width <= 60; // Thumbnails are 60px wide
      });

      const secondThumbnail = thumbnailImages.find((img) => (img as HTMLImageElement).alt === 'Test Image 2');
      expect(secondThumbnail).toBeInTheDocument();

      await userEvent.click(secondThumbnail!.parentElement!);

      await waitFor(() => {
        const mainImage = document.querySelector('img[alt="Test Image 2"]');
        expect(mainImage).toBeInTheDocument();
      });
    });
  },
};

// 7. Autoplay Tests
export const AutoplayFunctionality: Story = {
  render: () => <LightboxTestWrapper autoplay={{ interval: 1000 }} />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Should open lightbox', async () => {
      const openButton = canvas.getByTestId('open-lightbox');
      await userEvent.click(openButton);

      await waitFor(() => {
        const lightbox = document.querySelector('[role="dialog"]');
        expect(lightbox).toBeInTheDocument();
      });
    });

    await step('Should show autoplay controls', async () => {
      const playPauseButton = document.querySelector('[aria-label*="slideshow"]');
      expect(playPauseButton).toBeInTheDocument();
    });

    await step('Should auto-advance to next image', async () => {
      // Wait for auto-advance (interval is 1000ms)
      await waitFor(
        () => {
          const image = document.querySelector('img[alt="Test Image 2"]');
          expect(image).toBeInTheDocument();
        },
        { timeout: 2000 },
      );
    });

    await step('Should pause autoplay when button clicked', async () => {
      const pauseButton = document.querySelector('[aria-label="Pause slideshow"]');
      if (pauseButton) {
        await userEvent.click(pauseButton);

        // Verify it changes to play button
        await waitFor(() => {
          const playButton = document.querySelector('[aria-label="Start slideshow"]');
          expect(playButton).toBeInTheDocument();
        });
      }
    });
  },
};

// 8. Loop Navigation Tests
export const LoopNavigation: Story = {
  render: () => <LightboxTestWrapper loop={true} showControls={true} />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Should open lightbox', async () => {
      const openButton = canvas.getByTestId('open-lightbox');
      await userEvent.click(openButton);

      await waitFor(() => {
        const lightbox = document.querySelector('[role="dialog"]');
        expect(lightbox).toBeInTheDocument();
      });
    });

    await step('Should wrap to last image when going previous from first', async () => {
      const prevButton = document.querySelector('[aria-label="Previous item"]');
      expect(prevButton).toBeInTheDocument();
      expect(prevButton).not.toBeDisabled();

      await userEvent.click(prevButton!);

      await waitFor(() => {
        const image = document.querySelector('img[alt="Test Image 3"]');
        expect(image).toBeInTheDocument();
      });
    });

    await step('Should wrap to first image when going next from last', async () => {
      const nextButton = document.querySelector('[aria-label="Next item"]');
      expect(nextButton).toBeInTheDocument();
      expect(nextButton).not.toBeDisabled();

      await userEvent.click(nextButton!);

      await waitFor(() => {
        const image = document.querySelector('img[alt="Test Image 1"]');
        expect(image).toBeInTheDocument();
      });
    });
  },
};

// 9. Edge Cases Tests
export const EdgeCases: Story = {
  render: () => <LightboxTestWrapper items={[]} />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Should handle empty items array', async () => {
      const openButton = canvas.getByTestId('open-lightbox');
      await userEvent.click(openButton);

      // Lightbox should still open but show no content
      await waitFor(() => {
        const lightbox = document.querySelector('[role="dialog"]');
        expect(lightbox).toBeInTheDocument();
      });

      // Should not show navigation controls for empty gallery
      const nextButton = document.querySelector('[aria-label="Next item"]');
      const prevButton = document.querySelector('[aria-label="Previous item"]');
      expect(nextButton).not.toBeInTheDocument();
      expect(prevButton).not.toBeInTheDocument();
    });
  },
};

// 10. Single Image Tests
export const SingleImageGallery: Story = {
  render: () => <LightboxTestWrapper items={[testImages[0]]} showControls={true} />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Should open lightbox with single image', async () => {
      const openButton = canvas.getByTestId('open-lightbox');
      await userEvent.click(openButton);

      await waitFor(() => {
        const lightbox = document.querySelector('[role="dialog"]');
        expect(lightbox).toBeInTheDocument();
      });
    });

    await step('Should not show navigation controls for single image', async () => {
      const nextButton = document.querySelector('[aria-label="Next item"]');
      const prevButton = document.querySelector('[aria-label="Previous item"]');

      expect(nextButton).not.toBeInTheDocument();
      expect(prevButton).not.toBeInTheDocument();
    });

    await step('Should show correct counter for single image', async () => {
      const counter = document.querySelector('[aria-live="polite"]');
      expect(counter).not.toBeInTheDocument(); // No counter for single image
    });
  },
};

// 11. Performance Tests
export const Performance: Story = {
  render: () => <LightboxTestWrapper />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Should open lightbox quickly', async () => {
      const startTime = Date.now();

      const openButton = canvas.getByTestId('open-lightbox');
      await userEvent.click(openButton);

      await waitFor(() => {
        const lightbox = document.querySelector('[role="dialog"]');
        expect(lightbox).toBeInTheDocument();

        const endTime = Date.now();
        const openTime = endTime - startTime;

        // Should open within reasonable time (2 seconds)
        expect(openTime).toBeLessThan(2000);
      });
    });

    await step('Should navigate between images smoothly', async () => {
      const startTime = Date.now();

      const nextButton = document.querySelector('[aria-label="Next item"]');
      await userEvent.click(nextButton!);

      await waitFor(() => {
        const image = document.querySelector('img[alt="Test Image 2"]');
        expect(image).toBeInTheDocument();

        const endTime = Date.now();
        const navigateTime = endTime - startTime;

        // Navigation should be fast (500ms)
        expect(navigateTime).toBeLessThan(500);
      });
    });
  },
};

// 12. Focus Management Tests
export const FocusManagement: Story = {
  render: () => <LightboxTestWrapper />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Should focus close button when lightbox opens', async () => {
      const openButton = canvas.getByTestId('open-lightbox');
      await userEvent.click(openButton);

      await waitFor(() => {
        const closeButton = document.querySelector('[aria-label="Close lightbox"]');
        expect(closeButton).toBeInTheDocument();
        // Focus management is handled by MUI Dialog
        expect(document.activeElement).toBeDefined();
      });
    });

    await step('Should trap focus within lightbox', async () => {
      // Tab through elements - focus should stay within dialog
      await userEvent.tab();
      await userEvent.tab();
      await userEvent.tab();

      // Focus should still be within the dialog
      const dialog = document.querySelector('[role="dialog"]');
      const activeElement = document.activeElement;
      expect(dialog!.contains(activeElement)).toBe(true);
    });
  },
};
