# Deployment Guide

This website is ready to deploy to Vercel. Follow these steps:

## Quick Deploy

1. **Login to Vercel** (if not already logged in):
   ```bash
   vercel login
   ```

2. **Deploy the site**:
   ```bash
   vercel --prod
   ```

3. **Set Environment Variables**:
   After deployment, you'll need to add your Supabase credentials:
   - Go to your Vercel project dashboard
   - Navigate to Settings → Environment Variables
   - Add these two variables:
     - `VITE_SUPABASE_URL` - Your Supabase project URL
     - `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key
   - Redeploy after adding the variables

## Alternative: Deploy via Vercel Website

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your Git repository
5. Vercel will auto-detect Vite settings
6. Add environment variables in the project settings
7. Deploy!

## Environment Variables Required

- `VITE_SUPABASE_URL` - Your Supabase project URL (e.g., https://xxxxx.supabase.co)
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous/public key

You can find these in your Supabase project dashboard under Settings → API.

