"use client";

import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { FileText, TrendingUp, DollarSign, Package, ArrowUpRight, Award, BarChart2 } from "lucide-react";
import { initialProducts } from "@/lib/adminData";

export default function ProductReportPage() {
  const [products] = useState(initialProducts);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 text-brand-gold text-[10px] font-bold uppercase tracking-wider mb-1">
            <FileText size={14} />
            <span>Merchandise Intelligence</span>
          </div>
          <h2 className="text-lg font-bold text-[#13102b]">Product Performance & Analytics</h2>
          <p className="text-xs text-gray-400 mt-1">
            Analyze sales velocity, profit margins, inventory turnover, and luxury collection revenue.
          </p>
        </div>

        {/* Top KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white border border-gray-200/80 rounded-xl p-5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold block mb-2">
              Top Performing Category
            </span>
            <div className="text-xl font-serif font-bold text-[#13102b]">Handbags & Clutches</div>
            <p className="text-xs text-emerald-600 font-bold mt-2 flex items-center gap-1">
              <ArrowUpRight size={14} /> 48.2% of total sales
            </p>
          </div>

          <div className="bg-white border border-gray-200/80 rounded-xl p-5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold block mb-2">
              Avg Gross Margin
            </span>
            <div className="text-lg font-bold text-[#13102b]">68.4%</div>
            <p className="text-xs text-gray-400 mt-2">Italian artisanal leathercraft</p>
          </div>

          <div className="bg-white border border-gray-200/80 rounded-xl p-5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold block mb-2">
              Stock Turnover Velocity
            </span>
            <div className="text-lg font-bold text-[#13102b]">18.2 Days</div>
            <p className="text-xs text-emerald-600 font-bold mt-2 flex items-center gap-1">
              <ArrowUpRight size={14} /> +3.4 days faster
            </p>
          </div>

          <div className="bg-white border border-gray-200/80 rounded-xl p-5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold block mb-2">
              Return & Exchange Rate
            </span>
            <div className="text-lg font-bold text-[#13102b]">0.8%</div>
            <p className="text-xs text-gray-400 mt-2">Ultra-low return rate</p>
          </div>
        </div>

        {/* Product Stats Table */}
        <div className="bg-white border border-gray-200/80 rounded-xl p-5">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200/80 mb-4">
            <h3 className="text-base font-serif font-bold text-[#13102b] flex items-center gap-2">
              <Award size={16} className="text-brand-gold" />
              <span>Creations Velocity & Revenue Matrix</span>
            </h3>
            <span className="text-xs text-brand-gold font-bold">Q3 2026 Fiscal Year</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[600px]">
              <thead>
                <tr className="text-[10px] font-bold uppercase tracking-wider text-brand-gold border-b border-gray-100 pb-3">
                  <th className="pb-3">Masterpiece</th>
                  <th className="pb-3">Collection</th>
                  <th className="pb-3">Unit Valuation</th>
                  <th className="pb-3">Units Sold</th>
                  <th className="pb-3">Gross Revenue</th>
                  <th className="pb-3">Atelier Margin</th>
                  <th className="pb-3">Stock Buffer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((p, idx) => {
                  const unitsSold = 18 - idx * 2;
                  const grossRev = unitsSold * p.price;
                  return (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 font-bold text-[#13102b]">
                        {p.name}
                        <span className="block text-[10px] text-gray-400 font-mono">{p.sku}</span>
                      </td>
                      <td className="py-4 text-gray-600">
                        {p.category}
                      </td>
                      <td className="py-4 font-bold text-[#13102b]">
                        ₹{p.price.toLocaleString("en-IN")}
                      </td>
                      <td className="py-4 font-bold text-brand-gold">
                        {unitsSold} units
                      </td>
                      <td className="py-4 font-bold text-[#13102b]">
                        ₹{grossRev.toLocaleString("en-IN")}
                      </td>
                      <td className="py-4 text-emerald-600 font-bold">
                        {(72 - idx * 2.5).toFixed(1)}%
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          p.stock > 4
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-rose-50 text-rose-600"
                        }`}>
                          {p.stock} units
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
