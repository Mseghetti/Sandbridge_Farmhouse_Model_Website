export default function About() {
  return (
    <>
      <div className="bg-gradient-to-b from-sand-100 to-sand-50 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-sage-500 text-sm font-medium tracking-wide uppercase">
            Our Story
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 mt-2">
            About Sandbridge Farmhouse
          </h1>
        </div>
      </div>

      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="font-serif text-3xl font-bold text-stone-900 mb-6">
                The Beginning
              </h2>
              <p className="text-lg text-stone-600 mb-4 leading-relaxed">
                Sandbridge Farmhouse was born from a passion for creating magical spaces where memories are made. In 2025, we transformed a historic coastal farmstead into an elegant event venue that captures the essence of coastal charm and farmhouse warmth.
              </p>
              <p className="text-lg text-stone-600 leading-relaxed">
                Every detail was thoughtfully considered—from the preserved wood beams to the carefully curated gardens—to ensure your event reflects the beauty and authenticity you desire.
              </p>
            </div>
            <div className="aspect-square rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://images.pexels.com/photos/1537285/pexels-photo-1537285.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Farmhouse exterior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div className="aspect-square rounded-lg overflow-hidden shadow-xl order-2 md:order-1">
              <img
                src="https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Venue details"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="font-serif text-3xl font-bold text-stone-900 mb-6">
                Our Philosophy
              </h2>
              <p className="text-lg text-stone-600 mb-4 leading-relaxed">
                We believe your event venue should be more than just a location—it should be an experience. Our mission is to provide an elegant, authentic backdrop that lets your unique story shine.
              </p>
              <p className="text-lg text-stone-600 leading-relaxed">
                With flexibility, attention to detail, and genuine care for your vision, we partner with you to create an unforgettable celebration that guests will cherish forever.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-sand-50 to-white border border-sand-200 rounded-lg p-12 mb-16">
            <h2 className="font-serif text-3xl font-bold text-stone-900 mb-8 text-center">
              Why Couples Choose Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg text-sage-500 mb-2">Naturally Beautiful</h3>
                <p className="text-stone-600">Our venue's organic elegance minimizes decoration needs, letting natural beauty take center stage.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-sage-500 mb-2">Flexible Spaces</h3>
                <p className="text-stone-600">Indoor and outdoor options that adapt to your vision, season, and guest count.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-sage-500 mb-2">Dedicated Support</h3>
                <p className="text-stone-600">Our team guides you through planning, ensuring every detail exceeds expectations.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-sage-500 mb-2">Instagram-Worthy</h3>
                <p className="text-stone-600">Every corner offers stunning photo opportunities for your guests' memories.</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-stone-900 mb-6">
              Ready to Host Your Event?
            </h2>
            <p className="text-lg text-stone-600 mb-8">
              Let's discuss your vision and create something truly special together.
            </p>
            <a
              href="/book"
              className="inline-flex items-center justify-center gap-2 bg-sage-500 hover:bg-sage-600 text-white font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105"
            >
              Schedule a Tour
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
