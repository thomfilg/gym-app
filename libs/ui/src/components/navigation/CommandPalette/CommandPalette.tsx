import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import { alpha, styled, useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import RecentIcon from '@mui/icons-material/History';
import EnterIcon from '@mui/icons-material/KeyboardReturn';
import SearchIcon from '@mui/icons-material/Search';
import type { TransitionProps } from '@mui/material/transitions';
import Fuse from 'fuse.js';
import type { FC} from 'react';
import React, { useCallback,useEffect, useMemo, useRef, useState } from 'react';

import { useDensitySpacing } from '../../../utils/density';
import type { CommandPaletteProps, PaletteCommand } from './CommandPalette.types';

// Base padding values in spacing units (4px base)
// These will be scaled by the density multiplier
const basePaddings = {
  searchContainer: { py: 2, px: 2 }, // 8px 8px at normal density
  resultsList: 1, // 4px at normal density
  commandItem: { py: 1, px: 1.5 }, // 4px 6px at normal density
  footer: 1, // 4px at normal density
};

// Styled components
const StyledDialog = styled(Dialog)(() => ({
  '& .MuiBackdrop-root': {
    backgroundColor: alpha('#000', 0.6),
    backdropFilter: 'blur(4px)',
  },
  '& .MuiDialog-paper': {
    position: 'fixed',
    top: '20%',
    margin: 0,
    maxHeight: 'none',
    background: 'transparent',
    boxShadow: 'none',
    overflow: 'visible',
  },
}));

const PaletteContainer = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: 640,
  background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.98)} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: `1px solid ${alpha(theme.palette.divider, 0.18)}`,
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
  boxShadow: theme.shadows[24],
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
  background: alpha(theme.palette.background.default, 0.4),
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
  flex: 1,
  fontSize: '1.125rem',
  fontWeight: 400,
  '& input': {
    padding: theme.spacing(0, 1),
    '&::placeholder': {
      color: theme.palette.text.secondary,
      opacity: 0.8,
    },
  },
}));

const ResultsList = styled(List)(({ theme }) => ({
  maxHeight: 400,
  overflowY: 'auto',
  padding: theme.spacing(1),
  '&::-webkit-scrollbar': {
    width: 8,
  },
  '&::-webkit-scrollbar-track': {
    background: alpha(theme.palette.action.disabled, 0.1),
  },
  '&::-webkit-scrollbar-thumb': {
    background: alpha(theme.palette.primary.main, 0.3),
    borderRadius: 4,
    '&:hover': {
      background: alpha(theme.palette.primary.main, 0.5),
    },
  },
}));

const CommandItem = styled(ListItem)<{ selected?: boolean }>(({ theme, selected }) => ({
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(0.5),
  transition: theme.transitions.create(['background-color', 'transform']),
  cursor: 'pointer',
  ...(selected && {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
    transform: 'translateX(4px)',
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.main,
    },
  }),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
  },
}));

const CategoryLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  fontWeight: 600,
  color: theme.palette.text.secondary,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  padding: theme.spacing(1, 2, 0.5, 2),
  marginTop: theme.spacing(1),
}));

const ShortcutChip = styled(Chip)(({ theme }) => ({
  height: 20,
  fontSize: '0.7rem',
  fontWeight: 600,
  background: alpha(theme.palette.action.disabled, 0.1),
  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
  '& .MuiChip-label': {
    padding: theme.spacing(0, 0.75),
  },
}));

const NoResults = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// Transition
const Transition = React.forwardRef<unknown, TransitionProps & { children: React.ReactElement }>(
  function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  },
);

