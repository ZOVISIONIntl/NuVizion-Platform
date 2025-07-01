import React from 'react';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-black text-white flex flex-col p-6">
      <h2 className="font-bold text-xl mb-8">NUVIZION</h2>
      <nav className="flex flex-col gap-4">
        <Link href="/dashboard" className="hover:text-blue-400">Dashboard</Link>
        <Link href="/marketplace" className="hover:text-blue-400">Marketplace</Link>
        <Link href="/payouts" className="hover:text-blue-400">Payouts</Link>
        <Link href="/fundraisers" className="hover:text-blue-400">Fundraisers</Link>
        <Link href="/settings" className="hover:text-blue-400">Settings</Link>
      </nav>
    </aside>
  );
}
