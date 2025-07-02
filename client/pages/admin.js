import { useEffect, useState } from "react";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [payouts, setPayouts] = useState([]);
  const token = localStorage.getItem("nuvizion_token");

  useEffect(() => {
    fetch("http://localhost:4000/api/admin/users", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json()).then(setUsers);

    fetch("http://localhost:4000/api/admin/payouts", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json()).then(setPayouts);
  }, []);

  const approvePayout = async id => {
    await fetch(`http://localhost:4000/api/admin/payouts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status: "approved" }),
    });
    setPayouts(payouts.map(p => p._id === id ? { ...p, status: "approved" } : p));
  };

  const deleteUser = async id => {
    await fetch(`http://localhost:4000/api/admin/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsers(users.filter(u => u._id !== id));
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <h3>Users</h3>
      <ul>
        {users.map(u => (
          <li key={u._id}>
            {u.name} | {u.email} | Role: {u.role}
            <button onClick={() => deleteUser(u._id)} style={{ marginLeft: 8 }}>Delete</button>
          </li>
        ))}
      </ul>
      <h3>Payout Requests</h3>
      <ul>
        {payouts.map(p => (
          <li key={p._id}>
            {p.user?.name || 'Unknown'} | ${p.amount} | Status: {p.status}
            {p.status === "pending" && (
              <button onClick={() => approvePayout(p._id)} style={{ marginLeft: 8 }}>Approve</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
