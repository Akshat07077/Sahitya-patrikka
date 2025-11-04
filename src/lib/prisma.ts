import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

let databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    'DATABASE_URL environment variable is not set. ' +
    'For Supabase in production, enable Connection Pooling in Supabase Dashboard and use the pooled connection string.'
  );
}

// Helper function to URL-encode special characters in password
// Supabase connection strings with special characters like $, @, # need proper encoding
function encodePasswordInUrl(url: string): string {
  // Match the connection string pattern: postgresql://user:password@host:port/db
  // Extract password part and encode special characters
  const urlPattern = /^(postgresql:\/\/[^:]+):([^@]+)@(.+)$/;
  const match = url.match(urlPattern);
  
  if (match) {
    const [, userPart, password, rest] = match;
    // If password contains special characters that need encoding
    if (password && (password.includes('$') || password.includes('@') || password.includes('#') || password.includes('&'))) {
      // Decode first in case it's partially encoded, then encode fully
      let decodedPassword = password;
      try {
        decodedPassword = decodeURIComponent(password);
      } catch {
        // If decode fails, use original
        decodedPassword = password;
      }
      // Encode the password
      const encodedPassword = encodeURIComponent(decodedPassword);
      return `${userPart}:${encodedPassword}@${rest}`;
    }
  }
  return url;
}

// Auto-encode password if it contains special characters
databaseUrl = encodePasswordInUrl(databaseUrl);

// For Supabase in serverless environments, configure connection pooling
const isSupabase = databaseUrl.includes('supabase.co') || databaseUrl.includes('pooler.supabase.com');
const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL;

if (isSupabase && isProduction) {
  // Check if using pooler (pooler.supabase.com)
  const isPooler = databaseUrl.includes('pooler.supabase.com');
  
  if (isPooler && databaseUrl.includes(':6543')) {
    // Using Supabase pooler on port 6543
    // IMPORTANT: Must be SESSION mode (not Transaction mode) for Prisma compatibility
    // Transaction mode doesn't support prepared statements
    const separator = databaseUrl.includes('?') ? '&' : '?';
    if (!databaseUrl.includes('connection_limit')) {
      databaseUrl = `${databaseUrl}${separator}connection_limit=1&connect_timeout=10`;
    }
    
    // Verify it's using the pooler format (postgres.[ref] format indicates Session mode)
    if (databaseUrl.includes('postgres.lwkoghlxvjelprprpigs') || databaseUrl.includes('postgres.')) {
      console.log('✅ Using Supabase Session mode pooler (supports prepared statements)');
    } else {
      console.warn('⚠️  WARNING: Verify you are using SESSION mode pooler, not Transaction mode');
      console.warn('   Transaction mode does not support prepared statements and will cause Prisma errors');
      console.warn('   Get Session mode URL from: Supabase Dashboard > Settings > Database > Connection Pooling > Session mode');
    }
  } else if (databaseUrl.includes(':5432')) {
    // Direct connection (port 5432)
    const separator = databaseUrl.includes('?') ? '&' : '?';
    databaseUrl = `${databaseUrl}${separator}connection_limit=1&connect_timeout=10`;
    console.log('✅ Configured Supabase direct connection for serverless environment');
  }
}

// Configure Prisma client
// For Supabase transaction pooler, we need to handle prepared statement conflicts
const prismaConfig: any = {
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient(prismaConfig);

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

