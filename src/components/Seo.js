import PropTypes from "prop-types";
import { useI18n } from "@/utils/useI18n";
import Head from "next/head";
import { useRouter } from "next/router";
import { i18nConfig } from "../../i18n";

const SITE_URL = "https://www.daytl.com";

const LOCALE_TO_OG_LOCALE = {
  cs: "cs_CZ",
  en: "en_US",
  sk: "sk_SK",
  de: "de_DE",
  pl: "pl_PL",
};

const normalizePathname = (pathname) => {
  if (!pathname || pathname === "/") {
    return "/";
  }
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
};

const buildLocalizedPath = (pathname, locale) => {
  if (pathname === "/") {
    return `/${locale}`;
  }
  return `/${locale}${pathname}`;
};

function Seo({ description, keywords, title, noIndex = false }) {
  const { t, lang } = useI18n();
  const { asPath } = useRouter();
  const metaDescription = description || t("info");
  const fullTitle = `${title} | ${t("titleSuffix")}`;

  const cleanPath = normalizePathname((asPath || "/").split("#")[0].split("?")[0]);
  const pathSegments = cleanPath.split("/").filter(Boolean);
  const hasLocalePrefix = i18nConfig.locales.includes(pathSegments[0]);
  const localeAgnosticPath = hasLocalePrefix ? `/${pathSegments.slice(1).join("/")}` : cleanPath;
  const localizedPath = buildLocalizedPath(localeAgnosticPath, lang);
  const canonicalUrl = `${SITE_URL}${localizedPath}`;
  const ogLocale = LOCALE_TO_OG_LOCALE[lang] || "en_US";
  const keywordsContent = Array.isArray(keywords) ? keywords.join(", ") : keywords;

  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: fullTitle,
    description: metaDescription,
    inLanguage: lang,
    url: canonicalUrl,
    isPartOf: {
      "@type": "WebSite",
      name: t("titleSuffix"),
      url: SITE_URL,
    },
  };

  return (
    <Head>
      <title>{fullTitle}</title>
      <link rel="canonical" href={canonicalUrl} />
      {i18nConfig.locales.map((locale) => (
        <link
          key={locale}
          rel="alternate"
          hrefLang={locale}
          href={`${SITE_URL}${buildLocalizedPath(localeAgnosticPath, locale)}`}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${SITE_URL}${buildLocalizedPath(localeAgnosticPath, i18nConfig.defaultLocale)}`}
      />
      <meta name="author" content={t("author")} />
      <meta name="description" content={metaDescription} />
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content={ogLocale} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={t("author")} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {keywordsContent?.length > 0 && <meta name="keywords" content={keywordsContent} />}
      <meta httpEquiv="Content-Language" content={lang} />
      <script type="application/ld+json">{JSON.stringify(webpageSchema)}</script>
    </Head>
  );
}

Seo.defaultProps = {
  keywords: "",
  description: ``,
};

Seo.propTypes = {
  description: PropTypes.string,
  keywords: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  noIndex: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default Seo;
