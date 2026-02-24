import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ExpandLess,ExpandMore } from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, userEvent, waitFor,within } from 'storybook/test';

import { Collapsible, CollapsibleContent,CollapsibleTrigger } from './Collapsible';

const meta: Meta<typeof Collapsible> = {
  title: 'Layout/Collapsible/Tests',
  component: Collapsible,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:Collapsible'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Interaction Tests
export const BasicInteraction: Story = {
  name: '🧪 Basic Interaction Test',
  render: () => {
    const InteractiveExample = () => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <div data-testid="collapsible-container">
          <Card>
            <CollapsibleTrigger
              onClick={() => setIsOpen(!isOpen)}
              expanded={isOpen}
              data-testid="collapsible-trigger"
            >
              <Typography variant="h6">Toggle Content</Typography>
              {isOpen ? <ExpandLess /> : <ExpandMore />}
            </CollapsibleTrigger>
            <Collapsible open={isOpen} data-testid="collapsible-content">
              <CollapsibleContent>
                <Typography variant="body1" data-testid="content-text">
                  This is the collapsible content that can be toggled.
                </Typography>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        </div>
      );
    };

    return <InteractiveExample />;
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Initial render verification', async () => {
      const container = canvas.getByTestId('collapsible-container');
      await expect(container).toBeInTheDocument();

      const trigger = canvas.getByTestId('collapsible-trigger');
      await expect(trigger).toBeInTheDocument();
      await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    await step('Click to expand', async () => {
      const trigger = canvas.getByTestId('collapsible-trigger');
      await userEvent.click(trigger);

      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
      });
    });

    await step('Click to collapse', async () => {
      const trigger = canvas.getByTestId('collapsible-trigger');
      await userEvent.click(trigger);

      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-expanded', 'false');
      });
    });
  },
};

// Keyboard Navigation Tests
export const KeyboardNavigation: Story = {
  name: '⌨️ Keyboard Navigation Test',
  render: () => (
    <div data-testid="keyboard-container">
      <Card>
        <CollapsibleTrigger onClick={() => {}} expanded={false} data-testid="keyboard-trigger">
          <Typography variant="h6">Keyboard Accessible Trigger</Typography>
        </CollapsibleTrigger>
        <Collapsible open={false} data-testid="keyboard-collapsible">
          <CollapsibleContent>
            <Typography variant="body1">Content for keyboard navigation</Typography>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Focus trigger with Tab', async () => {
      const trigger = canvas.getByTestId('keyboard-trigger');
      trigger.focus();
      await expect(trigger).toHaveFocus();
    });

    await step('Verify keyboard accessibility', async () => {
      const trigger = canvas.getByTestId('keyboard-trigger');
      await expect(trigger).toHaveAttribute('role', 'button');
      await expect(trigger).toHaveAttribute('tabIndex', '0');
    });
  },
};

// Focus Management Tests
export const FocusManagement: Story = {
  name: '🎯 Focus Management Test',
  render: () => (
    <div data-testid="focus-container">
      <Card>
        <CollapsibleTrigger onClick={() => {}} expanded={false} data-testid="focus-trigger">
          <Typography variant="h6">Focus Test</Typography>
        </CollapsibleTrigger>
        <Collapsible open={true} data-testid="focus-collapsible">
          <CollapsibleContent>
            <Button data-testid="focus-button">Focusable Element</Button>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify focus management', async () => {
      const trigger = canvas.getByTestId('focus-trigger');
      const button = canvas.getByTestId('focus-button');

      await expect(trigger).toBeInTheDocument();
      await expect(button).toBeInTheDocument();
    });
  },
};

