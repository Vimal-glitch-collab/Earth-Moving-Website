import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(email, password);
      toast.success('Logged in successfully');
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-matte-black flex items-center justify-center px-4 py-32 relative overflow-hidden">
      {/* Background industrial stripes */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 0, transparent 20px)' }}></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full relative z-10"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="w-14 h-14 bg-jcb-yellow rounded flex items-center justify-center font-montserrat font-black text-black-matte text-2xl shadow-[0_0_20px_rgba(242,194,0,0.3)]">
            SB
          </div>
          <div className="text-left">
            <div className="text-white font-montserrat font-black text-xl tracking-tighter uppercase leading-none">SRI BALAJI</div>
            <div className="text-jcb-yellow font-montserrat text-xs font-bold tracking-[0.25em] uppercase leading-none mt-1.5">EARTH MOVERS</div>
          </div>
        </div>

        <div className="card-premium p-8 lg:p-10 rounded-xl shadow-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-black font-montserrat text-white mb-2 uppercase tracking-wide">Admin Portal</h1>
            <p className="text-gray-text text-sm font-inter">Enter your credentials to manage bookings and gallery.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-montserrat font-bold uppercase tracking-wider text-gray-text flex items-center gap-2">
                <Mail size={14} className="text-jcb-yellow" /> EMAIL ADDRESS
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sribalaji.com"
                className="w-full bg-dark-bg border border-dark-border rounded px-4 py-3 text-white font-inter focus:outline-none focus:border-jcb-yellow transition-colors placeholder:text-gray-text/50"
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-montserrat font-bold uppercase tracking-wider text-gray-text flex items-center gap-2">
                <Lock size={14} className="text-jcb-yellow" /> PASSWORD
              </label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-dark-bg border border-dark-border rounded px-4 py-3 text-white font-inter focus:outline-none focus:border-jcb-yellow transition-colors placeholder:text-gray-text/50"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-premium w-full disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {submitting ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>SIGN IN <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-dark-border text-center">
            <a href="/" className="text-gray-text hover:text-white text-xs font-montserrat font-bold uppercase tracking-wider transition-colors">
              &larr; BACK TO PUBLIC WEBSITE
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
