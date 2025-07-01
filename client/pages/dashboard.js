import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  // In real use: fetch JWT from cookies/localStorage
  const [token, setToken] = useState('');
  const [profile, setProfile] = useState(null);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', price: '', category: '', digital: false, fileUrl: '', imageUrl: '' });

  useEffect(() => {
    // Try to load JWT from storage (for demo, prompt user)
    const t = window.localStorage.getItem('token') || '';
    setToken(t);

    if (t) {
      axios.get('http://localhost:4000/api/users/me', { headers: { Authorization: `Bearer ${t}` } })
        .then(res => setProfile(res.data))
        .catch(() => setProfile(null));
    }
  }, []);

  useEffect(() => {
    axios.get('http://localhost:4000/api/marketplace/')
      .then(res => setProducts(res.data))
      .catch(() => setProducts([]));
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!token) return alert("You must log in first!");
    axios.post('http://localhost:4000/api/marketplace/', form, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        setProducts([res.data, ...products]);
        setForm({ title: '', description: '', price: '', category: '', digital: false, fileUrl: '', imageUrl: '' });
      })
      .catch(err => alert("Failed to add product: " + err.response?.data?.msg));
  }

  return (
    <div style={{ maxWidth: 800, margin: "2rem auto" }}>
      <h2>Creator Dashboard</h2>
      {profile ? (
        <>
          <p><strong>User:</strong> {profile.username} ({profile.role}, {profile.tier})</p>
          {profile.role === 'creator' && (
            <form onSubmit={handleSubmit} style={{ border: '1px solid #eee', padding: 20, margin: '1rem 0' }}>
              <h4>Add New Product</h4>
              <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
              <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" min="0" required />
              <input name="category" value={form.category} onChange={handleChange} placeholder="Category" />
              <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Image URL" />
              <label>
                <input type="checkbox" name="digital" checked={form.digital} onChange={handleChange} />
                Digital product?
              </label>
              {form.digital && (
                <input name="fileUrl" value={form.fileUrl} onChange={handleChange} placeholder="File download URL" />
              )}
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
              <button type="submit">Add Product</button>
            </form>
          )}
        </>
      ) : (
        <p style={{ color: 'red' }}>Please log in to access the dashboard.</p>
      )}

      <h3>Marketplace Listings</h3>
      <ul>
        {products.map(prod => (
          <li key={prod._id} style={{ margin: '1rem 0', borderBottom: '1px solid #eee' }}>
            <b>{prod.title}</b> (${prod.price}) — {prod.creator.username} [{prod.creator.tier}]
            <p>{prod.description}</p>
            {prod.imageUrl && <img src={prod.imageUrl} alt={prod.title} style={{ maxWidth: 150 }} />}
          </li>
        ))}
      </ul>
    </div>
  );
}
