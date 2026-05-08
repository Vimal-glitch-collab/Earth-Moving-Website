import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Shield, Cog, Phone, HardHat, Construction, Truck, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: <HardHat className="w-12 h-12" />,
    title: 'Earth Excavation',
    description: 'Deep-scale excavation for large infrastructure projects. Foundations, basements, and complex drainage systems.',
    features: ['Foundation digging', 'Basement excavation', 'Infrastructure support', 'Precision depth control'],
  },
  {
    icon: <Construction className="w-12 h-12" />,
    title: 'Land Leveling',
    description: 'Precision grading and leveling for seamless construction. We ensure stable, perfectly flat surfaces for any project.',
    features: ['Agricultural grading', 'Site preparation', 'Drainage improvement', 'Slope correction'],
  },
  {
    icon: <Truck className="w-12 h-12" />,
    title: 'Backhoe Rental',
    description: 'Premium JCB & heavy machinery rental on demand. Powerful, well-maintained units with certified operators.',
    features: ['Flexible rental periods', 'Certified operators', 'Caterpillar standards', 'Quick deployment'],
  },
  {
    icon: <Shield className="w-12 h-12" />,
    title: 'Site Clearing',
    description: 'Complete removal of debris, vegetation, and obstacles. Transforming raw land into a construction-ready site.',
    features: ['Tree removal', 'Debris disposal', 'Surface preparation', 'Complete clearing'],
  },
  {
    icon: <Settings className="w-12 h-12" />,
    title: 'Road Preparation',
    description: 'Industrial-grade road base preparation. Grading, sub-base compaction, and surface finishing.',
    features: ['Sub-base grading', 'Material movement', 'Compaction support', 'Edge finishing'],
  },
  {
    icon: <Cog className="w-12 h-12" />,
    title: 'Construction Support',
    description: 'On-site machinery support for large-scale development. Material handling and utility trenching.',
    features: ['Utility trenching', 'Material lifting', '24/7 site support', 'Project coordination'],
  },
];

const Services = () => {
  const whatsappMsg = encodeURIComponent("Hi! I'm interested in your earthmoving services. Please share your equipment list and pricing.");

  return (
    <div className="bg-premium-black min-h-screen pt-32 pb-24">
      {/* Header */}
      <section className="relative py-24 overflow-hidden mb-12">
        <div className="industrial-grid absolute inset-0 opacity-10 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <h1 className="text-7xl md:text-9xl font-bebas leading-[0.85] tracking-tighter mb-8">
              OUR <span className="text-industrial-yellow">EXPERTISE</span>
            </h1>
            <p className="font-inter text-xl text-gray-muted max-w-2xl leading-relaxed">
              Powering Sivaganga's infrastructure with precision-engineered earthmoving solutions and world-class machinery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-charcoal p-12 border border-white/5 hover:border-industrial-yellow/50 transition-all duration-500 hover:-translate-y-4 flex flex-col justify-between h-full"
            >
              <div>
                <div className="text-industrial-yellow mb-10 group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>
                <h2 className="text-4xl font-bebas mb-6 group-hover:text-industrial-yellow transition-colors tracking-wide">
                  {service.title}
                </h2>
                <p className="text-gray-muted font-inter leading-relaxed mb-10 text-sm">
                  {service.description}
                </p>
                
                <ul className="space-y-4 mb-12">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 font-bebas text-lg tracking-wider text-white/80">
                      <CheckCircle size={16} className="text-industrial-yellow" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Link to="/booking" className="btn-cinematic !w-full justify-center">
                INQUIRE NOW
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-40 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-gray-muted text-xs font-bold tracking-[0.5em] uppercase mb-4">The Methodology</h2>
            <h3 className="text-6xl md:text-8xl font-bebas tracking-tighter">
              PRECISION <span className="text-industrial-yellow">PROCESS</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-[1px] bg-white/5 -translate-y-1/2 z-0" />
            
            {[
              { step: '01', title: 'Intelligence', desc: 'Detailed site analysis and requirement gathering for precise estimation.' },
              { step: '02', title: 'Deployment', desc: 'Swift mobilization of Tier 1 machinery and certified operators to the site.' },
              { step: '03', title: 'Execution', desc: 'Precision-led construction support with constant project monitoring.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative z-10 bg-premium-black border border-white/5 p-12 text-center group hover:border-industrial-yellow transition-all duration-500"
              >
                <div className="font-bebas text-7xl text-white/5 mb-8 group-hover:text-industrial-yellow/10 transition-colors">
                  {item.step}
                </div>
                <h4 className="text-3xl font-bebas mb-4 tracking-widest">{item.title}</h4>
                <p className="text-gray-muted font-inter text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 container mx-auto px-6">
        <div className="bg-industrial-yellow p-16 md:p-24 text-black text-center relative overflow-hidden group">
          <div className="industrial-grid absolute inset-0 opacity-10 group-hover:scale-110 transition-transform duration-[20s]" />
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-8xl font-bebas leading-none mb-12">
              NEED INDUSTRIAL <br /> POWER ON SITE?
            </h2>
            <div className="flex flex-wrap justify-center gap-8">
              <a href="tel:+919994289069" className="btn-cinematic !bg-black !text-white hover:!bg-white hover:!text-black transition-all">
                CALL EXPERTS <Phone size={20} />
              </a>
              <a href={`https://wa.me/919994289069?text=${whatsappMsg}`} className="btn-outline-cinematic !border-black !text-black hover:!bg-black hover:!text-white transition-all">
                WHATSAPP US <MessageCircle size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
