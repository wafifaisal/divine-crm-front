import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(amount);
}

export function generateCode(prefix: string): string {
  const randomNum = Math.floor(Math.random() * 900) + 100;
  return `${prefix}${randomNum}`;
}

export function getTemperatureColor(temperature: string): string {
  switch (temperature.toLowerCase()) {
    case 'hot':
      return 'text-red-600 bg-red-100';
    case 'warm':
      return 'text-orange-600 bg-orange-100';
    case 'cold':
      return 'text-blue-600 bg-blue-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'resolved':
      return 'text-green-600 bg-green-100';
    case 'assigned':
      return 'text-blue-600 bg-blue-100';
    case 'pending':
      return 'text-yellow-600 bg-yellow-100';
    case 'unassigned':
      return 'text-gray-600 bg-gray-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}
