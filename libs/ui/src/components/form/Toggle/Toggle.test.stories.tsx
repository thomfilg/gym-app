import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heart, Pause,Play, Settings, Star } from 'lucide-react';
import React, { useState } from 'react';
import { expect, fn,userEvent, waitFor, within } from 'storybook/test';

import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Form/Toggle/Tests',
  component: Toggle,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
    docs: { source: { type: 'code' } },
  },
  tags: ['autodocs', 'test', 'component:Toggle'],
};
export default meta;
export type Story = StoryObj<typeof meta>;

// Basic Interaction Tests
export const BasicInteraction: Story = {
  render: function BasicInteractionRender() {
    const [selected, setSelected] = useState(false);
    const handleChange = fn(() => setSelected(!selected));

    return (
      <div data-testid="basic-interaction-container">
        <Toggle
          data-testid="basic-toggle"
          selected={selected}
          onChange={handleChange}
          value="test-toggle"
        >
          Click Me
        </Toggle>
        <div data-testid="selection-state" aria-live="polite">
          {selected ? 'Selected' : 'Not Selected'}
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByTestId('basic-toggle');
    const stateDiv = canvas.getByTestId('selection-state');

    // Verify initial state
    expect(stateDiv).toHaveTextContent('Not Selected');
    expect(toggle).toHaveAttribute('aria-pressed', 'false');

    // Click to select
    await userEvent.click(toggle);
    await waitFor(() => {
      expect(stateDiv).toHaveTextContent('Selected');
      expect(toggle).toHaveAttribute('aria-pressed', 'true');
    });

    // Click to deselect
    await userEvent.click(toggle);
    await waitFor(() => {
      expect(stateDiv).toHaveTextContent('Not Selected');
      expect(toggle).toHaveAttribute('aria-pressed', 'false');
    });
  },
};

// Form Interaction Tests
export const FormInteraction: Story = {
  render: function FormInteractionRender() {
    const [formData, setFormData] = useState({
      notifications: false,
      marketing: true,
      newsletter: false,
    });

    const handleSubmit = fn((e: React.FormEvent) => {
      e.preventDefault();
      // Form submitted with data: formData
    });

    return (
      <form onSubmit={handleSubmit} data-testid="toggle-form">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 300 }}>
          <Toggle
            data-testid="notifications-toggle"
            selected={formData.notifications}
            onChange={() =>
              setFormData((prev) => ({ ...prev, notifications: !prev.notifications }))
            }
            value="notifications"
            icon={<Star size={16} />}
          >
            Notifications
          </Toggle>

          <Toggle
            data-testid="marketing-toggle"
            selected={formData.marketing}
            onChange={() => setFormData((prev) => ({ ...prev, marketing: !prev.marketing }))}
            value="marketing"
            variant="outline"
            color="secondary"
          >
            Marketing Emails
          </Toggle>

          <Toggle
            data-testid="newsletter-toggle"
            selected={formData.newsletter}
            onChange={() => setFormData((prev) => ({ ...prev, newsletter: !prev.newsletter }))}
            value="newsletter"
            variant="soft"
            color="success"
          >
            Newsletter
          </Toggle>

          <button type="submit" data-testid="submit-button">
            Save Preferences
          </button>

          <div data-testid="form-state" aria-live="polite">
            {JSON.stringify(formData)}
          </div>
        </Box>
      </form>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const notificationsToggle = canvas.getByTestId('notifications-toggle');
    const marketingToggle = canvas.getByTestId('marketing-toggle');
    const newsletterToggle = canvas.getByTestId('newsletter-toggle');
    const submitButton = canvas.getByTestId('submit-button');
    const formState = canvas.getByTestId('form-state');

    // Verify initial form state
    expect(formState).toHaveTextContent(
      '{"notifications":false,"marketing":true,"newsletter":false}',
    );
    expect(notificationsToggle).toHaveAttribute('aria-pressed', 'false');
    expect(marketingToggle).toHaveAttribute('aria-pressed', 'true');
    expect(newsletterToggle).toHaveAttribute('aria-pressed', 'false');

    // Toggle notifications on
    await userEvent.click(notificationsToggle);
    await waitFor(() => {
      expect(formState).toHaveTextContent(
        '{"notifications":true,"marketing":true,"newsletter":false}',
      );
    });

    // Toggle marketing off
    await userEvent.click(marketingToggle);
    await waitFor(() => {
      expect(formState).toHaveTextContent(
        '{"notifications":true,"marketing":false,"newsletter":false}',
      );
    });

    // Toggle newsletter on
    await userEvent.click(newsletterToggle);
    await waitFor(() => {
      expect(formState).toHaveTextContent(
        '{"notifications":true,"marketing":false,"newsletter":true}',
      );
    });

    // Test form submission
    await userEvent.click(submitButton);
    // Verify no errors occurred
    expect(formState).toBeInTheDocument();
  },
};

