'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { AlertCircle, Loader, CheckCircle } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
    phone: '',
    isSeller: false,
    termsAccepted: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        location: formData.location,
        phone: formData.phone || undefined,
        isSeller: formData.isSeller,
      });
      router.push('/');
    } catch (err) {
      setErrors({
        submit: err instanceof Error ? err.message : 'Signup failed',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">
              Create Account
            </h1>
            <p className="text-neutral-600">
              Join OptiMarket today
            </p>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{errors.submit}</p>
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={`w-full px-4 py-2.5 rounded-lg border transition-colors bg-neutral-50 text-neutral-900 placeholder-neutral-500 focus:outline-none ${
                  errors.name
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                    : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-100'
                } focus:ring-2`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full px-4 py-2.5 rounded-lg border transition-colors bg-neutral-50 text-neutral-900 placeholder-neutral-500 focus:outline-none ${
                  errors.email
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                    : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-100'
                } focus:ring-2`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full px-4 py-2.5 rounded-lg border transition-colors bg-neutral-50 text-neutral-900 placeholder-neutral-500 focus:outline-none ${
                  errors.password
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                    : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-100'
                } focus:ring-2`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full px-4 py-2.5 rounded-lg border transition-colors bg-neutral-50 text-neutral-900 placeholder-neutral-500 focus:outline-none ${
                  errors.confirmPassword
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                    : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-100'
                } focus:ring-2`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
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
                value={formData.location}
                onChange={handleChange}
                placeholder="City, Province"
                className={`w-full px-4 py-2.5 rounded-lg border transition-colors bg-neutral-50 text-neutral-900 placeholder-neutral-500 focus:outline-none ${
                  errors.location
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                    : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-100'
                } focus:ring-2`}
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">{errors.location}</p>
              )}
            </div>

            {/* Phone (Optional) */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                Phone (Optional)
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(555) 123-4567"
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 bg-neutral-50 text-neutral-900 placeholder-neutral-500 transition-colors focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
              />
            </div>

            {/* Seller Checkbox */}
            <div className="flex items-start gap-3 bg-primary-50 p-4 rounded-lg border border-primary-100">
              <input
                id="isSeller"
                name="isSeller"
                type="checkbox"
                checked={formData.isSeller}
                onChange={handleChange}
                className="h-4 w-4 rounded border-primary-300 text-primary-500 focus:ring-primary-500 cursor-pointer mt-0.5"
              />
              <div>
                <label htmlFor="isSeller" className="font-medium text-neutral-900 cursor-pointer block mb-1">
                  Register as Seller
                </label>
                <p className="text-xs text-neutral-600">
                  I want to list equipment and reach buyers
                </p>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3">
              <input
                id="termsAccepted"
                name="termsAccepted"
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className={`h-4 w-4 rounded cursor-pointer mt-0.5 border-neutral-300 text-primary-500 focus:ring-primary-500 ${
                  errors.termsAccepted ? 'border-red-300' : ''
                }`}
              />
              <label htmlFor="termsAccepted" className="text-sm text-neutral-700 cursor-pointer">
                I agree to the{' '}
                <Link href="#" className="text-primary-500 hover:text-primary-600 font-medium">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="#" className="text-primary-500 hover:text-primary-600 font-medium">
                  Privacy Policy
                </Link>
              </label>
              {errors.termsAccepted && (
                <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
              )}
            </div>
            {errors.termsAccepted && (
              <p className="text-sm text-red-600 -mt-3">{errors.termsAccepted}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-lg bg-primary-500 text-white font-semibold transition-all duration-200 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
            >
              {isLoading && <Loader className="h-4 w-4 animate-spin" />}
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="text-center pt-6 border-t border-neutral-200 mt-6">
            <p className="text-neutral-600 text-sm">
              Already have an account?{' '}
              <Link
                href="/auth/login"
                className="text-primary-500 font-semibold hover:text-primary-600 transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
