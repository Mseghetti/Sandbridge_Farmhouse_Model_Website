import { useState, useEffect } from 'react';
import { Calendar, Users, Mail, Phone, DollarSign, Check } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface PropertyDetails {
  nightly_rate: number;
  weekly_rate: number;
  cleaning_fee: number;
  check_in_time: string;
  check_out_time: string;
  minimum_stay: number;
}

interface BookingRequest {
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  check_in_date: string;
  check_out_date: string;
  num_guests: number;
  message: string;
}

export default function Book() {
  const [property, setProperty] = useState<PropertyDetails | null>(null);
  const [formData, setFormData] = useState<BookingRequest>({
    guest_name: '',
    guest_email: '',
    guest_phone: '',
    check_in_date: '',
    check_out_date: '',
    num_guests: 2,
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function fetchProperty() {
      const { data } = await supabase.from('property_details').select('*').maybeSingle();
      if (data) setProperty(data);
    }
    fetchProperty();
  }, []);

  const calculateNights = () => {
    if (!formData.check_in_date || !formData.check_out_date) return 0;
    const checkIn = new Date(formData.check_in_date);
    const checkOut = new Date(formData.check_out_date);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 0;
  };

  const calculateTotal = () => {
    if (!property) return 0;
    const nights = calculateNights();
    if (nights === 0) return 0;

    const isWeekly = nights >= 7;
    const subtotal = isWeekly && property.weekly_rate
      ? property.weekly_rate
      : nights * property.nightly_rate;

    return subtotal + property.cleaning_fee;
  };

  const nights = calculateNights();
  const total = calculateTotal();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'num_guests' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSupabaseConfigured) {
      setSubmitStatus('error');
      setErrorMessage('Booking system is not configured. Please contact us directly.');
      return;
    }

    if (nights < (property?.minimum_stay || 2)) {
      setSubmitStatus('error');
      setErrorMessage(`Minimum stay is ${property?.minimum_stay || 2} nights.`);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('booking_requests')
        .insert([{
          ...formData,
          total_nights: nights,
          estimated_total: total,
        }]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({
        guest_name: '',
        guest_email: '',
        guest_phone: '',
        check_in_date: '',
        check_out_date: '',
        num_guests: 2,
        message: '',
      });

      setTimeout(() => setSubmitStatus('idle'), 10000);
    } catch (err) {
      setSubmitStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl text-stone-600">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-b from-amber-600 to-amber-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-amber-200 text-sm font-semibold tracking-wider uppercase">
            Reserve Your Stay
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mt-3 mb-6">
            Book Sandbridge Farmhouse
          </h1>
          <p className="text-xl text-amber-100 max-w-2xl mx-auto leading-relaxed">
            Check availability and submit your booking request
          </p>
        </div>
      </div>

      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-stone-900 mb-6">Booking Request</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="guest_name" className="block text-sm font-semibold text-stone-900 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="guest_name"
                      name="guest_name"
                      value={formData.guest_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="guest_email" className="block text-sm font-semibold text-stone-900 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="guest_email"
                        name="guest_email"
                        value={formData.guest_email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="guest_phone" className="block text-sm font-semibold text-stone-900 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="guest_phone"
                        name="guest_phone"
                        value={formData.guest_phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="check_in_date" className="block text-sm font-semibold text-stone-900 mb-2">
                        Check-in Date *
                      </label>
                      <input
                        type="date"
                        id="check_in_date"
                        name="check_in_date"
                        value={formData.check_in_date}
                        onChange={handleChange}
                        min={getTodayDate()}
                        required
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="check_out_date" className="block text-sm font-semibold text-stone-900 mb-2">
                        Check-out Date *
                      </label>
                      <input
                        type="date"
                        id="check_out_date"
                        name="check_out_date"
                        value={formData.check_out_date}
                        onChange={handleChange}
                        min={formData.check_in_date || getTodayDate()}
                        required
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="num_guests" className="block text-sm font-semibold text-stone-900 mb-2">
                      Number of Guests *
                    </label>
                    <select
                      id="num_guests"
                      name="num_guests"
                      value={formData.num_guests}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
                    >
                      {[...Array(12)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-stone-900 mb-2">
                      Special Requests or Questions
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all resize-none"
                      placeholder="Any special requests or questions about your stay..."
                    />
                  </div>

                  {submitStatus === 'success' && (
                    <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Check className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                        <div>
                          <p className="font-semibold">Booking request submitted!</p>
                          <p className="text-sm mt-1">We'll review your request and respond within 24 hours to confirm availability.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
                      <p className="font-semibold">Unable to submit request</p>
                      <p className="text-sm mt-1">{errorMessage}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-300 text-white font-semibold py-4 px-6 rounded-lg transition-all transform hover:scale-105 disabled:hover:scale-100 shadow-lg"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
                  </button>

                  <p className="text-xs text-stone-500 text-center">
                    * This is a booking request, not a confirmed reservation. We'll contact you to confirm availability.
                  </p>
                </form>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
                <h3 className="text-xl font-bold text-stone-900 mb-6">Pricing Summary</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                    <span className="text-stone-600">Nightly Rate</span>
                    <span className="font-semibold text-stone-900">${property.nightly_rate}</span>
                  </div>

                  {property.weekly_rate && (
                    <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                      <span className="text-stone-600">Weekly Rate</span>
                      <span className="font-semibold text-stone-900">${property.weekly_rate}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                    <span className="text-stone-600">Cleaning Fee</span>
                    <span className="font-semibold text-stone-900">${property.cleaning_fee}</span>
                  </div>

                  {nights > 0 && (
                    <>
                      <div className="flex items-center justify-between py-3 bg-amber-50 -mx-4 px-4 rounded-lg">
                        <span className="text-stone-900 font-semibold">
                          {nights} {nights === 1 ? 'Night' : 'Nights'}
                        </span>
                        <span className="text-stone-900 font-semibold">
                          ${nights >= 7 && property.weekly_rate ? property.weekly_rate : nights * property.nightly_rate}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t-2 border-amber-600">
                        <span className="text-lg font-bold text-stone-900">Estimated Total</span>
                        <span className="text-2xl font-bold text-amber-600">${total}</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-3 pt-6 border-t border-stone-200 text-sm text-stone-600">
                  <div className="flex items-start gap-2">
                    <Calendar className="text-amber-600 flex-shrink-0 mt-0.5" size={16} />
                    <div>
                      <p className="font-semibold text-stone-900">Check-in: {property.check_in_time}</p>
                      <p className="font-semibold text-stone-900">Check-out: {property.check_out_time}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Users className="text-amber-600 flex-shrink-0 mt-0.5" size={16} />
                    <p>Minimum {property.minimum_stay} night stay required</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-stone-900 text-white rounded-2xl shadow-lg p-8">
                <h3 className="text-lg font-bold mb-4">Need Help?</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <div className="flex items-center gap-2 text-amber-400 font-semibold mb-1">
                      <Phone size={16} />
                      <span>Call Us</span>
                    </div>
                    <a href="tel:+15551234567" className="hover:text-amber-400 transition-colors">
                      (555) 123-4567
                    </a>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-amber-400 font-semibold mb-1">
                      <Mail size={16} />
                      <span>Email</span>
                    </div>
                    <a href="mailto:bookings@sandbridgefarmhouse.com" className="hover:text-amber-400 transition-colors">
                      bookings@sandbridgefarmhouse.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
