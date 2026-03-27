import listingsData from '@/data/listings.json';
import sellersData from '@/data/sellers.json';
import reviewsData from '@/data/reviews.json';
import categoriesData from '@/data/categories.json';
import { Listing, Seller, Review, Category, SearchFilters, PaginatedResult } from '@/types';

const listings = listingsData as unknown as Listing[];
const sellers = sellersData as unknown as Seller[];
const reviews = reviewsData as unknown as Review[];
const categories = categoriesData as unknown as Category[];

export function getAllListings(): Listing[] {
  return listings;
}

export function getListingById(id: string): Listing | undefined {
  return listings.find(l => l.id === id);
}

export function getFeaturedListings(limit = 12): Listing[] {
  return listings.filter(l => l.featured).slice(0, limit);
}

export function getRecentListings(limit = 12): Listing[] {
  return [...listings]
    .sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime())
    .slice(0, limit);
}

export function searchListings(filters: SearchFilters): PaginatedResult<Listing> {
  let results = [...listings];

  if (filters.query) {
    const q = filters.query.toLowerCase();
    results = results.filter(l =>
      l.title.toLowerCase().includes(q) ||
      l.description.toLowerCase().includes(q) ||
      l.brand.toLowerCase().includes(q) ||
      l.model.toLowerCase().includes(q) ||
      l.category.toLowerCase().includes(q) ||
      l.subcategory.toLowerCase().includes(q)
    );
  }

  if (filters.category) {
    results = results.filter(l => l.category === filters.category);
  }

  if (filters.subcategory) {
    results = results.filter(l => l.subcategory === filters.subcategory);
  }

  if (filters.minPrice !== undefined) {
    results = results.filter(l => l.price >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined) {
    results = results.filter(l => l.price <= filters.maxPrice!);
  }

  if (filters.condition && filters.condition.length > 0) {
    results = results.filter(l => filters.condition!.includes(l.condition));
  }

  if (filters.location) {
    results = results.filter(l => l.location.toLowerCase().includes(filters.location!.toLowerCase()));
  }

  if (filters.brand) {
    results = results.filter(l => l.brand.toLowerCase() === filters.brand!.toLowerCase());
  }

  if (filters.shipping) {
    results = results.filter(l => l.shipping === filters.shipping);
  }

  // Sort
  switch (filters.sortBy) {
    case 'price_asc':
      results.sort((a, b) => a.price - b.price);
      break;
    case 'price_desc':
      results.sort((a, b) => b.price - a.price);
      break;
    case 'date_newest':
      results.sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime());
      break;
    case 'date_oldest':
      results.sort((a, b) => new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime());
      break;
    case 'popular':
      results.sort((a, b) => b.views - a.views);
      break;
    default:
      results.sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime());
  }

  const page = filters.page || 1;
  const perPage = filters.perPage || 24;
  const start = (page - 1) * perPage;
  const paginatedItems = results.slice(start, start + perPage);

  return {
    items: paginatedItems,
    total: results.length,
    page,
    perPage,
    totalPages: Math.ceil(results.length / perPage),
  };
}

export function getSellerById(id: string): Seller | undefined {
  return sellers.find(s => s.id === id);
}

export function getSellerListings(sellerId: string): Listing[] {
  return listings.filter(l => l.seller.id === sellerId);
}

export function getReviewsForSeller(sellerId: string): Review[] {
  return reviews.filter(r => r.sellerId === sellerId);
}

export function getAllCategories(): Category[] {
  return categories;
}

export function getCategoryByName(name: string): Category | undefined {
  return categories.find(c => c.name === name);
}

export function getRelatedListings(listing: Listing, limit = 6): Listing[] {
  return listings
    .filter(l => l.id !== listing.id && (l.category === listing.category || l.brand === listing.brand))
    .slice(0, limit);
}

export function getAllBrands(): string[] {
  const brands = new Set(listings.map(l => l.brand));
  return Array.from(brands).sort();
}

export function getAllLocations(): string[] {
  const locations = new Set(listings.map(l => l.location));
  return Array.from(locations).sort();
}

export function getListingStats() {
  return {
    totalListings: listings.length,
    totalSellers: sellers.length,
    totalCategories: categories.length,
    avgPrice: Math.round(listings.reduce((sum, l) => sum + l.price, 0) / listings.length),
    verifiedSellers: sellers.filter(s => s.verified).length,
  };
}
