import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { DensityProvider } from '../../../utils/density';
import { CodeEditor } from './CodeEditor';
import type { EditorLanguage } from './CodeEditor.types';

const meta: Meta<typeof CodeEditor> = {
  title: 'Enhanced/CodeEditor',
  component: CodeEditor,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A powerful Monaco-based code editor with syntax highlighting, themes, and advanced features like auto-formatting, fullscreen mode, and live editing.',
      },
    },
  },
  tags: ['autodocs', 'component:CodeEditor'],
  argTypes: {
    language: {
      control: { type: 'select' },
      options: [
        'javascript',
        'typescript',
        'json',
        'css',
        'html',
        'yaml',
        'markdown',
        'sql',
        'python',
      ],
      description: 'Programming language for syntax highlighting',
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark', 'auto'],
      description: 'Editor color theme',
    },
    height: {
      control: 'text',
      description: 'Height of the editor',
    },
    readOnly: {
      control: 'boolean',
      description: 'Makes editor read-only',
    },
    lineNumbers: {
      control: 'boolean',
      description: 'Show line numbers',
    },
    minimap: {
      control: 'boolean',
      description: 'Show minimap navigation',
    },
    fontSize: {
      control: { type: 'number', min: 10, max: 24 },
      description: 'Font size in pixels',
    },
    wordWrap: {
      control: 'boolean',
      description: 'Enable word wrapping',
    },
    showToolbar: {
      control: 'boolean',
      description: 'Show editor toolbar',
    },
    autoFormat: {
      control: 'boolean',
      description: 'Auto-format code on load',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample code snippets for different languages
const sampleCode = {
  javascript: `// JavaScript Example
function fibonacci(n) {
  if (n <= 1) return n;
  
  const memo = [0, 1];
  
  for (let i = 2; i <= n; i++) {
    memo[i] = memo[i - 1] + memo[i - 2];
  }
  
  return memo[n];
}

// Test the function


// ES6 Arrow Function
const greet = (name = 'World') => {
  return \`Hello, \${name}!\`;
};

// Array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const sum = numbers.reduce((acc, n) => acc + n, 0);`,

  typescript: `// TypeScript Example
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  metadata?: Record<string, any>;
}

class UserService {
  private users: Map<number, User> = new Map();
  
  constructor(private apiUrl: string) {}
  
  async getUser(id: number): Promise<User | undefined> {
    if (this.users.has(id)) {
      return this.users.get(id);
    }
    
    const response = await fetch(\`\${this.apiUrl}/users/\${id}\`);
    const user = await response.json() as User;
    
    this.users.set(id, user);
    return user;
  }
  
  updateUser(id: number, updates: Partial<User>): void {
    const existing = this.users.get(id);
    if (existing) {
      this.users.set(id, { ...existing, ...updates });
    }
  }
}

// Generic function
function reverseArray<T>(arr: T[]): T[] {
  return [...arr].reverse();
}`,

  json: `{
  "name": "procurement-ui",
  "version": "1.0.0",
  "description": "Modern UI component library",
  "main": "dist/index.js",
  "scripts": {
    "dev": "vite dev",
    "build": "tsc && vite build",
    "test": "jest",
    "lint": "eslint src --ext ts,tsx"
  },
  "dependencies": {
    "@mui/material": "^5.14.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "typescript": "^5.0.0",
    "vite": "^4.0.0"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/example/procurement-ui"
  },
  "keywords": ["ui", "components", "react", "typescript"],
  "author": "Development Team",
  "license": "MIT"
}`,

  css: `/* Modern CSS with Variables and Animations */
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --text-color: #2d3748;
  --bg-color: #f7fafc;
  --border-radius: 8px;
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transition: var(--transition);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animated {
  animation: fadeIn 0.5s ease-out forwards;
}

@media (max-width: 768px) {
  .card {
    padding: 1rem;
  }
}`,

  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Modern Web App</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="navbar">
    <nav>
      <div class="logo">
        <img src="logo.svg" alt="Logo">
      </div>
      <ul class="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  
  <main>
    <section id="hero" class="hero-section">
      <div class="container">
        <h1>Welcome to Our Platform</h1>
        <p>Build amazing things with modern tools</p>
        <button class="cta-button">Get Started</button>
      </div>
    </section>
    
    <section id="features">
      <div class="feature-grid">
        <article class="feature-card">
          <h3>Fast Performance</h3>
          <p>Lightning-fast load times and smooth interactions</p>
        </article>
      </div>
    </section>
  </main>
  
  <script src="app.js"></script>
</body>
</html>`,

  python: `# Python Example with Classes and Decorators
import time
from typing import List, Dict, Optional
from functools import wraps

def timer(func):
    """Decorator to measure function execution time"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start:.4f} seconds")
        return result
    return wrapper

class DataProcessor:
    """Process and analyze data with various algorithms"""
    
    def __init__(self, data: List[int]):
        self.data = data
        self._cache: Dict[str, any] = {}
    
    @timer
    def calculate_statistics(self) -> Dict[str, float]:
        """Calculate basic statistics for the dataset"""
        if 'stats' in self._cache:
            return self._cache['stats']
        
        stats = {
            'mean': sum(self.data) / len(self.data),
            'min': min(self.data),
            'max': max(self.data),
            'median': self._calculate_median(),
        }
        
        self._cache['stats'] = stats
        return stats
    
    def _calculate_median(self) -> float:
        """Calculate median value"""
        sorted_data = sorted(self.data)
        n = len(sorted_data)
        
        if n % 2 == 0:
            return (sorted_data[n//2 - 1] + sorted_data[n//2]) / 2
        return sorted_data[n//2]

# Example usage
if __name__ == "__main__":
    processor = DataProcessor([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    stats = processor.calculate_statistics()
    print(f"Statistics: {stats}")`,

  sql: `-- SQL Example with Complex Queries
-- Create tables for an e-commerce system

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INTEGER DEFAULT 0,
    category_id INTEGER REFERENCES categories(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Complex query with JOIN and aggregation
WITH monthly_sales AS (
    SELECT 
        DATE_TRUNC('month', o.order_date) as month,
        p.category_id,
        SUM(oi.quantity * oi.price) as revenue,
        COUNT(DISTINCT o.user_id) as unique_customers
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    JOIN products p ON oi.product_id = p.id
    WHERE o.status = 'completed'
    GROUP BY DATE_TRUNC('month', o.order_date), p.category_id
)
SELECT 
    month,
    c.name as category,
    revenue,
    unique_customers,
    RANK() OVER (PARTITION BY month ORDER BY revenue DESC) as revenue_rank
FROM monthly_sales ms
JOIN categories c ON ms.category_id = c.id
ORDER BY month DESC, revenue DESC;`,

  yaml: `# YAML Configuration Example
apiVersion: v1
kind: Service
metadata:
  name: procurement-api
  namespace: production
  labels:
    app: procurement
    tier: backend
    version: v1.0.0

spec:
  type: LoadBalancer
  selector:
    app: procurement
    tier: backend
  ports:
    - name: http
      port: 80
      targetPort: 8080
      protocol: TCP
    - name: https
      port: 443
      targetPort: 8443
      protocol: TCP

---

apiVersion: apps/v1
kind: Deployment
metadata:
  name: procurement-api
  namespace: production
  
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
      
  selector:
    matchLabels:
      app: procurement
      tier: backend
      
  template:
    metadata:
      labels:
        app: procurement
        tier: backend
    spec:
      containers:
        - name: api
          image: procurement/api:1.0.0
          ports:
            - containerPort: 8080
          env:
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: db-secret
                  key: url
          resources:
            requests:
              memory: "256Mi"
              cpu: "250m"
            limits:
              memory: "512Mi"
              cpu: "500m"`,

  markdown: `# Project Documentation

## Overview

This is a **comprehensive guide** to our component library featuring:

- 🚀 **Fast Performance** - Optimized for speed
- 🎨 **Beautiful Design** - Modern and clean UI
- 📱 **Responsive** - Works on all devices
- ♿ **Accessible** - WCAG 2.1 compliant

## Installation

\`\`\`bash
npm install @company/ui-components
# or
yarn add @company/ui-components
\`\`\`

## Quick Start

Import and use components in your React application:

\`\`\`jsx
import { Button, Card, Dialog } from '@company/ui-components';

function App() {
  return (
    <Card>
      <h1>Welcome</h1>
      <Button variant="primary">Get Started</Button>
    </Card>
  );
}
\`\`\`

## Features

### Component Library

| Component | Status | Description |
|-----------|--------|-------------|
| Button | ✅ Stable | Interactive button with variants |
| Card | ✅ Stable | Container for content |
| Dialog | 🚧 Beta | Modal dialog component |
| Table | 📋 Planned | Data table with sorting |

### Advanced Features

1. **Theming Support**
   - Light/Dark modes
   - Custom color schemes
   - Typography system

2. **Accessibility**
   - Keyboard navigation
   - Screen reader support
   - ARIA attributes

> **Note:** All components are tested across modern browsers.

## API Reference

### Button Props

- \`variant\`: 'primary' | 'secondary' | 'danger'
- \`size\`: 'small' | 'medium' | 'large'
- \`disabled\`: boolean
- \`onClick\`: () => void

## Contributing

Please read our [contributing guidelines](./CONTRIBUTING.md) before submitting PRs.

---

*Last updated: January 2024*`,
};

export const Default: Story = {
  args: {
    language: 'javascript',
    value: sampleCode.javascript,
    height: '400px',
    showToolbar: true,
    lineNumbers: true,
  },
};

const AllLanguagesComponent = () => {
  const [activeLanguage, setActiveLanguage] = React.useState<EditorLanguage>('javascript');

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {Object.keys(sampleCode).map((lang) => (
          <Button
            key={lang}
            variant={activeLanguage === lang ? 'contained' : 'outlined'}
            size="small"
            onClick={() => setActiveLanguage(lang as EditorLanguage)}
          >
            {lang}
          </Button>
        ))}
      </Stack>

      <CodeEditor
        language={activeLanguage}
        value={sampleCode[activeLanguage as keyof typeof sampleCode]}
        height="500px"
        showToolbar={true}
        onChange={() => {
          /** do nothing */
        }}
      />
    </Stack>
  );
};

export const AllLanguages: Story = {
  render: () => <AllLanguagesComponent />,
};

export const DarkTheme: Story = {
  args: {
    language: 'typescript',
    value: sampleCode.typescript,
    theme: 'dark',
    height: '400px',
    showToolbar: true,
  },
  decorators: [
    (Story) => (
      <Box sx={{ bgcolor: '#1a1a1a', p: 3, borderRadius: 2 }}>
        <Story />
      </Box>
    ),
  ],
};

export const LightTheme: Story = {
  args: {
    language: 'css',
    value: sampleCode.css,
    theme: 'light',
    height: '400px',
    showToolbar: true,
  },
};

export const ReadOnlyMode: Story = {
  args: {
    language: 'json',
    value: sampleCode.json,
    readOnly: true,
    height: '400px',
    showToolbar: true,
  },
  render: (args) => (
    <Stack spacing={2}>
      <Alert severity="info">
        This editor is in read-only mode. Users can view and copy but cannot edit.
      </Alert>
      <CodeEditor {...args} />
    </Stack>
  ),
};

const LiveEditorComponent = () => {
  const [code, setCode] = React.useState(sampleCode.javascript);
  const [saved, setSaved] = React.useState(false);

  const handleSave = (value: string) => {
    setCode(value);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h6">Live Code Editor with Save</Typography>
      <Typography variant="body2" color="text.secondary">
        Edit the code below and press Ctrl+S (or Cmd+S) to save
      </Typography>

      {saved && <Alert severity="success">Code saved successfully!</Alert>}

      <CodeEditor
        language="javascript"
        value={code}
        onChange={setCode}
        onSave={handleSave}
        height="400px"
        showToolbar={true}
        autoFormat={false}
      />

      <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
        <Typography variant="subtitle2" gutterBottom>
          Code Length: {code.length} characters
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Last modified: {new Date().toLocaleTimeString()}
        </Typography>
      </Paper>
    </Stack>
  );
};

export const LiveEditor: Story = {
  render: () => <LiveEditorComponent />,
};

export const WithMinimap: Story = {
  args: {
    language: 'typescript',
    value: sampleCode.typescript,
    height: '500px',
    minimap: true,
    showToolbar: true,
  },
};

const CustomFontSizeComponent = () => {
  const [fontSize, setFontSize] = React.useState(14);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography>Font Size:</Typography>
        {[12, 14, 16, 18, 20].map((size) => (
          <Button
            key={size}
            variant={fontSize === size ? 'contained' : 'outlined'}
            size="small"
            onClick={() => setFontSize(size)}
          >
            {size}px
          </Button>
        ))}
      </Stack>

      <CodeEditor
        language="python"
        value={sampleCode.python}
        fontSize={fontSize}
        height="400px"
        showToolbar={true}
      />
    </Stack>
  );
};

export const CustomFontSize: Story = {
  render: () => <CustomFontSizeComponent />,
};

export const WithWordWrap: Story = {
  args: {
    language: 'html',
    value: sampleCode.html,
    wordWrap: true,
    height: '400px',
    showToolbar: true,
  },
};

export const NoToolbar: Story = {
  args: {
    language: 'sql',
    value: sampleCode.sql,
    showToolbar: false,
    height: '400px',
  },
};

export const WithPlaceholder: Story = {
  args: {
    language: 'javascript',
    value: '',
    placeholder: '// Start typing your JavaScript code here...',
    height: '300px',
    showToolbar: true,
  },
};

export const AutoFormat: Story = {
  render: () => {
    const unformattedCode = 'function messy(a,b,c){if(a>b){return c}else{return a+b}}const x={name:"test",value:123,items:[1,2,3,4,5]};';

    return (
      <Stack spacing={3}>
        <Alert severity="info">This editor will automatically format the code when it loads</Alert>

        <CodeEditor
          language="javascript"
          value={unformattedCode}
          autoFormat={true}
          height="300px"
          showToolbar={true}
        />
      </Stack>
    );
  },
};

export const ComparisonView: Story = {
  render: () => {
    const originalCode = sampleCode.javascript;
    const modifiedCode = sampleCode.typescript;

    return (
      <Stack spacing={3}>
        <Typography variant="h6">Code Comparison</Typography>

        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
          <Stack spacing={1}>
            <Typography variant="subtitle2">Original (JavaScript)</Typography>
            <CodeEditor
              language="javascript"
              value={originalCode}
              height="400px"
              readOnly={true}
              showToolbar={false}
            />
          </Stack>

          <Stack spacing={1}>
            <Typography variant="subtitle2">Modified (TypeScript)</Typography>
            <CodeEditor
              language="typescript"
              value={modifiedCode}
              height="400px"
              readOnly={false}
              showToolbar={false}
            />
          </Stack>
        </Box>
      </Stack>
    );
  },
};

// Required story exports for validation
export const AllVariants: Story = {
  render: () => (
    <Stack spacing={4}>
      <CodeEditor language="javascript" value="console.log('Default variant');" />
      <CodeEditor
        language="typescript"
        value="const message: string = 'TypeScript variant';"
        theme="dark"
      />
      <CodeEditor language="json" value='{"variant": "JSON with minimap"}' minimap />
    </Stack>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <Stack spacing={4}>
      <CodeEditor language="javascript" value="// Small size" height="200px" fontSize={12} />
      <CodeEditor
        language="javascript"
        value="// Medium size (default)"
        height="400px"
        fontSize={14}
      />
      <CodeEditor language="javascript" value="// Large size" height="600px" fontSize={16} />
    </Stack>
  ),
};

export const AllStates: Story = {
  render: () => (
    <Stack spacing={4}>
      <CodeEditor language="javascript" value="// Normal state" />
      <CodeEditor language="javascript" value="// Read-only state" readOnly />
      <CodeEditor language="javascript" value="" placeholder="Empty state with placeholder" />
    </Stack>
  ),
};

const InteractiveComponent = () => {
  const [code1, setCode1] = React.useState('// Interactive editor 1');
  const [code2, setCode2] = React.useState('// Interactive editor 2');

  const handleSave = (value: string) => {
    // Handle save action
    setCode1(value);
  };

  return (
    <Stack spacing={4}>
      <CodeEditor language="javascript" value={code1} onChange={setCode1} onSave={handleSave} />
      <CodeEditor language="typescript" value={code2} onChange={setCode2} wordWrap autoFormat />
    </Stack>
  );
};

export const InteractiveStates: Story = {
  render: () => <InteractiveComponent />,
};

export const Responsive: Story = {
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1200px', height: '800px' } },
      },
    },
  },
  render: () => (
    <CodeEditor
      language="javascript"
      value={`// Responsive code editor
// This editor adapts to different screen sizes
function responsiveFunction() {
  return 'Works on mobile, tablet, and desktop';
}`}
      height="300px"
    />
  ),
};

export const DensityModes: Story = {
  render: () => (
    <Stack direction="row" spacing={4} alignItems="flex-start">
      <DensityProvider defaultMode="compact">
        <Box sx={{ width: 300 }}>
          <Typography variant="caption" gutterBottom display="block">
            Compact (0.8x)
          </Typography>
          <CodeEditor
            language="javascript"
            value="const compact = true;"
            height="150px"
          />
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="normal">
        <Box sx={{ width: 300 }}>
          <Typography variant="caption" gutterBottom display="block">
            Normal (1.0x)
          </Typography>
          <CodeEditor
            language="javascript"
            value="const normal = true;"
            height="150px"
          />
        </Box>
      </DensityProvider>
      <DensityProvider defaultMode="spacious">
        <Box sx={{ width: 300 }}>
          <Typography variant="caption" gutterBottom display="block">
            Spacious (1.25x)
          </Typography>
          <CodeEditor
            language="javascript"
            value="const spacious = true;"
            height="150px"
          />
        </Box>
      </DensityProvider>
    </Stack>
  ),
};
