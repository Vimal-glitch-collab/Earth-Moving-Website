import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, MessageCircle, CheckCircle, Star, Zap, Shield, Clock, ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

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
    <motion.div 
      ref={ref} 
      className="text-center p-8 bg-dark-surface border border-dark-border rounded-xl"
      whileHover={{ y: -10, borderColor: 'var(--yellow-jcb)' }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-4xl lg:text-6xl font-montserrat font-black text-jcb-yellow mb-2">{count}{suffix}</div>
      <div className="text-white font-inter font-medium tracking-wide uppercase text-sm">{label}</div>
    </motion.div>
  );
};

const Home = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const services = [
    { icon: '🚜', title: 'BACKHOE LOADER RENTAL', desc: 'Daily, weekly & monthly rental of powerful JCB backhoe loaders for any scale of work.' },
    { icon: '🌿', title: 'SITE CLEARING', desc: 'Complete site clearing services — removing debris, trees, and surface obstacles efficiently.' },
    { icon: '📐', title: 'LAND LEVELING', desc: 'Precise land leveling and grading for construction, agriculture, and development projects.' },
    { icon: '⛏️', title: 'EXCAVATION WORK', desc: 'Deep excavation for foundations, basements, drainage lines, and infrastructure projects.' },
  ];

  const whatsappMsg = encodeURIComponent("Hi! I need Backhoe Loader rental service in Sivagangai. Please share availability.");

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="min-h-screen bg-matte-black">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Parallax Image */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: y1 }}
        >
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80"
            alt="Backhoe Loader Construction"
            className="w-full h-[120%] object-cover object-center"
          />
        </motion.div>
        
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="absolute inset-0 hero-gradient z-0"></div>
        <div className="absolute inset-0 hero-vignette z-0"></div>

        {/* Diagonal Accent lines for Industrial feel */}
        <div className="absolute -left-32 -top-32 w-64 h-[150%] bg-jcb-yellow/5 transform rotate-45 z-0 blur-3xl"></div>
        <div className="absolute right-0 bottom-0 w-1/3 h-1 bg-gradient-to-r from-transparent to-jcb-yellow z-10"></div>

        <motion.div 
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <div className="max-w-4xl">
            {/* Badge */}
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-3 bg-dark-surface/80 backdrop-blur-md border border-dark-border px-5 py-2.5 rounded mb-8">
              <span className="w-2 h-2 rounded-full bg-jcb-yellow animate-pulse"></span>
              <span className="text-white text-sm font-montserrat font-bold tracking-widest uppercase">Premium Earth Moving Services</span>
            </motion.div>

            {/* Heading */}
            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-7xl lg:text-[7.5rem] font-black leading-[1.1] mb-8 font-montserrat tracking-tighter">
              <span className="text-white block drop-shadow-2xl">SRI BALAJI</span>
              <span className="text-jcb-yellow block drop-shadow-[0_0_30px_rgba(242,194,0,0.4)]">EARTH MOVERS</span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.div variants={fadeInUp} className="flex items-center gap-6 mb-12">
              <div className="h-1 w-16 bg-jcb-yellow"></div>
              <p className="text-white text-lg lg:text-2xl font-montserrat font-bold tracking-widest uppercase drop-shadow-md">
                20+ Years Of Trusted Earth Moving Service
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-6 mt-14">
              <Link to="/booking" className="btn-premium text-base sm:text-lg">
                Book Now <ArrowRight size={20} />
              </Link>
              <a href={`https://wa.me/919443239842?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#128C7E] text-white font-montserrat font-bold uppercase tracking-widest px-8 py-4 rounded-md flex items-center gap-3 transition-all duration-400 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_10px_25px_rgba(37,211,102,0.4)] shadow-lg">
                <MessageCircle size={20} /> WhatsApp Booking
              </a>
              <Link to="/contact" className="btn-outline-premium text-base sm:text-lg">
                Contact Us
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          style={{ opacity }}
        >
          <span className="text-white/50 text-xs font-montserrat font-bold uppercase tracking-widest">Scroll to explore</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown size={32} className="text-jcb-yellow" />
          </motion.div>
        </motion.div>
      </section>

      {/* STATS SECTION */}
      <section className="relative -mt-16 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-40">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard end={500} label="Projects Completed" />
          <StatCard end={20} label="Years Experience" />
          <StatCard end={150} label="Happy Clients" />
          <StatCard end={24} label="Hour Service" suffix="/7" />
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section className="py-32 bg-dark-bg relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-dark-border to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 bg-jcb-yellow"></div>
              <p className="text-jcb-yellow text-sm font-montserrat font-bold uppercase tracking-[0.3em]">Our Expertise</p>
              <div className="h-px w-12 bg-jcb-yellow"></div>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-5xl lg:text-7xl font-black font-montserrat text-white tracking-tight uppercase leading-[1.2]">
              Industrial <span className="text-transparent bg-clip-text bg-gradient-to-r from-jcb-yellow to-[#a68500]">Services</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {services.map((s, i) => (
              <motion.div 
                key={i} 
                className="card-premium p-10 rounded-xl group relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="absolute -right-10 -top-10 text-[10rem] opacity-5 group-hover:opacity-10 transition-opacity duration-500 font-black">{i+1}</div>
                <div className="text-5xl mb-8 relative z-10 bg-dark-bg w-20 h-20 flex items-center justify-center rounded-full border border-dark-border group-hover:border-jcb-yellow transition-colors">{s.icon}</div>
                <h3 className="text-white font-montserrat font-black text-xl tracking-wide mb-4 relative z-10 group-hover:text-jcb-yellow transition-colors">{s.title}</h3>
                <p className="text-gray-text text-base leading-relaxed relative z-10">{s.desc}</p>
                
                <div className="mt-8 relative z-10 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <Link to="/services" className="text-jcb-yellow font-montserrat font-bold uppercase text-sm tracking-wider flex items-center gap-2">
                    Learn More <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-32 bg-matte-black relative overflow-hidden">
        {/* Background Industrial Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.p variants={fadeInUp} className="text-jcb-yellow text-sm font-montserrat font-bold uppercase tracking-[0.3em] mb-4">Why Choose Us</motion.p>
              <motion.h2 variants={fadeInUp} className="text-4xl lg:text-6xl font-black font-montserrat text-white mb-8 leading-[1.1] tracking-tight uppercase">
                The Standard In <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-jcb-yellow to-[#a68500]">Earth Moving</span>
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-gray-text text-lg leading-relaxed mb-10 font-inter">
                With over a decade of experience in earth moving and construction equipment rental, 
                Sri Balaji Earth Movers delivers reliable, efficient, and professional backhoe loader services 
                that meet the highest industry standards.
              </motion.p>
              
              <ul className="space-y-8 mb-14">
                {[
                  { icon: <Shield size={24} />, text: 'FULLY INSURED & CERTIFIED OPERATORS' },
                  { icon: <Clock size={24} />, text: '24/7 AVAILABILITY & ON-CALL SERVICE' },
                  { icon: <CheckCircle size={24} />, text: 'WELL-MAINTAINED MODERN MACHINERY' },
                  { icon: <Star size={24} />, text: 'COMPETITIVE PRICING, NO HIDDEN CHARGES' },
                ].map((item, i) => (
                  <motion.li key={i} variants={fadeInUp} className="flex items-center gap-5 text-white font-montserrat font-bold tracking-wide text-sm sm:text-base">
                    <div className="flex-shrink-0 w-14 h-14 bg-dark-surface rounded-md flex items-center justify-center text-jcb-yellow border border-dark-border shadow-sm">
                      {item.icon}
                    </div>
                    {item.text}
                  </motion.li>
                ))}
              </ul>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-6">
                <Link to="/booking" className="btn-premium text-sm sm:text-base">
                  Book Now
                </Link>
                <Link to="/projects" className="btn-outline-premium text-sm sm:text-base">
                  View Projects
                </Link>
              </motion.div>
            </motion.div>

            {/* Image */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="absolute -inset-4 bg-jcb-yellow/20 rounded blur-2xl z-0"></div>
              <div className="relative z-10 border border-dark-border rounded overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1590496793929-36417d3117de?w=800&q=80"
                  alt="JCB Backhoe Loader at work"
                  className="w-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Badge overlay */}
              <div className="absolute -bottom-10 -left-10 bg-jcb-yellow text-matte-black p-8 rounded shadow-2xl z-20 hidden md:block">
                <div className="font-montserrat font-black text-5xl mb-1">20+</div>
                <div className="text-sm font-montserrat font-bold uppercase tracking-widest">Years Of Excellence</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24 bg-jcb-yellow relative overflow-hidden">
        {/* Industrial Stripes Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 0, transparent 20px)' }}></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-black font-montserrat text-matte-black mb-8 uppercase tracking-tight leading-[1.2]"
          >
            Ready To Start Your Project?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-matte-black/80 text-xl mb-10 font-inter font-medium max-w-2xl mx-auto"
          >
            Contact us today for quick availability & competitive quotes. We serve Sivagangai and all surrounding areas.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <a href="tel:+919443239842"
              className="bg-matte-black text-jcb-yellow font-montserrat font-bold uppercase tracking-widest px-8 py-4 rounded-md flex items-center gap-3 transition-all duration-400 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)] shadow-xl">
              <Phone size={20} /> Call Now
            </a>
            <a href={`https://wa.me/919443239842?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer"
              className="bg-matte-black text-white font-montserrat font-bold uppercase tracking-widest px-8 py-4 rounded-md flex items-center gap-3 transition-all duration-400 hover:bg-[#25D366] hover:text-white hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_10px_25px_rgba(37,211,102,0.4)] shadow-xl border border-matte-black">
              <MessageCircle size={20} /> WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
