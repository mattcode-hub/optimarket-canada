import Link from 'next/link';
import { BadgeCheck } from 'lucide-react';
import { SellerRef } from '@/types';
import StarRating from './StarRating';

interface SellerBadgeProps {
  seller: SellerRef;
  size?: 'sm' | 'md';
}

export default function SellerBadge({ seller, size = 'md' }: SellerBadgeProps) {
  const isSm = size === 'sm';

  return (
    <Link href={`/seller/${seller.id}`}>
      <div className="group flex items-center gap-3 rounded-lg border border-neutral-200 bg-white p-3 transition-all hover:border-primary-300 hover:shadow-md cursor-pointer">
        {/* Avatar */}
        <div className={`rounded-full bg-primary-200 flex-shrink-0 ${isSm ? 'h-8 w-8' : 'h-10 w-10'}`} />

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className={`font-medium text-neutral-900 group-hover:text-primary-600 transition-colors truncate ${isSm ? 'text-xs' : 'text-sm'}`}>
              {seller.name}
            </h3>
            {seller.verified && (
              <BadgeCheck className={`text-primary-500 flex-shrink-0 ${isSm ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} />
            )}
          </div>

          {/* Rating */}
          <div className="mt-0.5">
            <StarRating rating={seller.rating} size={isSm ? 'sm' : 'md'} showCount={!isSm} reviewCount={seller.reviewCount} />
          </div>
        </div>

        {/* Arrow */}
        {!isSm && (
          <svg
            className="h-5 w-5 text-neutral-400 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        )}
      </div>
    </Link>
  );
}
