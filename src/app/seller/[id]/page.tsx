'use server';

import { getSellerById, getSellerListings, getReviewsForSeller } from '@/lib/data';
import { formatDate, cn, formatPrice } from '@/lib/utils';
import { Header, Breadcrumb, ProductGrid, StarRating } from '@/components';
import { MapPin, MessageCircle, Clock, CheckCircle } from 'lucide-react';
import SellerTabs from './SellerTabs';
import ReviewCard from './ReviewCard';
import { notFound } from 'next/navigation';
import sellersData from '@/data/sellers.json';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const sellers = sellersData as any[];
  return sellers.map((seller) => ({
    id: seller.id,
  }));
}

export default async function SellerProfilePage({ params }: Props) {
  const { id } = await params;
  const seller = getSellerById(id);

  if (!seller) {
    notFound();
  }

  const listings = getSellerListings(id);
  const reviews = getReviewsForSeller(id);

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0';

  const responseRate = 95; // Mock data
  const responseTime = seller.responseTime || '< 2 hours';

  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Marketplace', href: '/browse' },
              { label: seller.name, href: '#' },
            ]}
          />

          {/* Seller Profile Header */}
          <div className="mt-8 rounded-lg bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-col gap-8 md:flex-row md:gap-12">
              {/* Avatar and Name */}
              <div className="flex flex-col items-center md:items-start">
                <img
                  src={seller.avatar}
                  alt={seller.name}
                  className="h-32 w-32 rounded-full border-4 border-secondary-200 object-cover"
                />
                <div className="mt-4 text-center md:text-left">
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-neutral-900">{seller.name}</h1>
                    {seller.verified && (
                      <CheckCircle className="h-6 w-6 text-blue-600" />
                    )}
                  </div>
                  <p className="mt-2 text-sm text-neutral-600">{seller.type}</p>
                </div>
              </div>

              {/* Stats and Details */}
              <div className="flex-1">
                {/* Rating */}
                <div className="mb-6">
                  <div className="flex items-center gap-3">
                    <StarRating rating={seller.rating} size="lg" />
                    <span className="text-sm text-neutral-600">
                      {seller.rating} ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                    </span>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-neutral-500">Member Since</p>
                    <p className="mt-1 font-semibold text-neutral-900">
                      {formatDate(seller.memberSince).split(' ').slice(1).join(' ')}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-neutral-500">Location</p>
                    <div className="mt-1 flex items-center gap-1 font-semibold text-neutral-900">
                      <MapPin className="h-4 w-4" />
                      {seller.location}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-neutral-500">Response Time</p>
                    <div className="mt-1 flex items-center gap-1 font-semibold text-neutral-900">
                      <Clock className="h-4 w-4" />
                      {responseTime}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-neutral-500">Response Rate</p>
                    <p className="mt-1 font-semibold text-neutral-900">{responseRate}%</p>
                  </div>
                </div>

                {/* Bio */}
                {seller.bio || seller.description && (
                  <div className="mt-6">
                    <p className="text-neutral-700">{seller.bio || seller.description}</p>
                  </div>
                )}

                {/* Specialties */}
                {seller.specialties && seller.specialties.length > 0 && (
                  <div className="mt-6">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-500">
                      Specialties
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {seller.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="rounded-full bg-secondary-100 px-3 py-1 text-sm font-medium text-secondary-900"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Contact Button */}
              <div className="flex flex-col gap-3">
                <button className="flex items-center justify-center gap-2 rounded-lg bg-secondary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-secondary-700">
                  <MessageCircle className="h-5 w-5" />
                  Contact Seller
                </button>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <p className="text-sm text-neutral-600">Total Listings</p>
              <p className="mt-2 text-2xl font-bold text-neutral-900">{listings.length}</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <p className="text-sm text-neutral-600">Total Sales</p>
              <p className="mt-2 text-2xl font-bold text-neutral-900">
                {Math.round(reviews.length * 1.5)}
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <p className="text-sm text-neutral-600">Average Rating</p>
              <p className="mt-2 text-2xl font-bold text-neutral-900">{avgRating}</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <p className="text-sm text-neutral-600">Response Rate</p>
              <p className="mt-2 text-2xl font-bold text-neutral-900">{responseRate}%</p>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-8">
            <SellerTabs listings={listings} reviews={reviews} />
          </div>
        </div>
      </main>
    </>
  );
}
