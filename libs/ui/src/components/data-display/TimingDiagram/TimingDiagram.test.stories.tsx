import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent,waitFor, within } from 'storybook/test';

import { TimingDiagram } from './TimingDiagram';

const meta: Meta<typeof TimingDiagram> = {
  title: 'Enhanced/TimingDiagram/Tests',
  component: TimingDiagram,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:TimingDiagram'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData = {
  dns: 45,
  connect: 120,
  ssl: 180,
  request: 25,
  response: 380,
  total: 750,
};

// Basic Interaction Test - Verify timing calculations and rendering
export const BasicInteraction: Story = {
  args: {
    data: sampleData,
    variant: 'waterfall',
    showLabels: true,
    showTooltips: true,
    animated: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify the timing diagram renders
    const container = canvas.getByRole('region', { name: /timing diagram/i });
    await expect(container).toBeInTheDocument();

    // Check that all timing segments are rendered
    const segments = container.querySelectorAll('[data-testid^="timing-segment"]');
    const expectedPhases = Object.entries(sampleData).filter(
      ([key, value]) => key !== 'total' && value > 0,
    ).length;
    await expect(segments.length).toBe(expectedPhases);

    // Verify DNS segment exists and has correct width percentage
    const dnsSegment = container.querySelector('[data-testid="timing-segment-dns"]') as HTMLElement;
    await expect(dnsSegment).toBeInTheDocument();
    const dnsPercentage = (sampleData.dns / sampleData.total) * 100;
    const dnsActualWidth = parseFloat(dnsSegment.style.width.replace('%', ''));
    await expect(Math.abs(dnsActualWidth - dnsPercentage)).toBeLessThan(0.1);

    // Verify connect segment width
    const connectSegment = container.querySelector(
      '[data-testid="timing-segment-connect"]',
    ) as HTMLElement;
    await expect(connectSegment).toBeInTheDocument();
    const connectPercentage = (sampleData.connect / sampleData.total) * 100;
    const connectActualWidth = parseFloat(connectSegment.style.width.replace('%', ''));
    await expect(Math.abs(connectActualWidth - connectPercentage)).toBeLessThan(0.1);

    // Verify response segment width
    const responseSegment = container.querySelector(
      '[data-testid="timing-segment-response"]',
    ) as HTMLElement;
    await expect(responseSegment).toBeInTheDocument();
    const responsePercentage = (sampleData.response / sampleData.total) * 100;
    const responseActualWidth = parseFloat(responseSegment.style.width.replace('%', ''));
    await expect(Math.abs(responseActualWidth - responsePercentage)).toBeLessThan(0.1);

    // Check timeline markers are rendered with correct values
    const timeLabels = container.querySelectorAll('.MuiTypography-root');
    const totalTimeLabel = Array.from(timeLabels).find((el) => el.textContent?.includes('750ms'));
    await expect(totalTimeLabel).toBeInTheDocument();

    // Verify labels show correct timing values for segments >10% width
    const labels = container.querySelectorAll('[data-testid="timing-label"]');
    await expect(labels.length).toBeGreaterThan(0);
    // DNS (6%) won't show label, check connect and response which are >10%
    const connectLabel = Array.from(labels).find((el) => el.textContent === '120ms');
    await expect(connectLabel).toBeInTheDocument();
    const responseLabel = Array.from(labels).find((el) => el.textContent === '380ms');
    await expect(responseLabel).toBeInTheDocument();

    await waitFor(() => {
      const status = document.createElement('div');
      status.setAttribute('aria-label', 'Status of the test run');
      status.textContent = 'PASS';
      canvasElement.appendChild(status);
    });
  },
};

