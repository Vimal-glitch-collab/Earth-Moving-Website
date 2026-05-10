import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { Lock, Mail, ArrowRight, Loader2, Hexagon } from 'lucide-react';
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
      toast.success('Access Granted');
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-premium-black flex items-center justify-center px-4 py-32 relative overflow-hidden">
      {/* Background Grid */}
      <div className="industrial-grid absolute inset-0 opacity-10 pointer-events-none" />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-industrial-yellow/5 blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full relative z-10"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="relative">
            <Hexagon className="w-16 h-16 text-industrial-yellow fill-industrial-yellow/10" />
            <span className="absolute inset-0 flex items-center justify-center font-bebas text-2xl text-white font-bold">
              SB
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-bebas text-3xl tracking-widest text-white leading-none">SRI BALAJI</span>
            <span className="font-inter text-[10px] font-black tracking-[0.5em] text-industrial-yellow uppercase leading-none mt-1">EARTH MOVERS</span>
          </div>
        </div>

        {/* Card */}
        <div className="glass-morphism border border-white/10 p-10 lg:p-12">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bebas tracking-[0.2em] text-white mb-2">ADMIN PORTAL</h1>
            <p className="text-gray-muted text-sm font-inter">Secure access for authorized personnel only.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 flex items-center gap-2">
                <Mail size={12} className="text-industrial-yellow" /> Email Address
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sribalaji.com"
                className="w-full bg-premium-black border border-white/10 px-5 py-4 text-white font-inter text-sm focus:outline-none focus:border-industrial-yellow transition-colors placeholder:text-white/20"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 flex items-center gap-2">
                <Lock size={12} className="text-industrial-yellow" /> Password
              </label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-premium-black border border-white/10 px-5 py-4 text-white font-inter text-sm focus:outline-none focus:border-industrial-yellow transition-colors placeholder:text-white/20"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-cinematic w-full justify-center !py-5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <><Loader2 size={20} className="animate-spin" /> VERIFYING...</>
              ) : (
                <>AUTHORIZE ACCESS <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <a href="/" className="text-white/20 hover:text-white text-[10px] font-bold uppercase tracking-[0.3em] transition-colors">
              ← Return to Public Site
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;

