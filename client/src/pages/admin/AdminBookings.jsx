import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Search, Filter, Trash2, CheckCircle, Clock, XCircle, Phone, MapPin, Calendar, Info } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/bookings`);
      setBookings(res.data.bookings || []);
    } catch (err) {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`${API_URL}/api/bookings/${id}`, { status });
      setBookings(bookings.map(b => b._id === id ? { ...b, status } : b));
      toast.success(`Booking marked as ${status}`);
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking record?')) return;
    try {
      await axios.delete(`${API_URL}/api/bookings/${id}`);
      setBookings(bookings.filter(b => b._id !== id));
      toast.success('Booking deleted');
    } catch (err) {
      toast.error('Failed to delete booking');
    }
  };

  const filteredBookings = bookings.filter(b => {
    const matchesFilter = filter === 'all' || b.status === filter;
    const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase()) || 
                          b.phone.includes(search) || 
                          b.location.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <CheckCircle size={14} className="text-emerald-500" />;
      case 'completed': return <Info size={14} className="text-blue-500" />;
      case 'cancelled': return <XCircle size={14} className="text-red-500" />;
      default: return <Clock size={14} className="text-yellow-500" />;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Booking Requests</h1>
          <p className="text-gray-400">View and manage customer service requests.</p>
        </div>
        <button 
          onClick={fetchBookings}
          className="text-yellow-400 hover:text-white transition-colors text-sm font-bold"
        >
          Refresh List
        </button>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search name, phone, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-yellow-400 text-sm transition-all"
          />
        </div>
        <div className="relative">
          <Filter size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-yellow-400 text-sm appearance-none transition-all"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Bookings Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {loading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl h-64 animate-pulse"></div>
          ))
        ) : filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <div key={booking._id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 lg:p-8 space-y-6 card-hover relative group">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold badge-${booking.status}`}>
                    {booking.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">{booking.name}</h3>
                    <p className="text-yellow-400 font-bold text-xs uppercase tracking-widest">{booking.workType}</p>
                  </div>
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase badge-${booking.status}`}>
                  {getStatusIcon(booking.status)}
                  {booking.status}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <Phone size={16} className="text-yellow-400" /> {booking.phone}
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar size={16} className="text-yellow-400" /> {new Date(booking.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2 text-gray-400 sm:col-span-2">
                  <MapPin size={16} className="text-yellow-400" /> {booking.location}
                </div>
              </div>

              {booking.message && (
                <div className="bg-black/50 p-4 rounded-xl text-gray-400 text-sm italic">
                  "{booking.message}"
                </div>
              )}

              <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => updateStatus(booking._id, 'confirmed')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${booking.status === 'confirmed' ? 'bg-emerald-500 text-white' : 'bg-zinc-800 text-gray-400 hover:text-emerald-500'}`}
                  >
                    Confirm
                  </button>
                  <button 
                    onClick={() => updateStatus(booking._id, 'completed')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${booking.status === 'completed' ? 'bg-blue-500 text-white' : 'bg-zinc-800 text-gray-400 hover:text-blue-500'}`}
                  >
                    Complete
                  </button>
                  <button 
                    onClick={() => updateStatus(booking._id, 'cancelled')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${booking.status === 'cancelled' ? 'bg-red-500 text-white' : 'bg-zinc-800 text-gray-400 hover:text-red-500'}`}
                  >
                    Cancel
                  </button>
                </div>
                <button 
                  onClick={() => deleteBooking(booking._id)}
                  className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                  title="Delete Record"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-zinc-900/50 border border-zinc-800 border-dashed rounded-3xl">
            <Calendar size={48} className="mx-auto mb-4 text-gray-700" />
            <p className="text-gray-500 font-medium">No bookings found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBookings;