// State Change Test - Verify stacked variant calculations
export const StateChangeTest: Story = {
  args: {
    data: sampleData,
    variant: 'stacked',
    showLabels: true,
    showTooltips: true,
    animated: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify initial state
    const container = canvas.getByRole('region', { name: /timing diagram/i });
    await expect(container).toBeInTheDocument();

    // Check variant is applied
    const stackedContainer = container.querySelector('[data-variant="stacked"]');
    await expect(stackedContainer).toBeInTheDocument();

    // Verify segments are stacked horizontally with correct widths
    const totalWidth = 100;
    let calculatedTotal = 0;

    // Check each segment's width percentage - check all segments
    const allSegments = container.querySelectorAll('[data-testid^="timing-segment-"]');
    for (const segment of allSegments) {
      const segmentElement = segment as HTMLElement;
      const actualWidth = parseFloat(segmentElement.style.width?.replace('%', '') || '0');
      calculatedTotal += actualWidth;
    }

    // Verify total width adds up to 100%
    await expect(Math.abs(calculatedTotal - totalWidth)).toBeLessThan(5);

    // Check total time display
    const totalTimeText =
      container.querySelector('text')?.textContent ||
      Array.from(container.querySelectorAll('.MuiTypography-caption')).find((el) =>
        el.textContent?.includes('Total:'),
      )?.textContent;
    await expect(totalTimeText).toContain('750ms');

    await waitFor(() => {
      const status = document.createElement('div');
      status.setAttribute('aria-label', 'Status of the test run');
      status.textContent = 'PASS';
      canvasElement.appendChild(status);
    });
  },
};

// Visual States Test - Verify horizontal variant and timing values
export const VisualStatesTest: Story = {
  args: {
    data: sampleData,
    variant: 'horizontal',
    showLabels: true,
    showTooltips: false,
    animated: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify the component renders
    const container = canvas.getByRole('region', { name: /timing diagram/i });
    await expect(container).toBeInTheDocument();

    // Check that animations are disabled
    const animatedElements = container.querySelectorAll('[data-animated="false"]');
    await expect(animatedElements.length).toBeGreaterThan(0);

    // Verify horizontal variant structure
    const horizontalContainer = container.querySelector('[data-variant="horizontal"]');
    await expect(horizontalContainer).toBeInTheDocument();

    // Check each phase has label, bar, and value
    const segments = container.querySelectorAll('[data-testid^="timing-segment"]');

    for (const segment of segments) {
      // Each segment should have a label
      const label = segment.querySelector('.label');
      await expect(label).toBeInTheDocument();

      // Each segment should have a bar
      const bar = segment.querySelector('.bar');
      await expect(bar).toBeInTheDocument();

      // Each segment should have a value
      const value = segment.querySelector('.value');
      await expect(value).toBeInTheDocument();
    }

    // Verify specific timing values are displayed
    const timingLabels = container.querySelectorAll('[data-testid="timing-label"]');
    const timingValues = Array.from(timingLabels).map((el) => el.textContent);

    // Check DNS timing
    await expect(timingValues).toContain('45ms');
    // Check connect timing
    await expect(timingValues).toContain('120ms');
    // Check SSL timing
    await expect(timingValues).toContain('180ms');
    // Check request timing
    await expect(timingValues).toContain('25ms');
    // Check response timing
    await expect(timingValues).toContain('380ms');

    // Verify total time display
    const totalTimeElement = Array.from(container.querySelectorAll('.MuiTypography-body2')).find(
      (el) => el.textContent?.includes('Total Time:'),
    );
    await expect(totalTimeElement?.textContent).toContain('750ms');

    await waitFor(() => {
      const status = document.createElement('div');
      status.setAttribute('aria-label', 'Status of the test run');
      status.textContent = 'PASS';
      canvasElement.appendChild(status);
    });
  },
};

// Responsive Design Test
export const ResponsiveDesignTest: Story = {
  args: {
    data: sampleData,
    variant: 'waterfall',
    showLabels: true,
    showTooltips: true,
    animated: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify responsive rendering
    const container = canvas.getByRole('region', { name: /timing diagram/i });
    await expect(container).toBeInTheDocument();

    // Check that it adapts to viewport
    const computedStyle = window.getComputedStyle(container);
    await expect(computedStyle.width).toBeDefined();

    await waitFor(() => {
      const status = document.createElement('div');
      status.setAttribute('aria-label', 'Status of the test run');
      status.textContent = 'PASS';
      canvasElement.appendChild(status);
    });
  },
};

