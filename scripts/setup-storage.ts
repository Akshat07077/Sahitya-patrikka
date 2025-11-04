import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../.env.local') });
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('❌ Error: Missing required environment variables');
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  console.error('\nYou can set them in:');
  console.error('  - .env.local file (for local development)');
  console.error('  - Vercel Environment Variables (for production)');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

interface BucketConfig {
  name: string;
  public: boolean;
  allowedMimeTypes?: string[];
  fileSizeLimit?: number;
}

const buckets: BucketConfig[] = [
  {
    name: 'documents',
    public: false, // Private - only accessible via service role
    allowedMimeTypes: [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
      'application/pdf',
    ],
    fileSizeLimit: 50 * 1024 * 1024, // 50MB
  },
  {
    name: 'payments',
    public: false, // Private - payment screenshots
    allowedMimeTypes: [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/webp',
    ],
    fileSizeLimit: 5 * 1024 * 1024, // 5MB
  },
  {
    name: 'editorial-photos',
    public: true, // Public - profile photos for editorial board
    allowedMimeTypes: [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/webp',
    ],
    fileSizeLimit: 5 * 1024 * 1024, // 5MB
  },
];

async function setupStorageBuckets() {
  console.log('🚀 Setting up Supabase Storage buckets...\n');

  for (const bucket of buckets) {
    try {
      // Check if bucket already exists
      const { data: existingBuckets, error: listError } = await supabase.storage.listBuckets();
      
      if (listError) {
        console.error(`❌ Error listing buckets: ${listError.message}`);
        continue;
      }

      const bucketExists = existingBuckets?.some(b => b.name === bucket.name);

      if (bucketExists) {
        console.log(`✅ Bucket "${bucket.name}" already exists, skipping...`);
        continue;
      }

      // Create the bucket
      const { data, error } = await supabase.storage.createBucket(bucket.name, {
        public: bucket.public,
        allowedMimeTypes: bucket.allowedMimeTypes,
        fileSizeLimit: bucket.fileSizeLimit,
      });

      if (error) {
        console.error(`❌ Error creating bucket "${bucket.name}": ${error.message}`);
        continue;
      }

      console.log(`✅ Created bucket "${bucket.name}"`);
      console.log(`   - Public: ${bucket.public ? 'Yes' : 'No'}`);
      console.log(`   - File size limit: ${bucket.fileSizeLimit ? `${bucket.fileSizeLimit / (1024 * 1024)}MB` : 'Unlimited'}`);
      if (bucket.allowedMimeTypes) {
        console.log(`   - Allowed types: ${bucket.allowedMimeTypes.join(', ')}`);
      }
      console.log('');
    } catch (error: any) {
      console.error(`❌ Unexpected error for bucket "${bucket.name}": ${error.message}`);
      console.log('');
    }
  }

  console.log('✨ Storage buckets setup complete!');
}

// Run the setup
setupStorageBuckets()
  .then(() => {
    console.log('\n✅ All done! Your storage buckets are ready to use.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Setup failed:', error);
    process.exit(1);
  });

