import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="font-serif text-2xl font-bold text-amber-400 mb-4">
              Sandbridge Farmhouse
            </h3>
            <p className="text-stone-300 leading-relaxed">
              Your luxury coastal retreat in Virginia Beach. Experience unforgettable moments in our beautiful vacation rental.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-stone-300">
              <li><a href="/" className="hover:text-amber-400 transition-colors">Home</a></li>
              <li><a href="/gallery" className="hover:text-amber-400 transition-colors">Gallery</a></li>
              <li><a href="/about" className="hover:text-amber-400 transition-colors">About</a></li>
              <li><a href="/testimonials" className="hover:text-amber-400 transition-colors">Reviews</a></li>
              <li><a href="/book" className="hover:text-amber-400 transition-colors">Book Now</a></li>
              <li><a href="/contact" className="hover:text-amber-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Contact Info</h4>
            <ul className="space-y-3 text-stone-300">
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-amber-400 flex-shrink-0" />
                <a href="tel:+15551234567" className="hover:text-amber-400 transition-colors">(555) 123-4567</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-amber-400 flex-shrink-0" />
                <a href="mailto:bookings@sandbridgefarmhouse.com" className="hover:text-amber-400 transition-colors break-all">bookings@sandbridgefarmhouse.com</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-amber-400 flex-shrink-0 mt-1" />
                <span>123 Sandbridge Road<br />Virginia Beach, VA 23456</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Follow Us</h4>
            <div className="flex gap-4 mb-6">
              <a
                href="https://www.instagram.com/sandbridgefarmhouse?igsh=MWNtZmxsZnozdG83dg=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-300 hover:text-amber-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-300 hover:text-amber-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
            </div>
            <p className="text-sm text-stone-400">
              Share your stay with<br />#SandbridgeFarmhouse
            </p>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8">
          <p className="text-center text-stone-400">
            &copy; {currentYear} Sandbridge Farmhouse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
