import { requirePermission } from "@/lib/auth-guard"
import { ManutencaoTabs } from "./_components/ManutencaoTabs"

export default async function ManutencaoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requirePermission("maintenance:manage")

  return (
    <div className="-mx-4 -mt-4 sm:-mx-6 sm:-mt-6 lg:-mx-8 lg:-mt-8 bg-white dark:bg-gray-950">
      <div className="px-4 pb-0 pt-6 sm:px-6">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
          Manutenção
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
          Cadastre agendamentos e gere relatórios das manutenções.
        </p>
      </div>
      <ManutencaoTabs />
      {children}
    </div>
  )
}
