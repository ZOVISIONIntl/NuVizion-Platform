import React from 'react';

export default function AccountTierBadge({ tier }) {
  let color = "bg-gray-700";
  if (tier === "Covenant") color = "bg-purple-700";
  if (tier === "Tier 2") color = "bg-blue-700";
  if (tier === "Tier 1") color = "bg-green-700";
  return (
    <span className={`px-4 py-2 rounded-full text-white font-bold ${color}`}>
      {tier}
    </span>
  );
}
