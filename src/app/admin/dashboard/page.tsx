"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag, TrendingUp, Package, Users,
  Zap, ChevronRight, PlusCircle, ClipboardList,
  RefreshCw, BarChart3, Layers
} from "lucide-react";
import { initialOrders, initialProducts, initialCustomers, initialCoupons } from "@/lib/adminData";

export default function DashboardPage() {
  const [orders] = useState(initialOrders);
  const [products] = useState(initialProducts);
  const [customers] = useState(initialCustomers);

  const totalRevenue = orders.reduce((a, c) => a + c.totalAmount, 0);

  const topStats = [
    { label: "DIGITAL ORDERS", value: orders.length.toString(), icon: <ShoppingBag size={20} strokeWidth={1.5} /> },
    { label: "POS TRANSACTIONS", value: "314", icon: <ClipboardList size={20} strokeWidth={1.5} /> },
    { label: "ONLINE REVENUE", value: `₹${totalRevenue.toLocaleString("en-IN")}`, icon: <TrendingUp size={20} strokeWidth={1.5} /> },
    { label: "POS REVENUE", value: `₹93,60,746`, icon: <BarChart3 size={20} strokeWidth={1.5} /> },
  ];

  const bottomStats = [
    { label: "INVENTORY", value: products.reduce((a, p) => a + p.stock, 0).toString(), icon: <Package size={20} strokeWidth={1.5} /> },
    { label: "MEMBERS", value: customers.length.toString(), icon: <Users size={20} strokeWidth={1.5} /> },
    { label: "CAMPAIGN BANNERS", value: "1", icon: <Layers size={20} strokeWidth={1.5} /> },
    { label: "LIVE OFFERS", value: initialCoupons.filter(c => c.status === "Active").length.toString(), icon: <Zap size={20} strokeWidth={1.5} /> },
  ];

  return (
    <div className="dash-wrapper">
      {/* ── Page Header ── */}
      <div className="dash-header">
        <div>
          <div className="dash-header-eyebrow">
            <span className="dash-header-dot"></span>
            <span>Executive Insight</span>
          </div>
          <h1 className="dash-header-title">
            <span className="dash-header-title-bold">STUDIO </span>
            <span className="dash-header-title-italic">DASHBOARD</span>
          </h1>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="dash-refresh-btn"
        >
          <RefreshCw size={14} strokeWidth={1.5} />
          Refresh Intel
        </button>
      </div>

      {/* ── TOP KPI ROW ── */}
      <div className="dash-kpi-grid">
        {topStats.map((s) => (
          <div key={s.label} className="dash-kpi-card dash-kpi-card--top">
            <div className="dash-kpi-icon">{s.icon}</div>
            <p className="dash-kpi-label">{s.label}</p>
            <p className="dash-kpi-value">{s.value}</p>
          </div>
        ))}
      </div>

      {/* ── BOTTOM KPI ROW ── */}
      <div className="dash-kpi-grid">
        {bottomStats.map((s) => (
          <div key={s.label} className="dash-kpi-card">
            <div className="dash-kpi-icon dash-kpi-icon--muted">{s.icon}</div>
            <p className="dash-kpi-label">{s.label}</p>
            <p className="dash-kpi-value">{s.value}</p>
          </div>
        ))}
      </div>

      {/* ── ORDERS TABLE + TOP PRODUCTS ── */}
      <div className="dash-panels-grid">
        {/* Recent Orders */}
        <div className="dash-panel dash-panel--orders">
          <div className="dash-panel-head">
            <div>
              <h3 className="dash-panel-title">Recent Orders</h3>
              <p className="dash-panel-subtitle">Live Order Stream</p>
            </div>
            <Link href="/admin/orders" className="dash-panel-link">
              View All <ChevronRight size={12} />
            </Link>
          </div>

          <div className="dash-table-scroll">
            <table className="dash-table">
              <thead>
                <tr>
                  {["Order", "Customer", "Amount", "Payment", "Status"].map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((o) => (
                  <tr key={o.id}>
                    <td><span className="dash-order-number">{o.orderNumber}</span></td>
                    <td><span className="dash-customer-name">{o.customerName}</span></td>
                    <td><span className="dash-amount">₹{o.totalAmount.toLocaleString("en-IN")}</span></td>
                    <td>
                      <span className={`dash-chip ${o.paymentStatus === "Verified" ? "dash-chip--verified" : "dash-chip--pending"}`}>
                        {o.paymentStatus}
                      </span>
                    </td>
                    <td>
                      <span className="dash-chip dash-chip--status">{o.orderStatus}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="dash-panel">
          <div className="dash-panel-head">
            <h3 className="dash-panel-title">Top Creations</h3>
            <Link href="/admin/products" className="dash-panel-link">
              Catalog
            </Link>
          </div>

          <div className="dash-product-list">
            {products.slice(0, 4).map((p) => (
              <div key={p.id} className="dash-product-row">
                <div className="dash-product-thumb">
                  <img
                    src={p.image}
                    alt={p.name}
                    onError={(e) => { (e.target as HTMLImageElement).src = "/handbag.webp"; }}
                  />
                </div>
                <div className="dash-product-body">
                  <h4 className="dash-product-name">{p.name}</h4>
                  <div className="dash-product-meta">
                    <span className="dash-product-price">₹{p.price.toLocaleString("en-IN")}</span>
                    <span className="dash-product-stock">Stock: {p.stock}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="dash-add-product-wrap">
            <Link href="/admin/products/add" className="dash-add-product-btn">
              <PlusCircle size={14} strokeWidth={1.5} /> Add Product
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}