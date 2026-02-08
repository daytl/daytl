import type { ReactNode } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";

interface LinkProps {
  children: ReactNode;
  skipLocaleHandling?: boolean;
  locale?: string;
  to: string;
  target?: string;
}

/**
 * Renders a link component that handles localization and routing.
 *
 * @param children - The content to be rendered inside the link component.
 * @param skipLocaleHandling - Optional. If true, skips the localization handling for the link.
 * @param target - Optional. Specifies where to open the linked document.
 * @param rest - Additional props to be passed to the link component.
 * @returns The rendered link component.
 */
export const Link = ({ children, skipLocaleHandling, target, ...rest }: LinkProps) => {
  const router = useRouter();
  const locale = rest.locale || (router.query.locale as string) || "";

  let href = rest.to || router.asPath;
  if (href.indexOf("http") === 0) skipLocaleHandling = true;
  if (locale && !skipLocaleHandling) {
    href = href ? `/${locale}${href}` : router.pathname.replace("[locale]", locale);
  }

  return (
    <NextLink href={href} target={target} {...rest}>
      {children}
    </NextLink>
  );
};
