import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Create a theme instance.
let theme = createTheme({
  // typography: {
  //   fontFamily: [
  //     '-apple-system',
  //     'BlinkMacSystemFont',
  //     '"Segoe UI"',
  //     'Roboto',
  //     '"Helvetica Neue"',
  //     'Arial',
  //     'sans-serif',
  //     '"Apple Color Emoji"',
  //     '"Segoe UI Emoji"',
  //     '"Segoe UI Symbol"',
  //   ].join(','),
  // },
  // components: {
  //   MuiAppBar: {
  //     styleOverrides: {
  //       colorPrimary: {
  //         backgroundColor: "white",
  //         backgroundImage: "unset"
  //       }
  //     }
  //   }
  // },
  palette: {
    primary: {
      main: "#212121",
    },
    secondary: {
      main: "#212121",
      // main: "#f2f7f8",
    },
    light: {
      main: "#ffffff",
    },
  },
});
// let darkTheme = createTheme({
//   // typography: {
//   //   fontFamily: [
//   //     '-apple-system',
//   //     'BlinkMacSystemFont',
//   //     '"Segoe UI"',
//   //     'Roboto',
//   //     '"Helvetica Neue"',
//   //     'Arial',
//   //     'sans-serif',
//   //     '"Apple Color Emoji"',
//   //     '"Segoe UI Emoji"',
//   //     '"Segoe UI Symbol"',
//   //   ].join(','),
//   // },
//   palette: {
//     // mode: 'dark',
//   },
// });
theme = responsiveFontSizes(theme);
// darkTheme = responsiveFontSizes(darkTheme);

export default theme;
// export default darkTheme;
