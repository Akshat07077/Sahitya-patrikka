import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

let databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    'DATABASE_URL environment variable is not set. ' +
    'For Supabase in production, enable Connection Pooling in Supabase Dashboard and use the pooled connection string.'
  );
}

// For Supabase in serverless environments, configure connection pooling
const isSupabase = databaseUrl.includes('supabase.co');
const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL;

if (isSupabase && isProduction) {
  // If using direct connection (port 5432), we need to ensure proper connection management
  // For serverless, Prisma handles connection pooling, but we should limit connections
  if (databaseUrl.includes(':5432')) {
    // Add connection parameters optimized for serverless
    const separator = databaseUrl.includes('?') ? '&' : '?';
    // connection_limit=1 ensures one connection per serverless function instance
    // connect_timeout=10 sets a reasonable timeout
    databaseUrl = `${databaseUrl}${separator}connection_limit=1&connect_timeout=10`;
    console.log('✅ Configured Supabase connection for serverless environment');
  } else if (databaseUrl.includes(':6543')) {
    // Port 6543 is the transaction pooler
    // Note: Transaction pooler doesn't support prepared statements
    // Prisma will handle this automatically, but we ensure connection limits
    const separator = databaseUrl.includes('?') ? '&' : '?';
    if (!databaseUrl.includes('connection_limit')) {
      databaseUrl = `${databaseUrl}${separator}connection_limit=1&connect_timeout=10`;
    }
    console.log('✅ Added connection parameters for Supabase transaction pooler');
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

