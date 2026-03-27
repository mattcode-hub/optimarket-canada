'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Search, Send, MessageSquare, ArrowLeft } from 'lucide-react';
import { useMessages } from '@/context/MessageContext';
import ConversationCard from '@/components/ConversationCard';
import MessageBubble from '@/components/MessageBubble';

export default function MessagesPage() {
  const { conversations, sendMessage, markAsRead, unreadCount, getConversation } = useMessages();
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Set first conversation as default on load
  useEffect(() => {
    if (!selectedConversationId && conversations.length > 0) {
      setSelectedConversationId(conversations[0].id);
    }
  }, [conversations]);

  // Mark as read when opening a conversation
  useEffect(() => {
    if (selectedConversationId) {
      markAsRead(selectedConversationId);
    }
  }, [selectedConversationId, markAsRead]);

  const selectedConversation = selectedConversationId
    ? getConversation(selectedConversationId)
    : null;

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.participants.some((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      conv.listingTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedConversationId) return;

    // Always send as "You" (current user)
    sendMessage(
      selectedConversationId,
      messageInput,
      'user_current',
      'You'
    );
    setMessageInput('');
  };

  const currentUserId = 'user_current';

  if (conversations.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-50">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
            <MessageSquare className="h-8 w-8 text-primary-500" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-neutral-900">
            No messages yet
          </h1>
          <p className="text-neutral-600">
            Start a conversation by contacting a seller
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-white md:flex-row">
      {/* Sidebar - Conversation List */}
      {(!isMobile || !selectedConversationId) && (
        <div className="flex w-full flex-col border-r border-neutral-200 md:w-80">
          {/* Header */}
          <div className="border-b border-neutral-200 px-4 py-4">
            <h1 className="mb-4 text-2xl font-bold text-neutral-900">Messages</h1>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 py-2 pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>

            {unreadCount > 0 && (
              <p className="mt-2 text-xs font-medium text-primary-600">
                {unreadCount} unread {unreadCount === 1 ? 'message' : 'messages'}
              </p>
            )}
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="flex items-center justify-center py-8 text-center">
                <p className="text-sm text-neutral-600">No conversations found</p>
              </div>
            ) : (
              filteredConversations.map((conversation) => (
                <ConversationCard
                  key={conversation.id}
                  conversation={conversation}
                  isActive={selectedConversationId === conversation.id}
                  onClick={() => setSelectedConversationId(conversation.id)}
                />
              ))
            )}
          </div>
        </div>
      )}

      {/* Main Chat Area */}
      {!isMobile && !selectedConversationId ? (
        <div className="hidden flex-1 items-center justify-center md:flex">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
              <MessageSquare className="h-8 w-8 text-neutral-400" />
            </div>
            <p className="text-neutral-600">Select a conversation to start messaging</p>
          </div>
        </div>
      ) : selectedConversation ? (
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <div className="flex items-center border-b border-neutral-200 bg-white px-4 py-4 md:px-6">
            {isMobile && (
              <button
                onClick={() => setSelectedConversationId(null)}
                className="mr-3 rounded-lg p-2 hover:bg-neutral-100"
              >
                <ArrowLeft className="h-5 w-5 text-neutral-600" />
              </button>
            )}
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image
                  src={selectedConversation.participants[1].avatar}
                  alt={selectedConversation.participants[1].name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="font-semibold text-neutral-900">
                  {selectedConversation.participants[1].name}
                </h2>
                <p className="text-xs text-neutral-600">
                  {selectedConversation.listingTitle}
                </p>
              </div>
            </div>
          </div>

          {/* Listing Reference Card */}
          <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-3 md:px-6">
            <div className="flex gap-3">
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={selectedConversation.listingImage}
                  alt={selectedConversation.listingTitle}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-xs text-neutral-600">Regarding</p>
                <p className="font-medium text-neutral-900 line-clamp-2">
                  {selectedConversation.listingTitle}
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 md:px-6">
            {selectedConversation.messages.length === 0 ? (
              <div className="flex items-center justify-center py-8">
                <p className="text-sm text-neutral-600">No messages yet. Start the conversation!</p>
              </div>
            ) : (
              selectedConversation.messages.map((message) => (
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
            className="border-t border-neutral-200 bg-white px-4 py-4 md:px-6"
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
      ) : null}
    </div>
  );
}
