import { useEffect, useState } from "react";

export default function Subscriptions() {
  const [subs, setSubs] = useState([]);
  const [creators, setCreators] = useState([]);
  const [form, setForm] = useState({ creatorId: "", tier: "basic" });
  const token = localStorage.getItem("nuvizion_token");

  // Load all creators for demo (ideally, get from /api/users?role=creator)
  useEffect(() => {
    fetch("http://localhost:4000/api/admin/users", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => setCreators(data.filter(u => u.role === "creator")));
    fetch("http://localhost:4000/api/subscriptions/mine", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json()).then(setSubs);
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubscribe = async e => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/subscriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      const data = await res.json();
      setSubs([...subs, data.sub]);
    }
  };

  const handleCancel = async id => {
    await fetch(`http://localhost:4000/api/subscriptions/cancel/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` }
    });
    setSubs(subs.map(s => s._id === id ? { ...s, active: false } : s));
  };

  return (
    <div>
      <h2>Subscribe to a Creator</h2>
      <form onSubmit={handleSubscribe}>
        <select name="creatorId" value={form.creatorId} onChange={handleChange} required>
          <option value="">Select Creator</option>
          {creators.map(c => (
            <option value={c._id} key={c._id}>{c.name} ({c.tier})</option>
          ))}
        </select>
        <select name="tier" value={form.tier} onChange={handleChange}>
          <option value="basic">Basic</option>
          <option value="nuvizion">NuVizion</option>
          <option value="covenant">Covenant</option>
        </select>
        <button type="submit">Subscribe</button>
      </form>
      <h3>My Subscriptions</h3>
      <ul>
        {subs.map(s => (
          <li key={s._id}>
            {s.creator?.name} ({s.tier}) | {s.active ? "Active" : "Cancelled"}
            {s.active && <button onClick={() => handleCancel(s._id)} style={{ marginLeft: 8 }}>Cancel</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}
