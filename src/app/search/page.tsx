'use client';

import { useMemo, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Grid3X3, List, Search } from 'lucide-react';
import { Breadcrumb, ProductGrid, FilterSidebar, Pagination, EmptyState } from '@/components';
import { searchListings } from '@/lib/data';
import { cn } from '@/lib/utils';

type ViewMode = 'grid' | 'list';

function SearchContent() {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Extract filter values from URL
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const minPrice = searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : undefined;
  const maxPrice = searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : undefined;
  const conditionStr = searchParams.get('condition') || '';
  const condition = conditionStr ? conditionStr.split(',') : undefined;
  const sortBy = (searchParams.get('sort') || 'date_newest') as any;
  const pageStr = searchParams.get('page') || '1';
  const page = parseInt(pageStr);

  // Search listings
  const results = useMemo(() => {
    return searchListings({
      query,
      category,
      minPrice,
      maxPrice,
      condition,
      sortBy,
      page,
      perPage: 24,
    });
  }, [query, category, minPrice, maxPrice, condition, sortBy, page]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    window.history.pushState(null, '', `?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', e.target.value);
    params.set('page', '1');
    window.history.pushState(null, '', `?${params.toString()}`);
  };

  const handleClearFilters = () => {
    window.history.pushState(null, '', '?');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb items={[{ label: 'Search Results', href: '/search' }]} />
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        {!query && (
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search for equipment..."
                className="w-full rounded-lg border border-neutral-300 pl-12 pr-4 py-3 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
          </div>
        )}

        {/* Results Header */}
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">
              {query ? `Search Results for "${query}"` : 'Browse Equipment'}
            </h1>
            <p className="mt-1 text-sm text-neutral-600">
              {results.total} {results.total === 1 ? 'item' : 'items'} found
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex gap-1 rounded-lg border border-neutral-300 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'rounded px-3 py-1.5 transition-colors',
                  viewMode === 'grid'
                    ? 'bg-primary-600 text-white'
                    : 'text-neutral-600 hover:text-neutral-900'
                )}
                title="Grid view"
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'rounded px-3 py-1.5 transition-colors',
                  viewMode === 'list'
                    ? 'bg-primary-600 text-white'
                    : 'text-neutral-600 hover:text-neutral-900'
                )}
                title="List view"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters & Results */}
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar - Desktop Only */}
          <div className="hidden lg:block">
            <FilterSidebar />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Top Bar */}
            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
              >
                Filters
              </button>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-700 transition-colors focus:border-primary-500 focus:outline-none"
              >
                <option value="date_newest">Newest First</option>
                <option value="date_oldest">Oldest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            {/* Results */}
            {results.total === 0 ? (
              <EmptyState
                title="No Results Found"
                description={
                  query
                    ? `We couldn't find any equipment matching "${query}". Try adjusting your search or filters.`
                    : 'No equipment found. Try adjusting your filters.'
                }
                action={{
                  label: 'Browse All Equipment',
                  href: '/search',
                }}
              />
            ) : (
              <>
                <ProductGrid listings={results.items} />

                {/* Pagination */}
                {results.totalPages > 1 && (
                  <Pagination
                    currentPage={results.page}
                    totalPages={results.totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Sidebar */}
      {showMobileFilters && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={() => setShowMobileFilters(false)}
          />

          {/* Sidebar */}
          <div className="fixed bottom-0 left-0 right-0 top-0 z-40 w-full overflow-y-auto bg-white sm:max-w-xs lg:hidden">
            <div className="sticky top-0 border-b border-neutral-200 bg-white p-4 flex items-center justify-between">
              <h2 className="font-semibold text-neutral-900">Filters</h2>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="rounded-lg p-1 text-neutral-500 hover:bg-neutral-100"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <FilterSidebar />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageSkeleton />}>
      <SearchContent />
    </Suspense>
  );
}

function SearchPageSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="h-6 w-48 bg-neutral-200 rounded animate-pulse" />
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="hidden lg:block">
            <div className="h-96 bg-neutral-200 rounded animate-pulse" />
          </div>
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-neutral-200 bg-white overflow-hidden animate-pulse">
                  <div className="aspect-square bg-neutral-200" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-neutral-200 rounded" />
                    <div className="h-3 bg-neutral-200 rounded w-3/4" />
                    <div className="h-5 bg-neutral-200 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
