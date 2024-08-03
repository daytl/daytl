import nextLanguageDetector from "next-language-detector";
import { i18nConfig } from "../../i18n";

export const languageDetector = nextLanguageDetector({
  supportedLngs: i18nConfig.locales,
  fallbackLng: i18nConfig.defaultLocale,
});
