'use client';

import { useState } from 'react';

type AIProduct = {
  name: string;
  shortDescription: string;
  longDescription: string;
  seoTitle: string;
  seoMetaDescription: string;
  price: number;
  discountedPrice?: number;
  sku: string;
  actionItems: string[];
  variants: Array<{ id: string; name: string; value: string; stock: number }>;
};

export default function BuilderPage() {
  const [images, setImages] = useState<string[]>(['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200']);
  const [businessName, setBusinessName] = useState('Nova D2C');
  const [product, setProduct] = useState<AIProduct | null>(null);
  const [saving, setSaving] = useState(false);

  const generate = async () => {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ images })
    });
    setProduct(await res.json());
  };

  const saveProduct = async () => {
    if (!product) return;
    setSaving(true);
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...product, images, status: 'draft', reviewsEnabled: true, stockTracking: true })
    });
    await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ businessName, theme: 'modern' })
    });
    setSaving(false);
    alert('Product + project saved! You can now generate and publish your website.');
  };

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">User Dashboard · Product Builder</h1>
      <div className="grid gap-6 rounded-xl border bg-white p-6 md:grid-cols-2">
        <div className="space-y-4">
          <label className="block text-sm font-medium">Business name</label>
          <input
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          />
          <label className="block text-sm font-medium">Product image URL (MVP placeholder for upload)</label>
          <input
            value={images[0]}
            onChange={(e) => setImages([e.target.value])}
            className="w-full rounded-lg border px-3 py-2"
          />
          <button onClick={generate} className="rounded-lg bg-brand-700 px-4 py-2 font-medium text-white">Generate AI Product Data</button>
        </div>
        <div className="rounded-lg border p-4">
          <h2 className="font-semibold">MVP Flow Coverage</h2>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-slate-600">
            <li>Upload product image(s)</li><li>Generate product data with AI</li><li>Edit fields + variants</li><li>Save product</li><li>Generate website + publish</li>
          </ol>
        </div>
      </div>

      {product && (
        <article className="space-y-3 rounded-xl border bg-white p-6">
          <h2 className="text-2xl font-semibold">AI Output (Editable)</h2>
          <input value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} className="w-full rounded-lg border px-3 py-2" />
          <textarea value={product.shortDescription} onChange={(e) => setProduct({ ...product, shortDescription: e.target.value })} className="w-full rounded-lg border px-3 py-2" />
          <div className="grid gap-3 md:grid-cols-2">
            <input type="number" value={product.price} onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })} className="rounded-lg border px-3 py-2" />
            <input type="number" value={product.discountedPrice} onChange={(e) => setProduct({ ...product, discountedPrice: Number(e.target.value) })} className="rounded-lg border px-3 py-2" />
          </div>
          <button onClick={saveProduct} disabled={saving} className="rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white">
            {saving ? 'Saving...' : 'Save Product & Project'}
          </button>
        </article>
      )}
    </section>
  );
}
