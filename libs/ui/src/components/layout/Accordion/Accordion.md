# Accordion Component

A customizable collapsible panel component for organizing and displaying content in a space-efficient manner.

## Overview

The Accordion component provides expandable/collapsible content sections with smooth animations and flexible styling options. It supports single or multiple panel expansion, keyboard navigation, and comprehensive accessibility features.

## Props

### Accordion Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | - | The content of the accordion (AccordionSummary and AccordionDetails) |
| `defaultExpanded` | boolean | false | If true, the accordion is expanded by default |
| `disabled` | boolean | false | If true, the accordion is disabled |
| `expanded` | boolean | - | If true, the accordion is expanded (controlled) |
| `onChange` | function | - | Callback fired when the accordion state changes |
| `variant` | 'default' \| 'glass' \| 'bordered' \| 'separated' | 'default' | Visual style variant |
| `TransitionComponent` | elementType | Collapse | The component used for the collapse transition |
| `TransitionProps` | object | - | Props applied to the transition element |

### AccordionSummary Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | - | The content of the accordion summary |
| `expandIcon` | ReactNode | - | The icon to display as the expand indicator |
| `focusVisibleClassName` | string | - | Class applied when the summary is keyboard focused |
| `onClick` | function | - | Callback fired when the summary is clicked |

### AccordionDetails Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | - | The content of the accordion details |
| `sx` | object | - | System sx prop for custom styling |

### AccordionActions Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | - | Action buttons for the accordion |
| `disableSpacing` | boolean | false | If true, removes additional spacing between actions |

## Usage

### Basic Usage

```tsx
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

function BasicAccordion() {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>Accordion Title</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Accordion content goes here.
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}
```

### Controlled Accordion

```tsx
function ControlledAccordion() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (event, isExpanded) => {
    setExpanded(isExpanded);
  };

  return (
    <Accordion expanded={expanded} onChange={handleChange}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>Controlled Accordion</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>This accordion's state is controlled.</Typography>
      </AccordionDetails>
    </Accordion>
  );
}
```

### Multiple Accordions with Exclusive Expansion

```tsx
function ExclusiveAccordions() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Panel 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Content for panel 1</Typography>
        </AccordionDetails>
      </Accordion>
      
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Panel 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Content for panel 2</Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
```

### With Actions

```tsx
function AccordionWithActions() {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>Settings</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>Configure your settings here.</Typography>
      </AccordionDetails>
      <AccordionActions>
        <Button>Cancel</Button>
        <Button variant="contained">Save</Button>
      </AccordionActions>
    </Accordion>
  );
}
```

## Variants

### Default
Standard Material-UI accordion styling.

### Glass
Features a frosted glass effect with backdrop blur and transparency.

### Bordered
Clean borders with rounded corners.

### Separated
Elevated shadows with spacing between items.

## Accessibility

- **ARIA Attributes**: Proper `aria-expanded`, `aria-controls`, and `aria-labelledby` attributes
- **Keyboard Navigation**: 
  - `Tab` - Navigate between accordion headers
  - `Enter` or `Space` - Expand/collapse focused accordion
  - `Arrow Keys` - Navigate between accordion items when focused
- **Screen Reader Support**: Announces expansion state changes
- **Focus Management**: Maintains proper focus flow and visual focus indicators

## Best Practices

1. **Use clear, descriptive headers** that indicate the content within each section
2. **Keep content concise** to maintain a good user experience
3. **Consider default expanded state** for important content that users should see immediately
4. **Group related content** in the same accordion panel
5. **Provide visual feedback** for hover and focus states
6. **Test with keyboard navigation** to ensure accessibility

## Performance Considerations

- Use `React.memo` for expensive child components to prevent unnecessary re-renders
- Consider lazy loading content for accordions with heavy content
- Limit the number of accordions on a single page for better performance
- Use the `TransitionProps` to customize animation duration for better perceived performance

## Testing

### Test IDs

This document describes all `data-testid` attributes available in the Accordion component for testing purposes.

#### Container Elements

##### `accordion` (customizable)
- **Element:** Main Accordion container
- **Location:** Root MuiAccordion element
- **Usage:** Query the main accordion to verify it's rendered
- **Note:** This is the default value, but can be overridden via the `data-testid` prop
```typescript
const accordion = await canvas.findByTestId('accordion');
expect(accordion).toBeInTheDocument();
```

#### Header/Summary Elements

##### `accordion-summary` (customizable)
- **Element:** Accordion header/summary that users click to expand/collapse
- **Location:** AccordionSummary component
- **Usage:** Query the clickable header element
- **Note:** This is the default value, but can be overridden via the `data-testid` prop
```typescript
const summary = await canvas.findByTestId('accordion-summary');
await userEvent.click(summary);
```

