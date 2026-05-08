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
          className="absolute inset-0 w-full h-[120%] z-0"
          style={{ y: y1 }}
        >
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80"
            alt="Backhoe Loader Construction"
            className="w-full h-full object-cover object-center filter contrast-125"
          />
        </motion.div>
        
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-matte-black z-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black/90 z-0"></div>

        {/* Industrial Accents */}
        <div className="absolute left-0 top-0 w-1/3 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 bottom-0 w-1/2 h-2 bg-gradient-to-r from-transparent via-jcb-yellow to-jcb-yellow z-20"></div>

        <motion.div 
          className="relative z-20 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 lg:mt-0"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <div className="max-w-5xl">
            {/* Badge */}
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-4 bg-black/40 backdrop-blur-md border-l-4 border-jcb-yellow px-6 py-3 mb-10">
              <span className="w-2.5 h-2.5 rounded-full bg-jcb-yellow animate-pulse shadow-[0_0_10px_#f2c200]"></span>
              <span className="text-white text-sm font-montserrat font-bold tracking-[0.2em] uppercase">Premium Earth Moving Enterprise</span>
            </motion.div>

            {/* Heading */}
            <motion.h1 variants={fadeInUp} className="text-6xl sm:text-7xl lg:text-[8rem] xl:text-[9rem] font-black leading-[0.9] mb-8 font-montserrat tracking-tighter drop-shadow-2xl">
              <span className="text-white block">SRI BALAJI</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-jcb-yellow to-[#d4aa00] block drop-shadow-[0_0_40px_rgba(242,194,0,0.3)]">EARTH MOVERS</span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row sm:items-center gap-6 mb-14 max-w-3xl">
              <div className="hidden sm:block h-1 w-20 bg-jcb-yellow"></div>
              <p className="text-gray-300 text-lg lg:text-2xl font-inter font-light leading-relaxed border-l-4 sm:border-l-0 border-jcb-yellow pl-4 sm:pl-0">
                Over <strong className="text-white font-bold">20+ years</strong> of delivering reliable, efficient, and heavy-duty construction equipment solutions across Tamil Nadu.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row flex-wrap gap-6 items-start sm:items-center">
              <Link to="/booking" className="btn-premium px-10 py-5 text-lg w-full sm:w-auto">
                BOOK EQUIPMENT <ArrowRight size={24} />
              </Link>
              <Link to="/projects" className="btn-outline-premium px-10 py-5 text-lg w-full sm:w-auto border-gray-400 text-gray-200 hover:border-white hover:text-black-matte">
                VIEW OUR WORK
              </Link>
              <a href={`https://wa.me/919443239842?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-white font-montserrat font-bold uppercase tracking-widest text-sm hover:text-jcb-yellow transition-colors group mt-4 sm:mt-0 sm:ml-4">
                <span className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(37,211,102,0.4)]">
                  <MessageCircle size={20} className="text-white" />
                </span>
                WhatsApp Us
              </a>
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
      <section className="py-40 bg-dark-bg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-dark-border to-transparent"></div>
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-10"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <div className="max-w-3xl">
              <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-6">
                <div className="h-1 w-12 bg-jcb-yellow"></div>
                <p className="text-jcb-yellow text-sm font-montserrat font-bold uppercase tracking-[0.3em]">Our Expertise</p>
              </motion.div>
              <motion.h2 variants={fadeInUp} className="text-5xl lg:text-7xl font-black font-montserrat text-white tracking-tight uppercase leading-[1.1]">
                Industrial <span className="text-transparent bg-clip-text bg-gradient-to-r from-jcb-yellow to-[#a68500]">Services</span>
              </motion.h2>
            </div>
            <motion.div variants={fadeInUp}>
              <Link to="/services" className="flex items-center gap-3 text-white hover:text-jcb-yellow font-montserrat font-bold uppercase tracking-widest text-sm transition-colors group">
                View All Services 
                <span className="w-10 h-10 rounded-full border border-current flex items-center justify-center group-hover:bg-jcb-yellow group-hover:text-black-matte transition-all">
                  <ArrowRight size={16} />
                </span>
              </Link>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((s, i) => (
              <motion.div 
                key={i} 
                className="group relative bg-dark-surface border border-dark-border hover:border-jcb-yellow/50 transition-all duration-500 rounded-2xl overflow-hidden p-1"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="bg-matte-black w-full h-full rounded-xl p-10 relative z-10 flex flex-col justify-between min-h-[400px]">
                  <div>
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity font-black text-8xl text-white">0{i+1}</div>
                    <div className="text-5xl mb-10 w-20 h-20 flex items-center justify-center bg-dark-surface rounded-xl border border-dark-border group-hover:border-jcb-yellow group-hover:bg-jcb-yellow/10 transition-colors shadow-xl">
                      {s.icon}
                    </div>
                    <h3 className="text-white font-montserrat font-black text-2xl tracking-wide mb-6 uppercase leading-snug group-hover:text-jcb-yellow transition-colors">{s.title}</h3>
                    <p className="text-gray-text text-base leading-relaxed font-inter">{s.desc}</p>
                  </div>
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
