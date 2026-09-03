"use client";

import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  ShoppingCart, Search, Filter, Truck, CheckCircle2,
  Clock, Eye, Package, Printer, ExternalLink, Sparkles
} from "lucide-react";
import { initialOrders, Order } from "@/lib/adminData";

export default function OrderUpdatePage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((ord) => {
    const matchesStatus = statusFilter === "All" || ord.orderStatus === statusFilter;
    const matchesSearch =
      ord.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.customerPhone.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = (orderId: string, newStatus: Order["orderStatus"]) => {
    setOrders(
      orders.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o))
    );
    if (activeOrder?.id === orderId) {
      setActiveOrder({ ...activeOrder, orderStatus: newStatus });
    }
  };

  const handleTrackingUpdate = (orderId: string, trackingNumber: string) => {
    setOrders(
      orders.map((o) => (o.id === orderId ? { ...o, trackingNumber } : o))
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-gold text-[10px] font-bold uppercase tracking-wider mb-1">
              <ShoppingCart size={14} />
              <span>Fulfillment Operations</span>
            </div>
            <h2 className="text-lg font-bold text-[#13102b]">Atelier Orders Desk</h2>
          </div>

          {/* Status Pipeline Pill Filters */}
          <div className="flex flex-wrap items-center gap-1.5 bg-white border border-gray-200/80 p-1.5 rounded-lg">
            {["All", "Pending", "Confirmed", "Crafting", "Dispatched", "Delivered"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  statusFilter === s
                    ? "bg-brand-gold text-brand-blue font-black shadow-md"
                    : "text-gray-500 hover:text-[#13102b]"
                }`}
              >
                {s}
              </button>
            ))}
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
              placeholder="Search by Order number (e.g. RAK-90481), customer name, or phone..."
              className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2.5 pl-11 pr-4 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
            />
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white border border-gray-200/80 rounded-xl p-5">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[600px]">
              <thead>
                <tr className="text-[10px] font-bold uppercase tracking-wider text-brand-gold border-b border-gray-100 pb-3">
                  <th className="pb-3">Order Number</th>
                  <th className="pb-3">Client Information</th>
                  <th className="pb-3">Curated Pieces</th>
                  <th className="pb-3">Total Amount</th>
                  <th className="pb-3">Payment</th>
                  <th className="pb-3">Fulfillment Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4">
                      <div className="font-mono font-bold text-[#13102b] text-sm">{ord.orderNumber}</div>
                      <div className="text-[10px] text-gray-400">{ord.date}</div>
                    </td>
                    <td className="py-4">
                      <div className="font-bold text-[#13102b]">{ord.customerName}</div>
                      <div className="text-[10px] text-gray-400">{ord.customerPhone}</div>
                    </td>
                    <td className="py-4">
                      <div className="text-[#13102b] font-medium">{ord.items.length} Unique Edition(s)</div>
                      <div className="text-[10px] text-brand-gold truncate max-w-xs">
                        {ord.items.map((i) => `${i.quantity}x ${i.productName}`).join(", ")}
                      </div>
                    </td>
                    <td className="py-4 font-bold text-brand-gold text-sm">
                      ₹{ord.totalAmount.toLocaleString("en-IN")}
                    </td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold ${
                        ord.paymentStatus === "Verified"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                          : "bg-amber-50 text-amber-600 border border-amber-200"
                      }`}>
                        {ord.paymentStatus}
                      </span>
                      <div className="text-[9px] text-gray-400 mt-1">{ord.paymentMethod}</div>
                    </td>
                    <td className="py-4">
                      <select
                        value={ord.orderStatus}
                        onChange={(e) => handleStatusChange(ord.id, e.target.value as any)}
                        className="bg-gray-50 border border-brand-gold/40 rounded-xl py-1.5 px-3 text-xs font-bold text-brand-gold focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10 cursor-pointer"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Crafting">Crafting / Atelier</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-4 text-right">
                      <button
                        onClick={() => setActiveOrder(ord)}
                        className="px-3 py-1.5 rounded-xl bg-gray-50 hover:bg-brand-gold hover:text-white text-gray-700 font-bold text-xs uppercase transition-all"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Details Drawer / Modal */}
        {activeOrder && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-white border border-brand-gold/40 rounded-xl p-6 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200/80 mb-6">
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#13102b]">
                    Order Dossier {activeOrder.orderNumber}
                  </h3>
                  <p className="text-xs text-brand-gold font-mono">{activeOrder.date}</p>
                </div>
                <button
                  onClick={() => setActiveOrder(null)}
                  className="p-2 text-gray-400 hover:text-[#13102b] text-base"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6 text-xs">
                {/* Client & Shipping */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-1.5">
                    <span className="text-[9px] uppercase tracking-wider text-brand-gold font-black block">Client Profile</span>
                    <p className="font-bold text-[#13102b] text-sm">{activeOrder.customerName}</p>
                    <p className="text-gray-500">{activeOrder.customerEmail}</p>
                    <p className="text-gray-500">{activeOrder.customerPhone}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-1.5">
                    <span className="text-[9px] uppercase tracking-wider text-brand-gold font-black block">Delivery Address</span>
                    <p className="text-gray-700 leading-relaxed">{activeOrder.shippingAddress}</p>
                    {activeOrder.trackingNumber && (
                      <p className="text-[10px] text-brand-gold font-mono pt-1">
                        Tracking: {activeOrder.trackingNumber}
                      </p>
                    )}
                  </div>
                </div>

                {/* Items Breakdown */}
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-3">
                    Curated Items Breakdown
                  </h4>
                  <div className="space-y-3">
                    {activeOrder.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.productName}
                            className="w-10 h-10 rounded-lg object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/handbag.webp";
                            }}
                          />
                          <div>
                            <p className="font-bold text-[#13102b]">{item.productName}</p>
                            <p className="text-[10px] text-gray-400 font-mono">SKU: {item.sku} • Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-bold text-brand-gold">₹{item.price.toLocaleString("en-IN")}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total and Print */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200/80">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Grand Total</span>
                    <span className="text-xl font-serif font-bold text-[#13102b]">₹{activeOrder.totalAmount.toLocaleString("en-IN")}</span>
                  </div>

                  <button
                    onClick={() => window.print()}
                    className="px-6 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-gold-light text-brand-blue font-black uppercase tracking-wider text-xs flex items-center gap-2"
                  >
                    <Printer size={14} />
                    <span>Print Invoice</span>
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
