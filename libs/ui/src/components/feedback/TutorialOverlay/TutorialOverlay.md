# TutorialOverlay Component

An interactive tutorial overlay component for creating product tours, onboarding flows, and feature highlights. Provides step-by-step walkthroughs with highlighted elements, tooltips, navigation controls, and customizable styling.

## Features

- Interactive step-by-step tutorials
- Element highlighting and spotlighting
- Multiple visual variants (tooltip, modal, highlight, spotlight)
- Progress indicators and navigation controls
- Customizable positioning and styling
- Skip functionality and completion callbacks
- Responsive design and mobile support
- Accessibility compliance with ARIA attributes

## Usage

```tsx
import { TutorialOverlay } from '@procurement/ui';

const steps = [
  {
    id: '1',
    target: '#welcome-section',
    title: 'Welcome',
    content: 'This is your dashboard overview.',
    position: 'bottom',
  },
  {
    id: '2',
    target: '#navigation',
    title: 'Navigation',
    content: 'Use this menu to navigate between sections.',
    position: 'right',
  },
];

function App() {
  const [showTutorial, setShowTutorial] = useState(false);

  return (
    <>
      <button onClick={() => setShowTutorial(true)}>Start Tutorial</button>

      {showTutorial && (
        <TutorialOverlay
          steps={steps}
          onComplete={() => setShowTutorial(false)}
          onSkip={() => setShowTutorial(false)}
          variant="spotlight"
          showProgress
          allowSkip
          animated
        />
      )}
    </>
  );
}
```

## Props

### Required Props

- `steps`: Array of tutorial step definitions
- `onComplete`: Callback function when tutorial completes

### Optional Props

- `variant`: Visual style variant ('tooltip' | 'modal' | 'highlight' | 'spotlight')
- `position`: Tooltip positioning ('top' | 'bottom' | 'left' | 'right' | 'center')
- `showProgress`: Show progress indicator (boolean)
- `allowSkip`: Allow users to skip tutorial (boolean)
- `animated`: Enable animations (boolean)
- `onSkip`: Callback when tutorial is skipped
- `onStepChange`: Callback when step changes
- `onStepComplete`: Callback when individual step completes

### Step Object Structure

```tsx
interface TutorialStep {
  id: string;
  target: string; // CSS selector for target element
  title: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  action?: string; // Custom action button text
  requiresAction?: boolean; // Wait for user action
}
```

## Variants

### Tooltip

Standard tooltip-style overlay with arrow pointing to target element.

### Modal

Full-screen modal with highlighted target element.

### Highlight

Highlighted target element with subtle overlay.

### Spotlight

Dramatic spotlight effect focusing on target element.

## Accessibility

- ARIA landmarks and labels
- Keyboard navigation support (Tab, Escape, Enter)
- Screen reader compatibility
- Focus management and restoration
- High contrast support

## Best Practices

1. **Keep steps concise**: Limit tutorial steps to essential information
2. **Logical flow**: Order steps in natural user workflow
3. **Allow skipping**: Always provide skip option for returning users
4. **Progressive disclosure**: Break complex features into multiple tutorials
5. **Test on devices**: Verify functionality on mobile and tablet
6. **Provide context**: Ensure target elements are visible and accessible

## Examples

### Onboarding Flow

Guide new users through initial setup and key features.

### Feature Highlights

Introduce new functionality or updates to existing users.

### Interactive Tours

Multi-step tutorials requiring user interaction at each step.

### Contextual Help

Just-in-time assistance for specific workflows or features.

## Testing

This document describes all `data-testid` attributes available in the TutorialOverlay component for testing purposes.

### Test IDs

#### Container Elements

##### `tutorial-overlay`
- **Element:** Main overlay container
- **Location:** Root Overlay component that covers the entire viewport
- **Usage:** Query the main container to verify TutorialOverlay is rendered
```typescript
const overlay = await canvas.findByTestId('tutorial-overlay');
expect(overlay).toBeInTheDocument();
```

##### `tutorial-step-${currentStep}`
- **Element:** Step container (TooltipContainer)
- **Location:** The tooltip Paper component that displays the current step
- **Usage:** Query specific step by index to verify it's rendered
```typescript
// Query first step (index 0)
const step = await canvas.findByTestId('tutorial-step-0');
expect(step).toBeInTheDocument();

// Query third step (index 2)
const step3 = await canvas.findByTestId('tutorial-step-2');
expect(step3).toBeInTheDocument();
```

#### Content Elements

