import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, MessageCircle, ArrowRight, Globe, Share2, Users } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-premium-black border-t border-white/5 relative overflow-hidden">
      <div className="industrial-grid absolute inset-0 opacity-5 pointer-events-none" />
      
      <div className="container mx-auto px-6 pt-24 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-6 group mb-10 inline-flex">
              <div className="w-16 h-16 bg-industrial-yellow rounded-sm flex items-center justify-center font-bebas text-3xl text-black font-bold group-hover:rotate-90 transition-transform duration-500">
                SB
              </div>
              <div>
                <div className="text-white font-bebas text-4xl tracking-widest leading-none">SRI BALAJI</div>
                <div className="text-industrial-yellow font-inter text-[10px] font-black tracking-[0.5em] uppercase leading-none mt-2">EARTH MOVERS</div>
              </div>
            </Link>
            <p className="text-gray-muted text-sm leading-relaxed mb-10 font-inter max-w-xs">
              Redefining industrial standards through precision, power, and over two decades of heavy engineering excellence.
            </p>
            <div className="flex gap-4">
              {[Globe, Share2, Users].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-industrial-yellow hover:text-black hover:border-industrial-yellow transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Core Navigation */}
          <div>
            <h3 className="text-white font-bebas text-2xl tracking-widest mb-8 border-b border-white/5 pb-4">
              NAVIGATION
            </h3>
            <ul className="space-y-4">
              {[
                { to: '/', label: 'Home' },
                { to: '/services', label: 'Services' },
                { to: '/projects', label: 'Projects' },
                { to: '/booking', label: 'Inquiry' },
                { to: '/contact', label: 'Contact' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to}
                    className="text-gray-muted hover:text-industrial-yellow text-sm font-inter transition-colors flex items-center gap-3 group">
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Expertise */}
          <div>
            <h3 className="text-white font-bebas text-2xl tracking-widest mb-8 border-b border-white/5 pb-4">
              EXPERTISE
            </h3>
            <ul className="space-y-4">
              {[
                'Earth Excavation',
                'Land Leveling',
                'Backhoe Loader Rental',
                'Site Clearing',
                'Road Preparation',
              ].map(service => (
                <li key={service} className="text-gray-muted text-sm font-inter flex items-center gap-3 cursor-default hover:text-white transition-colors">
                  <div className="w-1.5 h-1.5 bg-industrial-yellow rounded-full" />
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="text-white font-bebas text-2xl tracking-widest mb-8 border-b border-white/5 pb-4">
              CONTACT
            </h3>
            <ul className="space-y-6">
              <li>
                <a href="tel:+919994289069" className="flex items-start gap-4 text-gray-muted hover:text-white transition-colors group">
                  <Phone size={18} className="text-industrial-yellow mt-1" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-1">Direct Line</p>
                    <p className="text-lg font-bebas tracking-wider">+91 99942 89069</p>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-4 text-gray-muted">
                <Clock size={18} className="text-industrial-yellow mt-1" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1">Working Hours</p>
                  <p className="text-sm font-inter leading-relaxed">06:00 AM – 06:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-4 text-gray-muted">
                <MapPin size={18} className="text-industrial-yellow mt-1" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1">Headquarters</p>
                  <p className="text-sm font-inter leading-relaxed">
                    Railway Station Rd, Senthamil Nagar,<br />
                    Sivaganga, TN 630561
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-gray-muted text-[10px] font-bold uppercase tracking-[0.4em] text-center">
            © {currentYear} SRI BALAJI EARTH MOVERS • INDUSTRIAL EXCELLENCE
          </p>
          <div className="flex gap-12">
            <Link to="/admin/login" className="text-white/20 hover:text-white text-[10px] font-bold uppercase tracking-[0.3em] transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
