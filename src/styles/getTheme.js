import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {},
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {},
        h3: {
          fontSize: 24,
          paddingBottom: 4,
          fontWeight: "600 !important",
        },
        h4: {
          paddingBottom: 4,
          fontWeight: 600,
          fontSize: 20,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "white",
          color: "#000",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "#555 !important",
        },
      },
    },
  },
});

export default theme;
