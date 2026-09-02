"use client";

import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Mail, Search, Send, Trash2, CheckCircle2, User, Phone, Sparkles } from "lucide-react";
import { initialMessages, InboundMessage } from "@/lib/adminData";

export default function MessagesPage() {
  const [messages, setMessages] = useState<InboundMessage[]>(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<InboundMessage | null>(initialMessages[0]);
  const [replyText, setReplyText] = useState("");
  const [sentNotice, setSentNotice] = useState(false);

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText || !selectedMessage) return;
    setMessages(
      messages.map((m) =>
        m.id === selectedMessage.id ? { ...m, status: "Replied" } : m
      )
    );
    setSelectedMessage({ ...selectedMessage, status: "Replied" });
    setSentNotice(true);
    setReplyText("");
    setTimeout(() => setSentNotice(false), 3000);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 text-brand-gold text-[10px] font-bold uppercase tracking-wider mb-1">
            <Mail size={14} />
            <span>VIP Client Concierge</span>
          </div>
          <h2 className="text-lg font-bold text-[#13102b]">Inbound Inquiries & Showroom Requests</h2>
          <p className="text-xs text-gray-400 mt-1">
            Manage bespoke monogramming requests, private showroom appointment bookings, and VIP queries.
          </p>
        </div>

        {/* Master-Detail Messages Inbox */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[580px]">
          {/* Left 5 cols: Message list */}
          <div className="lg:col-span-5 bg-white border border-gray-200/80 rounded-xl p-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="pb-3 border-b border-gray-200/80 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                  Inquiries ({messages.length})
                </span>
              </div>

              <div className="space-y-2 max-h-[500px] overflow-y-auto no-scrollbar">
                {messages.map((msg) => (
                  <button
                    key={msg.id}
                    onClick={() => setSelectedMessage(msg)}
                    className={`w-full text-left p-3.5 rounded-lg transition-all border ${
                      selectedMessage?.id === msg.id
                        ? "bg-brand-gold/15 border-brand-gold/40 shadow-lg"
                        : "bg-gray-50 border-transparent hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-[#13102b] truncate max-w-[160px]">
                        {msg.sender}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase ${
                        msg.priority === "High"
                          ? "bg-rose-50 text-rose-300"
                          : "bg-brand-gold/20 text-brand-gold"
                      }`}>
                        {msg.priority}
                      </span>
                    </div>

                    <h4 className="text-xs font-semibold text-brand-gold truncate">{msg.subject}</h4>
                    <p className="text-[11px] text-gray-400 line-clamp-2 mt-1 leading-relaxed">
                      {msg.message}
                    </p>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 text-[10px] text-gray-300 font-mono">
                      <span>{msg.date}</span>
                      <span className={msg.status === "Unread" ? "text-amber-600 font-bold" : "text-emerald-600 font-bold"}>
                        {msg.status}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right 7 cols: Active Message view & Reply */}
          <div className="lg:col-span-7 bg-white border border-gray-200/80 rounded-xl p-5 flex flex-col justify-between">
            {selectedMessage ? (
              <div className="space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-start justify-between pb-4 border-b border-gray-200/80">
                    <div>
                      <h3 className="text-lg font-serif font-bold text-[#13102b]">{selectedMessage.subject}</h3>
                      <div className="flex flex-wrap items-center gap-3 mt-1 text-xs">
                        <span className="text-brand-gold font-semibold">{selectedMessage.sender}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-500">{selectedMessage.email}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-500">{selectedMessage.phone}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setMessages(messages.filter((m) => m.id !== selectedMessage.id))}
                      className="p-2 rounded-xl bg-gray-50 hover:bg-rose-50 text-gray-400 hover:text-rose-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="text-sm text-white/90 leading-relaxed font-sans">
                      {selectedMessage.message}
                    </p>
                  </div>

                  {sentNotice && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-600 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                      <CheckCircle2 size={14} />
                      <span>Official concierge dispatch sent to {selectedMessage.email}!</span>
                    </div>
                  )}
                </div>

                {/* Reply composer */}
                <form onSubmit={handleSendReply} className="pt-4 border-t border-gray-200/80 space-y-3">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold">
                    Compose Official Concierge Response
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type official atelier consultation response..."
                    className="w-full bg-gray-50 border border-gray-200/80 rounded-lg py-3 px-4 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10 resize-none"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-brand-gold hover:bg-brand-gold-light text-brand-blue font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center gap-2"
                    >
                      <Send size={12} />
                      <span>Dispatch Response</span>
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="py-24 text-center text-xs text-gray-400 italic">
                Select an inquiry from the inbox to read.
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
