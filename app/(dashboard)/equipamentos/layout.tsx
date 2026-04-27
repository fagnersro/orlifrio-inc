"use client"

import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

const tabs = [
  { name: "Geral", href: "/equipamentos/geral" },
  { name: "Monitoramento", href: "/equipamentos/monitoramento" },
  { name: "Histórico", href: "/equipamentos/historico" },
]

export default function EquipamentosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="-mx-4 -mt-4 sm:-mx-6 sm:-mt-6 lg:-mx-8 lg:-mt-8 bg-white dark:bg-gray-950">
      <div className="px-4 pb-0 pt-6 sm:px-6">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
          Equipamentos
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
          Gerencie e monitore os equipamentos de refrigeração.
        </p>
      </div>
      <TabNavigation className="mt-6 gap-x-4 px-4 sm:px-6">
        {tabs.map((tab) => (
          <TabNavigationLink
            key={tab.name}
            asChild
            active={pathname === tab.href}
          >
            <Link href={tab.href}>{tab.name}</Link>
          </TabNavigationLink>
        ))}
      </TabNavigation>
      {children}
    </div>
  )
}
