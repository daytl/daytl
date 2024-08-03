import commonSk from "../../locales/sk/common.json";
import commonEn from "../../locales/en/common.json";
import commonCs from "../../locales/cs/common.json";
import toolsSk from "../../locales/sk/tools.json";
import toolsEn from "../../locales/en/tools.json";
import toolsCs from "../../locales/cs/tools.json";

import { Locale } from "@/types/i18n.type";

/**
 * Retrieves the language file based on the specified language.
 *
 * @param lang - The language code.
 * @returns The language file containing common and dynamic translations.
 */
// TODO make it better and dynamic
export const getLanguageFile = (lang: Locale) => {
  switch (lang) {
    case "cs":
      return {
        common: commonCs,
        tools: toolsCs,
      };
    case "en":
      return {
        common: commonEn,
        tools: toolsEn,
      };
    case "sk":
      return {
        common: commonSk,
        tools: toolsSk
      };
    default:
      return {
        common: commonCs,
        tools: toolsCs
      };
  }
};
