import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, ZoomIn, Filter } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '';

const CATEGORIES = ['All', 'Excavation', 'Site Clearing', 'Land Leveling', 'Road Work', 'Other'];

// Fallback placeholder images using Unsplash (used when DB is empty)
const PLACEHOLDER_IMAGES = [
  { _id: 'p1', title: 'Excavation Work', category: 'Excavation', imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80' },
  { _id: 'p2', title: 'Site Clearing', category: 'Site Clearing', imageUrl: 'https://images.unsplash.com/photo-1590496793929-36417d3117de?w=600&q=80' },
  { _id: 'p3', title: 'Land Leveling Project', category: 'Land Leveling', imageUrl: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&q=80' },
  { _id: 'p4', title: 'Road Construction', category: 'Road Work', imageUrl: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=600&q=80' },
  { _id: 'p5', title: 'Foundation Excavation', category: 'Excavation', imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80' },
  { _id: 'p6', title: 'Ground Leveling', category: 'Land Leveling', imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80' },
];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/projects`);
        const data = res.data.projects || [];
        setProjects(data.length > 0 ? data : PLACEHOLDER_IMAGES);
      } catch {
        setProjects(PLACEHOLDER_IMAGES);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  // Close lightbox on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Hero */}
      <section className="py-20 bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #EAB308 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-3">Our Work</p>
          <h1 className="text-4xl lg:text-6xl font-black text-white mb-6">
            Project <span className="text-gradient">Gallery</span>
          </h1>
          <p className="text-gray-400 text-lg">
            A showcase of our completed excavation, site clearing, and earth-moving projects across Sivagangai and Tamil Nadu.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 bg-zinc-900 border-b border-zinc-800 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3 overflow-x-auto">
          <Filter size={16} className="text-yellow-400 flex-shrink-0" />
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-6 py-2 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20'
                  : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-zinc-900 rounded-2xl h-64 animate-pulse"></div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📷</div>
              <p className="text-gray-400">No images in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project) => (
                <div
                  key={project._id}
                  className="group relative bg-zinc-900 rounded-2xl overflow-hidden cursor-pointer card-hover"
                  onClick={() => setLightbox(project)}
                >
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 img-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="inline-block bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded mb-2">{project.category}</span>
                      <h3 className="text-white font-bold">{project.title}</h3>
                    </div>
                    <ZoomIn size={20} className="text-white absolute top-4 right-4 opacity-70" />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              More projects added regularly. 
              <span className="text-yellow-400"> Contact us to see site-specific work samples.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors"
            >
              <X size={32} />
            </button>
            <img
              src={lightbox.imageUrl}
              alt={lightbox.title}
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
            <div className="mt-3 text-center">
              <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded mr-2">{lightbox.category}</span>
              <span className="text-white font-semibold">{lightbox.title}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
