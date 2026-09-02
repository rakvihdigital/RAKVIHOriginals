import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Footwear & Luxury Sneakers | RAKVIH Originals",
  description: "Explore the L.V Trainer and luxury footwear collection, blending Italian cobblery heritage with contemporary street luxury.",
};

const products = [
  { id: 1, name: "L.V Trainer Monogram Denim", price: "$1,450", material: "Hand-Stitched Italian Calfskin & Denim", img: "/shoe.webp", tag: "Signature" },
  { id: 2, name: "B@lenciaga Track Carbon", price: "$1,250", material: "Multi-Panel Mesh & Reinforced Nylon", img: "/shoe 2.webp", tag: "Runway Edit" },
  { id: 3, name: "D!or B22 Reflective Technical", price: "$1,600", material: "Reflective Accents & Calf Leather", img: "/shoe 3.webp", tag: "Limited Drop" },
  { id: 4, name: "Alexander McQueen Oversized", price: "$950", material: "Smooth White Calfskin & Suede Heel", img: "/shoe 4.webp", tag: "Classic" },
  { id: 5, name: "Gucc! Screener Distressed", price: "$1,150", material: "Vintage Treated Leather & Web Stripe", img: "/shoe 5.webp", tag: "Artisanal" },
  { id: 6, name: "Prad@ Cloudbust Thunder High", price: "$1,380", material: "Knitted Technical Fabric & 3D Tread", img: "/shoe 6.webp", tag: "Futurist" },
];

export default function FootwearPage() {
  return (
    <main className="subpage-wrapper">
      <section className="subpage-hero">
        <div className="subpage-hero-inner">
          <div className="subpage-breadcrumbs">
            <Link href="/">Home</Link> <span>/</span> <span>Collections</span> <span>/</span> <span className="active">Footwear</span>
          </div>
          <div className="hero-accent-line">
            <div className="accent-bar"></div>
            <span className="accent-label">Haute Cobblery</span>
          </div>
          <h1 className="subpage-title">
            LUXURY <span className="hero-title-stroke">FOOTWEAR</span>
          </h1>
          <p className="subpage-subtitle">
            Crafted with over 30 precision components per pair, combining architectural sole engineering with hand-buffed calfskin leathers.
          </p>
        </div>
      </section>

      <section className="subpage-grid-section">
        <div className="subpage-container">
          <div className="grid-meta-bar">
            <span className="result-count">Showing 6 Exclusive Silhouettes</span>
            <div className="grid-filter-pills">
              <button className="filter-pill active">All Footwear</button>
              <button className="filter-pill">Sneakers</button>
              <button className="filter-pill">Loafers</button>
              <button className="filter-pill">Runway High-Tops</button>
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
                      Request Size Availability
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
              <span className="accent-label">Custom Fit Service</span>
              <h2>Bespoke Sizing & Last Creation</h2>
              <p>
                Our master cobblers in Fiesso d'Artico provide bespoke measuring appointments for custom arch and width configurations.
              </p>
              <Link href="/contact" className="hero-cta-pill">
                Consult With A Footwear Specialist
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
