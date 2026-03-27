'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Check } from 'lucide-react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

export default function ListingsPage() {
  // Mock listings data
  const [listings] = useState([
    {
      id: '1',
      title: 'Pro Lens Cleaner Kit',
      price: 45,
      originalPrice: 60,
      status: 'active',
      views: 324,
      datePosted: '2026-03-20',
      thumbnail: 'https://picsum.photos/seed/listing-1/300/200',
    },
    {
      id: '2',
      title: 'Digital Refractometer',
      price: 1200,
      originalPrice: null,
      status: 'active',
      views: 89,
      datePosted: '2026-03-18',
      thumbnail: 'https://picsum.photos/seed/listing-2/300/200',
    },
    {
      id: '3',
      title: 'Vintage Eye Exam Equipment',
      price: 350,
      originalPrice: 400,
      status: 'sold',
      views: 156,
      datePosted: '2026-03-15',
      thumbnail: 'https://picsum.photos/seed/listing-3/300/200',
    },
    {
      id: '4',
      title: 'Anti-Reflective Coating Solution',
      price: 89,
      originalPrice: null,
      status: 'draft',
      views: 0,
      datePosted: '2026-03-19',
      thumbnail: 'https://picsum.photos/seed/listing-4/300/200',
    },
    {
      id: '5',
      title: 'Professional Lens Polisher',
      price: 275,
      originalPrice: 350,
      status: 'active',
      views: 512,
      datePosted: '2026-03-17',
      thumbnail: 'https://picsum.photos/seed/listing-5/300/200',
    },
  ]);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this listing?')) {
      // Handle delete
      console.log('Deleted:', id);
    }
  };

  const handleMarkSold = (id: string) => {
    // Handle mark as sold
    console.log('Marked as sold:', id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">My Listings</h1>
          <p className="mt-2 text-neutral-600">Manage and edit your product listings.</p>
        </div>
        <Link
          href="/sell"
          className="flex items-center gap-2 rounded-lg bg-secondary-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-secondary-700"
        >
          <Plus className="h-5 w-5" />
          Add New Listing
        </Link>
      </div>

      {/* Listings Table */}
      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                  Views
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                  Posted
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-neutral-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {listings.map((listing) => (
                <tr key={listing.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={listing.thumbnail}
                        alt={listing.title}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-semibold text-neutral-900">{listing.title}</p>
                        <p className="text-sm text-neutral-500">ID: {listing.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-neutral-900">
                      {formatPrice(listing.price)}
                    </p>
                    {listing.originalPrice && (
                      <p className="text-sm text-neutral-500 line-through">
                        {formatPrice(listing.originalPrice)}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        listing.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : listing.status === 'sold'
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-neutral-900">{listing.views}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-neutral-600">{listing.datePosted}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100">
                        <Edit className="h-4 w-4" />
                      </button>
                      {listing.status === 'active' && (
                        <button
                          onClick={() => handleMarkSold(listing.id)}
                          className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(listing.id)}
                        className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
