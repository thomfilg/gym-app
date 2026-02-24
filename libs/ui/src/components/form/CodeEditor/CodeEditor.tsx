import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { alpha, styled, useTheme } from '@mui/material/styles';
import type { Monaco } from '@monaco-editor/react';
import Editor from '@monaco-editor/react';
import CodeIcon from '@mui/icons-material/Code';
import CopyIcon from '@mui/icons-material/ContentCopy';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import ExitFullscreenIcon from '@mui/icons-material/FullscreenExit';
import WrapIcon from '@mui/icons-material/WrapText';
import type { editor } from 'monaco-editor';
import type { FC} from 'react';
import React, { useEffect,useRef } from 'react';

import { useDensitySpacing } from '../../../utils/density';
import type { CodeEditorProps } from './CodeEditor.types';

// Styled components
const EditorContainer = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.98)} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(theme.palette.divider, 0.18)}`,
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
}));

const Toolbar = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1, 2),
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
  background: alpha(theme.palette.background.default, 0.4),
}));

const LanguageBadge = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
  background: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  fontSize: '0.75rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
}));

const EditorWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'fullscreen',
})<{ fullscreen: boolean }>(({ theme, fullscreen }) => ({
  position: 'relative',
  flex: 1,
  minHeight: 200,
  ...(fullscreen && {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: theme.zIndex.modal,
    background: theme.palette.background.paper,
  }),
}));

const PlaceholderOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  left: theme.spacing(8),
  color: theme.palette.text.disabled,
  fontFamily: 'Monaco, Menlo, "Ubuntu Mono", Consolas, source-code-pro, monospace',
  fontSize: '0.875rem',
  pointerEvents: 'none',
  userSelect: 'none',
}));

// Monaco editor themes
const customLightTheme = {
  base: 'vs' as const,
  inherit: true,
  rules: [
    { token: 'comment', foreground: '6A737D', fontStyle: 'italic' },
    { token: 'keyword', foreground: 'D73A49' },
    { token: 'string', foreground: '032F62' },
    { token: 'number', foreground: '005CC5' },
  ],
  colors: {
    'editor.background': '#FFFFFF',
    'editor.foreground': '#24292E',
    'editor.lineHighlightBackground': '#F6F8FA',
    'editorLineNumber.foreground': '#959DA5',
    'editorIndentGuide.background': '#D1D5DA',
    'editor.selectionBackground': '#C8E1FF',
  },
};

const customDarkTheme = {
  base: 'vs-dark' as const,
  inherit: true,
  rules: [
    { token: 'comment', foreground: '6A737D', fontStyle: 'italic' },
    { token: 'keyword', foreground: 'F97583' },
    { token: 'string', foreground: '9ECBFF' },
    { token: 'number', foreground: '79B8FF' },
  ],
  colors: {
    'editor.background': '#0D1117',
    'editor.foreground': '#C9D1D9',
    'editor.lineHighlightBackground': '#161B22',
    'editorLineNumber.foreground': '#8B949E',
    'editorIndentGuide.background': '#21262D',
    'editor.selectionBackground': '#3392FF44',
  },
};

// Main component
export const CodeEditor: FC<CodeEditorProps> = ({
  language,
  height = '400px',
  theme: themeProp = 'auto',
  value,
  onChange,
  readOnly = false,
  lineNumbers = true,
  minimap = false,
  fontSize = 14,
  wordWrap = false,
  showToolbar = true,
  autoFormat = false,
  placeholder,
  onSave,
  dataTestId,
}) => {
  const theme = useTheme();
  const { spacing } = useDensitySpacing();
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<Monaco | null>(null);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [isWrapped, setIsWrapped] = React.useState(wordWrap);
  const [isCopied, setIsCopied] = React.useState(false);

  // Determine theme
  const editorTheme = React.useMemo(() => {
    if (themeProp === 'auto') {
      return theme.palette.mode === 'dark' ? 'custom-dark' : 'custom-light';
    }
    return themeProp === 'dark' ? 'custom-dark' : 'custom-light';
  }, [themeProp, theme.palette.mode]);

  // Handle editor mount
  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Define custom themes
    monaco.editor.defineTheme('custom-light', customLightTheme);
    monaco.editor.defineTheme('custom-dark', customDarkTheme);

    // Configure TypeScript compiler options for better test compatibility
    try {
      // Ensure TypeScript language is registered
      const languages = monaco.languages.getLanguages();
      const tsLanguage = languages.find((lang) => lang.id === 'typescript');

      if (tsLanguage) {
        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
          target: monaco.languages.typescript.ScriptTarget.ES2020,
          allowNonTsExtensions: true,
          moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
          module: monaco.languages.typescript.ModuleKind.CommonJS,
          noEmit: true,
          esModuleInterop: true,
          jsx: monaco.languages.typescript.JsxEmit.React,
          reactNamespace: 'React',
          allowJs: true,
          typeRoots: ['node_modules/@types'],
        });

        // Set diagnostic options to be less strict in test environments
        monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
          noSemanticValidation: false,
          noSyntaxValidation: false,
          noSuggestionDiagnostics: true,
        });
      }
    } catch {
      // Silently handle any TypeScript configuration errors in test environments
    }

    // Auto format on mount if enabled
    if (autoFormat && !readOnly) {
      window.setTimeout(() => {
        editor.getAction('editor.action.formatDocument')?.run();
      }, 100);
    }

    // Add save shortcut
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      if (onSave) {
        const currentValue = editor.getValue();
        onSave(currentValue);
      }
    });
  };

  // Handle copy to clipboard
  const handleCopy = async () => {
    if (editorRef.current) {
      const text = editorRef.current.getValue();

      // Check if clipboard API is available (may not be in test environments)
      if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
          await navigator.clipboard.writeText(text);
          setIsCopied(true);
          window.setTimeout(() => setIsCopied(false), 2000);
        } catch {
          // Silently handle clipboard errors in test environments
        }
      } else {
        // Fallback for environments without clipboard API
        // console.warn('Clipboard API not available');
      }
    }
  };

  // Handle fullscreen toggle
  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Handle word wrap toggle
  const handleWrapToggle = () => {
    setIsWrapped(!isWrapped);
    if (editorRef.current) {
      editorRef.current.updateOptions({
        wordWrap: !isWrapped ? 'on' : 'off',
      });
    }
  };

  // Handle format document
  const handleFormat = () => {
    if (editorRef.current && !readOnly) {
      editorRef.current.getAction('editor.action.formatDocument')?.run();
    }
  };

  // Handle ESC key in fullscreen
  useEffect(() => {
    if (isFullscreen) {
      const handleEsc = (e: globalThis.KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsFullscreen(false);
        }
      };
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [isFullscreen]);

  const editorOptions: editor.IStandaloneEditorConstructionOptions = {
    readOnly,
    // Explicitly convert minimap to boolean to ensure Monaco receives a definitive value
    // This prevents undefined from being interpreted differently in various environments
    minimap: { enabled: minimap === true },
    fontSize,
    wordWrap: isWrapped ? 'on' : 'off',
    lineNumbers: lineNumbers ? 'on' : 'off',
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 2,
    insertSpaces: true,
    folding: true,
    foldingStrategy: 'indentation',
    showFoldingControls: 'mouseover',
    smoothScrolling: true,
    cursorBlinking: 'smooth',
    cursorSmoothCaretAnimation: 'on',
    renderWhitespace: 'selection',
    renderLineHighlight: 'all',
    selectOnLineNumbers: true,
    roundedSelection: true,
    padding: { top: 16, bottom: 16 },
    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", Consolas, source-code-pro, monospace',
    fontLigatures: true,
  };

  return (
    <EditorContainer elevation={2} data-testid={dataTestId || 'code-editor'}>
      {showToolbar && (
        <Toolbar data-testid={dataTestId ? `${dataTestId}-toolbar` : 'code-editor-toolbar'}>
          {/* Base: 8px spacing between items, scales with density */}
          <Stack direction="row" spacing={spacing(2)} alignItems="center">
            <LanguageBadge
              data-testid={
                dataTestId ? `${dataTestId}-language-badge` : 'code-editor-language-badge'
              }
            >
              <CodeIcon sx={{ fontSize: 14 }} />
              {language}
            </LanguageBadge>
            {readOnly && (
              <Typography variant="caption" color="text.secondary">
                Read Only
              </Typography>
            )}
          </Stack>

          {/* Base: 4px spacing between buttons, scales with density */}
          <Stack direction="row" spacing={spacing(1)}>
            {!readOnly && (
              <Tooltip title="Format Code (Ctrl+Shift+F)">
                <IconButton
                  size="small"
                  onClick={handleFormat}
                  data-testid={dataTestId ? `${dataTestId}-format-btn` : 'code-editor-format-btn'}
                >
                  <CodeIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}

            <Tooltip title={isWrapped ? 'Disable Word Wrap' : 'Enable Word Wrap'}>
              <IconButton
                size="small"
                onClick={handleWrapToggle}
                color={isWrapped ? 'primary' : 'default'}
                data-testid={dataTestId ? `${dataTestId}-wrap-btn` : 'code-editor-wrap-btn'}
              >
                <WrapIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title={isCopied ? 'Copied!' : 'Copy to Clipboard'}>
              <IconButton
                size="small"
                onClick={handleCopy}
                color={isCopied ? 'success' : 'default'}
                data-testid={dataTestId ? `${dataTestId}-copy-btn` : 'code-editor-copy-btn'}
              >
                <CopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}>
              <IconButton
                size="small"
                onClick={handleFullscreenToggle}
                data-testid={
                  dataTestId ? `${dataTestId}-fullscreen-btn` : 'code-editor-fullscreen-btn'
                }
              >
                {isFullscreen ? (
                  <ExitFullscreenIcon fontSize="small" />
                ) : (
                  <FullscreenIcon fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
          </Stack>
        </Toolbar>
      )}

      <EditorWrapper
        fullscreen={isFullscreen}
        data-testid={dataTestId ? `${dataTestId}-editor-wrapper` : 'code-editor-editor-wrapper'}
      >
        {placeholder && !value && (
          <PlaceholderOverlay
            data-testid={dataTestId ? `${dataTestId}-placeholder` : 'code-editor-placeholder'}
          >
            {placeholder}
          </PlaceholderOverlay>
        )}

        <Editor
          height={isFullscreen ? '100vh' : height}
          language={language}
          value={value}
          onChange={(newValue) => onChange?.(newValue || '')}
          theme={editorTheme}
          options={editorOptions}
          onMount={handleEditorDidMount}
          loading={
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: 'text.secondary',
              }}
            >
              <Typography variant="body2">Loading editor...</Typography>
            </Box>
          }
        />
      </EditorWrapper>
    </EditorContainer>
  );
};

// Export default
export default CodeEditor;
