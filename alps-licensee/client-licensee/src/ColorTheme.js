import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      // blue-ish Hex from IFM guidelines
      main: '#7DA1C4',
    },
    secondary: {
      main: '#A9C47F',
    },
  },
});

export default theme;