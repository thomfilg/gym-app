# Table Component

A comprehensive data table component with advanced features including sorting, filtering, pagination, row selection, virtual scrolling, and responsive design.

## Usage

```tsx
import { Table } from '@procurement/ui';

// Basic usage with columns and data
<Table
  columns={columns}
  data={data}
  sortable
  selectable
/>

// With MUI TableContainer (backward compatible)
<TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Email</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map(row => (
        <TableRow key={row.id}>
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.email}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
```

## Props

### Core Props

- **columns** `ColumnConfig[]` - Column definitions for the table
- **data** `any[]` - Array of data objects to display
- **variant** `'default' | 'striped' | 'glass' | 'minimal' | 'gradient'` - Visual style variant
- **density** `'compact' | 'normal' | 'comfortable'` - Row height/padding density

### Features

- **sortable** `boolean` - Enable column sorting functionality
- **sortConfig** `SortConfig` - Current sort configuration
- **onSortChange** `(key: string, direction: 'asc' | 'desc') => void` - Sort change handler
- **selectable** `boolean` - Enable row selection
- **selectedRows** `(string | number)[]` - Currently selected row IDs
- **onSelectionChange** `(rows: (string | number)[]) => void` - Selection change handler
- **stickyHeader** `boolean` - Keep header fixed when scrolling
- **responsive** `boolean` - Enable responsive column hiding
- **virtualScrolling** `boolean` - Enable virtual scrolling for large datasets
- **loading** `boolean` - Show loading state
- **hoverable** `boolean` - Enable row hover effects

### Visual Effects

- **glow** `boolean` - Add glow effect to the table
- **pulse** `boolean` - Add pulse animation effect
- **glass** `boolean` - Apply glassmorphism effect

### Container Props

- **containerHeight** `number` - Fixed height for scrollable container
- **rowHeight** `number` - Height per row (for virtual scrolling)
- **overscan** `number` - Number of rows to render outside viewport

### Column Configuration

```tsx
interface ColumnConfig {
  key: string;
  label: string;
  sortable?: boolean;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  priority?: number; // For responsive hiding
  render?: (value: any, rowData: any) => React.ReactNode;
}
```

## Features

### Sorting
Enable sortable columns with click-to-sort functionality:

```tsx
<Table
  columns={columns}
  data={data}
  sortable
  sortConfig={sortConfig}
  onSortChange={(key, direction) => handleSort(key, direction)}
/>
```

### Row Selection
Support single or multiple row selection:

```tsx
<Table
  columns={columns}
  data={data}
  selectable
  selectedRows={selectedRows}
  onSelectionChange={setSelectedRows}
/>
```

### Virtual Scrolling
Handle large datasets efficiently:

```tsx
<Table
  columns={columns}
  data={largeDataset} // 10,000+ rows
  virtualScrolling
  rowHeight={52}
  containerHeight={400}
  overscan={10}
/>
```

### Responsive Design
Automatically hide/show columns based on viewport:

```tsx
<Table
  columns={columns}
  data={data}
  responsive
  columnPriorities={[1, 2, 3, 4, 5]}
  showColumnToggle
/>
```

### Custom Cell Rendering
Customize how cells are rendered:

```tsx
const columns = [
  {
    key: 'status',
    label: 'Status',
    render: (value) => (
      <Chip 
        label={value} 
        color={value === 'Active' ? 'success' : 'default'}
      />
    )
  }
];
```

## Variants

- **default** - Standard table appearance
- **striped** - Alternating row backgrounds
- **glass** - Glassmorphism effect with transparency
- **minimal** - Clean, minimal borders
- **gradient** - Gradient background effect

## Density Options

- **compact** - Reduced padding for more data density
- **normal** - Standard padding (default)
- **comfortable** - Extra padding for improved readability

## Accessibility

- Proper `role="table"` attributes
- `aria-sort` for sortable columns
- `aria-selected` for selectable rows
- Keyboard navigation support (Tab, Arrow keys)
- Screen reader announcements for interactions
- Focus management for interactive elements

## Best Practices

1. **Large Datasets**: Use virtual scrolling for datasets over 100 rows
2. **Responsive Tables**: Set column priorities based on importance
3. **Custom Rendering**: Use render functions for complex cell content
4. **Performance**: Enable `virtualScrolling` for large datasets
5. **Accessibility**: Always provide column labels and proper ARIA attributes
6. **Loading States**: Show loading indicator during data fetching
7. **Empty States**: Provide meaningful empty state messages

## Examples

### Complete Feature Set
```tsx
<Table
  columns={columns}
  data={data}
  
  // Features
  sortable
  selectable
  stickyHeader
  responsive
  virtualScrolling
  
  // Visual
  variant="gradient"
  density="comfortable"
  glow
  hoverable
  
  // Handlers
  onSortChange={handleSort}
  onSelectionChange={handleSelection}
  onRowClick={handleRowClick}
  
  // Container
  containerHeight={400}
/>
```

### Backward Compatible Usage
```tsx
<TableContainer>
  <Table variant="striped" hoverable>
    <TableHead>
      <TableRow>
        <TableCell>Header 1</TableCell>
        <TableCell>Header 2</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>Data 1</TableCell>
        <TableCell>Data 2</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</TableContainer>
```