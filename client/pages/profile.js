import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: "", email: "" });
  const [pwForm, setPwForm] = useState({ currentPassword: "", newPassword: "" });
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("nuvizion_token");

  useEffect(() => {
    fetch("http://localhost:4000/api/profile", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(u => {
        setUser(u);
        setForm({ name: u.name, email: u.email });
      });
  }, []);

  const handleUpdate = async e => {
    e.preventDefault();
    setMessage("");
    const res = await fetch("http://localhost:4000/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(form)
    });
    if (res.ok) setMessage("Profile updated!");
    else setMessage((await res.json()).msg);
  };

  const handlePassword = async e => {
    e.preventDefault();
    setMessage("");
    const res = await fetch("http://localhost:4000/api/profile/password", {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(pwForm)
    });
    if (res.ok) setMessage("Password updated!");
    else setMessage((await res.json()).msg);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>My Profile</h2>
      <form onSubmit={handleUpdate}>
        <input name="name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        <input name="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        <button type="submit">Update Profile</button>
      </form>
      <hr />
      <h3>Change Password</h3>
      <form onSubmit={handlePassword}>
        <input name="currentPassword" type="password" placeholder="Current Password" value={pwForm.currentPassword} onChange={e => setPwForm(f => ({ ...f, currentPassword: e.target.value }))} />
        <input name="newPassword" type="password" placeholder="New Password" value={pwForm.newPassword} onChange={e => setPwForm(f => ({ ...f, newPassword: e.target.value }))} />
        <button type="submit">Change Password</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
}
