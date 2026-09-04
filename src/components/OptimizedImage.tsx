"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ImageOff } from "lucide-react";

interface OptimizedImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  /**
   * Set to false if you specifically want Next.js to proxy/resize this
   * image through /_next/image. Defaults to true for any absolute
   * http(s) URL, since those are almost always already served from a
   * CDN (e.g. Supabase Storage) and don't need server-side re-encoding.
   *
   * WHY THIS MATTERS:
   * Next's built-in optimizer fetches the source image on your server,
   * resizes/re-encodes it, then serves the result. That fetch has an
   * internal timeout (~7s in your logs). Under load — e.g. a table
   * rendering 20 thumbnails at once — some of those fetches to Supabase
   * Storage don't complete in time and the optimizer throws
   * `TimeoutError`, which surfaces as a 500 on `/_next/image` and an
   * empty/broken thumbnail. Since Supabase Storage already serves
   * reasonably-sized, CDN-cached files, there's no real benefit to
   * re-optimizing them server-side — skipping that step removes the
   * timeout risk entirely and the browser loads the image directly.
   */
  unoptimized?: boolean;
}

function isRemoteUrl(src: string | null | undefined): boolean {
  if (!src) return false;
  return /^https?:\/\//i.test(src);
}

function getImageSrc(src: string): string {
  try {
    const url = new URL(src);
    const objectPath = "/storage/v1/object/public/";
    const objectIndex = url.pathname.indexOf(objectPath);

    if (objectIndex === -1) return src;

    url.pathname = `${url.pathname.slice(0, objectIndex)}/storage/v1/render/image/public/${url.pathname.slice(objectIndex + objectPath.length)}`;
    url.searchParams.set("width", "800");
    url.searchParams.set("quality", "75");
    url.searchParams.set("resize", "contain");
    return url.toString();
  } catch {
    return src;
  }
}

export default function OptimizedImage({
  src,
  alt,
  className = "",
  priority = false,
  fill = true,
  width,
  height,
  sizes = "100vw",
  unoptimized,
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setErrored(false);
  }, [src]);

  if (!src || errored) {
    return (
      <div className={`flex items-center justify-center bg-slate-100 ${className}`}>
        <ImageOff className="text-slate-300" size={28} />
      </div>
    );
  }

  const imageSrc = isRemoteUrl(src) ? getImageSrc(src) : src;

  // Default: skip the Next.js image optimizer for any remote (CDN) URL.
  // Caller can still force optimization by passing unoptimized={false}.
  const shouldSkipOptimizer = unoptimized ?? isRemoteUrl(src);

  return (
    <>
      {!loaded && (
        <div className={`absolute inset-0 bg-slate-100 animate-pulse ${fill ? "" : className}`} />
      )}
      <Image
        src={imageSrc}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        unoptimized={shouldSkipOptimizer}
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        className={`${className} transition-opacity duration-500 ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}