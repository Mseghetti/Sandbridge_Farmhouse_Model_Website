/*
  # Gallery Images Storage System

  ## Overview
  Creates a complete image management system for storing and displaying gallery images
  with support for bulk uploads, ordering, and metadata.

  ## New Tables
  
  ### `gallery_images`
  - `id` (uuid, primary key) - Unique identifier for each image
  - `title` (text) - Image title/name
  - `description` (text, nullable) - Optional image description
  - `storage_path` (text, unique) - Path to image in Supabase Storage
  - `public_url` (text) - Public URL for accessing the image
  - `display_order` (integer) - Order for displaying images (lower = first)
  - `is_featured` (boolean) - Whether image should be featured prominently
  - `uploaded_at` (timestamptz) - When the image was uploaded
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Record update timestamp

  ## Storage
  - Creates a public storage bucket called `gallery-images` for storing uploaded photos

  ## Security
  
  ### Row Level Security (RLS)
  - RLS enabled on `gallery_images` table
  - Public read access for all users (for viewing gallery)
  - No write access by default (admin upload will use service role)
  
  ## Notes
  1. Images are stored in Supabase Storage for better performance
  2. Public URLs are generated and stored for quick access
  3. Display order allows custom sorting of gallery images
  4. Featured flag enables highlighting specific images
*/

-- Create gallery_images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  storage_path text UNIQUE NOT NULL,
  public_url text NOT NULL,
  display_order integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  uploaded_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Public read access for gallery viewing
CREATE POLICY "Anyone can view gallery images"
  ON gallery_images
  FOR SELECT
  USING (true);

-- Create index for efficient ordering queries
CREATE INDEX IF NOT EXISTS idx_gallery_images_display_order 
  ON gallery_images(display_order);

-- Create index for featured images
CREATE INDEX IF NOT EXISTS idx_gallery_images_featured 
  ON gallery_images(is_featured) 
  WHERE is_featured = true;

-- Create storage bucket for gallery images
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery-images', 'gallery-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for gallery-images bucket
DO $$
BEGIN
  -- Allow public read access to gallery-images bucket
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Public read access for gallery images'
  ) THEN
    CREATE POLICY "Public read access for gallery images"
      ON storage.objects
      FOR SELECT
      USING (bucket_id = 'gallery-images');
  END IF;

  -- Allow authenticated uploads
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Authenticated users can upload gallery images'
  ) THEN
    CREATE POLICY "Authenticated users can upload gallery images"
      ON storage.objects
      FOR INSERT
      TO authenticated
      WITH CHECK (bucket_id = 'gallery-images');
  END IF;

  -- Allow authenticated updates
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Authenticated users can update gallery images'
  ) THEN
    CREATE POLICY "Authenticated users can update gallery images"
      ON storage.objects
      FOR UPDATE
      TO authenticated
      USING (bucket_id = 'gallery-images');
  END IF;

  -- Allow authenticated deletes
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Authenticated users can delete gallery images'
  ) THEN
    CREATE POLICY "Authenticated users can delete gallery images"
      ON storage.objects
      FOR DELETE
      TO authenticated
      USING (bucket_id = 'gallery-images');
  END IF;
END $$;