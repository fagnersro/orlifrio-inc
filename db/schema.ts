import {
  pgTable,
  text,
  timestamp,
  primaryKey,
  integer,
  pgEnum,
  date,
  jsonb,
  index,
} from 'drizzle-orm/pg-core';
import type { AdapterAccountType } from 'next-auth/adapters';

export const userRoleEnum = pgEnum('user_role',[
  'admin',
  'manager',  //gestor
  'technical', // tecnico
  'customer' // cliente
]);

export const maintenanceTypeEnum = pgEnum('maintenance_type', [
  'preventiva',
  'corretiva',
  'instalação',
]);

// ============= USERS =============
export const users = pgTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  email: text('email').notNull().unique(),
  emailVerified: timestamp('email_verified', { mode: 'date' }),
  image: text('image'),
  // Campo customizado para login com email/senha (Credentials provider)
  password: text('password'),
  role: userRoleEnum('role').notNull().default('customer'),
});

// ============= ACCOUNTS =============
// Vincula um user a um provedor OAuth (Google, Apple, etc.)
export const accounts = pgTable(
  'account',
  {
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('provider_account_id').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
);

// ============= SESSIONS =============
// Apenas necessária se usar estratégia "database" (não JWT)
export const sessions = pgTable('session', {
  sessionToken: text('session_token').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

// ============= VERIFICATION TOKENS =============
// Para magic links e verificação de email
export const verificationTokens = pgTable(
  'verification_token',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (vt) => [
    {
      compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
    },
  ]
);

// ============= MAINTENANCE EVENTS =============
// Snapshot do participante no momento do agendamento.
// Mantido como JSONB para não exigir tabela de pessoas (ainda em mock).
export type AttendeeSnapshot = {
  name: string;
  initials: string;
  color: string;
};

export const maintenanceEvents = pgTable(
  'maintenance_event',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    storeSlug: text('store_slug').notNull(),
    type: maintenanceTypeEnum('type').notNull(),
    date: date('date', { mode: 'string' }).notNull(),
    time: text('time').notNull(),
    description: text('description').notNull(),
    location: text('location').notNull(),
    technicianName: text('technician_name').notNull(),
    attendees: jsonb('attendees')
      .$type<AttendeeSnapshot[]>()
      .notNull()
      .default([]),
    createdBy: text('created_by').references(() => users.id, {
      onDelete: 'set null',
    }),
    createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  },
  (t) => [
    index('maintenance_event_store_slug_idx').on(t.storeSlug),
    index('maintenance_event_date_idx').on(t.date),
  ],
);

// ============= EVENT SIGNATURES =============
// Assinaturas de manager: 1 evento × N usuários (PK composta evita duplicatas).
export const eventSignatures = pgTable(
  'event_signature',
  {
    eventId: text('event_id')
      .notNull()
      .references(() => maintenanceEvents.id, { onDelete: 'cascade' }),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    signedAt: timestamp('signed_at', { mode: 'date' }).notNull().defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.eventId, t.userId] })],
);

// ============= TIPOS INFERIDOS =============
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type UserRole = (typeof userRoleEnum.enumValues)[number];
export type MaintenanceEventRow = typeof maintenanceEvents.$inferSelect;
export type NewMaintenanceEventRow = typeof maintenanceEvents.$inferInsert;
export type MaintenanceType = (typeof maintenanceTypeEnum.enumValues)[number];