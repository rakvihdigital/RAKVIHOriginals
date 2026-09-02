"use client";

import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { ListTree, Plus, Search, Sparkles, Image, CheckCircle, Edit2, Trash2 } from "lucide-react";
import { initialCategories, Category } from "@/lib/adminData";

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [featured, setFeatured] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    const newCat: Category = {
      id: `c-${Date.now()}`,
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, "-"),
      itemCount: 0,
      featured,
      status: "Active",
      image: "/handbag.webp",
      subcategories: [],
    };
    setCategories([...categories, newCat]);
    setName("");
    setSlug("");
  };

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 text-brand-gold text-[10px] font-bold uppercase tracking-wider mb-1">
            <ListTree size={14} />
            <span>Taxonomy Management</span>
          </div>
          <h2 className="text-lg font-bold text-[#13102b]">Main Boutique Categories</h2>
          <p className="text-xs text-gray-400 mt-1">
            Configure root product departments and visual hero navigation tiles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Add Category Card */}
          <div className="bg-white border border-gray-200/80 rounded-xl p-5 h-fit">
            <h3 className="text-sm font-serif font-bold text-[#13102b] mb-4 flex items-center gap-2">
              <Sparkles size={14} className="text-brand-gold" />
              <span>Create Main Category</span>
            </h3>

            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (!slug) setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
                  }}
                  placeholder="e.g. Fine Horology & Timepieces"
                  className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2.5 px-3 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                  Slug / URL Identifier
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="fine-horology"
                  className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2.5 px-3 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="feat"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="rounded accent-brand-gold w-4 h-4 cursor-pointer"
                />
                <label htmlFor="feat" className="text-xs text-gray-700 cursor-pointer">
                  Feature in Header Mega Menu
                </label>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3 bg-brand-gold hover:bg-brand-gold-light text-brand-blue font-black text-xs uppercase tracking-widest rounded-xl transition-all"
              >
                Add Category
              </button>
            </form>
          </div>

          {/* Categories Listing Table */}
          <div className="lg:col-span-2 bg-white border border-gray-200/80 rounded-xl p-5">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200/80 mb-4">
              <h3 className="text-sm font-serif font-bold text-[#13102b]">Active Categories ({categories.length})</h3>
              <div className="relative w-64">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter categories..."
                  className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-1.5 pl-9 pr-3 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[600px]">
                <thead>
                  <tr className="text-[10px] font-bold uppercase tracking-wider text-brand-gold border-b border-gray-100 pb-2">
                    <th className="pb-3">Visual</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Subcategories</th>
                    <th className="pb-3">Products</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredCategories.map((cat) => (
                    <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3.5">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200/80 overflow-hidden flex items-center justify-center">
                          <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/handbag.webp";
                            }}
                          />
                        </div>
                      </td>
                      <td className="py-3.5">
                        <div className="font-bold text-[#13102b]">{cat.name}</div>
                        <div className="text-[10px] text-brand-gold font-mono">/{cat.slug}</div>
                      </td>
                      <td className="py-3.5 text-gray-600">
                        {cat.subcategories.length} Sections
                      </td>
                      <td className="py-3.5 font-bold text-[#13102b]">
                        {cat.itemCount} items
                      </td>
                      <td className="py-3.5">
                        <span className="px-2.5 py-1 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                          {cat.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setCategories(categories.filter((c) => c.id !== cat.id))}
                            className="p-1.5 rounded-lg bg-gray-50 hover:bg-rose-50 text-gray-400 hover:text-rose-600"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
