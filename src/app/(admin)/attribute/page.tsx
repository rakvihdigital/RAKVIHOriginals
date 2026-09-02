"use client";

import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Sparkles, Plus, Trash2, Tag, Palette, Shield, Layers } from "lucide-react";

interface AttributeGroup {
  id: string;
  name: string;
  type: string;
  values: string[];
}

export default function AttributePage() {
  const [groups, setGroups] = useState<AttributeGroup[]>([
    {
      id: "attr-1",
      name: "Exotic & Fine Leathers",
      type: "Material Grade",
      values: ["Niloticus Crocodile", "Glove Lambskin", "Full-Grain Calfskin", "Ostrich Quill", "Tuscan Suede"],
    },
    {
      id: "attr-2",
      name: "Hardware Coatings",
      type: "Plating",
      values: ["24K Champagne Gold", "Polished Palladium", "Brushed Antique Brass", "Rhodium Gunmetal"],
    },
    {
      id: "attr-3",
      name: "Signature Colorways",
      type: "Color Swatch",
      values: ["Emerald Obsidian", "Midnight Gold", "Crimson Noir", "Cognac Patina", "Ivory Pearl"],
    },
    {
      id: "attr-4",
      name: "Belt & Footwear Sizing",
      type: "Size Metric",
      values: ["EU 38", "EU 39", "EU 40", "EU 41", "EU 42", "85cm", "90cm", "95cm", "100cm"],
    },
  ]);

  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupType, setNewGroupType] = useState("Custom Spec");
  const [newValueInput, setNewValueInput] = useState<{ [key: string]: string }>({});

  const handleAddGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName) return;
    const newG: AttributeGroup = {
      id: `attr-${Date.now()}`,
      name: newGroupName,
      type: newGroupType,
      values: [],
    };
    setGroups([...groups, newG]);
    setNewGroupName("");
  };

  const handleAddValue = (groupId: string) => {
    const val = newValueInput[groupId];
    if (!val) return;
    setGroups(
      groups.map((g) => {
        if (g.id === groupId) {
          return { ...g, values: [...g.values, val] };
        }
        return g;
      })
    );
    setNewValueInput({ ...newValueInput, [groupId]: "" });
  };

  const handleRemoveValue = (groupId: string, indexToRemove: number) => {
    setGroups(
      groups.map((g) => {
        if (g.id === groupId) {
          return {
            ...g,
            values: g.values.filter((_, idx) => idx !== indexToRemove),
          };
        }
        return g;
      })
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 text-brand-gold text-[10px] font-bold uppercase tracking-wider mb-1">
            <Sparkles size={14} />
            <span>Artisanal Taxonomies</span>
          </div>
          <h2 className="text-lg font-bold text-[#13102b]">Product Attribute Configurator</h2>
          <p className="text-xs text-gray-400 mt-1">
            Standardize leather grades, hardware finishes, colorways, and sizing metrics across collections.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Add Attribute Group */}
          <div className="bg-white border border-gray-200/80 rounded-xl p-5 h-fit">
            <h3 className="text-sm font-serif font-bold text-[#13102b] mb-4 flex items-center gap-2">
              <Plus size={14} className="text-brand-gold" />
              <span>Create Attribute Set</span>
            </h3>

            <form onSubmit={handleAddGroup} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                  Attribute Name *
                </label>
                <input
                  type="text"
                  required
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="e.g. Gemstone Accents"
                  className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2.5 px-3 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                  Classification Type *
                </label>
                <select
                  value={newGroupType}
                  onChange={(e) => setNewGroupType(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2.5 px-3 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                >
                  <option value="Material Grade">Material Grade</option>
                  <option value="Plating">Plating / Finish</option>
                  <option value="Color Swatch">Color Swatch</option>
                  <option value="Size Metric">Size Metric</option>
                  <option value="Custom Spec">Custom Spec</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-brand-gold hover:bg-brand-gold-light text-brand-blue font-black text-xs uppercase tracking-widest rounded-xl transition-all"
              >
                Register Attribute
              </button>
            </form>
          </div>

          {/* Groups List */}
          <div className="lg:col-span-2 space-y-6">
            {groups.map((group) => (
              <div
                key={group.id}
                className="bg-white border border-gray-200/80 rounded-xl p-5 space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-gray-200/80">
                  <div>
                    <h4 className="text-base font-serif font-bold text-[#13102b]">{group.name}</h4>
                    <span className="text-[10px] font-black uppercase tracking-wider text-brand-gold">
                      {group.type}
                    </span>
                  </div>
                  <button
                    onClick={() => setGroups(groups.filter((g) => g.id !== group.id))}
                    className="p-2 rounded-xl bg-gray-50 hover:bg-rose-50 text-gray-400 hover:text-rose-600"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* Values chips */}
                <div className="flex flex-wrap gap-2">
                  {group.values.map((val, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200/80 text-xs text-white/90"
                    >
                      <span>{val}</span>
                      <button
                        onClick={() => handleRemoveValue(group.id, idx)}
                        className="text-gray-400 hover:text-rose-600"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {group.values.length === 0 && (
                    <span className="text-xs text-gray-400 italic">No values added yet.</span>
                  )}
                </div>

                {/* Add value input */}
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    value={newValueInput[group.id] || ""}
                    onChange={(e) =>
                      setNewValueInput({ ...newValueInput, [group.id]: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddValue(group.id);
                      }
                    }}
                    placeholder={`Add new ${group.name} option...`}
                    className="flex-1 bg-gray-50 border border-gray-200/80 rounded-xl py-2 px-3 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                  />
                  <button
                    onClick={() => handleAddValue(group.id)}
                    className="px-4 py-2 bg-brand-gold/20 hover:bg-brand-gold hover:text-white border border-brand-gold/40 text-brand-gold font-bold text-xs rounded-xl transition-all"
                  >
                    Add Value
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
