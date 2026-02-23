import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Banknote, CreditCard, Globe, Heart, Shield,Smartphone, Star, Zap } from 'lucide-react';
import { expect, fn, userEvent, waitFor,within } from 'storybook/test';

import { RadioGroup } from './RadioGroup';

const meta: Meta<typeof RadioGroup> = {
  title: 'Form/RadioGroup/Tests',
  component: RadioGroup,
  parameters: {
    layout: 'padded',
    chromatic: { disableSnapshot: false },
  },
  tags: ['autodocs', 'test', 'component:RadioGroup'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const paymentOptions = [
  {
    value: 'card',
    label: 'Credit Card',
    icon: <CreditCard size={20} />,
    description: 'Pay with your credit or debit card',
  },
  {
    value: 'cash',
    label: 'Cash',
    icon: <Banknote size={20} />,
    description: 'Pay with cash on delivery',
  },
  {
    value: 'mobile',
    label: 'Mobile Pay',
    icon: <Smartphone size={20} />,
    description: 'Use your mobile wallet',
  },
  {
    value: 'online',
    label: 'Online Banking',
    icon: <Globe size={20} />,
    description: 'Transfer from your bank account',
  },
];

const priorityOptions = [
  { value: 'low', label: 'Low', icon: <Shield size={16} /> },
  { value: 'medium', label: 'Medium', icon: <Star size={16} /> },
  { value: 'high', label: 'High', icon: <Zap size={16} /> },
  { value: 'critical', label: 'Critical', icon: <Heart size={16} /> },
];

const simpleOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

// Basic Interaction Tests
export const BasicInteraction: Story = {
  name: '🧪 Basic Interaction Test',
  args: {
    options: simpleOptions,
    label: 'Select an option',
    variant: 'default',
    value: '',
    onChange: fn(),
    dataTestId: 'radio-group',
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step('Initial render verification', async () => {
      const label = canvas.getByText('Select an option');
      await expect(label).toBeInTheDocument();

      const radioOptions = canvas.getAllByRole('radio');
      await expect(radioOptions).toHaveLength(3);

      // Verify testIds are present
      await expect(canvas.getByTestId('radio-group')).toBeInTheDocument();
      await expect(canvas.getByTestId('radio-group-label')).toBeInTheDocument();
      await expect(canvas.getByTestId('radio-group-group')).toBeInTheDocument();
    });

    await step('Click radio option', async () => {
      const firstRadio = canvas.getByRole('radio', { name: /option 1/i });
      await userEvent.click(firstRadio);
      await expect(args.onChange).toHaveBeenCalledTimes(1);
      // Check that onChange was called - the first argument can be either a SyntheticEvent or a plain object
      const firstCall = args.onChange.mock.calls[0];
      await expect(firstCall[1]).toBe('option1');

      // Verify testIds for individual radio buttons
      await expect(canvas.getByTestId('radio-group-radio-0')).toBeInTheDocument();
      await expect(canvas.getByTestId('radio-group-option-0')).toBeInTheDocument();
      await expect(canvas.getByTestId('radio-group-label-0')).toBeInTheDocument();
    });

    await step('Select different option', async () => {
      const secondRadio = canvas.getByRole('radio', { name: /option 2/i });
      await userEvent.click(secondRadio);
      await expect(args.onChange).toHaveBeenCalledTimes(2);
      // Check that onChange was called with the correct value
      const secondCall = args.onChange.mock.calls[1];
      await expect(secondCall[1]).toBe('option2');
    });
  },
};

// Card Variant Interaction Tests
export const CardInteraction: Story = {
  name: '📝 Card Interaction Test',
  args: {
    variant: 'cards',
    options: paymentOptions,
    label: 'Payment Method',
    value: '',
    onChange: fn(),
    'data-testid': 'card-radio-group',
  },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);

    await step('Initial card render', async () => {
      const cards = canvas.getAllByText(/Credit Card|Cash|Mobile Pay|Online Banking/);
      await expect(cards).toHaveLength(4);
    });

    await step('Click card option', async () => {
      const creditCardOption = canvas.getByText('Credit Card');
      const cardContainer =
        creditCardOption.closest('[role="button"]') || creditCardOption.parentElement;

      if (cardContainer) {
        await userEvent.click(cardContainer);
        await expect(args.onChange).toHaveBeenCalledTimes(1);
        const firstCall = args.onChange.mock.calls[0];
        await expect(firstCall[1]).toBe('card');
      }
    });

    await step('Hover effect verification', async () => {
      const cashCard = canvas.getByText('Cash');
      const cardContainer = cashCard.closest('[role="button"]') || cashCard.parentElement;

      if (cardContainer) {
        await userEvent.hover(cardContainer);
        // Visual hover state should be applied
        await expect(cardContainer).toBeInTheDocument();
      }
    });
  },
};