##### `accordion-icon`
- **Element:** Expand/collapse icon (typically ExpandMore icon)
- **Location:** Icon element passed to AccordionSummary via `expandIcon` prop
- **Usage:** Query to verify the expand/collapse icon is rendered
- **Note:** Automatically added to any valid React element passed as `expandIcon`
```typescript
const icon = await canvas.findByTestId('accordion-icon');
expect(icon).toBeInTheDocument();
```

#### Content Elements

##### `accordion-details` (customizable)
- **Element:** Accordion content panel that expands/collapses
- **Location:** AccordionDetails component
- **Usage:** Query the content area of the accordion
- **Note:** This is the default value, but can be overridden via the `data-testid` prop
```typescript
const details = await canvas.findByTestId('accordion-details');
expect(details).toBeInTheDocument();
```

##### `accordion-actions` (customizable)
- **Element:** Optional actions footer (buttons, links, etc.)
- **Location:** AccordionActions component
- **Usage:** Query the actions area at the bottom of the accordion
- **Note:** This is the default value, but can be overridden via the `data-testid` prop
```typescript
const actions = await canvas.findByTestId('accordion-actions');
const buttons = within(actions).getAllByRole('button');
expect(buttons).toHaveLength(2);
```

### Test Patterns

#### Wait for Accordion to Render
```typescript
import { waitFor, within } from 'storybook/test';

// Wait for accordion
const accordion = await canvas.findByTestId('accordion');

// Wait for summary to be interactive
await waitFor(async () => {
  const summary = await canvas.findByTestId('accordion-summary');
  expect(summary).toBeEnabled();
}, { timeout: 3000 });
```

#### Test Expand/Collapse Interaction
```typescript
// Get summary element
const summary = await canvas.findByTestId('accordion-summary');

// Verify it's collapsed initially
const accordion = await canvas.findByTestId('accordion');
expect(accordion).not.toHaveClass('Mui-expanded');

// Click to expand
await userEvent.click(summary);

// Wait for expansion
await waitFor(() => {
  expect(accordion).toHaveClass('Mui-expanded');
}, { timeout: 1000 });

// Verify content is visible
const details = await canvas.findByTestId('accordion-details');
expect(details).toBeVisible();
```

#### Test Icon Rotation
```typescript
const icon = await canvas.findByTestId('accordion-icon');
const summary = await canvas.findByTestId('accordion-summary');

// Get icon wrapper element
const iconWrapper = icon.closest('.MuiAccordionSummary-expandIconWrapper');

// Check initial state (not rotated)
expect(iconWrapper).not.toHaveClass('Mui-expanded');

// Expand accordion
await userEvent.click(summary);

// Verify icon rotated
await waitFor(() => {
  expect(iconWrapper).toHaveClass('Mui-expanded');
});
```

#### Test Multiple Accordions
```typescript
// When using custom testIds in a list
const accordions = [
  { testId: 'accordion-settings', label: 'Settings' },
  { testId: 'accordion-security', label: 'Security' },
  { testId: 'accordion-notifications', label: 'Notifications' },
];

for (const { testId, label } of accordions) {
  const accordion = await canvas.findByTestId(testId);
  expect(accordion).toBeInTheDocument();

  // Verify label is present
  const text = await within(accordion).findByText(label);
  expect(text).toBeInTheDocument();
}
```

#### Test Controlled Accordion Behavior
```typescript
// Expand first accordion
const summary1 = await canvas.findByTestId('accordion-1-summary');
await userEvent.click(summary1);

// Verify first is expanded
const accordion1 = await canvas.findByTestId('accordion-1');
expect(accordion1).toHaveClass('Mui-expanded');

// Expand second accordion (controlled - first should close)
const summary2 = await canvas.findByTestId('accordion-2-summary');
await userEvent.click(summary2);

// Wait for state change
await waitFor(() => {
  expect(accordion1).not.toHaveClass('Mui-expanded');
  const accordion2 = canvas.getByTestId('accordion-2');
  expect(accordion2).toHaveClass('Mui-expanded');
});
```

#### Test Accordion Actions
```typescript
const actions = await canvas.findByTestId('accordion-actions');

// Find buttons within actions
const buttons = within(actions).getAllByRole('button');
expect(buttons).toHaveLength(2);

// Test button interactions
const saveButton = within(actions).getByText('Save');
await userEvent.click(saveButton);

// Verify callback was called
expect(args.onSave).toHaveBeenCalled();
```

### Props That Affect Test Behavior