// Keyboard Navigation Tests
export const KeyboardNavigation: Story = {
  render: function KeyboardNavigationRender() {
    const [selectedStates, setSelectedStates] = useState({
      toggle1: false,
      toggle2: false,
      toggle3: false,
    });

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 300 }}>
        <div
          data-testid="keyboard-instructions"
          role="region"
          aria-label="Keyboard Navigation Test"
        >
          Use Tab to navigate, Space/Enter to toggle
        </div>

        <Toggle
          data-testid="keyboard-toggle-1"
          selected={selectedStates.toggle1}
          onChange={() => setSelectedStates((prev) => ({ ...prev, toggle1: !prev.toggle1 }))}
          value="toggle1"
        >
          First Toggle
        </Toggle>

        <Toggle
          data-testid="keyboard-toggle-2"
          selected={selectedStates.toggle2}
          onChange={() => setSelectedStates((prev) => ({ ...prev, toggle2: !prev.toggle2 }))}
          value="toggle2"
          variant="outline"
        >
          Second Toggle
        </Toggle>

        <Toggle
          data-testid="keyboard-toggle-3"
          selected={selectedStates.toggle3}
          onChange={() => setSelectedStates((prev) => ({ ...prev, toggle3: !prev.toggle3 }))}
          value="toggle3"
          disabled
        >
          Disabled Toggle
        </Toggle>

        <div data-testid="keyboard-state" aria-live="polite">
          {JSON.stringify(selectedStates)}
        </div>
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle1 = canvas.getByTestId('keyboard-toggle-1');
    const toggle2 = canvas.getByTestId('keyboard-toggle-2');
    const toggle3 = canvas.getByTestId('keyboard-toggle-3');
    const stateDiv = canvas.getByTestId('keyboard-state');

    // Test Tab navigation
    toggle1.focus();
    expect(toggle1).toHaveFocus();

    await userEvent.tab();
    expect(toggle2).toHaveFocus();

    // Disabled toggle won't receive focus as it has tabindex="-1"
    // This is expected behavior for disabled MUI ToggleButtons
    await userEvent.tab();
    // Focus should skip the disabled toggle
    expect(document.activeElement).not.toBe(toggle3);

    // Test Space key activation
    toggle1.focus();
    expect(stateDiv).toHaveTextContent('{"toggle1":false,"toggle2":false,"toggle3":false}');

    await userEvent.keyboard(' ');
    await waitFor(() => {
      expect(stateDiv).toHaveTextContent('{"toggle1":true,"toggle2":false,"toggle3":false}');
    });

    // Test Enter key activation
    toggle2.focus();
    await userEvent.keyboard('{Enter}');
    await waitFor(() => {
      expect(stateDiv).toHaveTextContent('{"toggle1":true,"toggle2":true,"toggle3":false}');
    });

    // Test disabled toggle doesn't respond
    toggle3.focus();
    await userEvent.keyboard(' ');
    await userEvent.keyboard('{Enter}');
    // State should remain unchanged
    expect(stateDiv).toHaveTextContent('{"toggle1":true,"toggle2":true,"toggle3":false}');
  },
};

