'use client';

import { useState } from 'react';
import { Bell, Lock, Eye, Trash2, CheckCircle } from 'lucide-react';

export default function SettingsPage() {
  const [isSaved, setIsSaved] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    listingAlerts: true,
    messageAlerts: true,
    reviewAlerts: true,
    twoFactorAuth: false,
    publicProfile: true,
    profileVisibility: 'public',
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleChange = (key: keyof typeof settings, value: string | boolean) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
    console.log('Settings saved:', settings);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Settings</h1>
        <p className="mt-2 text-neutral-600">Manage your preferences and account security.</p>
      </div>

      {/* Save Notification */}
      {isSaved && (
        <div className="flex items-center gap-3 rounded-lg bg-green-50 p-4 text-green-700">
          <CheckCircle className="h-5 w-5" />
          <p className="font-medium">Settings saved successfully!</p>
        </div>
      )}

      {/* Notifications Settings */}
      <div className="rounded-xl bg-white shadow-sm border border-neutral-100">
        <div className="border-b border-neutral-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-neutral-600" />
            <h2 className="text-lg font-semibold text-neutral-900">Notification Preferences</h2>
          </div>
        </div>

        <div className="divide-y divide-neutral-200">
          {[
            {
              key: 'emailNotifications',
              label: 'Email Notifications',
              description: 'Receive updates via email',
            },
            {
              key: 'smsNotifications',
              label: 'SMS Notifications',
              description: 'Receive important alerts via SMS',
            },
            {
              key: 'listingAlerts',
              label: 'Listing Alerts',
              description: 'Get notified when someone inquires about your items',
            },
            {
              key: 'messageAlerts',
              label: 'Message Alerts',
              description: 'Notifications for new buyer messages',
            },
            {
              key: 'reviewAlerts',
              label: 'Review Alerts',
              description: 'Get notified when you receive reviews',
            },
          ].map(({ key, label, description }) => (
            <div key={key} className="flex items-center justify-between px-6 py-4">
              <div>
                <p className="font-medium text-neutral-900">{label}</p>
                <p className="text-sm text-neutral-600">{description}</p>
              </div>
              <button
                onClick={() => handleToggle(key as keyof typeof settings)}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  settings[key as keyof typeof settings]
                    ? 'bg-primary-600'
                    : 'bg-neutral-300'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    settings[key as keyof typeof settings]
                      ? 'translate-x-5'
                      : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy & Visibility Settings */}
      <div className="rounded-lg bg-white shadow-sm">
        <div className="border-b border-neutral-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <Eye className="h-5 w-5 text-neutral-600" />
            <h2 className="text-lg font-semibold text-neutral-900">Privacy & Visibility</h2>
          </div>
        </div>

        <div className="divide-y divide-neutral-200">
          <div className="px-6 py-4">
            <p className="font-medium text-neutral-900">Profile Visibility</p>
            <p className="mb-3 text-sm text-neutral-600">Control who can see your seller profile</p>
            <select
              value={settings.profileVisibility}
              onChange={(e) => handleChange('profileVisibility', e.target.value)}
              className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-neutral-900 focus:border-primary-500 focus:outline-none"
            >
              <option value="public">Public - Everyone can view</option>
              <option value="buyers">Buyers Only - Only registered buyers</option>
              <option value="private">Private - Hidden from search</option>
            </select>
          </div>

          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <p className="font-medium text-neutral-900">Public Profile</p>
              <p className="text-sm text-neutral-600">Allow your profile to appear in search results</p>
            </div>
            <button
              onClick={() => handleToggle('publicProfile')}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                settings.publicProfile ? 'bg-primary-600' : 'bg-neutral-300'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  settings.publicProfile ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="rounded-lg bg-white shadow-sm">
        <div className="border-b border-neutral-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <Lock className="h-5 w-5 text-neutral-600" />
            <h2 className="text-lg font-semibold text-neutral-900">Security</h2>
          </div>
        </div>

        <div className="divide-y divide-neutral-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <p className="font-medium text-neutral-900">Two-Factor Authentication</p>
              <p className="text-sm text-neutral-600">Add an extra layer of security to your account</p>
            </div>
            <button
              onClick={() => handleToggle('twoFactorAuth')}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                settings.twoFactorAuth ? 'bg-primary-600' : 'bg-neutral-300'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  settings.twoFactorAuth ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          <div className="px-6 py-4">
            <button className="rounded-lg border border-neutral-300 px-4 py-2 font-medium text-neutral-900 transition-colors hover:bg-neutral-50">
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-lg border border-red-300 bg-red-50">
        <div className="border-b border-red-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <Trash2 className="h-5 w-5 text-red-600" />
            <h2 className="text-lg font-semibold text-red-900">Danger Zone</h2>
          </div>
        </div>

        <div className="px-6 py-4">
          <p className="mb-4 text-sm text-red-800">
            Deleting your account is permanent and cannot be undone. All your listings and reviews will be deleted.
          </p>
          <button className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-700">
            Delete Account
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
