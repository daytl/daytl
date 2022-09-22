/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { injectIntl } from "gatsby-plugin-intl"
import "../styles/global.css"
import Header from "./Header"
import { ThemeProvider, StyledEngineProvider } from "@mui/material";
import theme from "../styles/getTheme"
import Footer from "./Footer"

const Layout = ({ children, intl, index }) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Header
          showLogo={!index}
          siteTitle={intl.formatMessage({ id: "main.title" })}
        />
        <main>{children}</main>
        <Footer />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default injectIntl(Layout)
