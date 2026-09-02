"use client";

import React, { useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  ShoppingBag, TrendingUp, Package, Users, Megaphone,
  Zap, ChevronRight, PlusCircle, QrCode, ClipboardList,
  Sparkles, CreditCard, RefreshCw, BarChart3, DollarSign, Layers
} from "lucide-react";
import { initialOrders, initialProducts, initialApprovals, initialCustomers, initialCoupons } from "@/lib/adminData";

export default function DashboardPage() {
  const [orders] = useState(initialOrders);
  const [products] = useState(initialProducts);
  const [approvals] = useState(initialApprovals);
  const [customers] = useState(initialCustomers);

  const totalRevenue = orders.reduce((a, c) => a + c.totalAmount, 0);
  const pendingCount = approvals.filter((a) => a.status === "Pending").length;
  const lowStock = products.filter((p) => p.stock < 5).length;

  const topStats = [
    { label: "DIGITAL ORDERS", value: orders.length.toString(), icon: <ShoppingBag size={20} strokeWidth={1.5} />, iconBg: "bg-[#13102b]", iconColor: "text-brand-gold" },
    { label: "POS TRANSACTIONS", value: "314", icon: <ClipboardList size={20} strokeWidth={1.5} />, iconBg: "bg-brand-gold/10", iconColor: "text-brand-gold" },
    { label: "ONLINE REVENUE", value: `₹${totalRevenue.toLocaleString("en-IN")}`, icon: <TrendingUp size={20} strokeWidth={1.5} />, iconBg: "bg-brand-gold/10", iconColor: "text-brand-gold" },
    { label: "POS REVENUE", value: `₹93,60,746`, icon: <BarChart3 size={20} strokeWidth={1.5} />, iconBg: "bg-brand-gold/10", iconColor: "text-brand-gold" },
  ];

  const bottomStats = [
    { label: "INVENTORY", value: products.reduce((a, p) => a + p.stock, 0).toString(), icon: <Package size={20} strokeWidth={1.5} />, iconBg: "bg-[#13102b]", iconColor: "text-brand-gold" },
    { label: "MEMBERS", value: customers.length.toString(), icon: <Users size={20} strokeWidth={1.5} />, iconBg: "bg-[#13102b]", iconColor: "text-brand-gold" },
    { label: "CAMPAIGN BANNERS", value: "1", icon: <Layers size={20} strokeWidth={1.5} />, iconBg: "bg-[#13102b]", iconColor: "text-brand-gold" },
    { label: "LIVE OFFERS", value: initialCoupons.filter(c => c.status === "Active").length.toString(), icon: <Zap size={20} strokeWidth={1.5} />, iconBg: "bg-[#13102b]", iconColor: "text-brand-gold" },
  ];

  return (
    <AdminLayout>
      {/* ── Page Header ── */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-gold">Executive Insight</span>
          </div>
          <h1 className="text-[32px] leading-tight text-[#13102b]">
            <span className="font-black" style={{ fontFamily: "var(--font-heading)" }}>STUDIO </span>
            <span className="font-light italic" style={{ fontFamily: "var(--font-serif)" }}>DASHBOARD</span>
          </h1>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 px-5 py-3 bg-[#13102b] text-white text-[10px] font-bold tracking-[0.12em] uppercase rounded-lg hover:bg-[#1e1a3a] transition-colors"
        >
          <RefreshCw size={14} strokeWidth={1.5} />
          Refresh Intel
        </button>
      </div>

      {/* ── TOP KPI ROW ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {topStats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200/80 p-5 hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-lg ${s.iconBg} ${s.iconColor} flex items-center justify-center mb-5`}>
              {s.icon}
            </div>
            <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-400 mb-1.5">{s.label}</p>
            <p className="text-[26px] font-bold text-[#13102b] leading-none" style={{ fontFamily: "var(--font-heading)" }}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* ── BOTTOM KPI ROW ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {bottomStats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200/80 p-5 hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-lg ${s.iconBg} ${s.iconColor} flex items-center justify-center mb-5`}>
              {s.icon}
            </div>
            <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-400 mb-1.5">{s.label}</p>
            <p className="text-[26px] font-bold text-[#13102b] leading-none" style={{ fontFamily: "var(--font-heading)" }}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* ── ORDERS TABLE + TOP PRODUCTS ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Recent Orders */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200/80 p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-[14px] font-bold text-[#13102b] uppercase tracking-[0.05em]" style={{ fontFamily: "var(--font-heading)" }}>
                Recent Orders
              </h3>
              <p className="text-[10px] text-gray-400 tracking-wider uppercase mt-0.5">Live Order Stream</p>
            </div>
            <Link href="/orderupdate" className="text-[10px] text-brand-gold hover:underline font-bold tracking-wider uppercase flex items-center gap-1">
              View All <ChevronRight size={12} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[500px]">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Order", "Customer", "Amount", "Payment", "Status"].map((h) => (
                    <th key={h} className="pb-3 text-[9px] font-bold uppercase tracking-[0.15em] text-gray-400 pr-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((o) => (
                  <tr key={o.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 pr-4">
                      <span className="text-[12px] font-bold text-[#13102b] font-mono">{o.orderNumber}</span>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className="text-[12px] font-medium text-gray-700">{o.customerName}</span>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className="text-[12px] font-bold text-[#13102b]">₹{o.totalAmount.toLocaleString("en-IN")}</span>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold ${
                        o.paymentStatus === "Verified" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                      }`}>{o.paymentStatus}</span>
                    </td>
                    <td className="py-3.5">
                      <span className="inline-block px-2 py-0.5 rounded text-[9px] font-bold bg-gray-100 text-gray-500">
                        {o.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl border border-gray-200/80 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-bold text-[#13102b] uppercase tracking-[0.05em]" style={{ fontFamily: "var(--font-heading)" }}>
              Top Creations
            </h3>
            <Link href="/products/listproducts" className="text-[10px] text-brand-gold hover:underline font-bold tracking-wider uppercase">
              Catalog
            </Link>
          </div>

          <div className="flex-1 space-y-2">
            {products.slice(0, 4).map((p) => (
              <div key={p.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-11 h-11 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden shrink-0">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "/handbag.webp"; }} />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-[11px] font-semibold text-[#13102b] truncate">{p.name}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] font-bold text-brand-gold">₹{p.price.toLocaleString("en-IN")}</span>
                    <span className="text-[10px] text-gray-400">Stock: {p.stock}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100">
            <Link
              href="/products/addproducts"
              className="w-full py-2.5 bg-[#13102b] hover:bg-[#1e1a3a] text-white font-bold text-[10px] uppercase tracking-[0.12em] rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <PlusCircle size={14} strokeWidth={1.5} /> Add Product
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
