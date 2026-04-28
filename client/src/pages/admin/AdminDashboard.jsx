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
    { label: 'Total Bookings', value: stats.bookings, icon: <Calendar />, color: 'bg-blue-500/10 text-blue-500' },
    { label: 'Pending Requests', value: stats.pending, icon: <Clock />, color: 'bg-yellow-400/10 text-yellow-500' },
    { label: 'Project Photos', value: stats.projects, icon: <ImageIcon />, color: 'bg-emerald-500/10 text-emerald-500' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-black text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome back, Admin. Here's what's happening with Sri Balaji Earth Movers.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex items-center gap-5">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
              <p className="text-2xl font-black text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Recent Booking Requests</h2>
          <Link to="/admin/bookings" className="text-yellow-400 hover:text-yellow-300 text-sm font-bold flex items-center gap-1">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Service</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {recent.length > 0 ? recent.map((booking) => (
                <tr key={booking._id} className="text-sm hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-white">{booking.name}</div>
                    <div className="text-gray-500 text-xs">{booking.phone}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{booking.workType}</td>
                  <td className="px-6 py-4 text-gray-300">{new Date(booking.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase badge-${booking.status}`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="px-6 py-10 text-center text-gray-500">No bookings yet.</td>
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
    <div className="min-h-screen bg-black flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-72 bg-zinc-950 border-r border-zinc-800 flex flex-col z-40">
        <div className="p-6 border-b border-zinc-800">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center font-black text-black">SB</div>
            <div>
              <div className="text-white font-bold text-sm">Sri Balaji</div>
              <div className="text-yellow-400 text-[10px] font-bold uppercase tracking-wider">Admin Panel</div>
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
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/10' : 'text-gray-400 hover:text-white hover:bg-zinc-900'
                }`
              }
            >
              {item.icon} {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center gap-3 px-4 py-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold text-xs uppercase">
              {admin?.name?.charAt(0) || 'A'}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-white text-xs font-bold truncate">{admin?.name}</p>
              <p className="text-gray-500 text-[10px] truncate">{admin?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
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
