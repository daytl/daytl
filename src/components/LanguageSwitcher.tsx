import { useRouter } from "next/router";
import { MenuItem, Select, type SelectChangeEvent } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import { i18nConfig } from "../../i18n";
import FormattedMessage from "@/components/FormattedMessage";

interface LanguageSwitcherProps {
  locale: string;
  href?: string;
  asPath?: string;
}

/**
 * Renders a language switcher button that allows the user to switch between different locales.
 *
 * @param props - The props object containing the locale, href, and asPath.
 * @returns The language switcher button.
 */
export const LanguageSwitcher = ({ locale, ...rest }: LanguageSwitcherProps) => {
  const router = useRouter();

  const { t, lang } = useTranslation();

  const handleChange = (event: SelectChangeEvent<string>) => {
    const locale = event.target.value as string;
    let href = rest.href || router.asPath;
    let pName = router.pathname;
    Object.keys(router.query).forEach((k) => {
      if (k === "locale") {
        pName = pName.replace(`[${k}]`, locale);
        return;
      }
      pName = pName.replace(`[${k}]`, String(router.query[k]));
    });
    if (locale) {
      href = rest.href ? `/${locale}${rest.href}` : pName;
    }
    router.push(href, href, { locale });
  };

  return (
    <Select
      size="small"
      inputProps={{
        "aria-label": t(`languages.${lang}`),
      }}
      value={lang}
      onChange={handleChange}
    >
      {i18nConfig.locales.map((locale) => (
        <MenuItem value={locale} key={locale}>
          <FormattedMessage id={`languages.${locale}`} />
        </MenuItem>
      ))}
    </Select>
  );
};

export default LanguageSwitcher;
