import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Calendar, Clock, MapPin, User, Phone, CheckCircle, ArrowRight, Loader2, MessageSquare, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || '';

const WORK_TYPES = [
  'Backhoe Loader Rental',
  'Site Clearing',
  'Land Leveling',
  'Excavation Work',
  'Road Preparation',
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
      const bookingDate = new Date(`${formData.date}T${formData.time || '00:00'}`);
      const payload = { ...formData, date: bookingDate };
      const res = await axios.post(`${API_URL}/api/bookings`, payload);
      
      if (res.data.success) {
        setSuccess(true);
        toast.success('Inquiry Logged Successfully');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Network error. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-premium-black pt-32 pb-20 px-6 flex items-center justify-center relative overflow-hidden">
        <div className="industrial-grid absolute inset-0 opacity-10 pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl w-full glass-morphism border border-white/10 p-16 md:p-24 text-center relative z-10"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="w-24 h-24 bg-industrial-yellow rounded-full flex items-center justify-center mx-auto mb-12 shadow-[0_0_50px_rgba(244,180,0,0.3)]"
          >
            <CheckCircle size={56} className="text-black" />
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-bebas tracking-tighter mb-8 leading-none">
            MISSION <span className="text-industrial-yellow">RECEIVED</span>
          </h1>
          <p className="font-inter text-gray-muted text-xl mb-16 leading-relaxed">
            Deployment coordinates for <span className="text-white font-bold">{formData.workType}</span> logged. <br/>
            Our logistics team will contact <span className="text-white font-bold">{formData.name}</span> shortly.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <button onClick={() => setSuccess(false)} className="btn-outline-cinematic !text-white !border-white/20">
              LOG NEW MISSION
            </button>
            <a href="/" className="btn-cinematic">
              RETURN TO BASE
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-premium-black min-h-screen pt-32 pb-24">
      {/* Header */}
      <section className="relative py-24 overflow-hidden mb-12">
        <div className="industrial-grid absolute inset-0 opacity-10 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <h1 className="text-7xl md:text-9xl font-bebas leading-[0.85] tracking-tighter mb-8">
              SERVICE <span className="text-industrial-yellow">DEPLOYMENT</span>
            </h1>
            <p className="font-inter text-xl text-gray-muted max-w-2xl leading-relaxed">
              Log your project requirements. Our fleet is ready for immediate mobilization across the Tamil Nadu sector.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Info Side */}
          <div className="lg:col-span-4 space-y-12">
            <div className="bg-charcoal p-12 border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-industrial-yellow/5 group-hover:bg-industrial-yellow/10 transition-colors -mr-8 -mt-8 rotate-45" />
              <h3 className="text-3xl font-bebas tracking-widest text-white mb-8 border-b border-white/5 pb-4">LOGISTICS PROTOCOL</h3>
              <ul className="space-y-8">
                {[
                  { icon: <Info size={18} />, text: 'Real-time site feasibility assessment' },
                  { icon: <Clock size={18} />, text: '24-hour deployment response' },
                  { icon: <Shield size={18} />, text: 'Tier-1 machinery guarantee' },
                  { icon: <MessageSquare size={18} />, text: 'Direct operator communication' }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 font-bebas text-lg tracking-wider text-gray-muted">
                    <span className="text-industrial-yellow mt-1">{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-industrial-yellow p-12 text-black group relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform">
                <Phone size={160} />
              </div>
              <h3 className="text-3xl font-bebas tracking-widest mb-6">IMMEDIATE SUPPORT?</h3>
              <p className="font-inter text-sm font-bold uppercase tracking-widest mb-8 opacity-80">Crisis management & urgent site clearing.</p>
              <a href="tel:+919994289069" className="text-4xl font-bebas tracking-tighter hover:tracking-widest transition-all">
                +91 99942 89069
              </a>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="bg-charcoal p-10 md:p-16 border border-white/5 space-y-12 relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Name */}
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 block">CLIENT IDENTITY</label>
                  <div className="relative">
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 text-industrial-yellow/40" size={18} />
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name / Entity"
                      className="w-full bg-premium-black border border-white/5 px-16 py-5 text-white font-bebas text-xl tracking-widest focus:border-industrial-yellow transition-colors outline-none placeholder:text-white/10"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 block">COMMS CHANNEL</label>
                  <div className="relative">
                    <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-industrial-yellow/40" size={18} />
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Primary Phone"
                      className="w-full bg-premium-black border border-white/5 px-16 py-5 text-white font-bebas text-xl tracking-widest focus:border-industrial-yellow transition-colors outline-none placeholder:text-white/10"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-4 md:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 block">SITE COORDINATES</label>
                  <div className="relative">
                    <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-industrial-yellow/40" size={18} />
                    <input
                      required
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Sector / Area / District"
                      className="w-full bg-premium-black border border-white/5 px-16 py-5 text-white font-bebas text-xl tracking-widest focus:border-industrial-yellow transition-colors outline-none placeholder:text-white/10"
                    />
                  </div>
                </div>

                {/* Work Type */}
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 block">MISSION TYPE</label>
                  <select
                    required
                    name="workType"
                    value={formData.workType}
                    onChange={handleChange}
                    className="w-full bg-premium-black border border-white/5 px-8 py-5 text-white font-bebas text-xl tracking-widest focus:border-industrial-yellow transition-colors outline-none appearance-none"
                  >
                    <option value="" disabled className="bg-charcoal">Select Protocol</option>
                    {WORK_TYPES.map(type => (
                      <option key={type} value={type} className="bg-charcoal">{type.toUpperCase()}</option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 block">DEPLOYMENT DATE</label>
                  <input
                    required
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-premium-black border border-white/5 px-8 py-5 text-white font-bebas text-xl tracking-widest focus:border-industrial-yellow transition-colors outline-none"
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 block">ADDITIONAL INTEL</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Terrain specifics, equipment requirements, etc."
                  className="w-full bg-premium-black border border-white/5 px-8 py-5 text-white font-inter text-sm focus:border-industrial-yellow transition-colors outline-none resize-none placeholder:text-white/10"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-cinematic !w-full justify-center !py-6 !text-2xl disabled:opacity-50"
              >
                {submitting ? (
                  <><Loader2 size={24} className="animate-spin" /> INITIALIZING...</>
                ) : (
                  'CONFIRM DEPLOYMENT REQUEST'
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
