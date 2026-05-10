"use server"

import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

import { db } from "@/db"
import { eventSignatures, maintenanceEvents } from "@/db/schema"
import { requirePermission } from "@/lib/auth-guard"

import {
  createMaintenanceEventSchema,
  type CreateMaintenanceEventInput,
} from "./schemas"

export type MaintenanceFormErrors = {
  storeSlug?: string[]
  type?: string[]
  date?: string[]
  time?: string[]
  description?: string[]
  location?: string[]
  technicianName?: string[]
  attendees?: string[]
  _form?: string[]
}

export type MaintenanceMutationState = {
  ok: boolean
  errors?: MaintenanceFormErrors
}

export type SignEventState = { ok: boolean; error?: string }

// ── CRUD: maintenance events ────────────────────────────────────

export async function createMaintenanceEvent(
  input: CreateMaintenanceEventInput,
): Promise<MaintenanceMutationState> {
  const session = await requirePermission("maintenance:manage")

  const parsed = createMaintenanceEventSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors }
  }

  try {
    await db.insert(maintenanceEvents).values({
      ...parsed.data,
      createdBy: session.user.id,
    })
  } catch {
    return {
      ok: false,
      errors: { _form: ["Erro ao salvar agendamento. Tente novamente."] },
    }
  }

  revalidatePath("/manutencao/previsao")
  revalidatePath(`/stores/${parsed.data.storeSlug}`)
  return { ok: true }
}

export async function updateMaintenanceEvent(
  id: string,
  input: CreateMaintenanceEventInput,
): Promise<MaintenanceMutationState> {
  await requirePermission("maintenance:manage")

  const parsed = createMaintenanceEventSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors }
  }

  let previousSlug: string | undefined
  try {
    const result = await db
      .update(maintenanceEvents)
      .set(parsed.data)
      .where(eq(maintenanceEvents.id, id))
      .returning({ storeSlug: maintenanceEvents.storeSlug })

    if (result.length === 0) {
      return {
        ok: false,
        errors: { _form: ["Agendamento não encontrado."] },
      }
    }
    previousSlug = result[0].storeSlug
  } catch {
    return {
      ok: false,
      errors: { _form: ["Erro ao atualizar agendamento."] },
    }
  }

  revalidatePath("/manutencao/previsao")
  revalidatePath(`/stores/${parsed.data.storeSlug}`)
  if (previousSlug && previousSlug !== parsed.data.storeSlug) {
    revalidatePath(`/stores/${previousSlug}`)
  }
  return { ok: true }
}

export async function deleteMaintenanceEvent(
  id: string,
): Promise<SignEventState> {
  await requirePermission("maintenance:manage")

  let storeSlug: string | undefined
  try {
    const result = await db
      .delete(maintenanceEvents)
      .where(eq(maintenanceEvents.id, id))
      .returning({ storeSlug: maintenanceEvents.storeSlug })

    if (result.length === 0) {
      return { ok: false, error: "Agendamento não encontrado." }
    }
    storeSlug = result[0].storeSlug
  } catch {
    return { ok: false, error: "Erro ao excluir agendamento." }
  }

  revalidatePath("/manutencao/previsao")
  if (storeSlug) {
    revalidatePath(`/stores/${storeSlug}`)
  }
  return { ok: true }
}

// ── Assinatura de eventos ───────────────────────────────────────

export async function signMaintenanceEvent(
  eventId: string,
  storeSlug: string,
): Promise<SignEventState> {
  const session = await requirePermission("events:sign")

  try {
    await db
      .insert(eventSignatures)
      .values({ eventId, userId: session.user.id })
      .onConflictDoNothing()
  } catch {
    return { ok: false, error: "Erro ao assinar. Tente novamente." }
  }

  revalidatePath(`/stores/${storeSlug}`)
  return { ok: true }
}
