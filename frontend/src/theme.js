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
      },
      text: {
        primary: '#FFFFFF', // White
        secondary: '#777', // 
        disabled: '#ccc', // 
        
     
    },

    breakpoints: {
      values: {
       
        sm: 600,
        md: 1100,
        lg: 1500,
        
      },

    typography: {
      fontFamily: 'Arial, sans-serif',

      },
      
      
      },
      
      
      
    },
    
    
    
    
  });
  
theme = responsiveFontSizes(theme);


export default theme;