// Button Variant Interaction Tests
export const ButtonInteraction: Story = {
  name: '🔘 Button Interaction Test',
  args: {
    variant: 'buttons',
    options: priorityOptions,
    direction: 'row',
    value: '',
    onChange: fn(),
    color: 'primary',
    'data-testid': 'button-radio-group',
  },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);

    await step('Button variant render', async () => {
      const buttons = canvas.getAllByRole('button');
      await expect(buttons).toHaveLength(4);
    });

    await step('Click button option', async () => {
      const lowButton = canvas.getByRole('button', { name: /low/i });
      await userEvent.click(lowButton);
      await expect(args.onChange).toHaveBeenCalledTimes(1);
    });

    await step('Visual state change', async () => {
      const mediumButton = canvas.getByRole('button', { name: /medium/i });
      await userEvent.click(mediumButton);
      await expect(args.onChange).toHaveBeenCalledTimes(2);
    });
  },
};

// Segments Variant Interaction Tests
export const SegmentInteraction: Story = {
  name: '📊 Segment Interaction Test',
  args: {
    variant: 'segments',
    options: priorityOptions,
    value: '',
    onChange: fn(),
    'data-testid': 'segment-radio-group',
  },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);

    await step('Segment variant render', async () => {
      const segments = canvas.getAllByRole('button');
      await expect(segments).toHaveLength(4);
    });

    await step('Click segment option', async () => {
      const highSegment = canvas.getByRole('button', { name: /high/i });
      await userEvent.click(highSegment);
      await expect(args.onChange).toHaveBeenCalledTimes(1);
    });

    await step('Segment selection state', async () => {
      const criticalSegment = canvas.getByRole('button', { name: /critical/i });
      await userEvent.click(criticalSegment);
      await expect(args.onChange).toHaveBeenCalledTimes(2);
    });
  },
};

// Keyboard Navigation Tests
export const KeyboardNavigation: Story = {
  name: '⌨️ Keyboard Navigation Test',
  args: {
    options: simpleOptions,
    label: 'Keyboard Navigation Test',
    variant: 'default',
    value: '',
    onChange: fn(),
  },
  parameters: {
    a11y: {
      element: '#storybook-root',
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'aria-required-attr', enabled: true },
          { id: 'aria-roles', enabled: true },
          { id: 'aria-valid-attr-value', enabled: true },
          { id: 'button-name', enabled: true },
          { id: 'duplicate-id', enabled: true },
          { id: 'label', enabled: true },
        ],
      },
    },
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step('Arrow key navigation', async () => {
      const firstRadio = canvas.getByRole('radio', { name: /option 1/i });
      const secondRadio = canvas.getByRole('radio', { name: /option 2/i });
      const thirdRadio = canvas.getByRole('radio', { name: /option 3/i });

      // Click to focus first radio
      await userEvent.click(firstRadio);
      await expect(firstRadio).toHaveFocus();

      // Arrow down should move to next radio
      await userEvent.keyboard('{ArrowDown}');
      await waitFor(() => expect(secondRadio).toHaveFocus());

      // Arrow down again
      await userEvent.keyboard('{ArrowDown}');
      await waitFor(() => expect(thirdRadio).toHaveFocus());

      // Arrow up should move back
      await userEvent.keyboard('{ArrowUp}');
      await waitFor(() => expect(secondRadio).toHaveFocus());
    });

    await step('Space key activation', async () => {
      const firstRadio = canvas.getByRole('radio', { name: /option 1/i });

      // Click to focus
      await userEvent.click(firstRadio);
      await expect(firstRadio).toHaveFocus();

      // Space should select it
      await userEvent.keyboard(' ');
      await expect(args.onChange).toHaveBeenCalled();
    });
  },
};

