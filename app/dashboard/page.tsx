import { KpiCard } from '@/components/kpi-card';
import { lowStockProducts, orders, products, projects } from '@/lib/data';

export default function DashboardPage() {
  const revenue = orders.reduce((sum, order) => sum + order.total, 0);
  const lowStock = lowStockProducts();
  const publishedSites = projects.filter((project) => project.published).length;

  return (
    <section className="space-y-5">
      <h1 className="text-3xl font-bold">Store Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-4">
        <KpiCard title="Total Orders" value={String(orders.length)} hint="Across all channels" />
        <KpiCard title="Revenue" value={`$${revenue}`} hint="Gross MVP metric" />
        <KpiCard title="Products" value={String(products.length)} hint="Draft + Published" />
        <KpiCard title="Published Sites" value={String(publishedSites)} hint="Live projects" />
      </div>

      <div className="rounded-xl border bg-white p-4">
        <h2 className="font-semibold">Low Stock Alerts</h2>
        <ul className="mt-2 space-y-1 text-sm text-slate-700">
          {lowStock.length === 0 && <li>No low stock variants.</li>}
          {lowStock.map((product) => (
            <li key={product.id}>{product.name}: {product.variants.filter((variant) => variant.stock < 5).map((variant) => `${variant.name} ${variant.value} (${variant.stock})`).join(', ')}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
