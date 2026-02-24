# CommandPalette

A powerful command palette component for quick navigation and actions with fuzzy search, categories, and keyboard shortcuts.

## Features

- **Fuzzy Search**: Built-in fuzzy search using Fuse.js for finding commands quickly
- **Keyboard Navigation**: Full keyboard navigation with arrow keys, Enter, and Escape
- **Categories**: Organize commands into categories for better organization
- **Recent Commands**: Track and display recently used commands
- **Glass Effect**: Modern glass morphism design with backdrop blur
- **Keyboard Shortcuts**: Display and handle keyboard shortcuts for commands
- **Responsive**: Works across different screen sizes
- **Accessibility**: Full ARIA support and screen reader compatibility

## Usage

### Basic Usage

```tsx
import { CommandPalette, Command } from '@ui/components/enhanced/CommandPalette';

const commands: Command[] = [
  {
    id: 'home',
    label: 'Go to Home',
    description: 'Navigate to the home page',
    icon: <HomeIcon />,
    action: () => navigate('/'),
    category: 'Navigation',
  },
  {
    id: 'settings',
    label: 'Settings',
    description: 'Open application settings',
    icon: <SettingsIcon />,
    shortcut: 'Ctrl+,',
    action: () => navigate('/settings'),
    category: 'Navigation',
  },
];

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Command Palette</Button>
      <CommandPalette
        open={open}
        onClose={() => setOpen(false)}
        commands={commands}
        placeholder="Type a command or search..."
      />
    </>
  );
}
```

### With Recent Commands

```tsx
<CommandPalette
  open={open}
  onClose={() => setOpen(false)}
  commands={commands}
  showRecent
  recentCommands={['home', 'settings']}
  onCommandExecute={(command) => {
    console.log('Executed:', command.label);
    // Track recent commands
  }}
/>
```

## Props

### CommandPaletteProps

| Prop               | Type                         | Default               | Description                                                   |
| ------------------ | ---------------------------- | --------------------- | ------------------------------------------------------------- |
| `open`             | `boolean`                    | -                     | **Required.** Controls the visibility of the command palette  |
| `onClose`          | `() => void`                 | -                     | **Required.** Callback fired when the dialog should be closed |
| `commands`         | `Command[]`                  | -                     | **Required.** Array of available commands                     |
| `placeholder`      | `string`                     | `'Type a command...'` | Placeholder text for the search input                         |
| `width`            | `string`                     | -                     | Custom width for the command palette                          |
| `maxHeight`        | `string`                     | -                     | Maximum height for the command list                           |
| `showRecent`       | `boolean`                    | `false`               | Whether to show recent commands section                       |
| `recentCommands`   | `string[]`                   | -                     | Array of recent command IDs                                   |
| `onCommandExecute` | `(command: Command) => void` | -                     | Callback fired when a command is executed                     |

### Command Interface

| Property      | Type              | Description                                                |
| ------------- | ----------------- | ---------------------------------------------------------- |
| `id`          | `string`          | **Required.** Unique identifier for the command            |
| `label`       | `string`          | **Required.** Display label for the command                |
| `description` | `string`          | Optional description for the command                       |
| `icon`        | `React.ReactNode` | Optional icon to display                                   |
| `shortcut`    | `string`          | Optional keyboard shortcut display                         |
| `category`    | `string`          | Optional category for grouping commands                    |
| `action`      | `() => void`      | **Required.** Function to execute when command is selected |
| `keywords`    | `string[]`        | Optional additional search keywords                        |

## Accessibility

The CommandPalette component follows WCAG 2.1 AA guidelines:

- **Keyboard Navigation**: Full keyboard support with arrow keys, Enter, and Escape
- **Screen Reader**: ARIA labels and descriptions for all interactive elements
- **Focus Management**: Proper focus handling and restoration
- **High Contrast**: Supports high contrast themes
- **Color Independence**: Information not conveyed by color alone

### Keyboard Shortcuts

| Key       | Action                    |
| --------- | ------------------------- |
| `↑` / `↓` | Navigate between commands |
| `Enter`   | Execute selected command  |
| `Escape`  | Close command palette     |
| `Tab`     | Navigate between elements |

## Theming

The component integrates with MUI's theme system:

```tsx
const theme = createTheme({
  palette: {
    // Command palette uses theme colors
    background: {
      paper: '#ffffff', // Background color
    },
    divider: '#e0e0e0', // Border colors
  },
});
```

## Examples

### Developer Commands

```tsx
const developerCommands: Command[] = [
  {
    id: 'toggle-devtools',
    label: 'Toggle Developer Tools',
    icon: <CodeIcon />,
    shortcut: 'F12',
    action: () => console.log('Toggle DevTools'),
    category: 'Development',
  },
  {
    id: 'run-tests',
    label: 'Run Tests',
    icon: <BugReportIcon />,
    shortcut: 'Ctrl+T',
    action: () => console.log('Running tests'),
    category: 'Development',
  },
];
```

### E-commerce Commands

```tsx
const ecommerceCommands: Command[] = [
  {
    id: 'view-cart',
    label: 'View Shopping Cart',
    icon: <ShoppingCartIcon />,
    action: () => navigate('/cart'),
    category: 'Shopping',
  },
  {
    id: 'checkout',
    label: 'Proceed to Checkout',
    icon: <PaymentIcon />,
    action: () => navigate('/checkout'),
    category: 'Shopping',
  },
];
```

## Best Practices

1. **Keep Commands Focused**: Each command should perform a single, clear action
2. **Use Descriptive Labels**: Make command purposes immediately clear
3. **Group with Categories**: Use categories to organize related commands
4. **Provide Shortcuts**: Include keyboard shortcuts for frequently used commands
5. **Add Keywords**: Include alternative search terms in the keywords array
6. **Handle State**: Properly manage the open/close state and recent commands
7. **Performance**: For large command lists, consider virtualization or lazy loading

## Performance

- Uses `useMemo` for filtered results to optimize search performance
- Debounced search to prevent excessive filtering
- Efficient list rendering for large command sets
- Lazy loading of command icons when possible
