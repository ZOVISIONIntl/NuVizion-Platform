import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Example: get user from localStorage/JWT, or fetch from API
    const u = JSON.parse(localStorage.getItem("nuvizion_user"));
    if (!u) router.push("/login"); // redirect if not logged in
    setUser(u);
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", background: "#fff", padding: 24, borderRadius: 8 }}>
      <h1>Welcome, {user.name || user.email}</h1>
      <p>Email: {user.email}</p>
      <hr />
      <div style={{ marginTop: 24 }}>
        <h3>Your Stats</h3>
        <ul>
          <li><b>Earnings:</b> $0.00 (coming soon)</li>
          <li><b>Subscribers:</b> --</li>
          <li><b>Your Tier:</b> --</li>
        </ul>
        <div style={{ marginTop: 32 }}>
          <a href="/marketplace">Go to Marketplace</a> | <a href="/payouts">Payouts</a>
        </div>
      </div>
    </div>
  );
}
 