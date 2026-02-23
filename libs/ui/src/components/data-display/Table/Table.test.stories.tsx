import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, userEvent, waitFor,within } from 'storybook/test';

import { Table } from './Table';
import type { ColumnConfig } from './Table.types';

const meta: Meta<typeof Table> = {
  title: 'DataDisplay/Table/Tests',
  component: Table,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:Table'],
};

export default meta;
export type Story = StoryObj<typeof meta>;

// Simple test data
const testData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
];

const basicColumns: ColumnConfig[] = [
  { key: 'name', label: 'Name', sortable: true, priority: 1 },
  { key: 'email', label: 'Email', sortable: true, priority: 2 },
  { key: 'role', label: 'Role', sortable: false, priority: 3 },
];

export const BasicInteraction: Story = {
  render: function BasicInteractionTable() {
    const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);

    return (
      <Box width={600}>
        <Table
          data-testid="basic-table"
          columns={basicColumns}
          data={testData}
          selectable
          selectedRows={selectedRows}
          onSelectionChange={(newSelection) => setSelectedRows(newSelection)}
          variant="default"
        />
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const table = canvas.getByTestId('basic-table');

    // Test table renders
    await expect(table).toBeInTheDocument();

    // Test data is rendered
    await expect(canvas.getByText('John Doe')).toBeInTheDocument();
    await expect(canvas.getByText('jane@example.com')).toBeInTheDocument();
    await expect(canvas.getByText('Bob Johnson')).toBeInTheDocument();

    // Test selection functionality
    const checkboxes = canvas.getAllByRole('checkbox');
    const selectAllCheckbox = checkboxes[0];
    const firstRowCheckbox = checkboxes[1];

    // Initially nothing selected
    await expect(selectAllCheckbox).not.toBeChecked();
    await expect(firstRowCheckbox).not.toBeChecked();

    // Select first row
    await userEvent.click(firstRowCheckbox);
    await expect(firstRowCheckbox).toBeChecked();

    // Select all
    await userEvent.click(selectAllCheckbox);
    await waitFor(() => {
      checkboxes.slice(1).forEach((checkbox) => {
        expect(checkbox).toBeChecked();
      });
      expect(selectAllCheckbox).toBeChecked();
    });
  },
};

