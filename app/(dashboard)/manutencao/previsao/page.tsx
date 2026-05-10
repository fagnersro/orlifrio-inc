import { PrevisaoForm } from "@/features/maintenance/components/PrevisaoForm"
import { listAllMaintenanceEvents } from "@/features/maintenance/queries"

export default async function PrevisaoPage() {
  const events = await listAllMaintenanceEvents()

  return (
    <section
      aria-label="Previsão de Manutenção"
      className="px-4 py-6 sm:px-6"
    >
      <PrevisaoForm initialEvents={events} />
    </section>
  )
}
