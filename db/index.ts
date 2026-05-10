import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL!;

// Em desenvolvimento, evita criar múltiplas conexões com hot-reload do Next
const globalForDb = globalThis as unknown as {
  client: ReturnType<typeof postgres> | undefined;
};

const client = globalForDb.client ?? postgres(connectionString);

if (process.env.NODE_ENV !== 'production') {
  globalForDb.client = client;
}

export const db = drizzle(client, { schema });