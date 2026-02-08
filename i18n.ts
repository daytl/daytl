import { I18nConfig } from "next-translate";

/**
 * Defines the configuration for internationalization (i18n) in a Next.js application.
 */
export const i18nConfig = {
  locales: ["cs", "en", "sk", "de", "pl"],
  defaultLocale: "cs",
  loader: false,
  pages: {
    "*": ["common"],
  },
  defaultNS: "common",
} as const satisfies I18nConfig;