#### `variant`
- **Values:** `'default' | 'glass' | 'bordered' | 'separated'`
- **Impact:**
  - `default`: Standard Material-UI styling
  - `glass`: Frosted glass effect with backdrop blur
  - `bordered`: Clean borders with rounded corners
  - `separated`: Elevated shadows with spacing between items

#### `disabled`
- **Values:** `boolean`
- **Impact:** Disables interaction with the accordion
- **Test Tip:** Use `toBeDisabled()` matcher
```typescript
const accordion = await canvas.findByTestId('accordion');
expect(accordion).toBeDisabled();
```

#### `defaultExpanded`
- **Values:** `boolean`
- **Impact:** Sets initial expanded state (uncontrolled)
- **Test Tip:** Check for `Mui-expanded` class on mount

#### `expanded`
- **Values:** `boolean | undefined`
- **Impact:** Controls expanded state (controlled mode)
- **Test Tip:** Accordion only changes when this prop changes

#### `onChange`
- **Values:** `(event: React.SyntheticEvent, expanded: boolean) => void`
- **Impact:** Callback fired when accordion state changes
- **Test Tip:** Use to create controlled accordion behavior

### Common Test Scenarios

#### 1. Basic Rendering Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Wait for accordion to render
  const accordion = await canvas.findByTestId('accordion');
  expect(accordion).toBeInTheDocument();

  // Verify summary is present
  const summary = await canvas.findByTestId('accordion-summary');
  expect(summary).toBeInTheDocument();
}
```

#### 2. Expansion Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Get elements
  const summary = await canvas.findByTestId('accordion-summary');
  const accordion = await canvas.findByTestId('accordion');

  // Initially collapsed
  expect(accordion).not.toHaveClass('Mui-expanded');

  // Click to expand
  await userEvent.click(summary);

  // Wait for expansion
  await waitFor(() => {
    expect(accordion).toHaveClass('Mui-expanded');
  });

  // Content should be visible
  const details = await canvas.findByTestId('accordion-details');
  expect(details).toBeVisible();
}
```

#### 3. Icon Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Verify icon is present
  const icon = await canvas.findByTestId('accordion-icon');
  expect(icon).toBeInTheDocument();

  // Get icon wrapper
  const wrapper = icon.closest('.MuiAccordionSummary-expandIconWrapper');
  expect(wrapper).toBeInTheDocument();
}
```

#### 4. Actions Test
```typescript
play: async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);

  // Expand accordion first
  const summary = await canvas.findByTestId('accordion-summary');
  await userEvent.click(summary);

  // Wait for actions to be visible
  const actions = await canvas.findByTestId('accordion-actions');
  expect(actions).toBeVisible();

  // Test action buttons
  const saveButton = within(actions).getByText('Save');
  await userEvent.click(saveButton);
}
```

#### 5. Disabled State Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Get disabled accordion
  const accordion = await canvas.findByTestId('accordion');
  expect(accordion).toHaveClass('Mui-disabled');

  // Summary should not be clickable
  const summary = await canvas.findByTestId('accordion-summary');

  // Attempt to click (should not expand)
  await userEvent.click(summary);

  // Verify still collapsed
  expect(accordion).not.toHaveClass('Mui-expanded');
}
```

#### 6. Variant Styling Test
```typescript
play: async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);

  const accordion = await canvas.findByTestId('accordion');
  const style = window.getComputedStyle(accordion);

  // Test based on variant
  if (args.variant === 'glass') {
    expect(style.backdropFilter).toContain('blur');
  } else if (args.variant === 'bordered') {
    expect(style.border).not.toBe('none');
  } else if (args.variant === 'separated') {
    expect(style.boxShadow).not.toBe('none');
  }
}
```

#### 7. Keyboard Navigation Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const summary = await canvas.findByTestId('accordion-summary');

  // Focus the summary
  summary.focus();
  expect(summary).toHaveFocus();

  // Press Enter to expand
  await userEvent.keyboard('{Enter}');

  // Wait for expansion
  const accordion = await canvas.findByTestId('accordion');
  await waitFor(() => {
    expect(accordion).toHaveClass('Mui-expanded');
  });

  // Press Space to collapse
  await userEvent.keyboard(' ');

  // Wait for collapse
  await waitFor(() => {
    expect(accordion).not.toHaveClass('Mui-expanded');
  });
}
```

#### 8. Multiple Accordions Group Test
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Define accordion identifiers
  const accordionIds = ['settings', 'security', 'notifications'];

  // Test each accordion
  for (const id of accordionIds) {
    const summary = await canvas.findByTestId(`accordion-${id}-summary`);
    const accordion = await canvas.findByTestId(`accordion-${id}`);

    // Expand
    await userEvent.click(summary);

    // Verify expanded
    await waitFor(() => {
      expect(accordion).toHaveClass('Mui-expanded');
    });

    // Collapse
    await userEvent.click(summary);

    // Verify collapsed
    await waitFor(() => {
      expect(accordion).not.toHaveClass('Mui-expanded');
    });
  }
}
```

