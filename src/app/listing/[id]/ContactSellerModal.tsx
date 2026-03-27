'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X, MessageSquare } from 'lucide-react';
import { useMessages } from '@/context/MessageContext';

interface ContactSellerModalProps {
  isOpen: boolean;
  onClose: () => void;
  sellerName: string;
  sellerAvatar?: string;
  productTitle: string;
  listingId: string;
  listingImage: string;
}

export default function ContactSellerModal({
  isOpen,
  onClose,
  sellerName,
  sellerAvatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=seller',
  productTitle,
  listingId,
  listingImage,
}: ContactSellerModalProps) {
  const { createConversation } = useMessages();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `Hi, I'm interested in your ${productTitle}...`,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create conversation with the seller
    const convId = createConversation(
      `seller_${listingId}`,
      sellerName,
      sellerAvatar,
      listingId,
      productTitle,
      listingImage,
      formData.message,
      'user_current',
      formData.name
    );

    setConversationId(convId);
    setIsSubmitted(true);

    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: `Hi, I'm interested in your ${productTitle}...`,
      });
      setConversationId(null);
    }, 2500);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-md rounded-xl bg-white shadow-xl">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-lg p-1 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header */}
          <div className="border-b border-neutral-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-neutral-900">
              Contact {sellerName}
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              Ask about {productTitle}
            </p>
          </div>

          {/* Content */}
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center px-6 py-12">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                <MessageSquare className="h-6 w-6 text-primary-600" />
              </div>
              <p className="text-center font-medium text-neutral-900">
                Message sent!
              </p>
              <p className="mt-1 text-center text-sm text-neutral-600 mb-6">
                Your message has been added to your conversations.
              </p>
              {conversationId && (
                <Link
                  href="/messages"
                  className="inline-flex items-center justify-center rounded-lg bg-primary-500 px-4 py-2 font-medium text-white transition-colors hover:bg-primary-600"
                >
                  View Conversation
                </Link>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="px-6 py-4">
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700">
                    Phone <span className="text-neutral-500">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    placeholder="(123) 456-7890"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-lg border border-neutral-300 px-4 py-2 font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-primary-600 px-4 py-2 font-medium text-white transition-colors hover:bg-primary-700 active:bg-primary-800"
                >
                  Send Message
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
