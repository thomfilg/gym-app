export type { CreateRenderRowOptions } from './createRenderRow';
export { createRenderRow } from './createRenderRow';
export { Table } from './Table';
export type { ColumnConfig, TableProps, TableStripeColor } from './Table.types';

// Re-export MUI table primitives for custom row rendering
// This avoids apps needing to import directly from @mui/material
export { default as IconButton } from '@mui/material/IconButton';
export { default as TableBody } from '@mui/material/TableBody';
export { default as TableCell } from '@mui/material/TableCell';
export { default as TableHead } from '@mui/material/TableHead';
export { default as TableRow } from '@mui/material/TableRow';
