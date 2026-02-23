# Stepper Component

**Purpose:** Visual step progress for multi-step flows (linear or non-linear), with vertical/horizontal orientations.

```ts
interface Step {
  id: string;
  label: string;
  description?: string;
  optional?: boolean;
  disabled?: boolean;
}

interface StepperProps {
  steps: Step[];
  activeId: string; // current step id
  completed?: Set<string>; // completed step ids
  orientation?: 'horizontal' | 'vertical';
  variant?: 'linear' | 'non-linear';
  onStepChange?: (id: string) => void; // click/keyboard nav
  clickable?: boolean; // allow jumping (non-linear)
  renderConnector?: (
    from: Step,
    to: Step,
    state: { completed: boolean; active: boolean },
  ) => React.ReactNode;
  className?: string;
}
```

**Features**

- Numbered dots or checkmarks; connectors showing progress.
- Optional descriptions and “optional” flag per step.
- Linear mode restricts forward navigation until prior steps complete.

**A11y**

- Render as an ordered list `<ol>`; set `aria-current="step"` on active.
- If steps are interactive, each step is a `<button>` or link within the list item.

**Stories / Tests**

- Horizontal/Vertical; Linear vs Non-linear (clickable); With optional steps; Disabled steps; Keyboard nav.

## Testing

### Test IDs

#### Container Elements

##### `stepper-container`
- **Element:** Main Stepper container
- **Location:** Root ordered list element that wraps all stepper items
- **Usage:** Query the main container to verify Stepper is rendered
```typescript
const container = await canvas.findByTestId('stepper-container');
expect(container).toBeInTheDocument();
```

##### `stepper-step-${index}`
- **Element:** Individual stepper step container
- **Location:** Each step's container (one per step item)
- **Index:** Zero-based index (0, 1, 2, ...)
- **Usage:** Query specific step by index
```typescript
// Get first step
const firstStep = await canvas.findByTestId('stepper-step-0');
expect(firstStep).toBeInTheDocument();

// Get all steps
const allSteps = await canvas.findAllByTestId(/stepper-step-\d+/);
expect(allSteps).toHaveLength(expectedCount);
```

#### Step Content Elements

##### `stepper-step-content-${index}`
- **Element:** Step content wrapper containing icon and label
- **Location:** Box wrapping the icon and label for each step
- **Index:** Zero-based index matching parent step
- **Usage:** Query step content area
```typescript
const stepContent = await canvas.findByTestId('stepper-step-content-0');
expect(stepContent).toBeInTheDocument();
```

##### `stepper-step-icon-${index}`
- **Element:** Step icon/number button
- **Location:** The circular button displaying step number or checkmark
- **Index:** Zero-based index matching parent step
- **Usage:** Query step icons, verify completion status
```typescript
const stepIcon = await canvas.findByTestId('stepper-step-icon-0');
expect(stepIcon).toBeInTheDocument();

// Check if step is completed (has checkmark)
const checkIcon = within(stepIcon).queryByTestId('CheckCircleIcon');
expect(checkIcon).toBeInTheDocument();
```

##### `stepper-step-label-${index}`
- **Element:** Step label text container
- **Location:** Box containing step title and optional description
- **Index:** Zero-based index matching parent step
- **Usage:** Query step labels, verify text content
```typescript
const stepLabel = await canvas.findByTestId('stepper-step-label-0');
expect(stepLabel).toHaveTextContent('Personal Information');
```

##### `stepper-connector-${index}`
- **Element:** Connector line between steps
- **Location:** Line connecting current step to next step
- **Index:** Zero-based index of the step BEFORE the connector
- **Usage:** Query connectors, verify completion state
```typescript
// Get connector after first step
const connector = await canvas.findByTestId('stepper-connector-0');
expect(connector).toBeInTheDocument();

// Note: Last step has no connector
const allConnectors = await canvas.findAllByTestId(/stepper-connector-\d+/);
expect(allConnectors).toHaveLength(steps.length - 1);
```

#### State Indicator Classes

