"use client";

import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Megaphone, RefreshCw, Sparkles, ExternalLink, Heart, MessageCircle, Plus, Trash2 } from "lucide-react";

interface InstaPost {
  id: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  featured: boolean;
}

export default function InstagramCmsPage() {
  const [handle, setHandle] = useState("@rakvihoriginals");
  const [posts, setPosts] = useState<InstaPost[]>([
    {
      id: "post-1",
      image: "/handbag.webp",
      caption: "The Aura Royale Handbag in emerald niloticus leather. Handcrafted in our Florence atelier. #RAKVIH",
      likes: 1420,
      comments: 88,
      featured: true,
    },
    {
      id: "post-2",
      image: "/shoe.webp",
      caption: "Duchess Fluted Stiletto — 24K gold fluted spire heel catching the Parisian twilight.",
      likes: 980,
      comments: 42,
      featured: true,
    },
    {
      id: "post-3",
      image: "/belt 1.jpg",
      caption: "Bespoke monogrammed reversible calfskin belt. Modern architectural elegance.",
      likes: 740,
      comments: 31,
      featured: true,
    },
    {
      id: "post-4",
      image: "/stoles.webp",
      caption: "Celestial Garden Mulberry Silk Carré — hand-rolled hems and vibrant natural dyes.",
      likes: 1120,
      comments: 65,
      featured: true,
    },
  ]);

  const [syncing, setSyncing] = useState(false);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 1200);
  };

  const toggleFeatured = (id: string) => {
    setPosts(
      posts.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-gold text-[10px] font-bold uppercase tracking-wider mb-1">
              <Megaphone size={14} />
              <span>Social Editorial</span>
            </div>
            <h2 className="text-lg font-bold text-[#13102b]">Instagram Boutique Feed Curation</h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSync}
              disabled={syncing}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-gold hover:bg-brand-gold-light text-brand-blue font-black text-xs uppercase tracking-widest rounded-lg shadow-brand-gold/20 transition-all disabled:opacity-50"
            >
              <RefreshCw size={14} className={syncing ? "animate-spin" : ""} />
              <span>{syncing ? "Syncing Graph API..." : "Sync Live Instagram Feed"}</span>
            </button>
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-white border border-gray-200/80 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-gold to-pink-500 flex items-center justify-center text-[#13102b] font-bold text-sm">
              IG
            </div>
            <div>
              <span className="text-xs font-bold text-[#13102b]">{handle}</span>
              <span className="text-[10px] text-emerald-600 block font-semibold">● Graph API Connected & Active</span>
            </div>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-brand-gold hover:underline flex items-center gap-1 font-bold"
          >
            <span>Open Profile</span>
            <ExternalLink size={12} />
          </a>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white border border-gray-200/80 rounded-xl p-4 flex flex-col justify-between group hover:border-brand-gold/40 transition-all"
            >
              <div>
                <div className="w-full h-48 rounded-lg bg-gray-50 overflow-hidden mb-3 relative flex items-center justify-center">
                  <img
                    src={post.image}
                    alt="Instagram Post"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/handbag.webp";
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase ${
                      post.featured ? "bg-brand-gold text-brand-blue" : "bg-black/60 text-gray-500"
                    }`}>
                      {post.featured ? "Live on Store" : "Hidden"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-brand-gold mb-2 font-bold">
                  <span className="flex items-center gap-1">
                    <Heart size={12} /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={12} /> {post.comments}
                  </span>
                </div>

                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                  {post.caption}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200/80 mt-4 flex items-center justify-between">
                <button
                  onClick={() => toggleFeatured(post.id)}
                  className="text-xs font-bold text-gray-700 hover:text-brand-gold transition-colors"
                >
                  {post.featured ? "Hide from Storefront" : "Feature on Storefront"}
                </button>
                <button
                  onClick={() => setPosts(posts.filter((p) => p.id !== post.id))}
                  className="p-1 text-gray-400 hover:text-rose-600"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
