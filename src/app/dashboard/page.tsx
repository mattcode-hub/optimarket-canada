'use client';

import {
  ShoppingBag,
  Eye,
  MessageCircle,
  Star,
  Plus,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  // Mock data
  const stats = [
    {
      label: 'Active Listings',
      value: '12',
      icon: ShoppingBag,
      color: 'bg-blue-100 text-blue-700',
    },
    {
      label: 'Total Views',
      value: '3,847',
      icon: Eye,
      color: 'bg-purple-100 text-purple-700',
    },
    {
      label: 'Total Inquiries',
      value: '24',
      icon: MessageCircle,
      color: 'bg-green-100 text-green-700',
    },
    {
      label: 'Average Rating',
      value: '4.8',
      icon: Star,
      color: 'bg-yellow-100 text-yellow-700',
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'inquiry',
      message: 'New inquiry for Lens Cleaning Solution',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'sale',
      message: 'Sold: Pro Lens Cleaner Kit',
      time: '5 hours ago',
    },
    {
      id: 3,
      type: 'review',
      message: 'New 5-star review received',
      time: '1 day ago',
    },
    {
      id: 4,
      type: 'inquiry',
      message: 'New inquiry for Eye Exam Equipment',
      time: '2 days ago',
    },
    {
      id: 5,
      type: 'sale',
      message: 'Sold: Digital Refractometer',
      time: '3 days ago',
    },
  ];

  const quickActions = [
    {
      label: 'Add New Listing',
      href: '/sell',
      icon: Plus,
      color: 'bg-secondary-600 hover:bg-secondary-700',
    },
    {
      label: 'View Messages',
      href: '/dashboard/messages',
      icon: MessageCircle,
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      label: 'Edit Profile',
      href: '/dashboard/profile',
      icon: TrendingUp,
      color: 'bg-purple-600 hover:bg-purple-700',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Dashboard</h1>
        <p className="mt-2 text-neutral-600">Welcome back! Here's your seller overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">{label}</p>
                <p className="mt-2 text-3xl font-bold text-neutral-900">{value}</p>
              </div>
              <div className={`rounded-lg p-3 ${color}`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {quickActions.map(({ label, href, icon: Icon, color }) => (
          <Link
            key={label}
            href={href}
            className={`flex items-center justify-center gap-2 rounded-lg px-6 py-4 font-semibold text-white transition-colors ${color}`}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg bg-white shadow-sm">
        <div className="border-b border-neutral-200 px-6 py-4">
          <h2 className="text-lg font-bold text-neutral-900">Recent Activity</h2>
        </div>
        <div className="divide-y divide-neutral-200">
          {recentActivity.map(({ id, type, message, time }) => (
            <div key={id} className="flex items-center justify-between px-6 py-4">
              <div>
                <p className="font-medium text-neutral-900">{message}</p>
                <p className="text-sm text-neutral-500">{time}</p>
              </div>
              <div
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  type === 'sale'
                    ? 'bg-green-100 text-green-700'
                    : type === 'review'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-blue-100 text-blue-700'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
