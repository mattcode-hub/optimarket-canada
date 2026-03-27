'use client';

import { Check, CheckCheck } from 'lucide-react';
import { Message } from '@/context/MessageContext';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

export default function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  const timestamp = new Date(message.timestamp);
  const formattedTime = timestamp.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-xs rounded-lg px-4 py-3 ${
          isOwn
            ? 'bg-primary-500 text-white'
            : 'bg-neutral-100 text-neutral-900'
        }`}
      >
        <p className="text-sm break-words">{message.content}</p>
        <div
          className={`mt-1 flex items-center justify-end gap-1 text-xs ${
            isOwn ? 'text-primary-100' : 'text-neutral-500'
          }`}
        >
          <span>{formattedTime}</span>
          {isOwn && (
            message.read ? (
              <CheckCheck className="h-3 w-3" />
            ) : (
              <Check className="h-3 w-3" />
            )
          )}
        </div>
      </div>
    </div>
  );
}
