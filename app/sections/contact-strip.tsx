// components/Banner.js
'use client';

import React from 'react';
import { Headphones, MessageCircle, Phone } from 'lucide-react';

const contactDetails: Array<{
  type: keyof typeof iconMap;
  label: string;
  number: string;
  href: string;
}> = [
  {
    type: 'whatsapp',
    label: 'WhatsApp',
    number: '0333 2568818',
    href: 'https://wa.me/923332568818',
  },
  {
    type: 'call',
    label: 'Call',
    number: '0345 3773999',
    href: 'tel:03453773999',
  },
  {
    type: 'ptcl',
    label: 'PTCL',
    number: '021 32700705',
    href: 'tel:02132700705',
  },
];

// Map each "type" to a Lucide icon component
const iconMap = {
  whatsapp: MessageCircle,
  call: Phone,
  ptcl: Headphones,
};

const Banner = () => {
  return (
    <div className="bg-indigo-700 text-white py-8 px-6 shadow-md rounded-md">
      <div className="max-w-screen-xl mx-auto text-center space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold">
          Questions? Talk to a Specialist
        </h2>

        <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-6">
          {contactDetails.map((contact, index) => {
            const Icon = iconMap[contact.type] || Phone;
            return (
              <a
                key={index}
                href={contact.href}
                target={contact.href.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-indigo-800 rounded-lg hover:bg-indigo-600 transition"
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm md:text-base font-medium">
                  {contact.label}
                  {contact.number && `: ${contact.number}`}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Banner;