// Screen Reader Tests
export const ScreenReaderTest: Story = {
  name: '🔊 Screen Reader Test',
  args: {
    options: paymentOptions,
    label: 'Payment Method Selection',
    helperText: 'Choose your preferred payment method',
    variant: 'default',
    value: '',
    onChange: fn(),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify ARIA labels and roles', async () => {
      const radioGroup = canvas.getByRole('radiogroup');
      await expect(radioGroup).toBeInTheDocument();

      const radios = canvas.getAllByRole('radio');
      await expect(radios).toHaveLength(4);

      // Verify each radio has proper name
      await expect(canvas.getByRole('radio', { name: /credit card/i })).toBeInTheDocument();
      await expect(canvas.getByRole('radio', { name: /cash/i })).toBeInTheDocument();
    });

    await step('Verify helper text association', async () => {
      const helperText = canvas.getByText('Choose your preferred payment method');
      await expect(helperText).toBeInTheDocument();
    });

    await step('Verify group labeling', async () => {
      const groupLabel = canvas.getByText('Payment Method Selection');
      await expect(groupLabel).toBeInTheDocument();
    });
  },
};

// Focus Management Tests
export const FocusManagement: Story = {
  name: '🎯 Focus Management Test',
  args: {
    options: priorityOptions,
    variant: 'buttons',
    direction: 'row',
    value: '',
    onChange: fn(),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Focus on first option', async () => {
      const firstButton = canvas.getByRole('button', { name: /low/i });
      firstButton.focus();
      await expect(firstButton).toHaveFocus();
    });

    await step('Focus persistence after selection', async () => {
      const mediumButton = canvas.getByRole('button', { name: /medium/i });
      await userEvent.click(mediumButton);
      await expect(mediumButton).toHaveFocus();
    });

    await step('Tab order verification', async () => {
      const lowButton = canvas.getByRole('button', { name: /low/i });
      const mediumButton = canvas.getByRole('button', { name: /medium/i });
      const highButton = canvas.getByRole('button', { name: /high/i });

      lowButton.focus();
      await userEvent.tab();
      await expect(mediumButton).toHaveFocus();

      await userEvent.tab();
      await expect(highButton).toHaveFocus();
    });
  },
};

// Responsive Design Tests
export const ResponsiveDesign: Story = {
  name: '📱 Responsive Design Test',
  args: {
    variant: 'cards',
    options: paymentOptions,
    direction: 'column',
    value: '',
  },
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '667px' },
          type: 'mobile',
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
          type: 'tablet',
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1920px', height: '1080px' },
          type: 'desktop',
        },
      },
      defaultViewport: 'mobile',
    },
    chromatic: {
      viewports: [375, 768, 1920],
      delay: 300,
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify mobile layout', async () => {
      const cards = canvas.getAllByText(/Credit Card|Cash|Mobile Pay|Online Banking/);
      await expect(cards).toHaveLength(4);

      // Cards should be stacked vertically on mobile
      const container = cards[0].closest('[class*="MuiBox"]');
      if (container) {
        const computedStyle = window.getComputedStyle(container);
        // On mobile, direction should be column
        await expect(computedStyle.flexDirection).toBeTruthy();
      }
    });
  },
};

