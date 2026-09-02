"use client";

import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { CheckCircle2, XCircle, Eye, CreditCard, Shield, Sparkles, Filter, Search } from "lucide-react";
import { initialApprovals, PaymentApproval } from "@/lib/adminData";

export default function ApprovalsPage() {
  const [approvals, setApprovals] = useState<PaymentApproval[]>(initialApprovals);
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeProofModal, setActiveProofModal] = useState<PaymentApproval | null>(null);

  const filtered = approvals.filter((a) => {
    if (statusFilter === "All") return true;
    return a.status === statusFilter;
  });

  const handleApprove = (id: string) => {
    setApprovals(
      approvals.map((a) =>
        a.id === id ? { ...a, status: "Approved", notes: "Verified by Executive Director" } : a
      )
    );
    if (activeProofModal?.id === id) setActiveProofModal(null);
  };

  const handleReject = (id: string) => {
    setApprovals(
      approvals.map((a) =>
        a.id === id ? { ...a, status: "Rejected", notes: "UTR Mismatch / Invalid Slip" } : a
      )
    );
    if (activeProofModal?.id === id) setActiveProofModal(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-gold text-[10px] font-bold uppercase tracking-wider mb-1">
              <CheckCircle2 size={14} />
              <span>Audit Desk</span>
            </div>
            <h2 className="text-lg font-bold text-[#13102b]">Payment Proof Verification</h2>
            <p className="text-xs text-gray-400 mt-1">
              Validate high-value UPI transaction receipts and international wire clearance slips.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white border border-gray-200/80 p-1 rounded-lg">
            {["All", "Pending", "Approved", "Rejected"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  statusFilter === s
                    ? "bg-brand-gold text-brand-blue font-black"
                    : "text-gray-500 hover:text-[#13102b]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Approvals Table */}
        <div className="bg-white border border-gray-200/80 rounded-xl p-5">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[600px]">
              <thead>
                <tr className="text-[10px] font-bold uppercase tracking-wider text-brand-gold border-b border-gray-100 pb-3">
                  <th className="pb-3">Reference / UTR</th>
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Client</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Payment Channel</th>
                  <th className="pb-3">Timestamp</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 font-mono font-bold text-brand-gold">
                      {item.transactionRef}
                    </td>
                    <td className="py-4 font-mono text-[#13102b] font-semibold">
                      {item.orderId}
                    </td>
                    <td className="py-4 font-bold text-[#13102b]">
                      {item.customerName}
                    </td>
                    <td className="py-4 text-sm font-bold text-[#13102b]">
                      ₹{item.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="py-4 text-gray-600">
                      {item.method}
                    </td>
                    <td className="py-4 text-gray-400 font-mono text-[11px]">
                      {item.timestamp}
                    </td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold ${
                        item.status === "Approved"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                          : item.status === "Pending"
                          ? "bg-amber-50 text-amber-600 border border-amber-200"
                          : "bg-rose-500/15 text-rose-600 border border-rose-500/30"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setActiveProofModal(item)}
                          className="p-2 rounded-xl bg-gray-50 hover:bg-brand-gold hover:text-white text-gray-700 transition-all text-xs flex items-center gap-1 font-semibold"
                          title="Inspect Proof Slip"
                        >
                          <Eye size={13} />
                          <span>Inspect</span>
                        </button>
                        {item.status === "Pending" && (
                          <>
                            <button
                              onClick={() => handleApprove(item.id)}
                              className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-500 text-emerald-300 hover:text-black transition-all"
                              title="Approve Payment"
                            >
                              <CheckCircle2 size={14} />
                            </button>
                            <button
                              onClick={() => handleReject(item.id)}
                              className="p-2 rounded-xl bg-rose-50 hover:bg-rose-500 text-rose-300 hover:text-[#13102b] transition-all"
                              title="Reject Payment"
                            >
                              <XCircle size={14} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Inspect Payment Slip */}
        {activeProofModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-white border border-brand-gold/40 rounded-xl p-6 max-w-lg w-full relative">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200/80 mb-4">
                <div>
                  <h3 className="text-base font-serif font-bold text-[#13102b]">Payment Audit Verification</h3>
                  <p className="text-xs text-brand-gold font-mono">{activeProofModal.transactionRef}</p>
                </div>
                <button
                  onClick={() => setActiveProofModal(null)}
                  className="p-2 text-gray-400 hover:text-[#13102b]"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Client</span>
                    <span className="font-bold text-[#13102b]">{activeProofModal.customerName}</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Total Amount</span>
                    <span className="font-bold text-brand-gold">₹{activeProofModal.amount.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Screenshot view */}
                <div className="bg-black/60 rounded-lg p-4 border border-gray-200/80 text-center">
                  <p className="text-[10px] text-gray-400 mb-2">Customer Uploaded Transaction Receipt Slip</p>
                  <img
                    src={activeProofModal.screenshotUrl}
                    alt="Receipt"
                    className="max-h-56 mx-auto rounded-xl object-contain border border-gray-200/80"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/banner.png";
                    }}
                  />
                </div>

                {activeProofModal.notes && (
                  <p className="text-xs text-gray-500 italic bg-gray-50 p-3 rounded-xl">
                    Audit Notes: {activeProofModal.notes}
                  </p>
                )}

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200/80">
                  <button
                    onClick={() => handleReject(activeProofModal.id)}
                    className="px-5 py-2.5 rounded-xl bg-rose-50 text-rose-300 hover:bg-rose-500 hover:text-[#13102b] text-xs font-bold transition-all"
                  >
                    Reject Payment
                  </button>
                  <button
                    onClick={() => handleApprove(activeProofModal.id)}
                    className="px-6 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-gold-light text-brand-blue text-xs font-black uppercase tracking-wider transition-all"
                  >
                    Confirm & Authorize Order
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
