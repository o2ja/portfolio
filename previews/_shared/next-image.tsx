import type { CSSProperties, ImgHTMLAttributes } from "react";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string | { src: string };
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  placeholder?: string;
  unoptimized?: boolean;
};

/** Stand-in for next/image. Root-relative paths are re-based onto the preview's asset folder. */
export default function Image({
  src,
  fill,
  priority,
  quality: _q,
  placeholder: _ph,
  unoptimized: _u,
  style,
  ...rest
}: Props) {
  const raw = typeof src === "string" ? src : src.src;
  const url = raw.startsWith("/") ? `${window.__PREVIEW_BASE__ ?? ""}${raw}` : raw;
  const fillStyle: CSSProperties | undefined = fill
    ? { position: "absolute", inset: 0, width: "100%", height: "100%", ...style }
    : style;
  return <img src={url} loading={priority ? "eager" : "lazy"} decoding="async" style={fillStyle} {...rest} />;
}

declare global {
  interface Window {
    __PREVIEW_BASE__?: string;
  }
}
