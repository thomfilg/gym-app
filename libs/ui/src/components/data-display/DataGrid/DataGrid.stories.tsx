import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { DensityProvider } from '../../../utils/density';
import { DataGrid } from './DataGrid';
import type { GridColumn } from './DataGrid.types';

// Sample data for stories
interface SampleRow {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  salary: number;
  joinDate: string;
  department: string;
}

const generateSampleData = (count: number): SampleRow[] => {
  const roles = ['Engineer', 'Designer', 'Manager', 'Analyst', 'Developer'];
  const departments = ['Engineering', 'Design', 'Sales', 'Marketing', 'HR'];
  const statuses = ['active', 'inactive'] as const;

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: roles[i % roles.length],
    status: statuses[i % 2],
    salary: 50000 + (i * 1000) + Math.floor(Math.random() * 20000),
    joinDate: new Date(2020 + (i % 4), (i % 12), (i % 28) + 1).toISOString().split('T')[0],
    department: departments[i % departments.length],
  }));
};

const sampleColumns: GridColumn<SampleRow>[] = [
  {
    id: 'id',
    header: 'ID',
    accessor: 'id',
    type: 'number',
    width: 80,
    minWidth: 60,
  },
  {
    id: 'name',
    header: 'Name',
    accessor: 'name',
    type: 'text',
    width: 150,
    minWidth: 120,
    enableSort: true,
    enableFilter: true,
  },
  {
    id: 'email',
    header: 'Email',
    accessor: 'email',
    type: 'text',
    width: 200,
    minWidth: 150,
    enableSort: true,
    enableFilter: true,
  },
  {
    id: 'role',
    header: 'Role',
    accessor: 'role',
    type: 'text',
    width: 120,
    minWidth: 100,
    enableSort: true,
    enableFilter: true,
  },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    type: 'text',
    width: 100,
    minWidth: 80,
    cell: ({ value }) => (
      <span
        style={{
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: 'bold',
          backgroundColor: value === 'active' ? '#e8f5e8' : '#ffeaea',
          color: value === 'active' ? '#2e7d32' : '#d32f2f',
        }}
      >
        {value}
      </span>
    ),
    enableSort: true,
    enableFilter: true,
  },
  {
    id: 'salary',
    header: 'Salary',
    accessor: 'salary',
    type: 'currency',
    width: 120,
    minWidth: 100,
    cell: ({ value }) => `$${value.toLocaleString()}`,
    enableSort: true,
  },
  {
    id: 'joinDate',
    header: 'Join Date',
    accessor: 'joinDate',
    type: 'date',
    width: 120,
    minWidth: 100,
    enableSort: true,
  },
  {
    id: 'department',
    header: 'Department',
    accessor: 'department',
    type: 'text',
    width: 120,
    minWidth: 100,
    enableSort: true,
    enableFilter: true,
  },
];

