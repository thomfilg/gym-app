# Chip Component

**Purpose:** Compact tag/label with optional avatar, selection, and deletion.

```ts
interface ChipProps {
  label: string;
  variant?: 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  color?: ColorValue; // theme token
  avatarSrc?: string; // or avatar node via `avatar`
  avatar?: React.ReactNode;
  icon?: React.ReactNode; // leading icon
  selected?: boolean;
  selectable?: boolean;
  deletable?: boolean;
  disabled?: boolean;

  onClick?: () => void; // select/toggle
  onDelete?: () => void; // shown when deletable
  className?: string;
}
```

**Features**

- Filled/Outlined variants; optional avatar or icon.
- Selectable (toggle) and/or deletable (× button).
- Keyboard: Space/Enter activates; Delete/Backspace triggers remove when focused.

**A11y**

- `role="option"` when in a listbox; otherwise `button` if clickable.
- Delete control labeled via `aria-label="Remove <label>"`.

**Stories / Tests**

- Filled/Outlined; With avatar; Selectable; Deletable; Disabled; Keyboard remove.

## Testing

### Test IDs

The Chip component provides test IDs for all interactive and visual elements:

| Element | Default Test ID | With Custom dataTestId |
|---------|----------------|----------------------|
| Chip container | `chip` | `{dataTestId}` |
| Chip icon | `chip-icon` | `{dataTestId}-icon` |
| Chip label | `chip-label` | `{dataTestId}-label` |
| Delete button | `chip-delete` | `{dataTestId}-delete` |

**Usage Example:**

```tsx
<Chip
  label="Status: Active"
  dataTestId="status-chip"
  deletable
  icon={<CheckIcon />}
/>

// Query in tests:
getByTestId('status-chip')          // Chip container
getByTestId('status-chip-icon')     // Icon element
getByTestId('status-chip-label')    // Label text
getByTestId('status-chip-delete')   // Delete button
```

### Testing Best Practices

#### 1. Test Chip Interactions

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Chip } from './Chip';

