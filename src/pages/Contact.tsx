import { MapPin, Phone, Mail, Clock, Star } from 'lucide-react';
import { faqs } from '../data/faqs';
import { useState } from 'react';

export default function Contact() {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  return (
    <>
      <div className="bg-gradient-to-b from-sand-100 to-sand-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-sage-500 text-sm font-medium tracking-wide uppercase">
            Get in Touch
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 mt-2">
            Contact Us
          </h1>
        </div>
      </div>

      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="font-serif text-3xl font-bold text-stone-900 mb-8">
                Sandbridge Farmhouse
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <MapPin className="text-sage-500 mt-1" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900 mb-1">Location</h3>
                    <p className="text-stone-600">
                      123 Coastal Lane<br />
                      Sandbridge, VA 23456<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Phone className="text-sage-500 mt-1" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900 mb-1">Phone</h3>
                    <a href="tel:+15551234567" className="text-sage-500 hover:text-sage-600 transition-colors">
                      (555) 123-4567
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Mail className="text-sage-500 mt-1" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900 mb-1">Email</h3>
                    <a href="mailto:hello@sandbridgefarmhouse.com" className="text-sage-500 hover:text-sage-600 transition-colors">
                      hello@sandbridgefarmhouse.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Clock className="text-sage-500 mt-1" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900 mb-1">Response Time</h3>
                    <p className="text-stone-600">
                      Typically within 24 hours<br />
                      Monday - Friday, 9am - 5pm EST
                    </p>
                  </div>
                </div>
              </div>

              <a
                href="/book"
                className="inline-flex items-center justify-center gap-2 bg-sage-500 hover:bg-sage-600 text-white font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105 mt-8"
              >
                Schedule a Tour
              </a>
            </div>

            <div className="rounded-lg overflow-hidden shadow-xl h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.5405217600286!2d-76.06888!3d36.45521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89ba5a1e5f5f5f5f%3A0x5f5f5f5f5f5f5f5f!2sSandbridge%2C%20VA%2023456!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div id="faq" className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-sage-500 text-sm font-medium tracking-wide uppercase">
                Common Questions
              </span>
              <h2 className="font-serif text-4xl font-bold text-stone-900 mt-2">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <button
                  key={faq.id}
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full text-left bg-sand-50 hover:bg-sand-100 border border-sand-200 rounded-lg p-6 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-stone-900">
                        {faq.question}
                      </h3>
                      {expandedFaq === faq.id && (
                        <p className="text-stone-600 mt-4 leading-relaxed">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                    <span className={`flex-shrink-0 transition-transform ${expandedFaq === faq.id ? 'rotate-180' : ''}`}>
                      <Star size={20} className="text-sage-500" fill="currentColor" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