const meta: Meta<typeof DataGrid> = {
  title: 'Enhanced/DataGrid',
  component: DataGrid,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A high-performance DataGrid component with virtualization, sorting, filtering, pagination, selection, and inline editing capabilities.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    rows: {
      description: 'Array of data rows to display',
      control: { type: 'object' },
    },
    columns: {
      description: 'Column definitions',
      control: { type: 'object' },
    },
    sizeMode: {
      description: 'Column sizing strategy',
      control: { type: 'select' },
      options: ['auto', 'fixed', 'fill'],
    },
    density: {
      description: 'Row density/spacing',
      control: { type: 'select' },
      options: ['compact', 'comfortable', 'spacious'],
    },
    loading: {
      description: 'Show loading state',
      control: { type: 'boolean' },
    },
    virtualizeRows: {
      description: 'Enable row virtualization for large datasets',
      control: { type: 'boolean' },
    },
    stickyHeader: {
      description: 'Keep header visible while scrolling',
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  args: {
    rows: generateSampleData(20),
    columns: sampleColumns,
    ariaLabel: 'Employee data grid',
  },
};

export const Empty: Story = {
  args: {
    rows: [],
    columns: sampleColumns,
    ariaLabel: 'Empty data grid',
  },
};

export const Loading: Story = {
  args: {
    rows: [],
    columns: sampleColumns,
    loading: true,
    ariaLabel: 'Loading data grid',
  },
};

export const Error: Story = {
  args: {
    rows: [],
    columns: sampleColumns,
    error: 'Failed to load data. Please try again.',
    ariaLabel: 'Error data grid',
  },
};

// Density Variations
export const CompactDensity: Story = {
  args: {
    rows: generateSampleData(15),
    columns: sampleColumns,
    density: 'compact',
    ariaLabel: 'Compact density data grid',
  },
};

export const ComfortableDensity: Story = {
  args: {
    rows: generateSampleData(15),
    columns: sampleColumns,
    density: 'comfortable',
    ariaLabel: 'Comfortable density data grid',
  },
};

export const SpaciousDensity: Story = {
  args: {
    rows: generateSampleData(15),
    columns: sampleColumns,
    density: 'spacious',
    ariaLabel: 'Spacious density data grid',
  },
};

// Selection Examples
export const SingleSelection: Story = {
  args: {
    rows: generateSampleData(10),
    columns: sampleColumns,
    selection: {
      mode: 'single',
      defaultSelectedRowIds: [3],
    },
    ariaLabel: 'Single selection data grid',
  },
};

export const MultiSelection: Story = {
  args: {
    rows: generateSampleData(10),
    columns: sampleColumns,
    selection: {
      mode: 'multi',
      defaultSelectedRowIds: [1, 3, 5],
    },
    ariaLabel: 'Multi selection data grid',
  },
};

// Sorting Examples
export const ClientSorting: Story = {
  args: {
    rows: generateSampleData(20),
    columns: sampleColumns,
    sorting: {
      mode: 'client',
      defaultSortBy: [{ id: 'name', dir: 'asc' }],
    },
    ariaLabel: 'Client-side sorting data grid',
  },
};

export const ServerSorting: Story = {
  args: {
    rows: generateSampleData(20),
    columns: sampleColumns,
    sorting: {
      mode: 'server',
    },
    onRequestData: (params) => {
      // Server request handler for demo
      void params;
    },
    ariaLabel: 'Server-side sorting data grid',
  },
};

// Virtualization Example
export const VirtualizedLargeDataset: Story = {
  args: {
    rows: generateSampleData(10000),
    columns: sampleColumns,
    virtualizeRows: true,
    ariaLabel: 'Virtualized large dataset data grid',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '600px', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
};

export const NonVirtualizedSmallDataset: Story = {
  args: {
    rows: generateSampleData(20),
    columns: sampleColumns,
    virtualizeRows: false,
    ariaLabel: 'Non-virtualized small dataset data grid',
  },
};

// Row Expansion Example
export const WithRowExpansion: Story = {
  args: {
    rows: generateSampleData(10),
    columns: sampleColumns,
    expansion: {
      render: (row: SampleRow) => (
        <div style={{ padding: '16px', backgroundColor: '#f5f5f5' }}>
          <h4>Additional Details for {row.name}</h4>
          <p><strong>Employee ID:</strong> {row.id}</p>
          <p><strong>Full Email:</strong> {row.email}</p>
          <p><strong>Salary Details:</strong> ${row.salary.toLocaleString()} per year</p>
          <p><strong>Join Date:</strong> {new Date(row.joinDate).toLocaleDateString()}</p>
        </div>
      ),
      defaultExpandedRowIds: [1, 3],
    },
    ariaLabel: 'Data grid with row expansion',
  },
};

// Size Mode Examples
export const AutoSizeMode: Story = {
  args: {
    rows: generateSampleData(15),
    columns: sampleColumns,
    sizeMode: 'auto',
    ariaLabel: 'Auto size mode data grid',
  },
};

export const FixedSizeMode: Story = {
  args: {
    rows: generateSampleData(15),
    columns: sampleColumns,
    sizeMode: 'fixed',
    ariaLabel: 'Fixed size mode data grid',
  },
};

export const FillSizeMode: Story = {
  args: {
    rows: generateSampleData(15),
    columns: sampleColumns,
    sizeMode: 'fill',
    ariaLabel: 'Fill size mode data grid',
  },
};

// Custom Empty State
export const CustomEmptyState: Story = {
  args: {
    rows: [],
    columns: sampleColumns,
    emptyState: (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h3>No Employees Found</h3>
        <p>Try adjusting your search criteria or add new employees.</p>
        <button style={{ marginTop: '16px', padding: '8px 16px' }}>
          Add Employee
        </button>
      </div>
    ),
    ariaLabel: 'Custom empty state data grid',
  },
};

// All Variants Story (for testing)
export const AllVariants: Story = {
  args: {
    rows: generateSampleData(100),
    columns: sampleColumns,
    selection: { mode: 'multi' },
    sorting: { mode: 'client' },
    virtualizeRows: true,
    stickyHeader: true,
    density: 'comfortable',
    ariaLabel: 'All variants data grid',
  },
};

// All Sizes Story
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100vh' }}>
      <div style={{ height: '300px' }}>
        <h3>Compact</h3>
        <DataGrid
          rows={generateSampleData(50)}
          columns={sampleColumns.slice(0, 4)}
          density="compact"
          ariaLabel="Compact size data grid"
        />
      </div>
      <div style={{ height: '300px' }}>
        <h3>Comfortable</h3>
        <DataGrid
          rows={generateSampleData(50)}
          columns={sampleColumns.slice(0, 4)}
          density="comfortable"
          ariaLabel="Comfortable size data grid"
        />
      </div>
      <div style={{ height: '300px' }}>
        <h3>Spacious</h3>
        <DataGrid
          rows={generateSampleData(50)}
          columns={sampleColumns.slice(0, 4)}
          density="spacious"
          ariaLabel="Spacious size data grid"
        />
      </div>
    </div>
  ),
};