export const FormInteraction: Story = {
  render: function FormInteractionTable() {
    const [selectedRows, setSelectedRows] = useState<(string | number)[]>([1]);

    return (
      <Box width={600}>
        <Typography variant="body2" gutterBottom>
          Selected: {selectedRows.join(', ')}
        </Typography>
        <Table
          data-testid="form-table"
          columns={basicColumns}
          data={testData}
          selectable
          selectedRows={selectedRows}
          onSelectionChange={(newSelection) => setSelectedRows(newSelection)}
          variant="striped"
        />
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify initial selection
    await expect(canvas.getByText('Selected: 1')).toBeInTheDocument();

    // Check that first row checkbox is checked
    const checkboxes = canvas.getAllByRole('checkbox');
    const firstRowCheckbox = checkboxes[1];
    await expect(firstRowCheckbox).toBeChecked();

    // Test select all
    const selectAllCheckbox = checkboxes[0];
    await userEvent.click(selectAllCheckbox);

    await waitFor(() => {
      expect(canvas.getByText(/Selected: 1, 2, 3/)).toBeInTheDocument();
    });
  },
};

export const KeyboardNavigation: Story = {
  render: function KeyboardNavigationTable() {
    return (
      <Box width={600}>
        <Table
          data-testid="keyboard-table"
          columns={basicColumns}
          data={testData}
          selectable
          sortable
          variant="default"
        />
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test Tab navigation
    await userEvent.tab();
    const firstCheckbox = canvas.getAllByRole('checkbox')[0];
    await expect(firstCheckbox).toHaveFocus();
  },
};

export const ScreenReader: Story = {
  render: function ScreenReaderTable() {
    return (
      <Box width={600}>
        <Table
          data-testid="accessible-table"
          columns={basicColumns}
          data={testData}
          selectable
          variant="default"
          aria-label="User table"
        />
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const table = canvas.getByTestId('accessible-table');

    // Test accessibility attributes
    await expect(table).toHaveAttribute('aria-label', 'User table');

    // Test column headers
    const columnHeaders = canvas.getAllByRole('columnheader');
    expect(columnHeaders.length).toBeGreaterThan(0);
  },
};

export const FocusManagement: Story = {
  render: function FocusManagementTable() {
    return (
      <Box width={600}>
        <button data-testid="before">Before</button>
        <Table
          data-testid="focus-table"
          columns={basicColumns}
          data={testData}
          selectable
          variant="default"
        />
        <button data-testid="after">After</button>
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const beforeButton = canvas.getByTestId('before');
    beforeButton.focus();

    await userEvent.tab();
    const firstCheckbox = canvas.getAllByRole('checkbox')[0];
    await expect(firstCheckbox).toHaveFocus();
  },
};

export const ResponsiveDesign: Story = {
  render: function ResponsiveTable() {
    return (
      <Box maxWidth={400}>
        <Table
          data-testid="responsive-table"
          columns={basicColumns}
          data={testData}
          responsive
          variant="glass"
        />
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const table = canvas.getByTestId('responsive-table');

    await expect(table).toBeInTheDocument();
    await expect(canvas.getByText('John Doe')).toBeVisible();
  },
};

export const ThemeVariations: Story = {
  render: function ThemeVariationsTable() {
    return (
      <Box>
        <Table
          data-testid="theme-table"
          columns={basicColumns}
          data={testData}
          variant="default"
        />
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const table = canvas.getByTestId('theme-table');

    await expect(table).toBeVisible();
  },
};

export const VisualStates: Story = {
  render: function VisualStatesTable() {
    return (
      <Box>
        <Table
          data-testid="loading-table"
          columns={basicColumns}
          data={[]}
          loading
          variant="default"
        />
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const table = canvas.getByTestId('loading-table');

    await expect(table).toBeVisible();

    const loadingIndicator = canvas.getByTestId('table-loading');
    await expect(loadingIndicator).toBeInTheDocument();
  },
};

export const Performance: Story = {
  render: function PerformanceTable() {
    const data = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: 'User',
    }));

    return (
      <Box height={300}>
        <Table
          data-testid="performance-table"
          columns={basicColumns}
          data={data}
          variant="default"
        />
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const table = canvas.getByTestId('performance-table');

    await expect(table).toBeVisible();
    await expect(canvas.getByText('User 1')).toBeInTheDocument();
    await expect(canvas.getByText('User 20')).toBeInTheDocument();
  },
};

export const EdgeCases: Story = {
  render: function EdgeCasesTable() {
    return (
      <Box>
        <Table
          data-testid="empty-table"
          columns={basicColumns}
          data={[]}
          variant="default"
        />
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const table = canvas.getByTestId('empty-table');

    await expect(table).toBeVisible();
    await expect(canvas.getByText('No data available')).toBeVisible();
  },
};

export const Integration: Story = {
  render: function IntegrationTable() {
    const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);

    return (
      <Box width={600}>
        <Typography variant="body2" gutterBottom>
          Selected: {selectedRows.length} rows
        </Typography>
        <Table
          data-testid="integration-table"
          columns={basicColumns}
          data={testData}
          selectable
          sortable
          selectedRows={selectedRows}
          onSelectionChange={(newSelection) => setSelectedRows(newSelection)}
          variant="default"
        />
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const table = canvas.getByTestId('integration-table');

    await expect(table).toBeVisible();

    // Test selection
    const selectAllCheckbox = canvas.getAllByRole('checkbox')[0];
    await userEvent.click(selectAllCheckbox);

    await waitFor(() => {
      expect(canvas.getByText(/Selected: 3 rows/)).toBeVisible();
    });
  },
};
