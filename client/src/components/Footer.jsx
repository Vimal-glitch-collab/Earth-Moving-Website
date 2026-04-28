import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, MessageCircle } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center font-black text-black text-xl">
                SB
              </div>
              <div>
                <div className="text-white font-bold">Sri Balaji</div>
                <div className="text-yellow-400 text-sm">Earth Movers</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Professional backhoe loader rental services in Sivagangai. Trusted by construction professionals across Tamil Nadu.
            </p>
            <div className="flex gap-3">
              <a href="https://wa.me/919443239842" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-green-600 hover:bg-green-500 flex items-center justify-center transition-colors">
                <MessageCircle size={16} className="text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
              <span className="w-1 h-5 bg-yellow-400 rounded"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/services', label: 'Services' },
                { to: '/projects', label: 'Our Projects' },
                { to: '/booking', label: 'Book a Machine' },
                { to: '/contact', label: 'Contact Us' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to}
                    className="text-gray-400 hover:text-yellow-400 text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
              <span className="w-1 h-5 bg-yellow-400 rounded"></span>
              Services
            </h3>
            <ul className="space-y-3">
              {[
                'Backhoe Loader Rental',
                'Site Clearing',
                'Land Leveling',
                'Excavation Work',
              ].map(service => (
                <li key={service}>
                  <span className="text-gray-400 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
              <span className="w-1 h-5 bg-yellow-400 rounded"></span>
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="tel:+919443239842" className="flex items-start gap-3 text-gray-400 hover:text-yellow-400 transition-colors group">
                  <Phone size={16} className="mt-0.5 flex-shrink-0 text-yellow-400" />
                  <div className="text-sm">
                    <div>+91 94432 39842</div>
                    <div>+91 99942 89069</div>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-gray-400">
                  <MapPin size={16} className="mt-0.5 flex-shrink-0 text-yellow-400" />
                  <p className="text-sm">
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
        <div className="border-t border-zinc-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center">
            © {currentYear} Sri Balaji Earth Movers. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm">
            <Link to="/admin/login" className="text-gray-600 hover:text-yellow-400 transition-colors text-xs">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
