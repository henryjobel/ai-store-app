'use client';

import { useMemo, useState } from 'react';

type Variant = { id: string; name: string; value: string; stock: number };
type Product = {
  id: string;
  name: string;
  shortDescription: string;
  price: number;
  discountedPrice?: number;
  images: string[];
  variants: Variant[];
};

export function StorefrontClient({ products, businessName }: { products: Product[]; businessName: string }) {
  const [cart, setCart] = useState<Record<string, number>>({});

  const total = useMemo(
    () =>
      products.reduce((sum, product) => {
        const qty = cart[product.id] ?? 0;
        const price = product.discountedPrice ?? product.price;
        return sum + qty * price;
      }, 0),
    [cart, products]
  );

  return (
    <section className="space-y-6">
      <header className="rounded-2xl bg-gradient-to-r from-brand-700 to-brand-500 p-8 text-white">
        <h1 className="text-3xl font-bold">{businessName}</h1>
        <p className="mt-2">AI-generated store preview</p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {products.map((product) => (
          <article key={product.id} className="rounded-xl border bg-white p-4">
            <div className="aspect-video rounded-lg bg-slate-100" style={{ backgroundImage: `url(${product.images[0]})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <h2 className="mt-3 font-semibold">{product.name}</h2>
            <p className="text-sm text-slate-600">{product.shortDescription}</p>
            <p className="mt-2 font-medium">${product.discountedPrice ?? product.price}</p>
            <button
              onClick={() => setCart((prev) => ({ ...prev, [product.id]: (prev[product.id] ?? 0) + 1 }))}
              className="mt-3 rounded-lg bg-slate-900 px-4 py-2 text-sm text-white"
            >
              Add to cart
            </button>
          </article>
        ))}
      </div>

      <div className="rounded-xl border bg-white p-4">
        <h3 className="font-semibold">Cart Summary</h3>
        <p className="mt-1 text-sm text-slate-600">Items: {Object.values(cart).reduce((a, b) => a + b, 0)}</p>
        <p className="mt-1 text-lg font-bold">Total: ${total}</p>
        <button className="mt-3 rounded-lg bg-emerald-600 px-4 py-2 text-white">Checkout (MVP)</button>
      </div>
    </section>
  );
}
