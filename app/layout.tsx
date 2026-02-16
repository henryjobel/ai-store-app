import './globals.css';
import Link from 'next/link';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'AI Commerce Builder',
  description: 'Upload product → AI builds store → Publish → Sell.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b bg-white">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="font-semibold text-brand-700">AI Commerce Builder</Link>
            <div className="flex gap-4 text-sm">
              <Link href="/builder">User Dashboard</Link>
              <Link href="/dashboard">Store Dashboard</Link>
              <Link href="/admin">Admin Panel</Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
