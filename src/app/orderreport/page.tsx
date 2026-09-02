"use client";

import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { FileText, TrendingUp, DollarSign, ShoppingBag, Download, Globe, CreditCard } from "lucide-react";

export default function OrderReportPage() {
  const monthlyData = [
    { month: "Jan", revenue: 420000, orders: 12 },
    { month: "Feb", revenue: 580000, orders: 18 },
    { month: "Mar", revenue: 710000, orders: 22 },
    { month: "Apr", revenue: 640000, orders: 19 },
    { month: "May", revenue: 890000, orders: 28 },
    { month: "Jun", revenue: 950000, orders: 31 },
    { month: "Jul", revenue: 1120000, orders: 36 },
    { month: "Aug", revenue: 1340000, orders: 44 },
  ];

  const maxRev = Math.max(...monthlyData.map((d) => d.revenue));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-gold text-[10px] font-bold uppercase tracking-wider mb-1">
              <FileText size={14} />
              <span>Revenue Intelligence</span>
            </div>
            <h2 className="text-lg font-bold text-[#13102b]">Orders & Fiscal Revenue Reports</h2>
          </div>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-brand-gold hover:bg-brand-gold-light text-brand-blue font-black text-xs uppercase tracking-widest transition-all shadow-brand-gold/20"
          >
            <Download size={14} />
            <span>Export Fiscal Audit (PDF)</span>
          </button>
        </div>

        {/* Top KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white border border-gray-200/80 rounded-xl p-5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold block mb-2">
              Fiscal YTD Revenue
            </span>
            <div className="text-3xl font-serif font-bold text-[#13102b]">₹6,650,000</div>
            <p className="text-xs text-emerald-600 font-bold mt-2">+24.6% YoY growth</p>
          </div>

          <div className="bg-white border border-gray-200/80 rounded-xl p-5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold block mb-2">
              Average Order Value (AOV)
            </span>
            <div className="text-3xl font-serif font-bold text-[#13102b]">₹31,660</div>
            <p className="text-xs text-brand-gold font-bold mt-2">Ultra-luxury basket size</p>
          </div>

          <div className="bg-white border border-gray-200/80 rounded-xl p-5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold block mb-2">
              Repeat Client Rate
            </span>
            <div className="text-3xl font-serif font-bold text-[#13102b]">41.8%</div>
            <p className="text-xs text-emerald-600 font-bold mt-2">VIP Noir club retention</p>
          </div>

          <div className="bg-white border border-gray-200/80 rounded-xl p-5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold block mb-2">
              International Delivery Share
            </span>
            <div className="text-3xl font-serif font-bold text-[#13102b]">38.5%</div>
            <p className="text-xs text-gray-400 mt-2">London, Paris, Dubai, NY</p>
          </div>
        </div>

        {/* Revenue Growth Chart Visualizer */}
        <div className="bg-white border border-gray-200/80 rounded-xl p-5 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200/80">
            <div>
              <h3 className="text-base font-serif font-bold text-[#13102b]">Monthly Revenue Progression</h3>
              <p className="text-xs text-gray-400">2026 Fiscal Year Performance</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-brand-gold font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-gold" /> Gross Inflow
              </span>
            </div>
          </div>

          {/* Bar Chart Visual */}
          <div className="h-64 flex items-end justify-between gap-3 pt-8 px-2">
            {monthlyData.map((item) => {
              const heightPercent = (item.revenue / maxRev) * 100;
              return (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] text-brand-gold font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                    ₹{(item.revenue / 100000).toFixed(1)}L
                  </span>
                  <div className="w-full bg-gray-50 rounded-lg h-48 flex items-end p-1.5 overflow-hidden">
                    <div
                      className="w-full bg-gradient-to-t from-brand-gold-dark via-brand-gold to-amber-200 rounded-xl group-hover:brightness-125 transition-all"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-gray-600 group-hover:text-[#13102b]">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Channels Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white border border-gray-200/80 rounded-xl p-5 space-y-4">
            <h4 className="text-sm font-serif font-bold text-[#13102b] pb-3 border-b border-gray-200/80 flex items-center gap-2">
              <CreditCard size={16} className="text-brand-gold" />
              <span>Settlement Channel Breakdown</span>
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50">
                <span className="text-[#13102b] font-semibold">UPI Direct & QR Scanner</span>
                <span className="font-bold text-brand-gold">52.4% (₹3.48M)</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50">
                <span className="text-[#13102b] font-semibold">Luxury Concierge Credit Card</span>
                <span className="font-bold text-brand-gold">31.2% (₹2.07M)</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50">
                <span className="text-[#13102b] font-semibold">International Wire Transfer (SWIFT)</span>
                <span className="font-bold text-brand-gold">16.4% (₹1.09M)</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200/80 rounded-xl p-5 space-y-4">
            <h4 className="text-sm font-serif font-bold text-[#13102b] pb-3 border-b border-gray-200/80 flex items-center gap-2">
              <Globe size={16} className="text-brand-gold" />
              <span>Top Purchasing Territories</span>
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50">
                <span className="text-[#13102b] font-semibold">Mumbai & New Delhi (India)</span>
                <span className="font-bold text-brand-gold">46.8% Volume</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50">
                <span className="text-[#13102b] font-semibold">London & Mayfair (UK)</span>
                <span className="font-bold text-brand-gold">22.4% Volume</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50">
                <span className="text-[#13102b] font-semibold">Dubai & Abu Dhabi (UAE)</span>
                <span className="font-bold text-brand-gold">18.5% Volume</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50">
                <span className="text-[#13102b] font-semibold">Paris, Milan & Geneva (EU)</span>
                <span className="font-bold text-brand-gold">12.3% Volume</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
