import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Signature Belts & Ceintures | RAKVIH Originals",
  description: "Reversible luxury belts in Taurillon leather, monogram canvas, and palladium-finish buckle hardware.",
};

const products = [
  { id: 1, name: "L.V Initiales 40mm Reversible", price: "$690", material: "Taurillon Leather & Brushed Gold Buckle", img: "/belt 1.jpg", tag: "Signature" },
  { id: 2, name: "Herme$ Constance H Buckle", price: "$920", material: "Epsom Calfskin & Palladium Plated Buckle", img: "/belt 2.jpg", tag: "Iconic Edition" },
  { id: 3, name: "FERR@GAMO Gancini Double Buckle", price: "$650", material: "Smooth Black Calfskin & Reversible Brown", img: "/belt 3.jpg", tag: "Classic" },
  { id: 4, name: "Vers@ce La Medusa 3D Buckle", price: "$750", material: "Smooth Calf Leather with Golden Medusa", img: "/belt 4.jpg", tag: "Runway" },
  { id: 5, name: "B@rberry Check Plaque Belt", price: "$590", material: "E-Canvas Check & Polished Steel Hardware", img: "/belt 5.jpg", tag: "Heritage" },
  { id: 6, name: "L.V Monogram Eclipse 35mm", price: "$680", material: "Eclipse Monogram & Matte Black Hardware", img: "/belt 6.jpg", tag: "Atelier" },
];

export default function BeltsPage() {
  return (
    <main className="subpage-wrapper">
      <section className="subpage-hero">
        <div className="subpage-hero-inner">
          <div className="subpage-breadcrumbs">
            <Link href="/">Home</Link> <span>/</span> <span>Collections</span> <span>/</span> <span className="active">Belts</span>
          </div>
          <div className="hero-accent-line">
            <div className="accent-bar"></div>
            <span className="accent-label">Haute Ceinturerie</span>
          </div>
          <h1 className="subpage-title">
            SIGNATURE <span className="hero-title-stroke">BELTS</span>
          </h1>
          <p className="subpage-subtitle">
            Engineered with hand-stitched saddle leather and reversible multi-tone finishes, defining the waist with sculpted distinction.
          </p>
        </div>
      </section>

      <section className="subpage-grid-section">
        <div className="subpage-container">
          <div className="grid-meta-bar">
            <span className="result-count">Showing 6 Signature Belts</span>
            <div className="grid-filter-pills">
              <button className="filter-pill active">All Belts</button>
              <button className="filter-pill">Reversible 40mm</button>
              <button className="filter-pill">Dress 35mm</button>
              <button className="filter-pill">Buckle Hardware</button>
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
                      Request Custom Sizing
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
              <span className="accent-label">Custom Sizing & Punching</span>
              <h2>Bespoke Strap Customization</h2>
              <p>
                Receive precision hole punching and custom strap trimming tailored to your exact waist and hip measurements.
              </p>
              <Link href="/contact" className="hero-cta-pill">
                Book A Fitting Appointment
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
