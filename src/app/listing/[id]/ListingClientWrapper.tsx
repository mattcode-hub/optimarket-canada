'use client';

import { useEffect } from 'react';
import { useRecentlyViewed } from '@/context/RecentlyViewedContext';
import { useWishlist } from '@/context/WishlistContext';
import { Listing } from '@/types';
import { Heart, Share2 } from 'lucide-react';
import CompareButton from '@/components/CompareButton';
import { useToast } from '@/context/ToastContext';

interface ListingClientWrapperProps {
  listing: Listing;
}

export default function ListingClientWrapper({ listing }: ListingClientWrapperProps) {
  const { addItem } = useRecentlyViewed();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  const inWishlist = isInWishlist(listing.id);

  // Track recently viewed on mount
  useEffect(() => {
    addItem(listing);
  }, [listing, addItem]);

  const handleShare = async () => {
    const url = `${window.location.origin}/listing/${listing.id}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: listing.title,
          text: `Check out ${listing.title} on OptiMarket`,
          url,
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(url);
        showToast('Link copied to clipboard', 'success');
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Share failed:', error);
      }
    }
  };

  const handleWishlistToggle = () => {
    toggleWishlist(listing.id);
    showToast(
      inWishlist ? 'Removed from wishlist' : 'Added to wishlist',
      'success'
    );
  };

  return (
    <div className="space-y-2">
      {/* Compare Button */}
      <CompareButton listing={listing} variant="button" className="w-full" />

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className="w-full rounded-lg border border-neutral-300 px-4 py-2 font-medium text-neutral-700 transition-colors hover:bg-neutral-50 active:bg-neutral-100 flex items-center justify-center gap-2"
      >
        <Heart
          className={`h-5 w-5 transition-colors ${
            inWishlist ? 'fill-error text-error' : 'text-neutral-700'
          }`}
        />
        {inWishlist ? 'Saved to Wishlist' : 'Save to Wishlist'}
      </button>

      {/* Share Button */}
      <button
        onClick={handleShare}
        className="w-full rounded-lg border border-primary-600 px-4 py-2 font-medium text-primary-600 transition-colors hover:bg-primary-50 active:bg-primary-100 flex items-center justify-center gap-2"
      >
        <Share2 className="h-4 w-4" />
        Share Listing
      </button>
    </div>
  );
}
