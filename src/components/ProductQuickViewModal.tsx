"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { StoreProduct } from "@/lib/fetchProducts";

interface QuickViewProps {
  product: StoreProduct | null;
  onClose: () => void;
}

const WHATSAPP_NUMBER = "919820099401";

export function ProductQuickViewModal({ product, onClose }: QuickViewProps) {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  // Reset selected image when product changes
  useEffect(() => {
    setSelectedImageIdx(0);
  }, [product]);

  // Handle ESC key to close modal
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    if (product) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [product, onClose]);

  if (!product) return null;

  const images = product.images && product.images.length > 0 ? product.images : [product.img];
  const currentImage = images[selectedImageIdx] || product.img;

  const waMessage = encodeURIComponent(
    `Hello RAKVIH Concierge, I am inquiring about the ${product.brandName} "${product.name}" (Price: ${product.price}${product.sku ? `, SKU: ${product.sku}` : ""}). Could you share availability and viewing details?`
  );
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

  return (
    <div className="quickview-overlay" onClick={onClose}>
      <div
        className="quickview-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quickview-title"
      >
        {/* Close Button */}
        <button
          className="quickview-close-btn"
          onClick={onClose}
          aria-label="Close Quick View"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="6" />
          </svg>
        </button>

        <div className="quickview-body">
          {/* Left Column: Image Gallery */}
          <div className="quickview-gallery">
            <div className="quickview-main-image-wrap">
              <img
                src={currentImage}
                alt={product.name}
                className="quickview-main-img"
              />
              {product.isSale && product.discountPercent && (
                <span className="quickview-sale-badge">
                  {product.discountPercent}% OFF
                </span>
              )}
              {product.tag && (
                <span className="quickview-gender-badge">{product.tag}</span>
              )}
            </div>

            {/* Thumbnail selector */}
            {images.length > 1 && (
              <div className="quickview-thumbnails">
                {images.map((imgUrl, idx) => (
                  <button
                    key={`thumb-${idx}`}
                    type="button"
                    className={`quickview-thumb-btn ${idx === selectedImageIdx ? "active" : ""}`}
                    onClick={() => setSelectedImageIdx(idx)}
                  >
                    <img src={imgUrl} alt={`${product.name} view ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details & Actions */}
          <div className="quickview-details">
            <div className="quickview-header-row">
              <span className="quickview-brand-pill">{product.brandName}</span>
              <span className="quickview-category-label">{product.material}</span>
            </div>

            <h2 id="quickview-title" className="quickview-title">
              {product.name}
            </h2>

            {product.sku && (
              <div className="quickview-sku-badge">
                <span>SKU:</span> <code>{product.sku}</code>
              </div>
            )}

            {/* Price Box */}
            <div className="quickview-price-box">
              <div className="quickview-price-row">
                <span className="quickview-current-price">{product.price}</span>
                {product.isSale && product.originalPrice && (
                  <span className="quickview-original-price">
                    {product.originalPrice}
                  </span>
                )}
              </div>
              <span className="quickview-tax-note">Inclusive of all concierge taxes & insured transit</span>
            </div>

            {/* Description / Quality note */}
            <div className="quickview-desc">
              <p>
                {product.description ||
                  "Crafted with meticulous attention to detail, each curated piece embodies timeless silhouette architecture, artisanal finish, and impeccable savoir-faire."}
              </p>
            </div>

            {/* Features checklist */}
            <div className="quickview-features-list">
              <div className="quickview-feat-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>100% Curated Luxury Quality Standards</span>
              </div>
              <div className="quickview-feat-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13" rx="2" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
                <span>Express Dispatched with Private VIP Tracking</span>
              </div>
              <div className="quickview-feat-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>Dedicated VIP WhatsApp Styling Concierge</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="quickview-actions">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="quickview-wa-btn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>Instant WhatsApp Concierge</span>
              </a>

              <Link
                href="/contact"
                onClick={onClose}
                className="quickview-appointment-btn"
              >
                Book Private Salon Viewing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
