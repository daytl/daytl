import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {},
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {},
                h5: {
                    fontWeight: "600 !important",
                },
            }
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
            styleOverrides:{
                root: {
                    color: '#555 !important'
                }
            }
        },
    },
})

export default theme
