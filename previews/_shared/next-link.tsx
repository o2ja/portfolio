import { forwardRef, type AnchorHTMLAttributes } from "react";

type Href = string | { pathname?: string; hash?: string };
type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: Href;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
};

/** Stand-in for next/link: a plain anchor. Navigation itself is blocked by boot.tsx. */
const Link = forwardRef<HTMLAnchorElement, Props>(function Link(
  { href, prefetch: _p, replace: _r, scroll: _s, ...rest },
  ref,
) {
  const url = typeof href === "string" ? href : `${href.pathname ?? ""}${href.hash ?? ""}`;
  return <a ref={ref} href={url} {...rest} />;
});

export default Link;
