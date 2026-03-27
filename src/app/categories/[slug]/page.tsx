import { Header, Footer, Breadcrumb, ProductGrid } from '@/components';
import { getCategoryByName, searchListings, getAllCategories } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface CategoryPageProps {
  params: {
    slug: string;
  };
  searchParams: {
    page?: string;
    subcategory?: string;
  };
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    slug: category.name
      .toLowerCase()
      .split(' ')
      .join('-'),
  }));
}

export default function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  // Convert slug to category name
  const categoryName = decodeURIComponent(params.slug)
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const category = getCategoryByName(categoryName);

  if (!category) {
    notFound();
  }

  const currentPage = parseInt(searchParams.page || '1', 10);
  const selectedSubcategory = searchParams.subcategory;

  // Search listings with filters
  const result = searchListings({
    category: categoryName,
    subcategory: selectedSubcategory,
    page: currentPage,
    perPage: 20,
  });

  const breadcrumbItems = [
    { label: 'Categories', href: '/categories' },
    { label: categoryName, href: `/categories/${params.slug}` },
  ];

  return (
    <>
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Category Header */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 border-b border-neutral-200">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-neutral-900 mb-3">
            {category.name}
          </h1>
          <p className="text-lg text-neutral-600 mb-6">
            {category.description}
          </p>
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <span className="font-semibold text-neutral-900">
              {result.total}
            </span>
            <span>listings available</span>
          </div>
        </section>

        {/* Subcategory Filters */}
        {category.subcategories.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 border-b border-neutral-200">
            <h3 className="font-semibold text-neutral-900 mb-4">
              Browse by Subcategory
            </h3>
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/categories/${params.slug}`}
                className={`inline-block rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  !selectedSubcategory
                    ? 'bg-primary-600 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                All Subcategories
              </Link>
              {category.subcategories.map((sub) => (
                <Link
                  key={sub}
                  href={`/categories/${params.slug}?subcategory=${encodeURIComponent(sub)}`}
                  className={`inline-block rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    selectedSubcategory === sub
                      ? 'bg-primary-600 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {sub}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Products Grid */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          {result.items.length > 0 ? (
            <>
              <ProductGrid listings={result.items} />

              {/* Pagination */}
              {result.totalPages > 1 && (
                <div className="mt-12 flex justify-center gap-2">
                  {currentPage > 1 && (
                    <Link
                      href={`/categories/${params.slug}?page=${currentPage - 1}${
                        selectedSubcategory
                          ? `&subcategory=${encodeURIComponent(selectedSubcategory)}`
                          : ''
                      }`}
                      className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-neutral-100"
                    >
                      Previous
                    </Link>
                  )}

                  {Array.from({ length: result.totalPages }, (_, i) => i + 1)
                    .filter(
                      (page) =>
                        page === 1 ||
                        page === result.totalPages ||
                        (page >= currentPage - 2 && page <= currentPage + 2)
                    )
                    .map((page, index, arr) => (
                      <div key={page}>
                        {index > 0 && arr[index - 1] !== page - 1 && (
                          <span className="px-2 py-2 text-neutral-500">...</span>
                        )}
                        <Link
                          href={`/categories/${params.slug}?page=${page}${
                            selectedSubcategory
                              ? `&subcategory=${encodeURIComponent(selectedSubcategory)}`
                              : ''
                          }`}
                          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                            page === currentPage
                              ? 'bg-primary-600 text-white'
                              : 'border border-neutral-300 hover:bg-neutral-100'
                          }`}
                        >
                          {page}
                        </Link>
                      </div>
                    ))}

                  {currentPage < result.totalPages && (
                    <Link
                      href={`/categories/${params.slug}?page=${currentPage + 1}${
                        selectedSubcategory
                          ? `&subcategory=${encodeURIComponent(selectedSubcategory)}`
                          : ''
                      }`}
                      className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-neutral-100"
                    >
                      Next
                    </Link>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                No listings found
              </h3>
              <p className="text-neutral-600 mb-6">
                Try adjusting your filters or browse other categories.
              </p>
              <Link
                href="/categories"
                className="inline-block rounded-lg bg-primary-600 px-6 py-2 font-semibold text-white transition-all hover:bg-primary-700 active:scale-95"
              >
                Browse All Categories
              </Link>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
