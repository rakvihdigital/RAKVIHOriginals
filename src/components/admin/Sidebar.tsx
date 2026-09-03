"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingCart,
  Users,
  Shield,
  Lock,
  LogOut,
  LayoutDashboard,
  CheckCircle,
  X,
  ChevronRight,
} from "lucide-react";

interface SubMenuItem {
  label: string;
  href: string;
}

interface MenuItem {
  label: string;
  href?: string;
  icon: React.ReactNode;
  subMenu?: SubMenuItem[];
}

interface SidebarProps {
  role: "admin" | "subadmin";
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function Sidebar({ role, mobileOpen = false, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const menu: MenuItem[] = [
    { label: "OVERVIEW", href: "/admin/dashboard", icon: <LayoutDashboard size={16} strokeWidth={1.5} /> },
    { label: "List Brands", href: "/admin/listbrands", icon: <CheckCircle size={16} strokeWidth={1.5} /> },
    { label: "Category", href: "/admin/categorysetup", icon: <CheckCircle size={16} strokeWidth={1.5} /> },
    { label: "PRODUCTS", href: "/admin/products", icon: <CheckCircle size={16} strokeWidth={1.5} /> },
    { label: "ORDERS", href: "/admin/orderupdate", icon: <ShoppingCart size={16} strokeWidth={1.5} /> },
    { label: "ADMINS", href: "/admin/createsub", icon: <Lock size={16} strokeWidth={1.5} /> },
    { label: "USERS", href: "/customer", icon: <Users size={16} strokeWidth={1.5} /> },
  ];

  // Subadmins see everything except the ADMINS section (creating/managing
  // other admins is an owner-only action). Adjust this list if subadmin
  // access should be narrower or wider.
  const filteredMenu =
    role === "subadmin" ? menu.filter((m) => m.label !== "ADMINS") : menu;

  return (
    <>
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
        />
      )}

      <aside className={`exec-sidebar ${mobileOpen ? "mobile-open" : ""}`}>
        <div className="exec-sidebar-glow-top" />
        <div className="exec-sidebar-glow-bottom" />

        {/* Header */}
        <div className="exec-sidebar-header">
          <div className="flex items-start justify-between">
            <Link href="/dashboard" className="exec-sidebar-badge">
              <span className="exec-sidebar-badge-main">RAKVIH</span>
              <span className="exec-sidebar-badge-sub">ORIGINALS</span>
            </Link>

            <button onClick={onCloseMobile} className="exec-sidebar-close-btn lg:hidden">
              <X size={18} />
            </button>
          </div>

          <div className="exec-sidebar-portal-row">
            <span className="exec-sidebar-portal-icon">
              <Shield size={11} strokeWidth={2} />
            </span>
            <span className="exec-sidebar-portal-label">Executive Portal</span>
          </div>
        </div>

        <div className="exec-sidebar-divider" />

        {/* Nav */}
        <nav className="exec-sidebar-nav no-scrollbar">
          <div className="exec-sidebar-nav-list">
            {filteredMenu.map((item) => {
              const isActive = pathname === item.href;
              const isChildActive = item.subMenu?.some((s) => pathname === s.href) ?? false;
              const isHighlighted = isActive || isChildActive;
              const isOpen = openMenu === item.label;

              return (
                <div key={item.label}>
                  {item.subMenu ? (
                    <>
                      <button
                        onClick={() => setOpenMenu(isOpen ? null : item.label)}
                        className={`exec-nav-item ${isHighlighted ? "active" : ""}`}
                      >
                        <span className="exec-nav-item-left">
                          <span className="exec-nav-icon">{item.icon}</span>
                          <span className="exec-nav-label">{item.label}</span>
                        </span>
                        <ChevronRight
                          size={13}
                          className={`exec-nav-chevron ${isOpen ? "open" : ""}`}
                        />
                      </button>

                      <div className={`exec-submenu ${isOpen ? "open" : ""}`}>
                        <div className="exec-submenu-track">
                          {item.subMenu.map((sub) => {
                            const subActive = pathname === sub.href;
                            return (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                onClick={onCloseMobile}
                                className={`exec-submenu-link ${subActive ? "active" : ""}`}
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
                      className={`exec-nav-item ${isActive ? "active" : ""}`}
                    >
                      <span className="exec-nav-item-left">
                        <span className="exec-nav-icon">{item.icon}</span>
                        <span className="exec-nav-label">{item.label}</span>
                      </span>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="exec-sidebar-footer">
          <Link href="/login" className="exec-end-session-btn">
            <LogOut size={14} strokeWidth={2} />
            End Session
          </Link>
        </div>
      </aside>
    </>
  );
}