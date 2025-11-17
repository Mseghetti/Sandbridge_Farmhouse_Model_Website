import { useState } from 'react';
import { Calendar, Users, Mail, Phone, MessageSquare } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { TourInquiry } from '../types';

export default function Book() {
  const [formData, setFormData] = useState<TourInquiry>({
    full_name: '',
    email: '',
    phone: '',
    event_date: '',
    event_type: 'Wedding',
    guest_count: 50,
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const eventTypes = [
    'Wedding',
    'Corporate Event',
    'Family Gathering',
    'Birthday Party',
    'Engagement Party',
    'Rehearsal Dinner',
    'Other',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'guest_count' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isSupabaseConfigured) {
      setSubmitStatus('error');
      setErrorMessage('Form submission is not configured. Please contact the site administrator.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('tour_inquiries')
        .insert([formData]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        event_date: '',
        event_type: 'Wedding',
        guest_count: 50,
        message: '',
      });

      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (err) {
      setSubmitStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-b from-sand-100 to-sand-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-sage-500 text-sm font-medium tracking-wide uppercase">
            Get Started
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 mt-2">
            Book Your Tour
          </h1>
          <p className="text-lg text-stone-600 mt-4">
            Tell us about your event and we'll be in touch within 24 hours
          </p>
        </div>
      </div>

      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="full_name" className="block text-sm font-semibold text-stone-900 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-sand-50 border border-sand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 focus:bg-white transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-stone-900 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-sand-50 border border-sand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 focus:bg-white transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-stone-900 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-sand-50 border border-sand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 focus:bg-white transition-all"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="event_type" className="block text-sm font-semibold text-stone-900 mb-2">
                  Event Type *
                </label>
                <select
                  id="event_type"
                  name="event_type"
                  value={formData.event_type}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-sand-50 border border-sand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 focus:bg-white transition-all"
                >
                  {eventTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="event_date" className="block text-sm font-semibold text-stone-900 mb-2">
                  Preferred Event Date
                </label>
                <input
                  type="date"
                  id="event_date"
                  name="event_date"
                  value={formData.event_date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-sand-50 border border-sand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label htmlFor="guest_count" className="block text-sm font-semibold text-stone-900 mb-2">
                  Approximate Guest Count
                </label>
                <input
                  type="number"
                  id="guest_count"
                  name="guest_count"
                  value={formData.guest_count}
                  onChange={handleChange}
                  min="1"
                  max="250"
                  className="w-full px-4 py-3 bg-sand-50 border border-sand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-stone-900 mb-2">
                Tell Us About Your Event
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 bg-sand-50 border border-sand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 focus:bg-white transition-all resize-none"
                placeholder="Share details about your event, vision, or any special requirements..."
              />
            </div>

            {submitStatus === 'success' && (
              <div className="bg-sage-50 border border-sage-200 text-sage-800 p-4 rounded-lg">
                <p className="font-semibold">Thank you for your inquiry!</p>
                <p className="text-sm mt-1">We'll be in touch within 24 hours to discuss your event.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
                <p className="font-semibold">Something went wrong</p>
                <p className="text-sm mt-1">{errorMessage}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-sage-500 hover:bg-sage-600 disabled:bg-sage-300 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 disabled:hover:scale-100"
            >
              {isSubmitting ? 'Sending...' : 'Send Inquiry'}
            </button>

            <p className="text-xs text-stone-500 text-center">
              * Required fields. We'll keep your information confidential.
            </p>
          </form>

          <div className="mt-12 pt-12 border-t border-sand-200">
            <h3 className="font-semibold text-lg text-stone-900 mb-6 text-center">
              Other Ways to Connect
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-sage-100 rounded-full mb-3">
                  <Phone size={24} className="text-sage-500" />
                </div>
                <h4 className="font-semibold text-stone-900 mb-1">Call Us</h4>
                <a href="tel:+15551234567" className="text-sage-500 hover:text-sage-600 transition-colors">
                  (555) 123-4567
                </a>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-sage-100 rounded-full mb-3">
                  <Mail size={24} className="text-sage-500" />
                </div>
                <h4 className="font-semibold text-stone-900 mb-1">Email</h4>
                <a href="mailto:hello@sandbridgefarmhouse.com" className="text-sage-500 hover:text-sage-600 transition-colors">
                  hello@sandbridgefarmhouse.com
                </a>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-sage-100 rounded-full mb-3">
                  <Calendar size={24} className="text-sage-500" />
                </div>
                <h4 className="font-semibold text-stone-900 mb-1">Visit</h4>
                <p className="text-stone-600 text-sm">By appointment only</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
