import Link from 'next/link';
import { Header, Footer, HeroSection, ProductGrid, CategoryCard } from '@/components';
import {
  getFeaturedListings,
  getRecentListings,
  getAllCategories,
} from '@/lib/data';
import {
  Activity,
  Eye,
  Grid,
  Droplet,
  Gauge,
  Home,
  Wrench,
  Zap,
  CheckCircle,
  Shield,
  Truck,
  Users,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  'Activity': Activity,
  'Eye': Eye,
  'Grid': Grid,
  'Droplet': Droplet,
  'Gauge': Gauge,
  'Home': Home,
  'Wrench': Wrench,
  'Zap': Zap,
};

export default function HomePage() {
  const featuredListings = getFeaturedListings(8);
  const recentListings = getRecentListings(12);
  const categories = getAllCategories();

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Featured Equipment Section */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900 mb-3">
              Featured Equipment
            </h2>
            <p className="text-lg text-neutral-600">
              Premium optometry equipment selected by our team
            </p>
          </div>
          <ProductGrid listings={featuredListings} />
        </section>

        {/* Browse Categories Section */}
        <section className="bg-neutral-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900 mb-3">
                Browse Categories
              </h2>
              <p className="text-lg text-neutral-600">
                Find equipment by category to match your practice needs
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((category) => {
                const Icon = iconMap[category.icon];
                return (
                  <CategoryCard
                    key={category.id}
                    name={category.name}
                    icon={Icon || Activity}
                    listingCount={category.listingCount}
                    href={`/categories/${category.id}`}
                  />
                );
              })}
            </div>
          </div>
        </section>

        {/* Recently Listed Section */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900 mb-3">
              Recently Listed
            </h2>
            <p className="text-lg text-neutral-600">
              Check out the latest additions to our marketplace
            </p>
          </div>
          <ProductGrid listings={recentListings} />
          <div className="mt-12 text-center">
            <Link
              href="/browse"
              className="inline-block rounded-lg bg-primary-600 px-8 py-3 font-semibold text-white transition-all hover:bg-primary-700 active:scale-95"
            >
              View All Listings
            </Link>
          </div>
        </section>

        {/* Why Choose OptiMarket Section */}
        <section className="bg-gradient-to-br from-primary-50 to-accent-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900 mb-3">
                Why Choose OptiMarket?
              </h2>
              <p className="text-lg text-neutral-600">
                Trusted by optometry professionals across Canada
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Verified Sellers */}
              <div className="rounded-xl bg-white p-8 shadow-sm border border-neutral-200">
                <div className="mb-4 inline-flex rounded-lg bg-primary-100 p-3">
                  <CheckCircle className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-lg text-neutral-900 mb-2">
                  Verified Sellers
                </h3>
                <p className="text-neutral-600">
                  All sellers are vetted and rated. Buy with confidence from trusted professionals.
                </p>
              </div>

              {/* Quality Equipment */}
              <div className="rounded-xl bg-white p-8 shadow-sm border border-neutral-200">
                <div className="mb-4 inline-flex rounded-lg bg-secondary-100 p-3">
                  <Shield className="h-6 w-6 text-secondary-600" />
                </div>
                <h3 className="font-semibold text-lg text-neutral-900 mb-2">
                  Quality Equipment
                </h3>
                <p className="text-neutral-600">
                  Premium optometry and ophthalmic instruments curated for your practice.
                </p>
              </div>

              {/* Secure Transactions */}
              <div className="rounded-xl bg-white p-8 shadow-sm border border-neutral-200">
                <div className="mb-4 inline-flex rounded-lg bg-accent-100 p-3">
                  <Truck className="h-6 w-6 text-accent-600" />
                </div>
                <h3 className="font-semibold text-lg text-neutral-900 mb-2">
                  Secure Transactions
                </h3>
                <p className="text-neutral-600">
                  Protected payments and guaranteed delivery. We've got you covered.
                </p>
              </div>

              {/* Canada-Wide Shipping */}
              <div className="rounded-xl bg-white p-8 shadow-sm border border-neutral-200">
                <div className="mb-4 inline-flex rounded-lg bg-primary-100 p-3">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-lg text-neutral-900 mb-2">
                  Canada-Wide Shipping
                </h3>
                <p className="text-neutral-600">
                  Fast and reliable delivery across Canada. Equipment arrives in perfect condition.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Join Our Marketplace CTA Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-accent-600 py-16 sm:py-20">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-white opacity-10 blur-3xl" />
            <div className="absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-white opacity-10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Sell Your Equipment?
            </h2>
            <p className="text-lg text-primary-50 mb-8 max-w-2xl mx-auto">
              Join hundreds of verified sellers on OptiMarket Canada. Reach buyers across the country and expand your reach.
            </p>
            <Link
              href="/sell"
              className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-primary-600 transition-all hover:bg-neutral-50 active:scale-95"
            >
              Start Selling Today
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
