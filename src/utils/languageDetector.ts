import nextLanguageDetector from "next-language-detector";
import { i18nConfig } from "../../i18n";

export const languageDetector = nextLanguageDetector({
  // @ts-ignore
  supportedLngs: i18nConfig.locales as string[],
  fallbackLng: i18nConfig.defaultLocale,
});
