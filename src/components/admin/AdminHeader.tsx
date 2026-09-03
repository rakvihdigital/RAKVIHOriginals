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
    <header className="admin-header">
      {/* Left */}
      <div className="admin-header-left">
        <button onClick={onOpenMobileSidebar} className="admin-header-menu-btn">
          <Menu size={18} />
        </button>
        <div className="admin-header-session">
          <Shield size={14} strokeWidth={1.5} />
          <span>Secure Session</span>
        </div>
      </div>

      {/* Right */}
      <div className="admin-header-right">
        {/* Role Toggle */}
        <div className="admin-header-role-toggle">
          <button
            onClick={() => onToggleRole("admin")}
            className={`admin-header-role-btn${role === "admin" ? " active" : ""}`}
          >
            ADMIN
          </button>
          <button
            onClick={() => onToggleRole("subadmin")}
            className={`admin-header-role-btn${role === "subadmin" ? " active" : ""}`}
          >
            SUB-ADMIN
          </button>
        </div>

        {/* Avatar */}
        <div className="admin-header-avatar">
          <User size={16} strokeWidth={1.5} />
        </div>

        {/* Sign Out */}
        <Link href="/login" className="admin-header-signout">
          <LogOut size={13} strokeWidth={1.5} />
          Sign Out
        </Link>
      </div>
    </header>
  );
}