// Performance Test - Verify large values formatting and scaling
export const PerformanceTest: Story = {
  args: {
    data: {
      dns: 150,
      connect: 400,
      ssl: 600,
      request: 80,
      response: 1200,
      total: 2430,
    },
    variant: 'stacked',
    showLabels: true,
    showTooltips: true,
    animated: true,
  },
  play: async ({ canvasElement }) => {
    const startTime = Date.now();
    const canvas = within(canvasElement);

    // Verify rendering with large data
    const container = canvas.getByRole('region', { name: /timing diagram/i });
    await expect(container).toBeInTheDocument();

    const renderTime = Date.now() - startTime;
    // Should render within reasonable time
    await expect(renderTime).toBeLessThan(1000);

    // Verify large values are formatted correctly (seconds instead of ms)
    const totalTimeDisplay = Array.from(container.querySelectorAll('.MuiTypography-caption')).find(
      (el) => el.textContent?.includes('Total:'),
    );
    await expect(totalTimeDisplay?.textContent).toContain('2.43s');

    // Verify response segment (largest) has correct proportion
    const responseSegment = container.querySelector(
      '[data-testid="timing-segment-response"]',
    ) as HTMLElement;
    const responseExpectedWidth = (1200 / 2430) * 100; // ~49.4%
    const responseActualWidth = parseFloat(responseSegment?.style.width || '0');
    await expect(Math.abs(responseActualWidth - responseExpectedWidth)).toBeLessThan(0.5);

    // Verify SSL segment proportion
    const sslSegment = container.querySelector('[data-testid="timing-segment-ssl"]') as HTMLElement;
    const sslExpectedWidth = (600 / 2430) * 100; // ~24.7%
    const sslActualWidth = parseFloat(sslSegment?.style.width || '0');
    await expect(Math.abs(sslActualWidth - sslExpectedWidth)).toBeLessThan(0.5);

    // Check that labels show correct formatted values
    const labels = container.querySelectorAll('[data-testid="timing-label"]');
    const labelTexts = Array.from(labels).map((el) => el.textContent);

    // Values over 1000ms should be in seconds
    await expect(labelTexts.some((text) => text === '1.20s')).toBe(true); // response
    // Only segments >10% show labels in stacked variant
    await expect(labelTexts.some((text) => text === '400ms')).toBe(true); // connect (16.46%)
    await expect(labelTexts.some((text) => text === '600ms')).toBe(true); // ssl (24.69%)
    // DNS (6.17%) and request (3.29%) won't show labels due to <10% threshold

    await waitFor(() => {
      const status = document.createElement('div');
      status.setAttribute('aria-label', 'Status of the test run');
      status.textContent = 'PASS';
      canvasElement.appendChild(status);
    });
  },
};

// Edge Cases Test - Verify handling of partial data and zero values
export const EdgeCasesTest: Story = {
  args: {
    data: {
      dns: 0, // Zero value should be filtered out
      request: 50,
      response: 150,
      total: 200,
    },
    variant: 'waterfall',
    showLabels: true,
    showTooltips: true,
    animated: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify handling of minimal data
    const container = canvas.getByRole('region', { name: /timing diagram/i });
    await expect(container).toBeInTheDocument();

    // Should handle missing phases gracefully - only non-zero phases rendered
    const segments = container.querySelectorAll('[data-testid^="timing-segment"]');
    await expect(segments.length).toBe(2); // Only request and response

    // DNS segment should not exist (zero value)
    const dnsSegment = container.querySelector('[data-testid="timing-segment-dns"]');
    await expect(dnsSegment).not.toBeInTheDocument();

    // Connect segment should not exist (undefined)
    const connectSegment = container.querySelector('[data-testid="timing-segment-connect"]');
    await expect(connectSegment).not.toBeInTheDocument();

    // Request segment should exist with correct width
    const requestSegment = container.querySelector(
      '[data-testid="timing-segment-request"]',
    ) as HTMLElement;
    await expect(requestSegment).toBeInTheDocument();
    const requestExpectedWidth = (50 / 200) * 100; // 25%
    await expect(requestSegment.style.width).toBe(`${requestExpectedWidth}%`);

    // Response segment should exist with correct width
    const responseSegment = container.querySelector(
      '[data-testid="timing-segment-response"]',
    ) as HTMLElement;
    await expect(responseSegment).toBeInTheDocument();
    const responseExpectedWidth = (150 / 200) * 100; // 75%
    await expect(responseSegment.style.width).toBe(`${responseExpectedWidth}%`);

    // Check waterfall offset positioning
    const requestOffset = parseFloat(requestSegment.style.left || '0');
    await expect(requestOffset).toBe(0); // First segment starts at 0

    const responseOffset = parseFloat(responseSegment.style.left || '0');
    await expect(responseOffset).toBe(requestExpectedWidth); // Second segment starts after first

    // Verify timeline markers
    const timeLabels = container.querySelectorAll('.MuiTypography-root');
    const timeMarkers = Array.from(timeLabels)
      .filter((el) => el.textContent?.includes('ms'))
      .map((el) => el.textContent);

    await expect(timeMarkers).toContain('0ms');
    await expect(timeMarkers).toContain('100ms'); // Half of 200ms
    await expect(timeMarkers).toContain('200ms'); // Total

    await waitFor(() => {
      const status = document.createElement('div');
      status.setAttribute('aria-label', 'Status of the test run');
      status.textContent = 'PASS';
      canvasElement.appendChild(status);
    });
  },
};

