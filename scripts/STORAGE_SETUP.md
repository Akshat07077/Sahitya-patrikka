# Supabase Storage Buckets Setup

This guide will help you set up the required storage buckets for the application.

## Method 1: Using the Setup Script (Recommended)

### Prerequisites

1. Make sure you have your Supabase credentials in `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

2. Run the setup script:
   ```bash
   npm run storage:setup
   ```

The script will automatically create all required buckets with proper configurations.

## Method 2: Manual Setup via Supabase Dashboard

### Step 1: Create Storage Buckets

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to **Storage** in the sidebar
4. Click **New bucket** for each bucket:

#### Bucket 1: `documents`
- **Name**: `documents`
- **Public**: No (Private)
- **File size limit**: 50 MB
- **Allowed MIME types**: 
  - `application/vnd.openxmlformats-officedocument.wordprocessingml.document` (.docx)
  - `application/pdf`

#### Bucket 2: `payments`
- **Name**: `payments`
- **Public**: No (Private)
- **File size limit**: 5 MB
- **Allowed MIME types**:
  - `image/png`
  - `image/jpeg`
  - `image/jpg`
  - `image/webp`

#### Bucket 3: `editorial-photos`
- **Name**: `editorial-photos`
- **Public**: Yes (Public)
- **File size limit**: 5 MB
- **Allowed MIME types**:
  - `image/png`
  - `image/jpeg`
  - `image/jpg`
  - `image/webp`

### Step 2: Set Up Storage Policies (Optional but Recommended)

For private buckets (`documents` and `payments`), you may want to set up Row Level Security policies:

1. Go to **Storage** → **Policies**
2. For each private bucket, create policies that allow:
   - Service role to upload/read/delete (for server-side operations)
   - Authenticated users to upload their own files (optional)

## Method 3: Using Supabase CLI

If you have Supabase CLI installed:

```bash
# Install Supabase CLI (if not installed)
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Create buckets using SQL
supabase db execute --file scripts/create-buckets.sql
```

## Verification

After setting up the buckets, verify they exist:

1. Go to Supabase Dashboard → Storage
2. You should see all three buckets:
   - ✅ `documents`
   - ✅ `payments`
   - ✅ `editorial-photos`

## Troubleshooting

### Error: "Bucket already exists"
- This is fine! The bucket was already created. The script will skip it.

### Error: "Missing environment variables"
- Make sure `.env.local` contains:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`

### Error: "Permission denied"
- Make sure you're using the **Service Role Key**, not the anon key
- Service Role Key has full access to Storage
- Get it from: Supabase Dashboard → Settings → API → Service Role Key

## Next Steps

After setting up the buckets:

1. ✅ Add environment variables to Vercel (for production)
2. ✅ Test file uploads in development
3. ✅ Deploy and test in production

