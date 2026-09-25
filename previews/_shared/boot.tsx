import { isValidElement, type ReactElement, type ReactNode } from "react";
import { createRoot } from "react-dom/client";

import "./preview.css";

/**
 * Mounts an exported homepage inside its isolated preview document.
 *
 * `build` composes the project's own layout + page components. Next.js server
 * components are plain async functions, so they are awaited here with fixture
 * data instead of being re-written. If the tree starts at <html>/<body> (a root
 * layout), their attributes are moved onto the real document and only the body
 * content is rendered.
 */
export async function boot({ assetBase, build }: { assetBase: string; build: () => Promise<ReactNode> }) {
  window.__PREVIEW_BASE__ = assetBase;
  guardSideEffects();

  const tree = unwrapDocument(await build());
  createRoot(document.getElementById("root")!).render(tree);

  await document.fonts?.ready;
  requestAnimationFrame(() => post({ type: "preview:ready" }));
}

function post(message: { type: string; href?: string }) {
  if (window.parent !== window) window.parent.postMessage(message, window.location.origin);
}

/** Previews are homepages only: in-page anchors work, everything that would leave the page or submit data does not. */
function guardSideEffects() {
  document.addEventListener(
    "click",
    (event) => {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      if (href.startsWith("#")) return;
      event.preventDefault();
      post({ type: "preview:blocked", href });
    },
    true,
  );
  document.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();
      post({ type: "preview:blocked" });
    },
    true,
  );
  // focus inside the iframe would otherwise swallow Escape, trapping the visitor in the expanded view
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") post({ type: "preview:escape" });
  });
  window.open = () => {
    post({ type: "preview:blocked" });
    return null;
  };
}

type WithChildren = ReactElement<{ children?: ReactNode; className?: string; lang?: string }>;

function unwrapDocument(node: ReactNode): ReactNode {
  if (!isValidElement(node) || node.type !== "html") return node;
  const html = node as WithChildren;
  if (html.props.className) document.documentElement.className = html.props.className;
  if (html.props.lang) document.documentElement.lang = html.props.lang;
  const body = html.props.children as WithChildren;
  if (!isValidElement(body) || body.type !== "body") return body;
  if (body.props.className) document.body.className = body.props.className;
  return body.props.children;
}
