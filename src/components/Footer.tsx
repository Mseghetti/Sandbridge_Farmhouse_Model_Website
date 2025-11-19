import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-50 border-t border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <img
              src="/logo.png"
              alt="Sandbridge Farmhouse"
              className="h-16 w-auto object-contain mb-4"
            />
            <p className="text-sm text-stone-600">
              Elegant coastal farmhouse venue for your most memorable events.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-stone-900 mb-4 text-sm">Quick Links</h4>
            <ul className="space-y-2 text-sm text-stone-600">
              <li><a href="/gallery" className="hover:text-sage-500 transition-colors">Gallery</a></li>
              <li><a href="/about" className="hover:text-sage-500 transition-colors">About</a></li>
              <li><a href="#faq" className="hover:text-sage-500 transition-colors">FAQ</a></li>
              <li><a href="/contact" className="hover:text-sage-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-stone-900 mb-4 text-sm">Contact</h4>
            <ul className="space-y-3 text-sm text-stone-600">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-sage-500 flex-shrink-0" />
                <a href="tel:+15551234567" className="hover:text-sage-500 transition-colors">(555) 123-4567</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-sage-500 flex-shrink-0" />
                <a href="mailto:hello@sandbridgefarmhouse.com" className="hover:text-sage-500 transition-colors">hello@sandbridgefarmhouse.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-sage-500 flex-shrink-0 mt-0.5" />
                <span>123 Coastal Lane<br />Sandbridge, VA 23456</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-stone-900 mb-4 text-sm">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/sandbridgefarmhouse?igsh=MWNtZmxsZnozdG83dg=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-600 hover:text-sage-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-600 hover:text-sage-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-sand-200 pt-8">
          <p className="text-center text-sm text-stone-600">
            &copy; {currentYear} Sandbridge Farmhouse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
