import Box from '@mui/material/Box';
import MoreVert from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import React from 'react';

import { Tooltip } from '../../data-display/Tooltip';
import { DropdownMenu } from './DropdownMenu';
import type { DropdownMenuItem, DropdownMenuProps } from './DropdownMenu.types';

const ActionButton = styled('button')<{ size?: 'sm' | 'md' | 'lg' }>(({ theme, size }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  borderRadius: '50%',
  padding: theme.spacing(size === 'sm' ? 0.5 : 1),
  color: theme.palette.action.active,
  opacity: 1,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:disabled': {
    cursor: 'default',
    opacity: 0.5,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));

export interface InlineActionsProps extends Omit<DropdownMenuProps, 'trigger'> {
  /**
   * Number of leading eligible items to render as inline icon buttons.
   * Eligible items must have an icon, onClick, and no special type (divider/header).
   * Remaining items are shown in the DropdownMenu behind a "more" trigger.
   * Defaults to 1.
   */
  inlineCount?: number;
}

/**
 * Composable wrapper around DropdownMenu that renders the first N eligible
 * items as inline icon buttons and puts the rest in a dropdown.
 *
 * If all items fit inline, no dropdown trigger is rendered.
 * If no items are eligible for inlining, renders a plain DropdownMenu.
 */
export const InlineActions = React.forwardRef<HTMLDivElement, InlineActionsProps>(
  ({ inlineCount = 1, items, size = 'md', ...rest }, ref) => {
    // Split items into inline-eligible vs the rest
    const inlined: DropdownMenuItem[] = [];
    const overflow: DropdownMenuItem[] = [];

    if (inlineCount > 0) {
      for (const item of items) {
        const eligible = item.icon && item.onClick && !item.type;
        if (eligible && inlined.length < inlineCount) {
          inlined.push(item);
        } else {
          overflow.push(item);
        }
      }
      // Don't show a dropdown for just 1 remaining eligible item — inline it too
      if (overflow.length === 1 && overflow[0].icon && overflow[0].onClick && !overflow[0].type) {
        inlined.push(overflow.pop()!);
      }
    }

    const moreTrigger = (
      <ActionButton size={size}>
        <MoreVert fontSize="small" />
      </ActionButton>
    );

    // Nothing to inline — render plain DropdownMenu
    if (inlined.length === 0) {
      return <DropdownMenu ref={ref} items={items} size={size} trigger={moreTrigger} {...rest} />;
    }

    return (
      <Box ref={ref} sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
        {inlined.map((item) => (
          <Tooltip key={item.id} title={item.label}>
            <ActionButton
              size={size}
              disabled={item.disabled}
              onClick={!item.disabled ? item.onClick : undefined}
              style={
                item.color && item.color !== 'default'
                  ? { color: 'inherit' }
                  : undefined
              }
              sx={
                item.color && item.color !== 'default'
                  ? { color: `${item.color}.main` }
                  : undefined
              }
            >
              {item.icon}
            </ActionButton>
          </Tooltip>
        ))}
        {overflow.length > 0 && (
          <DropdownMenu items={overflow} size={size} trigger={moreTrigger} {...rest} />
        )}
      </Box>
    );
  },
);

InlineActions.displayName = 'InlineActions';
