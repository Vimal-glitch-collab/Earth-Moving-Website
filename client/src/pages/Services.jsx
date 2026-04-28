import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

const services = [
  {
    icon: '🚜',
    title: 'Backhoe Loader Rental',
    description: 'Rent our powerful JCB backhoe loaders for daily, weekly, or monthly periods. Suitable for excavation, loading, digging, and material handling tasks across construction and infrastructure projects.',
    features: ['Daily / Weekly / Monthly rental', 'Experienced operators available', 'Quick deployment', 'All project sizes welcome'],
    color: 'from-yellow-400/20 to-yellow-600/5',
    border: 'border-yellow-400/30',
  },
  {
    icon: '🌿',
    title: 'Site Clearing',
    description: 'Professional site clearing services to prepare your land for construction. We remove trees, vegetation, debris, old structures, and surface obstacles efficiently, leaving a clean, ready-to-build site.',
    features: ['Complete debris removal', 'Tree & vegetation clearing', 'Surface preparation', 'Debris disposal assistance'],
    color: 'from-emerald-400/20 to-emerald-600/5',
    border: 'border-emerald-400/20',
  },
  {
    icon: '📐',
    title: 'Land Leveling',
    description: 'Precise land leveling and grading services for construction, agriculture, and real estate development. We ensure perfectly flat, stable surfaces ready for building or cultivation.',
    features: ['Agricultural land leveling', 'Construction site grading', 'Slope correction', 'Drainage improvement'],
    color: 'from-blue-400/20 to-blue-600/5',
    border: 'border-blue-400/20',
  },
  {
    icon: '⛏️',
    title: 'Excavation Work',
    description: 'Deep and precise excavation for foundations, basements, trenches, drainage systems, and infrastructure. Our skilled operators ensure accuracy, safety, and speed on every project.',
    features: ['Foundation excavation', 'Drainage & pipeline trenches', 'Basement digging', 'Road & infrastructure work'],
    color: 'from-orange-400/20 to-orange-600/5',
    border: 'border-orange-400/20',
  },
];

const Services = () => {
  const whatsappMsg = encodeURIComponent("Hi! I'm interested in your services. Please provide more details and pricing.");

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Hero */}
      <section className="py-20 bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #EAB308 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-3">What We Offer</p>
          <h1 className="text-4xl lg:text-6xl font-black text-white mb-6">
            Our <span className="text-gradient">Services</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Comprehensive backhoe loader and earth-moving services for construction, agriculture, 
            and infrastructure projects across Sivagangai, Tamil Nadu.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <div key={i} className={`bg-gradient-to-br ${service.color} border ${service.border} rounded-2xl p-8 card-hover transition-all duration-300`}>
                <div className="text-5xl mb-5">{service.icon}</div>
                <h2 className="text-2xl font-black text-white mb-4">{service.title}</h2>
                <p className="text-gray-400 leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-2 mb-8">
                  {service.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-gray-300 text-sm">
                      <CheckCircle size={16} className="text-yellow-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/booking"
                  className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-5 py-2.5 rounded-lg text-sm transition-all hover:scale-105">
                  Book This Service <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-zinc-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="text-3xl lg:text-4xl font-black text-white">Simple <span className="text-gradient">3-Step Process</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Contact Us', desc: 'Call or WhatsApp us with your project details — location, work type, and timeline.' },
              { step: '02', title: 'Get a Quote', desc: 'We visit your site (or assess remotely) and provide a transparent, competitive quote.' },
              { step: '03', title: 'Work Begins', desc: 'Our experienced team arrives with the right machinery and completes your project on time.' },
            ].map((item, i) => (
              <div key={i} className="text-center relative">
                {i < 2 && <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-yellow-400/20 -translate-x-1/2 z-0"></div>}
                <div className="relative z-10 w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center text-black font-black text-xl mx-auto mb-5">
                  {item.step}
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-black">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-4">Ready to Get Started?</h2>
          <p className="text-gray-400 mb-8">Contact us today for a free site assessment and quote.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/booking" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-4 rounded-xl flex items-center gap-2 transition-all hover:scale-105">
              Book Now <ArrowRight size={16} />
            </Link>
            <a href="tel:+919443239842" className="border-2 border-yellow-400/30 hover:border-yellow-400 text-yellow-400 font-bold px-8 py-4 rounded-xl transition-all">
              Call +91 94432 39842
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
