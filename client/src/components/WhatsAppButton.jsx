import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const message = encodeURIComponent("Hello Sri Balaji Earth Movers, I need earthmoving service.");
  const url = `https://wa.me/919994289069?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-10 right-10 z-[90] w-16 h-16 bg-industrial-yellow text-black flex items-center justify-center shadow-[0_0_30px_rgba(244,180,0,0.3)] transition-all duration-500 hover:scale-110 hover:rotate-12 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={32} />
      <span className="absolute right-20 bg-premium-black text-white text-[10px] font-bold tracking-[0.3em] uppercase px-6 py-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-500 border border-white/5 pointer-events-none -translate-x-4 group-hover:translate-x-0">
        LOGISTIC COMMS
      </span>
    </a>
  );
};

export default WhatsAppButton;
