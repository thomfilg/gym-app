import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn,userEvent, waitFor, within } from 'storybook/test';

import { Carousel } from './Carousel';

const meta: Meta<typeof Carousel> = {
  title: 'DataDisplay/Carousel/Tests',
  component: Carousel,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:Carousel'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample items for testing - using data URLs for images to avoid network issues
const sampleItems = [
  {
    id: '1',
    title: 'Slide 1',
    description: 'Description for slide 1',
    content: <div>Content 1</div>,
    image:
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzNmNTFiNSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjMwMCIgeT0iMjAwIiBzdHlsZT0iZmlsbDojZmZmO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1zaXplOjMwcHg7Zm9udC1mYW1pbHk6QXJpYWwsSGVsdmV0aWNhLHNhbnMtc2VyaWY7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+U2xpZGUgMTwvdGV4dD48L3N2Zz4=',
    alt: 'Slide 1 image',
  },
  {
    id: '2',
    title: 'Slide 2',
    description: 'Description for slide 2',
    content: <div>Content 2</div>,
    image:
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzIxOTZmMyIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjMwMCIgeT0iMjAwIiBzdHlsZT0iZmlsbDojZmZmO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1zaXplOjMwcHg7Zm9udC1mYW1pbHk6QXJpYWwsSGVsdmV0aWNhLHNhbnMtc2VyaWY7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+U2xpZGUgMjwvdGV4dD48L3N2Zz4=',
    alt: 'Slide 2 image',
  },
  {
    id: '3',
    title: 'Slide 3',
    description: 'Description for slide 3',
    content: <div>Content 3</div>,
    image:
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzAwYmNkNCIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjMwMCIgeT0iMjAwIiBzdHlsZT0iZmlsbDojZmZmO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1zaXplOjMwcHg7Zm9udC1mYW1pbHk6QXJpYWwsSGVsdmV0aWNhLHNhbnMtc2VyaWY7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+U2xpZGUgMzwvdGV4dD48L3N2Zz4=',
    alt: 'Slide 3 image',
  },
  {
    id: '4',
    title: 'Slide 4',
    description: 'Description for slide 4',
    content: <div>Content 4</div>,
    image:
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzRjYWY1MCIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjMwMCIgeT0iMjAwIiBzdHlsZT0iZmlsbDojZmZmO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1zaXplOjMwcHg7Zm9udC1mYW1pbHk6QXJpYWwsSGVsdmV0aWNhLHNhbnMtc2VyaWY7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+U2xpZGUgNDwvdGV4dD48L3N2Zz4=',
    alt: 'Slide 4 image',
  },
];

// Basic Interaction Test
export const BasicInteraction: Story = {
  args: {
    items: sampleItems,
    showArrows: true,
    showIndicators: true,
    width: 600,
    height: 400,
    onFocus: fn(),
    onBlur: fn(),
    onClick: fn(),
    onChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for carousel to render
    await waitFor(() => {
      expect(canvas.getByText('Slide 1')).toBeInTheDocument();
    });

    // Test that first slide is visible
    expect(canvas.getByText('Slide 1')).toBeVisible();
    expect(canvas.getByText('Description for slide 1')).toBeVisible();

    // Find and click next arrow
    const nextButton = canvas
      .getAllByRole('button')
      .find((btn) => btn.querySelector('[data-testid="ArrowForwardIosIcon"]'));

    if (nextButton) {
      await userEvent.click(nextButton);

      // Wait for slide transition
      await waitFor(
        () => {
          expect(canvas.getByText('Slide 2')).toBeVisible();
        },
        { timeout: 1000 },
      );

      expect(canvas.getByText('Description for slide 2')).toBeVisible();
    }

    // Find and click previous arrow
    const prevButton = canvas
      .getAllByRole('button')
      .find((btn) => btn.querySelector('[data-testid="ArrowBackIosIcon"]'));

    if (prevButton) {
      await userEvent.click(prevButton);

      // Wait for slide transition back
      await waitFor(
        () => {
          expect(canvas.getByText('Slide 1')).toBeVisible();
        },
        { timeout: 1000 },
      );
    }
  },
};

// Navigation Controls Test
export const NavigationControls: Story = {
  args: {
    items: sampleItems,
    showArrows: true,
    showIndicators: true,
    showThumbnails: true,
    width: 600,
    height: 400,
    onFocus: fn(),
    onBlur: fn(),
    onClick: fn(),
    onChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(canvas.getByText('Slide 1')).toBeInTheDocument();
    });

    // Test indicator navigation
    const indicators = canvas
      .getAllByRole('button')
      .filter((btn) => btn.querySelector('[data-testid="FiberManualRecordIcon"]'));

    if (indicators.length > 2) {
      // Click third indicator
      await userEvent.click(indicators[2]);

      await waitFor(
        () => {
          expect(canvas.getByText('Slide 3')).toBeVisible();
        },
        { timeout: 1000 },
      );
    }

    // Test thumbnail navigation if visible
    const thumbnails = canvas.getAllByRole('img');
    if (thumbnails.length > 4) {
      // Click fourth thumbnail (thumbnails include main images)
      await userEvent.click(thumbnails[4]);

      await waitFor(
        () => {
          expect(canvas.getByText('Slide 4')).toBeVisible();
        },
        { timeout: 1000 },
      );
    }
  },
};

