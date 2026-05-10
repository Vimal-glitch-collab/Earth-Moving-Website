import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, ZoomIn, Filter, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || '';

const CATEGORIES = ['All', 'Excavation', 'Site Clearing', 'Land Leveling', 'Road Work', 'Other'];

const PLACEHOLDER_IMAGES = [
  { _id: 'p1', title: 'Industrial Foundation Excavation', category: 'Excavation', imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?w=800&q=80' },
  { _id: 'p2', title: 'Sivaganga Site Clearing', category: 'Site Clearing', imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80' },
  { _id: 'p3', title: 'Precision Land Leveling', category: 'Land Leveling', imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80' },
  { _id: 'p4', title: 'Industrial Road Construction', category: 'Road Work', imageUrl: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&q=80' },
  { _id: 'p5', title: 'Deep Excavation Mission', category: 'Excavation', imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?w=800&q=80' },
  { _id: 'p6', title: 'Sector Ground Leveling', category: 'Land Leveling', imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80' },
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

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="bg-premium-black min-h-screen pt-32 pb-24">
      {/* Header */}
      <section className="relative py-24 overflow-hidden mb-12">
        <div className="industrial-grid absolute inset-0 opacity-10 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-7xl md:text-9xl font-bebas leading-[0.85] tracking-tighter mb-8">
              PROJECT <span className="text-industrial-yellow">GALLERY</span>
            </h1>
            <p className="font-inter text-lg text-gray-muted max-w-2xl mx-auto leading-relaxed">
              A chronological visual of our industrial impact across Sivaganga. Transforming terrains with engineering precision.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-[80] py-8 glass-morphism border-y border-white/5 mb-16">
        <div className="container mx-auto px-6 flex items-center justify-center gap-4 overflow-x-auto no-scrollbar">
          <Filter size={20} className="text-industrial-yellow hidden md:block" />
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-8 py-3 font-bebas text-lg tracking-widest transition-all duration-300 relative overflow-hidden group ${
                activeCategory === cat
                  ? 'text-black'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <span className="relative z-10">{cat}</span>
              {activeCategory === cat && (
                <motion.div layoutId="filter-active" className="absolute inset-0 bg-industrial-yellow z-0" />
              )}
              <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0" />
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="container mx-auto px-6">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-charcoal aspect-[4/5] animate-pulse border border-white/5" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-40 border border-white/5 border-dashed">
            <p className="text-gray-muted font-bebas text-4xl">NO PROJECTS FOUND</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, idx) => (
                <motion.div
                  key={project._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                  className="group relative h-[500px] overflow-hidden border border-white/5 cursor-none"
                  onClick={() => setLightbox(project)}
                >
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute bottom-10 left-10 right-10">
                    <span className="text-industrial-yellow font-bebas text-lg tracking-[0.2em] mb-3 block">
                      {project.category}
                    </span>
                    <h3 className="text-4xl font-bebas text-white mb-4 group-hover:text-industrial-yellow transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-4 text-white/40 group-hover:text-white transition-colors">
                      <span className="font-inter text-[10px] font-bold uppercase tracking-widest">VIEW PROJECT DETAILS</span>
                      <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                  </div>

                  <div className="absolute top-10 right-10 w-16 h-16 rounded-full glass-morphism flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500">
                    <ZoomIn size={24} className="text-white" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-premium-black/95 backdrop-blur-2xl z-[200] flex items-center justify-center p-8 lg:p-24"
            onClick={() => setLightbox(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-7xl w-full flex flex-col lg:flex-row gap-12 max-h-full overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-12 lg:-top-20 right-0 w-12 h-12 flex items-center justify-center text-white/40 hover:text-industrial-yellow transition-colors"
              >
                <X size={40} />
              </button>
              
              <div className="lg:w-2/3 bg-black flex items-center justify-center border border-white/5">
                <img
                  src={lightbox.imageUrl}
                  alt={lightbox.title}
                  className="max-w-full max-h-[80vh] object-contain"
                />
              </div>
              
              <div className="lg:w-1/3 py-12 flex flex-col justify-center">
                <span className="text-industrial-yellow font-bebas text-2xl tracking-[0.3em] mb-6">
                  {lightbox.category}
                </span>
                <h3 className="text-6xl md:text-8xl font-bebas text-white mb-10 leading-none">
                  {lightbox.title}
                </h3>
                {lightbox.description && (
                  <p className="text-gray-muted font-inter text-lg leading-relaxed mb-12">
                    {lightbox.description}
                  </p>
                )}
                
                <div className="flex flex-col gap-6">
                  <div className="border-t border-white/10 pt-6">
                    <p className="text-xs font-bold text-white/20 uppercase tracking-widest mb-2">Location</p>
                    <p className="font-bebas text-2xl tracking-widest">SIVAGANGA, TAMIL NADU</p>
                  </div>
                  <div className="border-t border-white/10 pt-6">
                    <p className="text-xs font-bold text-white/20 uppercase tracking-widest mb-2">Completion</p>
                    <p className="font-bebas text-2xl tracking-widest">INDUSTRIAL CERTIFIED</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
