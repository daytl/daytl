import React from "react"
import PropTypes from "prop-types"
import Header from "./Header"
import {CssBaseline} from "@mui/material"
import Footer from "./Footer"
import Grid from "@mui/material/Grid"
import CookieBanner from "./cookies/CookieBanner"
import useTranslation from "next-translate/useTranslation";
import Script from "next/script";

const Layout = ({children, index = false}) => {
    const {t} = useTranslation();
    return (
        <>
            <CssBaseline/>
            <Script strategy="afterInteractive"
                    src={`https://www.googletagmanager.com/gtag/js?id=G-N4R8B345EZ`}/>
            <Script id='google-analytics' strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('consent', 'default', {
                    'analytics_storage': 'denied'
                });
                
                gtag('config', 'G-N4R8B345EZ', {
                    page_path: window.location.pathname,
                });
                `,
                    }}
            />
            <style>{`body {
                margin: 0;
                }`}</style>
            <Header
                showLogo={!index}
                siteTitle={t("title")}
            />
            <Grid container justifyContent="center">
                <Grid item xs={12} md={10} component="main" padding={1}>
                    {children}
                </Grid>
            </Grid>
            <Footer/>
            <CookieBanner/>
        </>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
