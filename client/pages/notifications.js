import { useEffect, useState } from "react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem("nuvizion_token");

  useEffect(() => {
    fetch("http://localhost:4000/api/notifications", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setNotifications);
  }, []);

  return (
    <div>
      <h2>Platform Notifications</h2>
      <ul>
        {notifications.map(n => (
          <li key={n._id}>
            {n.message} <span style={{ color: "gray" }}>({new Date(n.createdAt).toLocaleString()})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
