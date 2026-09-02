"use client";

import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Shield, Sparkles, Upload, ArrowRight, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewBrandPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [tier, setTier] = useState<"Haute Couture" | "Heritage Maison" | "Contemporary Atelier">("Haute Couture");
  const [country, setCountry] = useState("Italy");
  const [founded, setFounded] = useState("1988");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      router.push("/brands/listbrands");
    }, 1200);
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="flex items-center gap-2 text-brand-gold text-[10px] font-bold uppercase tracking-wider mb-1">
              <Shield size={14} />
              <span>Maison Registry</span>
            </div>
            <h2 className="text-lg font-bold text-[#13102b]">Register New Brand / Maison</h2>
            <p className="text-xs text-gray-400 mt-1">
              Introduce a luxury atelier or partner maison to the RAKVIH curation vault.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white border border-gray-200/80 rounded-xl p-5 relative">
          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#13102b]">Brand Registered Successfully</h3>
              <p className="text-xs text-gray-400">Redirecting to active brand catalog...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-2">
                    Brand / Maison Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. RAKVIH Haute Joaillerie"
                    className="w-full bg-gray-50 border border-gray-200/80 rounded-lg py-3 px-4 text-sm text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-2">
                    Luxury Prestige Tier *
                  </label>
                  <select
                    value={tier}
                    onChange={(e) => setTier(e.target.value as any)}
                    className="w-full bg-gray-50 border border-gray-200/80 rounded-lg py-3 px-4 text-sm text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                  >
                    <option value="Haute Couture">Haute Couture (Ultra Exclusive)</option>
                    <option value="Heritage Maison">Heritage Maison (Century Craftsmanship)</option>
                    <option value="Contemporary Atelier">Contemporary Atelier (Modern Luxury)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-2">
                    Country of Origin *
                  </label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. Italy, France, Switzerland"
                    className="w-full bg-gray-50 border border-gray-200/80 rounded-lg py-3 px-4 text-sm text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-2">
                    Founding Year
                  </label>
                  <input
                    type="number"
                    value={founded}
                    onChange={(e) => setFounded(e.target.value)}
                    placeholder="e.g. 1988"
                    className="w-full bg-gray-50 border border-gray-200/80 rounded-lg py-3 px-4 text-sm text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-2">
                  Atelier Heritage Story / Manifesto
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the artisanal craftsmanship, signature materials, and historical pedigree..."
                  className="w-full bg-gray-50 border border-gray-200/80 rounded-lg py-3 px-4 text-sm text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10 resize-none"
                />
              </div>

              {/* Logo / Crest Upload Simulator */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-2">
                  Brand Crest / Insignia (Vector or Hi-Res PNG)
                </label>
                <div className="border-2 border-dashed border-gray-200/80 rounded-lg p-6 text-center hover:border-brand-gold/50 transition-colors cursor-pointer bg-gray-50">
                  <Upload size={24} className="mx-auto text-brand-gold mb-2" />
                  <p className="text-xs font-semibold text-[#13102b]">Click or drag & drop crest image</p>
                  <p className="text-[10px] text-gray-400 mt-1">SVG, PNG, or WEBP up to 5MB</p>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-4 border-t border-gray-200/80">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-3.5 rounded-lg bg-gray-50 text-gray-500 hover:text-[#13102b] text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-lg bg-brand-gold hover:bg-brand-gold-light text-brand-blue font-black text-xs uppercase tracking-widest transition-all shadow-brand-gold/20 flex items-center gap-2"
                >
                  <span>Authenticate & Register Brand</span>
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
