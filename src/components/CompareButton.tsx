'use client';

import { Listing } from '@/types';
import { useCompare } from '@/context/CompareContext';
import { useToast } from '@/context/ToastContext';
import { Scale } from 'lucide-react';

interface CompareButtonProps {
  listing: Listing;
  variant?: 'button' | 'icon';
  className?: string;
}

export default function CompareButton({ listing, variant = 'button', className = '' }: CompareButtonProps) {
  const { addToCompare, removeFromCompare, isInCompare, compareCount } = useCompare();
  const { showToast } = useToast();
  const inCompare = isInCompare(listing.id);

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (inCompare) {
      removeFromCompare(listing.id);
      showToast('Removed from comparison', 'info');
    } else {
      const added = addToCompare(listing);
      if (added) {
        showToast('Added to comparison', 'success');
      } else {
        showToast('You can compare up to 4 items', 'warning');
      }
    }
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleToggleCompare}
        className={`relative rounded-full p-2 transition-all ${
          inCompare
            ? 'bg-primary-100 text-primary-600'
            : 'bg-white text-neutral-700 hover:bg-neutral-50'
        } ${className}`}
        title={inCompare ? 'Remove from comparison' : 'Add to comparison'}
        aria-label={inCompare ? 'Remove from comparison' : 'Add to comparison'}
      >
        <Scale className="h-5 w-5" />
        {compareCount > 0 && (
          <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-secondary-500 text-xs font-bold text-white">
            {compareCount}
          </span>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleToggleCompare}
      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-colors ${
        inCompare
          ? 'bg-primary-100 text-primary-700 hover:bg-primary-200'
          : 'border border-primary-200 text-primary-600 hover:bg-primary-50'
      } ${className}`}
    >
      <Scale className="h-4 w-4" />
      {inCompare ? 'In Comparison' : 'Add to Compare'}
    </button>
  );
}
