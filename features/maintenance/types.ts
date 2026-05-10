import type { Attendee } from "@/features/stores/types"

// MaintenanceEvent é o shape público da feature — usado pela UI.
// `id` é opcional para tolerar fontes de dados sem id (não existe hoje,
// mas evita que o tipo quebre se algum dia voltarem mocks).
export type MaintenanceEvent = {
  id?: string
  date: string
  type: "preventiva" | "corretiva" | "instalação"
  description: string
  technician: string
  time: string
  location: string
  attendees: Attendee[]
}
