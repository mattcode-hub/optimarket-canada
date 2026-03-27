import Link from 'next/link';
import { Header, Footer, Breadcrumb } from '@/components';
import { getAllCategories } from '@/lib/data';
import {
  Activity,
  Eye,
  Grid,
  Droplet,
  Gauge,
  Home,
  Wrench,
  Zap,
  ArrowRight,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<any>> = {
  'Activity': Activity,
  'Eye': Eye,
  'Grid': Grid,
  'Droplet': Droplet,
  'Gauge': Gauge,
  'Home': Home,
  'Wrench': Wrench,
  'Zap': Zap,
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  const breadcrumbItems = [
    { label: 'Categories', href: '/categories' },
  ];

  return (
    <>
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Header Section */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
              Browse All Categories
            </h1>
            <p className="text-xl text-neutral-600">
              Explore our comprehensive range of optometry and ophthalmic equipment. Find exactly what your practice needs.
            </p>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category) => {
              const Icon = iconMap[category.icon];
              return (
                <Link
                  key={category.id}
                  href={`/categories/${category.id}`}
                  className="group rounded-xl border border-neutral-200 bg-white p-8 transition-all duration-300 hover:border-primary-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-lg bg-primary-50 p-4 transition-colors group-hover:bg-primary-100">
                        <Icon className="h-8 w-8 text-primary-600 transition-colors group-hover:text-primary-700" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-2xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-neutral-600 mt-1">
                          {category.listingCount} {category.listingCount === 1 ? 'listing' : 'listings'}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-6 w-6 text-neutral-400 transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="text-neutral-600 mb-4">
                    {category.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {category.subcategories.slice(0, 3).map((sub) => (
                      <span
                        key={sub}
                        className="inline-block rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700"
                      >
                        {sub}
                      </span>
                    ))}
                    {category.subcategories.length > 3 && (
                      <span className="inline-block rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                        +{category.subcategories.length - 3} more
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-neutral-50 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              Use our advanced search to find specific equipment across all categories.
            </p>
            <Link
              href="/browse"
              className="inline-block rounded-lg bg-primary-600 px-8 py-3 font-semibold text-white transition-all hover:bg-primary-700 active:scale-95"
            >
              Advanced Search
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
