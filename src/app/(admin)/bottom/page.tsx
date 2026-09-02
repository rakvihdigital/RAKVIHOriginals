"use client";

import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Megaphone, Sparkles, CheckCircle2, Shield, Gem, Award, Truck } from "lucide-react";

export default function BottomCmsPage() {
  const [vipTitle, setVipTitle] = useState("JOIN THE RAKVIH NOIR SOCIETY");
  const [vipSubtitle, setVipSubtitle] = useState(
    "Private showroom previews, bespoke monogramming consultations, and direct atelier access."
  );
  const [badge1, setBadge1] = useState("Italian Artisanal Heritage");
  const [badge2, setBadge2] = useState("24K Gold Plated Hardware");
  const [badge3, setBadge3] = useState("Insured Global Courier");
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
            <span>Storefront Foundation</span>
          </div>
          <h2 className="text-lg font-bold text-[#13102b]">Bottom Sections & VIP Teasers</h2>
          <p className="text-xs text-gray-400 mt-1">
            Configure the pre-footer VIP Noir club invitation and prestige trust badges.
          </p>
        </div>

        {saved && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-600 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 size={16} />
            <span>Bottom teaser sections saved and published!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="bg-white border border-gray-200/80 rounded-xl p-5 space-y-6">
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-gold flex items-center gap-2 border-b border-gray-200/80 pb-2">
              <Gem size={14} />
              <span>1. VIP Society Invitation Banner</span>
            </h3>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                VIP Invitation Header
              </label>
              <input
                type="text"
                required
                value={vipTitle}
                onChange={(e) => setVipTitle(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200/80 rounded-lg py-3 px-4 text-sm text-[#13102b] font-serif focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                VIP Society Privilege Perks
              </label>
              <textarea
                rows={3}
                required
                value={vipSubtitle}
                onChange={(e) => setVipSubtitle(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200/80 rounded-lg py-3 px-4 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10 leading-relaxed"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-200/80">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-gold flex items-center gap-2 border-b border-gray-200/80 pb-2">
              <Shield size={14} />
              <span>2. Prestige Trust Guarantees</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                  Guarantee 1
                </label>
                <input
                  type="text"
                  value={badge1}
                  onChange={(e) => setBadge1(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2.5 px-3 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                  Guarantee 2
                </label>
                <input
                  type="text"
                  value={badge2}
                  onChange={(e) => setBadge2(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2.5 px-3 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                  Guarantee 3
                </label>
                <input
                  type="text"
                  value={badge3}
                  onChange={(e) => setBadge3(e.target.value)}
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
              Update Bottom Sections
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
