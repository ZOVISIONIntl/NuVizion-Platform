import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardSummary from '../components/DashboardSummary';
import AccountTierBadge from '../components/AccountTierBadge';

// Quick action button for dashboard shortcuts
function ActionButton({ href, label, color }) {
  return (
    <a
      href={href}
      className={`px-5 py-2 rounded-full font-bold text-white shadow transition hover:scale-105 hover:bg-purple-800 ${color || "bg-purple-700"}`}
    >
      {label}
    </a>
  );
}

export default function Dashboard() {
  // Placeholder for user and dashboard data; replace with API calls later
  const [user, setUser] = useState({
    name: "ŽỌ",
    tier: "Covenant",
    role: "Founder", // Can be 'Creator', 'Covenant', 'Subscriber', 'Founder'
    avatar: "/default-avatar.png", // swap with actual avatar later
  });

  const [stats, setStats] = useState([
    { label: "Earnings", value: "$4,250" },
    { label: "Subscribers", value: "187" },
    { label: "Payouts Pending", value: "$1,200" },
    { label: "Tier", value: user.tier },
    { label: "Write-off Eligible?", value: user.tier === "Covenant" ? "Yes" : "No" },
  ]);

  // Example useEffect for future API call
  // useEffect(() => {
  //   fetch("/api/dashboard").then(res => res.json()).then(data => {
  //     setUser(data.user);
  //     setStats(data.stats);
  //   });
  // }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-indigo-900">
      <Sidebar />
      <main className="flex-1 p-8">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-14 h-14 rounded-full border-4 border-purple-600 shadow"
            />
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Welcome, {user.name}</h1>
              <p className="text-gray-300">
                Status: <span className="font-semibold">{user.role}</span>
              </p>
            </div>
          </div>
          <AccountTierBadge tier={user.tier} />
        </header>

        {/* Dashboard summary stats */}
        <DashboardSummary stats={stats} />

        {/* Quick Actions & Announcements */}
        <section className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Quick Links */}
          <div className="bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
            <div className="flex flex-wrap gap-4">
              <ActionButton href="/marketplace" label="Marketplace" />
              <ActionButton href="/fundraisers" label="Fundraisers" />
              <ActionButton href="/payouts" label="Payouts" />
              <ActionButton href="/profile" label="Profile" />
              <ActionButton href="/settings" label="Settings" />
              {user.role === "Founder" && (
                <ActionButton href="/admin" label="Admin" color="bg-red-600" />
              )}
            </div>
          </div>
          {/* Announcements or News */}
          <div className="bg-gradient-to-br from-indigo-700 to-fuchsia-700 text-white rounded-2xl shadow-lg p-6 flex flex-col">
            <h2 className="text-xl font-semibold mb-3">Platform Announcements</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="font-bold">🔥 Covenant Update:</span> Tier 3 subscribers now get automatic tax write-off eligibility. 
              </li>
              <li>
                <span className="font-bold">🛠️ Feature Drop:</span> AR/VR creator tools rolling out soon!
              </li>
              <li>
                <span className="font-bold">💸 Fundraiser:</span> Support NuWurldEra by joining the official platform campaigns.
              </li>
            </ul>
          </div>
        </section>

        {/* More widgets or analytics can go here */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Activity Feed (Coming Soon)</h2>
          <div className="bg-gray-900 rounded-xl h-32 flex items-center justify-center text-gray-400">
            Real-time stats, recent payouts, new subscribers, and more will show up here.
          </div>
        </section>
      </main>
    </div>
  );
}