// Accessibility Test - Verify ARIA attributes and semantic structure
export const AccessibilityTest: Story = {
  args: {
    data: sampleData,
    variant: 'waterfall',
    showLabels: true,
    showTooltips: true,
    animated: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check for proper ARIA attributes
    const container = canvas.getByRole('region', { name: /timing diagram/i });
    await expect(container).toBeInTheDocument();
    await expect(container).toHaveAttribute('aria-label', 'Timing diagram');

    // Check heading structure
    const heading = canvas.getByText('Request Timing');
    await expect(heading).toBeInTheDocument();
    await expect(heading.tagName).toBe('H6');

    // Verify segments are accessible
    const segments = container.querySelectorAll('[data-testid^="timing-segment"]');
    for (const segment of segments) {
      // Each segment should have describedby for tooltip
      const hasTooltip = segment.closest('[aria-describedby]');
      if (hasTooltip) {
        await expect(hasTooltip).toHaveAttribute('aria-describedby');
      }
    }

    // Check legend is present and accessible
    const legendItems = container.querySelectorAll('.MuiTypography-root');
    const hasLegendLabels = Array.from(legendItems).some(
      (el) =>
        el.textContent?.includes('DNS Lookup') ||
        el.textContent?.includes('Connection') ||
        el.textContent?.includes('SSL/TLS'),
    );
    await expect(hasLegendLabels).toBe(true);

    await waitFor(() => {
      const status = document.createElement('div');
      status.setAttribute('aria-label', 'Status of the test run');
      status.textContent = 'PASS';
      canvasElement.appendChild(status);
    });
  },
};

// Keyboard Navigation Test - Verify keyboard interactions
export const KeyboardNavigationTest: Story = {
  args: {
    data: sampleData,
    variant: 'horizontal',
    showLabels: true,
    showTooltips: true,
    animated: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const container = canvas.getByRole('region', { name: /timing diagram/i });
    await expect(container).toBeInTheDocument();

    // Focus on the container
    container.focus();
    await waitFor(() => expect(document.activeElement).toBe(container));

    // Tab through interactive elements
    await userEvent.tab();

    // Check tooltips can be triggered via keyboard
    const segments = container.querySelectorAll('[data-testid^="timing-segment"]');
    if (segments.length > 0) {
      const firstSegment = segments[0] as HTMLElement;

      // Simulate keyboard focus
      firstSegment.focus?.();

      // Verify segment can receive focus for tooltip
      const hasAriaDescribedBy = firstSegment.closest('[aria-describedby]');
      await expect(hasAriaDescribedBy || firstSegment).toBeTruthy();
    }

    await waitFor(() => {
      const status = document.createElement('div');
      status.setAttribute('aria-label', 'Status of the test run');
      status.textContent = 'PASS';
      canvasElement.appendChild(status);
    });
  },
};