##### `stepper-step-active`
- **Element:** CSS class added to active step
- **Location:** Applied to step container (`stepper-step-${index}`)
- **Usage:** Identify which step is currently active
```typescript
const activeStep = canvasElement.querySelector('.stepper-step-active');
expect(activeStep).toBeInTheDocument();
expect(activeStep).toHaveAttribute('data-testid', 'stepper-step-1');
```

##### `stepper-step-completed`
- **Element:** CSS class added to completed steps
- **Location:** Applied to step container (`stepper-step-${index}`)
- **Usage:** Identify which steps are completed
```typescript
const completedSteps = canvasElement.querySelectorAll('.stepper-step-completed');
expect(completedSteps).toHaveLength(expectedCompletedCount);
```

##### `stepper-step-optional`
- **Element:** CSS class added to optional steps
- **Location:** Applied to step container (`stepper-step-${index}`)
- **Usage:** Identify optional steps
```typescript
const optionalSteps = canvasElement.querySelectorAll('.stepper-step-optional');
expect(optionalSteps).toHaveLength(expectedOptionalCount);
```

### Test Patterns

#### Wait for Stepper to Render
```typescript
import { waitFor, within } from 'storybook/test';

// Wait for container
const container = await canvas.findByTestId('stepper-container');

// Wait for all steps to render
await waitFor(async () => {
  const steps = await canvas.findAllByTestId(/stepper-step-\d+/);
  expect(steps).toHaveLength(expectedStepCount);
}, { timeout: 3000 });
```

#### Verify Step States
```typescript
// Get all steps
const steps = await canvas.findAllByTestId(/stepper-step-\d+/);

// Check active step
const activeStep = steps.find(step => step.classList.contains('stepper-step-active'));
expect(activeStep).toBeDefined();

// Check completed steps
const completedSteps = steps.filter(step => step.classList.contains('stepper-step-completed'));
expect(completedSteps).toHaveLength(expectedCompletedCount);

// Check optional steps
const optionalSteps = steps.filter(step => step.classList.contains('stepper-step-optional'));
expect(optionalSteps).toHaveLength(expectedOptionalCount);
```

#### Test Step Icons
```typescript
// Get all step icons
const icons = await canvas.findAllByTestId(/stepper-step-icon-\d+/);

for (let i = 0; i < icons.length; i++) {
  const icon = icons[i];

  // Check if completed (has checkmark)
  const checkIcon = within(icon).queryByTestId('CheckCircleIcon');

  if (completedStepIds.includes(steps[i].id)) {
    expect(checkIcon).toBeInTheDocument();
  } else {
    // Should show number
    expect(icon).toHaveTextContent(String(i + 1));
  }
}
```

#### Test Connectors
```typescript
// Verify connector count (always steps.length - 1)
const connectors = await canvas.findAllByTestId(/stepper-connector-\d+/);
expect(connectors).toHaveLength(steps.length - 1);

// Check connector completion state
for (let i = 0; i < connectors.length; i++) {
  const connector = connectors[i];
  const step = steps[i];

  // If step is completed, connector should have completed style
  if (completedStepIds.includes(step.id)) {
    const style = window.getComputedStyle(connector);
    expect(style.backgroundColor).toContain('primary.main');
  }
}
```

#### Check Horizontal vs Vertical Orientation
```typescript
const container = await canvas.findByTestId('stepper-container');
const style = window.getComputedStyle(container);

// Verify orientation
if (orientation === 'horizontal') {
  expect(style.flexDirection).toBe('row');
} else {
  expect(style.flexDirection).toBe('column');
}
```

#### Test Step Navigation (Clickable)
```typescript
// Get all step icons (buttons)
const stepIcons = await canvas.findAllByTestId(/stepper-step-icon-\d+/);

// Click on step 2
await userEvent.click(stepIcons[1]);

// Verify callback was called
expect(args.onStepChange).toHaveBeenCalledWith(steps[1].id);

// Verify active state changed
await waitFor(() => {
  const activeStep = canvasElement.querySelector('.stepper-step-active');
  expect(activeStep).toHaveAttribute('data-testid', 'stepper-step-1');
});
```

