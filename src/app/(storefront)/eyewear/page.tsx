import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Designer Eyewear & Sunglasses | RAKVIH Originals",
  description: "Sculpted Italian acetate frames with 24K gold plated hinges and Carl Zeiss polarized optics.",
};

const products = [
  { id: 1, name: "Millionaires Deep Bevel Noir", price: "$890", material: "Hand-Milled Acetate & Gold S-Lock Hinges", img: "/sunglasses.webp", tag: "Iconic" },
  { id: 2, name: "Aviateur Monogram Rimless", price: "$980", material: "Titanium Chassis & Laser Engraved Lenses", img: "/sunglasses 2.webp", tag: "New Drop" },
  { id: 3, name: "Cat-Eye Tortoiseshell Privé", price: "$780", material: "Vintage Italian Acetate & UV400 Optics", img: "/sun glasses 3.webp", tag: "Atelier" },
  { id: 4, name: "Geometric Shield Gold Edition", price: "$1,100", material: "24K Gold Plated Bridge & Carl Zeiss Glass", img: "/sunglasses 4.webp", tag: "Limited Privé" },
  { id: 5, name: "Classic Wayfarer Black Crystal", price: "$720", material: "Polarized Mineral Glass & Hand-Polished Temples", img: "/sunglasses 5.webp", tag: "Signature" },
  { id: 6, name: "Oversized Square Havana", price: "$850", material: "Japanese Titanium Core & Warm Amber Tint", img: "/sunglasses 6.webp", tag: "Runway" },
];

export default function EyewearPage() {
  return (
    <main className="subpage-wrapper">
      <section className="subpage-hero">
        <div className="subpage-hero-inner">
          <div className="subpage-breadcrumbs">
            <Link href="/">Home</Link> <span>/</span> <span>Collections</span> <span>/</span> <span className="active">Eyewear</span>
          </div>
          <div className="hero-accent-line">
            <div className="accent-bar"></div>
            <span className="accent-label">Haute Optique</span>
          </div>
          <h1 className="subpage-title">
            LUXURY <span className="hero-title-stroke">EYEWEAR</span>
          </h1>
          <p className="subpage-subtitle">
            Engineered with deep-beveled Japanese acetate, hand-mounted hinges, and certified high-definition UV filtration.
          </p>
        </div>
      </section>

      <section className="subpage-grid-section">
        <div className="subpage-container">
          <div className="grid-meta-bar">
            <span className="result-count">Showing 6 Sculpted Frames</span>
            <div className="grid-filter-pills">
              <button className="filter-pill active">All Eyewear</button>
              <button className="filter-pill">Acetate Shield</button>
              <button className="filter-pill">Titanium Aviator</button>
              <button className="filter-pill">Cat-Eye</button>
            </div>
          </div>

          <div className="luxury-product-grid">
            {products.map((item) => (
              <div key={item.id} className="luxury-product-card">
                <div className="product-image-box">
                  <span className="product-badge">{item.tag}</span>
                  <img src={item.img} alt={item.name} className="product-img" loading="lazy" />
                  <div className="product-card-hover-overlay">
                    <Link href="/contact" className="hover-inquire-btn">
                      Request Optical Fitting
                    </Link>
                  </div>
                </div>
                <div className="product-info-box">
                  <span className="product-material">{item.material}</span>
                  <h3 className="product-name">{item.name}</h3>
                  <div className="product-price-row">
                    <span className="product-price">{item.price}</span>
                    <Link href="/contact" className="quick-inquire-link">
                      Inquire <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="subpage-ateliers-banner">
            <div className="ateliers-content">
              <span className="accent-label">Prescription & Custom Tinting</span>
              <h2>Custom Lens Engineering</h2>
              <p>
                Every RAKVIH eyewear frame can be fitted with custom transition, prescription, or gradient tints by our certified optical partners in Geneva.
              </p>
              <Link href="/contact" className="hero-cta-pill">
                Request Custom Lens Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
