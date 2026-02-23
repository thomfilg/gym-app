import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Tooltip from '@mui/material/Tooltip';
import { alpha, keyframes } from '@mui/material/styles';
import Code from '@mui/icons-material/Code';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatColorFill from '@mui/icons-material/FormatColorFill';
import FormatColorText from '@mui/icons-material/FormatColorText';
import FormatItalic from '@mui/icons-material/FormatItalic';
import FormatListBulleted from '@mui/icons-material/FormatListBulleted';
import FormatListNumbered from '@mui/icons-material/FormatListNumbered';
import FormatQuote from '@mui/icons-material/FormatQuote';
import FormatUnderlined from '@mui/icons-material/FormatUnderlined';
import Link from '@mui/icons-material/Link';
import type { Theme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import React, { useEffect,useRef, useState } from 'react';

import { useDensitySpacing } from '../../../utils/density';
import type { TextareaProps } from './Textarea.types';

// Interface for styled component props
interface StyledTextareaProps {
  customVariant?: string;
  customColor?: string;
  customSize?: string;
  glow?: boolean;
  glass?: boolean;
  gradient?: boolean;
  error?: boolean;
  theme?: Theme;
}

// Glow animation for enhanced visual effects
const glowAnimation = keyframes`
  0% {
    box-shadow: 0 0 5px currentColor;
  }
  50% {
    box-shadow: 0 0 20px currentColor, 0 0 30px currentColor;
  }
  100% {
    box-shadow: 0 0 5px currentColor;
  }
`;

// Ripple animation for buttons (commented out - not currently used)
// const rippleAnimation = keyframes`
//   0% {
//     transform: scale(0);
//     opacity: 1;
//   }
//   100% {
//     transform: scale(4);
//     opacity: 0;
//   }
// `;

// Float animation for rich text toolbar
const floatAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-3px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const getColorFromTheme = (theme: Theme, color: string) => {
  if (color === 'neutral') {
    const grey = theme.palette.grey as unknown as Record<number, string>;
    return {
      main: grey?.[700] || '#616161',
      dark: grey?.[800] || '#424242',
      light: grey?.[500] || '#9e9e9e',
      contrastText: '#fff',
    };
  }

  const colorMap: Record<
  string,
  { main: string; dark?: string; light?: string; contrastText?: string }
  > = {
    primary: theme.palette.primary,
    secondary: theme.palette.secondary,
    success: theme.palette.success,
    warning: theme.palette.warning,
    danger: theme.palette.error,
  };

  const palette = colorMap[color] || theme.palette.primary;

  // Ensure palette has required properties
  return {
    main: palette?.main || theme.palette.primary.main,
    dark: palette?.dark || palette?.main || theme.palette.primary.dark,
    light: palette?.light || palette?.main || theme.palette.primary.light,
    contrastText: palette?.contrastText || '#fff',
  };
};

const StyledTextarea = styled(TextareaAutosize, {
  shouldForwardProp: (prop) =>
    !['customVariant', 'customColor', 'customSize', 'glow', 'glass', 'gradient', 'error'].includes(
      prop as string,
    ),
})<StyledTextareaProps>(({
  theme,
  customVariant,
  customColor = 'primary',
  customSize = 'md',
  glow,
  glass,
  gradient,
  error,
}) => {
  if (!theme) return {};
  const colorPalette = getColorFromTheme(theme, customColor);
  const errorColor = theme.palette.error;

  // Font sizes and minHeight remain constant (not affected by density)
  // Padding will be applied via style prop for density scaling
  const fontSizeMap = {
    xs: { fontSize: '0.75rem', minHeight: '60px' },
    sm: { fontSize: '0.875rem', minHeight: '80px' },
    md: { fontSize: '1rem', minHeight: '100px' },
    lg: { fontSize: '1.125rem', minHeight: '120px' },
    xl: { fontSize: '1.25rem', minHeight: '140px' },
  };

  const baseStyles = {
    width: '100%',
    fontFamily: theme.typography.fontFamily,
    borderRadius: theme.spacing(1),
    border: `2px solid ${error ? errorColor.main : theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    transition: 'all 0.3s ease',
    resize: customVariant === 'resizable' ? 'vertical' : 'none',
    outline: 'none',
    // Padding is applied dynamically via style prop for density scaling
    ...fontSizeMap[customSize as keyof typeof fontSizeMap],

    '&::placeholder': {
      color: theme.palette.text.secondary,
      opacity: 0.7,
    },

    '&:hover': {
      borderColor: error ? errorColor.dark : colorPalette.main,
      backgroundColor: alpha(theme.palette.background.paper, 0.8),
    },

    '&:focus': {
      borderColor: error ? errorColor.main : colorPalette.main,
      backgroundColor: theme.palette.background.paper,
      boxShadow: `0 0 0 3px ${alpha(error ? errorColor.main : colorPalette.main, 0.1)}`,
    },
  };

  // Glass morphism effect
  const glassStyles = glass
    ? {
      backgroundColor: alpha(theme.palette.background.paper, 0.1),
      backdropFilter: 'blur(20px)',
      border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
      '&:hover': {
        backgroundColor: alpha(theme.palette.background.paper, 0.15),
        backdropFilter: 'blur(25px)',
      },
      '&:focus': {
        backgroundColor: alpha(theme.palette.background.paper, 0.2),
        backdropFilter: 'blur(30px)',
      },
    }
    : {};

  // Gradient border effect
  const gradientStyles = gradient
    ? {
      background: `linear-gradient(${theme.palette.background.paper}, ${theme.palette.background.paper}) padding-box,
                 linear-gradient(135deg, ${colorPalette.main}, ${colorPalette.light}) border-box`,
      border: '2px solid transparent',
      '&:focus': {
        background: `linear-gradient(${theme.palette.background.paper}, ${theme.palette.background.paper}) padding-box,
                   linear-gradient(135deg, ${colorPalette.main}, ${colorPalette.dark}) border-box`,
      },
    }
    : {};

  // Glow effect
  const glowStyles = glow
    ? {
      animation: `${glowAnimation} 2s ease-in-out infinite`,
      boxShadow: `0 0 10px ${alpha(colorPalette.main, 0.3)}`,
    }
    : {};

  return {
    ...baseStyles,
    ...glassStyles,
    ...gradientStyles,
    ...glowStyles,
  };
});

const StyledLabel = styled(InputLabel, {
  shouldForwardProp: (prop) => !['glass', 'error'].includes(prop as string),
})<{ glass?: boolean; error?: boolean }>(({ theme, glass, error }) => ({
  marginBottom: theme.spacing(1),
  fontWeight: 500,
  color: error ? theme.palette.error.main : theme.palette.text.primary,
  ...(glass && {
    backgroundColor: alpha(theme.palette.background.paper, 0.1),
    backdropFilter: 'blur(10px)',
    padding: '4px 8px',
    borderRadius: '4px',
    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
    display: 'inline-block',
  }),
}));

// IconWrapper - replaced with inline Box component for better TypeScript compatibility
// const IconWrapper = styled(Box)<{ position: 'start' | 'end' }>(({ theme, position }) => {
//   const positionStyles = position === 'start' ? { left: '12px' } : { right: '12px' };
//   return {
//     position: 'absolute' as const,
//     top: '12px',
//     ...positionStyles,
//     color: theme.palette.text.secondary,
//     pointerEvents: 'none' as const,
//     zIndex: 1,
//   };
// });

// Rich text toolbar styling
const RichToolbar = styled(Box)<{ glass?: boolean }>(({ theme, glass }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  padding: theme.spacing(1),
  borderRadius: `${theme.spacing(1)} ${theme.spacing(1)} 0 0`,
  borderBottom: `1px solid ${theme.palette.divider}`,
  background: glass ? alpha(theme.palette.background.paper, 0.1) : theme.palette.background.paper,
  ...(glass && {
    backdropFilter: 'blur(15px)',
  }),
  '& .MuiDivider-root': {
    height: 24,
    margin: `0 ${theme.spacing(1)}`,
  },
}));

const ToolbarButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
  padding: theme.spacing(0.75),
  borderRadius: theme.spacing(0.5),
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  backgroundColor: active ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
  transition: 'all 0.2s ease',
  position: 'relative',
  overflow: 'hidden',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 0,
    height: 0,
    borderRadius: '50%',
    backgroundColor: alpha(theme.palette.primary.main, 0.3),
    transform: 'translate(-50%, -50%)',
    transition: 'width 0.3s, height 0.3s',
  },

  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, 0.15),
    transform: 'translateY(-1px)',
    animation: `${floatAnimation} 1.5s ease-in-out infinite`,

    '&::before': {
      width: '100%',
      height: '100%',
    },
  },

  '&:active': {
    transform: 'scale(0.95)',
  },
}));

const CharacterCount = styled(Box)<{ limit?: number; count: number }>(({ theme, limit, count }) => {
  const isWarning = limit && count > limit * 0.8;
  const isError = limit && count > limit;

  return {
    position: 'absolute',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
    fontSize: '0.75rem',
    color: isError
      ? theme.palette.error.main
      : isWarning
        ? theme.palette.warning.main
        : theme.palette.text.secondary,
    padding: '2px 6px',
    borderRadius: theme.spacing(0.5),
    backgroundColor: alpha(theme.palette.background.paper, 0.8),
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
  };
});

const ContentEditableDiv = styled('div')<{
  error?: boolean;
  focused?: boolean;
  glass?: boolean;
  customColor?: string;
  theme?: Theme;
}>(({ theme, error, focused, glass, customColor = 'primary' }) => {
  if (!theme) return {};
  const colorPalette = getColorFromTheme(theme, customColor);
  const errorColor = theme.palette.error;

  return {
    minHeight: '120px',
    padding: theme.spacing(1.5),
    borderRadius: `0 0 ${theme.spacing(1)} ${theme.spacing(1)}`,
    border: `2px solid ${error ? errorColor.main : focused ? colorPalette.main : theme.palette.divider}`,
    borderTop: 'none',
    backgroundColor: glass
      ? alpha(theme.palette.background.paper, 0.1)
      : theme.palette.background.paper,
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily,
    fontSize: '1rem',
    lineHeight: 1.5,
    outline: 'none',
    transition: 'all 0.3s ease',
    cursor: 'text',

    ...(glass && {
      backdropFilter: 'blur(20px)',
    }),

    '&:hover': {
      backgroundColor: glass
        ? alpha(theme.palette.background.paper, 0.15)
        : alpha(theme.palette.background.paper, 0.9),
    },

    '&:focus': {
      borderColor: error ? errorColor.main : colorPalette.main,
      boxShadow: `0 0 0 3px ${alpha(error ? errorColor.main : colorPalette.main, 0.1)}`,
    },

    '& > *': {
      margin: '0.5em 0',
    },

    '&[contenteditable="true"]:empty::before': {
      content: 'attr(data-placeholder)',
      color: theme.palette.text.secondary,
      opacity: 0.6,
    },
  };
});

// Rich text formatting functions
const formatText = (command: string, value?: string) => {
  document.execCommand(command, false, value);
};

const RichTextEditor: React.FC<{
  value?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  error?: boolean;
  glass?: boolean;
  color?: string;
  characterLimit?: number;
}> = ({ value, onChange, placeholder, error, glass, color, characterLimit }) => {
  const [focused, setFocused] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    list: false,
    orderedList: false,
    quote: false,
    code: false,
  });
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current && value !== undefined) {
      if (contentRef.current.innerHTML !== value) {
        contentRef.current.innerHTML = value;
      }
      setCharacterCount(contentRef.current.innerText.length);
    }
  }, [value]);

  const handleInput = () => {
    if (contentRef.current) {
      const html = contentRef.current.innerHTML;
      onChange?.(html);
      setCharacterCount(contentRef.current.innerText.length);
      updateActiveFormats();
    }
  };

  const updateActiveFormats = () => {
    setActiveFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      list: document.queryCommandState('insertUnorderedList'),
      orderedList: document.queryCommandState('insertOrderedList'),
      quote: false,
      code: false,
    });
  };

  const handleFormat = (command: string, value?: string) => {
    formatText(command, value);
    updateActiveFormats();
    contentRef.current?.focus();
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <RichToolbar glass={glass}>
        <Tooltip title="Bold" arrow>
          <ToolbarButton
            size="small"
            active={activeFormats.bold}
            onClick={() => handleFormat('bold')}
          >
            <FormatBold fontSize="small" />
          </ToolbarButton>
        </Tooltip>

        <Tooltip title="Italic" arrow>
          <ToolbarButton
            size="small"
            active={activeFormats.italic}
            onClick={() => handleFormat('italic')}
          >
            <FormatItalic fontSize="small" />
          </ToolbarButton>
        </Tooltip>

        <Tooltip title="Underline" arrow>
          <ToolbarButton
            size="small"
            active={activeFormats.underline}
            onClick={() => handleFormat('underline')}
          >
            <FormatUnderlined fontSize="small" />
          </ToolbarButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem />

        <Tooltip title="Bullet List" arrow>
          <ToolbarButton
            size="small"
            active={activeFormats.list}
            onClick={() => handleFormat('insertUnorderedList')}
          >
            <FormatListBulleted fontSize="small" />
          </ToolbarButton>
        </Tooltip>

        <Tooltip title="Numbered List" arrow>
          <ToolbarButton
            size="small"
            active={activeFormats.orderedList}
            onClick={() => handleFormat('insertOrderedList')}
          >
            <FormatListNumbered fontSize="small" />
          </ToolbarButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem />

        <Tooltip title="Quote" arrow>
          <ToolbarButton size="small" onClick={() => handleFormat('formatBlock', 'blockquote')}>
            <FormatQuote fontSize="small" />
          </ToolbarButton>
        </Tooltip>

        <Tooltip title="Code" arrow>
          <ToolbarButton size="small" onClick={() => handleFormat('formatBlock', 'pre')}>
            <Code fontSize="small" />
          </ToolbarButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem />

        <Tooltip title="Insert Link" arrow>
          <ToolbarButton
            size="small"
            onClick={() => {
              const url = window.prompt('Enter URL:');
              if (url) handleFormat('createLink', url);
            }}
          >
            <Link fontSize="small" />
          </ToolbarButton>
        </Tooltip>

        <Tooltip title="Text Color" arrow>
          <ToolbarButton size="small">
            <FormatColorText fontSize="small" />
          </ToolbarButton>
        </Tooltip>

        <Tooltip title="Background Color" arrow>
          <ToolbarButton size="small">
            <FormatColorFill fontSize="small" />
          </ToolbarButton>
        </Tooltip>
      </RichToolbar>

      <ContentEditableDiv
        ref={contentRef}
        contentEditable
        data-placeholder={placeholder}
        error={error}
        focused={focused}
        glass={glass}
        customColor={color}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onInput={handleInput}
        onKeyUp={updateActiveFormats}
        onMouseUp={updateActiveFormats}
        role="textbox"
        aria-multiline="true"
        aria-label={placeholder || 'Rich text editor'}
      />

      {characterLimit && (
        <CharacterCount limit={characterLimit} count={characterCount}>
          {characterCount}
          {characterLimit ? `/${characterLimit}` : ''}
        </CharacterCount>
      )}
    </Box>
  );
};

// Base padding values in spacing units (4px base)
// These will be scaled by the density multiplier
const basePaddingSizes = {
  xs: { py: 1.5, px: 2 },    // 6px 8px at normal density
  sm: { py: 2, px: 2.5 },    // 8px 10px at normal density
  md: { py: 2.5, px: 3 },    // 10px 12px at normal density
  lg: { py: 3, px: 3.5 },    // 12px 14px at normal density
  xl: { py: 3.5, px: 4 },    // 14px 16px at normal density
};

export const Textarea: React.FC<TextareaProps> = ({
  variant = 'default',
  color = 'primary',
  size = 'md',
  error = false,
  helperText,
  label,
  glassLabel = false,
  glow = false,
  glass = false,
  gradient = false,
  icon,
  iconPosition = 'start',
  minRows = 3,
  maxRows,
  style,
  'data-testid': dataTestId,
  dataTestId: dataTestIdCamelCase,
  ...props
}) => {
  const { spacingPx } = useDensitySpacing();
  const [richTextValue, setRichTextValue] = useState('');
  const hasIcon = Boolean(icon);
  const iconPadding = hasIcon ? (iconPosition === 'start' ? '40px' : '40px') : '0px';
  const testId = dataTestId || dataTestIdCamelCase;

  // Calculate density-aware padding
  const sizeConfig = basePaddingSizes[size];
  const densityPadding = `${spacingPx(sizeConfig.py)} ${spacingPx(sizeConfig.px)}`;

  const textareaStyle = {
    ...style,
    padding: densityPadding,
    ...(hasIcon && {
      [iconPosition === 'start' ? 'paddingLeft' : 'paddingRight']: iconPadding,
    }),
  };

  // If rich text variant, use the rich text editor
  if (variant === 'rich') {
    return (
      <Box sx={{ position: 'relative', width: '100%' }} data-testid={testId ? `${testId}-wrapper` : undefined}>
        {label && (
          <StyledLabel glass={glassLabel} error={error}>
            {label}
          </StyledLabel>
        )}

        <RichTextEditor
          value={richTextValue}
          onChange={setRichTextValue}
          placeholder={props.placeholder}
          error={error}
          glass={glass}
          color={color}
          characterLimit={props.maxLength}
        />

        {helperText && (
          <FormHelperText error={error} sx={{ mt: 1 }}>
            {helperText}
          </FormHelperText>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative', width: '100%' }} data-testid={testId ? `${testId}-wrapper` : undefined}>
      {label && (
        <StyledLabel glass={glassLabel} error={error}>
          {label}
        </StyledLabel>
      )}

      <Box sx={{ position: 'relative' }}>
        {hasIcon && (
          <Box
            sx={{
              position: 'absolute',
              top: '12px',
              ...(iconPosition === 'start' ? { left: '12px' } : { right: '12px' }),
              color: 'text.secondary',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          >
            {icon}
          </Box>
        )}

        <StyledTextarea
          customVariant={variant}
          customColor={color}
          customSize={size}
          glow={glow}
          glass={glass}
          gradient={gradient}
          error={error}
          minRows={variant === 'autosize' ? minRows : undefined}
          maxRows={variant === 'autosize' ? maxRows : undefined}
          style={textareaStyle}
          aria-label={label || props['aria-label']}
          data-testid={testId}
          {...props}
        />
      </Box>

      {helperText && (
        <FormHelperText error={error} sx={{ mt: 1 }}>
          {helperText}
        </FormHelperText>
      )}
    </Box>
  );
};

Textarea.displayName = 'Textarea';
