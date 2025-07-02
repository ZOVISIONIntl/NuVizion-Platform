import { useEffect, useState } from "react";

export default function Payouts() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [myPayouts, setMyPayouts] = useState([]);

  // Fetch my payouts
  useEffect(() => {
    const token = localStorage.getItem("nuvizion_token");
    fetch("http://localhost:4000/api/payouts/mine", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setMyPayouts);
  }, []);

  // Request payout
  const handlePayout = async e => {
    e.preventDefault();
    setMessage("");
    const token = localStorage.getItem("nuvizion_token");
    const res = await fetch("http://localhost:4000/api/payouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount }),
    });
    const data = await res.json();
    setMessage(data.msg);
    if (res.ok) {
      setAmount("");
      setMyPayouts([...myPayouts, data.payout]);
    }
  };

  return (
    <div>
      <h2>Payouts</h2>
      <form onSubmit={handlePayout}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
        />
        <button type="submit">Request Payout</button>
      </form>
      {message && <div>{message}</div>}
      <h3>My Payout Requests</h3>
      <ul>
        {myPayouts.map(p => (
          <li key={p._id}>
            Amount: ${p.amount} | Status: <b>{p.status}</b>
            {p.status !== "pending" && p.processedAt && (
              <> | Processed: {new Date(p.processedAt).toLocaleString()}</>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
 