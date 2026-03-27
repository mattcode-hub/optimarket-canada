export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number | null;
  currency: string;
  condition: 'New' | 'Like New' | 'Excellent' | 'Good' | 'Fair';
  category: string;
  subcategory: string;
  images: string[];
  seller: SellerRef;
  location: string;
  datePosted: string;
  views: number;
  saves: number;
  featured: boolean;
  shipping: string;
  brand: string;
  model: string;
  yearManufactured: number;
  warranty: string;
}

export interface SellerRef {
  id: string;
  name: string;
  location: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  memberSince: string;
  avatar: string;
}

export interface Seller extends SellerRef {
  type?: string;
  description?: string;
  bio?: string;
  specialties?: string[];
  responseTime?: string;
  listingCount?: number;
}

export interface Review {
  id: string;
  sellerId: string;
  reviewer: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  subcategories: string[];
  listingCount: number;
}

export interface SearchFilters {
  query?: string;
  category?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: string[];
  location?: string;
  brand?: string;
  shipping?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'date_newest' | 'date_oldest' | 'popular';
  page?: number;
  perPage?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}
