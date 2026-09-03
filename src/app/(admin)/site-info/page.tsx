"use client";

import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Info, Sparkles, CheckCircle2, Globe, Mail, Phone, MapPin, DollarSign } from "lucide-react";

export default function SiteInfoPage() {
  const [storeName, setStoreName] = useState("RAKVIH Originals");
  const [tagline, setTagline] = useState("Luxury Maison & Signature Editions");
  const [contactEmail, setContactEmail] = useState("concierge@rakvihoriginals.com");
  const [phone, setPhone] = useState("+1 (212) 888-0018");
  const [address, setAddress] = useState("18 Avenue Montaigne, 75008 Paris • Altamount Road, Mumbai");
  const [currency, setCurrency] = useState("INR (₹)");
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
            <Info size={14} />
            <span>Global Configuration</span>
          </div>
          <h2 className="text-lg font-bold text-[#13102b]">Website & Boutique Profile Settings</h2>
          <p className="text-xs text-gray-400 mt-1">
            Configure contact coordinates, flagship showroom addresses, concierge telephone channels, and SEO.
          </p>
        </div>

        {saved && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-600 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 size={16} />
            <span>Maison profile and global contact settings synchronized!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="bg-white border border-gray-200/80 rounded-xl p-5 space-y-6">
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-gold flex items-center gap-2 border-b border-gray-200/80 pb-2">
              <Globe size={14} />
              <span>1. Maison Identity</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                  Brand Name
                </label>
                <input
                  type="text"
                  required
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200/80 rounded-lg py-3 px-4 text-sm text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                  Brand Tagline
                </label>
                <input
                  type="text"
                  required
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200/80 rounded-lg py-3 px-4 text-sm text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-200/80">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-gold flex items-center gap-2 border-b border-gray-200/80 pb-2">
              <Phone size={14} />
              <span>2. Concierge Client Care Channels</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                  Official Concierge Email
                </label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200/80 rounded-lg py-3 px-4 text-sm text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                  Direct Telephone Desk
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200/80 rounded-lg py-3 px-4 text-sm text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                  Default Store Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200/80 rounded-lg py-3 px-4 text-sm text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                >
                  <option value="INR (₹)">INR (₹) — Indian Rupee</option>
                  <option value="USD ($)">USD ($) — US Dollar</option>
                  <option value="EUR (€)">EUR (€) — Euro</option>
                  <option value="GBP (£)">GBP (£) — British Pound</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                Physical Atelier & Showroom Locations
              </label>
              <textarea
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200/80 rounded-lg py-3 px-4 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10 leading-relaxed"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200/80 flex justify-end">
            <button
              type="submit"
              className="px-8 py-3.5 bg-brand-gold hover:bg-brand-gold-light text-brand-blue font-black text-xs uppercase tracking-widest rounded-lg shadow-brand-gold/20 transition-all"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
