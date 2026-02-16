'use client';

import { FormEvent, useEffect, useState } from 'react';

type Profile = {
  name: string;
  businessName: string;
  email: string;
};

export default function AuthPage() {
  const [profile, setProfile] = useState<Profile>({ name: '', businessName: '', email: '' });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/profile')
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch(() => undefined);
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await fetch('/api/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    });
    setSaved(true);
  };

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Authentication & User Profile</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-3 rounded-xl border bg-white p-6">
          <p className="text-sm text-slate-600">MVP includes email/password profile state and reset-ready account metadata.</p>
          <input className="w-full rounded-lg border px-3 py-2" placeholder="Full name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
          <input className="w-full rounded-lg border px-3 py-2" placeholder="Business name" value={profile.businessName} onChange={(e) => setProfile({ ...profile, businessName: e.target.value })} />
          <input className="w-full rounded-lg border px-3 py-2" placeholder="Email" type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
          <button className="rounded-lg bg-brand-700 px-4 py-2 text-white" type="submit">Save Profile</button>
          {saved && <p className="text-sm text-emerald-700">Profile saved.</p>}
        </form>
        <div className="rounded-xl border bg-white p-6">
          <h2 className="font-semibold">Auth Roadmap (MVP+)</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
            <li>Google OAuth sign-in toggle</li>
            <li>Password reset flow endpoint</li>
            <li>Role-based permissions (admin/store manager)</li>
            <li>Session persistence with DB adapter</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
