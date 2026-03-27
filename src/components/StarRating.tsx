import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  reviewCount?: number;
}

export default function StarRating({
  rating,
  size = 'md',
  showCount = false,
  reviewCount = 0,
}: StarRatingProps) {
  const sizeMap = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const sizeClass = sizeMap[size];
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  // Create array of 5 stars
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push('full');
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push('half');
    } else {
      stars.push('empty');
    }
  }

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {stars.map((star, index) => (
          <Star
            key={index}
            className={`${sizeClass} transition-colors ${
              star === 'full'
                ? 'fill-secondary-500 text-secondary-500'
                : star === 'half'
                  ? 'fill-secondary-500 text-secondary-500'
                  : 'text-neutral-300'
            }`}
            style={
              star === 'half'
                ? {
                    background: `linear-gradient(90deg, #D4A84B 50%, #e9ecef 50%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }
                : undefined
            }
          />
        ))}
      </div>

      {showCount && (
        <span className="text-sm text-neutral-600">
          {rating.toFixed(1)} ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
        </span>
      )}
    </div>
  );
}
