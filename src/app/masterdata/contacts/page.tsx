'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit } from 'lucide-react';
import { formatDate, getTemperatureColor } from '@/lib/utils';

export default function ContactsPage() {
  const [contacts] = useState([
    {
      id: '1',
      code: 'M001',
      channel: 'Telegram',
      contactId: '+628389956789',
      name: '',
      contactStatus: 'Leads',
      temperature: 'Cold',
      firstContact: '2025-10-23T09:28:27',
      lastContact: '2025-10-25T08:28:27',
      lastAgent: 'Diva (AI)',
    },
    {
      id: '2',
      code: 'E003',
      channel: 'Whatsapp',
      contactId: '+628389956789',
      name: 'Marcel',
      contactStatus: 'Contact',
      temperature: 'Warm',
      firstContact: '2025-10-23T11:29:39',
      lastContact: '2025-10-25T09:29:39',
      lastAgent: 'Niken (AI)',
    },
    {
      id: '3',
      code: 'W008',
      channel: 'Instagram Msg',
      contactId: '@wafxx',
      name: 'Wafi',
      contactStatus: 'Contact',
      temperature: 'Hot',
      firstContact: '2025-10-23T15:14:14',
      lastContact: '2025-10-25T14:14:14',
      lastAgent: 'Martono (Human)',
    },
  ]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Masterdata</h1>
            <p className="text-gray-600 mt-1">Leads & Contacts</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>

        <Card className="p-6">
          <div className="mb-4 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search contacts..."
                className="pl-10"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact Status</TableHead>
                <TableHead>Temperature</TableHead>
                <TableHead>First Contact</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead>Last Agent</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell className="font-medium">{contact.code}</TableCell>
                  <TableCell>{contact.channel}</TableCell>
                  <TableCell>{contact.contactId}</TableCell>
                  <TableCell>{contact.name || '-'}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100">
                      {contact.contactStatus}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getTemperatureColor(
                        contact.temperature
                      )}`}
                    >
                      {contact.temperature}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatDate(contact.firstContact)}
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatDate(contact.lastContact)}
                  </TableCell>
                  <TableCell>{contact.lastAgent}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </DashboardLayout>
  );
}
