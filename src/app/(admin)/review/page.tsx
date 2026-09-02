"use client";

import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { CheckCircle, Star, MessageSquare, Trash2, CheckCircle2, XCircle, ShieldCheck } from "lucide-react";
import { initialReviews, Review } from "@/lib/adminData";

export default function ReviewApprovalPage() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [statusFilter, setStatusFilter] = useState("All");
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});

  const filtered = reviews.filter((r) => {
    if (statusFilter === "All") return true;
    return r.status === statusFilter;
  });

  const handleApprove = (id: string) => {
    setReviews(
      reviews.map((r) => (r.id === id ? { ...r, status: "Approved" } : r))
    );
  };

  const handleReject = (id: string) => {
    setReviews(
      reviews.map((r) => (r.id === id ? { ...r, status: "Rejected" } : r))
    );
  };

  const handleSendReply = (id: string) => {
    const reply = replyText[id];
    if (!reply) return;
    setReviews(
      reviews.map((r) => (r.id === id ? { ...r, reply } : r))
    );
    setReplyText({ ...replyText, [id]: "" });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-gold text-[10px] font-bold uppercase tracking-wider mb-1">
              <CheckCircle size={14} />
              <span>Client Testimonials</span>
            </div>
            <h2 className="text-lg font-bold text-[#13102b]">Review Moderation & Approval</h2>
            <p className="text-xs text-gray-400 mt-1">
              Moderate verified collector reviews, submit official atelier responses, and publish ratings.
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

        {/* Reviews Grid */}
        <div className="space-y-4">
          {filtered.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-gray-200/80 rounded-xl p-5 space-y-4 hover:border-brand-gold/40 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-200/80">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-[#13102b]">{rev.customerName}</h4>
                    {rev.verifiedBuyer && (
                      <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                        <ShieldCheck size={10} />
                        Verified Atelier Client
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-brand-gold mt-0.5">{rev.productName}</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center text-amber-600 gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < rev.rating ? "currentColor" : "none"}
                        className={i < rev.rating ? "text-amber-600" : "text-white/20"}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono">{rev.date}</span>
                  <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold ${
                    rev.status === "Approved"
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                      : rev.status === "Pending"
                      ? "bg-amber-50 text-amber-600 border border-amber-200"
                      : "bg-rose-500/15 text-rose-600 border border-rose-500/30"
                  }`}>
                    {rev.status}
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-700 leading-relaxed font-serif italic text-base">
                "{rev.comment}"
              </p>

              {rev.reply && (
                <div className="p-3.5 bg-gray-50 rounded-lg border border-brand-gold/20 text-xs">
                  <span className="text-[9px] font-black uppercase tracking-wider text-brand-gold block mb-1">
                    Official Atelier Response:
                  </span>
                  <p className="text-gray-700">{rev.reply}</p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-gray-100">
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={replyText[rev.id] || ""}
                    onChange={(e) =>
                      setReplyText({ ...replyText, [rev.id]: e.target.value })
                    }
                    placeholder="Write official Maison response..."
                    className="flex-1 bg-gray-50 border border-gray-200/80 rounded-xl py-1.5 px-3 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                  />
                  <button
                    onClick={() => handleSendReply(rev.id)}
                    className="px-4 py-1.5 bg-gray-50 hover:bg-brand-gold hover:text-white text-[#13102b] text-xs font-bold rounded-xl transition-all border border-gray-200/80"
                  >
                    Reply
                  </button>
                </div>

                <div className="flex items-center gap-2 justify-end">
                  {rev.status !== "Approved" && (
                    <button
                      onClick={() => handleApprove(rev.id)}
                      className="px-4 py-1.5 bg-emerald-50 text-emerald-300 hover:bg-emerald-500 hover:text-black rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                    >
                      <CheckCircle2 size={13} />
                      <span>Approve & Feature</span>
                    </button>
                  )}
                  {rev.status !== "Rejected" && (
                    <button
                      onClick={() => handleReject(rev.id)}
                      className="px-4 py-1.5 bg-rose-50 text-rose-300 hover:bg-rose-500 hover:text-[#13102b] rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                    >
                      <XCircle size={13} />
                      <span>Reject</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
