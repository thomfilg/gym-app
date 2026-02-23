import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DensityProvider } from '../../../utils/density';
import { useState } from 'react';

import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Navigation/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A pagination component with multiple variants including default, rounded, dots, and minimal styles.',
      },
    },
  },
  tags: ['autodocs', 'component:Pagination'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'rounded', 'dots', 'minimal'],
      description: 'The visual variant of the pagination',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the pagination buttons',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'standard'],
      description: 'Color scheme for the active page',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the pagination is disabled',
    },
    showPageInfo: {
      control: 'boolean',
      description: 'Whether to show page info text',
    },
    showFirstButton: {
      control: 'boolean',
      description: 'Whether to show first page button',
    },
    showLastButton: {
      control: 'boolean',
      description: 'Whether to show last page button',
    },
    boundaryCount: {
      control: { type: 'number', min: 0, max: 5 },
      description: 'Number of always visible pages at the beginning and end',
    },
    siblingCount: {
      control: { type: 'number', min: 0, max: 5 },
      description: 'Number of always visible pages before and after the current page',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper component for interactive stories
const PaginationWrapper = ({
  initialPage = 1,
  count = 10,
  ...props
}: {
  initialPage?: number;
  count?: number;
  page?: number;
  variant?: 'default' | 'rounded' | 'dots' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'standard';
  disabled?: boolean;
  showPageInfo?: boolean;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  boundaryCount?: number;
  siblingCount?: number;
  firstIcon?: React.ReactNode;
  lastIcon?: React.ReactNode;
  previousIcon?: React.ReactNode;
  nextIcon?: React.ReactNode;
  showItemsPerPage?: boolean;
  itemsPerPage?: number;
  onItemsPerPageChange?: (value: number) => void;
  itemsPerPageOptions?: number[];
  pageInfoFormat?: (page: number, count: number) => string;
}) => {
  const [page, setPage] = useState(initialPage);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return <Pagination page={page} count={count} onChange={handleChange} {...props} />;
};

export const Default: Story = {
  args: {
    page: 5,
    count: 10,
  },
  render: (args) => <PaginationWrapper {...args} />,
};

export const Rounded: Story = {
  args: {
    variant: 'rounded',
    page: 3,
    count: 8,
  },
  render: (args) => <PaginationWrapper {...args} />,
};

export const Dots: Story = {
  args: {
    variant: 'dots',
    page: 4,
    count: 12,
  },
  render: (args) => (
    <Box sx={{ textAlign: 'center' }}>
      <PaginationWrapper {...args} />
      <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
        Minimal dot indicators - hover and click to navigate
      </Typography>
    </Box>
  ),
};

export const Minimal: Story = {
  args: {
    variant: 'minimal',
    page: 2,
    count: 6,
  },
  render: (args) => <PaginationWrapper {...args} />,
};

export const SmallSize: Story = {
  args: {
    variant: 'default',
    size: 'sm',
    page: 3,
    count: 8,
  },
  render: (args) => <PaginationWrapper {...args} />,
};

export const LargeSize: Story = {
  args: {
    variant: 'rounded',
    size: 'lg',
    page: 4,
    count: 7,
  },
  render: (args) => <PaginationWrapper {...args} />,
};

export const WithFirstLast: Story = {
  args: {
    variant: 'default',
    page: 15,
    count: 30,
    showFirstButton: true,
    showLastButton: true,
  },
  render: (args) => <PaginationWrapper {...args} />,
};

export const WithPageInfo: Story = {
  args: {
    variant: 'default',
    page: 7,
    count: 25,
    showPageInfo: true,
  },
  render: (args) => <PaginationWrapper {...args} />,
};

const WithItemsPerPageComponent = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalItems = 250;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setPage(1); // Reset to first page when changing items per page
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Showing {(page - 1) * itemsPerPage + 1}-{Math.min(page * itemsPerPage, totalItems)} of{' '}
        {totalItems} items
      </Typography>
      <Pagination
        variant="default"
        page={page}
        count={totalPages}
        onChange={handlePageChange}
        showItemsPerPage
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
        itemsPerPageOptions={[10, 25, 50, 100]}
        showPageInfo
        pageInfoFormat={(page, count) => `${page} / ${count}`}
      />
    </Box>
  );
};

