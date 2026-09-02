"use client";

import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { QrCode, CreditCard, Sparkles, Download, CheckCircle2, ShieldCheck, Printer } from "lucide-react";

export default function UpiScannerPage() {
  const [upiId, setUpiId] = useState("rakvihoriginals@hdfcbank");
  const [payeeName, setPayeeName] = useState("RAKVIH ORIGINALS LUXURY PVT LTD");
  const [testAmount, setTestAmount] = useState("34500");
  const [saved, setSaved] = useState(false);

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=${encodeURIComponent(
    upiId
  )}%26pn=${encodeURIComponent(payeeName)}%26am=${testAmount}%26cu=INR`;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 text-brand-gold text-[10px] font-bold uppercase tracking-wider mb-1">
            <QrCode size={14} />
            <span>Digital Treasury</span>
          </div>
          <h2 className="text-lg font-bold text-[#13102b]">UPI QR Scanner & Gateway Integration</h2>
          <p className="text-xs text-gray-400 mt-1">
            Configure boutique UPI terminals, instant dynamic QR billing, and merchant settlement accounts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Settings Form */}
          <div className="lg:col-span-2 bg-white border border-gray-200/80 rounded-xl p-5 space-y-6">
            <h3 className="text-base font-serif font-bold text-[#13102b] flex items-center gap-2 pb-3 border-b border-gray-200/80">
              <ShieldCheck size={16} className="text-brand-gold" />
              <span>Merchant VPA Settlement Settings</span>
            </h3>

            {saved && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-600 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 size={16} />
                <span>UPI Gateway and QR settings updated across all boutique POS terminals!</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-2">
                  Merchant UPI ID (VPA) *
                </label>
                <input
                  type="text"
                  required
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200/80 rounded-lg py-3 px-4 text-sm text-[#13102b] font-mono focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-2">
                  Official Merchant Legal Business Name *
                </label>
                <input
                  type="text"
                  required
                  value={payeeName}
                  onChange={(e) => setPayeeName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200/80 rounded-lg py-3 px-4 text-sm text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-2">
                    Designated Settlement Bank
                  </label>
                  <input
                    type="text"
                    defaultValue="HDFC Bank — Treasury Branch"
                    className="w-full bg-gray-50 border border-gray-200/80 rounded-lg py-3 px-4 text-sm text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-2">
                    Dynamic QR Simulator Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={testAmount}
                    onChange={(e) => setTestAmount(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200/80 rounded-lg py-3 px-4 text-sm text-[#13102b] font-bold focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-brand-gold hover:bg-brand-gold-light text-brand-blue font-black text-xs uppercase tracking-widest rounded-lg transition-all shadow-brand-gold/20"
              >
                Save & Synchronize POS Terminals
              </button>
            </form>
          </div>

          {/* QR Standee Live Preview */}
          <div className="bg-white border border-brand-gold/40 rounded-xl p-6 flex flex-col items-center justify-between text-center relative overflow-hidden">
            <div className="w-full">
              <div className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-gold mb-2">
                Atelier Counter Standee
              </div>
              <h4 className="text-lg font-serif font-bold text-[#13102b] mb-1">RAKVIH ORIGINALS</h4>
              <p className="text-[10px] text-gray-400 mb-6">Scan to pay with any UPI App (GPay, PhonePe, Paytm, BHIM)</p>

              <div className="p-4 bg-white rounded-xl inline-block mb-4">
                <img
                  src={qrUrl}
                  alt="UPI QR Code"
                  className="w-48 h-48 rounded-xl object-contain mx-auto"
                />
              </div>

              <div className="font-mono text-xs font-bold text-brand-gold">{upiId}</div>
              <div className="text-sm font-bold text-[#13102b] mt-1">₹{Number(testAmount || 0).toLocaleString("en-IN")}</div>
            </div>

            <div className="w-full pt-6 border-t border-gray-200/80 mt-6 flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200/80 rounded-xl text-xs font-bold uppercase tracking-wider text-[#13102b] flex items-center justify-center gap-2"
              >
                <Printer size={14} />
                <span>Print Standee</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
