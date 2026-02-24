import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { TimingDiagram } from './TimingDiagram';

const meta: Meta<typeof TimingDiagram> = {
  title: 'Enhanced/TimingDiagram',
  component: TimingDiagram,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A timing diagram component for visualizing network request phases and performance metrics.',
      },
    },
  },
  tags: ['autodocs', 'component:TimingDiagram'],
  argTypes: {
    data: {
      description: 'Timing data for different phases',
    },
    variant: {
      control: { type: 'select' },
      options: ['waterfall', 'stacked', 'horizontal'],
      description: 'Display variant',
    },
    showLabels: {
      control: 'boolean',
      description: 'Show timing labels on segments',
    },
    showTooltips: {
      control: 'boolean',
      description: 'Enable hover tooltips',
    },
    animated: {
      control: 'boolean',
      description: 'Enable animations',
    },
    height: {
      control: { type: 'number', min: 20, max: 200, step: 10 },
      description: 'Diagram height in pixels',
    },
  },
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

const fastData = {
  dns: 15,
  connect: 35,
  ssl: 65,
  request: 10,
  response: 85,
  total: 210,
};

const slowData = {
  dns: 150,
  connect: 400,
  ssl: 600,
  request: 80,
  response: 1200,
  total: 2430,
};

export const Default: Story = {
  args: {
    data: sampleData,
    variant: 'waterfall',
    showLabels: true,
    showTooltips: true,
    animated: true,
    height: 40,
  },
};

export const AllVariants: Story = {
  render: () => (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Waterfall Variant
        </Typography>
        <TimingDiagram
          data={sampleData}
          variant="waterfall"
          showLabels={true}
          showTooltips={true}
          animated={true}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Stacked Variant
        </Typography>
        <TimingDiagram
          data={sampleData}
          variant="stacked"
          showLabels={true}
          showTooltips={true}
          animated={true}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Horizontal Variant
        </Typography>
        <TimingDiagram
          data={sampleData}
          variant="horizontal"
          showLabels={true}
          showTooltips={true}
          animated={true}
        />
      </Box>
    </Stack>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Small (height: 30px)
        </Typography>
        <TimingDiagram
          data={sampleData}
          variant="waterfall"
          height={30}
          showLabels={false}
          animated={true}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Medium (height: 40px)
        </Typography>
        <TimingDiagram
          data={sampleData}
          variant="waterfall"
          height={40}
          showLabels={true}
          animated={true}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Large (height: 60px)
        </Typography>
        <TimingDiagram
          data={sampleData}
          variant="waterfall"
          height={60}
          showLabels={true}
          animated={true}
        />
      </Box>
    </Stack>
  ),
};

export const AllStates: Story = {
  render: () => (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Fast Request (&lt;300ms)
        </Typography>
        <TimingDiagram
          data={fastData}
          variant="stacked"
          showLabels={true}
          showTooltips={true}
          animated={true}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Normal Request (~750ms)
        </Typography>
        <TimingDiagram
          data={sampleData}
          variant="stacked"
          showLabels={true}
          showTooltips={true}
          animated={true}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Slow Request (&gt;2s)
        </Typography>
        <TimingDiagram
          data={slowData}
          variant="stacked"
          showLabels={true}
          showTooltips={true}
          animated={true}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          No Animation
        </Typography>
        <TimingDiagram
          data={sampleData}
          variant="stacked"
          showLabels={true}
          showTooltips={false}
          animated={false}
        />
      </Box>
    </Stack>
  ),
};