// Screen Reader Tests
export const ScreenReader: Story = {
  render: function ScreenReaderRender() {
    const [settings, setSettings] = useState({
      darkMode: false,
      highContrast: false,
      screenReader: true,
    });

    return (
      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 300 }}
        role="group"
        aria-labelledby="accessibility-settings"
      >
        <h3 id="accessibility-settings">Accessibility Settings</h3>

        <Toggle
          data-testid="dark-mode-toggle"
          selected={settings.darkMode}
          onChange={() => setSettings((prev) => ({ ...prev, darkMode: !prev.darkMode }))}
          value="darkMode"
          aria-describedby="dark-mode-description"
        >
          Dark Mode
        </Toggle>
        <div id="dark-mode-description" className="sr-only">
          Enable dark theme for reduced eye strain
        </div>

        <Toggle
          data-testid="high-contrast-toggle"
          selected={settings.highContrast}
          onChange={() => setSettings((prev) => ({ ...prev, highContrast: !prev.highContrast }))}
          value="highContrast"
          aria-describedby="high-contrast-description"
          variant="outline"
        >
          High Contrast
        </Toggle>
        <div id="high-contrast-description" className="sr-only">
          Increase contrast for better visibility
        </div>

        <Toggle
          data-testid="screen-reader-toggle"
          selected={settings.screenReader}
          onChange={() => setSettings((prev) => ({ ...prev, screenReader: !prev.screenReader }))}
          value="screenReader"
          aria-describedby="screen-reader-description"
          variant="soft"
          color="success"
        >
          Screen Reader Support
        </Toggle>
        <div id="screen-reader-description" className="sr-only">
          Enable enhanced screen reader compatibility
        </div>

        <div data-testid="accessibility-status" role="status" aria-live="polite" aria-atomic="true">
          Settings:{' '}
          {Object.entries(settings)
            .filter(([, enabled]) => enabled)
            .map(([key]) => key)
            .join(', ') || 'None selected'}
        </div>
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const darkModeToggle = canvas.getByTestId('dark-mode-toggle');
    const highContrastToggle = canvas.getByTestId('high-contrast-toggle');
    const screenReaderToggle = canvas.getByTestId('screen-reader-toggle');
    const statusDiv = canvas.getByTestId('accessibility-status');

    // Verify ARIA attributes
    // MUI ToggleButton uses role="button" internally
    expect(darkModeToggle).toHaveAttribute('aria-pressed', 'false');
    expect(darkModeToggle).toHaveAttribute('aria-describedby', 'dark-mode-description');

    expect(highContrastToggle).toHaveAttribute('aria-pressed', 'false');
    expect(screenReaderToggle).toHaveAttribute('aria-pressed', 'true');

    // Test status updates
    expect(statusDiv).toHaveTextContent('Settings: screenReader');

    await userEvent.click(darkModeToggle);
    await waitFor(() => {
      expect(darkModeToggle).toHaveAttribute('aria-pressed', 'true');
      expect(statusDiv).toHaveTextContent('Settings: darkMode, screenReader');
    });

    await userEvent.click(highContrastToggle);
    await waitFor(() => {
      expect(statusDiv).toHaveTextContent('Settings: darkMode, highContrast, screenReader');
    });
  },
};

