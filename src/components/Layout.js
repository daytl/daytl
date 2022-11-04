import React from "react"
import PropTypes from "prop-types"
import { injectIntl } from "gatsby-plugin-intl"
import "../styles/global.css"
import Header from "./Header"
import { ThemeProvider, StyledEngineProvider } from "@mui/material";
import theme from "../styles/getTheme"
import Footer from "./Footer"
import Grid from '@mui/material/Grid';

const Layout = ({children, intl, index}) => {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <Header
                    showLogo={!index}
                    siteTitle={intl.formatMessage({id: "main.title"})}
                />
                <Grid container justifyContent="center">
                    <Grid item xs={12} md={10} component="main">
                        {children}
                    </Grid>
                </Grid>
                <Footer />
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default injectIntl(Layout)