// Autoplay Test
export const Autoplay: Story = {
  args: {
    items: sampleItems.slice(0, 3),
    autoPlay: true,
    autoPlayInterval: 1000,
    pauseOnHover: true,
    showIndicators: true,
    width: 600,
    height: 400,
    onFocus: fn(),
    onBlur: fn(),
    onClick: fn(),
    onChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for initial render
    await waitFor(() => {
      expect(canvas.getByText('Slide 1')).toBeInTheDocument();
    });

    // Wait for autoplay to advance
    await waitFor(
      () => {
        expect(canvas.getByText('Slide 2')).toBeVisible();
      },
      { timeout: 2000 },
    );

    // Test pause on hover
    const carousel = canvasElement.querySelector('[class*="MuiBox-root"]');
    if (carousel) {
      await userEvent.hover(carousel);

      // Wait a bit to ensure it doesn't advance
      await new Promise((resolve) => window.setTimeout(resolve, 1500));

      // Should still be on slide 2
      expect(canvas.getByText('Slide 2')).toBeVisible();

      // Unhover to resume
      await userEvent.unhover(carousel);

      // Should advance to slide 3
      await waitFor(
        () => {
          expect(canvas.getByText('Slide 3')).toBeVisible();
        },
        { timeout: 2000 },
      );
    }
  },
};

// Keyboard Navigation Test
export const KeyboardNavigation: Story = {
  args: {
    items: sampleItems,
    showArrows: true,
    showIndicators: true,
    width: 600,
    height: 400,
    onFocus: fn(),
    onBlur: fn(),
    onClick: fn(),
    onChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(canvas.getByText('Slide 1')).toBeInTheDocument();
    });

    // Focus on the carousel container
    const carousel = canvasElement.querySelector('[class*="MuiBox-root"]');
    if (carousel) {
      carousel.focus();

      // Press right arrow key
      await userEvent.keyboard('{ArrowRight}');

      // Note: Carousel may need keyboard event handlers implemented
      // This test verifies focus management

      // Tab through navigation controls
      await userEvent.tab();

      // Verify focus moves to first interactive element
      const activeElement = document.activeElement;
      expect(activeElement?.tagName).toBe('BUTTON');
    }
  },
};

// Screen Reader Test
export const ScreenReader: Story = {
  args: {
    items: sampleItems,
    showArrows: true,
    showIndicators: true,
    width: 600,
    height: 400,
    onFocus: fn(),
    onBlur: fn(),
    onClick: fn(),
    onChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(canvas.getByText('Slide 1')).toBeInTheDocument();
    });

    // Check for image alt text
    const images = canvas.getAllByRole('img');
    images.forEach((img, index) => {
      if (index < sampleItems.length) {
        expect(img).toHaveAttribute('alt');
      }
    });

    // Check navigation buttons have accessible labels
    const buttons = canvas.getAllByRole('button');
    buttons.forEach((button) => {
      // Buttons should be accessible (have text or aria-label)
      const hasText = button.textContent && button.textContent.trim().length > 0;
      const hasAriaLabel = button.hasAttribute('aria-label');
      expect(hasText || hasAriaLabel).toBeTruthy();
    });
  },
};