export const WithItemsPerPage: Story = {
  render: () => <WithItemsPerPageComponent />,
};

export const CustomIcons: Story = {
  args: {
    variant: 'default',
    page: 5,
    count: 15,
    showFirstButton: true,
    showLastButton: true,
    firstIcon: <KeyboardDoubleArrowLeft />,
    lastIcon: <KeyboardDoubleArrowRight />,
    previousIcon: <KeyboardArrowLeft />,
    nextIcon: <KeyboardArrowRight />,
  },
  render: (args) => <PaginationWrapper {...args} />,
};

export const SecondaryColor: Story = {
  args: {
    variant: 'rounded',
    color: 'secondary',
    page: 3,
    count: 8,
  },
  render: (args) => <PaginationWrapper {...args} />,
};

export const Disabled: Story = {
  args: {
    variant: 'default',
    page: 3,
    count: 8,
    disabled: true,
  },
  render: (args) => <PaginationWrapper {...args} />,
};

export const CustomBoundaries: Story = {
  args: {
    variant: 'default',
    page: 10,
    count: 20,
    boundaryCount: 2,
    siblingCount: 2,
  },
  render: (args) => <PaginationWrapper {...args} />,
};

export const LongPagination: Story = {
  args: {
    variant: 'default',
    page: 50,
    count: 100,
    boundaryCount: 1,
    siblingCount: 1,
    showFirstButton: true,
    showLastButton: true,
    showPageInfo: true,
  },
  render: (args) => <PaginationWrapper {...args} />,
};

const AllVariantsComparisonComponent = () => {
  const [pages, setPages] = useState({
    default: 3,
    rounded: 2,
    dots: 4,
    minimal: 5,
  });

  const handleChange =
    (variant: keyof typeof pages) => (event: React.ChangeEvent<unknown>, value: number) => {
      setPages((prev) => ({ ...prev, [variant]: value }));
    };

  return (
    <Paper elevation={2} sx={{ p: 4, maxWidth: 600 }}>
      <Typography variant="h6" gutterBottom>
        Pagination Variants Comparison
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Default
          </Typography>
          <Pagination
            variant="default"
            page={pages.default}
            count={8}
            onChange={handleChange('default')}
          />
        </Box>

        <Divider />

        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Rounded
          </Typography>
          <Pagination
            variant="rounded"
            page={pages.rounded}
            count={8}
            onChange={handleChange('rounded')}
          />
        </Box>

        <Divider />

        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Dots
          </Typography>
          <Pagination variant="dots" page={pages.dots} count={8} onChange={handleChange('dots')} />
        </Box>

        <Divider />

        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Minimal
          </Typography>
          <Pagination
            variant="minimal"
            page={pages.minimal}
            count={8}
            onChange={handleChange('minimal')}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export const AllVariantsComparison: Story = {
  render: () => <AllVariantsComparisonComponent />,
};

const SizeComparisonComponent = () => {
  const [pages, setPages] = useState({
    sm: 2,
    md: 3,
    lg: 4,
  });

  const handleChange =
    (size: keyof typeof pages) => (event: React.ChangeEvent<unknown>, value: number) => {
      setPages((prev) => ({ ...prev, [size]: value }));
    };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          Small (sm)
        </Typography>
        <Pagination
          variant="rounded"
          size="sm"
          page={pages.sm}
          count={6}
          onChange={handleChange('sm')}
        />
      </Box>

      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          Medium (md) - Default
        </Typography>
        <Pagination
          variant="rounded"
          size="md"
          page={pages.md}
          count={6}
          onChange={handleChange('md')}
        />
      </Box>

      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          Large (lg)
        </Typography>
        <Pagination
          variant="rounded"
          size="lg"
          page={pages.lg}
          count={6}
          onChange={handleChange('lg')}
        />
      </Box>
    </Box>
  );
};

export const SizeComparison: Story = {
  render: () => <SizeComparisonComponent />,
};

const TablePaginationComponent = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const totalItems = 1247;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setPage(1);
  };

  return (
    <Paper elevation={2} sx={{ p: 3, minWidth: 600 }}>
      <Typography variant="h6" gutterBottom>
        Data Table Pagination Example
      </Typography>

      <Box
        sx={{
          border: 1,
          borderColor: 'divider',
          borderRadius: 1,
          mb: 3,
          p: 2,
          minHeight: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'grey.50',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Table data would go here...
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Showing {(page - 1) * itemsPerPage + 1}-{Math.min(page * itemsPerPage, totalItems)} of{' '}
          {totalItems} entries
        </Typography>

        <Pagination
          variant="default"
          page={page}
          count={totalPages}
          onChange={handlePageChange}
          showItemsPerPage
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          itemsPerPageOptions={[10, 25, 50, 100]}
          showFirstButton
          showLastButton
          boundaryCount={1}
          siblingCount={1}
        />
      </Box>
    </Paper>
  );
};

export const TablePagination: Story = {
  render: () => <TablePaginationComponent />,
};

// Required exports for validation
export const AllVariants = AllVariantsComparison;
export const AllSizes = SizeComparison;
export const AllStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
      <Box>
        <Typography variant="caption" color="text.secondary">
          Default State
        </Typography>
        <PaginationWrapper page={3} count={8} />
      </Box>

      <Box>
        <Typography variant="caption" color="text.secondary">
          Disabled State
        </Typography>
        <PaginationWrapper page={3} count={8} disabled />
      </Box>

      <Box>
        <Typography variant="caption" color="text.secondary">
          With Page Info
        </Typography>
        <PaginationWrapper page={3} count={8} showPageInfo />
      </Box>

      <Box>
        <Typography variant="caption" color="text.secondary">
          With First/Last Buttons
        </Typography>
        <PaginationWrapper page={5} count={10} showFirstButton showLastButton />
      </Box>
    </Box>
  ),
};

