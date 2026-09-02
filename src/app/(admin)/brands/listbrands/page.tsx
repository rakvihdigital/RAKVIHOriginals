"use client";

import React, { useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import { Shield, Plus, Search, Filter, Globe, Sparkles, Edit3, Trash2 } from "lucide-react";
import { initialBrands, Brand } from "@/lib/adminData";

export default function ListBrandsPage() {
  const [brands, setBrands] = useState<Brand[]>(initialBrands);
  const [searchTerm, setSearchTerm] = useState("");
  const [tierFilter, setTierFilter] = useState("All");

  const filteredBrands = brands.filter((b) => {
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = tierFilter === "All" || b.tier === tierFilter;
    return matchesSearch && matchesTier;
  });

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to archive this brand?")) {
      setBrands(brands.filter((b) => b.id !== id));
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-gold text-[10px] font-bold uppercase tracking-wider mb-1">
              <Shield size={14} />
              <span>Partner Directory</span>
            </div>
            <h2 className="text-lg font-bold text-[#13102b]">Registered Maisons & Ateliers</h2>
          </div>
          <Link
            href="/brands/newbrands"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-gold hover:bg-brand-gold-light text-brand-blue font-black text-xs uppercase tracking-widest rounded-lg shadow-brand-gold/20 transition-all"
          >
            <Plus size={16} />
            <span>Register New Brand</span>
          </Link>
        </div>

        {/* Filter Controls */}
        <div className="bg-white border border-gray-200/80 rounded-lg p-4 flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by brand name or country..."
              className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2.5 pl-11 pr-4 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter size={14} className="text-brand-gold" />
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="bg-gray-50 border border-gray-200/80 rounded-xl py-2.5 px-4 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
            >
              <option value="All">All Prestige Tiers</option>
              <option value="Haute Couture">Haute Couture</option>
              <option value="Heritage Maison">Heritage Maison</option>
              <option value="Contemporary Atelier">Contemporary Atelier</option>
            </select>
          </div>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBrands.map((brand) => (
            <div
              key={brand.id}
              className="bg-white border border-gray-200/80 rounded-xl p-5 relative group hover:border-brand-gold/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-brand-gold/10 to-amber-300/10 border border-brand-gold/40 flex items-center justify-center text-brand-gold font-serif font-bold text-lg">
                    {brand.name.charAt(0)}
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                    {brand.status}
                  </span>
                </div>

                <h3 className="text-lg font-serif font-bold text-[#13102b] group-hover:text-brand-gold transition-colors">
                  {brand.name}
                </h3>
                <p className="text-[10px] font-black uppercase tracking-wider text-brand-gold mt-0.5">
                  {brand.tier}
                </p>

                <p className="text-xs text-gray-500 mt-3 line-clamp-2 leading-relaxed">
                  {brand.description}
                </p>

                <div className="grid grid-cols-2 gap-2 mt-6 pt-4 border-t border-gray-100 text-xs">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Origin</span>
                    <span className="font-semibold text-[#13102b] flex items-center gap-1 mt-0.5">
                      <Globe size={12} className="text-brand-gold" />
                      {brand.country} (Est. {brand.founded})
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Curated Pieces</span>
                    <span className="font-bold text-brand-gold mt-0.5 block">
                      {brand.productsCount} Masterpieces
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-6 pt-4 border-t border-gray-200/80">
                <Link
                  href="/products/listproducts"
                  className="flex-1 py-2 text-center rounded-xl bg-gray-50 hover:bg-brand-gold hover:text-white text-[#13102b] text-xs font-bold uppercase tracking-wider transition-all"
                >
                  View Pieces
                </Link>
                <button
                  onClick={() => handleDelete(brand.id)}
                  className="p-2 rounded-xl bg-gray-50 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                  title="Archive Brand"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
