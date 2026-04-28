import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 navbar-glass`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center font-black text-black text-lg group-hover:scale-105 transition-transform">
              SB
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-bold text-sm leading-tight">Sri Balaji</div>
              <div className="text-yellow-400 text-xs font-medium">Earth Movers</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-yellow-400 bg-yellow-400/10'
                      : 'text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/10'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+919443239842"
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-yellow-400 transition-colors"
            >
              <Phone size={14} />
              <span>+91 94432 39842</span>
            </a>
            <Link
              to="/booking"
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-5 py-2.5 rounded-lg text-sm transition-all duration-200 hover:scale-105"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-gray-300 hover:text-yellow-400 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-zinc-900 border-t border-yellow-400/20 animate-fadeIn">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive ? 'text-yellow-400 bg-yellow-400/10' : 'text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/10'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-3 border-t border-zinc-700">
              <a href="tel:+919443239842" className="flex items-center gap-2 px-4 py-2 text-yellow-400 text-sm">
                <Phone size={14} /> +91 94432 39842
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
