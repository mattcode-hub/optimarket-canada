'use client';

import { Review } from '@/types';
import { StarRating } from '@/components';
import { formatDate } from '@/lib/utils';
import { ThumbsUp, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const [helpfulCount, setHelpfulCount] = useState(0);
  const [isHelpful, setIsHelpful] = useState(false);

  const handleHelpful = () => {
    if (!isHelpful) {
      setHelpfulCount(helpfulCount + 1);
      setIsHelpful(true);
    }
  };

  return (
    <div className="rounded-lg border border-neutral-200 p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Reviewer Info */}
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-neutral-900">{review.reviewer}</p>
                {review.verified && (
                  <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1">
                    <CheckCircle className="h-3 w-3 text-green-700" />
                    <span className="text-xs font-medium text-green-700">Verified Purchase</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-neutral-500">{formatDate(review.date)}</p>
            </div>
          </div>

          {/* Rating */}
          <div className="mt-3">
            <StarRating rating={review.rating} size="sm" />
          </div>

          {/* Review Text */}
          <p className="mt-3 text-neutral-700">{review.text}</p>
        </div>
      </div>

      {/* Helpful Button */}
      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={handleHelpful}
          disabled={isHelpful}
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            isHelpful
              ? 'bg-secondary-100 text-secondary-700'
              : 'border border-neutral-300 text-neutral-600 hover:border-neutral-400'
          }`}
        >
          <ThumbsUp className="h-4 w-4" />
          Helpful {helpfulCount > 0 && `(${helpfulCount})`}
        </button>
      </div>
    </div>
  );
}
