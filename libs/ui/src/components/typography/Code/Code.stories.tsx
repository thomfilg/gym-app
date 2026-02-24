import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { DensityProvider } from '../../../utils/density';
import { Code } from './Code';

const meta: Meta<typeof Code> = {
  title: 'Typography/Code',
  component: Code,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A code typography component for displaying inline code, code blocks, and syntax-highlighted snippets with various styling options.',
      },
    },
  },
  tags: ['autodocs', 'component:Code'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['inline', 'block', 'highlight'],
      description: 'Code display variant',
    },
    language: {
      control: { type: 'text' },
      description: 'Programming language label for display',
    },
    copyable: {
      control: 'boolean',
      description: 'Enable copy to clipboard (block and highlight variants only)',
    },
    lineNumbers: {
      control: 'boolean',
      description: 'Show line numbers (block and highlight variants only)',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Size of the code text',
    },
    children: {
      control: 'text',
      description: 'Code content to display',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'const greeting = "Hello, World!";',
    variant: 'inline',
  },
};

export const InlineCode: Story = {
  render: () => (
    <Stack spacing={2}>
      <Typography>
        Use the <Code variant="inline">useState</Code> hook to manage component state.
      </Typography>

      <Typography>
        Install the package with <Code variant="inline">npm install react</Code> or{' '}
        <Code variant="inline">yarn add react</Code>.
      </Typography>

      <Typography>
        The function <Code variant="inline">calculateTotal()</Code> returns a{' '}
        <Code variant="inline">number</Code> value.
      </Typography>

      <Typography>
        Press <Code variant="inline">Ctrl+S</Code> to save or <Code variant="inline">Cmd+S</Code> on
        Mac.
      </Typography>
    </Stack>
  ),
};

export const BlockCode: Story = {
  render: () => (
    <Stack spacing={3}>
      <Code variant="block" language="javascript">
        {`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

 // Output: 55`}
      </Code>

      <Code variant="block" language="typescript">
        {`interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

const getUser = async (id: number): Promise<User> => {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
};`}
      </Code>

      <Code variant="block" language="python">
        {`def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)

print(quick_sort([3, 6, 8, 10, 1, 2, 1]))`}
      </Code>
    </Stack>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Inline Variant
        </Typography>
        <Typography>
          Use the{' '}
          <Code variant="inline" size="md">
            useState()
          </Code>{' '}
          hook for state management.
        </Typography>
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Block Variant
        </Typography>
        <Code variant="block" size="md">
          {`const greeting = "Hello, World!";
console.log(greeting);`}
        </Code>
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Highlight Variant
        </Typography>
        <Code variant="highlight" size="md" language="javascript">
          {`function important() {
  return "This code is highlighted";
}`}
        </Code>
      </Box>
    </Stack>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Extra Small (xs)
        </Typography>
        <Code variant="inline" size="xs">
          size="xs"
        </Code>
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Small (sm)
        </Typography>
        <Code variant="inline" size="sm">
          size="sm"
        </Code>
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Medium (md)
        </Typography>
        <Code variant="inline" size="md">
          size="md"
        </Code>
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Large (lg)
        </Typography>
        <Code variant="inline" size="lg">
          size="lg"
        </Code>
      </Box>

      <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
        Block Sizes
      </Typography>
      <Stack spacing={2}>
        <Code variant="block" size="xs">
          Extra small block
        </Code>
        <Code variant="block" size="sm">
          Small block
        </Code>
        <Code variant="block" size="md">
          Medium block
        </Code>
        <Code variant="block" size="lg">
          Large block
        </Code>
      </Stack>
    </Stack>
  ),
};

