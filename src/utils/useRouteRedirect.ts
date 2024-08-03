import { useRouter } from "next/router";
import { i18nConfig } from "../../i18n";
import { languageDetector } from "@/utils/languageDetector";
import { Locale } from "@/types/i18n.type";

/**
 * A custom hook that provides a function for redirecting to a specific route with language detection.
 *
 * @returns An object containing the `redirect` function.
 */
export const useRouteRedirect = () => {
  const router = useRouter();

  const redirect = (to: string, replace?: boolean) => {
    const detectedLng = i18nConfig.locales.includes(
      router.query.locale as Locale
    )
      ? String(router.query.locale)
      : languageDetector.detect();
    if (to.startsWith("/" + detectedLng) && router.route === "/404") {
      // prevent endless loop
      router.replace("/" + detectedLng + router.route);
      return;
    }

    if (detectedLng && languageDetector.cache) {
      languageDetector.cache(detectedLng);
    }
    if (replace) {
      router.replace("/" + detectedLng + to);
    } else {
      router.push("/" + detectedLng + to);
    }
  };

  return { redirect };
};
