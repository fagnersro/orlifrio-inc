import { z } from "zod"

const attendeeSchema = z.object({
  name: z.string().min(1).max(120),
  initials: z.string().min(1).max(4),
  color: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/, "Cor inválida (esperado #RRGGBB)"),
})

export const createMaintenanceEventSchema = z.object({
  storeSlug: z.string().min(1, "Selecione uma loja"),
  type: z.enum(["preventiva", "corretiva", "instalação"]),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida (esperado YYYY-MM-DD)"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Hora inválida (esperado HH:MM)"),
  description: z.string().min(1, "Informe a descrição").max(500),
  location: z.string().min(1, "Informe o local").max(200),
  technicianName: z.string().min(1, "Selecione um técnico").max(120),
  attendees: z.array(attendeeSchema).default([]),
})

export type CreateMaintenanceEventInput = z.infer<
  typeof createMaintenanceEventSchema
>
