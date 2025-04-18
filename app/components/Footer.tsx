import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  const footerSections = [
    {
      title: 'Products',
      links: [
        { title: 'Laptops', href: '/laptops-prices.html' },
        { title: 'MacBooks', href: '/apple-products/apple-macbooks.html' },
        { title: 'Tablets', href: '/tablets.html' },
        { title: 'External Hard Drives', href: '/accessories/external-hard-drives.html' },
        { title: 'Printers', href: '/accessories/printers.html' }
      ]
    },
    {
      title: 'Information',
      links: [
        { title: 'About Us', href: '/about' },
        { title: 'Blog', href: '/blog' },
        { title: 'Reviews', href: '/testimonials' },
        { title: 'FAQs', href: '/faq' }
      ]
    },
    {
      title: 'Policy',
      links: [
        { title: 'Payment Information', href: '/' },
        { title: 'Privacy Policy', href: '/policy' },
        { title: 'Replacement & Warranty', href: '/' },
        { title: 'Warranty by Technezo', href: '/' }
      ]
    },
    {
      title: 'Contact',
      links: [
        { title: 'Social media', href: '/social-media-links' },
        { title: 'Contact Us', href: '/contact-us' }
      ]
    }
  ];

  return (
    <footer>
      {/* Links section */}
      <div className="bg-paklap-bg py-12">
        <div className="paklap-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h4 className="font-semibold text-lg mb-4 text-paklap-dark">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <Link href={link.href} className="text-gray-600 hover:text-paklap-blue">
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="bg-slate-950 py-8 text-white">
        <div className="paklap-container">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="h-12 w-36 relative bg-slate-950 overflow-hidden">
                <div className="absolute inset-0 p-2 flex items-center">
                  <span className="text-WHITE text-xl font-bold">TECH</span>
                  <span className="text-red-500 text-xl font-bold">NEZO</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Link href="https://www.facebook.com/profile.php?id=100092973579912#">
                <div className="bg-slate-800 rounded-full w-10 h-10 flex items-center justify-center hover:bg-paklap-blue transition-colors">
                  <FontAwesomeIcon icon={faFacebook} className="h-5 w-5" />
                </div>
              </Link>
              <Link href="https://www.instagram.com/technezo_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
                <div className="bg-slate-800 rounded-full w-10 h-10 flex items-center justify-center hover:bg-paklap-blue transition-colors">
                  <FontAwesomeIcon icon={faInstagram} className="h-5 w-5" />
                </div>
              </Link>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 text-center text-sm text-gray-400">
            © 2025 TECHNEZO, All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