// Main component
export const CommandPalette: FC<CommandPaletteProps> = ({
  open,
  onClose,
  commands,
  placeholder = 'Type a command or search...',
  width = '640px',
  maxHeight = '400px',
  showRecent = true,
  recentCommands = [],
  onCommandExecute,
  dataTestId = 'command-palette',
}) => {
  const theme = useTheme();
  const { spacingPx } = useDensitySpacing();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentCommandIds, setRecentCommandIds] = useState<string[]>(recentCommands);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<globalThis.HTMLUListElement>(null);

  // Initialize Fuse.js for fuzzy search
  const fuse = useMemo(
    () =>
      new Fuse(commands, {
        keys: ['label', 'description', 'keywords', 'category'],
        threshold: 0.3,
        includeScore: true,
      }),
    [commands],
  );

  // Filter commands based on search query
  const filteredCommands = useMemo(() => {
    if (!searchQuery) {
      // Show recent commands if no search query
      if (showRecent && recentCommandIds.length > 0) {
        const recentCmds = recentCommandIds
          .map((id) => commands.find((cmd) => cmd.id === id))
          .filter(Boolean) as PaletteCommand[];
        const otherCmds = commands.filter((cmd) => !recentCommandIds.includes(cmd.id));
        return [...recentCmds, ...otherCmds];
      }
      return commands;
    }

    const results = fuse.search(searchQuery);
    return results.map((result) => result.item);
  }, [searchQuery, commands, fuse, showRecent, recentCommandIds]);

  // Group commands by category
  const groupedCommands = useMemo(() => {
    const groups: Record<string, PaletteCommand[]> = {};

    filteredCommands.forEach((command) => {
      const category = command.category || 'General';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(command);
    });

    return groups;
  }, [filteredCommands]);

  // Reset selection when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  // Focus search input when dialog opens
  useEffect(() => {
    if (open) {
      window.setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      setSearchQuery('');
      setSelectedIndex(0);
    }
  }, [open]);

  const executeCommand = useCallback(
    (command: PaletteCommand) => {
      // Add to recent commands
      setRecentCommandIds((prev) => {
        const newRecent = [command.id, ...prev.filter((id) => id !== command.id)].slice(0, 5);
        return newRecent;
      });

      // Execute command action
      command.action();

      // Call callback if provided
      if (onCommandExecute) {
        onCommandExecute(command);
      }

      // Close palette
      onClose();
    },
    [onCommandExecute, onClose],
  );

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => (prev < filteredCommands.length - 1 ? prev + 1 : prev));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            executeCommand(filteredCommands[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, selectedIndex, filteredCommands, onClose, executeCommand]);

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const selectedElement = listRef.current.querySelector(
        `[data-index="${selectedIndex}"]`,
      ) as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }
  }, [selectedIndex]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Density-aware styles
  const searchContainerDensityStyles = {
    padding: `${spacingPx(basePaddings.searchContainer.py)} ${spacingPx(basePaddings.searchContainer.px)}`,
  };
  const resultsListDensityStyles = {
    padding: spacingPx(basePaddings.resultsList),
  };
  const commandItemDensityStyles = {
    padding: `${spacingPx(basePaddings.commandItem.py)} ${spacingPx(basePaddings.commandItem.px)}`,
  };
  const footerDensityStyles = {
    padding: spacingPx(basePaddings.footer),
  };

  const renderCommand = (command: PaletteCommand, index: number) => (
    <CommandItem
      key={command.id}
      data-index={index}
      data-testid={`${dataTestId}-item-${command.id}`}
      selected={index === selectedIndex}
      onClick={() => executeCommand(command)}
      onMouseEnter={() => setSelectedIndex(index)}
      sx={commandItemDensityStyles}
    >
      {command.icon && <ListItemIcon sx={{ minWidth: 40 }}>{command.icon}</ListItemIcon>}
      <ListItemText
        primary={command.label}
        secondary={command.description}
        primaryTypographyProps={{
          fontSize: '0.9rem',
          fontWeight: index === selectedIndex ? 500 : 400,
        }}
        secondaryTypographyProps={{
          fontSize: '0.75rem',
        }}
      />
      {command.shortcut && <ShortcutChip label={command.shortcut} size="small" />}
    </CommandItem>
  );

  let commandIndex = 0;

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      maxWidth={false}
      fullWidth
      data-testid={dataTestId}
    >
      <DialogContent sx={{ overflow: 'visible', p: 0 }}>
        <PaletteContainer elevation={24} sx={{ width, maxHeight }}>
          <SearchContainer sx={searchContainerDensityStyles}>
            <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
            <SearchInput
              ref={searchInputRef}
              placeholder={placeholder}
              value={searchQuery}
              onChange={handleSearchChange}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              inputProps={{ 'data-testid': `${dataTestId}-input` }}
            />
            <IconButton size="small" onClick={onClose} sx={{ ml: 1 }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </SearchContainer>

          {filteredCommands.length > 0 ? (
            <ResultsList ref={listRef} data-testid={`${dataTestId}-list`} sx={resultsListDensityStyles}>
              {!searchQuery && showRecent && recentCommandIds.length > 0 && (
                <>
                  <CategoryLabel data-testid={`${dataTestId}-group-recent`}>
                    <RecentIcon sx={{ fontSize: 14, mr: 0.5, verticalAlign: 'middle' }} />
                    Recent
                  </CategoryLabel>
                  {recentCommandIds
                    .map((id) => commands.find((cmd) => cmd.id === id))
                    .filter(Boolean)
                    .map((command) => {
                      const index = commandIndex++;
                      return renderCommand(command as PaletteCommand, index);
                    })}
                  {filteredCommands.length > recentCommandIds.length && <Divider sx={{ my: 1 }} />}
                </>
              )}

              {Object.entries(groupedCommands).map(([category, categoryCommands]) => (
                <Box key={category} data-testid={`${dataTestId}-group-${category.toLowerCase().replace(/\s+/g, '-')}`}>
                  {Object.keys(groupedCommands).length > 1 && (
                    <CategoryLabel data-testid={`${dataTestId}-group-label-${category.toLowerCase().replace(/\s+/g, '-')}`}>{category}</CategoryLabel>
                  )}
                  {categoryCommands.map((command) => {
                    const index = commandIndex++;
                    return renderCommand(command, index);
                  })}
                </Box>
              ))}
            </ResultsList>
          ) : (
            <NoResults data-testid={`${dataTestId}-no-results`}>
              <Typography variant="body2" color="text.secondary">
                No commands found for "{searchQuery}"
              </Typography>
              <Typography variant="caption" color="text.disabled" sx={{ mt: 1 }}>
                Try a different search term
              </Typography>
            </NoResults>
          )}

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              ...footerDensityStyles,
              borderTop: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
              background: alpha(theme.palette.background.default, 0.4),
            }}
          >
            <Box sx={{ display: 'flex', gap: 1 }}>
              <ShortcutChip
                icon={<EnterIcon sx={{ fontSize: 12 }} />}
                label="Execute"
                size="small"
              />
              <ShortcutChip label="↑↓ Navigate" size="small" />
              <ShortcutChip label="ESC Close" size="small" />
            </Box>
            <Typography variant="caption" color="text.secondary">
              {filteredCommands.length} commands
            </Typography>
          </Box>
        </PaletteContainer>
      </DialogContent>
    </StyledDialog>
  );
};

// Export default
export default CommandPalette;
