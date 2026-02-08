import { type PropsWithChildren, useMemo } from "react";
import { useRouter } from "next/router";
import I18nProvider from "next-translate/I18nProvider";
import { LanguageWrapper } from "@/components/LanguageWrapper";
import { i18nConfig } from "../../i18n";
import { getLanguageFile } from "@/utils/language.util";
import type { Locale } from "@/types/i18n.type";
import theme from "@/styles/getTheme";
import { ThemeProvider } from "@mui/material";

interface IRootProvider extends PropsWithChildren {}

/**
 * RootProvider component.
 *
 * This component is responsible for providing the root context for the application.
 * It wraps the children components with the necessary providers and sets the language based on the router query.
 *
 * @component
 * @param props - The component props.
 * @param props.children - The children components to be wrapped.
 * @returns The wrapped children components.
 */
export const RootProvider = ({ children }: IRootProvider) => {
  const router = useRouter();

  const lang = useMemo(() => {
    return i18nConfig.locales.includes(router.query.locale as Locale)
      ? (router.query.locale as Locale)
      : i18nConfig.defaultLocale;
  }, [router.query.locale]);

  const namespaces = useMemo(() => getLanguageFile(lang), [lang]);

  return (
    <I18nProvider lang={lang} namespaces={namespaces}>
      <LanguageWrapper>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </LanguageWrapper>
    </I18nProvider>
  );
};
