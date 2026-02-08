import { Html, Head, Main, NextScript } from "next/document";
import { i18nConfig } from "../../i18n";

interface DocumentProps {
  __NEXT_DATA__: {
    query: {
      locale?: string;
    };
  };
}

export default function Document(props: DocumentProps) {
  const currentLocale = props.__NEXT_DATA__.query.locale ?? i18nConfig.defaultLocale;

  return (
    <Html lang={currentLocale}>
      <Head>
        {/* DNS Prefetch and Preconnect for external resources */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />

        {/* Font optimization - use system fonts for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Viewport meta for proper mobile rendering */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