// Focus Management Tests
export const FocusManagement: Story = {
  render: function FocusManagementRender() {
    const [activeToggle, setActiveToggle] = useState<string | null>(null);
    const [toggleStates, setToggleStates] = useState({
      media: false,
      social: false,
      notifications: false,
    });

    const handleFocus = (toggleName: string) => {
      setActiveToggle(toggleName);
    };

    const handleBlur = () => {
      setActiveToggle(null);
    };

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 300 }}>
        <div data-testid="focus-indicator" aria-live="polite">
          Focused: {activeToggle || 'None'}
        </div>

        <Toggle
          data-testid="media-toggle"
          selected={toggleStates.media}
          onChange={() => setToggleStates((prev) => ({ ...prev, media: !prev.media }))}
          onFocus={() => handleFocus('Media Controls')}
          onBlur={handleBlur}
          value="media"
          icon={<Play size={16} />}
        >
          Media Controls
        </Toggle>

        <Toggle
          data-testid="social-toggle"
          selected={toggleStates.social}
          onChange={() => setToggleStates((prev) => ({ ...prev, social: !prev.social }))}
          onFocus={() => handleFocus('Social Sharing')}
          onBlur={handleBlur}
          value="social"
          variant="outline"
          color="secondary"
          icon={<Heart size={16} />}
        >
          Social Sharing
        </Toggle>

        <Toggle
          data-testid="notifications-toggle"
          selected={toggleStates.notifications}
          onChange={() =>
            setToggleStates((prev) => ({ ...prev, notifications: !prev.notifications }))
          }
          onFocus={() => handleFocus('Notifications')}
          onBlur={handleBlur}
          value="notifications"
          variant="soft"
          color="warning"
        >
          Notifications
        </Toggle>

        <div data-testid="toggle-states">{JSON.stringify(toggleStates)}</div>
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const mediaToggle = canvas.getByTestId('media-toggle');
    const socialToggle = canvas.getByTestId('social-toggle');
    const notificationsToggle = canvas.getByTestId('notifications-toggle');
    const focusIndicator = canvas.getByTestId('focus-indicator');

    // Test focus events
    expect(focusIndicator).toHaveTextContent('Focused: None');

    await userEvent.click(mediaToggle);
    mediaToggle.focus();
    await waitFor(() => {
      expect(focusIndicator).toHaveTextContent('Focused: Media Controls');
    });

    socialToggle.focus();
    await waitFor(() => {
      expect(focusIndicator).toHaveTextContent('Focused: Social Sharing');
    });

    notificationsToggle.focus();
    await waitFor(() => {
      expect(focusIndicator).toHaveTextContent('Focused: Notifications');
    });

    // Test blur by clicking outside
    await userEvent.click(focusIndicator);
    await waitFor(() => {
      expect(focusIndicator).toHaveTextContent('Focused: None');
    });
  },
};

// Responsive Design Tests
export const ResponsiveDesign: Story = {
  render: function ResponsiveDesignRender() {
    const [mobileSelected, setMobileSelected] = useState(false);
    const [tabletSelected, setTabletSelected] = useState(false);
    const [desktopSelected, setDesktopSelected] = useState(false);

    return (
      <Box data-testid="responsive-container">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
          <h4>Mobile View (xs)</h4>
          <Box sx={{ width: 320, border: '1px solid #ccc', p: 2 }}>
            <Toggle
              data-testid="mobile-toggle"
              selected={mobileSelected}
              onChange={() => setMobileSelected(!mobileSelected)}
              size="sm"
              fullWidth
              value="mobile"
            >
              Mobile Toggle
            </Toggle>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
          <h4>Tablet View (md)</h4>
          <Box sx={{ width: 768, border: '1px solid #ccc', p: 2 }}>
            <Toggle
              data-testid="tablet-toggle"
              selected={tabletSelected}
              onChange={() => setTabletSelected(!tabletSelected)}
              size="md"
              value="tablet"
              icon={<Star size={16} />}
            >
              Tablet Toggle
            </Toggle>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
          <h4>Desktop View (lg)</h4>
          <Box sx={{ width: 1024, border: '1px solid #ccc', p: 2 }}>
            <Toggle
              data-testid="desktop-toggle"
              selected={desktopSelected}
              onChange={() => setDesktopSelected(!desktopSelected)}
              size="lg"
              value="desktop"
              variant="outline"
              color="primary"
              icon={<Settings size={18} />}
            >
              Desktop Toggle
            </Toggle>
          </Box>
        </Box>

        <div data-testid="responsive-state">
          Mobile: {mobileSelected.toString()}, Tablet: {tabletSelected.toString()}, Desktop:{' '}
          {desktopSelected.toString()}
        </div>
      </Box>
    );
  },
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1024px', height: '768px' } },
      },
      defaultViewport: 'desktop',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const mobileToggle = canvas.getByTestId('mobile-toggle');
    const tabletToggle = canvas.getByTestId('tablet-toggle');
    const desktopToggle = canvas.getByTestId('desktop-toggle');
    const stateDiv = canvas.getByTestId('responsive-state');

    // Test toggles work in all viewport sizes
    expect(stateDiv).toHaveTextContent('Mobile: false, Tablet: false, Desktop: false');

    await userEvent.click(mobileToggle);
    await waitFor(() => {
      expect(stateDiv).toHaveTextContent('Mobile: true, Tablet: false, Desktop: false');
    });

    await userEvent.click(tabletToggle);
    await waitFor(() => {
      expect(stateDiv).toHaveTextContent('Mobile: true, Tablet: true, Desktop: false');
    });

    await userEvent.click(desktopToggle);
    await waitFor(() => {
      expect(stateDiv).toHaveTextContent('Mobile: true, Tablet: true, Desktop: true');
    });
  },
};

