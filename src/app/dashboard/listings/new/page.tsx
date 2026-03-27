'use client';

import { useState, useEffect } from 'react';
import { Upload, Eye, EyeOff, Plus, X, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { formatPrice } from '@/lib/utils';

interface FormData {
  title: string;
  description: string;
  category: string;
  price: number;
  originalPrice: number | '';
  condition: string;
  location: string;
}

const categories = [
  'Eye Exam Equipment',
  'Lens Solutions',
  'Cleaning & Maintenance',
  'Accessories',
  'Contact Lenses',
  'Safety Equipment',
  'Other',
];

const conditions = ['New', 'Like New', 'Excellent', 'Good', 'Fair', 'Poor'];

export default function NewListingPage() {
  const router = useRouter();
  const [showPreview, setShowPreview] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: 'Eye Exam Equipment',
    price: 0,
    originalPrice: '',
    condition: 'Excellent',
    location: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (formData.title.length < 10) newErrors.title = 'Title must be at least 10 characters';
    if (formData.description.length < 20) newErrors.description = 'Description must be at least 20 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'originalPrice' ? (value ? parseFloat(value) : '') : value,
    }));
    if (errors[name]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleAddImage = () => {
    if (images.length < 5) {
      setImages([...images, `https://picsum.photos/seed/listing-${Date.now()}/300/200`]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSaving(true);

    try {
      const newListing = {
        id: `${Date.now()}`,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: formData.price,
        originalPrice: formData.originalPrice ? parseFloat(String(formData.originalPrice)) : undefined,
        condition: formData.condition,
        location: formData.location,
        status: 'draft' as const,
        views: 0,
        datePosted: new Date().toISOString().split('T')[0],
        thumbnail: images[0],
        images,
      };

      const existingListings = localStorage.getItem('sellerListings');
      const allListings = existingListings ? JSON.parse(existingListings) : [];
      allListings.push(newListing);

      localStorage.setItem('sellerListings', JSON.stringify(allListings));

      setSubmitted(true);
      setTimeout(() => {
        router.push('/dashboard/listings?success=true');
      }, 2000);
    } catch (error) {
      console.error('Failed to create listing:', error);
      setErrors({ submit: 'Failed to create listing. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Listing Created!</h2>
          <p className="text-neutral-600 mb-6">Your listing has been saved as a draft.</p>
          <Link
            href="/dashboard/listings"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700"
          >
            View My Listings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Create New Listing</h1>
        <p className="mt-2 text-neutral-600">Add a new product to sell.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="rounded-xl bg-white shadow-sm border border-neutral-100 p-6">
              <h2 className="text-lg font-bold text-neutral-900 mb-4">Basic Information</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-900 mb-2">
                    Title <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Pro Lens Cleaner Kit"
                    maxLength={60}
                    className={`w-full rounded-lg border px-4 py-2 text-neutral-900 placeholder-neutral-500 focus:outline-none transition-colors ${
                      errors.title
                        ? 'border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-500'
                        : 'border-neutral-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500'
                    }`}
                  />
                  <div className="flex justify-between mt-1">
                    {errors.title && <span className="text-sm text-red-600">{errors.title}</span>}
                    <span className="text-xs text-neutral-500 ml-auto">{formData.title.length}/60</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-900 mb-2">
                      Category <span className="text-red-600">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-900 mb-2">
                      Condition <span className="text-red-600">*</span>
                    </label>
                    <select
                      name="condition"
                      value={formData.condition}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    >
                      {conditions.map(cond => (
                        <option key={cond} value={cond}>{cond}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-900 mb-2">
                    Location <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, Province/State"
                    className={`w-full rounded-lg border px-4 py-2 text-neutral-900 placeholder-neutral-500 focus:outline-none transition-colors ${
                      errors.location
                        ? 'border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-500'
                        : 'border-neutral-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500'
                    }`}
                  />
                  {errors.location && <span className="text-sm text-red-600">{errors.location}</span>}
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="rounded-xl bg-white shadow-sm border border-neutral-100 p-6">
              <h2 className="text-lg font-bold text-neutral-900 mb-4">Pricing</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-900 mb-2">
                    Price <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-2 text-neutral-600 font-medium">$</span>
                    <input
                      type="number"
                      name="price"
                      value={formData.price || ''}
                      onChange={handleChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className={`w-full rounded-lg border px-4 py-2 pl-8 text-neutral-900 placeholder-neutral-500 focus:outline-none transition-colors ${
                        errors.price
                          ? 'border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-500'
                          : 'border-neutral-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500'
                      }`}
                    />
                  </div>
                  {errors.price && <span className="text-sm text-red-600">{errors.price}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-900 mb-2">
                    Original Price (Optional)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-2 text-neutral-600 font-medium">$</span>
                    <input
                      type="number"
                      name="originalPrice"
                      value={formData.originalPrice || ''}
                      onChange={handleChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="w-full rounded-lg border border-neutral-300 px-4 py-2 pl-8 text-neutral-900 placeholder-neutral-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-xl bg-white shadow-sm border border-neutral-100 p-6">
              <h2 className="text-lg font-bold text-neutral-900 mb-4">Description</h2>

              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-2">
                  Description <span className="text-red-600">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your item in detail. Include condition, features, and any issues."
                  maxLength={2000}
                  rows={6}
                  className={`w-full rounded-lg border px-4 py-2 text-neutral-900 placeholder-neutral-500 focus:outline-none transition-colors font-sans ${
                    errors.description
                      ? 'border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-500'
                      : 'border-neutral-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500'
                  }`}
                />
                <div className="flex justify-between mt-1">
                  {errors.description && <span className="text-sm text-red-600">{errors.description}</span>}
                  <span className="text-xs text-neutral-500 ml-auto">{formData.description.length}/2000</span>
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="rounded-xl bg-white shadow-sm border border-neutral-100 p-6">
              <h2 className="text-lg font-bold text-neutral-900 mb-4">Photos</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-5 gap-4">
                  {images.map((image, idx) => (
                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden bg-neutral-200 group">
                      <img src={image} alt={`Product ${idx + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}

                  {images.length < 5 && (
                    <button
                      type="button"
                      onClick={handleAddImage}
                      className="aspect-square rounded-lg border-2 border-dashed border-neutral-300 flex items-center justify-center hover:border-primary-500 hover:bg-primary-50 transition-colors"
                    >
                      <div className="text-center">
                        <Plus className="h-6 w-6 text-neutral-400 mx-auto mb-1" />
                        <span className="text-xs text-neutral-600">Add Photo</span>
                      </div>
                    </button>
                  )}
                </div>
                <p className="text-xs text-neutral-500">Add up to 5 photos. First photo is the main image.</p>
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isSaving}
                className="flex-1 rounded-lg bg-primary-600 text-white font-semibold py-3 hover:bg-primary-700 disabled:bg-neutral-400 transition-colors"
              >
                {isSaving ? 'Saving...' : 'Save as Draft'}
              </button>
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="px-6 py-3 rounded-lg border border-neutral-300 text-neutral-900 font-semibold hover:bg-neutral-50 transition-colors"
              >
                {showPreview ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
              <Link
                href="/dashboard/listings"
                className="px-6 py-3 rounded-lg border border-neutral-300 text-neutral-900 font-semibold hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>

        {/* Preview Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 rounded-xl bg-white shadow-sm border border-neutral-100 p-6">
            <h3 className="text-lg font-bold text-neutral-900 mb-4">Preview</h3>

            {formData.title ? (
              <div className="space-y-4">
                {images[0] && (
                  <img src={images[0]} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                )}

                <div>
                  <h4 className="font-semibold text-neutral-900 text-sm line-clamp-2">{formData.title}</h4>
                  <p className="text-lg font-bold text-primary-600 mt-2">{formatPrice(formData.price)}</p>
                  {formData.originalPrice && (
                    <p className="text-sm text-neutral-500 line-through">{formatPrice(parseFloat(String(formData.originalPrice)))}</p>
                  )}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Category:</span>
                    <span className="font-medium text-neutral-900">{formData.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Condition:</span>
                    <span className="font-medium text-neutral-900">{formData.condition}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Location:</span>
                    <span className="font-medium text-neutral-900">{formData.location || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Photos:</span>
                    <span className="font-medium text-neutral-900">{images.length}/5</span>
                  </div>
                </div>

                {formData.description && (
                  <div className="pt-4 border-t border-neutral-200">
                    <p className="text-xs text-neutral-600 line-clamp-4">{formData.description}</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-neutral-500 text-sm">Fill in the details to see a preview</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
