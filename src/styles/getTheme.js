import { createMuiTheme } from "@material-ui/core/styles"

const theme = createMuiTheme({
  palette: {

  },
  overrides: {
    MuiTypography: {
      root: {

      },
      h5: {
        fontWeight: '600 !important',

      }
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: "white",
        color: "#000",
      },
    },
  },
})

export default theme
