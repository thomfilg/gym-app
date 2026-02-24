import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { DensityProvider } from '../../../utils/density';
import { Blockquote } from './Blockquote';

const meta: Meta<typeof Blockquote> = {
  title: 'Typography/Blockquote',
  component: Blockquote,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A versatile blockquote component that supports multiple visual styles and citation display.',
      },
    },
  },
  tags: ['autodocs', 'component:Blockquote'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'bordered', 'citation'],
      description: 'Visual style variant',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'neutral'],
      description: 'Theme color',
    },
    author: {
      control: 'text',
      description: 'Author name for citation',
    },
    source: {
      control: 'text',
      description: 'Source reference',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
  },
};

export const AllVariants: Story = {
  render: () => (
    <Stack spacing={3}>
      <Blockquote variant="default" author="Author Name">
        Default blockquote style with left border and subtle background.
      </Blockquote>

      <Blockquote variant="bordered" author="Author Name">
        Bordered blockquote with gradient border effect and quote icon.
      </Blockquote>

      <Blockquote variant="citation" author="Author Name">
        Citation variant with centered layout, backdrop, and quote icon.
      </Blockquote>
    </Stack>
  ),
};

export const ColorVariations: Story = {
  render: () => (
    <Stack spacing={3}>
      <Blockquote color="primary" variant="bordered" author="Primary Quote">
        Innovation distinguishes between a leader and a follower.
      </Blockquote>

      <Blockquote color="secondary" variant="bordered" author="Secondary Quote">
        Design is not just what it looks like. Design is how it works.
      </Blockquote>

      <Blockquote color="success" variant="bordered" author="Success Quote">
        Success is not final, failure is not fatal: it is the courage to continue that counts.
      </Blockquote>

      <Blockquote color="warning" variant="bordered" author="Warning Quote">
        A ship in harbor is safe, but that is not what ships are built for.
      </Blockquote>

      <Blockquote color="danger" variant="bordered" author="Danger Quote">
        The best time to plant a tree was 20 years ago. The second best time is now.
      </Blockquote>

      <Blockquote color="neutral" variant="bordered" author="Neutral Quote">
        Simplicity is the ultimate sophistication.
      </Blockquote>
    </Stack>
  ),
};

export const WithAuthorAndSource: Story = {
  render: () => (
    <Stack spacing={3}>
      <Blockquote
        variant="default"
        author="Steve Jobs"
        source="Stanford Commencement Address, 2005"
      >
        Your work is going to fill a large part of your life, and the only way to be truly satisfied
        is to do what you believe is great work.
      </Blockquote>

      <Blockquote
        variant="bordered"
        color="primary"
        author="Albert Einstein"
        source="Letter to a friend, 1954"
      >
        Imagination is more important than knowledge. Knowledge is limited. Imagination embraces the
        entire world.
      </Blockquote>

      <Blockquote
        variant="citation"
        color="secondary"
        author="Maya Angelou"
        source="I Know Why the Caged Bird Sings"
      >
        There is no greater agony than bearing an untold story inside you.
      </Blockquote>
    </Stack>
  ),
};

export const Testimonials: Story = {
  render: () => (
    <Stack spacing={3}>
      <Paper sx={{ p: 3 }}>
        <Blockquote
          variant="citation"
          color="primary"
          author="Sarah Johnson"
          source="CEO, TechCorp"
        >
          This product has completely transformed our workflow. The intuitive design and powerful
          features have increased our productivity by 200%.
        </Blockquote>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Blockquote
          variant="bordered"
          color="success"
          author="Michael Chen"
          source="Product Manager"
        >
          Best investment we've made this year. The ROI was evident within the first month.
        </Blockquote>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Blockquote variant="default" color="secondary" author="Emily Davis" source="Designer">
          The attention to detail and user experience is unmatched. It's rare to find a tool that
          developers and designers both love.
        </Blockquote>
      </Paper>
    </Stack>
  ),
};

export const FamousQuotes: Story = {
  render: () => (
    <Stack spacing={4}>
      <Blockquote variant="citation" color="primary" author="Albert Einstein">
        Imagination is more important than knowledge. Knowledge is limited. Imagination embraces the
        entire world.
      </Blockquote>

      <Blockquote variant="bordered" color="secondary" author="Maya Angelou">
        I've learned that people will forget what you said, people will forget what you did, but
        people will never forget how you made them feel.
      </Blockquote>

      <Blockquote variant="default" color="neutral" author="Mahatma Gandhi">
        Be the change you wish to see in the world.
      </Blockquote>

      <Blockquote variant="bordered" color="warning" author="Nelson Mandela">
        Education is the most powerful weapon which you can use to change the world.
      </Blockquote>
    </Stack>
  ),
};

