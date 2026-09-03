"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { formatINR } from "@/lib/fetchProducts";

const WHATSAPP_NUMBER = "919820099401";

export default function CartPage() {
  const { cart, cartSubtotal, updateCartQuantity, removeFromCart, clearCart, isAuthenticated, isLoading, customer, user } = useAuth();

  if (isLoading) {
    return (
      <main className="subpage-wrapper">
        <div className="subpage-container" style={{ padding: "6rem 0", textAlign: "center" }}>
          <h2 style={{ color: "var(--color-gold)", fontFamily: "var(--font-heading)" }}>
            Loading Shopping Bag...
          </h2>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="subpage-wrapper">
        <section className="subpage-hero">
          <div className="subpage-hero-inner">
            <div className="subpage-breadcrumbs">
              <Link href="/">Home</Link> <span>/</span> <span className="active">Shopping Bag</span>
            </div>
            <div className="hero-accent-line">
              <div className="accent-bar"></div>
              <span className="accent-label">Private Checkout</span>
            </div>
            <h1 className="subpage-title">
              SHOPPING <span className="hero-title-stroke">BAG</span>
            </h1>
          </div>
        </section>

        <section style={{ padding: "5rem 0 8rem 0" }}>
          <div className="subpage-container" style={{ textAlign: "center", maxWidth: "550px", margin: "0 auto" }}>
            <div className="auth-card-wrap">
              <span className="brand-gold-badge" style={{ marginBottom: "1rem" }}>
                Authentication Required
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "#ffffff", marginBottom: "0.75rem" }}>
                Sign In To View Your Bag
              </h2>
              <p style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "0.88rem", marginBottom: "2rem" }}>
                Your private shopping bag and reserved atelier pieces are connected to your VIP customer account.
              </p>
              <Link href="/login?redirect=/cart" className="hero-cta-pill" style={{ width: "100%", display: "block" }}>
                Sign In / Register
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // Generate WhatsApp Checkout message
  const customerName = customer?.name || user?.email?.split("@")[0] || "VIP Member";
  const itemsSummary = cart
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.product.brandName} - ${item.product.name} ${item.variant ? `(Size: ${item.variant.sizeName})` : ""} x${item.quantity} = ${formatINR((item.variant?.salePrice || item.variant?.price || item.product.priceValue) * item.quantity)}`
    )
    .join("\n");

  const waCheckoutMsg = encodeURIComponent(
    `Hello RAKVIH Concierge, I would like to proceed with my luxury order:\n\nCustomer: ${customerName}\nEmail: ${user?.email || ""}\n\nSelected Masterpieces:\n${itemsSummary}\n\nGrand Total: ${formatINR(cartSubtotal)}\n\nPlease assist with private VIP billing and insured delivery.`
  );

  const waCheckoutUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waCheckoutMsg}`;

  return (
    <main className="subpage-wrapper">
      {/* Hero Section */}
      <section className="subpage-hero">
        <div className="subpage-hero-inner">
          <div className="subpage-breadcrumbs">
            <Link href="/">Home</Link> <span>/</span> <span className="active">Shopping Bag</span>
          </div>
          <div className="hero-accent-line">
            <div className="accent-bar"></div>
            <span className="accent-label">Private Bag & Checkout</span>
          </div>
          <h1 className="subpage-title">
            SHOPPING <span className="hero-title-stroke">BAG</span>
          </h1>
          <p className="subpage-subtitle">
            Review your selected masterpieces. All items include complimentary presentation packaging and insured concierge transit.
          </p>
        </div>
      </section>

      {/* Cart Body */}
      <section style={{ padding: "3rem 0 6rem 0" }}>
        <div className="subpage-container">
          {cart.length === 0 ? (
            <div
              style={{
                padding: "6rem 2rem",
                textAlign: "center",
                background: "rgba(255, 255, 255, 0.02)",
                borderRadius: "1.5rem",
                border: "1px dashed rgba(255, 255, 255, 0.1)",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "#ffffff", marginBottom: "0.5rem" }}>
                Your Shopping Bag Is Empty
              </h3>
              <p style={{ color: "rgba(255, 255, 255, 0.6)", marginBottom: "2rem", fontSize: "0.9rem" }}>
                Discover handcrafted luxury pieces across our collections.
              </p>
              <Link href="/collection-hub" className="hero-cta-pill">
                Explore Collection Hub
              </Link>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "3rem", alignItems: "start" }}>
              {/* Left Column: Item List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "1rem", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "14px", color: "#ffffff" }}>
                    {cart.length} {cart.length === 1 ? "Item" : "Items"} in Bag
                  </span>
                  <button
                    type="button"
                    onClick={clearCart}
                    style={{
                      background: "none",
                      border: "none",
                      color: "rgba(255, 255, 255, 0.4)",
                      fontSize: "12px",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    Clear Bag
                  </button>
                </div>

                {cart.map((item, idx) => {
                  const unitPrice = item.variant?.salePrice || item.variant?.price || item.product.priceValue || 0;
                  const itemTotal = unitPrice * item.quantity;
                  const variantKey = item.variant?.id ? `${item.product.id}-${item.variant.id}` : `${item.product.id}-${idx}`;

                  return (
                    <div
                      key={variantKey}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "100px 1fr auto",
                        gap: "1.5rem",
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        borderRadius: "1.25rem",
                        padding: "1.25rem",
                        alignItems: "center",
                      }}
                    >
                      {/* Image */}
                      <Link
                        href={`/product/${item.product.id}`}
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "1rem",
                          background: "radial-gradient(circle at 50% 50%, rgba(35, 30, 24, 0.5) 0%, rgba(10, 10, 12, 0.9) 100%)",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "0.5rem",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={item.product.img}
                          alt={item.product.name}
                          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                        />
                      </Link>

                      {/* Info */}
                      <div>
                        <span style={{ fontSize: "0.62rem", fontFamily: "var(--font-heading)", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-gold)", fontWeight: 700, display: "block" }}>
                          {item.product.brandName}
                        </span>
                        <Link
                          href={`/product/${item.product.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "#ffffff", margin: "0.2rem 0 0.5rem 0", fontWeight: 500 }}>
                            {item.product.name}
                          </h4>
                        </Link>

                        {item.variant && (
                          <div style={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.6)", marginBottom: "0.5rem" }}>
                            Size: <span style={{ color: "#ffffff", fontWeight: 600 }}>{item.variant.sizeName}</span>
                          </div>
                        )}

                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--color-gold)", fontSize: "0.95rem" }}>
                            {formatINR(unitPrice)}
                          </span>
                          <span style={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.4)" }}>each</span>
                        </div>
                      </div>

                      {/* Quantity & Delete */}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.75rem" }}>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id, item.variant?.id)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "rgba(255, 255, 255, 0.4)",
                            cursor: "pointer",
                            fontSize: "1rem",
                          }}
                          title="Remove item"
                        >
                          ✕
                        </button>

                        <div style={{ display: "inline-flex", alignItems: "center", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "999px", padding: "2px 8px", gap: "8px" }}>
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1, item.variant?.id)}
                            style={{ background: "none", border: "none", color: "#ffffff", cursor: "pointer", fontSize: "0.85rem" }}
                          >
                            -
                          </button>
                          <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.78rem", fontWeight: 700, color: "#ffffff" }}>
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1, item.variant?.id)}
                            style={{ background: "none", border: "none", color: "#ffffff", cursor: "pointer", fontSize: "0.85rem" }}
                          >
                            +
                          </button>
                        </div>

                        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.1rem", color: "#ffffff" }}>
                          {formatINR(itemTotal)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Order Summary Card */}
              <div className="pdp-price-card" style={{ position: "sticky", top: "6rem" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#ffffff", marginBottom: "1.25rem", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "0.75rem" }}>
                  Summary & Concierge Order
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255, 255, 255, 0.7)", fontSize: "0.88rem" }}>
                    <span>Bag Subtotal</span>
                    <span style={{ color: "#ffffff", fontWeight: 700 }}>{formatINR(cartSubtotal)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255, 255, 255, 0.7)", fontSize: "0.88rem" }}>
                    <span>Signature Presentation Box</span>
                    <span style={{ color: "var(--color-gold)", fontWeight: 700 }}>Complimentary</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255, 255, 255, 0.7)", fontSize: "0.88rem" }}>
                    <span>Insured VIP Transit</span>
                    <span style={{ color: "var(--color-gold)", fontWeight: 700 }}>Complimentary</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "1rem", borderTop: "1px solid rgba(255, 255, 255, 0.1)", fontSize: "1.2rem", color: "#ffffff", fontWeight: 800 }}>
                    <span>Estimated Total</span>
                    <span style={{ color: "#ffffff", fontFamily: "var(--font-heading)" }}>{formatINR(cartSubtotal)}</span>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                  <Link
                    href="/checkout"
                    className="pdp-cart-btn"
                    style={{ textAlign: "center", textDecoration: "none" }}
                  >
                    <span>Proceed to VIP Checkout →</span>
                  </Link>

                  <a
                    href={waCheckoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="quickview-wa-btn"
                    style={{ textAlign: "center" }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    <span>Instant WhatsApp Checkout</span>
                  </a>

                  <Link href="/collection-hub" className="quickview-appointment-btn" style={{ textAlign: "center" }}>
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
