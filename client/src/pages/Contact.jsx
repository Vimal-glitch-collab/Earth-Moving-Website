import React from 'react';
import { Phone, MessageCircle, MapPin, Clock, ArrowRight, ExternalLink } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: <Phone size={24} />,
      title: 'Call Us',
      details: ['+91 94432 39842', '+91 99942 89069'],
      action: 'tel:+919443239842',
      actionLabel: 'Call Now'
    },
    {
      icon: <MessageCircle size={24} />,
      title: 'WhatsApp',
      details: ['Online Booking', '24/7 Availability'],
      action: 'https://wa.me/919443239842',
      actionLabel: 'Chat with Us'
    },
    {
      icon: <Clock size={24} />,
      title: 'Working Hours',
      details: ['Monday - Sunday', '6:00 AM - 10:00 PM'],
      action: '/booking',
      actionLabel: 'Schedule Now'
    }
  ];

  const address = "88, Sri Balaji Bhavanam, Senthamil Nagar, Railway Station Road, Sivagangai - 630561, Tamil Nadu, India";

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Hero */}
      <section className="py-20 bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #EAB308 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-3">Get in Touch</p>
          <h1 className="text-4xl lg:text-6xl font-black text-white mb-6">
            Contact <span className="text-gradient">Us</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Have questions or ready to book? We're here to help you move forward with your project.
          </p>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl card-hover transition-all text-center">
                <div className="w-16 h-16 bg-yellow-400/10 rounded-2xl flex items-center justify-center text-yellow-400 mx-auto mb-6">
                  {info.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{info.title}</h3>
                <div className="space-y-1 mb-8">
                  {info.details.map((detail, j) => (
                    <p key={j} className="text-gray-400 font-medium">{detail}</p>
                  ))}
                </div>
                <a 
                  href={info.action}
                  target={info.action.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-yellow-400 hover:text-white font-bold transition-colors"
                >
                  {info.actionLabel} <ArrowRight size={16} />
                </a>
              </div>
            ))}
          </div>

          {/* Map & Address */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Address Details */}
            <div className="bg-zinc-900 border border-zinc-800 p-8 lg:p-12 rounded-3xl flex flex-col justify-center">
              <div className="w-16 h-16 bg-yellow-400/10 rounded-2xl flex items-center justify-center text-yellow-400 mb-8">
                <MapPin size={32} />
              </div>
              <h2 className="text-3xl font-black text-white mb-6">Our Location</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                {address}
              </p>
              <div className="space-y-4">
                <a 
                  href="https://share.google/0gv0CNKOnprwMzg61"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-400 hover:bg-yellow-300 text-black font-black px-10 py-4 rounded-full flex items-center gap-2 justify-center transition-all hover:scale-105 w-full sm:w-fit shadow-lg shadow-yellow-400/20"
                >
                  View on Google Maps <ExternalLink size={18} />
                </a>
              </div>
            </div>

            {/* Map Embed */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden min-h-[400px]">
              <iframe
                title="Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15725.109590835848!2d78.4735509!3d9.8271013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00ed43673c6833%3A0xc3b5e408f657a75b!2sSivagangai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1709400000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-80 contrast-125"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
