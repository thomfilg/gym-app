# Code Component

## Purpose

The Code component is a versatile typography element designed for displaying code snippets and programming content with proper syntax formatting, visual hierarchy, and interactive features. It supports both inline code references and multi-line code blocks with optional enhancements like syntax highlighting, line numbers, copy functionality, and language labels.

## Use Cases

- **Inline code references**: Display variable names, function names, or short code snippets within text
- **Code blocks**: Show multi-line code examples, configuration files, or command outputs
- **Highlighted code**: Emphasize important code sections with gradient backgrounds
- **Technical documentation**: Present API examples, installation commands, or usage instructions
- **Interactive tutorials**: Provide copyable code snippets for users to use directly
- **Code comparisons**: Show different implementations or before/after examples

## Props Documentation

### variant
- **Type**: `'inline' | 'block' | 'highlight'`
- **Default**: `'inline'`
- **Description**: Controls the display style of the code
  - `inline`: Renders as an inline element with subtle background
  - `block`: Renders as a block element with full background and border
  - `highlight`: Block variant with gradient background and accent border

### language
- **Type**: `string`
- **Default**: `undefined`
- **Description**: Programming language label displayed in the top-left corner of block variants

### copyable
- **Type**: `boolean`
- **Default**: `false`
- **Description**: Enables copy-to-clipboard functionality with visual feedback (block/highlight variants only)

### lineNumbers
- **Type**: `boolean`
- **Default**: `false`
- **Description**: Shows line numbers for code blocks, useful for referencing specific lines

### size
- **Type**: `'xs' | 'sm' | 'md' | 'lg'`
- **Default**: `'md'`
- **Description**: Controls the font size and padding of the code display

### children
- **Type**: `React.ReactNode`
- **Default**: `undefined`
- **Description**: The code content to display

## Usage Examples

### Basic Inline Code
```tsx
import { Code } from '@procurement/ui';

<p>Use the <Code>useState</Code> hook for state management.</p>
```

### Block Code with Copy
```tsx
<Code variant="block" copyable>
{`const greeting = "Hello, World!";
console.log(greeting);`}
</Code>
```

### Highlighted Code with Line Numbers
```tsx
<Code 
  variant="highlight" 
  language="JavaScript" 
  lineNumbers
  copyable
>
{`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`}
</Code>
```

### Different Sizes
```tsx
<Code size="xs">tiny</Code>
<Code size="sm">small</Code>
<Code size="md">medium</Code>
<Code size="lg">large</Code>
```

### With Language Label
```tsx
<Code variant="block" language="TypeScript">
{`interface User {
  id: string;
  name: string;
  email: string;
}`}
</Code>
```

## Accessibility Notes

### Semantic HTML
- Uses appropriate HTML elements (`<code>` for inline, `<div>` for blocks)
- Proper ARIA attributes for interactive elements

### Keyboard Navigation
- Copy button is keyboard accessible with Tab navigation
- Enter or Space triggers the copy action
- Focus visible indicators for all interactive elements

### Screen Reader Support
- Copy button includes descriptive tooltip text
- Language labels are announced when present
- Line numbers are marked as decorative (not announced)
- Copy success feedback is announced to screen readers

### Color Contrast
- All text meets WCAG AA contrast requirements
- Distinct visual states for hover and focus
- Theme-aware colors adapt to light/dark modes

## Best Practices

### Content Guidelines
1. **Use inline variant for short references**: Variable names, function names, file paths
2. **Use block variant for multi-line code**: Examples, configurations, outputs
3. **Use highlight variant for emphasis**: Important code sections, new additions
4. **Add language labels for clarity**: Helps users understand the syntax context
5. **Enable copy for useful snippets**: Installation commands, configuration examples

### Performance Considerations
1. **Avoid excessive line numbers**: Only use when referencing specific lines
2. **Limit code block size**: Consider collapsible sections for very long code
3. **Optimize for readability**: Choose appropriate size based on content length
4. **Use semantic content**: Ensure code is meaningful and not decorative

### Styling Tips
1. **Maintain consistency**: Use the same variant for similar content types
2. **Consider context**: Inline for flow text, block for standalone examples
3. **Theme awareness**: Component adapts to light/dark themes automatically
4. **Responsive design**: Code blocks scroll horizontally on small screens
5. **Visual hierarchy**: Use size and variant to create clear distinctions

### Integration Patterns
```tsx
// In documentation
<Box>
  <Typography variant="body1">
    Install the package using npm:
  </Typography>
  <Code variant="block" copyable language="bash">
    npm install @procurement/ui
  </Code>
</Box>

// In tutorials
<Card>
  <CardContent>
    <Typography variant="h6">Example Usage</Typography>
    <Code variant="highlight" language="jsx" lineNumbers>
{`import { Button } from '@procurement/ui';

function App() {
  return <Button>Click me</Button>;
}`}
    </Code>
  </CardContent>
</Card>

// In inline descriptions
<Typography>
  The <Code>map()</Code> function transforms each element in an array.
</Typography>
```

## Related Components
- **Text**: For general typography needs
- **Heading**: For section titles and headings
- **Blockquote**: For quoted content
- **Card**: For containing code examples with descriptions