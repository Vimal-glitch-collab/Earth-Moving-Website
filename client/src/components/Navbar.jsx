import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
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
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/projects', label: 'Projects' },
    { to: '/booking', label: 'Book Now' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'navbar-glass py-2' : 'bg-gradient-to-b from-black/80 to-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-jcb-yellow rounded flex items-center justify-center font-montserrat font-black text-black-matte text-xl group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(242,194,0,0.4)]">
              SB
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-montserrat font-black text-base tracking-tighter uppercase leading-none">SRI BALAJI</div>
              <div className="text-jcb-yellow font-montserrat text-[10px] font-bold tracking-[0.25em] uppercase leading-none mt-1.5">EARTH MOVERS</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-5 py-2.5 rounded text-sm font-montserrat font-bold tracking-wide uppercase transition-all duration-300 relative overflow-hidden group ${
                    isActive ? 'text-jcb-yellow' : 'text-gray-text hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">{link.label}</span>
                    {isActive && (
                      <motion.div layoutId="navbar-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-jcb-yellow" />
                    )}
                    <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-6">
            <a href="tel:+919443239842" className="flex items-center gap-2 text-sm font-montserrat font-semibold text-gray-text hover:text-jcb-yellow transition-colors group">
              <div className="p-2 bg-dark-surface rounded-full group-hover:bg-jcb-yellow/10 transition-colors">
                <Phone size={16} className="text-jcb-yellow" />
              </div>
              <span className="tracking-wider">+91 94432 39842</span>
            </a>
            <Link to="/booking" className="btn-premium text-sm shadow-lg">
              Book Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="lg:hidden p-2 text-white hover:text-jcb-yellow transition-colors" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-matte-black/95 backdrop-blur-xl border-t border-dark-border overflow-hidden"
          >
            <div className="px-4 py-6 space-y-2">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `block px-6 py-4 rounded text-sm font-montserrat font-bold tracking-wider uppercase transition-all ${
                      isActive ? 'text-black-matte bg-jcb-yellow' : 'text-gray-text hover:text-white hover:bg-dark-surface'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="pt-6 mt-4 border-t border-dark-border">
                <a href="tel:+919443239842" className="flex items-center gap-3 px-6 py-4 bg-dark-surface rounded text-jcb-yellow text-sm font-montserrat font-bold">
                  <Phone size={18} /> Call +91 94432 39842
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
