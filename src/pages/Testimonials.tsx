import { Star, MessageCircle } from 'lucide-react';

export default function Testimonials() {
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

      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white min-h-[60vh] flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8 inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-sage-100 to-sand-100 rounded-full">
            <MessageCircle className="text-sage-500" size={40} />
          </div>

          <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-900 mb-4">
            Coming Soon
          </h2>

          <p className="text-lg text-stone-600 mb-8 leading-relaxed">
            Client testimonials will be featured here once we begin hosting events.
            We look forward to sharing the experiences of our guests as they celebrate
            their special moments at Sandbridge Farmhouse.
          </p>

          <div className="flex gap-1 justify-center mb-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={24} className="text-sand-300" />
            ))}
          </div>

          <div className="bg-gradient-to-br from-sand-50 to-white border border-sand-200 rounded-lg p-8 mb-8">
            <p className="text-stone-700 italic">
              "We're excited to create memorable experiences for our first guests.
              Your testimonial could be featured here!"
            </p>
          </div>

          <a
            href="/book"
            className="inline-flex items-center justify-center gap-2 bg-sage-500 hover:bg-sage-600 text-white font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105"
          >
            Be One of Our First Guests
          </a>
        </div>
      </div>
    </>
  );
}
