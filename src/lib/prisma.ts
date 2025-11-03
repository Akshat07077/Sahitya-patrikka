import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

let databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    'DATABASE_URL environment variable is not set. ' +
    'For Supabase in production, use the connection pooler URL (port 6543) or add ?pgbouncer=true'
  );
}

// For Supabase in serverless environments, automatically use connection pooling
const isSupabase = databaseUrl.includes('supabase.co');
const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL;

if (isSupabase && isProduction) {
  // Convert direct connection (port 5432) to pooled connection (port 6543)
  if (databaseUrl.includes(':5432') && !databaseUrl.includes('pgbouncer=true') && !databaseUrl.includes(':6543')) {
    // Replace port 5432 with 6543 for connection pooling
    databaseUrl = databaseUrl.replace(':5432', ':6543');
    console.log('✅ Automatically converted Supabase connection to use connection pooling (port 6543)');
  }
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

