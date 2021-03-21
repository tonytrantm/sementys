import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#153376',
      dark: '#10275c',
      contrastText: '#fff',
    },
    secondary: {
      main: '#4d4f5c',
    },
  },
  sidebarWidth: 240,
  typography: {
    fontFamily: [
      'Source sans pro',
    ],
  },
});
