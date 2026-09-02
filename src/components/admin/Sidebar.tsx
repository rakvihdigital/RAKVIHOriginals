"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingCart, ClipboardList, ListTree, Package, Mail,
  Megaphone, FileText, Users, Shield, Lock, Info,
  LogOut, LayoutDashboard,
  CreditCard, CheckCircle, Sparkles, Ticket,
  X, ChevronRight
} from "lucide-react";

interface SidebarProps {
  role: "admin" | "subadmin";
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function Sidebar({ role, mobileOpen = false, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const menu = [
    { label: "OVERVIEW", href: "/dashboard", icon: <LayoutDashboard size={20} strokeWidth={1.5} /> },
    {
      label: "BRAND",
      icon: <Shield size={20} strokeWidth={1.5} />,
      subMenu: [
        { label: "New Brands", href: "/brands/newbrands" },
        { label: "List Brands", href: "/brands/listbrands" },
      ],
    },
    {
      label: "CATEGORY",
      icon: <ListTree size={20} strokeWidth={1.5} />,
      subMenu: [
        { label: "Main Category", href: "/categorysetup/category" },
        { label: "Subcategory", href: "/categorysetup/subcategory" },
        { label: "Deep Subcategory", href: "/categorysetup/subsubcategory" },
      ],
    },
    {
      label: "PRODUCTS",
      icon: <Package size={20} strokeWidth={1.5} />,
      subMenu: [
        { label: "Add New", href: "/products/addproducts" },
        { label: "All Products", href: "/products/listproducts" },
        { label: "Stock", href: "/products/restock" },
        { label: "Attributes", href: "/attribute" },
      ],
    },
    { label: "COUPONS", href: "/coupons", icon: <Ticket size={20} strokeWidth={1.5} /> },
    {
      label: "PAYMENTS",
      icon: <CreditCard size={20} strokeWidth={1.5} />,
      subMenu: [
        { label: "UPI Scanner", href: "/payments/upi-scanner" },
        { label: "Pay Approvals", href: "/payments/approvals" },
      ],
    },
    { label: "ORDERS", href: "/orderupdate", icon: <ShoppingCart size={20} strokeWidth={1.5} /> },
    {
      label: "POS",
      icon: <ClipboardList size={20} strokeWidth={1.5} />,
      subMenu: [
        { label: "Terminal", href: "/pos" },
        { label: "History", href: "/pos/poslisting" },
      ],
    },
    {
      label: "REPORTS",
      icon: <FileText size={20} strokeWidth={1.5} />,
      subMenu: [
        { label: "Product Stats", href: "/productreport" },
        { label: "Order Stats", href: "/orderreport" },
      ],
    },
    {
      label: "HOME PAGE",
      icon: <Megaphone size={20} strokeWidth={1.5} />,
      subMenu: [
        { label: "Banners", href: "/hero" },
        { label: "Header", href: "/header" },
        { label: "Middle", href: "/middle" },
        { label: "Bottom", href: "/bottom" },
        { label: "Instagram", href: "/insta" },
      ],
    },
    {
      label: "ABOUT US",
      icon: <Sparkles size={20} strokeWidth={1.5} />,
      subMenu: [
        { label: "Top Section", href: "/about-top" },
        { label: "Identity", href: "/about-identity" },
        { label: "Gallery", href: "/about-bottom" },
      ],
    },
    { label: "REVIEWS", href: "/review", icon: <CheckCircle size={20} strokeWidth={1.5} /> },
    { label: "SITE INFO", href: "/site-info", icon: <Info size={20} strokeWidth={1.5} /> },
    { label: "VIDEOS", href: "/videos", icon: <Users size={20} strokeWidth={1.5} /> },
    { label: "ADMINS", href: "/createsub", icon: <Lock size={20} strokeWidth={1.5} /> },
    { label: "ENQUIRIES", href: "/messages", icon: <Mail size={20} strokeWidth={1.5} /> },
    { label: "USERS", href: "/customer", icon: <Users size={20} strokeWidth={1.5} /> },
  ];

  useEffect(() => {
    menu.forEach((item) => {
      if (item.subMenu) {
        const isActive = item.subMenu.some((sub) => pathname === sub.href);
        if (isActive) setOpenMenu(item.label);
      }
    });
  }, [pathname]);

  const filteredMenu = role === "subadmin"
    ? menu.filter(m => ["OVERVIEW", "POS", "ORDERS", "PRODUCTS", "PAYMENTS", "COUPONS"].includes(m.label))
    : menu;

  return (
    <>
      {mobileOpen && (
        <div onClick={onCloseMobile} className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm" />
      )}

      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50
          w-[260px] shrink-0 h-screen flex flex-col
          border-r border-[#1e1a3a] shadow-2xl lg:shadow-none
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        style={{ background: "#13102b", fontFamily: "var(--font-body)" }}
      >
        {/* ── LOGO & HEADER ── */}
        <div className="flex items-start justify-between px-6 pt-8 pb-4">
          <div>
            <Link href="/dashboard" className="block">
              <div className="w-[110px] py-2 rounded-lg border border-brand-gold/30 bg-brand-gold/5 flex flex-col items-center justify-center mb-3">
                <span className="text-[13px] font-bold text-brand-gold tracking-[0.15em] text-center leading-tight" style={{ fontFamily: "var(--font-serif)" }}>
                  RAKVIH
                </span>
                <span className="text-[7px] tracking-[0.25em] text-brand-gold/60">ORIGINALS</span>
              </div>
            </Link>
            <div className="flex items-center gap-2 text-brand-gold/70">
              <Shield size={12} strokeWidth={1.5} />
              <span className="text-[9px] font-bold tracking-[0.2em] uppercase">Executive Portal</span>
            </div>
          </div>

          <button 
            onClick={onCloseMobile} 
            className="lg:hidden mt-1 p-2 text-white/50 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mx-6 h-px bg-white/[0.06] my-2" />

        {/* ── NAV ── */}
        <nav className="flex-1 px-4 overflow-y-auto no-scrollbar pb-6">
          <div className="space-y-1">
            {filteredMenu.map((item) => {
              const isActive = pathname === item.href;
              const isChildActive = item.subMenu?.some((s) => pathname === s.href);
              const isHighlighted = isActive || isChildActive;
              const isOpen = openMenu === item.label;

              return (
                <div key={item.label}>
                  {item.subMenu ? (
                    <>
                      <button
                        onClick={() => setOpenMenu(isOpen ? null : item.label)}
                        className={`
                          w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group text-left
                          ${isHighlighted ? "bg-brand-gold/10 text-brand-gold" : "text-white/60 hover:bg-white/5 hover:text-white"}
                        `}
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <span className={isHighlighted ? "text-brand-gold" : "text-white/40 group-hover:text-white/70 transition-colors"}>
                            {item.icon}
                          </span>
                          <span className="text-xs font-semibold tracking-[0.08em]">{item.label}</span>
                        </div>
                        <ChevronRight
                          size={14}
                          className={`transition-transform duration-200 shrink-0 opacity-40 ${isOpen ? "rotate-90" : ""}`}
                        />
                      </button>

                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[400px] opacity-100 mt-1 mb-2" : "max-h-0 opacity-0"}`}>
                        <div className="ml-[26px] pl-4 border-l border-white/10 space-y-1 py-1">
                          {item.subMenu.map((sub) => {
                            const subActive = pathname === sub.href;
                            return (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                onClick={onCloseMobile}
                                className={`
                                  block px-3 py-2 rounded-lg text-[11px] font-medium tracking-wide transition-all
                                  ${subActive ? "text-brand-gold bg-brand-gold/5" : "text-white/40 hover:text-white/80 hover:bg-white/5"}
                                `}
                              >
                                {sub.label}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href!}
                      onClick={onCloseMobile}
                      className={`
                        flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all group
                        ${isActive ? "bg-brand-gold/10 text-brand-gold" : "text-white/60 hover:bg-white/5 hover:text-white"}
                      `}
                    >
                      <span className={isActive ? "text-brand-gold" : "text-white/40 group-hover:text-white/70 transition-colors"}>
                        {item.icon}
                      </span>
                      <span className="text-xs font-semibold tracking-[0.08em]">{item.label}</span>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* ── END SESSION ── */}
        <div className="p-5 border-t border-white/[0.06] bg-[#13102b]">
          <Link
            href="/login"
            className="w-full py-3.5 bg-brand-gold/10 text-brand-gold border border-brand-gold/20 text-[10px] font-bold uppercase tracking-[0.15em] rounded-xl transition-all hover:bg-brand-gold hover:text-[#13102b] flex items-center justify-center gap-2"
          >
            <LogOut size={16} strokeWidth={1.5} />
            End Session
          </Link>
        </div>
      </aside>
    </>
  );
}