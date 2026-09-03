"use client";

import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Users, Search, Filter, Sparkles, Gem, Mail, Phone, MapPin, Eye } from "lucide-react";
import { initialCustomers, Customer } from "@/lib/adminData";

export default function CustomerDirectoryPage() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [tierFilter, setTierFilter] = useState("All");
  const [activeCustomer, setActiveCustomer] = useState<Customer | null>(null);

  const filtered = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      c.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = tierFilter === "All" || c.tier === tierFilter;
    return matchesSearch && matchesTier;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-gold text-[10px] font-bold uppercase tracking-wider mb-1">
              <Users size={14} />
              <span>Patron Registry</span>
            </div>
            <h2 className="text-lg font-bold text-[#13102b]">VIP Clients & Customer Dossier</h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white border border-gray-200/80 px-4 py-2 rounded-lg text-right">
              <span className="text-[9px] uppercase tracking-wider text-brand-gold block font-black">Registered Patrons</span>
              <span className="text-base font-bold text-[#13102b]">{customers.length} VIP Members</span>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="admin-filter-row bg-white border border-gray-200/80 rounded-lg p-4 flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search patron by name, email, phone, or residence city..."
              className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2.5 pl-11 pr-4 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter size={14} className="text-brand-gold" />
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="bg-gray-50 border border-gray-200/80 rounded-xl py-2.5 px-4 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
            >
              <option value="All">All Loyalty Tiers</option>
              <option value="VIP Noir">VIP Noir</option>
              <option value="Platinum Maison">Platinum Maison</option>
              <option value="Gold Atelier">Gold Atelier</option>
            </select>
          </div>
        </div>

        {/* Customers Table */}
        <div className="bg-white border border-gray-200/80 rounded-xl p-5">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[600px]">
              <thead>
                <tr className="text-[10px] font-bold uppercase tracking-wider text-brand-gold border-b border-gray-100 pb-3">
                  <th className="pb-3">Patron Profile</th>
                  <th className="pb-3">Loyalty Society Tier</th>
                  <th className="pb-3">Lifetime Value (LTV)</th>
                  <th className="pb-3">Total Orders</th>
                  <th className="pb-3">Residence</th>
                  <th className="pb-3">Last Acquisition</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4">
                      <div className="font-bold text-[#13102b]">{c.name}</div>
                      <div className="text-[10px] text-gray-400">{c.email}</div>
                    </td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                        c.tier === "VIP Noir"
                          ? "bg-brand-gold text-brand-blue shadow-md"
                          : c.tier === "Platinum Maison"
                          ? "bg-slate-300 text-slate-900"
                          : "bg-amber-600/30 text-amber-300"
                      }`}>
                        {c.tier}
                      </span>
                    </td>
                    <td className="py-4 font-bold text-brand-gold text-sm">
                      ₹{c.totalSpent.toLocaleString("en-IN")}
                    </td>
                    <td className="py-4 font-bold text-[#13102b]">
                      {c.ordersCount} Commissions
                    </td>
                    <td className="py-4 text-gray-600">
                      {c.city}
                    </td>
                    <td className="py-4 font-mono text-gray-400 text-[11px]">
                      {c.lastOrderDate}
                    </td>
                    <td className="py-4 text-right">
                      <button
                        onClick={() => setActiveCustomer(c)}
                        className="px-3 py-1.5 rounded-xl bg-gray-50 hover:bg-brand-gold hover:text-white text-gray-700 font-bold text-xs uppercase transition-all"
                      >
                        Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Client Dossier Modal */}
        {activeCustomer && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-white border border-brand-gold/40 rounded-xl p-6 max-w-lg w-full relative">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200/80 mb-6">
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#13102b]">{activeCustomer.name}</h3>
                  <span className="text-xs text-brand-gold font-bold">{activeCustomer.tier} Patron</span>
                </div>
                <button
                  onClick={() => setActiveCustomer(null)}
                  className="p-2 text-gray-400 hover:text-[#13102b]"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Lifetime Spend</span>
                    <span className="font-bold text-base text-brand-gold">₹{activeCustomer.totalSpent.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Commissions</span>
                    <span className="font-bold text-base text-[#13102b]">{activeCustomer.ordersCount} Orders</span>
                  </div>
                </div>

                <div className="space-y-2 bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail size={14} className="text-brand-gold" />
                    <span>{activeCustomer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone size={14} className="text-brand-gold" />
                    <span>{activeCustomer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin size={14} className="text-brand-gold" />
                    <span>Primary Residence: {activeCustomer.city}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200/80 flex justify-end">
                  <button
                    onClick={() => setActiveCustomer(null)}
                    className="px-6 py-2.5 bg-brand-gold text-brand-blue font-black text-xs uppercase tracking-wider rounded-xl"
                  >
                    Close Dossier
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
