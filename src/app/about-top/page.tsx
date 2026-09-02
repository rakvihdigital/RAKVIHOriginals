"use client";

import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Sparkles, CheckCircle2, Upload, History, Globe } from "lucide-react";

export default function AboutTopCmsPage() {
  const [headline, setHeadline] = useState("A LEGACY SCULPTED IN GOLD & LEATHER");
  const [tagline, setTagline] = useState("Founded in 1988 with an unyielding devotion to Italian craftsmanship.");
  const [foundingYear, setFoundingYear] = useState("1988");
  const [foundingCity, setFoundingCity] = useState("Florence & Paris");
  const [heroNarrative, setHeroNarrative] = useState(
    "RAKVIH Originals began as a private bespoke atelier in Florence, creating single-piece commissions for European nobility and connoisseurs of timeless luxury."
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
            <span>Heritage CMS</span>
          </div>
          <h2 className="text-lg font-bold text-[#13102b]">About Us: Top Hero Narrative</h2>
          <p className="text-xs text-gray-400 mt-1">
            Configure the opening heritage prologue, founding year milestones, and hero visual narrative.
          </p>
        </div>

        {saved && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-600 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 size={16} />
            <span>About Us hero narrative updated and published live!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="bg-white border border-gray-200/80 rounded-xl p-5 space-y-6">
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-gold flex items-center gap-2 border-b border-gray-200/80 pb-2">
              <History size={14} />
              <span>1. Historical Prologue</span>
            </h3>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                Main Hero Headline Title *
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
                Heritage Subtitle / Founding Statement
              </label>
              <input
                type="text"
                required
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200/80 rounded-lg py-3 px-4 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                  Founding Year Milestone
                </label>
                <input
                  type="text"
                  value={foundingYear}
                  onChange={(e) => setFoundingYear(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2.5 px-3 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10 font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                  Origins (Cities)
                </label>
                <input
                  type="text"
                  value={foundingCity}
                  onChange={(e) => setFoundingCity(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2.5 px-3 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                Inaugural Story / Archive Narrative
              </label>
              <textarea
                rows={4}
                required
                value={heroNarrative}
                onChange={(e) => setHeroNarrative(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200/80 rounded-lg py-3 px-4 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10 leading-relaxed"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200/80 flex justify-end">
            <button
              type="submit"
              className="px-8 py-3.5 bg-brand-gold hover:bg-brand-gold-light text-brand-blue font-black text-xs uppercase tracking-widest rounded-lg shadow-brand-gold/20 transition-all"
            >
              Update Hero Prologue
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