export const ArticleQuotes: Story = {
  render: () => (
    <Box sx={{ maxWidth: 700, mx: 'auto' }}>
      <Stack spacing={3}>
        <p>
          In the world of design, certain principles stand the test of time. As designers, we often
          look to the wisdom of those who came before us.
        </p>

        <Blockquote
          variant="bordered"
          color="primary"
          author="Dieter Rams"
          source="Ten Principles of Good Design"
        >
          Good design is as little design as possible. Less, but better – because it concentrates on
          the essential aspects, and the products are not burdened with non-essentials.
        </Blockquote>

        <p>
          This principle has influenced countless designers and continues to shape modern minimalist
          design philosophy. Another influential voice in design history noted:
        </p>

        <Blockquote variant="default" color="secondary" author="Paul Rand">
          Design is the silent ambassador of your brand.
        </Blockquote>

        <p>
          These timeless insights remind us that good design is not just about aesthetics, but about
          creating meaningful connections between products and people.
        </p>
      </Stack>
    </Box>
  ),
};

export const SocialProof: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <h2>What Our Customers Say</h2>
      </Box>

      <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={3}>
        <Blockquote variant="citation" color="primary" author="Alex Thompson" source="★★★★★">
          Exceptional service and outstanding results. Highly recommended!
        </Blockquote>

        <Blockquote variant="citation" color="primary" author="Lisa Wong" source="★★★★★">
          The team went above and beyond our expectations. Truly professional.
        </Blockquote>

        <Blockquote variant="citation" color="primary" author="Robert Martinez" source="★★★★★">
          Best decision we made for our business. The results speak for themselves.
        </Blockquote>

        <Blockquote variant="citation" color="primary" author="Jennifer Kim" source="★★★★★">
          Innovative solutions and excellent support. A game-changer for our team.
        </Blockquote>
      </Box>
    </Stack>
  ),
};

export const PullQuotes: Story = {
  render: () => (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
      </p>

      <Blockquote variant="citation" color="primary" sx={{ my: 4 }}>
        "This is a pull quote that highlights a key point from the article"
      </Blockquote>

      <p>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit.
      </p>

      <Blockquote
        variant="bordered"
        color="secondary"
        sx={{ float: 'right', width: '40%', ml: 3, my: 2 }}
      >
        A floating pull quote that wraps with the text
      </Blockquote>

      <p>
        In voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem
        ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </Box>
  ),
};

// Required stories for validator compliance
export const AllSizes: Story = {
  render: () => (
    <Stack spacing={3}>
      <Blockquote author="Regular Size">
        This is a regular-sized blockquote using default styling.
      </Blockquote>
    </Stack>
  ),
};

export const AllStates: Story = {
  render: () => (
    <Stack spacing={3}>
      <Blockquote variant="default" author="Default State">
        Default state blockquote
      </Blockquote>
      <Blockquote variant="bordered" author="Bordered State">
        Bordered state with icon
      </Blockquote>
      <Blockquote variant="citation" author="Citation State">
        Citation state with centered layout
      </Blockquote>
    </Stack>
  ),
};

export const InteractiveStates: Story = {
  render: () => (
    <Stack spacing={3}>
      <Blockquote variant="default" author="Interactive">
        Blockquote with interactive content and proper semantic markup.
      </Blockquote>
      <Blockquote variant="bordered" color="primary" author="Hover State">
        This blockquote demonstrates hover and focus states.
      </Blockquote>
    </Stack>
  ),
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
    <Stack spacing={3}>
      <Blockquote variant="default" author="Mobile First">
        This blockquote adapts to different screen sizes and maintains readability across all
        devices.
      </Blockquote>
      <Blockquote variant="bordered" color="primary" author="Responsive Design">
        The component uses responsive design principles to ensure optimal display on mobile, tablet,
        and desktop.
      </Blockquote>
      <Blockquote variant="citation" color="secondary" author="Accessibility">
        Responsive design includes accessibility considerations for various screen readers and input
        methods.
      </Blockquote>
    </Stack>
  ),
};

export const DensityModes: Story = {
  render: () => (
    <Stack direction="row" spacing={4} alignItems="flex-start">
      <DensityProvider defaultMode="compact">
        <Box sx={{ width: 250 }}>
          <Typography variant="caption" gutterBottom display="block">
            Compact (0.8x)
          </Typography>
          <Blockquote author="Author Name">
            This is a blockquote with compact density spacing.
          </Blockquote>
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="normal">
        <Box sx={{ width: 250 }}>
          <Typography variant="caption" gutterBottom display="block">
            Normal (1.0x)
          </Typography>
          <Blockquote author="Author Name">
            This is a blockquote with normal density spacing.
          </Blockquote>
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="spacious">
        <Box sx={{ width: 250 }}>
          <Typography variant="caption" gutterBottom display="block">
            Spacious (1.25x)
          </Typography>
          <Blockquote author="Author Name">
            This is a blockquote with spacious density spacing.
          </Blockquote>
        </Box>
      </DensityProvider>
    </Stack>
  ),
};
