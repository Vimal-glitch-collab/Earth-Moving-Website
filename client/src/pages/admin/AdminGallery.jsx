import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Upload, Trash2, Plus, Image as ImageIcon, X, Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '';

const AdminGallery = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Excavation',
    image: null
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/projects`);
      setProjects(res.data.projects || []);
    } catch (err) {
      toast.error('Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!formData.image) return toast.error('Please select an image');
    
    setUploading(true);
    const data = new FormData();
    data.append('title', formData.title);
    data.append('category', formData.category);
    data.append('image', formData.image);

    try {
      const res = await axios.post(`${API_URL}/api/projects`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setProjects([res.data.project, ...projects]);
      toast.success('Photo uploaded successfully');
      setShowModal(false);
      setFormData({ title: '', category: 'Excavation', image: null });
    } catch (err) {
      toast.error('Upload failed. Check server logs.');
    } finally {
      setUploading(false);
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm('Delete this photo from gallery?')) return;
    try {
      await axios.delete(`${API_URL}/api/projects/${id}`);
      setProjects(projects.filter(p => p._id !== id));
      toast.success('Photo removed');
    } catch (err) {
      toast.error('Failed to delete photo');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Photo Gallery</h1>
          <p className="text-gray-400">Manage photos shown in the Projects section.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-yellow-400 hover:bg-yellow-300 text-black font-black px-6 py-3 rounded-xl flex items-center gap-2 transition-all hover:scale-105"
        >
          <Plus size={20} /> Upload New Photo
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl h-64 animate-pulse"></div>
          ))
        ) : projects.length > 0 ? (
          projects.map((p) => (
            <div key={p._id} className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden aspect-square">
              <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                <span className="bg-yellow-400 text-black text-[10px] font-black px-2 py-0.5 rounded-full mb-2 uppercase tracking-tighter">
                  {p.category}
                </span>
                <h3 className="text-white font-bold text-sm mb-4">{p.title}</h3>
                <button 
                  onClick={() => deleteProject(p._id)}
                  className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-zinc-900/50 border border-zinc-800 border-dashed rounded-3xl">
            <ImageIcon size={48} className="mx-auto mb-4 text-gray-700" />
            <p className="text-gray-500 font-medium">Your gallery is empty. Start by uploading project photos.</p>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-fadeInUp">
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Upload Project Photo</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleUpload} className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-400">Photo Title</label>
                <input
                  required
                  type="text"
                  placeholder="e.g., Excavation at Sivagangai"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 text-sm transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-400">Category</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 text-sm appearance-none transition-all"
                >
                  <option value="Excavation">Excavation</option>
                  <option value="Site Clearing">Site Clearing</option>
                  <option value="Land Leveling">Land Leveling</option>
                  <option value="Road Work">Road Work</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-400">Image File</label>
                <div className="relative">
                  <input
                    required
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label 
                    htmlFor="file-upload"
                    className="w-full bg-black border-2 border-dashed border-zinc-700 hover:border-yellow-400/50 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all group"
                  >
                    <Upload size={32} className="text-gray-500 group-hover:text-yellow-400 mb-3" />
                    <span className="text-gray-400 text-sm">
                      {formData.image ? formData.image.name : 'Click to select project image'}
                    </span>
                    <span className="text-gray-600 text-[10px] uppercase mt-2">JPG, PNG or WEBP (Max 5MB)</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:bg-zinc-700 text-black font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Uploading to Cloudinary...
                  </>
                ) : (
                  <>Start Upload</>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
