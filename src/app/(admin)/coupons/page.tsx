"use client";

import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Ticket, Plus, Sparkles, Trash2, Calendar, CheckCircle2, Copy } from "lucide-react";
import { initialCoupons, Coupon } from "@/lib/adminData";

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState<"Percentage" | "Fixed">("Percentage");
  const [discountValue, setDiscountValue] = useState("15");
  const [minSpend, setMinSpend] = useState("25000");
  const [usageLimit, setUsageLimit] = useState("100");
  const [expiryDate, setExpiryDate] = useState("2026-12-31");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;
    const newCp: Coupon = {
      id: `cp-${Date.now()}`,
      code: code.toUpperCase(),
      discountType,
      discountValue: Number(discountValue),
      minSpend: Number(minSpend),
      usageCount: 0,
      usageLimit: Number(usageLimit),
      expiryDate,
      status: "Active",
    };
    setCoupons([newCp, ...coupons]);
    setCode("");
  };

  const handleCopy = (couponCode: string, id: string) => {
    navigator.clipboard.writeText(couponCode);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleStatus = (id: string) => {
    setCoupons(
      coupons.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            status: c.status === "Active" ? "Paused" : "Active",
          };
        }
        return c;
      })
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 text-brand-gold text-[10px] font-bold uppercase tracking-wider mb-1">
            <Ticket size={14} />
            <span>VIP Client Privileges</span>
          </div>
          <h2 className="text-lg font-bold text-[#13102b]">Coupons & Private Invitations</h2>
          <p className="text-xs text-gray-400 mt-1">
            Generate bespoke concierge discount codes and private preview promotional vouchers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Create Coupon Form */}
          <div className="bg-white border border-gray-200/80 rounded-xl p-5 h-fit">
            <h3 className="text-sm font-serif font-bold text-[#13102b] mb-4 flex items-center gap-2">
              <Sparkles size={14} className="text-brand-gold" />
              <span>Generate Privilege Code</span>
            </h3>

            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                  Voucher Code *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="e.g. MONACOVIP25"
                    className="flex-1 bg-gray-50 border border-gray-200/80 rounded-xl py-2.5 px-3 text-xs text-[#13102b] font-mono font-bold focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                  />
                  <button
                    type="button"
                    onClick={() => setCode(`RAKVIH${Math.floor(1000 + Math.random() * 9000)}`)}
                    className="px-3 py-2 bg-gray-50 hover:bg-gray-100 text-[10px] font-bold uppercase text-brand-gold rounded-xl border border-gray-200/80"
                  >
                    Random
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                    Discount Type
                  </label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as any)}
                    className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2.5 px-3 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                  >
                    <option value="Percentage">Percentage (%)</option>
                    <option value="Fixed">Fixed Amount (₹)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                    Discount Value *
                  </label>
                  <input
                    type="number"
                    required
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2.5 px-3 text-xs text-[#13102b] font-bold focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                    Min Spend (₹)
                  </label>
                  <input
                    type="number"
                    value={minSpend}
                    onChange={(e) => setMinSpend(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2.5 px-3 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                    Usage Cap
                  </label>
                  <input
                    type="number"
                    value={usageLimit}
                    onChange={(e) => setUsageLimit(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2.5 px-3 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                  Expiry Date
                </label>
                <input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2.5 px-3 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-brand-gold hover:bg-brand-gold-light text-brand-blue font-black text-xs uppercase tracking-widest rounded-xl transition-all"
              >
                Issue Privilege Voucher
              </button>
            </form>
          </div>

          {/* Coupons List */}
          <div className="lg:col-span-2 bg-white border border-gray-200/80 rounded-xl p-5">
            <h3 className="text-sm font-serif font-bold text-[#13102b] pb-4 border-b border-gray-200/80 mb-4">
              Active Privilege Vouchers ({coupons.length})
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[600px]">
                <thead>
                  <tr className="text-[10px] font-bold uppercase tracking-wider text-brand-gold border-b border-gray-100 pb-2">
                    <th className="pb-3">Voucher Code</th>
                    <th className="pb-3">Discount</th>
                    <th className="pb-3">Min Order</th>
                    <th className="pb-3">Redemptions</th>
                    <th className="pb-3">Expires</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {coupons.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-brand-gold bg-gray-50 px-2.5 py-1 rounded-lg border border-brand-gold/40">
                            {c.code}
                          </span>
                          <button
                            onClick={() => handleCopy(c.code, c.id)}
                            className="p-1 rounded text-gray-400 hover:text-[#13102b]"
                            title="Copy Code"
                          >
                            {copiedId === c.id ? <CheckCircle2 size={12} className="text-emerald-600" /> : <Copy size={12} />}
                          </button>
                        </div>
                      </td>
                      <td className="py-4 font-bold text-[#13102b]">
                        {c.discountType === "Percentage" ? `${c.discountValue}% OFF` : `₹${c.discountValue} OFF`}
                      </td>
                      <td className="py-4 text-gray-600">
                        ₹{c.minSpend.toLocaleString("en-IN")}
                      </td>
                      <td className="py-4">
                        <div className="font-bold text-[#13102b]">{c.usageCount} / {c.usageLimit}</div>
                        <div className="w-16 h-1 bg-gray-100 rounded-full mt-1 overflow-hidden">
                          <div
                            className="h-full bg-brand-gold"
                            style={{ width: `${Math.min(100, (c.usageCount / c.usageLimit) * 100)}%` }}
                          />
                        </div>
                      </td>
                      <td className="py-4 text-gray-500 font-mono text-[11px]">
                        {c.expiryDate}
                      </td>
                      <td className="py-4">
                        <button
                          onClick={() => toggleStatus(c.id)}
                          className={`px-2.5 py-1 rounded-full text-[9px] font-bold cursor-pointer transition-all ${
                            c.status === "Active"
                              ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                              : "bg-amber-50 text-amber-600 border border-amber-200"
                          }`}
                        >
                          {c.status}
                        </button>
                      </td>
                      <td className="py-4 text-right">
                        <button
                          onClick={() => setCoupons(coupons.filter((x) => x.id !== c.id))}
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
