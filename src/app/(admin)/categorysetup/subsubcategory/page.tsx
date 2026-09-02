"use client";

import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { ListTree, Plus, Sparkles, Trash2, Tag } from "lucide-react";
import { initialCategories } from "@/lib/adminData";

export default function DeepSubcategoryPage() {
  const [categories] = useState(initialCategories);
  const [selectedCatId, setSelectedCatId] = useState(initialCategories[0].id);
  const [selectedSubId, setSelectedSubId] = useState(initialCategories[0].subcategories[0]?.id || "");
  const [tagName, setTagName] = useState("");

  const currentCategory = categories.find((c) => c.id === selectedCatId);
  const availableSubcategories = currentCategory ? currentCategory.subcategories : [];

  const [deepList, setDeepList] = useState([
    { id: "d-1", catName: "Handbags & Clutches", subName: "Structured Totes", name: "Top Handle Architecture" },
    { id: "d-2", catName: "Handbags & Clutches", subName: "Structured Totes", name: "Trapeze Silhouette" },
    { id: "d-3", catName: "Handbags & Clutches", subName: "Evening Minaudières", name: "24K Gold Inlay Clasp" },
    { id: "d-4", catName: "Artisanal Footwear", subName: "Stiletto & Sculptural Heels", name: "Fluted Spire Heel" },
    { id: "d-5", catName: "Bespoke Belts", subName: "Reversible Calfskin", name: "Dual-Tone 35mm Cinch" },
    { id: "d-6", catName: "Silk & Cashmere Stoles", subName: "Mulberry Silk Scarves", name: "Hand-Rolled French Carré" },
  ]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tagName) return;
    const cat = categories.find((c) => c.id === selectedCatId);
    const sub = cat?.subcategories.find((s) => s.id === selectedSubId);

    const newDeep = {
      id: `d-${Date.now()}`,
      catName: cat ? cat.name : "Category",
      subName: sub ? sub.name : "Subcategory",
      name: tagName,
    };
    setDeepList([newDeep, ...deepList]);
    setTagName("");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 text-brand-gold text-[10px] font-bold uppercase tracking-wider mb-1">
            <ListTree size={14} />
            <span>Multi-Level Taxonomy</span>
          </div>
          <h2 className="text-lg font-bold text-[#13102b]">Deep Subcategory Specifications</h2>
          <p className="text-xs text-gray-400 mt-1">
            Configure fine-grained filtering attributes, cuts, silhouettes, and hardware tags.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Add Deep Subcategory */}
          <div className="bg-white border border-gray-200/80 rounded-xl p-5 h-fit">
            <h3 className="text-sm font-serif font-bold text-[#13102b] mb-4 flex items-center gap-2">
              <Sparkles size={14} className="text-brand-gold" />
              <span>Define Deep Subcategory</span>
            </h3>

            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                  1. Root Category
                </label>
                <select
                  value={selectedCatId}
                  onChange={(e) => {
                    setSelectedCatId(e.target.value);
                    const cat = categories.find((c) => c.id === e.target.value);
                    if (cat && cat.subcategories.length > 0) {
                      setSelectedSubId(cat.subcategories[0].id);
                    }
                  }}
                  className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2.5 px-3 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                  2. Subcategory Section
                </label>
                <select
                  value={selectedSubId}
                  onChange={(e) => setSelectedSubId(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2.5 px-3 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                >
                  {availableSubcategories.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                  3. Deep Tag / Attribute Name
                </label>
                <input
                  type="text"
                  required
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                  placeholder="e.g. Micro Box Silhouette"
                  className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2.5 px-3 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-brand-gold hover:bg-brand-gold-light text-brand-blue font-black text-xs uppercase tracking-widest rounded-xl transition-all"
              >
                Attach Deep Tag
              </button>
            </form>
          </div>

          {/* Deep Tags Grid Table */}
          <div className="lg:col-span-2 bg-white border border-gray-200/80 rounded-xl p-5">
            <h3 className="text-sm font-serif font-bold text-[#13102b] pb-4 border-b border-gray-200/80 mb-4">
              Registered Deep Subcategories ({deepList.length})
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[600px]">
                <thead>
                  <tr className="text-[10px] font-bold uppercase tracking-wider text-brand-gold border-b border-gray-100 pb-2">
                    <th className="pb-3">Deep Spec / Silhouette</th>
                    <th className="pb-3">Subcategory</th>
                    <th className="pb-3">Root Category</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {deepList.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3.5 font-bold text-[#13102b] flex items-center gap-2">
                        <Tag size={12} className="text-brand-gold" />
                        <span>{item.name}</span>
                      </td>
                      <td className="py-3.5 text-gray-600">
                        {item.subName}
                      </td>
                      <td className="py-3.5 text-brand-gold font-medium">
                        {item.catName}
                      </td>
                      <td className="py-3.5 text-right">
                        <button
                          onClick={() => setDeepList(deepList.filter((d) => d.id !== item.id))}
                          className="p-1.5 rounded-lg bg-gray-50 hover:bg-rose-50 text-gray-400 hover:text-rose-600"
                        >
                          <Trash2 size={13} />
                        </button>
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
