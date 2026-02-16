import { KpiCard } from '@/components/kpi-card';

export default async function AdminPage() {
  const [ordersRes, productsRes, projectsRes] = await Promise.all([
    fetch('http://localhost:3000/api/orders', { cache: 'no-store' }).catch(() => null),
    fetch('http://localhost:3000/api/products', { cache: 'no-store' }).catch(() => null),
    fetch('http://localhost:3000/api/projects', { cache: 'no-store' }).catch(() => null)
  ]);

  const orders = ordersRes ? await ordersRes.json() : [];
  const products = productsRes ? await productsRes.json() : [];
  const projects = projectsRes ? await projectsRes.json() : [];

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Panel</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <KpiCard title="Projects" value={String(projects.length)} hint="Total generated stores" />
        <KpiCard title="Orders" value={String(orders.length)} hint="Lifecycle monitoring" />
        <KpiCard title="Products" value={String(products.length)} hint="Catalog governance" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-white p-4">
          <h2 className="font-semibold">Orders Queue</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {orders.map((order: { id: string; customerName: string; status: string; total: number }) => (
              <li key={order.id} className="flex justify-between border-b py-1">
                <span>{order.customerName}</span>
                <span>{order.status} · ${order.total}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border bg-white p-4">
          <h2 className="font-semibold">MVP Control Coverage</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
            <li>Product status management (draft/published)</li>
            <li>Per-variant stock visibility</li>
            <li>Publishing state checks and domain metadata</li>
            <li>Payment mode readiness (test mode)</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
