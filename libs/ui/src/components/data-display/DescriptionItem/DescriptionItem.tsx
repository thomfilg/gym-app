import Box from '@mui/material/Box';
import type { ReactNode } from 'react';

import { useDensitySpacing } from '../../../utils/density';
import { Text } from '../../typography/Text/Text';

export interface DescriptionItemProps {
  /**
   * The label text to display
   */
  label: string;

  /**
   * The value to display - can be text, number, or any React node
   */
  value: ReactNode;

  /**
   * Layout orientation
   * - `vertical`: Label above value (default)
   * - `horizontal`: Label and value side by side
   */
  orientation?: 'vertical' | 'horizontal';

  /**
   * Optional CSS class name
   */
  className?: string;

  /**
   * Test ID for testing purposes
   */
  'data-testid'?: string;
}

/**
 * DescriptionItem - A label-value pair component for displaying read-only information
 *
 * Used for displaying structured metadata, properties, or descriptive information
 * in a consistent vertical layout with a label above the value.
 *
 * @example
 * ```tsx
 * <DescriptionItem
 *   label="Incident ID"
 *   value="INC-12345"
 * />
 * ```
 *
 * @example
 * ```tsx
 * <DescriptionItem
 *   label="Status"
 *   value={<Chip label="Active" color="success" />}
 * />
 * ```
 */
export const DescriptionItem: React.FC<DescriptionItemProps> = ({
  label,
  value,
  orientation = 'vertical',
  className,
  'data-testid': dataTestId,
}) => {
  const { spacingPx, spacing } = useDensitySpacing();

  return (
    <Box
      className={className}
      sx={{
        display: 'flex',
        flexDirection: orientation === 'vertical' ? 'column' : 'row',
        alignItems: orientation === 'horizontal' ? 'center' : 'flex-start',
        gap: orientation === 'horizontal' ? spacing(1) : 0, // Base: 4px, scales with density
      }}
      data-testid={dataTestId || 'description-item'}
    >
      <Text
        variant="caption"
        size="xs"
        color="secondary"
        style={{
          textTransform: 'uppercase',
          marginBottom: orientation === 'vertical' ? spacingPx(0.5) : 0, // Base: 2px, scales with density
          minWidth: orientation === 'horizontal' ? 'fit-content' : undefined,
          flexShrink: orientation === 'horizontal' ? 0 : undefined,
        }}
        data-testid={dataTestId ? `${dataTestId}-label` : 'description-item-label'}
      >
        {label}
      </Text>
      <Box data-testid={dataTestId ? `${dataTestId}-value` : 'description-item-value'}>
        {typeof value === 'string' || typeof value === 'number' ? (
          <Text variant="body" size="sm" weight="semibold">
            {value}
          </Text>
        ) : (
          value
        )}
      </Box>
    </Box>
  );
};

DescriptionItem.displayName = 'DescriptionItem';
