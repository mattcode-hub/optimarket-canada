'use client';

import { useState } from 'react';
import { Upload, CheckCircle } from 'lucide-react';

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    businessName: 'Premier Vision Solutions',
    bio: 'Professional optometry clinic offering quality equipment and supplies.',
    location: 'Moncton, NB',
    specialties: ['Eye Exam Equipment', 'Lens Solutions', 'Accessories'],
    phone: '506-123-4567',
    email: 'contact@premiervisionsolutions.com',
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSpecialtyChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.map((s, i) => (i === index ? value : s)),
    }));
  };

  const handleAddSpecialty = () => {
    setFormData((prev) => ({
      ...prev,
      specialties: [...prev.specialties, ''],
    }));
  };

  const handleRemoveSpecialty = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
    console.log('Profile saved:', formData);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Seller Profile</h1>
        <p className="mt-2 text-neutral-600">Manage your business information and settings.</p>
      </div>

      {/* Save Notification */}
      {isSaved && (
        <div className="flex items-center gap-3 rounded-lg bg-green-50 p-4 text-green-700">
          <CheckCircle className="h-5 w-5" />
          <p className="font-medium">Profile saved successfully!</p>
        </div>
      )}

      {/* Profile Form */}
      <div className="rounded-xl bg-white shadow-sm border border-neutral-100">
        {/* Profile Photo Section */}
        <div className="border-b border-neutral-200 px-6 py-6">
          <h2 className="mb-4 text-lg font-semibold text-neutral-900">Profile Photo</h2>
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <img
                src="https://picsum.photos/seed/seller-profile/120/120"
                alt="Profile"
                className="h-24 w-24 rounded-full object-cover"
              />
            </div>
            <div className="flex-1">
              <button className="flex items-center gap-2 rounded-lg border border-primary-300 px-4 py-2 font-medium text-primary-600 transition-colors hover:bg-primary-50">
                <Upload className="h-4 w-4" />
                Upload Photo
              </button>
              <p className="mt-2 text-sm text-neutral-500">JPG, PNG or GIF. Max 5MB.</p>
            </div>
          </div>
        </div>

        {/* Business Information */}
        <div className="border-b border-neutral-200 px-6 py-6">
          <h2 className="mb-4 text-lg font-semibold text-neutral-900">Business Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-900">Business Name</label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-neutral-900 placeholder-neutral-500 focus:border-primary-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-900">Bio / Description</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-neutral-900 placeholder-neutral-500 focus:border-primary-500 focus:outline-none"
              />
              <p className="mt-1 text-xs text-neutral-500">{formData.bio.length} / 500 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-900">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-neutral-900 placeholder-neutral-500 focus:border-primary-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Specialties */}
        <div className="border-b border-neutral-200 px-6 py-6">
          <h2 className="mb-4 text-lg font-semibold text-neutral-900">Specialties</h2>
          <div className="space-y-3">
            {formData.specialties.map((specialty, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={specialty}
                  onChange={(e) => handleSpecialtyChange(index, e.target.value)}
                  placeholder="Enter specialty"
                  className="flex-1 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-neutral-900 placeholder-neutral-500 focus:border-secondary-500 focus:outline-none"
                />
                <button
                  onClick={() => handleRemoveSpecialty(index)}
                  className="rounded-lg border border-red-300 px-3 py-2 text-red-600 transition-colors hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={handleAddSpecialty}
              className="rounded-lg border border-primary-300 px-4 py-2 font-medium text-primary-600 transition-colors hover:bg-primary-50"
            >
              + Add Specialty
            </button>
          </div>
        </div>

        {/* Contact Information */}
        <div className="px-6 py-6">
          <h2 className="mb-4 text-lg font-semibold text-neutral-900">Contact Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-900">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-neutral-900 placeholder-neutral-500 focus:border-primary-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-900">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-neutral-900 placeholder-neutral-500 focus:border-primary-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Verification Status */}
        <div className="border-t border-neutral-200 px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-neutral-900">Verification Status</h3>
              <p className="text-sm text-neutral-600">Your account has been verified</p>
            </div>
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Verified</span>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="border-t border-neutral-200 px-6 py-6">
          <button
            onClick={handleSave}
            className="rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
