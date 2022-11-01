import React from "react"
import PropTypes from "prop-types"
import { injectIntl } from "gatsby-plugin-intl"
import "../styles/global.css"
import Header from "./Header"
import { MuiThemeProvider } from "@material-ui/core"
import theme from "../styles/getTheme"
import Footer from "./Footer"
import Grid from "@material-ui/core/Grid"

const Layout = ({ children, intl, index }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <Header
        showLogo={!index}
        siteTitle={intl.formatMessage({ id: "main.title" })}
      />
      <Grid container justifyContent="center">
        <Grid item xs={12} md={10} component="main">
          {children}
        </Grid>
      </Grid>
      <Footer />
    </MuiThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default injectIntl(Layout)
