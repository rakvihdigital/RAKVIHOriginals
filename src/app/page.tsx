"use client";

import { useEffect } from 'react';
import { initScrollSequence } from '../hooks/useScrollSequence';

export default function Home() {
    useEffect(() => {
        initScrollSequence();
    }, []);

    return (
        <main>

            {/*  INTRO OVERLAY  */}
            <div id="intro-overlay" className="intro-overlay">
                <div className="intro-content">
                    <h1 className="hero-title-bold" style={{ "marginBottom": "0" }}>RAKVIH ORIGINALS</h1>
                    <p className="intro-subtitle">Explore the tour</p>
                </div>
            </div>


            {/*  ============================================================  */}
            {/*  HERO SECTION — SCROLL-DRIVEN ANIMATION                        */}
            {/*  ============================================================  */}
            <section id="hero" className="hero-section">
                <div className="hero-scroll-container">
                    <div className="hero-sticky">
                        <canvas id="hero-canvas" className="hero-canvas"></canvas>

                        {/*  Gradient overlay for text legibility  */}
                        <div className="hero-gradient-overlay"></div>

                        {/*  CINEMATIC TEXT OVERLAYS — Bold uppercase + stroke style  */}
                        <div className="hero-text-overlay" id="hero-text-1" data-start="0.04" data-end="0.12">
                            <div className="hero-accent-line">
                                <div className="accent-bar"></div>
                                <span className="accent-label">New Season Arrival</span>
                            </div>
                            <h1 className="hero-title-bold">
                                THE ART<br />
                                <span className="hero-title-stroke">OF THE HANDBAG</span>
                            </h1>
                            <p className="hero-desc">Where timeless craftsmanship meets contemporary elegance. Curated luxury for
                                the modern woman.</p>
                            <a href="#collections" className="hero-cta-pill">Explore Collection</a>
                        </div>

                        <div className="hero-text-overlay hero-text-right" id="hero-text-2" data-start="0.15" data-end="0.28">
                            <div className="hero-accent-line">
                                <div className="accent-bar"></div>
                                <span className="accent-label">Craftsmanship</span>
                            </div>
                            <h2 className="hero-title-bold hero-title-md">
                                CRAFTED<br />
                                <span className="hero-title-stroke">TO PERFECTION</span>
                            </h2>
                            <p className="hero-desc">Over 40 individual pieces, hand-assembled by master artisans with generations
                                of savoir-faire.</p>
                        </div>

                        <div className="hero-text-overlay hero-text-right" id="hero-text-3" data-start="0.30" data-end="0.45">
                            <div className="hero-accent-line">
                                <div className="accent-bar"></div>
                                <span className="accent-label">Detail</span>
                            </div>
                            <h2 className="hero-title-bold hero-title-md">
                                EVERY<br />
                                <span className="hero-title-stroke">DETAIL MATTERS</span>
                            </h2>
                            <p className="hero-desc">Premium lambskin leather, precision-polished brass hardware, and hand-stitched
                                cannage quilting.</p>
                        </div>

                        <div className="hero-text-overlay hero-text-right" id="hero-text-4" data-start="0.47" data-end="0.58">
                            <div className="hero-accent-line">
                                <div className="accent-bar"></div>
                                <span className="accent-label">Engineering</span>
                            </div>
                            <h2 className="hero-title-bold hero-title-md">
                                ENGINEERED<br />
                                <span className="hero-title-stroke">BEAUTY</span>
                            </h2>
                            <p className="hero-desc">Each component meticulously designed — from the signature charm to the
                                reinforced base.</p>
                        </div>

                        <div className="hero-text-overlay hero-text-right" id="hero-text-5" data-start="0.60" data-end="0.72">
                            <div className="hero-accent-line">
                                <div className="accent-bar"></div>
                                <span className="accent-label">Form</span>
                            </div>
                            <h2 className="hero-title-bold hero-title-md">
                                THE COMPLETE<br />
                                <span className="hero-title-stroke">FORM</span>
                            </h2>
                            <p className="hero-desc">Precision and artistry converge into a singular expression of luxury.</p>
                        </div>

                        <div className="hero-text-overlay" id="hero-text-6" data-start="0.97" data-end="0.997">
                            <div className="hero-accent-line">
                                <div className="accent-bar"></div>
                                <span className="accent-label">The Collection</span>
                            </div>
                            <h2 className="hero-title-bold hero-title-md">
                                THE LUXURY<br />
                                <span className="hero-title-stroke">COLLECTION</span>
                            </h2>
                            <p className="hero-desc">Five iconic silhouettes, one timeless vision.</p>
                            <a href="#collections" className="hero-cta-pill">Shop The Drop</a>
                        </div>

                        {/*  SCROLL INDICATOR  */}
                        <div className="scroll-indicator" id="scroll-indicator">
                            <div className="scroll-line"></div>
                            <span className="scroll-text">Scroll to explore</span>
                        </div>

                        {/*  SLIDE COUNTER  */}
                        <div className="hero-counter" id="hero-counter">
                            <span className="counter-current">01</span>
                            <div className="counter-divider"></div>
                            <span className="counter-total">06</span>
                        </div>
                    </div>
                </div>
            </section>

            {/*  ============================================================  */}
            {/*  2. SHOP BY CATEGORY — with Landing Product Card               */}
            {/*  ============================================================  */}
            <section id="collections" className="section section-categories">
                <div className="container">


                    <div className="section-header-center reveal-element">
                        <span className="section-eyebrow-gold">Explore Collections</span>
                        <h2 className="section-title-xl">Shop By Category</h2>
                        <p className="section-subtitle">Discover curated luxury selections crafted for every lifestyle.</p>
                    </div>

                    {/*  Category Filter Buttons  */}
                    <div className="category-filters reveal-element">
                        <button className="cat-filter-btn active" data-category="all">All</button>
                        <button className="cat-filter-btn" data-category="totes">Totes</button>
                        <button className="cat-filter-btn" data-category="shoulder">Shoulder Bags</button>
                        <button className="cat-filter-btn" data-category="clutch">Clutches</button>
                        <button className="cat-filter-btn" data-category="crossbody">Crossbody</button>
                    </div>

                    {/*  Category Grid  */}
                    <div className="category-grid" id="category-grid">
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-1" data-cat="totes"
                            id="cat-card-1">
                            <div className="category-card-image">
                                <img src="handbag.webp" alt="D!OR White Lace" loading="lazy"
                                    className="floating-img float-v2 delay-1" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>D!OR White Lace</h3>
                                    <p>Explore Collection</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-2" data-cat="shoulder"
                            id="cat-card-2">
                            <div className="category-card-image">
                                <img src="handbag 2.webp" alt="Ch@nel Boy Bag" loading="lazy"
                                    className="floating-img float-diag delay-2" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>Ch@nel Boy Bag</h3>
                                    <p>Explore Collection</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-3" data-cat="clutch"
                            id="cat-card-3">
                            <div className="category-card-image">
                                <img src="handbag 3.webp" alt="L.V Empreinte Tote" loading="lazy"
                                    className="floating-img float-breathe delay-3" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>L.V Empreinte Tote</h3>
                                    <p>Explore Collection</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-1" data-cat="totes"
                            id="cat-card-4">
                            <div className="category-card-image">
                                <img src="handbag 4.webp" alt="B@rberry Check Trim" loading="lazy"
                                    className="floating-img float-drift delay-4" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>B@rberry Classic</h3>
                                    <p>Explore Collection</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-2" data-cat="crossbody"
                            id="cat-card-5">
                            <div className="category-card-image">
                                <img src="handbag 5.webp" alt="L.V Pastel Monogram" loading="lazy"
                                    className="floating-img float-v1 delay-2" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>L.V Pastel Flap</h3>
                                    <p>Explore Collection</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-3" data-cat="shoulder"
                            id="cat-card-6">
                            <div className="category-card-image">
                                <img src="handbag 6.webp" alt="L.V Cherry Blossom" loading="lazy"
                                    className="floating-img float-breathe delay-1" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>L.V Cherry Blossom</h3>
                                    <p>Explore Collection</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                    </div>
                </div>
            </section>

            {/*  ============================================================  */}
            {/*  HERO 2 — L.V TRAINER SNEAKER SCROLL ANIMATION                  */}
            {/*  ============================================================  */}
            <section id="hero2" className="hero-section">
                <div className="pt-6 pb-6 z-10 relative flex flex-col items-center text-center">
                    <div className="hero-accent-line reveal-element justify-center mb-4">
                        <span className="accent-label">Explore Category</span>
                    </div>
                    <h2 className="hero-title-bold reveal-element delay-1" style={{ textAlign: 'center' }}>
                        OUR FOOTWEAR<br />
                        <span className="relative inline-block pb-1 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-3/4 after:h-[2px] after:bg-gradient-to-r after:from-transparent after:via-[var(--color-gold)] after:to-transparent after:opacity-80" style={{ color: 'var(--color-gold)' }}>COLLECTION</span>
                    </h2>
                    <p className="reveal-element delay-2" style={{ maxWidth: '600px', margin: '0.5rem auto 1.5rem auto', fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontStyle: 'italic', letterSpacing: '0.03em', color: 'var(--color-gold)', lineHeight: '1.7', fontWeight: 300 }}>
                        Step into elegance with our expertly crafted footwear, designed to combine high-end luxury with modern streetwear.
                    </p>
                </div>
                <div className="hero-scroll-container">
                    <div className="hero-sticky">
                        <canvas id="hero-canvas-2" className="hero-canvas"></canvas>
                        <div className="hero-gradient-overlay"></div>

                        <div className="hero-text-overlay text-first" id="hero2-text-1">
                            <div className="hero-accent-line">
                                <div className="accent-bar"></div>
                                <span className="accent-label">New Drop 2026</span>
                            </div>
                            <h2 className="hero-title-bold">
                                THE ICONIC<br />
                                <span className="hero-title-stroke">TRAINER</span>
                            </h2>
                            <p className="hero-desc">Where streetwear meets haute couture. A sneaker born from artistic vision.</p>
                        </div>

                        <div className="hero-text-overlay" data-start="0.15" data-end="0.28" id="hero2-text-2">
                            <div className="hero-accent-line">
                                <div className="accent-bar"></div>
                                <span className="accent-label">Construction</span>
                            </div>
                            <h2 className="hero-title-bold hero-title-md">
                                HAND<br />
                                <span className="hero-title-stroke">STITCHED</span>
                            </h2>
                            <p className="hero-desc">Over 30 components assembled by master cobblers — Italian calfskin upper with
                                reinforced rubber sole.</p>
                        </div>

                        <div className="hero-text-overlay" data-start="0.30" data-end="0.45" id="hero2-text-3">
                            <div className="hero-accent-line">
                                <div className="accent-bar"></div>
                                <span className="accent-label">Detail</span>
                            </div>
                            <h2 className="hero-title-bold hero-title-md">
                                MONOGRAM<br />
                                <span className="hero-title-stroke">EMBOSSED</span>
                            </h2>
                            <p className="hero-desc">Signature L.V monogram debossed into premium leather. Every stitch is a
                                statement.</p>
                        </div>

                        <div className="hero-text-overlay" data-start="0.47" data-end="0.58" id="hero2-text-4">
                            <div className="hero-accent-line">
                                <div className="accent-bar"></div>
                                <span className="accent-label">Engineering</span>
                            </div>
                            <h2 className="hero-title-bold hero-title-md">
                                CUSHIONED<br />
                                <span className="hero-title-stroke">COMFORT</span>
                            </h2>
                            <p className="hero-desc">Dual-density foam midsole with arch support — luxury without compromise.</p>
                        </div>

                        <div className="hero-text-overlay" data-start="0.60" data-end="0.72" id="hero2-text-5">
                            <div className="hero-accent-line">
                                <div className="accent-bar"></div>
                                <span className="accent-label">Silhouette</span>
                            </div>
                            <h2 className="hero-title-bold hero-title-md">
                                THE COMPLETE<br />
                                <span className="hero-title-stroke">PROFILE</span>
                            </h2>
                            <p className="hero-desc">A chunky silhouette that commands attention — from runway to sidewalk.</p>
                        </div>

                        <div className="hero-text-overlay text-last" id="hero2-text-6">
                            <div className="hero-accent-line">
                                <div className="accent-bar"></div>
                                <span className="accent-label">Shop Now</span>
                            </div>
                            <h2 className="hero-title-bold hero-title-md">
                                OWN THE<br />
                                <span className="hero-title-stroke">SNEAKER</span>
                            </h2>
                            <p className="hero-desc">Limited edition. Once they're gone, they're gone.</p>
                            <a href="#sneakers" className="hero-cta-pill">Shop Sneakers</a>
                        </div>

                        {/*  SLIDE COUNTER  */}
                        <div className="hero-counter">
                            <span className="counter-current">01</span>
                            <div className="counter-divider"></div>
                            <span className="counter-total">06</span>
                        </div>
                    </div>
                </div>
            </section>

            {/*  SNEAKER CATEGORY SECTION  */}
            <section id="sneakers" className="section section-categories">
                <div className="container">
                    <div className="section-header-center reveal-element">
                        <span className="section-eyebrow-gold">Footwear Collection</span>
                        <h2 className="section-title-xl">Shop By Style</h2>
                        <p className="section-subtitle">Step into luxury — curated sneakers and shoes for every occasion.</p>
                    </div>
                    <div className="category-grid">
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-1" id="shoe-cat-1">
                            <div className="category-card-image">
                                <img src="shoe.webp" alt="Trainers" loading="lazy"
                                    className="floating-img float-v2 delay-1" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>Luxury Trainers</h3>
                                    <p>Explore Collection</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-2" id="shoe-cat-2">
                            <div className="category-card-image">
                                <img src="shoe 2.webp" alt="High Tops" loading="lazy"
                                    className="floating-img float-diag delay-2" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>Boss Sneakers</h3>
                                    <p>Explore Collection</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-3" id="shoe-cat-3">
                            <div className="category-card-image">
                                <img src="shoe 3.webp" alt="Low Cuts" loading="lazy"
                                    className="floating-img float-breathe delay-3" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>B@LMAIN Monogram</h3>
                                    <p>Explore Collection</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-1" id="shoe-cat-4">
                            <div className="category-card-image">
                                <img src="shoe 4.webp" alt="Limited Editions" loading="lazy"
                                    className="floating-img float-drift delay-4" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>B@LMAIN Graffiti</h3>
                                    <p>Explore Collection</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-2" id="shoe-cat-5">
                            <div className="category-card-image">
                                <img src="shoe 5.webp" alt="Runway Exclusives" loading="lazy"
                                    className="floating-img float-v1 delay-2" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>Herme$ Slides</h3>
                                    <p>Explore Collection</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-3" id="shoe-cat-6">
                            <div className="category-card-image">
                                <img src="shoe 6.webp" alt="Collaboration Series" loading="lazy"
                                    className="floating-img float-breathe delay-1" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>FERR@GAMO Loafers</h3>
                                    <p>Explore Collection</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                    </div>
                </div>
            </section>

            {/*  ============================================================  */}
            {/*  HERO 3 — DESIGNER SUNGLASSES SCROLL ANIMATION                 */}
            {/*  ============================================================  */}
            <section id="hero3" className="hero-section">
                <div className="pt-6 pb-6 z-10 relative flex flex-col items-center text-center">
                    <div className="hero-accent-line reveal-element justify-center mb-4">
                        <span className="accent-label">Explore Category</span>
                    </div>
                    <h2 className="hero-title-bold reveal-element delay-1" style={{ textAlign: 'center' }}>
                        SUNGLASSES<br />
                        <span className="relative inline-block pb-1 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-3/4 after:h-[2px] after:bg-gradient-to-r after:from-transparent after:via-[var(--color-gold)] after:to-transparent after:opacity-80" style={{ color: 'var(--color-gold)' }}>COLLECTION</span>
                    </h2>
                    <p className="reveal-element delay-2" style={{ maxWidth: '600px', margin: '0.5rem auto 1.5rem auto', fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontStyle: 'italic', letterSpacing: '0.03em', color: 'var(--color-gold)', lineHeight: '1.7', fontWeight: 300 }}>
                        Elevate your vision with meticulously engineered frames for the modern trailblazer.
                    </p>
                </div>
                <div className="hero-scroll-container">
                    <div className="hero-sticky">
                        <canvas id="hero-canvas-3" className="hero-canvas"></canvas>
                        <div className="hero-gradient-overlay"></div>

                        <div className="hero-text-overlay text-first" id="hero3-text-1">
                            <div className="hero-accent-line">
                                <div className="accent-bar"></div>
                                <span className="accent-label">Eyewear Collection</span>
                            </div>
                            <h2 className="hero-title-bold">
                                SEE THE<br />
                                <span className="hero-title-stroke">WORLD</span>
                            </h2>
                            <p className="hero-desc">Premium eyewear designed to frame your perspective — where vision meets luxury.
                            </p>
                        </div>

                        <div className="hero-text-overlay" data-start="0.15" data-end="0.28" id="hero3-text-2">
                            <div className="hero-accent-line">
                                <div className="accent-bar"></div>
                                <span className="accent-label">Materials</span>
                            </div>
                            <h2 className="hero-title-bold hero-title-md">
                                PREMIUM<br />
                                <span className="hero-title-stroke">ACETATE</span>
                            </h2>
                            <p className="hero-desc">Hand-polished Italian acetate frames — lightweight yet indestructible, with a
                                silk-like finish.</p>
                        </div>

                        <div className="hero-text-overlay" data-start="0.30" data-end="0.45" id="hero3-text-3">
                            <div className="hero-accent-line">
                                <div className="accent-bar"></div>
                                <span className="accent-label">Lenses</span>
                            </div>
                            <h2 className="hero-title-bold hero-title-md">
                                CRYSTAL<br />
                                <span className="hero-title-stroke">CLARITY</span>
                            </h2>
                            <p className="hero-desc">Anti-reflective, UV400 polarized mineral glass lenses — engineered for absolute
                                optical precision.</p>
                        </div>

                        <div className="hero-text-overlay" data-start="0.47" data-end="0.58" id="hero3-text-4">
                            <div className="hero-accent-line">
                                <div className="accent-bar"></div>
                                <span className="accent-label">Hardware</span>
                            </div>
                            <h2 className="hero-title-bold hero-title-md">
                                TITANIUM<br />
                                <span className="hero-title-stroke">HINGES</span>
                            </h2>
                            <p className="hero-desc">Surgical-grade titanium temples with spring-loaded hinges — featherlight at
                                just 28 grams.</p>
                        </div>

                        <div className="hero-text-overlay" data-start="0.60" data-end="0.72" id="hero3-text-5">
                            <div className="hero-accent-line">
                                <div className="accent-bar"></div>
                                <span className="accent-label">Form</span>
                            </div>
                            <h2 className="hero-title-bold hero-title-md">
                                TIMELESS<br />
                                <span className="hero-title-stroke">SILHOUETTE</span>
                            </h2>
                            <p className="hero-desc">Classic frames with modern proportions — designed to complement every face
                                shape.</p>
                        </div>

                        <div className="hero-text-overlay text-last" id="hero3-text-6">
                            <div className="hero-accent-line">
                                <div className="accent-bar"></div>
                                <span className="accent-label">Collection</span>
                            </div>
                            <h2 className="hero-title-bold hero-title-md">
                                THE EYEWEAR<br />
                                <span className="hero-title-stroke">EDIT</span>
                            </h2>
                            <p className="hero-desc">Five signature frames. One bold statement.</p>
                            <a href="#eyewear" className="hero-cta-pill">Shop Eyewear</a>
                        </div>

                        {/*  SLIDE COUNTER  */}
                        <div className="hero-counter">
                            <span className="counter-current">01</span>
                            <div className="counter-divider"></div>
                            <span className="counter-total">06</span>
                        </div>
                    </div>
                </div>
            </section>

            {/*  EYEWEAR CATEGORY SECTION  */}
            <section id="eyewear" className="section section-categories">
                <div className="container">
                    <div className="section-header-center reveal-element">
                        <span className="section-eyebrow-gold">Eyewear Collection</span>
                        <h2 className="section-title-xl">Shop By Frame</h2>
                        <p className="section-subtitle">Precision-crafted eyewear for the discerning eye.</p>
                    </div>
                    <div className="category-grid">
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-1" id="eye-cat-1">
                            <div className="category-card-image">
                                <img src="sunglasses.webp" alt="C@rtier Round" loading="lazy"
                                    className="floating-img float-v2 delay-1" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>Classic Wayfarers</h3>
                                    <p>Explore Collection</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-2" id="eye-cat-2">
                            <div className="category-card-image">
                                <img src="sunglasses 2.webp" alt="C@rtier Round II" loading="lazy"
                                    className="floating-img float-diag delay-2" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>C@rtier Signature</h3>
                                    <p>Explore Collection</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-3" id="eye-cat-3">
                            <div className="category-card-image">
                                <img src="sun glasses 3.webp" alt="B@rberry Square" loading="lazy"
                                    className="floating-img float-breathe delay-3" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>B@rberry Square</h3>
                                    <p>Explore Collection</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-1" id="eye-cat-4">
                            <div className="category-card-image">
                                <img src="sunglasses 4.webp" alt="Tom ford Brown" loading="lazy"
                                    className="floating-img float-drift delay-4" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>Tom ford Classic</h3>
                                    <p>Explore Collection</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-2" id="eye-cat-5">
                            <div className="category-card-image">
                                <img src="sunglasses 5.webp" alt="C@rtier Geometric" loading="lazy"
                                    className="floating-img float-v1 delay-2" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>C@rtier Geometric</h3>
                                    <p>Explore Collection</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-3" id="eye-cat-6">
                            <div className="category-card-image">
                                <img src="sunglasses 6.webp" alt="Tom ford Black" loading="lazy"
                                    className="floating-img float-breathe delay-1" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>Shield Frames</h3>
                                    <p>Explore Collection</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                    </div>
                </div>
            </section>

            {/*  ============================================================  */}
            {/*  HERO 4 — DESIGNER HANDBAG COLLECTION SCROLL ANIMATION         */}
            {/*  ============================================================  */}
            <section id="hero4" className="hero-section" style={{ display: 'none' }}>
                <div className="pt-6 pb-6 z-10 relative flex flex-col items-center text-center">
                    <div className="hero-accent-line reveal-element justify-center mb-4">
                        <span className="accent-label">Explore Category</span>
                    </div>
                    <h2 className="hero-title-bold reveal-element delay-1" style={{ textAlign: 'center' }}>
                        KEYCHAIN<br />
                        <span className="relative inline-block pb-1 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-3/4 after:h-[2px] after:bg-gradient-to-r after:from-transparent after:via-[var(--color-gold)] after:to-transparent after:opacity-80" style={{ color: 'var(--color-gold)' }}>COLLECTION</span>
                    </h2>
                    <p className="reveal-element delay-2" style={{ maxWidth: '600px', margin: '0.5rem auto 1.5rem auto', fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontStyle: 'italic', letterSpacing: '0.03em', color: 'var(--color-gold)', lineHeight: '1.7', fontWeight: 300 }}>
                        The art of the miniature. Discover polished hardware and unmistakable signature detailing.
                    </p>
                </div>
                <div className="hero-scroll-container">
                    <div className="hero-sticky">
                        <canvas id="hero-canvas-4" className="hero-canvas"></canvas>
                        <div className="hero-gradient-overlay"></div>

                        <div className="hero-text-overlay text-first" id="hero4-text-1">
                            <div className="hero-accent-line">
                                <div className="accent-bar"></div>
                                <span className="accent-label">L.V Accessories</span>
                            </div>
                            <h2 className="hero-title-bold">
                                THE LUXURY<br />
                                <span className="hero-title-stroke">KEYCHAIN</span>
                            </h2>
                            <p className="hero-desc">Small details, grand statements. The signature L.V keychain
                                collection.</p>
                        </div>

                        <div className="hero-text-overlay" data-start="0.15" data-end="0.28" id="hero4-text-2">
                            <div className="hero-accent-line">
                                <div className="accent-bar"></div>
                                <span className="accent-label">Hardware</span>
                            </div>
                            <h2 className="hero-title-bold hero-title-md">
                                POLISHED<br />
                                <span className="hero-title-stroke">METAL</span>
                            </h2>
                            <p className="hero-desc">Gleaming hardware crafted with precision, engraved with the iconic L.V initials.
                            </p>
                        </div>

                        <div className="hero-text-overlay" data-start="0.30" data-end="0.45" id="hero4-text-3">
                            <div className="hero-accent-line">
                                <div className="accent-bar"></div>
                                <span className="accent-label">Materials</span>
                            </div>
                            <h2 className="hero-title-bold hero-title-md">
                                PREMIUM<br />
                                <span className="hero-title-stroke">LEATHER</span>
                            </h2>
                            <p className="hero-desc">Accented with signature monogram canvas and supple leather tabs.</p>
                        </div>

                        <div className="hero-text-overlay" data-start="0.47" data-end="0.58" id="hero4-text-4">
                            <div className="hero-accent-line">
                                <div className="accent-bar"></div>
                                <span className="accent-label">Design</span>
                            </div>
                            <h2 className="hero-title-bold hero-title-md">
                                ICONIC<br />
                                <span className="hero-title-stroke">CHARMS</span>
                            </h2>
                            <p className="hero-desc">Multiple charms including the Monogram flower and L.V logo to elevate any
                                accessory.</p>
                        </div>

                        <div className="hero-text-overlay" data-start="0.60" data-end="0.72" id="hero4-text-5">
                            <div className="hero-accent-line">
                                <div className="accent-bar"></div>
                                <span className="accent-label">Function</span>
                            </div>
                            <h2 className="hero-title-bold hero-title-md">
                                VERSATILE<br />
                                <span className="hero-title-stroke">STYLE</span>
                            </h2>
                            <p className="hero-desc">Attach it to your keys or clip it to your favorite bag for an instant touch of
                                luxury.</p>
                        </div>

                        <div className="hero-text-overlay text-last" id="hero4-text-6">
                            <div className="hero-accent-line">
                                <div className="accent-bar"></div>
                                <span className="accent-label">The Edit</span>
                            </div>
                            <h2 className="hero-title-bold hero-title-md">
                                YOUR EVERYDAY<br />
                                <span className="hero-title-stroke">ICON</span>
                            </h2>
                            <p className="hero-desc">A touch of luxury in the palm of your hand.</p>
                            <a href="#accessories" className="hero-cta-pill">Shop Accessories</a>
                        </div>

                        {/*  SLIDE COUNTER  */}
                        <div className="hero-counter">
                            <span className="counter-current">01</span>
                            <div className="counter-divider"></div>
                            <span className="counter-total">06</span>
                        </div>
                    </div>
                </div>
            </section>

            {/*  KEYCHAIN CATEGORY SECTION  */}
            <section id="accessories" className="section section-categories" style={{ display: 'none' }}>
                <div className="container">
                    <div className="section-header-center reveal-element">
                        <span className="section-eyebrow-gold">Accessories</span>
                        <h2 className="section-title-xl">L.V Keychains</h2>
                        <p className="section-subtitle">Discover the art of detail with signature charms and key holders.</p>
                    </div>
                    <div className="category-grid">
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-1" id="key-cat-1">
                            <div className="category-card-image">
                                <img src="keychain.webp" alt="L.V Monogram Flower" loading="lazy"
                                    className="floating-img float-v2 delay-1" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>L.V Monogram</h3>
                                    <p>Explore Collection</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-2" id="key-cat-2">
                            <div className="category-card-image">
                                <img src="keychain 2.webp" alt="L.V Charm Bracelet" loading="lazy"
                                    className="floating-img float-diag delay-2" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>L.V Charms</h3>
                                    <p>Explore Collection</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-3" id="key-cat-3">
                            <div className="category-card-image">
                                <img src="keychain 3.webp" alt="L.V Snow Globe" loading="lazy"
                                    className="floating-img float-breathe delay-3" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>L.V Snow Globe</h3>
                                    <p>Explore Collection</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-1" id="key-cat-4">
                            <div className="category-card-image">
                                <img src="keychain 4.webp" alt="L.V Rose Gold Flower" loading="lazy"
                                    className="floating-img float-drift delay-4" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>L.V Rose Gold</h3>
                                    <p>Explore Collection</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-2" id="key-cat-5">
                            <div className="category-card-image">
                                <img src="keychain 5.webp" alt="L.V Blue Flower" loading="lazy"
                                    className="floating-img float-v1 delay-2" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>L.V Blue Flower</h3>
                                    <p>Explore Collection</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-3" id="key-cat-6">
                            <div className="category-card-image">
                                <img src="keychain 6.webp" alt="L.V Leather Strap" loading="lazy"
                                    className="floating-img float-breathe delay-1" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>L.V Leather Strap</h3>
                                    <p>Explore Collection</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                    </div>
                </div>
            </section>

            {/*  ============================================================  */}
            {/*  HERO 6 — BELTS SCROLL ANIMATION                               */}
            {/*  ============================================================  */}
            <section id="hero6" className="hero-section">
                <div className="pt-6 pb-6 z-10 relative flex flex-col items-center text-center">
                    <div className="hero-accent-line reveal-element justify-center mb-4">
                        <span className="accent-label">Explore Category</span>
                    </div>
                    <h2 className="hero-title-bold reveal-element delay-1" style={{ textAlign: 'center' }}>
                        BELT<br />
                        <span className="relative inline-block pb-1 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-3/4 after:h-[2px] after:bg-gradient-to-r after:from-transparent after:via-[var(--color-gold)] after:to-transparent after:opacity-80" style={{ color: 'var(--color-gold)' }}>COLLECTION</span>
                    </h2>
                    <p className="reveal-element delay-2" style={{ maxWidth: '600px', margin: '0.5rem auto 1.5rem auto', fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontStyle: 'italic', letterSpacing: '0.03em', color: 'var(--color-gold)', lineHeight: '1.7', fontWeight: 300 }}>
                        The perfect finishing touch. Discover our collection of signature belts crafted from premium materials.
                    </p>
                </div>
                <div className="hero-scroll-container">
                    <div className="hero-sticky">
                        <canvas id="hero-canvas-6" className="hero-canvas"></canvas>
                        <div className="hero-gradient-overlay"></div>

                        <div className="hero-text-overlay text-first" id="hero6-text-1">
                            <div className="hero-accent-line">
                                <div className="accent-bar"></div>
                                <span className="accent-label">L.V Belts</span>
                            </div>
                            <h2 className="hero-title-bold">
                                THE LUXURY<br />
                                <span className="hero-title-stroke">BELT</span>
                            </h2>
                            <p className="hero-desc">Elevate your silhouette. The signature L.V belt collection.</p>
                        </div>

                        <div className="hero-text-overlay" data-start="0.15" data-end="0.28" id="hero6-text-2">
                            <div className="hero-accent-line">
                                <div className="accent-bar"></div>
                                <span className="accent-label">Hardware</span>
                            </div>
                            <h2 className="hero-title-bold hero-title-md">
                                SIGNATURE<br />
                                <span className="hero-title-stroke">BUCKLE</span>
                            </h2>
                            <p className="hero-desc">Gleaming hardware crafted with precision, featuring the iconic L.V initials.</p>
                        </div>

                        <div className="hero-text-overlay" data-start="0.30" data-end="0.45" id="hero6-text-3">
                            <div className="hero-accent-line">
                                <div className="accent-bar"></div>
                                <span className="accent-label">Materials</span>
                            </div>
                            <h2 className="hero-title-bold hero-title-md">
                                PREMIUM<br />
                                <span className="hero-title-stroke">LEATHER</span>
                            </h2>
                            <p className="hero-desc">Crafted from the finest calf leather and our signature monogram canvas.</p>
                        </div>

                        <div className="hero-text-overlay" data-start="0.47" data-end="0.58" id="hero6-text-4">
                            <div className="hero-accent-line">
                                <div className="accent-bar"></div>
                                <span className="accent-label">Design</span>
                            </div>
                            <h2 className="hero-title-bold hero-title-md">
                                REVERSIBLE<br />
                                <span className="hero-title-stroke">STYLE</span>
                            </h2>
                            <p className="hero-desc">Versatile designs that offer two distinct looks in one elegant accessory.</p>
                        </div>

                        <div className="hero-text-overlay" data-start="0.60" data-end="0.72" id="hero6-text-5">
                            <div className="hero-accent-line">
                                <div className="accent-bar"></div>
                                <span className="accent-label">Function</span>
                            </div>
                            <h2 className="hero-title-bold hero-title-md">
                                PERFECT<br />
                                <span className="hero-title-stroke">FIT</span>
                            </h2>
                            <p className="hero-desc">Designed to define the waist or sit perfectly on the hips.</p>
                        </div>

                        <div className="hero-text-overlay text-last" id="hero6-text-6">
                            <div className="hero-accent-line">
                                <div className="accent-bar"></div>
                                <span className="accent-label">The Edit</span>
                            </div>
                            <h2 className="hero-title-bold hero-title-md">
                                YOUR EVERYDAY<br />
                                <span className="hero-title-stroke">ICON</span>
                            </h2>
                            <p className="hero-desc">The ultimate statement accessory.</p>
                            <a href="#accessories" className="hero-cta-pill">Shop Belts</a>
                        </div>

                        {/*  SLIDE COUNTER  */}
                        <div className="hero-counter">
                            <span className="counter-current">01</span>
                            <div className="counter-divider"></div>
                            <span className="counter-total">06</span>
                        </div>
                    </div>
                </div>
            </section>

            {/*  BELTS CATEGORY SECTION  */}
            <section className="section section-categories">
                <div className="container">
                    <div className="section-header-center reveal-element">
                        <span className="section-eyebrow-gold">Category Focus</span>
                        <h2 className="section-title-xl">L.V Belts</h2>
                        <p className="section-subtitle">Discover our curated selection of signature belts.</p>
                    </div>
                    <div className="category-grid">
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-1" id="belt-cat-1">
                            <div className="category-card-image">
                                <img src="belt 1.jpg" alt="L.V Monogram Belt" loading="lazy"
                                    className="floating-img float-breathe delay-1" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>L.V Monogram Belt</h3>
                                    <p>Explore Collection</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-2" id="belt-cat-2">
                            <div className="category-card-image">
                                <img src="belt 2.jpg" alt="Herme$ Constance Belt" loading="lazy"
                                    className="floating-img float-breathe delay-2" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>Herme$ Constance Belt</h3>
                                    <p>Explore Collection</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-3" id="belt-cat-3">
                            <div className="category-card-image">
                                <img src="belt 3.jpg" alt="FERR@GAMO Belt" loading="lazy"
                                    className="floating-img float-breathe delay-1" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>FERR@GAMO Belt</h3>
                                    <p>Explore Collection</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-1" id="belt-cat-4">
                            <div className="category-card-image">
                                <img src="belt 4.jpg" alt="Vers@ce La Medusa Belt" loading="lazy"
                                    className="floating-img float-breathe delay-3" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>Vers@ce La Medusa Belt</h3>
                                    <p>Explore Collection</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-2" id="belt-cat-5">
                            <div className="category-card-image">
                                <img src="belt 5.jpg" alt="B@rberry Check Belt" loading="lazy"
                                    className="floating-img float-breathe delay-2" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>B@rberry Check Belt</h3>
                                    <p>Explore Collection</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-3" id="belt-cat-6">
                            <div className="category-card-image">
                                <img src="belt 6.jpg" alt="L.V Monogram Leather" loading="lazy"
                                    className="floating-img float-breathe delay-1" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>L.V Monogram Leather</h3>
                                    <p>Explore Collection</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                    </div>
                </div>
            </section>

            {/*  ============================================================  */}
            {/*  HERO 5 — LUXURY STOLES SCROLL ANIMATION                       */}
            {/*  ============================================================  */}
            <section id="hero5" className="hero-section">
                <div className="pt-6 pb-6 z-10 relative flex flex-col items-center text-center">
                    <div className="hero-accent-line reveal-element justify-center mb-4">
                        <span className="accent-label">Explore Category</span>
                    </div>
                    <h2 className="hero-title-bold reveal-element delay-1" style={{ textAlign: 'center' }}>
                        OUR STOLES<br />
                        <span className="relative inline-block pb-1 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-3/4 after:h-[2px] after:bg-gradient-to-r after:from-transparent after:via-[var(--color-gold)] after:to-transparent after:opacity-80" style={{ color: 'var(--color-gold)' }}>COLLECTION</span>
                    </h2>
                    <p className="reveal-element delay-2" style={{ maxWidth: '600px', margin: '0.5rem auto 1.5rem auto', fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontStyle: 'italic', letterSpacing: '0.03em', color: 'var(--color-gold)', lineHeight: '1.7', fontWeight: 300 }}>
                        A harmonious blend of cashmere and silk, delivering unparalleled warmth with effortless elegance.
                    </p>
                </div>
                <div className="hero-scroll-container">
                    <div className="hero-sticky">
                        <canvas id="hero-canvas-5" className="hero-canvas"></canvas>
                        <div className="hero-gradient-overlay"></div>

                        <div className="hero-text-overlay text-first" id="hero5-text-1">
                            <div className="hero-accent-line">
                                <div className="accent-bar"></div>
                                <span className="accent-label">L.V Monogram</span>
                            </div>
                            <h2 className="hero-title-bold">
                                THE LUXURY<br />
                                <span className="hero-title-stroke">STOLE</span>
                            </h2>
                            <p className="hero-desc">An embrace of pure cashmere and silk. The essential L.V stole.</p>
                        </div>

                        <div className="hero-text-overlay" data-start="0.15" data-end="0.28" id="hero5-text-2">
                            <div className="hero-accent-line">
                                <div className="accent-bar"></div>
                                <span className="accent-label">Fabrication</span>
                            </div>
                            <h2 className="hero-title-bold hero-title-md">
                                CASHMERE<br />
                                <span className="hero-title-stroke">& SILK</span>
                            </h2>
                            <p className="hero-desc">A delicate blend of the world's finest fibers for unparalleled softness and
                                warmth.</p>
                        </div>

                        <div className="hero-text-overlay" data-start="0.30" data-end="0.45" id="hero5-text-3">
                            <div className="hero-accent-line">
                                <div className="accent-bar"></div>
                                <span className="accent-label">Pattern</span>
                            </div>
                            <h2 className="hero-title-bold hero-title-md">
                                SIGNATURE<br />
                                <span className="hero-title-stroke">JACQUARD</span>
                            </h2>
                            <p className="hero-desc">The iconic Monogram pattern woven seamlessly into the fabric.</p>
                        </div>

                        <div className="hero-text-overlay" data-start="0.47" data-end="0.58" id="hero5-text-4">
                            <div className="hero-accent-line">
                                <div className="accent-bar"></div>
                                <span className="accent-label">Finishing</span>
                            </div>
                            <h2 className="hero-title-bold hero-title-md">
                                HAND ROLLED<br />
                                <span className="hero-title-stroke">FRINGE</span>
                            </h2>
                            <p className="hero-desc">Meticulously finished by artisans for an elegant, fluid drape.</p>
                        </div>

                        <div className="hero-text-overlay" data-start="0.60" data-end="0.72" id="hero5-text-5">
                            <div className="hero-accent-line">
                                <div className="accent-bar"></div>
                                <span className="accent-label">Versatility</span>
                            </div>
                            <h2 className="hero-title-bold hero-title-md">
                                EFFORTLESS<br />
                                <span className="hero-title-stroke">DRAPE</span>
                            </h2>
                            <p className="hero-desc">Wrap it, knot it, or drape it — a timeless accessory for any season.</p>
                        </div>

                        <div className="hero-text-overlay text-last" id="hero5-text-6">
                            <div className="hero-accent-line">
                                <div className="accent-bar"></div>
                                <span className="accent-label">The Edit</span>
                            </div>
                            <h2 className="hero-title-bold hero-title-md">
                                WARMTH IN<br />
                                <span className="hero-title-stroke">STYLE</span>
                            </h2>
                            <p className="hero-desc">Elevate your wardrobe with the ultimate luxury layer.</p>
                            <a href="#stoles" className="hero-cta-pill">Shop Stoles</a>
                        </div>

                        {/*  SLIDE COUNTER  */}
                        <div className="hero-counter">
                            <span className="counter-current">01</span>
                            <div className="counter-divider"></div>
                            <span className="counter-total">06</span>
                        </div>
                    </div>
                </div>
            </section>

            {/*  STOLES CATEGORY SECTION  */}
            <section id="stoles" className="section section-categories">
                <div className="container">
                    <div className="section-header-center reveal-element">
                        <span className="section-eyebrow-gold">Essentials</span>
                        <h2 className="section-title-xl">L.V Stoles</h2>
                        <p className="section-subtitle">A delicate blend of the finest fibers for unparalleled warmth.</p>
                    </div>
                    <div className="category-grid">
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-1" id="stole-cat-1">
                            <div className="category-card-image">
                                <img src="stoles.webp" alt="Cel!ne Monogram" loading="lazy"
                                    className="floating-img float-v2 delay-1" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>Cel!ne Monogram</h3>
                                    <p>Explore Collection</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-2" id="stole-cat-2">
                            <div className="category-card-image">
                                <img src="stoles 2.webp" alt="B@rberry Equestrian" loading="lazy"
                                    className="floating-img float-diag delay-2" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>B@rberry Equestrian</h3>
                                    <p>Explore Collection</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-3" id="stole-cat-3">
                            <div className="category-card-image">
                                <img src="stoles 3.webp" alt="Ch@nel Multicolor" loading="lazy"
                                    className="floating-img float-breathe delay-3" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>Ch@nel Multicolor</h3>
                                    <p>Explore Collection</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-1" id="stole-cat-4">
                            <div className="category-card-image">
                                <img src="stoles 4.webp" alt="Fend! Zucca" loading="lazy"
                                    className="floating-img float-drift delay-4" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>Fend! Zucca</h3>
                                    <p>Explore Collection</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-2" id="stole-cat-5">
                            <div className="category-card-image">
                                <img src="stoles 5.webp" alt="Co@ch Signature" loading="lazy"
                                    className="floating-img float-v1 delay-2" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>Co@ch Signature</h3>
                                    <p>Explore Collection</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-3" id="stole-cat-6">
                            <div className="category-card-image">
                                <img src="stoles 6.webp" alt="L.V Monogram" loading="lazy"
                                    className="floating-img float-breathe delay-1" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>L.V</h3>
                                    <p>Explore Collection</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                    </div>
                </div>
            </section>

            {/*  MIXED COLLECTION CATEGORY SECTION  */}
            <section className="section section-categories">
                <div className="container">
                    <div className="section-header-center reveal-element">
                        <span className="section-eyebrow-gold">The Complete Collection</span>
                        <h2 className="section-title-xl">Explore All Categories</h2>
                        <p className="section-subtitle">Discover our curated selection of footwear, eyewear, and accessories.</p>
                    </div>
                    <div className="category-grid">
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-1" id="mix-cat-1">
                            <div className="category-card-image">
                                <img src="handbag 2.webp" alt="Ch@nel Boy Bag" loading="lazy"
                                    className="floating-img float-v2 delay-1" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>Luxury Bags</h3>
                                    <p>Ch@nel Boy Bag</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-2" id="mix-cat-2">
                            <div className="category-card-image">
                                <img src="shoe 4.webp" alt="B@LMAIN Sneakers" loading="lazy"
                                    className="floating-img float-diag delay-2" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>Luxury Footwear</h3>
                                    <p>B@LMAIN Graffiti</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-3" id="mix-cat-3">
                            <div className="category-card-image">
                                <img src="sunglasses.webp" alt="C@rtier Round" loading="lazy"
                                    className="floating-img float-breathe delay-3" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>Premium Eyewear</h3>
                                    <p>C@rtier Rimless</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-1" id="mix-cat-4">
                            <div className="category-card-image">
                                <img src="keychain 3.webp" alt="L.V Snow Globe" loading="lazy"
                                    className="floating-img float-drift delay-4" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>Premium keychain</h3>
                                    <p>L.V Snow Globe</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-2" id="mix-cat-5">
                            <div className="category-card-image">
                                <img src="stoles 2.webp" alt="B@rberry Equestrian" loading="lazy"
                                    className="floating-img float-v1 delay-2" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>Luxuary Stoles</h3>
                                    <p>B@rberry Equestrian</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                        <a href="#" className="category-card hover-float-parent reveal-element stagger-3" id="mix-cat-6">
                            <div className="category-card-image">
                                <img src="handbag 5.webp" alt="L.V Pastel Flap" loading="lazy"
                                    className="floating-img float-breathe delay-1" />
                                <div className="category-card-gradient"></div>
                                <div className="category-card-label">
                                    <h3>Handbags</h3>
                                    <p>L.V Pastel Flap</p>
                                </div>
                            </div>
                            <div className="category-card-bar"></div>
                        </a>
                    </div>
                </div>
            </section>

            {/*  ============================================================  */}
            {/*  3. SPOTLIGHT EDIT — Horizontal Product Marquee                */}
            {/*  ============================================================  */}
            <section className="section section-spotlight">
                <div className="container">
                    <div className="spotlight-header reveal-element">
                        <div className="spotlight-header-left">
                            <div className="accent-line-row">
                                <div className="accent-bar"></div>
                                <span className="accent-label">Curated For You</span>
                            </div>
                            <h2 className="spotlight-title">
                                <span className="spotlight-title-main">Spotlight</span>
                                <span className="spotlight-title-italic">Edit.</span>
                            </h2>
                        </div>
                        <a href="#" className="shop-drop-link" id="shop-drop-link">
                            <span>Shop The Drop</span>
                            <div className="shop-drop-arrow">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </div>
                        </a>
                    </div>
                </div>

                {/*  Marquee Track  */}
                <div className="marquee-wrapper">
                    <div className="marquee-track" id="marquee-track">
                        {/*  Card 1  */}
                        <div className="marquee-card hover-float-parent">
                            <span className="marquee-card-number">01</span>
                            <div className="marquee-card-badges">
                                <span className="marquee-badge">New</span>
                            </div>
                            <div className="marquee-card-image">
                                <img src="handbag 4.webp" alt="B@rberry Classic Bag" loading="lazy"
                                    className="floating-img float-v1 delay-1" />
                            </div>
                            <div className="marquee-card-info">
                                <h3>B@rberry Classic Bag</h3>
                                <p className="marquee-card-price">$4,900</p>
                            </div>
                        </div>
                        {/*  Card 2  */}
                        <div className="marquee-card hover-float-parent">
                            <span className="marquee-card-number">02</span>
                            <div className="marquee-card-badges">
                                <span className="marquee-badge">Limited</span>
                            </div>
                            <div className="marquee-card-image">
                                <img src="shoe.webp" alt="L.V Trainers" loading="lazy"
                                    className="floating-img float-breathe delay-2" />
                            </div>
                            <div className="marquee-card-info">
                                <h3>L.V Trainers</h3>
                                <p className="marquee-card-price">$3,400</p>
                            </div>
                        </div>
                        {/*  Card 3  */}
                        <div className="marquee-card hover-float-parent">
                            <span className="marquee-card-number">03</span>
                            <div className="marquee-card-badges">
                                <span className="marquee-badge">Exclusive</span>
                            </div>
                            <div className="marquee-card-image">
                                <img src="sunglasses 4.webp" alt="Tom ford Classic" loading="lazy"
                                    className="floating-img float-diag delay-3" />
                            </div>
                            <div className="marquee-card-info">
                                <h3>Tom ford Classic</h3>
                                <p className="marquee-card-price">$5,200</p>
                            </div>
                        </div>
                        {/*  Card 4  */}
                        <div className="marquee-card hover-float-parent">
                            <span className="marquee-card-number">04</span>
                            <div className="marquee-card-badges">
                                <span className="marquee-badge">New</span>
                            </div>
                            <div className="marquee-card-image">
                                <img src="keychain.webp" alt="L.V Monogram Keychain" loading="lazy"
                                    className="floating-img float-v2 delay-1" />
                            </div>
                            <div className="marquee-card-info">
                                <h3>L.V Monogram Keychain</h3>
                                <p className="marquee-card-price">$2,800</p>
                            </div>
                        </div>
                        {/*  Card 5  */}
                        <div className="marquee-card hover-float-parent">
                            <span className="marquee-card-number">05</span>
                            <div className="marquee-card-badges">
                                <span className="marquee-badge">Bestseller</span>
                            </div>
                            <div className="marquee-card-image">
                                <img src="stoles.webp" alt="Cel!ne Monogram Stole" loading="lazy"
                                    className="floating-img float-drift delay-4" />
                            </div>
                            <div className="marquee-card-info">
                                <h3>Cel!ne Monogram Stole</h3>
                                <p className="marquee-card-price">$4,200</p>
                            </div>
                        </div>
                        {/*  Card 6  */}
                        <div className="marquee-card hover-float-parent">
                            <span className="marquee-card-number">06</span>
                            <div className="marquee-card-badges">
                                <span className="marquee-badge">Limited</span>
                            </div>
                            <div className="marquee-card-image">
                                <img src="handbag 6.webp" alt="L.V Cherry Blossom Tote" loading="lazy"
                                    className="floating-img float-v1 delay-2" />
                            </div>
                            <div className="marquee-card-info">
                                <h3>L.V Cherry Blossom Tote</h3>
                                <p className="marquee-card-price">$4,100</p>
                            </div>
                        </div>
                        {/*  Card 7  */}
                        <div className="marquee-card hover-float-parent">
                            <span className="marquee-card-number">07</span>
                            <div className="marquee-card-badges">
                                <span className="marquee-badge">New</span>
                            </div>
                            <div className="marquee-card-image">
                                <img src="shoe 3.webp" alt="B@LMAIN Monogram Sneakers" loading="lazy"
                                    className="floating-img float-breathe delay-1" />
                            </div>
                            <div className="marquee-card-info">
                                <h3>B@LMAIN Monogram Sneakers</h3>
                                <p className="marquee-card-price">$1,900</p>
                            </div>
                        </div>
                        {/*  Card 8  */}
                        <div className="marquee-card hover-float-parent">
                            <span className="marquee-card-number">08</span>
                            <div className="marquee-card-badges">
                                <span className="marquee-badge">Exclusive</span>
                            </div>
                            <div className="marquee-card-image">
                                <img src="sunglasses 5.webp" alt="C@rtier Geometric Glasses" loading="lazy"
                                    className="floating-img float-diag delay-3" />
                            </div>
                            <div className="marquee-card-info">
                                <h3>C@rtier Geometric Glasses</h3>
                                <p className="marquee-card-price">$2,400</p>
                            </div>
                        </div>
                    </div>
                    {/*  Marquee fade edges  */}
                    <div className="marquee-fade-left"></div>
                    <div className="marquee-fade-right"></div>
                </div>
            </section>

            {/*  ============================================================  */}
            {/*  4. QUALITY FIRST — Middle Section with 3 Category Cards       */}
            {/*  ============================================================  */}
            <section id="craftsmanship" className="section section-quality">
                <div className="container">
                    <div className="section-header-center reveal-element">
                        <span className="section-eyebrow-gold">Quality First</span>
                        <h2 className="section-title-serif">Elevated Style, Made Effortless<br />& Affordable</h2>
                        <p className="section-subtitle">Carefully selected pieces made to fit seamlessly into modern life.</p>
                    </div>

                    <div className="quality-grid" id="quality-grid-container">
                        <div className="quality-card hover-float-parent quality-anim-card" id="quality-card-1">
                            <div className="quality-card-image">
                                <img src="handbag.webp" alt="Lady D!OR White Lace" loading="lazy"
                                    className="floating-img float-v1 delay-2" />
                                <div className="quality-card-gradient"></div>
                                <div className="quality-card-label">
                                    <h3>Apparel</h3>
                                </div>
                            </div>
                            <div className="quality-card-text">
                                <p>Timeless wardrobe staples crafted from the finest materials.</p>
                            </div>
                            <div className="impact-crack"></div>
                        </div>
                        <div className="quality-card hover-float-parent quality-anim-card" id="quality-card-2">
                            <div className="quality-card-image">
                                <img src="shoe 6.webp" alt="FERR@GAMO Leather Loafers" loading="lazy"
                                    className="floating-img float-breathe delay-1" />
                                <div className="quality-card-gradient"></div>
                                <div className="quality-card-label">
                                    <h3>Accessories</h3>
                                </div>
                            </div>
                            <div className="quality-card-text">
                                <p>Handcrafted leather accents with premium gold-tone hardware.</p>
                            </div>
                            <div className="impact-crack"></div>
                        </div>
                        <div className="quality-card hover-float-parent quality-anim-card" id="quality-card-3">
                            <div className="quality-card-image">
                                <img src="sunglasses 6.webp" alt="Tom ford Bold Square" loading="lazy"
                                    className="floating-img float-diag delay-4" />
                                <div className="quality-card-gradient"></div>
                                <div className="quality-card-label">
                                    <h3>Lifestyle</h3>
                                </div>
                            </div>
                            <div className="quality-card-text">
                                <p>Minimalist essentials designed for the discerning connoisseur.</p>
                            </div>
                            <div className="impact-crack"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/*  ============================================================  */}
            {/*  5. WORLD'S MOST LOVED (ARC GALLERY)                           */}
            {/*  ============================================================  */}
            <section id="brands" className="section-arc-gallery">
                <div className="container">
                    <div className="brands-header reveal-element" style={{ "textAlign": "center", "marginBottom": "1rem" }}>
                        <h2 className="brands-title" style={{ "marginBottom": "0.5rem" }}>
                            <span className="brands-title-serif">World's Most </span>
                            <span className="brands-title-bold">Loved</span>
                        </h2>
                        <p className="brands-subtitle" style={{ "maxWidth": "600px", "margin": "0 auto" }}>Discover the iconic silhouettes
                            that have defined generations of style.</p>
                    </div>

                    <div className="arc-container" id="arc-wrapper">
                        {/*  Outer Left  */}
                        <div className="arc-item arc-outer-left">
                            <img src="ban.png" alt="Classic Tote" className="floating-img float-v2 delay-3" />
                            <div className="arc-item-title">Classic Tote</div>
                        </div>
                        {/*  Inner Left  */}
                        <div className="arc-item arc-inner-left">
                            <img src="banner.png" alt="Evening Clutch" className="floating-img float-diag delay-1" />
                            <div className="arc-item-title">Evening Clutch</div>
                        </div>
                        {/*  Center Focus  */}
                        <div className="arc-item arc-center hover-float-parent">
                            <img src="banner01.jpg" alt="Grand Heritage" className="floating-img float-breathe" />
                            <div className="arc-item-title">Grand Heritage</div>
                        </div>
                        {/*  Inner Right  */}
                        <div className="arc-item arc-inner-right">
                            <img src="phto.png" alt="Signature Satchel"
                                className="floating-img float-drift delay-2" />
                            <div className="arc-item-title">Signature Satchel</div>
                        </div>
                        {/*  Outer Right  */}
                        <div className="arc-item arc-outer-right">
                            <img src="coachbrand.jpg" alt="Minimalist Mini" className="floating-img float-v1 delay-4" />
                            <div className="arc-item-title">Minimalist Mini</div>
                        </div>
                    </div>
                </div>
            </section>

            {/*  ============================================================  */}
            {/*  6. SOCIAL MOMENTS — Trust Stats + Featured Image              */}
            {/*  ============================================================  */}
            <section id="about" className="section section-social">
                <div className="container">
                    <div className="social-grid reveal-element">
                        {/*  Left: Stats  */}
                        <div className="social-left">
                            <div className="social-badge">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    strokeWidth="2">
                                    <rect x="2" y="2" width="20" height="20" rx="5" />
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                </svg>
                                <span>Live Gallery</span>
                            </div>

                            <h2 className="social-title">BUILT AROUND<br />Trust, Style and Quality</h2>

                            <div className="stats-grid">
                                <div className="stat-item">
                                    <div className="stat-icon">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            strokeWidth="2">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4>10,000+</h4>
                                        <p>Trusted Customers</p>
                                    </div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-icon">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            strokeWidth="2">
                                            <path
                                                d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4>Premium</h4>
                                        <p>Quality Craftsmanship</p>
                                    </div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-icon">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            strokeWidth="2">
                                            <path d="M6 3h12l4 6-10 13L2 9z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4>Luxury</h4>
                                        <p>Made Affordable</p>
                                    </div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-icon">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <line x1="2" y1="12" x2="22" y2="12" />
                                            <path
                                                d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4>Fast & Secure</h4>
                                        <p>Worldwide Shipping</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*  Right: Featured Image  */}
                        <div className="social-right">
                            <div className="social-image-wrapper">
                                <div className="social-image-glow"></div>
                                <div className="social-image-frame hover-float-parent">
                                    <img src="phto.png" alt="Elegant Signature Satchel" loading="lazy"
                                        className="floating-img float-breathe delay-2" />

                                    {/*  Quote overlay  */}
                                    <div className="social-quote">
                                        <div className="social-quote-icon">"</div>
                                        <p>The minimalist aesthetic I've been searching for. A true sanctuary for modern living.
                                        </p>
                                    </div>

                                    {/*  Arrow button  */}
                                    <button className="social-arrow-btn" aria-label="View more">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            strokeWidth="2">
                                            <line x1="7" y1="17" x2="17" y2="7" />
                                            <polyline points="7 7 17 7 17 17" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/*  ============================================================  */}


            {/*  ============================================================  */}
            {/*  FOOTER                                                        */}
            {/*  ============================================================  */}



        </main>
    );
}
