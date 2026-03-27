'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, User, ShoppingBag, Menu, X, Search, LogOut, Settings, Store, MessageSquare } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { useMessages } from '@/context/MessageContext';

export default function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const { unreadCount } = useMessages();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Browse Equipment', href: '/browse' },
    { label: 'Categories', href: '/categories' },
    { label: 'Sell Equipment', href: '/sell' },
    { label: 'About', href: '/about' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-shadow duration-300 ${
        isScrolled ? 'shadow-md' : 'shadow-sm'
      } bg-white`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500">
              <svg
                className="h-6 w-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-heading text-xl font-bold text-primary-500">
                OptiMarket
              </h1>
              <p className="text-xs text-neutral-600">Canada</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-neutral-700 transition-colors hover:text-primary-500"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar (Desktop) */}
          <div className="hidden lg:flex flex-1 mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search equipment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 bg-neutral-50 px-4 py-2 text-sm placeholder-neutral-500 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-3 sm:gap-4 relative">
            {/* Messages */}
            <Link
              href="/messages"
              className="relative rounded-lg p-2 text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-primary-500"
              aria-label="Messages"
            >
              <MessageSquare className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-error text-xs font-bold text-white flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative rounded-lg p-2 text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-primary-500"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-secondary-500 text-xs font-bold text-white flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Saved Items */}
            <Link
              href="/saved"
              className="relative rounded-lg p-2 text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-primary-500"
              aria-label="Saved Items"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-error text-xs font-bold text-white flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Auth Section */}
            {!isLoading && (
              <>
                {isAuthenticated && user ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center gap-2 rounded-lg p-2 text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-primary-500 md:gap-3"
                      aria-label="Account menu"
                    >
                      <div className="h-6 w-6 rounded-full bg-primary-500 text-white text-xs font-bold flex items-center justify-center hidden sm:flex">
                        {user.avatar}
                      </div>
                      <User className="h-5 w-5 sm:hidden" />
                      <span className="hidden sm:inline text-sm font-medium text-neutral-700">{user.name.split(' ')[0]}</span>
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden z-50">
                        <div className="p-4 border-b border-neutral-200 bg-neutral-50">
                          <p className="font-semibold text-neutral-900">{user.name}</p>
                          <p className="text-xs text-neutral-600">{user.email}</p>
                          {user.isSeller && (
                            <div className="flex items-center gap-1 mt-2">
                              <Store className="h-3 w-3 text-primary-500" />
                              <span className="text-xs font-medium text-primary-500">Verified Seller</span>
                            </div>
                          )}
                        </div>

                        <nav className="py-2">
                          <Link
                            href="/auth/profile"
                            className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <User className="h-4 w-4" />
                            My Profile
                          </Link>
                          <Link
                            href="/messages"
                            className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <MessageSquare className="h-4 w-4" />
                            Messages
                            {unreadCount > 0 && (
                              <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-error text-xs font-bold text-white">
                                {unreadCount}
                              </span>
                            )}
                          </Link>
                          <Link
                            href="/wishlist"
                            className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <Heart className="h-4 w-4" />
                            My Wishlist
                          </Link>
                          {user.isSeller && (
                            <Link
                              href="/dashboard"
                              className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                              onClick={() => setIsDropdownOpen(false)}
                            >
                              <Store className="h-4 w-4" />
                              Seller Dashboard
                            </Link>
                          )}
                          <button
                            onClick={() => {
                              logout();
                              setIsDropdownOpen(false);
                              router.push('/');
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-neutral-200"
                          >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                          </button>
                        </nav>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Link
                      href="/auth/login"
                      className="hidden sm:block px-4 py-2 rounded-lg text-sm font-medium text-primary-500 hover:bg-primary-50 transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="px-4 py-2 rounded-lg bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden rounded-lg p-2 text-neutral-700 transition-colors hover:bg-neutral-100"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-neutral-200 py-4">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:text-primary-500 hover:bg-neutral-50 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Auth Section */}
            {!isLoading && (
              <>
                {isAuthenticated && user ? (
                  <>
                    <div className="mt-4 px-4 py-4 border-t border-neutral-200">
                      <div className="mb-4">
                        <p className="font-semibold text-neutral-900">{user.name}</p>
                        <p className="text-xs text-neutral-600">{user.email}</p>
                      </div>
                      <nav className="flex flex-col gap-2">
                        <Link
                          href="/auth/profile"
                          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <User className="h-4 w-4" />
                          My Profile
                        </Link>
                        <Link
                          href="/messages"
                          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <MessageSquare className="h-4 w-4" />
                          Messages
                          {unreadCount > 0 && (
                            <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-error text-xs font-bold text-white">
                              {unreadCount}
                            </span>
                          )}
                        </Link>
                        {user.isSeller && (
                          <Link
                            href="/dashboard"
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            <Store className="h-4 w-4" />
                            Seller Dashboard
                          </Link>
                        )}
                        <button
                          onClick={() => {
                            logout();
                            setIsOpen(false);
                            router.push('/');
                          }}
                          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
                        >
                          <LogOut className="h-4 w-4" />
                          Sign Out
                        </button>
                      </nav>
                    </div>
                  </>
                ) : (
                  <div className="mt-4 px-4 py-4 border-t border-neutral-200 flex flex-col gap-3">
                    <Link
                      href="/auth/login"
                      className="w-full px-4 py-2 rounded-lg text-sm font-medium text-primary-500 border border-primary-500 text-center hover:bg-primary-50 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="w-full px-4 py-2 rounded-lg text-sm font-medium text-white bg-primary-500 text-center hover:bg-primary-600 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </>
            )}

            {/* Mobile Search */}
            <div className="mt-4 px-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search equipment..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 bg-neutral-50 px-4 py-2 text-sm placeholder-neutral-500 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                />
                <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