##### `tutorial-step-title`
- **Element:** Step title Typography
- **Location:** The title text at the top of each step
- **Usage:** Query to verify the step title is displayed
```typescript
const title = await canvas.findByTestId('tutorial-step-title');
expect(title).toHaveTextContent('Welcome to the Tutorial');
```

##### `tutorial-step-content`
- **Element:** Step content Typography
- **Location:** The descriptive text content of the step
- **Usage:** Query to verify the step content is displayed
```typescript
const content = await canvas.findByTestId('tutorial-step-content');
expect(content).toHaveTextContent('This is the main content description');
```

#### Navigation Elements

##### `tutorial-navigation`
- **Element:** Navigation buttons container
- **Location:** Stack container that holds all navigation buttons
- **Usage:** Query the navigation area to verify buttons are rendered
```typescript
const navigation = await canvas.findByTestId('tutorial-navigation');
expect(navigation).toBeInTheDocument();
```

##### `tutorial-prev-button`
- **Element:** Previous button
- **Location:** Button to navigate to the previous step
- **Usage:** Click to move to previous step
- **Note:** Only appears when currentStep > 0 and steps.length > 1
```typescript
const prevButton = await canvas.findByTestId('tutorial-prev-button');
await userEvent.click(prevButton);
expect(args.onStepComplete).toHaveBeenCalled();
```

##### `tutorial-next-button`
- **Element:** Next/Finish button
- **Location:** Button to navigate to the next step or complete tutorial
- **Usage:** Click to advance to next step or finish
- **Note:** Label changes to "Finish" or "Complete" on last step
```typescript
const nextButton = await canvas.findByTestId('tutorial-next-button');
expect(nextButton).toHaveTextContent('Next');
await userEvent.click(nextButton);
```

##### `tutorial-close-button`
- **Element:** Close/Skip button (IconButton)
- **Location:** Close icon in the top-right corner of the step
- **Usage:** Click to skip/close the tutorial
- **Note:** Only appears when allowSkip prop is true
```typescript
const closeButton = await canvas.findByTestId('tutorial-close-button');
await userEvent.click(closeButton);
expect(args.onSkip).toHaveBeenCalled();
```

#### Progress Indicators

##### `tutorial-step-indicators`
- **Element:** Step indicators container
- **Location:** Container holding all step indicator dots
- **Usage:** Query the indicator container to verify progress display
```typescript
const indicators = await canvas.findByTestId('tutorial-step-indicators');
expect(indicators).toBeInTheDocument();
```

##### `tutorial-indicator-${index}`
- **Element:** Individual indicator dot
- **Location:** Each dot representing a step in the tutorial
- **Usage:** Query specific indicators to verify progress state
```typescript
// Check first indicator (index 0)
const indicator0 = await canvas.findByTestId('tutorial-indicator-0');
expect(indicator0).toBeInTheDocument();

// Verify all indicators are rendered
const allIndicators = await canvas.findAllByTestId(/tutorial-indicator-/);
expect(allIndicators).toHaveLength(steps.length);
```

#### Highlight Elements

##### `tutorial-highlight`
- **Element:** Target highlight overlay (Spotlight)
- **Location:** The pulsing highlight box around the target element
- **Usage:** Verify spotlight/highlight is displayed when variant is 'spotlight' or 'highlight'
- **Note:** Only appears when variant='spotlight' or variant='highlight' and target is visible
```typescript
const highlight = await canvas.findByTestId('tutorial-highlight');
expect(highlight).toBeInTheDocument();
```

### Test Patterns

#### Wait for Tutorial to Render
```typescript
import { waitFor, within } from 'storybook/test';

// Wait for overlay to appear
const overlay = await canvas.findByTestId('tutorial-overlay');
expect(overlay).toBeInTheDocument();

// Wait for first step
const step = await canvas.findByTestId('tutorial-step-0');
expect(step).toBeInTheDocument();
```

#### Verify Step Content
```typescript
// Check title and content
const title = await canvas.findByTestId('tutorial-step-title');
expect(title).toHaveTextContent(expectedTitle);

const content = await canvas.findByTestId('tutorial-step-content');
expect(content).toHaveTextContent(expectedContent);
```

