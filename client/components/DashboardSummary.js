import React from 'react';

export default function DashboardSummary() {
  // Placeholder data - connect to backend later
  const stats = [
    { label: "Earnings", value: "$4,250" },
    { label: "Subscribers", value: "187" },
    { label: "Payouts Pending", value: "$1,200" },
    { label: "Tier", value: "Covenant" },
    { label: "Write-off Eligible?", value: "Yes" },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
          <span className="text-lg font-semibold">{stat.label}</span>
          <span className="text-2xl font-bold mt-2">{stat.value}</span>
        </div>
      ))}
    </div>
  );
}
