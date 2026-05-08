import React from 'react';
import { Phone, MessageCircle, MapPin, Clock, ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const contactInfo = [
    {
      icon: <Phone size={28} />,
      title: 'CALL US',
      details: ['+91 94432 39842', '+91 99942 89069'],
      action: 'tel:+919443239842',
      actionLabel: 'Call Now'
    },
    {
      icon: <MessageCircle size={28} />,
      title: 'WHATSAPP',
      details: ['Online Booking', '24/7 Availability'],
      action: 'https://wa.me/919443239842',
      actionLabel: 'Chat with Us'
    },
    {
      icon: <Clock size={28} />,
      title: 'WORKING HOURS',
      details: ['Monday - Sunday', '6:00 AM - 10:00 PM'],
      action: '/booking',
      actionLabel: 'Schedule Now'
    }
  ];

  const address = "88, Sri Balaji Bhavanam, Senthamil Nagar, Railway Station Road, Sivagangai - 630561, Tamil Nadu, India";

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
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute left-0 bottom-0 w-full h-px bg-gradient-to-r from-transparent via-jcb-yellow/50 to-transparent"></div>
        
        <motion.div 
          className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-jcb-yellow"></div>
            <p className="text-jcb-yellow text-sm font-montserrat font-bold uppercase tracking-[0.3em]">Get in Touch</p>
            <div className="h-px w-12 bg-jcb-yellow"></div>
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-black font-montserrat text-white mb-6 uppercase tracking-tight">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-jcb-yellow to-[#a68500]">Us</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-gray-text text-lg leading-relaxed font-inter max-w-2xl mx-auto">
            Have questions or ready to book? We're here to help you move forward with your project.
          </motion.p>
        </motion.div>
      </section>

      {/* Info Cards */}
      <section className="py-24 bg-matte-black relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {contactInfo.map((info, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                className="card-premium p-10 rounded-xl text-center group relative overflow-hidden"
              >
                <div className="w-20 h-20 bg-dark-bg border border-dark-border group-hover:border-jcb-yellow rounded-full flex items-center justify-center text-white group-hover:text-jcb-yellow mx-auto mb-8 transition-colors relative z-10">
                  {info.icon}
                </div>
                <h3 className="text-xl font-black font-montserrat text-white mb-4 uppercase tracking-wide group-hover:text-jcb-yellow transition-colors relative z-10">{info.title}</h3>
                <div className="space-y-2 mb-8 relative z-10">
                  {info.details.map((detail, j) => (
                    <p key={j} className="text-gray-text font-inter">{detail}</p>
                  ))}
                </div>
                <div className="h-px w-full bg-dark-border mb-8 relative z-10"></div>
                <a 
                  href={info.action}
                  target={info.action.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full py-4 gap-2 text-white font-montserrat font-bold text-sm tracking-wider uppercase transition-colors group-hover:bg-jcb-yellow group-hover:text-matte-black rounded relative z-10"
                >
                  {info.actionLabel} <ArrowRight size={16} />
                </a>
              </motion.div>
            ))}
          </motion.div>

          {/* Map & Address */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Address Details */}
            <motion.div variants={fadeInUp} className="card-premium p-10 lg:p-14 rounded-xl flex flex-col justify-center">
              <div className="w-20 h-20 bg-dark-bg border border-dark-border rounded-full flex items-center justify-center text-jcb-yellow mb-8 shadow-[0_0_20px_rgba(242,194,0,0.15)]">
                <MapPin size={32} />
              </div>
              <h2 className="text-3xl font-black font-montserrat text-white mb-6 uppercase tracking-wide">Our Location</h2>
              <p className="text-gray-text text-lg leading-relaxed mb-10 font-inter">
                {address}
              </p>
              <div className="space-y-4">
                <a 
                  href="https://share.google/0gv0CNKOnprwMzg61"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-premium w-full sm:w-fit"
                >
                  View on Google Maps <ExternalLink size={18} />
                </a>
              </div>
            </motion.div>

            {/* Map Embed */}
            <motion.div variants={fadeInUp} className="card-premium rounded-xl overflow-hidden min-h-[400px] border-dark-border p-2">
              <div className="w-full h-full rounded overflow-hidden">
                <iframe
                  title="Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15725.109590835848!2d78.4735509!3d9.8271013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00ed43673c6833%3A0xc3b5e408f657a75b!2sSivagangai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1709400000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700 w-full h-full"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
