export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  display_order: number;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_title: string;
  event_type: string;
  quote: string;
  rating: number;
  image_url: string;
  featured: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  display_order: number;
}

export interface TourInquiry {
  full_name: string;
  email: string;
  phone: string;
  event_date: string;
  event_type: string;
  guest_count: number;
  message: string;
}
