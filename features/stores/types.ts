import type { ElementType } from "react"

export type Attendee = {
  name: string
  initials: string
  color: string
}

export type Equipment = {
  id: string
  name: string
  type: string
  serial: string
  status: "operacional" | "em_manutencao" | "inativo"
  lastMaintenance: string
}

export type Report = {
  id: string
  title: string
  date: string
  type: string
  url: string
}

export type TicketDataPoint = {
  period: string
  chamados: number
}

export type StoreDetail = {
  address: string
  phone: string
  manager: string
  region: string
  status: "ativo" | "inativo" | "em_reforma"
  ticketHistory: TicketDataPoint[]
  equipment: Equipment[]
  reports: Report[]
}

export type Store = {
  slug: string
  name: string
  description: string
  lastEdited: string
  authorInitials: string
  icon: ElementType
  image: string
}
