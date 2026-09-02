"use client";

import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Users, Plus, Trash2, Play, Sparkles, Eye, Tag, Upload } from "lucide-react";
import { initialProducts } from "@/lib/adminData";

interface VideoReel {
  id: string;
  title: string;
  category: string;
  duration: string;
  views: number;
  taggedProduct: string;
  thumbnail: string;
  featured: boolean;
}

export default function VideosPage() {
  const [videos, setVideos] = useState<VideoReel[]>([
    {
      id: "vid-1",
      title: "Hand-Stitching the Aura Royale Crocodile Niloticus",
      category: "Artisanal Craftsmanship",
      duration: "01:45",
      views: 12400,
      taggedProduct: "Aura Royale Crocodile Handbag",
      thumbnail: "/handbag.webp",
      featured: true,
    },
    {
      id: "vid-2",
      title: "24K Gold Fluted Spire Heel Sculpting in Florence",
      category: "Atelier Behind The Scenes",
      duration: "02:10",
      views: 9850,
      taggedProduct: "Duchess Fluted Stiletto Heel",
      thumbnail: "/shoe.webp",
      featured: true,
    },
    {
      id: "vid-3",
      title: "Mulberry Silk Carré Hand-Rolling Masterclass",
      category: "Heritage Techniques",
      duration: "00:58",
      views: 8200,
      taggedProduct: "Celestial Garden Mulberry Silk Scarf",
      thumbnail: "/stoles.webp",
      featured: false,
    },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newTagged, setNewTagged] = useState(initialProducts[0].name);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    const newV: VideoReel = {
      id: `vid-${Date.now()}`,
      title: newTitle,
      category: "Showroom Reel",
      duration: "01:15",
      views: 0,
      taggedProduct: newTagged,
      thumbnail: "/banner.png",
      featured: true,
    };
    setVideos([...videos, newV]);
    setNewTitle("");
  };

  const toggleFeatured = (id: string) => {
    setVideos(
      videos.map((v) => (v.id === id ? { ...v, featured: !v.featured } : v))
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 text-brand-gold text-[10px] font-bold uppercase tracking-wider mb-1">
            <Users size={14} />
            <span>Cinematic Atelier</span>
          </div>
          <h2 className="text-lg font-bold text-[#13102b]">Videos & Masterpiece Reels</h2>
          <p className="text-xs text-gray-400 mt-1">
            Publish high-fashion runway reels, atelier workshop videos, and interactive shop-the-look clips.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Add Video Form */}
          <div className="bg-white border border-gray-200/80 rounded-xl p-5 h-fit">
            <h3 className="text-sm font-serif font-bold text-[#13102b] mb-4 flex items-center gap-2">
              <Plus size={14} className="text-brand-gold" />
              <span>Publish Reel / Video</span>
            </h3>

            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                  Video Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Florence Atelier Saddle Stitching"
                  className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2.5 px-3 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                  Tag Product for Direct Purchase
                </label>
                <select
                  value={newTagged}
                  onChange={(e) => setNewTagged(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2.5 px-3 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                >
                  {initialProducts.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="border-2 border-dashed border-gray-200/80 rounded-xl p-4 text-center bg-gray-50 cursor-pointer">
                <Upload size={18} className="mx-auto text-brand-gold mb-1" />
                <p className="text-[10px] text-gray-400">Upload 4K MP4 / WEBM Reel (up to 100MB)</p>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-gold hover:bg-brand-gold-light text-brand-blue font-black text-xs uppercase tracking-widest rounded-xl transition-all"
              >
                Deploy Video Reel
              </button>
            </form>
          </div>

          {/* Videos Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {videos.map((vid) => (
              <div
                key={vid.id}
                className="bg-white border border-gray-200/80 rounded-xl overflow-hidden group hover:border-brand-gold/40 transition-all flex flex-col justify-between"
              >
                <div className="h-44 bg-black/50 overflow-hidden relative flex items-center justify-center">
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform opacity-70"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/banner.png";
                    }}
                  />
                  <div className="absolute inset-0 bg-gray-50 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-brand-gold/90 text-brand-blue flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play size={18} fill="currentColor" className="ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/40 font-mono text-[9px] text-[#13102b]">
                    {vid.duration}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-wider text-brand-gold">
                      {vid.category}
                    </span>
                    <h4 className="text-xs font-bold text-[#13102b] line-clamp-1 mt-0.5">
                      {vid.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-gray-500 bg-gray-50 p-2 rounded-xl border border-gray-100">
                    <Tag size={12} className="text-brand-gold" />
                    <span className="truncate">Tagged: {vid.taggedProduct}</span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-200/80 text-xs">
                    <span className="text-[10px] text-gray-400 flex items-center gap-1">
                      <Eye size={12} /> {vid.views.toLocaleString()} Plays
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleFeatured(vid.id)}
                        className={`text-[9px] px-2 py-1 rounded-lg font-bold ${
                          vid.featured
                            ? "bg-brand-gold text-brand-blue"
                            : "bg-gray-50 text-gray-400"
                        }`}
                      >
                        {vid.featured ? "Featured" : "Regular"}
                      </button>
                      <button
                        onClick={() => setVideos(videos.filter((x) => x.id !== vid.id))}
                        className="p-1 text-gray-400 hover:text-rose-600"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
