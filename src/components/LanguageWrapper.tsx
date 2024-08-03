import { ReactNode, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { languageDetector } from "@/utils/languageDetector";
import { i18nConfig } from "../../i18n";
import { Locale } from "@/types/i18n.type";

interface LanguageWrapperProps {
  children: ReactNode;
}

/**
 * LanguageWrapper component.
 *
 * This component is responsible for handling the language detection and redirection logic.
 *
 * Props:
 * - children: ReactNode - The child components to be rendered.
 *
 * Usage:
 * ```tsx
 * <LanguageWrapper>
 *   // Child components
 * </LanguageWrapper>
 * ```
 */
export const LanguageWrapper = ({ children }: LanguageWrapperProps) => {
  const [detectedLng, setDetectedLng] = useState("");
  const router = useRouter();

  // Check if current path includes locale
  const isLocaleInThePath = useMemo(
    () =>
      (router.query.locale &&
        i18nConfig.locales.includes(router.query.locale as Locale)) ||
      router.asPath.includes(detectedLng ?? i18nConfig.defaultLocale),
    [detectedLng, router.asPath, router.query.locale]
  );

  // Set detected language
  useEffect(() => {
    const detected = languageDetector.detect();
    if (detected) {
      setDetectedLng(detected);
    }
  }, []);

  // handle redirection
  useEffect(() => {
    const {
      query: { locale },
      asPath,
      isReady,
    } = router;

    // Check if the current route has accurate locale
    if (isReady && !i18nConfig.locales.includes(locale as Locale)) {
      if (asPath.startsWith("/" + detectedLng) && router.route === "/404") {
        // router.push({
        //   pathname: "/404",
        //   query: { locale },
        // });
        return;
      }

      if (detectedLng && languageDetector.cache) {
        languageDetector.cache(detectedLng);
      }
      router.replace("/" + detectedLng + asPath);
    }
  }, [router, detectedLng]);

  return isLocaleInThePath ? <>{children}</> : <p>Loading...</p>;
};
