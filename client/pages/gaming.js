import { useEffect, useState } from "react";

export default function Gaming() {
  const [profile, setProfile] = useState(null);
  const [item, setItem] = useState("");
  const token = localStorage.getItem("nuvizion_token");

  useEffect(() => {
    fetch("http://localhost:4000/api/gaming", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setProfile);
  }, []);

  const handleAvatar = async e => {
    e.preventDefault();
    const url = prompt("New avatar URL?");
    if (!url) return;
    await fetch("http://localhost:4000/api/gaming", {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ avatarUrl: url }),
    });
    setProfile({ ...profile, avatarUrl: url });
  };

  const handleAddItem = async e => {
    e.preventDefault();
    if (!item) return;
    const res = await fetch("http://localhost:4000/api/gaming/add-item", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ item }),
    });
    setProfile(await res.json());
    setItem("");
  };

  const handleRemoveItem = async i => {
    const res = await fetch("http://localhost:4000/api/gaming/remove-item", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ item: i }),
    });
    setProfile(await res.json());
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h2>NuVerse Gaming Profile</h2>
      <div>
        <b>Handle:</b> {profile.nuverseHandle} <br />
        <b>Level:</b> {profile.level} | <b>XP:</b> {profile.xp} <br />
        <img src={profile.avatarUrl} alt="avatar" width={80} height={80} />
        <button onClick={handleAvatar}>Update Avatar</button>
      </div>
      <h3>Inventory</h3>
      <form onSubmit={handleAddItem}>
        <input value={item} onChange={e => setItem(e.target.value)} placeholder="Add item" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {profile.inventory.map(i => (
          <li key={i}>
            {i}
            <button onClick={() => handleRemoveItem(i)} style={{ marginLeft: 8 }}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
