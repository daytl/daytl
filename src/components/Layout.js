import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import { CssBaseline } from "@mui/material";
import Footer from "./Footer";
import Grid from "@mui/material/Grid";
import CookieBanner from "./cookies/CookieBanner";
import useTranslation from "next-translate/useTranslation";
import Script from "next/script";

const Layout = ({ children, index = false }) => {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Initialize Google Analytics only on client side
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("js", new Date());
      window.gtag("consent", "default", {
        analytics_storage: "denied",
      });
      window.gtag("config", "G-N4R8B345EZ", {
        page_path: window.location.pathname,
      });
    }
  }, []);

  return (
    <>
      <CssBaseline />
      {/* Load Google Analytics with lazyOnload strategy for better performance */}
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-N4R8B345EZ`}
        onLoad={() => {
          window.dataLayer = window.dataLayer || [];
          window.gtag = (...args) => {
            window.dataLayer.push(args);
          };
        }}
      />
      <Header showLogo={!index} siteTitle={t("title")} />
      <Grid container justifyContent="center">
        <Grid size={{ xs: 12, md: 10 }} component="main" padding={1}>
          {children}
        </Grid>
      </Grid>
      <Footer />
      {mounted && <CookieBanner />}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
