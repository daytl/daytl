import commonSk from "../../locales/sk/common.json";
import commonEn from "../../locales/en/common.json";
import commonCs from "../../locales/cs/common.json";
import commonPl from "../../locales/pl/common.json";
import commonDe from "../../locales/de/common.json";
import toolsSk from "../../locales/sk/tools.json";
import toolsEn from "../../locales/en/tools.json";
import toolsCs from "../../locales/cs/tools.json";
import toolsPl from "../../locales/pl/tools.json";
import toolsDe from "../../locales/de/tools.json";

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
      case "pl":
      return {
        common: commonPl,
        tools: toolsPl
      };
      case "de":
      return {
        common: commonDe,
        tools: toolsDe
      };
    default:
      return {
        common: commonCs,
        tools: toolsCs
      };
  }
};
