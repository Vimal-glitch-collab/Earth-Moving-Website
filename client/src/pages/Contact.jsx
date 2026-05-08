import React from 'react';
import { Phone, MessageCircle, MapPin, Clock, ArrowRight, ExternalLink, Hexagon } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const contactInfo = [
    {
      icon: <Phone size={32} />,
      title: 'INDUSTRIAL COMMS',
      details: ['+91 99942 89069'],
      action: 'tel:+919994289069',
      actionLabel: 'Direct Dial'
    },
    {
      icon: <MessageCircle size={32} />,
      title: 'OPERATIONS DESK',
      details: ['Online Logistics', 'Deployment Support'],
      action: 'https://wa.me/919994289069?text=Hello%20Sri%20Balaji%20Earth%20Movers,%20I%20need%20earthmoving%20service.',
      actionLabel: 'WhatsApp Comms'
    },
    {
      icon: <Clock size={32} />,
      title: 'FLEET UPTIME',
      details: ['Mon - Sun: 06:00 - 18:00', 'Emergency Support: 24/7'],
      action: '/booking',
      actionLabel: 'Log Inquiry'
    }
  ];

  const address = "88, Sri Balaji Bhavanam, Senthamil Nagar, Railway Station Road, Sivagangai - 630561, Tamil Nadu, India";

  return (
    <div className="bg-premium-black min-h-screen pt-32 pb-24">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden mb-12">
        <div className="industrial-grid absolute inset-0 opacity-10 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <h1 className="text-7xl md:text-9xl font-bebas leading-[0.85] tracking-tighter mb-8">
              CONTACT <span className="text-industrial-yellow">OPERATIONS</span>
            </h1>
            <p className="font-inter text-xl text-gray-muted max-w-2xl leading-relaxed">
              Establishing a direct link for industrial excellence. Reach out to our logistics command for project support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {contactInfo.map((info, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-charcoal p-12 border border-white/5 group hover:border-industrial-yellow/50 transition-all duration-500"
            >
              <div className="text-industrial-yellow mb-10 group-hover:scale-110 transition-transform duration-500">
                {info.icon}
              </div>
              <h3 className="text-3xl font-bebas tracking-widest text-white mb-6">{info.title}</h3>
              <div className="space-y-3 mb-10">
                {info.details.map((detail, j) => (
                  <p key={j} className="text-gray-muted font-bebas text-lg tracking-widest">{detail}</p>
                ))}
              </div>
              <a 
                href={info.action}
                className="btn-cinematic !w-full justify-center"
              >
                {info.actionLabel}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Map & Address */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-charcoal p-12 md:p-16 border border-white/5 flex flex-col justify-center"
          >
            <div className="w-16 h-16 bg-industrial-yellow/10 rounded flex items-center justify-center text-industrial-yellow mb-10">
              <MapPin size={32} />
            </div>
            <h2 className="text-5xl font-bebas tracking-tighter text-white mb-8">GLOBAL HEADQUARTERS</h2>
            <p className="text-gray-muted text-xl font-inter leading-relaxed mb-12">
              {address}
            </p>
            <a 
              href="https://share.google/0gv0CNKOnprwMzg61"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-cinematic self-start"
            >
              NAVIGATE TO SITE <ExternalLink size={18} className="ml-2" />
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-[500px] border border-white/5 overflow-hidden group"
          >
            <iframe
              title="Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15725.109590835848!2d78.4735509!3d9.8271013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00ed43673c6833%3A0xc3b5e408f657a75b!2sSivagangai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1709400000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
            ></iframe>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
