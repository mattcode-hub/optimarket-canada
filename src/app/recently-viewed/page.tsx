'use client';

import Link from 'next/link';
import { useRecentlyViewed } from '@/context/RecentlyViewedContext';
import { Breadcrumb, ProductCard, EmptyState } from '@/components';
import { ArrowLeft, Trash2 } from 'lucide-react';

export default function RecentlyViewedPage() {
  const { items, clearHistory } = useRecentlyViewed();

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Recently Viewed', href: '/recently-viewed' },
  ];

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="border-b border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/" className="mb-6 inline-flex items-center gap-2 text-primary-600 transition-colors hover:text-primary-700">
            <ArrowLeft className="h-4 w-4" />
            Back to listings
          </Link>
          <EmptyState
            title="No recently viewed items"
            description="Start exploring and your viewed listings will appear here"
            action={{ label: 'Browse Listings', href: '/' }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Recently Viewed</h1>
            <p className="mt-1 text-neutral-600">
              {items.length} item{items.length !== 1 ? 's' : ''} viewed
            </p>
          </div>
          <button
            onClick={clearHistory}
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 active:bg-neutral-200"
          >
            <Trash2 className="h-4 w-4" />
            Clear History
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(listing => (
            <ProductCard key={listing.id} listing={listing} />
          ))}
        </div>

        {/* Footer Action */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-primary-200 px-6 py-3 font-medium text-primary-600 transition-colors hover:bg-primary-50 active:bg-primary-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
