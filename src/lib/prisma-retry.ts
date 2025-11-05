/**
 * Retry wrapper for Prisma queries to handle prepared statement errors
 * with Supabase connection pooler
 */
export async function withRetry<T>(
  queryFn: () => Promise<T>,
  maxRetries = 3,
  delay = 100
): Promise<T> {
  let lastError: any;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await queryFn();
    } catch (error: any) {
      lastError = error;
      
      // Check if it's a prepared statement error
      const isPreparedStatementError = 
        error?.message?.includes('prepared statement') ||
        error?.code === '42P05' ||
        (error?.meta?.code === '42P05');
      
      if (isPreparedStatementError && attempt < maxRetries - 1) {
        // Wait before retrying (allows connection pool to reset)
        await new Promise(resolve => setTimeout(resolve, delay * (attempt + 1)));
        continue;
      }
      
      // If not a prepared statement error or out of retries, throw
      throw error;
    }
  }
  
  throw lastError;
}

