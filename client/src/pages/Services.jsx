import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Shield, Cog, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: '🚜',
    title: 'BACKHOE LOADER RENTAL',
    description: 'Rent our powerful JCB backhoe loaders for daily, weekly, or monthly periods. Suitable for excavation, loading, digging, and material handling tasks across construction and infrastructure projects.',
    features: ['Daily / Weekly / Monthly rental', 'Experienced operators available', 'Quick deployment', 'All project sizes welcome'],
    delay: 0.1,
  },
  {
    icon: '🌿',
    title: 'SITE CLEARING',
    description: 'Professional site clearing services to prepare your land for construction. We remove trees, vegetation, debris, old structures, and surface obstacles efficiently, leaving a clean, ready-to-build site.',
    features: ['Complete debris removal', 'Tree & vegetation clearing', 'Surface preparation', 'Debris disposal assistance'],
    delay: 0.2,
  },
  {
    icon: '📐',
    title: 'LAND LEVELING',
    description: 'Precise land leveling and grading services for construction, agriculture, and real estate development. We ensure perfectly flat, stable surfaces ready for building or cultivation.',
    features: ['Agricultural land leveling', 'Construction site grading', 'Slope correction', 'Drainage improvement'],
    delay: 0.3,
  },
  {
    icon: '⛏️',
    title: 'EXCAVATION WORK',
    description: 'Deep and precise excavation for foundations, basements, trenches, drainage systems, and infrastructure. Our skilled operators ensure accuracy, safety, and speed on every project.',
    features: ['Foundation excavation', 'Drainage & pipeline trenches', 'Basement digging', 'Road & infrastructure work'],
    delay: 0.4,
  },
];

const Services = () => {
  const whatsappMsg = encodeURIComponent("Hi! I'm interested in your services. Please provide more details and pricing.");

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="min-h-screen bg-matte-black pt-20">
      {/* Hero */}
      <section className="py-24 bg-dark-bg relative overflow-hidden">
        {/* Background Industrial Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute left-0 bottom-0 w-full h-px bg-gradient-to-r from-transparent via-jcb-yellow/50 to-transparent"></div>

        <motion.div
          className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10"
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-jcb-yellow"></div>
            <p className="text-jcb-yellow text-sm font-montserrat font-bold uppercase tracking-[0.3em]">What We Offer</p>
            <div className="h-px w-12 bg-jcb-yellow"></div>
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-black font-montserrat text-white mb-6 uppercase tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-jcb-yellow to-[#a68500]">Services</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-gray-text text-lg leading-relaxed font-inter">
            Comprehensive backhoe loader and earth-moving services for construction, agriculture,
            and infrastructure projects across Sivagangai, Tamil Nadu.
          </motion.p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-matte-black relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {services.map((service, i) => (
              <motion.div
                key={i}
                className="card-premium p-10 rounded-xl relative group overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: service.delay }}
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Cog size={120} className="text-white transform group-hover:rotate-90 transition-transform duration-1000" />
                </div>

                <div className="text-5xl mb-8 relative z-10 bg-dark-bg w-20 h-20 flex items-center justify-center rounded border border-dark-border group-hover:border-jcb-yellow transition-colors">{service.icon}</div>
                <h2 className="text-2xl font-black font-montserrat text-white mb-4 uppercase tracking-wide group-hover:text-jcb-yellow transition-colors relative z-10">{service.title}</h2>
                <p className="text-gray-text leading-relaxed mb-8 font-inter relative z-10">{service.description}</p>

                <div className="h-px w-full bg-dark-border mb-8"></div>

                <ul className="space-y-4 mb-10 relative z-10">
                  {service.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-4 text-white font-montserrat font-bold tracking-wide text-sm">
                      <div className="w-6 h-6 rounded bg-dark-surface border border-dark-border flex items-center justify-center">
                        <CheckCircle size={14} className="text-jcb-yellow flex-shrink-0" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/booking" className="btn-outline-premium w-full relative z-10 group-hover:bg-jcb-yellow group-hover:text-black-matte group-hover:border-jcb-yellow">
                  BOOK THIS SERVICE
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-dark-bg relative border-t border-dark-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p variants={fadeInUp} className="text-jcb-yellow text-sm font-montserrat font-bold uppercase tracking-[0.3em] mb-4">How It Works</motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-black font-montserrat text-white uppercase tracking-tight">Simple <span className="text-transparent bg-clip-text bg-gradient-to-r from-jcb-yellow to-[#a68500]">3-Step Process</span></motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[16.6%] w-[66%] h-px bg-dark-border border-dashed z-0"></div>

            {[
              { step: '01', title: 'CONTACT US', desc: 'Call or WhatsApp us with your project details — location, work type, and timeline.' },
              { step: '02', title: 'GET A QUOTE', desc: 'We visit your site (or assess remotely) and provide a transparent, competitive quote.' },
              { step: '03', title: 'WORK BEGINS', desc: 'Our experienced team arrives with the right machinery and completes your project on time.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="text-center relative z-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                <div className="relative w-24 h-24 bg-dark-surface rounded flex items-center justify-center text-jcb-yellow font-montserrat font-black text-3xl mx-auto mb-8 border border-dark-border shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                  {item.step}
                  <div className="absolute inset-0 bg-jcb-yellow/5 rounded"></div>
                </div>
                <h3 className="text-white font-montserrat font-black text-xl tracking-wide mb-4 uppercase">{item.title}</h3>
                <p className="text-gray-text text-base leading-relaxed font-inter px-4">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-jcb-yellow relative overflow-hidden">
        {/* Industrial Stripes Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 0, transparent 20px)' }}></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-black font-montserrat text-matte-black mb-8 uppercase tracking-tight leading-[1.2]"
          >
            Ready To Get Started?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-matte-black/80 font-inter font-medium text-xl mb-12"
          >
            Contact us today for a free site assessment and quote.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <Link to="/booking" className="bg-matte-black text-jcb-yellow font-montserrat font-bold uppercase tracking-widest px-8 py-4 rounded-md flex items-center gap-3 transition-all duration-400 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)] shadow-xl">
              Book Now <ArrowRight size={20} />
            </Link>
            <a href="tel:+919443239842" className="border-2 border-matte-black text-matte-black hover:bg-matte-black hover:text-jcb-yellow font-montserrat font-bold uppercase tracking-widest px-8 py-4 rounded-md transition-all duration-400 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)] shadow-xl flex items-center gap-3">
              <Phone size={20} /> Call Now
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
