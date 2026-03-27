import Link from 'next/link';
import { Header, Footer, Breadcrumb } from '@/components';
import {
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  ShoppingCart,
  Upload,
  MessageSquare,
} from 'lucide-react';

export default function AboutPage() {
  const breadcrumbItems = [
    { label: 'About', href: '/about' },
  ];

  return (
    <>
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Hero Section */}
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-neutral-900 mb-6">
            About OptiMarket Canada
          </h1>
          <p className="text-xl text-neutral-600 leading-relaxed">
            OptiMarket Canada is Canada's trusted online marketplace dedicated to connecting optometry and eye care professionals with high-quality equipment, instruments, and supplies. We've built a secure, transparent platform where practitioners can confidently buy, sell, and trade ophthalmic equipment.
          </p>
        </section>

        {/* Mission Statement */}
        <section className="bg-primary-50 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-neutral-700 leading-relaxed">
              To empower Canadian optometry practitioners by providing a reliable, secure, and comprehensive marketplace for optometry equipment. We believe every practice deserves access to quality instruments at fair prices, and every seller deserves a trusted platform to reach their customers across Canada.
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900 mb-12 text-center">
            How It Works
          </h2>

          {/* For Buyers */}
          <div className="mb-16">
            <h3 className="font-heading text-2xl font-bold text-neutral-900 mb-8 flex items-center gap-3">
              <ShoppingCart className="h-8 w-8 text-primary-600" />
              For Buyers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="rounded-xl border border-neutral-200 bg-white p-8">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 mb-4">
                  <span className="font-heading font-bold text-primary-600 text-lg">1</span>
                </div>
                <h4 className="font-semibold text-lg text-neutral-900 mb-3">
                  Browse & Search
                </h4>
                <p className="text-neutral-600">
                  Browse our extensive catalog of equipment across 8 categories. Use our advanced search to find exactly what you need by brand, price, condition, and location.
                </p>
              </div>

              {/* Step 2 */}
              <div className="rounded-xl border border-neutral-200 bg-white p-8">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 mb-4">
                  <span className="font-heading font-bold text-primary-600 text-lg">2</span>
                </div>
                <h4 className="font-semibold text-lg text-neutral-900 mb-3">
                  Connect with Sellers
                </h4>
                <p className="text-neutral-600">
                  Message verified sellers directly to ask questions, negotiate prices, or arrange viewings. All sellers are rated and reviewed by our community.
                </p>
              </div>

              {/* Step 3 */}
              <div className="rounded-xl border border-neutral-200 bg-white p-8">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 mb-4">
                  <span className="font-heading font-bold text-primary-600 text-lg">3</span>
                </div>
                <h4 className="font-semibold text-lg text-neutral-900 mb-3">
                  Secure Purchase
                </h4>
                <p className="text-neutral-600">
                  Complete your transaction securely through our platform. We offer flexible shipping options across Canada and buyer protection guarantees.
                </p>
              </div>
            </div>
          </div>

          {/* For Sellers */}
          <div>
            <h3 className="font-heading text-2xl font-bold text-neutral-900 mb-8 flex items-center gap-3">
              <Upload className="h-8 w-8 text-secondary-600" />
              For Sellers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="rounded-xl border border-neutral-200 bg-white p-8">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-secondary-100 mb-4">
                  <span className="font-heading font-bold text-secondary-600 text-lg">1</span>
                </div>
                <h4 className="font-semibold text-lg text-neutral-900 mb-3">
                  Create Your Profile
                </h4>
                <p className="text-neutral-600">
                  Set up a verified seller account with your business information. Build your reputation through quality listings and customer service.
                </p>
              </div>

              {/* Step 2 */}
              <div className="rounded-xl border border-neutral-200 bg-white p-8">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-secondary-100 mb-4">
                  <span className="font-heading font-bold text-secondary-600 text-lg">2</span>
                </div>
                <h4 className="font-semibold text-lg text-neutral-900 mb-3">
                  List Your Equipment
                </h4>
                <p className="text-neutral-600">
                  Upload high-quality photos, detailed descriptions, and pricing. Highlight condition, specifications, and warranties to attract qualified buyers.
                </p>
              </div>

              {/* Step 3 */}
              <div className="rounded-xl border border-neutral-200 bg-white p-8">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-secondary-100 mb-4">
                  <span className="font-heading font-bold text-secondary-600 text-lg">3</span>
                </div>
                <h4 className="font-semibold text-lg text-neutral-900 mb-3">
                  Manage & Grow
                </h4>
                <p className="text-neutral-600">
                  Manage inquiries, negotiate with buyers, and arrange shipping. Track your sales and build a loyal customer base across Canada.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust & Safety */}
        <section className="bg-neutral-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900 mb-12 text-center">
              Trust & Safety
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Verified Community */}
              <div className="rounded-xl bg-white p-8 border border-neutral-200">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <h3 className="font-semibold text-lg text-neutral-900">
                    Verified Community
                  </h3>
                </div>
                <p className="text-neutral-600">
                  All sellers are verified professionals. Buyer and seller reviews build a transparent marketplace where reputation matters. Report suspicious activity and help us maintain a safe environment.
                </p>
              </div>

              {/* Secure Transactions */}
              <div className="rounded-xl bg-white p-8 border border-neutral-200">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <h3 className="font-semibold text-lg text-neutral-900">
                    Secure Transactions
                  </h3>
                </div>
                <p className="text-neutral-600">
                  We use encrypted payments and secure communication channels. Funds are protected until both parties confirm the transaction is complete. Buyer protection guarantees are in place for every purchase.
                </p>
              </div>

              {/* Quality Assurance */}
              <div className="rounded-xl bg-white p-8 border border-neutral-200">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <h3 className="font-semibold text-lg text-neutral-900">
                    Quality Assurance
                  </h3>
                </div>
                <p className="text-neutral-600">
                  Equipment listings include detailed condition descriptions, clear photos, and warranty information. We monitor for fraudulent listings and enforce our community guidelines strictly.
                </p>
              </div>

              {/* Support */}
              <div className="rounded-xl bg-white p-8 border border-neutral-200">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <h3 className="font-semibold text-lg text-neutral-900">
                    Customer Support
                  </h3>
                </div>
                <p className="text-neutral-600">
                  Our dedicated support team is available to help resolve disputes and answer questions. We're committed to fair resolution and building long-term trust with all users.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900 mb-12 text-center">
            Get In Touch
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Email */}
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 mx-auto mb-4">
                <Mail className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Email</h3>
              <a
                href="mailto:support@optimarketcanada.ca"
                className="text-primary-600 hover:text-primary-700 transition-colors"
              >
                support@optimarketcanada.ca
              </a>
            </div>

            {/* Phone */}
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-secondary-100 mx-auto mb-4">
                <Phone className="h-6 w-6 text-secondary-600" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Phone</h3>
              <a
                href="tel:+14165551234"
                className="text-secondary-600 hover:text-secondary-700 transition-colors"
              >
                +1 (416) 555-1234
              </a>
            </div>

            {/* Location */}
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-accent-100 mx-auto mb-4">
                <MapPin className="h-6 w-6 text-accent-600" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Location</h3>
              <p className="text-neutral-600">
                Toronto, Ontario<br />
                Canada
              </p>
            </div>
          </div>

          {/* Contact Form CTA */}
          <div className="rounded-xl bg-primary-50 p-8 text-center border border-primary-200">
            <h3 className="font-semibold text-lg text-neutral-900 mb-3">
              Have a question?
            </h3>
            <p className="text-neutral-600 mb-6">
              Fill out our contact form and our team will get back to you within 24 hours.
            </p>
            <Link
              href="/contact"
              className="inline-block rounded-lg bg-primary-600 px-6 py-2 font-semibold text-white transition-all hover:bg-primary-700 active:scale-95"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
