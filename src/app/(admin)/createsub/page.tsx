"use client";

import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Lock, Plus, Shield, Trash2, CheckCircle2, UserCheck, Key } from "lucide-react";

interface SubAdminUser {
  id: string;
  name: string;
  email: string;
  roleScope: string;
  permissions: string[];
  lastActive: string;
  status: "Active" | "Suspended";
}

export default function CreateSubPage() {
  const [users, setUsers] = useState<SubAdminUser[]>([
    {
      id: "usr-1",
      name: "Jean-Luc Moreau",
      email: "jeanluc@rakvihoriginals.com",
      roleScope: "POS Showroom Lead",
      permissions: ["POS", "Orders", "Payments"],
      lastActive: "2026-09-02 16:45",
      status: "Active",
    },
    {
      id: "usr-2",
      name: "Marcella D'Souza",
      email: "marcella@rakvihoriginals.com",
      roleScope: "Inventory Atelier Manager",
      permissions: ["Products", "Restock", "Attributes"],
      lastActive: "2026-09-02 14:10",
      status: "Active",
    },
  ]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roleScope, setRoleScope] = useState("POS Showroom Lead");
  const [password, setPassword] = useState("••••••••••••");
  const [permissions, setPermissions] = useState<string[]>(["POS", "Orders"]);

  const allModules = ["Overview", "Brand", "Category", "Products", "Coupons", "Payments", "Orders", "POS", "Reports", "CMS"];

  const handleTogglePerm = (mod: string) => {
    if (permissions.includes(mod)) {
      setPermissions(permissions.filter((p) => p !== mod));
    } else {
      setPermissions([...permissions, mod]);
    }
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    const newU: SubAdminUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      roleScope,
      permissions,
      lastActive: "Just now",
      status: "Active",
    };
    setUsers([...users, newU]);
    setName("");
    setEmail("");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 text-brand-gold text-[10px] font-bold uppercase tracking-wider mb-1">
            <Lock size={14} />
            <span>Identity & Access Management</span>
          </div>
          <h2 className="text-lg font-bold text-[#13102b]">Subadmin Credentials & Module Roles</h2>
          <p className="text-xs text-gray-400 mt-1">
            Provision scoped subadmin accounts for boutique cashiers, inventory managers, and customer concierges.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Form */}
          <div className="bg-white border border-gray-200/80 rounded-xl p-5 h-fit">
            <h3 className="text-sm font-serif font-bold text-[#13102b] mb-4 flex items-center gap-2">
              <Key size={14} className="text-brand-gold" />
              <span>Create Subadmin Account</span>
            </h3>

            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                  Executive / Staff Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jean-Luc Moreau"
                  className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2.5 px-3 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                  Portal Login Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="staff@rakvihoriginals.com"
                  className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2.5 px-3 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                  Assigned Operational Role
                </label>
                <select
                  value={roleScope}
                  onChange={(e) => setRoleScope(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2.5 px-3 text-xs text-[#13102b] focus:outline-none focus:border-[#13102b] focus:ring-1 focus:ring-[#13102b]/10"
                >
                  <option value="POS Showroom Lead">POS Showroom Lead</option>
                  <option value="Inventory Atelier Manager">Inventory Atelier Manager</option>
                  <option value="VIP Concierge Officer">VIP Concierge Officer</option>
                  <option value="Auditor & Treasury Staff">Auditor & Treasury Staff</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-2">
                  Authorized Module Permissions
                </label>
                <div className="grid grid-cols-2 gap-2 bg-gray-50 p-2.5 rounded-xl border border-gray-100 max-h-40 overflow-y-auto">
                  {allModules.map((m) => (
                    <label key={m} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={permissions.includes(m)}
                        onChange={() => handleTogglePerm(m)}
                        className="rounded accent-brand-gold w-3.5 h-3.5"
                      />
                      <span className="truncate">{m}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-brand-gold hover:bg-brand-gold-light text-brand-blue font-black text-xs uppercase tracking-widest rounded-xl transition-all"
              >
                Issue Access Credentials
              </button>
            </form>
          </div>

          {/* Subadmins Table */}
          <div className="lg:col-span-2 bg-white border border-gray-200/80 rounded-xl p-5">
            <h3 className="text-sm font-serif font-bold text-[#13102b] pb-4 border-b border-gray-200/80 mb-4">
              Active Subadmin Accounts ({users.length})
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[600px]">
                <thead>
                  <tr className="text-[10px] font-bold uppercase tracking-wider text-brand-gold border-b border-gray-100 pb-2">
                    <th className="pb-3">Staff Profile</th>
                    <th className="pb-3">Role Designation</th>
                    <th className="pb-3">Allowed Modules</th>
                    <th className="pb-3">Last Active</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4">
                        <div className="font-bold text-[#13102b]">{u.name}</div>
                        <div className="text-[10px] text-gray-400">{u.email}</div>
                      </td>
                      <td className="py-4 text-brand-gold font-medium">
                        {u.roleScope}
                      </td>
                      <td className="py-4">
                        <div className="flex flex-wrap gap-1">
                          {u.permissions.map((p) => (
                            <span key={p} className="px-2 py-0.5 rounded bg-gray-50 text-[9px] text-gray-600">
                              {p}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 text-gray-400 font-mono text-[11px]">
                        {u.lastActive}
                      </td>
                      <td className="py-4 text-right">
                        <button
                          onClick={() => setUsers(users.filter((x) => x.id !== u.id))}
                          className="p-1.5 rounded-lg bg-gray-50 hover:bg-rose-50 text-gray-400 hover:text-rose-600"
                          title="Revoke Access"
                        >
                          <Trash2 size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
