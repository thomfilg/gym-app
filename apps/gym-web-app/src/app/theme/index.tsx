import { esES } from '@mui/material/locale';
import { ThemeOptions, createTheme } from '@mui/material/styles';

import { getPalette } from './palette';
import { getComponentStyleOverride } from './styleOverride';
import { getTypography } from './typography';
import { CssBaseline, ThemeProvider } from '@mui/material';

const mode = 'light';
const borderRadius = 12;

const getTheme = () => {
  const palette = getPalette(mode);
  const typography = getTypography(palette, 'Roboto');
  const components = getComponentStyleOverride(palette, mode, typography);
  const themeOptions: ThemeOptions = {
    palette,
    typography,
    components,
    spacing: 8,
    shape: {
      borderRadius,
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  };
  const theme = createTheme(themeOptions, esES);

  // Custom shadow indices beyond MUI's 25-element tuple (runtime works, strict types don't)
  (theme.shadows as string[])[25] = '0px 10px 10px -15px #0005';
  (theme.shadows as string[])[26] = '0px 15px 10px -15px #0003';
  (theme.shadows as string[])[27] = '0px 15px 12px -15px #0004';
  return theme;
};

export function MUITheme({ children }: { children: React.ReactNode }) {
  const theme = getTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
