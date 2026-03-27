import Link from 'next/link';
import SearchBar from './SearchBar';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-500 to-accent-600 py-20 sm:py-28 lg:py-36">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-secondary-400 opacity-10 blur-3xl" />
        <div className="absolute -left-40 -bottom-40 h-80 w-80 rounded-full bg-accent-400 opacity-10 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-center leading-tight mb-4">
          Canada's Trusted Marketplace for Optometry Equipment
        </h1>

        {/* Subtitle */}
        <p className="mx-auto max-w-2xl text-center text-lg text-primary-50 mb-8">
          Connect with verified sellers and find high-quality ophthalmic instruments. Buy, sell, and trade equipment with confidence on our secure platform.
        </p>

        {/* Search Bar */}
        <div className="mb-12">
          <SearchBar
            placeholder="Search equipment by name, brand, or type..."
            fullWidth
          />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link href="/browse" className="rounded-lg bg-white px-8 py-3 font-semibold text-primary-600 transition-all hover:bg-neutral-50 hover:shadow-lg active:scale-95">
            Browse Equipment
          </Link>
          <Link href="/sell" className="rounded-lg border-2 border-white bg-transparent px-8 py-3 font-semibold text-white transition-all hover:bg-white hover:bg-opacity-10 active:scale-95">
            Start Selling
          </Link>
        </div>

        {/* Stats Bar */}
        <div className="rounded-xl bg-white bg-opacity-95 p-6 shadow-xl backdrop-blur">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-primary-600">1,200+</p>
              <p className="mt-1 text-sm text-neutral-600">Active Listings</p>
            </div>
            <div className="border-l border-r border-neutral-200">
              <p className="text-3xl font-bold text-primary-600">70+</p>
              <p className="mt-1 text-sm text-neutral-600">Verified Sellers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary-600">8</p>
              <p className="mt-1 text-sm text-neutral-600">Categories</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
