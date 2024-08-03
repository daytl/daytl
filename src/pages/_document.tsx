import { Html, Head, Main, NextScript } from "next/document";
import { i18nConfig } from "../../i18n";

export default function Document(props: any) {
  const currentLocale =
    props.__NEXT_DATA__.query.locale ?? i18nConfig.defaultLocale;

  return (
    <Html lang={currentLocale}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
