import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, ZoomIn, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || '';

const CATEGORIES = ['All', 'Excavation', 'Site Clearing', 'Land Leveling', 'Road Work', 'Other'];

// Fallback placeholder images using Unsplash (used when DB is empty)
const PLACEHOLDER_IMAGES = [
  { _id: 'p1', title: 'Excavation Work', category: 'Excavation', imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80' },
  { _id: 'p2', title: 'Site Clearing', category: 'Site Clearing', imageUrl: 'https://images.unsplash.com/photo-1590496793929-36417d3117de?w=800&q=80' },
  { _id: 'p3', title: 'Land Leveling Project', category: 'Land Leveling', imageUrl: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80' },
  { _id: 'p4', title: 'Road Construction', category: 'Road Work', imageUrl: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&q=80' },
  { _id: 'p5', title: 'Foundation Excavation', category: 'Excavation', imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80' },
  { _id: 'p6', title: 'Ground Leveling', category: 'Land Leveling', imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80' },
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

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-matte-black pt-20">
      {/* Hero */}
      <section className="py-24 bg-dark-bg relative overflow-hidden border-b border-dark-border">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <motion.div 
          className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-jcb-yellow"></div>
            <p className="text-jcb-yellow text-sm font-montserrat font-bold uppercase tracking-[0.3em]">Our Work</p>
            <div className="h-px w-12 bg-jcb-yellow"></div>
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-black font-montserrat text-white mb-6 uppercase tracking-tight">
            Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-jcb-yellow to-[#a68500]">Gallery</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-gray-text text-lg leading-relaxed font-inter max-w-2xl mx-auto">
            A showcase of our completed excavation, site clearing, and earth-moving projects across Sivagangai and Tamil Nadu.
          </motion.p>
        </motion.div>
      </section>

      {/* Filter */}
      <section className="py-6 bg-dark-bg border-b border-dark-border sticky top-16 lg:top-20 z-30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-4 overflow-x-auto no-scrollbar py-2">
          <Filter size={18} className="text-jcb-yellow hidden md:block" />
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-6 py-2.5 rounded text-sm font-montserrat font-bold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-jcb-yellow text-matte-black shadow-[0_0_15px_rgba(242,194,0,0.3)] scale-105'
                  : 'bg-dark-surface text-gray-text hover:text-white hover:bg-dark-border border border-dark-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24 bg-matte-black relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-dark-surface border border-dark-border rounded-xl h-64 animate-pulse break-inside-avoid"></div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
              className="text-center py-32 border border-dark-border border-dashed rounded-xl bg-dark-surface/50"
            >
              <div className="text-6xl mb-6 opacity-50">📷</div>
              <p className="text-gray-text font-inter text-lg">No projects found in this category.</p>
            </motion.div>
          ) : (
            <motion.div 
              className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8"
              initial="hidden"
              animate="show"
              variants={staggerContainer}
              key={activeCategory} // re-trigger animation on category change
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((project) => (
                  <motion.div
                    key={project._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="group relative bg-dark-surface border border-dark-border rounded-xl overflow-hidden cursor-pointer shadow-xl break-inside-avoid"
                    onClick={() => setLightbox(project)}
                  >
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-matte-black/90 via-matte-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                      <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="inline-block bg-jcb-yellow text-matte-black text-[10px] font-montserrat font-bold px-3 py-1 rounded mb-3 uppercase tracking-widest">{project.category}</span>
                        <h3 className="text-white font-montserrat font-black text-2xl mb-2">{project.title}</h3>
                        {project.description && (
                           <p className="text-gray-text text-sm font-inter line-clamp-2">{project.description}</p>
                        )}
                      </div>
                      <div className="absolute top-6 right-6 w-12 h-12 bg-jcb-yellow rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-500 delay-100">
                        <ZoomIn size={24} className="text-matte-black" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          <div className="mt-20 text-center border-t border-dark-border pt-10">
            <p className="text-gray-text text-lg font-inter">
              More projects added regularly. <br className="sm:hidden" />
              <span className="text-jcb-yellow font-bold"> Contact us to see site-specific work samples.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-matte-black/95 backdrop-blur-sm z-[100] flex items-center justify-center p-4 lg:p-12"
            onClick={() => setLightbox(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-6xl w-full bg-dark-surface rounded-xl overflow-hidden border border-dark-border shadow-2xl flex flex-col max-h-full" 
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 z-10 w-12 h-12 bg-matte-black/50 hover:bg-jcb-yellow text-white hover:text-matte-black rounded-full flex items-center justify-center backdrop-blur-md transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="flex-1 overflow-hidden bg-matte-black flex items-center justify-center p-2 lg:p-8 relative min-h-[50vh]">
                <img
                  src={lightbox.imageUrl}
                  alt={lightbox.title}
                  className="max-w-full max-h-[70vh] object-contain rounded"
                />
              </div>
              
              <div className="p-6 lg:p-8 bg-dark-surface border-t border-dark-border">
                <div className="flex flex-wrap items-center gap-4 mb-3">
                  <span className="bg-jcb-yellow text-matte-black text-xs font-montserrat font-bold px-3 py-1 rounded uppercase tracking-widest">{lightbox.category}</span>
                </div>
                <h3 className="text-white font-montserrat font-black text-2xl lg:text-3xl uppercase">{lightbox.title}</h3>
                {lightbox.description && (
                  <p className="text-gray-text mt-4 font-inter leading-relaxed max-w-3xl">{lightbox.description}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
