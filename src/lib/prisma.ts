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
    
    // Check if password is already encoded (contains %)
    const isAlreadyEncoded = password.includes('%');
    
    // If password contains special characters that need encoding
    if (password && !isAlreadyEncoded && (password.includes('$') || password.includes('@') || password.includes('#') || password.includes('&') || password.includes('+'))) {
      // Encode the password
      const encodedPassword = encodeURIComponent(password);
      const newUrl = `${userPart}:${encodedPassword}@${rest}`;
      console.log('🔐 Password encoded in connection string');
      return newUrl;
    }
    
    // If already encoded, decode and re-encode to ensure consistency
    if (isAlreadyEncoded) {
      try {
        const decodedPassword = decodeURIComponent(password);
        const reEncodedPassword = encodeURIComponent(decodedPassword);
        if (reEncodedPassword !== password) {
          console.log('🔐 Re-encoded password for consistency');
          return `${userPart}:${reEncodedPassword}@${rest}`;
        }
      } catch {
        // If decode fails, use original
      }
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
    
    // Add connection parameters to help with prepared statement management
    const params = [];
    if (!databaseUrl.includes('connection_limit')) {
      params.push('connection_limit=1');
    }
    if (!databaseUrl.includes('connect_timeout')) {
      params.push('connect_timeout=10');
    }
    
    if (params.length > 0) {
      databaseUrl = `${databaseUrl}${separator}${params.join('&')}`;
    }
    
    // Verify it's using the pooler format (postgres.[ref] format indicates Session mode)
    // IMPORTANT: The format "postgres.[ref]" with "pooler.supabase.com" can be EITHER Session or Transaction mode
    // You MUST verify in Supabase Dashboard which mode you're using
    if (databaseUrl.includes('postgres.lwkoghlxvjelprprpigs') || databaseUrl.includes('postgres.')) {
      console.log('✅ Detected Supabase pooler connection');
      console.log('⚠️  IMPORTANT: If you see "prepared statement" errors, verify you are using SESSION mode (not Transaction mode)');
      console.log('   Both modes use similar URLs, but only SESSION mode supports prepared statements');
      console.log('   Check: Supabase Dashboard > Settings > Database > Connection Pooling');
      console.log('   Make sure you copied the "Session mode" connection string, not "Transaction mode"');
    } else {
      console.warn('⚠️  WARNING: Connection string format may not be Session mode pooler');
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
// For Supabase pooler, configure connection pooling properly
const prismaConfig: any = {
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
};

// For Supabase pooler in production, configure connection pool settings
// This helps prevent prepared statement conflicts
if (isSupabase && isProduction && databaseUrl.includes('pooler.supabase.com')) {
  // Set connection pool timeout and limits
  // Prisma will manage connections more carefully
  prismaConfig.__internal = {
    engine: {
      connectTimeout: 10000,
    },
  };
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient(prismaConfig);

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