#### Navigate Through Steps
```typescript
// Start at step 0
const step0 = await canvas.findByTestId('tutorial-step-0');
expect(step0).toBeInTheDocument();

// Click next
const nextButton = await canvas.findByTestId('tutorial-next-button');
await userEvent.click(nextButton);

// Verify we're on step 1
await waitFor(async () => {
  const step1 = await canvas.findByTestId('tutorial-step-1');
  expect(step1).toBeInTheDocument();
});

// Click previous
const prevButton = await canvas.findByTestId('tutorial-prev-button');
await userEvent.click(prevButton);

// Verify we're back on step 0
await waitFor(async () => {
  const step0Again = await canvas.findByTestId('tutorial-step-0');
  expect(step0Again).toBeInTheDocument();
});
```

#### Verify Progress Indicators
```typescript
// Get all indicators
const indicators = await canvas.findAllByTestId(/tutorial-indicator-/);
expect(indicators).toHaveLength(steps.length);

// Check specific indicator states
const indicator0 = await canvas.findByTestId('tutorial-indicator-0');
const indicator1 = await canvas.findByTestId('tutorial-indicator-1');

// Verify current step indicator is active
const step0Style = window.getComputedStyle(indicator0);
// Active indicators have transform: scale(1.5)
```

#### Test Skip/Close Functionality
```typescript
// Find close button (only if allowSkip=true)
const closeButton = await canvas.findByTestId('tutorial-close-button');
await userEvent.click(closeButton);

// Verify onSkip callback was called
expect(args.onSkip).toHaveBeenCalled();
```

#### Test Highlight/Spotlight
```typescript
// When variant is 'spotlight' or 'highlight'
await waitFor(async () => {
  const highlight = await canvas.findByTestId('tutorial-highlight');
  expect(highlight).toBeInTheDocument();
}, { timeout: 3000 });
```

### Props That Affect Test Behavior

#### `variant`
- **Values:** `'tooltip' | 'modal' | 'spotlight' | 'highlight'`
- **Impact:**
  - `tooltip`: Basic tooltip without backdrop
  - `modal`: Full modal with backdrop
  - `spotlight`/`highlight`: Shows backdrop and pulsing highlight around target
  - Only `spotlight` and `highlight` render `tutorial-highlight`

#### `active`
- **Values:** `boolean`
- **Impact:** When false, component returns null (nothing rendered)

#### `allowSkip`
- **Values:** `boolean`
- **Impact:** Controls visibility of `tutorial-close-button`
- **Test Tip:** Only query close button when allowSkip=true

#### `showProgress`
- **Values:** `boolean`
- **Impact:** Shows/hides progress bar and step counter text

#### `steps`
- **Values:** `TutorialStep[]`
- **Impact:** Determines number of indicators and step containers
- **Test Tip:** Use steps.length to verify indicator count

#### `animated`
- **Values:** `boolean`
- **Impact:** Enables/disables float animation on tooltip
- **Test Tip:** Use `waitFor()` when testing animated tutorials

#### `allowKeyboardNavigation`
- **Values:** `boolean`
- **Impact:** Enables keyboard shortcuts (ArrowLeft, ArrowRight, Escape)

### Common Test Scenarios

#### 1. Basic Rendering Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Wait for overlay to render
  const overlay = await canvas.findByTestId('tutorial-overlay');
  expect(overlay).toBeInTheDocument();

  // Verify first step is visible
  const step = await canvas.findByTestId('tutorial-step-0');
  expect(step).toBeInTheDocument();

  // Verify indicators match step count
  const indicators = await canvas.findAllByTestId(/tutorial-indicator-/);
  expect(indicators).toHaveLength(steps.length);
}
```

#### 2. Navigation Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Wait for tutorial to render
  await canvas.findByTestId('tutorial-overlay');

  // Click next button
  const nextButton = await canvas.findByTestId('tutorial-next-button');
  await userEvent.click(nextButton);

  // Verify we moved to next step
  await waitFor(async () => {
    const step1 = await canvas.findByTestId('tutorial-step-1');
    expect(step1).toBeInTheDocument();
  }, { timeout: 3000 });
}
```

#### 3. Complete Tutorial Test
```typescript
play: async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);

  await canvas.findByTestId('tutorial-overlay');

  // Navigate to last step
  for (let i = 0; i < steps.length - 1; i++) {
    const nextButton = await canvas.findByTestId('tutorial-next-button');
    await userEvent.click(nextButton);

    await waitFor(async () => {
      const currentStep = await canvas.findByTestId(`tutorial-step-${i + 1}`);
      expect(currentStep).toBeInTheDocument();
    });
  }

  // Click finish on last step
  const finishButton = await canvas.findByTestId('tutorial-next-button');
  expect(finishButton).toHaveTextContent(/Complete|Finish/);
  await userEvent.click(finishButton);

  // Verify onComplete callback
  expect(args.onComplete).toHaveBeenCalled();
}
```

