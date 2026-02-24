# WorkflowStep Component

## Overview

The WorkflowStep component is an advanced workflow visualization component that displays multi-step processes with clear visual progression indicators. It provides flexible styling, interactive navigation, and comprehensive accessibility features for complex workflow management interfaces.

## Features

- **Multi-step Visualization**: Display workflow progression with clear step indicators
- **Interactive Navigation**: Allow users to click on steps to navigate (when enabled)
- **Multiple Orientations**: Support both horizontal and vertical layouts
- **Visual Variants**: Multiple styling options (default, minimal, outlined, filled)
- **Progress Indication**: Visual progress bar between steps
- **Accessibility**: Full keyboard navigation and screen reader support
- **Animation Support**: Smooth transitions between step states
- **Theming**: Comprehensive theme integration with multiple color options
- **Responsive Design**: Adapts to different screen sizes

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `WorkflowStepItem[]` | - | **Required.** Array of step objects with title, description, status, and optional icons |
| `currentStep` | `number` | `0` | Index of the currently active step |
| `variant` | `'default' \| 'minimal' \| 'outlined' \| 'filled'` | `'default'` | Visual style variant |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction |
| `color` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'neutral'` | `'primary'` | Theme color |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Step indicator size |
| `showProgress` | `boolean` | `true` | Whether to show progress bar between steps |
| `animated` | `boolean` | `true` | Enable transition animations |
| `interactive` | `boolean` | `false` | Allow clicking on steps to navigate |
| `showNumbers` | `boolean` | `true` | Show step numbers in indicators |
| `showIcons` | `boolean` | `false` | Show custom icons for each step |
| `completedIcon` | `React.ReactNode` | - | Custom icon for completed steps |
| `errorIcon` | `React.ReactNode` | - | Custom icon for error steps |
| `onStepClick` | `(stepIndex: number) => void` | - | Callback when a step is clicked |
| `disabled` | `boolean` | `false` | Disable all interactions |
| `className` | `string` | - | Additional CSS classes |
| `style` | `React.CSSProperties` | - | Inline styles |

## Step Item Interface

```typescript
interface WorkflowStepItem {
  title: string;
  description?: string;
  status: 'pending' | 'current' | 'completed' | 'error';
  icon?: React.ReactNode;
  disabled?: boolean;
}
```

## Usage Examples

### Basic Usage

```tsx
import { WorkflowStep } from '@procurement/ui';

const steps = [
  { title: 'Order Placed', description: 'Your order has been placed', status: 'completed' },
  { title: 'Processing', description: 'Order is being processed', status: 'current' },
  { title: 'Shipped', description: 'Order has been shipped', status: 'pending' },
  { title: 'Delivered', description: 'Order delivered', status: 'pending' }
];

function OrderTracking() {
  return (
    <WorkflowStep
      steps={steps}
      currentStep={1}
      showProgress
    />
  );
}
```

### Interactive Navigation

```tsx
import { WorkflowStep } from '@procurement/ui';

function InteractiveWorkflow() {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    { title: 'Personal Info', status: currentStep > 0 ? 'completed' : 'current' },
    { title: 'Address', status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'current' : 'pending' },
    { title: 'Payment', status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'current' : 'pending' },
    { title: 'Confirmation', status: currentStep === 3 ? 'current' : 'pending' }
  ];

  return (
    <WorkflowStep
      steps={steps}
      currentStep={currentStep}
      interactive
      onStepClick={setCurrentStep}
      variant="outlined"
      color="primary"
    />
  );
}
```

### Vertical Layout with Icons

```tsx
import { WorkflowStep } from '@procurement/ui';
import { PersonIcon, LocationIcon, CreditCardIcon, CheckIcon } from '@your/icons';

function VerticalWorkflow() {
  const steps = [
    { 
      title: 'Profile Setup', 
      description: 'Complete your profile information',
      status: 'completed',
      icon: <PersonIcon />
    },
    { 
      title: 'Location', 
      description: 'Set your delivery address',
      status: 'current',
      icon: <LocationIcon />
    },
    { 
      title: 'Payment', 
      description: 'Add payment method',
      status: 'pending',
      icon: <CreditCardIcon />
    },
    { 
      title: 'Complete', 
      description: 'Finish setup',
      status: 'pending',
      icon: <CheckIcon />
    }
  ];

  return (
    <WorkflowStep
      steps={steps}
      currentStep={1}
      orientation="vertical"
      variant="filled"
      showIcons
      animated
    />
  );
}
```

## Accessibility

The WorkflowStep component includes comprehensive accessibility features:

- **Keyboard Navigation**: Navigate between steps using Tab, Enter, Space, and Arrow keys
- **Screen Reader Support**: Proper ARIA attributes and announcements
- **Focus Management**: Clear focus indicators and logical focus order
- **High Contrast**: Supports high contrast mode
- **Reduced Motion**: Respects user's motion preferences

## Theming

The component integrates with the MUI theme system and supports:

- **Color Variants**: Primary, secondary, success, warning, error, neutral
- **Size Variants**: xs, sm, md, lg, xl
- **Visual Variants**: default, minimal, outlined, filled
- **Dark/Light Mode**: Full theme support
- **Custom Styling**: Override styles through theme or className/style props

## Best Practices

1. **Step Status**: Ensure step status accurately reflects the workflow state
2. **Descriptions**: Provide clear, concise step descriptions
3. **Interactive Mode**: Only enable interactive mode when navigation is meaningful
4. **Error Handling**: Use error status for steps that have validation issues
5. **Loading States**: Consider showing loading states for steps being processed
6. **Responsive**: Test on different screen sizes, especially for horizontal layouts

## Related Components

- `Stepper` - Alternative stepper component with different styling
- `ProgressBar` - For simple progress indication
- `Timeline` - For time-based step visualization
- `Breadcrumbs` - For navigation breadcrumbs