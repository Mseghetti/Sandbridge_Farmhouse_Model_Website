import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const links = [
    { label: 'Home', path: '/' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'About', path: '/about' },
    { label: 'Testimonials', path: '/testimonials' },
    { label: 'Book Tour', path: '/book' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-sand-200 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center group">
          <img
            src="/logo.png"
            alt="Sandbridge Farmhouse"
            className="h-12 w-auto object-contain transition-opacity group-hover:opacity-80"
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors ${
                isActive(link.path)
                  ? 'text-sage-500'
                  : 'text-stone-600 hover:text-sage-500'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-stone-600 hover:text-sage-500 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-sand-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-sage-500'
                    : 'text-stone-600 hover:text-sage-500'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
