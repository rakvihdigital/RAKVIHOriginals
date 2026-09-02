"use client";

import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Megaphone, Sparkles, CheckCircle2, Image, Layers } from "lucide-react";

export default function MiddleCmsPage() {
  const [headline, setHeadline] = useState("PERMANENCE IN ARTISTRY");
  const [quoteText, setQuoteText] = useState(
    "Where French Haute Couture converges with Italian artisanal mastery. Every RAKVIH piece is handcrafted by master artisans with over forty years of heritage pedigree."
  );
  const [spotlight1, setSpotlight1] = useState("The Imperial Handbag Vault");
  const [spotlight2, setSpotlight2] = useState("Artisanal Sculptural Footwear");
  const [spotlight3, setSpotlight3] = useState("Mulberry Silk & Pashmina Wraps");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <div className="flex items-center gap-2 text-brand-gold text-[10px] font-bold uppercase tracking-wider mb-1">
            <Megaphone size={14} />
            <span>Storefront Narrative</span>
          </div>
          <h2 className="text-lg font-bold text-[#13102b]">Homepage Middle Sections & Spotlights</h2>
          <p className="text-xs text-gray-400 mt-1">
            Configure featured collection spotlights, brand manifesto quotes, and craftsmanship story blocks.
          </p>
        </div>

        {saved && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-600 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 size={16} />
            <span>Middle editorial sections updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="bg-white border border-gray-200/80 rounded-xl p-5 space-y-6">
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-gold flex items-center gap-2 border-b border-gray-200/80 pb-2">
              <Sparkles size={14} />
              <span>1. Brand Manifesto Block</span>
            </h3>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                Editorial Section Title
              </label>
              <input
                type="text"
                required
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200/80 rounded-lg py-3 px-4 text-sm text-[#13102b] font-serif focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                Manifesto Quote / Narrative Body
              </label>
              <textarea
                rows={4}
                required
                value={quoteText}
                onChange={(e) => setQuoteText(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200/80 rounded-lg py-3 px-4 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10 leading-relaxed"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-200/80">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-gold flex items-center gap-2 border-b border-gray-200/80 pb-2">
              <Layers size={14} />
              <span>2. Curated Collection Spotlights (Trio Grid)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                  Spotlight Card 1
                </label>
                <input
                  type="text"
                  value={spotlight1}
                  onChange={(e) => setSpotlight1(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2.5 px-3 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                  Spotlight Card 2
                </label>
                <input
                  type="text"
                  value={spotlight2}
                  onChange={(e) => setSpotlight2(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2.5 px-3 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                  Spotlight Card 3
                </label>
                <input
                  type="text"
                  value={spotlight3}
                  onChange={(e) => setSpotlight3(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2.5 px-3 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200/80 flex justify-end">
            <button
              type="submit"
              className="px-8 py-3.5 bg-brand-gold hover:bg-brand-gold-light text-brand-blue font-black text-xs uppercase tracking-widest rounded-lg shadow-brand-gold/20 transition-all"
            >
              Update Middle Editorial
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
