"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  RiDashboardLine,
  RiToolsLine,
  RiGroupLine,
  RiFileChartLine,
  RiSettings3Line,
  RiMenuLine,
  RiCloseLine,
  RiThermometerLine,
} from "@remixicon/react";

const navItems = [
  { label: "Visão Geral", href: "/", icon: RiDashboardLine },
  { label: "Equipamentos", href: "/equipamentos", icon: RiThermometerLine },
  { label: "Clientes", href: "/clientes", icon: RiGroupLine },
  { label: "Manutenção", href: "/manutencao", icon: RiToolsLine },
  { label: "Relatórios", href: "/relatorios", icon: RiFileChartLine },
  { label: "Configurações", href: "/configuracoes", icon: RiSettings3Line },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-gray-200 px-6">
        <span className="text-lg font-semibold tracking-tight text-gray-900">
          Orlifrio
        </span>
      </div>

      {/* Nav links */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <Icon className="size-5 shrink-0" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-semibold">
            AD
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-gray-900">Admin</p>
            <p className="truncate text-xs text-gray-500">admin@orlifrio.com</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="fixed left-4 top-4 z-50 rounded-lg border border-gray-200 bg-white p-2 shadow-sm lg:hidden"
        onClick={() => setMobileOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? (
          <RiCloseLine className="size-5 text-gray-700" />
        ) : (
          <RiMenuLine className="size-5 text-gray-700" />
        )}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transition-transform duration-200 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <NavContent />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-white">
        <NavContent />
      </aside>
    </>
  );
}
