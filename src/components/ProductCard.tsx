'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, MapPin, Clock, BadgeCheck } from 'lucide-react';
import { Listing } from '@/types';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  listing: Listing;
}

export default function ProductCard({ listing }: ProductCardProps) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [imageError, setImageError] = useState(false);
  const inWishlist = isInWishlist(listing.id);

  const conditionColors: Record<string, string> = {
    'New': 'bg-success text-white',
    'Like New': 'bg-accent-500 text-white',
    'Excellent': 'bg-primary-500 text-white',
    'Good': 'bg-secondary-500 text-white',
    'Fair': 'bg-warning text-neutral-900',
  };

  // Format time posted
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <Link href={`/listing/${listing.id}`}>
      <div className="group overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-neutral-100">
          {!imageError && listing.images.length > 0 ? (
            <Image
              src={listing.images[0]}
              alt={listing.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-neutral-200">
              <svg
                className="h-12 w-12 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="m2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>
          )}

          {/* Condition Badge */}
          <div className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${conditionColors[listing.condition]}`}>
            {listing.condition}
          </div>

          {/* Featured Badge */}
          {listing.featured && (
            <div className="absolute right-3 top-3 rounded-full bg-secondary-500 px-2 py-1 text-xs font-bold text-white">
              Featured
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(listing.id);
            }}
            className="absolute bottom-3 right-3 rounded-full bg-white p-2 shadow-md transition-all hover:bg-neutral-50"
            aria-label="Add to wishlist"
          >
            <Heart
              className={`h-5 w-5 transition-colors ${
                inWishlist
                  ? 'fill-error text-error'
                  : 'text-neutral-700 hover:text-error'
              }`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="line-clamp-2 font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
            {listing.title}
          </h3>

          {/* Brand/Model */}
          <p className="mt-1 text-sm text-neutral-600">
            {listing.brand} {listing.model}
          </p>

          {/* Price */}
          <div className="mt-2 flex items-baseline gap-2">
            <p className="text-lg font-bold text-primary-600">
              ${listing.price.toFixed(2)}
            </p>
            {listing.originalPrice && listing.originalPrice > listing.price && (
              <p className="text-sm text-neutral-500 line-through">
                ${listing.originalPrice.toFixed(2)}
              </p>
            )}
          </div>

          {/* Location */}
          <div className="mt-3 flex items-center gap-1 text-sm text-neutral-600">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{listing.location}</span>
          </div>

          {/* Seller Info */}
          <div className="mt-3 flex items-center gap-2 border-t border-neutral-200 pt-3">
            <div className="h-6 w-6 rounded-full bg-primary-200"></div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <p className="text-xs font-medium text-neutral-900 truncate">
                  {listing.seller.name}
                </p>
                {listing.seller.verified && (
                  <BadgeCheck className="h-3.5 w-3.5 text-primary-500 flex-shrink-0" />
                )}
              </div>
              <p className="text-xs text-neutral-500">
                ★ {listing.seller.rating.toFixed(1)}
              </p>
            </div>
          </div>

          {/* Time Posted */}
          <div className="mt-2 flex items-center gap-1 text-xs text-neutral-500">
            <Clock className="h-3.5 w-3.5" />
            <span>{getTimeAgo(listing.datePosted)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