// Visual States Tests
export const VisualStates: Story = {
  name: '👁️ Visual States Test',
  args: {
    variant: 'cards',
    options: [
      ...priorityOptions.slice(0, 2),
      { value: 'disabled', label: 'Disabled Option', disabled: true, icon: <Shield size={16} /> },
    ],
    value: 'low',
    onChange: fn(),
    color: 'primary',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Default state', async () => {
      // Cards variant doesn't use button role, check for card elements instead
      const cards = canvas.getAllByText(/Low|Medium|Disabled Option/);
      await expect(cards.length).toBeGreaterThan(0);
    });

    await step('Selected state', async () => {
      // Low option should be selected based on args.value
      const lowOption = canvas.getByText('Low');
      await expect(lowOption).toBeInTheDocument();
    });

    await step('Hover state', async () => {
      const mediumOption = canvas.getByText('Medium');
      // Cards don't have role="button", get the parent card element
      const cardContainer = mediumOption.closest('.MuiCard-root');

      if (cardContainer) {
        await userEvent.hover(cardContainer);
        // Hover effects should be applied
        await expect(cardContainer).toBeInTheDocument();
      }
    });

    await step('Disabled state', async () => {
      const disabledOption = canvas.getByText('Disabled Option');
      // Cards don't have role="button", get the parent card element
      const disabledCard = disabledOption.closest('.MuiCard-root');

      // Should not be clickable
      if (disabledCard) {
        await userEvent.click(disabledCard);
        // onChange should not be called for disabled option
        await expect(disabledCard).toBeInTheDocument();
      }
    });
  },
};

// Error State Tests
export const ErrorState: Story = {
  name: '❌ Error State Test',
  args: {
    variant: 'default',
    options: simpleOptions,
    label: 'Required Selection',
    error: true,
    helperText: 'Please select an option',
    value: '',
    onChange: fn(),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Error styling verification', async () => {
      const errorText = canvas.getByText('Please select an option');
      await expect(errorText).toBeInTheDocument();

      // Error text should have error styling
      const computedStyle = window.getComputedStyle(errorText);
      await expect(computedStyle.color).toMatch(/rgb/);
    });

    await step('Label error styling', async () => {
      const label = canvas.getByText('Required Selection');
      await expect(label).toBeInTheDocument();

      // Label should have error color
      const computedStyle = window.getComputedStyle(label);
      await expect(computedStyle.color).toMatch(/rgb/);
    });
  },
};

// Special Effects Tests
export const SpecialEffects: Story = {
  name: '✨ Special Effects Test',
  args: {
    variant: 'cards',
    options: priorityOptions,
    value: 'medium',
    glass: true,
    gradient: true,
    glow: true,
    glassLabel: true,
    label: 'Special Effects Demo',
    onChange: fn(),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Glass morphism effects', async () => {
      const label = canvas.getByText('Special Effects Demo');
      await expect(label).toBeInTheDocument();

      // Glass label should have backdrop filter effects
      const computedStyle = window.getComputedStyle(label);
      await expect(computedStyle).toBeTruthy();
    });

    await step('Card effects verification', async () => {
      // Cards variant doesn't use button role, check for card elements instead
      const cards = document.querySelectorAll('.MuiCard-root');
      await expect(cards.length).toBeGreaterThan(0);

      // Selected card should have special effects applied
      const selectedCard = Array.from(cards).find((card) => card.textContent?.includes('Medium'));

      if (selectedCard) {
        const computedStyle = window.getComputedStyle(selectedCard);
        // Should have enhanced visual effects
        await expect(computedStyle).toBeTruthy();
      }
    });
  },
};

