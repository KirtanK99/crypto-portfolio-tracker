import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0f3460',
      paper: 'rgba(255,255,255,0.05)',
    },
    primary: {
      main: '#6c5ce7',
    },
    secondary: {
      main: '#ff6b6b',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255,255,255,0.7)',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h6: {
      fontWeight: 600,
    },
    body2: {
      color: 'rgba(255,255,255,0.7)',
    },
  },
  shape: {
    borderRadius: 5,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#6c5ce7',
          height: 3,
          borderRadius: '3px 3px 0 0',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: 'rgba(255,255,255,0.7)',
          fontWeight: 600,
          textTransform: 'none',
          fontSize: '1rem',
          '&.Mui-selected': {
            color: '#6c5ce7',
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: '#2a2540',
          backdropFilter: 'none',
        },
      },
    },
  },
});

export default theme;
