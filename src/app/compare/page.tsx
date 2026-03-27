'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCompare } from '@/context/CompareContext';
import { Breadcrumb, EmptyState } from '@/components';
import { ArrowLeft, X } from 'lucide-react';

export default function ComparePage() {
  const { items, removeFromCompare, clearCompare } = useCompare();

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Compare', href: '/compare' },
  ];

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="border-b border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/" className="mb-6 inline-flex items-center gap-2 text-primary-600 transition-colors hover:text-primary-700">
            <ArrowLeft className="h-4 w-4" />
            Back to listings
          </Link>
          <EmptyState
            title="No items to compare"
            description="Add up to 4 listings to compare them side by side"
            action={{ label: 'Start Shopping', href: '/' }}
          />
        </div>
      </div>
    );
  }

  // Features to compare
  const compareFeatures = [
    { key: 'price', label: 'Price' },
    { key: 'condition', label: 'Condition' },
    { key: 'location', label: 'Location' },
    { key: 'seller', label: 'Seller' },
    { key: 'sellerRating', label: 'Seller Rating' },
    { key: 'category', label: 'Category' },
    { key: 'brand', label: 'Brand' },
    { key: 'model', label: 'Model' },
    { key: 'yearManufactured', label: 'Year Manufactured' },
    { key: 'warranty', label: 'Warranty' },
    { key: 'shipping', label: 'Shipping' },
    { key: 'datePosted', label: 'Posted' },
  ];

  // Helper to get feature value
  const getFeatureValue = (featureKey: string, listingIndex: number) => {
    const listing = items[listingIndex];
    switch (featureKey) {
      case 'price':
        return `$${listing.price.toFixed(2)}`;
      case 'condition':
        return listing.condition;
      case 'location':
        return listing.location;
      case 'seller':
        return listing.seller.name;
      case 'sellerRating':
        return `${listing.seller.rating.toFixed(1)} ★ (${listing.seller.reviewCount} reviews)`;
      case 'category':
        return listing.category;
      case 'brand':
        return listing.brand;
      case 'model':
        return listing.model;
      case 'yearManufactured':
        return listing.yearManufactured.toString();
      case 'warranty':
        return listing.warranty;
      case 'shipping':
        return listing.shipping;
      case 'datePosted':
        return new Date(listing.datePosted).toLocaleDateString();
      default:
        return '';
    }
  };

  // Check if values differ for highlighting
  const valuesAreDifferent = (featureKey: string) => {
    const values = items.map((_, index) => getFeatureValue(featureKey, index));
    return new Set(values).size > 1;
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Compare Listings</h1>
            <p className="mt-1 text-neutral-600">
              Comparing {items.length} of 4 items
            </p>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearCompare}
              className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 active:bg-neutral-200"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-lg border border-neutral-200 bg-white shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="w-48 bg-neutral-50 px-4 py-4 text-left text-xs font-semibold text-neutral-700">
                  Feature
                </th>
                {items.map((item, index) => (
                  <th key={item.id} className="min-w-64 bg-neutral-50 px-4 py-4">
                    <div className="flex flex-col gap-3">
                      {/* Product Image */}
                      <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100">
                        {item.images.length > 0 ? (
                          <Image
                            src={item.images[0]}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-neutral-200">
                            <svg className="h-8 w-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Product Title and Price */}
                      <div>
                        <Link
                          href={`/listing/${item.id}`}
                          className="line-clamp-2 font-semibold text-primary-600 transition-colors hover:text-primary-700"
                        >
                          {item.title}
                        </Link>
                        <p className="mt-1 text-lg font-bold text-neutral-900">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCompare(item.id)}
                        className="flex items-center justify-center gap-2 rounded-lg border border-error/20 bg-error/5 py-2 text-sm font-medium text-error transition-colors hover:bg-error/10 active:bg-error/20"
                      >
                        <X className="h-4 w-4" />
                        Remove
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {compareFeatures.map((feature) => {
                const isDifferent = valuesAreDifferent(feature.key);
                return (
                  <tr key={feature.key} className="border-b border-neutral-200 hover:bg-neutral-50">
                    <td className="bg-neutral-50 px-4 py-3 font-medium text-neutral-900">
                      {feature.label}
                    </td>
                    {items.map((item, index) => (
                      <td
                        key={item.id}
                        className={`px-4 py-3 text-sm ${
                          isDifferent ? 'bg-primary-50 font-medium text-primary-900' : 'text-neutral-700'
                        }`}
                      >
                        {getFeatureValue(feature.key, index)}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Action Section */}
        <div className="mt-8 flex gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-primary-200 px-6 py-3 font-medium text-primary-600 transition-colors hover:bg-primary-50 active:bg-primary-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
          <div className="flex-1" />
          <button
            onClick={clearCompare}
            className="rounded-lg border border-neutral-300 px-6 py-3 font-medium text-neutral-700 transition-colors hover:bg-neutral-100 active:bg-neutral-200"
          >
            Clear Comparison
          </button>
        </div>
      </div>
    </div>
  );
}
