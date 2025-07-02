import { useEffect, useState } from "react";

export default function Settings() {
  const [settings, setSettings] = useState(null);
  const [msg, setMsg] = useState("");
  const token = localStorage.getItem("nuvizion_token");

  useEffect(() => {
    fetch("http://localhost:4000/api/settings", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setSettings);
  }, []);

  const handleChange = e => {
    setSettings({ ...settings, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg("");
    const res = await fetch("http://localhost:4000/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(settings)
    });
    if (res.ok) setMsg("Settings updated!");
    else setMsg("Update failed.");
  };

  if (!settings) return <div>Loading...</div>;

  return (
    <div>
      <h2>Settings</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="checkbox" name="emailNotifications" checked={settings.emailNotifications} onChange={handleChange} />
          Email Notifications
        </label>
        <br />
        <label>
          <input type="checkbox" name="platformAnnouncements" checked={settings.platformAnnouncements} onChange={handleChange} />
          Platform Announcements
        </label>
        <br />
        <label>
          <input type="checkbox" name="darkMode" checked={settings.darkMode} onChange={handleChange} />
          Dark Mode (UI only)
        </label>
        <br />
        <button type="submit">Save</button>
      </form>
      {msg && <div>{msg}</div>}
    </div>
  );
}
