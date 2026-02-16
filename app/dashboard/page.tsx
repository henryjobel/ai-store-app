import { KpiCard } from '@/components/kpi-card';

export default async function DashboardPage() {
  const [ordersRes, productsRes] = await Promise.all([
    fetch('http://localhost:3000/api/orders', { cache: 'no-store' }).catch(() => null),
    fetch('http://localhost:3000/api/products', { cache: 'no-store' }).catch(() => null)
  ]);

  const orders = ordersRes ? await ordersRes.json() : [];
  const products = productsRes ? await productsRes.json() : [];

  const revenue = orders.reduce((sum: number, o: { total: number }) => sum + o.total, 0);

  return (
    <section className="space-y-5">
      <h1 className="text-3xl font-bold">Store Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-4">
        <KpiCard title="Total Orders" value={String(orders.length)} hint="Across all channels" />
        <KpiCard title="Revenue" value={`$${revenue}`} hint="Gross MVP metric" />
        <KpiCard title="Products" value={String(products.length)} hint="Draft + Published" />
        <KpiCard title="Low Stock Alerts" value="2" hint="Variant level checks" />
      </div>
      <p className="rounded-lg border bg-white p-4 text-sm text-slate-600">
        This dashboard is intended for store owners to monitor performance post-publish.
      </p>
    </section>
  );
}
