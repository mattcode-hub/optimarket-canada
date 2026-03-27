'use client';

import { Header } from '@/components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  MessageSquare,
  UserCircle,
  Settings,
  ChevronLeft,
} from 'lucide-react';
import { useState } from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { href: '/dashboard/listings', label: 'My Listings', icon: ShoppingBag },
    { href: '/dashboard/messages', label: 'Messages', icon: MessageSquare },
    { href: '/dashboard/profile', label: 'Profile', icon: UserCircle },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  ];

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-neutral-50">
        {/* Sidebar */}
        <div
          className={`fixed left-0 top-16 z-40 h-[calc(100vh-64px)] w-64 bg-white shadow-md border-r border-neutral-200 transition-transform duration-300 lg:relative lg:top-0 lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-6">
            <h2 className="mb-6 text-sm font-semibold uppercase tracking-wide text-neutral-500">
              Dashboard
            </h2>
            <nav className="space-y-2">
              {navItems.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 font-medium transition-all ${
                    isActive(href)
                      ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-600'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Mobile Sidebar Toggle */}
          <div className="flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-4 lg:hidden">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Marketplace
            </Link>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg border border-neutral-300 p-2 hover:bg-neutral-50"
            >
              <LayoutDashboard className="h-5 w-5" />
            </button>
          </div>

          {/* Desktop Back Button */}
          <div className="hidden border-b border-neutral-200 bg-white px-6 py-4 lg:block">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Marketplace
            </Link>
          </div>

          {/* Page Content */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
