import type React from 'react';

export interface PaletteCommand {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  shortcut?: string;
  category?: string;
  action: () => void;
  keywords?: string[];
}

export interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  commands: PaletteCommand[];
  placeholder?: string;
  width?: string;
  maxHeight?: string;
  showRecent?: boolean;
  recentCommands?: string[];
  onCommandExecute?: (command: PaletteCommand) => void;
  dataTestId?: string;
}
