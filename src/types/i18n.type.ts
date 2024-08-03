import { i18nConfig } from "../../i18n";

/**
 * Defines a TypeScript type called "Locale".
 *
 * It is derived from the "locales" property of the "i18nConfig" object imported from the i18n.ts module.
 *
 * The "Locale" type represents one of the available locales defined in the "i18nConfig" object.
 */
export type Locale = (typeof i18nConfig.locales)[number];
