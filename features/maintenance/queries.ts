import "server-only"

import { asc, desc, eq, inArray } from "drizzle-orm"

import { db } from "@/db"
import {
  eventSignatures,
  maintenanceEvents,
  users,
  type MaintenanceEventRow,
} from "@/db/schema"
import { userToAttendee } from "@/lib/avatar"
import type { Attendee } from "@/features/stores/types"

import type { MaintenanceEvent } from "./types"

// Lista todos os agendamentos (uso administrativo: tabela em /manutencao/previsao).
export async function listAllMaintenanceEvents(): Promise<MaintenanceEventRow[]> {
  return db
    .select()
    .from(maintenanceEvents)
    .orderBy(desc(maintenanceEvents.date), asc(maintenanceEvents.time))
}

// Agendamentos de uma loja, ordenados por data/hora ascendentes (cronologia).
export async function listMaintenanceEventsByStore(
  storeSlug: string,
): Promise<MaintenanceEvent[]> {
  const rows = await db
    .select()
    .from(maintenanceEvents)
    .where(eq(maintenanceEvents.storeSlug, storeSlug))
    .orderBy(asc(maintenanceEvents.date), asc(maintenanceEvents.time))

  return rows.map((e) => ({
    id: e.id,
    date: e.date,
    type: e.type,
    description: e.description,
    technician: e.technicianName,
    time: e.time,
    location: e.location,
    attendees: e.attendees,
  }))
}

export type SignaturesData = {
  signersByEventId: Record<string, Attendee[]>
  signedByCurrentUser: string[]
}

// Em uma única ida ao banco: signers de cada evento (via JOIN com user)
// e o subset que o usuário atual já assinou.
export async function getSignaturesForEvents(
  eventIds: string[],
  currentUserId: string | undefined,
): Promise<SignaturesData> {
  const signersByEventId: Record<string, Attendee[]> = {}
  const signedByCurrentUser: string[] = []

  if (eventIds.length === 0) {
    return { signersByEventId, signedByCurrentUser }
  }

  const rows = await db
    .select({
      eventId: eventSignatures.eventId,
      userId: users.id,
      userName: users.name,
      userEmail: users.email,
    })
    .from(eventSignatures)
    .innerJoin(users, eq(eventSignatures.userId, users.id))
    .where(inArray(eventSignatures.eventId, eventIds))

  for (const r of rows) {
    const attendee = userToAttendee({
      id: r.userId,
      name: r.userName,
      email: r.userEmail,
    })
    if (attendee) {
      ;(signersByEventId[r.eventId] ??= []).push(attendee)
    }
    if (currentUserId && r.userId === currentUserId) {
      signedByCurrentUser.push(r.eventId)
    }
  }

  return { signersByEventId, signedByCurrentUser }
}