export const AllStates: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Default State
        </Typography>
        <Code variant="block">Default code block</Code>
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          With Copy Button
        </Typography>
        <Code variant="block" copyable>
          {`// Copyable code
const copyMe = true;`}
        </Code>
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          With Line Numbers
        </Typography>
        <Code variant="block" lineNumbers>
          {`// Line 1
// Line 2
// Line 3`}
        </Code>
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          With Language Label
        </Typography>
        <Code variant="block" language="TypeScript">
          {`interface Example {
  id: number;
}`}
        </Code>
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          All Features Combined
        </Typography>
        <Code variant="highlight" language="JavaScript" copyable lineNumbers>
          {`function allFeatures() {
  return "Copy, line numbers, and language";
}`}
        </Code>
      </Box>
    </Stack>
  ),
};

export const InteractiveStates: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="h6">Interactive Elements</Typography>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Hover over the copy button to see tooltip:
        </Typography>
        <Code variant="block" copyable>
          {`// Hover over the copy button
const interactive = true;`}
        </Code>
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Click to copy (watch for feedback):
        </Typography>
        <Code variant="highlight" copyable language="bash">
          {`npm install
npm start`}
        </Code>
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Long content with scroll:
        </Typography>
        <Code variant="block" copyable lineNumbers>
          {`// This is a longer code block to demonstrate scrolling
const longContent = [
  "Line 1 with some content",
  "Line 2 with more content",
  "Line 3 with even more content",
  "Line 4 continues the pattern",
  "Line 5 keeps going",
  "Line 6 and still more",
  "Line 7 almost there",
  "Line 8 getting close",
  "Line 9 nearly done",
  "Line 10 the final line"
].join('\n');`}
        </Code>
      </Box>
    </Stack>
  ),
};

export const Responsive: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => (
    <Box sx={{ width: '100%', p: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h6">Responsive Code Display</Typography>

        <Typography>
          Inline code adjusts to text:{' '}
          <Code variant="inline" size="md">
            responsive()
          </Code>
        </Typography>

        <Code variant="block" copyable>
          {`// This block adapts to container width
const mobileFirst = true;`}
        </Code>

        <Code variant="highlight" language="CSS" copyable lineNumbers>
          {`@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
}`}
        </Code>

        <Typography variant="caption">
          View on different screen sizes to see responsive behavior
        </Typography>
      </Stack>
    </Box>
  ),
};

export const HighlightCode: Story = {
  render: () => (
    <Stack spacing={3}>
      <Code variant="highlight" language="bash" copyable>
        {`$ npm install @mui/material @emotion/react @emotion/styled
$ npm run dev

> procurement-ui@1.0.0 dev
> vite dev

  VITE v4.5.0  ready in 432 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.100:5173/
  ➜  press h to show help`}
      </Code>

      <Code variant="terminal">
        {`$ git status
On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   src/components/Code.tsx
        modified:   src/index.ts

$ git commit -m "Add Code component"
[main abc1234] Add Code component
 2 files changed, 150 insertions(+)`}
      </Code>
    </Stack>
  ),
};

export const WithLineNumbers: Story = {
  render: () => (
    <Stack spacing={3}>
      <Code variant="block" language="javascript" lineNumbers>
        {`// React component with hooks
import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default Counter;`}
      </Code>
    </Stack>
  ),
};

export const CopyableCode: Story = {
  render: () => (
    <Stack spacing={3}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Click the copy button to copy this code:
        </Typography>
        <Code variant="block" language="bash" copyable>
          {`npm install
npm run build
npm run test`}
        </Code>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Configuration example:
        </Typography>
        <Code variant="block" language="json" copyable>
          {`{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}`}
        </Code>
      </Paper>
    </Stack>
  ),
};

export const ColorThemes: Story = {
  render: () => {
    const sampleCode = `const greeting = "Hello, World!";
`;

    return (
      <Stack spacing={3}>
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Light Theme
          </Typography>
          <Code variant="block" language="javascript">
            {sampleCode}
          </Code>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Dark Theme
          </Typography>
          <Code variant="highlight" language="javascript">
            {sampleCode}
          </Code>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            GitHub Theme
          </Typography>
          <Code variant="block" language="javascript">
            {sampleCode}
          </Code>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Monokai Theme
          </Typography>
          <Code variant="block" language="javascript">
            {sampleCode}
          </Code>
        </Box>
      </Stack>
    );
  },
};

export const DifferentLanguages: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          HTML
        </Typography>
        <Code variant="block" language="html">
          {`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Page</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>`}
        </Code>
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          CSS
        </Typography>
        <Code variant="block" language="css">
          {`.container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}`}
        </Code>
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          JSON
        </Typography>
        <Code variant="block" language="json">
          {`{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
  ]
}`}
        </Code>
      </Box>
    </Stack>
  ),
};

