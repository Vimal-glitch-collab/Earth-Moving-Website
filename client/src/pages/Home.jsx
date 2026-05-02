import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, MessageCircle, CheckCircle, Star, Zap, Shield, Clock, ChevronDown } from 'lucide-react';

// Animated counter hook
const useCounter = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true);
        let start = 0;
        const step = end / (duration / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= end) { setCount(end); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, started]);

  return { count, ref };
};

const StatCard = ({ end, label, suffix = '+' }) => {
  const { count, ref } = useCounter(end);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl lg:text-5xl font-black text-yellow-400">{count}{suffix}</div>
      <div className="text-gray-400 text-sm mt-1">{label}</div>
    </div>
  );
};

const Home = () => {
  const services = [
    { icon: '🚜', title: 'Backhoe Loader Rental', desc: 'Daily, weekly & monthly rental of powerful JCB backhoe loaders for any scale of work.' },
    { icon: '🌿', title: 'Site Clearing', desc: 'Complete site clearing services — removing debris, trees, and surface obstacles efficiently.' },
    { icon: '📐', title: 'Land Leveling', desc: 'Precise land leveling and grading for construction, agriculture, and development projects.' },
    { icon: '⛏️', title: 'Excavation Work', desc: 'Deep excavation for foundations, basements, drainage lines, and infrastructure projects.' },
  ];

  const whatsappMsg = encodeURIComponent("Hi! I need Backhoe Loader rental service in Sivagangai. Please share availability.");

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80"
            alt="Backhoe Loader Construction"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 z-0"></div>
          <div className="absolute inset-0 hero-gradient"></div>
        </div>

        {/* Yellow accent line */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400 z-10"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40 flex flex-col items-center">
          <div className="w-full">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full px-4 py-2 mb-6 animate-fadeInUp">
              <Zap size={14} className="text-yellow-400" />
              <span className="text-yellow-400 text-sm font-medium">Sivagangai's Most Trusted JCB Service</span>
            </div>

            {/* Heading */}
            <div className="text-center mb-8">
              <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black leading-none mb-6 animate-fadeInUp tracking-tighter" style={{ animationDelay: '0.1s' }}>
                <span className="text-white block">SRI BALAJI</span>
                <span className="text-yellow-400 block drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]">EARTH MOVERS</span>
              </h1>
              
              <div className="inline-block bg-yellow-400 text-black font-black px-6 py-2 rounded-full text-sm lg:text-base uppercase tracking-widest animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                20+ Years of Trusted Service
              </div>
            </div>

            <p className="text-gray-200 text-lg lg:text-2xl leading-relaxed mb-10 animate-fadeInUp text-center max-w-4xl mx-auto drop-shadow-md" style={{ animationDelay: '0.3s' }}>
              Sivagangai's leading choice for professional JCB backhoe loader rentals, 
              excavation, and land development services since 2004.
            </p>

            <p className="text-gray-300 text-lg lg:text-xl leading-relaxed mb-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              Professional JCB backhoe loader rental for excavation, site clearing, land leveling and more.
              Fast, reliable, and affordable — serving Sivagangai and surrounding areas.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-6 mb-12 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <Link to="/booking"
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-10 py-4 rounded-full flex items-center gap-2 transition-all duration-300 hover:scale-105 shadow-[0_10px_20px_rgba(234,179,8,0.3)]">
                Book Now <ArrowRight size={18} />
              </Link>
              <a href={`https://wa.me/919443239842?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-500 text-white font-bold px-10 py-4 rounded-full flex items-center gap-2 transition-all duration-300 hover:scale-105 shadow-[0_10px_20px_rgba(22,163,74,0.3)]">
                <MessageCircle size={18} /> WhatsApp
              </a>
              <Link to="/contact"
                className="border-2 border-white/50 hover:border-yellow-400 text-white hover:text-yellow-400 font-bold px-10 py-4 rounded-full flex items-center gap-2 transition-all duration-300 hover:bg-white/10">
                Contact Us
              </Link>
            </div>

            {/* Phone numbers */}
            <div className="flex flex-wrap justify-center gap-8 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
              <a href="tel:+919443239842" className="flex items-center gap-3 text-white hover:text-yellow-400 transition-colors bg-white/5 px-6 py-3 rounded-full border border-white/10">
                <Phone size={18} className="text-yellow-400" />
                <span className="font-bold">+91 94432 39842</span>
              </a>
              <a href="tel:+919994289069" className="flex items-center gap-3 text-white hover:text-yellow-400 transition-colors bg-white/5 px-6 py-3 rounded-full border border-white/10">
                <Phone size={18} className="text-yellow-400" />
                <span className="font-bold">+91 99942 89069</span>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown size={28} className="text-yellow-400 opacity-70" />
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-zinc-900 border-y border-zinc-800 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard end={500} label="Projects Completed" />
            <StatCard end={20} label="Years Experience" />
            <StatCard end={150} label="Happy Clients" />
            <StatCard end={24} label="Hour Service" suffix="/7" />
          </div>
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-3">What We Do</p>
            <h2 className="text-3xl lg:text-5xl font-black text-white mb-4">Our <span className="text-gradient">Services</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From small excavations to large-scale earth moving — we have the right machine and expertise for your project.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {services.map((s, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 hover:border-yellow-400/50 rounded-2xl p-6 card-hover transition-all duration-300 group">
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="text-white font-bold mb-3 group-hover:text-yellow-400 transition-colors">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/services"
              className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-semibold border border-yellow-400/30 hover:border-yellow-400 px-6 py-3 rounded-xl transition-all">
              View All Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-3">Why Choose Us</p>
              <h2 className="text-3xl lg:text-5xl font-black text-white mb-6">
                Trusted By <span className="text-gradient">Professionals</span> Across Tamil Nadu
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                With over a decade of experience in earth moving and construction equipment rental, 
                Sri Balaji Earth Movers delivers reliable, efficient, and professional backhoe loader services 
                that meet the highest standards.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: <Shield size={20} />, text: 'Fully insured & certified operators' },
                  { icon: <Clock size={20} />, text: '24/7 availability and on-call service' },
                  { icon: <CheckCircle size={20} />, text: 'Well-maintained modern machinery' },
                  { icon: <Star size={20} />, text: 'Competitive pricing, no hidden charges' },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <span className="text-yellow-400 flex-shrink-0">{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex gap-4">
                <Link to="/booking" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-4 rounded-full flex items-center gap-2 transition-all hover:scale-105 shadow-lg">
                  Book Now <ArrowRight size={16} />
                </Link>
                <Link to="/projects" className="border-2 border-zinc-700 hover:border-yellow-400 text-white hover:text-yellow-400 px-8 py-4 rounded-full transition-all hover:bg-white/5">
                  View Projects
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="absolute -inset-4 bg-yellow-400/10 rounded-3xl blur-xl"></div>
              <img
                src="https://images.unsplash.com/photo-1590496793929-36417d3117de?w=800&q=80"
                alt="JCB Backhoe Loader at work"
                className="relative rounded-2xl w-full object-cover shadow-2xl border border-zinc-800"
              />
              {/* Badge overlay */}
              <div className="absolute -bottom-5 -left-5 bg-yellow-400 text-black px-6 py-4 rounded-2xl shadow-2xl font-black text-xl">
                20+ Years
                <div className="text-xs font-bold uppercase tracking-wider opacity-80">Trusted Service</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 bg-yellow-400 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }}></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-black text-black mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-black/70 text-lg mb-8">
            Contact us today for quick availability & competitive quotes. We serve Sivagangai and all surrounding areas.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+919443239842"
              className="bg-black text-yellow-400 font-bold px-10 py-4 rounded-full flex items-center gap-2 hover:bg-zinc-900 transition-all hover:scale-105 shadow-xl">
              <Phone size={18} /> Call Now
            </a>
            <a href={`https://wa.me/919443239842?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer"
              className="bg-green-600 text-white font-bold px-10 py-4 rounded-full flex items-center gap-2 hover:bg-green-500 transition-all hover:scale-105 shadow-xl">
              <MessageCircle size={18} /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
