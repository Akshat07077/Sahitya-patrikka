import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    'DATABASE_URL environment variable is not set. ' +
    'For Supabase in production, use the connection pooler URL (port 6543) or add ?pgbouncer=true'
  );
}

// For Supabase in serverless environments, use connection pooling
// Check if it's a Supabase URL and ensure pooling is configured
const isSupabase = databaseUrl.includes('supabase.co');
const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL;

if (isSupabase && isProduction) {
  // Check if using direct connection (port 5432) instead of pooled (port 6543)
  if (databaseUrl.includes(':5432/') && !databaseUrl.includes('pgbouncer=true')) {
    console.warn(
      '⚠️  Warning: Using direct Supabase connection in production. ' +
      'For serverless (Vercel), use connection pooling:\n' +
      '1. Use port 6543 instead of 5432, OR\n' +
      '2. Add ?pgbouncer=true to your connection string\n' +
      'Get the pooled connection string from Supabase Dashboard > Settings > Database > Connection Pooling'
    );
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

