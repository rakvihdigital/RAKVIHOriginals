import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Cashmere & Silk Stoles | RAKVIH Originals",
  description: "Sumptuous silk jacquard and pure Himalayan cashmere stoles, hand-fringed and woven in Lyon.",
};

const products = [
  { id: 1, name: "Cel!ne Triomphe Monogram Stole", price: "$1,150", material: "60% Silk / 40% Cashmere Jacquard", img: "/stoles.webp", tag: "Signature" },
  { id: 2, name: "B@rberry Giant Check Scarf", price: "$980", material: "100% Brushed Scottish Cashmere", img: "/stoles 2.webp", tag: "Heritage" },
  { id: 3, name: "Ch@nel Multicolor Pastel Wrap", price: "$1,450", material: "Pure Silk Twill & Hand-Rolled Edges", img: "/stoles 3.webp", tag: "Limited Edition" },
  { id: 4, name: "Fend! FF Zucca Two-Tone Shawl", price: "$1,200", material: "Cashmere-Wool Blend with Delicate Fringe", img: "/stoles 4.webp", tag: "Iconic" },
  { id: 5, name: "Co@ch Signature Silk Diamond", price: "$750", material: "100% Mulberry Silk Habotai", img: "/stoles 5.webp", tag: "Atelier" },
  { id: 6, name: "L.V Monogram Classic Shine Stole", price: "$1,350", material: "Silk, Wool, & Golden Lurex Weave", img: "/stoles 6.webp", tag: "Masterpiece" },
];

export default function StolesPage() {
  return (
    <main className="subpage-wrapper">
      <section className="subpage-hero">
        <div className="subpage-hero-inner">
          <div className="subpage-breadcrumbs">
            <Link href="/">Home</Link> <span>/</span> <span>Collections</span> <span>/</span> <span className="active">Stoles</span>
          </div>
          <div className="hero-accent-line">
            <div className="accent-bar"></div>
            <span className="accent-label">Haute Étole</span>
          </div>
          <h1 className="subpage-title">
            LUXURY <span className="hero-title-stroke">STOLES</span>
          </h1>
          <p className="subpage-subtitle">
            An embrace of ethereal warmth. Woven on historic jacquard looms in Lyon and finished with hand-rolled silk borders.
          </p>
        </div>
      </section>

      <section className="subpage-grid-section">
        <div className="subpage-container">
          <div className="grid-meta-bar">
            <span className="result-count">Showing 6 Woven Stoles</span>
            <div className="grid-filter-pills">
              <button className="filter-pill active">All Stoles</button>
              <button className="filter-pill">Silk Jacquard</button>
              <button className="filter-pill">Pure Cashmere</button>
              <button className="filter-pill">Evening Shawls</button>
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
                      Request Fabric Sample
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
              <span className="accent-label">Gift Presentation</span>
              <h2>Bespoke Monogram Embroidery</h2>
              <p>
                Present an unforgettable gift with custom hand-embroidered silk thread initials in our signature presentation boxes.
              </p>
              <Link href="/contact" className="hero-cta-pill">
                Explore Gift Concierge
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
