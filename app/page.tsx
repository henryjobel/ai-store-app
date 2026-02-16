import Link from 'next/link';

const features = [
  'Email/password authentication scaffold',
  'Image-to-product AI generation',
  'Multi-product catalog and stock controls',
  'AI frontend prompt customization studio',
  'One-click publish with subdomain + custom domain metadata',
  'Admin dashboard for orders and inventory'
];

export default function HomePage() {
  return (
    <section className="space-y-8">
      <div className="rounded-2xl bg-gradient-to-r from-brand-700 to-brand-500 p-10 text-white">
        <h1 className="text-4xl font-bold">Upload Product → AI Builds Store → Publish → Sell</h1>
        <p className="mt-4 max-w-3xl text-lg">
          AI Commerce Builder is an MVP SaaS implementation with auth scaffolding, product intelligence, automated
          website generation, prompt-based frontend edits, publishing workflow, and business dashboards.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/auth" className="rounded-lg bg-white px-5 py-2 font-semibold text-brand-700">Create account</Link>
          <Link href="/builder" className="rounded-lg border border-white px-5 py-2">Start builder</Link>
          <Link href="/studio" className="rounded-lg border border-white px-5 py-2">Open studio</Link>
        </div>
      </div>
      <ul className="grid gap-3 md:grid-cols-2">
        {features.map((feature) => (
          <li key={feature} className="rounded-lg border bg-white p-4">✅ {feature}</li>
        ))}
      </ul>
    </section>
  );
}
