"use client";

import { useEffect, useState } from "react";

/**
 * Cinematic brand intro shown once per browser session when the storefront opens.
 *
 * Sequence:
 *   1. Ambient gold glow fades in on a deep black stage
 *   2. "RAKVIH" (white) wipes in with a soft blur-to-focus
 *   3. "ORIGINALS" (gold) follows
 *   4. A light sweep glides across the logo, gold hairline + tagline appear
 *   5. Once the page has loaded, the logo lifts and the curtains part to reveal the site
 *
 * A tiny inline script in the root layout adds `rk-intro-seen` to <html> on repeat
 * visits in the same session, so the loader is hidden before first paint.
 */

const SESSION_KEY = "rakvih_intro_seen";
const MIN_DISPLAY_MS = 1200; // brief cinematic brand reveal
const MAX_DISPLAY_MS = 2200; // never block the site or user interactions
const EXIT_MS = 600;

type Phase = "playing" | "exiting" | "done";

export default function IntroLoader() {
  const [phase, setPhase] = useState<Phase>("playing");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const root = document.documentElement;

    // Already shown this session → skip entirely
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      /* storage unavailable */
    }
    if (seen) {
      // Already hidden pre-paint by the `rk-intro-seen` class; just unmount.
      const t = setTimeout(() => setPhase("done"), 0);
      return () => clearTimeout(t);
    }

    root.classList.add("rk-intro-active");

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minTime = reduceMotion ? 600 : MIN_DISPLAY_MS;
    const start = performance.now();

    let loaded = document.readyState === "complete";
    let finished = false;
    let rafId = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const finish = () => {
      if (finished) return;
      finished = true;
      setProgress(100);
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
      // Unlock scroll immediately when curtains start parting
      root.classList.remove("rk-intro-active");
      setPhase("exiting");
      timers.push(
        setTimeout(() => {
          setPhase("done");
        }, reduceMotion ? 200 : EXIT_MS)
      );
    };

    const tryFinish = () => {
      if (performance.now() - start >= minTime && loaded) finish();
    };

    const onLoad = () => {
      loaded = true;
      tryFinish();
    };
    window.addEventListener("load", onLoad);

    // Smooth progress: eases toward 90% while waiting, jumps to 100% when loaded
    const tick = () => {
      const elapsed = performance.now() - start;
      const timeRatio = Math.min(elapsed / minTime, 1);
      const target = loaded ? timeRatio * 100 : Math.min(timeRatio * 100, 90);
      setProgress((p) => (target > p ? p + (target - p) * 0.12 : p));
      tryFinish();
      if (!finished) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // Safety net
    timers.push(setTimeout(finish, MAX_DISPLAY_MS));

    return () => {
      window.removeEventListener("load", onLoad);
      cancelAnimationFrame(rafId);
      timers.forEach(clearTimeout);
      root.classList.remove("rk-intro-active");
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`rk-loader ${phase === "exiting" ? "is-exiting" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading RAKVIH Originals"
    >
      {/* Curtains that part on exit */}
      <div className="rk-curtain rk-curtain--top" />
      <div className="rk-curtain rk-curtain--bottom" />

      {/* Ambient atmosphere */}
      <div className="rk-loader-glow" />
      <div className="rk-loader-grain" />
      <div className="rk-loader-frame" />

      <div className="rk-loader-stage">
        <div className="rk-loader-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/rakvih-logo-mark.png"
            alt=""
            className="rk-logo-part rk-logo-mark"
            width={443}
            height={112}
            fetchPriority="high"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/rakvih-logo-originals.png"
            alt=""
            className="rk-logo-part rk-logo-originals"
            width={450}
            height={112}
            fetchPriority="high"
          />
          <span className="rk-logo-shine" aria-hidden="true" />
        </div>

        <div className="rk-loader-rule" />
        <p className="rk-loader-tagline">Maison of Timeless Luxury</p>

        <div className="rk-loader-progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
        <span className="rk-loader-percent" aria-hidden="true">
          {String(Math.round(progress)).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
