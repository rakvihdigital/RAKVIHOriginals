"use client";

import React, { useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import { Package, Plus, Search, Filter, Trash2, Edit3, Sparkles, ExternalLink, RefreshCw } from "lucide-react";
import { initialProducts, Product } from "@/lib/adminData";

export default function ListProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === "All" || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this masterpiece?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-gold text-[10px] font-bold uppercase tracking-wider mb-1">
              <Package size={14} />
              <span>Boutique Inventory</span>
            </div>
            <h2 className="text-lg font-bold text-[#13102b]">All Luxury Creations</h2>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/products/restock"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-gray-50 border border-gray-200/80 hover:border-brand-gold/40 text-xs font-bold uppercase tracking-wider text-[#13102b] transition-all"
            >
              <RefreshCw size={14} className="text-brand-gold" />
              <span>Restock Console</span>
            </Link>
            <Link
              href="/products/addproducts"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-gold hover:bg-brand-gold-light text-brand-blue font-black text-xs uppercase tracking-widest rounded-lg shadow-brand-gold/20 transition-all"
            >
              <Plus size={16} />
              <span>Add New Edition</span>
            </Link>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="admin-filter-row bg-white border border-gray-200/80 rounded-lg p-4 flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, SKU, or Maison..."
              className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2.5 pl-11 pr-4 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter size={14} className="text-brand-gold" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-gray-50 border border-gray-200/80 rounded-xl py-2.5 px-4 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
            >
              <option value="All">All Categories</option>
              <option value="Handbags & Clutches">Handbags & Clutches</option>
              <option value="Artisanal Footwear">Artisanal Footwear</option>
              <option value="Bespoke Belts">Bespoke Belts</option>
              <option value="Silk & Cashmere Stoles">Silk & Cashmere Stoles</option>
              <option value="Eyewear & Optical">Eyewear & Optical</option>
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white border border-gray-200/80 rounded-xl p-5">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[600px]">
              <thead>
                <tr className="text-[10px] font-bold uppercase tracking-wider text-brand-gold border-b border-gray-100 pb-3">
                  <th className="pb-3">Piece Details</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Valuation</th>
                  <th className="pb-3">Stock Level</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200/80 overflow-hidden flex-shrink-0 flex items-center justify-center">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/handbag.webp";
                            }}
                          />
                        </div>
                        <div>
                          <div className="font-bold text-[#13102b] hover:text-brand-gold cursor-pointer transition-colors">
                            {p.name}
                          </div>
                          <div className="text-[10px] text-gray-400 flex items-center gap-2 mt-0.5">
                            <span className="font-mono text-brand-gold">{p.sku}</span>
                            <span>•</span>
                            <span>{p.brand}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-gray-600">
                      <div>{p.category}</div>
                      <div className="text-[10px] text-brand-gold/80">{p.subcategory}</div>
                    </td>
                    <td className="py-4 font-bold text-brand-gold">
                      ₹{p.price.toLocaleString("en-IN")}
                      {p.originalPrice && (
                        <span className="block text-[10px] text-gray-300 line-through">
                          ₹{p.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </td>
                    <td className="py-4">
                      <div className="font-bold text-[#13102b]">{p.stock} units</div>
                      <div className="text-[10px] text-gray-400">{p.attributes.material}</div>
                    </td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold ${
                        p.stock > 5
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                          : p.stock > 0
                          ? "bg-amber-50 text-amber-600 border border-amber-200"
                          : "bg-rose-50 text-rose-600 border border-rose-200"
                      }`}>
                        {p.stock > 5 ? "In Stock" : p.stock > 0 ? "Low Stock" : "Sold Out"}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href="/products/restock"
                          className="p-2 rounded-xl bg-gray-50 hover:bg-brand-gold hover:text-white text-gray-600 transition-all text-[10px] font-bold"
                          title="Restock"
                        >
                          <RefreshCw size={13} />
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-2 rounded-xl bg-gray-50 hover:bg-rose-50 text-gray-400 hover:text-rose-600 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 size={13} />
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
