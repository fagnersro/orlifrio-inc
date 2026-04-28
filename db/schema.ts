import {
  pgTable,
  text,
  timestamp,
  primaryKey,
  integer,
  varchar,
} from 'drizzle-orm/pg-core';
import type { AdapterAccountType } from 'next-auth/adapters';

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

// ============= TIPOS INFERIDOS =============
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;