### Props That Affect Test Behavior

#### `variant`
- **Values:** `'linear' | 'non-linear'`
- **Impact:**
  - `linear`: Only forward navigation allowed
  - `non-linear`: Can jump to any step
- **Test Tip:** Test clicking behavior differs based on variant

#### `orientation`
- **Values:** `'horizontal' | 'vertical'`
- **Impact:** Changes container and step layout direction
- **Test Tip:** Verify `flexDirection` in computed styles

#### `clickable`
- **Values:** `boolean`
- **Impact:** Enables/disables step clicking
- **Default:** `true` for non-linear, `false` for linear
- **Test Tip:** Verify pointer events and cursor styles

#### `completed`
- **Values:** `Set<string>` of step IDs
- **Impact:** Determines which steps show checkmark and completion styling
- **Test Tip:** Use `.stepper-step-completed` class to verify

#### `activeId`
- **Values:** `string` (step ID)
- **Impact:** Determines which step is currently active
- **Test Tip:** Use `.stepper-step-active` class to verify

### Common Test Scenarios

#### 1. Basic Rendering Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Wait for stepper to render
  const container = await canvas.findByTestId('stepper-container');
  expect(container).toBeInTheDocument();

  // Verify correct number of steps
  const steps = await canvas.findAllByTestId(/stepper-step-\d+/);
  expect(steps).toHaveLength(expectedCount);

  // Verify connectors (always n-1)
  const connectors = await canvas.findAllByTestId(/stepper-connector-\d+/);
  expect(connectors).toHaveLength(expectedCount - 1);
}
```

#### 2. Active Step Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Wait for container
  await canvas.findByTestId('stepper-container');

  // Find active step
  const activeStep = canvasElement.querySelector('.stepper-step-active');
  expect(activeStep).toBeDefined();

  // Verify it's the correct step
  const activeStepId = args.activeId;
  const expectedIndex = steps.findIndex(s => s.id === activeStepId);
  expect(activeStep).toHaveAttribute('data-testid', `stepper-step-${expectedIndex}`);
}
```

#### 3. Completion State Test
```typescript
play: async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);

  // Wait for container
  await canvas.findByTestId('stepper-container');

  // Get completed steps
  const completedSteps = canvasElement.querySelectorAll('.stepper-step-completed');
  expect(completedSteps).toHaveLength(args.completed.size);

  // Verify each completed step has checkmark
  for (const step of completedSteps) {
    const testId = step.getAttribute('data-testid');
    const index = testId?.match(/stepper-step-(\d+)/)?.[1];
    const icon = await canvas.findByTestId(`stepper-step-icon-${index}`);

    // Should contain CheckCircle icon
    const checkIcon = within(icon).queryByTestId('CheckCircleIcon');
    expect(checkIcon).toBeInTheDocument();
  }
}
```

#### 4. Optional Steps Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Wait for container
  await canvas.findByTestId('stepper-container');

  // Get optional steps
  const optionalSteps = canvasElement.querySelectorAll('.stepper-step-optional');

  // Verify each shows "(optional)" text
  for (const step of optionalSteps) {
    const testId = step.getAttribute('data-testid');
    const index = testId?.match(/stepper-step-(\d+)/)?.[1];
    const label = await canvas.findByTestId(`stepper-step-label-${index}`);

    expect(label).toHaveTextContent('(optional)');
  }
}
```

#### 5. Navigation Test (Non-Linear)
```typescript
play: async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);

  // Wait for container
  await canvas.findByTestId('stepper-container');

  // Get step icons
  const icons = await canvas.findAllByTestId(/stepper-step-icon-\d+/);

  // Click on third step
  await userEvent.click(icons[2]);

  // Verify callback
  expect(args.onStepChange).toHaveBeenCalledWith(steps[2].id);

  // Wait for active state to update
  await waitFor(() => {
    const activeStep = canvasElement.querySelector('.stepper-step-active');
    expect(activeStep).toHaveAttribute('data-testid', 'stepper-step-2');
  }, { timeout: 1000 });
}
```

#### 6. Disabled Step Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Wait for container
  await canvas.findByTestId('stepper-container');

  // Find disabled step
  const disabledStepIndex = steps.findIndex(s => s.disabled);
  const icon = await canvas.findByTestId(`stepper-step-icon-${disabledStepIndex}`);

  // Should be disabled
  expect(icon).toBeDisabled();

  // Click should not work
  await userEvent.click(icon);
  expect(args.onStepChange).not.toHaveBeenCalled();
}
```

