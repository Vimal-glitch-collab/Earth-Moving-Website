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
    <div className="space-y-10 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black font-montserrat text-white mb-2 uppercase tracking-tight">Photo Gallery</h1>
          <p className="text-gray-text font-inter">Manage photos shown in the Projects section.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="btn-premium"
        >
          <Plus size={20} /> UPLOAD PHOTO
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="bg-dark-surface border border-dark-border rounded-xl h-64 animate-pulse"></div>
          ))
        ) : projects.length > 0 ? (
          projects.map((p) => (
            <div key={p._id} className="group relative bg-dark-surface border border-dark-border rounded-xl overflow-hidden aspect-square hover:border-jcb-yellow/40 transition-colors">
              <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-matte-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                <span className="bg-jcb-yellow text-matte-black text-[10px] font-montserrat font-black px-2 py-1 rounded mb-3 uppercase tracking-widest">
                  {p.category}
                </span>
                <h3 className="text-white font-montserrat font-bold text-sm mb-5 uppercase">{p.title}</h3>
                <button 
                  onClick={() => deleteProject(p._id)}
                  className="w-12 h-12 rounded bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-24 text-center bg-dark-surface border border-dark-border border-dashed rounded-xl">
            <ImageIcon size={48} className="mx-auto mb-4 text-dark-border" />
            <p className="text-gray-text font-inter font-medium">Your gallery is empty. Start by uploading project photos.</p>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-matte-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-dark-surface border border-dark-border w-full max-w-lg rounded-xl overflow-hidden shadow-2xl animate-fadeInUp">
            <div className="p-6 border-b border-dark-border flex items-center justify-between">
              <h2 className="text-xl font-black font-montserrat text-white uppercase tracking-wide">Upload Project Photo</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-text hover:text-white w-10 h-10 rounded hover:bg-dark-bg flex items-center justify-center transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleUpload} className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-montserrat font-bold uppercase tracking-wider text-gray-text">Photo Title</label>
                <input
                  required
                  type="text"
                  placeholder="e.g., Excavation at Sivagangai"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-dark-bg border border-dark-border rounded px-4 py-3 text-white font-inter focus:outline-none focus:border-jcb-yellow text-sm transition-all placeholder:text-gray-text/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-montserrat font-bold uppercase tracking-wider text-gray-text">Category</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-dark-bg border border-dark-border rounded px-4 py-3 text-white font-inter focus:outline-none focus:border-jcb-yellow text-sm appearance-none transition-all"
                >
                  <option value="Excavation">Excavation</option>
                  <option value="Site Clearing">Site Clearing</option>
                  <option value="Land Leveling">Land Leveling</option>
                  <option value="Road Work">Road Work</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-montserrat font-bold uppercase tracking-wider text-gray-text">Image File</label>
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
                    className="w-full bg-dark-bg border-2 border-dashed border-dark-border hover:border-jcb-yellow/60 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all group"
                  >
                    <Upload size={36} className="text-dark-border group-hover:text-jcb-yellow mb-4 transition-colors" />
                    <span className="text-gray-text text-sm font-inter group-hover:text-white transition-colors">
                      {formData.image ? formData.image.name : 'Click to select project image'}
                    </span>
                    <span className="text-dark-border text-[10px] uppercase tracking-wider mt-2 font-montserrat font-bold">JPG, PNG or WEBP (Max 5MB)</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="btn-premium w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? (
                  <><Loader2 size={20} className="animate-spin" /> UPLOADING...</>
                ) : (
                  'START UPLOAD'
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
