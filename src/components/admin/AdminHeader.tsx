"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Shield, LogOut, User } from "lucide-react";

interface AdminHeaderProps {
  role: "admin" | "subadmin";
  onToggleRole: (newRole: "admin" | "subadmin") => void;
  onOpenMobileSidebar: () => void;
}

export default function AdminHeader({ role, onToggleRole, onOpenMobileSidebar }: AdminHeaderProps) {
  return (
    <header className="h-[56px] bg-white border-b border-gray-200 sticky top-0 z-30 px-6 flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <Menu size={18} />
        </button>
        <div className="flex items-center gap-2 text-gray-400">
          <Shield size={14} strokeWidth={1.5} />
          <span className="text-[10px] font-semibold tracking-[0.15em] uppercase">Secure Session</span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Role Toggle */}
        <div className="hidden sm:flex items-center bg-gray-100 p-[3px] rounded-lg">
          <button
            onClick={() => onToggleRole("admin")}
            className={`px-3 py-1.5 text-[10px] font-bold tracking-wide rounded-md transition-all ${
              role === "admin" ? "bg-[#13102b] text-white shadow-sm" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            ADMIN
          </button>
          <button
            onClick={() => onToggleRole("subadmin")}
            className={`px-3 py-1.5 text-[10px] font-bold tracking-wide rounded-md transition-all ${
              role === "subadmin" ? "bg-[#13102b] text-white shadow-sm" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            SUB-ADMIN
          </button>
        </div>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-[#13102b] flex items-center justify-center">
          <User size={16} className="text-brand-gold" strokeWidth={1.5} />
        </div>

        {/* Sign Out */}
        <Link
          href="/login"
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-[10px] font-bold tracking-[0.1em] uppercase text-gray-500 hover:text-gray-800 hover:border-gray-400 transition-all"
        >
          <LogOut size={13} strokeWidth={1.5} />
          Sign Out
        </Link>
      </div>
    </header>
  );
}
