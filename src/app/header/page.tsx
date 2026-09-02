"use client";

import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Megaphone, Sparkles, CheckCircle2, Globe, Link2, Eye } from "lucide-react";

export default function HeaderBannerCmsPage() {
  const [enabled, setEnabled] = useState(true);
  const [tickerText, setTickerText] = useState(
    "COMPLIMENTARY INSURED WORLDWIDE DELIVERY • PRIVATE SHOWROOM APPOINTMENTS NOW OPEN IN PARIS & MILAN"
  );
  const [linkUrl, setLinkUrl] = useState("/contact");
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
            <span>Storefront Top Strip</span>
          </div>
          <h2 className="text-lg font-bold text-[#13102b]">Header Banner & Announcement Bar</h2>
          <p className="text-xs text-gray-400 mt-1">
            Manage the top luxury marquee ticker that appears above the boutique navigation.
          </p>
        </div>

        {/* Live Preview Strip */}
        <div className="bg-white border border-brand-gold/40 rounded-xl p-5 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold flex items-center gap-1.5">
            <Eye size={12} />
            <span>Live Header Announcement Bar Preview</span>
          </span>
          {enabled ? (
            <div className="bg-[#181335] border-y border-brand-gold/20 py-2.5 px-4 text-center rounded-xl overflow-hidden shadow-inner">
              <span className="text-[11px] font-black tracking-[0.25em] text-brand-gold uppercase">
                {tickerText}
              </span>
            </div>
          ) : (
            <div className="p-4 bg-gray-50 rounded-xl text-center text-xs text-gray-400 italic">
              Announcement strip is currently disabled.
            </div>
          )}
        </div>

        {/* Config Form */}
        <div className="bg-white border border-gray-200/80 rounded-xl p-5 space-y-6">
          {saved && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-600 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 size={16} />
              <span>Header announcement banner synchronized across all pages!</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div>
                <h4 className="text-sm font-bold text-[#13102b]">Enable Top Announcement Bar</h4>
                <p className="text-xs text-gray-400">Display global announcement ticker on all boutique pages</p>
              </div>
              <input
                type="checkbox"
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
                className="rounded accent-brand-gold w-5 h-5 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-2">
                Announcement Ticker Text (Uppercase Recommended) *
              </label>
              <textarea
                rows={3}
                required
                value={tickerText}
                onChange={(e) => setTickerText(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200/80 rounded-lg py-3 px-4 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10 uppercase tracking-wider"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-2">
                Destination Link URL (Optional)
              </label>
              <input
                type="text"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="/contact or https://..."
                className="w-full bg-gray-50 border border-gray-200/80 rounded-lg py-3 px-4 text-xs text-[#13102b] font-mono focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
              />
            </div>

            <div className="pt-4 border-t border-gray-200/80 flex justify-end">
              <button
                type="submit"
                className="px-8 py-3.5 bg-brand-gold hover:bg-brand-gold-light text-brand-blue font-black text-xs uppercase tracking-widest rounded-lg shadow-brand-gold/20 transition-all"
              >
                Save Announcement
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
