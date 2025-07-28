//MUI theme
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      main: '#39FF14', // Neon green
    },
    secondary: {
      main: '#f50057', // Red
    },
    background: {
      default: '#121212', // Black
      paper: '#1e1e1e', // Dark grey
    },
    text: {
      primary: '#FFFFFF', // White
      secondary: '#777', // Grey
      disabled: '#ccc', // Light grey
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1500,
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#8d8d8d',
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#39FF14',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#39FF14',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#8d8d8d',
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#39FF14',
            },
          },
          '& .MuiSelect-icon': {
            color: '#8d8d8d',
          },
          '&:hover .MuiSelect-icon': {
            color: 'white',
          },
          '&.Mui-focused .MuiSelect-icon': {
            color: '#39FF14',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        outlined: {
          borderColor: '#39FF14',
          color: '#39FF14',
          '&:hover': {
            borderColor: '#39FF14',
            backgroundColor: 'rgba(57, 255, 20, 0.1)',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          color: 'white',
          '&:hover': {
            color: '#39FF14',
          },
          '& .MuiTypography-root': {
            color: 'white !important',
            '&:hover': {
              color: '#39FF14 !important',
            },
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiLink-root': {
            color: 'white',
            '&:hover': {
              color: '#39FF14',
            },
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          '&.MuiSvgIcon-root': {
            color: 'inherit',
          },
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;