// Responsive Design Tests
export const ResponsiveDesign: Story = {
  name: '📱 Responsive Design Test',
  render: () => (
    <Box
      sx={{ width: '100%', maxWidth: { xs: '100%', sm: '600px', md: '800px' } }}
      data-testid="responsive-container"
    >
      <Card>
        <CollapsibleTrigger onClick={() => {}} expanded={false} data-testid="responsive-trigger">
          <Typography variant="h6">Responsive Collapsible</Typography>
        </CollapsibleTrigger>
        <Collapsible open={true} data-testid="responsive-collapsible">
          <CollapsibleContent>
            <Typography variant="body1">
              This content adapts to different screen sizes while maintaining functionality.
            </Typography>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify responsive container', async () => {
      const container = canvas.getByTestId('responsive-container');
      await expect(container).toBeInTheDocument();
    });

    await step('Verify responsive elements', async () => {
      const trigger = canvas.getByTestId('responsive-trigger');
      const collapsible = canvas.getByTestId('responsive-collapsible');

      await expect(trigger).toBeInTheDocument();
      await expect(collapsible).toBeInTheDocument();
    });
  },
};

// Theme Variations Tests
export const ThemeVariations: Story = {
  name: '🎨 Theme Variations Test',
  render: () => (
    <Stack spacing={2} data-testid="theme-container">
      <Card>
        <CollapsibleTrigger onClick={() => {}} expanded={false} data-testid="theme-trigger">
          <Typography variant="h6">Theme Test</Typography>
        </CollapsibleTrigger>
        <Collapsible open={true} data-testid="theme-collapsible">
          <CollapsibleContent>
            <Typography variant="body1">Content with theme integration</Typography>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </Stack>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify theme integration', async () => {
      const container = canvas.getByTestId('theme-container');
      await expect(container).toBeInTheDocument();
    });
  },
};

// Visual States Tests
export const VisualStates: Story = {
  name: '👁️ Visual States Test',
  render: () => (
    <Stack spacing={2} data-testid="visual-container">
      <Card>
        <CollapsibleTrigger onClick={() => {}} expanded={true} data-testid="expanded-trigger">
          <Typography variant="h6">Expanded State</Typography>
        </CollapsibleTrigger>
        <Collapsible open={true} data-testid="expanded-collapsible">
          <CollapsibleContent>
            <Typography variant="body1">Visible content</Typography>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      <Card>
        <CollapsibleTrigger onClick={() => {}} expanded={false} data-testid="collapsed-trigger">
          <Typography variant="h6">Collapsed State</Typography>
        </CollapsibleTrigger>
        <Collapsible open={false} data-testid="collapsed-collapsible">
          <CollapsibleContent>
            <Typography variant="body1">Hidden content</Typography>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </Stack>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify expanded state', async () => {
      const expandedTrigger = canvas.getByTestId('expanded-trigger');
      await expect(expandedTrigger).toHaveAttribute('aria-expanded', 'true');
    });

    await step('Verify collapsed state', async () => {
      const collapsedTrigger = canvas.getByTestId('collapsed-trigger');
      await expect(collapsedTrigger).toHaveAttribute('aria-expanded', 'false');
    });
  },
};

// Edge Cases Tests
export const EdgeCases: Story = {
  name: '🔍 Edge Cases Test',
  render: () => (
    <Stack spacing={2} data-testid="edge-cases-container">
      <Card>
        <CollapsibleTrigger
          onClick={() => {}}
          expanded={false}
          disabled
          data-testid="disabled-trigger"
        >
          <Typography variant="h6">Disabled Trigger</Typography>
        </CollapsibleTrigger>
        <Collapsible open={false} disabled data-testid="disabled-collapsible">
          <CollapsibleContent>
            <Typography variant="body1">Disabled content</Typography>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      <Card>
        <CollapsibleTrigger onClick={() => {}} expanded={true} data-testid="empty-trigger">
          <Typography variant="h6">Empty Content</Typography>
        </CollapsibleTrigger>
        <Collapsible open={true} data-testid="empty-collapsible">
          <CollapsibleContent></CollapsibleContent>
        </Collapsible>
      </Card>
    </Stack>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify disabled state', async () => {
      const disabledTrigger = canvas.getByTestId('disabled-trigger');
      await expect(disabledTrigger).toHaveAttribute('disabled');
    });

    await step('Verify empty content handling', async () => {
      const emptyCollapsible = canvas.getByTestId('empty-collapsible');
      await expect(emptyCollapsible).toBeInTheDocument();
    });
  },
};
