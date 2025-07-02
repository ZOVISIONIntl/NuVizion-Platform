import { useState } from "react";

export default function Receipts() {
  const [txnId, setTxnId] = useState("");
  const [message, setMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  const generateReceipt = async e => {
    e.preventDefault();
    setMessage("");
    setDownloadUrl("");
    const res = await fetch("http://localhost:4000/api/receipts/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ txnId }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage("Receipt generated!");
      setDownloadUrl(`http://localhost:4000${data.receiptUrl}`);
    } else {
      setMessage(data.msg || "Error");
    }
  };

  const downloadReceipt = () => {
    window.open(downloadUrl, "_blank");
  };

  return (
    <div>
      <h2>Generate/Download Receipt</h2>
      <form onSubmit={generateReceipt}>
        <input
          value={txnId}
          onChange={e => setTxnId(e.target.value)}
          placeholder="Transaction ID"
          required
        />
        <button type="submit">Generate Receipt</button>
      </form>
      {message && <div>{message}</div>}
      {downloadUrl && (
        <button onClick={downloadReceipt}>Download PDF</button>
      )}
    </div>
  );
}
