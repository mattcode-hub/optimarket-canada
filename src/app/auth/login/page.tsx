'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { AlertCircle, Loader } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail: string) => {
    setError('');
    setIsLoading(true);

    try {
      await login(demoEmail, 'password123');
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
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
              Welcome Back
            </h1>
            <p className="text-neutral-600">
              Sign in to your OptiMarket account
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
                required
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 bg-neutral-50 text-neutral-900 placeholder-neutral-500 transition-colors focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
              />
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
                required
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 bg-neutral-50 text-neutral-900 placeholder-neutral-500 transition-colors focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 rounded border-neutral-300 text-primary-500 focus:ring-primary-500 cursor-pointer"
              />
              <label htmlFor="rememberMe" className="text-sm text-neutral-700 cursor-pointer">
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-lg bg-primary-500 text-white font-semibold transition-all duration-200 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading && <Loader className="h-4 w-4 animate-spin" />}
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-3">
            <div className="flex-1 h-px bg-neutral-300" />
            <span className="text-sm text-neutral-600">Demo Accounts</span>
            <div className="flex-1 h-px bg-neutral-300" />
          </div>

          {/* Demo Account Buttons */}
          <div className="space-y-3 mb-8">
            <button
              type="button"
              onClick={() => handleDemoLogin('buyer@example.com')}
              disabled={isLoading}
              className="w-full py-2 px-4 rounded-lg border-2 border-primary-500 text-primary-500 font-medium transition-all duration-200 hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Demo Buyer
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('seller@example.com')}
              disabled={isLoading}
              className="w-full py-2 px-4 rounded-lg border-2 border-secondary-500 text-secondary-600 font-medium transition-all duration-200 hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Demo Seller
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('admin@example.com')}
              disabled={isLoading}
              className="w-full py-2 px-4 rounded-lg border-2 border-accent-500 text-accent-600 font-medium transition-all duration-200 hover:bg-accent-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Demo Admin
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center pt-6 border-t border-neutral-200">
            <p className="text-neutral-600 text-sm">
              Don't have an account?{' '}
              <Link
                href="/auth/signup"
                className="text-primary-500 font-semibold hover:text-primary-600 transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-neutral-600 mt-6">
          Demo accounts use password: <code className="bg-neutral-100 px-2 py-1 rounded">password123</code>
        </p>
      </div>
    </div>
  );
}
