import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [token, setToken] = useState('');
  const [profile, setProfile] = useState(null);
  const [products, setProducts] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const t = window.localStorage.getItem('token') || '';
    setToken(t);

    if (t) {
      axios.get('http://localhost:4000/api/users/me', { headers: { Authorization: `Bearer ${t}` } })
        .then(res => setProfile(res.data))
        .catch(() => setProfile(null));

      axios.get('http://localhost:4000/api/payouts/balance', { headers: { Authorization: `Bearer ${t}` } })
        .then(res => setBalance(res.data.balance))
        .catch(() => setBalance(0));
    }
  }, []);

  useEffect(() => {
    axios.get('http://localhost:4000/api/marketplace/')
      .then(res => setProducts(res.data))
      .catch(() => setProducts([]));
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto", background: "#fff", borderRadius: "12px", padding: 30, boxShadow: "0 4px 32px #0002" }}>
      <h2 style={{ marginBottom: 4 }}>Creator Dashboard</h2>
      <p style={{ marginBottom: 20, color: "#8b5cf6" }}>
        “A platform for creators, visionaries, and the Covenant. Build. Monetize. Dominate. All on your own terms.”
      </p>
      {profile ? (
        <>
          <div style={{ display: "flex", gap: "2rem", alignItems: "center", marginBottom: "1.2rem" }}>
            <div>
              <b>{profile.username}</b> <span style={{ color: "#10b981" }}>({profile.role})</span>
              <div>
                <span style={{
                  background: profile.tier === 'Covenant' ? "#fbbf24" : profile.tier === 'Tier2' ? "#3b82f6" : "#a1a1aa",
                  color: "#222", borderRadius: 6, padding: "2px 10px", fontWeight: "bold"
                }}>
                  {profile.tier}
                </span>
              </div>
              <div>Balance: <b>${balance}</b></div>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <button style={{ background: "#3b82f6", color: "#fff", border: "none", borderRadius: 6, padding: "6px 16px", fontWeight: "bold", cursor: "pointer" }}>Request Payout</button>
            </div>
          </div>

          {/* Tier Features */}
          <div style={{ marginBottom: 30 }}>
            <b>Tier Features:</b>
            <ul>
              <li>Tier 1: Basic Marketplace Access</li>
              <li>Tier 2: Tax Deductibility, Advanced Analytics</li>
              <li>Covenant: All Tier 2 features + AR/VR, Direct Funding, VIP Access</li>
            </ul>
          </div>
        </>
      ) : (
        <p style={{ color: 'red' }}>Please log in to access the dashboard.</p>
      )}

      {/* Products Table */}
      <div>
        <h3>Your Products</h3>
        <ul>
          {products.filter(p => p.creator._id === profile?._id).map(prod => (
            <li key={prod._id} style={{ margin: '1rem 0', borderBottom: '1px solid #eee' }}>
              <b>{prod.title}</b> (${prod.price}) [{prod.category}]
              <div style={{ fontSize: 13, color: "#666" }}>{prod.description}</div>
              {prod.imageUrl && <img src={prod.imageUrl} alt={prod.title} style={{ maxWidth: 120 }} />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
