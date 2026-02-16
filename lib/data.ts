import { Order, Product, Project } from './types';

export const products: Product[] = [];
export const projects: Project[] = [];
export const orders: Order[] = [
  { id: 'ord_1', customerName: 'Emma Stone', total: 89, status: 'pending' },
  { id: 'ord_2', customerName: 'Liam Grey', total: 120, status: 'shipped' }
];

export const themes = [
  { id: 'modern', label: 'Modern Clean' },
  { id: 'minimal', label: 'Minimal Mono' },
  { id: 'bold', label: 'Bold Promo' }
] as const;

export function randomId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}
