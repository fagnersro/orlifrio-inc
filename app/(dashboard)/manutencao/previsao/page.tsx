import { asc, desc } from "drizzle-orm"

import { db } from "@/db"
import { maintenanceEvents } from "@/db/schema"
import { PrevisaoForm } from "./_components/PrevisaoForm"

export default async function PrevisaoPage() {
  const events = await db
    .select()
    .from(maintenanceEvents)
    .orderBy(desc(maintenanceEvents.date), asc(maintenanceEvents.time))

  return (
    <section
      aria-label="Previsão de Manutenção"
      className="px-4 py-6 sm:px-6"
    >
      <PrevisaoForm initialEvents={events} />
    </section>
  )
}
