import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown,
  Bed,
  Bath,
  Users,
  Home as HomeIcon,
  Star,
  MapPin,
  Calendar,
  ChefHat,
  Wifi,
  Waves,
  Flame,
  UtensilsCrossed,
  ArrowRight
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface PropertyDetails {
  property_name: string;
  tagline: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  square_footage: number;
  hero_image_url: string;
  nightly_rate: number;
  city: string;
  state: string;
}

interface Amenity {
  id: string;
  category: string;
  name: string;
  icon: string;
}

interface Testimonial {
  client_name: string;
  quote: string;
  rating: number;
}

interface Attraction {
  name: string;
  description: string;
  category: string;
  distance_miles: number;
}

const defaultProperty: PropertyDetails = {
  property_name: 'Sandbridge Farmhouse',
  tagline: 'Your Luxury Coastal Retreat Awaits',
  description: 'Escape to the stunning Sandbridge Farmhouse, a beautifully renovated luxury vacation rental that perfectly blends rustic charm with modern elegance. This spacious retreat offers breathtaking views, premium amenities, and an unparalleled coastal experience.',
  bedrooms: 5,
  bathrooms: 3.5,
  max_guests: 12,
  square_footage: 3200,
  hero_image_url: '/DJI_0196.jpg',
  nightly_rate: 450,
  city: 'Virginia Beach',
  state: 'Virginia'
};

const defaultAmenities: Amenity[] = [
  { id: '1', category: 'Outdoor', name: 'Private Pool', icon: 'Waves' },
  { id: '2', category: 'Outdoor', name: 'Hot Tub', icon: 'Bath' },
  { id: '3', category: 'Kitchen', name: 'Gourmet Kitchen', icon: 'ChefHat' },
  { id: '4', category: 'Entertainment', name: 'High-Speed WiFi', icon: 'Wifi' },
  { id: '5', category: 'Outdoor', name: 'Fire Pit', icon: 'Flame' },
  { id: '6', category: 'Outdoor', name: 'BBQ Grill', icon: 'Flame' },
  { id: '7', category: 'Outdoor', name: 'Outdoor Dining', icon: 'UtensilsCrossed' },
  { id: '8', category: 'Outdoor', name: 'Beach Access', icon: 'Waves' }
];

const defaultAttractions: Attraction[] = [
  { name: 'Sandbridge Beach', description: 'Miles of pristine, uncrowded beaches perfect for swimming and surfing', category: 'Beach', distance_miles: 0.3 },
  { name: 'Back Bay Wildlife Refuge', description: 'Over 9,000 acres of beaches, dunes, and maritime forest', category: 'Nature', distance_miles: 2.5 },
  { name: 'False Cape State Park', description: 'Pristine barrier island accessible by bike or boat', category: 'Nature', distance_miles: 4.2 },
  { name: 'Local Seafood Restaurant', description: 'Fresh catches and waterfront dining', category: 'Restaurant', distance_miles: 1.1 }
];

