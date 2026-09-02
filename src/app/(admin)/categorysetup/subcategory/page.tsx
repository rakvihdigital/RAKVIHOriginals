"use client";

import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { ListTree, Plus, Search, Sparkles, Trash2, ArrowRight } from "lucide-react";
import { initialCategories } from "@/lib/adminData";

export default function SubcategoryPage() {
  const [categories] = useState(initialCategories);
  const [selectedParentId, setSelectedParentId] = useState(initialCategories[0].id);
  const [subName, setSubName] = useState("");
  const [subList, setSubList] = useState(
    initialCategories.flatMap((c) =>
      c.subcategories.map((sc) => ({
        ...sc,
        parentName: c.name,
        parentId: c.id,
      }))
    )
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subName) return;
    const parent = categories.find((c) => c.id === selectedParentId);
    const newSub = {
      id: `sc-${Date.now()}`,
      name: subName,
      slug: subName.toLowerCase().replace(/\s+/g, "-"),
      itemCount: 0,
      subsubcategories: [],
      parentId: selectedParentId,
      parentName: parent ? parent.name : "General",
    };
    setSubList([newSub, ...subList]);
    setSubName("");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 text-brand-gold text-[10px] font-bold uppercase tracking-wider mb-1">
            <ListTree size={14} />
            <span>Taxonomy Hierarchy</span>
          </div>
          <h2 className="text-lg font-bold text-[#13102b]">Subcategory Configuration</h2>
          <p className="text-xs text-gray-400 mt-1">
            Map nested product sections to primary luxury collections.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Add Subcategory */}
          <div className="bg-white border border-gray-200/80 rounded-xl p-5 h-fit">
            <h3 className="text-sm font-serif font-bold text-[#13102b] mb-4 flex items-center gap-2">
              <Sparkles size={14} className="text-brand-gold" />
              <span>Add Subcategory</span>
            </h3>

            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                  Parent Category *
                </label>
                <select
                  value={selectedParentId}
                  onChange={(e) => setSelectedParentId(e.target.value)}
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
                  Subcategory Name *
                </label>
                <input
                  type="text"
                  required
                  value={subName}
                  onChange={(e) => setSubName(e.target.value)}
                  placeholder="e.g. Architectural Crossbody Bags"
                  className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2.5 px-3 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-brand-gold hover:bg-brand-gold-light text-brand-blue font-black text-xs uppercase tracking-widest rounded-xl transition-all"
              >
                Create Subcategory
              </button>
            </form>
          </div>

          {/* Subcategories List */}
          <div className="lg:col-span-2 bg-white border border-gray-200/80 rounded-xl p-5">
            <h3 className="text-sm font-serif font-bold text-[#13102b] pb-4 border-b border-gray-200/80 mb-4">
              Active Subcategories ({subList.length})
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[600px]">
                <thead>
                  <tr className="text-[10px] font-bold uppercase tracking-wider text-brand-gold border-b border-gray-100 pb-2">
                    <th className="pb-3">Subcategory</th>
                    <th className="pb-3">Parent Category</th>
                    <th className="pb-3">Deep Subcategories</th>
                    <th className="pb-3">Products</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {subList.map((sub) => (
                    <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3.5 font-bold text-[#13102b]">
                        {sub.name}
                        <span className="block text-[10px] text-brand-gold/70 font-mono">/{sub.slug}</span>
                      </td>
                      <td className="py-3.5 text-brand-gold font-medium">
                        {sub.parentName}
                      </td>
                      <td className="py-3.5 text-gray-500">
                        {sub.subsubcategories.length > 0
                          ? sub.subsubcategories.join(", ")
                          : "None"}
                      </td>
                      <td className="py-3.5 font-bold text-[#13102b]">
                        {sub.itemCount} items
                      </td>
                      <td className="py-3.5 text-right">
                        <button
                          onClick={() => setSubList(subList.filter((s) => s.id !== sub.id))}
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
