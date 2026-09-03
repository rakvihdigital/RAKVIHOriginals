"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
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
  style?: React.CSSProperties;
}

export default function OptimizedImage({
  src,
  alt,
  className = "",
  priority = false,
  fill = true,
  width,
  height,
  sizes = "(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw",
  style,
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setErrored(false);
  }, [src]);

  const cleanSrc = src && typeof src === "string" ? src.trim() : null;

  if (!cleanSrc || errored) {
    return (
      <div
        className={`flex items-center justify-center bg-white/[0.03] backdrop-blur-sm ${className}`}
        style={style}
      >
        <ImageOff className="text-white/20" size={24} />
      </div>
    );
  }

  return (
    <>
      {!loaded && (
        <div
          className={`absolute inset-0 bg-white/[0.04] animate-pulse ${
            fill ? "" : className
          }`}
          style={style}
        />
      )}
      <Image
        src={cleanSrc}
        alt={alt || "RAKVIH Luxury Creation"}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        style={style}
        className={`${className} transition-opacity duration-500 ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}
