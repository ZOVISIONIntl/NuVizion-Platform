// client/pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    // Replace with your real API call:
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      router.push('/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '3rem auto', padding: 24, background: '#222', color: '#fff', borderRadius: 8 }}>
      <h2>Login to NuVizion</h2>
      <form onSubmit={handleLogin}>
        <input
          style={{ width: '100%', marginBottom: 12, padding: 8 }}
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          style={{ width: '100%', marginBottom: 12, padding: 8 }}
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button style={{ width: '100%', padding: 10, background: '#14d81c', color: '#181818', fontWeight: 'bold', borderRadius: 6, border: 'none' }}>Login</button>
        {error && <p style={{ color: 'red', marginTop: 12 }}>{error}</p>}
      </form>
    </div>
  );
}
