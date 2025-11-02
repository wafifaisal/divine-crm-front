'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send } from 'lucide-react';
import { cn, getStatusColor } from '@/lib/utils';

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState('1');
  const [message, setMessage] = useState('');

  const chatList = [
    {
      id: '1',
      contact: 'Marcel',
      lastMessage: 'Ya nggak gitu',
      status: 'Unassigned',
      channel: 'Telegram',
      unreadCount: 2,
    },
    {
      id: '2',
      contact: 'Nikolas',
      lastMessage: 'Ya begitu mbak!',
      status: 'Pending',
      channel: 'WhatsApp',
      unreadCount: 0,
    },
    {
      id: '3',
      contact: 'Ivan',
      lastMessage: 'Test halo halo',
      status: 'Assigned',
      channel: 'WhatsApp',
      unreadCount: 1,
    },
    {
      id: '4',
      contact: 'Oyas',
      lastMessage: 'Pesen es teh satu',
      status: 'Resolved',
      channel: 'WhatsApp',
      unreadCount: 0,
    },
    {
      id: '5',
      contact: 'Nicholas',
      lastMessage: 'Pesen es teh dua',
      status: 'Unassigned',
      channel: 'Instagram',
      unreadCount: 3,
    },
    {
      id: '6',
      contact: 'Adhi',
      lastMessage: 'Pesen es batu',
      status: 'Assigned',
      channel: 'WhatsApp',
      unreadCount: 0,
    },
  ];

  const currentChat = chatList.find((chat) => chat.id === selectedChat);

  const messages = [
    {
      id: '1',
      sender: 'customer',
      message: 'Halo mau order',
      timestamp: '10:30',
    },
    {
      id: '2',
      sender: 'ai',
      message: 'Order apa nih kak, dengan senang hati siap membantu!',
      timestamp: '10:31',
    },
    {
      id: '3',
      sender: 'customer',
      message: 'Order biji salak buat burung saya',
      timestamp: '10:32',
    },
  ];

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-8rem)]">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Chat</h1>
            <p className="text-gray-600 mt-1">Manage customer conversations</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className={cn(
                'px-4',
                'bg-white text-gray-700 hover:bg-gray-50'
              )}
            >
              Unassigned
            </Button>
            <Button
              variant="outline"
              className={cn(
                'px-4',
                'bg-white text-gray-700 hover:bg-gray-50'
              )}
            >
              Pending
            </Button>
            <Button
              variant="outline"
              className={cn(
                'px-4',
                'bg-white text-gray-700 hover:bg-gray-50'
              )}
            >
              Assigned
            </Button>
            <Button
              variant="outline"
              className={cn(
                'px-4',
                'bg-white text-gray-700 hover:bg-gray-50'
              )}
            >
              Resolved
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 h-full">
          {/* Chat List */}
          <Card className="col-span-4 p-4 overflow-y-auto">
            <Input placeholder="Search chats..." className="mb-4" />
            <div className="space-y-2">
              {chatList.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className={cn(
                    'w-full text-left p-3 rounded-lg transition-colors',
                    selectedChat === chat.id
                      ? 'bg-purple-50 border-2 border-purple-200'
                      : 'hover:bg-gray-50 border-2 border-transparent'
                  )}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium">{chat.contact}</span>
                    {chat.unreadCount > 0 && (
                      <span className="bg-purple-600 text-white text-xs rounded-full px-2 py-0.5">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 truncate mb-2">
                    {chat.lastMessage}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{chat.channel}</span>
                    <span
                      className={cn(
                        'text-xs px-2 py-0.5 rounded-full',
                        getStatusColor(chat.status)
                      )}
                    >
                      {chat.status}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Chat Window */}
          <Card className="col-span-8 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-lg">{currentChat?.contact}</h2>
                <p className="text-sm text-gray-500">{currentChat?.channel}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  Take Over (TO)
                </Button>
                <Button size="sm" variant="outline">
                  Return to AI
                </Button>
                <Button size="sm">Resolve</Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    'flex',
                    msg.sender === 'customer' ? 'justify-start' : 'justify-end'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[70%] rounded-lg p-3',
                      msg.sender === 'customer'
                        ? 'bg-gray-100'
                        : msg.sender === 'ai'
                        ? 'bg-purple-100'
                        : 'bg-blue-100'
                    )}
                  >
                    {msg.sender === 'ai' && (
                      <p className="text-xs text-purple-600 mb-1">AI Agent</p>
                    )}
                    <p className="text-sm">{msg.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{msg.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      // Send message logic
                      setMessage('');
                    }
                  }}
                />
                <Button>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
