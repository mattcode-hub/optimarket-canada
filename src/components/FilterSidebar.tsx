'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FilterSidebarProps {
  onFiltersChange?: (filters: Record<string, any>) => void;
  onClearAll?: () => void;
}

const CONDITIONS = ['New', 'Like New', 'Excellent', 'Good', 'Fair'];
const CATEGORIES = [
  'Phoropters',
  'Slit Lamps',
  'Tonometers',
  'Lens Meters',
  'Trial Frames',
  'Autorefractors',
];
const SHIPPING_TYPES = ['Standard Shipping', 'Express Shipping', 'Local Pickup'];
const BRANDS = [
  'Nidek',
  'Topcon',
  'Bausch + Lomb',
  'Zeiss',
  'Leica',
  'American Optical',
];
const LOCATIONS = [
  'Ontario',
  'British Columbia',
  'Alberta',
  'Quebec',
  'Manitoba',
  'Saskatchewan',
];

export default function FilterSidebar({
  onFiltersChange,
  onClearAll,
}: FilterSidebarProps) {
  const [minPrice, setMinPrice] = useState('0');
  const [maxPrice, setMaxPrice] = useState('50000');
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedShipping, setSelectedShipping] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    condition: true,
    category: true,
    shipping: false,
    brand: false,
    location: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleFilterChange = () => {
    const filters = {
      minPrice: parseInt(minPrice) || 0,
      maxPrice: parseInt(maxPrice) || 50000,
      conditions: selectedConditions,
      categories: selectedCategories,
      shipping: selectedShipping,
      brands: selectedBrands,
      location: selectedLocation,
    };
    onFiltersChange?.(filters);
  };

  const handleCheckboxChange = (
    value: string,
    state: string[],
    setState: (state: string[]) => void
  ) => {
    const newState = state.includes(value)
      ? state.filter((item) => item !== value)
      : [...state, value];
    setState(newState);
  };

  const handleClearAll = () => {
    setMinPrice('0');
    setMaxPrice('50000');
    setSelectedConditions([]);
    setSelectedCategories([]);
    setSelectedShipping([]);
    setSelectedBrands([]);
    setSelectedLocation('');
    onClearAll?.();
  };

  const hasActiveFilters =
    selectedConditions.length > 0 ||
    selectedCategories.length > 0 ||
    selectedShipping.length > 0 ||
    selectedBrands.length > 0 ||
    selectedLocation !== '' ||
    parseInt(minPrice) > 0 ||
    parseInt(maxPrice) < 50000;

  return (
    <div className="w-full lg:w-64 rounded-xl border border-neutral-200 bg-white p-4 h-fit sticky top-24">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-lg font-bold text-neutral-900">
          Filters
        </h2>
        {hasActiveFilters && (
          <button
            onClick={handleClearAll}
            className="text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Price Range */}
      <FilterSection
        title="Price"
        isOpen={expandedSections.price}
        onToggle={() => toggleSection('price')}
      >
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-neutral-700">
              Min Price
            </label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              onBlur={handleFilterChange}
              className="w-full mt-1 rounded-lg border border-neutral-300 px-3 py-1.5 text-sm"
              min="0"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-neutral-700">
              Max Price
            </label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              onBlur={handleFilterChange}
              className="w-full mt-1 rounded-lg border border-neutral-300 px-3 py-1.5 text-sm"
              max="500000"
            />
          </div>
        </div>
      </FilterSection>

      {/* Condition */}
      <FilterSection
        title="Condition"
        isOpen={expandedSections.condition}
        onToggle={() => toggleSection('condition')}
      >
        <div className="space-y-2">
          {CONDITIONS.map((condition) => (
            <label key={condition} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedConditions.includes(condition)}
                onChange={() =>
                  handleCheckboxChange(
                    condition,
                    selectedConditions,
                    setSelectedConditions
                  )
                }
                onChangeCapture={handleFilterChange}
                className="rounded border-neutral-300 text-primary-600 cursor-pointer"
              />
              <span className="text-sm text-neutral-700">{condition}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Category */}
      <FilterSection
        title="Category"
        isOpen={expandedSections.category}
        onToggle={() => toggleSection('category')}
      >
        <div className="space-y-2">
          {CATEGORIES.map((category) => (
            <label key={category} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() =>
                  handleCheckboxChange(
                    category,
                    selectedCategories,
                    setSelectedCategories
                  )
                }
                onChangeCapture={handleFilterChange}
                className="rounded border-neutral-300 text-primary-600 cursor-pointer"
              />
              <span className="text-sm text-neutral-700">{category}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Shipping */}
      <FilterSection
        title="Shipping Type"
        isOpen={expandedSections.shipping}
        onToggle={() => toggleSection('shipping')}
      >
        <div className="space-y-2">
          {SHIPPING_TYPES.map((shipping) => (
            <label key={shipping} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedShipping.includes(shipping)}
                onChange={() =>
                  handleCheckboxChange(
                    shipping,
                    selectedShipping,
                    setSelectedShipping
                  )
                }
                onChangeCapture={handleFilterChange}
                className="rounded border-neutral-300 text-primary-600 cursor-pointer"
              />
              <span className="text-sm text-neutral-700">{shipping}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Brand */}
      <FilterSection
        title="Brand"
        isOpen={expandedSections.brand}
        onToggle={() => toggleSection('brand')}
      >
        <div className="space-y-2">
          {BRANDS.map((brand) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() =>
                  handleCheckboxChange(brand, selectedBrands, setSelectedBrands)
                }
                onChangeCapture={handleFilterChange}
                className="rounded border-neutral-300 text-primary-600 cursor-pointer"
              />
              <span className="text-sm text-neutral-700">{brand}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Location */}
      <FilterSection
        title="Location"
        isOpen={expandedSections.location}
        onToggle={() => toggleSection('location')}
      >
        <select
          value={selectedLocation}
          onChange={(e) => {
            setSelectedLocation(e.target.value);
            handleFilterChange();
          }}
          className="w-full rounded-lg border border-neutral-300 px-3 py-1.5 text-sm"
        >
          <option value="">All Provinces</option>
          {LOCATIONS.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </FilterSection>

      {/* Apply Button */}
      <button
        onClick={handleFilterChange}
        className="mt-4 w-full rounded-lg bg-primary-600 py-2 font-medium text-white transition-colors hover:bg-primary-700 active:bg-primary-800"
      >
        Apply Filters
      </button>
    </div>
  );
}

interface FilterSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function FilterSection({ title, isOpen, onToggle, children }: FilterSectionProps) {
  return (
    <div className="border-t border-neutral-200 py-4 first:border-t-0 first:pt-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between font-medium text-neutral-900 hover:text-primary-600 transition-colors"
      >
        {title}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && <div className="mt-3">{children}</div>}
    </div>
  );
}