const InteractiveComponent = () => {
  const [currentData, setCurrentData] = React.useState(sampleData);
  const [variant, setVariant] = React.useState<'waterfall' | 'stacked' | 'horizontal'>('waterfall');

  const scenarios = [
    { name: 'Fast', data: fastData },
    { name: 'Normal', data: sampleData },
    { name: 'Slow', data: slowData },
  ];

  return (
    <Stack spacing={3}>
      <Typography variant="h6">Interactive Timing Diagram</Typography>

      <Paper sx={{ p: 2 }}>
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ alignSelf: 'center' }}>
            Data:
          </Typography>
          {scenarios.map((scenario) => (
            <Button
              key={scenario.name}
              size="small"
              variant={currentData === scenario.data ? 'contained' : 'outlined'}
              onClick={() => setCurrentData(scenario.data)}
            >
              {scenario.name}
            </Button>
          ))}
        </Stack>

        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ alignSelf: 'center' }}>
            Variant:
          </Typography>
          {['waterfall', 'stacked', 'horizontal'].map((v) => (
            <Button
              key={v}
              size="small"
              variant={variant === v ? 'contained' : 'outlined'}
              onClick={() => setVariant(v as typeof variant)}
            >
              {v}
            </Button>
          ))}
        </Stack>
      </Paper>

      <TimingDiagram
        data={currentData}
        variant={variant}
        showLabels={true}
        showTooltips={true}
        animated={true}
      />

      <Paper sx={{ p: 2, bgcolor: 'info.light' }}>
        <Typography variant="body2">
          Total time: {currentData.total}ms | DNS: {currentData.dns}ms | Connect:{' '}
          {currentData.connect}ms | SSL: {currentData.ssl}ms | Request: {currentData.request}ms |
          Response: {currentData.response}ms
        </Typography>
      </Paper>
    </Stack>
  );
};

export const InteractiveStates: Story = {
  render: () => <InteractiveComponent />,
};

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
  render: () => (
    <Stack spacing={4}>
      <Typography variant="h6">Responsive Timing Diagrams</Typography>

      <Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Waterfall (adapts to container width)
        </Typography>
        <TimingDiagram
          data={sampleData}
          variant="waterfall"
          showLabels={true}
          showTooltips={true}
          animated={true}
        />
      </Box>

      <Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Stacked (full width)
        </Typography>
        <TimingDiagram
          data={sampleData}
          variant="stacked"
          showLabels={true}
          showTooltips={true}
          animated={true}
        />
      </Box>

      <Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Horizontal (vertical layout)
        </Typography>
        <TimingDiagram
          data={sampleData}
          variant="horizontal"
          showLabels={true}
          showTooltips={true}
          animated={true}
        />
      </Box>
    </Stack>
  ),
};

export const PerformanceComparison: Story = {
  render: () => {
    const requests = [
      {
        name: 'API Request A',
        data: { dns: 20, connect: 45, ssl: 80, request: 15, response: 120, total: 280 },
      },
      {
        name: 'API Request B',
        data: { dns: 55, connect: 120, ssl: 200, request: 35, response: 340, total: 750 },
      },
      {
        name: 'API Request C',
        data: { dns: 180, connect: 450, ssl: 600, request: 80, response: 890, total: 2200 },
      },
    ];

    return (
      <Stack spacing={3}>
        <Typography variant="h6">Performance Comparison</Typography>
        {requests.map((request) => (
          <Box key={request.name}>
            <Typography variant="body1" gutterBottom>
              {request.name}
            </Typography>
            <TimingDiagram
              data={request.data}
              variant="stacked"
              showLabels={true}
              showTooltips={true}
              animated={true}
            />
          </Box>
        ))}
      </Stack>
    );
  },
};

export const MinimalData: Story = {
  args: {
    data: {
      request: 50,
      response: 150,
      total: 200,
    },
    variant: 'stacked',
    showLabels: true,
    showTooltips: true,
    animated: true,
  },
};

export const DetailedBreakdown: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="h6">Detailed Request Breakdown</Typography>

      <TimingDiagram
        data={{
          dns: 125,
          connect: 250,
          ssl: 420,
          request: 45,
          response: 680,
          total: 1520,
        }}
        variant="horizontal"
        showLabels={true}
        showTooltips={true}
        animated={true}
      />

      <Paper sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary">
          💜 DNS Lookup • 🔵 Connection • 🔶 SSL/TLS • 🟢 Request • 🟠 Response
        </Typography>
      </Paper>
    </Stack>
  ),
};

export const MultipleRequests: Story = {
  render: () => {
    const requests = [
      { name: 'Homepage', data: fastData },
      { name: 'API Call', data: sampleData },
      { name: 'Large Asset', data: slowData },
    ];

    return (
      <Stack spacing={3}>
        <Typography variant="h6">Multiple Request Timeline</Typography>
        {requests.map((request, index) => (
          <Box key={request.name} sx={{ mb: 2 }}>
            <Typography variant="body1" gutterBottom>
              {index + 1}. {request.name}
            </Typography>
            <TimingDiagram
              data={request.data}
              variant="waterfall"
              showLabels={true}
              showTooltips={true}
              animated={true}
              height={35}
            />
          </Box>
        ))}
      </Stack>
    );
  },
};
