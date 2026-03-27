import { Listing } from '@/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  listings: Listing[];
  loading?: boolean;
}

export default function ProductGrid({ listings, loading = false }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-neutral-200 bg-white overflow-hidden"
          >
            {/* Image Skeleton */}
            <div className="aspect-square bg-neutral-200 animate-pulse" />

            {/* Content Skeleton */}
            <div className="p-4 space-y-3">
              <div className="h-4 bg-neutral-200 rounded animate-pulse" />
              <div className="h-3 bg-neutral-200 rounded w-3/4 animate-pulse" />
              <div className="h-5 bg-neutral-200 rounded w-1/3 animate-pulse" />
              <div className="h-3 bg-neutral-200 rounded w-1/2 animate-pulse" />
              <div className="flex gap-2 pt-2">
                <div className="h-6 w-6 rounded-full bg-neutral-200 animate-pulse" />
                <div className="flex-1 h-3 bg-neutral-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-600">No listings found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {listings.map((listing) => (
        <ProductCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
