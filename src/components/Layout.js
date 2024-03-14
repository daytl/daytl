import React from "react"
import PropTypes from "prop-types"
import { injectIntl } from "gatsby-plugin-intl"
import Header from "./Header"
import { CssBaseline, ThemeProvider } from "@mui/material"
import theme from "../styles/getTheme"
import Footer from "./Footer"
import Grid from "@mui/material/Grid"
import CookieBanner from "./cookies/CookieBanner"

const Layout = ({ children, intl, index }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <style>{`body {
                margin: 0;
                }`}</style>
      <Header
        showLogo={!index}
        siteTitle={intl.formatMessage({ id: "common.title" })}
      />
      <Grid container justifyContent="center">
        <Grid item xs={12} md={10} component="main" padding={1}>
          {children}
        </Grid>
      </Grid>
      <Footer />
      <CookieBanner />
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default injectIntl(Layout)
