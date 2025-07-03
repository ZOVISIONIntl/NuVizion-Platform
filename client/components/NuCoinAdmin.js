// client/components/NuCoinAdmin.js

import { useEffect, useState } from "react";

export default function NuCoinAdmin() {
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch('/api/nucoin/balance')
      .then(r => r.json())
      .then(data => setBalance(data.balance));
    fetch('/api/nucoin/history')
      .then(r => r.json())
      .then(data => setHistory(data.history));
  }, []);

  return (
    <div style={{ background: "#222", color: "#fff", padding: 24, borderRadius: 8 }}>
      <h2>NuCoin Platform Treasury</h2>
      <div style={{ fontSize: 24, margin: "20px 0" }}>
        <b>Balance:</b> {balance} NUC
      </div>
      <h4>History:</h4>
      <ul>
        {history.map((item, idx) => (
          <li key={idx}>{item.date && new Date(item.date).toLocaleString()} — <b>+{item.amount}</b> ({item.note})</li>
        ))}
      </ul>
    </div>
  );
}
