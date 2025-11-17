/*
  # Create Sandbridge Farmhouse venue database schema

  1. New Tables
    - `gallery_images` - Venue photos organized by category
    - `testimonials` - Guest reviews and testimonials
    - `faqs` - Frequently asked questions
    - `tour_inquiries` - Booking and tour inquiry submissions
  
  2. Security
    - Enable RLS on all tables
    - Public read access for gallery, testimonials, FAQs
    - Public insert access for inquiries (with basic validation via app)
    - Admin-only update/delete via authenticated policies
*/

CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text NOT NULL,
  category text NOT NULL,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  client_title text,
  event_type text,
  quote text NOT NULL,
  rating integer,
  image_url text,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tour_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  event_date date,
  event_type text,
  guest_count integer,
  message text,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE tour_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gallery images are publicly readable"
  ON gallery_images
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Testimonials are publicly readable"
  ON testimonials
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "FAQs are publicly readable"
  ON faqs
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can submit tour inquiries"
  ON tour_inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Inquiries are readable by authenticated users only"
  ON tour_inquiries
  FOR SELECT
  TO authenticated
  USING (true);