#### 4. Skip Tutorial Test
```typescript
play: async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);

  await canvas.findByTestId('tutorial-overlay');

  // Click close button (only if allowSkip=true)
  const closeButton = await canvas.findByTestId('tutorial-close-button');
  await userEvent.click(closeButton);

  // Verify skip callback
  expect(args.onSkip).toHaveBeenCalled();
}
```

#### 5. Highlight/Spotlight Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Wait for overlay
  await canvas.findByTestId('tutorial-overlay');

  // Verify highlight is shown (for spotlight/highlight variants)
  await waitFor(async () => {
    const highlight = await canvas.findByTestId('tutorial-highlight');
    expect(highlight).toBeInTheDocument();
  }, { timeout: 3000 });
}
```

#### 6. Progress Indicator Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await canvas.findByTestId('tutorial-overlay');

  // Get all indicators
  const indicators = await canvas.findAllByTestId(/tutorial-indicator-/);
  expect(indicators).toHaveLength(steps.length);

  // Navigate through steps and verify indicator updates
  for (let i = 0; i < steps.length - 1; i++) {
    const nextButton = await canvas.findByTestId('tutorial-next-button');
    await userEvent.click(nextButton);

    await waitFor(async () => {
      const currentStepIndicator = await canvas.findByTestId(`tutorial-indicator-${i + 1}`);
      expect(currentStepIndicator).toBeInTheDocument();
    });
  }
}
```

### Troubleshooting

#### Issue: "Unable to find element with testId tutorial-close-button"

**Solution:** Close button only appears when `allowSkip` prop is true:
```typescript
// Wrong - will fail if allowSkip=false
const closeButton = await canvas.findByTestId('tutorial-close-button');

// Correct - check prop first
if (args.allowSkip) {
  const closeButton = await canvas.findByTestId('tutorial-close-button');
  expect(closeButton).toBeInTheDocument();
}
```

#### Issue: "Unable to find element with testId tutorial-highlight"

**Solution:** Highlight only appears with spotlight/highlight variants:
```typescript
// Only query highlight for these variants
if (variant === 'spotlight' || variant === 'highlight') {
  const highlight = await canvas.findByTestId('tutorial-highlight');
  expect(highlight).toBeInTheDocument();
}
```

#### Issue: Test fails intermittently with animations

**Solution:** Use `waitFor` with proper timeout:
```typescript
await waitFor(async () => {
  const step = await canvas.findByTestId('tutorial-step-1');
  expect(step).toBeInTheDocument();
}, { timeout: 3000 });
```

#### Issue: "Unable to find element with testId tutorial-prev-button"

**Solution:** Previous button only appears after first step when steps.length > 1:
```typescript
// Previous button only exists when currentStep > 0 and steps.length > 1
if (currentStep > 0 && steps.length > 1) {
  const prevButton = await canvas.findByTestId('tutorial-prev-button');
  expect(prevButton).toBeInTheDocument();
}
```

#### Issue: Step number doesn't update after clicking next

**Solution:** Wait for new step to render:
```typescript
const nextButton = await canvas.findByTestId('tutorial-next-button');
await userEvent.click(nextButton);

// Wait for new step with timeout
await waitFor(async () => {
  const newStep = await canvas.findByTestId(`tutorial-step-${currentStep + 1}`);
  expect(newStep).toBeInTheDocument();
}, { timeout: 3000 });
```

### Testing Best Practices

1. **Always use async/await** with testId queries in Storybook tests
2. **Use `waitFor`** when testing components with animations or transitions
3. **Scope queries** with `within()` when looking inside specific containers
4. **Use regex patterns** for dynamic testIds: `/tutorial-step-/` or `/tutorial-indicator-/`
5. **Add timeouts** for slow-rendering components: `{ timeout: 3000 }`
6. **Check conditional rendering** - some elements only appear with specific props (allowSkip, variant)
7. **Test step transitions** - always wait for new step to render after navigation

### Accessibility Testing

The component includes proper ARIA attributes for accessibility:
- `role="dialog"` on the step container
- `aria-labelledby` pointing to the step title
- `aria-describedby` pointing to the step content

These can be used in tests as alternative query methods:
```typescript
const dialog = await canvas.findByRole('dialog');
expect(dialog).toHaveAccessibleName(expectedTitle);
expect(dialog).toHaveAccessibleDescription(expectedContent);
```
