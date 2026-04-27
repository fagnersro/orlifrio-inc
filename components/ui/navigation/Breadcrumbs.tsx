"use client"

import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const routeNames: Record<string, string> = {
  "/": "Visão Geral",
  "/equipamentos": "Equipamentos",
  "/clientes": "Clientes",
  "/manutencao": "Manutenção",
  "/relatorios": "Relatórios",
  "/configuracoes": "Configurações",
}

export function Breadcrumbs() {
  const pathname = usePathname()
  const currentName = routeNames[pathname] ?? pathname.replace("/", "")

  return (
    <nav aria-label="Breadcrumb" className="ml-2">
      <ol role="list" className="flex items-center space-x-3 text-sm">
        <li className="flex">
          <Link
            href="/"
            className="text-gray-500 transition hover:text-gray-700 dark:text-gray-400 hover:dark:text-gray-300"
          >
            Início
          </Link>
        </li>
        {pathname !== "/" && (
          <>
            <ChevronRight
              className="size-4 shrink-0 text-gray-600 dark:text-gray-400"
              aria-hidden="true"
            />
            <li className="flex">
              <span className="text-gray-900 dark:text-gray-50">
                {currentName}
              </span>
            </li>
          </>
        )}
      </ol>
    </nav>
  )
}
