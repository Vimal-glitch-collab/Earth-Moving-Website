import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, MessageCircle } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-matte-black border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-4 group mb-6 inline-flex">
              <div className="w-12 h-12 bg-jcb-yellow rounded flex items-center justify-center font-montserrat font-black text-black-matte text-xl group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(242,194,0,0.2)]">
                SB
              </div>
              <div>
                <div className="text-white font-montserrat font-black text-base tracking-tighter uppercase leading-none">SRI BALAJI</div>
                <div className="text-jcb-yellow font-montserrat text-[10px] font-bold tracking-[0.25em] uppercase leading-none mt-1.5">EARTH MOVERS</div>
              </div>
            </Link>
            <p className="text-gray-text text-sm leading-relaxed mb-6 font-inter">
              Professional backhoe loader rental services in Sivagangai. Trusted by construction professionals across Tamil Nadu.
            </p>
            <div className="flex gap-4">
              <a href="https://wa.me/919443239842" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded bg-dark-surface border border-dark-border hover:border-jcb-yellow hover:text-jcb-yellow flex items-center justify-center transition-all">
                <MessageCircle size={18} className="text-current" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-montserrat font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-3">
              <span className="w-2 h-2 bg-jcb-yellow"></span>
              Quick Links
            </h3>
            <ul className="space-y-4">
              {[
                { to: '/', label: 'Home' },
                { to: '/services', label: 'Services' },
                { to: '/projects', label: 'Our Projects' },
                { to: '/booking', label: 'Book a Machine' },
                { to: '/contact', label: 'Contact Us' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to}
                    className="text-gray-text hover:text-jcb-yellow text-sm font-inter transition-colors flex items-center gap-3 group">
                    <span className="w-0 h-px bg-jcb-yellow transition-all duration-300 group-hover:w-3"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-montserrat font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-3">
              <span className="w-2 h-2 bg-jcb-yellow"></span>
              Services
            </h3>
            <ul className="space-y-4">
              {[
                'Backhoe Loader Rental',
                'Site Clearing',
                'Land Leveling',
                'Excavation Work',
              ].map(service => (
                <li key={service}>
                  <span className="text-gray-text text-sm font-inter flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-dark-border group-hover:bg-jcb-yellow transition-colors"></span>
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-montserrat font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-3">
              <span className="w-2 h-2 bg-jcb-yellow"></span>
              Contact Info
            </h3>
            <ul className="space-y-5">
              <li>
                <a href="tel:+919443239842" className="flex items-start gap-4 text-gray-text hover:text-jcb-yellow transition-colors group">
                  <div className="p-2 bg-dark-surface rounded group-hover:bg-jcb-yellow/10 transition-colors">
                    <Phone size={16} className="text-jcb-yellow" />
                  </div>
                  <div className="text-sm font-inter pt-1">
                    <div className="mb-1 font-medium text-white group-hover:text-jcb-yellow transition-colors">+91 94432 39842</div>
                    <div>+91 99942 89069</div>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-4 text-gray-text">
                  <div className="p-2 bg-dark-surface rounded">
                    <MapPin size={16} className="text-jcb-yellow" />
                  </div>
                  <p className="text-sm font-inter leading-relaxed pt-1">
                    88, Sri Balaji Bhavanam<br />
                    Senthamil Nagar<br />
                    Railway Station Road<br />
                    Sivagangai - 630561<br />
                    Tamil Nadu, India
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-dark-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-text text-sm text-center font-inter">
            © {currentYear} Sri Balaji Earth Movers. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm font-inter font-medium">
            <Link to="/admin/login" className="text-gray-text hover:text-white transition-colors text-xs uppercase tracking-wider">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
