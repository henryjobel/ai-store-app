'use client';

import Link from 'next/link';
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
  const [ownerEmail, setOwnerEmail] = useState('owner@novad2c.com');
  const [product, setProduct] = useState<AIProduct | null>(null);
  const [projectId, setProjectId] = useState<string>('');
  const [saving, setSaving] = useState(false);

  const generate = async () => {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ images })
    });
    setProduct(await res.json());
  };

  const regenerateField = async (field: 'shortDescription' | 'seoMetaDescription') => {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ images, field })
    });
    const data = await res.json();
    if (!product) return;
    setProduct({ ...product, [field]: data.value });
  };

  const saveProduct = async () => {
    if (!product) return;
    setSaving(true);
    const savedProduct = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...product, images, status: 'draft', reviewsEnabled: true, stockTracking: true })
    }).then((res) => res.json());

    const savedProject = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ businessName, ownerEmail, theme: 'modern', products: [savedProduct.id] })
    }).then((res) => res.json());

    setProjectId(savedProject.id);
    setSaving(false);
  };

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">User Dashboard · Product Builder</h1>
      <div className="grid gap-6 rounded-xl border bg-white p-6 md:grid-cols-2">
        <div className="space-y-3">
          <input value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="w-full rounded-lg border px-3 py-2" placeholder="Business name" />
          <input value={ownerEmail} onChange={(e) => setOwnerEmail(e.target.value)} className="w-full rounded-lg border px-3 py-2" placeholder="Owner email" />
          <input value={images[0]} onChange={(e) => setImages([e.target.value])} className="w-full rounded-lg border px-3 py-2" placeholder="Image URL" />
          <button onClick={generate} className="rounded-lg bg-brand-700 px-4 py-2 font-medium text-white">Generate AI Product Data</button>
        </div>
        <div className="rounded-lg border p-4">
          <h2 className="font-semibold">MVP Coverage</h2>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-600">
            <li>Upload product image(s)</li>
            <li>Generate and edit AI content</li>
            <li>Create product + project records</li>
            <li>Generate storefront in Studio</li>
            <li>Customize with prompts and publish</li>
          </ol>
        </div>
      </div>

      {product && (
        <article className="space-y-3 rounded-xl border bg-white p-6">
          <h2 className="text-2xl font-semibold">AI Output (Editable)</h2>
          <input value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} className="w-full rounded-lg border px-3 py-2" />
          <textarea value={product.shortDescription} onChange={(e) => setProduct({ ...product, shortDescription: e.target.value })} className="w-full rounded-lg border px-3 py-2" />
          <button onClick={() => regenerateField('shortDescription')} className="rounded-lg border px-3 py-1 text-sm">Regenerate short description</button>
          <textarea value={product.seoMetaDescription} onChange={(e) => setProduct({ ...product, seoMetaDescription: e.target.value })} className="w-full rounded-lg border px-3 py-2" />
          <button onClick={() => regenerateField('seoMetaDescription')} className="rounded-lg border px-3 py-1 text-sm">Regenerate SEO meta</button>
          <div className="grid gap-3 md:grid-cols-2">
            <input type="number" value={product.price} onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })} className="rounded-lg border px-3 py-2" />
            <input type="number" value={product.discountedPrice} onChange={(e) => setProduct({ ...product, discountedPrice: Number(e.target.value) })} className="rounded-lg border px-3 py-2" />
          </div>
          <button onClick={saveProduct} disabled={saving} className="rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white">
            {saving ? 'Saving...' : 'Save Product & Project'}
          </button>
          {projectId && (
            <p className="text-sm text-emerald-700">
              Saved project {projectId}. Continue in the <Link href="/studio" className="underline">Website Studio</Link>.
            </p>
          )}
        </article>
      )}
    </section>
  );
}