// Theme Variations Tests
export const ThemeVariations: Story = {
  render: function ThemeVariationsRender() {
    const theme = useTheme();
    const [selected, setSelected] = useState(false);

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <div data-testid="theme-info">Current theme mode: {theme.palette.mode}</div>

        <Paper elevation={0} sx={{ p: 2, backgroundColor: 'background.default' }}>
          <h4>Light Theme</h4>
          <Toggle
            data-testid="light-theme-toggle"
            selected={selected}
            onChange={() => setSelected(!selected)}
            value="light"
          >
            Light Theme Toggle
          </Toggle>
        </Paper>

        <Paper elevation={2} sx={{ p: 2, backgroundColor: 'background.paper' }}>
          <h4>Paper Background</h4>
          <Toggle
            data-testid="paper-theme-toggle"
            selected={selected}
            onChange={() => setSelected(!selected)}
            value="paper"
            variant="outline"
            color="secondary"
          >
            Paper Theme Toggle
          </Toggle>
        </Paper>

        <Box
          sx={{
            p: 2,
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            borderRadius: 1,
          }}
        >
          <h4>Primary Background</h4>
          <Toggle
            data-testid="primary-theme-toggle"
            selected={selected}
            onChange={() => setSelected(!selected)}
            value="primary"
            variant="soft"
            color="secondary"
          >
            Contrast Toggle
          </Toggle>
        </Box>

        <div data-testid="theme-state">Selected: {selected.toString()}</div>
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const lightToggle = canvas.getByTestId('light-theme-toggle');
    const paperToggle = canvas.getByTestId('paper-theme-toggle');
    const primaryToggle = canvas.getByTestId('primary-theme-toggle');
    const stateDiv = canvas.getByTestId('theme-state');

    // Test all theme variants work
    expect(stateDiv).toHaveTextContent('Selected: false');

    await userEvent.click(lightToggle);
    await waitFor(() => {
      expect(stateDiv).toHaveTextContent('Selected: true');
    });

    // Test other toggles sync with state
    await userEvent.click(paperToggle);
    await waitFor(() => {
      expect(stateDiv).toHaveTextContent('Selected: false');
    });

    await userEvent.click(primaryToggle);
    await waitFor(() => {
      expect(stateDiv).toHaveTextContent('Selected: true');
    });
  },
};

