import Link from 'next/link';

const features = [
  'Image-to-product AI generation',
  'Multi-product catalog management',
  'AI frontend prompt customization',
  'One-click publish with domain support',
  'Admin dashboard for orders and inventory'
];

export default function HomePage() {
  return (
    <section className="space-y-8">
      <div className="rounded-2xl bg-gradient-to-r from-brand-700 to-brand-500 p-10 text-white">
        <h1 className="text-4xl font-bold">Upload Product → AI Builds Store → Publish → Sell</h1>
        <p className="mt-4 max-w-3xl text-lg">
          AI Commerce Builder is an MVP SaaS scaffold with user onboarding, product intelligence, store generation,
          frontend prompt edits, publishing flow, and admin management tools.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/builder" className="rounded-lg bg-white px-5 py-2 font-semibold text-brand-700">Start Project</Link>
          <Link href="/admin" className="rounded-lg border border-white px-5 py-2">Open Admin Panel</Link>
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
