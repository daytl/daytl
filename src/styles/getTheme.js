import { createTheme, adaptV4Theme } from "@mui/material/styles";

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
        }
        , MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: "white",
                    color: "#000",
                },
            },
        },
    },
})

export default theme
