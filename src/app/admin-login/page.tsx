"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Gem, Lock, Mail, ArrowRight, ShieldCheck, UserCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@rakvihoriginals.com");
  const [password, setPassword] = useState("••••••••••••");
  const [role, setRole] = useState<"admin" | "subadmin">("admin");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    localStorage.setItem("rakvih_admin_role", role);
    setTimeout(() => {
      router.push("/admin/dashboard");
    }, 600);
  };

  const handleDemoFill = (selectedRole: "admin" | "subadmin") => {
    setRole(selectedRole);
    if (selectedRole === "admin") {
      setEmail("admin@rakvihoriginals.com");
      setPassword("MaisonSupreme2026");
    } else {
      setEmail("pos.terminal@rakvihoriginals.com");
      setPassword("SubAdminVault2026");
    }
  };

  return (
    <div className="login-wrapper">
      {/* Background ambient gold glows */}
      <div className="login-glow login-glow--top" />
      <div className="login-glow login-glow--bottom" />

      <div className="login-container">
        {/* Brand Header */}
        <div className="login-brand">
          <div className="login-brand-icon">
            <Gem size={28} />
          </div>
          <h1 className="login-brand-name">RAKVIH</h1>
          <p className="login-brand-tag">Executive Portal &amp; Atelier Console</p>
        </div>

        {/* Login Card */}
        <div className="login-card">
          {/* Top subtle highlight */}
          <div className="login-card-highlight" />

          {/* Role selector tabs */}
          <div className="login-role-tabs">
            <button
              type="button"
              onClick={() => handleDemoFill("admin")}
              className={`login-role-tab${role === "admin" ? " active" : ""}`}
            >
              <ShieldCheck size={14} />
              <span>Super Admin</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill("subadmin")}
              className={`login-role-tab${role === "subadmin" ? " active" : ""}`}
            >
              <UserCheck size={14} />
              <span>Sub-Admin</span>
            </button>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div>
              <label className="login-field-label">
                Executive Credential (Email)
              </label>
              <div className="login-input-wrap">
                <Mail size={16} className="login-input-icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="login-input"
                  placeholder="name@rakvihoriginals.com"
                />
              </div>
            </div>

            <div>
              <div className="login-field-head">
                <label className="login-field-label">Security Passcode</label>
                <span className="login-reset-link">Reset Key?</span>
              </div>
              <div className="login-input-wrap">
                <Lock size={16} className="login-input-icon" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="login-input"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="login-submit-btn"
            >
              {loading ? (
                <span>Authenticating Atelier Token...</span>
              ) : (
                <>
                  <span>Authorize Access</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Access hint */}
          <div className="login-demo-hint">
            <p>Instant Demo Access for Inspection:</p>
            <div className="login-demo-buttons">
              <button onClick={() => handleDemoFill("admin")} className="login-demo-btn">
                Auto-fill Admin
              </button>
              <button onClick={() => handleDemoFill("subadmin")} className="login-demo-btn">
                Auto-fill Sub-Admin
              </button>
            </div>
          </div>
        </div>

        {/* Back to Boutique */}
        <div className="login-back-wrap">
          <Link href="/" className="login-back-link">
            <span>← Return to Public Boutique</span>
          </Link>
        </div>
      </div>
    </div>
  );
}