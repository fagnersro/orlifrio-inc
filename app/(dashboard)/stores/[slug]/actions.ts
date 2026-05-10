'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/db';
import { eventSignatures } from '@/db/schema';
import { requirePermission } from '@/lib/auth-guard';

export type SignEventState = { ok: boolean; error?: string };

export async function signMaintenanceEvent(
  eventId: string,
  storeSlug: string,
): Promise<SignEventState> {
  const session = await requirePermission('events:sign');

  try {
    await db
      .insert(eventSignatures)
      .values({ eventId, userId: session.user.id })
      .onConflictDoNothing();
  } catch {
    return { ok: false, error: 'Erro ao assinar. Tente novamente.' };
  }

  revalidatePath(`/stores/${storeSlug}`);
  return { ok: true };
}