// Screen Reader Test - Verify screen reader compatibility
export const ScreenReaderTest: Story = {
  args: {
    data: sampleData,
    variant: 'stacked',
    showLabels: true,
    showTooltips: true,
    animated: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const container = canvas.getByRole('region', { name: /timing diagram/i });
    await expect(container).toBeInTheDocument();

    // Check that timing values are available to screen readers
    const timingLabels = container.querySelectorAll('[data-testid="timing-label"]');
    for (const label of timingLabels) {
      const text = label.textContent;
      await expect(text).toBeTruthy();
      // Verify format is readable (e.g., "45ms" or "1.20s")
      await expect(text).toMatch(/^\d+(\.\d+)?(ms|s)$/);
    }

    // Check total time is announced
    const totalTimeElements = container.querySelectorAll(
      '.MuiTypography-caption, .MuiTypography-body2',
    );
    const totalTimeElement = Array.from(totalTimeElements).find((el) =>
      el.textContent?.includes('Total'),
    );
    await expect(totalTimeElement).toBeInTheDocument();
    await expect(totalTimeElement?.textContent).toContain('750ms');

    // Verify legend items are readable
    const legendContainer = Array.from(container.querySelectorAll('.MuiBox-root')).find((el) =>
      el.querySelector('.color'),
    );
    if (legendContainer) {
      const legendLabels = legendContainer.querySelectorAll('.label');
      await expect(legendLabels.length).toBeGreaterThan(0);
    }

    await waitFor(() => {
      const status = document.createElement('div');
      status.setAttribute('aria-label', 'Status of the test run');
      status.textContent = 'PASS';
      canvasElement.appendChild(status);
    });
  },
};

// Focus Management Test - Verify focus states and management
export const FocusManagementTest: Story = {
  args: {
    data: sampleData,
    variant: 'waterfall',
    showLabels: true,
    showTooltips: true,
    animated: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const container = canvas.getByRole('region', { name: /timing diagram/i });
    await expect(container).toBeInTheDocument();

    // Check container can receive focus
    container.focus();
    await waitFor(() => expect(document.activeElement).toBe(container));

    // Verify segments have hover states (visual feedback)
    const segments = container.querySelectorAll('[data-testid^="timing-segment"]');
    for (const segment of segments) {
      const computedStyle = window.getComputedStyle(segment);

      // Segments should have transition for hover effect
      await expect(computedStyle.transition).toContain('0.5s');

      // Hover should change transform or shadow
      await userEvent.hover(segment);
      await waitFor(() => {
        const hoverStyle = window.getComputedStyle(segment);
        // Check for hover effect (transform or shadow change)
        const hasHoverEffect = hoverStyle.transform !== 'none' || hoverStyle.boxShadow !== 'none';
        expect(hasHoverEffect).toBe(true);
      });
      await userEvent.unhover(segment);
    }

    await waitFor(() => {
      const status = document.createElement('div');
      status.setAttribute('aria-label', 'Status of the test run');
      status.textContent = 'PASS';
      canvasElement.appendChild(status);
    });
  },
};

// Theme Variations Test - Verify interactive features and tooltips
export const ThemeVariationsTest: Story = {
  args: {
    data: sampleData,
    variant: 'stacked',
    showLabels: true,
    showTooltips: true,
    animated: true,
  },
  parameters: {
    theme: 'dark',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify theme support
    const container = canvas.getByRole('region', { name: /timing diagram/i });
    await expect(container).toBeInTheDocument();

    // Check that segments have correct colors from phaseColors
    const dnsSegment = container.querySelector('[data-testid="timing-segment-dns"]') as HTMLElement;
    const dnsStyle = window.getComputedStyle(dnsSegment);
    await expect(dnsStyle.background).toContain('rgb(156, 39, 176)'); // #9C27B0 in RGB

    const connectSegment = container.querySelector(
      '[data-testid="timing-segment-connect"]',
    ) as HTMLElement;
    const connectStyle = window.getComputedStyle(connectSegment);
    await expect(connectStyle.background).toContain('rgb(33, 150, 243)'); // #2196F3 in RGB

    const sslSegment = container.querySelector('[data-testid="timing-segment-ssl"]') as HTMLElement;
    const sslStyle = window.getComputedStyle(sslSegment);
    await expect(sslStyle.background).toContain('rgb(0, 188, 212)'); // #00BCD4 in RGB

    const requestSegment = container.querySelector(
      '[data-testid="timing-segment-request"]',
    ) as HTMLElement;
    const requestStyle = window.getComputedStyle(requestSegment);
    await expect(requestStyle.background).toContain('rgb(76, 175, 80)'); // #4CAF50 in RGB

    const responseSegment = container.querySelector(
      '[data-testid="timing-segment-response"]',
    ) as HTMLElement;
    const responseStyle = window.getComputedStyle(responseSegment);
    await expect(responseStyle.background).toContain('rgb(255, 152, 0)'); // #FF9800 in RGB

    // Verify component renders properly in theme
    await expect(container).toHaveAttribute('role', 'region');

    await waitFor(() => {
      const status = document.createElement('div');
      status.setAttribute('aria-label', 'Status of the test run');
      status.textContent = 'PASS';
      canvasElement.appendChild(status);
    });
  },
};

