'use client';

import Image from 'next/image';
import { Conversation } from '@/context/MessageContext';

interface ConversationCardProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}

export default function ConversationCard({
  conversation,
  isActive,
  onClick,
}: ConversationCardProps) {
  const otherParticipant = conversation.participants[1];
  const lastMessage = conversation.lastMessage;
  const timestamp = lastMessage ? new Date(lastMessage.timestamp) : new Date();

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      return days[date.getDay()];
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const getMessagePreview = () => {
    if (!lastMessage) return 'No messages';
    const content = lastMessage.content;
    return content.length > 40 ? content.substring(0, 40) + '...' : content;
  };

  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-3 text-left transition-colors border-b border-neutral-200 hover:bg-neutral-50 ${
        isActive ? 'bg-primary-50' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
          <Image
            src={otherParticipant.avatar}
            alt={otherParticipant.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="font-medium text-neutral-900 truncate">
              {otherParticipant.name}
            </h3>
            <span className="text-xs text-neutral-500 flex-shrink-0">
              {formatTime(timestamp)}
            </span>
          </div>
          <p className="text-xs text-neutral-600 mb-1 truncate">
            {conversation.listingTitle}
          </p>
          <p
            className={`text-sm truncate ${
              conversation.unreadCount > 0
                ? 'font-semibold text-neutral-900'
                : 'text-neutral-600'
            }`}
          >
            {getMessagePreview()}
          </p>
        </div>

        {/* Unread Badge */}
        {conversation.unreadCount > 0 && (
          <div className="flex-shrink-0">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-500">
              <span className="text-xs font-semibold text-white">
                {conversation.unreadCount}
              </span>
            </div>
          </div>
        )}
      </div>
    </button>
  );
}
