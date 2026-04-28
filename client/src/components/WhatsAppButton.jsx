import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const message = encodeURIComponent("Hi! I need Backhoe Loader (JCB) rental service. Please share availability and rates.");
  const url = `https://wa.me/919443239842?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float w-14 h-14 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 group"
      aria-label="Chat on WhatsApp"
      title="Book via WhatsApp"
    >
      <MessageCircle size={28} className="text-white" />
      <span className="absolute right-16 bg-zinc-800 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg border border-zinc-700">
        Book on WhatsApp
      </span>
    </a>
  );
};

export default WhatsAppButton;
