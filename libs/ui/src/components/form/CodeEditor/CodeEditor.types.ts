// Types for CodeEditor component

export type EditorLanguage = 'json' | 'javascript' | 'typescript' | 'css' | 'html' | 'yaml' | 'markdown' | 'sql' | 'python';

export type EditorTheme = 'light' | 'dark' | 'auto';

export interface CodeEditorProps {
  /** Programming language for syntax highlighting */
  language: EditorLanguage;
  /** Editor height (default: '400px') */
  height?: string;
  /** Editor color theme (default: 'auto') */
  theme?: EditorTheme;
  /** Current code content */
  value: string;
  /** Callback when content changes */
  onChange?: (value: string) => void;
  /** Read-only mode (default: false) */
  readOnly?: boolean;
  /** Show line numbers (default: true) */
  lineNumbers?: boolean;
  /** Show minimap navigation (default: false) */
  minimap?: boolean;
  /** Font size for the editor (default: 14) */
  fontSize?: number;
  /** Enable word wrapping (default: false) */
  wordWrap?: boolean;
  /** Display toolbar with actions (default: true) */
  showToolbar?: boolean;
  /** Auto-format code on load (default: false) */
  autoFormat?: boolean;
  /** Placeholder text when empty */
  placeholder?: string;
  /** Callback for Ctrl+S save action */
  onSave?: (value: string) => void;
  /** Test ID for testing purposes (default: 'code-editor') */
  dataTestId?: string;
}