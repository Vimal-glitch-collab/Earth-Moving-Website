import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Hexagon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [location, menuOpen]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/projects', label: 'Projects' },
    { to: '/booking', label: 'Book Now' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${scrolled ? 'glass-morphism py-2' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-6 group relative z-50">
            <div className="relative">
              <Hexagon className="w-16 h-16 text-industrial-yellow fill-industrial-yellow/10 group-hover:rotate-90 transition-transform duration-700" />
              <span className="absolute inset-0 flex items-center justify-center font-bebas text-3xl text-white font-bold group-hover:scale-110 transition-transform">
                SB
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-bebas text-4xl tracking-widest text-white leading-none">SRI BALAJI</span>
              <span className="font-inter text-[10px] font-black tracking-[0.5em] text-industrial-yellow uppercase leading-none mt-2">EARTH MOVERS</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-4">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-6 py-2 font-bebas text-xl tracking-[0.1em] uppercase transition-all duration-300 relative group overflow-hidden ${
                    isActive ? 'text-industrial-yellow' : 'text-white/60 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">{link.label}</span>
                    {isActive && (
                      <motion.div 
                        layoutId="nav-active" 
                        className="absolute bottom-0 left-6 right-6 h-[2px] bg-industrial-yellow" 
                      />
                    )}
                    <div className="absolute inset-0 bg-white/5 -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right Side CTA */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="tel:+919994289069" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-industrial-yellow transition-colors">
                <Phone size={18} className="text-industrial-yellow" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-white/40 tracking-widest uppercase">Support Line</span>
                <span className="font-bebas text-lg text-white tracking-wider">+91 99942 89069</span>
              </div>
            </a>
            <Link to="/booking" className="btn-cinematic !px-6 !py-3 !text-lg">
              INQUIRY
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden relative z-50 p-2 text-white" 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-premium-black z-40 lg:hidden flex flex-col justify-center items-center gap-8"
          >
            <div className="industrial-grid absolute inset-0 opacity-10" />
            
            {navLinks.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `text-5xl md:text-7xl font-bebas tracking-tighter transition-all ${
                      isActive ? 'text-industrial-yellow' : 'text-white/40 hover:text-white'
                    }`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex flex-col items-center gap-6"
            >
              <a href="tel:+919994289069" className="text-2xl font-bebas tracking-widest text-industrial-yellow">
                +91 99942 89069
              </a>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                  <Phone size={24} className="text-white" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
