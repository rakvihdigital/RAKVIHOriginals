"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { formatINR } from "@/lib/fetchProducts";

const WHATSAPP_NUMBER = "919820099401";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [order, setOrder] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadOrder() {
      if (!orderId) {
        setIsLoading(false);
        return;
      }

      try {
        const { data } = await supabase
          .from("orders")
          .select("*")
          .eq("id", orderId)
          .single();

        if (data) {
          setOrder(data);
        }
      } catch {
        // ignore
      } finally {
        setIsLoading(false);
      }
    }

    loadOrder();
  }, [orderId]);

  const waMessage = encodeURIComponent(
    `Hello RAKVIH Concierge, I just placed order #${orderId || "VIP"}${order ? ` for a total of ${formatINR(order.grand_total)}` : ""}. Could you please share dispatch confirmation and estimated delivery time?`
  );
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

  return (
    <div style={{ maxWidth: "680px", margin: "0 auto" }}>
      <div className="auth-card-wrap" style={{ textAlign: "center", padding: "3.5rem 2.5rem" }}>
        {/* Top Celebration Icon */}
        <div
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(196, 161, 116, 0.2) 0%, rgba(168, 139, 74, 0.3) 100%)",
            border: "1px solid var(--color-gold)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
            color: "var(--color-gold)",
            fontSize: "2rem",
            boxShadow: "0 0 30px rgba(196, 161, 116, 0.3)",
          }}
        >
          ✓
        </div>

        <span className="brand-gold-badge" style={{ marginBottom: "1rem" }}>
          Order Confirmed & Secured
        </span>

        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", color: "#ffffff", marginBottom: "0.5rem" }}>
          Thank You For Your Acquisition
        </h1>

        <p style={{ color: "rgba(255, 255, 255, 0.65)", fontSize: "0.92rem", lineHeight: 1.6, marginBottom: "2rem" }}>
          Your bespoke luxury order has been registered in the Maison ledger. Our atelier artisans are preparing your complimentary signature presentation box.
        </p>

        {/* Order Details Card */}
        <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "1.25rem", padding: "1.5rem", textAlign: "left", marginBottom: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "0.85rem", marginBottom: "1rem" }}>
            <div>
              <span style={{ fontSize: "0.7rem", color: "rgba(255, 255, 255, 0.5)", textTransform: "uppercase", letterSpacing: "0.1em", display: "block" }}>
                Order Reference
              </span>
              <strong style={{ fontFamily: "var(--font-heading)", color: "var(--color-gold)", fontSize: "0.95rem" }}>
                {orderId || "CONFIRMED-VIP"}
              </strong>
            </div>

            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: "0.7rem", color: "rgba(255, 255, 255, 0.5)", textTransform: "uppercase", letterSpacing: "0.1em", display: "block" }}>
                Status
              </span>
              <span style={{ color: "#2ecc71", fontWeight: 700, fontSize: "0.85rem" }}>
                ● Confirmed & Dispatched Soon
              </span>
            </div>
          </div>

          {order && (
            <>
              {/* Recipient & Address */}
              <div style={{ marginBottom: "1.25rem", fontSize: "0.82rem", color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.5 }}>
                <span style={{ display: "block", color: "var(--color-gold)", fontWeight: 700, marginBottom: "2px" }}>
                  Delivery Destination:
                </span>
                <div>{order.full_name} ({order.phone_number})</div>
                <div>{order.house_number}, {order.street}</div>
                <div>{order.city}, {order.state} - {order.pincode}</div>
              </div>

              {/* Items */}
              {order.cart_items && Array.isArray(order.cart_items) && (
                <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.06)", paddingTop: "1rem", marginBottom: "1rem", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <span style={{ fontSize: "0.7rem", color: "rgba(255, 255, 255, 0.5)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Reserved Pieces:
                  </span>
                  {order.cart_items.map((it: any, i: number) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.82rem", color: "#ffffff" }}>
                      <span>
                        {it.name} {it.variationName ? `(Size: ${it.variationName})` : ""} x{it.quantity}
                      </span>
                      <span style={{ fontWeight: 700, color: "var(--color-gold)" }}>
                        {formatINR(it.price * it.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Grand Total */}
              <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "0.85rem", fontSize: "1.1rem", fontWeight: 800, color: "#ffffff" }}>
                <span>Grand Total Settled</span>
                <span style={{ color: "var(--color-gold)", fontFamily: "var(--font-heading)" }}>
                  {formatINR(order.grand_total)}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pdp-wa-concierge-btn"
            style={{ textAlign: "center" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            <span>Track Order on WhatsApp Concierge</span>
          </a>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <Link href="/profile" className="hero-cta-pill" style={{ textAlign: "center" }}>
              View In My Orders
            </Link>
            <Link href="/collection-hub" className="quickview-appointment-btn" style={{ textAlign: "center" }}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <main className="subpage-wrapper" style={{ minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "4rem 1.5rem" }}>
      <Suspense fallback={<div style={{ textAlign: "center", color: "var(--color-gold)" }}>Loading Confirmation...</div>}>
        <OrderSuccessContent />
      </Suspense>
    </main>
  );
}
