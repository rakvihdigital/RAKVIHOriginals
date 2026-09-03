"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { StoreProduct, ProductVariant } from "@/lib/fetchProducts";
import { useAuth } from "@/context/AuthContext";
import OptimizedImage from "@/components/OptimizedImage";

interface ProductCardProps {
  product: StoreProduct;
}

const WHATSAPP_NUMBER = "919820099401";

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { isAuthenticated, toggleWishlist, isInWishlist, addToCart } = useAuth();
  const [isImgHovered, setIsImgHovered] = useState(false);
  const [cartAdded, setCartAdded] = useState(false);

  // Variant Selection
  const variants = product.variants || [];
  const hasVariants = variants.length > 1;
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    variants.length > 0 ? variants[0] : undefined
  );

  const isWishlisted = isInWishlist(product.id);
  const hasSecondary = Boolean(product.secondaryImg && product.secondaryImg !== product.img);

  // Active Price based on selected variant
  const activePrice = selectedVariant ? selectedVariant.displayPrice : product.price;
  const activeOriginalPrice = selectedVariant
    ? selectedVariant.originalPrice
    : product.originalPrice;
  const isSale = selectedVariant ? selectedVariant.isSale : product.isSale;
  const discountPercent = selectedVariant
    ? selectedVariant.discountPercent
    : product.discountPercent;

  const waMessage = encodeURIComponent(
    `Hi RAKVIH Concierge, I'm interested in the ${product.brandName} "${product.name}" (${activePrice}${selectedVariant?.sizeName ? `, Size: ${selectedVariant.sizeName}` : ""}${product.sku ? `, SKU: ${product.sku}` : ""}). Please share availability!`
  );
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      router.push(`/login?redirect=/product/${product.id}`);
      return;
    }

    toggleWishlist(product);
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      router.push(`/login?redirect=/product/${product.id}`);
      return;
    }

    const success = addToCart(product, selectedVariant, 1);
    if (success) {
      setCartAdded(true);
      setTimeout(() => setCartAdded(false), 1500);
    }
  };

  const handleVariantClick = (e: React.MouseEvent, variant: ProductVariant) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedVariant(variant);
  };

  return (
    <div
      className="luxury-product-card-v2 group"
      onMouseEnter={() => setIsImgHovered(true)}
      onMouseLeave={() => setIsImgHovered(false)}
    >
      {/* Top Image Showcase */}
      <div className="product-showcase-box">
        {/* Floating Badges */}
        <div className="showcase-badges-top-left">
          <span className="brand-gold-badge">{product.brandName}</span>
          {isSale && discountPercent && (
            <span className="sale-discount-badge">{discountPercent}% OFF</span>
          )}
        </div>

        <div className="showcase-badges-top-right">
          {product.tag && (
            <span className="gender-tag-badge">{product.tag}</span>
          )}
          {/* Wishlist Heart Toggle */}
          <button
            type="button"
            className={`wishlist-icon-btn ${isWishlisted ? "active" : ""}`}
            onClick={handleWishlistClick}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            title={isAuthenticated ? (isWishlisted ? "Saved in Wishlist" : "Add to Wishlist") : "Login to Save Wishlist"}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill={isWishlisted ? "var(--color-gold)" : "none"}
              stroke={isWishlisted ? "var(--color-gold)" : "currentColor"}
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          {/* Add to Cart Quick Button */}
          <button
            type="button"
            className={`wishlist-icon-btn${cartAdded ? " active" : ""}`}
            onClick={handleCartClick}
            aria-label="Add to cart"
            title={isAuthenticated ? (cartAdded ? "Added to Bag!" : "Add to Bag") : "Login to Add to Bag"}
            style={{ color: cartAdded ? "var(--color-gold)" : undefined }}
          >
            {cartAdded ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            )}
          </button>
        </div>

        {/* Product Image */}
        <Link href={`/product/${product.id}`} className="product-image-pedestal">
          <OptimizedImage
            src={product.img}
            alt={product.name}
            className="product-main-img"
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </Link>

        {/* Floating Quick Action Overlay */}
        <div className="product-quick-actions-bar">
          <Link
            href={`/product/${product.id}`}
            className="action-quickview-btn"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span>View Details</span>
          </Link>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="action-wa-icon-btn"
            title="Instant WhatsApp Inquire"
            onClick={(e) => e.stopPropagation()}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Card Content Details */}
      <div className="product-meta-details">
        <div className="product-category-row">
          <span className="product-meta-category">{product.material}</span>
        </div>

        <Link href={`/product/${product.id}`} className="no-underline">
          <h3
            className="product-card-heading"
            title={product.name}
          >
            {product.name}
          </h3>
        </Link>

        {/* Choosable Variants Pill Strip */}
        {hasVariants && (
          <div className="product-card-variants-row">
            <span className="variant-label-tiny">Sizes:</span>
            <div className="variant-chips-wrap">
              {variants.slice(0, 4).map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={(e) => handleVariantClick(e, v)}
                  className={`variant-chip-btn ${selectedVariant?.id === v.id ? "active" : ""}`}
                  title={`${v.sizeName} - ${v.displayPrice}`}
                >
                  {v.sizeName}
                </button>
              ))}
              {variants.length > 4 && (
                <Link
                  href={`/product/${product.id}`}
                  className="variant-more-chip"
                >
                  +{variants.length - 4}
                </Link>
              )}
            </div>
          </div>
        )}

        <div className="product-pricing-strip">
          <div className="price-display-group">
            <span className="current-price-tag">{activePrice}</span>
            {isSale && activeOriginalPrice && (
              <span className="original-strikethrough-tag">{activeOriginalPrice}</span>
            )}
          </div>

          <Link
            href={`/product/${product.id}`}
            className="card-inquire-btn"
          >
            <span>View</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
