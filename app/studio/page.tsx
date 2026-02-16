'use client';

import { useEffect, useMemo, useState } from 'react';

type Project = { id: string; businessName: string; theme: 'modern' | 'minimal' | 'bold'; published: boolean; websiteId?: string };
type Section = { id: string; type: string; heading: string; body: string; buttonColor?: string; roundedButtons?: boolean; spacing?: string };
type Website = { id: string; projectId: string; subdomain: string; customDomain?: string; sections: Section[]; publishedAt?: string };

export default function StudioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [website, setWebsite] = useState<Website | null>(null);
  const [prompt, setPrompt] = useState('Make button color black with rounded corners and increase spacing');
  const [selectedSectionId, setSelectedSectionId] = useState<string>('');
  const [customDomain, setCustomDomain] = useState('store.example.com');

  useEffect(() => {
    fetch('/api/projects').then((res) => res.json()).then((data) => {
      setProjects(data);
      if (data[0]) {
        setSelectedProjectId(data[0].id);
      }
    });
  }, []);

  const selectedProject = useMemo(() => projects.find((item) => item.id === selectedProjectId), [projects, selectedProjectId]);

  const generateWebsite = async () => {
    if (!selectedProjectId) return;
    const res = await fetch('/api/websites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId: selectedProjectId, theme: selectedProject?.theme })
    });
    const data = await res.json();
    setWebsite(data);
    setSelectedSectionId(data.sections[0]?.id ?? '');
  };

  const applyPrompt = async () => {
    if (!website || !selectedSectionId) return;
    const res = await fetch('/api/websites', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ websiteId: website.id, sectionId: selectedSectionId, prompt })
    });
    setWebsite(await res.json());
  };

  const publish = async () => {
    if (!website) return;
    const res = await fetch('/api/websites', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ websiteId: website.id, publish: true, customDomain })
    });
    setWebsite(await res.json());
    await fetch(`/api/projects/${selectedProjectId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: true, customDomain })
    });
  };

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Website Generation Studio</h1>
      <div className="grid gap-4 rounded-xl border bg-white p-5 md:grid-cols-3">
        <select value={selectedProjectId} onChange={(e) => setSelectedProjectId(e.target.value)} className="rounded-lg border px-3 py-2">
          <option value="">Select project</option>
          {projects.map((project) => <option value={project.id} key={project.id}>{project.businessName}</option>)}
        </select>
        <button onClick={generateWebsite} className="rounded-lg bg-brand-700 px-4 py-2 text-white">Generate Website</button>
        <input className="rounded-lg border px-3 py-2" value={customDomain} onChange={(e) => setCustomDomain(e.target.value)} placeholder="Custom domain" />
      </div>

      {website && (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3 rounded-xl border bg-white p-5">
            <h2 className="text-xl font-semibold">AI Frontend Customization</h2>
            <p className="text-sm text-slate-600">Subdomain: {website.subdomain}</p>
            <select value={selectedSectionId} onChange={(e) => setSelectedSectionId(e.target.value)} className="w-full rounded-lg border px-3 py-2">
              {website.sections.map((section) => <option key={section.id} value={section.id}>{section.type} · {section.heading}</option>)}
            </select>
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} className="min-h-24 w-full rounded-lg border px-3 py-2" />
            <div className="flex gap-3">
              <button onClick={applyPrompt} className="rounded-lg bg-slate-800 px-4 py-2 text-white">Apply Prompt</button>
              <button onClick={publish} className="rounded-lg bg-emerald-600 px-4 py-2 text-white">Publish</button>
            </div>
            {website.publishedAt && <p className="text-sm text-emerald-700">Published at {new Date(website.publishedAt).toLocaleString()} ({website.customDomain || website.subdomain})</p>}
          </div>
          <div className="space-y-3 rounded-xl border bg-white p-5">
            <h2 className="text-xl font-semibold">Live Preview (Config-driven)</h2>
            {website.sections.map((section) => (
              <article key={section.id} className="rounded-lg border p-3">
                <h3 className="font-semibold">{section.heading}</h3>
                <p className="text-sm text-slate-600">{section.body}</p>
                {section.buttonColor && (
                  <div className="mt-2 inline-block rounded px-3 py-1 text-xs text-white" style={{ background: section.buttonColor }}>
                    {section.roundedButtons ? 'Rounded button enabled' : 'Square button'}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
