import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    about: [
      { label: 'About OptiMarket', href: '/about' },
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
    ],
    quickLinks: [
      { label: 'Browse Equipment', href: '/browse' },
      { label: 'Sell Equipment', href: '/sell' },
      { label: 'My Account', href: '/account' },
      { label: 'Help Center', href: '/help' },
    ],
    categories: [
      { label: 'Phoropters', href: '/categories/phoropters' },
      { label: 'Slit Lamps', href: '/categories/slit-lamps' },
      { label: 'Tonometers', href: '/categories/tonometers' },
      { label: 'Lens Meters', href: '/categories/lens-meters' },
    ],
  };

  return (
    <footer className="bg-neutral-900 text-neutral-50">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="font-heading text-lg font-bold text-primary-400 mb-4">
              About OptiMarket
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Canada's trusted marketplace for optometry equipment. Connecting verified sellers and buyers of quality ophthalmic instruments.
            </p>
            <div className="mt-4 flex gap-2">
              <div className="h-2 w-2 rounded-full bg-primary-500"></div>
              <div className="h-2 w-2 rounded-full bg-secondary-500"></div>
              <div className="h-2 w-2 rounded-full bg-accent-500"></div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-bold text-primary-400 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-primary-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-heading text-lg font-bold text-primary-400 mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-primary-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-lg font-bold text-primary-400 mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-secondary-500 mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:support@optimarketcanada.ca"
                  className="text-sm text-neutral-400 transition-colors hover:text-primary-300"
                >
                  support@optimarketcanada.ca
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-secondary-500 mt-0.5 flex-shrink-0" />
                <a
                  href="tel:+14165551234"
                  className="text-sm text-neutral-400 transition-colors hover:text-primary-300"
                >
                  +1 (416) 555-1234
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-secondary-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-neutral-400">
                  Toronto, Ontario, Canada
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-neutral-500">
              &copy; {currentYear} OptiMarket Canada. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-sm text-neutral-500 transition-colors hover:text-primary-400"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-neutral-500 transition-colors hover:text-primary-400"
              >
                Terms of Service
              </Link>
              <Link
                href="/contact"
                className="text-sm text-neutral-500 transition-colors hover:text-primary-400"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
