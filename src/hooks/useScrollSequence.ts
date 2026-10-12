// @ts-nocheck
/* ============================================
   MAISON ÉLÉGANCE — Scroll-Driven Animation Engine
   + Category Filters, Marquee, Brand Carousel
   ============================================ */

/**
 * Boots every scroll-driven effect on the homepage.
 * Returns a cleanup function — call it when the page unmounts so listeners,
 * render loops and pending frame downloads don't pile up across navigations
 * (and React Strict Mode's double-mount doesn't run two engines on one canvas).
 */
export function initScrollSequence(): () => void {
    'use strict';

    // ─── CONFIGURATION ───
    const LERP_FACTOR = 0.12;          // easing per 60fps frame (time-corrected for 120Hz screens)
    const MAX_CONCURRENT_LOADS = 2;    // frames downloading at once, shared by all sequences
    const NEAR_WINDOW_BEHIND = 6;      // frames behind the scroll position to fetch first
    const NEAR_WINDOW_AHEAD = 12;      // frames ahead of the scroll position to fetch first
    const COARSE_STEPS = [32]; // sparse previews for large scroll jumps
    const START_LOADING_MARGIN = '50% 0px';   // start downloading a section ~1.5 screens before it

    const abort = new AbortController();
    const listen = (target, type, fn, opts = {}) =>
        target.addEventListener(type, fn, { ...opts, signal: abort.signal });
    const cleanups = [];
    const sequences = [];

    // ─── SHARED FRAME LOADER ───
    // One queue for all sequences so the section on screen always gets bandwidth first.
    let inflight = 0;

    function pumpLoader() {
        if (abort.signal.aborted) return;
        while (inflight < MAX_CONCURRENT_LOADS) {
            let best = null;
            for (const seq of sequences) {
                if (!seq.loadingStarted || seq.allRequested) continue;
                if (!best || seq.loadPriority() > best.loadPriority()) best = seq;
            }
            if (!best) return;

            const index = best.nextFrameToLoad();
            if (index < 0) {
                best.allRequested = true;
                continue;
            }

            inflight++;
            best.loadFrame(index).finally(() => {
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
            this.loadOrder = buildLoadOrder(this.total);
            this.loadOrderPos = 0;
            this.loadingStarted = false;
            this.allRequested = false;

            this.targetFrame = 0;
            this.lerpedFrame = 0;
            this.drawnIndex = -1;
            this.lastTextFrame = -1;
            this.lastCounterNum = 0;
            this.isVisible = false;
            this.isNear = false;
            this.rafId = 0;
            this.lastTime = 0;

            this.canvas = document.getElementById(config.canvasId);
            this.section = document.getElementById(config.sectionId);
            if (!this.canvas || !this.section) return;

            this.container = this.section.querySelector('.hero-scroll-container');
            this.ctx = this.canvas.getContext('2d', { alpha: false });
            this.counterEl = this.section.querySelector('.hero-counter .counter-current');
            this.indicatorEl = config.isMain ? this.section.querySelector('.scroll-indicator') : null;
            this.overlays = this.buildOverlays();

            this.resizeCanvas = this.resizeCanvas.bind(this);
            this.onScroll = this.onScroll.bind(this);
            this.renderLoop = this.renderLoop.bind(this);

            this.resizeCanvas();
            listen(window, 'resize', debounce(this.resizeCanvas, 150));
            listen(window, 'scroll', this.onScroll, { passive: true });
            this.onScroll();
            this.updateHeroText(0);
            this.observeViewport();

            if (config.isMain) this.startLoading();
            sequences.push(this);
        }

        // ─── VIEWPORT TRACKING ───
        observeViewport() {
            // Visible → render loop runs. Off-screen sections cost nothing per frame.
            const visibleObserver = new IntersectionObserver((entries) => {
                this.isVisible = entries[0].isIntersecting;
                if (this.isVisible) {
                    this.onScroll();
                    this.lerpedFrame = this.targetFrame; // jump straight to the right frame on entry
                    this.drawFrame(this.lerpedFrame, true);
                    this.updateHeroText(this.lerpedFrame);
                    this.startRenderLoop();
                }
                pumpLoader();
            });
            visibleObserver.observe(this.container);

            // Near the viewport → start downloading this section's frames.
            const nearObserver = new IntersectionObserver((entries) => {
                this.isNear = entries[0].isIntersecting;
                if (this.isNear) this.startLoading();
                pumpLoader();
            }, { rootMargin: START_LOADING_MARGIN });
            nearObserver.observe(this.container);

            cleanups.push(() => {
                visibleObserver.disconnect();
                nearObserver.disconnect();
                cancelAnimationFrame(this.rafId);
                this.images.length = 0;
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

        // ─── CANVAS RESIZE ───
        resizeCanvas() {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const width = window.innerWidth;
            const height = window.innerHeight;
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

        // ─── FRAME LOADING ───
        // Fetch nearby frames first, then sparse previews for large scroll jumps.
        // Remaining frames load as the visitor scrolls, leaving bandwidth for products.
        nextFrameToLoad() {
            const center = Math.round(this.targetFrame);
            for (let d = 0; d <= NEAR_WINDOW_AHEAD; d++) {
                const ahead = center + d;
                if (ahead < this.total && !this.requested[ahead]) return ahead;
                const behind = center - d;
                if (d <= NEAR_WINDOW_BEHIND && behind >= 0 && !this.requested[behind]) return behind;
            }
            while (this.loadOrderPos < this.loadOrder.length) {
                const index = this.loadOrder[this.loadOrderPos++];
                if (!this.requested[index]) return index;
            }
            return -1;
        }

        loadFrame(index) {
            this.requested[index] = 1;
            return new Promise((resolve) => {
                const img = new Image();
                img.decoding = 'async';
                const frameNum = String(index + 1).padStart(3, '0');
                img.src = this.config.framePath + frameNum + this.config.frameExt;

                const ready = () => {
                    if (abort.signal.aborted) return resolve();
                    this.images[index] = img;
                    // Paint the first frame right away; afterwards only repaint on-screen
                    // sections when this frame is closer to the scroll position than what's shown
                    const want = Math.round(this.lerpedFrame);
                    if (this.drawnIndex < 0 ||
                        (this.isVisible && Math.abs(index - want) < Math.abs(this.drawnIndex - want))) {
                        this.drawFrame(this.lerpedFrame, true);
                    }
                    resolve();
                };
                // decode() keeps the expensive image decode off the scroll path
                img.decode().then(ready, () => {
                    if (img.complete && img.naturalWidth) ready();
                    else resolve();
                });
            });
        }

        // Closest loaded frame to the requested index (never leaves the canvas stuck)
        nearestLoaded(index) {
            if (this.images[index]) return index;
            for (let d = 1; d < this.total; d++) {
                const before = index - d;
                const after = index + d;
                if (before >= 0 && this.images[before]) return before;
                if (after < this.total && this.images[after]) return after;
                if (before < 0 && after >= this.total) break;
            }
            return -1;
        }

        // ─── FRAME DRAWING ───
        drawFrame(frame, force = false) {
            const wanted = Math.max(0, Math.min(this.total - 1, Math.round(frame)));
            const idx = this.nearestLoaded(wanted);
            if (idx < 0 || (!force && idx === this.drawnIndex)) return;

            const img = this.images[idx];
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

        // ─── SCROLL HANDLING ───
        onScroll() {
            if (!this.container) return;
            const rect = this.container.getBoundingClientRect();
            const scrolled = -rect.top;
            const effectiveHeight = (rect.height - window.innerHeight) * 0.98;
            const progress = effectiveHeight > 0 ? clamp(scrolled / effectiveHeight, 0, 1) : 0;

            this.targetFrame = progress * (this.total - 1);

            if (this.indicatorEl) this.indicatorEl.classList.toggle('hidden', progress > 0.02);
            this.updateHeroCounter(progress);
            if (this.isVisible) {
                // New scroll position → frames around it may still need fetching
                this.allRequested = false;
                pumpLoader();
            }
        }

        // ─── RENDER LOOP ───
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

            const dt = Math.min(now - this.lastTime, 100);
            this.lastTime = now;

            const diff = this.targetFrame - this.lerpedFrame;
            if (Math.abs(diff) > 0.05) {
                // Frame-rate independent easing: same feel at 60Hz and 120Hz
                const t = 1 - Math.pow(1 - LERP_FACTOR, dt / 16.667);
                this.lerpedFrame += diff * t;
            } else {
                this.lerpedFrame = this.targetFrame;
            }

            this.drawFrame(this.lerpedFrame);
            if (Math.abs(this.lerpedFrame - this.lastTextFrame) > 0.01) {
                this.updateHeroText(this.lerpedFrame);
            }

            this.rafId = requestAnimationFrame(this.renderLoop);
        }

        // ─── HERO TEXT OVERLAYS ───
        // Timing for each overlay is computed once instead of on every animation frame.
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
                    fadeInFrames = 0; // fully visible immediately at frame 0
                    if (this.config.isMain) {
                        endFrame = 0.10 * last;
                        fadeOutFrames = 12;
                    } else {
                        endFrame = 0.12 * last;
                        fadeOutFrames = 8;
                    }
                } else if (isLast) {
                    // Main hero: appears at 86%; other sections at 80% so there's time to read it
                    startFrame = (this.config.isMain ? 0.86 : 0.80) * last;
                    endFrame = this.total + 10; // never ends
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
                };
            });
        }

        updateHeroText(frame) {
            this.lastTextFrame = frame;

            for (const o of this.overlays) {
                let opacity = 0;
                let translateY = 30;
                let blur = 4;
                let scale = 0.97;

                if (frame >= o.startFrame && frame <= o.endFrame) {
                    const fadeInEnd = o.startFrame + o.fadeInFrames;
                    const fadeOutStart = o.endFrame - o.fadeOutFrames;

                    if (o.fadeInFrames > 0 && frame < fadeInEnd) {
                        const t = easeOutCubic((frame - o.startFrame) / o.fadeInFrames);
                        opacity = t;
                        translateY = 30 * (1 - t);
                        blur = 4 * (1 - t);
                        scale = 0.97 + 0.03 * t;
                    } else if (frame <= fadeOutStart || o.fadeOutFrames === 0) {
                        opacity = 1; translateY = 0; blur = 0; scale = 1;
                    } else {
                        const t = easeOutCubic((frame - fadeOutStart) / o.fadeOutFrames);
                        opacity = 1 - t;
                        translateY = -20 * t;
                        blur = 4 * t;
                        scale = 1 + 0.02 * t;
                    }
                }

                // Hidden and still hidden → nothing to write
                if (opacity === 0 && o.lastOpacity === 0) continue;
                o.lastOpacity = opacity;

                const style = o.el.style;
                style.opacity = String(opacity);
                style.transform = `translateY(${translateY}px) scale(${scale})`;
                style.filter = blur > 0.05 ? `blur(${blur}px)` : 'none';
                style.pointerEvents = (opacity > 0.1 && (o.isFirst || o.isLast || o.hasLink)) ? 'auto' : 'none';
                style.willChange = opacity > 0 ? 'transform, opacity, filter' : 'auto';
            }
        }

        // ─── HERO COUNTER ───
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

    function buildLoadOrder(total) {
        const seen = new Uint8Array(total);
        const order = [];
        for (const step of COARSE_STEPS) {
            for (let i = 0; i < total; i += step) {
                if (!seen[i]) {
                    seen[i] = 1;
                    order.push(i);
                }
            }
        }
        if (!seen[total - 1]) order.push(total - 1);
        return order;
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

        // Initialize additional sequences if they exist
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
        if (document.getElementById('hero3')) {
            new ScrollSequence({
                canvasId: 'hero-canvas-3',
                sectionId: 'hero3',
                totalFrames: 299,
                framePath: 'hero3-frames-png/ezgif-frame-',
                frameExt: '.webp',
                isMain: false
            });
        }
        if (document.getElementById('hero4')) {
            new ScrollSequence({
                canvasId: 'hero-canvas-4',
                sectionId: 'hero4',
                totalFrames: 240,
                framePath: 'frames4/ezgif-frame-',
                frameExt: '.jpg',
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

        setupRevealObserver();
        setupCategoryFilters();
        setupMarquee();
        setupArcGallery();
        setupScrollParallax();
        setupQualityAnimation();

        // ─── INTRO OVERLAY SCROLL TO CORNER ───
        const introOverlay = document.getElementById('intro-overlay');
        if (introOverlay) {
            if (window.scrollY > 50) introOverlay.classList.add('is-scrolled');
            listen(window, 'scroll', () => {
                if (window.scrollY > 50) {
                    introOverlay.classList.add('is-scrolled');
                } else {
                    introOverlay.classList.remove('is-scrolled');
                }
            }, { passive: true });
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
            }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });
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
                // Update active button
                buttons.forEach((b) => b.classList.remove('active'));
                btn.classList.add('active');

                const category = btn.dataset.category;

                cards.forEach((card) => {
                    if (category === 'all' || card.dataset.cat === category) {
                        card.classList.remove('hidden-card');
                        // Re-trigger reveal
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(30px)';
                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                card.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)';
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            });
                        });
                    } else {
                        card.classList.add('hidden-card');
                    }
                });
            });
        });
    }

    // ─── MARQUEE SETUP (duplicate content for infinite scroll) ───
    function setupMarquee() {
        const track = document.getElementById('marquee-track');
        if (!track) return;

        // Clone the cards for seamless loop
        const cards = Array.from(track.children);
        const clones = cards.map((card) => {
            const clone = card.cloneNode(true);
            track.appendChild(clone);
            return clone;
        });
        cleanups.push(() => clones.forEach((clone) => clone.remove()));
    }

    // ─── WORLD'S MOST LOVED (ARC GALLERY) ───
    function setupArcGallery() {
        const arcContainer = document.getElementById('arc-wrapper');
        if (!arcContainer) return;

        const center = arcContainer.querySelector('.arc-center');
        const innerLeft = arcContainer.querySelector('.arc-inner-left');
        const innerRight = arcContainer.querySelector('.arc-inner-right');
        const outerLeft = arcContainer.querySelector('.arc-outer-left');
        const outerRight = arcContainer.querySelector('.arc-outer-right');

        // Scroll listener for the arc parallax
        listen(window, 'scroll', () => {
            const rect = arcContainer.getBoundingClientRect();
            // Visible when top is less than window height and bottom is greater than 0
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                // Scroll progress relative to the arc container center
                const centerOffset = window.innerHeight / 2;
                const relativeScroll = (rect.top + rect.height / 2 - centerOffset) / centerOffset;
                const scrollVal = clamp(relativeScroll, -1, 1);

                // Only apply parallax if screen is large enough (desktop)
                if (window.innerWidth > 768) {
                    if (center) center.style.transform = `translate3d(0, ${scrollVal * -15}px, 0)`;
                    if (innerLeft) innerLeft.style.transform = `translate3d(-340px, ${40 + scrollVal * -25}px, -50px) rotate(${-5 + scrollVal * 2}deg)`;
                    if (innerRight) innerRight.style.transform = `translate3d(340px, ${40 + scrollVal * -25}px, -50px) rotate(${5 - scrollVal * 2}deg)`;
                    if (outerLeft) outerLeft.style.transform = `translate3d(-620px, ${100 + scrollVal * -40}px, -100px) rotate(${-10 + scrollVal * 4}deg)`;
                    if (outerRight) outerRight.style.transform = `translate3d(620px, ${100 + scrollVal * -40}px, -100px) rotate(${10 - scrollVal * 4}deg)`;
                }
            }
        }, { passive: true });
    }

    // ─── GLOBAL SCROLL PARALLAX ───
    function setupScrollParallax() {
        const floaters = document.querySelectorAll('.hover-float-parent');
        if (floaters.length === 0) return;
        listen(window, 'scroll', () => {
            const viewportCenter = window.innerHeight / 2;
            floaters.forEach(el => {
                // Only apply parallax if it has finished its reveal animation
                if (el.classList.contains('revealed') && !el.classList.contains('arc-center')) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        const elCenter = rect.top + rect.height / 2;
                        const distance = elCenter - viewportCenter;
                        // Extremely subtle parallax so it doesn't distract from the float
                        const yOffset = distance * 0.02;
                        el.style.transform = `translate3d(0, ${yOffset}px, 0)`;
                    }
                }
            });
        }, { passive: true });
    }

    // ─── QUALITY FIRST PHYSICAL ANIMATION ───
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
                        // Start the sequence
                        cards.forEach(card => card.classList.add('play-quality-animation'));

                        // Precise timing for impacts based on CSS animation delays and duration
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
            cards.forEach(card => card.classList.add('play-quality-animation'));
        }
    }

    function triggerQualityCelebration(card) {
        if (!card) return;

        // Trigger the crack SVG animation
        const crack = card.querySelector('.impact-crack');
        if (crack) crack.classList.add('crack-animate');

        // Spawn falling celebration particles
        const numParticles = 5;
        const positions = [
            { x: '10%', y: '-20px', drift: '-30px', type: 'rectangle' },
            { x: '90%', y: '-10px', drift: '40px', type: 'diamond' },
            { x: '20%', y: '-30px', drift: '-20px', type: 'diamond' },
            { x: '80%', y: '-25px', drift: '25px', type: 'rectangle' },
            { x: '50%', y: '-15px', drift: '10px', type: 'diamond' }
        ];

        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.className = `celebration-particle ${positions[i].type}`;
            particle.style.left = positions[i].x;
            particle.style.top = positions[i].y;
            // Pass drift value to CSS var
            particle.style.setProperty('--drift-x', positions[i].drift);

            card.appendChild(particle);

            // Trigger animation
            requestAnimationFrame(() => {
                particle.classList.add('particle-fall');
            });

            // Cleanup after animation finishes
            setTimeout(() => {
                particle.remove();
            }, 1600);
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

    // ─── BOOT ───
    if (document.readyState === 'loading') {
        listen(document, 'DOMContentLoaded', init, { once: true });
    } else {
        init();
    }

    return () => {
        abort.abort();
        cleanups.forEach((fn) => fn());
        sequences.length = 0;
    };
}
