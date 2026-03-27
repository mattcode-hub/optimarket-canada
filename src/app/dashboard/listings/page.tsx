'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Check, Copy, Filter, XCircle } from 'lucide-react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

interface Listing {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  status: 'active' | 'sold' | 'draft';
  views: number;
  datePosted: string;
  thumbnail?: string;
  description?: string;
  category?: string;
  condition?: string;
  location?: string;
}

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'sold' | 'draft'>('all');
  const [selectedListings, setSelectedListings] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedListings = localStorage.getItem('sellerListings');
    if (storedListings) {
      try {
        const parsed = JSON.parse(storedListings);
        setListings(parsed);
        filterListings(parsed, statusFilter);
      } catch (e) {
        console.error('Failed to load listings');
      }
    }
    setIsLoading(false);
  }, []);

  const filterListings = (allListings: Listing[], filter: typeof statusFilter) => {
    if (filter === 'all') {
      setFilteredListings(allListings);
    } else {
      setFilteredListings(allListings.filter(l => l.status === filter));
    }
    setSelectedListings([]);
  };

  const handleFilterChange = (filter: typeof statusFilter) => {
    setStatusFilter(filter);
    filterListings(listings, filter);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure? This action cannot be undone.')) {
      const updated = listings.filter(l => l.id !== id);
      setListings(updated);
      setFilteredListings(updated.filter(l => statusFilter === 'all' || l.status === statusFilter));
      localStorage.setItem('sellerListings', JSON.stringify(updated));
      showFeedback('success', 'Listing deleted successfully');
    }
  };

  const handleBulkDelete = () => {
    if (selectedListings.length === 0) return;
    if (confirm(`Delete ${selectedListings.length} listing(s)? This action cannot be undone.`)) {
      const updated = listings.filter(l => !selectedListings.includes(l.id));
      setListings(updated);
      setFilteredListings(updated.filter(l => statusFilter === 'all' || l.status === statusFilter));
      setSelectedListings([]);
      localStorage.setItem('sellerListings', JSON.stringify(updated));
      showFeedback('success', `${selectedListings.length} listing(s) deleted`);
    }
  };

  const handleMarkSold = (id: string) => {
    const updated = listings.map(l =>
      l.id === id ? { ...l, status: 'sold' as const } : l
    );
    setListings(updated);
    setFilteredListings(updated.filter(l => statusFilter === 'all' || l.status === statusFilter));
    localStorage.setItem('sellerListings', JSON.stringify(updated));
    showFeedback('success', 'Listing marked as sold');
  };

  const handleDuplicate = (id: string) => {
    const listingToDuplicate = listings.find(l => l.id === id);
    if (!listingToDuplicate) return;

    const duplicated: Listing = {
      ...listingToDuplicate,
      id: `${Date.now()}`,
      status: 'draft',
      datePosted: new Date().toISOString().split('T')[0],
      views: 0,
      title: `${listingToDuplicate.title} (Copy)`,
    };

    const updated = [...listings, duplicated];
    setListings(updated);
    setFilteredListings(updated.filter(l => statusFilter === 'all' || l.status === statusFilter));
    localStorage.setItem('sellerListings', JSON.stringify(updated));
    showFeedback('success', 'Listing duplicated as draft');
  };

  const toggleSelectListing = (id: string) => {
    setSelectedListings(prev =>
      prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedListings.length === filteredListings.length) {
      setSelectedListings([]);
    } else {
      setSelectedListings(filteredListings.map(l => l.id));
    }
  };

  const showFeedback = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 3000);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-neutral-200 rounded-lg w-48 animate-pulse" />
        <div className="bg-white rounded-xl p-8 text-center text-neutral-500">Loading listings...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">My Listings</h1>
          <p className="mt-2 text-neutral-600">
            {filteredListings.length} of {listings.length} listing{listings.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link
          href="/dashboard/listings/new"
          className="flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2 font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-lg"
        >
          <Plus className="h-5 w-5" />
          Add New Listing
        </Link>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={`flex items-center gap-3 rounded-xl p-4 ${
          feedback.type === 'success'
            ? 'bg-green-50 text-green-700 border border-green-200'
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          <div className="flex-1">{feedback.message}</div>
          <button onClick={() => setFeedback(null)}>
            <XCircle className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <Filter className="h-5 w-5 text-neutral-600" />
        {(['all', 'active', 'sold', 'draft'] as const).map(status => (
          <button
            key={status}
            onClick={() => handleFilterChange(status)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              statusFilter === status
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Bulk Actions */}
      {selectedListings.length > 0 && (
        <div className="flex items-center justify-between rounded-xl bg-primary-50 border border-primary-200 p-4">
          <p className="font-medium text-primary-900">
            {selectedListings.length} selected
          </p>
          <button
            onClick={handleBulkDelete}
            className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors"
          >
            Delete Selected
          </button>
        </div>
      )}

      {/* Listings Table */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm border border-neutral-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedListings.length === filteredListings.length && filteredListings.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                  />
                </th>
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
              {filteredListings.length > 0 ? (
                filteredListings.map((listing) => (
                  <tr key={listing.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedListings.includes(listing.id)}
                        onChange={() => toggleSelectListing(listing.id)}
                        className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-lg bg-neutral-200 flex-shrink-0 overflow-hidden">
                          {listing.thumbnail ? (
                            <img
                              src={listing.thumbnail}
                              alt={listing.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full bg-neutral-300" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-neutral-900 truncate">{listing.title}</p>
                          <p className="text-sm text-neutral-500">ID: {listing.id.substring(0, 8)}</p>
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
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${
                          listing.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : listing.status === 'sold'
                              ? 'bg-neutral-100 text-neutral-800'
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
                        <button
                          title="Edit"
                          className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        {listing.status === 'active' && (
                          <button
                            onClick={() => handleMarkSold(listing.id)}
                            title="Mark as sold"
                            className="rounded-lg p-2 text-neutral-600 hover:bg-green-50 hover:text-green-600 transition-colors"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDuplicate(listing.id)}
                          title="Duplicate"
                          className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 transition-colors"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(listing.id)}
                          title="Delete"
                          className="rounded-lg p-2 text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <p className="text-neutral-500 font-medium">
                      {listings.length === 0 ? 'No listings yet' : 'No listings match this filter'}
                    </p>
                    {listings.length === 0 && (
                      <Link
                        href="/dashboard/listings/new"
                        className="mt-4 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
                      >
                        <Plus className="h-4 w-4" />
                        Create your first listing
                      </Link>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
