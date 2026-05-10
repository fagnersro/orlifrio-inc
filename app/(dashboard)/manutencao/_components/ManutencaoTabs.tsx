"use client"

import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import Link from "next/link"
import { usePathname } from "next/navigation"

const tabs = [
  { name: "Previsão de Manutenção", href: "/manutencao/previsao" },
  { name: "Gerar Relatório", href: "/manutencao/relatorio" },
]

export function ManutencaoTabs() {
  const pathname = usePathname()

  return (
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
  )
}
