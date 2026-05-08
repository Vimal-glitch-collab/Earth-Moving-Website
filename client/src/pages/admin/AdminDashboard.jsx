import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, Calendar, Image as ImageIcon, LogOut, 
  Users, CheckCircle, Clock, Trash2, ChevronRight, Filter, Search 
} from 'lucide-react';
import { Link, NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import AdminBookings from './AdminBookings';
import AdminGallery from './AdminGallery';

const API_URL = import.meta.env.VITE_API_URL || '';

const AdminDashboardHome = () => {
  const [stats, setStats] = useState({ bookings: 0, projects: 0, pending: 0 });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsRes, projectsRes] = await Promise.all([
          axios.get(`${API_URL}/api/bookings`),
          axios.get(`${API_URL}/api/projects`)
        ]);
        
        const bookings = bookingsRes.data.bookings || [];
        setStats({
          bookings: bookings.length,
          projects: projectsRes.data.projects?.length || 0,
          pending: bookings.filter(b => b.status === 'pending').length
        });
        setRecent(bookings.slice(0, 5));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statCards = [
    { label: 'Total Bookings', value: stats.bookings, icon: <Calendar size={24} />, accent: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/20' },
    { label: 'Pending Requests', value: stats.pending, icon: <Clock size={24} />, accent: 'text-jcb-yellow', bg: 'bg-jcb-yellow/10 border-jcb-yellow/20' },
    { label: 'Project Photos', value: stats.projects, icon: <ImageIcon size={24} />, accent: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/20' },
  ];

  return (
    <div className="space-y-10 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-black font-montserrat text-white mb-2 uppercase tracking-tight">Dashboard Overview</h1>
        <p className="text-gray-text font-inter">Welcome back, Admin. Here's what's happening with Sri Balaji Earth Movers.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className={`bg-dark-surface border rounded-xl p-8 flex items-center gap-6 ${stat.bg}`}>
            <div className={`w-16 h-16 rounded flex items-center justify-center ${stat.accent} bg-dark-bg`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-gray-text text-sm font-inter font-medium mb-1">{stat.label}</p>
              <p className="text-4xl font-black font-montserrat text-white">{loading ? '—' : stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="bg-dark-surface border border-dark-border rounded-xl overflow-hidden">
        <div className="p-6 border-b border-dark-border flex items-center justify-between">
          <h2 className="text-xl font-black font-montserrat text-white uppercase tracking-wide">Recent Booking Requests</h2>
          <Link to="/admin/bookings" className="text-jcb-yellow hover:text-white text-sm font-montserrat font-bold flex items-center gap-1 uppercase tracking-wider transition-colors">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-text text-xs font-montserrat font-bold uppercase tracking-widest bg-dark-bg">
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Service</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border">
              {recent.length > 0 ? recent.map((booking) => (
                <tr key={booking._id} className="text-sm hover:bg-dark-bg/50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="font-bold font-montserrat text-white">{booking.name}</div>
                    <div className="text-gray-text text-xs font-inter">{booking.phone}</div>
                  </td>
                  <td className="px-6 py-5 text-gray-text font-inter">{booking.workType}</td>
                  <td className="px-6 py-5 text-gray-text font-inter">{new Date(booking.date).toLocaleDateString()}</td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1.5 rounded text-[10px] font-montserrat font-black uppercase tracking-wider badge-${booking.status}`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="px-6 py-16 text-center text-gray-text font-inter">No bookings yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const { logout, admin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { to: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard', end: true },
    { to: '/admin/bookings', icon: <Calendar size={20} />, label: 'Manage Bookings' },
    { to: '/admin/gallery', icon: <ImageIcon size={20} />, label: 'Photo Gallery' },
  ];

  return (
    <div className="min-h-screen bg-matte-black flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-72 bg-dark-bg border-r border-dark-border flex flex-col z-40 lg:min-h-screen">
        <div className="p-6 border-b border-dark-border">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="w-10 h-10 bg-jcb-yellow rounded flex items-center justify-center font-montserrat font-black text-matte-black group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(242,194,0,0.2)]">SB</div>
            <div>
              <div className="text-white font-montserrat font-black text-sm tracking-tight uppercase leading-none">Sri Balaji</div>
              <div className="text-jcb-yellow font-montserrat text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Admin Panel</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3.5 rounded text-sm font-montserrat font-bold uppercase tracking-wider transition-all ${
                  isActive 
                    ? 'bg-jcb-yellow text-matte-black shadow-[0_0_15px_rgba(242,194,0,0.2)]' 
                    : 'text-gray-text hover:text-white hover:bg-dark-surface border border-transparent hover:border-dark-border'
                }`
              }
            >
              {item.icon} {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-dark-border">
          <div className="flex items-center gap-3 px-4 py-3 mb-3 bg-dark-surface rounded border border-dark-border">
            <div className="w-9 h-9 rounded bg-dark-bg border border-dark-border flex items-center justify-center text-jcb-yellow font-montserrat font-black text-sm uppercase">
              {admin?.name?.charAt(0) || 'A'}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-white text-xs font-montserrat font-bold truncate">{admin?.name}</p>
              <p className="text-gray-text text-[10px] font-inter truncate">{admin?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-montserrat font-bold text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all uppercase tracking-wider"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto bg-matte-black">
        <Routes>
          <Route path="dashboard" element={<AdminDashboardHome />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="*" element={<AdminDashboardHome />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
