import { KpiCard } from '@/components/kpi-card';
import { orders, products, projects, websites } from '@/lib/data';

export default function AdminPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Panel</h1>
      <div className="grid gap-4 md:grid-cols-4">
        <KpiCard title="Projects" value={String(projects.length)} hint="Total generated stores" />
        <KpiCard title="Websites" value={String(websites.length)} hint="Generated storefronts" />
        <KpiCard title="Orders" value={String(orders.length)} hint="Lifecycle monitoring" />
        <KpiCard title="Products" value={String(products.length)} hint="Catalog governance" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-white p-4">
          <h2 className="font-semibold">Orders Queue</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {orders.map((order) => (
              <li key={order.id} className="flex justify-between border-b py-1">
                <span>{order.customerName} ({order.email})</span>
                <span>{order.status} · ${order.total}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border bg-white p-4">
          <h2 className="font-semibold">Project Governance</h2>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            {projects.length === 0 && <li>No projects yet.</li>}
            {projects.map((project) => (
              <li key={project.id} className="border-b py-1">
                <p className="font-medium">{project.businessName}</p>
                <p>Owner: {project.ownerEmail}</p>
                <p>Status: {project.published ? 'Published' : 'Draft'} {project.customDomain ? `· ${project.customDomain}` : ''}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