// Visual States Tests
export const VisualStates: Story = {
  render: function VisualStatesRender() {
    const [states, setStates] = useState({
      normal: false,
      hover: false,
      focus: false,
      active: false,
      selected: true,
      disabled: false,
    });

    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 2,
        }}
      >
        <Box>
          <h4>Normal State</h4>
          <Toggle
            data-testid="normal-toggle"
            selected={states.normal}
            onChange={() => setStates((prev) => ({ ...prev, normal: !prev.normal }))}
            value="normal"
          >
            Normal Toggle
          </Toggle>
        </Box>

        <Box>
          <h4>Hover State</h4>
          <Toggle
            data-testid="hover-toggle"
            selected={states.hover}
            onChange={() => setStates((prev) => ({ ...prev, hover: !prev.hover }))}
            value="hover"
            color="secondary"
          >
            Hover Toggle
          </Toggle>
        </Box>

        <Box>
          <h4>Focus State</h4>
          <Toggle
            data-testid="focus-toggle"
            selected={states.focus}
            onChange={() => setStates((prev) => ({ ...prev, focus: !prev.focus }))}
            value="focus"
            variant="outline"
            color="success"
          >
            Focus Toggle
          </Toggle>
        </Box>

        <Box>
          <h4>Selected State</h4>
          <Toggle
            data-testid="selected-toggle"
            selected={states.selected}
            onChange={() => setStates((prev) => ({ ...prev, selected: !prev.selected }))}
            value="selected"
            color="warning"
          >
            Selected Toggle
          </Toggle>
        </Box>

        <Box>
          <h4>Disabled State</h4>
          <Toggle
            data-testid="disabled-toggle"
            selected={states.disabled}
            disabled
            value="disabled"
          >
            Disabled Toggle
          </Toggle>
        </Box>

        <Box>
          <h4>Glass Effect</h4>
          <Toggle data-testid="glass-toggle" selected={false} glass value="glass" color="primary">
            Glass Toggle
          </Toggle>
        </Box>

        <div data-testid="visual-states">{JSON.stringify(states)}</div>
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const normalToggle = canvas.getByTestId('normal-toggle');
    const hoverToggle = canvas.getByTestId('hover-toggle');
    const focusToggle = canvas.getByTestId('focus-toggle');
    const selectedToggle = canvas.getByTestId('selected-toggle');
    const disabledToggle = canvas.getByTestId('disabled-toggle');
    const glassToggle = canvas.getByTestId('glass-toggle');

    // Test visual states render correctly
    expect(normalToggle).toBeInTheDocument();
    expect(hoverToggle).toBeInTheDocument();
    expect(focusToggle).toBeInTheDocument();
    expect(selectedToggle).toHaveAttribute('aria-pressed', 'true');
    expect(disabledToggle).toBeDisabled();
    expect(glassToggle).toBeInTheDocument();

    // Test interactions
    await userEvent.click(normalToggle);
    expect(normalToggle).toHaveAttribute('aria-pressed', 'true');

    // Test hover simulation
    await userEvent.hover(hoverToggle);
    await userEvent.click(hoverToggle);
    expect(hoverToggle).toHaveAttribute('aria-pressed', 'true');

    // Test focus
    focusToggle.focus();
    expect(focusToggle).toHaveFocus();
    await userEvent.keyboard(' ');
    expect(focusToggle).toHaveAttribute('aria-pressed', 'true');
  },
};

// Performance Tests
export const Performance: Story = {
  render: function PerformanceRender() {
    const [toggles, setToggles] = useState(
      Array(50)
        .fill(false)
        .map((_, index) => ({ id: index, selected: false })),
    );

    const toggleHandler = fn((id: number) => {
      setToggles((prev) =>
        prev.map((toggle) =>
          toggle.id === id ? { ...toggle, selected: !toggle.selected } : toggle,
        ),
      );
    });

    return (
      <Box data-testid="performance-container">
        <div data-testid="performance-info">Rendering {toggles.length} Toggle components</div>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: 1,
            maxHeight: 400,
            overflowY: 'auto',
          }}
        >
          {toggles.map((toggle) => (
            <Toggle
              key={toggle.id}
              data-testid={`perf-toggle-${toggle.id}`}
              selected={toggle.selected}
              onChange={() => toggleHandler(toggle.id)}
              value={`toggle-${toggle.id}`}
              size="sm"
            >
              #{toggle.id}
            </Toggle>
          ))}
        </Box>

        <div data-testid="selected-count">Selected: {toggles.filter((t) => t.selected).length}</div>
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const performanceInfo = canvas.getByTestId('performance-info');
    const selectedCount = canvas.getByTestId('selected-count');

    // Verify all toggles rendered
    expect(performanceInfo).toHaveTextContent('Rendering 50 Toggle components');
    expect(selectedCount).toHaveTextContent('Selected: 0');

    // Test rapid interactions
    const firstToggle = canvas.getByTestId('perf-toggle-0');
    const secondToggle = canvas.getByTestId('perf-toggle-1');
    const thirdToggle = canvas.getByTestId('perf-toggle-2');

    const startTime = Date.now();

    await userEvent.click(firstToggle);
    await userEvent.click(secondToggle);
    await userEvent.click(thirdToggle);

    const endTime = Date.now();
    const duration = endTime - startTime;

    // Performance threshold: should complete within 500ms
    expect(duration).toBeLessThan(500);

    await waitFor(() => {
      expect(selectedCount).toHaveTextContent('Selected: 3');
    });
  },
};

