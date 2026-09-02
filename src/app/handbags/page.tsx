import React from "react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Handbags & Haute Maroquinerie | RAKVIH Originals",
  description: "Curated collection of handcrafted luxury handbags, crafted with full-grain Italian lambskin and 24K gold-finish hardware.",
};

const products = [
  { id: 1, name: "Capucines Monogram Noir", price: "$4,850", material: "Full-Grain Taurillon Calfskin", img: "/handbag.webp", tag: "Iconic Edition" },
  { id: 2, name: "Bordeaux Cannage Satchel", price: "$4,200", material: "Quilted Italian Lambskin", img: "/handbag 2.webp", tag: "New Season" },
  { id: 3, name: "Alma BB Crocodile Embossed", price: "$5,600", material: "Embossed Calfskin & 24K Gold Clasp", img: "/handbag 3.webp", tag: "Limited Privé" },
  { id: 4, name: "Twist Lock Evening Minaudière", price: "$3,950", material: "Epi Leather & Polished Hardware", img: "/handbag 4.webp", tag: "Atelier Special" },
  { id: 5, name: "Speedy Bandoulière Heritage", price: "$3,400", material: "Heritage Monogram Canvas", img: "/handbag 5.webp", tag: "Timeless" },
  { id: 6, name: "Petite Malle Trunk Bag", price: "$6,100", material: "Reinforced Wood Core & Metallic Edges", img: "/handbag 6.webp", tag: "Masterpiece" },
];

export default function HandbagsPage() {
  return (
    <main className="subpage-wrapper">
      {/* Page Hero Header */}
      <section className="subpage-hero">
        <div className="subpage-hero-inner">
          <div className="subpage-breadcrumbs">
            <Link href="/">Home</Link> <span>/</span> <span>Collections</span> <span>/</span> <span className="active">Handbags</span>
          </div>
          <div className="hero-accent-line">
            <div className="accent-bar"></div>
            <span className="accent-label">Haute Maroquinerie</span>
          </div>
          <h1 className="subpage-title">
            THE HANDBAG <span className="hero-title-stroke">EDITION</span>
          </h1>
          <p className="subpage-subtitle">
            An extraordinary symphony of Italian tannery mastery, sculptural architecture, and hand-stitched cannage quilting.
          </p>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="subpage-grid-section">
        <div className="subpage-container">
          <div className="grid-meta-bar">
            <span className="result-count">Showing 6 Exclusive Masterpieces</span>
            <div className="grid-filter-pills">
              <button className="filter-pill active">All Silhouettes</button>
              <button className="filter-pill">Tote Bags</button>
              <button className="filter-pill">Evening Clutches</button>
              <button className="filter-pill">Trunks</button>
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
                      Request Private Viewing
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

          {/* Ateliers Heritage Banner */}
          <div className="subpage-ateliers-banner">
            <div className="ateliers-content">
              <span className="accent-label">Bespoke Savoir-Faire</span>
              <h2>Custom Atelier Monogramming</h2>
              <p>
                Every RAKVIH handbag can be personalized with hand-painted gold initials and custom hardware engravings in our Florence salon.
              </p>
              <Link href="/contact" className="hero-cta-pill">
                Schedule Private Appointment
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
