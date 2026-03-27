'use client';

import { useState } from 'react';
import { Listing, Review } from '@/types';
import { ProductGrid } from '@/components';
import ReviewCard from './ReviewCard';

interface SellerTabsProps {
  listings: Listing[];
  reviews: Review[];
}

export default function SellerTabs({ listings, reviews }: SellerTabsProps) {
  const [activeTab, setActiveTab] = useState<'listings' | 'reviews'>('listings');

  return (
    <div className="rounded-lg bg-white shadow-sm">
      {/* Tab Navigation */}
      <div className="border-b border-neutral-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('listings')}
            className={`flex-1 border-b-2 px-6 py-4 text-center font-semibold transition-colors ${
              activeTab === 'listings'
                ? 'border-secondary-600 text-secondary-600'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Active Listings ({listings.length})
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex-1 border-b-2 px-6 py-4 text-center font-semibold transition-colors ${
              activeTab === 'reviews'
                ? 'border-secondary-600 text-secondary-600'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Reviews ({reviews.length})
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'listings' && (
          <div>
            {listings.length > 0 ? (
              <ProductGrid listings={listings} />
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-neutral-600">No active listings at the moment.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-neutral-600">No reviews yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