### Customizing Test IDs

All testIds can be customized via props:

```typescript
<Accordion data-testid="custom-accordion">
  <AccordionSummary
    data-testid="custom-summary"
    expandIcon={<ExpandMore />}
  >
    <Typography>Title</Typography>
  </AccordionSummary>
  <AccordionDetails data-testid="custom-details">
    <Typography>Content</Typography>
  </AccordionDetails>
  <AccordionActions data-testid="custom-actions">
    <Button>Save</Button>
  </AccordionActions>
</Accordion>
```

#### Testing with Custom IDs
```typescript
const accordion = await canvas.findByTestId('custom-accordion');
const summary = await canvas.findByTestId('custom-summary');
const details = await canvas.findByTestId('custom-details');
const actions = await canvas.findByTestId('custom-actions');
```

#### Dynamic Test IDs for Lists
```typescript
// When rendering multiple accordions
{items.map((item, index) => (
  <Accordion key={item.id} data-testid={`accordion-${index}`}>
    <AccordionSummary data-testid={`accordion-summary-${index}`}>
      <Typography>{item.title}</Typography>
    </AccordionSummary>
    <AccordionDetails data-testid={`accordion-details-${index}`}>
      <Typography>{item.content}</Typography>
    </AccordionDetails>
  </Accordion>
))}

// Testing
const firstAccordion = await canvas.findByTestId('accordion-0');
const firstSummary = await canvas.findByTestId('accordion-summary-0');
```

### Troubleshooting

#### Issue: "Unable to find element with testId X"

**Solution:** Always use `await` with `findByTestId`:
```typescript
// Wrong - synchronous
const element = canvas.getByTestId('accordion');

// Correct - asynchronous
const element = await canvas.findByTestId('accordion');
```

#### Issue: Test fails when checking if accordion is expanded

**Solution:** Use `waitFor` to handle animation timing:
```typescript
await userEvent.click(summary);

// Wrong - may fail due to animation
expect(accordion).toHaveClass('Mui-expanded');

// Correct - waits for animation
await waitFor(() => {
  expect(accordion).toHaveClass('Mui-expanded');
}, { timeout: 1000 });
```

#### Issue: Can't click accordion summary

**Solution:** Ensure accordion is not disabled and element is in viewport:
```typescript
const summary = await canvas.findByTestId('accordion-summary');

// Check if enabled
expect(summary).toBeEnabled();

// Scroll into view if needed
summary.scrollIntoView();

// Then click
await userEvent.click(summary);
```

#### Issue: Content not visible after expanding

**Solution:** Wait for the content to become visible:
```typescript
await userEvent.click(summary);

const details = await canvas.findByTestId('accordion-details');

await waitFor(() => {
  expect(details).toBeVisible();
}, { timeout: 1000 });
```

#### Issue: Icon testId not found

**Solution:** The icon testId is only added if a valid React element is passed as `expandIcon`:
```typescript
// Will have testId
<AccordionSummary expandIcon={<ExpandMore />}>

// Won't have testId (null/undefined)
<AccordionSummary expandIcon={null}>

// Test with conditional check
const icon = canvas.queryByTestId('accordion-icon');
if (icon) {
  expect(icon).toBeInTheDocument();
}
```

### Best Practices

1. **Always use async/await** with testId queries in Storybook tests
2. **Use `waitFor`** when testing expand/collapse animations
3. **Scope queries** with `within()` when looking inside specific components
4. **Use custom testIds** for multiple accordions to avoid conflicts
5. **Add timeouts** for animation-heavy tests: `{ timeout: 1000 }`
6. **Test keyboard navigation** in addition to mouse clicks
7. **Check both expanded and collapsed states** in tests

### Related Components

- **MuiAccordion:** The base Material-UI accordion component
- **MuiAccordionSummary:** Clickable header with expand icon
- **MuiAccordionDetails:** Expandable content area
- **MuiAccordionActions:** Optional footer with action buttons

### Change Log

- **2025-10-08:** Initial testId implementation
  - Added `accordion` (customizable via prop, default: 'accordion')
  - Added `accordion-summary` (customizable via prop, default: 'accordion-summary')
  - Added `accordion-icon` (automatically added to expandIcon)
  - Added `accordion-details` (customizable via prop, default: 'accordion-details')
  - Added `accordion-actions` (customizable via prop, default: 'accordion-actions')