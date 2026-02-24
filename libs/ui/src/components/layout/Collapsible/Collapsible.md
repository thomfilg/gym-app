# Collapsible Component

## Overview

The Collapsible component provides a flexible container that can expand and collapse content with smooth animations. It supports multiple animation variants and includes accessible trigger and content subcomponents.

## Features

- **Multiple Animation Variants**: Default (MUI Collapse), smooth, and spring animations
- **Customizable Timing**: Configurable duration and easing functions
- **Accessibility**: Full ARIA support with proper focus management
- **Composition Pattern**: Separate trigger and content components for flexibility
- **Performance**: Optional keep-mounted behavior to control DOM presence
- **Responsive**: Works seamlessly across all screen sizes

## Basic Usage

```tsx
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/layout/Collapsible';

function MyCollapsible() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <CollapsibleTrigger 
        expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        Click to toggle
      </CollapsibleTrigger>
      <Collapsible open={isOpen}>
        <CollapsibleContent>
          This content can be collapsed and expanded with smooth animations.
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
```

## Props

### Collapsible Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | required | Content to show/hide |
| open | boolean | required | Controls visibility state |
| variant | 'default' \| 'smooth' \| 'spring' | 'default' | Animation style |
| duration | number | 300 | Animation duration in milliseconds |
| easing | string | theme default | CSS easing function |
| onToggle | (open: boolean) => void | - | Callback when state changes |
| disabled | boolean | false | Disable all interactions |
| keepMounted | boolean | false | Keep content in DOM when collapsed |
| sx | SxProps<Theme> | - | MUI styling system |
| className | string | - | CSS class name |

### CollapsibleTrigger Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | required | Trigger content |
| onClick | () => void | - | Click handler |
| disabled | boolean | false | Disable trigger |
| expanded | boolean | false | Current expanded state |
| className | string | - | CSS class name |

### CollapsibleContent Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | required | Content to display |
| className | string | - | CSS class name |

## Animation Variants

### Default
Uses MUI's built-in Collapse component with standard Material Design animations.

### Smooth
Custom implementation with smooth height transitions and customizable easing.

### Spring
Bouncy spring-like animation with a playful feel using cubic-bezier easing.

## Accessibility

The Collapsible component follows WAI-ARIA guidelines:

- Uses `role="region"` for the collapsible area
- Implements `aria-expanded` to indicate state
- Supports `aria-hidden` for collapsed content
- Provides proper focus management
- Keyboard navigation support on triggers

## Best Practices

1. **State Management**: Use controlled state for predictable behavior
2. **Performance**: Set `keepMounted={false}` for large content to improve performance
3. **Animation**: Choose appropriate variant based on your design system
4. **Accessibility**: Always provide meaningful trigger labels
5. **Responsive**: Test across different screen sizes

## Examples

### FAQ Section
```tsx
<Collapsible open={faqOpen} variant="smooth">
  <CollapsibleContent>
    <Typography variant="body2">
      Detailed answer to the frequently asked question...
    </Typography>
  </CollapsibleContent>
</Collapsible>
```

### Navigation Menu
```tsx
<Collapsible open={menuOpen} variant="spring" duration={400}>
  <CollapsibleContent>
    <List>
      <ListItem>Menu Item 1</ListItem>
      <ListItem>Menu Item 2</ListItem>
    </List>
  </CollapsibleContent>
</Collapsible>
```

## Integration Notes

- Compatible with MUI theming system
- Supports all MUI breakpoints for responsive design
- Works with React 18+ concurrent features
- TypeScript definitions included for full type safety