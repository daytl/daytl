import useTranslation from "next-translate/useTranslation";
import { i18nConfig } from "../../i18n";

interface IUseI18n {
  namespace?: string;
}

/**
 * Returns a translation function based on the provided namespace.
 * If no namespace is provided, the default namespace from the i18n configuration is used.
 *
 * @param options - The options for the translation function.
 * @param options.namespace - The namespace for the translation function.
 * @returns An object containing the translation function.
 */
export const useI18n = ({ namespace }: IUseI18n = {}) => {
  //const { t } = useTranslation(namespace ? namespace : i18nConfig.defaultNS);
  const { t,lang } = useTranslation(namespace ? namespace : i18nConfig.defaultNS);

  return { t, lang };
};
