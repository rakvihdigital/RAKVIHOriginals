"use client";

import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  ClipboardList, Search, Plus, Minus, Trash2, CreditCard,
  QrCode, DollarSign, Printer, CheckCircle2, User, Sparkles
} from "lucide-react";
import { initialProducts, Product } from "@/lib/adminData";

interface CartItem {
  product: Product;
  quantity: number;
}

export default function PosPage() {
  const [products] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>([
    { product: initialProducts[0], quantity: 1 },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [paymentMode, setPaymentMode] = useState<"UPI" | "Card" | "Cash">("UPI");
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [customerName, setCustomerName] = useState("VIP Showroom Client");
  const [receiptCompleted, setReceiptCompleted] = useState(false);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const addToCart = (product: Product) => {
    const existing = cart.find((item) => item.product.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(
      cart
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.product.id !== productId));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const taxAmount = (subtotal - discountAmount) * 0.18; // 18% luxury GST
  const grandTotal = subtotal - discountAmount + taxAmount;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setReceiptCompleted(true);
  };

  const handleNewSale = () => {
    setCart([]);
    setReceiptCompleted(false);
    setDiscountPercent(0);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-gold text-[10px] font-bold uppercase tracking-wider mb-1">
              <ClipboardList size={14} />
              <span>Showroom Register</span>
            </div>
            <h2 className="text-lg font-bold text-[#13102b]">POS Terminal Workspace</h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Terminal 01: Flagship Atelier Register</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left 7 cols: Catalog Quick Picker */}
          <div className="lg:col-span-7 space-y-4">
            {/* Search & Categories Bar */}
            <div className="bg-white border border-gray-200/80 rounded-lg p-3 flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Scan barcode or type piece name / SKU..."
                  className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2 pl-10 pr-3 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-gray-50 border border-gray-200/80 rounded-xl py-2 px-3 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10 w-full sm:w-auto"
              >
                <option value="All">All Departments</option>
                <option value="Handbags & Clutches">Handbags</option>
                <option value="Artisanal Footwear">Footwear</option>
                <option value="Bespoke Belts">Belts</option>
                <option value="Silk & Cashmere Stoles">Stoles</option>
                <option value="Eyewear & Optical">Eyewear</option>
              </select>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[620px] overflow-y-auto no-scrollbar pr-1">
              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className="bg-white border border-gray-200/80 hover:border-brand-gold/50 rounded-lg p-3.5 text-left transition-all group flex flex-col justify-between shadow-lg"
                >
                  <div className="w-full h-32 rounded-xl bg-gray-50 overflow-hidden mb-3 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/handbag.webp";
                      }}
                    />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-brand-gold block truncate">
                      {product.brand}
                    </span>
                    <h4 className="text-xs font-bold text-[#13102b] line-clamp-1 mt-0.5">
                      {product.name}
                    </h4>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                      <span className="text-xs font-bold text-brand-gold">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-[9px] text-gray-400">Stock: {product.stock}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right 5 cols: Live Cart & Tender */}
          <div className="lg:col-span-5 bg-white border border-brand-gold/40 rounded-xl p-6 flex flex-col justify-between">
            {receiptCompleted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#13102b]">Sale Completed & Billed</h3>
                <p className="text-xs text-gray-400 font-mono">
                  Receipt #POS-{Math.floor(100000 + Math.random() * 900000)} Generated
                </p>
                <div className="pt-4 flex flex-col gap-2">
                  <button
                    onClick={() => window.print()}
                    className="w-full py-3 bg-gray-50 hover:bg-gray-100 text-[#13102b] rounded-xl text-xs font-bold uppercase flex items-center justify-center gap-2 border border-gray-200/80"
                  >
                    <Printer size={14} />
                    <span>Print Customer Receipt</span>
                  </button>
                  <button
                    onClick={handleNewSale}
                    className="w-full py-3.5 bg-brand-gold hover:bg-brand-gold-light text-brand-blue rounded-xl text-xs font-black uppercase tracking-wider"
                  >
                    Next Customer Sale
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {/* Cart Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-gray-200/80">
                    <div>
                      <h3 className="text-base font-serif font-bold text-[#13102b]">Live Tender Bill</h3>
                      <p className="text-[10px] text-brand-gold">{cart.length} Item(s) in Register</p>
                    </div>
                    <button
                      onClick={() => setCart([])}
                      className="text-[10px] text-rose-600 hover:underline font-bold"
                    >
                      Clear All
                    </button>
                  </div>

                  {/* Customer field */}
                  <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl border border-gray-100 text-xs">
                    <User size={14} className="text-brand-gold ml-1" />
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Customer Name / VIP Phone"
                      className="bg-transparent border-none text-[#13102b] focus:outline-none flex-1 text-xs"
                    />
                  </div>

                  {/* Cart items list */}
                  <div className="space-y-2 max-h-56 overflow-y-auto no-scrollbar pr-1">
                    {cart.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-xs"
                      >
                        <div className="flex-1 min-w-0 pr-2">
                          <p className="font-bold text-[#13102b] truncate">{item.product.name}</p>
                          <p className="text-[10px] text-brand-gold">₹{item.product.price.toLocaleString("en-IN")}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, -1)}
                            className="p-1 rounded bg-gray-100 text-gray-500 hover:text-[#13102b]"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="font-bold text-[#13102b] w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, 1)}
                            className="p-1 rounded bg-gray-100 text-gray-500 hover:text-[#13102b]"
                          >
                            <Plus size={10} />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-1 text-rose-600 hover:text-rose-300 ml-1"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                    {cart.length === 0 && (
                      <div className="py-8 text-center text-xs text-gray-400 italic">
                        Select items from the catalog to add to bill.
                      </div>
                    )}
                  </div>

                  {/* Discount selector */}
                  <div className="flex items-center justify-between gap-2 pt-2">
                    <span className="text-[10px] uppercase tracking-wider text-gray-400">VIP Discount:</span>
                    <div className="flex gap-1">
                      {[0, 5, 10, 15, 20].map((d) => (
                        <button
                          key={d}
                          onClick={() => setDiscountPercent(d)}
                          className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                            discountPercent === d
                              ? "bg-brand-gold text-brand-blue"
                              : "bg-gray-50 text-gray-500 hover:text-[#13102b]"
                          }`}
                        >
                          {d}%
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="pt-3 border-t border-gray-200/80 space-y-1.5 text-xs">
                    <div className="flex justify-between text-gray-500">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toLocaleString("en-IN")}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-brand-gold">
                        <span>VIP Privilege Discount ({discountPercent}%)</span>
                        <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-gray-500">
                      <span>Luxury GST (18%)</span>
                      <span>₹{Math.round(taxAmount).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-[#13102b] pt-2 border-t border-gray-200/80">
                      <span>Total Payable</span>
                      <span className="text-brand-gold text-base">₹{Math.round(grandTotal).toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  {/* Payment Mode */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                      Tender Settlement Mode
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMode("UPI")}
                        className={`p-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition-all ${
                          paymentMode === "UPI"
                            ? "bg-brand-gold text-brand-blue border-brand-gold"
                            : "bg-gray-50 text-gray-500 border-gray-200/80 hover:text-[#13102b]"
                        }`}
                      >
                        <QrCode size={14} />
                        <span>UPI Scan</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMode("Card")}
                        className={`p-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition-all ${
                          paymentMode === "Card"
                            ? "bg-brand-gold text-brand-blue border-brand-gold"
                            : "bg-gray-50 text-gray-500 border-gray-200/80 hover:text-[#13102b]"
                        }`}
                      >
                        <CreditCard size={14} />
                        <span>Card Swipe</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMode("Cash")}
                        className={`p-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition-all ${
                          paymentMode === "Cash"
                            ? "bg-brand-gold text-brand-blue border-brand-gold"
                            : "bg-gray-50 text-gray-500 border-gray-200/80 hover:text-[#13102b]"
                        }`}
                      >
                        <DollarSign size={14} />
                        <span>Cash Desk</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Complete Sale Button */}
                <button
                  onClick={handleCheckout}
                  disabled={cart.length === 0}
                  className="w-full mt-4 py-4 bg-brand-gold hover:bg-brand-gold-light text-brand-blue font-black text-xs uppercase tracking-widest rounded-lg shadow-brand-gold/20 transition-all disabled:opacity-50"
                >
                  Authorize & Print POS Receipt (₹{Math.round(grandTotal).toLocaleString("en-IN")})
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
