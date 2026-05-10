import type { Attendee } from '@/app/(dashboard)/stores/[slug]/store-data';

const PALETTE = [
  '#3b82f6',
  '#ec4899',
  '#f59e0b',
  '#10b981',
  '#8b5cf6',
  '#f97316',
  '#06b6d4',
  '#84cc16',
  '#6366f1',
  '#14b8a6',
  '#f43f5e',
  '#a855f7',
];

export function computeInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function colorFromId(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (Math.imul(hash, 31) + id.charCodeAt(i)) | 0;
  }
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

type SessionLike = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
};

export function userToAttendee(user: SessionLike | undefined): Attendee | null {
  if (!user) return null;
  const name = user.name || user.email || 'Usuário';
  const seed = user.id || user.email || name;
  return {
    name,
    initials: computeInitials(name),
    color: colorFromId(seed),
  };
}