#### 7. Orientation Test
```typescript
play: async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);

  const container = await canvas.findByTestId('stepper-container');
  const style = window.getComputedStyle(container);

  if (args.orientation === 'horizontal') {
    expect(style.flexDirection).toBe('row');
  } else {
    expect(style.flexDirection).toBe('column');
  }
}
```

#### 8. Custom Connector Test
```typescript
play: async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);

  // Wait for container
  await canvas.findByTestId('stepper-container');

  if (args.renderConnector) {
    // Custom connectors won't have testId
    // Verify default connectors are not present
    const defaultConnectors = canvas.queryAllByTestId(/stepper-connector-\d+/);
    expect(defaultConnectors).toHaveLength(0);
  } else {
    // Should have default connectors
    const connectors = await canvas.findAllByTestId(/stepper-connector-\d+/);
    expect(connectors).toHaveLength(steps.length - 1);
  }
}
```

### Troubleshooting

#### Issue: "Unable to find element with testId X"

**Solution:** Always use `await` with `findByTestId`:
```typescript
// Wrong - synchronous
const element = canvas.getByTestId('stepper-container');

// Correct - asynchronous
const element = await canvas.findByTestId('stepper-container');
```

#### Issue: Wrong number of connectors

**Solution:** Remember connectors = steps - 1 (no connector after last step):
```typescript
const connectors = await canvas.findAllByTestId(/stepper-connector-\d+/);
expect(connectors).toHaveLength(steps.length - 1); // Not steps.length
```

#### Issue: Can't find active/completed step by class

**Solution:** Use vanilla DOM query, not Testing Library for class queries:
```typescript
// Wrong - Testing Library doesn't have good class support
const activeStep = canvas.getByClassName('stepper-step-active');

// Correct - use vanilla querySelector
const activeStep = canvasElement.querySelector('.stepper-step-active');
```

#### Issue: Custom connector not found

**Solution:** Custom connectors bypass default connectors, won't have testIds:
```typescript
if (args.renderConnector) {
  // Don't look for default testIds
  // Inspect custom rendered content instead
  const customElements = canvasElement.querySelectorAll('[role="connector"]');
  expect(customElements).toHaveLength(steps.length - 1);
}
```

#### Issue: Test fails when checking icon content

**Solution:** Completed steps show CheckCircle, others show number:
```typescript
const icon = await canvas.findByTestId('stepper-step-icon-0');

if (isCompleted) {
  // Look for MUI icon
  const checkIcon = within(icon).queryByTestId('CheckCircleIcon');
  expect(checkIcon).toBeInTheDocument();
} else {
  // Look for number text
  expect(icon).toHaveTextContent('1'); // index + 1
}
```

### Best Practices

1. **Always use async/await** with testId queries in Storybook tests
2. **Use regex patterns** for multiple steps: `/stepper-step-\d+/`
3. **Remember connector count** is always `steps.length - 1`
4. **Scope queries** with `within()` when looking inside step containers
5. **Use vanilla DOM** for class-based queries (`.stepper-step-active`)
6. **Check both icon types**: CheckCircle for completed, number for others
7. **Test clickable behavior**: Verify based on `variant` and `clickable` props

### Index Reference

All index-based testIds use **zero-based indexing**:
- Step 1 (first) → `stepper-step-0`
- Step 2 (second) → `stepper-step-1`
- Step 3 (third) → `stepper-step-2`
- etc.

Same for all child elements:
- `stepper-step-icon-0`, `stepper-step-icon-1`, ...
- `stepper-step-label-0`, `stepper-step-label-1`, ...
- `stepper-connector-0`, `stepper-connector-1`, ... (no connector for last step)