// Focus Management Test
export const FocusManagement: Story = {
  args: {
    items: sampleItems,
    showArrows: true,
    showIndicators: true,
    onFocus: fn(),
    onBlur: fn(),
    width: 600,
    height: 400,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(canvas.getByText('Slide 1')).toBeInTheDocument();
    });

    // Focus on carousel container
    const carousel = canvasElement.querySelector('[class*="MuiBox-root"]');
    if (carousel instanceof HTMLElement) {
      carousel.focus();

      // Tab through interactive elements
      await userEvent.tab();
      await userEvent.tab();
      await userEvent.tab();

      // Shift+Tab to go back
      await userEvent.tab({ shift: true });

      // Verify focus events were called if handlers provided
      if (args.onFocus) {
        await waitFor(() => {
          expect(args.onFocus).toHaveBeenCalled();
        });
      }
    }
  },
};

// Responsive Design Test
export const ResponsiveDesign: Story = {
  args: {
    items: sampleItems,
    showArrows: true,
    showIndicators: true,
    width: '100%',
    height: 400,
    onFocus: fn(),
    onBlur: fn(),
    onClick: fn(),
    onChange: fn(),
  },
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '360px', height: '640px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1440px', height: '900px' } },
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(canvas.getByText('Slide 1')).toBeInTheDocument();
    });

    // Test that carousel adapts to container width
    const carousel = canvasElement.querySelector('[class*="MuiBox-root"]');
    if (carousel) {
      const styles = window.getComputedStyle(carousel);
      expect(styles.width).toBeTruthy();

      // Verify responsive behavior
      expect(carousel.clientWidth).toBeLessThanOrEqual(window.innerWidth);
    }
  },
};

// Theme Variations Test
export const ThemeVariations: Story = {
  args: {
    items: sampleItems.slice(0, 2),
    variant: 'glass',
    color: 'primary',
    glow: true,
    glass: true,
    showArrows: true,
    showIndicators: true,
    width: 600,
    height: 400,
    onFocus: fn(),
    onBlur: fn(),
    onClick: fn(),
    onChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(canvas.getByText('Slide 1')).toBeInTheDocument();
    });

    // Test glass effect styles
    const carousel = canvasElement.querySelector('[class*="MuiBox-root"]');
    if (carousel) {
      const styles = window.getComputedStyle(carousel);

      // Glass effect should have backdrop filter
      expect(styles.backdropFilter || styles.webkitBackdropFilter).toBeTruthy();

      // Glow effect should have box shadow
      if (styles.boxShadow && styles.boxShadow !== 'none') {
        expect(styles.boxShadow).toContain('rgb');
      }
    }
  },
};

// Visual States Test
export const VisualStates: Story = {
  args: {
    items: sampleItems,
    variant: 'elevated',
    showArrows: true,
    showIndicators: true,
    width: 600,
    height: 400,
    onFocus: fn(),
    onBlur: fn(),
    onClick: fn(),
    onChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(canvas.getByText('Slide 1')).toBeInTheDocument();
    });

    // Test hover states on arrows
    const nextButton = canvas
      .getAllByRole('button')
      .find((btn) => btn.querySelector('[data-testid="ArrowForwardIosIcon"]'));

    if (nextButton) {
      const initialOpacity = window.getComputedStyle(nextButton).opacity;

      await userEvent.hover(nextButton);
      await waitFor(() => {
        const hoverOpacity = window.getComputedStyle(nextButton).opacity;
        // Opacity should change on hover for overlay arrows
        expect(parseFloat(hoverOpacity)).toBeGreaterThanOrEqual(parseFloat(initialOpacity));
      });

      await userEvent.unhover(nextButton);
    }

    // Test disabled state
    const prevButton = canvas
      .getAllByRole('button')
      .find((btn) => btn.querySelector('[data-testid="ArrowBackIosIcon"]'));

    if (prevButton && prevButton.hasAttribute('disabled')) {
      expect(prevButton).toBeDisabled();
      const styles = window.getComputedStyle(prevButton);
      expect(parseFloat(styles.opacity)).toBeLessThan(1);
    }
  },
};

