'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Edit2, Save, X, LogOut, MapPin, Phone, Calendar, Store, Loader } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: isAuthLoading, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    phone: '',
    location: '',
    bio: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, isAuthLoading, router]);

  // Initialize edit data
  useEffect(() => {
    if (user) {
      setEditData({
        name: user.name,
        phone: user.phone,
        location: user.location,
        bio: user.bio,
      });
    }
  }, [user]);

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-8 w-8 animate-spin text-primary-500 mx-auto mb-4" />
          <p className="text-neutral-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      await updateProfile(editData);
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-primary-500 hover:text-primary-600 text-sm font-medium mb-2 inline-block">
                ← Back to Home
              </Link>
              <h1 className="text-3xl font-bold text-neutral-900">My Account</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-lg shadow-lg">
          {successMessage}
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8">
          {/* Banner */}
          <div className="h-32 bg-gradient-to-r from-primary-500 to-accent-500" />

          {/* Content */}
          <div className="relative px-6 sm:px-8 pb-8">
            {/* Avatar and Header */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-16 mb-8">
              <div className="flex-shrink-0">
                <div className="h-32 w-32 rounded-2xl bg-primary-500 text-white text-4xl font-bold flex items-center justify-center shadow-lg border-4 border-white">
                  {user.avatar}
                </div>
              </div>
              <div className="flex-1 pb-2">
                <h2 className="text-2xl font-bold text-neutral-900">{user.name}</h2>
                <p className="text-neutral-600">{user.email}</p>
                {user.isSeller && (
                  <div className="flex items-center gap-2 mt-2">
                    <Store className="h-4 w-4 text-primary-500" />
                    <span className="text-sm font-medium text-primary-500">Verified Seller</span>
                  </div>
                )}
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors"
                >
                  <Edit2 className="h-4 w-4" />
                  Edit Profile
                </button>
              )}
            </div>

            {/* Info Grid */}
            {!isEditing && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8 border-t border-neutral-200">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-primary-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-neutral-600 font-medium mb-1">Location</p>
                    <p className="text-neutral-900">{user.location}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 text-primary-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-neutral-600 font-medium mb-1">Phone</p>
                    <p className="text-neutral-900">{user.phone || 'Not provided'}</p>
                  </div>
                </div>

                {/* Member Since */}
                <div className="flex items-start gap-4">
                  <Calendar className="h-5 w-5 text-primary-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-neutral-600 font-medium mb-1">Member Since</p>
                    <p className="text-neutral-900">
                      {new Date(user.memberSince).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                {user.bio && (
                  <div className="flex items-start gap-4">
                    <div>
                      <p className="text-sm text-neutral-600 font-medium mb-1">Bio</p>
                      <p className="text-neutral-900">{user.bio}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Edit Form */}
            {isEditing && (
              <form onSubmit={(e) => { e.preventDefault(); handleSaveProfile(); }} className="py-8 border-t border-neutral-200 space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={editData.name}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 bg-neutral-50 text-neutral-900 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={editData.phone}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 bg-neutral-50 text-neutral-900 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                  />
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-neutral-700 mb-2">
                    Location
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={editData.location}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 bg-neutral-50 text-neutral-900 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-neutral-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={editData.bio}
                    onChange={handleEditChange}
                    rows={4}
                    placeholder="Tell us about yourself..."
                    className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 bg-neutral-50 text-neutral-900 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary-500 text-white font-medium hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSaving && <Loader className="h-4 w-4 animate-spin" />}
                    <Save className="h-4 w-4" />
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setEditData({
                        name: user.name,
                        phone: user.phone,
                        location: user.location,
                        bio: user.bio,
                      });
                    }}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-neutral-300 bg-white text-neutral-700 font-medium hover:bg-neutral-50 transition-colors"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Account Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Orders & Inquiries */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h3 className="text-lg font-bold text-neutral-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:border-primary-200 hover:bg-primary-50 transition-colors">
                <div>
                  <p className="font-medium text-neutral-900">Inquiry sent to seller</p>
                  <p className="text-sm text-neutral-600">2 days ago</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-medium">Pending</span>
              </div>
              <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:border-primary-200 hover:bg-primary-50 transition-colors">
                <div>
                  <p className="font-medium text-neutral-900">Added to Wishlist</p>
                  <p className="text-sm text-neutral-600">5 days ago</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-secondary-100 text-secondary-700 text-xs font-medium">Saved</span>
              </div>
              <div className="text-center py-6 text-neutral-600">
                <p className="text-sm">No more activity</p>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h3 className="text-lg font-bold text-neutral-900 mb-4">Account Settings</h3>
            <div className="space-y-3">
              <Link href="#" className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:border-primary-200 hover:bg-primary-50 transition-colors group">
                <span className="font-medium text-neutral-700 group-hover:text-primary-600">Change Password</span>
                <span className="text-neutral-400 group-hover:text-primary-500">→</span>
              </Link>
              <Link href="#" className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:border-primary-200 hover:bg-primary-50 transition-colors group">
                <span className="font-medium text-neutral-700 group-hover:text-primary-600">Email Preferences</span>
                <span className="text-neutral-400 group-hover:text-primary-500">→</span>
              </Link>
              <Link href="#" className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:border-primary-200 hover:bg-primary-50 transition-colors group">
                <span className="font-medium text-neutral-700 group-hover:text-primary-600">Privacy Settings</span>
                <span className="text-neutral-400 group-hover:text-primary-500">→</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-between p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors group mt-6"
              >
                <span className="font-medium text-red-600 flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Seller Dashboard Link */}
        {user.isSeller && (
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl shadow-md p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Seller Dashboard</h3>
                <p className="text-white/90">Manage your listings, messages, and sales</p>
              </div>
              <Link
                href="/dashboard"
                className="px-6 py-3 rounded-lg bg-white text-primary-600 font-semibold hover:bg-primary-50 transition-colors"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
