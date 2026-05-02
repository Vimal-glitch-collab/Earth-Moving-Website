import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Calendar, Clock, MapPin, User, Phone, CheckCircle, ArrowRight } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '';

const WORK_TYPES = [
  'Backhoe Loader Rental',
  'Site Clearing',
  'Land Leveling',
  'Excavation Work',
  'Other'
];

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    workType: '',
    date: '',
    time: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // Combine date and time
      const bookingDate = new Date(`${formData.date}T${formData.time || '00:00'}`);
      
      const payload = {
        ...formData,
        date: bookingDate
      };

      const res = await axios.post(`${API_URL}/api/bookings`, payload);
      
      if (res.data.success) {
        setSuccess(true);
        toast.success('Booking submitted successfully!');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black pt-32 pb-20 px-4">
        <div className="max-w-2xl mx-auto bg-zinc-900 border border-yellow-400/20 rounded-3xl p-8 lg:p-12 text-center animate-fadeInUp">
          <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse-yellow">
            <CheckCircle size={40} className="text-black" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-black text-white mb-4">Booking Received!</h1>
          <p className="text-gray-400 text-lg mb-8">
            Thank you, <span className="text-white font-bold">{formData.name}</span>. 
            We have received your request for <span className="text-yellow-400 font-bold">{formData.workType}</span>. 
            Our team will contact you shortly on <span className="text-white font-bold">{formData.phone}</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setSuccess(false)}
              className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-10 py-4 rounded-full transition-all"
            >
              New Booking
            </button>
            <a 
              href="/" 
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-10 py-4 rounded-full flex items-center gap-2 justify-center transition-all hover:scale-105 shadow-lg shadow-yellow-400/20"
            >
              Back to Home <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Header */}
      <section className="py-20 bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #EAB308 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-3">Scheduling</p>
          <h1 className="text-4xl lg:text-6xl font-black text-white mb-6">
            Book a <span className="text-gradient">Service</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Tell us about your project and we'll schedule a JCB for you. 
            Fast response guaranteed within 24 hours.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Info Column */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">
                <h3 className="text-xl font-bold text-white mb-6">Why Book Online?</h3>
                <ul className="space-y-4">
                  {[
                    'Priority scheduling for online bookings',
                    'Transparent pricing & no hidden costs',
                    'Direct communication with site team',
                    'Instant confirmation on WhatsApp'
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-400 text-sm">
                      <CheckCircle size={18} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-yellow-400 p-8 rounded-3xl text-black">
                <h3 className="text-xl font-bold mb-4">Emergency Help?</h3>
                <p className="font-medium mb-6">Need a machine urgently? Call us directly for immediate availability.</p>
                <a 
                  href="tel:+919443239842" 
                  className="flex items-center gap-3 font-black text-2xl hover:translate-x-2 transition-transform"
                >
                  <Phone size={24} /> +91 94432 39842
                </a>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 p-8 lg:p-10 rounded-3xl space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                      <User size={14} className="text-yellow-400" /> Full Name
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full bg-black border border-zinc-700 rounded-full px-6 py-4 text-white focus:outline-none focus:border-yellow-400 transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                      <Phone size={14} className="text-yellow-400" /> Phone Number
                    </label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter mobile number"
                      className="w-full bg-black border border-zinc-700 rounded-full px-6 py-4 text-white focus:outline-none focus:border-yellow-400 transition-colors"
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                      <MapPin size={14} className="text-yellow-400" /> Site Location
                    </label>
                    <input
                      required
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Area/City in Sivagangai"
                      className="w-full bg-black border border-zinc-700 rounded-full px-6 py-4 text-white focus:outline-none focus:border-yellow-400 transition-colors"
                    />
                  </div>

                  {/* Work Type */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                      <ArrowRight size={14} className="text-yellow-400" /> Work Type
                    </label>
                    <select
                      required
                      name="workType"
                      value={formData.workType}
                      onChange={handleChange}
                      className="w-full bg-black border border-zinc-700 rounded-full px-6 py-4 text-white focus:outline-none focus:border-yellow-400 transition-colors appearance-none"
                    >
                      <option value="" disabled>Select work type</option>
                      {WORK_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Date */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                      <Calendar size={14} className="text-yellow-400" /> Required Date
                    </label>
                    <input
                      required
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full bg-black border border-zinc-700 rounded-full px-6 py-4 text-white focus:outline-none focus:border-yellow-400 transition-colors"
                    />
                  </div>

                  {/* Time */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                      <Clock size={14} className="text-yellow-400" /> Preferred Time
                    </label>
                    <input
                      required
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full bg-black border border-zinc-700 rounded-full px-6 py-4 text-white focus:outline-none focus:border-yellow-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-300">Additional Message (Optional)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Provide more details about the work..."
                    className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:bg-zinc-700 text-black font-black py-4 rounded-full transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shadow-xl shadow-yellow-400/20"
                >
                  {submitting ? 'Submitting...' : 'Confirm Booking Request'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
