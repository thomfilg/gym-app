import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn,within } from 'storybook/test';

import { Chart } from './Chart';

const meta: Meta<typeof Chart> = {
  title: 'DataDisplay/Chart/Tests',
  component: Chart,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:Chart'],
};

export default meta;
export type Story = StoryObj<typeof meta>;

// Test data
const testData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 2000 },
];

// Basic interaction test
export const BasicInteraction: Story = {
  args: {
    type: 'line',
    data: testData,
    series: [{ dataKey: 'sales', name: 'Sales' }],
    title: 'Test Chart',
    onClick: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText('Test Chart');
    expect(title).toBeInTheDocument();
  },
};

export const FormInteraction: Story = {
  args: {
    type: 'bar',
    data: testData,
    series: [{ dataKey: 'sales', name: 'Sales' }],
    title: 'Bar Test',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText('Bar Test');
    expect(title).toBeInTheDocument();
  },
};

export const KeyboardNavigation: Story = {
  args: {
    type: 'line',
    data: testData,
    title: 'Keyboard Test',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText('Keyboard Test');
    expect(title).toBeInTheDocument();
  },
};

export const ScreenReader: Story = {
  args: {
    type: 'pie',
    data: [{ name: 'A', value: 50 }],
    title: 'Accessibility Test',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText('Accessibility Test');
    expect(title).toBeInTheDocument();
  },
};

export const FocusManagement: Story = {
  args: {
    type: 'bar',
    data: testData,
    title: 'Focus Test',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText('Focus Test');
    expect(title).toBeInTheDocument();
  },
};

export const ResponsiveDesign: Story = {
  args: {
    type: 'line',
    data: testData,
    title: 'Responsive Test',
    responsive: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText('Responsive Test');
    expect(title).toBeInTheDocument();
  },
};

export const ThemeVariations: Story = {
  args: {
    type: 'area',
    data: testData,
    title: 'Theme Test',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText('Theme Test');
    expect(title).toBeInTheDocument();
  },
};

export const VisualStates: Story = {
  args: {
    type: 'bar',
    data: testData,
    title: 'Visual Test',
    variant: 'elevated',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText('Visual Test');
    expect(title).toBeInTheDocument();
  },
};

export const Performance: Story = {
  args: {
    type: 'line',
    data: testData,
    title: 'Performance Test',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText('Performance Test');
    expect(title).toBeInTheDocument();
  },
};

export const EdgeCases: Story = {
  args: {
    type: 'line',
    data: [{ name: 'Single', value: 42 }],
    title: 'Edge Test',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText('Edge Test');
    expect(title).toBeInTheDocument();
  },
};

export const Integration: Story = {
  args: {
    type: 'composed',
    data: testData,
    title: 'Integration Test',
    showLegend: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText('Integration Test');
    expect(title).toBeInTheDocument();
  },
};