export const InteractiveStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
      <Box>
        <Typography variant="caption" color="text.secondary">
          Interactive Pagination (Click to navigate)
        </Typography>
        <PaginationWrapper page={5} count={10} showFirstButton showLastButton />
      </Box>

      <Box>
        <Typography variant="caption" color="text.secondary">
          With Items Per Page Selection
        </Typography>
        <WithItemsPerPageComponent />
      </Box>
    </Box>
  ),
};

export const Responsive: Story = {
  render: () => (
    <Box sx={{ width: '100%', maxWidth: 800 }}>
      <Typography variant="h6" gutterBottom>
        Responsive Pagination
      </Typography>
      <Typography variant="caption" color="text.secondary" gutterBottom>
        Pagination adapts to container width
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
        <Paper sx={{ p: 2, width: '100%' }}>
          <Typography variant="caption" color="text.secondary">
            Full Width
          </Typography>
          <PaginationWrapper page={10} count={20} showFirstButton showLastButton showPageInfo />
        </Paper>

        <Paper sx={{ p: 2, maxWidth: 400 }}>
          <Typography variant="caption" color="text.secondary">
            Constrained Width
          </Typography>
          <PaginationWrapper page={10} count={20} boundaryCount={1} siblingCount={0} />
        </Paper>

        <Paper sx={{ p: 2, maxWidth: 250 }}>
          <Typography variant="caption" color="text.secondary">
            Minimal Width
          </Typography>
          <PaginationWrapper
            variant="minimal"
            page={5}
            count={10}
            boundaryCount={0}
            siblingCount={0}
          />
        </Paper>
      </Box>
    </Box>
  ),
};

export const DensityModes: Story = {
  render: () => {

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
        <DensityProvider defaultMode="compact">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              Compact (0.8x)
            </Typography>
            <PaginationWrapper size="sm" page={3} count={8} variant="rounded" />
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="normal">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              Normal (1.0x)
            </Typography>
            <PaginationWrapper size="md" page={3} count={8} variant="rounded" />
          </Box>
        </DensityProvider>
        <DensityProvider defaultMode="spacious">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              Spacious (1.25x)
            </Typography>
            <PaginationWrapper size="lg" page={3} count={8} variant="rounded" />
          </Box>
        </DensityProvider>
      </Box>
    );
  },
};