export default function Home() {
  const [property, setProperty] = useState<PropertyDetails>(defaultProperty);
  const [amenities, setAmenities] = useState<Amenity[]>(defaultAmenities);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [attractions, setAttractions] = useState<Attraction[]>(defaultAttractions);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [propertyRes, amenitiesRes, testimonialsRes, attractionsRes] = await Promise.all([
          supabase.from('property_details').select('*').maybeSingle(),
          supabase.from('amenities').select('*').order('category', { ascending: true }).order('display_order', { ascending: true }),
          supabase.from('testimonials').select('client_name, quote, rating').eq('featured', true).limit(3),
          supabase.from('local_attractions').select('*').order('display_order', { ascending: true }).limit(6)
        ]);

        if (propertyRes.data) setProperty(propertyRes.data);
        if (amenitiesRes.data) setAmenities(amenitiesRes.data);
        if (testimonialsRes.data) setTestimonials(testimonialsRes.data);
        if (attractionsRes.data) setAttractions(attractionsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const iconMap: Record<string, any> = {
    ChefHat, Wifi, Waves, Flame, UtensilsCrossed, Bed, Bath, Users, HomeIcon
  };

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  const featuredAmenities = amenities.slice(0, 8);
  const amenitiesByCategory = amenities.reduce((acc, amenity) => {
    if (!acc[amenity.category]) acc[amenity.category] = [];
    acc[amenity.category].push(amenity);
    return acc;
  }, {} as Record<string, Amenity[]>);

  return (
    <>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={property.hero_image_url}
            alt={property.property_name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
            {property.property_name}
          </h1>

          <p className="text-xl md:text-2xl text-white mb-10 font-light drop-shadow-lg">
            {property.tagline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book"
              className="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-4 px-10 rounded-lg transition-all transform hover:scale-105 shadow-xl"
            >
              Book Now <Calendar size={20} />
            </Link>
            <Link
              to="/gallery"
              className="inline-flex items-center justify-center gap-2 bg-white/95 hover:bg-white text-amber-700 font-semibold py-4 px-10 rounded-lg transition-all shadow-xl backdrop-blur-sm"
            >
              View Gallery <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        <button
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10 text-white hover:text-amber-400 transition-colors"
          aria-label="Scroll to content"
        >
          <ChevronDown size={40} strokeWidth={2} />
        </button>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-amber-600 text-sm font-semibold tracking-wider uppercase">
                Welcome to Paradise
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 mt-3 mb-6">
                Your Luxury Coastal Escape
              </h2>
              <p className="text-lg text-stone-700 mb-6 leading-relaxed">
                {property.description}
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-100 rounded-lg">
                    <Bed className="text-amber-700" size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-stone-900">{property.bedrooms}</div>
                    <div className="text-sm text-stone-600">Bedrooms</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-100 rounded-lg">
                    <Bath className="text-amber-700" size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-stone-900">{property.bathrooms}</div>
                    <div className="text-sm text-stone-600">Bathrooms</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-100 rounded-lg">
                    <Users className="text-amber-700" size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-stone-900">{property.max_guests}</div>
                    <div className="text-sm text-stone-600">Guests</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-100 rounded-lg">
                    <HomeIcon className="text-amber-700" size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-stone-900">{property.square_footage.toLocaleString()}</div>
                    <div className="text-sm text-stone-600">Sq Ft</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/DJI_0198.jpg"
                  alt="Property exterior"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-stone-200">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-stone-900">${property.nightly_rate}</span>
                  <span className="text-stone-600">/ night</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-amber-600 text-sm font-semibold tracking-wider uppercase">
              Premium Features
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 mt-3">
              Luxury Amenities
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {featuredAmenities.map((amenity) => {
              const IconComponent = iconMap[amenity.icon] || HomeIcon;
              return (
                <div
                  key={amenity.id}
                  className="group p-6 rounded-xl bg-stone-50 hover:bg-amber-50 border border-stone-200 hover:border-amber-300 transition-all hover:shadow-lg text-center"
                >
                  <div className="inline-flex p-4 bg-white rounded-full mb-3 group-hover:bg-amber-100 transition-colors">
                    <IconComponent className="text-amber-700" size={28} />
                  </div>
                  <h3 className="font-semibold text-stone-900 text-sm">
                    {amenity.name}
                  </h3>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 font-semibold transition-colors"
            >
              View All Amenities <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-stone-900 to-stone-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="/DJI_0200.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-amber-400 text-sm font-semibold tracking-wider uppercase">
              Location
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mt-3 mb-6">
              Explore the Area
            </h2>
            <div className="flex items-center justify-center gap-2 text-stone-300">
              <MapPin size={20} />
              <span>{property.city}, {property.state}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attractions.map((attraction, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-lg">{attraction.name}</h3>
                  <span className="text-amber-400 text-sm font-semibold">
                    {attraction.distance_miles} mi
                  </span>
                </div>
                <p className="text-stone-200 text-sm leading-relaxed">
                  {attraction.description}
                </p>
                <div className="mt-3 inline-block px-3 py-1 bg-amber-600/30 rounded-full text-xs font-medium text-amber-300">
                  {attraction.category}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold transition-colors"
            >
              Learn More About the Area <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-amber-600 text-sm font-semibold tracking-wider uppercase">
                Guest Reviews
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 mt-3">
                What Our Guests Say
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-lg border border-stone-200"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <Star key={i} className="text-amber-500 fill-amber-500" size={20} />
                    ))}
                  </div>
                  <p className="text-stone-700 mb-6 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="font-semibold text-stone-900">
                    {testimonial.client_name}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/testimonials"
                className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 font-semibold transition-colors"
              >
                Read All Reviews <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 mb-6">
            Ready to Book Your Stay?
          </h2>
          <p className="text-lg text-stone-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience the perfect blend of luxury and coastal charm. Check availability and secure your dates today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book"
              className="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-4 px-10 rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Check Availability <Calendar size={20} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-stone-50 text-amber-700 font-semibold py-4 px-10 rounded-lg border-2 border-amber-600 transition-all"
            >
              Contact Us <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
