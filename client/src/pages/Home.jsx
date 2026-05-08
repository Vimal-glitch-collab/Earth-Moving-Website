import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, MessageCircle, Shield, Clock, Star, CheckCircle, ChevronDown, Award, Users, HardHat } from 'lucide-react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Animated counter hook
const useCounter = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && !started) {
      setStarted(true);
      let start = 0;
      const step = end / (duration / 16);
      const timer = setInterval(() => {
        start += step;
        if (start >= end) { setCount(end); clearInterval(timer); }
        else setCount(Math.floor(start));
      }, 16);
    }
  }, [end, duration, started, isInView]);

  return { count, ref };
};

const StatItem = ({ end, label, suffix = '+', delay = 0 }) => {
  const { count, ref } = useCounter(end);
  return (
    <motion.div 
      ref={ref} 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className="flex flex-col items-center md:items-start"
    >
      <span className="text-5xl lg:text-7xl font-bebas text-industrial-yellow tracking-tighter leading-none mb-2">
        {count}{suffix}
      </span>
      <span className="text-gray-muted font-inter text-xs lg:text-sm uppercase tracking-[0.2em] font-bold">
        {label}
      </span>
    </motion.div>
  );
};

const Home = () => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 800], [1, 1.1]);

  const whatsappMsg = encodeURIComponent("Hi! I'm interested in your earthmoving services. Please share your equipment list and pricing.");

  const services = [
    { title: 'Earth Excavation', icon: <HardHat className="w-10 h-10" />, desc: 'Deep-scale excavation for large infrastructure projects.' },
    { title: 'Land Leveling', icon: <ArrowRight className="w-10 h-10" />, desc: 'Precision grading and leveling for seamless construction.' },
    { title: 'Backhoe Rental', icon: <Award className="w-10 h-10" />, desc: 'Premium JCB & heavy machinery rental on demand.' },
    { title: 'Site Clearing', icon: <Shield className="w-10 h-10" />, desc: 'Complete removal of debris and obstacles with efficiency.' },
  ];

  return (
    <div className="bg-premium-black min-h-screen text-white">
      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Cinematic Background */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroY, scale: heroScale }}
        >
          <img
            src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&w=1920&q=80"
            alt="Heavy Machinery Cinematic"
            className="w-full h-full object-cover filter brightness-[0.4] contrast-125"
          />
          <div className="absolute inset-0 cinematic-overlay" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,10,0.8)_100%)]" />
        </motion.div>

        {/* Floating Particles/Dust Simulation (CSS handled) */}
        <div className="absolute inset-0 pointer-events-none z-10 opacity-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="ambient-particle"
              style={{
                width: Math.random() * 4 + 2 + 'px',
                height: Math.random() * 4 + 2 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-6 relative z-20 mt-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-6xl"
          >
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-xl border-l-4 border-industrial-yellow px-6 py-2 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-industrial-yellow animate-pulse" />
              <span className="font-inter text-xs font-bold uppercase tracking-[0.4em] text-white/80">
                Premium Industrial Engineering
              </span>
            </motion.div>

            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-6xl md:text-[8rem] lg:text-[9.5rem] font-bebas leading-[0.85] tracking-tighter mb-8"
            >
              MOVING <span className="text-industrial-yellow text-glow">EARTH.</span><br />
              BUILDING <span className="text-white">TRUST.</span>
            </motion.h1>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="font-inter text-lg md:text-2xl text-gray-muted max-w-2xl mb-12 leading-relaxed"
            >
              Premium Earthmoving & Construction Equipment Services in Tamil Nadu. Delivering heavy-duty reliability since 2004.
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-6"
            >
              <Link to="/booking" className="btn-cinematic">
                GET A QUOTE <ArrowRight size={20} />
              </Link>
              <a href="tel:+919994289069" className="btn-outline-cinematic">
                CALL NOW <Phone size={20} />
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated Hero Stats Overlay */}
        <div className="absolute bottom-20 right-6 md:right-20 z-20 hidden lg:block">
          <div className="grid grid-cols-1 gap-12 border-l border-white/10 pl-12 py-6 backdrop-blur-sm">
            <StatItem end={20} label="Years Experience" delay={1} />
            <StatItem end={2000} label="Projects Delivered" delay={1.2} />
            <StatItem end={4.6} label="Customer Rating" suffix="★" delay={1.4} />
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
        >
          <span className="font-bebas text-sm tracking-widest text-white/40">Explore Legacy</span>
          <div className="w-[1px] h-20 bg-gradient-to-b from-industrial-yellow to-transparent" />
        </motion.div>
      </section>

      {/* --- ABOUT SECTION (Cinematic Split) --- */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-gray-muted text-sm font-bold tracking-[0.4em] uppercase mb-6 flex items-center gap-4">
                <span className="w-10 h-[2px] bg-industrial-yellow" /> Our Heritage
              </h2>
              <h3 className="text-5xl md:text-7xl font-bebas mb-8 leading-tight">
                DOMINATING THE <br />
                <span className="text-industrial-yellow">INDUSTRIAL LANDSCAPE</span>
              </h3>
              <p className="font-inter text-gray-muted text-lg mb-10 leading-relaxed max-w-xl">
              <p className="font-inter text-gray-muted text-lg mb-10 leading-relaxed max-w-xl">
                Sri Balaji Earth Movers isn't just an equipment rental service; it's a legacy of precision and power. For over two decades, we have been the backbone of Sivaganga's infrastructure, providing unmatched heavy machinery solutions for government and private projects.
              </p>
              
              <div className="grid grid-cols-2 gap-8 mb-12">
                <div className="border-t border-white/10 pt-6">
                  <h4 className="font-bebas text-2xl text-white mb-2">PRECISION</h4>
                  <p className="text-gray-muted text-sm">Laser-accurate grading and leveling.</p>
                </div>
                <div className="border-t border-white/10 pt-6">
                  <h4 className="font-bebas text-2xl text-white mb-2">POWER</h4>
                  <p className="text-gray-muted text-sm">High-performance heavy machinery.</p>
                </div>
              </div>

              <Link to="/services" className="group flex items-center gap-4 font-bebas text-xl tracking-widest text-industrial-yellow hover:text-white transition-colors">
                DISCOVER OUR STRENGTH <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>

            <motion.div 
              className="relative aspect-video lg:aspect-square group overflow-hidden border border-white/10"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1579412690850-bd41cd0af397?auto=format&fit=crop&w=1200&q=80" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                alt="About Industrial"
              />
              <div className="absolute inset-0 bg-industrial-yellow/10 group-hover:bg-transparent transition-colors duration-500" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION (Glow Cards) --- */}
      <section className="py-32 bg-charcoal relative">
        <div className="industrial-grid absolute inset-0 opacity-20" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-7xl md:text-9xl font-bebas tracking-tighter"
            >
              PREMIUM <span className="text-industrial-yellow">SOLUTIONS</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-premium-black p-12 border border-white/5 hover:border-industrial-yellow/50 transition-all duration-500 hover:-translate-y-4"
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-industrial-yellow scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="text-industrial-yellow mb-8 group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>
                <h3 className="text-3xl font-bebas mb-4 group-hover:text-industrial-yellow transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-muted font-inter leading-relaxed mb-8">
                  {service.desc}
                </p>
                <span className="text-white/20 font-bebas text-6xl absolute bottom-8 right-8">
                  0{index + 1}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MACHINERY SHOWCASE (Interactive Experience) --- */}
      <section className="py-32 bg-premium-black">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-8xl font-bebas leading-none">
                THE <span className="text-industrial-yellow">FLEET</span>
              </h2>
              <p className="text-gray-muted font-inter mt-6">
                Explore our world-class inventory of heavy-duty machinery. Every unit is maintained to Caterpillar® Tier 1 standards.
              </p>
            </div>
            <Link to="/booking" className="btn-outline-cinematic border-industrial-yellow text-industrial-yellow hover:bg-industrial-yellow hover:text-black">
              BOOK EQUIPMENT
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { 
                name: 'JCB 3DX Xtra', 
                type: 'Backhoe Loader', 
                img: 'https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=1200&q=80',
                specs: ['Heavy-duty Digging', 'Advanced Hydraulics']
              },
              { 
                name: 'JCB 3DX Super', 
                type: 'Industrial Earthmover', 
                img: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&w=1200&q=80',
                specs: ['Precision Grading', 'High Efficiency']
              }
            ].map((machine, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 0.98 }}
                className="relative h-[600px] overflow-hidden group border border-white/5"
              >
                <img src={machine.img} className="w-full h-full object-cover filter contrast-125 brightness-[0.6] group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                
                <div className="absolute bottom-12 left-12 right-12">
                  <span className="text-industrial-yellow font-bebas text-xl tracking-[0.2em] mb-4 block">
                    {machine.type}
                  </span>
                  <h4 className="text-5xl md:text-6xl font-bebas mb-6">
                    {machine.name}
                  </h4>
                  <div className="flex gap-4">
                    {machine.specs.map((spec, sIdx) => (
                      <span key={sIdx} className="px-4 py-2 bg-white/10 backdrop-blur-md font-inter text-[10px] uppercase tracking-widest font-bold">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS (Glass Marquee) --- */}
      <section className="py-32 bg-charcoal overflow-hidden">
        <div className="container mx-auto px-6 mb-20">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bebas tracking-[0.4em] mb-6">CLIENT <span className="text-industrial-yellow">VOICES</span></h2>
            <div className="flex justify-center items-center gap-3 text-industrial-yellow mb-6">
              {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={28} />)}
            </div>
            <p className="text-gray-muted font-bebas text-2xl tracking-[0.3em] uppercase">4.6 Google Rating • 2000+ Verified Reviews</p>
          </div>
        </div>

        <div className="marquee-container relative py-10">
          <div className="marquee-content flex gap-12">
            {[
              "BEST SERVICE IN TAMIL NADU",
              "PROFESSIONAL & RESPONSIVE",
              "HEAVY-DUTY RELIABILITY",
              "HIGH WORK SATISFACTION",
              "EXCELLENT OPERATORS",
              "STATE-OF-THE-ART FLEET"
            ].map((text, i) => (
              <div key={i} className="glass-morphism px-16 py-14 min-w-[450px] text-center border-white/10 hover:border-industrial-yellow/30 transition-all duration-700">
                <p className="text-3xl font-bebas tracking-widest mb-8 italic text-white/90">"{text}"</p>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-industrial-yellow/20 flex items-center justify-center text-industrial-yellow font-bold text-xl border border-industrial-yellow/20">
                    {text[0]}
                  </div>
                  <span className="font-inter text-[10px] font-black tracking-[0.4em] text-gray-muted uppercase">Verified Industrial Client</span>
                </div>
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {[
              "BEST SERVICE IN TAMIL NADU",
              "PROFESSIONAL & RESPONSIVE",
              "HEAVY-DUTY RELIABILITY",
              "HIGH WORK SATISFACTION",
              "EXCELLENT OPERATORS",
              "STATE-OF-THE-ART FLEET"
            ].map((text, i) => (
              <div key={i + 10} className="glass-morphism px-16 py-14 min-w-[450px] text-center border-white/10 hover:border-industrial-yellow/30 transition-all duration-700">
                <p className="text-3xl font-bebas tracking-widest mb-8 italic text-white/90">"{text}"</p>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-industrial-yellow/20 flex items-center justify-center text-industrial-yellow font-bold text-xl border border-industrial-yellow/20">
                    {text[0]}
                  </div>
                  <span className="font-inter text-[10px] font-black tracking-[0.4em] text-gray-muted uppercase">Verified Industrial Client</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-40 relative">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80" className="w-full h-full object-cover filter brightness-[0.2] grayscale" />
          <div className="absolute inset-0 bg-gradient-to-b from-premium-black to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-6xl md:text-9xl font-bebas leading-[0.9] mb-12">
              START YOUR <br />
              <span className="text-industrial-yellow">NEXT PROJECT</span> TODAY
            </h2>
            <div className="flex flex-wrap justify-center gap-8">
              <Link to="/booking" className="btn-cinematic px-16">
                GET A QUOTE
              </Link>
              <a href={`https://wa.me/919994289069?text=${whatsappMsg}`} className="btn-outline-cinematic border-white text-white hover:bg-white hover:text-black">
                WHATSAPP US
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
