import { testimonials } from '../data/testimonials';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const featured = testimonials.filter(t => t.featured);
  const others = testimonials.filter(t => !t.featured);

  return (
    <>
      <div className="bg-gradient-to-b from-sand-100 to-sand-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-sage-500 text-sm font-medium tracking-wide uppercase">
            Guest Voices
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 mt-2">
            Testimonials & Reviews
          </h1>
          <p className="text-lg text-stone-600 mt-4">
            Hear from couples and event planners who've celebrated at Sandbridge Farmhouse
          </p>
        </div>
      </div>

      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {featured.length > 0 && (
            <div className="mb-16">
              <h2 className="font-serif text-3xl font-bold text-stone-900 text-center mb-8">
                Featured Reviews
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featured.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="bg-gradient-to-br from-sand-50 to-white border border-sand-200 rounded-lg p-8 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>

                    <p className="text-lg text-stone-700 italic mb-6 leading-relaxed">
                      "{testimonial.quote}"
                    </p>

                    <div className="flex items-center gap-4">
                      {testimonial.image_url && (
                        <img
                          src={testimonial.image_url}
                          alt={testimonial.client_name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <p className="font-semibold text-stone-900">
                          {testimonial.client_name}
                        </p>
                        <p className="text-sm text-stone-600">
                          {testimonial.event_type} • {testimonial.client_title}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {others.length > 0 && (
            <div>
              <h2 className="font-serif text-3xl font-bold text-stone-900 text-center mb-8">
                More Happy Guests
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {others.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="bg-gradient-to-br from-sand-50 to-white border border-sand-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>

                    <p className="text-stone-700 italic mb-4 leading-relaxed line-clamp-4">
                      "{testimonial.quote}"
                    </p>

                    <div className="flex items-center gap-3">
                      {testimonial.image_url && (
                        <img
                          src={testimonial.image_url}
                          alt={testimonial.client_name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <p className="font-semibold text-sm text-stone-900">
                          {testimonial.client_name}
                        </p>
                        <p className="text-xs text-stone-600">
                          {testimonial.event_type}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 pt-16 border-t border-sand-200 text-center">
            <h3 className="font-serif text-3xl font-bold text-stone-900 mb-4">
              Plan Your Perfect Event
            </h3>
            <p className="text-lg text-stone-600 mb-8 max-w-2xl mx-auto">
              Join the list of satisfied couples and hosts who've created unforgettable memories at Sandbridge Farmhouse.
            </p>
            <a
              href="/book"
              className="inline-flex items-center justify-center gap-2 bg-sage-500 hover:bg-sage-600 text-white font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105"
            >
              Schedule a Tour Today
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
