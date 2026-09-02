"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, User, Heart } from "lucide-react";

const PORTAL_ROUTES = [
  "/dashboard", "/brands", "/categorysetup", "/products", "/attribute",
  "/coupons", "/payments", "/orderupdate", "/pos", "/productreport",
  "/orderreport", "/hero", "/header", "/middle", "/bottom", "/insta",
  "/about-top", "/about-identity", "/about-bottom", "/review", "/site-info",
  "/videos-admin", "/createsub", "/messages", "/customer", "/login",
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isPortal = pathname ? PORTAL_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/")) : false;

  // Static mocked states as requested
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll only for mobile drawer
  useEffect(() => {
    if (menuOpen && window.innerWidth <= 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // NEW CONTENTS FROM USER'S CODE
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Fashion Studio", href: "/Gproducts" },
    { name: "Videos", href: "/videos" },
    { name: "Handbags", href: "/handbags" },
    { name: "Footwear", href: "/footwear" },
    { name: "Belts", href: "/belts" },
    { name: "Stoles", href: "/stoles" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  if (isPortal) return null;

  return (
    <>
      {/* ── DESKTOP HEADER WITH LEFT BRAND TITLE & RIGHT EXPANDING DRAWER ── */}
      <header className={`desktop-header-bar ${scrolled ? "is-scrolled" : ""}`}>
        <div className="desktop-header-inner flex items-center justify-between w-full">
          {/* Left Corner: Aesthetic Brand Title */}
          <Link href="/" className="header-brand-mark" aria-label="RAKVIH Originals">
            <span className="brand-mark-main">RAKVIH</span>
            <span className="brand-mark-sub">ORIGINALS</span>
          </Link>

          {/* Right Side: Horizontal Expanding Drawer & Actions */}
          <div className="flex items-center gap-6">
            
            {/* Quick Actions (Cart, Wishlist, Account) */}
            <div className="flex items-center gap-4 text-white pointer-events-auto mix-blend-difference">
              {isAuthenticated ? (
                <>
                  <Link href="/wishlist" className="hover:text-brand-gold transition-colors">
                    <Heart size={18} />
                  </Link>
                  <Link href="/cart" className="hover:text-brand-gold transition-colors relative">
                    <ShoppingCart size={18} />
                    {cartCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-brand-gold text-brand-blue text-[9px] font-bold rounded-full flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                  <Link href="/order" className="hover:text-brand-gold transition-colors">
                    <User size={18} />
                  </Link>
                </>
              ) : (
                <button onClick={() => router.push('/login')} className="text-xs font-bold uppercase tracking-widest hover:text-brand-gold transition-colors">
                  Login
                </button>
              )}
            </div>

            <div className={`header-drawer-wrapper right-drawer ${menuOpen ? "drawer-expanded" : ""}`}>
              {/* The Horizontal Drawer that smoothly expands to the left */}
              <div className="horizontal-nav-drawer" aria-hidden={!menuOpen}>
                <div className="horizontal-drawer-track">
                  <nav className="horizontal-nav-list">
                    {navItems.map((item) => {
                      const isCurrent = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`h-nav-link ${isCurrent ? "is-active" : ""}`}
                          onClick={() => setMenuOpen(false)}
                        >
                          <span className="h-nav-label">{item.name}</span>
                        </Link>
                      );
                    })}
                  </nav>
                  <button
                    type="button"
                    className="drawer-inline-close"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close menu drawer"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* The 3-Stripe Trigger Button */}
              <button
                type="button"
                className={`drawer-trigger-stripe ${menuOpen ? "active" : ""}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                <div className="stripe-stack">
                  <span className="h-stripe h-stripe-1"></span>
                  <span className="h-stripe h-stripe-2"></span>
                  <span className="h-stripe h-stripe-3"></span>
                </div>
                <span className="drawer-btn-text">{menuOpen ? "CLOSE" : "MENU"}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── MOBILE HEADER (MOBILE ONLY) ── */}
      <div className="mobile-header-bar">
        <Link href="/" className="mobile-header-logo">
          <span>RAKVIH</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative text-white pointer-events-auto">
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-brand-gold text-brand-blue text-[9px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            className={`mobile-stripe-btn ${menuOpen ? "is-open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle mobile menu"
          >
            <div className="stripe-stack">
              <span className="h-stripe h-stripe-1"></span>
              <span className="h-stripe h-stripe-2"></span>
              <span className="h-stripe h-stripe-3"></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Slide-In Sidebar (Mobile only) */}
      <div className={`mobile-sidebar-drawer ${menuOpen ? "mobile-drawer-open" : ""}`}>
        <div className="mobile-backdrop" onClick={() => setMenuOpen(false)}></div>
        <aside className="mobile-sidebar-panel">
          <div className="mobile-sidebar-top">
            <span className="mobile-panel-title">DIRECTORY</span>
            <button
              type="button"
              className="mobile-close-btn"
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation"
            >
              ✕
            </button>
          </div>
          
          <ul className="mobile-sidebar-list">
            {navItems.map((item, idx) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`mobile-sidebar-link ${pathname === item.href ? "is-active" : ""}`}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="mobile-nav-num">0{idx + 1}</span>
                  <span className="mobile-nav-title">{item.name}</span>
                  <span className="mobile-nav-arrow">→</span>
                </Link>
              </li>
            ))}

            {/* Mobile Auth Links */}
            {!isAuthenticated ? (
              <li>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    router.push('/login');
                  }}
                  className="mobile-sidebar-link text-brand-gold mt-4"
                >
                  <span className="mobile-nav-title">LOGIN / SIGNUP</span>
                </button>
              </li>
            ) : (
              <li>
                <Link
                  href="/order"
                  className="mobile-sidebar-link mt-4"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="mobile-nav-title">MY ACCOUNT</span>
                </Link>
              </li>
            )}
          </ul>

          <div className="mobile-sidebar-bottom">
            <span className="mobile-salon-label">VIP CONCIERGE</span>
            <p>concierge@rakvihoriginals.com</p>
          </div>
        </aside>
      </div>
    </>
  );
}
