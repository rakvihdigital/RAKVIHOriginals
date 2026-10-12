// @ts-nocheck
/* ============================================
   MAISON ÉLÉGANCE — Scroll-Driven Animation Engine
   High-Performance, Zero-Glitch Canvas Renderer
   + Category Filters, Marquee, Brand Carousel
   ============================================ */

/**
 * Boots every scroll-driven effect on the homepage.
 * Returns a cleanup function to release all listeners, render loops,
 * and observers when unmounted.
 */
export function initScrollSequence(): () => void {
    'use strict';

    // ─── CONFIGURATION ───
    const LERP_FACTOR = 0.14;          // Fast, silky smooth easing
    const MAX_CONCURRENT_LOADS = 4;    // Parallel HTTP/2 streams
    const BACKGROUND_CONCURRENCY = 2;  // Bulk preloading leaves bandwidth for product images
    const NEAR_WINDOW_BEHIND = 4;      // Frames behind scroll pos
    const NEAR_WINDOW_AHEAD = 16;      // Frames ahead of scroll pos
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
    const FRAME_STEP = isMobile ? 3 : 2; // Density: every 2nd frame on desktop, 3rd on mobile
    const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const START_LOADING_MARGIN = '100% 0px'; // Start preloading 1 viewport height ahead

    const abort = new AbortController();
    const listen = (target, type, fn, opts = {}) =>
        target.addEventListener(type, fn, { ...opts, signal: abort.signal });
    const cleanups = [];
    const sequences = [];

    // ─── SHARED FRAME LOADER ───
    let inflight = 0;
    // Only frames around the scroll position load until the intro loader is done;
    // the bulk sweep (hundreds of 2560px frames) waits so it doesn't starve the first paint.
    let backgroundReady = false;

    function pumpLoader() {
        if (abort.signal.aborted) return;
        const deferred = new Set();
        while (inflight < MAX_CONCURRENT_LOADS) {
            let bestSeq = null;
            let highestPriority = -1;

            for (const seq of sequences) {
                if (deferred.has(seq) || !seq.loadingStarted || seq.allRequested || (!seq.isNear && !seq.isVisible)) continue;
                const priority = seq.loadPriority();
                if (priority > highestPriority) {
                    highestPriority = priority;
                    bestSeq = seq;
                }
            }

            if (!bestSeq) return;

            const index = bestSeq.nextFrameToLoad();
            if (index === -2) {
                deferred.add(bestSeq);
                continue;
            }
            if (index < 0) {
                bestSeq.allRequested = true;
                continue;
            }

            inflight++;
            bestSeq.loadFrame(index).finally(() => {
                inflight--;
                pumpLoader();
            });
        }
    }

    // ─── SCROLL SEQUENCE CLASS ───
    class ScrollSequence {
        constructor(config) {
            this.config = config;
            this.total = config.totalFrames;
            this.images = new Array(this.total);
            this.requested = new Uint8Array(this.total);
            this.loadingStarted = false;
            this.allRequested = false;

            this.targetFrame = 0;
            this.lerpedFrame = 0;
            this.drawnIndex = -1;
            this.lastTextFrame = -1;
            this.lastCounterNum = 0;
            this.direction = 1;
            this.isVisible = false;
            this.isNear = config.isMain;
            this.rafId = 0;
            this.lastTime = 0;

            // Cached geometry to avoid getBoundingClientRect layout thrashing
            this.containerTop = 0;
            this.containerHeight = 0;
            this.canvasWidth = 0;
            this.canvasHeight = 0;
            this.viewportHeight = 0;
            this.effectiveHeight = 0;

            this.canvas = document.getElementById(config.canvasId);
            this.section = document.getElementById(config.sectionId);
            if (!this.canvas || !this.section) return;

            this.container = this.section.querySelector('.hero-scroll-container');
            this.ctx = this.canvas.getContext('2d', { alpha: false });
            this.counterEl = this.section.querySelector('.hero-counter .counter-current');
            this.indicatorEl = config.isMain ? this.section.querySelector('.scroll-indicator') : null;
            this.overlays = this.buildOverlays();

            // Keyframe milestones across the timeline (e.g. 20-30 frames spaced out)
            const milestoneStep = config.isMain ? 20 : 15;
            this.milestones = [];
            for (let i = 0; i < this.total; i += milestoneStep) {
                this.milestones.push(i);
            }
            if (this.milestones[this.milestones.length - 1] !== this.total - 1) {
                this.milestones.push(this.total - 1);
            }
            this.milestoneIndex = 0;

            this.resizeCanvas = this.resizeCanvas.bind(this);
            this.onScroll = this.onScroll.bind(this);
            this.renderLoop = this.renderLoop.bind(this);

            this.measure();
            this.resizeCanvas();
            this.onScroll();
            this.updateHeroText(0);
            this.observeViewport();

            sequences.push(this);

            // Immediately load frame 0 so the hero never shows a blank or black canvas
            this.loadFrame(0);

            if (config.isMain) {
                this.startLoading();
            }
        }

        measure() {
            if (!this.container) return;
            const rect = this.container.getBoundingClientRect();
            const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
            this.containerTop = rect.top + scrollY;
            this.containerHeight = this.container.offsetHeight || rect.height;
            this.viewportHeight = window.innerHeight;
            this.effectiveHeight = (this.containerHeight - this.viewportHeight) * 0.98;
        }

        observeViewport() {
            const visibleObserver = new IntersectionObserver((entries) => {
                const entry = entries[0];
                this.isVisible = entry.isIntersecting;
                if (this.isVisible) {
                    this.measure();
                    this.onScroll();
                    this.lerpedFrame = this.targetFrame;
                    this.drawFrame(this.lerpedFrame, true);
                    this.updateHeroText(this.lerpedFrame);
                    this.startRenderLoop();
                } else {
                    if (this.rafId) {
                        cancelAnimationFrame(this.rafId);
                        this.rafId = 0;
                    }
                }
                pumpLoader();
            }, { threshold: 0.01 });
            visibleObserver.observe(this.container);

            const nearObserver = new IntersectionObserver((entries) => {
                this.isNear = entries[0].isIntersecting;
                if (this.isNear) {
                    this.measure();
                    this.allRequested = false;
                    this.startLoading();
                }
                pumpLoader();
            }, { rootMargin: START_LOADING_MARGIN });
            nearObserver.observe(this.container);

            cleanups.push(() => {
                visibleObserver.disconnect();
                nearObserver.disconnect();
                if (this.rafId) cancelAnimationFrame(this.rafId);
            });
        }

        startLoading() {
            if (this.loadingStarted) return;
            this.loadingStarted = true;
            pumpLoader();
        }

        loadPriority() {
            if (this.isVisible) return 3;
            if (this.isNear) return 2;
            return this.config.isMain ? 1 : 0;
        }

        resizeCanvas() {
            if (!this.canvas) return;
            this.measure();
            const width = window.innerWidth;
            const height = window.innerHeight;
            // Cap DPR at 1.5 to keep GPU fill-rate light, razor-sharp, and battery friendly
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

            if (width === this.canvasWidth && height === this.canvasHeight) return;

            this.canvas.width = Math.round(width * dpr);
            this.canvas.height = Math.round(height * dpr);
            this.canvas.style.width = width + 'px';
            this.canvas.style.height = height + 'px';
            this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            this.canvasWidth = width;
            this.canvasHeight = height;
            this.drawFrame(this.lerpedFrame, true);
        }

        nextFrameToLoad() {
            if (reducedMotion) {
                if (!this.requested[0]) return 0;
                return -1;
            }

            // 1. First priority: frames immediately surrounding the active scroll position
            const center = Math.round(this.targetFrame / FRAME_STEP) * FRAME_STEP;
            const dir = this.direction || 1;

            // Look ahead in direction of scroll
            for (let d = 0; d <= NEAR_WINDOW_AHEAD; d++) {
                const ahead = clamp(center + d * FRAME_STEP * dir, 0, this.total - 1);
                if (!this.requested[ahead]) return ahead;
            }

            // Look behind
            for (let d = 1; d <= NEAR_WINDOW_BEHIND; d++) {
                const behind = clamp(center - d * FRAME_STEP * dir, 0, this.total - 1);
                if (!this.requested[behind]) return behind;
            }

            // Remaining tiers are background preloading (-2 = try again later)
            if (!backgroundReady || inflight >= BACKGROUND_CONCURRENCY) return -2;

            // 2. Second priority: milestone keyframes across the sequence
            while (this.milestoneIndex < this.milestones.length) {
                const ms = this.milestones[this.milestoneIndex++];
                if (!this.requested[ms]) return ms;
            }

            // 3. Third priority: standard step frames from 0 to total
            for (let i = 0; i < this.total; i += FRAME_STEP) {
                if (!this.requested[i]) return i;
            }

            return -1;
        }

        loadFrame(index) {
            if (this.requested[index]) return Promise.resolve();
            this.requested[index] = 1;

            return new Promise((resolve) => {
                const img = new Image();
                img.decoding = 'async';
                const frameNum = String(index + 1).padStart(3, '0');
                img.src = '/' + this.config.framePath + frameNum + this.config.frameExt;

                img.onload = () => {
                    if (abort.signal.aborted) return resolve();
                    this.images[index] = img;
                    this.requested[index] = 2;

                    if (this.drawnIndex < 0 || index === 0) {
                        this.drawFrame(this.lerpedFrame, true);
                        if (this.config.isMain && this.drawnIndex >= 0) {
                            // Lets the intro loader know the hero is painted underneath it
                            window.__rkHeroReady = true;
                        }
                    } else if (this.isVisible) {
                        this.startRenderLoop();
                    }
                    resolve();
                };

                img.onerror = () => {
                    this.requested[index] = 3;
                    resolve();
                };
            });
        }

        /**
         * Select the best loaded frame without ever jumping back and forth.
         * Enforces monotonic continuity matching the user's scroll direction.
         */
        getFrameToDraw(wanted) {
            if (this.images[wanted]) return wanted;

            if (this.direction >= 0) {
                // Scrolling forward: search backwards first (prefer already passed frames)
                for (let i = wanted - 1; i >= 0; i--) {
                    if (this.images[i]) return i;
                }
                // If nothing earlier, keep currently drawn frame
                if (this.drawnIndex >= 0 && this.images[this.drawnIndex]) {
                    return this.drawnIndex;
                }
                // Otherwise look forward
                for (let i = wanted + 1; i < this.total; i++) {
                    if (this.images[i]) return i;
                }
            } else {
                // Scrolling backward: search forwards first
                for (let i = wanted + 1; i < this.total; i++) {
                    if (this.images[i]) return i;
                }
                if (this.drawnIndex >= 0 && this.images[this.drawnIndex]) {
                    return this.drawnIndex;
                }
                for (let i = wanted - 1; i >= 0; i--) {
                    if (this.images[i]) return i;
                }
            }

            return -1;
        }

        drawFrame(frame, force = false) {
            const wanted = Math.max(0, Math.min(this.total - 1, Math.round(frame)));
            const idx = this.getFrameToDraw(wanted);
            if (idx < 0 || (!force && idx === this.drawnIndex)) return;

            const img = this.images[idx];
            if (!img || !img.naturalWidth) return;

            const cw = this.canvasWidth;
            const ch = this.canvasHeight;
            const iw = img.naturalWidth;
            const ih = img.naturalHeight;
            const scale = Math.max(cw / iw, ch / ih);
            const w = iw * scale;
            const h = ih * scale;

            this.ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
            this.drawnIndex = idx;
        }

        onScroll() {
            // Cheaply calculate progress using cached container geometry + window.scrollY
            const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
            const scrolled = scrollY - this.containerTop;
            const progress = this.effectiveHeight > 0 ? clamp(scrolled / this.effectiveHeight, 0, 1) : 0;

            const next = reducedMotion ? 0 : progress * (this.total - 1);
            if (Math.abs(next - this.targetFrame) > 0.001) {
                this.direction = next >= this.targetFrame ? 1 : -1;
                this.targetFrame = next;
            }

            if (this.indicatorEl) {
                this.indicatorEl.classList.toggle('hidden', progress > 0.02);
            }
            this.updateHeroCounter(progress);

            if (this.isVisible) {
                this.allRequested = false;
                pumpLoader();
            }
        }

        startRenderLoop() {
            if (this.rafId) return;
            this.lastTime = performance.now();
            this.rafId = requestAnimationFrame(this.renderLoop);
        }

        renderLoop(now) {
            if (abort.signal.aborted || !this.isVisible) {
                this.rafId = 0;
                return;
            }

            this.onScroll();
            const dt = Math.min(now - (this.lastTime || now), 64);
            this.lastTime = now;

            const diff = this.targetFrame - this.lerpedFrame;
            if (Math.abs(diff) > 0.04) {
                const t = 1 - Math.pow(1 - LERP_FACTOR, dt / 16.667);
                this.lerpedFrame += diff * Math.min(t, 1);
            } else {
                this.lerpedFrame = this.targetFrame;
            }

            this.drawFrame(this.lerpedFrame);

            if (Math.abs(this.lerpedFrame - this.lastTextFrame) > 0.01) {
                this.updateHeroText(this.lerpedFrame);
            }

            if (Math.abs(this.targetFrame - this.lerpedFrame) > 0.04) {
                this.rafId = requestAnimationFrame(this.renderLoop);
            } else {
                this.rafId = 0; // Settle cleanly when not scrolling
            }
        }

        buildOverlays() {
            const last = this.total - 1;
            return Array.from(this.section.querySelectorAll('.hero-text-overlay')).map((el) => {
                const isFirst = el.classList.contains('text-first') ||
                                (el.id && el.id.endsWith('-text-1')) ||
                                el.id === 'hero-text-1';
                const isLast = el.classList.contains('text-last') ||
                               (el.id && el.id.endsWith('-text-6')) ||
                               el.id === 'hero-text-6';

                let startFrame = 0;
                let endFrame = 0;
                let fadeInFrames = 3;
                let fadeOutFrames = 3;

                if (isFirst) {
                    startFrame = 0;
                    fadeInFrames = 0;
                    if (this.config.isMain) {
                        endFrame = 0.10 * last;
                        fadeOutFrames = 12;
                    } else {
                        endFrame = 0.12 * last;
                        fadeOutFrames = 8;
                    }
                } else if (isLast) {
                    startFrame = (this.config.isMain ? 0.86 : 0.80) * last;
                    endFrame = this.total + 10;
                    fadeOutFrames = 0;
                    fadeInFrames = 8;
                } else if (el.dataset.start && el.dataset.end) {
                    startFrame = parseFloat(el.dataset.start) * last;
                    endFrame = parseFloat(el.dataset.end) * last;
                    fadeInFrames = 0.03 * last;
                    fadeOutFrames = 0.03 * last;
                }

                return {
                    el, isFirst, isLast, startFrame, endFrame, fadeInFrames, fadeOutFrames,
                    hasLink: Boolean(el.querySelector('a')),
                    lastOpacity: -1,
                    lastTranslateY: -999,
                };
            });
        }

        updateHeroText(frame) {
            this.lastTextFrame = frame;

            for (const o of this.overlays) {
                let opacity = 0;
                let translateY = 30;
                let scale = 0.97;

                if (frame >= o.startFrame && frame <= o.endFrame) {
                    const fadeInEnd = o.startFrame + o.fadeInFrames;
                    const fadeOutStart = o.endFrame - o.fadeOutFrames;

                    if (o.fadeInFrames > 0 && frame < fadeInEnd) {
                        const t = easeOutCubic((frame - o.startFrame) / o.fadeInFrames);
                        opacity = t;
                        translateY = 30 * (1 - t);
                        scale = 0.97 + 0.03 * t;
                    } else if (frame <= fadeOutStart || o.fadeOutFrames === 0) {
                        opacity = 1; translateY = 0; scale = 1;
                    } else {
                        const t = easeOutCubic((frame - fadeOutStart) / o.fadeOutFrames);
                        opacity = 1 - t;
                        translateY = -20 * t;
                        scale = 1 + 0.02 * t;
                    }
                }

                // Avoid unnecessary DOM writes
                if (opacity === 0 && o.lastOpacity === 0) continue;
                if (Math.abs(opacity - o.lastOpacity) < 0.01 && Math.abs(translateY - o.lastTranslateY) < 0.5) continue;

                o.lastOpacity = opacity;
                o.lastTranslateY = translateY;

                const style = o.el.style;
                style.opacity = String(opacity);
                style.transform = `translateY(${translateY}px) scale(${scale})`;
                style.pointerEvents = (opacity > 0.1 && (o.isFirst || o.isLast || o.hasLink)) ? 'auto' : 'none';
            }
        }

        updateHeroCounter(progress) {
            if (!this.counterEl) return;

            let num = 1;
            if (this.config.isMain) {
                if (progress >= 0.86) num = 8;
                else if (progress >= 0.72) num = 7;
                else if (progress >= 0.60) num = 6;
                else if (progress >= 0.48) num = 5;
                else if (progress >= 0.36) num = 4;
                else if (progress >= 0.24) num = 3;
                else if (progress >= 0.12) num = 2;
            } else {
                if (progress >= 0.82) num = 6;
                else if (progress >= 0.60) num = 5;
                else if (progress >= 0.47) num = 4;
                else if (progress >= 0.30) num = 3;
                else if (progress >= 0.15) num = 2;
            }
            if (num === this.lastCounterNum) return;
            this.lastCounterNum = num;
            this.counterEl.textContent = '0' + num;
        }
    }

    // ─── INIT ───
    function init() {
        // Initialize the main hero sequence
        new ScrollSequence({
            canvasId: 'hero-canvas',
            sectionId: 'hero',
            totalFrames: 844,
            framePath: 'hero1-frames-full/ezgif-frame-',
            frameExt: '.webp',
            isMain: true
        });

        // Initialize additional hero sequences
        if (document.getElementById('hero2')) {
            new ScrollSequence({
                canvasId: 'hero-canvas-2',
                sectionId: 'hero2',
                totalFrames: 300,
                framePath: 'hero2-frames-png/ezgif-frame-',
                frameExt: '.webp',
                isMain: false
            });
        }
        if (document.getElementById('hero6')) {
            new ScrollSequence({
                canvasId: 'hero-canvas-6',
                sectionId: 'hero6',
                totalFrames: 300,
                framePath: 'hero6-frames-png/ezgif-frame-',
                frameExt: '.webp',
                isMain: false
            });
        }
        if (document.getElementById('hero5')) {
            new ScrollSequence({
                canvasId: 'hero-canvas-5',
                sectionId: 'hero5',
                totalFrames: 300,
                framePath: 'hero5-frames-png/ezgif-frame-',
                frameExt: '.webp',
                isMain: false
            });
        }

        // Global resize handler
        const handleResize = debounce(() => {
            for (const seq of sequences) {
                seq.resizeCanvas();
            }
        }, 150);
        listen(window, 'resize', handleResize);

        // Global unified scroll listener (wakes visible sequences and throttles parallax)
        let scrollRaf = false;
        listen(window, 'scroll', () => {
            for (const seq of sequences) {
                if (seq.isVisible) seq.startRenderLoop();
            }
            if (!scrollRaf) {
                scrollRaf = true;
                requestAnimationFrame(() => {
                    updateParallaxEffects();
                    scrollRaf = false;
                });
            }
        }, { passive: true });

        setupRevealObserver();
        setupCategoryFilters();
        setupMarquee();
        setupQualityAnimation();
    }

    // ─── UNIFIED THROTTLED PARALLAX ───
    let arcWrapper = null;
    let arcCenter = null;
    let arcInnerLeft = null;
    let arcInnerRight = null;
    let arcOuterLeft = null;
    let arcOuterRight = null;
    let floaters = [];
    let introOverlay = null;

    function setupParallaxElements() {
        arcWrapper = document.getElementById('arc-wrapper');
        if (arcWrapper) {
            arcCenter = arcWrapper.querySelector('.arc-center');
            arcInnerLeft = arcWrapper.querySelector('.arc-inner-left');
            arcInnerRight = arcWrapper.querySelector('.arc-inner-right');
            arcOuterLeft = arcWrapper.querySelector('.arc-outer-left');
            arcOuterRight = arcWrapper.querySelector('.arc-outer-right');
        }
        floaters = Array.from(document.querySelectorAll('.hover-float-parent'));
        introOverlay = document.getElementById('intro-overlay');
    }

    function updateParallaxEffects() {
        const scrollY = window.scrollY || document.documentElement.scrollTop || 0;

        // Intro overlay corner
        if (introOverlay) {
            introOverlay.classList.toggle('is-scrolled', scrollY > 50);
        }

        // Arc gallery (desktop only)
        if (arcWrapper && window.innerWidth > 768) {
            const rect = arcWrapper.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const centerOffset = window.innerHeight / 2;
                const relativeScroll = (rect.top + rect.height / 2 - centerOffset) / centerOffset;
                const scrollVal = clamp(relativeScroll, -1, 1);

                if (arcCenter) arcCenter.style.transform = `translate3d(0, ${scrollVal * -15}px, 0)`;
                if (arcInnerLeft) arcInnerLeft.style.transform = `translate3d(-340px, ${40 + scrollVal * -25}px, -50px) rotate(${-5 + scrollVal * 2}deg)`;
                if (arcInnerRight) arcInnerRight.style.transform = `translate3d(340px, ${40 + scrollVal * -25}px, -50px) rotate(${5 - scrollVal * 2}deg)`;
                if (arcOuterLeft) arcOuterLeft.style.transform = `translate3d(-620px, ${100 + scrollVal * -40}px, -100px) rotate(${-10 + scrollVal * 4}deg)`;
                if (arcOuterRight) arcOuterRight.style.transform = `translate3d(620px, ${100 + scrollVal * -40}px, -100px) rotate(${10 - scrollVal * 4}deg)`;
            }
        }

        // Floaters parallax
        if (floaters.length > 0) {
            const vh = window.innerHeight;
            const viewportCenter = vh / 2;
            for (const el of floaters) {
                if (el.classList.contains('revealed') && !el.classList.contains('arc-center')) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top < vh && rect.bottom > 0) {
                        const elCenter = rect.top + rect.height / 2;
                        const distance = elCenter - viewportCenter;
                        const yOffset = distance * 0.02;
                        el.style.transform = `translate3d(0, ${yOffset}px, 0)`;
                    }
                }
            }
        }
    }

    // ─── SCROLL REVEAL ───
    function setupRevealObserver() {
        const revealElements = document.querySelectorAll('.reveal-element');
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            }, { rootMargin: '0px 0px -40px 0px', threshold: 0.1 });
            revealElements.forEach((el) => observer.observe(el));
            cleanups.push(() => observer.disconnect());
        } else {
            revealElements.forEach((el) => el.classList.add('revealed'));
        }
    }

    function clamp(val, min, max) {
        return Math.min(max, Math.max(min, val));
    }

    // ─── CATEGORY FILTERS ───
    function setupCategoryFilters() {
        const buttons = document.querySelectorAll('.cat-filter-btn');
        const cards = document.querySelectorAll('.category-card');

        buttons.forEach((btn) => {
            listen(btn, 'click', () => {
                buttons.forEach((b) => b.classList.remove('active'));
                btn.classList.add('active');

                const category = btn.dataset.category;

                cards.forEach((card) => {
                    if (category === 'all' || card.dataset.cat === category) {
                        card.classList.remove('hidden-card');
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        requestAnimationFrame(() => {
                            card.style.transition = 'opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        });
                    } else {
                        card.classList.add('hidden-card');
                    }
                });
            });
        });
    }

    // ─── MARQUEE SETUP ───
    function setupMarquee() {
        const track = document.getElementById('marquee-track');
        if (!track) return;

        const cards = Array.from(track.children);
        const clones = cards.map((card) => {
            const clone = card.cloneNode(true);
            track.appendChild(clone);
            return clone;
        });
        cleanups.push(() => clones.forEach((clone) => clone.remove()));
    }

    // ─── QUALITY CELEBRATION ───
    function setupQualityAnimation() {
        const qualitySection = document.getElementById('craftsmanship');
        const cards = [
            document.getElementById('quality-card-1'),
            document.getElementById('quality-card-2'),
            document.getElementById('quality-card-3')
        ];

        if (!qualitySection || !cards[0]) return;

        if ('IntersectionObserver' in window) {
            const timers = [];
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        cards.forEach(card => card?.classList?.add('play-quality-animation'));
                        timers.push(setTimeout(() => triggerQualityCelebration(cards[0]), 940));
                        timers.push(setTimeout(() => triggerQualityCelebration(cards[1]), 1340));
                        timers.push(setTimeout(() => triggerQualityCelebration(cards[2]), 1740));
                        observer.unobserve(qualitySection);
                    }
                });
            }, { rootMargin: '0px 0px -100px 0px', threshold: 0.2 });
            observer.observe(qualitySection);
            cleanups.push(() => {
                observer.disconnect();
                timers.forEach(clearTimeout);
            });
        } else {
            cards.forEach(card => card?.classList?.add('play-quality-animation'));
        }
    }

    function triggerQualityCelebration(card) {
        if (!card) return;
        const crack = card.querySelector('.impact-crack');
        if (crack) crack.classList.add('crack-animate');

        const numParticles = 4;
        const positions = [
            { x: '10%', y: '-20px', drift: '-25px', type: 'rectangle' },
            { x: '85%', y: '-10px', drift: '30px', type: 'diamond' },
            { x: '25%', y: '-25px', drift: '-15px', type: 'diamond' },
            { x: '70%', y: '-20px', drift: '20px', type: 'rectangle' }
        ];

        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.className = `celebration-particle ${positions[i].type}`;
            particle.style.left = positions[i].x;
            particle.style.top = positions[i].y;
            particle.style.setProperty('--drift-x', positions[i].drift);
            card.appendChild(particle);

            requestAnimationFrame(() => {
                particle.classList.add('particle-fall');
            });
            setTimeout(() => particle.remove(), 1600);
        }
    }

    // ─── UTILITIES ───
    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    function debounce(fn, delay) {
        let timer;
        cleanups.push(() => clearTimeout(timer));
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    // ─── BACKGROUND PRELOAD GATE ───
    window.__rkHeroReady = false;
    function enableBackgroundLoading() {
        if (backgroundReady || abort.signal.aborted) return;
        backgroundReady = true;
        for (const seq of sequences) seq.allRequested = false;
        pumpLoader();
    }
    if (document.documentElement.classList.contains('rk-intro-active')) {
        listen(window, 'rk:intro-done', enableBackgroundLoading, { once: true });
    }
    const backgroundTimer = setTimeout(
        enableBackgroundLoading,
        document.documentElement.classList.contains('rk-intro-active') ? 9000 : 1500
    );
    cleanups.push(() => clearTimeout(backgroundTimer));

    // ─── BOOT ───
    if (document.readyState === 'loading') {
        listen(document, 'DOMContentLoaded', () => {
            setupParallaxElements();
            init();
        }, { once: true });
    } else {
        setupParallaxElements();
        init();
    }

    return () => {
        abort.abort();
        cleanups.forEach((fn) => fn());
        sequences.length = 0;
    };
}
