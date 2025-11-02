'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Users,
  Package,
  Tag,
  Brain,
  Plug,
  Bot,
  UserCog,
  MessageSquare,
  Send,
  BarChart,
  MessageCircle,
  Settings,
  Wallet,
  LogOut,
} from 'lucide-react';

const menuItems = [
  {
    title: 'Masterdata',
    items: [
      { icon: Users, label: 'Leads & Contacts', href: '/masterdata/contacts' },
      { icon: Users, label: 'Contacts', href: '/masterdata/contacts-list' },
      { icon: Package, label: 'Products', href: '/masterdata/products' },
      { icon: Tag, label: 'Chat Labels', href: '/masterdata/chat-labels' },
      {
        icon: Brain,
        label: 'AI Configuration',
        href: '/masterdata/ai-configuration',
      },
      {
        icon: Plug,
        label: 'Connected Platform',
        href: '/masterdata/connected-platforms',
      },
      { icon: Bot, label: 'AI Agents', href: '/masterdata/ai-agents' },
      { icon: UserCog, label: 'Human Agents', href: '/masterdata/human-agents' },
      {
        icon: MessageCircle,
        label: 'Broadcast Template',
        href: '/masterdata/broadcast-templates',
      },
    ],
  },
  {
    title: '',
    items: [{ icon: MessageSquare, label: 'Chat', href: '/chat' }],
  },
  {
    title: '',
    items: [
      { icon: BarChart, label: 'Analytics', href: '/analytics' },
      { icon: Send, label: 'Broadcast', href: '/broadcast' },
      { icon: MessageCircle, label: 'Quick Reply', href: '/quick-reply' },
      { icon: Settings, label: 'API Setting', href: '/api-setting' },
    ],
  },
  {
    title: '',
    items: [{ icon: Wallet, label: 'Balance', href: '/balance' }],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r min-h-screen">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-purple-600">DIVINE CRM</h1>
      </div>

      <nav className="px-3 space-y-1">
        {menuItems.map((section, idx) => (
          <div key={idx} className="mb-4">
            {section.title && (
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                {section.title}
              </div>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-purple-50 text-purple-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
            {idx < menuItems.length - 1 && (
              <div className="my-2 border-t border-gray-200" />
            )}
          </div>
        ))}

        <div className="border-t border-gray-200 pt-4">
          <button className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Signout</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
