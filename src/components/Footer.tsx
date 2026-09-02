"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PORTAL_ROUTES = [
  "/dashboard",
  "/brands",
  "/categorysetup",
  "/products",
  "/attribute",
  "/coupons",
  "/payments",
  "/orderupdate",
  "/pos",
  "/productreport",
  "/orderreport",
  "/hero",
  "/header",
  "/middle",
  "/bottom",
  "/insta",
  "/about-top",
  "/about-identity",
  "/about-bottom",
  "/review",
  "/site-info",
  "/videos",
  "/createsub",
  "/messages",
  "/customer",
  "/login",
];

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const pathname = usePathname();

  const isPortal = pathname ? PORTAL_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/")) : false;
  if (isPortal) return null;


  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Handbags", href: "/handbags" },
    { name: "Footwear", href: "/footwear" },
    { name: "Belts", href: "/belts" },
    { name: "Stoles", href: "/stoles" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  const clientCareLinks = [
    { name: "Private Showroom Appointments", href: "/contact" },
    { name: "Bespoke Monogramming Service", href: "/contact" },
    { name: "Sizing & Fitting Assistance", href: "/contact" },
    { name: "Worldwide Insured Delivery", href: "/contact" },
    { name: "Authenticity & Heritage", href: "/about" },
  ];

  return (
    <footer className="luxury-site-footer">
      {/* Top Gold Accent Bar */}
      <div className="footer-gold-glow"></div>

      <div className="footer-container">
        {/* Main 4-Column Grid */}
        <div className="footer-main-grid">
          {/* Column 1: Brand Info */}
          <div className="footer-col brand-col">
            <Link href="/" className="footer-brand-logo">
              <span className="logo-main">RAKVIH</span>
              <span className="logo-sub">ORIGINALS</span>
            </Link>
            <p className="footer-manifesto">
              Crafting permanent luxury objects where Italian artisanal mastery converges with modern architectural design.
            </p>
            <div className="footer-contact-snippet">
              <a href="mailto:contact@rakvihoriginals.com" className="footer-email-link">
                contact@rakvihoriginals.com
              </a>
              <span className="footer-phone-snippet">+1 (212) 888-0018</span>
            </div>
          </div>

          {/* Column 2: Quick Links (All Header Links) */}
          <div className="footer-col">
            <h4 className="footer-col-title">QUICK LINKS</h4>
            <ul className="footer-links-list quick-links-grid">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Client Care */}
          <div className="footer-col">
            <h4 className="footer-col-title">CLIENT CARE</h4>
            <ul className="footer-links-list">
              {clientCareLinks.map((item, idx) => (
                <li key={idx}>
                  <Link href={item.href}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="footer-col newsletter-col">
            <h4 className="footer-col-title">NEWSLETTER</h4>
            <p className="newsletter-desc">
              Subscribe to receive private previews of new editions and private showroom invitations.
            </p>

            {subscribed ? (
              <div className="footer-subscribed-msg">
                <span>✓ Thank you for subscribing.</span>
              </div>
            ) : (
              <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="newsletter-input"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="newsletter-submit-btn">
                  <span>SUBSCRIBE</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © {new Date().getFullYear()} RAKVIH ORIGINALS. ALL RIGHTS RESERVED.
          </p>
          <div className="footer-legal-links">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms & Conditions</Link>
            <Link href="/contact">Showrooms: Paris • Milan • New York • Dubai</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
