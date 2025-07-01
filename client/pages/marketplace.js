import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Marketplace() {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/api/marketplace/')
      .then(res => setProducts(res.data))
      .catch(() => setProducts([]));
    setToken(window.localStorage.getItem('token') || '');
  }, []);

  async function handleBuy(productId) {
    if (!token) return alert("Log in first!");
    try {
      const res = await axios.post('http://localhost:4000/api/marketplace/purchase', { productId }, { headers: { Authorization: `Bearer ${token}` } });
      setMessage(res.data.msg);
      if (res.data.receiptUrl) {
        window.open(`http://localhost:4000${res.data.receiptUrl}`, '_blank');
      }
    } catch (err) {
      setMessage(err.response?.data?.msg || "Purchase failed.");
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: "2rem auto" }}>
      <h2>NuVizion Marketplace</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <ul>
        {products.map(prod => (
          <li key={prod._id} style={{ margin: '1rem 0', borderBottom: '1px solid #eee' }}>
            <b>{prod.title}</b> (${prod.price}) — {prod.creator.username} [{prod.creator.tier}]
            <p>{prod.description}</p>
            {prod.imageUrl && <img src={prod.imageUrl} alt={prod.title} style={{ maxWidth: 150 }} />}
            <button onClick={() => handleBuy(prod._id)}>Buy</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
