'use client';

import { useState } from 'react';
import { MessageCircle, Search } from 'lucide-react';
import { formatDate, timeAgo } from '@/lib/utils';

export default function MessagesPage() {
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock message threads
  const messageThreads = [
    {
      id: '1',
      buyerName: 'Sarah Thompson',
      buyerAvatar: 'https://picsum.photos/seed/buyer-1/50/50',
      listingTitle: 'Pro Lens Cleaner Kit',
      lastMessage: 'Is this still available? Can you ship to Toronto?',
      lastMessageTime: '2026-03-27T14:30:00',
      unread: true,
      messages: [
        {
          id: '1-1',
          sender: 'buyer',
          text: 'Hi, is this still available?',
          timestamp: '2026-03-27T10:00:00',
        },
        {
          id: '1-2',
          sender: 'seller',
          text: 'Yes, still available! Happy to help.',
          timestamp: '2026-03-27T10:15:00',
        },
        {
          id: '1-3',
          sender: 'buyer',
          text: 'Is this still available? Can you ship to Toronto?',
          timestamp: '2026-03-27T14:30:00',
        },
      ],
    },
    {
      id: '2',
      buyerName: 'John Martinez',
      buyerAvatar: 'https://picsum.photos/seed/buyer-2/50/50',
      listingTitle: 'Digital Refractometer',
      lastMessage: 'Great! When can you ship it?',
      lastMessageTime: '2026-03-26T16:45:00',
      unread: false,
      messages: [
        {
          id: '2-1',
          sender: 'buyer',
          text: 'How much for bulk order?',
          timestamp: '2026-03-26T10:00:00',
        },
        {
          id: '2-2',
          sender: 'seller',
          text: 'We offer 10% discount for orders over $5000.',
          timestamp: '2026-03-26T10:30:00',
        },
        {
          id: '2-3',
          sender: 'buyer',
          text: 'Great! When can you ship it?',
          timestamp: '2026-03-26T16:45:00',
        },
      ],
    },
    {
      id: '3',
      buyerName: 'Emily Chen',
      buyerAvatar: 'https://picsum.photos/seed/buyer-3/50/50',
      listingTitle: 'Professional Lens Polisher',
      lastMessage: 'Perfect, thanks!',
      lastMessageTime: '2026-03-25T09:20:00',
      unread: false,
      messages: [
        {
          id: '3-1',
          sender: 'buyer',
          text: 'What warranty do you offer?',
          timestamp: '2026-03-25T08:00:00',
        },
        {
          id: '3-2',
          sender: 'seller',
          text: '1 year warranty included.',
          timestamp: '2026-03-25T08:15:00',
        },
        {
          id: '3-3',
          sender: 'buyer',
          text: 'Perfect, thanks!',
          timestamp: '2026-03-25T09:20:00',
        },
      ],
    },
    {
      id: '4',
      buyerName: 'Michael Wong',
      buyerAvatar: 'https://picsum.photos/seed/buyer-4/50/50',
      listingTitle: 'Vintage Eye Exam Equipment',
      lastMessage: 'Can we arrange a viewing?',
      lastMessageTime: '2026-03-24T15:00:00',
      unread: false,
      messages: [
        {
          id: '4-1',
          sender: 'buyer',
          text: 'Can we arrange a viewing?',
          timestamp: '2026-03-24T15:00:00',
        },
      ],
    },
  ];

  const filteredThreads = messageThreads.filter((thread) =>
    thread.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    thread.listingTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedThreadData = messageThreads.find((t) => t.id === selectedThread);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Messages</h1>
        <p className="mt-2 text-neutral-600">Manage your conversations with buyers.</p>
      </div>

      {/* Main Messages Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 h-[calc(100vh-250px)]">
        {/* Thread List */}
        <div className="lg:col-span-1">
          <div className="rounded-xl bg-white shadow-sm border border-neutral-100 flex flex-col h-full">
            {/* Search */}
            <div className="border-b border-neutral-200 p-4 flex-shrink-0">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 bg-white py-2 pl-10 pr-4 text-sm placeholder-neutral-500 focus:border-primary-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Thread List */}
            <div className="divide-y divide-neutral-200 overflow-y-auto flex-1">
              {filteredThreads.map((thread) => (
                <button
                  key={thread.id}
                  onClick={() => setSelectedThread(thread.id)}
                  className={`w-full px-4 py-4 text-left transition-colors ${
                    selectedThread === thread.id
                      ? 'bg-primary-50 border-l-4 border-primary-600'
                      : 'hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <img
                        src={thread.buyerAvatar}
                        alt={thread.buyerName}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      {thread.unread && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-primary-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p
                          className={`font-semibold ${
                            thread.unread ? 'text-neutral-900' : 'text-neutral-700'
                          }`}
                        >
                          {thread.buyerName}
                        </p>
                        <p className="text-xs text-neutral-500">
                          {timeAgo(thread.lastMessageTime)}
                        </p>
                      </div>
                      <p className="text-xs text-neutral-500">{thread.listingTitle}</p>
                      <p
                        className={`mt-1 truncate text-sm ${
                          thread.unread ? 'font-semibold text-neutral-900' : 'text-neutral-600'
                        }`}
                      >
                        {thread.lastMessage}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Message Conversation */}
        <div className="lg:col-span-2">
          {selectedThreadData ? (
            <div className="flex flex-col rounded-xl bg-white shadow-sm border border-neutral-100 h-full">
              {/* Conversation Header */}
              <div className="border-b border-neutral-200 px-6 py-4">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedThreadData.buyerAvatar}
                    alt={selectedThreadData.buyerName}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-neutral-900">
                      {selectedThreadData.buyerName}
                    </p>
                    <p className="text-sm text-neutral-600">{selectedThreadData.listingTitle}</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 space-y-4 overflow-y-auto p-6">
                {selectedThreadData.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'seller' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs rounded-lg px-4 py-2 ${
                        msg.sender === 'seller'
                          ? 'bg-primary-600 text-white'
                          : 'bg-neutral-100 text-neutral-900'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p
                        className={`mt-1 text-xs ${
                          msg.sender === 'seller'
                            ? 'text-primary-100'
                            : 'text-neutral-500'
                        }`}
                      >
                        {formatDate(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="border-t border-neutral-200 p-6 flex-shrink-0">
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm placeholder-neutral-500 focus:border-primary-500 focus:outline-none"
                  />
                  <button className="rounded-lg bg-primary-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-primary-700">
                    Send
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl bg-white shadow-sm border border-neutral-100 h-full">
              <MessageCircle className="h-12 w-12 text-neutral-300" />
              <p className="mt-4 text-neutral-600">Select a conversation to view messages</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
