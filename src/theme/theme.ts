// theme.tsx
import { createTheme, type ThemeOptions } from '@mui/material/styles';
import { type PaletteMode } from '@mui/material';

const muiThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark' as PaletteMode,
    primary: {
      main: '#d68240',
      light: '#e09a5e',
      dark: '#c57539',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#182f31',
      light: '#2a4547',
      dark: '#0a1316',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0a1316',
      paper: '#121a1d',
    },
    text: {
      primary: '#ffffff',
      secondary: '#9b9c9b',
      disabled: '#797b78',
    },
    divider: '#192124',
    error: { main: '#f44336' },
    warning: { main: '#ff9800' },
    info: { main: '#2196f3' },
    success: { main: '#4caf50' },
  },
  typography: {
    fontFamily: '"Clash Display Variable", "Poppins", sans-serif',
    h1: { fontFamily: '"Clash Display Variable", sans-serif', fontSize: '64px', fontWeight: 600, lineHeight: '74px', letterSpacing: '3px', textTransform: 'uppercase' },
    h2: { fontFamily: '"Clash Display Variable", sans-serif', fontSize: '36px', fontWeight: 600, lineHeight: '45px' },
    h3: { fontFamily: '"Clash Display Variable", sans-serif', fontSize: '25px', fontWeight: 600, lineHeight: '31px' },
    h4: { fontFamily: '"Clash Display Variable", sans-serif', fontSize: '20px', fontWeight: 600, lineHeight: '25px' },
    h5: { fontFamily: '"Clash Display Variable", sans-serif', fontSize: '18px', fontWeight: 600, lineHeight: '22px' },
    h6: { fontFamily: '"Clash Display Variable", sans-serif', fontSize: '16px', fontWeight: 600, lineHeight: '20px' },
    body1: { fontFamily: '"Clash Display Variable", sans-serif', fontSize: '16px', fontWeight: 500, lineHeight: '26px' },
    body2: { fontFamily: '"Clash Display Variable", sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: '20px' },
    button: { fontFamily: '"Poppins", sans-serif', fontSize: '16px', fontWeight: 400, lineHeight: '24px', textTransform: 'uppercase' },
    caption: { fontFamily: '"Clash Display Variable", sans-serif', fontSize: '12px', fontWeight: 500, lineHeight: '16px' },
    overline: { fontFamily: '"Clash Display Variable", sans-serif', fontSize: '16px', fontWeight: 500, lineHeight: '20px', letterSpacing: '0.5px' },
  },
  shape: { borderRadius: 8 },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'uppercase',
          fontFamily: '"Poppins", sans-serif',
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: '24px',
          padding: '14px 20px',
        },
        contained: {
          backgroundColor: '#d68240',
          color: '#ffffff',
          '&:hover': { backgroundColor: '#c57539' },
        },
        outlined: {
          borderColor: '#ffffff',
          color: '#ffffff',
          '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)', borderColor: '#ffffff' },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#182f31',
            borderRadius: 8,
            color: '#b2bbbb',
            fontFamily: '"Clash Display Variable", sans-serif',
            fontSize: '20px',
            fontWeight: 500,
            lineHeight: '25px',
            '& fieldset': { borderColor: 'transparent' },
            '&:hover fieldset': { borderColor: '#d68240' },
            '&.Mui-focused fieldset': { borderColor: '#d68240' },
          },
        },
      },
    },
    MuiCard: { styleOverrides: { root: { backgroundColor: '#121a1d', borderRadius: 14 } } },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0px 4px 4px rgba(136,136,136,1)',
          borderRadius: 20,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
        },
      },
    },
    MuiRating: { styleOverrides: { root: { color: '#d68240' } } },
  },
};

const muiTheme = createTheme(muiThemeOptions);

export default muiTheme;
