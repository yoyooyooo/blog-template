import { createMuiTheme } from '@material-ui/core';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    htmlFontSize: 10,
    fontFamily: ['微软雅黑', 'sans-serif'].join(','),
  },
  palette: {
    primary: {
      light: purple[300],
      main: purple[500],
      dark: purple[700],
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: 'inherit',
  },
  overrides: {
    MuiButton: {
      text: {
        color: '#a00037',
        textTransform: 'initial',
      },
      containedPrimary: {
        color: 'white',
        backgroundColor: 'inherit',
        backgroundImage: 'linear-gradient(60deg, #FE6B8B  30%, #FF8E53 90%)',
        '&:hover': {
          backgroundImage: 'linear-gradient(60deg, #ef4387 30%, #fb71a3 90%)',
        },
        '&:active': {
          backgroundImage: 'linear-gradient(60deg, #f06292 30%, #ba2d65 90%)',
        },
        // '&:focus': { background: 'linear-gradient(60deg, #f06292 30%, #ba2d65 90%)' }
      },
    },
    MuiDialogTitle: {
      root: {
        fontSize: 20,
      },
    },
    MuiTypography: {
      root: {},
      body2: {},
    },
    MuiIconButton: {
      root: {
        padding: 5,
      },
    },
  },
});

export default theme;