test('handles click interactions', async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn();

  render(
    <Chip
      label="Clickable"
      dataTestId="test-chip"
      onClick={handleClick}
    />
  );

  const chip = screen.getByTestId('test-chip');
  await user.click(chip);

  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

#### 2. Test Deletion Functionality

```tsx
test('handles delete action', async () => {
  const user = userEvent.setup();
  const handleDelete = vi.fn();

  render(
    <Chip
      label="Removable"
      dataTestId="remove-chip"
      deletable
      onDelete={handleDelete}
    />
  );

  const deleteButton = screen.getByTestId('remove-chip-delete');
  await user.click(deleteButton);

  expect(handleDelete).toHaveBeenCalled();
});
```

#### 3. Test Keyboard Navigation

```tsx
test('supports keyboard deletion', async () => {
  const user = userEvent.setup();
  const handleDelete = vi.fn();

  render(
    <Chip
      label="Keyboard Test"
      dataTestId="kb-chip"
      deletable
      onDelete={handleDelete}
    />
  );

  const chip = screen.getByTestId('kb-chip');
  chip.focus();
  await user.keyboard('{Delete}');

  expect(handleDelete).toHaveBeenCalled();
});
```

#### 4. Test Selection State

```tsx
test('reflects selection state', () => {
  const { rerender } = render(
    <Chip
      label="Selectable"
      dataTestId="select-chip"
      selectable
      selected={false}
    />
  );

  const chip = screen.getByTestId('select-chip');
  expect(chip).toHaveAttribute('aria-selected', 'false');

  rerender(
    <Chip
      label="Selectable"
      dataTestId="select-chip"
      selectable
      selected={true}
    />
  );

  expect(chip).toHaveAttribute('aria-selected', 'true');
});
```

#### 5. Test Icon and Avatar Rendering

```tsx
test('renders icon correctly', () => {
  render(
    <Chip
      label="With Icon"
      dataTestId="icon-chip"
      icon={<span>🎨</span>}
    />
  );

  const icon = screen.getByTestId('icon-chip-icon');
  expect(icon).toBeInTheDocument();
});

test('renders avatar correctly', () => {
  render(
    <Chip
      label="User"
      dataTestId="avatar-chip"
      avatarSrc="/avatar.jpg"
    />
  );

  const chip = screen.getByTestId('avatar-chip');
  expect(chip).toBeInTheDocument();
});
```

#### 6. Test Disabled State

```tsx
test('disables interactions when disabled', async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn();

  render(
    <Chip
      label="Disabled"
      dataTestId="disabled-chip"
      disabled
      onClick={handleClick}
    />
  );

  const chip = screen.getByTestId('disabled-chip');
  await user.click(chip);

  expect(handleClick).not.toHaveBeenCalled();
  expect(chip).toHaveAttribute('disabled');
});
```

### Common Test Scenarios

#### Filter Chips

```tsx
test('filter chip group interaction', async () => {
  const user = userEvent.setup();
  const filters = ['All', 'Active', 'Inactive'];
  const [selected, setSelected] = React.useState('All');

  render(
    <div>
      {filters.map(filter => (
        <Chip
          key={filter}
          label={filter}
          dataTestId={`filter-${filter.toLowerCase()}`}
          selectable
          selected={selected === filter}
          onClick={() => setSelected(filter)}
        />
      ))}
    </div>
  );

  const activeChip = screen.getByTestId('filter-active');
  await user.click(activeChip);

  expect(activeChip).toHaveAttribute('aria-selected', 'true');
});
```

#### Tag Management

```tsx
test('tag removal in list', async () => {
  const user = userEvent.setup();
  const tags = ['React', 'TypeScript', 'Testing'];
  const [currentTags, setCurrentTags] = React.useState(tags);

  const handleRemove = (tag: string) => {
    setCurrentTags(prev => prev.filter(t => t !== tag));
  };

  render(
    <div>
      {currentTags.map(tag => (
        <Chip
          key={tag}
          label={tag}
          dataTestId={`tag-${tag.toLowerCase()}`}
          deletable
          onDelete={() => handleRemove(tag)}
        />
      ))}
    </div>
  );

  const deleteButton = screen.getByTestId('tag-react-delete');
  await user.click(deleteButton);

  expect(screen.queryByTestId('tag-react')).not.toBeInTheDocument();
});
```

#### Status Indicators

```tsx
test('status chip with color coding', () => {
  const statuses = [
    { label: 'Success', color: 'success', testId: 'status-success' },
    { label: 'Error', color: 'error', testId: 'status-error' },
    { label: 'Warning', color: 'warning', testId: 'status-warning' },
  ];

  render(
    <div>
      {statuses.map(status => (
        <Chip
          key={status.testId}
          label={status.label}
          color={status.color}
          dataTestId={status.testId}
        />
      ))}
    </div>
  );

  expect(screen.getByTestId('status-success')).toBeInTheDocument();
  expect(screen.getByTestId('status-error')).toBeInTheDocument();
  expect(screen.getByTestId('status-warning')).toBeInTheDocument();
});
```

### Accessibility Testing

```tsx
test('has correct ARIA attributes', () => {
  render(
    <Chip
      label="Accessible"
      dataTestId="a11y-chip"
      selectable
      selected={true}
    />
  );

  const chip = screen.getByTestId('a11y-chip');
  expect(chip).toHaveAttribute('role', 'option');
  expect(chip).toHaveAttribute('aria-selected', 'true');
});

test('delete button is accessible', () => {
  render(
    <Chip
      label="Remove Me"
      dataTestId="delete-chip"
      deletable
      onDelete={() => {}}
    />
  );

  const deleteButton = screen.getByTestId('delete-chip-delete');
  expect(deleteButton).toBeInTheDocument();
});
```

### Integration Testing

```tsx
test('works within a chip group', async () => {
  const user = userEvent.setup();
  const options = ['Option 1', 'Option 2', 'Option 3'];
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

  const toggleOption = (option: string) => {
    setSelectedOptions(prev =>
      prev.includes(option)
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
  };

  render(
    <div role="listbox">
      {options.map(option => (
        <Chip
          key={option}
          label={option}
          dataTestId={`option-${option.replace(/\s/g, '-').toLowerCase()}`}
          selectable
          selected={selectedOptions.includes(option)}
          onClick={() => toggleOption(option)}
        />
      ))}
    </div>
  );

  const option1 = screen.getByTestId('option-option-1');
  await user.click(option1);
  expect(option1).toHaveAttribute('aria-selected', 'true');

  const option2 = screen.getByTestId('option-option-2');
  await user.click(option2);
  expect(option2).toHaveAttribute('aria-selected', 'true');
  expect(option1).toHaveAttribute('aria-selected', 'true');
});
```
