import { useEffect, useRef, useState } from "react";

export default function Pay() {
  const cardRef = useRef();
  const [amount, setAmount] = useState("");
  const [msg, setMsg] = useState("");
  const [payments, setPayments] = useState(null);

  useEffect(() => {
    // Dynamically load Square Web Payments SDK
    const script = document.createElement('script');
    script.src = 'https://sandbox.web.squarecdn.com/v1/square.js';
    script.onload = () => setPayments(window.Square);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (payments && window.Square) {
      (async () => {
        const paymentsClient = payments.payments("YOUR_SQUARE_APPLICATION_ID", "YOUR_SQUARE_LOCATION_ID");
        const card = await paymentsClient.card();
        await card.attach(cardRef.current);
        cardRef.current.card = card; // Save for later use
      })();
    }
  }, [payments]);

  const handlePay = async e => {
    e.preventDefault();
    setMsg("");
    if (!cardRef.current.card) return setMsg("Card not ready.");

    const result = await cardRef.current.card.tokenize();
    if (result.status !== "OK") return setMsg("Card error: " + result.errors?.[0]?.message);

    const nonce = result.token;
    const token = localStorage.getItem("nuvizion_token");
    const res = await fetch("http://localhost:4000/api/square/pay", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ nonce, amount })
    });
    const data = await res.json();
    if (res.ok) setMsg("Payment success! " + data.payment.id);
    else setMsg(data.msg || "Payment failed");
  };

  return (
    <form onSubmit={handlePay} style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h2>Pay with Square</h2>
      <input
        value={amount}
        onChange={e => setAmount(e.target.value)}
        type="number"
        placeholder="Amount in USD"
        required
      />
      <div ref={cardRef} style={{ minHeight: 60, marginBottom: 8 }}></div>
      <button type="submit">Pay</button>
      {msg && <div>{msg}</div>}
    </form>
  );
}
