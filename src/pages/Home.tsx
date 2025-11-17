import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, Heart } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: Award,
      title: 'Elegant Spaces',
      description: 'Beautiful indoor and outdoor venues perfect for any event size',
    },
    {
      icon: Users,
      title: 'Capacity Up to 250',
      description: 'Flexible layouts to accommodate your guest count',
    },
    {
      icon: Heart,
      title: 'Coastal Farmhouse',
      description: 'Instagram-worthy aesthetic in a serene seaside setting',
    },
  ];

  return (
    <>
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-sand-100 to-sand-50">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.pexels.com/photos/1699505/pexels-photo-1699505.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Farmhouse exterior"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <div className="mb-6 animate-fade-in">
            <span className="inline-block text-sage-500 text-sm font-medium tracking-wide uppercase">
              Welcome to
            </span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl font-bold text-stone-900 mb-6 leading-tight">
            Sandbridge Farmhouse
          </h1>

          <p className="text-lg md:text-xl text-stone-700 mb-8 font-light">
            An elegant coastal farmhouse venue for weddings, events, and unforgettable gatherings
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book"
              className="inline-flex items-center justify-center gap-2 bg-sage-500 hover:bg-sage-600 text-white font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105"
            >
              Book a Tour <ArrowRight size={20} />
            </Link>
            <Link
              to="/gallery"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-sand-50 text-sage-500 font-semibold py-3 px-8 rounded-lg border-2 border-sage-500 transition-all"
            >
              View Gallery <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <div className="w-6 h-10 border-2 border-sage-500 rounded-full flex items-center justify-center">
            <div className="w-1 h-2 bg-sage-500 rounded-full"></div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sage-500 text-sm font-medium tracking-wide uppercase">
              Why Choose Us
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 mt-2">
              Exceptional Venues & Service
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-8 rounded-lg bg-gradient-to-br from-sand-50 to-white border border-sand-200 hover:border-sage-300 transition-all hover:shadow-lg"
                >
                  <div className="mb-4">
                    <Icon className="text-sage-500 group-hover:text-sage-600 transition-colors" size={40} />
                  </div>
                  <h3 className="font-semibold text-lg text-stone-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-stone-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-sand-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-4xl font-bold text-stone-900 mb-6">
                Your Perfect Event Awaits
              </h2>
              <p className="text-lg text-stone-600 mb-4 leading-relaxed">
                Nestled in the heart of Sandbridge's coastal charm, our farmhouse offers the ideal backdrop for your most important moments.
              </p>
              <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                From intimate ceremonies to grand celebrations, our flexible spaces and dedicated team ensure every detail is perfect.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sage-500 hover:text-sage-600 font-semibold transition-colors"
              >
                Learn Our Story <ArrowRight size={20} />
              </Link>
            </div>
            <div className="aspect-video rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://images.pexels.com/photos/1701394/pexels-photo-1701394.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Event celebration"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 mb-6">
            Ready to Create Your Perfect Event?
          </h2>
          <p className="text-lg text-stone-600 mb-12 max-w-2xl mx-auto">
            Schedule a tour to experience Sandbridge Farmhouse in person and discuss how we can bring your vision to life.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book"
              className="inline-flex items-center justify-center gap-2 bg-sage-500 hover:bg-sage-600 text-white font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105"
            >
              Book a Tour <ArrowRight size={20} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-sand-50 text-sage-500 font-semibold py-3 px-8 rounded-lg border-2 border-sage-500 transition-all"
            >
              Get in Touch <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
