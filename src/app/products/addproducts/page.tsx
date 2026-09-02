"use client";

import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Package, Sparkles, Upload, ArrowRight, CheckCircle2, DollarSign, Layers } from "lucide-react";
import { useRouter } from "next/navigation";
import { initialBrands, initialCategories } from "@/lib/adminData";

export default function AddProductsPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [sku, setSku] = useState(`RAK-${Math.floor(100 + Math.random() * 900)}`);
  const [brand, setBrand] = useState(initialBrands[0].name);
  const [category, setCategory] = useState(initialCategories[0].name);
  const [price, setPrice] = useState("34500");
  const [originalPrice, setOriginalPrice] = useState("39000");
  const [stock, setStock] = useState("10");
  const [material, setMaterial] = useState("Exotic Niloticus Leather");
  const [color, setColor] = useState("Emerald Obsidian");
  const [hardware, setHardware] = useState("24K Champagne Gold Plated");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      router.push("/products/listproducts");
    }, 1200);
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <div className="flex items-center gap-2 text-brand-gold text-[10px] font-bold uppercase tracking-wider mb-1">
            <Package size={14} />
            <span>Masterpiece Creation</span>
          </div>
          <h2 className="text-lg font-bold text-[#13102b]">Publish New Luxury Edition</h2>
          <p className="text-xs text-gray-400 mt-1">
            List a handcrafted creation in the RAKVIH Originals global boutique.
          </p>
        </div>

        <div className="bg-white border border-gray-200/80 rounded-xl p-5 relative">
          {submitted ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#13102b]">Masterpiece Published Successfully</h3>
              <p className="text-xs text-gray-400">Directing to central luxury inventory...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Section 1: General Info */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-gold flex items-center gap-2 border-b border-gray-200/80 pb-2">
                  <Sparkles size={14} />
                  <span>1. General Details</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aura Royale Crocodile Handbag"
                      className="w-full bg-gray-50 border border-gray-200/80 rounded-lg py-3 px-4 text-sm text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                      SKU Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200/80 rounded-lg py-3 px-4 text-sm text-[#13102b] font-mono focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                      Brand / Maison *
                    </label>
                    <select
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200/80 rounded-lg py-3 px-4 text-sm text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                    >
                      {initialBrands.map((b) => (
                        <option key={b.id} value={b.name}>
                          {b.name} ({b.country})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                      Collection Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200/80 rounded-lg py-3 px-4 text-sm text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                    >
                      {initialCategories.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                      Initial Stock Quantity *
                    </label>
                    <input
                      type="number"
                      required
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200/80 rounded-lg py-3 px-4 text-sm text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Pricing & Luxury Attributes */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-gold flex items-center gap-2 border-b border-gray-200/80 pb-2">
                  <DollarSign size={14} />
                  <span>2. Valuation & Artisanal Specifications</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                      Price (INR ₹) *
                    </label>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200/80 rounded-lg py-3 px-4 text-sm text-[#13102b] font-bold focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                      Original / Comparison Price (INR ₹)
                    </label>
                    <input
                      type="number"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200/80 rounded-lg py-3 px-4 text-sm text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                      Material Finish
                    </label>
                    <input
                      type="text"
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200/80 rounded-lg py-3 px-4 text-sm text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                      Colorway / Tone
                    </label>
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200/80 rounded-lg py-3 px-4 text-sm text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                      Hardware Plating
                    </label>
                    <input
                      type="text"
                      value={hardware}
                      onChange={(e) => setHardware(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200/80 rounded-lg py-3 px-4 text-sm text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                      Edition Monogram
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Limited Edition No. 01/20"
                      className="w-full bg-gray-50 border border-gray-200/80 rounded-lg py-3 px-4 text-sm text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Media Gallery */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-gold flex items-center gap-2 border-b border-gray-200/80 pb-2">
                  <Upload size={14} />
                  <span>3. High-Definition Atelier Imagery</span>
                </h3>

                <div className="border-2 border-dashed border-gray-200/80 rounded-lg p-5 text-center hover:border-brand-gold/50 transition-colors cursor-pointer bg-gray-50">
                  <Upload size={32} className="mx-auto text-brand-gold mb-3" />
                  <p className="text-sm font-semibold text-[#13102b]">Upload 360° product angles and studio lifestyle captures</p>
                  <p className="text-xs text-gray-400 mt-1">Accepts PNG, WEBP, high-resolution JPEG up to 25MB each</p>
                </div>
              </div>

              {/* Section 4: Narrative Description */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-gold flex items-center gap-2 border-b border-gray-200/80 pb-2">
                  <Layers size={14} />
                  <span>4. Editorial Narrative</span>
                </h3>

                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detail the hand-stitching technique, hours of craftsmanship, architectural lock design, and collector notes..."
                  className="w-full bg-gray-50 border border-gray-200/80 rounded-lg py-3 px-4 text-sm text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10 resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-end gap-4 border-t border-gray-200/80">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-3.5 rounded-lg bg-gray-50 text-gray-500 hover:text-[#13102b] text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Discard Draft
                </button>
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-lg bg-brand-gold hover:bg-brand-gold-light text-brand-blue font-black text-xs uppercase tracking-widest transition-all shadow-brand-gold/20 flex items-center gap-2"
                >
                  <span>Publish Masterpiece</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
