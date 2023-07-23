import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#39FF14', // Your primary color
      },
      secondary: {
        main: '#f50057', // Your secondary color
      },
      background: {
        default: '#180A0A', // Background color for the entire application
      },
      text: {
        primary: '#FFFFFF', // Default text color
        secondary: '#777', // Secondary text color
        disabled: '#ccc', // Disabled text color
        
      // Other colors and styles...
    },
    typography: {
      fontFamily: 'Arial, sans-serif',
      
      }
      
      // Custom typography styles...
    },
    
    
    // Other theme configurations...
  });
  

export default theme;