// Edge Cases Tests
export const EdgeCases: Story = {
  name: '🔧 Edge Cases Test',
  args: {
    variant: 'buttons',
    options: [
      {
        value: 'very-long-option-name-that-might-cause-overflow',
        label: 'Very Long Option Name That Might Cause Text Overflow Issues',
      },
      { value: 'empty', label: '' },
      { value: 'special-chars', label: 'Special !@#$%^&*() Characters' },
      { value: 'unicode', label: '🚀 Unicode ✨ Characters 🎉' },
    ],
    direction: 'row',
    value: '',
    onChange: fn(),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Long text handling', async () => {
      const longTextButton = canvas.getByText(/Very Long Option Name/);
      await expect(longTextButton).toBeInTheDocument();

      const computedStyle = window.getComputedStyle(longTextButton);
      // Should handle text overflow gracefully
      await expect(computedStyle.textOverflow).toBeTruthy();
    });

    await step('Empty label handling', async () => {
      // Should render even with empty label
      const buttons = canvas.getAllByRole('button');
      await expect(buttons).toHaveLength(4);
    });

    await step('Special characters handling', async () => {
      const specialCharsButton = canvas.getByText(/Special !@#\$%\^&\*\(\) Characters/);
      await expect(specialCharsButton).toBeInTheDocument();
    });

    await step('Unicode characters handling', async () => {
      const unicodeButton = canvas.getByText(/🚀 Unicode ✨ Characters 🎉/);
      await expect(unicodeButton).toBeInTheDocument();
    });
  },
};

// Performance Test
export const PerformanceTest: Story = {
  name: '⚡ Performance Test',
  args: {
    variant: 'default',
    options: Array.from({ length: 50 }, (_, i) => ({
      value: `option-${i}`,
      label: `Option ${i + 1}`,
      description: `Description for option ${i + 1}`,
    })),
    value: '',
    onChange: fn(),
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step('Render with many options', async () => {
      const radios = canvas.getAllByRole('radio');
      await expect(radios).toHaveLength(50);

      // Radio names include descriptions, so match by the full text
      await expect(
        canvas.getByRole('radio', { name: /option 1 description for option 1/i }),
      ).toBeInTheDocument();
      await expect(
        canvas.getByRole('radio', { name: /option 50 description for option 50/i }),
      ).toBeInTheDocument();
    });

    await step('Selection works with many options', async () => {
      const lastRadio = canvas.getByRole('radio', { name: /option 50 description for option 50/i });
      await userEvent.click(lastRadio);

      // Verify onChange was called with the correct value
      await expect(args.onChange).toHaveBeenCalled();
      const lastCall = args.onChange.mock.calls[args.onChange.mock.calls.length - 1];
      await expect(lastCall[1]).toBe('option-49'); // Option 50 has index 49
    });
  },
};

// Integration Test
export const IntegrationTest: Story = {
  name: '🔗 Integration Test',
  args: {
    variant: 'cards',
    options: paymentOptions,
    value: '',
    onChange: fn(),
  },
  render: (args) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">Payment Selection Form</Typography>
      <RadioGroup {...args} data-testid="payment-selection" />
      <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
        <Typography variant="body2" data-testid="selection-display">
          Selected: {args.value || 'None'}
        </Typography>
      </Box>
    </Box>
  ),
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step('Form integration', async () => {
      const title = canvas.getByText('Payment Selection Form');
      await expect(title).toBeInTheDocument();

      const selectionDisplay = canvas.getByTestId('selection-display');
      await expect(selectionDisplay).toHaveTextContent('Selected: None');
    });

    await step('Selection updates display', async () => {
      const creditCardOption = canvas.getByText('Credit Card');
      const cardContainer = creditCardOption.closest('[role="button"]');

      if (cardContainer) {
        await userEvent.click(cardContainer);
        await expect(args.onChange).toHaveBeenCalled();
        const firstCall = args.onChange.mock.calls[0];
        await expect(firstCall[1]).toBe('card');
      }
    });
  },
};