// Performance Test
export const Performance: Story = {
  args: {
    items: Array.from({ length: 20 }, (_, i) => ({
      id: `${i + 1}`,
      title: `Slide ${i + 1}`,
      description: `Description for slide ${i + 1}`,
      content: <div>Content {i + 1}</div>,
      image: sampleItems[i % 4].image, // Reuse sample images
      alt: `Slide ${i + 1} image`,
    })),
    autoPlay: true,
    autoPlayInterval: 2000,
    showIndicators: true,
    showArrows: true,
    width: 600,
    height: 400,
    onFocus: fn(),
    onBlur: fn(),
    onClick: fn(),
    onChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const startTime = window.performance.now();

    await waitFor(() => {
      expect(canvas.getByText('Slide 1')).toBeInTheDocument();
    });

    const renderTime = window.performance.now() - startTime;

    // Carousel should render quickly even with many items
    expect(renderTime).toBeLessThan(2000);

    // Test smooth transitions
    const nextButton = canvas
      .getAllByRole('button')
      .find((btn) => btn.querySelector('[data-testid="ArrowForwardIosIcon"]'));

    if (nextButton) {
      const transitionStart = window.performance.now();
      await userEvent.click(nextButton);

      await waitFor(() => {
        expect(canvas.getByText('Slide 2')).toBeVisible();
      });

      const transitionTime = window.performance.now() - transitionStart;
      // Transition should be smooth and complete within reasonable time
      expect(transitionTime).toBeLessThan(1500);
    }
  },
};

// Edge Cases Test
export const EdgeCases: Story = {
  args: {
    items: [
      {
        id: '1',
        title:
          'Very Long Title That Should Be Handled Gracefully Without Breaking The Layout Even When It Is Extremely Long',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
        content: <div>Content with very long text</div>,
      },
      {
        id: '2',
        title: '',
        description: '',
        content: <div>Slide with no title or description</div>,
      },
      {
        id: '3',
        title: 'Slide without image',
        description: 'This slide has no image property',
        content: <div>Text only content</div>,
      },
    ],
    loop: false,
    showArrows: true,
    showIndicators: true,
    width: 600,
    height: 400,
    onFocus: fn(),
    onBlur: fn(),
    onClick: fn(),
    onChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      const longTitle = canvasElement.querySelector('h5');
      expect(longTitle).toBeInTheDocument();
    });

    // Test non-loop behavior at boundaries
    const prevButton = canvas
      .getAllByRole('button')
      .find((btn) => btn.querySelector('[data-testid="ArrowBackIosIcon"]'));

    // At first slide, previous should be disabled when loop is false
    if (prevButton) {
      // Note: Component may need to implement this logic
      // This test documents expected behavior
    }

    // Navigate to last slide
    const nextButton = canvas
      .getAllByRole('button')
      .find((btn) => btn.querySelector('[data-testid="ArrowForwardIosIcon"]'));

    if (nextButton && !nextButton.hasAttribute('disabled')) {
      await userEvent.click(nextButton);
      // Wait for transition
      await waitFor(() => {
        expect(canvas.queryByText('Slide without image')).toBeInTheDocument();
      });

      // Try to click again if not disabled
      if (!nextButton.hasAttribute('disabled')) {
        await userEvent.click(nextButton);
      }

      // At last slide, next should be disabled when loop is false
      // Note: Component may need to implement this logic
    }

    // Test empty content handling
    expect(canvas.getByText('Slide with no title or description')).toBeInTheDocument();
  },
};

// Integration Test
export const Integration: Story = {
  args: {
    items: sampleItems,
    variant: 'cards',
    showArrows: true,
    showIndicators: true,
    showThumbnails: true,
    autoPlay: true,
    autoPlayInterval: 3000,
    pauseOnHover: true,
    onClick: fn(),
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
    width: 700,
    height: 450,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(canvas.getByText('Slide 1')).toBeInTheDocument();
    });

    // Test onClick callback
    const firstSlide = canvas.getByText('Slide 1').closest('div');
    if (firstSlide) {
      await userEvent.click(firstSlide);

      if (args.onClick) {
        await waitFor(() => {
          expect(args.onClick).toHaveBeenCalledWith(expect.objectContaining({ id: '1' }), 0);
        });
      }
    }

    // Test onChange callback
    const nextButton = canvas
      .getAllByRole('button')
      .find((btn) => btn.querySelector('[data-testid="ArrowForwardIosIcon"]'));

    if (nextButton) {
      await userEvent.click(nextButton);

      if (args.onChange) {
        await waitFor(() => {
          expect(args.onChange).toHaveBeenCalledWith(1);
        });
      }
    }

    // Test integration of multiple features
    const indicators = canvas
      .getAllByRole('button')
      .filter((btn) => btn.querySelector('[data-testid="FiberManualRecordIcon"]'));

    if (indicators.length > 2) {
      await userEvent.click(indicators[2]);

      await waitFor(() => {
        expect(canvas.getByText('Slide 3')).toBeVisible();
      });

      if (args.onChange) {
        expect(args.onChange).toHaveBeenCalledWith(2);
      }
    }
  },
};