// All States Story
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', height: '100vh' }}>
      <div>
        <h3>Loading State</h3>
        <DataGrid
          rows={[]}
          columns={sampleColumns.slice(0, 4)}
          loading={true}
          ariaLabel="Loading state data grid"
        />
      </div>
      <div>
        <h3>Error State</h3>
        <DataGrid
          rows={[]}
          columns={sampleColumns.slice(0, 4)}
          error="Connection failed"
          ariaLabel="Error state data grid"
        />
      </div>
      <div>
        <h3>Empty State</h3>
        <DataGrid
          rows={[]}
          columns={sampleColumns.slice(0, 4)}
          ariaLabel="Empty state data grid"
        />
      </div>
      <div>
        <h3>With Data</h3>
        <DataGrid
          rows={generateSampleData(20)}
          columns={sampleColumns.slice(0, 4)}
          selection={{ mode: 'multi', defaultSelectedRowIds: [1, 3] }}
          ariaLabel="Data state data grid"
        />
      </div>
    </div>
  ),
};

// Interactive States Story
export const InteractiveStates: Story = {
  args: {
    rows: generateSampleData(20),
    columns: sampleColumns,
    selection: { mode: 'multi' },
    sorting: { mode: 'client', defaultSortBy: [{ id: 'name', dir: 'asc' }] },
    expansion: {
      render: (row: SampleRow) => (
        <div style={{ padding: '16px', backgroundColor: '#f8f9fa' }}>
          <strong>Details:</strong> {row.name} works in {row.department}
        </div>
      ),
    },
    ariaLabel: 'Interactive states data grid',
  },
};

// Responsive Story
export const Responsive: Story = {
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1200px', height: '800px' } },
      },
    },
  },
  args: {
    rows: generateSampleData(50),
    columns: sampleColumns,
    virtualizeRows: true,
    stickyHeader: true,
    ariaLabel: 'Responsive data grid',
  },
};

export const DensityModes: Story = {
  render: () => (
    <Stack spacing={4}>
      <DensityProvider defaultMode="compact">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Compact (0.8x)
          </Typography>
          <DataGrid
            rows={generateSampleData(5)}
            columns={sampleColumns.slice(0, 4)}
            ariaLabel="Compact density grid"
          />
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="normal">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Normal (1.0x)
          </Typography>
          <DataGrid
            rows={generateSampleData(5)}
            columns={sampleColumns.slice(0, 4)}
            ariaLabel="Normal density grid"
          />
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="spacious">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Spacious (1.25x)
          </Typography>
          <DataGrid
            rows={generateSampleData(5)}
            columns={sampleColumns.slice(0, 4)}
            ariaLabel="Spacious density grid"
          />
        </Box>
      </DensityProvider>
    </Stack>
  ),
};