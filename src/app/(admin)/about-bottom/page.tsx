"use client";

import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Sparkles, Plus, Trash2, CheckCircle2, Image, Upload } from "lucide-react";

interface GalleryPhoto {
  id: string;
  title: string;
  location: string;
  image: string;
}

export default function AboutBottomCmsPage() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([
    {
      id: "gal-1",
      title: "The Florence Artisanal Guild Atelier",
      location: "Via de' Tornabuoni, Florence, Italy",
      image: "/banner.png",
    },
    {
      id: "gal-2",
      title: "Paris Haute Couture Private Salon",
      location: "Place Vendôme, Paris, France",
      image: "/ban.png",
    },
    {
      id: "gal-3",
      title: "Milan Archive & Leather Vault",
      location: "Via Montenapoleone, Milan, Italy",
      image: "/banner01.jpg",
    },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [saved, setSaved] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    const newP: GalleryPhoto = {
      id: `gal-${Date.now()}`,
      title: newTitle,
      location: newLocation || "Global Flagship Atelier",
      image: "/banner.png",
    };
    setPhotos([...photos, newP]);
    setNewTitle("");
    setNewLocation("");
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
              <Sparkles size={14} />
              <span>Showroom Archive</span>
            </div>
            <h2 className="text-lg font-bold text-[#13102b]">About Us: Atelier Photo Gallery</h2>
            <p className="text-xs text-gray-400 mt-1">
              Curate the photographic exhibition of European workshops, salons, and private vaults.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="px-6 py-3 rounded-lg bg-brand-gold hover:bg-brand-gold-light text-brand-blue font-black text-xs uppercase tracking-widest transition-all shadow-brand-gold/20"
          >
            Save & Publish Gallery
          </button>
        </div>

        {saved && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-600 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 size={16} />
            <span>Showroom archive photo gallery updated live on About Us page!</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Add Form */}
          <div className="bg-white border border-gray-200/80 rounded-xl p-5 h-fit">
            <h3 className="text-sm font-serif font-bold text-[#13102b] mb-4 flex items-center gap-2">
              <Plus size={14} className="text-brand-gold" />
              <span>Add Atelier Photo</span>
            </h3>

            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                  Exhibition Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Geneva Private Watchmaking Room"
                  className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2.5 px-3 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                  Location & City
                </label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="Rue du Rhône, Geneva"
                  className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2.5 px-3 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                />
              </div>

              <div className="border-2 border-dashed border-gray-200/80 rounded-xl p-4 text-center bg-gray-50">
                <Upload size={18} className="mx-auto text-brand-gold mb-1" />
                <p className="text-[10px] text-gray-400">Upload Salon Capture (PNG/WEBP)</p>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-gold hover:bg-brand-gold-light text-brand-blue font-black text-xs uppercase tracking-widest rounded-xl transition-all"
              >
                Insert Photo
              </button>
            </form>
          </div>

          {/* Gallery Tiles */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {photos.map((p) => (
              <div
                key={p.id}
                className="bg-white border border-gray-200/80 rounded-xl overflow-hidden group hover:border-brand-gold/40 transition-all flex flex-col justify-between"
              >
                <div className="h-44 bg-gray-50 overflow-hidden relative">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/banner.png";
                    }}
                  />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#13102b] line-clamp-1">{p.title}</h4>
                    <p className="text-[10px] text-brand-gold mt-0.5">{p.location}</p>
                  </div>
                  <button
                    onClick={() => setPhotos(photos.filter((x) => x.id !== p.id))}
                    className="p-1.5 rounded-lg bg-gray-50 hover:bg-rose-50 text-gray-400 hover:text-rose-600"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
