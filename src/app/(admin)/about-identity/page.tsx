"use client";

import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Sparkles, CheckCircle2, Shield, Gem, Award, Layers } from "lucide-react";

export default function AboutIdentityCmsPage() {
  const [missionTitle, setMissionTitle] = useState("THE PILLARS OF PERMANENT LUXURY");
  const [pillar1, setPillar1] = useState("Architectural Symmetry & Structural Elegance");
  const [pillar2, setPillar2] = useState("24K Gold & Palladium Hardware Alchemy");
  const [pillar3, setPillar3] = useState("Forty-Year Generational Master Craftsmen");
  const [artisanHeadline, setArtisanHeadline] = useState("MASTER ATELIER OF FLORENCE");
  const [artisanBio, setArtisanBio] = useState(
    "Led by Maestro Giancarlo Bellini, third-generation leather guild master. Every stitch is placed using traditional French saddle-stitching techniques."
  );
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
            <Sparkles size={14} />
            <span>Maison Philosophy</span>
          </div>
          <h2 className="text-lg font-bold text-[#13102b]">About Us: Identity, Pillars & Artisans</h2>
          <p className="text-xs text-gray-400 mt-1">
            Configure the core brand pillars, craftsmanship standards, and master guild artisan profiles.
          </p>
        </div>

        {saved && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-600 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 size={16} />
            <span>Brand identity and artisan details updated!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="bg-white border border-gray-200/80 rounded-xl p-5 space-y-6">
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-gold flex items-center gap-2 border-b border-gray-200/80 pb-2">
              <Shield size={14} />
              <span>1. Three Guiding Brand Pillars</span>
            </h3>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                Pillars Section Title
              </label>
              <input
                type="text"
                required
                value={missionTitle}
                onChange={(e) => setMissionTitle(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200/80 rounded-lg py-3 px-4 text-sm text-[#13102b] font-serif focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
              />
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1">
                  Pillar 01 — Structural Form
                </label>
                <input
                  type="text"
                  value={pillar1}
                  onChange={(e) => setPillar1(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2.5 px-3 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1">
                  Pillar 02 — Metal Alchemy
                </label>
                <input
                  type="text"
                  value={pillar2}
                  onChange={(e) => setPillar2(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2.5 px-3 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1">
                  Pillar 03 — Artisanal Heritage
                </label>
                <input
                  type="text"
                  value={pillar3}
                  onChange={(e) => setPillar3(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2.5 px-3 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-200/80">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-gold flex items-center gap-2 border-b border-gray-200/80 pb-2">
              <Award size={14} />
              <span>2. Master Artisan Spotlight</span>
            </h3>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                Artisan / Atelier Lead Title
              </label>
              <input
                type="text"
                value={artisanHeadline}
                onChange={(e) => setArtisanHeadline(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200/80 rounded-lg py-3 px-4 text-sm text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                Artisan Biography & Saddle Stitching Craft
              </label>
              <textarea
                rows={4}
                value={artisanBio}
                onChange={(e) => setArtisanBio(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200/80 rounded-lg py-3 px-4 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10 leading-relaxed"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200/80 flex justify-end">
            <button
              type="submit"
              className="px-8 py-3.5 bg-brand-gold hover:bg-brand-gold-light text-brand-blue font-black text-xs uppercase tracking-widest rounded-lg shadow-brand-gold/20 transition-all"
            >
              Update Brand Identity
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
