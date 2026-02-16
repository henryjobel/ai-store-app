export function KpiCard({ title, value, hint }: { title: string; value: string; hint: string }) {
  return (
    <article className="rounded-xl border bg-white p-4 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>
      <h3 className="mt-2 text-2xl font-semibold">{value}</h3>
      <p className="mt-1 text-xs text-slate-400">{hint}</p>
    </article>
  );
}
