// @ts-nocheck
/* ============================================
   MAISON ÉLÉGANCE — Scroll-Driven Animation Engine
   + Category Filters, Marquee, Brand Carousel
   ============================================ */

export function initScrollSequence() {
    'use strict';

    // ─── CONFIGURATION ───
    const LERP_FACTOR = 0.08;
    const PRELOAD_BATCH = 20;
    const PRELOAD_PRIORITY_COUNT = 50;

    // ─── SCROLL SEQUENCE CLASS ───
    class ScrollSequence {
        constructor(config) {
            this.config = config;
            this.state = {
                images: new Array(config.totalFrames),
                loadedCount: 0,
                currentFrame: 0,
                targetFrame: 0,
                lerpedFrame: 0,
                scrollProgress: 0,
                canvas: document.getElementById(config.canvasId),
                ctx: null,
                heroSection: document.getElementById(config.sectionId),
                heroContainer: null,
                animating: false,
                canvasWidth: 0,
                canvasHeight: 0,
            };

            if (!this.state.canvas || !this.state.heroSection) return;

            this.state.ctx = this.state.canvas.getContext('2d', { alpha: false });
            this.state.heroContainer = this.state.heroSection.querySelector('.hero-scroll-container');

            this.resizeCanvas = this.resizeCanvas.bind(this);
            this.onScroll = this.onScroll.bind(this);
            this.renderLoop = this.renderLoop.bind(this);

            this.resizeCanvas();
            this.preloadImages();
            this.setupScrollListener();

            window.addEventListener('resize', debounce(this.resizeCanvas, 200));
            this.state.animating = true;
            requestAnimationFrame(this.renderLoop);
        }

        // ─── CANVAS RESIZE ───
        resizeCanvas() {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const width = window.innerWidth;
            const height = window.innerHeight;

            this.state.canvas.width = width * dpr;
            this.state.canvas.height = height * dpr;
            this.state.canvas.style.width = width + 'px';
            this.state.canvas.style.height = height + 'px';
            this.state.ctx.scale(dpr, dpr);

            this.state.canvasWidth = width;
            this.state.canvasHeight = height;
            this.drawFrame(Math.round(this.state.lerpedFrame));
        }

        // ─── IMAGE PRELOADING ───
        preloadImages() {
            const priorityPromises = [];
            for (let i = 0; i < PRELOAD_PRIORITY_COUNT && i < this.config.totalFrames; i++) {
                priorityPromises.push(this.loadImage(i));
            }
            Promise.all(priorityPromises).then(() => {
                this.loadRemainingImages(PRELOAD_PRIORITY_COUNT);
            });
        }

        loadImage(index) {
            return new Promise((resolve) => {
                if (this.state.images[index]) { resolve(); return; }
                const img = new Image();
                const frameNum = String(index + 1).padStart(3, '0');
                img.src = this.config.framePath + frameNum + this.config.frameExt;
                img.onload = () => {
                    this.state.images[index] = img;
                    this.state.loadedCount++;
                    if (index === 0 && this.state.lerpedFrame < 1) {
                        this.drawFrame(0);
                    }
                    resolve();
                };
                img.onerror = () => resolve();
            });
        }

        loadRemainingImages(startIndex) {
            let i = startIndex;
            const loadBatch = () => {
                const batchEnd = Math.min(i + PRELOAD_BATCH, this.config.totalFrames);
                const promises = [];
                for (; i < batchEnd; i++) {
                    if (!this.state.images[i]) promises.push(this.loadImage(i));
                }
                if (i < this.config.totalFrames) {
                    Promise.all(promises).then(() => {
                        if ('requestIdleCallback' in window) {
                            requestIdleCallback(loadBatch, { timeout: 1000 });
                        } else {
                            setTimeout(loadBatch, 100);
                        }
                    });
                }
            };
            loadBatch();
        }

        // ─── FRAME DRAWING ───
        drawFrame(frameIndex) {
            const idx = Math.max(0, Math.min(this.config.totalFrames - 1, Math.round(frameIndex)));
            const img = this.state.images[idx];
            if (!img) return;

            const ctx = this.state.ctx;
            const cw = this.state.canvasWidth;
            const ch = this.state.canvasHeight;
            const iw = img.naturalWidth;
            const ih = img.naturalHeight;
            const scale = Math.max(cw / iw, ch / ih);
            const w = iw * scale;
            const h = ih * scale;
            const x = (cw - w) / 2;
            const y = (ch - h) / 2;

            ctx.clearRect(0, 0, cw, ch);
            ctx.drawImage(img, x, y, w, h);

            this.state.currentFrame = idx;
        }

        // ─── SCROLL HANDLING ───
        setupScrollListener() {
            window.addEventListener('scroll', this.onScroll, { passive: true });
            this.onScroll();
        }

        onScroll() {
            const heroRect = this.state.heroContainer.getBoundingClientRect();
            const heroTop = -heroRect.top;
            const heroHeight = heroRect.height - window.innerHeight;

            const effectiveHeight = heroHeight * 0.98;

            if (heroTop < 0) {
                this.state.scrollProgress = 0;
            } else if (heroTop > effectiveHeight) {
                this.state.scrollProgress = 1;
            } else {
                this.state.scrollProgress = heroTop / effectiveHeight;
            }

            this.state.targetFrame = this.state.scrollProgress * (this.config.totalFrames - 1);
            if (this.config.isMain) {
                this.updateScrollIndicator(this.state.scrollProgress);
            }
            this.updateHeroCounter(this.state.scrollProgress);
        }

        // ─── RENDER LOOP ───
        renderLoop() {
            if (!this.state.animating) return;
            const diff = this.state.targetFrame - this.state.lerpedFrame;
            if (Math.abs(diff) > 0.1) {
                this.state.lerpedFrame += diff * LERP_FACTOR;
                this.drawFrame(this.state.lerpedFrame);
            } else if (Math.abs(diff) > 0.01) {
                this.state.lerpedFrame = this.state.targetFrame;
                this.drawFrame(this.state.lerpedFrame);
            }

            this.updateHeroText(this.state.lerpedFrame);

            requestAnimationFrame(this.renderLoop);
        }

        // ─── HERO TEXT OVERLAYS ───
        updateHeroText(frame) {
            const overlays = this.state.heroSection.querySelectorAll('.hero-text-overlay');
            const isMobile = window.innerWidth <= 1024;

            overlays.forEach((overlay) => {
                // No dynamic reposition – keep original static placement

                let opacity = 0;
                let translateY = 30;
                let blur = 4;
                let scale = 0.97;

                let startFrame = 0;
                let endFrame = 0;
                let fadeInFrames = 3;
                let fadeOutFrames = 3;

                // Frame timings — use class-based detection for reusable sections
                if (overlay.classList.contains('text-first') || overlay.id === 'hero-text-1') {
                    if (this.config.isMain) {
                        startFrame = 15;
                        endFrame = 55;
                    } else {
                        // New sections: show title right from the start
                        startFrame = 2;
                        endFrame = 0.12 * (this.config.totalFrames - 1);
                        fadeInFrames = 5;
                    }
                } else if (overlay.classList.contains('text-last') || overlay.id === 'hero-text-6') {
                    if (this.config.isMain) {
                        // Original hero: appears earlier so it has time to fade in fully
                        startFrame = this.config.totalFrames - 15;
                    } else {
                        // New sections: appear at 80% progress so there's plenty of time
                        startFrame = 0.80 * (this.config.totalFrames - 1);
                    }
                    endFrame = this.config.totalFrames + 10; // never ends
                    fadeOutFrames = 0;
                    fadeInFrames = 8;
                } else if (overlay.dataset.start && overlay.dataset.end) {
                    const pStart = parseFloat(overlay.dataset.start);
                    const pEnd = parseFloat(overlay.dataset.end);
                    startFrame = pStart * (this.config.totalFrames - 1);
                    endFrame = pEnd * (this.config.totalFrames - 1);
                    fadeInFrames = 0.03 * (this.config.totalFrames - 1);
                    fadeOutFrames = 0.03 * (this.config.totalFrames - 1);
                }

                if (frame >= startFrame && frame <= endFrame) {
                    const fadeInEnd = startFrame + fadeInFrames;
                    const fadeOutStart = endFrame - fadeOutFrames;

                    if (frame < fadeInEnd) {
                        const t = easeOutCubic((frame - startFrame) / fadeInFrames);
                        opacity = t;
                        translateY = 30 * (1 - t);
                        blur = 4 * (1 - t);
                        scale = 0.97 + 0.03 * t;
                    } else if (frame <= fadeOutStart || fadeOutFrames === 0) {
                        opacity = 1; translateY = 0; blur = 0; scale = 1;
                    } else {
                        const t = easeOutCubic((frame - fadeOutStart) / fadeOutFrames);
                        opacity = 1 - t;
                        translateY = -20 * t;
                        blur = 4 * t;
                        scale = 1 + 0.02 * t;
                    }
                }

                if (overlay.classList.contains('text-first') || overlay.classList.contains('text-last') ||
                    overlay.id === 'hero-text-1' || overlay.id === 'hero-text-6' || !this.config.isMain) {
                    // Bottom-left positioning (all new section overlays + original first/last)
                    overlay.style.cssText = `opacity:${opacity};transform:translateY(${translateY}px) scale(${scale});filter:blur(${blur}px);will-change:transform,opacity,filter; top:auto!important; right:auto!important; bottom:14%!important; left:6%!important; text-align:left!important; align-items:flex-start!important; justify-content:flex-start!important;`;
                } else if (isMobile) {
                    overlay.style.cssText = `opacity:${opacity};transform:translateY(${translateY}px) scale(${scale});filter:blur(${blur}px);will-change:transform,opacity,filter;`;
                } else {
                    // Original hero — right side overlays
                    overlay.style.cssText = `opacity:${opacity};transform:translateY(-50%) translateX(${20 * (1 - opacity)}px) scale(${scale});filter:blur(${blur}px);will-change:transform,opacity,filter;`;
                }
            });
        }

        // ─── HERO COUNTER ───
        updateHeroCounter(progress) {
            const counter = this.state.heroSection.querySelector('.hero-counter');
            if (!counter) return;
            const currentEl = counter.querySelector('.counter-current');
            if (!currentEl) return;

            let num = 1;
            if (this.config.isMain) {
                if (progress >= 0.900) num = 8;
                else if (progress >= 0.777) num = 7;
                else if (progress >= 0.706) num = 6;
                else if (progress >= 0.612) num = 5;
                else if (progress >= 0.528) num = 4;
                else if (progress >= 0.300) num = 3;
                else if (progress >= 0.150) num = 2;
            } else {
                if (progress >= 0.82) num = 6;
                else if (progress >= 0.60) num = 5;
                else if (progress >= 0.47) num = 4;
                else if (progress >= 0.30) num = 3;
                else if (progress >= 0.15) num = 2;
            }
            currentEl.textContent = '0' + num;
        }

        // ─── SCROLL INDICATOR ───
        updateScrollIndicator(progress) {
            const indicator = this.state.heroSection.querySelector('.scroll-indicator');
            if (!indicator) return;
            if (progress > 0.02) {
                indicator.classList.add('hidden');
            } else {
                indicator.classList.remove('hidden');
            }
        }
    }

    // ─── INIT ───
    function init() {
        // Initialize the main hero sequence
        new ScrollSequence({
            canvasId: 'hero-canvas',
            sectionId: 'hero',
            totalFrames: 539,
            framePath: 'frames/ezgif-frame-',
            frameExt: '.jpg',
            isMain: true
        });

        // Initialize additional sequences if they exist
        if (document.getElementById('hero2')) {
            new ScrollSequence({
                canvasId: 'hero-canvas-2',
                sectionId: 'hero2',
                totalFrames: 300,
                framePath: 'frames2/ezgif-frame-',
                frameExt: '.jpg',
                isMain: false
            });
        }
        if (document.getElementById('hero3')) {
            new ScrollSequence({
                canvasId: 'hero-canvas-3',
                sectionId: 'hero3',
                totalFrames: 300,
                framePath: 'frames3/ezgif-frame-',
                frameExt: '.jpg',
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
                framePath: 'frames5/ezgif-frame-',
                frameExt: '.jpg',
                isMain: false
            });
        }
        if (document.getElementById('hero6')) {
            new ScrollSequence({
                canvasId: 'hero-canvas-6',
                sectionId: 'hero6',
                totalFrames: 300,
                framePath: 'frames6/ezgif-frame-',
                frameExt: '.jpg',
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
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    introOverlay.classList.add('is-scrolled');
                } else {
                    introOverlay.classList.remove('is-scrolled');
                }
            });
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
        } else {
            revealElements.forEach((el) => el.classList.add('revealed'));
        }
    }

    // ─── 3D PRODUCT CARD TRANSITION ───
    let transitionElements = null;

    function setup3DTransition() {
        transitionElements = {
            heroContainer: document.querySelector('.hero-scroll-container'),
            canvas: document.getElementById('hero-canvas'),
            flyingHandbag: document.getElementById('flying-handbag'),
            flyingImg: document.getElementById('flying-handbag-img'),
            landingCard: document.getElementById('landing-card'),
            landingImg: document.getElementById('landing-card-img')
        };
    }

    function update3DTransition(mainState) {
        if (!transitionElements || !transitionElements.landingCard) return;

        const heroRect = transitionElements.heroContainer.getBoundingClientRect();
        const heroBottom = heroRect.bottom;

        // We calculate scroll past the hero container
        const scrollPastHero = window.innerHeight - heroBottom;

        if (scrollPastHero <= 0) {
            // Still in the hero section, hide flying handbag
            transitionElements.flyingHandbag.style.opacity = '0';
            transitionElements.flyingHandbag.style.pointerEvents = 'none';
            transitionElements.canvas.style.opacity = '1';
            transitionElements.landingImg.style.opacity = '0';
            return;
        }

        // We have scrolled past the hero. 
        // Transition happens over ~80vh of scrolling distance.
        const transitionDistance = window.innerHeight * 0.8;
        let tProgress = clamp(scrollPastHero / transitionDistance, 0, 1);

        // Easing for smooth cinematic movement
        const easedProgress = easeInOutCubic(tProgress);

        if (tProgress >= 1) {
            // Transition complete: show the image in the real product card
            transitionElements.flyingHandbag.style.opacity = '0';
            transitionElements.landingImg.style.opacity = '1';
            return;
        }

        // Active transition: Hide canvas and landing image, show flying overlay
        transitionElements.canvas.style.opacity = '0';
        transitionElements.landingImg.style.opacity = '0';
        transitionElements.flyingHandbag.style.opacity = '1';

        // 1. Calculate the starting rect (where the canvas drew the image in the viewport)
        const img = mainState.images[Math.round(mainState.lerpedFrame)] || mainState.images[mainState.images.length - 1];
        if (!img) return;

        const cw = mainState.canvasWidth;
        const ch = mainState.canvasHeight;
        const iw = img.naturalWidth;
        const ih = img.naturalHeight;
        const scale = Math.max(cw / iw, ch / ih);
        const startW = iw * scale;
        const startH = ih * scale;
        const startX = (cw - startW) / 2;
        const startY = (ch - startH) / 2;

        // 2. Calculate the target rect (current viewport position of the landing card image slot)
        const targetRect = transitionElements.landingImg.parentElement.getBoundingClientRect();

        // 3. Interpolate position and size
        const currentX = startX + (targetRect.left - startX) * easedProgress;
        const currentY = startY + (targetRect.top - startY) * easedProgress;
        const currentW = startW + (targetRect.width - startW) * easedProgress;
        const currentH = startH + (targetRect.height - startH) * easedProgress;

        // 4. Add subtle 3D cinematic rotation during flight
        const rotatePhase = Math.sin(easedProgress * Math.PI);
        const rotateX = rotatePhase * 8;
        const rotateY = rotatePhase * -4;
        const rotateZ = rotatePhase * 1.5;

        // Apply transforms
        transitionElements.flyingHandbag.style.cssText = `
            opacity: 1;
            transform: perspective(1200px) translate3d(${currentX}px, ${currentY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg);
            width: ${currentW}px;
            height: ${currentH}px;
            will-change: transform, width, height;
        `;

        // Also ensure the flying image perfectly fills its container
        transitionElements.flyingImg.style.cssText = `
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: ${easedProgress * 24}px;
        `;
    }

    function clamp(val, min, max) {
        return Math.min(max, Math.max(min, val));
    }

    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    // ─── CATEGORY FILTERS ───
    function setupCategoryFilters() {
        const buttons = document.querySelectorAll('.cat-filter-btn');
        const cards = document.querySelectorAll('.category-card');

        buttons.forEach((btn) => {
            btn.addEventListener('click', () => {
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
        cards.forEach((card) => {
            const clone = card.cloneNode(true);
            track.appendChild(clone);
        });
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
        window.addEventListener('scroll', () => {
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
        });
    }

    // ─── GLOBAL SCROLL PARALLAX ───
    function setupScrollParallax() {
        const floaters = document.querySelectorAll('.hover-float-parent');
        window.addEventListener('scroll', () => {
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
        });
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
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Start the sequence
                        cards.forEach(card => card.classList.add('play-quality-animation'));

                        // Precise timing for impacts based on CSS animation delays and duration
                        setTimeout(() => triggerQualityCelebration(cards[0]), 940);
                        setTimeout(() => triggerQualityCelebration(cards[1]), 1340);
                        setTimeout(() => triggerQualityCelebration(cards[2]), 1740);

                        observer.unobserve(qualitySection);
                    }
                });
            }, { rootMargin: '0px 0px -100px 0px', threshold: 0.2 });
            observer.observe(qualitySection);
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
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    // ─── BOOT ───
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
}
