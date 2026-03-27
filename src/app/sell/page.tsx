'use client';

import { useState } from 'react';
import { Header, Breadcrumb } from '@/components';
import { Upload, X, CheckCircle } from 'lucide-react';
import { getAllCategories } from '@/lib/data';

const CONDITIONS = ['New', 'Like New', 'Excellent', 'Good', 'Fair'];
const SHIPPING_OPTIONS = ['Free Shipping', 'Local Pickup', 'Buyer Pays Shipping'];

export default function SellPage() {
  const categories = getAllCategories();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    subcategory: '',
    brand: '',
    model: '',
    yearManufactured: new Date().getFullYear(),
    condition: 'Excellent',
    price: '',
    description: '',
    shipping: 'Buyer Pays Shipping',
    warranty: '',
    location: '',
    images: [] as File[],
  });

  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === 'category') {
      const cat = categories.find((c) => c.name === value);
      setSelectedCategory(cat);
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        subcategory: '',
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files].slice(0, 5),
    }));
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.title || !formData.category || !formData.price) {
      alert('Please fill in all required fields');
      return;
    }

    // Show success message
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        title: '',
        category: '',
        subcategory: '',
        brand: '',
        model: '',
        yearManufactured: new Date().getFullYear(),
        condition: 'Excellent',
        price: '',
        description: '',
        shipping: 'Buyer Pays Shipping',
        warranty: '',
        location: '',
        images: [],
      });
    }, 3000);

    console.log('Listing submitted:', formData);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50">
        <div className="mx-auto max-w-2xl px-4 py-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Sell', href: '#' },
            ]}
          />

          <div className="mt-8">
            <h1 className="text-3xl font-bold text-neutral-900">List an Item</h1>
            <p className="mt-2 text-neutral-600">
              Fill in the details below to create your listing.
            </p>
          </div>

          {/* Success Message */}
          {isSubmitted && (
            <div className="mt-6 flex items-center gap-3 rounded-lg bg-green-50 p-4 text-green-700">
              <CheckCircle className="h-5 w-5" />
              <div>
                <p className="font-semibold">Listing published successfully!</p>
                <p className="text-sm">Your item is now live in the marketplace.</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 rounded-lg bg-white p-6 shadow-sm">
            {/* Basic Info */}
            <div className="mb-8">
              <h2 className="mb-4 text-lg font-semibold text-neutral-900">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-900">
                    Item Title <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Be specific and descriptive"
                    className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-neutral-900 placeholder-neutral-500 focus:border-secondary-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-neutral-900">
                      Category <span className="text-red-600">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-neutral-900 focus:border-secondary-500 focus:outline-none"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-900">
                      Subcategory
                    </label>
                    <select
                      name="subcategory"
                      value={formData.subcategory}
                      onChange={handleChange}
                      disabled={!selectedCategory}
                      className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-neutral-900 focus:border-secondary-500 focus:outline-none disabled:bg-neutral-100"
                    >
                      <option value="">Select a subcategory</option>
                      {selectedCategory?.subcategories.map((sub: string) => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-neutral-900">Brand</label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      placeholder="e.g., Zeiss, Nikon"
                      className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-neutral-900 placeholder-neutral-500 focus:border-secondary-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-900">Model</label>
                    <input
                      type="text"
                      name="model"
                      value={formData.model}
                      onChange={handleChange}
                      placeholder="e.g., Pro 2000"
                      className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-neutral-900 placeholder-neutral-500 focus:border-secondary-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-neutral-900">
                      Year Manufactured
                    </label>
                    <input
                      type="number"
                      name="yearManufactured"
                      value={formData.yearManufactured}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-neutral-900 focus:border-secondary-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-900">Condition</label>
                    <select
                      name="condition"
                      value={formData.condition}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-neutral-900 focus:border-secondary-500 focus:outline-none"
                    >
                      {CONDITIONS.map((cond) => (
                        <option key={cond} value={cond}>
                          {cond}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="mb-8 border-t border-neutral-200 pt-8">
              <h2 className="mb-4 text-lg font-semibold text-neutral-900">Pricing</h2>
              <div>
                <label className="block text-sm font-medium text-neutral-900">
                  Price (CAD) <span className="text-red-600">*</span>
                </label>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-neutral-600">$</span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="flex-1 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-neutral-900 placeholder-neutral-500 focus:border-secondary-500 focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8 border-t border-neutral-200 pt-8">
              <h2 className="mb-4 text-lg font-semibold text-neutral-900">Description</h2>
              <div>
                <label className="block text-sm font-medium text-neutral-900">
                  Item Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your item in detail..."
                  rows={5}
                  className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-neutral-900 placeholder-neutral-500 focus:border-secondary-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Images */}
            <div className="mb-8 border-t border-neutral-200 pt-8">
              <h2 className="mb-4 text-lg font-semibold text-neutral-900">Photos</h2>
              <div className="rounded-lg border-2 border-dashed border-neutral-300 p-8 text-center">
                <Upload className="mx-auto h-8 w-8 text-neutral-400" />
                <p className="mt-2 font-medium text-neutral-900">
                  Drag and drop images here or click to upload
                </p>
                <p className="text-sm text-neutral-600">Max 5 images, JPG or PNG</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mt-4 hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="mt-4 inline-block">
                  <button
                    type="button"
                    className="rounded-lg bg-secondary-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-secondary-700"
                  >
                    Choose Files
                  </button>
                </label>
              </div>

              {/* Image Preview */}
              {formData.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index}`}
                        className="h-24 w-24 rounded-lg object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute right-0 top-0 -translate-y-2 translate-x-2 rounded-full bg-red-600 p-1 text-white transition-colors hover:bg-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Shipping & Warranty */}
            <div className="mb-8 border-t border-neutral-200 pt-8">
              <h2 className="mb-4 text-lg font-semibold text-neutral-900">
                Shipping & Warranty
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-900">
                    Shipping Options
                  </label>
                  <select
                    name="shipping"
                    value={formData.shipping}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-neutral-900 focus:border-secondary-500 focus:outline-none"
                  >
                    {SHIPPING_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-900">Warranty</label>
                  <input
                    type="text"
                    name="warranty"
                    value={formData.warranty}
                    onChange={handleChange}
                    placeholder="e.g., 1 year warranty included"
                    className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-neutral-900 placeholder-neutral-500 focus:border-secondary-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-900">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, Province"
                    className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-neutral-900 placeholder-neutral-500 focus:border-secondary-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-neutral-200 pt-8">
              <div className="flex gap-4">
                <button
                  type="button"
                  className="rounded-lg border border-neutral-300 px-6 py-3 font-semibold text-neutral-900 transition-colors hover:bg-neutral-50"
                >
                  Preview Listing
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-secondary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-secondary-700"
                >
                  Publish Listing
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
