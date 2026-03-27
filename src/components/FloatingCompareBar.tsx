'use client';

import { useCompare } from '@/context/CompareContext';
import Link from 'next/link';
import Image from 'next/image';
import { X } from 'lucide-react';
import { useState } from 'react';

export default function FloatingCompareBar() {
  const { items, compareCount, removeFromCompare } = useCompare();
  const [isVisible, setIsVisible] = useState(true);

  if (compareCount < 2 || !isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-neutral-200 bg-white shadow-2xl animate-slideUp">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Mini Thumbnails */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-neutral-600">Comparing:</span>
            <div className="flex items-center gap-2">
              {items.map(item => (
                <div key={item.id} className="relative group">
                  <div className="h-12 w-12 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100">
                    {item.images.length > 0 ? (
                      <Image
                        src={item.images[0]}
                        alt={item.title}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-neutral-200">
                        <svg className="h-6 w-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => removeFromCompare(item.id)}
                    className="absolute -right-2 -top-2 rounded-full bg-error p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    title="Remove from comparison"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Compare Button */}
          <Link
            href="/compare"
            className="inline-flex items-center rounded-lg bg-primary-600 px-6 py-2 font-medium text-white transition-all hover:bg-primary-700 active:bg-primary-800"
          >
            Compare {compareCount} Items
          </Link>

          {/* Dismiss Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="flex-shrink-0 rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
            title="Dismiss"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