export const DocumentationExample: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Installation
        </Typography>
        <Typography paragraph>To get started, install the package using npm or yarn:</Typography>
        <Code variant="block" language="bash" copyable>
          {`npm install @company/ui-components
# or
yarn add @company/ui-components`}
        </Code>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Basic Usage
        </Typography>
        <Typography paragraph>
          Import and use the <Code variant="inline">Button</Code> component:
        </Typography>
        <Code variant="block" language="javascript" lineNumbers copyable>
          {`import { Button } from '@company/ui-components';

function App() {
  return (
    <Button variant="primary" onClick={() => alert('Clicked!')}>
      Click Me
    </Button>
  );
}`}
        </Code>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          API Reference
        </Typography>
        <Typography paragraph>
          The <Code variant="inline">Button</Code> component accepts the following props:
        </Typography>
        <Code variant="block" language="typescript">
          {`interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}`}
        </Code>
      </Box>
    </Stack>
  ),
};

export const LongCodeWithWrap: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Without wrapping (scrollable)
        </Typography>
        <Code variant="block" language="javascript" wrap={false}>
          {'const veryLongVariableName = "This is a very long string that would normally cause horizontal scrolling in the code block without wrapping enabled";'}
        </Code>
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          With wrapping enabled
        </Typography>
        <Code variant="block" language="javascript" wrap={true}>
          {'const veryLongVariableName = "This is a very long string that will wrap to the next line when wrapping is enabled in the code block";'}
        </Code>
      </Box>
    </Stack>
  ),
};

export const MixedContent: Story = {
  render: () => (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Working with Arrays in JavaScript
      </Typography>

      <Typography paragraph>
        JavaScript provides many useful array methods. The <Code variant="inline">map()</Code>{' '}
        method creates a new array by transforming each element:
      </Typography>

      <Code variant="block" language="javascript" lineNumbers>
        {`const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
 // [2, 4, 6, 8, 10]`}
      </Code>

      <Typography paragraph sx={{ mt: 2 }}>
        You can also use <Code variant="inline">filter()</Code> to select specific elements and{' '}
        <Code variant="inline">reduce()</Code> to compute a single value:
      </Typography>

      <Code variant="block" language="javascript" lineNumbers>
        {`const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);`}
      </Code>

      <Typography variant="caption" display="block" sx={{ mt: 2 }}>
        💡 Tip: These methods don&apos;t modify the original array
      </Typography>
    </Paper>
  ),
};

export const DensityModes: Story = {
  render: () => (
    <Stack direction="row" spacing={4} alignItems="flex-start">
      <DensityProvider defaultMode="compact">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Compact (0.8x)
          </Typography>
          <Code variant="block" language="javascript">
            {`const greeting = "Hello, World!";
console.log(greeting);`}
          </Code>
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="normal">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Normal (1.0x)
          </Typography>
          <Code variant="block" language="javascript">
            {`const greeting = "Hello, World!";
console.log(greeting);`}
          </Code>
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="spacious">
        <Box>
          <Typography variant="caption" gutterBottom display="block">
            Spacious (1.25x)
          </Typography>
          <Code variant="block" language="javascript">
            {`const greeting = "Hello, World!";
console.log(greeting);`}
          </Code>
        </Box>
      </DensityProvider>
    </Stack>
  ),
};
