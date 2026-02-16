'use client';

import { useEffect, useMemo, useState } from 'react';

type Project = { id: string; businessName: string };
type Task = { id: string; label: string; phase: string; done: boolean };

export default function PlannerPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectId, setProjectId] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setProjectId(data[0]?.id ?? '');
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    const query = projectId ? `?projectId=${projectId}` : '';
    fetch(`/api/plan${query}`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch(() => setTasks([]));
  }, [projectId]);

  const progress = useMemo(() => {
    if (!tasks.length) return 0;
    const done = tasks.filter((task) => task.done).length;
    return Math.round((done / tasks.length) * 100);
  }, [tasks]);

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Execution Planner (Task-by-Task)</h1>
      <div className="rounded-xl border bg-white p-5">
        <label className="mb-2 block text-sm font-medium">Select Project</label>
        <select className="w-full rounded-lg border px-3 py-2 md:w-96" value={projectId} onChange={(e) => setProjectId(e.target.value)}>
          <option value="">Global plan</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>{project.businessName}</option>
          ))}
        </select>
        <div className="mt-4 h-3 w-full rounded bg-slate-200">
          <div className="h-full rounded bg-brand-700" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-2 text-sm text-slate-600">Progress: {progress}% complete</p>
      </div>

      <div className="grid gap-3">
        {tasks.map((task) => (
          <article key={task.id} className="rounded-xl border bg-white p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">{task.phase}</p>
            <div className="mt-1 flex items-center justify-between">
              <p className="font-medium">{task.label}</p>
              <span className={`rounded-full px-3 py-1 text-xs ${task.done ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {task.done ? 'Done' : 'Pending'}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
