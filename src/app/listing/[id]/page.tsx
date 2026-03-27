import { notFound } from 'next/navigation';
import Image from 'next/image';
import { MapPin, Truck, Shield, Clock, BadgeCheck, ExternalLink, Share2 } from 'lucide-react';
import { Breadcrumb, ProductGrid } from '@/components';
import { getListingById, getRelatedListings, getAllListings, formatPrice, formatDate } from '@/lib';
import ImageGallery from './ImageGallery';
import ContactSellerModalWrapper from './ContactSellerModalWrapper';
import ListingClientWrapper from './ListingClientWrapper';

interface ListingPageProps {
  params: Promise<{ id: string }>;
}

export default async function ListingPage({ params }: ListingPageProps) {
  const { id } = await params;
  const listing = getListingById(id);

  if (!listing) {
    notFound();
  }

  const relatedListings = getRelatedListings(listing, 6);
  const breadcrumbItems = [
    { label: listing.category, href: `/search?category=${encodeURIComponent(listing.category)}` },
    { label: listing.title, href: '#' },
  ];

  const conditionColors: Record<string, string> = {
    'New': 'bg-green-100 text-green-800',
    'Like New': 'bg-emerald-100 text-emerald-800',
    'Excellent': 'bg-blue-100 text-blue-800',
    'Good': 'bg-yellow-100 text-yellow-800',
    'Fair': 'bg-orange-100 text-orange-800',
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Image Gallery (60%) */}
          <div className="lg:col-span-2">
            <ImageGallery images={listing.images} title={listing.title} />
          </div>

          {/* Right Column - Product Info (40%) */}
          <div className="lg:col-span-1">
            {/* Title & Condition */}
            <div className="mb-6">
              <div className="mb-3">
                <h1 className="text-2xl font-bold text-neutral-900">
                  {listing.title}
                </h1>
              </div>
              <div className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${conditionColors[listing.condition]}`}>
                {listing.condition}
              </div>
            </div>

            {/* Price */}
            <div className="mb-6 border-b border-neutral-200 pb-6">
              <div className="flex items-baseline gap-3">
                <p className="text-3xl font-bold text-primary-600">
                  {formatPrice(listing.price)}
                </p>
                {listing.originalPrice && listing.originalPrice > listing.price && (
                  <p className="text-sm text-neutral-500 line-through">
                    {formatPrice(listing.originalPrice)}
                  </p>
                )}
              </div>
            </div>

            {/* Equipment Details */}
            <div className="mb-6 space-y-3 border-b border-neutral-200 pb-6">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Brand</span>
                <span className="font-medium text-neutral-900">{listing.brand}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Model</span>
                <span className="font-medium text-neutral-900">{listing.model}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Year Manufactured</span>
                <span className="font-medium text-neutral-900">{listing.yearManufactured}</span>
              </div>
            </div>

            {/* Shipping & Warranty */}
            <div className="mb-6 space-y-3 border-b border-neutral-200 pb-6">
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 flex-shrink-0 text-primary-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-neutral-900">Shipping</p>
                  <p className="text-sm text-neutral-600">{listing.shipping}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 flex-shrink-0 text-primary-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-neutral-900">Warranty</p>
                  <p className="text-sm text-neutral-600">{listing.warranty}</p>
                </div>
              </div>
            </div>

            {/* Seller Card */}
            <div className="mb-6 rounded-lg border border-neutral-200 p-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="relative h-12 w-12 flex-shrink-0">
                  <Image
                    src={listing.seller.avatar}
                    alt={listing.seller.name}
                    fill
                    className="rounded-full object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <p className="font-semibold text-neutral-900">
                      {listing.seller.name}
                    </p>
                    {listing.seller.verified && (
                      <BadgeCheck className="h-4 w-4 text-primary-600 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-neutral-600">
                    ★ {listing.seller.rating.toFixed(1)} ({listing.seller.reviewCount} reviews)
                  </p>
                </div>
              </div>

              <div className="mb-4 space-y-2 border-t border-neutral-200 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Member Since</span>
                  <span className="font-medium text-neutral-900">
                    {formatDate(listing.seller.memberSince)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Location</span>
                  <span className="font-medium text-neutral-900 flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {listing.seller.location}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <ContactSellerModalWrapper
                  sellerName={listing.seller.name}
                  sellerAvatar={listing.seller.avatar}
                  productTitle={listing.title}
                  listingId={listing.id}
                  listingImage={listing.images[0]}
                />
                <button className="w-full rounded-lg border border-primary-600 px-4 py-2 font-medium text-primary-600 transition-colors hover:bg-primary-50 active:bg-primary-100 flex items-center justify-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  View Profile
                </button>
              </div>
            </div>

            {/* Client-side Actions */}
            <ListingClientWrapper listing={listing} />
          </div>
        </div>

        {/* Full Description */}
        <div className="mt-12 border-t border-neutral-200 pt-8">
          <h2 className="mb-4 text-xl font-bold text-neutral-900">Description</h2>
          <div className="prose prose-sm max-w-none text-neutral-700">
            <p className="whitespace-pre-wrap">{listing.description}</p>
          </div>
        </div>

        {/* Details Table */}
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-bold text-neutral-900">Equipment Details</h2>
          <div className="overflow-x-auto rounded-lg border border-neutral-200">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-neutral-200">
                  <td className="bg-neutral-50 px-4 py-3 font-medium text-neutral-900">Brand</td>
                  <td className="px-4 py-3 text-neutral-700">{listing.brand}</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="bg-neutral-50 px-4 py-3 font-medium text-neutral-900">Model</td>
                  <td className="px-4 py-3 text-neutral-700">{listing.model}</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="bg-neutral-50 px-4 py-3 font-medium text-neutral-900">Year Manufactured</td>
                  <td className="px-4 py-3 text-neutral-700">{listing.yearManufactured}</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="bg-neutral-50 px-4 py-3 font-medium text-neutral-900">Condition</td>
                  <td className="px-4 py-3 text-neutral-700">{listing.condition}</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="bg-neutral-50 px-4 py-3 font-medium text-neutral-900">Warranty</td>
                  <td className="px-4 py-3 text-neutral-700">{listing.warranty}</td>
                </tr>
                <tr>
                  <td className="bg-neutral-50 px-4 py-3 font-medium text-neutral-900">Shipping</td>
                  <td className="px-4 py-3 text-neutral-700">{listing.shipping}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Listing Info */}
        <div className="mt-8 rounded-lg bg-neutral-50 p-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-xs font-medium text-neutral-600">Posted</p>
              <p className="mt-1 text-sm font-semibold text-neutral-900">
                {formatDate(listing.datePosted)}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-600">Views</p>
              <p className="mt-1 text-sm font-semibold text-neutral-900">
                {listing.views.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-600">Saved</p>
              <p className="mt-1 text-sm font-semibold text-neutral-900">
                {listing.saves.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Related Listings */}
        {relatedListings.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 text-xl font-bold text-neutral-900">Related Listings</h2>
            <ProductGrid listings={relatedListings} />
          </div>
        )}
      </div>
    </div>
  );
}

export function generateStaticParams() {
  const listings = getAllListings();
  return listings.map((listing) => ({
    id: listing.id,
  }));
}
