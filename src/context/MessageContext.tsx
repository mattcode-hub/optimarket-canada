'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  recipientName: string;
  listingId: string;
  listingTitle: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: {
    id: string;
    name: string;
    avatar: string;
  }[];
  listingId: string;
  listingTitle: string;
  listingImage: string;
  messages: Message[];
  lastMessage: Message | null;
  unreadCount: number;
}

interface MessageContextType {
  conversations: Conversation[];
  sendMessage: (conversationId: string, content: string, senderId: string, senderName: string) => void;
  getConversation: (conversationId: string) => Conversation | undefined;
  markAsRead: (conversationId: string) => void;
  unreadCount: number;
  createConversation: (
    otherUserId: string,
    otherUserName: string,
    otherUserAvatar: string,
    listingId: string,
    listingTitle: string,
    listingImage: string,
    initialMessage: string,
    currentUserId: string,
    currentUserName: string
  ) => string;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

const DEMO_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv_1',
    participants: [
      { id: 'user_1', name: 'Dr. Sarah Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah' },
      { id: 'user_current', name: 'You', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=you' },
    ],
    listingId: 'listing_1',
    listingTitle: 'Zeiss Humphrey Visual Field Analyzer HFA 3',
    listingImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop',
    messages: [
      {
        id: 'msg_1',
        senderId: 'user_1',
        senderName: 'Dr. Sarah Chen',
        recipientId: 'user_current',
        recipientName: 'You',
        listingId: 'listing_1',
        listingTitle: 'Zeiss Humphrey Visual Field Analyzer HFA 3',
        content: 'Hi! Is this unit still available? We are interested in purchasing it for our clinic.',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        read: true,
      },
      {
        id: 'msg_2',
        senderId: 'user_current',
        senderName: 'You',
        recipientId: 'user_1',
        recipientName: 'Dr. Sarah Chen',
        listingId: 'listing_1',
        listingTitle: 'Zeiss Humphrey Visual Field Analyzer HFA 3',
        content: 'Yes, it is! The unit is in excellent condition and has been recently serviced. All calibration records are available.',
        timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000).toISOString(),
        read: true,
      },
      {
        id: 'msg_3',
        senderId: 'user_1',
        senderName: 'Dr. Sarah Chen',
        recipientId: 'user_current',
        recipientName: 'You',
        listingId: 'listing_1',
        listingTitle: 'Zeiss Humphrey Visual Field Analyzer HFA 3',
        content: 'Perfect! Can you provide the maintenance history? Also, what would be the shipping cost to Toronto?',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        read: true,
      },
    ],
    lastMessage: {
      id: 'msg_3',
      senderId: 'user_1',
      senderName: 'Dr. Sarah Chen',
      recipientId: 'user_current',
      recipientName: 'You',
      listingId: 'listing_1',
      listingTitle: 'Zeiss Humphrey Visual Field Analyzer HFA 3',
      content: 'Perfect! Can you provide the maintenance history? Also, what would be the shipping cost to Toronto?',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
    unreadCount: 0,
  },
  {
    id: 'conv_2',
    participants: [
      { id: 'user_2', name: 'Dr. James Mitchell', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james' },
      { id: 'user_current', name: 'You', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=you' },
    ],
    listingId: 'listing_2',
    listingTitle: 'Topcon Refractometer RK-F1',
    listingImage: 'https://images.unsplash.com/photo-1578496322202-50377b4631da?w=400&h=300&fit=crop',
    messages: [
      {
        id: 'msg_4',
        senderId: 'user_current',
        senderName: 'You',
        recipientId: 'user_2',
        recipientName: 'Dr. James Mitchell',
        listingId: 'listing_2',
        listingTitle: 'Topcon Refractometer RK-F1',
        content: 'Hi Dr. Mitchell, is the refractometer still available?',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        read: true,
      },
      {
        id: 'msg_5',
        senderId: 'user_2',
        senderName: 'Dr. James Mitchell',
        recipientId: 'user_current',
        recipientName: 'You',
        listingId: 'listing_2',
        listingTitle: 'Topcon Refractometer RK-F1',
        content: 'Yes, it is available! This unit is barely used and comes with all original accessories.',
        timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(),
        read: true,
      },
    ],
    lastMessage: {
      id: 'msg_5',
      senderId: 'user_2',
      senderName: 'Dr. James Mitchell',
      recipientId: 'user_current',
      recipientName: 'You',
      listingId: 'listing_2',
      listingTitle: 'Topcon Refractometer RK-F1',
      content: 'Yes, it is available! This unit is barely used and comes with all original accessories.',
      timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
    unreadCount: 0,
  },
  {
    id: 'conv_3',
    participants: [
      { id: 'user_3', name: 'Optical Solutions Inc.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=optical' },
      { id: 'user_current', name: 'You', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=you' },
    ],
    listingId: 'listing_3',
    listingTitle: 'NIDEK NC-330 Anterior Segment Analyzer',
    listingImage: 'https://images.unsplash.com/photo-1559027615-cd8628902c4a?w=400&h=300&fit=crop',
    messages: [
      {
        id: 'msg_6',
        senderId: 'user_3',
        senderName: 'Optical Solutions Inc.',
        recipientId: 'user_current',
        recipientName: 'You',
        listingId: 'listing_3',
        listingTitle: 'NIDEK NC-330 Anterior Segment Analyzer',
        content: 'Hey! Interested in this unit. Do you offer bulk discounts if we purchase multiple units?',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        read: false,
      },
    ],
    lastMessage: {
      id: 'msg_6',
      senderId: 'user_3',
      senderName: 'Optical Solutions Inc.',
      recipientId: 'user_current',
      recipientName: 'You',
      listingId: 'listing_3',
      listingTitle: 'NIDEK NC-330 Anterior Segment Analyzer',
      content: 'Hey! Interested in this unit. Do you offer bulk discounts if we purchase multiple units?',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      read: false,
    },
    unreadCount: 1,
  },
  {
    id: 'conv_4',
    participants: [
      { id: 'user_4', name: 'Dr. Patricia Wong', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=patricia' },
      { id: 'user_current', name: 'You', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=you' },
    ],
    listingId: 'listing_4',
    listingTitle: 'Marco Lensiometers LM-8000',
    listingImage: 'https://images.unsplash.com/photo-1630043596921-2ec3a75830c3?w=400&h=300&fit=crop',
    messages: [
      {
        id: 'msg_7',
        senderId: 'user_current',
        senderName: 'You',
        recipientId: 'user_4',
        recipientName: 'Dr. Patricia Wong',
        listingId: 'listing_4',
        listingTitle: 'Marco Lensiometers LM-8000',
        content: 'Hi Dr. Wong, what is the warranty status on this unit?',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        read: true,
      },
      {
        id: 'msg_8',
        senderId: 'user_4',
        senderName: 'Dr. Patricia Wong',
        recipientId: 'user_current',
        recipientName: 'You',
        listingId: 'listing_4',
        listingTitle: 'Marco Lensiometers LM-8000',
        content: 'This unit has a 2-year warranty remaining. Can provide the warranty card if needed.',
        timestamp: new Date(Date.now() - 4.9 * 24 * 60 * 60 * 1000).toISOString(),
        read: true,
      },
    ],
    lastMessage: {
      id: 'msg_8',
      senderId: 'user_4',
      senderName: 'Dr. Patricia Wong',
      recipientId: 'user_current',
      recipientName: 'You',
      listingId: 'listing_4',
      listingTitle: 'Marco Lensiometers LM-8000',
      content: 'This unit has a 2-year warranty remaining. Can provide the warranty card if needed.',
      timestamp: new Date(Date.now() - 4.9 * 24 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
    unreadCount: 0,
  },
  {
    id: 'conv_5',
    participants: [
      { id: 'user_5', name: 'Vision Care Equipment', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=visioncare' },
      { id: 'user_current', name: 'You', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=you' },
    ],
    listingId: 'listing_5',
    listingTitle: 'Reichert 7-Color LED Ophthalmic Lamp',
    listingImage: 'https://images.unsplash.com/photo-1578496322202-50377b4631da?w=400&h=300&fit=crop',
    messages: [
      {
        id: 'msg_9',
        senderId: 'user_5',
        senderName: 'Vision Care Equipment',
        recipientId: 'user_current',
        recipientName: 'You',
        listingId: 'listing_5',
        listingTitle: 'Reichert 7-Color LED Ophthalmic Lamp',
        content: 'Excellent condition! Still interested?',
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        read: true,
      },
    ],
    lastMessage: {
      id: 'msg_9',
      senderId: 'user_5',
      senderName: 'Vision Care Equipment',
      recipientId: 'user_current',
      recipientName: 'You',
      listingId: 'listing_5',
      listingTitle: 'Reichert 7-Color LED Ophthalmic Lamp',
      content: 'Excellent condition! Still interested?',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
    unreadCount: 0,
  },
];

export function MessageProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('optimarket_conversations') : null;
    if (stored) {
      try {
        setConversations(JSON.parse(stored));
      } catch {
        setConversations(DEMO_CONVERSATIONS);
      }
    } else {
      setConversations(DEMO_CONVERSATIONS);
    }
    setIsMounted(true);
  }, []);

  // Save to localStorage whenever conversations change
  useEffect(() => {
    if (isMounted && typeof window !== 'undefined') {
      localStorage.setItem('optimarket_conversations', JSON.stringify(conversations));
    }
  }, [conversations, isMounted]);

  const sendMessage = useCallback(
    (conversationId: string, content: string, senderId: string, senderName: string) => {
      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id === conversationId) {
            const newMessage: Message = {
              id: `msg_${Date.now()}`,
              senderId,
              senderName,
              recipientId: conv.participants.find((p) => p.id !== senderId)?.id || '',
              recipientName: conv.participants.find((p) => p.id !== senderId)?.name || '',
              listingId: conv.listingId,
              listingTitle: conv.listingTitle,
              content,
              timestamp: new Date().toISOString(),
              read: false,
            };

            return {
              ...conv,
              messages: [...conv.messages, newMessage],
              lastMessage: newMessage,
            };
          }
          return conv;
        })
      );
    },
    []
  );

  const getConversation = useCallback(
    (conversationId: string) => {
      return conversations.find((c) => c.id === conversationId);
    },
    [conversations]
  );

  const markAsRead = useCallback((conversationId: string) => {
    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            messages: conv.messages.map((msg) => ({
              ...msg,
              read: true,
            })),
            unreadCount: 0,
          };
        }
        return conv;
      })
    );
  }, []);

  const createConversation = useCallback(
    (
      otherUserId: string,
      otherUserName: string,
      otherUserAvatar: string,
      listingId: string,
      listingTitle: string,
      listingImage: string,
      initialMessage: string,
      currentUserId: string,
      currentUserName: string
    ) => {
      const existingConversation = conversations.find(
        (c) =>
          c.listingId === listingId &&
          c.participants.some((p) => p.id === otherUserId)
      );

      if (existingConversation) {
        // Add message to existing conversation
        sendMessage(existingConversation.id, initialMessage, currentUserId, currentUserName);
        return existingConversation.id;
      }

      // Create new conversation
      const newConversationId = `conv_${Date.now()}`;
      const newMessage: Message = {
        id: `msg_${Date.now()}`,
        senderId: currentUserId,
        senderName: currentUserName,
        recipientId: otherUserId,
        recipientName: otherUserName,
        listingId,
        listingTitle,
        content: initialMessage,
        timestamp: new Date().toISOString(),
        read: false,
      };

      const newConversation: Conversation = {
        id: newConversationId,
        participants: [
          { id: currentUserId, name: currentUserName, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=you' },
          { id: otherUserId, name: otherUserName, avatar: otherUserAvatar },
        ],
        listingId,
        listingTitle,
        listingImage,
        messages: [newMessage],
        lastMessage: newMessage,
        unreadCount: 0,
      };

      setConversations((prev) => [newConversation, ...prev]);
      return newConversationId;
    },
    [conversations, sendMessage]
  );

  const unreadCount = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  return (
    <MessageContext.Provider
      value={{
        conversations,
        sendMessage,
        getConversation,
        markAsRead,
        unreadCount,
        createConversation,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}

export function useMessages() {
  const context = useContext(MessageContext);
  if (!context) throw new Error('useMessages must be used within MessageProvider');
  return context;
}
