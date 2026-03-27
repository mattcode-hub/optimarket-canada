'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Send, ArrowLeft } from 'lucide-react';
import { useMessages } from '@/context/MessageContext';
import MessageBubble from '@/components/MessageBubble';

interface ConversationPageProps {
  params: Promise<{ conversationId: string }>;
}

export default function ConversationPage({ params }: ConversationPageProps) {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const { sendMessage, markAsRead, getConversation } = useMessages();

  // Handle async params
  useEffect(() => {
    params.then((p) => setConversationId(p.conversationId));
  }, [params]);

  // Mark as read on load
  useEffect(() => {
    if (conversationId) {
      markAsRead(conversationId);
    }
  }, [conversationId, markAsRead]);

  const conversation = conversationId ? getConversation(conversationId) : null;

  if (!conversationId || !conversation) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <p className="text-neutral-600">Loading...</p>
      </div>
    );
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    sendMessage(
      conversation.id,
      messageInput,
      'user_current',
      'You'
    );
    setMessageInput('');
  };

  const currentUserId = 'user_current';
  const otherParticipant = conversation.participants[1];

  return (
    <div className="flex h-screen flex-col bg-white">
      {/* Header */}
      <div className="border-b border-neutral-200 bg-white px-4 py-4">
        <div className="flex items-center gap-3">
          <Link
            href="/messages"
            className="rounded-lg p-2 hover:bg-neutral-100"
          >
            <ArrowLeft className="h-5 w-5 text-neutral-600" />
          </Link>
          <div className="relative h-10 w-10 overflow-hidden rounded-full">
            <Image
              src={otherParticipant.avatar}
              alt={otherParticipant.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-semibold text-neutral-900">
              {otherParticipant.name}
            </h2>
            <p className="text-xs text-neutral-600">
              {conversation.listingTitle}
            </p>
          </div>
        </div>
      </div>

      {/* Listing Reference Card */}
      <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-3">
        <div className="flex gap-3">
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              src={conversation.listingImage}
              alt={conversation.listingTitle}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="text-xs text-neutral-600">Regarding</p>
            <p className="font-medium text-neutral-900 line-clamp-2">
              {conversation.listingTitle}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {conversation.messages.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-sm text-neutral-600">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          conversation.messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isOwn={message.senderId === currentUserId}
            />
          ))
        )}
      </div>

      {/* Message Input */}
      <form
        onSubmit={handleSendMessage}
        className="border-t border-neutral-200 bg-white px-4 py-4"
      >
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Type a message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            className="flex-1 rounded-lg border border-neutral-200 px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
          <button
            type="submit"
            disabled={!messageInput.trim()}
            className="flex items-center justify-center rounded-lg bg-primary-500 px-4 py-2 text-white transition-colors hover:bg-primary-600 disabled:bg-neutral-300 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
