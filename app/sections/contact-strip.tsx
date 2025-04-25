// components/Banner.js
import { Headphones, MessageCircle, Phone } from 'lucide-react';
import React from 'react';

const contactDetails = [
  {
    icon: <Phone className="w-5 h-5" />,
    label: 'WhatsApp',
    number: '0333 2568818',
    href: 'https://wa.me/923332568818',
  },
  {
    icon: <Phone className="w-5 h-5" />,
    label: 'Call',
    number: '0345 3773999',
    href: 'tel:03453773999',
  },
  {
    icon: <Phone className="w-5 h-5" />,
    label: 'PTCL',
    number: '021 32700705',
    href: 'tel:02132700705',
  },
  {
    icon: <Headphones className="w-5 h-5" />,
    label: 'Chat Now',
    href: '#chat',
  },
  {
    icon: <MessageCircle className="w-5 h-5" />,
    label: 'Message Us',
    href: '#message',
  },
];

const Banner = () => {
  return (
    <div className="bg-indigo-700 text-white py-8 px-6 shadow-md rounded-md">
      <div className="max-w-screen-xl mx-auto text-center space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold">
          Questions? Talk to a Specialist
        </h2>

        <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-6">
          {contactDetails.map((contact, index) => (
            <a
              key={index}
              href={contact.href}
              target={contact.href.startsWith('http') ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-indigo-800 rounded-lg hover:bg-indigo-600 transition"
            >
              {contact.icon}
              <span className="text-sm md:text-base font-medium">
                {contact.label}
                {contact.number ? `: ${contact.number}` : ''}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
