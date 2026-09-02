"use client";

import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Megaphone, Plus, Trash2, Sparkles, CheckCircle2, Upload, Eye } from "lucide-react";

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  active: boolean;
}

export default function HeroCmsPage() {
  const [slides, setSlides] = useState<HeroSlide[]>([
    {
      id: "slide-1",
      title: "SCULPTED ELEGANCE",
      subtitle: "The 2026 Autumn Atelier Handbag Collection",
      ctaText: "EXPLORE CREATIONS",
      ctaLink: "/handbags",
      image: "/banner.png",
      active: true,
    },
    {
      id: "slide-2",
      title: "ROYAL HERITAGE SILK",
      subtitle: "Hand-Rolled Mulberry Carré Stoles & Wraps",
      ctaText: "DISCOVER EDITIONS",
      ctaLink: "/stoles",
      image: "/banner01.jpg",
      active: true,
    },
  ]);

  const [saved, setSaved] = useState(false);

  const handleUpdate = (id: string, field: keyof HeroSlide, value: any) => {
    setSlides(
      slides.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const handleAddSlide = () => {
    const newS: HeroSlide = {
      id: `slide-${Date.now()}`,
      title: "BESPOKE ARCHITECTURAL LUXURY",
      subtitle: "Handcrafted in Florence & Paris",
      ctaText: "RESERVE PIECE",
      ctaLink: "/handbags",
      image: "/ban.png",
      active: true,
    };
    setSlides([...slides, newS]);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-gold text-[10px] font-bold uppercase tracking-wider mb-1">
              <Megaphone size={14} />
              <span>Storefront CMS</span>
            </div>
            <h2 className="text-lg font-bold text-[#13102b]">Hero & Banner Sections</h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAddSlide}
              className="px-5 py-3 rounded-lg bg-gray-50 border border-gray-200/80 hover:border-brand-gold/40 text-xs font-bold uppercase tracking-wider text-[#13102b] transition-all flex items-center gap-2"
            >
              <Plus size={14} className="text-brand-gold" />
              <span>Add Slide</span>
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-3 rounded-lg bg-brand-gold hover:bg-brand-gold-light text-brand-blue font-black text-xs uppercase tracking-widest transition-all shadow-brand-gold/20"
            >
              Publish Changes
            </button>
          </div>
        </div>

        {saved && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-600 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 size={16} />
            <span>Hero banner slides deployed live to storefront homepage!</span>
          </div>
        )}

        {/* Slides list */}
        <div className="space-y-6">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="bg-white border border-gray-200/80 rounded-xl p-5 space-y-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-200/80">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-brand-gold text-brand-blue font-bold flex items-center justify-center text-xs">
                    0{index + 1}
                  </span>
                  <h3 className="text-sm font-serif font-bold text-[#13102b]">Hero Slide #{index + 1}</h3>
                </div>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={slide.active}
                      onChange={(e) => handleUpdate(slide.id, "active", e.target.checked)}
                      className="rounded accent-brand-gold w-4 h-4 cursor-pointer"
                    />
                    <span>Live Display</span>
                  </label>
                  <button
                    onClick={() => setSlides(slides.filter((s) => s.id !== slide.id))}
                    className="p-1.5 rounded-lg bg-gray-50 hover:bg-rose-50 text-gray-400 hover:text-rose-600"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Visual Preview */}
                <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200/80 relative h-48 flex items-center justify-center group">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/banner.png";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4 text-center">
                    <h4 className="font-serif font-bold text-[#13102b] text-sm tracking-wider">{slide.title}</h4>
                    <p className="text-[10px] text-brand-gold mt-1">{slide.subtitle}</p>
                    <span className="mt-2 text-[9px] px-3 py-1 bg-brand-gold text-brand-blue font-bold rounded-lg uppercase">
                      {slide.ctaText}
                    </span>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1">
                      Headline Title
                    </label>
                    <input
                      type="text"
                      value={slide.title}
                      onChange={(e) => handleUpdate(slide.id, "title", e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2 px-3 text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10 font-serif text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1">
                      Subheading / Tagline
                    </label>
                    <input
                      type="text"
                      value={slide.subtitle}
                      onChange={(e) => handleUpdate(slide.id, "subtitle", e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2 px-3 text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1">
                      CTA Button Text
                    </label>
                    <input
                      type="text"
                      value={slide.ctaText}
                      onChange={(e) => handleUpdate(slide.id, "ctaText", e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2 px-3 text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1">
                      CTA Destination URL
                    </label>
                    <input
                      type="text"
                      value={slide.ctaLink}
                      onChange={(e) => handleUpdate(slide.id, "ctaLink", e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2 px-3 text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10 font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
