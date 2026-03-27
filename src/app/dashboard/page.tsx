'use client';

import {
  ShoppingBag,
  Eye,
  MessageCircle,
  Star,
  Plus,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Listing {
  id: string;
  title: string;
  views: number;
  date: string;
}

interface ActivityItem {
  id: string;
  type: 'inquiry' | 'sale' | 'review' | 'view';
  message: string;
  time: string;
}

export default function DashboardPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [stats, setStats] = useState({
    activeListings: 12,
    totalViews: 3847,
    totalInquiries: 24,
    averageRating: 4.8,
  });
  const [viewsData, setViewsData] = useState<number[]>([]);

  useEffect(() => {
    const storedListings = localStorage.getItem('sellerListings');
    if (storedListings) {
      try {
        const parsed = JSON.parse(storedListings);
        setListings(parsed.filter((l: any) => l.status === 'active'));

        const activeCount = parsed.filter((l: any) => l.status === 'active').length;
        const totalViewsCount = parsed.reduce((sum: number, l: any) => sum + (l.views || 0), 0);

        setStats(prev => ({
          ...prev,
          activeListings: activeCount,
          totalViews: totalViewsCount,
        }));
      } catch (e) {
        console.error('Failed to load listings');
      }
    }

    setViewsData([120, 245, 180, 320, 410, 560, 480, 530, 640, 720, 680, 750]);
  }, []);

  const recentActivity: ActivityItem[] = [
    {
      id: '1',
      type: 'inquiry',
      message: 'New inquiry for Lens Cleaning Solution',
      time: '2 hours ago',
    },
    {
      id: '2',
      type: 'sale',
      message: 'Sold: Pro Lens Cleaner Kit',
      time: '5 hours ago',
    },
    {
      id: '3',
      type: 'review',
      message: 'New 5-star review received',
      time: '1 day ago',
    },
    {
      id: '4',
      type: 'inquiry',
      message: 'New inquiry for Eye Exam Equipment',
      time: '2 days ago',
    },
    {
      id: '5',
      type: 'sale',
      message: 'Sold: Digital Refractometer',
      time: '3 days ago',
    },
  ];

  const quickActions = [
    {
      label: 'Add New Listing',
      href: '/dashboard/listings/new',
      icon: Plus,
      color: 'bg-primary-600 hover:bg-primary-700',
    },
    {
      label: 'View Messages',
      href: '/dashboard/messages',
      icon: MessageCircle,
      color: 'bg-accent-600 hover:bg-accent-700',
    },
    {
      label: 'Edit Profile',
      href: '/dashboard/profile',
      icon: TrendingUp,
      color: 'bg-secondary-600 hover:bg-secondary-700',
    },
  ];

  const maxViews = Math.max(...viewsData, 1);
  const scaleFactor = 100 / maxViews;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Dashboard</h1>
        <p className="mt-2 text-neutral-600">Welcome back! Here's your seller overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: 'Active Listings',
            value: stats.activeListings.toString(),
            icon: ShoppingBag,
            color: 'bg-primary-50 text-primary-600',
            trend: '+2 this week',
          },
          {
            label: 'Total Views',
            value: stats.totalViews.toLocaleString(),
            icon: Eye,
            color: 'bg-accent-50 text-accent-600',
            trend: '+12%',
          },
          {
            label: 'Messages',
            value: stats.totalInquiries.toString(),
            icon: MessageCircle,
            color: 'bg-secondary-50 text-secondary-600',
            trend: '+5',
          },
          {
            label: 'Avg Rating',
            value: stats.averageRating.toFixed(1),
            icon: Star,
            color: 'bg-yellow-50 text-yellow-600',
            trend: 'Excellent',
          },
        ].map(({ label, value, icon: Icon, color, trend }) => (
          <div key={label} className="rounded-xl bg-white p-6 shadow-sm border border-neutral-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">{label}</p>
                <p className="mt-2 text-3xl font-bold text-neutral-900">{value}</p>
                <p className="mt-1 text-xs text-neutral-500">{trend}</p>
              </div>
              <div className={`rounded-xl p-3 ${color}`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Performance */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Views Chart */}
        <div className="lg:col-span-2 rounded-xl bg-white shadow-sm border border-neutral-100 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-neutral-900">Views Over Time</h2>
            <p className="mt-1 text-sm text-neutral-600">Last 12 months performance</p>
          </div>
          <div className="flex items-end justify-between gap-2 h-48">
            {viewsData.map((views, idx) => (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="relative w-full flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-primary-600 to-primary-400 rounded-t transition-all hover:from-primary-700 hover:to-primary-500"
                    style={{ height: `${views * scaleFactor}px` }}
                  />
                  <span className="text-xs text-neutral-500 mt-2 group-hover:text-neutral-900 transition-colors font-medium">
                    {views}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="rounded-xl bg-white shadow-sm border border-neutral-100 p-6">
          <h2 className="text-lg font-bold text-neutral-900 mb-6">Performance</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">Conversion Rate</span>
              <div className="flex items-center gap-1 text-green-600">
                <ArrowUpRight className="h-4 w-4" />
                <span className="text-sm font-semibold">3.2%</span>
              </div>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full w-1/3" />
            </div>

            <div className="flex items-center justify-between pt-4">
              <span className="text-sm text-neutral-600">Click-through Rate</span>
              <div className="flex items-center gap-1 text-green-600">
                <ArrowUpRight className="h-4 w-4" />
                <span className="text-sm font-semibold">8.7%</span>
              </div>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full w-2/3" />
            </div>

            <div className="flex items-center justify-between pt-4">
              <span className="text-sm text-neutral-600">Bounce Rate</span>
              <div className="flex items-center gap-1 text-red-600">
                <ArrowDownRight className="h-4 w-4" />
                <span className="text-sm font-semibold">24%</span>
              </div>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full w-1/4" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {quickActions.map(({ label, href, icon: Icon, color }) => (
          <Link
            key={label}
            href={href}
            className={`flex items-center justify-center gap-2 rounded-xl px-6 py-4 font-semibold text-white transition-all hover:shadow-lg ${color}`}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl bg-white shadow-sm border border-neutral-100">
        <div className="border-b border-neutral-200 px-6 py-4">
          <h2 className="text-lg font-bold text-neutral-900">Recent Activity</h2>
        </div>
        <div className="divide-y divide-neutral-200">
          {recentActivity.length > 0 ? (
            recentActivity.map(({ id, type, message, time }) => (
              <div key={id} className="flex items-center justify-between px-6 py-4 hover:bg-neutral-50 transition-colors">
                <div>
                  <p className="font-medium text-neutral-900">{message}</p>
                  <p className="text-sm text-neutral-500">{time}</p>
                </div>
                <div
                  className={`rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap ml-4 ${
                    type === 'sale'
                      ? 'bg-green-100 text-green-700'
                      : type === 'review'
                        ? 'bg-yellow-100 text-yellow-700'
                        : type === 'view'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-primary-100 text-primary-700'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-8 text-center text-neutral-500">
              <p>No recent activity yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