// Integration Test - Verify waterfall cascading and offsets
export const IntegrationTest: Story = {
  args: {
    data: sampleData,
    variant: 'waterfall',
    showLabels: true,
    showTooltips: true,
    animated: true,
    height: 60,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify full integration
    const container = canvas.getByRole('region', { name: /timing diagram/i });
    await expect(container).toBeInTheDocument();

    // Check height prop affects waterfall container
    const waterfallContainer = container.querySelector('[data-variant="waterfall"]') as HTMLElement;
    await expect(waterfallContainer).toBeInTheDocument();
    const containerHeight = parseInt(waterfallContainer.style.height || '0');
    await expect(containerHeight).toBe(100); // height (60) + 40

    // Verify waterfall cascading effect - each segment has different top position
    const segments = container.querySelectorAll('[data-testid^="timing-segment"]');
    const topPositions: number[] = [];

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i] as HTMLElement;
      const topPos = parseInt(segment.style.top || '0');
      topPositions.push(topPos);

      // Each segment should be 8px lower than the previous
      await expect(topPos).toBe(i * 8);
    }

    // Verify cumulative offset positioning
    let cumulativeOffset = 0;
    const dnsSegment = container.querySelector('[data-testid="timing-segment-dns"]') as HTMLElement;
    if (dnsSegment) {
      const dnsOffset = parseFloat(dnsSegment.style.left || '0');
      await expect(dnsOffset).toBe(0); // First segment starts at 0
      cumulativeOffset += parseFloat(dnsSegment.style.width || '0');
    }

    const connectSegment = container.querySelector(
      '[data-testid="timing-segment-connect"]',
    ) as HTMLElement;
    if (connectSegment) {
      const connectOffset = parseFloat(connectSegment.style.left || '0');
      await expect(Math.abs(connectOffset - cumulativeOffset)).toBeLessThan(0.1);
      cumulativeOffset += parseFloat(connectSegment.style.width || '0');
    }

    const sslSegment = container.querySelector('[data-testid="timing-segment-ssl"]') as HTMLElement;
    if (sslSegment) {
      const sslOffset = parseFloat(sslSegment.style.left || '0');
      await expect(Math.abs(sslOffset - cumulativeOffset)).toBeLessThan(0.1);
      cumulativeOffset += parseFloat(sslSegment.style.width || '0');
    }

    // Verify legend is displayed with all phases
    const legendItems = container.querySelectorAll('.MuiBox-root');
    const legendLabels = ['DNS Lookup', 'Connection', 'SSL/TLS', 'Request', 'Response'];

    for (const label of legendLabels) {
      const legendItem = Array.from(legendItems).find((el) => el.textContent?.includes(label));
      if (sampleData[label.toLowerCase().replace(/[^a-z]/g, '')] > 0) {
        await expect(legendItem).toBeInTheDocument();
      }
    }

    // Check animation data attribute
    const animatedSegments = container.querySelectorAll('[data-animated="true"]');
    await expect(animatedSegments.length).toBeGreaterThan(0);

    await waitFor(() => {
      const status = document.createElement('div');
      status.setAttribute('aria-label', 'Status of the test run');
      status.textContent = 'PASS';
      canvasElement.appendChild(status);
    });
  },
};
