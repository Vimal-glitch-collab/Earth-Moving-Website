import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Calendar, Clock, MapPin, User, Phone, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-matte-black pt-32 pb-20 px-4 flex items-center justify-center relative overflow-hidden">
        {/* Background Stripes */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 0, transparent 20px)' }}></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-dark-surface border border-dark-border shadow-2xl rounded-xl p-10 lg:p-16 text-center relative z-10"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="w-24 h-24 bg-jcb-yellow rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_30px_rgba(242,194,0,0.3)]"
          >
            <CheckCircle size={48} className="text-matte-black" />
          </motion.div>
          <h1 className="text-4xl lg:text-5xl font-black font-montserrat text-white mb-6 uppercase tracking-tight">Booking Received!</h1>
          <p className="text-gray-text text-lg mb-12 font-inter leading-relaxed">
            Thank you, <span className="text-white font-bold">{formData.name}</span>.<br/> 
            We have received your request for <span className="text-jcb-yellow font-bold">{formData.workType}</span>.<br/>
            Our team will contact you shortly on <span className="text-white font-bold">{formData.phone}</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => setSuccess(false)}
              className="btn-outline-premium"
            >
              NEW BOOKING
            </button>
            <a 
              href="/" 
              className="btn-premium"
            >
              BACK TO HOME <ArrowRight size={20} />
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-matte-black pt-20">
      {/* Header */}
      <section className="py-24 bg-dark-bg relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute left-0 bottom-0 w-full h-px bg-gradient-to-r from-transparent via-jcb-yellow/50 to-transparent"></div>
        
        <motion.div 
          className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-jcb-yellow"></div>
            <p className="text-jcb-yellow text-sm font-montserrat font-bold uppercase tracking-[0.3em]">Scheduling</p>
            <div className="h-px w-12 bg-jcb-yellow"></div>
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-black font-montserrat text-white mb-6 uppercase tracking-tight">
            Book a <span className="text-transparent bg-clip-text bg-gradient-to-r from-jcb-yellow to-[#a68500]">Service</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-gray-text text-lg leading-relaxed font-inter max-w-2xl mx-auto">
            Tell us about your project and we'll schedule a JCB for you. 
            Fast response guaranteed within 24 hours.
          </motion.p>
        </motion.div>
      </section>

      {/* Booking Form */}
      <section className="py-24 bg-matte-black relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Info Column */}
            <motion.div 
              className="lg:col-span-1 space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="card-premium p-10 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-dark-bg rounded-bl-full border-b border-l border-dark-border -mr-10 -mt-10"></div>
                <h3 className="text-xl font-black font-montserrat text-white mb-8 uppercase tracking-wide relative z-10">Why Book Online?</h3>
                <ul className="space-y-6 relative z-10">
                  {[
                    'Priority scheduling for online bookings',
                    'Transparent pricing & no hidden costs',
                    'Direct communication with site team',
                    'Instant confirmation on WhatsApp'
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-4 text-gray-text font-inter">
                      <div className="w-6 h-6 rounded bg-dark-bg border border-dark-border flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle size={14} className="text-jcb-yellow" />
                      </div>
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-jcb-yellow p-10 rounded-xl text-matte-black relative overflow-hidden shadow-[0_0_30px_rgba(242,194,0,0.15)] group">
                <div className="absolute -right-10 -bottom-10 opacity-10 transform group-hover:scale-110 transition-transform duration-500">
                  <Phone size={150} />
                </div>
                <h3 className="text-xl font-black font-montserrat mb-4 uppercase tracking-wide relative z-10">Emergency Help?</h3>
                <p className="font-inter font-medium mb-8 relative z-10 opacity-80">Need a machine urgently? Call us directly for immediate availability.</p>
                <a 
                  href="tel:+919443239842" 
                  className="flex items-center gap-3 font-black font-montserrat text-2xl hover:translate-x-2 transition-transform relative z-10"
                >
                  <Phone size={24} /> +91 94432 39842
                </a>
              </div>
            </motion.div>

            {/* Form Column */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <form onSubmit={handleSubmit} className="card-premium p-8 lg:p-12 rounded-xl space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Name */}
                  <div className="space-y-3">
                    <label className="text-xs font-montserrat font-bold uppercase tracking-wider text-gray-text flex items-center gap-2">
                      <User size={14} className="text-jcb-yellow" /> FULL NAME
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full bg-dark-bg border border-dark-border rounded px-6 py-4 text-white font-inter focus:outline-none focus:border-jcb-yellow transition-colors placeholder:text-gray-text/50"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-3">
                    <label className="text-xs font-montserrat font-bold uppercase tracking-wider text-gray-text flex items-center gap-2">
                      <Phone size={14} className="text-jcb-yellow" /> PHONE NUMBER
                    </label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter mobile number"
                      className="w-full bg-dark-bg border border-dark-border rounded px-6 py-4 text-white font-inter focus:outline-none focus:border-jcb-yellow transition-colors placeholder:text-gray-text/50"
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-3">
                    <label className="text-xs font-montserrat font-bold uppercase tracking-wider text-gray-text flex items-center gap-2">
                      <MapPin size={14} className="text-jcb-yellow" /> SITE LOCATION
                    </label>
                    <input
                      required
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Area/City in Sivagangai"
                      className="w-full bg-dark-bg border border-dark-border rounded px-6 py-4 text-white font-inter focus:outline-none focus:border-jcb-yellow transition-colors placeholder:text-gray-text/50"
                    />
                  </div>

                  {/* Work Type */}
                  <div className="space-y-3">
                    <label className="text-xs font-montserrat font-bold uppercase tracking-wider text-gray-text flex items-center gap-2">
                      <ArrowRight size={14} className="text-jcb-yellow" /> WORK TYPE
                    </label>
                    <div className="relative">
                      <select
                        required
                        name="workType"
                        value={formData.workType}
                        onChange={handleChange}
                        className="w-full bg-dark-bg border border-dark-border rounded px-6 py-4 text-white font-inter focus:outline-none focus:border-jcb-yellow transition-colors appearance-none"
                      >
                        <option value="" disabled>Select work type</option>
                        {WORK_TYPES.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none">
                        <ArrowRight size={16} className="text-jcb-yellow transform rotate-90" />
                      </div>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="space-y-3">
                    <label className="text-xs font-montserrat font-bold uppercase tracking-wider text-gray-text flex items-center gap-2">
                      <Calendar size={14} className="text-jcb-yellow" /> REQUIRED DATE
                    </label>
                    <input
                      required
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full bg-dark-bg border border-dark-border rounded px-6 py-4 text-white font-inter focus:outline-none focus:border-jcb-yellow transition-colors css-date-icon"
                      style={{ colorScheme: 'dark' }}
                    />
                  </div>

                  {/* Time */}
                  <div className="space-y-3">
                    <label className="text-xs font-montserrat font-bold uppercase tracking-wider text-gray-text flex items-center gap-2">
                      <Clock size={14} className="text-jcb-yellow" /> PREFERRED TIME
                    </label>
                    <input
                      required
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full bg-dark-bg border border-dark-border rounded px-6 py-4 text-white font-inter focus:outline-none focus:border-jcb-yellow transition-colors css-time-icon"
                      style={{ colorScheme: 'dark' }}
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-3">
                  <label className="text-xs font-montserrat font-bold uppercase tracking-wider text-gray-text">ADDITIONAL MESSAGE (OPTIONAL)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Provide more details about the work..."
                    className="w-full bg-dark-bg border border-dark-border rounded px-6 py-4 text-white font-inter focus:outline-none focus:border-jcb-yellow transition-colors resize-none placeholder:text-gray-text/50"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-premium w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <><Loader2 size={20} className="animate-spin" /> SUBMITTING...</>
                  ) : (
                    'CONFIRM BOOKING REQUEST'
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
