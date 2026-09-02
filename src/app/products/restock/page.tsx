"use client";

import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Package, RefreshCw, AlertTriangle, CheckCircle2, ArrowUp, Plus, Minus } from "lucide-react";
import { initialProducts, Product } from "@/lib/adminData";

export default function RestockPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [saveMessage, setSaveMessage] = useState(false);

  const handleStockChange = (id: string, delta: number) => {
    setProducts(
      products.map((p) => {
        if (p.id === id) {
          const newStock = Math.max(0, p.stock + delta);
          return {
            ...p,
            stock: newStock,
            status: newStock === 0 ? "Sold Out" : newStock < 5 ? "Low Stock" : "In Stock",
          };
        }
        return p;
      })
    );
  };

  const handleBatchReplenish = () => {
    setProducts(
      products.map((p) => ({
        ...p,
        stock: p.stock < 5 ? p.stock + 15 : p.stock,
        status: "In Stock",
      }))
    );
    setSaveMessage(true);
    setTimeout(() => setSaveMessage(false), 3000);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-gold text-[10px] font-bold uppercase tracking-wider mb-1">
              <Package size={14} />
              <span>Inventory Replenishment</span>
            </div>
            <h2 className="text-lg font-bold text-[#13102b]">Stock Restock Console</h2>
          </div>
          <button
            onClick={handleBatchReplenish}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-gold hover:bg-brand-gold-light text-brand-blue font-black text-xs uppercase tracking-widest rounded-lg shadow-brand-gold/20 transition-all"
          >
            <RefreshCw size={14} />
            <span>Auto-Replenish Low Stock (+15 Units)</span>
          </button>
        </div>

        {saveMessage && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-600 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 size={16} />
            <span>Low-stock masterpieces replenished successfully and inventory ledger updated!</span>
          </div>
        )}

        {/* Restock Table */}
        <div className="bg-white border border-gray-200/80 rounded-xl p-5">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[600px]">
              <thead>
                <tr className="text-[10px] font-bold uppercase tracking-wider text-brand-gold border-b border-gray-100 pb-3">
                  <th className="pb-3">Masterpiece</th>
                  <th className="pb-3">SKU</th>
                  <th className="pb-3">Current Stock</th>
                  <th className="pb-3">Health Status</th>
                  <th className="pb-3 text-right">Instant Restock Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 font-bold text-[#13102b]">
                      {p.name}
                      <span className="block text-[10px] text-gray-400">{p.brand}</span>
                    </td>
                    <td className="py-4 font-mono text-brand-gold">
                      {p.sku}
                    </td>
                    <td className="py-4">
                      <span className="text-base font-bold text-[#13102b]">{p.stock}</span>
                      <span className="text-gray-400 text-[10px] ml-1">units in atelier</span>
                    </td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold ${
                        p.stock >= 5
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                          : p.stock > 0
                          ? "bg-amber-50 text-amber-600 border border-amber-200"
                          : "bg-rose-50 text-rose-600 border border-rose-200"
                      }`}>
                        {p.stock >= 5 ? "Normal Stock" : p.stock > 0 ? "⚠️ Critical Low" : "🚫 Stock Depleted"}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleStockChange(p.id, -1)}
                          className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-[#13102b]"
                          title="Decrease 1"
                        >
                          <Minus size={12} />
                        </button>
                        <button
                          onClick={() => handleStockChange(p.id, 1)}
                          className="px-3 py-1.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-[#13102b] text-xs font-bold"
                        >
                          +1
                        </button>
                        <button
                          onClick={() => handleStockChange(p.id, 5)}
                          className="px-3 py-1.5 rounded-xl bg-gray-50 hover:bg-brand-gold/20 hover:text-brand-gold text-gray-700 text-xs font-bold"
                        >
                          +5
                        </button>
                        <button
                          onClick={() => handleStockChange(p.id, 20)}
                          className="px-3 py-1.5 rounded-xl bg-brand-gold/15 border border-brand-gold/40 hover:bg-brand-gold hover:text-white text-brand-gold text-xs font-bold"
                        >
                          +20
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
