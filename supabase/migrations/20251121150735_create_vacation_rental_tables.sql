/*
  Vacation Rental Property System

  Overview:
  Creates database tables for managing a single luxury vacation rental property,
  including property details, amenities, booking requests, and availability calendar.

  New Tables:
  
  1. property_details
    - id (uuid, primary key) - Unique identifier
    - property_name (text) - Name of the property
    - tagline (text) - Short marketing tagline
    - description (text) - Full property description
    - bedrooms (integer) - Number of bedrooms
    - bathrooms (decimal) - Number of bathrooms
    - max_guests (integer) - Maximum guest capacity
    - square_footage (integer) - Property size in square feet
    - hero_image_url (text) - Main hero image URL
    - nightly_rate (decimal) - Base nightly rate
    - weekly_rate (decimal, nullable) - Weekly rate
    - cleaning_fee (decimal) - Cleaning fee
    - address, city, state, zip_code (text) - Location info
    - check_in_time, check_out_time (text) - Check times
    - minimum_stay (integer) - Minimum nights

  2. amenities - Property features and amenities
  3. booking_requests - Guest booking inquiries
  4. availability_calendar - Date availability and pricing
  5. local_attractions - Nearby points of interest

  Security:
  - RLS enabled on all tables
  - Public read access for property info
  - Public insert for booking requests
*/

CREATE TABLE IF NOT EXISTS property_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_name text NOT NULL,
  tagline text NOT NULL,
  description text NOT NULL,
  bedrooms integer NOT NULL DEFAULT 0,
  bathrooms decimal NOT NULL DEFAULT 0,
  max_guests integer NOT NULL DEFAULT 0,
  square_footage integer DEFAULT 0,
  hero_image_url text NOT NULL,
  hero_video_url text,
  nightly_rate decimal NOT NULL DEFAULT 0,
  weekly_rate decimal,
  cleaning_fee decimal DEFAULT 0,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip_code text NOT NULL,
  latitude decimal,
  longitude decimal,
  check_in_time text DEFAULT '3:00 PM',
  check_out_time text DEFAULT '11:00 AM',
  minimum_stay integer DEFAULT 2,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS amenities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  name text NOT NULL,
  icon text NOT NULL,
  description text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS booking_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name text NOT NULL,
  guest_email text NOT NULL,
  guest_phone text,
  check_in_date date NOT NULL,
  check_out_date date NOT NULL,
  num_guests integer NOT NULL,
  message text,
  total_nights integer NOT NULL,
  estimated_total decimal,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS availability_calendar (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date UNIQUE NOT NULL,
  available boolean DEFAULT true,
  price_override decimal,
  notes text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS local_attractions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  distance_miles decimal,
  image_url text,
  website_url text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE property_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability_calendar ENABLE ROW LEVEL SECURITY;
ALTER TABLE local_attractions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Property details are publicly readable"
  ON property_details
  FOR SELECT
  USING (true);

CREATE POLICY "Amenities are publicly readable"
  ON amenities
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can submit booking requests"
  ON booking_requests
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Booking requests are readable by authenticated users"
  ON booking_requests
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Availability is publicly readable"
  ON availability_calendar
  FOR SELECT
  USING (true);

CREATE POLICY "Attractions are publicly readable"
  ON local_attractions
  FOR SELECT
  USING (true);

CREATE INDEX IF NOT EXISTS idx_availability_date ON availability_calendar(date);
CREATE INDEX IF NOT EXISTS idx_booking_requests_dates ON booking_requests(check_in_date, check_out_date);
CREATE INDEX IF NOT EXISTS idx_amenities_category ON amenities(category, display_order);
CREATE INDEX IF NOT EXISTS idx_attractions_category ON local_attractions(category, display_order);