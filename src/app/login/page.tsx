"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Gem, Sparkles, Lock, Mail, ArrowRight, ShieldCheck, UserCheck } from "lucide-react";

export default function LoginPage() {
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
      router.push("/dashboard");
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
    <div className="min-h-screen bg-[#0b081c] text-[#f5f0eb] flex items-center justify-center p-6 relative overflow-hidden selection:bg-brand-gold selection:text-brand-blue">
      {/* Background ambient gold glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-gold/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#2b2359]/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-gold-dark to-brand-gold shadow-xl shadow-brand-gold/20 mb-4">
            <Gem size={28} className="text-brand-blue" />
          </div>
          <h1 className="text-3xl font-serif font-bold tracking-[0.2em] text-white">
            RAKVIH
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold mt-1">
            Executive Portal & Atelier Console
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#15102d]/80 backdrop-blur-2xl border border-brand-gold/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          {/* Top subtle highlight */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" />

          {/* Role selector tabs */}
          <div className="grid grid-cols-2 gap-2 bg-black/40 p-1.5 rounded-2xl mb-6 border border-white/5">
            <button
              type="button"
              onClick={() => handleDemoFill("admin")}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                role === "admin"
                  ? "bg-brand-gold text-brand-blue shadow-lg font-bold"
                  : "text-white/50 hover:text-white"
              }`}
            >
              <ShieldCheck size={14} />
              <span>Super Admin</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill("subadmin")}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                role === "subadmin"
                  ? "bg-brand-gold text-brand-blue shadow-lg font-bold"
                  : "text-white/50 hover:text-white"
              }`}
            >
              <UserCheck size={14} />
              <span>Sub-Admin</span>
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-brand-gold mb-2">
                Executive Credential (Email)
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-black/30 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-brand-gold transition-colors"
                  placeholder="name@rakvihoriginals.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-gold">
                  Security Passcode
                </label>
                <span className="text-[10px] text-white/40 hover:text-brand-gold cursor-pointer transition-colors">
                  Reset Key?
                </span>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-black/30 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-brand-gold transition-colors"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-brand-gold hover:bg-brand-gold-light text-brand-blue font-black text-xs uppercase tracking-[0.25em] rounded-2xl shadow-xl shadow-brand-gold/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
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
          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <p className="text-[11px] text-white/40 mb-2">
              Instant Demo Access for Inspection:
            </p>
            <div className="flex justify-center gap-2">
              <button
                onClick={() => handleDemoFill("admin")}
                className="text-[10px] px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-brand-gold hover:bg-brand-gold hover:text-brand-blue transition-all"
              >
                Auto-fill Admin
              </button>
              <button
                onClick={() => handleDemoFill("subadmin")}
                className="text-[10px] px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-brand-gold hover:bg-brand-gold hover:text-brand-blue transition-all"
              >
                Auto-fill Sub-Admin
              </button>
            </div>
          </div>
        </div>

        {/* Back to Boutique */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-white/50 hover:text-brand-gold transition-colors inline-flex items-center gap-2 font-medium"
          >
            <span>← Return to Public Boutique</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
