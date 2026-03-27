'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const handlePrevious = () => {
    setMainImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setMainImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full bg-neutral-100 rounded-xl flex items-center justify-center aspect-square">
        <div className="text-center">
          <svg
            className="h-16 w-16 text-neutral-400 mx-auto mb-2"
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
          <p className="text-neutral-600">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Main Image */}
      <div className="relative w-full aspect-square bg-neutral-100 rounded-xl overflow-hidden group">
        <Image
          src={images[mainImageIndex]}
          alt={`${title} - Image ${mainImageIndex + 1}`}
          fill
          className="object-cover"
          unoptimized
          priority
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6 text-neutral-900" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6 text-neutral-900" />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 rounded-lg bg-black/50 px-3 py-1 text-sm font-medium text-white">
          {mainImageIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setMainImageIndex(index)}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                index === mainImageIndex
                  ? 'border-primary-600'
                  : 'border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <Image
                src={image}
                alt={`${title} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