// Edge Cases Tests
export const EdgeCases: Story = {
  render: function EdgeCasesRender() {
    const [states, setStates] = useState({
      empty: false,
      longText: false,
      specialChars: false,
      numbers: false,
    });

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 600 }}>
        <h4>Edge Cases Testing</h4>

        <Box>
          <h5>Empty Content</h5>
          <Toggle
            data-testid="empty-toggle"
            selected={states.empty}
            onChange={() => setStates((prev) => ({ ...prev, empty: !prev.empty }))}
            value=""
            icon={<Star size={16} />}
          />
        </Box>

        <Box>
          <h5>Very Long Text</h5>
          <Toggle
            data-testid="long-text-toggle"
            selected={states.longText}
            onChange={() => setStates((prev) => ({ ...prev, longText: !prev.longText }))}
            value="very-long-text"
            sx={{ maxWidth: 300 }}
          >
            This is a very long toggle button text that should wrap properly and maintain good
            usability even when the content exceeds normal expectations
          </Toggle>
        </Box>

        <Box>
          <h5>Special Characters & Emojis</h5>
          <Toggle
            data-testid="special-chars-toggle"
            selected={states.specialChars}
            onChange={() => setStates((prev) => ({ ...prev, specialChars: !prev.specialChars }))}
            value="special-chars"
          >
            🌟 Special &amp; &quot;Chars&quot; &lt;&gt;&amp;{'{}'} 测试 العربية
          </Toggle>
        </Box>

        <Box>
          <h5>Numeric Values</h5>
          <Toggle
            data-testid="numeric-toggle"
            selected={states.numbers}
            onChange={() => setStates((prev) => ({ ...prev, numbers: !prev.numbers }))}
            value={42}
          >
            Numeric Value: 42
          </Toggle>
        </Box>

        <div data-testid="edge-cases-state">{JSON.stringify(states)}</div>
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const emptyToggle = canvas.getByTestId('empty-toggle');
    const longTextToggle = canvas.getByTestId('long-text-toggle');
    const specialCharsToggle = canvas.getByTestId('special-chars-toggle');
    const numericToggle = canvas.getByTestId('numeric-toggle');
    const stateDiv = canvas.getByTestId('edge-cases-state');

    // Test empty content toggle (icon only)
    expect(emptyToggle).toBeInTheDocument();
    await userEvent.click(emptyToggle);
    await waitFor(() => {
      expect(stateDiv).toHaveTextContent('"empty":true');
    });

    // Test long text toggle
    expect(longTextToggle).toBeInTheDocument();
    await userEvent.click(longTextToggle);
    await waitFor(() => {
      expect(stateDiv).toHaveTextContent('"longText":true');
    });

    // Test special characters
    expect(specialCharsToggle).toHaveTextContent('🌟 Special & "Chars" <>&{} 测试 العربية');
    await userEvent.click(specialCharsToggle);
    await waitFor(() => {
      expect(stateDiv).toHaveTextContent('"specialChars":true');
    });

    // Test numeric value
    expect(numericToggle).toHaveTextContent('Numeric Value: 42');
    await userEvent.click(numericToggle);
    await waitFor(() => {
      expect(stateDiv).toHaveTextContent('"numbers":true');
    });
  },
};

