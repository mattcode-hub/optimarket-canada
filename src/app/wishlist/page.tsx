'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { Breadcrumb, ProductGrid, EmptyState } from '@/components';
import { getListingById } from '@/lib/data';
import { useWishlist } from '@/context/WishlistContext';

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  // Fetch listings for all saved items
  const listings = useMemo(() => {
    return wishlist
      .map(id => getListingById(id))
      .filter(Boolean) as any[];
  }, [wishlist]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb items={[{ label: 'Saved Items', href: '/wishlist' }]} />
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
            <Heart className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Saved Items</h1>
            <p className="mt-1 text-sm text-neutral-600">
              {listings.length} {listings.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
        </div>

        {/* Results */}
        {listings.length === 0 ? (
          <EmptyState
            title="No Saved Items Yet"
            description="Start saving your favorite equipment to keep track of items you're interested in. Click the heart icon on any listing to save it."
            action={{
              label: 'Browse Equipment',
              href: '/search',
            }}
          />
        ) : (
          <>
            <ProductGrid listings={listings} />

            {/* Continue Browsing */}
            <div className="mt-12 flex justify-center">
              <Link
                href="/search"
                className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 font-medium text-white transition-colors hover:bg-primary-700"
              >
                <ShoppingBag className="h-5 w-5" />
                Continue Browsing
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
