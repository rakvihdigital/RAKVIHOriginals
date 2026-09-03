"use client";

import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { ClipboardList, Search, Printer, RotateCcw, Calendar, Download } from "lucide-react";

interface PosTransaction {
  id: string;
  receiptNumber: string;
  customerName: string;
  time: string;
  itemsCount: number;
  subtotal: number;
  tax: number;
  total: number;
  paymentMode: "UPI" | "Card" | "Cash";
  cashier: string;
  status: "Completed" | "Refunded";
}

export default function PosListingPage() {
  const [transactions, setTransactions] = useState<PosTransaction[]>([
    {
      id: "pos-1",
      receiptNumber: "POS-99201",
      customerName: "Countess Victoria Sterling",
      time: "2026-09-02 16:40",
      itemsCount: 2,
      subtotal: 40900,
      tax: 7362,
      total: 48262,
      paymentMode: "UPI",
      cashier: "Jean-Luc (Atelier Host)",
      status: "Completed",
    },
    {
      id: "pos-2",
      receiptNumber: "POS-99202",
      customerName: "Rajiv Singhania",
      time: "2026-09-02 15:12",
      itemsCount: 1,
      subtotal: 34500,
      tax: 6210,
      total: 40710,
      paymentMode: "Card",
      cashier: "Jean-Luc (Atelier Host)",
      status: "Completed",
    },
    {
      id: "pos-3",
      receiptNumber: "POS-99203",
      customerName: "Alexander Vance",
      time: "2026-09-02 13:30",
      itemsCount: 1,
      subtotal: 18500,
      tax: 3330,
      total: 21830,
      paymentMode: "Cash",
      cashier: "Marcella (Concierge Lead)",
      status: "Completed",
    },
    {
      id: "pos-4",
      receiptNumber: "POS-99204",
      customerName: "Elena Rostova",
      time: "2026-09-02 11:20",
      itemsCount: 1,
      subtotal: 8900,
      tax: 1602,
      total: 10502,
      paymentMode: "UPI",
      cashier: "Marcella (Concierge Lead)",
      status: "Refunded",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filtered = transactions.filter(
    (t) =>
      t.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSalesToday = transactions
    .filter((t) => t.status === "Completed")
    .reduce((acc, curr) => acc + curr.total, 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-gold text-[10px] font-bold uppercase tracking-wider mb-1">
              <ClipboardList size={14} />
              <span>Register Audit</span>
            </div>
            <h2 className="text-lg font-bold text-[#13102b]">POS History & Transaction Ledger</h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white border border-gray-200/80 px-4 py-2.5 rounded-lg text-right">
              <span className="text-[9px] uppercase tracking-wider text-brand-gold block font-black">Today's POS Inflow</span>
              <span className="text-lg font-serif font-bold text-[#13102b]">₹{totalSalesToday.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="admin-filter-row bg-white border border-gray-200/80 rounded-lg p-4 flex items-center gap-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by receipt number (e.g. POS-99201) or customer name..."
              className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2.5 pl-11 pr-4 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
            />
          </div>
        </div>

        {/* Ledger Table */}
        <div className="bg-white border border-gray-200/80 rounded-xl p-5">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[600px]">
              <thead>
                <tr className="text-[10px] font-bold uppercase tracking-wider text-brand-gold border-b border-gray-100 pb-3">
                  <th className="pb-3">Receipt No.</th>
                  <th className="pb-3">Client</th>
                  <th className="pb-3">Timestamp</th>
                  <th className="pb-3">Items</th>
                  <th className="pb-3">Payment Mode</th>
                  <th className="pb-3">Cashier Desk</th>
                  <th className="pb-3">Total Billed</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 font-mono font-bold text-[#13102b]">
                      {t.receiptNumber}
                    </td>
                    <td className="py-4 font-semibold text-[#13102b]">
                      {t.customerName}
                    </td>
                    <td className="py-4 text-gray-400 font-mono text-[11px]">
                      {t.time}
                    </td>
                    <td className="py-4 text-gray-600">
                      {t.itemsCount} piece(s)
                    </td>
                    <td className="py-4">
                      <span className="px-2.5 py-1 rounded-full text-[9px] font-bold bg-gray-50 border border-gray-200/80 text-brand-gold">
                        {t.paymentMode}
                      </span>
                    </td>
                    <td className="py-4 text-gray-500">
                      {t.cashier}
                    </td>
                    <td className="py-4 font-bold text-brand-gold">
                      ₹{t.total.toLocaleString("en-IN")}
                    </td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold ${
                        t.status === "Completed"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                          : "bg-rose-50 text-rose-600 border border-rose-200"
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <button
                        onClick={() => window.print()}
                        className="p-2 rounded-xl bg-gray-50 hover:bg-brand-gold hover:text-white text-gray-600 transition-all"
                        title="Reprint Bill"
                      >
                        <Printer size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