// Integration Tests
export const Integration: Story = {
  render: function IntegrationRender() {
    const [preferences, setPreferences] = useState({
      theme: 'light',
      notifications: true,
      autoSave: false,
      analytics: false,
    });

    const [player, setPlayer] = useState({
      isPlaying: false,
      isMuted: false,
      repeat: false,
    });

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <h4>User Preferences Integration</h4>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Toggle
              data-testid="theme-toggle"
              selected={preferences.theme === 'dark'}
              onChange={() =>
                setPreferences((prev) => ({
                  ...prev,
                  theme: prev.theme === 'light' ? 'dark' : 'light',
                }))
              }
              value="theme"
              variant="outline"
              color="neutral"
            >
              Dark Mode
            </Toggle>

            <Toggle
              data-testid="notifications-pref-toggle"
              selected={preferences.notifications}
              onChange={() =>
                setPreferences((prev) => ({
                  ...prev,
                  notifications: !prev.notifications,
                }))
              }
              value="notifications"
              color="warning"
            >
              Notifications
            </Toggle>

            <Toggle
              data-testid="autosave-toggle"
              selected={preferences.autoSave}
              onChange={() =>
                setPreferences((prev) => ({
                  ...prev,
                  autoSave: !prev.autoSave,
                }))
              }
              value="autoSave"
              variant="soft"
              color="success"
            >
              Auto Save
            </Toggle>

            <Toggle
              data-testid="analytics-toggle"
              selected={preferences.analytics}
              onChange={() =>
                setPreferences((prev) => ({
                  ...prev,
                  analytics: !prev.analytics,
                }))
              }
              value="analytics"
              variant="soft"
              color="secondary"
            >
              Analytics
            </Toggle>
          </Box>
        </Box>

        <Box>
          <h4>Media Player Integration</h4>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Toggle
              data-testid="play-pause-toggle"
              selected={player.isPlaying}
              onChange={() =>
                setPlayer((prev) => ({
                  ...prev,
                  isPlaying: !prev.isPlaying,
                }))
              }
              value="playPause"
              icon={player.isPlaying ? <Pause size={16} /> : <Play size={16} />}
              color="primary"
              size="lg"
            />

            <Toggle
              data-testid="mute-toggle"
              selected={player.isMuted}
              onChange={() =>
                setPlayer((prev) => ({
                  ...prev,
                  isMuted: !prev.isMuted,
                }))
              }
              value="mute"
              variant="outline"
              color="secondary"
            >
              {player.isMuted ? 'Unmute' : 'Mute'}
            </Toggle>

            <Toggle
              data-testid="repeat-toggle"
              selected={player.repeat}
              onChange={() =>
                setPlayer((prev) => ({
                  ...prev,
                  repeat: !prev.repeat,
                }))
              }
              value="repeat"
              variant="soft"
              color="neutral"
            >
              Repeat
            </Toggle>
          </Box>
        </Box>

        <div data-testid="integration-state">
          Preferences: {JSON.stringify(preferences)}
          Player: {JSON.stringify(player)}
        </div>
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const themeToggle = canvas.getByTestId('theme-toggle');
    const notificationsToggle = canvas.getByTestId('notifications-pref-toggle');
    const playToggle = canvas.getByTestId('play-pause-toggle');
    const muteToggle = canvas.getByTestId('mute-toggle');
    const stateDiv = canvas.getByTestId('integration-state');

    // Test integration between multiple toggle components
    expect(stateDiv.textContent).toContain('theme":"light');
    expect(stateDiv.textContent).toContain('notifications":true');
    expect(stateDiv.textContent).toContain('isPlaying":false');

    // Test theme toggle affects preferences
    await userEvent.click(themeToggle);
    await waitFor(() => {
      expect(stateDiv.textContent).toContain('theme":"dark');
    });

    // Test notifications toggle
    await userEvent.click(notificationsToggle);
    await waitFor(() => {
      expect(stateDiv.textContent).toContain('notifications":false');
    });

    // Test media player controls
    await userEvent.click(playToggle);
    await waitFor(() => {
      expect(stateDiv.textContent).toContain('isPlaying":true');
    });

    await userEvent.click(muteToggle);
    await waitFor(() => {
      expect(stateDiv.textContent).toContain('isMuted":true');
    });
  },
};
