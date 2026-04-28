import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';

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
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-32">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center font-black text-black text-xl">
            SB
          </div>
          <div className="text-left">
            <div className="text-white font-bold text-lg leading-tight">Sri Balaji</div>
            <div className="text-yellow-400 text-sm">Earth Movers</div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-8 lg:p-10 rounded-3xl shadow-2xl">
          <div className="mb-8">
            <h1 className="text-2xl font-black text-white mb-2">Admin Portal</h1>
            <p className="text-gray-400 text-sm">Enter your credentials to manage bookings and gallery.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                <Mail size={14} className="text-yellow-400" /> Email Address
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sribalaji.com"
                className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                <Lock size={14} className="text-yellow-400" /> Password
              </label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:bg-zinc-700 text-black font-black py-4 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              {submitting ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>Sign In <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-zinc-800 text-center">
            <a href="/" className="text-gray-500 hover:text-white text-xs transition-colors">
              &larr; Back to Public Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
