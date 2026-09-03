"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchProductById, StoreProduct, ProductVariant } from "@/lib/fetchProducts";
import { ProductCard } from "@/components/ProductCard";
import { useAuth } from "@/context/AuthContext";
import OptimizedImage from "@/components/OptimizedImage";

const WHATSAPP_NUMBER = "919820099401";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { isAuthenticated, addToCart, toggleWishlist, isInWishlist } = useAuth();

  const [product, setProduct] = useState<StoreProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<StoreProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Gallery state
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);

  // Variant & Quantity state
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);

  // Accordion state
  const [openAccordion, setOpenAccordion] = useState<string | null>("craftsmanship");

  // Notification state
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  useEffect(() => {
    async function loadProduct() {
      setIsLoading(true);
      const { product: prod, relatedProducts: related } = await fetchProductById(id);
      setProduct(prod);
      setRelatedProducts(related);
      if (prod?.variants && prod.variants.length > 0) {
        setSelectedVariant(prod.variants[0]);
      }
      setSelectedImgIdx(0);
      setIsLoading(false);
    }
    loadProduct();
  }, [id]);

  if (isLoading) {
    return (
      <main className="subpage-wrapper">
        <div className="subpage-container" style={{ padding: "6rem 0", textAlign: "center" }}>
          <div className="skeleton-shimmer" style={{ width: "300px", height: "300px", margin: "0 auto 2rem", borderRadius: "1.5rem" }} />
          <h2 style={{ color: "var(--color-gold)", fontFamily: "var(--font-heading)", fontSize: "1.2rem" }}>
            Loading Masterpiece Details...
          </h2>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="subpage-wrapper">
        <div className="subpage-container" style={{ padding: "8rem 0", textAlign: "center" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", color: "#ffffff", marginBottom: "1rem" }}>
            Masterpiece Not Found
          </h1>
          <p style={{ color: "rgba(255, 255, 255, 0.6)", marginBottom: "2rem" }}>
            The requested creation is either unavailable or has been archived from our salon.
          </p>
          <Link href="/collection-hub" className="hero-cta-pill">
            Explore Collection Hub
          </Link>
        </div>
      </main>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.img];
  const currentImg = images[selectedImgIdx] || product.img;

  const activePrice = selectedVariant ? selectedVariant.displayPrice : product.price;
  const activeOriginalPrice = selectedVariant ? selectedVariant.originalPrice : product.originalPrice;
  const isSale = selectedVariant ? selectedVariant.isSale : product.isSale;
  const discountPercent = selectedVariant ? selectedVariant.discountPercent : product.discountPercent;
  const isWishlisted = isInWishlist(product.id);

  const waMessage = encodeURIComponent(
    `Hello RAKVIH Concierge, I'm inquiring about the ${product.brandName} "${product.name}" (Price: ${activePrice}${selectedVariant ? `, Size: ${selectedVariant.sizeName}` : ""}${product.sku ? `, SKU: ${product.sku}` : ""}). Could you confirm availability and private salon viewing?`
  );
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/product/${product.id}`);
      return;
    }

    addToCart(product, selectedVariant, quantity);
    setFeedbackMsg("Added to your shopping bag!");
    setTimeout(() => setFeedbackMsg(null), 3500);
  };

  const handleWishlist = () => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/product/${product.id}`);
      return;
    }

    toggleWishlist(product);
  };

  return (
    <main className="subpage-wrapper">
      {/* Toast Feedback */}
      {feedbackMsg && (
        <div
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            background: "linear-gradient(135deg, rgba(20, 20, 24, 0.95) 0%, rgba(10, 10, 12, 0.98) 100%)",
            border: "1px solid var(--color-gold)",
            color: "#ffffff",
            padding: "1rem 1.75rem",
            borderRadius: "999px",
            boxShadow: "0 15px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(196, 161, 116, 0.3)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontFamily: "var(--font-heading)",
            fontSize: "0.85rem",
            fontWeight: 700,
            animation: "quickViewFadeIn 0.3s ease",
          }}
        >
          <span style={{ color: "var(--color-gold)", fontSize: "1.1rem" }}>✓</span>
          <span>{feedbackMsg}</span>
          <Link
            href="/cart"
            style={{
              marginLeft: "0.5rem",
              color: "var(--color-gold)",
              textDecoration: "underline",
              fontSize: "0.8rem",
            }}
          >
            View Bag →
          </Link>
        </div>
      )}

      {/* Breadcrumb Header */}
      <section style={{ padding: "2rem 0 1rem 0", borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
        <div className="subpage-container">
          <div className="subpage-breadcrumbs">
            <Link href="/">Home</Link> <span>/</span>{" "}
            <Link href="/collection-hub">Collections</Link> <span>/</span>{" "}
            <span>{product.material}</span> <span>/</span>{" "}
            <span className="active">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Main PDP Grid */}
      <section className="product-page-section">
        <div className="subpage-container">
          <div className="product-detail-grid">
            {/* Left Column: Image Showcase */}
            <div className="pdp-gallery-container">
              <div className="pdp-main-image-wrap">
                <OptimizedImage
                  src={currentImg}
                  alt={product.name}
                  className="pdp-main-img"
                  priority
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {isSale && discountPercent && (
                  <span className="quickview-sale-badge">{discountPercent}% OFF</span>
                )}
                {product.tag && (
                  <span className="quickview-gender-badge">{product.tag}</span>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="pdp-thumbnails-strip">
                  {images.map((imgUrl, idx) => (
                    <button
                      key={`thumb-${idx}`}
                      type="button"
                      className={`pdp-thumb-card ${idx === selectedImgIdx ? "active" : ""}`}
                      onClick={() => setSelectedImgIdx(idx)}
                      style={{ position: "relative", overflow: "hidden" }}
                    >
                      <OptimizedImage
                        src={imgUrl}
                        alt={`${product.name} thumbnail ${idx + 1}`}
                        fill
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Information & Actions */}
            <div className="pdp-info-column">
              <div className="pdp-badges-row">
                <span className="pdp-brand-badge">{product.brandName}</span>
                <span className="pdp-category-pill">{product.material}</span>
                <span className="pdp-stock-badge">● In Stock & Ready to Dispatch</span>
              </div>

              <h1 className="pdp-title">{product.name}</h1>

              <div className="pdp-meta-row">
                {product.sku && (
                  <div>
                    <span>SKU: </span>
                    <code style={{ color: "var(--color-gold)", background: "rgba(255, 255, 255, 0.05)", padding: "2px 6px", borderRadius: "4px" }}>
                      {product.sku}
                    </code>
                  </div>
                )}
                <div>
                  <span>Edition: </span>
                  <span style={{ color: "#ffffff" }}>Maison Privé Selection</span>
                </div>
              </div>

              {/* Pricing Card */}
              <div className="pdp-price-card">
                <div className="pdp-price-main-row">
                  <span className="pdp-current-price">{activePrice}</span>
                  {isSale && activeOriginalPrice && (
                    <span className="pdp-original-price">{activeOriginalPrice}</span>
                  )}
                  {isSale && discountPercent && (
                    <span className="pdp-save-badge">Save {discountPercent}%</span>
                  )}
                </div>
                <span style={{ fontSize: "0.78rem", color: "rgba(255, 255, 255, 0.5)" }}>
                  Price inclusive of all luxury concierge import duties & insured transit.
                </span>
              </div>

              {/* Variants Selector */}
              {product.variants && product.variants.length > 0 && (
                <div className="pdp-variant-section">
                  <div className="pdp-variant-title-row">
                    <span className="pdp-variant-title">
                      Select Size / Variation: {selectedVariant ? <strong style={{ color: "var(--color-gold)" }}>{selectedVariant.sizeName}</strong> : null}
                    </span>
                    <span style={{ fontSize: "0.72rem", color: "rgba(255, 255, 255, 0.5)" }}>
                      {product.variants.length} available
                    </span>
                  </div>
                  <div className="pdp-variant-grid">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariant(v)}
                        className={`pdp-variant-btn ${selectedVariant?.id === v.id ? "active" : ""}`}
                      >
                        {v.sizeName}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.75rem" }}>
                <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255, 255, 255, 0.6)" }}>
                  Quantity:
                </span>
                <div style={{ display: "inline-flex", alignItems: "center", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "999px", padding: "4px 12px", gap: "12px" }}>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    style={{ background: "none", border: "none", color: "#ffffff", fontSize: "1rem", cursor: "pointer" }}
                  >
                    -
                  </button>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "#ffffff" }}>
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    style={{ background: "none", border: "none", color: "#ffffff", fontSize: "1rem", cursor: "pointer" }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="pdp-action-buttons">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="pdp-cart-btn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  <span>{isAuthenticated ? "Add To Shopping Bag" : "Login To Add To Bag"}</span>
                </button>

                <div className="pdp-secondary-actions-row">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pdp-wa-concierge-btn"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    <span>Inquire via WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleWishlist}
                    className={`pdp-wishlist-toggle-btn ${isWishlisted ? "active" : ""}`}
                    title={isWishlisted ? "Saved in Wishlist" : "Add to Wishlist"}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill={isWishlisted ? "var(--color-gold)" : "none"} stroke={isWishlisted ? "var(--color-gold)" : "currentColor"} strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Accordion Sections */}
              <div style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
                {/* 1. Craftsmanship */}
                <div className="pdp-accordion-item">
                  <button
                    type="button"
                    className="pdp-accordion-header"
                    onClick={() => setOpenAccordion(openAccordion === "craftsmanship" ? null : "craftsmanship")}
                  >
                    <span>Atelier Craftsmanship & Materials</span>
                    <span>{openAccordion === "craftsmanship" ? "−" : "+"}</span>
                  </button>
                  {openAccordion === "craftsmanship" && (
                    <div className="pdp-accordion-content">
                      <p>
                        {product.description ||
                          "Every creation is meticulously inspected and verified by our master curators in Florence and Paris. Handcrafted using premium grade leathers, gold-toned or palladium-plated hardware, and artisanal edge-finishes."}
                      </p>
                    </div>
                  )}
                </div>

                {/* 2. Delivery & Returns */}
                <div className="pdp-accordion-item">
                  <button
                    type="button"
                    className="pdp-accordion-header"
                    onClick={() => setOpenAccordion(openAccordion === "shipping" ? null : "shipping")}
                  >
                    <span>Complimentary VIP Courier & Transit</span>
                    <span>{openAccordion === "shipping" ? "−" : "+"}</span>
                  </button>
                  {openAccordion === "shipping" && (
                    <div className="pdp-accordion-content">
                      <p>
                        All RAKVIH orders are packaged in signature presentation boxes with protective dust covers. Delivered via insured express courier with real-time tracking across India within 2–5 business days.
                      </p>
                    </div>
                  )}
                </div>

                {/* 3. Authenticity Guarantee */}
                <div className="pdp-accordion-item">
                  <button
                    type="button"
                    className="pdp-accordion-header"
                    onClick={() => setOpenAccordion(openAccordion === "authenticity" ? null : "authenticity")}
                  >
                    <span>Maison Authenticity & Quality Assurance</span>
                    <span>{openAccordion === "authenticity" ? "−" : "+"}</span>
                  </button>
                  {openAccordion === "authenticity" && (
                    <div className="pdp-accordion-content">
                      <p>
                        Every piece arrives with an individual RAKVIH serial certificate and quality guarantee stamp. Our concierge is available 7 days a week for private video consultations and bespoke sizing appointments.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div style={{ marginTop: "6rem", paddingTop: "4rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
              <div className="section-header-center" style={{ marginBottom: "3rem" }}>
                <span className="section-eyebrow-gold">Curated Recommendations</span>
                <h2 className="section-title-xl" style={{ fontSize: "2rem" }}>Similar Masterpieces</h2>
                <p className="section-subtitle">Complementary silhouettes from the same haute collection.</p>
              </div>

              <div className="luxury-product-grid-v2">
                {relatedProducts.map((relProduct) => (
                  <ProductCard key={relProduct.id} product={relProduct} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
